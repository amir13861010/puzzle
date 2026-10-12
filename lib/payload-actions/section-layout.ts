"use server";

import { getPayloadClient } from "../payload";
import { revalidatePath } from "next/cache";

export async function updateSectionOrder(
  items: Array<{ id: string; _order: number }>
) {
  const payload = await getPayloadClient();

  for (const item of items) {
    await payload.update({
      collection: "section_layout",
      id: item.id,
      data: { _order: item._order },
    });
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

  // بیشترین _order رو بگیر
  const existing = await payload.find({
    collection: "section_layout",
    limit: 100,
    sort: "-_order",
  });

  const maxOrder = existing.docs[0]?._order ?? -1;

  await payload.create({
    collection: "section_layout",
    data: {
      type,
      source: source ?? null,
      is_visible: true,
      _order: maxOrder + 1,
    },
  });

  revalidatePath("/admin/section-layout");
  revalidatePath("/");
  return { success: true };
}