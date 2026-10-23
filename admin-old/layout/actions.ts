"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function updateLayoutOrder(
  items: Array<{ id: string; sort_order: number }>
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "دسترسی غیرمجاز" };

  // آپدیت هر آیتم با sort_order جدید
  for (const item of items) {
    const { error } = await supabase
      .from("section_layout")
      .update({ sort_order: item.sort_order })
      .eq("id", item.id);

    if (error) return { error: error.message };
  }
  revalidateTag("payload");
  revalidatePath("/admin/layout");
  revalidatePath("/");
  return { success: true };
}

export async function toggleVisibility(id: string, isVisible: boolean) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "دسترسی غیرمجاز" };

  const { error } = await supabase
    .from("section_layout")
    .update({ is_visible: isVisible })
    .eq("id", id);

  if (error) return { error: error.message };
  revalidateTag("payload");
  revalidatePath("/admin/layout");
  revalidatePath("/");
  return { success: true };
}

export async function resetLayout() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "دسترسی غیرمجاز" };

  // ترتیب پیش‌فرض
  const defaults: Array<{ type: string; source: number | null; sort_order: number }> = [
    { type: "events_gallery", source: null, sort_order: 0 },
    { type: "course", source: 0, sort_order: 1 },
    { type: "coaching", source: null, sort_order: 2 },
    { type: "product", source: 0, sort_order: 3 },
    { type: "course", source: 1, sort_order: 4 },
    { type: "product", source: 1, sort_order: 5 },
    { type: "coaches", source: null, sort_order: 6 },
    { type: "course", source: 2, sort_order: 7 },
    { type: "product", source: 2, sort_order: 8 },
    { type: "tribute", source: null, sort_order: 9 },
    { type: "books_gallery", source: null, sort_order: 10 },
    { type: "partners", source: null, sort_order: 11 },
    { type: "head_coach", source: null, sort_order: 12 },
    { type: "testimonials", source: null, sort_order: 13 },
    { type: "faq", source: null, sort_order: 14 },
  ];

  // حذف همه و درج مجدد
  await supabase.from("section_layout").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  const { error } = await supabase.from("section_layout").insert(defaults);

  if (error) return { error: error.message };
  revalidateTag("payload");
  revalidatePath("/admin/layout");
  revalidatePath("/");
  return { success: true };
}