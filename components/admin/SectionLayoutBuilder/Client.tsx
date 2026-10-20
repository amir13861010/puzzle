"use client";

import { useState } from "react";
import {
  Eye,
  EyeOff,
  Loader2,
  Check,
  Trash2,
  Plus,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import {
  updateSectionOrder,
  toggleSectionVisibility,
  deleteSection,
  addSection,
} from "@/lib/payload-actions/section-layout";

export type Section = {
  id: string;
  type: string;
  source?: number | null;
  courseTitle?: string;
  courseNumber?: string;
  is_visible: boolean;
  _order?: number | null;
};

type CourseChoice = { source: number; title: string; number: string };

const SECTION_LABELS: Record<string, string> = {
  events_gallery: "گالری ایونت‌ها",
  books_gallery: "گالری کتاب‌ها",
  course: "دوره",
  product: "محصول",
  coaching: "کوچ اختصاصی",
  tribute: "ادای دین",
  partners: "حامیان",
  head_coach: "سرمربی باشگاه",
  coaches: "مربی‌های باشگاه",
  testimonials: "تجربه باشگاه",
  faq: "سوالات متداول",
};

const SECTION_COLORS: Record<string, string> = {
  course: "#ff6b35",
  product: "#00b4d8",
  events_gallery: "#c8ff00",
  books_gallery: "#ffd60a",
  coaching: "#c8ff00",
  tribute: "#c8ff00",
  partners: "#c8ff00",
  head_coach: "#c8ff00",
  coaches: "#c8ff00",
  testimonials: "#c8ff00",
  faq: "#c8ff00",
};

export function SectionLayoutBuilderClient({
  initialSections,
  hiddenSectionIds,
  availableCourses,
}: {
  initialSections: Section[];
  hiddenSectionIds: string[];
  availableCourses: CourseChoice[];
}) {
  const [sections, setSections] = useState(initialSections);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function saveOrder(items: Section[]): Promise<boolean> {
    setSaving(true);
    setSaved(false);
    setError(null);

    try {
      const result = await updateSectionOrder(
        [
          ...items.map((section) => section.id),
          ...hiddenSectionIds,
        ]
      );
      if (result?.error) {
        setError(result.error);
        return false;
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      return true;
    } catch {
      setError("ذخیره ترتیب انجام نشد؛ دوباره تلاش کنید");
      return false;
    } finally {
      setSaving(false);
    }
  }

  async function moveUp(index: number) {
    if (saving || index === 0) return;
    const previous = sections;
    const newSections = [...sections];
    [newSections[index - 1], newSections[index]] = [
      newSections[index],
      newSections[index - 1],
    ];
    setSections(newSections);
    const result = await saveOrder(newSections);
    if (!result) setSections(previous);
  }

  async function moveDown(index: number) {
    if (saving || index === sections.length - 1) return;
    const previous = sections;
    const newSections = [...sections];
    [newSections[index], newSections[index + 1]] = [
      newSections[index + 1],
      newSections[index],
    ];
    setSections(newSections);
    const result = await saveOrder(newSections);
    if (!result) setSections(previous);
  }

  async function handleToggle(id: string, current: boolean) {
    const newSections = sections.map((s) =>
      s.id === id ? { ...s, is_visible: !current } : s
    );
    setSections(newSections);
    await toggleSectionVisibility(id, !current);
  }

  async function handleDelete(id: string) {
    if (!confirm("مطمئنی می‌خوای حذف کنی؟")) return;
    await deleteSection(id);
    window.location.reload();
  }

  async function handleAdd(type: string, source?: number) {
    const result = await addSection(type, source);
    if (result?.error) {
      setError(result.error);
      return;
    }
    window.location.reload();
  }

  return (
    <div className="p-8 max-w-4xl mx-auto" dir="rtl">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-black mb-2">
          چیدمان صفحه اصلی
        </h1>
        <p className="text-sm text-neutral-500">
          ترتیب سکشن‌ها رو با فلش‌های بالا/پایین تنظیم کن.
        </p>
      </div>

      <div className="flex items-center justify-between mb-4 min-h-[24px]">
        <div className="flex items-center gap-3">
          {saving && (
            <span className="flex items-center gap-2 text-sm text-black/60">
              <Loader2 className="w-4 h-4 animate-spin" />
              در حال ذخیره...
            </span>
          )}
          {saved && !saving && (
            <span className="flex items-center gap-2 text-sm text-green-600">
              <Check className="w-4 h-4" />
              ذخیره شد
            </span>
          )}
          {error && <span className="text-sm text-red-600">{error}</span>}
        </div>
      </div>

      <div className={`space-y-2 ${saving ? "pointer-events-none opacity-70" : ""}`}>
        {sections.map((section, index) => (
          <SectionItem
            key={section.id}
            section={section}
            index={index}
            total={sections.length}
            onMoveUp={() => moveUp(index)}
            onMoveDown={() => moveDown(index)}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-black/10">
        <div className="text-sm font-bold text-black mb-3">
          افزودن سکشن جدید:
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(SECTION_LABELS)
            .filter(([type]) => type !== "course")
            .map(([type, label]) => (
              <button
                key={type}
                onClick={() => handleAdd(type)}
                className="flex items-center gap-1.5 text-xs border border-black/20 hover:bg-black hover:text-white px-3 py-1.5 transition-colors"
              >
                <Plus className="w-3 h-3" />
                {label}
              </button>
            ))}
          {availableCourses.map((course) => (
            <button
              key={`course-${course.source}`}
              onClick={() => handleAdd("course", course.source)}
              className="flex items-center gap-1.5 text-xs border border-black/20 hover:bg-black hover:text-white px-3 py-1.5 transition-colors"
            >
              <Plus className="w-3 h-3" />
              {`دوره ${course.title}`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionItem({
  section,
  index,
  total,
  onMoveUp,
  onMoveDown,
  onToggle,
  onDelete,
}: {
  section: Section;
  index: number;
  total: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onToggle: (id: string, current: boolean) => void;
  onDelete: (id: string) => void;
}) {
  const label =
    section.type === "course" && section.courseTitle
      ? `دوره ${section.courseTitle}`
      : SECTION_LABELS[section.type] || section.type;
  const color = SECTION_COLORS[section.type] || "#c8ff00";

  const isFirst = index === 0;
  const isLast = index === total - 1;

  return (
    <div
      className={`bg-white border transition-all border-black/10 hover:border-black/30 ${
        !section.is_visible ? "opacity-50" : ""
      }`}
    >
      <div className="flex items-center gap-3 p-3 md:p-4">
        <div className="flex flex-col gap-0.5 shrink-0">
          <button
            onClick={onMoveUp}
            disabled={isFirst}
            className="p-1 text-black/40 hover:text-black hover:bg-black/5 rounded transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
            aria-label="بالا"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          <button
            onClick={onMoveDown}
            disabled={isLast}
            className="p-1 text-black/40 hover:text-black hover:bg-black/5 rounded transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
            aria-label="پایین"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        <div className="font-mono text-xs text-black/40 shrink-0 w-8">
          {String(index + 1).padStart(2, "0")}
        </div>

        <div className="w-1.5 h-10 shrink-0" style={{ backgroundColor: color }} />

        <div className="flex-1 min-w-0">
          <div className="font-black text-black text-sm md:text-base">
            {label}
            {section.type !== "course" && section.source != null &&
              ` ${section.source + 1}`}
          </div>
          <div className="font-mono text-[10px] tracking-widest uppercase text-neutral-500 truncate">
            {section.type}
            {section.type === "course"
              ? ` · شماره ${section.courseNumber}`
              : section.source != null && ` · #${section.source}`}
          </div>
        </div>

        <button
          onClick={() => onToggle(section.id, section.is_visible)}
          className={`shrink-0 p-2 transition-colors ${
            section.is_visible
              ? "text-black/40 hover:text-black"
              : "text-red-400 hover:text-red-600"
          }`}
          aria-label={section.is_visible ? "مخفی کردن" : "نمایش دادن"}
        >
          {section.is_visible ? (
            <Eye className="w-5 h-5" />
          ) : (
            <EyeOff className="w-5 h-5" />
          )}
        </button>

        <button
          onClick={() => onDelete(section.id)}
          className="shrink-0 p-2 text-red-400 hover:text-red-600 transition-colors"
          aria-label="حذف"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
