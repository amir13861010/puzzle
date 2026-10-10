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
      className="border-b-2 border-black bg-black text-white relative overflow-hidden"
      dir="rtl"
    >
      {/* واترمارک‌های بزرگ پس‌زمینه */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        <div
          className="absolute -top-[12%] -left-[5%] text-white/[0.04] font-black text-[26vw] leading-none whitespace-nowrap uppercase tracking-tighter"
          style={{ fontFamily: "var(--font-display)" }}
        >
          COACHING
        </div>
        <div
          className="absolute bottom-0 right-1/4 text-white/[0.03] font-black text-[16vw] leading-none whitespace-nowrap rotate-[-3deg]"
          style={{ fontFamily: "var(--font-doran)" }}
        >
          کوچ اختصاصی
        </div>
        <div className="absolute top-1/2 -right-8 -translate-y-1/2 rotate-90 text-[11px] font-mono tracking-[0.6em] text-white/20 uppercase whitespace-nowrap">
          ONE-ON-ONE // PRODUCT MANAGEMENT // PUZZLE
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12">
        {/* سایدبار کوچ */}
        <div className="lg:col-span-4 border-b-2 lg:border-b-0 lg:border-l-2 border-white p-6 md:p-10 bg-white/[0.03] backdrop-blur-sm flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 font-mono text-[80px] font-black text-white/[0.04] select-none pointer-events-none leading-none">
            03
          </div>

          <div>
            <div className="flex items-center justify-between font-mono text-xs font-black uppercase tracking-widest text-white/60 mb-6 border-b border-white/20 pb-3">
              <span>[ COACHING // 03 ]</span>
              <span>1:1 SESSIONS</span>
            </div>

            <h2
              className="text-5xl md:text-7xl font-black leading-[0.9] text-white tracking-tighter uppercase"
              style={{ fontFamily: "var(--font-display)" }}
            >
              COACH<br />
              <span
                className="text-3xl md:text-5xl font-black tracking-normal mt-2 block"
                style={{ fontFamily: "var(--font-doran)" }}
              >
                کوچ اختصاصی❋
              </span>
            </h2>

            <p
              className="mt-6 text-sm md:text-base leading-relaxed text-white/70 border-r-2 border-white pr-3"
              style={{ fontFamily: "var(--font-doran)" }}
            >
              {mainItem.description ||
                "جلسات اختصاصی و یک‌به‌یک مدیریت محصول با متخصصین پازل. جایی که فقط تمرکز روی تو و چالش‌های واقعیته."}
            </p>
          </div>

          <div className="mt-8 pt-6 border-t-2 border-white flex items-center justify-between font-mono text-xs font-bold">
            <span className="bg-[#c8ff00] text-black px-2 py-0.5 border border-black">
              LIMITED SLOTS
            </span>
            <span>ONE-ON-ONE</span>
          </div>
        </div>

        {/* محتوای کوچ — عکس بزرگ */}
        <div className="lg:col-span-8 p-6 md:p-10 bg-transparent flex items-center relative">
          <div className="w-full">
            <div className="group border-2 border-white bg-black p-2.5 transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[6px_6px_0px_#fff]">
              <div className="relative aspect-[16/9] overflow-hidden bg-neutral-900 border border-white/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={mainItem.image_url}
                  alt={mainItem.alt || "کوچ اختصاصی"}
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                />
                <div className="absolute top-3 right-3 bg-[#c8ff00] text-black font-mono text-[10px] font-black px-2.5 py-1 border border-black">
                  ★ SPECIAL
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-white/20 flex justify-between items-center">
                <span
                  className="text-white text-base md:text-lg font-black"
                  style={{ fontFamily: "var(--font-doran)" }}
                >
                  {mainItem.title || "کوچ اختصاصی مدیریت محصول"}
                </span>
                <a
                  href="/coaching"
                  className="font-mono text-xs font-bold text-[#c8ff00] underline decoration-2 hover:text-white transition-colors"
                >
                  INFO ❋
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}