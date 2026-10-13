"use server";

import { getPayloadClient } from "../payload";
import { revalidatePath } from "next/cache";

export async function updateSectionOrder(
  items: Array<{ id: string; _order: number }>
) {
  const payload = await getPayloadClient();

  // مرتب‌سازی بر اساس _order
  const sortedItems = [...items].sort((a, b) => a._order - b._order);

  // مستقیم از SQL استفاده کن (روش مطمئن)
  const pool = (payload.db as unknown as { pool: { query: (q: string, p: unknown[]) => Promise<unknown> } }).pool;

  if (!pool) {
    return { error: "Database pool not available" };
  }

  try {
    for (let i = 0; i < sortedItems.length; i++) {
      await pool.query(
        `UPDATE section_layout SET _order = $1 WHERE id = $2`,
        [i, sortedItems[i].id]
      );
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
