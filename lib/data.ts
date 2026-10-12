import { getPayloadClient } from "./payload";

// ============ تایپ‌ها ============
export type Product = {
  id: string;
  name: string;
  price: number;
  description: string | null;
  category: string | null;
  image_url: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Course = {
  id: string;
  slug: string;
  number: string;
  title_fa: string;
  title_en: string;
  teacher_name: string | null;
  coach_id: string | null;
  location: string | null;
  topic: string | null;
  price: number;
  price_display: string;
  image: string | null;
  tag: string | null;
  description: string | null;
  full_description: string | null;
  sort_order: number;
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
  createdAt: string;
  updatedAt: string;
};

export type GalleryItem = {
  id: string;
  category: "events" | "books";
  image_url: string;
  alt: string | null;
  title: string | null;
  sort_order: number;
  createdAt: string;
  updatedAt: string;
};

export type Coach = {
  id: string;
  name: string;
  role: string | null;
  description: string | null;
  image_url: string | null;
  alt: string | null;
  sort_order: number;
  createdAt: string;
  updatedAt: string;
};

export type Coaching = {
  id: string;
  image_url: string;
  alt: string | null;
  title: string | null;
  description: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Tribute = {
  id: string;
  image_url: string | null;
  alt: string | null;
  title: string | null;
  description: string | null;
  createdAt: string;
  updatedAt: string;
};

export type HeadCoach = {
  id: string;
  image_url: string | null;
  alt: string | null;
  title: string | null;
  name: string | null;
  role: string | null;
  description: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Testimonial = {
  id: string;
  type: "text" | "video";
  name: string;
  role: string | null;
  quote: string | null;
  image_url: string | null;
  video_url: string | null;
  alt: string | null;
  sort_order: number;
  createdAt: string;
  updatedAt: string;
};

export type Partner = {
  id: string;
  name: string;
  logo_url: string | null;
  alt: string | null;
  website_url: string | null;
  sort_order: number;
  createdAt: string;
  updatedAt: string;
};

export type Settings = {
  id: string;
  telegram: string;
  whatsapp: string;
  hero_title: string | null;
  hero_subtitle: string | null;
  createdAt: string;
  updatedAt: string;
};

export type SectionLayoutItem = {
  id: string;
  type: string;
  source: number | null;
  sort_order: number;
  is_visible: boolean;
  createdAt: string;
  updatedAt: string;
};

// ============ توابع ============

export async function getProducts(): Promise<Product[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "products",
    limit: 100,
    sort: "-createdAt",
  });
  return result.docs as unknown as Product[];
}

export async function getProduct(id: string): Promise<Product | null> {
  const payload = await getPayloadClient();
  try {
    const result = await payload.findByID({
      collection: "products",
      id,
    });
    return result as unknown as Product;
  } catch {
    return null;
  }
}

export async function getCourses(): Promise<Course[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "courses",
    limit: 100,
    sort: "sort_order",
  });
  return result.docs as unknown as Course[];
}

export async function getCourse(slug: string): Promise<Course | null> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "courses",
    where: { slug: { equals: slug } },
    limit: 1,
  });
  return (result.docs[0] as unknown as Course) ?? null;
}

export async function getCategories(): Promise<Category[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "categories",
    limit: 100,
    sort: "sort_order",
  });
  return result.docs as unknown as Category[];
}

export async function getGallery(): Promise<GalleryItem[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "gallery",
    limit: 100,
    sort: "sort_order",
  });
  return result.docs as unknown as GalleryItem[];
}

export async function getGalleryByCategory(
  category: "events" | "books"
): Promise<GalleryItem[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "gallery",
    where: { category: { equals: category } },
    limit: 100,
    sort: "sort_order",
  });
  return result.docs as unknown as GalleryItem[];
}

export async function getCoaches(): Promise<Coach[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "coaches",
    limit: 100,
    sort: "sort_order",
  });
  return result.docs as unknown as Coach[];
}

export async function getCoaching(): Promise<Coaching[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "coaching",
    limit: 100,
  });
  return result.docs as unknown as Coaching[];
}

export async function getTribute(): Promise<Tribute | null> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "tribute",
    limit: 1,
  });
  return (result.docs[0] as unknown as Tribute) ?? null;
}

export async function getHeadCoach(): Promise<HeadCoach | null> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "head_coach",
    limit: 1,
  });
  return (result.docs[0] as unknown as HeadCoach) ?? null;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "testimonials",
    limit: 100,
    sort: "sort_order",
  });
  return result.docs as unknown as Testimonial[];
}

export async function getPartners(): Promise<Partner[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "partners",
    limit: 100,
    sort: "sort_order",
  });
  return result.docs as unknown as Partner[];
}

export async function getSettings(): Promise<Settings | null> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "settings",
    limit: 1,
  });
  return (result.docs[0] as unknown as Settings) ?? null;
}

export async function getSectionLayout(): Promise<SectionLayoutItem[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "section_layout",
    where: { is_visible: { equals: true } },
    limit: 100,
    sort: "sort_order",
  });
  return result.docs as unknown as SectionLayoutItem[];
}