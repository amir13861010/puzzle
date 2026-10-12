"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2, AlertCircle } from "lucide-react";
import { saveProduct } from "./actions";

type Product = {
  id?: string;
  name?: string;
  price?: number;
  description?: string | null;
  category?: string | null;
  image_url?: string | null;
};

type Category = {
  id: string;
  name: string;
  slug: string;
};

export function ProductForm({
  initial,
  categories = [],
}: {
  initial?: Product;
  categories?: Category[];
}) {
  const [preview, setPreview] = useState<string | null>(
    initial?.image_url ?? null
  );
  const [imageName, setImageName] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      console.log("[CLIENT] File selected:", file.name, file.size);
      setPreview(URL.createObjectURL(file));
      setImageName(file.name);
    }
  }

  function clearImage() {
    setPreview(null);
    setImageName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setErrorMsg(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    console.log("[CLIENT] ========== SUBMIT ==========");
    console.log("[CLIENT] FormData keys:", [...formData.keys()]);
    for (const [key, value] of formData.entries()) {
      console.log(`[CLIENT]   ${key}:`, value);
      if (value instanceof File) {
        console.log(`[CLIENT]     File: ${value.name}, size: ${value.size}`);
      }
    }

    const result = await saveProduct(formData);

    if (result?.error) {
      setErrorMsg(result.error);
      setIsPending(false);
      return;
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {initial?.id && <input type="hidden" name="id" value={initial.id} />}

      {/* نام محصول */}
      <div>
        <label className="block text-xs tracking-widest uppercase text-black/60 mb-2 font-mono">
          نام محصول *
        </label>
        <input
          name="name"
          defaultValue={initial?.name}
          required
          disabled={isPending}
          className="w-full border border-black/20 px-4 py-3 focus:border-black focus:outline-none bg-white text-black disabled:opacity-50"
        />
      </div>

      {/* قیمت و دسته‌بندی */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs tracking-widest uppercase text-black/60 mb-2 font-mono">
            قیمت (تومان) *
          </label>
          <input
            name="price"
            type="number"
            defaultValue={initial?.price}
            required
            disabled={isPending}
            className="w-full border border-black/20 px-4 py-3 focus:border-black focus:outline-none bg-white text-black disabled:opacity-50"
          />
        </div>

        <div>
          <label className="block text-xs tracking-widest uppercase text-black/60 mb-2 font-mono">
            دسته‌بندی
          </label>
          <select
            name="category"
            defaultValue={initial?.category ?? ""}
            disabled={isPending}
            className="w-full border border-black/20 px-4 py-3 focus:border-black focus:outline-none bg-white text-black disabled:opacity-50"
          >
            <option value="">بدون دسته‌بندی</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {categories.length === 0 && (
            <p className="text-xs text-black/50 mt-2">
              هنوز دسته‌بندی‌ای نساختی.{" "}
              <a
                href="/admin/categories"
                className="underline hover:text-black"
              >
                افزودن دسته‌بندی
              </a>
            </p>
          )}
        </div>
      </div>

      {/* توضیحات */}
      <div>
        <label className="block text-xs tracking-widest uppercase text-black/60 mb-2 font-mono">
          توضیحات
        </label>
        <textarea
          name="description"
          defaultValue={initial?.description ?? ""}
          rows={4}
          disabled={isPending}
          className="w-full border border-black/20 px-4 py-3 focus:border-black focus:outline-none bg-white text-black disabled:opacity-50"
        />
      </div>

      {/* عکس */}
      <div>
        <label className="block text-xs tracking-widest uppercase text-black/60 mb-2 font-mono">
          عکس محصول
        </label>

        {/* input فایل — همیشه توی DOM، مخفی */}
        <input
          ref={fileInputRef}
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          disabled={isPending}
          className="hidden"
        />

        {preview ? (
          <div className="space-y-3">
            <div className="relative w-48 h-48 overflow-hidden border border-black/20 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview}
                alt="پیش‌نمایش"
                className="w-full h-full object-cover"
              />
              {!isPending && (
                <button
                  type="button"
                  onClick={clearImage}
                  className="absolute top-2 left-2 bg-black text-white p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="حذف عکس"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            {imageName && (
              <p className="text-xs text-black/50 font-mono truncate">
                {imageName}
              </p>
            )}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-xs underline hover:text-black transition-colors"
            >
              تغییر عکس
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isPending}
            className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-black/20 cursor-pointer hover:border-black hover:bg-black/[0.02] transition-colors disabled:opacity-50"
          >
            <Upload className="w-6 h-6 text-black/40 mb-2" />
            <span className="text-sm text-black/60">
              کلیک کنید یا عکس را بکشید
            </span>
            <span className="text-[10px] text-black/40 mt-1 font-mono">
              MAX 5MB
            </span>
          </button>
        )}
      </div>

      {/* خطا */}
      {errorMsg && (
        <div className="flex items-start gap-2 border border-red-300 bg-red-50 text-red-700 text-sm p-3">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* دکمه */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="group flex items-center justify-between w-full bg-black text-white hover:bg-black/80 px-6 py-4 transition-colors disabled:opacity-50"
        >
          <span className="flex items-center gap-2 text-sm font-bold">
            {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            {isPending ? "در حال ذخیره..." : "ذخیره محصول"}
          </span>
          <span className="w-6 h-6 bg-[#c8ff00] flex items-center justify-center text-black text-xs group-hover:translate-x-[-4px] transition-transform">
            ←
          </span>
        </button>
      </div>
    </form>
  );
}