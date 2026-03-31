import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendSubmissionNotification } from "@/lib/email";

export async function GET() {
  try {
    const submissions = await db.submission.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(submissions);
  } catch (error) {
    console.error("Failed to fetch submissions:", error);
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const submission = await db.submission.create({
      data: {
        formType: body.formType,
        data: body.data || {},
        ipAddress: body.ipAddress || null,
      },
    });

    // Send email notification (fire and forget — don't block the response)
    sendSubmissionNotification(
      body.formType,
      body.data || {}
    ).catch((err) => console.error("Notification email failed:", err));

    return NextResponse.json(submission, { status: 201 });
  } catch (error) {
    console.error("Failed to create submission:", error);
    return NextResponse.json({ error: "Failed to create submission" }, { status: 500 });
  }
}
