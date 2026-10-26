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
      admin: { hidden: true },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "تصویر",
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
