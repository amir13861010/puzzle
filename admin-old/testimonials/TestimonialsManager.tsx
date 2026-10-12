"use client";

import { useState } from "react";
import {
  Trash2,
  Plus,
  Loader2,
  AlertCircle,
  Pencil,
  X,
  MessageSquare,
  Video,
} from "lucide-react";
import { saveTestimonial, deleteTestimonial } from "./actions";

type Testimonial = {
  id: string;
  type: "text" | "video";
  name: string;
  role: string | null;
  quote: string | null;
  image_url: string | null;
  video_url: string | null;
  alt: string | null;
  sort_order: number;
  created_at: string;
};

export function TestimonialsManager({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);

  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="group inline-flex items-center gap-2 bg-black text-white hover:bg-black/80 px-5 py-3 text-sm font-bold transition-colors"
        >
          <Plus className="w-4 h-4" />
          افزودن تجربه
        </button>
      </div>

      {showForm && (
        <TestimonialForm
          initial={editing ?? undefined}
          onClose={() => {
            setShowForm(false);
            setEditing(null);
          }}
        />
      )}

      {testimonials.length === 0 ? (
        <div className="bg-white border border-black/10 p-16 text-center">
          <p className="text-black/60">هنوز تجربه‌ای اضافه نشده.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white border border-black/10 overflow-hidden"
            >
              {t.image_url && (
                <div className="relative aspect-video bg-neutral-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.image_url}
                    alt={t.alt || t.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-black text-white font-mono text-[9px] font-black px-2 py-0.5 flex items-center gap-1">
                    {t.type === "video" ? (
                      <>
                        <Video className="w-3 h-3" /> VIDEO
                      </>
                    ) : (
                      <>
                        <MessageSquare className="w-3 h-3" /> TEXT
                      </>
                    )}
                  </div>
                </div>
              )}
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-black text-black">{t.name}</h3>
                  {t.role && (
                    <p className="text-xs text-neutral-500 font-mono mt-1">
                      {t.role}
                    </p>
                  )}
                </div>
                {t.quote && (
                  <p className="text-xs text-black/60 line-clamp-3">{t.quote}</p>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditing(t);
                      setShowForm(true);
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 text-xs border border-black/20 hover:bg-black hover:text-white px-3 py-2 transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    ویرایش
                  </button>
                  <DeleteButton id={t.id} imageUrl={t.image_url} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DeleteButton({
  id,
  imageUrl,
}: {
  id: string;
  imageUrl: string | null;
}) {
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm("مطمئنی می‌خوای حذف کنی؟")) return;
    setDeleting(true);
    await deleteTestimonial(id, imageUrl);
    setDeleting(false);
  }

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      className="flex-1 flex items-center justify-center gap-1.5 text-xs border border-red-300 text-red-600 hover:bg-red-600 hover:text-white px-3 py-2 transition-colors disabled:opacity-50"
    >
      {deleting ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : (
        <Trash2 className="w-3.5 h-3.5" />
      )}
      حذف
    </button>
  );
}

function TestimonialForm({
  initial,
  onClose,
}: {
  initial?: Testimonial;
  onClose: () => void;
}) {
  const [type, setType] = useState<"text" | "video">(initial?.type ?? "text");
  const [preview, setPreview] = useState<string | null>(
    initial?.image_url ?? null
  );
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    setError(null);
    const result = await saveTestimonial(formData);
    if (result?.error) {
      setError(result.error);
      setIsPending(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-black/15 max-w-lg w-full p-8 my-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-black">
            {initial ? "ویرایش تجربه" : "افزودن تجربه"}
          </h3>
          <button
            onClick={onClose}
            className="text-black/40 hover:text-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form action={handleSubmit} className="space-y-4">
          {initial?.id && <input type="hidden" name="id" value={initial.id} />}

          {/* انتخاب نوع */}
          <div>
            <label className="block text-xs tracking-widest uppercase text-black/60 mb-2 font-mono">
              نوع تجربه *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setType("text")}
                className={`flex items-center justify-center gap-2 border px-4 py-3 text-sm font-bold transition-colors ${
                  type === "text"
                    ? "bg-black text-white border-black"
                    : "bg-white text-black/60 border-black/20 hover:border-black"
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                عکس + متن
              </button>
              <button
                type="button"
                onClick={() => setType("video")}
                className={`flex items-center justify-center gap-2 border px-4 py-3 text-sm font-bold transition-colors ${
                  type === "video"
                    ? "bg-black text-white border-black"
                    : "bg-white text-black/60 border-black/20 hover:border-black"
                }`}
              >
                <Video className="w-4 h-4" />
                ویدیو
              </button>
            </div>
            <input type="hidden" name="type" value={type} />
          </div>

          {/* عکس */}
          <div>
            <label className="block text-xs tracking-widest uppercase text-black/60 mb-2 font-mono">
              {type === "video" ? "کاور ویدیو" : "عکس"}{" "}
              {initial ? "(اختیاری)" : "*"}
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setPreview(URL.createObjectURL(file));
              }}
              className="w-full border border-black/20 px-3 py-2 text-sm file:mr-3 file:py-1 file:px-3 file:border-0 file:bg-black file:text-white file:text-xs file:font-bold"
            />
            {preview && (
              <div className="mt-3 w-40 aspect-video border border-black/20 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* لینک ویدیو */}
          {type === "video" && (
            <div>
              <label className="block text-xs tracking-widest uppercase text-black/60 mb-2 font-mono">
                لینک ویدیو
              </label>
              <input
                name="video_url"
                defaultValue={initial?.video_url ?? ""}
                placeholder="https://youtube.com/..."
                dir="ltr"
                className="w-full border border-black/20 px-4 py-3 focus:border-black focus:outline-none font-mono text-sm"
              />
            </div>
          )}

          {/* نام */}
          <div>
            <label className="block text-xs tracking-widest uppercase text-black/60 mb-2 font-mono">
              نام *
            </label>
            <input
              name="name"
              defaultValue={initial?.name ?? ""}
              required
              className="w-full border border-black/20 px-4 py-3 focus:border-black focus:outline-none"
            />
          </div>

          {/* سِمت */}
          <div>
            <label className="block text-xs tracking-widest uppercase text-black/60 mb-2 font-mono">
              سِمت / نقش
            </label>
            <input
              name="role"
              defaultValue={initial?.role ?? ""}
              placeholder="مثلاً: مدیر محصول"
              className="w-full border border-black/20 px-4 py-3 focus:border-black focus:outline-none"
            />
          </div>

          {/* متن حرف */}
          <div>
            <label className="block text-xs tracking-widest uppercase text-black/60 mb-2 font-mono">
              متن حرف / توضیح
            </label>
            <textarea
              name="quote"
              defaultValue={initial?.quote ?? ""}
              rows={5}
              placeholder="چی گفت؟"
              className="w-full border border-black/20 px-4 py-3 focus:border-black focus:outline-none resize-none leading-loose"
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
              ذخیره
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}