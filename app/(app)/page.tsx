import {
  getProducts,
  getCourses,
  getGallery,
  getCoaching,
  getTribute,
  getHeadCoach,
  getCoaches,
  getTestimonials,
  getPartners,
  getSectionLayout,
} from "@/lib/data";
import HeroSection from "@/components/sections/HeroSection";
import EventsGallery from "@/components/sections/EventsGallery";
import BooksGallery from "@/components/sections/BooksGallery";
import Partners from "@/components/sections/Partners";
import CourseItem from "@/components/sections/CourseItem";
import ProductItem from "@/components/sections/ProductItem";
import CoachingSection from "@/components/sections/CoachingSection";
import TributeSection from "@/components/sections/TributeSection";
import HeadCoachSection from "@/components/sections/HeadCoachSection";
import CoachesSection from "@/components/sections/CoachesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQ from "@/components/sections/FAQ";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [
    layout,
    gallery,
    coachingItems,
    tribute,
    headCoach,
    coaches,
    testimonials,
    partners,
    courses,
    products,
  ] = await Promise.all([
    getSectionLayout(),
    getGallery(),
    getCoaching(),
    getTribute(),
    getHeadCoach(),
    getCoaches(),
    getTestimonials(),
    getPartners(),
    getCourses(),
    getProducts(),
  ]);

  const eventImages = gallery.filter((g) => g.category === "events");
  const bookImages = gallery.filter((g) => g.category === "books");

  const layoutItems = layout ?? [];
  const renderedCourseIds = new Set<string>();

  return (
    <main className="bg-[#f5f5f5] text-black overflow-x-hidden selection:bg-[#c8ff00] selection:text-black font-sans relative">
      <HeroSection />

      {layoutItems.map((item) => {
        switch (item.type) {
          case "events_gallery":
            return <EventsGallery key={item.id} images={eventImages} />;

          case "books_gallery":
            return <BooksGallery key={item.id} images={bookImages} />;

          case "course": {
            const course = courses[item.source ?? 0];
            if (!course || renderedCourseIds.has(course.id)) return null;
            renderedCourseIds.add(course.id);
            return (
              <section
                key={item.id}
                className="bg-white text-black relative overflow-hidden"
                dir="rtl"
              >
                <div className="border-b-2 border-black">
                  <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
                    <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-black/50 mb-8">
                      COURSE · {course.number}
                    </p>
                    <CourseItem course={course} />
                  </div>
                </div>
              </section>
            );
          }

          case "product": {
            const product = products[item.source ?? 0];
            if (!product) return null;
            const displayIndex = item.source ?? 0;
            return (
              <section
                key={item.id}
                className="bg-white text-black relative overflow-hidden"
                dir="rtl"
              >
                <div className="border-b-2 border-black relative overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
                    <div
                      className="absolute -bottom-[15%] -left-[5%] text-black/[0.03] font-black text-[18vw] leading-none whitespace-nowrap uppercase"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      ARTIFACT
                    </div>
                    <div
                      className="absolute top-4 right-10 text-black/[0.025] font-black text-[10vw] leading-none whitespace-nowrap"
                      style={{ fontFamily: "var(--font-doran)" }}
                    >
                      محصول اختصاصی
                    </div>
                  </div>

                  <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24 relative z-10">
                    <ProductItem product={product} index={displayIndex} />
                  </div>
                </div>
              </section>
            );
          }

          case "coaching":
            return (
              <CoachingSection key={item.id} items={coachingItems ?? []} />
            );

          case "tribute":
            return <TributeSection key={item.id} tribute={tribute ?? null} />;

          case "head_coach":
            return <HeadCoachSection key={item.id} coach={headCoach ?? null} />;

          case "coaches":
            return <CoachesSection key={item.id} coaches={coaches ?? []} />;

          case "testimonials":
            return (
              <TestimonialsSection
                key={item.id}
                testimonials={testimonials ?? []}
              />
            );

          case "partners":
            return <Partners key={item.id} partners={partners ?? []} />;

          case "faq":
            return <FAQ key={item.id} />;

          default:
            return null;
        }
      })}
    </main>
  );
}
