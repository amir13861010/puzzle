import type { CollectionConfig } from "payload";

export const PostCategories: CollectionConfig = {
  slug: "post_categories",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "parent", "slug"],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "نام دسته",
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      label: "Slug (انگلیسی)",
    },
    {
      name: "parent",
      type: "relationship",
      relationTo: "post_categories",
      label: "دسته مادر",
      admin: {
        description:
          "اگه این یه دسته فرزنده، دسته مادرش رو انتخاب کن. اگه دسته مادره، خالی بذار.",
      },
      filterOptions: ({ id }) => {
        // نمی‌تونه خودش والد خودش باشه
        if (id) return { id: { not_equals: id } };
        return true;
      },
    },
    {
      name: "description",
      type: "textarea",
      label: "توضیحات",
    },
  ],
};