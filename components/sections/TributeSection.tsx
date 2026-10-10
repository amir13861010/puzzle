type TributeItem = {
  id: number;
  image_url: string | null;
  alt: string | null;
  title: string | null;
  description: string | null;
};

export default function TributeSection({
  tribute,
}: {
  tribute: TributeItem | null;
}) {
  if (!tribute || !tribute.title) return null;

  return (
    <section
      className="bg-[#f5f5f5] text-black relative overflow-hidden border-b-2 border-black py-24 md:py-40"
      dir="rtl"
    >
      {/* واترمارک‌های بزرگ و شلوغ پس‌زمینه */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        <div
          className="absolute -top-[12%] -left-[5%] text-black/[0.05] font-black text-[28vw] leading-none whitespace-nowrap uppercase tracking-tighter"
          style={{ fontFamily: "var(--font-display)" }}
        >
          TRIBUTE
        </div>
        <div
          className="absolute bottom-0 right-1/4 text-black/[0.05] font-black text-[18vw] leading-none whitespace-nowrap rotate-[-4deg]"
          style={{ fontFamily: "var(--font-doran)" }}
        >
          ادای دین
        </div>
        <div
          className="absolute top-1/3 -left-[3%] text-black/[0.035] font-black text-[12vw] leading-none whitespace-nowrap rotate-[-8deg]"
          style={{ fontFamily: "var(--font-doran)" }}
        >
          یادگار
        </div>
        <div className="absolute top-1/2 -right-8 -translate-y-1/2 rotate-90 text-[11px] font-mono tracking-[0.6em] text-black/30 uppercase whitespace-nowrap">
          IN MEMORY // PUZZLE CLUB // 2024
        </div>
        <div className="absolute bottom-32 left-8 -rotate-90 text-[10px] font-mono tracking-[0.5em] text-black/25 uppercase whitespace-nowrap">
          A STORY WORTH TELLING
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        {/* لیبل بالا */}
        <div className="flex items-center justify-between font-mono text-xs md:text-sm font-black uppercase tracking-widest text-neutral-600 mb-16 md:mb-24 border-b-2 border-black/25 pb-4">
          <span>[ TRIBUTE // 07 ]</span>
          <span>IN MEMORY // A LEGACY</span>
        </div>

        {/* محتوای اصلی: متن راست، عکس چپ */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-20 items-start">
          {/* متن — راست */}
          <div className="md:col-span-7 lg:col-span-8">
            {/* تیتر بزرگ */}
            <h2
              className="font-black leading-[1.05] text-black tracking-tighter mb-10 md:mb-16"
              style={{
                fontFamily: "var(--font-doran)",
                fontSize: "clamp(2.5rem, 5.5vw, 6rem)",
              }}
            >
              {tribute.title}
            </h2>

            {/* خط جداکننده */}
            <div className="flex items-center gap-4 mb-10">
              <div className="w-24 h-1 bg-[#c8ff00]" />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-500">
                STORY // 01
              </span>
              <div className="flex-1 h-px bg-black/20" />
            </div>

            {/* متن کامل */}
            {tribute.description && (
              <div className="border-r-4 border-[#c8ff00] pr-6 md:pr-10">
                <p
                  className="text-neutral-800 whitespace-pre-line"
                  style={{
                    fontFamily: "var(--font-doran)",
                    fontSize: "clamp(1.15rem, 1.6vw, 1.75rem)",
                    lineHeight: "2.3",
                    fontWeight: 400,
                  }}
                >
                  {tribute.description}
                </p>
              </div>
            )}

            {/* امضا / برند */}
            <div className="flex items-center gap-4 mt-12 md:mt-16">
              <div className="w-12 h-12 bg-[#c8ff00] border-2 border-black flex items-center justify-center font-mono font-black text-xs">
                ★
              </div>
              <div>
                <div className="font-mono text-[10px] tracking-widest uppercase text-neutral-500">
                  PUZZLE CLUB
                </div>
                <div className="font-mono text-[10px] tracking-widest uppercase text-black">
                  IN MEMORY OF A BUILDER
                </div>
              </div>
            </div>
          </div>

          {/* عکس — چپ */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="relative">
              {/* شماره بزرگ پشت عکس */}
              <span
                className="absolute -top-10 -right-6 z-20 text-black text-7xl md:text-8xl font-black leading-none select-none"
                style={{ fontFamily: "var(--font-display)" }}
              >
                07
              </span>

              <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 border-2 border-black shadow-[12px_12px_0px_#000]">
                {tribute.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={tribute.image_url}
                    alt={tribute.alt || tribute.title}
                    className="w-full h-full object-cover grayscale contrast-125"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-black/20 text-xs font-mono">
                    NO IMG
                  </div>
                )}

                {/* بج سبز */}
                <div className="absolute top-3 right-3 bg-[#c8ff00] text-black font-mono text-[10px] font-black px-3 py-1.5 border border-black">
                  ★ TRIBUTE
                </div>

                {/* خط سبز عمودی */}
                <div className="absolute top-0 right-0 w-1 h-full bg-[#c8ff00]" />
              </div>

              {/* لیبل زیر عکس */}
              <div className="mt-4 flex items-center justify-between font-mono text-[10px] tracking-widest uppercase text-neutral-500">
                <span>PORTRAIT // 01</span>
                <span>PUZZLE ARCHIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}