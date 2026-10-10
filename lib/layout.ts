export type SectionType =
  | "events_gallery"
  | "course"
  | "product"
  | "coaching"
  | "tribute"
  | "books_gallery"
  | "partners"
  | "head_coach"     // ← اضافه کن
  | "faq";

export const LAYOUT: LayoutItem[] = [
  { type: "events_gallery" },
  { type: "course", source: 0 },
  { type: "coaching" },
  { type: "product", source: 0 },
  { type: "course", source: 1 },
  { type: "product", source: 1 },
  { type: "course", source: 2 },
  { type: "product", source: 2 },
  { type: "tribute" },
  { type: "books_gallery" },
  { type: "partners" },
  { type: "head_coach" },   // ← قبل از faq
  { type: "faq" },
];