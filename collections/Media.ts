import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  // Files are used as public site images, so Payload's static file handler
  // must allow anonymous reads as well as the Media document API.
  access: {
    read: () => true,
  },
  upload: {
    adminThumbnail: "thumbnail",
    imageSizes: [
      {
        name: "thumbnail",
        width: 400,
        height: 300,
        position: "centre",
      },
      {
        name: "card",
        width: 768,
        height: 1024,
        position: "centre",
      },
      {
        name: "hero",
        width: 1920,
        height: 1080,
        position: "centre",
      },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
    },
  ],
};
