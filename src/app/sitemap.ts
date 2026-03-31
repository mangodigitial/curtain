import type { MetadataRoute } from "next";
import { db } from "@/lib/db";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://curtainbluff.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const [pages, posts] = await Promise.all([
      db.page.findMany({
        where: { status: "published" },
        select: {
          slug: true,
          updatedAt: true,
          parentId: true,
          parent: { select: { slug: true } },
        },
      }),
      db.post.findMany({
        where: { status: "published" },
        select: { slug: true, updatedAt: true },
      }),
    ]);

    const pageEntries: MetadataRoute.Sitemap = pages.map((page) => {
      const isHome = page.slug === "home";
      const isChild = !!page.parentId && !!page.parent;

      let url: string;
      if (isHome) {
        url = siteUrl;
      } else if (isChild) {
        url = `${siteUrl}/${page.parent!.slug}/${page.slug}`;
      } else {
        url = `${siteUrl}/${page.slug}`;
      }

      return {
        url,
        lastModified: page.updatedAt,
        changeFrequency: "weekly" as const,
        priority: isHome ? 1.0 : 0.8,
      };
    });

    const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

    return [...pageEntries, ...postEntries];
  } catch {
    // Return a minimal sitemap so the build never breaks
    return [
      {
        url: siteUrl,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 1.0,
      },
    ];
  }
}
