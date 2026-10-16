import type { Metadata } from "next";
import localFont from "next/font/local";
import {
  Space_Grotesk,
  Inter,
  Playfair_Display,
  JetBrains_Mono,
} from "next/font/google";
import Script from "next/script";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://www.puzzleio.ir"),
  title: {
    default: "پازل — باشگاه مدیران محصول جوان",
    template: "%s | پازل",
  },
  description:
    "جامعه‌ای غیررسمی، منتقد و رو به رشد برای مدیران محصول، دیزاینرها و سازندگان جسور.",
  keywords: ["پازل", "باشگاه مدیران محصول", "مدیریت محصول", "تهران"],
  authors: [{ name: "Puzzle Club", url: "https://www.puzzleio.ir" }],
  creator: "Puzzle Club",
  publisher: "Puzzle Club",
  applicationName: "Puzzle",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: "https://www.puzzleio.ir",
    siteName: "پازل",
    title: "پازل — باشگاه مدیران محصول جوان",
    description:
      "جامعه‌ای غیررسمی، منتقد و رو به رشد برای مدیران محصول.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "پازل",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "پازل",
    description: "جامعه‌ای برای سازندگان جسور",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/og-image.jpg", type: "image/jpeg" }],
    shortcut: "/og-image.jpg",
    apple: "/og-image.jpg",
  },
};

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
      <body className="font-sans bg-black">{children}</body>
    </html>
  );
}