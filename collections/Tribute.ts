import type { CollectionConfig } from "payload";

export const Tribute: CollectionConfig = {
  slug: "tribute",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "image_url",
      type: "text",
    },
    {
      name: "alt",
      type: "text",
    },
    {
      name: "title",
      type: "text",
    },
    {
      name: "description",
      type: "textarea",
    },
  ],
};