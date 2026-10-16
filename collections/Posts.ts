import type { CollectionConfig, FilterOptionsProps } from "payload";

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: [
      "title",
      "parentCategory",
      "subCategory",
      "status",
      "publishedAt",
    ],
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true;
      return {
        status: {
          equals: "published",
        },
      };
    },
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "عنوان مقاله",
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      label: "Slug (انگلیسی)",
      admin: {
        description: "آدرس یکتای مقاله",
      },
    },
    {
      name: "excerpt",
      type: "textarea",
      maxLength: 300,
      label: "خلاصه مقاله",
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
      label: "تصویر کاور",
    },
    // ==================== دسته‌بندی دو مرحله‌ای ====================
    {
      name: "parentCategory",
      type: "relationship",
      relationTo: "post_categories",
      required: true,
      label: "دسته مادر",
      filterOptions: {
        parent: { exists: false },
      } as never,
      admin: {
        description: "اول دسته مادر رو انتخاب کن",
      },
    },
    {
      name: "subCategory",
      type: "relationship",
      relationTo: "post_categories",
      required: true,
      label: "زیردسته",
      filterOptions: (({ data }: FilterOptionsProps) => {
        const parentId = data?.parentCategory;
        if (!parentId) return false;
        return {
          parent: { equals: parentId },
        };
      }) as never,
      admin: {
        description: "بعد از انتخاب دسته مادر، زیردسته رو انتخاب کن",
      },
    },
    // ==================== محتوا ====================
    {
      name: "content",
      type: "richText",
      required: true,
      label: "محتوای مقاله",
    },
    {
      name: "status",
      type: "select",
      defaultValue: "draft",
      required: true,
      label: "وضعیت",
      options: [
        { label: "پیش‌نویس", value: "draft" },
        { label: "منتشر شده", value: "published" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "publishedAt",
      type: "date",
      label: "تاریخ انتشار",
      admin: {
        position: "sidebar",
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
  ],
};