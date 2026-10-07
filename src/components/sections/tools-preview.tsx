import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { routes } from "@/config/routes";
import type { ToolCollection } from "@/lib/content";

export function ToolsPreview({ collections }: { collections: ToolCollection[] }) {
  if (!collections.length) return null;
  return (
    <section className="relative overflow-hidden bg-navy-50 py-20 sm:py-28">
      <div className="absolute inset-0 bg-dots opacity-40 [mask-image:radial-gradient(ellipse_at_bottom_left,black,transparent_65%)]" aria-hidden />
      <Container className="relative">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="03 · Tools"
            title="Professional tools. Practical application."
            description="Practical business tools that bring structure, visibility and control to the way you work. They complement our advisory services and are designed for self-use."
          />
          <ButtonLink href={routes.tools} variant="outline" arrow className="shrink-0">
            Explore the tools
          </ButtonLink>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((collection) => (
            <Link
              key={collection.slug}
              href={`/tools#${collection.slug}`}
              className="group flex flex-col rounded-3xl border border-slate-200/80 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-card-hover"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex size-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600 transition group-hover:bg-navy-900 group-hover:text-white">
                  <Icon name={collection.icon} className="size-6" />
                </div>
                <Badge tone="amber">Coming soon</Badge>
              </div>
              <h3 className="mt-5 text-xl">{collection.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{collection.description}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {collection.tools.slice(0, 4).map((tool) => (
                  <li key={tool.slug} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                    {tool.name}
                  </li>
                ))}
              </ul>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-navy-900">
                See the collection
                <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-8 text-sm text-slate-600">
          Advisory helps you. <span className="font-semibold text-navy-900">Tools equip you.</span> Insights inform you.{" "}
          <Link href="/tools#register-interest" className="font-semibold text-teal-600 hover:text-navy-900">
            Register your interest →
          </Link>
        </p>
      </Container>
    </section>
  );
}
