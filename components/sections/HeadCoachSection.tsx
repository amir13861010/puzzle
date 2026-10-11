type HeadCoachItem = {
  id: number;
  image_url: string | null;
  alt: string | null;
  title: string | null;
  name: string | null;
  role: string | null;
  description: string | null;
};

export default function HeadCoachSection({
  coach,
}: {
  coach: HeadCoachItem | null;
}) {
  if (!coach || !coach.title) return null;

  return (
    <section
      className="bg-[#1a1a1a] text-white relative overflow-hidden border-b-2 border-black py-20 md:py-28"
      dir="rtl"
    >
      {/* واترمارک ساده پس‌زمینه */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        <div
          className="absolute -top-[8%] -left-[5%] text-white/[0.035] font-black text-[22vw] leading-none whitespace-nowrap uppercase tracking-tighter"
          style={{ fontFamily: "var(--font-display)" }}
        >
          HEAD COACH
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        {/* لیبل بالا */}
        <div className="flex items-center justify-between font-mono text-xs font-black uppercase tracking-widest text-white/50 mb-12 md:mb-16 border-b border-white/20 pb-3">
          <span>[ HEAD COACH // 06 ]</span>
          <span>THE LEADER</span>
        </div>

        {/* محتوای اصلی: متن راست، عکس چپ */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
          {/* متن — راست */}
          <div className="md:col-span-7 lg:col-span-8">
            {/* تیتر */}
            <h2
              className="font-black leading-[1.2] text-white tracking-tight mb-4 md:mb-6"
              style={{
                fontFamily: "var(--font-doran)",
                fontSize: "clamp(1.5rem, 2.5vw, 2.75rem)",
              }}
            >
              {coach.title}
            </h2>

            {/* نام + سِمت */}
            {(coach.name || coach.role) && (
              <div className="flex items-center gap-3 flex-wrap mb-8 md:mb-10">
                {coach.name && (
                  <span
                    className="text-lg md:text-2xl font-black text-[#c8ff00]"
                    style={{ fontFamily: "var(--font-doran)" }}
                  >
                    {coach.name}
                  </span>
                )}
                {coach.role && (
                  <>
                    <span className="text-white/30">/</span>
                    <span
                      className="text-sm md:text-base text-white/70"
                      style={{ fontFamily: "var(--font-doran)" }}
                    >
                      {coach.role}
                    </span>
                  </>
                )}
              </div>
            )}

            {/* خط جداکننده */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-0.5 bg-[#c8ff00]" />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/50">
                STORY
              </span>
            </div>

            {/* متن کامل */}
            {coach.description && (
              <p
                className="text-white/80 whitespace-pre-line max-w-2xl"
                style={{
                  fontFamily: "var(--font-doran)",
                  fontSize: "clamp(0.9rem, 1vw, 1.05rem)",
                  lineHeight: "2",
                  fontWeight: 400,
                }}
              >
                {coach.description}
              </p>
            )}

            {/* امضا */}
            <div className="mt-10 pt-6 border-t border-white/10">
              <div className="font-mono text-[10px] tracking-widest uppercase text-white/50">
                PUZZLE CLUB
              </div>
              <div className="font-mono text-[10px] tracking-widest uppercase text-white mt-1">
                HEAD COACH SINCE 2024
              </div>
            </div>
          </div>

          {/* عکس — چپ */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="relative aspect-[3/4] overflow-hidden bg-neutral-800 border border-white/20">
              {coach.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={coach.image_url}
                  alt={coach.alt || coach.title}
                  className="w-full h-full object-cover grayscale contrast-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/20 text-xs font-mono">
                  NO IMG
                </div>
              )}

              {/* بج کوچیک */}
              <div className="absolute top-3 right-3 bg-[#c8ff00] text-black font-mono text-[9px] font-black px-2 py-0.5 border border-black">
                ★ HEAD COACH
              </div>
            </div>

            {/* لیبل زیر عکس */}
            <div className="mt-3 flex items-center justify-between font-mono text-[10px] tracking-widest uppercase text-white/50">
              <span>PORTRAIT</span>
              <span>THE LEADER</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}