import type { Course } from "@/lib/data";

export default function CourseItem({ course }: { course: Course }) {
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
              {course.price}{" "}
              <span className="text-xs text-neutral-500">تومان</span>
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
              <span className="font-mono font-bold text-lg">←</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}