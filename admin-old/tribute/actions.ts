"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function saveTribute(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "دسترسی غیرمجاز" };

  const title = (formData.get("title") as string) || null;
  const alt = (formData.get("alt") as string) || null;
  const description = (formData.get("description") as string) || null;
  const imageFile = formData.get("image");

  let imageUrl: string | null = null;

  // آپلود عکس جدید
  if (imageFile instanceof File && imageFile.size > 0) {
    if (imageFile.size > 5 * 1024 * 1024) {
      return { error: "حجم عکس باید زیر ۵ مگابایت باشد" };
    }

    const fileExt = imageFile.name.split(".").pop();
    const fileName = `tribute/${crypto.randomUUID()}.${fileExt}`;

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

  // آپدیت رکورد id=1
  const updates: Record<string, unknown> = {
    title,
    alt,
    description,
    updated_at: new Date().toISOString(),
  };
  if (imageUrl) updates.image_url = imageUrl;

  const { error } = await supabase.from("tribute").update(updates).eq("id", 1);

  if (error) return { error: error.message };

  revalidatePath("/admin/tribute");
  revalidatePath("/");
  redirect("/admin/tribute");
}