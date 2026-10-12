"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Coach = {
  id: string;
  name: string;
  role: string | null;
  description: string | null;
  image_url: string | null;
  alt: string | null;
};

export default function CoachesSection({ coaches }: { coaches: Coach[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // تغییر خودکار هر ۶ ثانیه
  useEffect(() => {
    if (coaches.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % coaches.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [coaches.length, isPaused]);

  const goTo = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % coaches.length);
  }, [coaches.length]);

  const prev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + coaches.length) % coaches.length);
  }, [coaches.length]);

  if (coaches.length === 0) return null;

  return (
    <section
      className="bg-[#0f0f0f] text-white relative overflow-hidden border-b-2 border-black py-16 md:py-24"
      dir="rtl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* واترمارک */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        <div
          className="absolute top-0 right-0 text-white/[0.025] font-black text-[22vw] leading-none whitespace-nowrap uppercase tracking-tighter"
          style={{ fontFamily: "var(--font-display)" }}
        >
          COACHES
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        {/* لیبل بالا */}
        <div className="flex items-center justify-between font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-10 md:mb-14 border-b border-white/10 pb-3">
          <span>[ COACHES // 08 ]</span>
          <span>OUR TEAM · {String(activeIndex + 1).padStart(2, "0")} / {String(coaches.length).padStart(2, "0")}</span>
        </div>

        {/* اسلایدر */}
        <div className="relative">
          {/* اسلایدها */}
          <div className="relative overflow-hidden">
            {coaches.map((coach, i) => {
              const isActive = i === activeIndex;
              return (
                <div
                  key={coach.id}
                  className={`transition-all duration-700 ease-out ${
                    isActive
                      ? "relative opacity-100 translate-x-0"
                      : "absolute inset-0 opacity-0 translate-x-8 pointer-events-none"
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
                    {/* عکس — چپ */}
                    <div className="md:col-span-5 lg:col-span-4">
                      <div className="relative">
                        <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900 border border-white/10">
                          {coach.image_url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={coach.image_url}
                              alt={coach.alt || coach.name}
                              className="w-full h-full object-cover grayscale contrast-105"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-white/20 text-xs font-mono">
                              NO IMG
                            </div>
                          )}
                        </div>

                        {/* شماره گوشه */}
                        <div className="absolute top-3 right-3 bg-[#c8ff00] text-black font-mono text-[9px] font-black px-2 py-0.5">
                          ★ {String(i + 1).padStart(2, "0")}
                        </div>
                      </div>

                      {/* لیبل زیر عکس */}
                      <div className="mt-3 flex items-center justify-between font-mono text-[10px] tracking-[0.2em] uppercase text-white/40">
                        <span>PORTRAIT</span>
                        <span>COACH · {String(i + 1).padStart(2, "0")}</span>
                      </div>
                    </div>

                    {/* متن — راست */}
                    <div className="md:col-span-7 lg:col-span-8">
                      {/* نام */}
                      <h3
                        className="font-black leading-[1.1] text-white tracking-tight mb-3 md:mb-4"
                        style={{
                          fontFamily: "var(--font-doran)",
                          fontSize: "clamp(1.75rem, 3vw, 3rem)",
                        }}
                      >
                        {coach.name}
                      </h3>

                      {/* سِمت */}
                      {coach.role && (
                        <div className="flex items-center gap-3 mb-8">
                          <span className="w-1.5 h-1.5 bg-[#c8ff00] rounded-full" />
                          <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/50">
                            {coach.role}
                          </span>
                        </div>
                      )}

                      {/* توضیحات */}
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
                          PUZZLE CLUB · COACHES TEAM
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* کنترل‌ها */}
          {coaches.length > 1 && (
            <div className="flex items-center justify-between gap-6 mt-12 md:mt-16 pt-6 border-t border-white/10">
              {/* دکمه‌های prev/next */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="قبلی"
                  className="w-10 h-10 md:w-12 md:h-12 border border-white/20 hover:border-[#c8ff00] hover:bg-[#c8ff00] hover:text-black flex items-center justify-center transition-all"
                >
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="بعدی"
                  className="w-10 h-10 md:w-12 md:h-12 border border-white/20 hover:border-[#c8ff00] hover:bg-[#c8ff00] hover:text-black flex items-center justify-center transition-all"
                >
                  <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>

              {/* Dot indicators */}
              <div className="flex items-center gap-2 md:gap-3">
                {coaches.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`مربی ${i + 1}`}
                    className={`transition-all duration-300 ${
                      i === activeIndex
                        ? "w-8 md:w-12 h-1 bg-[#c8ff00]"
                        : "w-4 md:w-6 h-1 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>

              {/* شماره */}
              <div className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/40">
                {String(activeIndex + 1).padStart(2, "0")} / {String(coaches.length).padStart(2, "0")}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}