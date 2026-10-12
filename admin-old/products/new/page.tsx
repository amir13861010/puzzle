import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { ProductForm } from "../ProductForm";

export default async function NewProductPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name");

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
            New Product
          </p>
          <h1 className="text-3xl md:text-5xl font-black text-black">
            افزودن محصول
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 py-12">
        <div className="bg-white border border-black/10 p-6 md:p-10">
          <ProductForm categories={categories ?? []} />
        </div>
      </div>
    </div>
  );
}