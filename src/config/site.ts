/**
 * Static site configuration that rarely changes and is needed at build time
 * (metadata, canonical URLs, feature flags). Editable business content lives
 * in /content and is read through src/lib/content.
 */
export const siteConfig = {
  name: "Insight.360°",
  legalName: "Insight.360°",
  shortName: "Insight360",
  tagline: "Better Insight. Better Business.",
  description:
    "Insight.360° is an independent business advisory practice in Mauritius helping organisations strengthen performance, governance, risk management, internal controls and compliance.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.insight360.solutions",
  locale: "en_MU",
  keywords: [
    "business advisory Mauritius",
    "governance",
    "risk management",
    "internal controls",
    "compliance",
    "SOP",
    "KPI",
    "fraud vulnerability review",
  ],
} as const;

/**
 * Feature flags for the phased roadmap. Flip these on when the relevant
 * stage ships so navigation and CTAs change without a rewrite.
 */
export const features = {
  /** Stage 2 – public catalogue, checkout and digital delivery. */
  toolsMarketplace: process.env.NEXT_PUBLIC_FEATURE_MARKETPLACE === "true",
  /** Stage 3 – authenticated client workspace. */
  clientPlatform: process.env.NEXT_PUBLIC_FEATURE_CLIENT_PLATFORM === "true",
} as const;
