import type { CollectionConfig } from "payload";

export const Settings: CollectionConfig = {
  slug: "settings",
  admin: {
    useAsTitle: "telegram",
  },
  fields: [
    {
      name: "telegram",
      type: "text",
      defaultValue: "https://t.me/",
    },
    {
      name: "whatsapp",
      type: "text",
      defaultValue: "https://wa.me/",
    },
    {
      name: "hero_title",
      type: "textarea",
    },
    {
      name: "hero_subtitle",
      type: "textarea",
    },
  ],
};