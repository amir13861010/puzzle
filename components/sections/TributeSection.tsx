type TributeItem = {
  id: string;
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
      className="bg-[#f5f5f5] text-black relative overflow-hidden border-b-2 border-black py-20 md:py-28"
      dir="rtl"
    >
      {/* واترمارک ساده پس‌زمینه */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        <div
          className="absolute -top-[8%] -left-[5%] text-black/[0.035] font-black text-[22vw] leading-none whitespace-nowrap uppercase tracking-tighter"
          style={{ fontFamily: "var(--font-display)" }}
        >
          TRIBUTE
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        {/* لیبل بالا */}
        <div className="flex items-center justify-between font-mono text-xs font-black uppercase tracking-widest text-neutral-500 mb-12 md:mb-16 border-b border-black/20 pb-3">
          <span>[ TRIBUTE // 07 ]</span>
          <span>IN MEMORY</span>
        </div>

        {/* محتوای اصلی: متن راست، عکس چپ */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
          {/* متن — راست */}
          <div className="md:col-span-7 lg:col-span-8">
            {/* تیتر */}
            <h2
              className="font-black leading-[1.2] text-black tracking-tight mb-8 md:mb-10"
              style={{
                fontFamily: "var(--font-doran)",
                fontSize: "clamp(1.5rem, 2.5vw, 2.75rem)",
              }}
            >
              {tribute.title}
            </h2>

            {/* خط جداکننده */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-0.5 bg-black" />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-500">
                STORY
              </span>
            </div>

            {/* متن کامل */}
            {tribute.description && (
              <p
                className="text-neutral-700 whitespace-pre-line max-w-2xl"
                style={{
                  fontFamily: "var(--font-doran)",
                  fontSize: "clamp(0.9rem, 1vw, 1.05rem)",
                  lineHeight: "2",
                  fontWeight: 400,
                }}
              >
                {tribute.description}
              </p>
            )}

            {/* امضا */}
            <div className="mt-10 pt-6 border-t border-black/10">
              <div className="font-mono text-[10px] tracking-widest uppercase text-neutral-500">
                PUZZLE CLUB
              </div>
              <div className="font-mono text-[10px] tracking-widest uppercase text-black mt-1">
                IN MEMORY OF A BUILDER
              </div>
            </div>
          </div>

          {/* عکس — چپ */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 border border-black/20">
              {tribute.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={tribute.image_url}
                  alt={tribute.alt || tribute.title}
                  className="w-full h-full object-cover grayscale contrast-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-black/20 text-xs font-mono">
                  NO IMG
                </div>
              )}

              {/* بج کوچیک */}
              <div className="absolute top-3 right-3 bg-[#c8ff00] text-black font-mono text-[9px] font-black px-2 py-0.5 border border-black">
                ★ TRIBUTE
              </div>
            </div>

            {/* لیبل زیر عکس */}
            <div className="mt-3 flex items-center justify-between font-mono text-[10px] tracking-widest uppercase text-neutral-500">
              <span>PORTRAIT</span>
              <span>PUZZLE ARCHIVE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}