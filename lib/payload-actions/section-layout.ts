"use server";

import { getPayloadClient } from "../payload";
import { revalidatePath } from "next/cache";

export async function updateSectionOrder(
  items: Array<{ id: string; _order: number }>
) {
  const payload = await getPayloadClient();

  // Payload _order رو با update معمولی نمی‌پذیره
  // پس مستقیم از طریق db (drizzle) آپدیت می‌کنیم
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = (payload.db as any).drizzle;

  if (!db) {
    // راه جایگزین: یکی‌یکی از طریق API خود Payload
    for (const item of items) {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"}/api/section_layout/${item.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _order: item._order }),
      });
    }
  } else {
    // راه مستقیم با SQL
    for (const item of items) {
      await payload.db.pool.query(
        `UPDATE section_layout SET _order = $1 WHERE id = $2`,
        [item._order, item.id]
      );
    }
  }

  revalidatePath("/admin/section-layout");
  revalidatePath("/");
  return { success: true };
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