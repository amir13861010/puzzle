import type { CollectionConfig } from "payload";

export const HeadCoach: CollectionConfig = {
  slug: "head_coach",
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
      label: "تصویر مربی ارشد",
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
      name: "name",
      type: "text",
    },
    {
      name: "role",
      type: "text",
    },
    {
      name: "description",
      type: "textarea",
    },
  ],
};
