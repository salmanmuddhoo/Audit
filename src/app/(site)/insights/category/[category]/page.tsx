import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InsightsHero } from "@/components/insights/insights-hero";
import { InsightsListing } from "@/components/insights/insights-listing";
import { CtaBand } from "@/components/sections/cta-band";
import { getInsightCategories, getInsightTags, insightTypeSchema, queryInsights } from "@/lib/content";
import { pageAlternates } from "@/lib/seo";

type Props = { params: Promise<{ category: string }>; searchParams: Promise<{ type?: string }> };

export async function generateStaticParams() {
  const categories = await getInsightCategories();
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const match = (await getInsightCategories()).find((c) => c.slug === category);
  if (!match) return {};
  return {
    title: `${match.name} insights`,
    description: `Articles, guides, videos and resources from Insight.360° on ${match.name.toLowerCase()}.`,
    alternates: pageAlternates(`/insights/category/${category}`),
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const [{ category }, { type }] = await Promise.all([params, searchParams]);
  const categories = await getInsightCategories();
  const match = categories.find((c) => c.slug === category);
  if (!match) notFound();

  const parsedType = insightTypeSchema.safeParse(type);
  const activeType = parsedType.success ? parsedType.data : undefined;
  const [insights, tags] = await Promise.all([queryInsights({ category, type: activeType }), getInsightTags()]);

  return (
    <>
      <InsightsHero
        title={
          <>
            <span className="text-gradient">{match.name}</span> insights
          </>
        }
        description={`Practical content on ${match.name.toLowerCase()} from the Insight.360° team.`}
        crumbs={[{ label: "Insights", href: "/insights" }, { label: match.name }]}
      />
      <InsightsListing
        insights={insights}
        categories={categories}
        tags={tags}
        activeType={activeType}
        activeCategory={category}
        basePath={`/insights/category/${category}`}
      />
      <CtaBand />
    </>
  );
}
