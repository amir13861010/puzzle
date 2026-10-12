import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { HeadCoachForm } from "./HeadCoachForm";

export default async function AdminHeadCoachPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: coach } = await supabase
    .from("head_coach")
    .select("*")
    .eq("id", 1)
    .single();

  return (
    <div className="min-h-screen bg-[#f0efea]" dir="rtl">
      <div className="border-b border-black/15 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-4">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1 text-xs text-black/50 hover:text-black transition-colors mb-3 font-mono"
          >
            <ChevronRight className="w-3.5 h-3.5" />
            بازگشت به داشبورد
          </Link>
          <p className="text-xs tracking-widest uppercase text-black/40 mb-1 font-mono">
            Head Coach
          </p>
          <h1 className="text-3xl md:text-5xl font-black text-black">
            سرمربی باشگاه
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 md:px-12 py-12">
        <HeadCoachForm initial={coach ?? undefined} />
      </div>
    </div>
  );
}