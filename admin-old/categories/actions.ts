"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function saveCategory(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "دسترسی غیرمجاز" };

  const id = formData.get("id") as string | null;
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;

  if (!name || !slug) {
    return { error: "نام و slug الزامی هستن" };
  }

  if (id) {
    // ویرایش
    const { error } = await supabase
      .from("categories")
      .update({ name, slug })
      .eq("id", id);

    if (error) {
      if (error.code === "23505") return { error: "این slug قبلاً استفاده شده" };
      return { error: error.message };
    }
  } else {
    // افزودن
    const { error } = await supabase
      .from("categories")
      .insert({ name, slug });

    if (error) {
      if (error.code === "23505") return { error: "این slug قبلاً استفاده شده" };
      return { error: error.message };
    }
  }

  revalidatePath("/admin/categories");
  revalidatePath("/admin/products");
  redirect("/admin/categories");
}

export async function deleteCategory(id: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "دسترسی غیرمجاز" };

  // چک کن دسته‌بندی توی محصولات استفاده نشده
  const { data: productsUsing } = await supabase
    .from("products")
    .select("id")
    .eq("category", id)
    .limit(1);

  if (productsUsing && productsUsing.length > 0) {
    return { error: "این دسته‌بندی در محصولات استفاده شده و قابل حذف نیست" };
  }

  const { error } = await supabase.from("categories").delete().eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/categories");
  revalidatePath("/admin/products");
}