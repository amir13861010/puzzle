import type { CollectionConfig } from "payload";

const isAdmin = ({ req }: { req: { user?: unknown } }) => Boolean(req.user);

export const CartShares: CollectionConfig = {
  slug: "cart_shares",
  admin: {
    useAsTitle: "action",
    defaultColumns: ["createdAt", "action", "total"],
    description: "گزارش کپی و اشتراک‌گذاری سبد خرید",
  },
  access: {
    create: () => false,
    read: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: "action",
      type: "select",
      required: true,
      options: [
        { label: "کپی سفارش", value: "copy" },
        { label: "اشتراک در تلگرام", value: "telegram" },
        { label: "اشتراک در واتساپ", value: "whatsapp" },
      ],
    },
    {
      name: "items",
      type: "array",
      required: true,
      fields: [
        { name: "itemId", type: "text", required: true },
        {
          name: "itemType",
          type: "select",
          required: true,
          options: [
            { label: "محصول", value: "product" },
            { label: "دوره", value: "course" },
          ],
        },
        { name: "name", type: "text", required: true },
        { name: "unitPrice", type: "number", required: true },
        { name: "quantity", type: "number", required: true },
        { name: "lineTotal", type: "number", required: true },
      ],
    },
    { name: "total", type: "number", required: true },
    {
      name: "device",
      type: "group",
      fields: [
        { name: "deviceType", type: "text" },
        { name: "browser", type: "text" },
        { name: "operatingSystem", type: "text" },
        { name: "platform", type: "text" },
        { name: "language", type: "text" },
        { name: "timezone", type: "text" },
        { name: "screen", type: "text" },
      ],
    },
  ],
};
