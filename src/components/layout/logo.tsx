import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Wordmark rendered in HTML so it stays sharp and inherits colour.
 * The full ring logo (public/brand/insight360-logo.png) is used for
 * social previews and print.
 */
export function Logo({ className, tone = "dark", withTagline = false }: { className?: string; tone?: "dark" | "light"; withTagline?: boolean }) {
  return (
    <Link href="/" className={cn("group inline-flex flex-col leading-none", className)} aria-label="Insight.360° – home">
      <span className="flex items-center gap-2.5">
        <span className="relative size-9 shrink-0" aria-hidden>
          <svg viewBox="0 0 40 40" fill="none" className="size-full">
            <defs>
              <linearGradient id="logo-ring" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#073665" />
                <stop offset="0.6" stopColor="#0d5ea1" />
                <stop offset="1" stopColor="#00afc3" />
              </linearGradient>
            </defs>
            <circle cx="20" cy="20" r="15.5" stroke="url(#logo-ring)" strokeWidth="4.5" strokeLinecap="round" strokeDasharray="78 20" transform="rotate(-60 20 20)" />
            <circle cx="20" cy="20" r="15.5" stroke="#3dbe9e" strokeWidth="2" strokeLinecap="round" strokeDasharray="14 84" transform="rotate(100 20 20)" />
          </svg>
        </span>
        <span className={cn("font-display text-[1.45rem] font-extrabold tracking-tight", tone === "dark" ? "text-navy-900" : "text-white")}>
          Insight<span className="text-teal-500">.360°</span>
        </span>
      </span>
      {withTagline ? (
        <span className={cn("mt-1.5 pl-[2.9rem] text-[11px] font-medium tracking-wide", tone === "dark" ? "text-slate-500" : "text-white/60")}>
          Better Insight. Better Business.
        </span>
      ) : null}
    </Link>
  );
}
