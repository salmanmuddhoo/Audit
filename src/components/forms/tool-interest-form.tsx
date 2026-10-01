"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FormStatus, Honeypot, inputClass } from "./form-primitives";
import { useFormSubmit } from "./use-form-submit";
import { toolInterestSchema, flattenErrors } from "@/lib/forms/schemas";
import { cn } from "@/lib/utils";

export function ToolInterestForm({ collections }: { collections: Array<{ slug: string; name: string }> }) {
  const { submit, pending, status, message, fieldErrors } = useFormSubmit("/api/tool-interest");
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});
  const errors = { ...localErrors, ...fieldErrors };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      organisation: fd.get("organisation"),
      collections: fd.getAll("collections"),
      notes: fd.get("notes"),
      consent: fd.get("consent") === "on",
      website: fd.get("website") ?? "",
    };
    const parsed = toolInterestSchema.safeParse(payload);
    if (!parsed.success) {
      setLocalErrors(flattenErrors(parsed.error));
      return;
    }
    setLocalErrors({});
    const ok = await submit(parsed.data);
    if (ok) form.reset();
  }

  if (status === "success") {
    return <FormStatus status="success" message={message} />;
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-5">
      <Honeypot />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="ti-name" required error={errors.name}>
          <input id="ti-name" name="name" autoComplete="name" className={inputClass} aria-invalid={!!errors.name} />
        </Field>
        <Field label="Email" htmlFor="ti-email" required error={errors.email}>
          <input id="ti-email" name="email" type="email" autoComplete="email" className={inputClass} aria-invalid={!!errors.email} />
        </Field>
      </div>
      <Field label="Organisation" htmlFor="ti-org" error={errors.organisation}>
        <input id="ti-org" name="organisation" autoComplete="organization" className={inputClass} />
      </Field>
      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-navy-900">
          Tool collections of interest <span className="text-teal-600">*</span>
        </legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {collections.map((c) => (
            <label
              key={c.slug}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-navy-900 transition has-[:checked]:border-teal-500 has-[:checked]:bg-teal-50",
              )}
            >
              <input type="checkbox" name="collections" value={c.slug} className="size-4 accent-teal-600" />
              {c.name}
            </label>
          ))}
        </div>
        {errors.collections ? <p className="mt-1.5 text-sm text-red-600" role="alert">{errors.collections}</p> : null}
      </fieldset>
      <Field label="Anything specific you are looking for?" htmlFor="ti-notes" error={errors.notes}>
        <textarea id="ti-notes" name="notes" rows={3} className={inputClass} />
      </Field>
      <label className="flex items-start gap-3 text-sm text-slate-600">
        <input type="checkbox" name="consent" className="mt-1 size-4 accent-teal-600" />
        <span>
          I agree that Insight.360° may contact me about its tools and I have read the{" "}
          <Link href="/privacy" className="font-medium text-teal-600 underline underline-offset-2">
            privacy notice
          </Link>
          . <span className="text-teal-600">*</span>
        </span>
      </label>
      {errors.consent ? <p className="-mt-3 text-sm text-red-600" role="alert">{errors.consent}</p> : null}
      <FormStatus status={status} message={message} />
      <Button type="submit" variant="accent" disabled={pending} arrow className="w-full sm:w-auto">
        {pending ? "Sending…" : "Register my interest"}
      </Button>
    </form>
  );
}
