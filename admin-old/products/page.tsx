import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Plus, Pencil, Trash2, ChevronRight } from "lucide-react";
import { deleteProduct } from "./actions";

export default async function AdminProductsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-[#f0efea]" dir="rtl">
      {/* Header */}
      <div className="border-b border-black/15 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-4">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1 text-xs text-black/50 hover:text-black transition-colors mb-3 font-mono"
          >
            <ChevronRight className="w-3.5 h-3.5" />
            بازگشت به داشبورد
          </Link>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs tracking-widest uppercase text-black/40 mb-1 font-mono">
                Products
              </p>
              <h1 className="text-3xl md:text-5xl font-black text-black">
                محصولات
              </h1>
            </div>
            <Link
              href="/admin/products/new"
              className="group inline-flex items-center gap-3 bg-black text-white hover:bg-black/80 px-5 py-3 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm font-bold">افزودن محصول</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12">
        {!products || products.length === 0 ? (
          <div className="bg-white border border-black/10 p-16 text-center">
            <p className="text-black/60 mb-6">هنوز محصولی اضافه نشده.</p>
            <Link
              href="/admin/products/new"
              className="inline-flex items-center gap-2 bg-black text-white hover:bg-black/80 px-6 py-3 transition-colors text-sm font-bold"
            >
              <Plus className="w-4 h-4" />
              افزودن اولین محصول
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-white border border-black/10 p-4 md:p-5 flex items-center gap-4 md:gap-6"
              >
                {/* عکس */}
                <div className="w-20 h-20 md:w-24 md:h-24 bg-[#f0efea] shrink-0 overflow-hidden">
                  {p.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.image_url}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-black/20 text-[10px] font-mono">
                      NO IMG
                    </div>
                  )}
                </div>

                {/* اطلاعات */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-black text-black text-base md:text-lg truncate">
                    {p.name}
                  </h3>
                  <div className="flex items-center gap-3 mt-1 text-xs text-black/50">
                    {p.category && <span>{p.category}</span>}
                    {p.category && <span>•</span>}
                    <span className="font-mono">
                      {Number(p.price).toLocaleString("fa-IR")} تومان
                    </span>
                  </div>
                </div>

                {/* اکشن‌ها */}
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/admin/products/${p.id}`}
                    className="flex items-center gap-1.5 text-xs border border-black/20 hover:bg-black hover:text-white px-3 py-2 transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    <span className="hidden md:inline">ویرایش</span>
                  </Link>
                  <form
                    action={async () => {
                      "use server";
                      await deleteProduct(p.id);
                    }}
                  >
                    <button
                      type="submit"
                      className="flex items-center gap-1.5 text-xs border border-red-300 text-red-600 hover:bg-red-600 hover:text-white px-3 py-2 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span className="hidden md:inline">حذف</span>
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}