import { createClient } from "@/lib/supabase/server";
import { getProducts, COURSES, type Course } from "@/lib/data";
import { LAYOUT } from "@/lib/layout";
import HeroSection from "@/components/sections/HeroSection";
import EventsGallery from "@/components/sections/EventsGallery";
import BooksGallery from "@/components/sections/BooksGallery";
import Partners from "@/components/sections/Partners";
import CourseItem from "@/components/sections/CourseItem";
import ProductItem from "@/components/sections/ProductItem";
import CoachingSection from "@/components/sections/CoachingSection";
import TributeSection from "@/components/sections/TributeSection";
import HeadCoachSection from "@/components/sections/HeadCoachSection";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";

export default async function Home() {
  const supabase = await createClient();

  const { data: gallery } = await supabase
    .from("gallery")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  const { data: coachingItems } = await supabase
    .from("coaching")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: tribute } = await supabase
    .from("tribute")
    .select("*")
    .eq("id", 1)
    .single();

  const { data: headCoach } = await supabase
    .from("head_coach")
    .select("*")
    .eq("id", 1)
    .single();

  const eventImages = (gallery ?? []).filter((g) => g.category === "events");
  const bookImages = (gallery ?? []).filter((g) => g.category === "books");
  const products = await getProducts();

  return (
    <main className="bg-[#f5f5f5] text-black overflow-x-hidden selection:bg-[#c8ff00] selection:text-black font-sans relative">
      <HeroSection />

      {LAYOUT.map((item, index) => {
        switch (item.type) {
          case "events_gallery":
            return <EventsGallery key={index} images={eventImages} />;

          case "books_gallery":
            return <BooksGallery key={index} images={bookImages} />;

          case "course": {
            const course: Course | undefined = COURSES[item.source ?? 0];
            if (!course) return null;
            return (
              <section
                key={index}
                className="bg-white text-black relative overflow-hidden"
                dir="rtl"
              >
                <div className="border-b-2 border-black relative overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
                    <div
                      className="absolute -top-[15%] -right-[5%] text-black/[0.03] font-black text-[18vw] leading-none whitespace-nowrap uppercase"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      MASTERCLASS
                    </div>
                    <div
                      className="absolute bottom-4 left-10 text-black/[0.025] font-black text-[10vw] leading-none whitespace-nowrap"
                      style={{ fontFamily: "var(--font-doran)" }}
                    >
                      آموزش تخصصی
                    </div>
                    <div className="absolute top-1/3 left-4 -translate-y-1/2 -rotate-90 text-[10px] font-mono tracking-[0.4em] text-black/15 uppercase">
                      SPEC: NO. {course.number} // VERIFIED
                    </div>
                  </div>

                  <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24 relative z-10">
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
                key={index}
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
                    <div className="absolute top-1/3 left-4 -translate-y-1/2 -rotate-90 text-[10px] font-mono tracking-[0.4em] text-black/15 uppercase">
                      SPEC: NO. P{String(displayIndex).padStart(2, "0")} // VERIFIED
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
              <CoachingSection key={index} items={coachingItems ?? []} />
            );

          case "tribute":
            return <TributeSection key={index} tribute={tribute ?? null} />;

          case "head_coach":
            return (
              <HeadCoachSection key={index} coach={headCoach ?? null} />
            );

          case "partners":
            return <Partners key={index} />;

          case "faq":
            return <FAQ key={index} />;

          default:
            return null;
        }
      })}

      <Footer />
    </main>
  );
}