import type { CollectionConfig } from "payload";

export const Submenu: CollectionConfig = {
  slug: "submenu",
  orderable: true,
  admin: {
    useAsTitle: "label",
  },
  fields: [
    {
      name: "menu_id",
      type: "text",
    },
    {
      name: "label",
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