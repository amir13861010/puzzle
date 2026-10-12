import type { CollectionConfig } from "payload";

export const Menu: CollectionConfig = {
  slug: "menu",
  orderable: true,
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
    },
  ],
};