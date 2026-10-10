import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import {
  Package,
  Settings,
  Menu as MenuIcon,
  LogOut,
  Tag,
  Image as ImageIcon,
  Sparkles,
} from "lucide-react";
import { Heart } from "lucide-react";
import { UserCog } from "lucide-react";
export default async function AdminDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // آمار
  const { count: productsCount } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true });

  const cards = [
    {
      href: "/admin/products",
      label: "محصولات",
      desc: `${productsCount ?? 0} محصول`,
      icon: Package,
    },
    {
  href: "/admin/categories",
  label: "دسته‌بندی‌ها",
  desc: "مدیریت دسته‌بندی محصولات",
  icon: Tag, // ← این رو از lucide-react import کن
},
    {
      href: "/admin/menu",
      label: "منوها",
      desc: "دسته‌بندی مگا منو",
      icon: MenuIcon,
    },
    {
  href: "/admin/head-coach",
  label: "سرمربی باشگاه",
  desc: "عکس، نام و توضیحات",
  icon: UserCog,
},
    {
  href: "/admin/gallery",
  label: "گالری",
  desc: "کتاب‌ها و ایونت‌ها",
  icon: ImageIcon,
},
{
  href: "/admin/coaching",
  label: "کوچ اختصاصی",
  desc: "آپلود عکس و توضیحات",
  icon: Sparkles,
},
{
  href: "/admin/tribute",
  label: "ادای دین",
  desc: "عکس، تیتر و توضیحات",
  icon: Heart,
},
    {
      href: "/admin/settings",
      label: "تنظیمات",
      desc: "متن‌ها و لینک‌ها",
      icon: Settings,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f0efea]" dir="rtl">
      {/* Header */}
      <div className="border-b border-black/15 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor">
                <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-3 9h-3v3a1 1 0 11-2 0v-3H8a1 1 0 110-2h3V7a1 1 0 112 0v3h3a1 1 0 110 2z" />
              </svg>
            </div>
            <div className="leading-none">
              <div className="text-sm font-black text-black">Puzzle</div>
              <div className="text-[10px] tracking-widest uppercase text-black/60">
                Admin
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-xs text-black/50 font-mono">
              {user.email}
            </span>
            <form action="/auth/logout" method="POST">
              <button
                type="submit"
                className="flex items-center gap-2 text-xs border border-black/20 hover:bg-black hover:text-white px-3 py-2 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                خروج
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="mb-12">
          <p className="text-xs tracking-widest uppercase text-black/40 mb-3 font-mono">
            Dashboard
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-black">
            پنل مدیریت
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.href}
                href={card.href}
                className="group bg-white border border-black/10 p-6 md:p-8 hover:border-black transition-all"
              >
                <div className="w-12 h-12 bg-[#f0efea] group-hover:bg-black group-hover:text-[#c8ff00] flex items-center justify-center mb-6 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h2 className="text-xl md:text-2xl font-black text-black mb-1">
                  {card.label}
                </h2>
                <p className="text-sm text-black/50">{card.desc}</p>
                <div className="mt-6 flex items-center gap-2 text-xs text-black/40 group-hover:text-black transition-colors">
                  <span>مشاهده</span>
                  <span className="group-hover:translate-x-[-4px] transition-transform">←</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}