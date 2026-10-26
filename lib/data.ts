import { getPayloadClient } from "./payload";
import { unstable_cache } from "next/cache";
import type { SerializedEditorState } from "lexical";

type CacheableQuery = (...args: never[]) => Promise<unknown>;

const cachePayloadQuery = <T extends CacheableQuery>(
  key: string,
  query: T,
): T =>
  unstable_cache(query, ["payload", key], {
    revalidate: 60,
    tags: ["payload", `payload-${key}`],
  }) as unknown as T;

const uploadedImageURL = (value: unknown): string | null => {
  if (!value || typeof value !== "object") return null;
  const url = (value as { url?: unknown }).url;
  return typeof url === "string" ? url : null;
};

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
  type?: "puzzle" | "club";
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
  full_description: string | SerializedEditorState | null;
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

async function loadProducts(): Promise<Product[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "products",
    limit: 100,
    sort: "-createdAt",
  });
  return result.docs.map((doc) => {
    const item = doc as unknown as Product & { image?: unknown };
    return { ...item, image_url: uploadedImageURL(item.image) ?? item.image_url };
  });
}

async function loadProduct(id: string): Promise<Product | null> {
  const payload = await getPayloadClient();
  try {
    const result = await payload.findByID({
      collection: "products",
      id,
    });
    const product = result as unknown as Product & { image?: unknown };
    return { ...product, image_url: uploadedImageURL(product.image) ?? product.image_url };
  } catch {
    return null;
  }
}

async function loadCourses(
  type?: "puzzle" | "club"
): Promise<Course[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "courses",
    limit: 100,
    sort: "sort_order",
  });
  const courses = (result.docs as unknown as (Course & { image_media?: unknown })[])
    .map((course) => ({
      ...course,
      image: uploadedImageURL(course.image_media) ?? course.image,
      type: course.type ?? "puzzle",
    }))
    .sort(
      (a, b) =>
        (a.sort_order ?? 0) - (b.sort_order ?? 0) ||
        String(a.id).localeCompare(String(b.id))
    );
  return type ? courses.filter((course) => course.type === type) : courses;
}

async function loadCourse(slug: string): Promise<Course | null> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "courses",
    where: { slug: { equals: slug } },
    limit: 1,
  });
  const course = (result.docs[0] as unknown as (Course & { image_media?: unknown })) ?? null;
  return course
    ? {
        ...course,
        image: uploadedImageURL(course.image_media) ?? course.image,
        type: course.type ?? "puzzle",
      }
    : null;
}

async function loadCategories(): Promise<Category[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "categories",
    limit: 100,
    sort: "sort_order",
  });
  return result.docs as unknown as Category[];
}

async function loadGallery(): Promise<GalleryItem[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "gallery",
    limit: 100,
    sort: "sort_order",
  });
  return result.docs.map((doc) => {
    const item = doc as unknown as GalleryItem & { image?: unknown };
    return { ...item, image_url: uploadedImageURL(item.image) ?? item.image_url };
  });
}

async function loadGalleryByCategory(
  category: "events" | "books"
): Promise<GalleryItem[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "gallery",
    where: { category: { equals: category } },
    limit: 100,
    sort: "sort_order",
  });
  return result.docs.map((doc) => {
    const item = doc as unknown as GalleryItem & { image?: unknown };
    return { ...item, image_url: uploadedImageURL(item.image) ?? item.image_url };
  });
}

async function loadCoaches(): Promise<Coach[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "coaches",
    limit: 100,
    sort: "sort_order",
  });
  return result.docs.map((doc) => {
    const item = doc as unknown as Coach & { image?: unknown };
    return { ...item, image_url: uploadedImageURL(item.image) ?? item.image_url };
  });
}

async function loadCoaching(): Promise<Coaching[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "coaching",
    limit: 100,
  });
  return result.docs.map((doc) => {
    const item = doc as unknown as Coaching & { image?: unknown };
    return { ...item, image_url: uploadedImageURL(item.image) ?? item.image_url };
  });
}

async function loadTribute(): Promise<Tribute | null> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "tribute",
    limit: 1,
  });
  const item = (result.docs[0] as unknown as (Tribute & { image?: unknown })) ?? null;
  return item ? { ...item, image_url: uploadedImageURL(item.image) ?? item.image_url } : null;
}

async function loadHeadCoach(): Promise<HeadCoach | null> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "head_coach",
    limit: 1,
  });
  const item = (result.docs[0] as unknown as (HeadCoach & { image?: unknown })) ?? null;
  return item ? { ...item, image_url: uploadedImageURL(item.image) ?? item.image_url } : null;
}

async function loadTestimonials(): Promise<Testimonial[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "testimonials",
    limit: 100,
    sort: "sort_order",
  });
  return result.docs.map((doc) => {
    const item = doc as unknown as Testimonial & { image?: unknown };
    return { ...item, image_url: uploadedImageURL(item.image) ?? item.image_url };
  });
}

async function loadPartners(): Promise<Partner[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "partners",
    limit: 100,
    sort: "sort_order",
  });
  return result.docs.map((doc) => {
    const item = doc as unknown as Partner & { logo?: unknown };
    return { ...item, logo_url: uploadedImageURL(item.logo) ?? item.logo_url };
  });
}

async function loadSettings(): Promise<Settings | null> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "settings",
    limit: 1,
  });
  return (result.docs[0] as unknown as Settings) ?? null;
}

async function loadSectionLayout(): Promise<SectionLayoutItem[]> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "section_layout",
    where: { is_visible: { equals: true } },
    limit: 100,
    sort: "_order",
  });
  return result.docs as unknown as SectionLayoutItem[];
}

export const getProducts = cachePayloadQuery("products", loadProducts);
export const getProduct = cachePayloadQuery("product", loadProduct);
export const getCourses = cachePayloadQuery("courses", loadCourses);
export const getCourse = cachePayloadQuery("course", loadCourse);
export const getCategories = cachePayloadQuery("categories", loadCategories);
export const getGallery = cachePayloadQuery("gallery", loadGallery);
export const getGalleryByCategory = cachePayloadQuery("gallery-category", loadGalleryByCategory);
export const getCoaches = cachePayloadQuery("coaches", loadCoaches);
export const getCoaching = cachePayloadQuery("coaching", loadCoaching);
export const getTribute = cachePayloadQuery("tribute", loadTribute);
export const getHeadCoach = cachePayloadQuery("head-coach", loadHeadCoach);
export const getTestimonials = cachePayloadQuery("testimonials", loadTestimonials);
export const getPartners = cachePayloadQuery("partners", loadPartners);
export const getSettings = cachePayloadQuery("settings", loadSettings);
export const getSectionLayout = cachePayloadQuery("section-layout", loadSectionLayout);
