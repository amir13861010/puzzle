import { notFound } from "next/navigation";
import Link from "next/link";
import { getPayloadClient } from "@/lib/payload";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { ArrowRight, Clock, Calendar, Asterisk } from "lucide-react";
import BlogComments from "@/components/BlogComments";
import ShareButton from "@/components/ShareButton";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const payload = await getPayloadClient();
  const posts = await payload.find({
    collection: "posts",
    where: { slug: { equals: slug }, status: { equals: "published" } },
    limit: 1,
    depth: 1,
  });
  const post = posts.docs[0];
  if (!post) return { title: "مقاله پیدا نشد" };
  const seo = (post as unknown as { meta?: { title?: string; description?: string; image?: { url?: string } | string } }).meta;
  const title = seo?.title?.trim() || post.title;
  const description = seo?.description?.trim() || post.excerpt?.trim() || `مطالعهٔ مقالهٔ ${post.title} در مجلهٔ پازل.`;
  const category = post.parentCategory && typeof post.parentCategory === "object" ? post.parentCategory.name : null;
  const seoImage = seo?.image && typeof seo.image === "object" ? seo.image.url : null;
  const image = seoImage || (post.coverImage && typeof post.coverImage === "object" ? post.coverImage.url : null);
  return {
    title,
    description,
    keywords: [post.title, category, "مدیریت محصول", "طراحی محصول", "پازل"].filter(Boolean) as string[],
    openGraph: { title, description, type: "article", images: image ? [image] : undefined },
    alternates: { canonical: `/blog/${slug}` },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const payload = await getPayloadClient();

  // واکشی مقاله بر اساس اسلاگ
  const posts = await payload.find({
    collection: "posts",
    where: { slug: { equals: slug }, status: { equals: "published" } },
    limit: 1,
    depth: 2,
  });

  const post = posts.docs[0];
  if (!post) notFound();

  // استخراج اطلاعات دسته‌بندی
  const parentCategory =
    post.parentCategory && typeof post.parentCategory === "object"
      ? post.parentCategory
      : null;
  const subCategory =
    post.subCategory && typeof post.subCategory === "object"
      ? post.subCategory
      : null;

  return (
    <main
      className="bg-[#f5f5f5] text-black overflow-x-hidden selection:bg-[#c8ff00] selection:text-black min-h-screen relative font-sans"
      dir="rtl"
    >
      {/* واترمارک بزرگ و کم‌رنگ پس‌زمینه */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        <div
          className="absolute top-[6%] -left-[8%] text-black/[0.035] font-black text-[24vw] leading-none whitespace-nowrap uppercase tracking-tighter"
          style={{ fontFamily: "var(--font-display)" }}
        >
          ESSAY DISPATCH
        </div>
        <div
          className="absolute bottom-1/4 -right-10 text-black/[0.025] font-black text-[16vw] leading-none whitespace-nowrap"
          style={{ fontFamily: "var(--font-doran)" }}
        >
          یادداشت تخصصی
        </div>
      </div>

      <article className="pt-24 md:pt-36 pb-24 relative z-10">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          {/* نوار مسیر (Breadcrumb) + مشخصات ژورنالی */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-black pb-4 mb-10 md:mb-16 font-mono text-xs font-bold uppercase tracking-widest text-neutral-600">
            <nav className="flex items-center gap-2 flex-wrap">
              <Link
                href="/"
                className="hover:text-black hover:bg-[#c8ff00] px-1 transition-colors"
              >
                HOME
              </Link>
              <span>/</span>
              <span className="hover:text-black hover:bg-[#c8ff00] px-1 transition-colors">
                BLOG
              </span>
              {parentCategory && (
                <>
                  <span>/</span>
                  <span className="text-black/60">
                    {parentCategory.name}
                  </span>
                </>
              )}
              {subCategory && (
                <>
                  <span>/</span>
                  <span className="text-black bg-[#c8ff00] px-2 py-0.5 border border-black">
                    {subCategory.name}
                  </span>
                </>
              )}
            </nav>

            <div className="flex items-center gap-3 text-[11px]">
              <span className="hidden sm:inline">
                VOL. 2025 // ISSUE #{post.id ? String(post.id).slice(-4) : "001"}
              </span>
              <Asterisk className="w-3.5 h-3.5 animate-spin-slow" />
            </div>
          </div>

          {/* سربرگ مقاله (Title, Excerpt, Metadata) */}
          <header className="max-w-4xl mx-auto mb-12 md:mb-16">
            <div className="flex flex-wrap items-center gap-3 mb-6 font-mono text-xs">
              {subCategory && (
                <span className="bg-black text-white font-bold px-3 py-1 border border-black uppercase tracking-wider">
                  {subCategory.name}
                </span>
              )}
              {post.publishedAt && (
                <span className="flex items-center gap-1.5 text-neutral-700 bg-white border-2 border-black px-3 py-1 font-bold shadow-[2px_2px_0px_#000]">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(post.publishedAt).toLocaleDateString("fa-IR")}
                </span>
              )}
              <span className="flex items-center gap-1.5 text-neutral-700 bg-white border-2 border-black px-3 py-1 font-bold shadow-[2px_2px_0px_#000]">
                <Clock className="w-3.5 h-3.5" />
                زمان مطالعه: ۵ دقیقه
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] text-black tracking-tight mb-8"
              style={{ fontFamily: "var(--font-doran)" }}
            >
              {post.title}
            </h1>

            {post.excerpt && (
              <div className="border-2 border-black bg-white p-6 md:p-8 border-r-8 border-r-[#c8ff00] shadow-[6px_6px_0px_#000]">
                <p
                  className="text-lg md:text-2xl text-neutral-800 leading-relaxed font-bold"
                  style={{ fontFamily: "var(--font-doran)" }}
                >
                  {post.excerpt}
                </p>
              </div>
            )}
          </header>

          {/* کاور اصلی با بردر ۲ پیکسلی و سایه بروتالیستی */}
          {post.coverImage && typeof post.coverImage === "object" && (
            <div className="max-w-5xl mx-auto mb-16 md:mb-20">
              <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-black border-2 border-black shadow-[8px_8px_0px_#000]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.coverImage.url || ""}
                  alt={post.coverImage.alt || post.title}
                  className="w-full h-full object-cover contrast-105"
                />
                <div className="absolute top-3 left-3 bg-black text-white font-mono text-[10px] tracking-widest px-3 py-1 border border-white/20 uppercase">
                  FIGURE // 01
                </div>
              </div>
            </div>
          )}

          {/* بدنه و متن اصلی مقاله */}
          <div className="max-w-3xl mx-auto">
            {post.content && (
              <div
                className="payload-richtext text-base md:text-lg leading-[2.3] text-neutral-800 space-y-8 font-light"
                style={{ fontFamily: "var(--font-doran)" }}
              >
                <RichText data={post.content} />
              </div>
            )}

            {/* نوار تعامل و اطلاعات پایان متن */}
            <div className="mt-16 pt-8 border-t-2 border-black flex flex-wrap items-center justify-between gap-4 font-mono text-xs font-bold">
              <div className="flex items-center gap-3">
                <span className="uppercase text-neutral-500">ACTION:</span>
                <ShareButton title={post.title} text={post.excerpt || ""} />
              </div>

              <div className="font-mono text-neutral-500 uppercase tracking-widest text-[11px]">
                END OF DISPATCH // PUZZLE CLUB
              </div>
            </div>

            {/* دکمه بازگشت */}
            <div className="mt-12">
              <Link
                href="/"
                className="group inline-flex items-center gap-3 border-2 border-black bg-white hover:bg-black hover:text-white px-8 py-4 transition-all shadow-[4px_4px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                style={{ fontFamily: "var(--font-doran)" }}
              >
                <ArrowRight className="w-5 h-5 transition-transform group-hover:-translate-x-1 text-[#c8ff00]" />
                <span className="text-base font-black">
                  بازگشت به صفحه اصلی ❋
                </span>
              </Link>
            </div>

            {/* کامنت‌ها */}
            <BlogComments postId={post.id} />
          </div>
        </div>
      </article>
    </main>
  );
}
