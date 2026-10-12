export type SectionType =
  | "events_gallery"
  | "course"
  | "product"
  | "coaching"
  | "tribute"
  | "books_gallery"
  | "partners"
  | "head_coach"
  | "coaches"
  | "faq";

export type LayoutItem = {
  type: SectionType;
  source?: number;
};

export const LAYOUT: LayoutItem[] = [
  { type: "events_gallery" },
  { type: "course", source: 0 },
  { type: "product", source: 0 },
  { type: "coaching" },

  { type: "course", source: 1 },
  { type: "product", source: 1 },
  { type: "coaches" },        // ← اینجا (بعد محصول ۲)
  { type: "course", source: 2 },
  { type: "product", source: 2 },
  { type: "tribute" },
  { type: "books_gallery" },
  { type: "partners" },
  { type: "head_coach" },
  { type: "faq" },
];