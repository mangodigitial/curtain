import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const submission = await db.submission.findUnique({ where: { id } });

    if (!submission) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 });
    }

    return NextResponse.json(submission);
  } catch (error) {
    console.error("Failed to fetch submission:", error);
    return NextResponse.json({ error: "Failed to fetch submission" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const submission = await db.submission.update({
      where: { id },
      data: {
        read: body.read ?? undefined,
        replied: body.replied ?? undefined,
      },
    });

    return NextResponse.json(submission);
  } catch (error) {
    console.error("Failed to update submission:", error);
    return NextResponse.json({ error: "Failed to update submission" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.submission.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete submission:", error);
    return NextResponse.json({ error: "Failed to delete submission" }, { status: 500 });
  }
}
