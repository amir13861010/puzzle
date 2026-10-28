
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCourse, getCourses } from "@/lib/data";
import CourseActions from "./CourseActions";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourse(slug);
  if (!course) return { title: "دوره پیدا نشد" };
  const description = course.description?.trim() || `اطلاعات و ثبت‌نام دورهٔ ${course.title_fa} در پازل.`;
  return {
    title: course.title_fa,
    description,
    keywords: [course.title_fa, course.title_en, course.topic, course.teacher_name, "دوره مدیریت محصول", "پازل"].filter(Boolean) as string[],
    openGraph: { title: course.title_fa, description, type: "website" },
    alternates: { canonical: `/courses/${slug}` },
  };
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const course = await getCourse(slug);
  if (!course) notFound();

  const allCourses = await getCourses();
  const related = allCourses.filter((c) => c.slug !== slug).slice(0, 3);

  return (
    <main
      className="bg-[#fafafa] text-black overflow-x-hidden font-sans"
      dir="rtl"
    >
      {/* Hero */}
      <section className="relative pt-28 md:pt-40 pb-16 md:pb-24">
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
          <div
            className="absolute -top-[5%] -right-[3%] text-black/[0.025] font-black text-[24vw] leading-none whitespace-nowrap uppercase tracking-tighter"
            style={{ fontFamily: "var(--font-display)" }}
          >
            COURSE
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <nav className="flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-400 mb-12 md:mb-16">
            <Link href="/" className="hover:text-black transition-colors">
              HOME
            </Link>
            <span>/</span>
            <Link href="/courses" className="hover:text-black transition-colors">
              COURSES
            </Link>
            <span>/</span>
            <span className="text-black truncate max-w-[200px]">
              {course.title_fa}
            </span>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-20 items-start">
            {/* متن — راست */}
            <div className="md:col-span-6 lg:col-span-7 md:order-2">
              <div className="flex items-center gap-4 font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-500 mb-6 flex-wrap">
                <span className="flex items-center gap-2">
                  <span className="w-8 h-px bg-black" />
                  {course.title_en}
                </span>
                {course.topic && (
                  <>
                    <span>/</span>
                    <span>{course.topic}</span>
                  </>
                )}
                {course.tag && (
                  <>
                    <span>/</span>
                    <span className="bg-[#c8ff00] text-black px-2 py-0.5">
                      {course.tag}
                    </span>
                  </>
                )}
              </div>

              <h1
                className="font-black leading-[1.15] text-black tracking-tight mb-8 md:mb-10"
                style={{
                  fontFamily: "var(--font-doran)",
                  fontSize: "clamp(1.75rem, 3vw, 3rem)",
                }}
              >
                {course.title_fa}
              </h1>

              <div className="flex items-baseline gap-3 mb-10 md:mb-14 pb-10 md:pb-14 border-b border-black/10">
                <span
                  className="text-3xl md:text-4xl font-black text-black"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {course.price_display}
                </span>
                <span className="font-mono text-xs tracking-[0.2em] uppercase text-neutral-500">
                  تومان
                </span>
              </div>

              {course.description && (
                <p
                  className="text-neutral-700 whitespace-pre-line max-w-xl mb-10 md:mb-14"
                  style={{
                    fontFamily: "var(--font-doran)",
                    fontSize: "clamp(0.95rem, 1.1vw, 1.1rem)",
                    lineHeight: "2.1",
                  }}
                >
                  {course.description}
                </p>
              )}

              <CourseActions course={course} />
            </div>

            {/* عکس — چپ */}
            <div className="md:col-span-6 lg:col-span-5 md:order-1">
              <div className="relative">
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 border border-black/10">
                  {course.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={course.image}
                      alt={course.title_fa}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-black/20 text-xs font-mono">
                      NO IMG
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* اطلاعات دوره */}
      <section className="bg-white border-t border-b border-black/10 py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 mb-10 md:mb-14 border-b border-black/10 pb-3">
            <span>[ COURSE INFO ]</span>
            <span>DETAILS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
            <div>
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-500 mb-4">
                استاد دوره
              </div>
              <div
                className="text-xl md:text-2xl font-black text-black"
                style={{ fontFamily: "var(--font-doran)" }}
              >
                {course.teacher_name ?? "—"}
              </div>
            </div>

            <div>
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-500 mb-4">
                لوکیشن
              </div>
              <div
                className="text-xl md:text-2xl font-black text-black"
                style={{ fontFamily: "var(--font-doran)" }}
              >
                {course.location ?? "—"}
              </div>
            </div>

            <div>
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-500 mb-4">
                موضوع
              </div>
              <div
                className="text-xl md:text-2xl font-black text-black"
                style={{ fontFamily: "var(--font-doran)" }}
              >
                {course.topic ?? "—"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* توضیحات کامل */}
      {course.full_description && (
        <section className="py-16 md:py-24 border-b border-black/10">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
              <div className="md:col-span-3">
                <h2
                  className="text-xl md:text-2xl font-black text-black"
                  style={{ fontFamily: "var(--font-doran)" }}
                >
                  درباره دوره
                </h2>
              </div>
              <div className="md:col-span-9">
                <div
                  className="text-neutral-700 prose prose-neutral max-w-none prose-p:leading-[2.1] prose-a:text-blue-700 prose-a:underline prose-img:max-w-full prose-table:w-full prose-table:border-collapse prose-td:border prose-td:border-black/20 prose-td:p-2 prose-th:border prose-th:border-black/20 prose-th:bg-black/5 prose-th:p-2"
                  style={{ fontFamily: "var(--font-doran)", fontSize: "clamp(0.95rem, 1.1vw, 1.1rem)" }}
                >
                  {typeof course.full_description === "string" ? (
                    <p className="whitespace-pre-line">{course.full_description}</p>
                  ) : (
                    <RichText data={course.full_description} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* دوره‌های مشابه */}
      {related.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="flex items-end justify-between gap-6 mb-10 md:mb-16 flex-wrap">
              <h2
                className="text-2xl md:text-4xl font-black text-black"
                style={{ fontFamily: "var(--font-doran)" }}
              >
                دوره‌های مشابه
              </h2>
              <Link
                href="/courses"
                className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-500 hover:text-black transition-colors"
              >
                ALL COURSES →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/courses/${item.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 border border-black/10">
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.image}
                        alt={item.title_fa}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-black/20 text-xs font-mono">
                        NO IMG
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <h3
                      className="font-black text-black text-base md:text-lg line-clamp-2 group-hover:text-black/70 transition-colors"
                      style={{ fontFamily: "var(--font-doran)" }}
                    >
                      {item.title_fa}
                    </h3>
                    <div className="font-mono text-xs text-neutral-500 mt-2">
                      {item.price_display} تومان
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
