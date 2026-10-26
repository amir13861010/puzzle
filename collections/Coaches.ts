import type { CollectionConfig } from "payload";

export const Coaches: CollectionConfig = {
  slug: "coaches",
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
      name: "role",
      type: "text",
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "image_url",
      type: "text",
      admin: { hidden: true },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "تصویر مربی",
    },
    {
      name: "alt",
      type: "text",
    },
  ],
};
