import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuthAPI } from "@/lib/auth";
import { revalidatePageBySlug } from "@/lib/revalidate";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, ctx: RouteContext) {
  try {
    await requireAuthAPI(req);
  } catch (res) {
    return res as Response;
  }

  const { id } = await ctx.params;

  const page = await db.page.findUnique({
    where: { id },
    include: { parent: true, children: true },
  });

  if (!page) {
    return NextResponse.json({ error: "Page not found" }, { status: 404 });
  }

  return NextResponse.json(page);
}

export async function PUT(req: NextRequest, ctx: RouteContext) {
  try {
    await requireAuthAPI(req);
  } catch (res) {
    return res as Response;
  }

  const { id } = await ctx.params;
  const body = await req.json();

  // Strip relation fields that Prisma won't accept on update
  const { parent, children, createdAt, updatedAt, ...data } = body;

  const page = await db.page.update({
    where: { id },
    data,
  });

  revalidatePageBySlug(page.slug);

  return NextResponse.json(page);
}

export async function DELETE(req: NextRequest, ctx: RouteContext) {
  try {
    await requireAuthAPI(req);
  } catch (res) {
    return res as Response;
  }

  const { id } = await ctx.params;

  await db.page.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
