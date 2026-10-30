"use client";

import Link from "next/link";
import { ArrowUpLeft, FolderArchive } from "lucide-react";

export type BlogCategory = {
  id: string;
  name: string;
  slug: string;
  children: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
};

export default function BlogMegaMenu({
  open,
  categories,
}: {
  open: boolean;
  categories: BlogCategory[];
}) {
  return (
    <div
      id="blog-mega-menu"
      className={`fixed inset-x-0 top-14 md:top-16 px-4 md:px-8 flex justify-center pointer-events-none z-50 transition-all duration-200 ${
        open
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-2"
      }`}
      dir="rtl"
    >
      {/* کارت اصلی مگامنو */}
      <div
        className={`w-full max-w-[820px] bg-white border-2 border-black shadow-[6px_6px_0px_#000] relative transition-all ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* بار بالای منو: سبک مینیمال ادیتوریال */}
        <div
          className="bg-neutral-50 border-b border-black px-6 py-2.5 flex items-center justify-between font-mono text-[11px] font-bold text-neutral-500 uppercase tracking-wider"
          dir="ltr"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#c8ff00] border border-black inline-block" />
            <span className="text-black">CATEGORIES DIRECTORY</span>
          </div>
          <div>[ {categories.length} SECTIONS ]</div>
        </div>

        {/* محتوای گرید دسته‌بندی‌ها */}
        <div className="p-6 md:p-8 max-h-[calc(100vh-160px)] overflow-y-auto">
          {categories.length === 0 ? (
            <div className="py-10 text-center text-neutral-400 font-mono text-xs border border-dashed border-neutral-200">
              {/* NO CATEGORIES */}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {categories.map((cat, index) => (
                <div key={cat.id} className="flex flex-col">
                  {/* عنوان دسته اصلی */}
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-neutral-200">
                    <h3 className="text-sm font-bold text-black tracking-tight truncate">
                      {cat.name}
                    </h3>
                    <span
                      className="font-mono text-[10px] text-neutral-400 font-semibold"
                      dir="ltr"
                    >
                      / {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* زیردسته‌ها */}
                  <ul className="space-y-1">
                    {cat.children.length === 0 ? (
                      <li className="font-mono text-[10px] text-neutral-300 py-0.5" dir="ltr">
                        --
                      </li>
                    ) : (
                      cat.children.map((child) => (
                        <li key={child.id}>
                          <Link
                            href={`/blog/category/${child.slug}`}
                            className="group flex items-center justify-between py-1 text-xs text-neutral-600 hover:text-black transition-colors"
                          >
                            <span className="truncate group-hover:underline underline-offset-4 decoration-1">
                              {child.name}
                            </span>
                            <ArrowUpLeft className="w-3 h-3 text-neutral-300 group-hover:text-black group-hover:-translate-x-0.5 transition-all shrink-0" />
                          </Link>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* فوتر مینیمال مگامنو */}
        <div className="bg-neutral-50 border-t border-black px-6 py-2.5 flex items-center justify-between font-mono text-xs">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-neutral-700 hover:text-black font-bold transition-colors"
          >
            <FolderArchive className="w-3.5 h-3.5" />
            <span>مشاهده همه مقالات</span>
            <span className="text-[#c8ff00] bg-black px-1 text-[10px]">ALL</span>
          </Link>

          <Link
            href="/store"
            className="text-neutral-500 hover:text-black text-[11px] font-semibold transition-colors"
          >
            محصولات و منابع →
          </Link>
        </div>
      </div>
    </div>
  );
}
