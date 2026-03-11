import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "DAHAB <noreply@dahab.ma>";

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!resend) {
    console.warn("[DAHAB Email] RESEND_API_KEY not configured — email skipped:", subject);
    return null;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
    });

    if (error) {
      console.error("[DAHAB Email] Send failed:", error);
      return null;
    }

    return data;
  } catch (err) {
    console.error("[DAHAB Email] Error:", err);
    return null;
  }
}
