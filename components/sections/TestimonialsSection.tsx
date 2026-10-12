"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, MessageSquare, Video, Play } from "lucide-react";

type Testimonial = {
  id: string;
  type: "text" | "video";
  name: string;
  role: string | null;
  quote: string | null;
  image_url: string | null;
  video_url: string | null;
  alt: string | null;
};

export default function TestimonialsSection({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (testimonials.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [testimonials.length, isPaused]);

  const goTo = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  if (testimonials.length === 0) return null;

  return (
    <section
      className="bg-[#f5f5f5] text-black relative overflow-hidden border-b-2 border-black py-16 md:py-24"
      dir="rtl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* واترمارک */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        <div
          className="absolute top-0 right-0 text-black/[0.03] font-black text-[22vw] leading-none whitespace-nowrap uppercase tracking-tighter"
          style={{ fontFamily: "var(--font-display)" }}
        >
          VOICES
        </div>
        <div
          className="absolute -bottom-[5%] left-0 text-black/[0.025] font-black text-[22vw] leading-none whitespace-nowrap rotate-[-3deg]"
          style={{ fontFamily: "var(--font-doran)" }}
        >
          تجربه باشگاه
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        {/* لیبل بالا */}
        <div className="flex items-center justify-between font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-neutral-500 mb-12 md:mb-16 border-b border-black/15 pb-3">
          <span>[ TESTIMONIALS // 09 ]</span>
          <span>
            VOICES · {String(activeIndex + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
          </span>
        </div>

        {/* اسلایدر */}
        <div className="relative">
          <div className="relative overflow-hidden">
            {testimonials.map((t, i) => {
              const isActive = i === activeIndex;
              return (
                <div
                  key={t.id}
                  className={`transition-all duration-700 ease-out ${
                    isActive
                      ? "relative opacity-100 translate-x-0"
                      : "absolute inset-0 opacity-0 translate-x-8 pointer-events-none"
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
                    {/* عکس / کاور ویدیو — چپ */}
                    <div className="md:col-span-5 lg:col-span-5">
                      <div className="relative">
                        <div className="relative aspect-video overflow-hidden bg-neutral-200 border border-black/10">
                          {t.image_url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={t.image_url}
                              alt={t.alt || t.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-black/20 text-xs font-mono">
                              NO IMG
                            </div>
                          )}

                          {/* Overlay ویدیو */}
                          {t.type === "video" && (
                            <>
                              <div className="absolute inset-0 bg-black/40" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 md:w-20 md:h-20 bg-[#c8ff00] border-2 border-black flex items-center justify-center">
                                  <Play className="w-6 h-6 md:w-8 md:h-8 text-black ml-1" fill="black" />
                                </div>
                              </div>
                              <div className="absolute top-3 right-3 bg-black text-white font-mono text-[9px] font-black px-2 py-0.5 flex items-center gap-1">
                                <Video className="w-3 h-3" /> VIDEO
                              </div>
                            </>
                          )}
                        </div>

                        {/* شماره */}
                        <div className="absolute -top-3 -right-3 bg-[#c8ff00] text-black font-mono text-[10px] font-black px-2 py-1 border border-black">
                          {String(i + 1).padStart(2, "0")}
                        </div>
                      </div>

                      {/* لیبل زیر عکس */}
                      <div className="mt-3 flex items-center justify-between font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-500">
                        <span>{t.type === "video" ? "VIDEO TESTIMONIAL" : "WRITTEN TESTIMONIAL"}</span>
                        <span>{String(i + 1).padStart(2, "0")}</span>
                      </div>
                    </div>

                    {/* متن — راست */}
                    <div className="md:col-span-7 lg:col-span-7">
                      {/* آیکون نوع */}
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 bg-black text-white flex items-center justify-center">
                          {t.type === "video" ? (
                            <Video className="w-4 h-4" />
                          ) : (
                            <MessageSquare className="w-4 h-4" />
                          )}
                        </div>
                        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-500">
                          {t.type === "video" ? "VIDEO" : "WRITTEN"}
                        </span>
                      </div>

                      {/* متن حرف */}
                      {t.quote && (
                        <p
                          className="text-black leading-[1.9] whitespace-pre-line mb-10 md:mb-14"
                          style={{
                            fontFamily: "var(--font-doran)",
                            fontSize: "clamp(1.15rem, 1.8vw, 1.75rem)",
                            fontWeight: 500,
                          }}
                        >
                          «{t.quote}»
                        </p>
                      )}

                      {/* نام و سِمت */}
                      <div className="flex items-center gap-4 pt-6 border-t border-black/15">
                        <div className="w-1.5 h-1.5 bg-[#c8ff00] rounded-full" />
                        <div>
                          <div
                            className="text-lg md:text-xl font-black text-black"
                            style={{ fontFamily: "var(--font-doran)" }}
                          >
                            {t.name}
                          </div>
                          {t.role && (
                            <div className="font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase text-neutral-500 mt-1">
                              {t.role}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* لینک ویدیو */}
                      {t.type === "video" && t.video_url && (
                        <a
                          href={t.video_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-3 mt-10 border border-black/20 hover:border-black hover:bg-black hover:text-white px-5 py-3 transition-all"
                        >
                          <Play className="w-4 h-4" />
                          <span className="text-sm font-bold font-mono tracking-widest uppercase">
                            تماشای ویدیو
                          </span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* کنترل‌ها */}
          {testimonials.length > 1 && (
            <div className="flex items-center justify-between gap-6 mt-12 md:mt-16 pt-6 border-t border-black/15">
              {/* دکمه‌های prev/next */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="قبلی"
                  className="w-10 h-10 md:w-12 md:h-12 border border-black/20 hover:border-black hover:bg-black hover:text-white flex items-center justify-center transition-all"
                >
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="بعدی"
                  className="w-10 h-10 md:w-12 md:h-12 border border-black/20 hover:border-black hover:bg-black hover:text-white flex items-center justify-center transition-all"
                >
                  <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>

              {/* Dot indicators */}
              <div className="flex items-center gap-2 md:gap-3">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`تجربه ${i + 1}`}
                    className={`transition-all duration-300 ${
                      i === activeIndex
                        ? "w-8 md:w-12 h-1 bg-black"
                        : "w-4 md:w-6 h-1 bg-black/20 hover:bg-black/40"
                    }`}
                  />
                ))}
              </div>

              {/* شماره */}
              <div className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-neutral-500">
                {String(activeIndex + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}