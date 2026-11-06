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
      name: "instructors",
      type: "relationship",
      relationTo: "coaches",
      hasMany: true,
      label: "اساتید دوره",
      admin: { description: "اساتید این دوره را از فهرست مربیان انتخاب کن." },
    },
    {
      name: "curriculum",
      type: "array",
      label: "سرفصل‌های دوره",
      labels: { singular: "سرفصل", plural: "سرفصل‌ها" },
      admin: { description: "سرفصل‌ها را به ترتیب اضافه کن؛ ترتیب ردیف‌ها در صفحه حفظ می‌شود." },
      fields: [
        { name: "title", type: "text", label: "عنوان سرفصل", required: true },
        { name: "description", type: "textarea", label: "توضیحات" },
      ],
    },
    {
      name: "custom_sections",
      type: "array",
      label: "سکشن‌های اختصاصی صفحه دوره",
      labels: { singular: "سکشن", plural: "سکشن‌ها" },
      admin: {
        description: "هر سکشن می‌تواند تیتر، توضیح، آیتم‌ها، نوع نمایش و رنگ خودش را داشته باشد. ترتیب ردیف‌ها ترتیب نمایش در صفحه است.",
      },
      fields: [
        { name: "title", type: "text", label: "تیتر سکشن", required: true },
        { name: "description", type: "textarea", label: "توضیح زیر تیتر" },
        {
          name: "layout",
          type: "select",
          label: "نحوه نمایش آیتم‌ها",
          defaultValue: "cards",
          options: [
            { label: "کارت‌های شبکه‌ای", value: "cards" },
            { label: "فهرست شماره‌دار", value: "numbered" },
            { label: "چک‌لیست", value: "checklist" },
          ],
        },
        {
          name: "accent",
          type: "select",
          label: "رنگ تأکیدی",
          defaultValue: "lime",
          options: [
            { label: "سبز پازل", value: "lime" },
            { label: "نارنجی", value: "orange" },
            { label: "آبی", value: "blue" },
            { label: "مشکی", value: "dark" },
          ],
        },
        {
          name: "items",
          type: "array",
          label: "آیتم‌های سکشن",
          labels: { singular: "آیتم", plural: "آیتم‌ها" },
          fields: [
            { name: "title", type: "text", label: "عنوان", required: true },
            { name: "description", type: "textarea", label: "توضیحات" },
            {
              name: "image",
              type: "upload",
              relationTo: "media",
              label: "تصویر (اختیاری)",
            },
            { name: "link_label", type: "text", label: "متن لینک (اختیاری)" },
            { name: "link_url", type: "text", label: "آدرس لینک (اختیاری)" },
          ],
        },
      ],
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
      admin: { hidden: true },
    },
    {
      name: "image_media",
      type: "upload",
      relationTo: "media",
      label: "تصویر دوره",
      admin: { description: "تصویر را همین‌جا آپلود یا از مدیا انتخاب کن." },
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
      type: "textarea",
    },
    {
      name: "sort_order",
      type: "number",
      defaultValue: 0,
    },
  ],
};
