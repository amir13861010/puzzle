"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function savePartner(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "دسترسی غیرمجاز" };

  const id = formData.get("id") as string | null;
  const name = formData.get("name") as string;
  const alt = (formData.get("alt") as string) || null;
  const websiteUrl = (formData.get("website_url") as string) || null;
  const logoFile = formData.get("logo");

  if (!name) return { error: "نام حامی الزامی است" };

  let logoUrl: string | null = null;

  // آپلود لوگو جدید
  if (logoFile instanceof File && logoFile.size > 0) {
    if (logoFile.size > 3 * 1024 * 1024) {
      return { error: "حجم لوگو باید زیر ۳ مگابایت باشد" };
    }

    const fileExt = logoFile.name.split(".").pop();
    const fileName = `partners/${crypto.randomUUID()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("gallery")
      .upload(fileName, logoFile);

    if (uploadError) {
      return { error: `خطا در آپلود: ${uploadError.message}` };
    }

    const { data: urlData } = supabase.storage
      .from("gallery")
      .getPublicUrl(fileName);

    logoUrl = urlData.publicUrl;
  }

  if (id) {
    const updates: Record<string, unknown> = {
      name,
      alt,
      website_url: websiteUrl,
    };
    if (logoUrl) updates.logo_url = logoUrl;

    const { error } = await supabase.from("partners").update(updates).eq("id", id);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase.from("partners").insert({
      name,
      alt,
      website_url: websiteUrl,
      logo_url: logoUrl,
    });

    if (error) return { error: error.message };
  }

  revalidatePath("/admin/partners");
  revalidatePath("/");
  redirect("/admin/partners");
}

export async function deletePartner(id: string, logoUrl: string | null) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "دسترسی غیرمجاز" };

  // حذف لوگو از Storage
  if (logoUrl) {
    const url = new URL(logoUrl);
    const path = url.pathname.split("/gallery/").pop();
    if (path) {
      await supabase.storage.from("gallery").remove([decodeURIComponent(path)]);
    }
  }

  const { error } = await supabase.from("partners").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/partners");
  revalidatePath("/");
}