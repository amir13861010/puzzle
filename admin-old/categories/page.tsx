import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Plus, Trash2, ChevronRight } from "lucide-react";
import { deleteCategory } from "./actions";

export default async function AdminCategoriesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: categories } = await supabase
    .from("categories")
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
                Categories
              </p>
              <h1 className="text-3xl md:text-5xl font-black text-black">
                دسته‌بندی‌ها
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* فرم افزودن */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-black/10 p-6 lg:sticky lg:top-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#c8ff00] flex items-center justify-center">
                  <Plus className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h2 className="font-black text-black">افزودن دسته‌بندی</h2>
                  <p className="text-xs text-black/50">دسته‌بندی جدید بساز</p>
                </div>
              </div>

              <form action={addCategoryAction} className="space-y-4">
                <div>
                  <label className="block text-xs tracking-widest uppercase text-black/60 mb-2 font-mono">
                    نام دسته‌بندی *
                  </label>
                  <input
                    name="name"
                    required
                    placeholder="مثلاً: پازل چوبی"
                    className="w-full border border-black/20 px-4 py-3 focus:border-black focus:outline-none bg-white text-black"
                  />
                </div>

                <div>
                  <label className="block text-xs tracking-widest uppercase text-black/60 mb-2 font-mono">
                    Slug (انگلیسی) *
                  </label>
                  <input
                    name="slug"
                    required
                    placeholder="wooden-puzzle"
                    dir="ltr"
                    className="w-full border border-black/20 px-4 py-3 focus:border-black focus:outline-none bg-white text-black font-mono text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="group flex items-center justify-between w-full bg-black text-white hover:bg-black/80 px-6 py-3 transition-colors"
                >
                  <span className="text-sm font-bold">ذخیره</span>
                  <span className="w-6 h-6 bg-[#c8ff00] flex items-center justify-center text-black text-xs group-hover:translate-x-[-4px] transition-transform">
                    ←
                  </span>
                </button>
              </form>
            </div>
          </div>

          {/* لیست */}
          <div className="lg:col-span-2">
            {!categories || categories.length === 0 ? (
              <div className="bg-white border border-black/10 p-16 text-center">
                <p className="text-black/60">هنوز دسته‌بندی‌ای اضافه نشده.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="bg-white border border-black/10 p-4 md:p-5 flex items-center justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <h3 className="font-black text-black text-base md:text-lg truncate">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-black/50 font-mono mt-1 truncate" dir="ltr">
                        {cat.slug}
                      </p>
                    </div>

                    <form
                      action={async () => {
                        "use server";
                        const result = await deleteCategory(cat.id);
                        if (result?.error) {
                          // برای سادگی فقط لاگ می‌کنیم
                          console.error(result.error);
                        }
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
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Server Action برای فرم افزودن
async function addCategoryAction(formData: FormData) {
  "use server";
  const { saveCategory } = await import("./actions");
  await saveCategory(formData);
}