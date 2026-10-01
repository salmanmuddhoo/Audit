import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
  interactive = false,
}: {
  className?: string;
  children: React.ReactNode;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200/80 bg-white p-7 shadow-card",
        interactive && "transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-card-hover",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function IconBadge({
  children,
  className,
  tone = "teal",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "teal" | "navy" | "white";
}) {
  return (
    <div
      className={cn(
        "flex size-12 shrink-0 items-center justify-center rounded-xl",
        tone === "teal" && "bg-teal-50 text-teal-600",
        tone === "navy" && "bg-navy-900 text-white",
        tone === "white" && "bg-white/10 text-teal-400 ring-1 ring-white/15",
        className,
      )}
    >
      {children}
    </div>
  );
}
