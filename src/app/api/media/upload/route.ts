import { NextRequest, NextResponse } from "next/server";
import { requireAuthAPI } from "@/lib/auth";
import { db } from "@/lib/db";
import { processAndUploadImage } from "@/lib/images";

export async function POST(req: NextRequest) {
  try {
    await requireAuthAPI(req);

    const formData = await req.formData();
    const files = formData.getAll("files") as File[];

    if (!files.length) {
      return NextResponse.json(
        { error: "No files provided" },
        { status: 400 }
      );
    }

    const results = [];

    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        continue;
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const processed = await processAndUploadImage(buffer, file.name);

      const record = await db.media.create({
        data: {
          url: processed.url,
          filename: file.name,
          width: processed.width,
          height: processed.height,
          sizeBytes: processed.sizeBytes,
          mimeType: "image/webp",
          blurhash: processed.blurhash,
          folder: "general",
        },
      });

      results.push(record);
    }

    if (!results.length) {
      return NextResponse.json(
        { error: "No valid image files provided" },
        { status: 400 }
      );
    }

    return NextResponse.json(results, { status: 201 });
  } catch (error) {
    if (error instanceof Response) return error;
    console.error("Media upload error:", error);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}
