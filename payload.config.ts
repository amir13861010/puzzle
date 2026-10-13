import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Categories } from "./collections/Categories";
import { Products } from "./collections/Products";
import { Coaches } from "./collections/Coaches";
import { Courses } from "./collections/Courses";
import { Partners } from "./collections/Partners";
import { Gallery } from "./collections/Gallery";
import { Coaching } from "./collections/Coaching";
import { Tribute } from "./collections/Tribute";
import { HeadCoach } from "./collections/HeadCoach";
import { Testimonials } from "./collections/Testimonials";
import { Settings } from "./collections/Settings";
import { Menu } from "./collections/Menu";
import { Submenu } from "./collections/Submenu";
import { SectionLayout } from "./collections/SectionLayout";
import { Posts } from "./collections/Posts";
import { PostCategories } from "./collections/PostCategories";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
  user: "users",
  importMap: {
    baseDir: path.resolve(dirname),
  },
},
  collections: [
    Users,
    Media,
    Categories,
    Products,
    Coaches,
    Courses,
    Partners,
    Gallery,
    Coaching,
    Tribute,
    HeadCoach,
    Testimonials,
    Settings,
    Menu,
    Submenu,
    SectionLayout,
    Posts,
    PostCategories,
  ],
plugins: [
  seoPlugin({
    collections: ["posts"],
    uploadsCollection: "media",
    tabbedUI: true,
    generateTitle: ({ doc }) => `${doc?.title} | پازل`,
    generateDescription: ({ doc }) => doc?.excerpt || "",
  }),
  vercelBlobStorage({
    enabled: true,
    collections: {
      media: true,
    },
    token: process.env.BLOB_READ_WRITE_TOKEN || "",
  }),
],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
      ssl: {
        rejectUnauthorized: false,
      },
    },
    idType: "uuid",
  }),
  sharp,
});