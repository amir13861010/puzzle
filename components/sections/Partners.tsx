export default function Partners() {
  return (
    <section className="bg-white relative py-16 md:py-24 lg:py-32 px-4 sm:px-6 overflow-hidden border-b-2 border-black">
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div
          className="absolute top-0 -left-[5%] text-black/[0.03] font-black text-[28vw] md:text-[22vw] leading-none whitespace-nowrap uppercase"
          style={{ fontFamily: "var(--font-display)" }}
        >
          PARTNERS
        </div>
        <div
          className="absolute -bottom-8 -right-8 text-black/[0.03] font-black text-[18vw] leading-none whitespace-nowrap"
          style={{ fontFamily: "var(--font-doran)" }}
        >
          اسپانسرها
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto relative z-10">
        <div className="mb-12 md:mb-20 lg:mb-28 relative" dir="rtl">
          <p
            className="text-xs md:text-sm lg:text-base tracking-[0.3em] md:tracking-[0.4em] uppercase text-neutral-400 mb-4 md:mb-6 font-mono"
          >
            05 — Our Partners ❋
          </p>
          <h2
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-black leading-[1]"
            style={{
              fontFamily: "var(--font-doran)",
              transform: "rotate(-1deg)",
            }}
          >
            حامیان ما
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 lg:gap-16 items-center">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="group relative aspect-[4/3] border-2 border-black bg-white flex items-center justify-center transition-all duration-300 hover:shadow-[8px_8px_0px_#000] hover:-translate-y-1 overflow-hidden"
              style={{ transform: `rotate(${(i - 2) * 1.5}deg)` }}
            >
              <div className="absolute top-2 left-2 font-mono text-[10px] font-black bg-black text-white px-2 py-0.5">
                TIER // 0{i}
              </div>
              <div className="text-center p-4">
                <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 border-2 border-black bg-neutral-100 mx-auto mb-4 md:mb-6 group-hover:bg-[#c8ff00] group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 flex items-center justify-center font-mono font-black text-xl">
                  LOGO
                </div>
                <div className="text-base md:text-lg lg:text-2xl font-black text-black transition-colors duration-300">
                  {i === 1
                    ? "اسپانسر اول"
                    : i === 2
                    ? "اسپانسر دوم"
                    : "اسپانسر سوم"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}