import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_courses_custom_sections_layout" AS ENUM('cards', 'numbered', 'checklist');
  CREATE TYPE "public"."enum_courses_custom_sections_accent" AS ENUM('lime', 'orange', 'blue', 'dark');
  CREATE TABLE "courses_custom_sections_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"image_id" uuid,
  	"link_label" varchar,
  	"link_url" varchar
  );
  
  CREATE TABLE "courses_custom_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"layout" "enum_courses_custom_sections_layout" DEFAULT 'cards',
  	"accent" "enum_courses_custom_sections_accent" DEFAULT 'lime'
  );
  
  ALTER TABLE "courses_custom_sections_items" ADD CONSTRAINT "courses_custom_sections_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "courses_custom_sections_items" ADD CONSTRAINT "courses_custom_sections_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_custom_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_custom_sections" ADD CONSTRAINT "courses_custom_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "courses_custom_sections_items_order_idx" ON "courses_custom_sections_items" USING btree ("_order");
  CREATE INDEX "courses_custom_sections_items_parent_id_idx" ON "courses_custom_sections_items" USING btree ("_parent_id");
  CREATE INDEX "courses_custom_sections_items_image_idx" ON "courses_custom_sections_items" USING btree ("image_id");
  CREATE INDEX "courses_custom_sections_order_idx" ON "courses_custom_sections" USING btree ("_order");
  CREATE INDEX "courses_custom_sections_parent_id_idx" ON "courses_custom_sections" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "courses_custom_sections_items" CASCADE;
  DROP TABLE "courses_custom_sections" CASCADE;
  DROP TYPE "public"."enum_courses_custom_sections_layout";
  DROP TYPE "public"."enum_courses_custom_sections_accent";`)
}
