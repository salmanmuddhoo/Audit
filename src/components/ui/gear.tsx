import { cn } from "@/lib/utils";

/** Build a cog outline: `teeth` trapezoid peaks around a circle. */
function gearPath(cx: number, cy: number, tipR: number, baseR: number, teeth: number) {
  const step = (Math.PI * 2) / teeth;
  const baseHalf = step * 0.26; // half-width of a tooth at its base
  const tipHalf = step * 0.16; // half-width of a tooth at its tip
  const pt = (r: number, a: number) => `${(cx + r * Math.cos(a)).toFixed(2)} ${(cy + r * Math.sin(a)).toFixed(2)}`;
  let d = "";
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    const start = pt(baseR, a - baseHalf);
    d += (i === 0 ? "M" : "L") + start;
    d += ` L${pt(tipR, a - tipHalf)} L${pt(tipR, a + tipHalf)} L${pt(baseR, a + baseHalf)}`;
    // root arc to the next tooth
    d += ` A${baseR} ${baseR} 0 0 1 ${pt(baseR, a + step - baseHalf)}`;
  }
  return d + " Z";
}

const OUTLINE = gearPath(100, 100, 98, 86, 18);

/**
 * Decorative "settings" cog in light grey. Purely presentational; pair it
 * with a non-rotating overlay for any text.
 */
export function Gear({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={cn("size-full", className)} aria-hidden>
      <path d={OUTLINE} fill="#e3e8ee" stroke="#cbd2dc" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="100" cy="100" r="74" fill="#f1f4f7" stroke="#d9dfe7" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="66" fill="none" stroke="#e3e8ee" strokeWidth="1" strokeDasharray="3 5" />
    </svg>
  );
}
