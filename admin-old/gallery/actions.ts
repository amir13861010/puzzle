"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function saveGalleryImage(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "دسترسی غیرمجاز" };

  const category = formData.get("category") as "books" | "events";
  const alt = (formData.get("alt") as string) || null;
  const title = (formData.get("title") as string) || null;
  const imageFile = formData.get("image");

  if (!category || (category !== "books" && category !== "events")) {
    return { error: "دسته‌بندی نامعتبر" };
  }

  if (!(imageFile instanceof File) || imageFile.size === 0) {
    return { error: "عکس الزامی است" };
  }

  if (imageFile.size > 5 * 1024 * 1024) {
    return { error: "حجم عکس باید زیر ۵ مگابایت باشد" };
  }

  const fileExt = imageFile.name.split(".").pop();
  const fileName = `${category}/${crypto.randomUUID()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("gallery")
    .upload(fileName, imageFile);

  if (uploadError) {
    return { error: `خطا در آپلود: ${uploadError.message}` };
  }

  const { data: urlData } = supabase.storage
    .from("gallery")
    .getPublicUrl(fileName);

  const { error: dbError } = await supabase.from("gallery").insert({
    category,
    image_url: urlData.publicUrl,
    alt,
    title,
  });

  if (dbError) {
    await supabase.storage.from("gallery").remove([fileName]);
    return { error: dbError.message };
  }

  revalidatePath("/admin/gallery");
  revalidatePath("/");
  redirect(`/admin/gallery?tab=${category}`);
}

export async function deleteGalleryImage(id: string, imageUrl: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "دسترسی غیرمجاز" };

  // استخراج path از URL
  const url = new URL(imageUrl);
  const path = url.pathname.split("/gallery/").pop();

  if (path) {
    await supabase.storage.from("gallery").remove([decodeURIComponent(path)]);
  }

  const { error } = await supabase.from("gallery").delete().eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/gallery");
  revalidatePath("/");
}