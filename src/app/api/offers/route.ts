import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const offers = await db.offer.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(offers);
  } catch (error) {
    console.error("Failed to fetch offers:", error);
    return NextResponse.json({ error: "Failed to fetch offers" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const offer = await db.offer.create({
      data: {
        title: body.title,
        slug: body.slug,
        description: body.description || "",
        image: body.image || null,
        discountLabel: body.discountLabel || null,
        details: body.details || {},
        includes: body.includes || [],
        terms: body.terms || null,
        bookingUrl: body.bookingUrl || null,
        validFrom: body.validFrom ? new Date(body.validFrom) : null,
        validTo: body.validTo ? new Date(body.validTo) : null,
        blackoutDates: body.blackoutDates || [],
        roomCategories: body.roomCategories || [],
        isFeatured: body.isFeatured || false,
        status: body.status || "draft",
      },
    });

    return NextResponse.json(offer, { status: 201 });
  } catch (error) {
    console.error("Failed to create offer:", error);
    return NextResponse.json({ error: "Failed to create offer" }, { status: 500 });
  }
}
