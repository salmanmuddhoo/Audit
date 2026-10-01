import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { InsightCard } from "@/components/insights/insight-card";
import { routes } from "@/config/routes";
import type { Insight } from "@/lib/content";

export function InsightsPreview({ insights }: { insights: Insight[] }) {
  if (!insights.length) return null;
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="04 · Insights"
            title="Ideas and knowledge for better decisions."
            description="We translate business, governance, risk and compliance topics into clear, useful and practical content."
          />
          <ButtonLink href={routes.insights} variant="outline" arrow className="shrink-0">
            All insights
          </ButtonLink>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {insights.slice(0, 3).map((insight) => (
            <InsightCard key={insight.slug} insight={insight} />
          ))}
        </div>
      </Container>
    </section>
  );
}
