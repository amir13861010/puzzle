
export default function Footer() {
  return (
    <footer
      className="relative bg-black text-white border-t-2 border-black overflow-hidden pt-16 md:pt-24"
      dir="rtl"
    >
      {/* متن پس‌زمینه بزرگ */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div
          className="absolute -top-10 -left-10 text-white/[0.05] font-black text-[25vw] leading-none whitespace-nowrap uppercase tracking-tighter"
          style={{ fontFamily: "var(--font-display)" }}
        >
          PUZZLE
        </div>
        <div
          className="absolute bottom-10 right-0 text-white/[0.03] font-black text-[15vw] leading-none whitespace-nowrap rotate-[-5deg]"
          style={{ fontFamily: "var(--font-doran)" }}
        >
          باشگاه مدیران
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        {/* بخش بالای فوتر */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b-2 border-white/20">
          {/* ستون ۱: درباره */}
          <div className="space-y-6">
            <h4
              className="text-2xl font-black uppercase border-l-4 border-[#c8ff00] pl-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              پازل ❋
            </h4>
            <p
              className="text-sm leading-relaxed text-white/60"
              style={{ fontFamily: "var(--font-doran)" }}
            >
              جامعه‌ای برای رشد مدیران محصول جوان. ما اینجا هستیم تا مرزهای
              سنتی مدیریت محصول را جابه‌جا کنیم.
            </p>
          </div>

          {/* ستون ۲: لینک‌های سریع */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-white/40 mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {["خانه", "دوره‌ها", "محصولات", "رویدادها"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="flex items-center gap-2 hover:text-[#c8ff00] transition-colors font-bold text-lg"
                    style={{ fontFamily: "var(--font-doran)" }}
                  >
                    <span className="w-1.5 h-1.5 bg-white/20" /> {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ستون ۳: شبکه‌های اجتماعی */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-white/40 mb-6">
              Social
            </h4>
            <ul className="space-y-3 font-mono text-sm underline underline-offset-4 text-white/70">
              <li>
                <a href="#" className="hover:text-[#c8ff00] transition-colors">
                  INSTAGRAM
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#c8ff00] transition-colors">
                  LINKEDIN
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#c8ff00] transition-colors">
                  TELEGRAM
                </a>
              </li>
            </ul>
          </div>

          {/* ستون ۴: خبرنامه */}
          <div className="bg-white/5 border border-white/10 p-6">
            <h4 className="text-sm font-bold mb-4 font-mono">JOIN THE LIST</h4>
            <input
              type="email"
              placeholder="EMAIL ADDRESS"
              className="w-full bg-transparent border-b-2 border-white/30 py-2 mb-4 focus:border-[#c8ff00] outline-none font-mono text-sm"
            />
            <button
              type="button"
              className="w-full bg-[#c8ff00] text-black font-black py-3 px-4 uppercase hover:bg-white transition-all shadow-[4px_4px_0px_#fff] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
            >
              ثبت‌نام ❋
            </button>
          </div>
        </div>

        {/* بخش پایین فوتر */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] md:text-xs font-mono text-white/40 uppercase tracking-[0.2em]">
          <div className="flex gap-8">
            <span>© 2025 PUZZLE CLUB</span>
            <span>ALL RIGHTS RESERVED</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            SYSTEM STATUS: ONLINE
          </div>
          <div className="flex gap-4">
            <span>DESIGN BY [YOU]</span>
          </div>
        </div>
      </div>
    </footer>
  );
}