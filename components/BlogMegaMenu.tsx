"use client";

import Link from "next/link";
import { ArrowUpLeft, Asterisk, Store, FolderArchive } from "lucide-react";

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
      /* 
         استفاده از fixed همراه با inset-x-0 باعث می‌شود منو دقیقاً نسبت به کل عرض صفحه مهار شود.
         دیگر به عرض والد یا جهت rtl/ltr وابسته نیست.
      */
      className={`fixed inset-x-0 top-[72px] md:top-[88px] px-4 sm:px-8 flex justify-center pointer-events-none z-50 transition-all duration-200 ${
        open
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-3"
      }`}
      dir="rtl"
    >
      {/* کانتینر اصلی منو — با pointer-events-auto برای قابلیت کلیک */}
      <div
        className={`w-full max-w-[880px] bg-[#f9f9f9] border-2 border-black shadow-[10px_10px_0px_#000] md:shadow-[14px_14px_0px_#000] relative overflow-hidden transition-all ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* واترمارک */}
        <div
          className="absolute -bottom-6 -left-10 text-black/[0.03] font-black text-[14vw] leading-none select-none pointer-events-none uppercase tracking-tighter"
          style={{ fontFamily: "var(--font-display)" }}
          dir="ltr"
        >
          DIRECTORY
        </div>

        {/* هدر بالایی با جزئیات نئوبروتال */}
        <div
          className="bg-white border-b-2 border-black px-4 md:px-6 py-2.5 flex items-center justify-between font-mono text-xs font-bold uppercase tracking-wider"
          dir="ltr"
        >
          <div className="flex items-center gap-2 truncate">
            <span className="w-2.5 h-2.5 bg-[#c8ff00] border border-black shrink-0" />
            <span className="truncate">DIRECTORY // DISPATCH & ESSAYS</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-500 text-[11px] shrink-0">
            <span className="hidden sm:inline">INDEX 2025</span>
            <Asterisk className="w-3.5 h-3.5 text-black animate-spin-slow" />
          </div>
        </div>

        {/* بدنه گرید دسته‌بندی‌ها */}
        <div className="p-6 md:p-8 max-h-[calc(100vh-200px)] overflow-y-auto">
          {categories.length === 0 ? (
            <div className="py-12 text-center text-neutral-500 font-mono text-sm border-2 border-dashed border-neutral-300">
              // NO CATEGORIES FOUND //
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {categories.map((cat, index) => (
                <div key={cat.id} className="flex flex-col min-w-0">
                  {/* عنوان دسته والد */}
                  <div className="flex items-baseline justify-between gap-2 border-b-2 border-black pb-2 mb-3">
                    <h3
                      className="text-sm md:text-base font-black text-black tracking-tight truncate"
                      style={{ fontFamily: "var(--font-doran)" }}
                      title={cat.name}
                    >
                      {cat.name}
                    </h3>
                    <span
                      className="font-mono text-[10px] text-neutral-400 font-bold shrink-0"
                      dir="ltr"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* لینک‌های زیردسته */}
                  <ul className="space-y-1.5">
                    {cat.children.length === 0 ? (
                      <li
                        className="font-mono text-[11px] text-neutral-400 py-1"
                        dir="ltr"
                      >
                        [EMPTY]
                      </li>
                    ) : (
                      cat.children.map((child) => (
                        <li key={child.id}>
                          <Link
                            href={`/blog/category/${child.slug}`}
                            className="group flex items-center justify-between gap-2 text-xs text-neutral-700 hover:text-black hover:bg-[#c8ff00] px-2 py-1.5 transition-all border border-transparent hover:border-black font-semibold"
                            style={{ fontFamily: "var(--font-doran)" }}
                            title={child.name}
                          >
                            <span className="truncate">{child.name}</span>
                            <ArrowUpLeft className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
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

        {/* فوتر پایینی */}
        <div className="bg-white border-t-2 border-black px-4 md:px-6 py-3 flex flex-wrap items-center justify-between gap-3 font-mono text-xs font-bold">
          <div className="flex items-center gap-3 md:gap-6 flex-wrap">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 hover:bg-[#c8ff00] px-2 py-0.5 transition-colors border border-transparent hover:border-black"
              style={{ fontFamily: "var(--font-doran)" }}
            >
              <FolderArchive className="w-3.5 h-3.5" />
              آرشیو مقالات ❋
            </Link>
            <Link
              href="/store"
              className="hover:bg-[#c8ff00] px-2 py-0.5 transition-colors border border-transparent hover:border-black"
              style={{ fontFamily: "var(--font-doran)" }}
            >
              فروشگاه و ابزارها →
            </Link>
          </div>

          <div
            className="text-[11px] text-neutral-500 uppercase tracking-widest hidden sm:block"
            dir="ltr"
          >
            PUZZLE CLUB
          </div>
        </div>
      </div>
    </div>
  );
}
