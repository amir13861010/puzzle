import type { CollectionConfig } from "payload";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  orderable: true,
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "type",
      type: "select",
      required: true,
      options: [
        { label: "Text", value: "text" },
        { label: "Video", value: "video" },
      ],
    },
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
      name: "quote",
      type: "textarea",
    },
    {
      name: "image_url",
      type: "text",
    },
    {
      name: "video_url",
      type: "text",
    },
    {
      name: "alt",
      type: "text",
    },
  ],
};