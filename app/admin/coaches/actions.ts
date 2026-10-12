"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function saveCoach(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "دسترسی غیرمجاز" };

  const id = formData.get("id") as string | null;
  const name = formData.get("name") as string;
  const role = (formData.get("role") as string) || null;
  const description = (formData.get("description") as string) || null;
  const alt = (formData.get("alt") as string) || null;
  const imageFile = formData.get("image");

  if (!name) return { error: "نام مربی الزامی است" };

  let imageUrl: string | null = null;

  // آپلود عکس جدید
  if (imageFile instanceof File && imageFile.size > 0) {
    if (imageFile.size > 5 * 1024 * 1024) {
      return { error: "حجم عکس باید زیر ۵ مگابایت باشد" };
    }

    const fileExt = imageFile.name.split(".").pop();
    const fileName = `coaches/${crypto.randomUUID()}.${fileExt}`;

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
    const updates: Record<string, unknown> = {
      name,
      role,
      description,
      alt,
    };
    if (imageUrl) updates.image_url = imageUrl;

    const { error } = await supabase.from("coaches").update(updates).eq("id", id);
    if (error) return { error: error.message };
  } else {
    // افزودن
    const { error } = await supabase.from("coaches").insert({
      name,
      role,
      description,
      alt,
      image_url: imageUrl,
    });

    if (error) return { error: error.message };
  }

  revalidatePath("/admin/coaches");
  revalidatePath("/");
  redirect("/admin/coaches");
}

export async function deleteCoach(id: string, imageUrl: string | null) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "دسترسی غیرمجاز" };

  // حذف عکس از Storage
  if (imageUrl) {
    const url = new URL(imageUrl);
    const path = url.pathname.split("/gallery/").pop();
    if (path) {
      await supabase.storage.from("gallery").remove([decodeURIComponent(path)]);
    }
  }

  const { error } = await supabase.from("coaches").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/coaches");
  revalidatePath("/");
}