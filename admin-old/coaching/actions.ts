"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function saveCoaching(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "دسترسی غیرمجاز" };

  const id = formData.get("id") as string | null;
  const title = (formData.get("title") as string) || null;
  const alt = (formData.get("alt") as string) || null;
  const description = (formData.get("description") as string) || null;
  const imageFile = formData.get("image");

  // اگه id داریم = ویرایش، باید عکس قبلی رو نگه داریم
  let imageUrl: string | null = null;

  if (imageFile instanceof File && imageFile.size > 0) {
    if (imageFile.size > 5 * 1024 * 1024) {
      return { error: "حجم عکس باید زیر ۵ مگابایت باشد" };
    }

    const fileExt = imageFile.name.split(".").pop();
    const fileName = `coaching/${crypto.randomUUID()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("gallery")
      .upload(fileName, imageFile);

    if (uploadError) {
      return { error: `خطا در آپلود: ${uploadError.message}` };
    }

    const { data: urlData } = supabase.storage
      .from("gallery")
      .getPublicUrl(fileName);

    imageUrl = urlData.publicUrl;
  }

  if (id) {
    // ویرایش
    const updates: Record<string, unknown> = { title, alt, description };
    if (imageUrl) updates.image_url = imageUrl;

    const { error } = await supabase.from("coaching").update(updates).eq("id", id);
    if (error) return { error: error.message };
  } else {
    // افزودن
    if (!imageUrl) {
      return { error: "عکس الزامی است" };
    }

    const { error } = await supabase.from("coaching").insert({
      image_url: imageUrl,
      alt,
      title,
      description,
    });

    if (error) return { error: error.message };
  }

  revalidatePath("/admin/coaching");
  revalidatePath("/");
  redirect("/admin/coaching");
}

export async function deleteCoaching(id: string, imageUrl: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "دسترسی غیرمجاز" };

  // حذف عکس از Storage
  const url = new URL(imageUrl);
  const path = url.pathname.split("/gallery/").pop();
  if (path) {
    await supabase.storage.from("gallery").remove([decodeURIComponent(path)]);
  }

  const { error } = await supabase.from("coaching").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/coaching");
  revalidatePath("/");
}