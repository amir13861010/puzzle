import Link from "next/link";
import { getProducts } from "@/lib/data";
import { ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "فروشگاه پازل",
  description: "محصولات و منابع آموزشی مرتبط با مدیریت محصول و یادگیری حرفه‌ای را در فروشگاه پازل ببینید.",
  keywords: ["فروشگاه پازل", "محصولات آموزشی", "مدیریت محصول"],
  alternates: { canonical: "/store" },
};

export const dynamic = "force-dynamic";

export default async function StorePage() {
  const products = await getProducts();
  const items = products ?? [];

  return (
    <main className="bg-[#f5f5f5] text-black overflow-x-hidden font-sans" dir="rtl">
      {/* Hero */}
      <section className="bg-black text-white relative overflow-hidden border-b-2 border-black">
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
          <div
            className="absolute -top-[8%] -left-[3%] text-white/[0.03] font-black text-[28vw] leading-none whitespace-nowrap uppercase tracking-tighter"
            style={{ fontFamily: "var(--font-display)" }}
          >
            STORE
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-32 md:pt-40 pb-16 md:pb-24 relative z-10">
          <nav className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-white/40 mb-10 md:mb-14">
            <Link href="/" className="hover:text-white transition-colors">
              HOME
            </Link>
            <ChevronRight className="w-3 h-3 rotate-180" />
            <span className="text-white">STORE</span>
          </nav>

          <h1
            className="font-black leading-[1] text-white tracking-tighter mb-6"
            style={{
              fontFamily: "var(--font-doran)",
              fontSize: "clamp(2.5rem, 6vw, 6rem)",
            }}
          >
            فروشگاه
          </h1>

          <p className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/50">
            ALL PRODUCTS · {items.length} ITEMS
          </p>
        </div>
      </section>

      {/* گرید محصولات */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          {items.length === 0 ? (
            <div className="bg-[#f5f5f5] border border-black/10 p-16 text-center">
              <p className="text-black/60">هنوز محصولی اضافه نشده.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {items.map((product, i) => (
                <Link
                  key={product.id}
                  href={`/store/${product.id}`}
                  className="group"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 border border-black/10">
                    {product.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-black/20 text-xs font-mono">
                        NO IMG
                      </div>
                    )}

                    <div className="absolute top-3 right-3 bg-[#c8ff00] text-black font-mono text-[9px] font-black px-2 py-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <h3
                      className="font-black text-black text-lg md:text-xl line-clamp-2 group-hover:text-black/70 transition-colors"
                      style={{ fontFamily: "var(--font-doran)" }}
                    >
                      {product.name}
                    </h3>
                    <div className="flex items-baseline justify-between">
                      <span
                        className="font-black text-black"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {Number(product.price).toLocaleString("fa-IR")}
                      </span>
                      <span className="font-mono text-[10px] tracking-widest uppercase text-neutral-500">
                        تومان
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
