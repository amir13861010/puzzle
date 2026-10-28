import CoursesCatalog from "@/components/CoursesCatalog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "دوره‌های پازل",
  description: "دوره‌های پازل برای تقویت مهارت‌های نرم و توانمندی‌های حرفه‌ای در محیط کار.",
  keywords: ["دوره پازل", "مهارت‌های نرم", "توسعه فردی", "آموزش سازمانی"],
  alternates: { canonical: "/puzzle" },
};

export const dynamic = "force-dynamic";

export default function PuzzleCoursesPage() {
  return <CoursesCatalog type="puzzle" />;
}
