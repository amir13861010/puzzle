import type { CollectionConfig } from "payload";

export const Courses: CollectionConfig = {
  slug: "courses",
  admin: {
    useAsTitle: "title_fa",
  },
  fields: [
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "type",
      type: "select",
      label: "نوع دوره",
      required: true,
      defaultValue: "puzzle",
      options: [
        { label: "پازل", value: "puzzle" },
        { label: "باشگاه", value: "club" },
      ],
    },
    {
      name: "number",
      type: "text",
      required: true,
    },
    {
      name: "title_fa",
      type: "text",
      required: true,
    },
    {
      name: "title_en",
      type: "text",
      required: true,
    },
    {
      name: "teacher_name",
      type: "text",
    },
    {
      name: "coach_id",
      type: "text",
    },
    {
      name: "location",
      type: "text",
    },
    {
      name: "topic",
      type: "text",
    },
    {
      name: "price",
      type: "number",
      required: true,
    },
    {
      name: "price_display",
      type: "text",
      required: true,
    },
    {
      name: "image",
      type: "text",
    },
    {
      name: "tag",
      type: "text",
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "full_description",
      type: "richText",
      label: "توضیحات بیشتر",
      admin: {
        description: "برای متن، لینک، جدول و تصویر از ادیتور استفاده کنید.",
      },
    },
    {
      name: "sort_order",
      type: "number",
      defaultValue: 0,
    },
  ],
};
