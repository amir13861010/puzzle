"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("ایمیل یا رمز عبور اشتباهه");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#f0efea] flex items-center justify-center px-4" dir="rtl">
      <div className="w-full max-w-md">
        <div className="bg-white border border-black/10 p-8 md:p-10">
          {/* لوگو */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-black flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-3 9h-3v3a1 1 0 11-2 0v-3H8a1 1 0 110-2h3V7a1 1 0 112 0v3h3a1 1 0 110 2z" />
              </svg>
            </div>
            <div className="leading-none">
              <div className="text-lg font-black text-black">Puzzle</div>
              <div className="text-[10px] tracking-widest uppercase text-black/60">
                Admin Panel
              </div>
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-black text-black mb-2">
            ورود به پنل
          </h1>
          <p className="text-sm text-black/60 mb-8">
            فقط برای ادمین
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs tracking-widest uppercase text-black/60 mb-2 font-mono">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                dir="ltr"
                className="w-full border border-black/20 px-4 py-3 focus:border-black focus:outline-none bg-white text-black"
              />
            </div>

            <div>
              <label className="block text-xs tracking-widest uppercase text-black/60 mb-2 font-mono">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                dir="ltr"
                className="w-full border border-black/20 px-4 py-3 focus:border-black focus:outline-none bg-white text-black"
              />
            </div>

            {error && (
              <div className="border border-red-300 bg-red-50 text-red-700 text-sm p-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group flex items-center justify-between w-full bg-black text-white hover:bg-black/80 px-6 py-4 transition-colors disabled:opacity-50"
            >
              <span className="text-sm font-bold">
                {loading ? "در حال ورود..." : "ورود"}
              </span>
              <span className="w-6 h-6 bg-[#c8ff00] flex items-center justify-center text-black text-xs group-hover:translate-x-[-4px] transition-transform">
                ←
              </span>
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-black/40 mt-6 font-mono">
          Puzzle / Admin / 2024
        </p>
      </div>
    </div>
  );
}