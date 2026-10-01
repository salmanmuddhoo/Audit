import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InsightsHero } from "@/components/insights/insights-hero";
import { InsightsListing } from "@/components/insights/insights-listing";
import { CtaBand } from "@/components/sections/cta-band";
import { getInsightCategories, getInsightTags, queryInsights } from "@/lib/content";

type Props = { params: Promise<{ tag: string }> };

export async function generateStaticParams() {
  const tags = await getInsightTags();
  return tags.map((t) => ({ tag: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const match = (await getInsightTags()).find((t) => t.slug === tag);
  if (!match) return {};
  return {
    title: `#${match.name} – Insights`,
    description: `Insight.360° content tagged ${match.name}.`,
    alternates: { canonical: `/insights/tag/${tag}` },
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const tags = await getInsightTags();
  const match = tags.find((t) => t.slug === tag);
  if (!match) notFound();

  const [insights, categories] = await Promise.all([queryInsights({ tag }), getInsightCategories()]);

  return (
    <>
      <InsightsHero
        title={
          <>
            Tagged <span className="text-gradient">#{match.name}</span>
          </>
        }
        description={`Everything we have published on ${match.name}.`}
        crumbs={[{ label: "Insights", href: "/insights" }, { label: `#${match.name}` }]}
      />
      <InsightsListing insights={insights} categories={categories} tags={tags} activeTag={tag} basePath="/insights" />
      <CtaBand />
    </>
  );
}
