import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail({ to, subject, html, from }: SendEmailOptions) {
  if (!resend) {
    console.warn("Resend API key not configured — skipping email send");
    return { success: false, error: "No API key" };
  }

  const senderAddress =
    from || `Curtain Bluff CMS <noreply@${process.env.NEXT_PUBLIC_SITE_URL?.replace(/https?:\/\//, "") || "curtainbluff.com"}>`;

  try {
    const { data, error } = await resend.emails.send({
      from: senderAddress,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
    });

    if (error) {
      console.error("Email send error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Email send exception:", error);
    return { success: false, error };
  }
}

export async function sendSubmissionNotification(
  formType: string,
  data: Record<string, unknown>
) {
  const fields = Object.entries(data)
    .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
    .join("");

  return sendEmail({
    to: "admin@curtainbluff.com",
    subject: `New ${formType} submission — Curtain Bluff`,
    html: `
      <h2>New ${formType} submission</h2>
      ${fields}
      <hr>
      <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/submissions">View in admin panel</a></p>
    `,
  });
}
