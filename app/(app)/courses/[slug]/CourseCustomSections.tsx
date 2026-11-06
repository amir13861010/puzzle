/* eslint-disable @next/next/no-img-element */
import type { CourseCustomSection } from "@/lib/data";

type Props = { sections: CourseCustomSection[] };

const accentClasses = {
  lime: "bg-[#c8ff00] text-black",
  orange: "bg-[#ff6b35] text-white",
  blue: "bg-[#00b4d8] text-black",
  dark: "bg-black text-white",
} as const;

const layoutClasses = {
  cards: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5",
  numbered: "space-y-1",
  checklist: "grid grid-cols-1 md:grid-cols-2 gap-4",
} as const;

function safeHref(value?: string | null) {
  const url = value?.trim();
  if (!url) return null;
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith("/") && !url.startsWith("//")) return url;
  return null;
}

export default function CourseCustomSections({ sections }: Props) {
  if (!sections.length) return null;

  return (
    <>
      {sections.map((section, sectionIndex) => {
        const layout = section.layout && section.layout in layoutClasses ? section.layout : "cards";
        const accent = section.accent && section.accent in accentClasses ? section.accent : "lime";
        const items = section.items ?? [];

        return (
          <section key={section.id ?? `${section.title}-${sectionIndex}`} className="border-b border-black/10 py-16 md:py-24">
            <div className="mx-auto max-w-[1400px] px-6 md:px-12">
              <div className="mb-10 md:mb-14 max-w-3xl">
                <p className="mb-3 font-mono text-[10px] tracking-[0.3em] text-neutral-400">[ COURSE SECTION {String(sectionIndex + 1).padStart(2, "0")} ]</p>
                <h2 className="text-2xl font-black md:text-4xl" style={{ fontFamily: "var(--font-doran)" }}>{section.title}</h2>
                {section.description && <p className="mt-4 whitespace-pre-line text-sm leading-8 text-neutral-600 md:text-base" style={{ fontFamily: "var(--font-doran)" }}>{section.description}</p>}
              </div>

              {items.length > 0 && (
                <div className={layoutClasses[layout]}>
                  {items.map((item, itemIndex) => {
                    const href = safeHref(item.link_url);
                    const marker = layout === "checklist" ? "✓" : String(itemIndex + 1).padStart(2, "0");
                    const itemClass = layout === "numbered"
                      ? "flex gap-5 border-b border-black/10 py-5 last:border-0"
                      : layout === "checklist"
                        ? "flex gap-4 rounded-xl border border-black/10 bg-white p-5 md:p-6"
                        : "overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]";

                    return (
                      <article key={item.id ?? `${item.title}-${itemIndex}`} className={itemClass}>
                        {layout === "cards" && item.image_url && (
                          <div className="aspect-[16/9] overflow-hidden bg-neutral-100">
                            <img src={item.image_url} alt={item.title} className="h-full w-full object-cover" />
                          </div>
                        )}
                        <div className={`shrink-0 flex h-10 w-10 items-center justify-center rounded-xl font-mono text-sm font-black ${accentClasses[accent]}`}>
                          {marker}
                        </div>
                        <div className={layout === "cards" ? "p-5 pt-4 md:p-6 md:pt-5" : "min-w-0 flex-1"}>
                          <h3 className="text-base font-black md:text-lg" style={{ fontFamily: "var(--font-doran)" }}>{item.title}</h3>
                          {item.description && <p className="mt-2 whitespace-pre-line text-sm leading-7 text-neutral-600" style={{ fontFamily: "var(--font-doran)" }}>{item.description}</p>}
                          {layout !== "cards" && item.image_url && (
                            <img src={item.image_url} alt={item.title} className="mt-4 max-h-64 w-full rounded-lg object-cover" />
                          )}
                          {item.link_label && href && (
                            <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} className="mt-4 inline-flex text-sm font-bold underline underline-offset-4 decoration-black/30 hover:decoration-black" style={{ fontFamily: "var(--font-doran)" }}>
                              {item.link_label}
                            </a>
                          )}
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        );
      })}
    </>
  );
}
