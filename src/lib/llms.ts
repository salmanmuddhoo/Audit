import { siteConfig } from "@/config/site";
import { getInsights, getPillars, getSiteSettings, getToolCollections, insightTypeMeta } from "@/lib/content";

/**
 * Builds the llms.txt documents (https://llmstxt.org): a concise, markdown
 * description of the site that AI assistants can read in one pass. The full
 * variant appends the complete text of every insight.
 */
export async function buildLlmsText(full: boolean) {
  const [settings, pillars, collections, insights] = await Promise.all([
    getSiteSettings(),
    getPillars(),
    getToolCollections(),
    getInsights(),
  ]);
  const base = siteConfig.url;
  const lines: string[] = [];

  lines.push(`# ${siteConfig.name}`);
  lines.push("");
  lines.push(`> ${settings.tagline} ${siteConfig.description}`);
  lines.push("");
  lines.push(
    `${siteConfig.name} (also written Insight360) is an independent business advisory practice based in Mauritius. It helps organisations strengthen performance, governance, risk management, internal controls and compliance by taking a 360° perspective: looking beyond individual symptoms to how strategy, people, processes, performance, risks and controls work together. Its purpose: ${settings.purpose.charAt(0).toLowerCase()}${settings.purpose.slice(1)}`,
  );
  lines.push("");
  lines.push("How we work: practical, independent, proportionate and action-oriented. Every engagement follows the same seven-step approach: Plan, Understand, Assess, Analyse, Report, Improve, Follow up.");
  lines.push("");
  lines.push("Three business lines: Advisory (we help you), Tools (we equip you) and Insights (we inform you).");
  lines.push("");

  lines.push("## Services");
  lines.push("");
  for (const pillar of pillars) {
    lines.push(`### ${pillar.name}: ${pillar.strapline}`);
    lines.push("");
    for (const s of pillar.solutions) {
      lines.push(`- [${s.name}](${base}/services/${s.slug}): ${s.summary}`);
      if (full) {
        for (const f of s.faq) lines.push(`  - Q: ${f.question} A: ${f.answer}`);
      }
    }
    lines.push("");
  }

  lines.push("## Tools");
  lines.push("");
  lines.push(`Practical self-use business tools, currently in development ([register interest](${base}/tools)).`);
  for (const c of collections) {
    lines.push(`- ${c.name}: ${c.tools.map((t) => t.name).join(", ")}`);
  }
  lines.push("");

  lines.push("## Insights");
  lines.push("");
  for (const i of insights) {
    lines.push(`- [${i.title}](${base}/insights/${i.slug}) (${insightTypeMeta[i.type].label}, ${i.category}, ${i.date}): ${i.excerpt}`);
  }
  lines.push("");
  lines.push(`RSS feed: ${base}/feed.xml`);
  lines.push("");

  lines.push("## Contact");
  lines.push("");
  lines.push(`- Email: ${settings.contact.email}`);
  if (settings.contact.phone) lines.push(`- Telephone: ${settings.contact.phone}`);
  lines.push(`- Location: ${settings.contact.addressLine ?? settings.contact.location}`);
  lines.push(`- Website: ${base}`);
  lines.push(`- Enquiries: ${base}/contact`);
  for (const s of settings.social) lines.push(`- ${s.platform}: ${s.url}`);
  lines.push("");

  lines.push("## Optional");
  lines.push("");
  lines.push(`- [Privacy notice](${base}/privacy)`);
  lines.push(`- [Sitemap](${base}/sitemap.xml)`);
  if (!full) lines.push(`- [Full text of all insights](${base}/llms-full.txt)`);
  lines.push("");

  if (full) {
    lines.push("---");
    lines.push("");
    lines.push("# Full text of Insights");
    lines.push("");
    for (const i of insights) {
      lines.push(`## ${i.title}`);
      lines.push("");
      lines.push(`Source: ${base}/insights/${i.slug}  `);
      lines.push(`Type: ${insightTypeMeta[i.type].label} · Category: ${i.category} · Published: ${i.date} · Tags: ${i.tags.join(", ")}`);
      lines.push("");
      if (i.keyTakeaways.length) {
        lines.push("Key takeaways:");
        for (const t of i.keyTakeaways) lines.push(`- ${t}`);
        lines.push("");
      }
      lines.push(i.body.trim());
      lines.push("");
    }
  }

  return lines.join("\n");
}
