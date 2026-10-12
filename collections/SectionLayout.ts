import type { CollectionConfig } from "payload";

export const SectionLayout: CollectionConfig = {
  slug: "section_layout",
  orderable: true,
  admin: {
    useAsTitle: "type",
  },
  fields: [
    {
      name: "type",
      type: "text",
      required: true,
    },
    {
      name: "source",
      type: "number",
    },
    {
      name: "is_visible",
      type: "checkbox",
      defaultValue: true,
    },
  ],
};