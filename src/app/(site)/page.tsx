import type { Metadata } from "next";
import { HomeHero } from "@/components/sections/home-hero";
import { WhoWeAre } from "@/components/sections/who-we-are";
import { HowWeWork } from "@/components/sections/how-we-work";
import { ServicesOverview } from "@/components/sections/services-overview";
import { ToolsPreview } from "@/components/sections/tools-preview";
import { BusinessLines } from "@/components/sections/business-lines";
import { InsightsPreview } from "@/components/sections/insights-preview";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd, pageAlternates, webPageJsonLd } from "@/lib/seo";
import { getInsights, getPillars, getSiteSettings, getToolCollections } from "@/lib/content";

export const metadata: Metadata = {
  title: "Who We Are | Insight.360° – Better Insight. Better Business.",
  description:
    "Insight.360° is an independent business advisory practice in Mauritius taking a 360° perspective on performance, governance, risk, internal controls and compliance.",
  alternates: pageAlternates("/"),
};

export default async function HomePage() {
  const [settings, pillars, insights, collections] = await Promise.all([
    getSiteSettings(),
    getPillars(),
    getInsights(),
    getToolCollections(),
  ]);
  const featured = [...insights].sort((a, b) => Number(b.featured) - Number(a.featured));

  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          type: "AboutPage",
          path: "/",
          name: "Who We Are",
          description: metadata.description as string,
        })}
      />
      <HomeHero descriptor={settings.descriptor} />
      <WhoWeAre purpose={settings.purpose} />
      <HowWeWork />
      <ServicesOverview pillars={pillars} />
      <ToolsPreview collections={collections} />
      <InsightsPreview insights={featured} />
      <BusinessLines />
      <CtaBand />
    </>
  );
}
