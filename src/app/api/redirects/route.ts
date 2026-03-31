import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const redirects = await db.redirect.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(redirects);
  } catch (error) {
    console.error("Failed to fetch redirects:", error);
    return NextResponse.json({ error: "Failed to fetch redirects" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const redirect = await db.redirect.create({
      data: {
        fromPath: body.fromPath,
        toPath: body.toPath,
        type: body.type || 301,
      },
    });

    return NextResponse.json(redirect, { status: 201 });
  } catch (error) {
    console.error("Failed to create redirect:", error);
    return NextResponse.json({ error: "Failed to create redirect" }, { status: 500 });
  }
}
