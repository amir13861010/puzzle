import { getPayloadClient } from "@/lib/payload";
import { SectionLayoutBuilderClient, type Section } from "./Client";

export default async function SectionLayoutBuilder() {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "section_layout",
    limit: 100,
    sort: "_order",
  });

  return (
    <SectionLayoutBuilderClient initialSections={result.docs as unknown as Section[]} />
  );
}