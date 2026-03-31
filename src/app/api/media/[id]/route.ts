import { NextRequest, NextResponse } from "next/server";
import { requireAuthAPI } from "@/lib/auth";
import { db } from "@/lib/db";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, context: RouteContext) {
  try {
    await requireAuthAPI(req);

    const { id } = await context.params;

    const media = await db.media.findUnique({ where: { id } });

    if (!media) {
      return NextResponse.json(
        { error: "Media not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(media);
  } catch (error) {
    if (error instanceof Response) return error;
    console.error("Media GET error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, context: RouteContext) {
  try {
    await requireAuthAPI(req);

    const { id } = await context.params;
    const body = await req.json();

    const existing = await db.media.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: "Media not found" },
        { status: 404 }
      );
    }

    const data: Record<string, unknown> = {};
    if (body.alt_text !== undefined) data.altText = body.alt_text;
    if (body.caption !== undefined) data.caption = body.caption;
    if (body.folder !== undefined) data.folder = body.folder;

    const updated = await db.media.update({
      where: { id },
      data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    if (error instanceof Response) return error;
    console.error("Media PUT error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  try {
    await requireAuthAPI(req);

    const { id } = await context.params;

    const existing = await db.media.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: "Media not found" },
        { status: 404 }
      );
    }

    await db.media.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Response) return error;
    console.error("Media DELETE error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
