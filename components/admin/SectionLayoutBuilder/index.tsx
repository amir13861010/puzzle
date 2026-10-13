import { getPayloadClient } from "@/lib/payload";
import { SectionLayoutBuilderClient, type Section } from "./Client";

export const dynamic = "force-dynamic";

export default async function SectionLayoutBuilder() {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "section_layout",
    limit: 100,
    sort: "_order",
  });

  const sections: Section[] = result.docs.map((doc) => ({
    id: doc.id,
    type: doc.type as string,
    source: (doc.source as number | null) ?? null,
    is_visible: (doc.is_visible as boolean) ?? true,
    _order: (doc._order as number | null) ?? null,
  }));

  return <SectionLayoutBuilderClient initialSections={sections} />;
}