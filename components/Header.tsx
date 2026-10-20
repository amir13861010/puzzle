"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import MobileMenu from "@/components/MobileMenu";
import BlogMegaMenu, { type BlogCategory } from "@/components/BlogMegaMenu";
import { useCart } from "@/lib/cart";
import CartSheet from "@/components/CartSheet";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [blogMegaOpen, setBlogMegaOpen] = useState(false);
  const [blogCategories, setBlogCategories] = useState<BlogCategory[]>([]);

  const totalItems = useCart((s) => s.totalItems);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    fetch("/api/blog-categories")
      .then((res) => res.json())
      .then((data) => setBlogCategories(data.categories || []))
      .catch(() => setBlogCategories([]));
  }, []);

  const itemCount = mounted ? totalItems() : 0;

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-black p-1.5 md:p-2">
        <div className="flex items-stretch h-12 md:h-16 gap-1 md:gap-1.5">
          
          {/* بلوک ۱: لوگو اصلی با عکس اختصاصی */}
          <Link
            href="/"
            className="bg-neutral-100 text-black px-3 md:px-5 flex items-center gap-2.5 md:gap-3 shrink-0 hover:bg-white transition-colors"
          >
            <div className="relative w-6 h-6 md:w-8 md:h-8 bg-black border border-black overflow-hidden shrink-0">
              <Image
                src="/og-image.svg"
                alt="Puzzle Logo"
                fill
                sizes="32px"
                className="object-cover"
                priority
              />
            </div>
            <div className="leading-none">
              <div className="text-xs md:text-lg font-black tracking-tight uppercase">
                Puzzle
              </div>
              <div className="text-[7px] md:text-[9px] font-mono tracking-widest uppercase text-neutral-500">
                Brand
              </div>
            </div>
          </Link>

          {/* بلوک ۲: فضای خالی وسط */}
          <div className="flex-1 bg-black min-w-2" />

          {/* بلوک ۳: منوی دسکتاپ (بلوک یکپارچه نئوبروتال) */}
          <nav className="hidden lg:flex items-stretch bg-neutral-100 text-black">
            <Link
              href="/store"
              className="px-5 flex items-center text-xs md:text-sm font-bold uppercase tracking-wider hover:bg-black hover:text-[#c8ff00] transition-colors"
            >
              فروشگاه
            </Link>
            <Link
              href="/puzzle"
              className="px-5 flex items-center text-xs md:text-sm font-bold uppercase tracking-wider hover:bg-black hover:text-[#c8ff00] transition-colors border-r border-neutral-300"
            >
              پازل
            </Link>
            <Link
              href="/club"
              className="px-5 flex items-center text-xs md:text-sm font-bold uppercase tracking-wider hover:bg-black hover:text-[#c8ff00] transition-colors border-r border-neutral-300"
            >
              باشگاه
            </Link>

            {/* بلاگ + مگامنو */}
            <div
              className="relative flex items-stretch border-r border-neutral-300"
              onMouseEnter={() => setBlogMegaOpen(true)}
              onMouseLeave={() => setBlogMegaOpen(false)}
            >
              <button
                type="button"
                className="px-5 flex items-center gap-1.5 text-xs md:text-sm font-bold uppercase tracking-wider hover:bg-black hover:text-[#c8ff00] transition-colors cursor-pointer"
              >
                <span>بلاگ</span>
                <span className="text-[9px] opacity-60">▾</span>
              </button>
              <BlogMegaMenu open={blogMegaOpen} categories={blogCategories} />
            </div>
          </nav>

          {/* بلوک ۴: سبد خرید */}
          <button
            type="button"
            aria-label="سبد خرید"
            onClick={() => setCartOpen(true)}
            className="bg-neutral-100 text-black px-3 md:px-5 flex items-center gap-2 hover:bg-black hover:text-[#c8ff00] transition-colors relative shrink-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 md:w-5 md:h-5"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="hidden md:inline text-xs md:text-sm font-bold uppercase tracking-wide">
              سبد
            </span>
            {itemCount > 0 && (
              <span className="w-4 h-4 bg-[#c8ff00] text-black text-[9px] font-mono font-bold flex items-center justify-center border border-black">
                {itemCount.toLocaleString("fa-IR")}
              </span>
            )}
          </button>

          {/* بلوک ۵: شبکه‌های اجتماعی */}
          <div className="hidden md:flex items-stretch bg-neutral-100 text-black">
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="اینستاگرام"
              className="flex items-center px-3.5 hover:bg-black hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>

            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="لینکدین"
              className="flex items-center px-3.5 hover:bg-black hover:text-white transition-colors border-r border-neutral-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>

          {/* بلوک ۶: همبرگر موبایل */}
          <button
            type="button"
            aria-label="منو"
            onClick={() => setMobileOpen(true)}
            className="lg:hidden bg-neutral-100 text-black px-3.5 flex items-center shrink-0 hover:bg-black hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>
      </header>

      {/* منوی موبایل */}
      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        blogCategories={blogCategories}
      />

      {/* Sheet سبد خرید */}
      <CartSheet open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
