"use client";

import { useState } from "react";
import {
  Trash2,
  Plus,
  Loader2,
  AlertCircle,
  Pencil,
  X,
  ExternalLink,
} from "lucide-react";
import { savePartner, deletePartner } from "./actions";

type Partner = {
  id: string;
  name: string;
  logo_url: string | null;
  alt: string | null;
  website_url: string | null;
  sort_order: number;
  created_at: string;
};

export function PartnersManager({ partners }: { partners: Partner[] }) {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Partner | null>(null);

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
          افزودن حامی
        </button>
      </div>

      {showForm && (
        <PartnerForm
          initial={editing ?? undefined}
          onClose={() => {
            setShowForm(false);
            setEditing(null);
          }}
        />
      )}

      {partners.length === 0 ? (
        <div className="bg-white border border-black/10 p-16 text-center">
          <p className="text-black/60">هنوز حامی‌ای اضافه نشده.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((p) => (
            <div
              key={p.id}
              className="bg-white border border-black/10 overflow-hidden"
            >
              <div className="aspect-video bg-neutral-100 flex items-center justify-center p-6">
                {p.logo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.logo_url}
                    alt={p.alt || p.name}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <div className="text-black/20 text-xs font-mono">NO LOGO</div>
                )}
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-black text-black">{p.name}</h3>
                  {p.website_url && (
                    <a
                      href={p.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-black mt-1 font-mono truncate"
                    >
                      <ExternalLink className="w-3 h-3" />
                      {p.website_url}
                    </a>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditing(p);
                      setShowForm(true);
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 text-xs border border-black/20 hover:bg-black hover:text-white px-3 py-2 transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    ویرایش
                  </button>
                  <DeleteButton id={p.id} logoUrl={p.logo_url} />
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
  logoUrl,
}: {
  id: string;
  logoUrl: string | null;
}) {
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm("مطمئنی می‌خوای حذف کنی؟")) return;
    setDeleting(true);
    await deletePartner(id, logoUrl);
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

function PartnerForm({
  initial,
  onClose,
}: {
  initial?: Partner;
  onClose: () => void;
}) {
  const [preview, setPreview] = useState<string | null>(
    initial?.logo_url ?? null
  );
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    setError(null);
    const result = await savePartner(formData);
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
            {initial ? "ویرایش حامی" : "افزودن حامی"}
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

          <div>
            <label className="block text-xs tracking-widest uppercase text-black/60 mb-2 font-mono">
              لوگو {initial ? "(اختیاری)" : "*"}
            </label>
            <input
              type="file"
              name="logo"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setPreview(URL.createObjectURL(file));
              }}
              className="w-full border border-black/20 px-3 py-2 text-sm file:mr-3 file:py-1 file:px-3 file:border-0 file:bg-black file:text-white file:text-xs file:font-bold"
            />
            {preview && (
              <div className="mt-3 w-40 h-24 border border-black/20 bg-neutral-50 flex items-center justify-center p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={preview}
                  alt="preview"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            )}
          </div>

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

          <div>
            <label className="block text-xs tracking-widest uppercase text-black/60 mb-2 font-mono">
              لینک وب‌سایت
            </label>
            <input
              name="website_url"
              type="url"
              defaultValue={initial?.website_url ?? ""}
              placeholder="https://example.com"
              dir="ltr"
              className="w-full border border-black/20 px-4 py-3 focus:border-black focus:outline-none font-mono text-sm"
            />
          </div>

          <div>
            <label className="block text-xs tracking-widest uppercase text-black/60 mb-2 font-mono">
              Alt (توضیح لوگو)
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