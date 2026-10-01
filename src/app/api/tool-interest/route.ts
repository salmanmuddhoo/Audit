import { NextResponse } from "next/server";
import { flattenErrors, toolInterestSchema, type FormResult } from "@/lib/forms/schemas";
import { renderTable, sendMail } from "@/lib/forms/mailer";
import { clientKey, rateLimit } from "@/lib/forms/rate-limit";
import { getToolCollections } from "@/lib/content";

export async function POST(request: Request) {
  if (!rateLimit(`interest:${clientKey(request)}`).allowed) {
    return NextResponse.json<FormResult>({ ok: false, message: "Too many submissions. Please try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json<FormResult>({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  const parsed = toolInterestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json<FormResult>(
      { ok: false, message: "Please check the highlighted fields.", fieldErrors: flattenErrors(parsed.error) },
      { status: 422 },
    );
  }
  const data = parsed.data;
  const collections = await getToolCollections();
  const names = data.collections.map((slug) => collections.find((c) => c.slug === slug)?.name ?? slug);

  const { text, html } = renderTable([
    ["Name", data.name],
    ["Email", data.email],
    ["Organisation", data.organisation || undefined],
    ["Interested in", names.join(", ")],
    ["Notes", data.notes || undefined],
  ]);

  const { delivered } = await sendMail({
    subject: `Tools interest: ${data.name}`,
    text,
    html: `<h2 style="font-family:Arial,sans-serif;color:#073665">New tools interest registration</h2>${html}`,
    replyTo: data.email,
  });

  if (!delivered) {
    return NextResponse.json<FormResult>({ ok: false, message: "We could not register your interest right now. Please email us directly." }, { status: 502 });
  }
  return NextResponse.json<FormResult>({ ok: true, message: "Thank you. We will let you know as soon as the tools are available." });
}
