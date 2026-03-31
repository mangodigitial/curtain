import { db } from "@/lib/db";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://curtainbluff.com";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  let posts: {
    title: string;
    slug: string;
    excerpt: string | null;
    createdAt: Date;
  }[] = [];

  try {
    posts = await db.post.findMany({
      where: { status: "published" },
      orderBy: { createdAt: "desc" },
      select: {
        title: true,
        slug: true,
        excerpt: true,
        createdAt: true,
      },
    });
  } catch {
    // Gracefully degrade — return an empty feed rather than crashing
  }

  const items = posts
    .map(
      (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${siteUrl}/blog/${escapeXml(post.slug)}</link>
      <description>${escapeXml(post.excerpt || "")}</description>
      <pubDate>${new Date(post.createdAt).toUTCString()}</pubDate>
      <guid isPermaLink="true">${siteUrl}/blog/${escapeXml(post.slug)}</guid>
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Curtain Bluff Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Latest news, stories, and travel inspiration from Curtain Bluff, Antigua.</description>
    <language>en-us</language>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
