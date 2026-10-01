"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FormStatus, Honeypot, inputClass } from "./form-primitives";
import { useFormSubmit } from "./use-form-submit";
import { contactSchema, flattenErrors } from "@/lib/forms/schemas";

export type EnquiryOption = { value: string; label: string; group: string };

export function ContactForm({ options, defaultService }: { options: EnquiryOption[]; defaultService?: string }) {
  const { submit, pending, status, message, fieldErrors } = useFormSubmit("/api/contact");
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});
  const errors = { ...localErrors, ...fieldErrors };
  const groups = [...new Set(options.map((o) => o.group))];
  const initial = options.some((o) => o.value === defaultService) ? defaultService : "";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      organisation: fd.get("organisation"),
      phone: fd.get("phone"),
      enquiryType: fd.get("enquiryType"),
      message: fd.get("message"),
      consent: fd.get("consent") === "on",
      website: fd.get("website") ?? "",
    };
    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      setLocalErrors(flattenErrors(parsed.error));
      return;
    }
    setLocalErrors({});
    const ok = await submit(parsed.data);
    if (ok) form.reset();
  }

  if (status === "success") {
    return (
      <div className="space-y-4">
        <FormStatus status="success" message={message} />
        <p className="text-sm text-slate-600">
          In the meantime, you may like to explore our{" "}
          <Link href="/insights" className="font-semibold text-teal-600">
            latest insights
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-5">
      <Honeypot />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor="c-name" required error={errors.name}>
          <input id="c-name" name="name" autoComplete="name" className={inputClass} aria-invalid={!!errors.name} />
        </Field>
        <Field label="Email" htmlFor="c-email" required error={errors.email}>
          <input id="c-email" name="email" type="email" autoComplete="email" className={inputClass} aria-invalid={!!errors.email} />
        </Field>
        <Field label="Organisation" htmlFor="c-org" error={errors.organisation}>
          <input id="c-org" name="organisation" autoComplete="organization" className={inputClass} />
        </Field>
        <Field label="Telephone" htmlFor="c-phone" error={errors.phone} hint="Optional">
          <input id="c-phone" name="phone" type="tel" autoComplete="tel" className={inputClass} />
        </Field>
      </div>
      <Field label="What is your enquiry about?" htmlFor="c-type" required error={errors.enquiryType}>
        <select id="c-type" name="enquiryType" defaultValue={initial} className={inputClass} aria-invalid={!!errors.enquiryType}>
          <option value="" disabled>
            Select an area…
          </option>
          {groups.map((g) => (
            <optgroup key={g} label={g}>
              {options
                .filter((o) => o.group === g)
                .map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
            </optgroup>
          ))}
        </select>
      </Field>
      <Field label="How can we help?" htmlFor="c-message" required error={errors.message} hint="Tell us about your organisation and the challenge you are facing.">
        <textarea id="c-message" name="message" rows={6} className={inputClass} aria-invalid={!!errors.message} />
      </Field>
      <label className="flex items-start gap-3 text-sm text-slate-600">
        <input type="checkbox" name="consent" className="mt-1 size-4 accent-teal-600" />
        <span>
          I acknowledge that Insight.360° will use the information provided to respond to my enquiry, as described in the{" "}
          <Link href="/privacy" className="font-medium text-teal-600 underline underline-offset-2">
            privacy notice
          </Link>
          . <span className="text-teal-600">*</span>
        </span>
      </label>
      {errors.consent ? <p className="-mt-3 text-sm text-red-600" role="alert">{errors.consent}</p> : null}
      <FormStatus status={status} message={message} />
      <Button type="submit" variant="accent" size="lg" disabled={pending} arrow className="w-full sm:w-auto">
        {pending ? "Sending…" : "Send enquiry"}
      </Button>
    </form>
  );
}
