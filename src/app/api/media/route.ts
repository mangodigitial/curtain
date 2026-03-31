import { NextRequest, NextResponse } from "next/server";
import { requireAuthAPI } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    await requireAuthAPI(req);

    const folder = req.nextUrl.searchParams.get("folder");

    const media = await db.media.findMany({
      where: folder ? { folder } : undefined,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(media);
  } catch (error) {
    if (error instanceof Response) return error;
    console.error("Media list error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
