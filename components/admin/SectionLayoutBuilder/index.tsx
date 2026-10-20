import { getPayloadClient } from "@/lib/payload";
import { getCourses } from "@/lib/data";
import { SectionLayoutBuilderClient, type Section } from "./Client";

export const dynamic = "force-dynamic";

export default async function SectionLayoutBuilder() {
  const payload = await getPayloadClient();

  const [result, courses] = await Promise.all([
    payload.find({
      collection: "section_layout",
      limit: 100,
      sort: "_order",
    }),
    getCourses(),
  ]);

  const courseChoices = courses.map((course, source) => ({
    source,
    id: course.id,
    title: course.title_fa,
    number: course.number,
  }));
  const courseBySource = new Map(
    courseChoices.map((course) => [course.source, course])
  );
  const representedSources = new Set<number>();
  const hiddenSectionIds: string[] = [];

  const sections: Section[] = [];
  for (const doc of result.docs) {
    const id = String(doc.id);
    const source = Number.isInteger(doc.source) ? Number(doc.source) : 0;

    if (doc.type === "course") {
      const course = courseBySource.get(source);
      if (!course || representedSources.has(source)) {
        hiddenSectionIds.push(id);
        continue;
      }
      representedSources.add(source);
      sections.push({
        id,
        type: "course",
        source,
        courseTitle: course.title,
        courseNumber: course.number,
        is_visible: (doc.is_visible as boolean) ?? true,
        _order: (doc._order as number | null) ?? null,
      });
      continue;
    }

    sections.push({
      id,
      type: doc.type as string,
      source: (doc.source as number | null) ?? null,
      is_visible: (doc.is_visible as boolean) ?? true,
      _order: (doc._order as number | null) ?? null,
    });
  }

  const availableCourses = courseChoices.filter(
    (course) => !representedSources.has(course.source)
  );

  return (
    <SectionLayoutBuilderClient
      initialSections={sections}
      hiddenSectionIds={hiddenSectionIds}
      availableCourses={availableCourses}
    />
  );
}
