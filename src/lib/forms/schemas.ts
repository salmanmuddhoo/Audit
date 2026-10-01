import { z } from "zod";

/**
 * Shared validation for forms – used client-side for instant feedback and
 * server-side in route handlers as the source of truth.
 */
const name = z.string().trim().min(2, "Please enter your name").max(120);
const email = z.string().trim().email("Please enter a valid email address").max(200);
const organisation = z.string().trim().max(160).optional().or(z.literal(""));
const phone = z.string().trim().max(40).optional().or(z.literal(""));
/** Honeypot – real users never fill it. */
const website = z.string().max(0, "Invalid submission").optional().or(z.literal(""));
const consent = z.literal(true, { error: "Please acknowledge the privacy notice" });

export const contactSchema = z.object({
  name,
  email,
  organisation,
  phone,
  enquiryType: z.string().trim().min(1, "Please choose an enquiry type").max(80),
  message: z.string().trim().min(20, "Please tell us a little more (at least 20 characters)").max(4000),
  consent,
  website,
});
export type ContactInput = z.infer<typeof contactSchema>;

export const toolInterestSchema = z.object({
  name,
  email,
  organisation,
  collections: z.array(z.string().max(80)).min(1, "Choose at least one tool collection").max(10),
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
  consent,
  website,
});
export type ToolInterestInput = z.infer<typeof toolInterestSchema>;

export type FormResult =
  | { ok: true; message: string }
  | { ok: false; message: string; fieldErrors?: Record<string, string> };

export function flattenErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
