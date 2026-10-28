"use client";

import { useState, type FormEvent } from "react";

export default function NewsletterForm() {
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    const form = event.currentTarget;
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: new FormData(form).get("email") }),
      });
      const result = await response.json();
      setMessage(result.message || result.error);
      if (response.ok) form.reset();
    } catch {
      setMessage("ثبت ایمیل انجام نشد. دوباره تلاش کنید.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="bg-white/5 border border-white/10 p-6">
      <h4 className="text-sm font-bold mb-4 font-mono">JOIN THE LIST</h4>
      <input name="email" type="email" required placeholder="EMAIL ADDRESS" aria-label="ایمیل" className="w-full bg-transparent border-b-2 border-white/30 py-2 mb-4 focus:border-[#c8ff00] outline-none font-mono text-sm text-white placeholder:text-white/40" />
      <button disabled={busy} className="w-full bg-[#c8ff00] text-black font-black py-3 px-4 uppercase hover:bg-white transition-all disabled:opacity-60">
        {busy ? "در حال ثبت..." : "ثبت‌نام ❋"}
      </button>
      {message && <p role="status" className="mt-3 text-sm text-white/80">{message}</p>}
    </form>
  );
}
