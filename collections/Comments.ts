import type { CollectionConfig } from "payload";

export const Comments: CollectionConfig = {
  slug: "comments",
  admin: {
    useAsTitle: "fullName",
    defaultColumns: ["fullName", "email", "post", "approved", "createdAt"],
    description: "کامنت‌های وبلاگ",
  },
  access: {
    // فقط ادمین‌های لاگین‌شده می‌تونن همه کامنت‌ها رو ببینن
    read: ({ req }) => {
      if (req.user) return true;
      // مهمان‌ها فقط کامنت‌های تایید شده رو ببینن
      return {
        approved: {
          equals: true,
        },
      };
    },
    // ایجاد کامنت برای همه (حتی مهمان)
    create: () => true,
    // فقط ادمین‌ها می‌تونن ویرایش/حذف کنن
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: "fullName",
      type: "text",
      required: true,
      label: "نام کامل",
    },
    {
      name: "email",
      type: "email",
      required: true,
      label: "ایمیل",
    },
    {
      name: "comment",
      type: "textarea",
      required: true,
      label: "متن کامنت",
    },
    {
      name: "post",
      type: "relationship",
      relationTo: "posts",
      required: true,
      label: "مقاله",
      admin: {
        description: "مقاله‌ای که این کامنت براش نوشته شده",
      },
    },
    {
      name: "approved",
      type: "checkbox",
      defaultValue: false,
      label: "تایید شده",
      admin: {
        position: "sidebar",
        description: "تا وقتی تایید نشه، توی سایت نمایش داده نمیشه",
      },
    },
  ],
};