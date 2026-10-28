import type { MetadataRoute } from "next";
import { getPayloadClient } from "@/lib/payload";

export default async function robots(): Promise<MetadataRoute.Robots> {
  let siteUrl = "https://www.puzzleio.ir";
  let allowIndexing = true;
  try {
    const payload = await getPayloadClient();
    const settings = await payload.findGlobal({ slug: "seo-settings" as never }) as unknown as Record<string, unknown>;
    if (typeof settings.siteUrl === "string" && settings.siteUrl) siteUrl = settings.siteUrl;
    allowIndexing = settings.allowIndexing !== false;
  } catch (error) {
    console.error("Failed to load SEO settings for robots.txt", error);
  }
  return {
    rules: {
      userAgent: "*",
      allow: allowIndexing ? "/" : undefined,
      disallow: ["/admin/", "/api/", "/checkout/"],
    },
    sitemap: `${siteUrl.replace(/\/$/, "")}/sitemap.xml`,
  };
}
