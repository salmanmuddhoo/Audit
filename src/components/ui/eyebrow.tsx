import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
  tone = "teal",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "teal" | "light";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] uppercase",
        tone === "teal" ? "text-teal-600" : "text-teal-400",
        className,
      )}
    >
      <span className={cn("h-0.5 w-6 rounded-full", tone === "teal" ? "bg-teal-500" : "bg-teal-400")} aria-hidden />
      {children}
    </span>
  );
}
