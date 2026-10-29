import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Adds the SEO global table and SEO plugin columns introduced for courses and
 * products. Existing CMS content is preserved.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "seo_settings" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "site_name" varchar DEFAULT 'پازل',
      "title" varchar DEFAULT 'پازل — باشگاه مدیران محصول جوان',
      "title_template" varchar DEFAULT '%s | پازل',
      "description" varchar DEFAULT 'جامعه‌ای غیررسمی، منتقد و رو به رشد برای مدیران محصول، دیزاینرها و سازندگان جسور.',
      "keywords" varchar,
      "site_url" varchar DEFAULT 'https://www.puzzleio.ir',
      "canonical_url" varchar DEFAULT '/',
      "og_title" varchar,
      "og_description" varchar,
      "og_image_id" uuid,
      "twitter_handle" varchar,
      "allow_indexing" boolean DEFAULT true,
      "google_site_verification" varchar,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    DO $$ BEGIN
      IF to_regclass('public.products') IS NOT NULL THEN
        ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "meta_title" varchar;
        ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "meta_description" varchar;
        ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "meta_image_id" uuid;
        CREATE INDEX IF NOT EXISTS "products_meta_meta_image_idx" ON "products" USING btree ("meta_image_id");
        IF to_regclass('public.media') IS NOT NULL AND NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'products_meta_image_id_media_id_fk'
        ) THEN
          ALTER TABLE "products" ADD CONSTRAINT "products_meta_image_id_media_id_fk"
            FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
        END IF;
      END IF;

      IF to_regclass('public.courses') IS NOT NULL THEN
        ALTER TABLE "courses" ADD COLUMN IF NOT EXISTS "meta_title" varchar;
        ALTER TABLE "courses" ADD COLUMN IF NOT EXISTS "meta_description" varchar;
        ALTER TABLE "courses" ADD COLUMN IF NOT EXISTS "meta_image_id" uuid;
        CREATE INDEX IF NOT EXISTS "courses_meta_meta_image_idx" ON "courses" USING btree ("meta_image_id");
        IF to_regclass('public.media') IS NOT NULL AND NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'courses_meta_image_id_media_id_fk'
        ) THEN
          ALTER TABLE "courses" ADD CONSTRAINT "courses_meta_image_id_media_id_fk"
            FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
        END IF;
      END IF;

      IF to_regclass('public.media') IS NOT NULL AND NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'seo_settings_og_image_id_media_id_fk'
      ) THEN
        ALTER TABLE "seo_settings" ADD CONSTRAINT "seo_settings_og_image_id_media_id_fk"
          FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
      END IF;
    END $$;

    CREATE INDEX IF NOT EXISTS "seo_settings_og_image_idx" ON "seo_settings" USING btree ("og_image_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "seo_settings" CASCADE;

    DO $$ BEGIN
      IF to_regclass('public.products') IS NOT NULL THEN
        ALTER TABLE "products" DROP COLUMN IF EXISTS "meta_title";
        ALTER TABLE "products" DROP COLUMN IF EXISTS "meta_description";
        ALTER TABLE "products" DROP COLUMN IF EXISTS "meta_image_id";
      END IF;

      IF to_regclass('public.courses') IS NOT NULL THEN
        ALTER TABLE "courses" DROP COLUMN IF EXISTS "meta_title";
        ALTER TABLE "courses" DROP COLUMN IF EXISTS "meta_description";
        ALTER TABLE "courses" DROP COLUMN IF EXISTS "meta_image_id";
      END IF;
    END $$;
  `)
}
