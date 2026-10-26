import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
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
      name: "price",
      type: "number",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "category",
      type: "text",
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
      label: "تصویر محصول",
      admin: { description: "تصویر را همین‌جا آپلود یا از مدیا انتخاب کن." },
    },
  ],
};
