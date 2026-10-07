import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icons";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { routes } from "@/config/routes";
import { getPillars } from "@/lib/content";
import { cn } from "@/lib/utils";
import { JsonLd, abs, breadcrumbJsonLd, itemListJsonLd, pageAlternates, webPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Services – Business Advisory, Governance, Risk & Compliance",
  description:
    "Eight focused advisory solutions across four connected pillars: Business Advisory, Governance, Risk and Compliance. Professional advice, practical improvement.",
  alternates: pageAlternates("/services"),
};

export default async function ServicesPage() {
  const pillars = await getPillars();
  const solutions = pillars.flatMap((p) => p.solutions);

  return (
    <>
      <JsonLd data={webPageJsonLd({ type: "CollectionPage", path: "/services", name: "Services", description: metadata.description as string })} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Services", path: "/services" }])} />
      <JsonLd
        data={itemListJsonLd(
          "Insight.360° advisory solutions",
          solutions.map((s) => ({ name: s.name, url: abs(`/services/${s.slug}`), description: s.tagline })),
        )}
      />
      <PageHero
        eyebrow="02 · Services"
        title={
          <>
            Professional advice. <span className="text-gradient">Practical improvement.</span>
          </>
        }
        description="Our advisory services are organised around four connected pillars, supported by eight focused solutions. Each engagement follows the same proportionate, evidence-based methodology."
        crumbs={[{ label: "Services" }]}
      >
        <ul className="flex flex-wrap gap-2.5">
          {pillars.map((p) => (
            <li key={p.slug}>
              <a
                href={`#${p.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-navy-900/10 bg-white px-4 py-2 text-sm font-semibold text-navy-900 shadow-sm transition hover:border-teal-500 hover:text-teal-600"
              >
                <Icon name={p.icon} className="size-4 text-teal-500" />
                {p.name}
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      {pillars.map((pillar, index) => (
        <section
          key={pillar.slug}
          id={pillar.slug}
          className={cn("scroll-mt-24 py-20 sm:py-24", index % 2 === 1 && "bg-navy-50")}
        >
          <Container className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <Eyebrow className="mb-4">Pillar 0{pillar.order}</Eyebrow>
                <div className="flex size-14 items-center justify-center rounded-2xl bg-navy-900 text-white">
                  <Icon name={pillar.icon} className="size-7" />
                </div>
                <h2 className="mt-6 text-3xl sm:text-4xl">{pillar.name}</h2>
                <p className="mt-2 font-display text-lg font-semibold text-teal-600">{pillar.strapline}</p>
                <p className="mt-5 leading-relaxed text-slate-600">{pillar.description}</p>
                <ButtonLink href={routes.contactFor(pillar.slug)} variant="outline" className="mt-7" arrow>
                  Enquire about {pillar.name.toLowerCase()}
                </ButtonLink>
              </div>
            </div>
            <div className="space-y-5 lg:col-span-8">
              {pillar.solutions.map((solution) => (
                <article
                  key={solution.slug}
                  className="group rounded-3xl border border-slate-200/80 bg-white p-7 shadow-card transition hover:border-teal-200 hover:shadow-card-hover sm:p-9"
                >
                  <div className="flex items-start gap-5">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                      <Icon name={solution.icon} className="size-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-2xl">
                        <Link href={routes.service(solution.slug)} className="hover:text-teal-600">
                          {solution.name}
                        </Link>
                      </h3>
                      <p className="mt-1.5 font-medium text-navy-900/80">{solution.tagline}</p>
                      <p className="mt-4 leading-relaxed text-slate-600">{solution.summary}</p>
                      {solution.outcomes.length ? (
                        <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                          {solution.outcomes.slice(0, 4).map((o) => (
                            <li key={o} className="flex items-start gap-2 text-sm text-slate-600">
                              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-teal-500" aria-hidden />
                              {o}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      <div className="mt-7 flex flex-wrap items-center gap-3">
                        <ButtonLink href={routes.contactFor(solution.slug)} size="sm" variant="accent">
                          Enquire now
                        </ButtonLink>
                        <Link
                          href={routes.service(solution.slug)}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 hover:text-teal-600"
                        >
                          How it works
                          <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>
      ))}

      <CtaBand
        title="Not sure where to start?"
        description="A Business 360° Diagnostic gives you an independent view of the whole organisation and a prioritised list of improvements. Or simply tell us the challenge and we will suggest the right starting point."
        primaryLabel="Discuss your requirements"
        secondaryLabel="Our tools"
        secondaryHref={routes.tools}
      />
    </>
  );
}
