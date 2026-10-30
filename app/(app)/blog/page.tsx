import BlogArchive from "@/components/BlogArchive";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "مقالات پازل",
  description: "مقاله‌ها و یادداشت‌های تخصصی مجلهٔ پازل.",
  alternates: { canonical: "/blog" },
};

export const dynamic = "force-dynamic";

export default function BlogPage() {
  return <BlogArchive title="همهٔ مقالات" />;
}
