import type { Course } from "@/lib/data";

export function getCourseTypeLabel(type?: Course["type"]) {
  return type === "club" ? "باشگاه" : "پازل";
}

export default function CourseTypeBadge({ type }: { type?: Course["type"] }) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-[#c8ff00] text-black border border-black px-2 py-0.5 text-[10px] font-bold">
      <span className="h-1.5 w-1.5 rounded-full bg-black" />
      {getCourseTypeLabel(type)}
    </span>
  );
}
