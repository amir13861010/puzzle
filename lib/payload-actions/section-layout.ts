"use server";
import { getPayloadClient } from "../payload";
import { getCourses } from "../data";
import { revalidatePath } from "next/cache";

export async function updateSectionOrder(
  items: Array<{ id: string; _order: number }>
) {
  const payload = await getPayloadClient();

  if (
    !Array.isArray(items) ||
    items.some((item) => !item || typeof item.id !== "string" || !Number.isInteger(item._order)) ||
    new Set(items.map((item) => item.id)).size !== items.length
  ) {
    return { error: "ترتیب ارسالی معتبر نیست" };
  }

  const sortedItems = [...items].sort((a, b) => a._order - b._order);
  if (sortedItems.some((item, index) => item._order !== index)) {
    return { error: "ترتیب سکشن‌ها باید پیوسته باشد" };
  }

  const pool = (
    payload.db as unknown as {
      pool: {
        connect: () => Promise<{
          query: (q: string, p?: unknown[]) => Promise<unknown>;
          release: () => void;
        }>;
      };
    }
  ).pool;

  if (!pool) {
    return { error: "Database pool not available" };
  }

  try {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const { rows } = await client.query(
        `SELECT id FROM section_layout ORDER BY _order ASC FOR UPDATE`,
      ) as { rows: Array<{ id: string }> };
      if (rows.length !== sortedItems.length || rows.some((row) => !sortedItems.some((item) => item.id === row.id))) {
        throw new Error("فهرست سکشن‌ها تغییر کرده؛ صفحه را تازه‌سازی کنید");
      }
      for (const item of sortedItems) {
        await client.query(`UPDATE section_layout SET _order = $1 WHERE id = $2`, [item._order, item.id]);
      }
      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }

    revalidatePath("/admin/section-layout");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    console.error("Reorder error:", err);
    return {
      error: err instanceof Error ? err.message : "خطا در ذخیره ترتیب",
    };
  }
}

export async function toggleSectionVisibility(
  id: string,
  isVisible: boolean
) {
  const payload = await getPayloadClient();
  await payload.update({
    collection: "section_layout",
    id,
    data: { is_visible: isVisible },
  });
  revalidatePath("/admin/section-layout");
  revalidatePath("/");
  return { success: true };
}

export async function deleteSection(id: string) {
  const payload = await getPayloadClient();
  await payload.delete({
    collection: "section_layout",
    id,
  });
  revalidatePath("/admin/section-layout");
  revalidatePath("/");
  return { success: true };
}

export async function addSection(type: string, source?: number) {
  const payload = await getPayloadClient();

  if (type === "course") {
    if (!Number.isInteger(source) || source! < 0) {
      return { error: "برای افزودن سکشن دوره، یک دورهٔ معتبر انتخاب کنید" };
    }
    const courses = await getCourses();
    if (source! >= courses.length) {
      return { error: "دورهٔ انتخاب‌شده پیدا نشد" };
    }

    const existingCourses = await payload.find({
      collection: "section_layout",
      where: { type: { equals: "course" } },
      limit: 100,
    });
    if (
      existingCourses.docs.some(
        (section) => (section.source ?? 0) === source
      )
    ) {
      return { error: "این دوره قبلاً به چیدمان اضافه شده است" };
    }
  }

  await payload.create({
    collection: "section_layout",
    data: {
      type,
      source: source ?? null,
      is_visible: true,
    },
  });
  revalidatePath("/admin/section-layout");
  revalidatePath("/");
  return { success: true };
}
