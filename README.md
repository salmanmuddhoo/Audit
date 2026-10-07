# Insight.360° website

> Better Insight. Better Business.

The public website for **Insight.360°**, an independent business advisory practice in Mauritius
(Business Advisory · Governance · Risk · Compliance).

This repository delivers **Stage 1 – Informative Website** of the phased roadmap in the
Website FRD, and is structured so that **Stage 2 (Tools Marketplace)** and
**Stage 3 (Client Platform)** are added to it rather than rebuilt. See
[`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for the roadmap.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org) (App Router, React Server Components, TypeScript) |
| Styling | Tailwind CSS v4 with brand tokens in `src/app/globals.css` |
| Content | Git-based: JSON + MDX in `/content`, validated with zod, read through `src/lib/content` |
| Editing UI | [Decap CMS](https://decapcms.org) at `/admin` (optional, see `docs/CONTENT.md`) |
| Forms | Route handlers (`/api/contact`, `/api/tool-interest`) with zod validation, honeypot, rate-limit and email via Resend |
| SEO / GEO | Metadata API, `sitemap.xml`, `robots.txt` (AI crawlers allowed), Open Graph images, rich JSON-LD graph, FAQ schema, RSS feed, `llms.txt`; see [`docs/SEO.md`](docs/SEO.md) |
| Fonts | Self-hosted Inter + Plus Jakarta Sans (no third-party requests) |

## Pages (Stage 1)

| Route | FRD page |
| --- | --- |
| `/` | 1. Who We Are – purpose, 360° perspective, principles, methodology, business lines |
| `/services`, `/services/[slug]` | 2. Services – four pillars, eight solutions, enquiry CTAs |
| `/tools` | 3. Tools – collections, examples, "coming soon", interest capture |
| `/insights`, `/insights/[slug]`, `/insights/category/[c]`, `/insights/tag/[t]` | 4. Insights – articles, guides, videos, downloads, filters, sharing, related content |
| `/contact` | 5. Contact Us – form, business email, social links, privacy acknowledgement |
| `/privacy` | Privacy notice referenced by the forms |

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in Resend keys to enable email delivery
npm run dev                  # http://localhost:3000
```

Other scripts:

```bash
npm run build          # production build (also validates all content)
npm run start          # serve the production build
npm run lint           # ESLint
npm run typecheck      # TypeScript
npm run content:check  # validate /content against the schemas without building
```

## Project layout

```
content/                 Editable business content (JSON + MDX)
  site.json              Contact details, tagline, social links
  services/*.json        Pillars → solutions
  tools/*.json           Tool collections → tools (Stage 2 catalogue-ready)
  insights/*.mdx         Articles, guides, videos, downloads
docs/                    Architecture, content guide, deployment guide
public/
  admin/                 Decap CMS (optional editing UI)
  brand/                 Logo
  downloads/             Downloadable resources
src/
  app/                   Routes
    (site)/              Public website route group (Stage 1)
    api/                 Form endpoints
  components/            ui/ layout/ sections/ forms/ insights/
  config/                Site config, navigation, feature flags
  lib/content/           Content schemas, provider interface, local provider
  lib/forms/             Form schemas, mailer, rate limiting
  lib/seo.tsx            JSON-LD helpers
```

## Editing content

Everything a non-developer needs to change lives in `/content`. See
[`docs/CONTENT.md`](docs/CONTENT.md) for the field reference and how to add an insight,
a tool or update contact details, either by editing files or through the `/admin` UI.

## SEO and GEO

The site ships with structured data on every page, FAQ schema on services, an RSS feed and
`llms.txt` for AI answer engines, plus geographic signals for Mauritius.
[`docs/SEO.md`](docs/SEO.md) lists what is in place, the launch checklist (Search Console,
Bing, Google Business Profile) and how to keep new content optimised.

## Deployment

See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) for hosting (Vercel recommended), DNS,
**domain-based business email** setup and the environment variables required in production.
