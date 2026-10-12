"use client";

import { useState } from "react";
import { ShoppingBag, Check, Minus, Plus } from "lucide-react";
import { useCart } from "@/lib/cart";

type Product = {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
};

export default function ProductActions({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCart((s) => s.addItem);

  function handleAddToCart() {
    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="space-y-6 max-w-md">
      {/* تعداد */}
      <div className="flex items-center justify-between pb-6 border-b border-black/10">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-500">
          QUANTITY
        </span>
        <div className="flex items-center border border-black/15">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-9 h-9 flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors"
            aria-label="کاهش"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-10 text-center font-bold text-sm">
            {quantity.toLocaleString("fa-IR")}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="w-9 h-9 flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors"
            aria-label="افزایش"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* دکمه افزودن */}
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
              اضافه شد
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" strokeWidth={2} />
              افزودن به سبد
            </>
          )}
        </span>
        <span className="font-mono text-base group-hover:-translate-x-1 transition-transform">
          ←
        </span>
      </button>

      <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-400 pt-2">
        <span>SKU · {product.id.slice(0, 8)}</span>
        <span>IN STOCK</span>
      </div>
    </div>
  );
}