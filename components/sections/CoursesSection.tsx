import type { Course } from "@/lib/data";
import CourseItem from "@/components/sections/CourseItem";

export default function CoursesSection({ courses }: { courses: Course[] }) {
  if (courses.length === 0) return null;

  return (
    <section className="bg-white text-black relative overflow-hidden" dir="rtl">
      <div className="border-b-2 border-black">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
          <div className="mb-12 md:mb-16">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-black/50 mb-3">
              ALL COURSES · {courses.length} ITEMS
            </p>
            <h2 className="font-black text-4xl md:text-6xl" style={{ fontFamily: "var(--font-doran)" }}>
              همه دوره‌ها
            </h2>
          </div>
          {courses.map((course) => <CourseItem key={course.id} course={course} />)}
        </div>
      </div>
    </section>
  );
}
