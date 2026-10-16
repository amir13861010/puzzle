import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";

export async function GET() {
  const payload = await getPayloadClient();

  const categories = await payload.find({
    collection: "post_categories",
    limit: 200,
    depth: 1,
    sort: "name",
  });

  // ساختار درختی: والدها با فرزندانشون
  const parents = categories.docs.filter((cat) => !cat.parent);

  const tree = parents.map((parent) => ({
    id: parent.id,
    name: parent.name,
    slug: parent.slug,
    children: categories.docs
      .filter((cat) => {
        const parentRef =
          typeof cat.parent === "object" && cat.parent !== null
            ? cat.parent.id
            : cat.parent;
        return parentRef === parent.id;
      })
      .map((child) => ({
        id: child.id,
        name: child.name,
        slug: child.slug,
      })),
  }));

  return NextResponse.json({ categories: tree });
}