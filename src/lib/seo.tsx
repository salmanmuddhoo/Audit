import { siteConfig } from "@/config/site";
import type { Insight, SiteSettings, Solution } from "@/lib/content";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD is static, trusted, build-time content.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function organizationJsonLd(settings: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    alternateName: "Insight360",
    slogan: settings.tagline,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/brand/insight360-logo.png`,
    email: settings.contact.email,
    telephone: settings.contact.phone,
    address: { "@type": "PostalAddress", addressCountry: "MU", addressLocality: settings.contact.location },
    areaServed: "MU",
    sameAs: settings.social.map((s) => s.url),
    knowsAbout: ["Business advisory", "Corporate governance", "Risk management", "Internal controls", "Compliance"],
  };
}

export function serviceJsonLd(solution: Solution & { pillar: { name: string } }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: solution.name,
    description: solution.summary,
    serviceType: solution.pillar.name,
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: "MU",
    url: `${siteConfig.url}/services/${solution.slug}`,
  };
}

export function articleJsonLd(insight: Insight) {
  const url = `${siteConfig.url}/insights/${insight.slug}`;
  const base = {
    "@context": "https://schema.org",
    headline: insight.title,
    description: insight.excerpt,
    datePublished: insight.date,
    dateModified: insight.updated ?? insight.date,
    author: { "@type": "Organization", name: insight.author },
    publisher: { "@id": `${siteConfig.url}/#organization` },
    mainEntityOfPage: url,
    keywords: insight.tags.join(", "),
    articleSection: insight.category,
    image: `${url}/opengraph-image`,
  };
  if (insight.type === "video" && insight.videoUrl) {
    return { ...base, "@type": "VideoObject", name: insight.title, uploadDate: insight.date, embedUrl: insight.videoUrl, thumbnailUrl: base.image };
  }
  return { ...base, "@type": insight.type === "guide" ? "TechArticle" : "Article" };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}
