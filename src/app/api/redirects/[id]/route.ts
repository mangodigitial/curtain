import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const redirect = await db.redirect.update({
      where: { id },
      data: {
        fromPath: body.fromPath ?? undefined,
        toPath: body.toPath ?? undefined,
        type: body.type ?? undefined,
      },
    });

    return NextResponse.json(redirect);
  } catch (error) {
    console.error("Failed to update redirect:", error);
    return NextResponse.json({ error: "Failed to update redirect" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.redirect.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete redirect:", error);
    return NextResponse.json({ error: "Failed to delete redirect" }, { status: 500 });
  }
}
