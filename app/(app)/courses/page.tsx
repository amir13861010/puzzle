import CoursesCatalog from "@/components/CoursesCatalog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "دوره‌های آموزشی",
  description: "فهرست دوره‌های آموزشی پازل در مدیریت محصول، مهارت‌های نرم و توسعهٔ حرفه‌ای.",
  keywords: ["دوره مدیریت محصول", "دوره مهارت‌های نرم", "دوره آموزشی پازل"],
  alternates: { canonical: "/courses" },
};

export const dynamic = "force-dynamic";

export default function CoursesPage() {
  return <CoursesCatalog />;
}
