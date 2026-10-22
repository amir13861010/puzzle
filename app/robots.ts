import type { MetadataRoute } from "next";

const SITE_URL = "https://www.puzzleio.ir";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/", "/checkout/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
