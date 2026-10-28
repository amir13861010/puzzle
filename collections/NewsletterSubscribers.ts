import type { CollectionConfig } from "payload";

export const NewsletterSubscribers: CollectionConfig = {
  slug: "newsletter_subscribers",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "createdAt"],
    description: "ایمیل‌های ثبت‌شده در خبرنامهٔ سایت",
  },
  access: {
    create: () => false,
    read: ({ req }) => Boolean(req.user),
    update: () => false,
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [{ name: "email", type: "email", required: true, unique: true }],
};
