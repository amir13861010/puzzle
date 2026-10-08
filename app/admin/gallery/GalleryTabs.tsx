"use client";

import { useState } from "react";
import Image from "next/image";
import { Trash2, Plus, Upload, Loader2, AlertCircle } from "lucide-react";
import { saveGalleryImage, deleteGalleryImage } from "./actions";

type GalleryItem = {
  id: string;
  category: "books" | "events";
  image_url: string;
  alt: string | null;
  title: string | null;
  created_at: string;
};

export function GalleryTabs({ images }: { images: GalleryItem[] }) {
  const [tab, setTab] = useState<"books" | "events">("books");
  const [showUpload, setShowUpload] = useState(false);

  const filtered = images.filter((img) => img.category === tab);

  return (
    <div className="space-y-8">
      {/* تب‌ها */}
      <div className="flex items-center gap-2 border-b border-black/15">
        <button
          onClick={() => setTab("books")}
          className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors ${
            tab === "books"
              ? "border-black text-black"
              : "border-transparent text-black/40 hover:text-black"
          }`}
        >
          گالری کتاب‌ها ({images.filter((i) => i.category === "books").length})
        </button>
        <button
          onClick={() => setTab("events")}
          className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors ${
            tab === "events"
              ? "border-black text-black"
              : "border-transparent text-black/40 hover:text-black"
          }`}
        >
          گالری ایونت‌ها ({images.filter((i) => i.category === "events").length})
        </button>

        <button
          onClick={() => setShowUpload(true)}
          className="mr-auto group inline-flex items-center gap-2 bg-black text-white hover:bg-black/80 px-5 py-2.5 text-sm font-bold transition-colors"
        >
          <Plus className="w-4 h-4" />
          افزودن عکس
        </button>
      </div>

      {/* مودال آپلود */}
      {showUpload && (
        <UploadModal
          category={tab}
          onClose={() => setShowUpload(false)}
        />
      )}

      {/* گرید عکس‌ها */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-black/10 p-16 text-center">
          <p className="text-black/60">
            هنوز عکسی توی گالری {tab === "books" ? "کتاب‌ها" : "ایونت‌ها"} نیست.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((img) => (
            <GalleryCard key={img.id} item={img} />
          ))}
        </div>
      )}
    </div>
  );
}

function GalleryCard({ item }: { item: GalleryItem }) {
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm("مطمئنی می‌خوای حذف کنی؟")) return;
    setDeleting(true);
    await deleteGalleryImage(item.id, item.image_url);
    setDeleting(false);
  }

  return (
    <div className="group bg-white border border-black/10 overflow-hidden">
      <div className="relative aspect-[4/3] bg-[#f0efea]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image_url}
          alt={item.alt || ""}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3 space-y-2">
        {item.title && (
          <p className="text-sm font-bold text-black truncate">{item.title}</p>
        )}
        {item.alt && (
          <p className="text-xs text-black/50 line-clamp-2">{item.alt}</p>
        )}
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="w-full flex items-center justify-center gap-1.5 text-xs border border-red-300 text-red-600 hover:bg-red-600 hover:text-white px-3 py-2 transition-colors disabled:opacity-50"
        >
          {deleting ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Trash2 className="w-3.5 h-3.5" />
          )}
          حذف
        </button>
      </div>
    </div>
  );
}

function UploadModal({
  category,
  onClose,
}: {
  category: "books" | "events";
  onClose: () => void;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    setError(null);
    const result = await saveGalleryImage(formData);
    if (result?.error) {
      setError(result.error);
      setIsPending(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-black/15 max-w-lg w-full p-8">
        <h3 className="text-2xl font-black mb-6">
          افزودن عکس به گالری {category === "books" ? "کتاب‌ها" : "ایونت‌ها"}
        </h3>

        <form action={handleSubmit} className="space-y-4">
          <input type="hidden" name="category" value={category} />

          <div>
            <label className="block text-xs tracking-widest uppercase text-black/60 mb-2 font-mono">
              عکس *
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              required
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setPreview(URL.createObjectURL(file));
              }}
              className="w-full border border-black/20 px-3 py-2 text-sm file:mr-3 file:py-1 file:px-3 file:border-0 file:bg-black file:text-white file:text-xs file:font-bold"
            />
            {preview && (
              <div className="mt-3 w-32 h-32 border border-black/20 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={preview} alt="preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs tracking-widest uppercase text-black/60 mb-2 font-mono">
              عنوان
            </label>
            <input
              name="title"
              className="w-full border border-black/20 px-4 py-3 focus:border-black focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs tracking-widest uppercase text-black/60 mb-2 font-mono">
              Alt (توضیح عکس برای SEO)
            </label>
            <input
              name="alt"
              className="w-full border border-black/20 px-4 py-3 focus:border-black focus:outline-none"
            />
          </div>

          {error && (
            <div className="flex items-start gap-2 border border-red-300 bg-red-50 text-red-700 text-sm p-3">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-black/20 px-4 py-3 hover:bg-black/5 transition-colors text-sm font-bold"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 bg-black text-white px-4 py-3 hover:bg-black/80 transition-colors text-sm font-bold disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
              آپلود
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}