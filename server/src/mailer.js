
import { Resend } from "resend";

const { RESEND_API_KEY, SMTP_FROM } = process.env;

const resend = RESEND_API_KEY
  ? new Resend(RESEND_API_KEY)
  : null;

export async function sendMail({ to, subject, text }) {
  if (!resend) {
    throw new Error("Email service is not configured");
  }

  const { data, error } = await resend.emails.send({
    from: SMTP_FROM || "Eventneve <onboarding@resend.dev>",
    to: [to],
    subject,
    text,
  });

  if (error) {
    console.error("Email delivery failed:", error);
    throw new Error("Unable to send email");
  }

  return { delivered: true, id: data.id };
}

export const emailConfigured = Boolean(resend);
