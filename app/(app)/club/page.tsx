import CoursesCatalog from "@/components/CoursesCatalog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "دوره‌های باشگاه مدیران محصول جوان",
  description: "دوره‌ها و برنامه‌های آموزشی باشگاه مدیران محصول جوان برای فعالان حوزهٔ محصول.",
  keywords: ["باشگاه مدیران محصول جوان", "دوره مدیریت محصول", "آموزش محصول"],
  alternates: { canonical: "/club" },
};

export const dynamic = "force-dynamic";

export default function ClubCoursesPage() {
  return <CoursesCatalog type="club" />;
}
