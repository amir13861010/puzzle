"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function saveTestimonial(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "دسترسی غیرمجاز" };

  const id = formData.get("id") as string | null;
  const type = formData.get("type") as "text" | "video";
  const name = formData.get("name") as string;
  const role = (formData.get("role") as string) || null;
  const quote = (formData.get("quote") as string) || null;
  const videoUrl = (formData.get("video_url") as string) || null;
  const alt = (formData.get("alt") as string) || null;
  const imageFile = formData.get("image");

  if (!name) return { error: "نام الزامی است" };
  if (type !== "text" && type !== "video") {
    return { error: "نوع نامعتبر" };
  }

  let imageUrl: string | null = null;

  // آپلود عکس جدید
  if (imageFile instanceof File && imageFile.size > 0) {
    if (imageFile.size > 5 * 1024 * 1024) {
      return { error: "حجم عکس باید زیر ۵ مگابایت باشد" };
    }

    const fileExt = imageFile.name.split(".").pop();
    const fileName = `testimonials/${crypto.randomUUID()}.${fileExt}`;

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
    const updates: Record<string, unknown> = {
      type,
      name,
      role,
      quote,
      alt,
    };
    if (type === "video") updates.video_url = videoUrl;
    if (imageUrl) updates.image_url = imageUrl;

    const { error } = await supabase
      .from("testimonials")
      .update(updates)
      .eq("id", id);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase.from("testimonials").insert({
      type,
      name,
      role,
      quote,
      alt,
      image_url: imageUrl,
      video_url: type === "video" ? videoUrl : null,
    });

    if (error) return { error: error.message };
  }
  revalidateTag("payload");
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(id: string, imageUrl: string | null) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "دسترسی غیرمجاز" };

  if (imageUrl) {
    const url = new URL(imageUrl);
    const path = url.pathname.split("/gallery/").pop();
    if (path) {
      await supabase.storage.from("gallery").remove([decodeURIComponent(path)]);
    }
  }

  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidateTag("payload");
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}