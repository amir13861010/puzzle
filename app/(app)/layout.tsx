import type { Metadata } from "next";
import { getPayloadClient } from "@/lib/payload";
import localFont from "next/font/local";
import {
  Space_Grotesk,
  Inter,
  Playfair_Display,
  JetBrains_Mono,
} from "next/font/google";
import Script from "next/script";
import ConditionalHeader from "@/components/ConditionalHeader";
import Footer from "@/components/sections/Footer";
import SupportButton from "@/components/SupportButton";
import "../globals.css";

const doran = localFont({
  src: [
    {
      path: "../fonts/doran/Doran-VF.ttf",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-doran",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-sans-latin",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const defaults = {
    siteName: "پازل",
    title: "پازل — باشگاه مدیران محصول جوان",
    titleTemplate: "%s | پازل",
    description: "جامعه‌ای غیررسمی، منتقد و رو به رشد برای مدیران محصول، دیزاینرها و سازندگان جسور.",
    keywords: "پازل, باشگاه مدیران محصول, مدیریت محصول, تهران",
    siteUrl: "https://www.puzzleio.ir",
    canonicalUrl: "/",
    allowIndexing: true,
  };
  let settings: typeof defaults & Record<string, unknown> = defaults;

  try {
    const payload = await getPayloadClient();
    const global = await payload.findGlobal({ slug: "seo-settings" as never });
    settings = { ...defaults, ...(global as unknown as Record<string, unknown>) } as typeof settings;
  } catch (error) {
    console.error("Failed to load SEO settings", error);
  }

  const siteName = String(settings.siteName || defaults.siteName);
  const title = String(settings.title || defaults.title);
  const description = String(settings.description || defaults.description);
  const siteUrl = String(settings.siteUrl || defaults.siteUrl);
  const ogTitle = String(settings.ogTitle || title);
  const ogDescription = String(settings.ogDescription || description);
  const media = settings.ogImage && typeof settings.ogImage === "object"
    ? (settings.ogImage as { url?: string }).url
    : undefined;
  const image = media || "/og-image.svg";
  const keywords = String(settings.keywords || defaults.keywords)
    .split(/[,،]/)
    .map((keyword) => keyword.trim())
    .filter(Boolean);
  const allowIndexing = settings.allowIndexing !== false;

  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: String(settings.titleTemplate || defaults.titleTemplate) },
    description,
    keywords,
    authors: [{ name: "Puzzle Club", url: siteUrl }],
    creator: "Puzzle Club",
    publisher: "Puzzle Club",
    applicationName: siteName,
    alternates: { canonical: String(settings.canonicalUrl || "/") },
    verification: settings.googleSiteVerification
      ? { google: String(settings.googleSiteVerification) }
      : undefined,
    openGraph: {
      type: "website",
      locale: "fa_IR",
      url: siteUrl,
      siteName,
      title: ogTitle,
      description: ogDescription,
      images: [{ url: image, width: 1200, height: 630, alt: siteName }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [image],
      creator: settings.twitterHandle ? String(settings.twitterHandle) : undefined,
    },
    robots: {
      index: allowIndexing,
      follow: allowIndexing,
      googleBot: {
        index: allowIndexing,
        follow: allowIndexing,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: { icon: image, shortcut: image, apple: image },
  };
}

const GA_ID = "G-EYHG60JB3K";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${doran.variable} ${spaceGrotesk.variable} ${inter.variable} ${playfair.variable} ${jetbrains.variable} antialiased`}
    >
      <head>
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { page_path: window.location.pathname });
            `,
          }}
        />
      </head>
      <body className="font-sans bg-black">
        <ConditionalHeader />
        {children}
        <Footer />
        <SupportButton />
      </body>
    </html>
  );
}
