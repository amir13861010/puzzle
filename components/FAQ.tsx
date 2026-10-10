"use client";

import { useState } from "react";

const FAQ_ITEMS = [
  {
    q: "باشگاه مدیران محصول چه کاری انجام می‌دهد؟",
    a: "باشگاه به‌صورت تخصصی روی حوزه‌ی مدیریت محصول فعالیت می‌کند.",
  },
  {
    q: "پازل چیست؟",
    a: "پازل کلاس‌های مهارت‌های نرم و توسعه فردی برگزار می‌کند.",
  },
  {
    q: "آیا کلاس‌ها ضبط می‌شوند؟",
    a: "بله، همه‌ی کلاس‌ها ضبط می‌شوند.",
  },
  {
    q: "کوچینگ باشگاه مدیران محصول چه امکاناتی دارد؟",
    a: `این برنامه برای مدیران محصول و توسعه‌دهندگان کسب‌وکار است که به یک تیم همراه و راهنما نیاز دارند:

• دسترسی کامل: تمام دوره‌های باشگاه در طول ماه رایگان است، به‌همراه ویدیوهای جلسات قبلی.
• تمرکز روی چالش‌ها: پاسخ به سؤالات شخصی‌سازی‌شده و مسائل کاری شما.
• انعطاف زمانی: روز و ساعت جلسات را خودتان تعیین می‌کنید.
• حضور متخصصان: برای چالش‌های عمیق، متخصص همان حوزه به جلسه اضافه می‌شود.
• پشتیبانی مداوم: علاوه بر جلسات آنلاین، پشتیبانی آفلاین هم دارید.`,
  },
  {
    q: "آیا در لینکدین ریکام (توصیه‌نامه) می‌دهید؟",
    a: "بله، در صورتی که یک سال کوچینگ را در باشگاه گذرانده باشید و شرایط لازم را داشته باشید.",
  },
  {
    q: "کلاس‌های باشگاه چه تفاوتی با بقیه دارند؟",
    a: "ما کتاب‌های گران‌قیمت زبان اصلی را به دوره‌هایی مقرون‌به‌صرفه تبدیل کرده‌ایم. هزینه‌ی هر کدام از این کتاب‌ها نزدیک به ۱۰۰ دلار است، اما شما محتوای آن‌ها را در قالب دوره‌ای ارزان‌تر دریافت می‌کنید.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      className="bg-[#f5f5f5] text-black relative overflow-hidden border-b-2 border-black py-16 md:py-24"
      dir="rtl"
    >
      {/* واترمارک‌های بزرگ پس‌زمینه */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        <div
          className="absolute -top-[8%] -left-[5%] text-black/[0.03] font-black text-[24vw] leading-none whitespace-nowrap uppercase tracking-tighter"
          style={{ fontFamily: "var(--font-display)" }}
        >
          FAQ
        </div>
        <div
          className="absolute bottom-4 right-0 text-black/[0.03] font-black text-[14vw] leading-none whitespace-nowrap rotate-[-3deg]"
          style={{ fontFamily: "var(--font-doran)" }}
        >
          سوالات متداول
        </div>
        <div className="absolute top-1/2 -right-8 -translate-y-1/2 rotate-90 text-[11px] font-mono tracking-[0.6em] text-black/20 uppercase whitespace-nowrap">
          QUESTIONS & ANSWERS // PUZZLE CLUB
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        {/* تیتر */}
        <div className="mb-12 md:mb-20">
          <div className="flex items-center justify-between font-mono text-xs font-black uppercase tracking-widest text-neutral-500 mb-6 border-b border-black/20 pb-3">
            <span>[ FAQ // 06 ]</span>
            <span>COMMON QUESTIONS</span>
          </div>

          <h2
            className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] text-black tracking-tighter uppercase"
            style={{ fontFamily: "var(--font-display)" }}
          >
            FAQ'S
            <span
              className="text-3xl md:text-5xl font-black tracking-normal mt-2 block"
              style={{ fontFamily: "var(--font-doran)" }}
            >
              سوالات متداول❋
            </span>
          </h2>
        </div>

        {/* لیست سوالات */}
        <div className="border-t-2 border-black">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="border-b-2 border-black group"
              >
                {/* سوال (دکمه) */}
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full text-right flex items-center gap-4 md:gap-8 py-6 md:py-8 hover:bg-black hover:text-white transition-colors px-2 md:px-4 group-hover:bg-black group-hover:text-white"
                >
                  {/* شماره */}
                  <span
                    className="text-3xl md:text-5xl lg:text-6xl font-black leading-none shrink-0 text-black/10 group-hover:text-white/20 transition-colors"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* متن سوال */}
                  <h3
                    className="flex-1 text-lg md:text-2xl lg:text-3xl font-black leading-tight"
                    style={{ fontFamily: "var(--font-doran)" }}
                  >
                    {item.q}
                  </h3>

                  {/* آیکون + / × */}
                  <span
                    className="text-3xl md:text-5xl font-mono font-black leading-none shrink-0 transition-transform duration-300"
                    style={{
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    +
                  </span>
                </button>

                {/* پاسخ (باز شدنی) */}
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-2 md:px-4 pb-6 md:pb-8 pr-16 md:pr-24">
                      <div className="border-r-2 border-black pr-4 md:pr-6">
                        <p
                          className="text-sm md:text-base leading-loose text-neutral-700 whitespace-pre-line"
                          style={{ fontFamily: "var(--font-doran)" }}
                        >
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* پایین: CTA */}
        <div className="mt-12 md:mt-16 flex items-center justify-between gap-6 flex-wrap">
          <div className="flex items-center gap-4">
            <span className="bg-[#c8ff00] text-black px-3 py-1 border border-black font-mono text-xs font-black">
              MORE QUESTIONS?
            </span>
            <span
              className="text-sm md:text-base text-neutral-600"
              style={{ fontFamily: "var(--font-doran)" }}
            >
              اگه سوال دیگه‌ای داری، بپرس
            </span>
          </div>

          <a
            href="/contact"
            className="group inline-flex items-center gap-4 border-2 border-black bg-white hover:bg-black hover:text-white px-6 md:px-8 py-3.5 md:py-4 transition-all shadow-[4px_4px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
          >
            <span
              className="text-sm md:text-base font-bold"
              style={{ fontFamily: "var(--font-doran)" }}
            >
              تماس با ما ❋
            </span>
            <span className="w-6 h-6 bg-[#c8ff00] flex items-center justify-center text-black text-xs font-bold group-hover:bg-white transition-colors">
              ←
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}