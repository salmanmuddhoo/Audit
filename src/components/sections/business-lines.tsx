import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { routes } from "@/config/routes";

const lines = [
  {
    name: "Advisory",
    promise: "We help you.",
    icon: "briefcase",
    items: ["Business Advisory", "Governance", "Risk", "Compliance"],
    href: routes.services,
    cta: "Our services",
  },
  {
    name: "Tools",
    promise: "We equip you.",
    icon: "wrench",
    items: ["Toolkits", "Registers", "Dashboards", "Frameworks"],
    href: routes.tools,
    cta: "Our tools",
  },
  {
    name: "Insights",
    promise: "We inform you.",
    icon: "lightbulb",
    items: ["Videos", "Articles", "Guides", "Resources"],
    href: routes.insights,
    cta: "Our insights",
  },
];

const journey = ["Insight", "Resource", "Tool", "Advisory"];

export function BusinessLines() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-20 text-white sm:py-28">
      <div className="pointer-events-none absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-teal-400/60 to-transparent" aria-hidden />
      <div className="pointer-events-none absolute -right-32 -bottom-32 size-[36rem] rounded-full bg-teal-500/10 blur-3xl" aria-hidden />
      <Container className="relative">
        <SectionHeading
          eyebrow="05 · How it fits together"
          title="One brand. Three complementary business lines."
          description="Insight.360° brings advisory services, practical tools and educational content together under one promise: Better Insight. Better Business."
          tone="light"
          align="center"
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {lines.map((line) => (
            <div key={line.name} className="group flex flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur transition hover:border-teal-400/40 hover:bg-white/[0.07]">
              <div className="flex size-12 items-center justify-center rounded-xl bg-teal-500/15 text-teal-400 ring-1 ring-teal-400/30">
                <Icon name={line.icon} className="size-6" />
              </div>
              <h3 className="mt-6 text-2xl text-white">{line.name}</h3>
              <p className="mt-1 font-display text-lg font-semibold text-teal-400">{line.promise}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {line.items.map((item) => (
                  <li key={item} className="rounded-full border border-white/10 px-3 py-1 text-sm text-white/80">
                    {item}
                  </li>
                ))}
              </ul>
              <Link href={line.href} className="mt-auto inline-flex items-center gap-1.5 pt-8 text-sm font-semibold text-white transition group-hover:text-teal-400">
                {line.cta}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-3xl border border-white/10 bg-gradient-to-br from-navy-900 to-navy-950 p-8 sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-xl">
            <h3 className="text-2xl text-white">A connected client journey</h3>
            <p className="mt-3 leading-relaxed text-white/70">
              A business may first discover Insight.360° through an article or video, use a practical tool to understand an
              issue, and then engage us for a structured advisory assignment where deeper assessment or implementation
              support is required.
            </p>
          </div>
          <ol className="mt-8 flex flex-wrap items-center gap-3 lg:mt-0">
            {journey.map((step, i) => (
              <li key={step} className="flex items-center gap-3">
                <span className="rounded-full bg-white/10 px-5 py-2.5 font-display font-bold text-white ring-1 ring-white/15">{step}</span>
                {i < journey.length - 1 ? <ArrowRight className="size-4 text-teal-400" aria-hidden /> : null}
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
