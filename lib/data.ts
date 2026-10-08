import { createClient } from "@/lib/supabase/server";

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string | null;
  category: string | null;
  image_url: string | null;
  created_at: string;
};

export type Course = {
  number: string;
  titleEn: string;
  titleFa: string;
  teacher: string;
  price: string;
  image: string;
  tag: string;
  desc: string;
};

// دوره‌ها فعلاً hardcode هستن (بعداً می‌تونیم توی DB بذاریم)
export const COURSES: Course[] = [
  {
    number: "01",
    titleEn: "PRODUCT MANAGEMENT",
    titleFa: "مدیریت محصول پیشرفته",
    teacher: "دکتر علی محمدی",
    price: "۴,۵۰۰,۰۰۰",
    image: "/courses/course-1.jpg",
    tag: "پرطرفدار",
    desc: "یادمه آخرین باری که تو یه دوره شرکت کردم...",
  },
  {
    number: "02",
    titleEn: "UX DESIGN",
    titleFa: "طراحی تجربه کاربری",
    teacher: "سارا احمدی",
    price: "۳,۲۰۰,۰۰۰",
    image: "/courses/course-2.jpg",
    tag: "جدید",
    desc: "طراحی تجربه کاربری یعنی طراحی برای انسان...",
  },
  {
    number: "03",
    titleEn: "BRAND STRATEGY",
    titleFa: "استراتژی برندینگ",
    teacher: "محمد رضایی",
    price: "۵,۸۰۰,۰۰۰",
    image: "/courses/course-3.jpg",
    tag: "پیشرفته",
    desc: "برندسازی که ماندگار می‌شه...",
  },
];

export async function getProducts(): Promise<Product[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(3);

  return data ?? [];
}