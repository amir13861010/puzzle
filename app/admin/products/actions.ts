"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function saveProduct(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.log("[saveProduct] ❌ No user");
    return { error: "دسترسی غیرمجاز" };
  }

  const id = formData.get("id") as string | null;
  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));
  const description = (formData.get("description") as string) || null;
  const category = (formData.get("category") as string) || null;
  const imageFile = formData.get("image");

  console.log("========== saveProduct START ==========");
  console.log("id:", id);
  console.log("name:", name);
  console.log("price:", price);
  console.log("imageFile type:", typeof imageFile);
  console.log("imageFile instanceof File:", imageFile instanceof File);
  console.log("imageFile:", imageFile);
  if (imageFile instanceof File) {
    console.log("file size:", imageFile.size);
    console.log("file name:", imageFile.name);
    console.log("file type:", imageFile.type);
  }

  let imageUrl: string | null = null;

  if (imageFile instanceof File && imageFile.size > 0) {
    if (imageFile.size > 5 * 1024 * 1024) {
      return { error: "حجم عکس باید زیر ۵ مگابایت باشه" };
    }

    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;

    console.log("[saveProduct] 📤 Uploading to Storage:", fileName);

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("products")
      .upload(fileName, imageFile, {
        cacheControl: "3600",
        upsert: false,
      });

    console.log("[saveProduct] uploadData:", uploadData);
    console.log("[saveProduct] uploadError:", uploadError);

    if (uploadError) {
      console.log("[saveProduct] ❌ Upload failed:", uploadError);
      return { error: `خطا در آپلود عکس: ${uploadError.message}` };
    }

    const { data: urlData } = supabase.storage
      .from("products")
      .getPublicUrl(fileName);

    imageUrl = urlData.publicUrl;
    console.log("[saveProduct] ✅ Public URL:", imageUrl);
  } else {
    console.log("[saveProduct] ⚠️ No image or empty file");
  }

  if (id) {
    const updates: Record<string, unknown> = {
      name,
      price,
      description,
      category,
    };
    if (imageUrl) updates.image_url = imageUrl;

    console.log("[saveProduct] 💾 Updating product:", id);
    const { error } = await supabase
      .from("products")
      .update(updates)
      .eq("id", id);

    if (error) {
      console.log("[saveProduct] ❌ Update error:", error);
      return { error: error.message };
    }
  } else {
    console.log("[saveProduct] 💾 Inserting new product");
    const { error } = await supabase.from("products").insert({
      name,
      price,
      description,
      category,
      image_url: imageUrl,
    });

    if (error) {
      console.log("[saveProduct] ❌ Insert error:", error);
      return { error: error.message };
    }
  }

  console.log("[saveProduct] ✅ SUCCESS!");
  revalidatePath("/admin/products");
  revalidatePath("/store");
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "دسترسی غیرمجاز" };

  // حذف عکس از Storage
  const { data: product } = await supabase
    .from("products")
    .select("image_url")
    .eq("id", id)
    .single();

  if (product?.image_url) {
    const fileName = product.image_url.split("/").pop();
    if (fileName) {
      await supabase.storage.from("products").remove([fileName]);
    }
  }

  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/products");
  revalidatePath("/store");
}