import type { MetadataRoute } from "next";
import { getPayloadClient } from "@/lib/payload";

const SITE_URL = "https://www.puzzleio.ir";

const staticPages: MetadataRoute.Sitemap = [
  {
    url: SITE_URL,
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    url: `${SITE_URL}/courses`,
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    url: `${SITE_URL}/club`,
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: `${SITE_URL}/puzzle`,
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: `${SITE_URL}/store`,
    changeFrequency: "daily",
    priority: 0.8,
  },
];

type SitemapDocument = {
  id?: string | number;
  slug?: string;
  updatedAt?: string;
  publishedAt?: string;
  status?: string;
};

function lastModified(document: SitemapDocument) {
  const value = document.updatedAt ?? document.publishedAt;
  return value ? new Date(value) : undefined;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const payload = await getPayloadClient();
    const [courses, products, posts] = await Promise.all([
      payload.find({ collection: "courses", limit: 1000 }),
      payload.find({ collection: "products", limit: 1000 }),
      payload.find({
        collection: "posts",
        where: { status: { equals: "published" } },
        limit: 1000,
      }),
    ]);

    const coursePages = (courses.docs as SitemapDocument[])
      .filter((course) => course.slug)
      .map((course) => ({
        url: `${SITE_URL}/courses/${encodeURIComponent(course.slug!)}`,
        lastModified: lastModified(course),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));

    const productPages = (products.docs as SitemapDocument[])
      .filter((product) => product.id !== undefined && product.id !== null)
      .map((product) => ({
        url: `${SITE_URL}/store/${encodeURIComponent(String(product.id))}`,
        lastModified: lastModified(product),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      }));

    const postPages = (posts.docs as SitemapDocument[])
      .filter((post) => post.slug)
      .map((post) => ({
        url: `${SITE_URL}/blog/${encodeURIComponent(post.slug!)}`,
        lastModified: lastModified(post),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }));

    return [...staticPages, ...coursePages, ...productPages, ...postPages];
  } catch {
    // A temporary CMS/database outage must not make /sitemap.xml unavailable.
    return staticPages;
  }
}
