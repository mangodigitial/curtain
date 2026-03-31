import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuthAPI } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    await requireAuthAPI(req);
  } catch (res) {
    return res as Response;
  }

  const pages = await db.page.findMany({
    orderBy: { sortOrder: "asc" },
    include: { parent: true },
  });

  return NextResponse.json(pages);
}

export async function POST(req: NextRequest) {
  try {
    await requireAuthAPI(req);
  } catch (res) {
    return res as Response;
  }

  const body = await req.json();
  const { title, slug, parentId, template, status } = body;

  if (!title || !slug) {
    return NextResponse.json(
      { error: "Title and slug are required" },
      { status: 400 }
    );
  }

  const existing = await db.page.findUnique({ where: { slug } });
  if (existing) {
    return NextResponse.json(
      { error: "A page with this slug already exists" },
      { status: 409 }
    );
  }

  const page = await db.page.create({
    data: {
      title,
      slug,
      parentId: parentId || null,
      template: template || "generic",
      status: status || "draft",
    },
  });

  return NextResponse.json(page, { status: 201 });
}
