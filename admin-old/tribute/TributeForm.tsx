"use client";

import { useState } from "react";
import { Upload, X, Loader2, AlertCircle } from "lucide-react";
import { saveTribute } from "./actions";

type Tribute = {
  id?: number;
  image_url?: string | null;
  alt?: string | null;
  title?: string | null;
  description?: string | null;
};

export function TributeForm({ initial }: { initial?: Tribute }) {
  const [preview, setPreview] = useState<string | null>(
    initial?.image_url ?? null
  );
  const [imageName, setImageName] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    setError(null);
    const result = await saveTribute(formData);
    if (result?.error) {
      setError(result.error);
      setIsPending(false);
    }
  }

  return (
    <form action={handleSubmit} className="bg-white border border-black/10 p-6 md:p-10 space-y-6">
      {/* عکس */}
      <div>
        <label className="block text-xs tracking-widest uppercase text-black/60 mb-2 font-mono">
          عکس
        </label>

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setPreview(URL.createObjectURL(file));
              setImageName(file.name);
            }
          }}
          className="w-full border border-black/20 px-3 py-2 text-sm file:mr-3 file:py-2 file:px-4 file:border-0 file:bg-black file:text-white file:text-xs file:font-bold hover:file:bg-black/80 file:cursor-pointer cursor-pointer"
        />

        {preview && (
          <div className="mt-4 w-48 h-60 border border-black/20 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt={initial?.alt ?? "پیش‌نمایش"}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        {imageName && (
          <p className="text-xs text-black/50 font-mono mt-2 truncate">
            {imageName}
          </p>
        )}
      </div>

      {/* تیتر */}
      <div>
        <label className="block text-xs tracking-widest uppercase text-black/60 mb-2 font-mono">
          تیتر
        </label>
        <input
          name="title"
          defaultValue={initial?.title ?? ""}
          placeholder="مثلاً: ادای دین به آقا مسعود"
          className="w-full border border-black/20 px-4 py-3 focus:border-black focus:outline-none"
        />
      </div>

      {/* Alt */}
      <div>
        <label className="block text-xs tracking-widest uppercase text-black/60 mb-2 font-mono">
          Alt (توضیح عکس)
        </label>
        <input
          name="alt"
          defaultValue={initial?.alt ?? ""}
          className="w-full border border-black/20 px-4 py-3 focus:border-black focus:outline-none"
        />
      </div>

      {/* توضیحات */}
      <div>
        <label className="block text-xs tracking-widest uppercase text-black/60 mb-2 font-mono">
          توضیحات کامل
        </label>
        <textarea
          name="description"
          defaultValue={initial?.description ?? ""}
          rows={12}
          placeholder="متن ادای دین اینجا نوشته می‌شود..."
          className="w-full border border-black/20 px-4 py-3 focus:border-black focus:outline-none resize-none leading-loose"
        />
      </div>

      {error && (
        <div className="flex items-start gap-2 border border-red-300 bg-red-50 text-red-700 text-sm p-3">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="group flex items-center justify-between w-full border-2 border-black bg-black text-white hover:bg-[#c8ff00] hover:text-black px-6 py-4 transition-all shadow-[4px_4px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 disabled:opacity-50"
      >
        <span className="flex items-center gap-2 text-sm md:text-base font-bold">
          {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
          {isPending ? "در حال ذخیره..." : "ذخیره"}
        </span>
        <span className="font-mono font-bold text-lg">←</span>
      </button>
    </form>
  );
}