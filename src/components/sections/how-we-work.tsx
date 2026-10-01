import { Container } from "@/components/ui/container";
import { Card, IconBadge } from "@/components/ui/card";
import { Icon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { Walker } from "@/components/ui/walker";

const principles = [
  { name: "Practical", text: "Solutions that work in the real business environment.", icon: "wrench" },
  { name: "Independent", text: "Objective, evidence-based assessments.", icon: "scale" },
  { name: "Proportionate", text: "Recommendations aligned to size, complexity and resources.", icon: "gauge" },
  { name: "Action-oriented", text: "Insight translated into clear improvement actions.", icon: "target" },
];

const steps = ["Plan", "Understand", "Assess", "Analyse", "Report", "Improve", "Follow up"];

export function HowWeWork() {
  return (
    <section className="relative overflow-hidden bg-navy-50 py-20 sm:py-28">
      <div className="absolute inset-0 bg-grid [mask-image:linear-gradient(to_right,transparent,black,transparent)]" aria-hidden />
      <Container className="relative">
        <SectionHeading
          eyebrow="How we work"
          title="Professional advice. Practical improvement."
          description="Four principles guide every engagement, and one common methodology ensures the work is structured, evidence-based and followed through."
          align="center"
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p) => (
            <Card key={p.name} interactive>
              <IconBadge>
                <Icon name={p.icon} className="size-6" />
              </IconBadge>
              <h3 className="mt-5 text-xl">{p.name}</h3>
              <p className="mt-2 leading-relaxed">{p.text}</p>
            </Card>
          ))}
        </div>

        <div className="mt-20">
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="text-2xl sm:text-3xl">The Insight.360° approach</h3>
            <p className="mt-3 text-slate-600">A seven-step methodology applied consistently across every service.</p>
          </div>
          <ol className="relative mt-12 grid gap-6 sm:grid-cols-4 lg:grid-cols-7">
            <div className="absolute top-6 right-[7%] left-[7%] hidden h-0.5 bg-gradient-to-r from-navy-900 via-teal-500 to-mint-500 lg:block" aria-hidden />
            <Walker className="hidden lg:block" />
            {steps.map((step, i) => (
              <li key={step} className="relative flex items-center gap-4 sm:flex-col sm:text-center">
                <span className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full bg-white font-display text-sm font-extrabold text-navy-900 shadow-card ring-4 ring-navy-50">
                  <span className="absolute inset-1 rounded-full border-2 border-teal-500" aria-hidden />
                  {i + 1}
                </span>
                <span className="font-semibold text-navy-900">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
