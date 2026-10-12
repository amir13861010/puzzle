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
      className="border-b-2 border-black bg-[#0f0f0f] text-white relative overflow-hidden py-20 md:py-32"
      dir="rtl"
    >
      {/* واترمارک‌ها */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        <div
          className="absolute -top-[8%] -right-[3%] text-white/[0.035] font-black text-[26vw] leading-none whitespace-nowrap uppercase tracking-tighter"
          style={{ fontFamily: "var(--font-display)" }}
        >
          COACHING
        </div>
        <div
          className="absolute bottom-0 -left-[5%] text-white/[0.035] font-black text-[55vw] leading-none whitespace-nowrap rotate-[-3deg]"
          style={{ fontFamily: "var(--font-doran)" }}
        >
          کوچ اختصاصی
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        {/* لیبل بالا */}
        <div className="flex items-center justify-between font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-white/40 mb-12 md:mb-20 border-b border-white/10 pb-3">
          <span>[ COACHING // 03 ]</span>
          <span>1:1 SESSIONS</span>
        </div>

        {/* محتوای اصلی: متن راست، عکس چپ */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
          {/* متن — راست */}
          <div className="md:col-span-6 lg:col-span-7">
            {/* تیتر */}
            <h2
              className="font-black leading-[1.1] text-white tracking-tight mb-8 md:mb-10"
              style={{
                fontFamily: "var(--font-doran)",
                fontSize: "clamp(2rem, 4vw, 4rem)",
              }}
            >
              {mainItem.title || "کوچ اختصاصی مدیریت محصول"}
            </h2>

            {/* خط جداکننده */}
            <div className="flex items-center gap-3 mb-8 md:mb-10">
              <div className="w-16 h-0.5 bg-[#c8ff00]" />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/50">
                ONE-ON-ONE
              </span>
            </div>

            {/* توضیحات */}
            <p
              className="text-white/75 whitespace-pre-line max-w-2xl"
              style={{
                fontFamily: "var(--font-doran)",
                fontSize: "clamp(1rem, 1.3vw, 1.25rem)",
                lineHeight: "2.1",
                fontWeight: 400,
              }}
            >
              {mainItem.description ||
                "جلسات اختصاصی و یک‌به‌یک مدیریت محصول با متخصصین پازل. جایی که فقط تمرکز روی تو و چالش‌های واقعیته."}
            </p>

            {/* دکمه INFO */}
            <a
              href="/coaching"
              className="group inline-flex items-center gap-3 mt-10 md:mt-14 border border-white/20 hover:border-[#c8ff00] hover:bg-[#c8ff00] hover:text-black px-6 py-4 transition-all"
            >
              <span className="text-sm md:text-base font-bold font-mono tracking-widest uppercase">
                اطلاعات بیشتر
              </span>
              <span className="font-mono text-base group-hover:-translate-x-1 transition-transform">
                ←
              </span>
            </a>

            {/* امضا */}
            <div className="mt-12 md:mt-16 pt-6 border-t border-white/10 flex items-center gap-4">
              <span className="w-1.5 h-1.5 bg-[#c8ff00] rounded-full" />
              <div className="font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/40">
                LIMITED SLOTS · ONE-ON-ONE
              </div>
            </div>
          </div>

          {/* عکس — چپ */}
          <div className="md:col-span-6 lg:col-span-5">
            <div className="relative">
              <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900 border border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={mainItem.image_url}
                  alt={mainItem.alt || "کوچ اختصاصی"}
                  className="w-full h-full object-cover grayscale contrast-105"
                />
              </div>

              {/* بج گوشه */}
              <div className="absolute top-3 right-3 bg-[#c8ff00] text-black font-mono text-[10px] font-black px-3 py-1">
                ★ 03
              </div>
            </div>

            {/* لیبل زیر عکس */}
            <div className="mt-4 flex items-center justify-between font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/40">
              <span>SESSION</span>
              <span>1:1 COACHING</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}