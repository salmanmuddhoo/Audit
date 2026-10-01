import "server-only";

type Mail = {
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
};

/**
 * Transactional email delivery. Uses Resend when configured; otherwise logs
 * to the server console so the site works out of the box in development.
 *
 * Required env (production):
 *   RESEND_API_KEY   – https://resend.com
 *   MAIL_FROM        – verified sender, e.g. "Insight.360° Website <website@insight360.solutions>"
 *   MAIL_TO          – inbox that receives enquiries, e.g. info@insight360.solutions
 */
export async function sendMail(mail: Mail): Promise<{ delivered: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM;
  const to = process.env.MAIL_TO;

  if (!apiKey || !from || !to) {
    if (process.env.NODE_ENV === "production") {
      console.error("[mailer] RESEND_API_KEY, MAIL_FROM and MAIL_TO must be set in production.");
      return { delivered: false };
    }
    console.info(`[mailer] (dev) would send: ${mail.subject}\n${mail.text}`);
    return { delivered: true };
  }

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: to.split(",").map((s) => s.trim()),
    replyTo: mail.replyTo,
    subject: mail.subject,
    text: mail.text,
    html: mail.html,
  });
  if (error) {
    console.error("[mailer] Resend error", error);
    return { delivered: false };
  }
  return { delivered: true };
}

export function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);
}

export function renderTable(rows: Array<[string, string | undefined]>) {
  const text = rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">${rows
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#5b6573;vertical-align:top"><strong>${escapeHtml(k)}</strong></td><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(v ?? "")}</td></tr>`,
    )
    .join("")}</table>`;
  return { text, html };
}
