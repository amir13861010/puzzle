"use client";

import { useState, useEffect, useCallback } from "react";
import { Loader2, Check, AlertCircle, Send, MessageSquare } from "lucide-react";

type Comment = {
  id: string;
  fullName: string;
  email: string;
  comment: string;
  createdAt: string;
};

export default function BlogComments({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    comment: "",
  });

  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(`/api/comments?postId=${postId}`);
      const data = await res.json();
      setComments(data.comments || []);
    } catch {
      setComments([]);
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          postId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "خطا در ثبت کامنت");
        return;
      }

      setSuccessMsg(
        "کامنت شما ثبت شد و پس از تایید ادمین نمایش داده می‌شه ✅"
      );
      setForm({ fullName: "", email: "", comment: "" });

      // پاک کردن پیام موفقیت بعد از ۵ ثانیه
      setTimeout(() => setSuccessMsg(null), 5000);
    } catch {
      setErrorMsg("خطا در ارسال. لطفاً دوباره تلاش کن.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="mt-20 pt-12 border-t-2 border-black">
      {/* هدر بخش */}
      <div className="flex items-center justify-between gap-4 mb-8 font-mono text-xs font-bold uppercase tracking-widest border-b border-black/20 pb-3">
        <span className="flex items-center gap-2 text-black">
          <MessageSquare className="w-4 h-4" />
          DISCUSSION // کامنت‌ها
        </span>
        <span className="text-neutral-500">
          {comments.length.toLocaleString("fa-IR")} COMMENT
        </span>
      </div>

      {/* لیست کامنت‌ها */}
      {loading ? (
        <div className="flex items-center justify-center py-8 text-neutral-500">
          <Loader2 className="w-5 h-5 animate-spin" />
        </div>
      ) : comments.length === 0 ? (
        <div className="bg-white border-2 border-black p-6 text-center font-mono text-sm text-neutral-500 shadow-[4px_4px_0px_#000]">
          هنوز کامنتی برای این مقاله ثبت نشده. اولین نفر باش!
        </div>
      ) : (
        <div className="space-y-4 mb-10">
          {comments.map((c) => (
            <div
              key={c.id}
              className="bg-white border-2 border-black p-5 shadow-[3px_3px_0px_#000]"
            >
              <div className="flex items-center justify-between gap-3 mb-3 pb-3 border-b border-black/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-black text-[#c8ff00] flex items-center justify-center font-black text-sm">
                    {c.fullName.charAt(0).toUpperCase()}
                  </div>
                  <span
                    className="font-black text-black text-sm"
                    style={{ fontFamily: "var(--font-doran)" }}
                  >
                    {c.fullName}
                  </span>
                </div>
                <span className="font-mono text-[10px] tracking-widest uppercase text-neutral-400">
                  {new Date(c.createdAt).toLocaleDateString("fa-IR")}
                </span>
              </div>
              <p
                className="text-neutral-700 leading-relaxed text-sm md:text-base whitespace-pre-line"
                style={{ fontFamily: "var(--font-doran)" }}
              >
                {c.comment}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* فرم ثبت کامنت */}
      <div className="bg-white border-2 border-black p-6 md:p-8 shadow-[6px_6px_0px_#000]">
        <div className="font-mono text-xs font-bold uppercase tracking-widest text-black mb-6 pb-3 border-b border-black/20">
          WRITE YOUR COMMENT // کامنت بذار
        </div>

        {successMsg && (
          <div className="flex items-start gap-2 bg-[#c8ff00] border-2 border-black text-black p-3 mb-6 text-sm font-bold">
            <Check className="w-4 h-4 mt-0.5 shrink-0" strokeWidth={2.5} />
            <span style={{ fontFamily: "var(--font-doran)" }}>
              {successMsg}
            </span>
          </div>
        )}

        {errorMsg && (
          <div className="flex items-start gap-2 bg-red-50 border-2 border-red-300 text-red-700 p-3 mb-6 text-sm font-bold">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span style={{ fontFamily: "var(--font-doran)" }}>
              {errorMsg}
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* نام */}
          <div>
            <label
              className="block font-mono text-xs font-bold uppercase tracking-widest text-black mb-2"
            >
              Full Name // نام کامل *
            </label>
            <input
              type="text"
              value={form.fullName}
              onChange={(e) =>
                setForm({ ...form, fullName: e.target.value })
              }
              required
              placeholder="نام کاملت رو بنویس"
              className="w-full border-2 border-black px-4 py-3 font-bold focus:outline-none focus:bg-[#c8ff00]/20 transition-colors"
              style={{ fontFamily: "var(--font-doran)" }}
            />
          </div>

          {/* ایمیل */}
          <div>
            <label
              className="block font-mono text-xs font-bold uppercase tracking-widest text-black mb-2"
            >
              Email // ایمیل *
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              required
              placeholder="your@email.com"
              dir="ltr"
              className="w-full border-2 border-black px-4 py-3 font-mono text-sm focus:outline-none focus:bg-[#c8ff00]/20 transition-colors text-left"
            />
          </div>

          {/* کامنت */}
          <div>
            <label
              className="block font-mono text-xs font-bold uppercase tracking-widest text-black mb-2"
            >
              Comment // متن کامنت *
            </label>
            <textarea
              value={form.comment}
              onChange={(e) =>
                setForm({ ...form, comment: e.target.value })
              }
              required
              rows={5}
              placeholder="نظرت رو بنویس..."
              className="w-full border-2 border-black px-4 py-3 focus:outline-none focus:bg-[#c8ff00]/20 transition-colors leading-relaxed resize-none"
              style={{ fontFamily: "var(--font-doran)" }}
            />
          </div>

          {/* دکمه ارسال */}
          <button
            type="submit"
            disabled={submitting}
            className="group inline-flex items-center gap-3 border-2 border-black bg-black text-white hover:bg-[#c8ff00] hover:text-black px-8 py-4 transition-all shadow-[4px_4px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: "var(--font-doran)" }}
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="font-black">در حال ارسال...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span className="font-black">ارسال کامنت</span>
              </>
            )}
          </button>

          <p className="font-mono text-[10px] tracking-widest uppercase text-neutral-400 pt-2">
            کامنت‌ها بعد از تایید ادمین نمایش داده می‌شن
          </p>
        </form>
      </div>
    </section>
  );
}