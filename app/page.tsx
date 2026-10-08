import { ChevronDown, ArrowUpRight, Asterisk } from "lucide-react";
import { getProducts, COURSES } from "@/lib/data";
import { Carousel } from "@/components/Carousel";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data: gallery } = await supabase
    .from("gallery")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  const eventImages = (gallery ?? []).filter((g) => g.category === "events");
  const bookImages = (gallery ?? []).filter((g) => g.category === "books");
  const products = await getProducts();

  const items: Array<
    | { type: "course"; data: (typeof COURSES)[0] }
    | { type: "product"; data: (typeof products)[0] }
  > = [];

  const maxLen = Math.max(COURSES.length, products.length);
  for (let i = 0; i < maxLen; i++) {
    if (COURSES[i]) items.push({ type: "course", data: COURSES[i] });
    if (products[i]) items.push({ type: "product", data: products[i] });
  }

  return (
    <main className="bg-[#f5f5f5] text-black overflow-x-hidden selection:bg-[#c8ff00] selection:text-black font-sans">
      {/* ============ بخش ۱: Hero مشکی (دست نخورده طبق سورس شما) ============ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        >
          <source src="/hero-video.MOV" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-[15%] -left-[5%] text-white/[0.04] font-display font-bold text-[15vw] leading-none whitespace-nowrap"
            style={{ fontFamily: "var(--font-display)" }}
          >
            PUZZLE PUZZLE
          </div>
          <div
            className="absolute bottom-[10%] -right-[5%] text-white/[0.04] text-[12vw] leading-none whitespace-nowrap"
            style={{ fontFamily: "var(--font-doran)" }}
          >
            پازل پازل
          </div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 w-full" dir="rtl">
          <div className="flex items-center justify-center gap-3 md:gap-4 mb-4 md:mb-6 text-white/50">
            <div className="w-8 md:w-12 h-px bg-white/30" />
            <span
              className="text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] uppercase font-mono"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              از ۱۴۰۳
            </span>
            <div className="w-8 md:w-12 h-px bg-white/30" />
          </div>

          <h1
            className="text-white text-[26vw] sm:text-[24vw] md:text-[20vw] lg:text-[18vw] leading-[0.85] font-black tracking-tighter select-none relative"
            style={{
              fontFamily: "var(--font-doran)",
              transform: "rotate(-2deg)",
            }}
          >
            پازل
          </h1>

          <div
            className="text-white text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black mt-8 md:mt-20 lg:mt-24 leading-tight md:whitespace-nowrap"
            style={{
              fontFamily: "var(--font-doran)",
              transform: "rotate(1deg)",
            }}
          >
            باشگاه مدیران محصول جوان
          </div>
        </div>

        <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 md:gap-3 text-white/60">
          <span
            className="text-[10px] tracking-[0.3em] md:tracking-[0.4em] uppercase font-mono"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Scroll
          </span>
          <ChevronDown
            className="w-4 h-4 md:w-5 md:h-5 animate-bounce"
            strokeWidth={1.5}
          />
        </div>

        <div className="hidden md:block absolute top-32 right-12 text-white/30 z-10">
          <Asterisk className="w-6 h-6 animate-spin-slow" />
        </div>

        <div className="hidden md:block absolute bottom-32 left-12 text-white/30 z-10">
          <ArrowUpRight className="w-6 h-6" />
        </div>
      </section>

      {/* ============ بخش ۲: گالری ایونت‌ها (سبک نئوبروتال و ادیتوریال) ============ */}
      {eventImages.length > 0 && (
        <section className="border-y-2 border-black bg-white" dir="rtl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* سایدبار لیبل / عنوان آوانگارد */}
            <div className="lg:col-span-4 border-b-2 lg:border-b-0 lg:border-l-2 border-black p-6 md:p-10 bg-[#ededed] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between font-mono text-xs font-black uppercase tracking-widest text-neutral-500 mb-6 border-b border-black/20 pb-3">
                  <span>[ ARCHIVE // 01 ]</span>
                  <span>MEETUPS & TALKS</span>
                </div>
                
                <h2
                  className="text-5xl md:text-7xl font-black leading-[0.9] text-black tracking-tighter uppercase"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  EVENTS<br />
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
                  دورهمی‌های بدون تعارف، انتقال تجربه‌های واقعی و شبکه‌سازی خارج از سالن‌های خشک همایش.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t-2 border-black flex items-center justify-between font-mono text-xs font-bold">
                <span className="bg-[#c8ff00] text-black px-2 py-0.5 border border-black">
                  ROOM FULL OF BUILDERS
                </span>
                <span>TEH // 2025'</span>
              </div>
            </div>

            {/* بخش اسلایدر و کارت‌های عکس ایونت */}
            <div className="lg:col-span-8 p-6 md:p-10 bg-[#fafafa] flex items-center">
              <div className="w-full">
                <Carousel slidesPerView={{ sm: 1, md: 2, lg: 3 }} gap="1.5rem" loop>
                  {eventImages.map((img, i) => (
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
                        <span className="truncate max-w-[120px]">{img.alt || "COMMUNITY SESSION"}</span>
                        <span className="text-[#000] underline decoration-2">VIEW ❋</span>
                      </div>
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* ============ بخش ۳: دوره‌ها + محصولات (سفید) ============ */}
      <section className="bg-white text-black" dir="rtl">
        {/* نوار بالای بخش */}
        <div className="border-b-2 border-black bg-[#f2f2f2]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-3.5 flex items-center justify-between text-xs font-mono font-bold uppercase">
            <span className="tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 bg-black inline-block" />
              Puzzle / Courses & Products / 2025'
            </span>
            <span className="tracking-widest">
              Issue No. 02 ❋
            </span>
          </div>
        </div>

        {items.map((item, index) => (
          <div key={`${item.type}-${index}`} className="border-b-2 border-black">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
              {item.type === "course" ? (
                <CourseItem course={item.data} />
              ) : (
                <ProductItem product={item.data} index={index} />
              )}
            </div>
          </div>
        ))}

        {/* بخش پایانی */}
        <div className="border-b-2 border-black bg-[#fafafa]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12 md:py-16 flex items-center justify-between gap-6 flex-wrap">
            <h3
              className="text-4xl md:text-6xl font-black tracking-tight"
              style={{ fontFamily: "var(--font-doran)" }}
            >
              بیشتـــر بگـــردی؟❋
            </h3>
            <div className="flex gap-4 flex-wrap">
              <a
                href="/courses"
                className="group inline-flex items-center gap-4 border-2 border-black bg-white hover:bg-black hover:text-white px-6 md:px-8 py-3.5 md:py-4 transition-all shadow-[4px_4px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
              >
                <span
                  className="text-sm md:text-base font-bold"
                  style={{ fontFamily: "var(--font-doran)" }}
                >
                  همـــه دوره‌هـــا
                </span>
                <span className="w-6 h-6 bg-[#c8ff00] flex items-center justify-center text-black text-xs font-bold group-hover:bg-white transition-colors">
                  ←
                </span>
              </a>
              <a
                href="/store"
                className="group inline-flex items-center gap-4 border-2 border-black bg-white hover:bg-black hover:text-white px-6 md:px-8 py-3.5 md:py-4 transition-all shadow-[4px_4px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
              >
                <span
                  className="text-sm md:text-base font-bold"
                  style={{ fontFamily: "var(--font-doran)" }}
                >
                  همـــه محصولـــات
                </span>
                <span className="w-6 h-6 bg-[#c8ff00] flex items-center justify-center text-black text-xs font-bold group-hover:bg-white transition-colors">
                  ←
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ بخش ۴: گالری کتاب‌ها (سبک نئوبروتال و ادیتوریال) ============ */}
      {bookImages.length > 0 && (
        <section className="border-b-2 border-black bg-[#ededed]" dir="rtl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* سایدبار عنوان کتابخانه */}
            <div className="lg:col-span-4 border-b-2 lg:border-b-0 lg:border-l-2 border-black p-6 md:p-10 bg-white flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between font-mono text-xs font-black uppercase tracking-widest text-neutral-500 mb-6 border-b border-black/20 pb-3">
                  <span>[ LIBRARY // 02 ]</span>
                  <span>CURATED READINGS</span>
                </div>

                <h2
                  className="text-5xl md:text-7xl font-black leading-[0.9] text-black tracking-tighter uppercase"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  BOOKS<br />
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
                  سرفصل‌های منتخب، کتاب‌های بنیادی مدیریت محصول و رساله‌های مدرن دیزاین و استراتژی.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t-2 border-black font-mono text-xs font-bold flex justify-between items-center text-neutral-500">
                <span>HANDPICKED TITLES</span>
                <span className="bg-black text-white px-2 py-0.5">READ & GROW</span>
              </div>
            </div>

            {/* کارت‌های شیک و خام کتاب‌ها */}
            <div className="lg:col-span-8 p-6 md:p-10 bg-[#f7f7f7] flex items-center">
              <div className="w-full">
                <Carousel slidesPerView={{ sm: 2, md: 3, lg: 5 }} gap="1.25rem" loop>
                  {bookImages.map((img, i) => (
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
      )}

      {/* ============ بخش ۵: حامیان ما (سفید) ============ */}
      <section className="bg-white relative py-16 md:py-24 lg:py-32 px-4 sm:px-6 overflow-hidden border-b-2 border-black">
        <div
          className="absolute top-0 left-0 text-black/[0.03] font-black text-[30vw] md:text-[22vw] leading-none pointer-events-none select-none"
          style={{ fontFamily: "var(--font-doran)" }}
        >
          حامیان
        </div>

        <div className="w-full max-w-7xl mx-auto relative z-10">
          <div className="mb-12 md:mb-20 lg:mb-28 relative" dir="rtl">
            <p
              className="text-xs md:text-sm lg:text-base tracking-[0.3em] md:tracking-[0.4em] uppercase text-neutral-400 mb-4 md:mb-6"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              05 — Our Partners
            </p>
            <h2
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-black leading-[1]"
              style={{
                fontFamily: "var(--font-doran)",
                transform: "rotate(-1deg)",
              }}
            >
              حامیان ما
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 lg:gap-16 items-center">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="group relative aspect-[4/3] rounded-2xl md:rounded-3xl border-2 border-neutral-200 bg-neutral-50 flex items-center justify-center hover:border-black hover:bg-white transition-all duration-500 overflow-hidden hover:shadow-2xl"
                style={{ transform: `rotate(${(i - 2) * 1.5}deg)` }}
              >
                <div className="text-center p-4">
                  <div className="w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-2xl md:rounded-3xl bg-neutral-200 mx-auto mb-4 md:mb-6 group-hover:bg-black group-hover:scale-110 group-hover:rotate-6 transition-all duration-500" />
                  <div className="text-base md:text-lg lg:text-2xl font-bold text-neutral-300 group-hover:text-black transition-colors duration-300">
                    {i === 1
                      ? "اسپانسر اول"
                      : i === 2
                      ? "اسپانسر دوم"
                      : "اسپانسر سوم"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

// ============ کامپوننت دوره ============
function CourseItem({ course }: { course: (typeof COURSES)[0] }) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end mb-12 md:mb-16">
        <div className="md:col-span-4">
          <div className="relative aspect-[4/5] overflow-hidden bg-black border-2 border-black shadow-[5px_5px_0px_#000]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={course.image}
              alt={course.titleFa}
              className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
            />
            <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1 bg-[#c8ff00] text-black border border-black">
              <span className="w-1.5 h-1.5 bg-black rounded-full" />
              <span className="text-[10px] font-mono tracking-widest uppercase font-bold">
                دوره — {course.tag}
              </span>
            </div>
          </div>
        </div>

        <div className="md:col-span-8">
          <div className="flex items-start gap-4 md:gap-6">
            <span
              className="text-6xl md:text-8xl lg:text-9xl font-black leading-[0.85] text-black shrink-0"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {course.number}
            </span>
            <h3
              className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.85] text-black/10 whitespace-nowrap uppercase"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {course.titleEn}
            </h3>
          </div>
          <h4
            className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.95] text-black mt-6 md:mt-10"
            style={{ fontFamily: "var(--font-doran)" }}
          >
            {course.titleFa}
          </h4>
        </div>
      </div>

      <div className="h-0.5 bg-black mb-12 md:mb-16" />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        <div className="md:col-span-7">
          <div className="text-[10px] tracking-widest uppercase text-black font-mono font-bold mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-black inline-block" />
            درباره دوره
          </div>
          <p
            className="text-base md:text-lg leading-loose text-neutral-800"
            style={{ fontFamily: "var(--font-doran)" }}
          >
            {course.desc}
          </p>
        </div>

        <div className="md:col-span-5 md:border-r-2 md:border-black md:pr-8">
          <div className="flex items-center justify-between py-4 border-b border-black/20">
            <span className="text-[10px] tracking-widest uppercase text-neutral-500 font-mono font-bold">
              استاد
            </span>
            <span
              className="text-base md:text-lg font-bold"
              style={{ fontFamily: "var(--font-doran)" }}
            >
              {course.teacher}
            </span>
          </div>

          <div className="flex items-center justify-between py-4 border-b border-black/20">
            <span className="text-[10px] tracking-widest uppercase text-neutral-500 font-mono font-bold">
              هزینه
            </span>
            <span
              className="text-base md:text-lg font-bold"
              style={{ fontFamily: "var(--font-doran)" }}
            >
              {course.price} <span className="text-xs text-neutral-500">تومان</span>
            </span>
          </div>

          <div className="pt-6">
            <a
              href="/courses"
              className="group flex items-center justify-between w-full border-2 border-black bg-black text-white hover:bg-[#c8ff00] hover:text-black px-6 py-4 transition-all shadow-[4px_4px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
            >
              <span
                className="text-sm md:text-base font-bold"
                style={{ fontFamily: "var(--font-doran)" }}
              >
                ثبت‌نام در دوره ❋
              </span>
              <span className="font-mono font-bold text-lg">
                ←
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

// ============ کامپوننت محصول ============
function ProductItem({
  product,
  index,
}: {
  product: {
    id: string;
    name: string;
    price: number;
    description: string | null;
    category: string | null;
    image_url: string | null;
  };
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <>
      <div
        className={`grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end mb-12 md:mb-16 ${
          !isEven ? "md:[direction:rtl]" : ""
        }`}
      >
        <div className={`md:col-span-4 ${!isEven ? "md:order-2" : ""}`}>
          <div className="relative aspect-[4/5] overflow-hidden bg-black border-2 border-black shadow-[5px_5px_0px_#000]">
            {product.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/20 text-xs font-mono">
                NO IMG
              </div>
            )}
            <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1 bg-[#c8ff00] text-black border border-black">
              <span className="w-1.5 h-1.5 bg-black rounded-full" />
              <span className="text-[10px] font-mono tracking-widest uppercase font-bold">
                محصول
              </span>
            </div>
          </div>
        </div>

        <div className={`md:col-span-8 ${!isEven ? "md:order-1" : ""}`}>
          <div className="flex items-start gap-4 md:gap-6">
            <span
              className="text-6xl md:text-8xl lg:text-9xl font-black leading-[0.85] text-black shrink-0"
              style={{ fontFamily: "var(--font-display)" }}
            >
              P{String(index).padStart(2, "0")}
            </span>
            <h3
              className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.85] text-black/10 whitespace-nowrap uppercase"
              style={{ fontFamily: "var(--font-display)" }}
            >
              PRODUCT
            </h3>
          </div>
          <h4
            className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.95] text-black mt-6 md:mt-10"
            style={{ fontFamily: "var(--font-doran)" }}
          >
            {product.name}
          </h4>
        </div>
      </div>

      <div className="h-0.5 bg-black mb-12 md:mb-16" />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        <div className={`md:col-span-7 ${!isEven ? "md:order-2" : ""}`}>
          <div className="text-[10px] tracking-widest uppercase text-black font-mono font-bold mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-black inline-block" />
            درباره محصول
          </div>
          <p
            className="text-base md:text-lg leading-loose text-neutral-800"
            style={{ fontFamily: "var(--font-doran)" }}
          >
            {product.description || "توضیحاتی برای این محصول ثبت نشده."}
          </p>
        </div>

        <div
          className={`md:col-span-5 md:border-r-2 md:border-black md:pr-8 ${
            !isEven ? "md:order-1 md:border-r-0 md:border-l-2 md:pl-8 md:pr-0" : ""
          }`}
        >
          <div className="flex items-center justify-between py-4 border-b border-black/20">
            <span className="text-[10px] tracking-widest uppercase text-neutral-500 font-mono font-bold">
              قیمت
            </span>
            <span
              className="text-base md:text-lg font-bold"
              style={{ fontFamily: "var(--font-doran)" }}
            >
              {Number(product.price).toLocaleString("fa-IR")}{" "}
              <span className="text-xs text-neutral-500">تومان</span>
            </span>
          </div>

          <div className="flex items-center justify-between py-4 border-b border-black/20">
            <span className="text-[10px] tracking-widest uppercase text-neutral-500 font-mono font-bold">
              دسته
            </span>
            <span
              className="text-base md:text-lg font-bold"
              style={{ fontFamily: "var(--font-doran)" }}
            >
              {product.category ? "دارد" : "—"}
            </span>
          </div>

          <div className="pt-6">
            <a
              href={`/store/${product.id}`}
              className="group flex items-center justify-between w-full border-2 border-black bg-black text-white hover:bg-[#c8ff00] hover:text-black px-6 py-4 transition-all shadow-[4px_4px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
            >
              <span
                className="text-sm md:text-base font-bold"
                style={{ fontFamily: "var(--font-doran)" }}
              >
                مشاهده محصول ❋
              </span>
              <span className="font-mono font-bold text-lg">
                ←
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
