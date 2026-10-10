export default function Footer() {
  return (
    <footer
      className="relative bg-black text-white border-t-2 border-black overflow-hidden pt-10 md:pt-12 lg:pt-16"
      dir="rtl"
    >
      {/* واترمارک پس‌زمینه */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div
          className="absolute -top-[12%] -left-[5%] text-white/[0.025] font-black text-[28vw] leading-none whitespace-nowrap uppercase tracking-tighter"
          style={{ fontFamily: "var(--font-display)" }}
        >
          PUZZLE
        </div>
        <div
          className="absolute bottom-0 right-0 text-white/[0.02] font-black text-[18vw] leading-none whitespace-nowrap"
          style={{ fontFamily: "var(--font-doran)" }}
        >
          پایان
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        
        {/* بدنه اصلی فوتر */}
        <div className="py-24 md:py-32 flex flex-col md:flex-row justify-between items-start gap-16 lg:gap-24 border-b border-white/15">
          
          {/* ستون ۱: برند */}
          <div className="w-full md:w-[32%] space-y-16">
            <span
              className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter inline-block border-r-4 border-[#c8ff00] pr-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              PUZZLE.CLUB
            </span>
            <p
              className="text-base md:text-lg leading-loose text-neutral-400 font-light max-w-sm"
              style={{ fontFamily: "var(--font-doran)" }}
            >
              جامعه‌ای غیررسمی، منتقد و رو به رشد برای مدیران محصول، دیزاینرها
              و سازندگان جسور.
            </p>
            <div className="font-mono text-sm text-neutral-500 uppercase tracking-[0.2em] pt-4">
              LOC: TEHRAN / IR // CO-FOUNDED 2024
            </div>
          </div>

          {/* ستون ۲: ناوبری */}
          <div className="w-full md:w-[22%] space-y-10">
            <span className="text-[12px] font-mono font-bold tracking-[0.4em] uppercase text-neutral-500 block mb-10">
              [ 01 // DIRECTORY ]
            </span>
            <ul className="space-y-10">
              {[
                { label: "صفحه اصلی", href: "/" },
                { label: "رویدادها و میت‌آپ‌ها", href: "/events" },
                { label: "دوره‌ها و بوت‌کمپ‌ها", href: "/courses" },
                { label: "محصولات و ابزارها", href: "/store" },
                { label: "کتاب‌خانه تخصصی", href: "/books" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="group inline-flex items-center gap-5 text-neutral-300 hover:text-[#c8ff00] text-base md:text-lg font-bold transition-all hover:-translate-x-2"
                    style={{ fontFamily: "var(--font-doran)" }}
                  >
                    <span className="w-2 h-2 bg-neutral-600 group-hover:bg-[#c8ff00] transition-colors" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ستون ۳: شبکه‌ها و خبرنامه */}
          <div className="w-full md:w-[32%] space-y-20">
            <div className="space-y-12">
              <span className="text-[12px] font-mono font-bold tracking-[0.4em] uppercase text-neutral-500 block">
                [ 02 // CHANNELS ]
              </span>
              <div className="flex flex-col gap-y-6 font-mono text-sm md:text-base text-neutral-300">
                <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-8 hover:text-[#c8ff00] transition-colors w-fit">TELEGRAM ↗</a>
                <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-8 hover:text-[#c8ff00] transition-colors w-fit">LINKEDIN ↗</a>
                <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-8 hover:text-[#c8ff00] transition-colors w-fit">INSTAGRAM ↗</a>
              </div>
            </div>

            <div className="space-y-12">
              <span className="text-[12px] font-mono font-bold tracking-[0.4em] uppercase text-neutral-500 block">
                [ 03 // DISPATCH ]
              </span>
              <form className="relative flex items-center border-b-2 border-white/30 focus-within:border-[#c8ff00] transition-colors pb-4">
                <input
                  type="email"
                  placeholder="ایمیل خود را وارد کنید..."
                  className="w-full bg-transparent text-sm md:text-base text-white placeholder-neutral-600 outline-none font-mono py-2"
                  dir="rtl"
                />
                <button
                  type="submit"
                  className="shrink-0 bg-white hover:bg-[#c8ff00] text-black font-mono font-bold text-xs uppercase px-6 py-3 border border-black transition-all"
                >
                  JOIN
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* سطر نهایی */}
        <div className="py-12 md:py-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 font-mono text-xs tracking-widest text-neutral-500">
          <div className="flex flex-wrap items-center gap-8 md:gap-12">
            <span className="text-white">© {new Date().getFullYear()} PUZZLE CLUB</span>
            <span>ALL PROTOCOLS RESERVED</span>
            <span>INDEX: 0.9.4</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c8ff00] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c8ff00]" />
            </span>
            <span className="text-white font-mono uppercase text-[11px]">LIVE FROM PRODUCT COMMUNITY</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
