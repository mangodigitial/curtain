import { db } from "@/lib/db";
import { getSiteSettings } from "@/lib/site-settings";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const suffix = settings?.seoDefaults?.title_suffix || "";
  return {
    title: `Blog${suffix}`,
    description: "Latest news and stories from Curtain Bluff, Antigua.",
  };
}

export default async function BlogListingPage() {
  let posts: Awaited<ReturnType<typeof db.post.findMany>> = [];
  try {
    posts = await db.post.findMany({
      where: { status: "published" },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    // DB not available at build time
  }

  return (
    <div className="pt-36 pb-20 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-heading text-[clamp(2.5rem,5vw,4rem)] font-light text-ocean-deep leading-tight">
            News & <em className="text-coral">Stories</em>
          </h1>
          <p className="mt-4 font-heading text-lg italic text-text-light font-light">
            The latest from Curtain Bluff
          </p>
        </div>

        {/* Post Grid */}
        {posts.length === 0 ? (
          <p className="text-center text-text-light">No posts yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group block"
              >
                {post.featuredImage && (
                  <div className="relative overflow-hidden aspect-[16/10] mb-4">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-[1.04] transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <p className="text-[0.55rem] tracking-[0.3em] uppercase text-gold font-medium mb-2">
                  {post.category}
                </p>
                <h2 className="font-heading text-[1.4rem] font-normal text-ocean-deep mb-2 group-hover:text-coral transition-colors">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="text-[0.82rem] text-text-light font-light leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
