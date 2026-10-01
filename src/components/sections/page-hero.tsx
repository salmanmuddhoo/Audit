import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { RingMark } from "@/components/ui/ring-mark";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  description,
  crumbs = [],
  children,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  crumbs?: Array<{ label: string; href?: string }>;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden bg-navy-50", className)}>
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" aria-hidden />
      <div className="pointer-events-none absolute -top-24 -right-24 size-[28rem] opacity-40 sm:size-[34rem]" aria-hidden>
        <RingMark />
      </div>
      <Container className="relative py-16 sm:py-20 lg:py-24">
        {crumbs.length ? (
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-navy-900">
                  Home
                </Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.label} className="flex items-center gap-1.5">
                  <ChevronRight className="size-3.5" aria-hidden />
                  {c.href ? (
                    <Link href={c.href as never} className="hover:text-navy-900">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-navy-900">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        <Eyebrow className="mb-4">{eyebrow}</Eyebrow>
        <h1 className="max-w-3xl text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">{title}</h1>
        {description ? <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">{description}</p> : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </Container>
    </section>
  );
}
