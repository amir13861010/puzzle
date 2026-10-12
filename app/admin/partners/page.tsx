import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { PartnersManager } from "./PartnersManager";

export const dynamic = "force-dynamic";

export default async function AdminPartnersPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: partners } = await supabase
    .from("partners")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

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
            Partners
          </p>
          <h1 className="text-3xl md:text-5xl font-black text-black">
            حامیان
          </h1>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12">
        <PartnersManager partners={partners ?? []} />
      </div>
    </div>
  );
}