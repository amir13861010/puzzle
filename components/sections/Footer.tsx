import NewsletterForm from "@/components/NewsletterForm";

export default function Footer() {
  return (
    <footer
      className="relative bg-black text-white overflow-hidden pt-24 md:pt-36"
      dir="rtl"
    >
      {/* واترمارک */}
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
        {/* بخش ۱: ستون‌بندی */}
        <div className="py-16 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-12 lg:gap-20 border-b border-white/15">
          {/* ستون برند */}
          <div className="md:col-span-5 space-y-8 lg:pr-4">
            <div className="space-y-4">
              <span
                className="text-4xl md:text-5xl font-black uppercase tracking-tighter inline-block border-r-4 border-[#c8ff00] pr-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                PUZZLEIO.IR
              </span>
              <p
                className="text-base md:text-lg leading-relaxed text-neutral-400 font-light max-w-md pt-2"
                style={{ fontFamily: "var(--font-doran)" }}
              >
                جامعه‌ای غیررسمی، منتقد و رو به رشد برای مدیران محصول، دیزاینرها
                و سازندگان جسور. اینجا باشگاه مدیران محصول جوان است.
              </p>
            </div>

            <div className="font-mono text-xs text-neutral-500 uppercase tracking-widest pt-4">
              LOC: TEHRAN / IR // CO-FOUNDED 2024
            </div>
          </div>

          {/* ستون ناوبری */}
          <div className="md:col-span-3 space-y-6">
            <span className="text-[11px] font-mono font-bold tracking-[0.3em] uppercase text-neutral-500 block mb-8">
              [ 01 // DIRECTORY ]
            </span>
            <ul className="space-y-4">
              {[
                { label: "صفحه اصلی", href: "/" },
                { label: "رویدادها و میت‌آپ‌ها", href: "/events" },
                { label: "دوره‌ها و بوت‌کمپ‌ها", href: "/courses" },
                { label: "محصولات و ابزارها", href: "/store" },
                { label: "کتاب‌خانه تخصصی", href: "/#books" },
                { label: "باشگاه", href: "/club" },
                { label: "ارتباط با ما", href: "/contact" },
                { label: "دربارهٔ ما", href: "/about" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="group inline-flex items-center gap-3 text-neutral-300 hover:text-[#c8ff00] text-base md:text-lg font-bold transition-colors"
                    style={{ fontFamily: "var(--font-doran)" }}
                  >
                    <span className="w-1.5 h-1.5 bg-neutral-600 group-hover:bg-[#c8ff00] transition-colors" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ستون شبکه‌ها و خبرنامه */}
          <div className="md:col-span-4 space-y-12">
            <div className="space-y-6">
              <span className="text-[11px] font-mono font-bold tracking-[0.3em] uppercase text-neutral-500 block mb-6">
                [ 02 // CHANNELS ]
              </span>
              <div className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs md:text-sm text-neutral-300">
                <a
                  href="https://t.me/puzzle_modiarn_mahsol"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-8 hover:text-[#c8ff00] transition-colors"
                >
                  TELEGRAM ↗
                </a>
                <a
                  href="https://www.linkedin.com/company/%D9%BE%D8%A7%D8%B2%D9%84/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-8 hover:text-[#c8ff00] transition-colors"
                >
                  LINKEDIN ↗
                </a>
                <a
                  href="https://www.instagram.com/puzzle_io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-8 hover:text-[#c8ff00] transition-colors"
                >
                  INSTAGRAM ↗
                </a>
              </div>
            </div>

            {/* خبرنامه */}
            <div className="space-y-5 pt-4">
              <span className="text-[11px] font-mono font-bold tracking-[0.3em] uppercase text-neutral-500 block">
                [ 03 // DISPATCH ]
              </span>
              <NewsletterForm />
            </div>
          </div>
        </div>

        {/* بخش ۲: سطر نهایی */}
        <div className="py-12 md:py-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 font-mono text-xs tracking-widest text-neutral-500">
          <div className="flex flex-wrap items-center gap-6 md:gap-10">
            <span className="text-white">© 2025 PUZZLE CLUB</span>
            <span>ALL PROTOCOLS RESERVED</span>
            <span>INDEX: 0.9.4</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c8ff00] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c8ff00]" />
            </span>
            <span className="text-white font-mono uppercase text-[11px]">
              LIVE FROM PRODUCT COMMUNITY
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
