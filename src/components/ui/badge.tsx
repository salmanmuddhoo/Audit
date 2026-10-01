import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
  tone = "teal",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "teal" | "navy" | "slate" | "amber" | "outline";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
        tone === "teal" && "bg-teal-50 text-teal-600",
        tone === "navy" && "bg-navy-900 text-white",
        tone === "slate" && "bg-slate-100 text-slate-600",
        tone === "amber" && "bg-amber-50 text-amber-700",
        tone === "outline" && "border border-slate-200 bg-white text-slate-600",
        className,
      )}
    >
      {children}
    </span>
  );
}
