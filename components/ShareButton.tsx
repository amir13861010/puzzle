"use client";

import { useState } from "react";
import {
  Share2,
  Copy,
  Check,
  X,
  Send,
  MessageCircle,
  Linkedin,
  Twitter,
} from "lucide-react";

export default function ShareButton({
  title,
  text,
}: {
  title: string;
  text?: string;
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  function getShareUrl() {
    if (typeof window === "undefined") return "";
    return window.location.href;
  }

  function getShareData() {
    return {
      title,
      text: text || "",
      url: getShareUrl(),
    };
  }

  // اشتراک‌گذاری با Web Share API
  async function handleNativeShare() {
    const data = getShareData();

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(data);
        return;
      } catch {
        // کاربر کنسل کرد یا خطا داد → fallback
      }
    }

    // fallback: باز کردن منوی سفارشی
    setOpen(true);
  }

  // کپی لینک
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(getShareUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }

  // اشتراک در تلگرام
  function shareTelegram() {
    const url = encodeURIComponent(getShareUrl());
    const txt = encodeURIComponent(title);
    window.open(
      `https://t.me/share/url?url=${url}&text=${txt}`,
      "_blank"
    );
    setOpen(false);
  }

  // اشتراک در واتساپ
  function shareWhatsapp() {
    const url = encodeURIComponent(getShareUrl());
    const txt = encodeURIComponent(`${title}\n${getShareUrl()}`);
    window.open(`https://wa.me/?text=${txt}`, "_blank");
    setOpen(false);
  }

  // اشتراک در توییتر
  function shareTwitter() {
    const url = encodeURIComponent(getShareUrl());
    const txt = encodeURIComponent(title);
    window.open(
      `https://twitter.com/intent/tweet?text=${txt}&url=${url}`,
      "_blank"
    );
    setOpen(false);
  }

  // اشتراک در لینکدین
  function shareLinkedin() {
    const url = encodeURIComponent(getShareUrl());
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      "_blank"
    );
    setOpen(false);
  }

  return (
    <>
      {/* دکمه اصلی */}
      <button
        type="button"
        onClick={handleNativeShare}
        className="inline-flex items-center gap-2 border-2 border-black bg-white hover:bg-[#c8ff00] px-4 py-2 transition-all shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 font-bold"
        style={{ fontFamily: "var(--font-doran)" }}
      >
        <Share2 className="w-4 h-4" />
        اشتراک‌گذاری
      </button>

      {/* مودال اشتراک */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white border-2 border-black shadow-[8px_8px_0px_#000] max-w-md w-full p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* هدر */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b-2 border-black">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 bg-black text-[#c8ff00] flex items-center justify-center">
                  <Share2 className="w-4 h-4" />
                </span>
                <h3
                  className="text-lg md:text-xl font-black text-black"
                  style={{ fontFamily: "var(--font-doran)" }}
                >
                  اشتراک‌گذاری
                </h3>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-black/40 hover:text-black transition-colors p-1"
                aria-label="بستن"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* لینک */}
            <div className="bg-[#f5f5f5] border-2 border-black p-3 mb-6 font-mono text-xs text-neutral-600 break-all">
              {getShareUrl()}
            </div>

            {/* دکمه‌های اشتراک */}
            <div className="grid grid-cols-2 gap-3">
              {/* تلگرام */}
              <button
                onClick={shareTelegram}
                className="group flex items-center gap-3 border-2 border-black bg-white hover:bg-[#229ED9] hover:text-white px-4 py-3 transition-all shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5"
                style={{ fontFamily: "var(--font-doran)" }}
              >
                <Send className="w-4 h-4" />
                <span className="text-sm font-black">تلگرام</span>
              </button>

              {/* واتساپ */}
              <button
                onClick={shareWhatsapp}
                className="group flex items-center gap-3 border-2 border-black bg-white hover:bg-[#25D366] hover:text-white px-4 py-3 transition-all shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5"
                style={{ fontFamily: "var(--font-doran)" }}
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm font-black">واتساپ</span>
              </button>

              {/* توییتر */}
              <button
                onClick={shareTwitter}
                className="group flex items-center gap-3 border-2 border-black bg-white hover:bg-black hover:text-white px-4 py-3 transition-all shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5"
                style={{ fontFamily: "var(--font-doran)" }}
              >
                <Twitter className="w-4 h-4" />
                <span className="text-sm font-black">توییتر</span>
              </button>

              {/* لینکدین */}
              <button
                onClick={shareLinkedin}
                className="group flex items-center gap-3 border-2 border-black bg-white hover:bg-[#0A66C2] hover:text-white px-4 py-3 transition-all shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5"
                style={{ fontFamily: "var(--font-doran)" }}
              >
                <Linkedin className="w-4 h-4" />
                <span className="text-sm font-black">لینکدین</span>
              </button>
            </div>

            {/* کپی لینک */}
            <button
              onClick={handleCopy}
              className={`mt-4 w-full flex items-center justify-center gap-3 border-2 border-black px-4 py-3 transition-all shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 ${
                copied
                  ? "bg-[#c8ff00] text-black"
                  : "bg-black text-white hover:bg-[#c8ff00] hover:text-black"
              }`}
              style={{ fontFamily: "var(--font-doran)" }}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" strokeWidth={2.5} />
                  <span className="text-sm font-black">کپی شد!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span className="text-sm font-black">کپی لینک</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
}