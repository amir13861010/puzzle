type CoachingItem = {
  id: string;
  image_url: string;
  alt: string | null;
  title: string | null;
  description: string | null;
};

export default function CoachingSection({
  items,
}: {
  items: CoachingItem[];
}) {
  if (items.length === 0) return null;

  const mainItem = items[0];

  return (
    <section
      className="border-b-2 border-black bg-[#0f0f0f] text-white relative overflow-hidden py-16 md:py-24"
      dir="rtl"
    >
      {/* واترمارک بسیار محو */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        <div
          className="absolute top-0 right-0 text-white/[0.025] font-black text-[18vw] leading-none whitespace-nowrap uppercase tracking-tighter"
          style={{ fontFamily: "var(--font-display)" }}
        >
          COACHING
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        {/* لیبل بالا */}
        <div className="flex items-center justify-between font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-10 md:mb-14 border-b border-white/10 pb-3">
          <span>[ COACHING // 03 ]</span>
          <span>1:1 SESSIONS</span>
        </div>

        {/* محتوای اصلی: متن راست، عکس چپ */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
          {/* متن — راست */}
          <div className="md:col-span-6 lg:col-span-7">
            {/* تیتر */}
            <h2
              className="font-black leading-[1.25] text-white tracking-tight mb-6 md:mb-8"
              style={{
                fontFamily: "var(--font-doran)",
                fontSize: "clamp(1.5rem, 2.2vw, 2.25rem)",
              }}
            >
              {mainItem.title || "کوچ اختصاصی مدیریت محصول"}
            </h2>

            {/* توضیحات */}
            <p
              className="text-white/70 whitespace-pre-line max-w-xl"
              style={{
                fontFamily: "var(--font-doran)",
                fontSize: "clamp(0.9rem, 1vw, 1rem)",
                lineHeight: "2",
                fontWeight: 400,
              }}
            >
              {mainItem.description ||
                "جلسات اختصاصی و یک‌به‌یک مدیریت محصول با متخصصین پازل. جایی که فقط تمرکز روی تو و چالش‌های واقعیته."}
            </p>

            {/* دکمه INFO */}
            <a
              href="/coaching"
              className="group inline-flex items-center gap-3 mt-10 md:mt-12 border border-white/20 hover:border-[#c8ff00] hover:bg-[#c8ff00] hover:text-black px-5 py-3 transition-all"
            >
              <span className="text-sm font-bold font-mono tracking-widest uppercase">
                اطلاعات بیشتر
              </span>
              <span className="font-mono text-sm group-hover:-translate-x-1 transition-transform">
                ←
              </span>
            </a>

            {/* امضا */}
            <div className="mt-10 md:mt-12 pt-6 border-t border-white/10 flex items-center gap-4">
              <span className="w-1.5 h-1.5 bg-[#c8ff00] rounded-full" />
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40">
                LIMITED SLOTS · ONE-ON-ONE
              </div>
            </div>
          </div>

          {/* عکس — چپ */}
          <div className="md:col-span-6 lg:col-span-5">
            <div className="relative">
              {/* عکس */}
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900 border border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={mainItem.image_url}
                  alt={mainItem.alt || "کوچ اختصاصی"}
                  className="w-full h-full object-cover grayscale contrast-105"
                />
              </div>

              {/* بج گوشه */}
              <div className="absolute top-3 right-3 bg-[#c8ff00] text-black font-mono text-[9px] font-black px-2 py-0.5">
                ★ 03
              </div>
            </div>

            {/* لیبل زیر عکس */}
            <div className="mt-3 flex items-center justify-between font-mono text-[10px] tracking-[0.2em] uppercase text-white/40">
              <span>SESSION</span>
              <span>1:1 COACHING</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}