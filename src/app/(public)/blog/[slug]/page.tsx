import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getSiteSettings } from "@/lib/site-settings";
import Image from "next/image";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const posts = await db.post.findMany({
      where: { status: "published" },
      select: { slug: true },
    });
    return posts.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await db.post.findUnique({ where: { slug } });
  const settings = await getSiteSettings();
  const suffix = settings?.seoDefaults?.title_suffix || "";

  if (!post) return { title: `Not Found${suffix}` };

  const seo = post.seo as Record<string, string> | null;

  return {
    title: seo?.meta_title || `${post.title}${suffix}`,
    description: seo?.meta_description || post.excerpt || undefined,
    openGraph: {
      title: seo?.og_title || post.title,
      description: seo?.og_description || post.excerpt || undefined,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  const post = await db.post.findUnique({
    where: { slug },
  });

  if (!post || post.status !== "published") {
    notFound();
  }

  const content = post.content as { type: string; content?: string }[] | null;

  return (
    <article className="pt-36 pb-20 px-6 md:px-12">
      <div className="max-w-[800px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[0.55rem] tracking-[0.3em] uppercase text-gold font-medium mb-4">
            {post.category}
          </p>
          <h1 className="font-heading text-[clamp(2rem,4vw,3.5rem)] font-light text-ocean-deep leading-tight mb-4">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="font-heading text-lg italic text-text-light font-light max-w-[600px] mx-auto">
              {post.excerpt}
            </p>
          )}
          <div className="flex items-center justify-center gap-4 mt-6 text-[0.7rem] text-text-light">
            {post.authorName && <span>By {post.authorName}</span>}
            <span>
              {new Date(post.createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="relative aspect-[16/9] overflow-hidden mb-12">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="800px"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="prose-custom">
          {Array.isArray(content) &&
            content.map((block, i) => {
              if (block.type === "paragraph" && block.content) {
                return (
                  <p
                    key={i}
                    className="text-[0.9rem] leading-[1.85] text-text-light font-light mb-6"
                    dangerouslySetInnerHTML={{ __html: block.content }}
                  />
                );
              }
              if (block.type === "heading" && block.content) {
                return (
                  <h2
                    key={i}
                    className="font-heading text-2xl font-light text-ocean-deep mt-10 mb-4"
                  >
                    {block.content}
                  </h2>
                );
              }
              return null;
            })}
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-sand-dark">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[0.6rem] tracking-[0.15em] uppercase text-text-light border border-sand-dark px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
