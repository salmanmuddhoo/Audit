import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { ContentProvider } from "../provider";
import {
  insightFrontmatterSchema,
  pillarSchema,
  siteSettingsSchema,
  toolCollectionSchema,
  type Insight,
  type Pillar,
  type SiteSettings,
  type ToolCollection,
} from "../schemas";
import { slugify } from "@/lib/utils";

const CONTENT_DIR = path.join(process.cwd(), "content");

async function readJson<T>(relative: string, parse: (raw: unknown) => T): Promise<T> {
  const file = path.join(CONTENT_DIR, relative);
  const raw = JSON.parse(await fs.readFile(file, "utf8"));
  try {
    return parse(raw);
  } catch (error) {
    throw new Error(`Invalid content in ${relative}: ${(error as Error).message}`);
  }
}

async function listFiles(relativeDir: string, ext: string) {
  const dir = path.join(CONTENT_DIR, relativeDir);
  const entries = await fs.readdir(dir);
  return entries.filter((f) => f.endsWith(ext)).sort();
}

function readingMinutes(text: string) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export class LocalContentProvider implements ContentProvider {
  async getSiteSettings(): Promise<SiteSettings> {
    return readJson("site.json", (raw) => siteSettingsSchema.parse(raw));
  }

  async getPillars(): Promise<Pillar[]> {
    const files = await listFiles("services", ".json");
    const pillars = await Promise.all(
      files.map((f) => readJson(`services/${f}`, (raw) => pillarSchema.parse(raw))),
    );
    return pillars.sort((a, b) => a.order - b.order);
  }

  async getToolCollections(): Promise<ToolCollection[]> {
    const files = await listFiles("tools", ".json");
    const collections = await Promise.all(
      files.map((f) => readJson(`tools/${f}`, (raw) => toolCollectionSchema.parse(raw))),
    );
    return collections.sort((a, b) => a.order - b.order);
  }

  async getInsights(): Promise<Insight[]> {
    const files = await listFiles("insights", ".mdx");
    const insights = await Promise.all(
      files.map(async (file) => {
        const source = await fs.readFile(path.join(CONTENT_DIR, "insights", file), "utf8");
        const { data, content } = matter(source);
        const parsed = insightFrontmatterSchema.safeParse(data);
        if (!parsed.success) {
          throw new Error(`Invalid front-matter in insights/${file}: ${parsed.error.message}`);
        }
        const fm = parsed.data;
        return {
          ...fm,
          slug: file.replace(/\.mdx$/, ""),
          categorySlug: slugify(fm.category),
          tagSlugs: fm.tags.map(slugify),
          readingMinutes: readingMinutes(content),
          body: content,
        } satisfies Insight;
      }),
    );
    return insights
      .filter((i) => !i.draft || process.env.NODE_ENV !== "production")
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }
}
