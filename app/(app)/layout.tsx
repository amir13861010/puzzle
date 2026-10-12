import type { Metadata } from "next";
import localFont from "next/font/local";
import {
  Space_Grotesk,
  Inter,
  Playfair_Display,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import ConditionalHeader from "@/components/ConditionalHeader";
import Footer from "@/components/sections/Footer";

// فونت Doran برای فارسی
const doran = localFont({
  src: [
    {
      path: "./fonts/doran/Doran-VF.ttf",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-doran",
  display: "swap",
});

// فونت‌های لاتین
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
    "جامعه‌ای غیررسمی، منتقد و رو به رشد برای مدیران محصول، دیزاینرها و سازندگان جسور. از تهران بخر، انتخاب کن، ما می‌خریم.",
  keywords: [
    "پازل",
    "باشگاه مدیران محصول",
    "مدیریت محصول",
    "کوهنوردی",
    "سفر",
    "تهران",
    "فروشگاه",
    "دوره",
    "کوچینگ",
  ],
  authors: [{ name: "Puzzle Club", url: "https://www.puzzleio.ir" }],
  creator: "Puzzle Club",
  publisher: "Puzzle Club",
  applicationName: "Puzzle",
  category: "education",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: "https://www.puzzleio.ir",
    siteName: "پازل",
    title: "پازل — باشگاه مدیران محصول جوان",
    description:
      "جامعه‌ای غیررسمی، منتقد و رو به رشد برای مدیران محصول، دیزاینرها و سازندگان جسور.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "پازل — باشگاه مدیران محصول جوان",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "پازل — باشگاه مدیران محصول جوان",
    description:
      "جامعه‌ای غیررسمی، منتقد و رو به رشد برای مدیران محصول، دیزاینرها و سازندگان جسور.",
    images: ["/og-image.png"],
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
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

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
      <body className="font-sans bg-black">
        <ConditionalHeader />
        {children}
        <Footer />
      </body>
    </html>
  );
}