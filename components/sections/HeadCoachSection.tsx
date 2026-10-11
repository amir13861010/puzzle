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
      className="bg-[#0f0f0f] text-white relative overflow-hidden border-b-2 border-black py-16 md:py-24"
      dir="rtl"
    >
      {/* واترمارک بسیار محو */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        <div
          className="absolute top-0 right-0 text-white/[0.025] font-black text-[18vw] leading-none whitespace-nowrap uppercase tracking-tighter"
          style={{ fontFamily: "var(--font-display)" }}
        >
          COACH
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        {/* لیبل بالا */}
        <div className="flex items-center justify-between font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-10 md:mb-14 border-b border-white/10 pb-3">
          <span>[ HEAD COACH // 06 ]</span>
          <span>THE LEADER</span>
        </div>

        {/* محتوای اصلی: متن راست، عکس چپ */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
          {/* متن — راست */}
          <div className="md:col-span-7 lg:col-span-8">
            {/* تیتر */}
            <h2
              className="font-black leading-[1.25] text-white tracking-tight mb-6 md:mb-8"
              style={{
                fontFamily: "var(--font-doran)",
                fontSize: "clamp(1.5rem, 2.2vw, 2.25rem)",
              }}
            >
              {coach.title}
            </h2>

            {/* نام + سِمت */}
            {(coach.name || coach.role) && (
              <div className="flex items-center gap-3 flex-wrap mb-8 md:mb-10">
                {coach.name && (
                  <span
                    className="text-base md:text-lg font-bold text-[#c8ff00]"
                    style={{ fontFamily: "var(--font-doran)" }}
                  >
                    {coach.name}
                  </span>
                )}
                {coach.role && (
                  <>
                    <span className="text-white/20">—</span>
                    <span
                      className="text-xs md:text-sm text-white/50"
                      style={{ fontFamily: "var(--font-doran)" }}
                    >
                      {coach.role}
                    </span>
                  </>
                )}
              </div>
            )}

            {/* متن کامل */}
            {coach.description && (
              <p
                className="text-white/70 whitespace-pre-line max-w-2xl"
                style={{
                  fontFamily: "var(--font-doran)",
                  fontSize: "clamp(0.9rem, 1vw, 1rem)",
                  lineHeight: "2",
                  fontWeight: 400,
                }}
              >
                {coach.description}
              </p>
            )}

            {/* امضا */}
            <div className="mt-10 md:mt-12 pt-6 border-t border-white/10 flex items-center gap-4">
              <span className="w-1.5 h-1.5 bg-[#c8ff00] rounded-full" />
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40">
                PUZZLE CLUB · SINCE 2024
              </div>
            </div>
          </div>

          {/* عکس — چپ */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="relative">
              {/* عکس */}
              <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900 border border-white/10">
                {coach.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={coach.image_url}
                    alt={coach.alt || coach.title}
                    className="w-full h-full object-cover grayscale contrast-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/20 text-xs font-mono">
                    NO IMG
                  </div>
                )}
              </div>

              {/* بج گوشه */}
              <div className="absolute top-3 right-3 bg-[#c8ff00] text-black font-mono text-[9px] font-black px-2 py-0.5">
                ★ 06
              </div>
            </div>

            {/* لیبل زیر عکس */}
            <div className="mt-3 flex items-center justify-between font-mono text-[10px] tracking-[0.2em] uppercase text-white/40">
              <span>PORTRAIT</span>
              <span>2024 — NOW</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}