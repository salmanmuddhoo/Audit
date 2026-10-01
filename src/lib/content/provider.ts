import type {
  Insight,
  Pillar,
  SiteSettings,
  ToolCollection,
} from "./schemas";

/**
 * The content provider contract. Stage 1 ships a local file provider
 * (JSON + MDX in /content). A headless CMS or database provider can
 * implement this same interface later without touching pages.
 */
export interface ContentProvider {
  getSiteSettings(): Promise<SiteSettings>;
  getPillars(): Promise<Pillar[]>;
  getToolCollections(): Promise<ToolCollection[]>;
  getInsights(): Promise<Insight[]>;
}
