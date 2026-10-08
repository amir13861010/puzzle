import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { ProductForm } from "../ProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

    const { data: categories } = await supabase
  .from("categories")
  .select("*")
  .order("name");

  if (!product) notFound();

  return (
    <div className="min-h-screen bg-[#f0efea]" dir="rtl">
      <div className="border-b border-black/15 bg-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-4">
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-1 text-xs text-black/50 hover:text-black transition-colors mb-3 font-mono"
          >
            <ChevronRight className="w-3.5 h-3.5" />
            بازگشت به محصولات
          </Link>
          <p className="text-xs tracking-widest uppercase text-black/40 mb-1 font-mono">
            Edit Product
          </p>
          <h1 className="text-3xl md:text-5xl font-black text-black">
            ویرایش محصول
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 py-12">
        <div className="bg-white border border-black/10 p-6 md:p-10">
          <ProductForm
  initial={{
    id: product.id,
    name: product.name,
    price: product.price,
    description: product.description,
    category: product.category,
    image_url: product.image_url,
  }}
  categories={categories ?? []}
/>
        </div>
      </div>
    </div>
  );
}