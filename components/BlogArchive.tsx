import Link from "next/link";
import { getPayloadClient } from "@/lib/payload";

type BlogArchiveProps = {
  categoryId?: string | number;
  title: string;
};

export default async function BlogArchive({ categoryId, title }: BlogArchiveProps) {
  const payload = await getPayloadClient();
  const posts = await payload.find({
    collection: "posts",
    where: {
      status: { equals: "published" },
      ...(categoryId ? { subCategory: { equals: categoryId } } : {}),
    },
    sort: "-publishedAt",
    limit: 100,
    depth: 1,
  });

  return (
    <main className="min-h-screen bg-[#f5f5f5] text-black" dir="rtl">
      <section className="bg-black text-white border-b-2 border-black">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 pt-32 md:pt-40 pb-14 md:pb-20">
          <nav className="font-mono text-xs tracking-widest text-white/50 mb-8">
            <Link href="/" className="hover:text-white">خانه</Link>
            <span className="px-2">/</span>
            <Link href="/blog" className="hover:text-white">مقالات</Link>
          </nav>
          <h1 className="text-4xl md:text-6xl font-black" style={{ fontFamily: "var(--font-doran)" }}>{title}</h1>
          <p className="mt-4 font-mono text-xs text-white/50">{posts.docs.length.toLocaleString("fa-IR")} مقاله</p>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-6 md:px-12 py-12 md:py-16">
        {posts.docs.length === 0 ? (
          <p className="border border-black/10 bg-white p-10 text-center text-black/60">هنوز مقاله‌ای در این بخش منتشر نشده.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {posts.docs.map((post) => {
              const cover = post.coverImage && typeof post.coverImage === "object" ? post.coverImage : null;
              return (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group border-2 border-black bg-white hover:shadow-[5px_5px_0px_#000] transition-shadow">
                  <div className="aspect-[16/10] bg-neutral-100 overflow-hidden">
                    {cover?.url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={cover.url} alt={cover.alt || post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : <div className="w-full h-full flex items-center justify-center text-black/20 font-mono text-xs">ARTICLE</div>}
                  </div>
                  <div className="p-5">
                    {post.publishedAt && <p className="font-mono text-[10px] text-neutral-500 mb-3">{new Date(post.publishedAt).toLocaleDateString("fa-IR")}</p>}
                    <h2 className="text-xl font-black leading-relaxed group-hover:text-neutral-600" style={{ fontFamily: "var(--font-doran)" }}>{post.title}</h2>
                    {post.excerpt && <p className="mt-3 text-sm text-neutral-600 leading-7 line-clamp-3">{post.excerpt}</p>}
                    <span className="inline-block mt-5 text-xs font-bold">ادامهٔ مطلب ←</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
