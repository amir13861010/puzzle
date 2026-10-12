import type { Metadata } from "next";
import localFont from "next/font/local";
import { Space_Grotesk, Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
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
  title: "Puzzle",
  description: "Puzzle brand",
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