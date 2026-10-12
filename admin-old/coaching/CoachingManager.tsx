"use client";

import { useState } from "react";
import { Trash2, Plus, Loader2, AlertCircle, Pencil } from "lucide-react";
import { saveCoaching, deleteCoaching } from "./actions";

type CoachingItem = {
  id: string;
  image_url: string;
  alt: string | null;
  title: string | null;
  description: string | null;
  created_at: string;
};

export function CoachingManager({ items }: { items: CoachingItem[] }) {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<CoachingItem | null>(null);

  return (
    <div className="space-y-8">
      {/* دکمه افزودن */}
      <div className="flex justify-end">
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="group inline-flex items-center gap-2 bg-black text-white hover:bg-black/80 px-5 py-3 text-sm font-bold transition-colors"
        >
          <Plus className="w-4 h-4" />
          افزودن کوچ
        </button>
      </div>

      {/* مودال فرم */}
      {showForm && (
        <CoachingForm
          initial={editing ?? undefined}
          onClose={() => {
            setShowForm(false);
            setEditing(null);
          }}
        />
      )}

      {/* لیست */}
      {items.length === 0 ? (
        <div className="bg-white border border-black/10 p-16 text-center">
          <p className="text-black/60">هنوز کوچی اضافه نشده.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white border border-black/10 p-4 space-y-4">
              <div className="aspect-[4/3] bg-neutral-100 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image_url}
                  alt={item.alt || ""}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                {item.title && (
                  <h3 className="font-black text-black mb-1">{item.title}</h3>
                )}
                {item.description && (
                  <p className="text-xs text-black/60 line-clamp-2">
                    {item.description}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditing(item);
                    setShowForm(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 text-xs border border-black/20 hover:bg-black hover:text-white px-3 py-2 transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  ویرایش
                </button>
                <DeleteButton id={item.id} imageUrl={item.image_url} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DeleteButton({ id, imageUrl }: { id: string; imageUrl: string }) {
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm("مطمئنی می‌خوای حذف کنی؟")) return;
    setDeleting(true);
    await deleteCoaching(id, imageUrl);
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

function CoachingForm({
  initial,
  onClose,
}: {
  initial?: CoachingItem;
  onClose: () => void;
}) {
  const [preview, setPreview] = useState<string | null>(initial?.image_url ?? null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    setError(null);
    const result = await saveCoaching(formData);
    if (result?.error) {
      setError(result.error);
      setIsPending(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-black/15 max-w-lg w-full p-8 my-8">
        <h3 className="text-2xl font-black mb-6">
          {initial ? "ویرایش کوچ" : "افزودن کوچ"}
        </h3>

        <form action={handleSubmit} className="space-y-4">
          {initial?.id && <input type="hidden" name="id" value={initial.id} />}

          <div>
            <label className="block text-xs tracking-widest uppercase text-black/60 mb-2 font-mono">
              عکس {initial ? "(اختیاری برای تغییر)" : "*"}
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              required={!initial}
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
              defaultValue={initial?.title ?? ""}
              placeholder="مثلاً: کوچ اختصاصی مدیریت محصول"
              className="w-full border border-black/20 px-4 py-3 focus:border-black focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs tracking-widest uppercase text-black/60 mb-2 font-mono">
              Alt (توضیح عکس برای SEO)
            </label>
            <input
              name="alt"
              defaultValue={initial?.alt ?? ""}
              className="w-full border border-black/20 px-4 py-3 focus:border-black focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs tracking-widest uppercase text-black/60 mb-2 font-mono">
              توضیحات
            </label>
            <textarea
              name="description"
              defaultValue={initial?.description ?? ""}
              rows={4}
              className="w-full border border-black/20 px-4 py-3 focus:border-black focus:outline-none resize-none"
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