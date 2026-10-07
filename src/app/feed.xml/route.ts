import { siteConfig } from "@/config/site";
import { getInsights, getSiteSettings, insightTypeMeta } from "@/lib/content";

export const dynamic = "force-static";

const esc = (v: string) =>
  v.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c] as string);

/** RSS 2.0 feed of Insights: used by feed readers, aggregators and AI crawlers. */
export async function GET() {
  const [insights, settings] = await Promise.all([getInsights(), getSiteSettings()]);
  const base = siteConfig.url;
  const latest = insights[0] ? new Date(insights[0].date) : new Date();

  const items = insights
    .map((i) => {
      const url = `${base}/insights/${i.slug}`;
      return `    <item>
      <title>${esc(i.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(i.date).toUTCString()}</pubDate>
      <category>${esc(i.category)}</category>
      <category>${esc(insightTypeMeta[i.type].label)}</category>
${i.tags.map((t) => `      <category>${esc(t)}</category>`).join("\n")}
      <description>${esc(i.excerpt)}</description>
      <author>${esc(settings.contact.email)} (${esc(i.author)})</author>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(siteConfig.name)} Insights</title>
    <link>${base}/insights</link>
    <atom:link href="${base}/feed.xml" rel="self" type="application/rss+xml" />
    <description>${esc("Articles, guides, videos and resources on business advisory, governance, risk and compliance from Insight.360° in Mauritius.")}</description>
    <language>en</language>
    <copyright>© ${new Date().getFullYear()} ${esc(siteConfig.name)}</copyright>
    <lastBuildDate>${latest.toUTCString()}</lastBuildDate>
    <image>
      <url>${base}/brand/insight360-logo.png</url>
      <title>${esc(siteConfig.name)}</title>
      <link>${base}</link>
    </image>
${items}
  </channel>
</rss>
`;
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
