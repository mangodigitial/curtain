import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuthAPI } from "@/lib/auth";

export async function PUT(req: NextRequest) {
  try {
    await requireAuthAPI(req);
  } catch (res) {
    return res as Response;
  }

  const { pages } = await req.json();

  if (!Array.isArray(pages)) {
    return NextResponse.json(
      { error: "pages array is required" },
      { status: 400 }
    );
  }

  await db.$transaction(
    pages.map((p: { id: string; sortOrder: number }) =>
      db.page.update({
        where: { id: p.id },
        data: { sortOrder: p.sortOrder },
      })
    )
  );

  return NextResponse.json({ success: true });
}
