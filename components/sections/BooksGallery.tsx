import { Carousel } from "@/components/Carousel";

type GalleryImage = {
  id: string;
  image_url: string;
  alt: string | null;
  title: string | null;
};

export default function BooksGallery({
  images,
}: {
  images: GalleryImage[];
}) {
  if (images.length === 0) return null;

  return (
    <section
      className="border-b-2 border-black bg-[#ededed] relative overflow-hidden"
      dir="rtl"
    >
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        <div
          className="absolute -bottom-[12%] -left-[5%] text-black/[0.04] font-black text-[20vw] leading-none whitespace-nowrap uppercase tracking-tighter"
          style={{ fontFamily: "var(--font-display)" }}
        >
          READING GUILD
        </div>
        <div
          className="absolute top-4 right-1/3 text-black/[0.035] font-black text-[15vw] leading-none whitespace-nowrap"
          style={{ fontFamily: "var(--font-doran)" }}
        >
          کتاب‌خانه پازل
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono tracking-[0.5em] text-black/15 uppercase whitespace-nowrap">
          ESSENTIAL THINKING // PRODUCT // DESIGN // STRATEGY
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-4 border-b-2 lg:border-b-0 lg:border-l-2 border-black p-6 md:p-10 bg-white/95 backdrop-blur-sm flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 font-mono text-[80px] font-black text-black/[0.03] select-none pointer-events-none leading-none">
            02
          </div>

          <div>
            <div className="flex items-center justify-between font-mono text-xs font-black uppercase tracking-widest text-neutral-500 mb-6 border-b border-black/20 pb-3">
              <span>[ LIBRARY // 02 ]</span>
              <span>CURATED READINGS</span>
            </div>

            <h2
              className="text-5xl md:text-7xl font-black leading-[0.9] text-black tracking-tighter uppercase"
              style={{ fontFamily: "var(--font-display)" }}
            >
              BOOKS
              <br />
              <span
                className="text-3xl md:text-5xl font-black tracking-normal mt-2 block"
                style={{ fontFamily: "var(--font-doran)" }}
              >
                کتاب‌خـــانه❋
              </span>
            </h2>

            <p
              className="mt-6 text-sm md:text-base leading-relaxed text-neutral-700 border-r-2 border-black pr-3"
              style={{ fontFamily: "var(--font-doran)" }}
            >
              سرفصل‌های منتخب، کتاب‌های بنیادی مدیریت محصول و رساله‌های مدرن
              دیزاین و استراتژی.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t-2 border-black font-mono text-xs font-bold flex justify-between items-center text-neutral-500">
            <span>HANDPICKED TITLES</span>
            <span className="bg-black text-white px-2 py-0.5">READ & GROW</span>
          </div>
        </div>

        <div className="lg:col-span-8 p-6 md:p-10 bg-transparent flex items-center relative">
          <div className="w-full">
            <Carousel
              slidesPerView={{ sm: 2, md: 3, lg: 5 }}
              gap="1.25rem"
              loop
            >
              {images.map((img, i) => (
                <div
                  key={img.id}
                  className="group border-2 border-black bg-white p-2 transition-all duration-200 hover:-translate-y-2 hover:shadow-[5px_5px_0px_#000]"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900 border border-black/40">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.image_url}
                      alt={img.alt || ""}
                      className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                    />
                    <div className="absolute top-1.5 left-1.5 bg-[#c8ff00] text-black font-mono text-[9px] font-black px-1.5 py-0.5 border border-black">
                      BK-{String(i + 1).padStart(2, "0")}
                    </div>
                  </div>
                  <div className="mt-2 text-center">
                    <span className="font-mono text-[10px] font-black uppercase text-neutral-600 block truncate">
                      {img.alt || `ARCHIVE VOL. ${i + 1}`}
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