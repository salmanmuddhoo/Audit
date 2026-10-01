import { Icon } from "@/components/ui/icons";
import { PageHero } from "@/components/sections/page-hero";
import { insightTypeMeta, type InsightType } from "@/lib/content";

const order: InsightType[] = ["video", "article", "guide", "download"];

export function InsightsHero({
  title,
  description,
  crumbs,
}: {
  title: React.ReactNode;
  description: string;
  crumbs?: Array<{ label: string; href?: string }>;
}) {
  return (
    <PageHero eyebrow="04 · Insights" title={title} description={description} crumbs={crumbs ?? [{ label: "Insights" }]}>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {order.map((type) => {
          const meta = insightTypeMeta[type];
          return (
            <li key={type} className="flex items-start gap-3 rounded-2xl border border-navy-900/10 bg-white/80 p-4 backdrop-blur">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
                <Icon name={meta.icon} className="size-4" />
              </span>
              <span>
                <span className="block text-xs font-bold tracking-[0.16em] text-navy-900 uppercase">{meta.verb}</span>
                <span className="block text-sm text-slate-600">{meta.description}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </PageHero>
  );
}
