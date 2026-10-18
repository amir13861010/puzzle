import Link from "next/link";
import { ArrowRight, Home, FileQuestion, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <main
          className="bg-[#f5f5f5] text-black overflow-hidden selection:bg-[#c8ff00] selection:text-black min-h-screen relative font-sans flex items-center justify-center"
          dir="rtl"
        >
          {/* واترمارک */}
          <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
            <div
              className="absolute -top-[5%] -left-[10%] text-black/[0.035] font-black text-[28vw] leading-none whitespace-nowrap uppercase tracking-tighter"
              style={{ fontFamily: "var(--font-display)" }}
            >
              LOST IN VOID
            </div>
            <div
              className="absolute bottom-0 -right-[5%] text-black/[0.03] font-black text-[22vw] leading-none whitespace-nowrap"
              style={{ fontFamily: "var(--font-display)" }}
            >
              404 ERROR
            </div>
          </div>

          <section className="relative z-10 w-full px-6 py-16 md:py-24 pt-32 md:pt-40">
            <div className="max-w-2xl w-full mx-auto">
              {/* کارت اصلی */}
              <div className="border-2 border-black bg-white shadow-[10px_10px_0px_#000] p-6 sm:p-10 md:p-12 relative">
                {/* برچسب بالا */}
                <div className="absolute -top-4 right-6 bg-[#c8ff00] text-black border-2 border-black px-3 py-0.5 font-mono text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_#000]">
                  ERR_CODE // MISSING_PATH
                </div>

                {/* عدد 404 */}
                <div className="flex items-center justify-between border-b-2 border-black pb-8 mb-8">
                  <h1
                    className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter leading-none text-black select-none"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    4
                    <span className="bg-[#c8ff00] px-2 border-2 border-black">
                      0
                    </span>
                    4
                  </h1>
                  <div className="hidden sm:flex flex-col items-end gap-1 font-mono text-[11px] text-neutral-500 text-left">
                    <span>[HTTP_RESPONSE]</span>
                    <span>DESTINATION: UNKNOWN</span>
                    <span>SIGNAL: INTERRUPTED</span>
                    <Terminal className="w-5 h-5 text-black mt-2" />
                  </div>
                </div>

                {/* تیتر و توضیحات */}
                <div className="space-y-4 mb-10">
                  <h2
                    className="text-2xl sm:text-3xl md:text-4xl font-black text-black leading-tight"
                    style={{ fontFamily: "var(--font-doran)" }}
                  >
                    این صفحه به مقصد نرسید ❋
                  </h2>
                  <p
                    className="text-base sm:text-lg text-neutral-700 leading-relaxed font-medium"
                    style={{ fontFamily: "var(--font-doran)" }}
                  >
                    مسیری که دنبالش بودید جابه‌جا شده، حذف گردیده یا شاید اصلاً
                    هیچ‌وقت خلق نشده است. نگران نباشید، محتوای اصلی هنوز سر جای
                    خودش است.
                  </p>
                </div>

                {/* دکمه‌ها */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 border-t-2 border-black/10">
                  <Link
                    href="/"
                    className="group flex-1 inline-flex items-center justify-center gap-3 border-2 border-black bg-black text-white hover:bg-[#c8ff00] hover:text-black px-6 py-4 transition-all shadow-[4px_4px_0px_#c8ff00] active:translate-x-0.5 active:translate-y-0.5"
                    style={{ fontFamily: "var(--font-doran)" }}
                  >
                    <Home className="w-5 h-5" />
                    <span className="text-base font-black">
                      بازگشت به صفحه اصلی
                    </span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  </Link>

                  <Link
                    href="/store"
                    className="flex-1 inline-flex items-center justify-center gap-2 border-2 border-black bg-white hover:bg-neutral-100 px-6 py-4 transition-all shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 text-black"
                    style={{ fontFamily: "var(--font-doran)" }}
                  >
                    <FileQuestion className="w-5 h-5" />
                    <span className="text-base font-bold">رفتن به فروشگاه</span>
                  </Link>
                </div>
              </div>

              {/* نوار زیر کارت */}
              <div className="mt-6 flex items-center justify-between font-mono text-[11px] text-neutral-500 uppercase px-2">
                <span>TERMINAL // STANDBY MODE</span>
                <span className="tracking-widest">PRESS ANY LINK TO REBOOT</span>
              </div>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
