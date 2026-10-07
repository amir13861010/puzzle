"use client";

import Link from "next/link";
import { X } from "lucide-react";

const menuItems = [
  { label: "فروشگاه", href: "/store" },
  { label: "پازل", href: "/puzzle" },
  { label: "باشگاه", href: "/club" },
  { label: "بلاگ", href: "/blog" },
];

export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
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
        className={`fixed top-0 right-0 bottom-0 z-[70] w-full max-w-md bg-black transition-transform duration-500 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
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
        <nav className="p-6">
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
          </ul>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 inset-x-0 p-6 border-t border-white/10">
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