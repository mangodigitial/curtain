import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  const path = req.nextUrl.searchParams.get("path");
  if (!path) {
    return NextResponse.json({ redirect: null });
  }

  // Normalize: strip trailing slash
  const normalizedPath = path.endsWith("/") && path !== "/"
    ? path.slice(0, -1)
    : path;

  const redirect = await db.redirect.findFirst({
    where: {
      OR: [
        { fromPath: normalizedPath },
        { fromPath: `${normalizedPath}/` },
      ],
    },
  });

  if (redirect) {
    return NextResponse.json({
      redirect: {
        toPath: redirect.toPath,
        type: redirect.type,
      },
    });
  }

  return NextResponse.json({ redirect: null });
}
