import type { CollectionConfig } from "payload";

export const Gallery: CollectionConfig = {
  slug: "gallery",
  orderable: true,
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Events", value: "events" },
        { label: "Books", value: "books" },
      ],
    },
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
  ],
};