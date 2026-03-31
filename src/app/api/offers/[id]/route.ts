import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { revalidatePageBySlug } from "@/lib/revalidate";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const offer = await db.offer.findUnique({ where: { id } });

    if (!offer) {
      return NextResponse.json({ error: "Offer not found" }, { status: 404 });
    }

    return NextResponse.json(offer);
  } catch (error) {
    console.error("Failed to fetch offer:", error);
    return NextResponse.json({ error: "Failed to fetch offer" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const offer = await db.offer.update({
      where: { id },
      data: {
        title: body.title ?? undefined,
        slug: body.slug ?? undefined,
        description: body.description ?? undefined,
        image: body.image ?? undefined,
        discountLabel: body.discountLabel ?? undefined,
        details: body.details ?? undefined,
        includes: body.includes ?? undefined,
        terms: body.terms ?? undefined,
        bookingUrl: body.bookingUrl ?? undefined,
        validFrom: body.validFrom !== undefined
          ? body.validFrom ? new Date(body.validFrom) : null
          : undefined,
        validTo: body.validTo !== undefined
          ? body.validTo ? new Date(body.validTo) : null
          : undefined,
        blackoutDates: body.blackoutDates ?? undefined,
        roomCategories: body.roomCategories ?? undefined,
        isFeatured: body.isFeatured ?? undefined,
        status: body.status ?? undefined,
      },
    });

    // Always revalidate the special-offers page
    revalidatePageBySlug("special-offers");

    // If the offer is featured, also revalidate the home page
    if (offer.isFeatured) {
      revalidatePageBySlug("home");
    }

    return NextResponse.json(offer);
  } catch (error) {
    console.error("Failed to update offer:", error);
    return NextResponse.json({ error: "Failed to update offer" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const offer = await db.offer.findUnique({ where: { id } });
    if (!offer) {
      return NextResponse.json({ error: "Offer not found" }, { status: 404 });
    }

    await db.offer.delete({ where: { id } });

    revalidatePageBySlug("special-offers");
    if (offer.isFeatured) {
      revalidatePageBySlug("home");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete offer:", error);
    return NextResponse.json({ error: "Failed to delete offer" }, { status: 500 });
  }
}
