import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { revalidateBlogPost } from "@/lib/revalidate";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const post = await db.post.findUnique({ where: { id } });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Failed to fetch post:", error);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const post = await db.post.update({
      where: { id },
      data: {
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt ?? undefined,
        content: body.content ?? undefined,
        featuredImage: body.featuredImage ?? undefined,
        category: body.category ?? undefined,
        tags: body.tags ?? undefined,
        authorName: body.authorName ?? undefined,
        seo: body.seo ?? undefined,
        status: body.status ?? undefined,
        publishAt: body.publishAt !== undefined
          ? body.publishAt
            ? new Date(body.publishAt)
            : null
          : undefined,
      },
    });

    revalidateBlogPost(post.slug);

    return NextResponse.json(post);
  } catch (error) {
    console.error("Failed to update post:", error);
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const post = await db.post.findUnique({ where: { id } });
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    await db.post.delete({ where: { id } });

    revalidateBlogPost(post.slug);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete post:", error);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
