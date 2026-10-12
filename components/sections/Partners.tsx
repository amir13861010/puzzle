const TIERS = [
  {
    label: "اسپانسر پلاتینیوم",
    sublabel: "PLATINUM SPONSOR",
    sponsors: [
      { name: "HAMERZ", logo: null },
    ],
  },
  {
    label: "اسپانسر طلایی",
    sublabel: "GOLD SPONSOR",
    sponsors: [
      { name: "SPONSOR 02", logo: null },
    ],
  },
  {
    label: "اسپانسر نقره‌ای",
    sublabel: "SILVER SPONSOR",
    sponsors: [
      { name: "SPONSOR 03", logo: null },
    ],
  },
];

export default function Partners() {
  return (
    <section
      className="bg-[#fafafa] text-black relative overflow-hidden border-b-2 border-black"
      dir="rtl"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* تیتر SPONSOR */}
        <div className="pt-16 md:pt-24 pb-8 md:pb-12 border-b-2 border-black">
          <h2
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black text-black leading-[0.85] tracking-tighter uppercase"
            style={{ fontFamily: "var(--font-display)" }}
          >
            SPONSOR
          </h2>
          <p
            className="mt-4 md:mt-6 text-sm md:text-base text-neutral-500 font-mono tracking-widest uppercase"
          >
            OUR PARTNERS / 2025
          </p>
        </div>

        {/* ردیف‌های tier */}
        {TIERS.map((tier, tierIndex) => (
          <div key={tier.label}>
            {/* لیبل tier */}
            <div className="py-5 md:py-7 border-b border-black/30">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <h3
                  className="text-xl md:text-3xl font-black text-black"
                  style={{ fontFamily: "var(--font-doran)" }}
                >
                  {tier.label}
                </h3>
                <span className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-neutral-400">
                  {tier.sublabel}
                </span>
              </div>
            </div>

            {/* محتوای sponsors — وسط */}
            <div className="py-16 md:py-24 border-b-2 border-black flex items-center justify-center">
              {tier.sponsors.length === 1 ? (
                <div className="text-center">
                  <div
                    className="text-4xl md:text-6xl lg:text-7xl font-black text-black tracking-tighter"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {tier.sponsors[0].name}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 md:gap-20 items-center justify-items-center w-full">
                  {tier.sponsors.map((s) => (
                    <div
                      key={s.name}
                      className="text-2xl md:text-4xl font-black text-black tracking-tight"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {s.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* متن پایانی */}
        <div className="py-8 md:py-12 border-b-2 border-black">
          <p
            className="text-sm md:text-base text-neutral-600 leading-loose max-w-2xl mr-auto"
            style={{ fontFamily: "var(--font-doran)" }}
          >
            دارای امتیاز از شرایط اسپانسرشیپ باشگاه پازل؛ برای اطلاعات بیشتر با ما
            در تماس باشید.
          </p>
        </div>
      </div>
    </section>
  );
}