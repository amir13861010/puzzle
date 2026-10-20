"use server";
import { getPayloadClient } from "../payload";
import { getCourses } from "../data";
import { revalidatePath } from "next/cache";
import { generateNKeysBetween } from "payload/shared";

export async function updateSectionOrder(
  orderedIds: string[]
) {
  const payload = await getPayloadClient();

  if (
    !Array.isArray(orderedIds) ||
    orderedIds.some((id) => typeof id !== "string" || id.length === 0) ||
    new Set(orderedIds).size !== orderedIds.length
  ) {
    return { error: "ترتیب ارسالی معتبر نیست" };
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
      const submittedIds = new Set(orderedIds);
      if (rows.length !== orderedIds.length || rows.some((row) => !submittedIds.has(row.id))) {
        throw new Error("فهرست سکشن‌ها تغییر کرده؛ صفحه را تازه‌سازی کنید");
      }
      // Payload orderable fields are fractional text keys. Integer strings can
      // sort lexicographically and conflict with keys generated for new rows.
      const keys = generateNKeysBetween(null, null, orderedIds.length);
      for (let index = 0; index < orderedIds.length; index++) {
        await client.query(`UPDATE section_layout SET _order = $1 WHERE id = $2`, [keys[index], orderedIds[index]]);
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
