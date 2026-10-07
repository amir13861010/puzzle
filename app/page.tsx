import { ChevronDown, ArrowUpRight, Asterisk } from "lucide-react";

export default function Home() {
  return (
    <main className="bg-black overflow-x-hidden">
      {/* ============ بخش ۱: Hero مشکی ============ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-24">
        {/* ویدیو پس‌زمینه */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        >
          <source src="/hero-video.MOV" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/60" />

        {/* متن‌های شناور توی پس‌زمینه (ghost text) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-[15%] -left-[5%] text-white/[0.04] font-display font-bold text-[15vw] leading-none whitespace-nowrap"
            style={{ fontFamily: "var(--font-display)" }}
          >
            PUZZLE PUZZLE
          </div>
          <div
            className="absolute bottom-[10%] -right-[5%] text-white/[0.04] text-[12vw] leading-none whitespace-nowrap"
            style={{ fontFamily: "var(--font-doran)" }}
          >
            پازل پازل
          </div>
        </div>

        {/* متن اصلی */}
        <div
          className="relative z-10 text-center px-4 sm:px-6 w-full"
          dir="rtl"
        >
          {/* خط بالای متن */}
          <div className="flex items-center justify-center gap-3 md:gap-4 mb-4 md:mb-6 text-white/50">
            <div className="w-8 md:w-12 h-px bg-white/30" />
            <span
              className="text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] uppercase"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              از ۱۴۰۳
            </span>
            <div className="w-8 md:w-12 h-px bg-white/30" />
          </div>

          {/* متن پازل — چرخیده و بزرگ */}
          <h1
            className="text-white text-[26vw] sm:text-[24vw] md:text-[20vw] lg:text-[18vw] leading-[0.85] font-black tracking-tighter select-none relative"
            style={{
              fontFamily: "var(--font-doran)",
              transform: "rotate(-2deg)",
            }}
          >
            پازل
          </h1>

          {/* متن بزرگ زیرش */}
          <div
            className="text-white text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black mt-8 md:mt-20 lg:mt-24 leading-tight md:whitespace-nowrap"
            style={{
              fontFamily: "var(--font-doran)",
              transform: "rotate(1deg)",
            }}
          >
            باشگاه مدیران محصول جوان
          </div>
        </div>

        {/* آیکون اسکرول */}
        <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 md:gap-3 text-white/60">
          <span
            className="text-[10px] tracking-[0.3em] md:tracking-[0.4em] uppercase"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Scroll
          </span>
          <ChevronDown
            className="w-4 h-4 md:w-5 md:h-5 animate-bounce"
            strokeWidth={1.5}
          />
        </div>

        {/* علامت گوشه بالا-راست */}
        <div className="hidden md:block absolute top-32 right-12 text-white/30 z-10">
          <Asterisk className="w-6 h-6 animate-spin-slow" />
        </div>

        {/* علامت گوشه پایین-چپ */}
        <div className="hidden md:block absolute bottom-32 left-12 text-white/30 z-10">
          <ArrowUpRight className="w-6 h-6" />
        </div>
      </section>

      {/* ============ بخش ۲: سفید — حامیان ما ============ */}
      <section className="min-h-screen bg-white relative py-16 md:py-24 lg:py-32 px-4 sm:px-6 overflow-hidden">
        {/* متن ghost بزرگ پشت */}
        <div
          className="absolute top-0 left-0 text-black/[0.03] font-black text-[30vw] md:text-[22vw] leading-none pointer-events-none select-none"
          style={{ fontFamily: "var(--font-doran)" }}
        >
          حامیان
        </div>

        <div className="w-full max-w-7xl mx-auto relative z-10">
          {/* تیتر */}
          <div className="mb-12 md:mb-20 lg:mb-28 relative" dir="rtl">
            <p
              className="text-xs md:text-sm lg:text-base tracking-[0.3em] md:tracking-[0.4em] uppercase text-neutral-400 mb-4 md:mb-6"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              01 — Our Partners
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

          {/* اسپانسرها */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 lg:gap-16 items-center">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="group relative aspect-[4/3] rounded-2xl md:rounded-3xl border-2 border-neutral-200 bg-neutral-50 flex items-center justify-center hover:border-black hover:bg-white transition-all duration-500 overflow-hidden hover:shadow-2xl"
                style={{
                  transform: `rotate(${(i - 2) * 1.5}deg)`,
                }}
              >
                <div className="text-center p-4">
                  <div className="w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-2xl md:rounded-3xl bg-neutral-200 mx-auto mb-4 md:mb-6 group-hover:bg-black group-hover:scale-110 group-hover:rotate-6 transition-all duration-500" />
                  <div className="text-base md:text-lg lg:text-2xl font-bold text-neutral-300 group-hover:text-black transition-colors duration-300">
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
    </main>
  );
}