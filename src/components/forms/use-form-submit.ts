"use client";

import { useState } from "react";
import type { FormResult } from "@/lib/forms/schemas";

export function useFormSubmit(endpoint: string) {
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>();
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function submit(payload: unknown) {
    setPending(true);
    setFieldErrors({});
    setStatus("idle");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await res.json()) as FormResult;
      if (result.ok) {
        setStatus("success");
        setMessage(result.message);
        return true;
      }
      setStatus("error");
      setMessage(result.message);
      setFieldErrors(result.fieldErrors ?? {});
      return false;
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again or email us directly.");
      return false;
    } finally {
      setPending(false);
    }
  }

  return { submit, pending, status, message, fieldErrors };
}
