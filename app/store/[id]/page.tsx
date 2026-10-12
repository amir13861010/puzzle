import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ChevronRight } from "lucide-react";
import ProductActions from "./ProductActions";

export const dynamic = "force-dynamic";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (!product) notFound();

  // دسته‌بندی
  let categoryName: string | null = null;
  if (product.category) {
    const { data: category } = await supabase
      .from("categories")
      .select("name")
      .eq("id", product.category)
      .single();
    categoryName = category?.name ?? null;
  }

  // محصولات مشابه
  const { data: related } = await supabase
    .from("products")
    .select("*")
    .neq("id", id)
    .limit(3);

  return (
    <main
      className="bg-[#fafafa] text-black overflow-x-hidden font-sans"
      dir="rtl"
    >
      {/* ============ بخش اصلی ============ */}
      <section className="relative pt-28 md:pt-40 pb-16 md:pb-24">
        {/* واترمارک بسیار محو */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
          <div
            className="absolute -top-[5%] -right-[3%] text-black/[0.025] font-black text-[24vw] leading-none whitespace-nowrap uppercase tracking-tighter"
            style={{ fontFamily: "var(--font-display)" }}
          >
            PRODUCT
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-400 mb-12 md:mb-16">
            <Link href="/" className="hover:text-black transition-colors">
              HOME
            </Link>
            <span>/</span>
            <Link href="/store" className="hover:text-black transition-colors">
              STORE
            </Link>
            <span>/</span>
            <span className="text-black truncate max-w-[200px]">
              {product.name}
            </span>
          </nav>

          {/* چیدمان: عکس راست، متن چپ */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-20 items-start">
            {/* متن — راست */}
            <div className="md:col-span-6 lg:col-span-7 md:order-2">
              {/* دسته */}
              {categoryName && (
                <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-500 mb-6 flex items-center gap-3">
                  <span className="w-8 h-px bg-black" />
                  {categoryName}
                </div>
              )}

              {/* تیتر */}
              <h1
                className="font-black leading-[1.15] text-black tracking-tight mb-8 md:mb-10"
                style={{
                  fontFamily: "var(--font-doran)",
                  fontSize: "clamp(1.75rem, 3vw, 3rem)",
                }}
              >
                {product.name}
              </h1>

              {/* قیمت */}
              <div className="flex items-baseline gap-3 mb-10 md:mb-14 pb-10 md:pb-14 border-b border-black/10">
                <span
                  className="text-3xl md:text-4xl font-black text-black"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {Number(product.price).toLocaleString("fa-IR")}
                </span>
                <span className="font-mono text-xs tracking-[0.2em] uppercase text-neutral-500">
                  تومان
                </span>
              </div>

              {/* توضیحات کوتاه */}
              {product.description && (
                <p
                  className="text-neutral-700 whitespace-pre-line max-w-xl mb-10 md:mb-14"
                  style={{
                    fontFamily: "var(--font-doran)",
                    fontSize: "clamp(0.95rem, 1.1vw, 1.1rem)",
                    lineHeight: "2.1",
                  }}
                >
                  {product.description}
                </p>
              )}

              {/* اکشن‌ها */}
              <ProductActions product={product} />
            </div>

            {/* عکس — چپ */}
            <div className="md:col-span-6 lg:col-span-5 md:order-1">
              <div className="relative">
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 border border-black/10">
                  {product.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-black/20 text-xs font-mono">
                      NO IMG
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ توضیحات کامل ============ */}
      {product.description && (
        <section className="bg-white border-t border-b border-black/10 py-16 md:py-24">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="flex items-center justify-between font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 mb-10 md:mb-14 border-b border-black/10 pb-3">
              <span>[ DESCRIPTION ]</span>
              <span>MORE INFO</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
              <div className="md:col-span-3">
                <h2
                  className="text-xl md:text-2xl font-black text-black"
                  style={{ fontFamily: "var(--font-doran)" }}
                >
                  درباره محصول
                </h2>
              </div>
              <div className="md:col-span-9">
                <p
                  className="text-neutral-700 whitespace-pre-line"
                  style={{
                    fontFamily: "var(--font-doran)",
                    fontSize: "clamp(0.95rem, 1.1vw, 1.1rem)",
                    lineHeight: "2.1",
                  }}
                >
                  {product.description}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============ محصولات مشابه ============ */}
      {related && related.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="flex items-end justify-between gap-6 mb-10 md:mb-16 flex-wrap">
              <h2
                className="text-2xl md:text-4xl font-black text-black"
                style={{ fontFamily: "var(--font-doran)" }}
              >
                محصولات مشابه
              </h2>
              <Link
                href="/store"
                className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-500 hover:text-black transition-colors"
              >
                ALL PRODUCTS →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/store/${item.id}`}
                  className="group block"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 border border-black/10">
                    {item.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-black/20 text-xs font-mono">
                        NO IMG
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <h3
                      className="font-black text-black text-base md:text-lg line-clamp-2 group-hover:text-black/70 transition-colors"
                      style={{ fontFamily: "var(--font-doran)" }}
                    >
                      {item.name}
                    </h3>
                    <div className="font-mono text-xs text-neutral-500 mt-2">
                      {Number(item.price).toLocaleString("fa-IR")} تومان
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}