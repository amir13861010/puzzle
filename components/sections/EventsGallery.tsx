import { Carousel } from "@/components/Carousel";

type GalleryImage = {
  id: string;
  image_url: string;
  alt: string | null;
  title: string | null;
};

export default function EventsGallery({
  images,
}: {
  images: GalleryImage[];
}) {
  if (images.length === 0) return null;

  return (
    <section
      className="relative border-y-2 border-black bg-white overflow-hidden"
      dir="rtl"
    >
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        <div
          className="absolute -top-[10%] -left-[10%] text-black/[0.035] font-black text-[22vw] leading-none whitespace-nowrap uppercase tracking-tighter"
          style={{ fontFamily: "var(--font-display)" }}
        >
          COMMUNITY EVENTS
        </div>
        <div
          className="absolute bottom-0 right-1/4 text-black/[0.04] font-black text-[14vw] leading-none whitespace-nowrap rotate-[-3deg]"
          style={{ fontFamily: "var(--font-doran)" }}
        >
          شبکه‌سازی دورهمی
        </div>
        <div className="absolute top-1/2 -right-8 -translate-y-1/2 rotate-90 text-[11px] font-mono tracking-[0.6em] text-black/20 uppercase whitespace-nowrap">
          ARCHIVED RECS // TEHRAN CHAPTER // 2024-2025
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-4 border-b-2 lg:border-b-0 lg:border-l-2 border-black p-6 md:p-10 bg-[#ededed]/90 backdrop-blur-sm flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 font-mono text-[80px] font-black text-black/[0.03] select-none pointer-events-none leading-none">
            01
          </div>

          <div>
            <div className="flex items-center justify-between font-mono text-xs font-black uppercase tracking-widest text-neutral-500 mb-6 border-b border-black/20 pb-3">
              <span>[ ARCHIVE // 01 ]</span>
              <span>MEETUPS & TALKS</span>
            </div>

            <h2
              className="text-5xl md:text-7xl font-black leading-[0.9] text-black tracking-tighter uppercase"
              style={{ fontFamily: "var(--font-display)" }}
            >
              EVENTS
              <br />
              <span
                className="text-3xl md:text-5xl font-black tracking-normal mt-2 block"
                style={{ fontFamily: "var(--font-doran)" }}
              >
                رویدادهـــا❋
              </span>
            </h2>

            <p
              className="mt-6 text-sm md:text-base leading-relaxed text-neutral-700 border-r-2 border-black pr-3"
              style={{ fontFamily: "var(--font-doran)" }}
            >
              دورهمی‌های بدون تعارف، انتقال تجربه‌های واقعی و شبکه‌سازی خارج از
              سالن‌های خشک همایش.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t-2 border-black flex items-center justify-between font-mono text-xs font-bold">
            <span className="bg-[#c8ff00] text-black px-2 py-0.5 border border-black">
              ROOM FULL OF BUILDERS
            </span>
            <span>TEH // 2025'</span>
          </div>
        </div>

        <div className="lg:col-span-8 p-6 md:p-10 bg-transparent flex items-center relative">
          <div className="w-full">
            <Carousel slidesPerView={{ sm: 1, md: 2, lg: 3 }} gap="1.5rem" loop>
              {images.map((img, i) => (
                <div
                  key={img.id}
                  className="group border-2 border-black bg-white p-2.5 transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[6px_6px_0px_#000]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-black border border-black/30">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.image_url}
                      alt={img.alt || ""}
                      className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                    />
                    <div className="absolute top-2 right-2 bg-black text-white font-mono text-[10px] font-bold px-2 py-0.5 border border-white/20">
                      #{String(i + 1).padStart(2, "0")}
                    </div>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-black/20 flex justify-between items-center text-[10px] font-mono font-bold uppercase">
                    <span className="truncate max-w-[120px]">
                      {img.alt || "COMMUNITY SESSION"}
                    </span>
                    <span className="text-[#000] underline decoration-2">
                      VIEW ❋
                    </span>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}