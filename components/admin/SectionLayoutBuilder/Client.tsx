"use client";

import { useState, useRef } from "react";
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
import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import {
  GripVertical,
  Eye,
  EyeOff,
  Loader2,
  Check,
  Trash2,
  Plus,
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
  is_visible: boolean;
  _order?: number | null;
};

// نقشه نام فارسی
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
}: {
  initialSections: Section[];
}) {
  const [sections, setSections] = useState(initialSections);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // برای debounce
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pendingSectionsRef = useRef<Section[] | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = sections.findIndex((s) => s.id === active.id);
    const newIndex = sections.findIndex((s) => s.id === over.id);

    const newSections = arrayMove(sections, oldIndex, newIndex).map(
      (s, i) => ({ ...s, _order: i })
    );

    setSections(newSections);
    pendingSectionsRef.current = newSections;

    // Debounce: ۶۰۰ms بعد از آخرین درگ، ذخیره کن
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(async () => {
      if (pendingSectionsRef.current) {
        await saveOrder(pendingSectionsRef.current);
        pendingSectionsRef.current = null;
      }
    }, 600);
  }

  async function saveOrder(items: Section[]) {
    setSaving(true);
    setSaved(false);
    setError(null);

    const result = await updateSectionOrder(
      items.map((s) => ({ id: s.id, _order: s._order ?? 0 }))
    );

    setSaving(false);

    if (result?.error) {
      setError(result.error);
      console.error("Reorder error:", result.error);
      return;
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
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
    const newSections = sections.filter((s) => s.id !== id);
    setSections(newSections);
    await deleteSection(id);
  }

  async function handleAdd(type: string, source?: number) {
    await addSection(type, source);
    window.location.reload();
  }

  return (
    <div className="p-8 max-w-4xl mx-auto" dir="rtl">
      {/* هدر */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-black mb-2">
          چیدمان صفحه اصلی
        </h1>
        <p className="text-sm text-neutral-500">
          ترتیب سکشن‌ها رو با درگ کردن جابجا کن. با کلیک روی چشم، سکشن رو
          مخفی/نمایان کن.
        </p>
      </div>

      {/* وضعیت */}
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
          {error && (
            <span className="text-sm text-red-600">{error}</span>
          )}
        </div>
      </div>

      {/* لیست سکشن‌ها */}
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
                onDelete={handleDelete}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* دکمه افزودن */}
      <div className="mt-8 pt-6 border-t border-black/10">
        <div className="text-sm font-bold text-black mb-3">
          افزودن سکشن جدید:
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(SECTION_LABELS).map(([type, label]) => (
            <button
              key={type}
              onClick={() => handleAdd(type)}
              className="flex items-center gap-1.5 text-xs border border-black/20 hover:bg-black hover:text-white px-3 py-1.5 transition-colors"
            >
              <Plus className="w-3 h-3" />
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function SortableItem({
  section,
  index,
  onToggle,
  onDelete,
}: {
  section: Section;
  index: number;
  onToggle: (id: string, current: boolean) => void;
  onDelete: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 100 : 1,
  };

  const label = SECTION_LABELS[section.type] || section.type;
  const color = SECTION_COLORS[section.type] || "#c8ff00";

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white border transition-all ${
        isDragging
          ? "border-black shadow-lg rotate-1"
          : "border-black/10 hover:border-black/30"
      } ${!section.is_visible ? "opacity-50" : ""}`}
    >
      <div className="flex items-center gap-4 p-4">
        {/* دستگیره درگ */}
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-black/30 hover:text-black transition-colors p-1"
          aria-label="جابجایی"
        >
          <GripVertical className="w-5 h-5" />
        </button>

        {/* شماره */}
        <div className="font-mono text-xs text-black/40 shrink-0 w-8">
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* رنگ */}
        <div className="w-2 h-10 shrink-0" style={{ backgroundColor: color }} />

        {/* اطلاعات */}
        <div className="flex-1 min-w-0">
          <div className="font-black text-black text-base">
            {label}
            {section.source != null && ` ${section.source + 1}`}
          </div>
          <div className="font-mono text-[10px] tracking-widest uppercase text-neutral-500">
            {section.type}
            {section.source != null && ` · #${section.source}`}
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

        {/* دکمه حذف */}
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
