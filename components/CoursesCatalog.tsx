/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getCourses, type Course } from "@/lib/data";
import CourseTypeBadge from "@/components/CourseTypeBadge";

export default async function CoursesCatalog({ type }: { type?: "puzzle" | "club" }) {
  const courses = await getCourses(type);
  const title = type === "club" ? "دوره‌های باشگاه" : type === "puzzle" ? "دوره‌های پازل" : "دوره‌ها";
  const eyebrow = type === "club" ? "CLUB COURSES" : type === "puzzle" ? "PUZZLE COURSES" : "ALL COURSES";
  const watermark = type === "club" ? "CLUB" : type === "puzzle" ? "PUZZLE" : "COURSES";

  return (
    <main className="bg-[#f5f5f5] text-black overflow-x-hidden font-sans" dir="rtl">
      <section className="bg-black text-white relative overflow-hidden border-b-2 border-black">
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0"><div className="absolute -top-[8%] -left-[3%] text-white/[0.03] font-black text-[28vw] leading-none whitespace-nowrap uppercase tracking-tighter" style={{ fontFamily: "var(--font-display)" }}>{watermark}</div></div>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-32 md:pt-40 pb-16 md:pb-24 relative z-10">
          <nav className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-white/40 mb-10 md:mb-14"><Link href="/" className="hover:text-white transition-colors">HOME</Link><ChevronRight className="w-3 h-3 rotate-180" /><span className="text-white">{eyebrow}</span></nav>
          <h1 className="font-black leading-[1] text-white tracking-tighter mb-6" style={{ fontFamily: "var(--font-doran)", fontSize: "clamp(2.5rem, 6vw, 6rem)" }}>{title}</h1>
          <p className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/50">{eyebrow} · {courses.length} ITEMS</p>
        </div>
      </section>
      <section className="bg-white py-16 md:py-24"><div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {courses.length === 0 ? <div className="bg-[#f5f5f5] border border-black/10 p-16 text-center"><p className="text-black/60">هنوز دوره‌ای اضافه نشده.</p></div> : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">{courses.map((course: Course, i) => <Link key={course.id} href={`/courses/${course.slug}`} className="group block"><div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 border border-black/10">{course.image ? <img src={course.image} alt={course.title_fa} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" /> : <div className="w-full h-full flex items-center justify-center text-black/20 text-xs font-mono">NO IMG</div>}<div className="absolute top-3 right-3 bg-[#c8ff00] text-black font-mono text-[9px] font-black px-2 py-0.5">{String(i + 1).padStart(2, "0")}</div><div className="absolute top-3 left-3"><CourseTypeBadge type={course.type} /></div></div><div className="mt-4 space-y-2"><h3 className="font-black text-black text-lg md:text-xl line-clamp-2 group-hover:text-black/70 transition-colors" style={{ fontFamily: "var(--font-doran)" }}>{course.title_fa}</h3><div className="font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-500">{course.teacher_name}</div><div className="flex items-baseline justify-between pt-1"><span className="font-black text-black" style={{ fontFamily: "var(--font-display)" }}>{course.price_display}</span><span className="font-mono text-[10px] tracking-widest uppercase text-neutral-500">تومان</span></div></div></Link>)}</div>}
      </div></section>
    </main>
  );
}
