import type { CollectionConfig } from "payload";

export const Coaching: CollectionConfig = {
  slug: "coaching",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "image_url",
      type: "text",
      required: true,
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