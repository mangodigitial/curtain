import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const vitals: Array<{
      name: string;
      value: number;
      id: string;
      page: string;
    }> = Array.isArray(body) ? body : [body];

    for (const vital of vitals) {
      console.log(`[Web Vital] ${vital.name}: ${vital.value.toFixed(2)} (page: ${vital.page})`);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body" },
      { status: 400 }
    );
  }
}
