import { cache } from "react";
import { LocalContentProvider } from "./providers/local";
import type { ContentProvider } from "./provider";
import type { Insight, InsightType, Pillar, Solution, Taxonomy, Tool, ToolCollection } from "./schemas";

export type * from "./schemas";
export { insightTypeSchema, toolStatusSchema } from "./schemas";

/**
 * Single entry point for all content. Swap the provider here (e.g. to a
 * headless CMS client) and every page keeps working.
 */
const provider: ContentProvider = new LocalContentProvider();

/* ----------------------------- Site ------------------------------- */
export const getSiteSettings = cache(() => provider.getSiteSettings());

/* --------------------------- Services ----------------------------- */
export const getPillars = cache(() => provider.getPillars());

export const getPillar = cache(async (slug: string) => {
  const pillars = await getPillars();
  return pillars.find((p) => p.slug === slug);
});

export const getAllSolutions = cache(async (): Promise<Array<Solution & { pillar: Pillar }>> => {
  const pillars = await getPillars();
  return pillars.flatMap((pillar) => pillar.solutions.map((s) => ({ ...s, pillar })));
});

export const getSolution = cache(async (slug: string) => {
  const all = await getAllSolutions();
  return all.find((s) => s.slug === slug);
});

/* ----------------------------- Tools ------------------------------ */
export const getToolCollections = cache(() => provider.getToolCollections());

export const getAllTools = cache(async (): Promise<Array<Tool & { collection: ToolCollection }>> => {
  const collections = await getToolCollections();
  return collections.flatMap((c) => c.tools.map((t) => ({ ...t, collection: c })));
});

/* ---------------------------- Insights ---------------------------- */
export const getInsights = cache(() => provider.getInsights());

export const getInsight = cache(async (slug: string) => {
  const insights = await getInsights();
  return insights.find((i) => i.slug === slug);
});

export type InsightFilters = {
  type?: InsightType;
  category?: string;
  tag?: string;
};

export async function queryInsights(filters: InsightFilters = {}) {
  const insights = await getInsights();
  return insights.filter(
    (i) =>
      (!filters.type || i.type === filters.type) &&
      (!filters.category || i.categorySlug === filters.category) &&
      (!filters.tag || i.tagSlugs.includes(filters.tag)),
  );
}

function buildTaxonomy(entries: Array<{ slug: string; name: string }>): Taxonomy[] {
  const map = new Map<string, Taxonomy>();
  for (const { slug, name } of entries) {
    const existing = map.get(slug);
    if (existing) existing.count += 1;
    else map.set(slug, { slug, name, count: 1 });
  }
  return [...map.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export const getInsightCategories = cache(async () => {
  const insights = await getInsights();
  return buildTaxonomy(insights.map((i) => ({ slug: i.categorySlug, name: i.category })));
});

export const getInsightTags = cache(async () => {
  const insights = await getInsights();
  return buildTaxonomy(
    insights.flatMap((i) => i.tags.map((name, idx) => ({ slug: i.tagSlugs[idx], name }))),
  );
});

/** Related content: shared category first, then shared tags, newest first. */
export async function getRelatedInsights(current: Insight, limit = 3) {
  const insights = await getInsights();
  return insights
    .filter((i) => i.slug !== current.slug)
    .map((i) => {
      let score = 0;
      if (i.categorySlug === current.categorySlug) score += 3;
      score += i.tagSlugs.filter((t) => current.tagSlugs.includes(t)).length;
      if (i.type === current.type) score += 0.5;
      return { insight: i, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.insight);
}

export const insightTypeMeta: Record<InsightType, { label: string; verb: string; icon: string; description: string }> = {
  video: { label: "Video", verb: "Watch", icon: "play-circle", description: "Short videos and explainers that make business concepts easier to understand." },
  article: { label: "Article", verb: "Read", icon: "file-text", description: "Articles and practical commentary focused on real organisational challenges." },
  guide: { label: "Guide", verb: "Learn", icon: "book-open", description: "Guides that explain frameworks, controls, risk management, governance and performance." },
  download: { label: "Resource", verb: "Download", icon: "download", description: "Selected checklists and resources that organisations can apply immediately." },
};
