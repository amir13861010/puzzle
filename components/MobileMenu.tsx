"use client";

import Link from "next/link";
import { X, ChevronDown } from "lucide-react";
import { useState } from "react";
import type { BlogCategory } from "@/components/BlogMegaMenu";

const menuItems = [
  { label: "فروشگاه", href: "/store" },
  { label: "پازل", href: "/puzzle" },
  { label: "باشگاه", href: "/club" },
];

export default function MobileMenu({
  open,
  onClose,
  blogCategories = [],
}: {
  open: boolean;
  onClose: () => void;
  blogCategories?: BlogCategory[];
}) {
  const [blogOpen, setBlogOpen] = useState(false);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[70] w-full max-w-md bg-black transition-transform duration-500 ease-out overflow-y-auto ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 sticky top-0 bg-black z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 text-black"
                fill="currentColor"
              >
                <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-3 9h-3v3a1 1 0 11-2 0v-3H8a1 1 0 110-2h3V7a1 1 0 112 0v3h3a1 1 0 110 2z" />
              </svg>
            </div>
            <div className="text-white leading-none">
              <div className="text-lg font-black">Puzzle</div>
              <div className="text-[10px] tracking-widest uppercase opacity-60">
                Brand
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="بستن"
            className="text-white/60 hover:text-white transition-colors p-2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Menu */}
        <nav className="p-6 pb-32">
          <ul className="space-y-1">
            {menuItems.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="group flex items-center justify-between py-5 border-b border-white/10 text-white hover:text-white/60 transition-colors"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="text-xs font-mono text-white/30">
                      0{i + 1}
                    </span>
                    <span className="text-3xl md:text-4xl font-black">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-white/30 group-hover:text-white group-hover:translate-x-[-4px] transition-all">
                    ←
                  </span>
                </Link>
              </li>
            ))}

            {/* بلاگ با آکاردئون */}
            <li>
              <button
                type="button"
                onClick={() => setBlogOpen(!blogOpen)}
                className="group w-full flex items-center justify-between py-5 border-b border-white/10 text-white hover:text-white/60 transition-colors"
              >
                <div className="flex items-baseline gap-4">
                  <span className="text-xs font-mono text-white/30">
                    0{menuItems.length + 1}
                  </span>
                  <span className="text-3xl md:text-4xl font-black">بلاگ</span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-white/30 transition-transform duration-300 ${
                    blogOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* زیرمنو */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  blogOpen ? "max-h-[70vh] overflow-y-auto opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="py-4 pr-8 flex flex-col gap-5">
                  {blogCategories.length === 0 ? (
                    <span className="text-xs text-white/30">
                      هنوز دسته‌بندی‌ای اضافه نشده
                    </span>
                  ) : (
                    blogCategories.map((cat) => (
                      <div key={cat.id}>
                        {/* دسته مادر — غیرقابل کلیک */}
                        <div className="text-[11px] font-bold text-white/40 tracking-widest uppercase mb-3">
                          {cat.name}
                        </div>
                        <div className="space-y-4">
                          {cat.children.map((child) => (
                            <section key={child.id}>
                              <h4 className="text-xs font-bold text-white/50 mb-2">{child.name}</h4>
                              <ul className="space-y-2 pr-3">
                                {child.posts.map((post) => (
                                  <li key={post.id}>
                                    <Link href={`/blog/${post.slug}`} onClick={onClose} className="flex items-start gap-2 text-sm text-white/70 hover:text-white py-1 transition-colors">
                                      <span className="w-1 h-1 mt-2 rounded-full bg-[#c8ff00]/60 shrink-0" />
                                      {post.title}
                                    </Link>
                                  </li>
                                ))}
                                {child.posts.length === 0 && <li className="text-xs text-white/30">مقاله‌ای منتشر نشده</li>}
                              </ul>
                            </section>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </li>
          </ul>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 inset-x-0 p-6 border-t border-white/10 bg-black">
          <div className="flex items-center justify-between text-xs text-white/40">
            <span className="font-mono">Est. 1403</span>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
