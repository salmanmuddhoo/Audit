import { z } from "zod";

/* ------------------------------------------------------------------ */
/*  Site settings (content/site.json)                                  */
/* ------------------------------------------------------------------ */
export const socialLinkSchema = z.object({
  platform: z.enum(["linkedin", "facebook", "youtube", "x", "instagram"]),
  url: z.string().url(),
});

export const siteSettingsSchema = z.object({
  tagline: z.string(),
  descriptor: z.string(),
  purpose: z.string(),
  contact: z.object({
    email: z.string().email(),
    phone: z.string().optional(),
    location: z.string(),
    addressLine: z.string().optional(),
    hours: z.string().optional(),
  }),
  social: z.array(socialLinkSchema).default([]),
  footerNote: z.string().optional(),
});
export type SiteSettings = z.infer<typeof siteSettingsSchema>;

/* ------------------------------------------------------------------ */
/*  Services: pillars → solutions (content/services/*.json)            */
/* ------------------------------------------------------------------ */
export const faqItemSchema = z.object({
  question: z.string(),
  answer: z.string(),
});
export type FaqItem = z.infer<typeof faqItemSchema>;

export const solutionSchema = z.object({
  slug: z.string(),
  name: z.string(),
  shortName: z.string().optional(),
  tagline: z.string(),
  summary: z.string(),
  icon: z.string().default("compass"),
  whoItIsFor: z.array(z.string()).default([]),
  whatWeAssess: z.array(z.string()).default([]),
  outcomes: z.array(z.string()).default([]),
  relatedTools: z.array(z.string()).default([]),
  /** Short Q&As shown on the solution page and emitted as FAQPage schema. */
  faq: z.array(faqItemSchema).default([]),
  featured: z.boolean().default(false),
});
export type Solution = z.infer<typeof solutionSchema>;

export const pillarSchema = z.object({
  slug: z.string(),
  name: z.string(),
  order: z.number(),
  strapline: z.string(),
  description: z.string(),
  icon: z.string().default("compass"),
  solutions: z.array(solutionSchema),
});
export type Pillar = z.infer<typeof pillarSchema>;

/* ------------------------------------------------------------------ */
/*  Tools (content/tools/*.json) – Stage 1 "coming soon",              */
/*  but modelled as catalogue products so Stage 2 is additive.         */
/* ------------------------------------------------------------------ */
export const toolStatusSchema = z.enum(["coming-soon", "available", "retired"]);

export const toolSchema = z.object({
  slug: z.string(),
  name: z.string(),
  description: z.string().optional(),
  status: toolStatusSchema.default("coming-soon"),
  /** Stage 2 fields – optional now, required by the marketplace later. */
  sku: z.string().optional(),
  price: z
    .object({ amount: z.number(), currency: z.string().length(3) })
    .optional(),
  format: z.string().optional(),
  includes: z.array(z.string()).default([]),
});
export type Tool = z.infer<typeof toolSchema>;

export const toolCollectionSchema = z.object({
  slug: z.string(),
  name: z.string(),
  order: z.number(),
  description: z.string(),
  icon: z.string().default("wrench"),
  pillar: z.string().optional(),
  tools: z.array(toolSchema),
});
export type ToolCollection = z.infer<typeof toolCollectionSchema>;

/* ------------------------------------------------------------------ */
/*  Insights (content/insights/*.mdx front-matter)                     */
/* ------------------------------------------------------------------ */
export const insightTypeSchema = z.enum(["article", "guide", "video", "download"]);
export type InsightType = z.infer<typeof insightTypeSchema>;

/** gray-matter parses unquoted YAML dates into Date objects – normalise to YYYY-MM-DD. */
const isoDate = z.preprocess(
  (v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v),
  z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Expected a date in YYYY-MM-DD format"),
);

export const insightFrontmatterSchema = z.object({
  title: z.string(),
  excerpt: z.string(),
  type: insightTypeSchema,
  category: z.string(),
  tags: z.array(z.string()).default([]),
  date: isoDate,
  updated: isoDate.optional(),
  author: z.string().default("Insight.360°"),
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
  cover: z.string().optional(),
  /** For type = video */
  videoUrl: z.string().url().optional(),
  /** For type = download */
  resourceUrl: z.string().optional(),
  resourceLabel: z.string().optional(),
  relatedServices: z.array(z.string()).default([]),
  /** Three or so one-line takeaways shown at the top; easy for readers and answer engines to quote. */
  keyTakeaways: z.array(z.string()).default([]),
});
export type InsightFrontmatter = z.infer<typeof insightFrontmatterSchema>;

export type Insight = InsightFrontmatter & {
  slug: string;
  categorySlug: string;
  tagSlugs: string[];
  readingMinutes: number;
  body: string;
};

export type Taxonomy = { slug: string; name: string; count: number };
