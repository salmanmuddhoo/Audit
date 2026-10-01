import { Quote } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const links = [
  { from: "A financial issue", to: "may originate from a weak process." },
  { from: "A compliance issue", to: "may reflect unclear accountability." },
  { from: "An operational problem", to: "may expose a wider control or governance weakness." },
];

export function WhoWeAre({ purpose }: { purpose: string }) {
  return (
    <section id="who-we-are" className="py-20 sm:py-28">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="01 · Who we are"
            title="Business challenges rarely exist in isolation."
            description="Insight.360° is an independent business advisory practice focused on helping organisations strengthen performance, governance, risk management, internal controls and compliance."
          />
          <figure className="mt-10 rounded-2xl bg-navy-900 p-7 text-white shadow-card">
            <Quote className="size-7 text-teal-400" aria-hidden />
            <blockquote className="mt-4 font-display text-xl leading-snug font-semibold">{purpose}</blockquote>
            <figcaption className="mt-4 text-sm text-white/60">Our purpose</figcaption>
          </figure>
        </div>
        <div className="lg:col-span-7">
          <ul className="space-y-4">
            {links.map((l, i) => (
              <li key={l.from} className="flex items-start gap-5 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-teal-50 font-display text-sm font-bold text-teal-600">
                  0{i + 1}
                </span>
                <p className="text-lg leading-relaxed">
                  <span className="font-semibold text-navy-900">{l.from}</span> {l.to}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-2xl border border-teal-100 bg-teal-50 p-7">
            <p className="text-lg leading-relaxed text-navy-900">
              That is why we take a <strong>360° perspective</strong>: looking beyond individual symptoms to understand how
              strategy, people, processes, performance, risks and controls work together.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {["Strategy", "People", "Processes", "Performance", "Risks", "Controls"].map((item) => (
                <li key={item} className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-navy-900 shadow-sm ring-1 ring-teal-100">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
