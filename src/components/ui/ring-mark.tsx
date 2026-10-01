import { cn } from "@/lib/utils";

/**
 * Decorative 360° ring echoing the logo mark. Pure SVG so it stays crisp,
 * themeable and weightless.
 */
export function RingMark({ className, animate = true }: { className?: string; animate?: boolean }) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      className={cn("size-full", className)}
      aria-hidden
    >
      <defs>
        <linearGradient id="ring-a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#073665" />
          <stop offset="0.55" stopColor="#0d5ea1" />
          <stop offset="1" stopColor="#00afc3" />
        </linearGradient>
        <linearGradient id="ring-b" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3dbe9e" />
          <stop offset="1" stopColor="#00afc3" />
        </linearGradient>
      </defs>
      <g className={cn(animate && "origin-center animate-spin-slow")}>
        <circle cx="200" cy="200" r="168" stroke="url(#ring-a)" strokeWidth="22" strokeLinecap="round" strokeDasharray="640 420" />
        <circle cx="200" cy="200" r="134" stroke="url(#ring-b)" strokeWidth="8" strokeLinecap="round" strokeDasharray="300 560" transform="rotate(140 200 200)" />
        <circle cx="200" cy="200" r="190" stroke="#00afc3" strokeOpacity="0.35" strokeWidth="3" strokeLinecap="round" strokeDasharray="120 1100" transform="rotate(230 200 200)" />
      </g>
    </svg>
  );
}
