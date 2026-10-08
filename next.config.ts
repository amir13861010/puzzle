import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ============ تنظیمات عکس‌های Supabase ============
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },

  // ============ تنظیمات Server Actions ============
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // آپلود عکس تا ۱۰ مگابایت
    },
  },

  // ============ Turbopack + Tailwind ============
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;