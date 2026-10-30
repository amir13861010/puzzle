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

  const posts = await payload.find({
    collection: "posts",
    where: { status: { equals: "published" } },
    limit: 1000,
    depth: 0,
    sort: "-publishedAt",
  });

  const postsBySubcategory = new Map<string, Array<{ id: string; title: string; slug: string }>>();
  for (const post of posts.docs) {
    const subcategoryId =
      typeof post.subCategory === "object" && post.subCategory !== null
        ? post.subCategory.id
        : post.subCategory;
    if (subcategoryId == null) continue;
    const key = String(subcategoryId);
    const grouped = postsBySubcategory.get(key) ?? [];
    grouped.push({ id: String(post.id), title: post.title, slug: post.slug });
    postsBySubcategory.set(key, grouped);
  }

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
        posts: postsBySubcategory.get(String(child.id)) ?? [],
      })),
  }));

  return NextResponse.json({ categories: tree });
}
