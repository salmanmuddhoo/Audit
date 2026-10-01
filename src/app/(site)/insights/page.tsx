import type { Metadata } from "next";
import { InsightsHero } from "@/components/insights/insights-hero";
import { InsightsListing } from "@/components/insights/insights-listing";
import { CtaBand } from "@/components/sections/cta-band";
import { getInsightCategories, getInsightTags, insightTypeSchema, queryInsights } from "@/lib/content";

export const metadata: Metadata = {
  title: "Insights – Articles, guides, videos and resources",
  description:
    "Insight.360° Insights translates business, governance, risk and compliance topics into clear, useful and practical content: watch, read, learn and download.",
  alternates: { canonical: "/insights" },
};

type Props = { searchParams: Promise<{ type?: string }> };

export default async function InsightsPage({ searchParams }: Props) {
  const { type } = await searchParams;
  const parsedType = insightTypeSchema.safeParse(type);
  const activeType = parsedType.success ? parsedType.data : undefined;

  const [insights, categories, tags] = await Promise.all([
    queryInsights({ type: activeType }),
    getInsightCategories(),
    getInsightTags(),
  ]);

  return (
    <>
      <InsightsHero
        title={
          <>
            Ideas and knowledge for <span className="text-gradient">better decisions.</span>
          </>
        }
        description="Insight.360° Insights translates business, governance, risk and compliance topics into clear, useful and practical content."
      />
      <InsightsListing insights={insights} categories={categories} tags={tags} activeType={activeType} basePath="/insights" />
      <CtaBand
        title="Recognised an issue in your organisation?"
        description="Our content is designed to do more than create awareness. When deeper assessment or implementation support would help, we are a conversation away."
      />
    </>
  );
}
