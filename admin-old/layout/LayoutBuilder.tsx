"use client";

import { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { restrictToVerticalAxis, restrictToParentElement } from "@dnd-kit/modifiers";
import {
  GripVertical,
  Eye,
  EyeOff,
  Loader2,
  Check,
  RotateCcw,
} from "lucide-react";
import { updateLayoutOrder, toggleVisibility, resetLayout } from "./actions";

type Section = {
  id: string;
  type: string;
  source: number | null;
  sort_order: number;
  is_visible: boolean;
};

// نقشه‌ی نام بخش‌ها
const SECTION_LABELS: Record<string, { fa: string; en: string; color: string }> = {
  events_gallery: { fa: "گالری ایونت‌ها", en: "EVENTS GALLERY", color: "#c8ff00" },
  course: { fa: "دوره", en: "COURSE", color: "#ff6b35" },
  product: { fa: "محصول", en: "PRODUCT", color: "#00b4d8" },
  coaching: { fa: "کوچ اختصاصی", en: "COACHING", color: "#c8ff00" },
  tribute: { fa: "ادای دین", en: "TRIBUTE", color: "#c8ff00" },
  books_gallery: { fa: "گالری کتاب‌ها", en: "BOOKS GALLERY", color: "#ffd60a" },
  partners: { fa: "حامیان", en: "PARTNERS", color: "#c8ff00" },
  head_coach: { fa: "سرمربی باشگاه", en: "HEAD COACH", color: "#c8ff00" },
  coaches: { fa: "مربی‌های باشگاه", en: "COACHES", color: "#c8ff00" },
  testimonials: { fa: "تجربه باشگاه", en: "TESTIMONIALS", color: "#c8ff00" },
  faq: { fa: "سوالات متداول", en: "FAQ", color: "#c8ff00" },
};

export function LayoutBuilder({ initialSections }: { initialSections: Section[] }) {
  const [sections, setSections] = useState(initialSections);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [resetting, setResetting] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = sections.findIndex((s) => s.id === active.id);
    const newIndex = sections.findIndex((s) => s.id === over.id);

    const newSections = arrayMove(sections, oldIndex, newIndex).map((s, i) => ({
      ...s,
      sort_order: i,
    }));

    setSections(newSections);
    await saveOrder(newSections);
  }

  async function saveOrder(items: Section[]) {
    setSaving(true);
    setSaved(false);
    const result = await updateLayoutOrder(
      items.map((s) => ({ id: s.id, sort_order: s.sort_order }))
    );
    setSaving(false);
    if (result?.success) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  }

  async function handleToggle(id: string, current: boolean) {
    const newSections = sections.map((s) =>
      s.id === id ? { ...s, is_visible: !current } : s
    );
    setSections(newSections);
    await toggleVisibility(id, !current);
  }

  async function handleReset() {
    if (!confirm("مطمئنی می‌خوای چیدمان رو به حالت پیش‌فرض برگردونی؟")) return;
    setResetting(true);
    await resetLayout();
    setResetting(false);
    window.location.reload();
  }

  return (
    <div className="space-y-6">
      {/* نوار بالا */}
      <div className="flex items-center justify-between gap-4 flex-wrap bg-white border border-black/10 p-4">
        <div className="flex items-center gap-3">
          {saving && (
            <span className="flex items-center gap-2 text-sm text-black/60">
              <Loader2 className="w-4 h-4 animate-spin" />
              در حال ذخیره...
            </span>
          )}
          {saved && (
            <span className="flex items-center gap-2 text-sm text-green-600">
              <Check className="w-4 h-4" />
              ذخیره شد
            </span>
          )}
        </div>

        <button
          onClick={handleReset}
          disabled={resetting}
          className="inline-flex items-center gap-2 text-xs border border-black/20 hover:bg-black hover:text-white px-4 py-2 transition-colors disabled:opacity-50"
        >
          {resetting ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <RotateCcw className="w-3.5 h-3.5" />
          )}
          بازگشت به پیش‌فرض
        </button>
      </div>

      {/* لیست درگ‌بل */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      >
        <SortableContext
          items={sections.map((s) => s.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {sections.map((section, index) => (
              <SortableItem
                key={section.id}
                section={section}
                index={index}
                onToggle={handleToggle}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* راهنما */}
      <div
        className="bg-white border border-black/10 p-6 text-sm text-neutral-600 leading-loose"
        style={{ fontFamily: "var(--font-doran)" }}
      >
        <div className="font-bold text-black mb-2">راهنما:</div>
        <ul className="space-y-1 list-disc list-inside">
          <li>برای جابجایی، آیکون <GripVertical className="w-3 h-3 inline" /> رو بگیر و بکش</li>
          <li>برای مخفی کردن یه بخش، آیکون <Eye className="w-3 h-3 inline" /> رو بزن</li>
          <li>تغییرات خودکار ذخیره می‌شن</li>
        </ul>
      </div>
    </div>
  );
}

function SortableItem({
  section,
  index,
  onToggle,
}: {
  section: Section;
  index: number;
  onToggle: (id: string, current: boolean) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 100 : 1,
  };

  const label = SECTION_LABELS[section.type] || {
    fa: section.type,
    en: section.type.toUpperCase(),
    color: "#999",
  };

  const isCourse = section.type === "course";
  const isProduct = section.type === "product";

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group bg-white border transition-all ${
        isDragging
          ? "border-black shadow-[8px_8px_0px_#000] rotate-1"
          : "border-black/10 hover:border-black/30"
      } ${!section.is_visible ? "opacity-50" : ""}`}
    >
      <div className="flex items-center gap-4 p-4">
        {/* دستگیره درگ */}
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-black/30 hover:text-black transition-colors p-1 shrink-0"
          aria-label="جابجایی"
        >
          <GripVertical className="w-5 h-5" />
        </button>

        {/* شماره */}
        <div className="font-mono text-xs text-black/40 shrink-0 w-8">
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* رنگ */}
        <div
          className="w-2 h-10 shrink-0"
          style={{ backgroundColor: label.color }}
        />

        {/* اطلاعات */}
        <div className="flex-1 min-w-0">
          <div
            className="font-black text-black text-base md:text-lg truncate"
            style={{ fontFamily: "var(--font-doran)" }}
          >
            {label.fa}
            {isCourse && section.source !== null && ` ${section.source + 1}`}
            {isProduct && section.source !== null && ` ${section.source + 1}`}
          </div>
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-500 truncate">
            {label.en}
            {section.source !== null && ` · #${String(section.source).padStart(2, "0")}`}
          </div>
        </div>

        {/* دکمه مخفی */}
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
      </div>
    </div>
  );
}