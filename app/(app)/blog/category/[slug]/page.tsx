import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BlogArchive from "@/components/BlogArchive";
import { getPayloadClient } from "@/lib/payload";

export const dynamic = "force-dynamic";

async function findCategory(slug: string) {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "post_categories",
    where: { slug: { equals: slug } },
    limit: 1,
  });
  return result.docs[0] ?? null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = await findCategory(slug);
  return category
    ? { title: `${category.name} | مقالات پازل`, alternates: { canonical: `/blog/category/${slug}` } }
    : { title: "دسته‌بندی پیدا نشد" };
}

export default async function BlogCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await findCategory(slug);
  if (!category) notFound();
  return <BlogArchive categoryId={category.id} title={category.name} />;
}
