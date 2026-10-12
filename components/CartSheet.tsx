"use client";

import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet";
import { Trash2, Minus, Plus, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import Link from "next/link";

export default function CartSheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const items = useCart((s) => s.items);
  const updateQuantity = useCart((s) => s.updateQuantity);
  const removeItem = useCart((s) => s.removeItem);
  const totalPrice = useCart((s) => s.totalPrice);
  const totalItems = useCart((s) => s.totalItems);

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent
        side="left"
        className="w-full md:w-[420px] md:max-w-md p-0 bg-[#fafafa] border-l-2 border-black flex flex-col [&>button]:hidden"
      >
        {/* هدر */}
        <div className="bg-black text-white p-6 md:p-8 relative shrink-0">
          <button
            type="button"
            onClick={onClose}
            aria-label="بستن"
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.3em] uppercase text-white/50 mb-4 border-b border-white/10 pb-3">
            <span>[ CART ]</span>
            <span>{String(totalItems()).padStart(2, "0")} ITEMS</span>
          </div>

          <h2
            className="text-3xl md:text-4xl font-black text-white"
            style={{ fontFamily: "var(--font-doran)" }}
          >
            سبد خرید
          </h2>
        </div>

        {/* محتوا */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="w-16 h-16 border border-black/10 flex items-center justify-center mb-6">
              <ShoppingBag className="w-6 h-6 text-black/40" />
            </div>
            <p
              className="text-neutral-500 mb-6"
              style={{ fontFamily: "var(--font-doran)" }}
            >
              سبد خریدت خالیه
            </p>
            <Link
              href="/store"
              onClick={onClose}
              className="inline-flex items-center gap-2 border border-black px-5 py-3 text-sm font-bold hover:bg-black hover:text-white transition-colors"
              style={{ fontFamily: "var(--font-doran)" }}
            >
              برو به فروشگاه
              <span className="font-mono">←</span>
            </Link>
          </div>
        ) : (
          <>
            {/* لیست آیتم‌ها */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-black/10 p-3 flex gap-3"
                >
                  {/* عکس */}
                  <Link
                    href={`/store/${item.id}`}
                    onClick={onClose}
                    className="w-20 h-20 bg-neutral-100 shrink-0 overflow-hidden border border-black/10"
                  >
                    {item.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-black/20 text-[10px] font-mono">
                        NO IMG
                      </div>
                    )}
                  </Link>

                  {/* اطلاعات */}
                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/store/${item.id}`}
                        onClick={onClose}
                        className="font-bold text-sm text-black line-clamp-2 hover:text-black/70 transition-colors"
                        style={{ fontFamily: "var(--font-doran)" }}
                      >
                        {item.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-neutral-400 hover:text-red-600 transition-colors p-1 shrink-0"
                        aria-label="حذف"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="mt-auto pt-3 flex items-center justify-between">
                      {/* تعداد */}
                      <div className="flex items-center border border-black/15">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-7 h-7 flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors"
                          aria-label="کاهش"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold">
                          {item.quantity.toLocaleString("fa-IR")}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-7 h-7 flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors"
                          aria-label="افزایش"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* قیمت */}
                      <div
                        className="font-black text-black text-sm"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {(item.price * item.quantity).toLocaleString("fa-IR")}
                        <span className="text-[10px] font-mono text-neutral-400 mr-1">
                          تومان
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* جمع + CTA */}
            <div className="border-t-2 border-black p-4 md:p-6 bg-white shrink-0 space-y-4">
              {/* جمع */}
              <div className="flex items-center justify-between pb-4 border-b border-black/10">
                <span
                  className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-500"
                >
                  TOTAL
                </span>
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-2xl font-black text-black"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {totalPrice().toLocaleString("fa-IR")}
                  </span>
                  <span className="font-mono text-[10px] text-neutral-500">
                    تومان
                  </span>
                </div>
              </div>

              {/* دکمه تسویه */}
              <Link
                href="/checkout"
                onClick={onClose}
                className="group flex items-center justify-between w-full bg-black text-white hover:bg-[#c8ff00] hover:text-black px-5 py-4 transition-all border border-black"
              >
                <span
                  className="text-sm md:text-base font-bold"
                  style={{ fontFamily: "var(--font-doran)" }}
                >
                  تسویه حساب
                </span>
                <span className="font-mono text-lg group-hover:-translate-x-1 transition-transform">
                  ←
                </span>
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}