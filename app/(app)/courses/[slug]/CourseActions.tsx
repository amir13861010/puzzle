"use client";

import { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/lib/cart";

type Course = {
  id: string;
  slug: string;
  title_fa: string;
  price: number;
  image: string | null;
};

export default function CourseActions({ course }: { course: Course }) {
  const [added, setAdded] = useState(false);
  const addItem = useCart((s) => s.addItem);

  function handleAddToCart() {
    addItem(
      {
        id: course.id,
        name: course.title_fa,
        price: course.price,
        image_url: course.image,
      },
      1
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="space-y-6 max-w-md">
      <button
        type="button"
        onClick={handleAddToCart}
        className={`group flex items-center justify-between w-full border px-6 py-4 transition-all ${
          added
            ? "bg-black text-[#c8ff00] border-black"
            : "bg-black text-white border-black hover:bg-[#c8ff00] hover:text-black"
        }`}
      >
        <span
          className="flex items-center gap-3 text-sm md:text-base font-bold"
          style={{ fontFamily: "var(--font-doran)" }}
        >
          {added ? (
            <>
              <Check className="w-4 h-4" strokeWidth={2.5} />
              اضافه شد به سبد
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" strokeWidth={2} />
              ثبت‌نام در دوره
            </>
          )}
        </span>
        <span className="font-mono text-base group-hover:-translate-x-1 transition-transform">
          ←
        </span>
      </button>

      <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-400 pt-2">
        <span>COURSE · {course.slug.toUpperCase()}</span>
        <span>AVAILABLE</span>
      </div>
    </div>
  );
}