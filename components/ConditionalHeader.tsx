"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

export default function ConditionalHeader() {
  const pathname = usePathname();

  // توی این مسیرها هدر نشون نده
  if (pathname?.startsWith("/admin")) return null;
  if (pathname?.startsWith("/login")) return null;

  return <Header />;
}