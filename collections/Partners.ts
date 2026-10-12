import type { CollectionConfig } from "payload";

export const Partners: CollectionConfig = {
  slug: "partners",
  orderable: true,
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "logo_url",
      type: "text",
    },
    {
      name: "alt",
      type: "text",
    },
    {
      name: "website_url",
      type: "text",
    },
  ],
};