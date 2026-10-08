"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type SlidesPerView = number | { sm?: number; md?: number; lg?: number };

export function Carousel({
  children,
  slidesPerView = 1,
  gap = "1rem",
  showArrows = true,
  loop = true,
}: {
  children: React.ReactNode[];
  slidesPerView?: SlidesPerView;
  gap?: string;
  showArrows?: boolean;
  loop?: boolean;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop,
    align: "start",
    direction: "rtl",
    slidesToScroll: 1,
  });

  const [currentSlides, setCurrentSlides] = useState(
    typeof slidesPerView === "number" ? slidesPerView : slidesPerView.lg ?? 1
  );

  // محاسبه تعداد اسلاید بر اساس breakpoint
  useEffect(() => {
    if (typeof slidesPerView === "number") {
      setCurrentSlides(slidesPerView);
      return;
    }

    function update() {
      const width = window.innerWidth;
      const config = slidesPerView as {
        sm?: number;
        md?: number;
        lg?: number;
      };
      let n = 1;
      if (width >= 1024 && config.lg) n = config.lg;
      else if (width >= 768 && config.md) n = config.md;
      else if (width >= 640 && config.sm) n = config.sm;
      setCurrentSlides(n);
    }

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [slidesPerView]);

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y" style={{ gap }}>
          {children.map((child, i) => (
            <div
              key={i}
              className="shrink-0"
              style={{
                flexBasis: `calc((100% - ${gap} * ${currentSlides - 1}) / ${currentSlides})`,
              }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {showArrows && (
        <>
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev && !loop}
            className="absolute top-1/2 -translate-y-1/2 -right-2 md:-right-4 w-10 h-10 md:w-12 md:h-12 bg-black text-white flex items-center justify-center hover:bg-[#c8ff00] hover:text-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed z-10"
            aria-label="قبلی"
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <button
            onClick={scrollNext}
            disabled={!canScrollNext && !loop}
            className="absolute top-1/2 -translate-y-1/2 -left-2 md:-left-4 w-10 h-10 md:w-12 md:h-12 bg-black text-white flex items-center justify-center hover:bg-[#c8ff00] hover:text-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed z-10"
            aria-label="بعدی"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </>
      )}
    </div>
  );
}