"use client";

import Link from "next/link";
import { useState } from "react";
import MobileMenu from "@/components/MobileMenu";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-black p-2 md:p-3">
        <div className="flex items-stretch h-14 md:h-20 gap-1.5 md:gap-2">
          {/* بلوک ۱: لوگو */}
          <Link
            href="/"
            className="bg-neutral-100 text-black px-3 md:px-6 flex items-center gap-2 md:gap-3 shrink-0"
          >
            <div className="w-7 h-7 md:w-10 md:h-10 bg-black flex items-center justify-center shrink-0">
              <svg
                viewBox="0 0 24 24"
                className="w-3.5 h-3.5 md:w-5 md:h-5 text-white"
                fill="currentColor"
              >
                <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-3 9h-3v3a1 1 0 11-2 0v-3H8a1 1 0 110-2h3V7a1 1 0 112 0v3h3a1 1 0 110 2z" />
              </svg>
            </div>
            <div className="leading-none">
              <div className="text-sm md:text-xl font-black tracking-tight">
                Puzzle
              </div>
              <div className="text-[8px] md:text-xs font-medium tracking-widest uppercase opacity-60">
                Brand
              </div>
            </div>
          </Link>

          {/* بلوک ۲: وسط خالی */}
          <div className="flex-1 bg-black min-w-2" />

          {/* بلوک ۳: منو دسکتاپ */}
          <nav className="hidden lg:flex items-stretch bg-neutral-100 text-black">
            <Link
              href="/store"
              className="px-6 flex items-center text-sm font-bold uppercase tracking-wide hover:bg-black hover:text-white transition-colors"
            >
              فروشگاه
            </Link>
            <Link
              href="/puzzle"
              className="px-6 flex items-center text-sm font-bold uppercase tracking-wide hover:bg-black hover:text-white transition-colors border-l border-black"
            >
              پازل
            </Link>
            <Link
              href="/club"
              className="px-6 flex items-center text-sm font-bold uppercase tracking-wide hover:bg-black hover:text-white transition-colors border-l border-black"
            >
              باشگاه
            </Link>
            <Link
              href="/blog"
              className="px-6 flex items-center text-sm font-bold uppercase tracking-wide hover:bg-black hover:text-white transition-colors border-l border-black"
            >
              بلاگ
            </Link>
          </nav>

          {/* بلوک ۴: سبد */}
          <button
            type="button"
            aria-label="سبد خرید"
            className="bg-neutral-100 text-black px-3 md:px-6 flex items-center gap-2 hover:bg-black hover:text-white transition-colors relative shrink-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 md:w-6 md:h-6"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="hidden md:inline text-sm font-bold uppercase tracking-wide">
              سبد
            </span>
            <span className="absolute top-1 right-1 md:top-2 md:right-2 w-4 h-4 md:w-5 md:h-5 bg-black text-white text-[9px] md:text-[10px] font-bold flex items-center justify-center rounded-full">
              0
            </span>
          </button>

          {/* بلوک ۵: اینستاگرام */}
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="اینستاگرام"
            className="hidden md:flex bg-neutral-100 text-black px-6 items-center hover:bg-black hover:text-white transition-colors border-l border-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 md:w-6 md:h-6"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </a>

          {/* بلوک ۶: همبرگر موبایل */}
          <button
            type="button"
            aria-label="منو"
            onClick={() => setMobileOpen(true)}
            className="lg:hidden bg-neutral-100 text-black px-3 md:px-4 flex items-center shrink-0 hover:bg-black hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="w-5 h-5"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>
      </header>

      {/* منوی موبایل */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}