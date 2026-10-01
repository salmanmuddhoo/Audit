import { NextResponse } from "next/server";
import { contactSchema, flattenErrors, type FormResult } from "@/lib/forms/schemas";
import { renderTable, sendMail } from "@/lib/forms/mailer";
import { clientKey, rateLimit } from "@/lib/forms/rate-limit";
import { getAllSolutions, getPillars } from "@/lib/content";

export async function POST(request: Request) {
  if (!rateLimit(`contact:${clientKey(request)}`).allowed) {
    return NextResponse.json<FormResult>({ ok: false, message: "Too many submissions. Please try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json<FormResult>({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json<FormResult>(
      { ok: false, message: "Please check the highlighted fields.", fieldErrors: flattenErrors(parsed.error) },
      { status: 422 },
    );
  }
  const data = parsed.data;

  // Resolve the enquiry type slug to a human label where possible.
  const [pillars, solutions] = await Promise.all([getPillars(), getAllSolutions()]);
  const label =
    solutions.find((s) => s.slug === data.enquiryType)?.name ??
    pillars.find((p) => p.slug === data.enquiryType)?.name ??
    data.enquiryType;

  const { text, html } = renderTable([
    ["Name", data.name],
    ["Email", data.email],
    ["Organisation", data.organisation || undefined],
    ["Phone", data.phone || undefined],
    ["Enquiry", label],
    ["Message", data.message],
  ]);

  const { delivered } = await sendMail({
    subject: `Website enquiry: ${label} – ${data.name}`,
    text,
    html: `<h2 style="font-family:Arial,sans-serif;color:#073665">New website enquiry</h2>${html}`,
    replyTo: data.email,
  });

  if (!delivered) {
    return NextResponse.json<FormResult>(
      { ok: false, message: "We could not send your message right now. Please email us directly." },
      { status: 502 },
    );
  }
  return NextResponse.json<FormResult>({ ok: true, message: "Thank you. We have received your enquiry and will respond within two working days." });
}
