# Architecture and phased roadmap

The FRD asks for a solution "designed from the outset so that Stage 1 does not need to be
rebuilt when e-commerce and the client platform are introduced". This document explains
the decisions taken for Stage 1 and how Stages 2 and 3 slot in.

## Guiding decisions

1. **One Next.js application, route groups per business line.**
   `src/app/(site)` holds the public website. Stage 2 adds `(shop)` and Stage 3 adds
   `(platform)` as sibling route groups with their own layouts (e.g. an authenticated
   shell), while sharing the design system, content layer and SEO utilities.
2. **Content behind an interface.** Pages never read files directly; they call
   `src/lib/content` which delegates to a `ContentProvider`. Stage 1 ships
   `LocalContentProvider` (JSON + MDX in git, validated by zod). When editorial volume
   justifies it, a `SanityContentProvider`/`PayloadContentProvider` implements the same
   interface and nothing above it changes.
3. **Domain models are already shaped for later stages.** `Tool` has `status`, `sku`,
   `price`, `format` and `includes`; collections map to pillars; solutions reference
   tools and insights reference solutions. Stage 2 fills in prices and flips
   `status` to `available`.
4. **Feature flags, not forks.** `src/config/site.ts` exposes `features.toolsMarketplace`
   and `features.clientPlatform`, driven by environment variables, so navigation and
   CTAs switch over at launch without a rewrite.
5. **Serverless-friendly, stateless Stage 1.** No database is required to run the
   website. Forms validate server-side and send email. The in-memory rate limiter and
   mail transport are isolated in `src/lib/forms` and can be swapped for Redis/queues.
6. **Security and performance by default.** Static generation for all public pages,
   self-hosted fonts, security headers in `next.config.ts`, honeypot + rate limiting on
   forms, no third-party scripts.

## Stage 1 – Informative website (this repository)

```
Browser ──▶ Next.js (static pages + 2 route handlers) ──▶ Resend (email)
                 ▲
            /content (git)  ◀── Decap CMS (/admin) or direct edits
```

- 5 FRD pages + solution detail pages + taxonomy pages for insights
- Content management via git (`/content`) with an optional visual editor
- Contact form and tools-interest form delivered to the business mailbox
- SEO: metadata, sitemap, robots, Open Graph images, JSON-LD (Organization,
  Service, Article/VideoObject, BreadcrumbList)

## Stage 2 – Tools marketplace

| Capability | Where it lands |
| --- | --- |
| Product catalogue | Reuse `content/tools` → `Tool` schema (add `price`, `sku`, `includes`). Catalogue pages in `src/app/(shop)/tools/[slug]`. |
| Checkout & payment | Stripe Checkout (cards, Apple/Google Pay) via a route handler; webhook in `src/app/api/webhooks/stripe`. For MUR settlement consider a local PSP (e.g. MIPS/Peach) behind the same `PaymentProvider` interface. |
| Customer account & order history | Auth.js (email magic link) + Postgres (Neon/Supabase) with Prisma or Drizzle. Tables: `users`, `orders`, `order_items`, `downloads`. |
| Secure digital delivery | Files in private object storage (S3/R2); signed, expiring download URLs issued only to the purchasing user. |
| Feature flag | `NEXT_PUBLIC_FEATURE_MARKETPLACE=true` switches the Tools page from interest capture to the live catalogue. |

## Stage 3 – Client platform

| Capability | Where it lands |
| --- | --- |
| Client login & access control | Extend Auth.js with organisations, roles (client, advisor, admin) and subscription status. |
| Workspace & dashboards | `src/app/(platform)` route group with its own layout; server components reading from the database. |
| Secure document exchange | Private object storage + audit log table; antivirus scan on upload. |
| Tasks / actions | `engagements`, `actions`, `comments` tables; notifications via email. |
| Messaging | Start with threaded comments per engagement; real-time can be layered on later (Pusher/Ably). |
| Subscriptions | Stripe Billing, reusing the Stage 2 payment integration. |
| Feature flag | `NEXT_PUBLIC_FEATURE_CLIENT_PLATFORM=true` exposes "Client login" in the header. |

## Content management strategy

- **Now:** files in `/content`. Simple, versioned, no running services, zero cost.
  Decap CMS gives editors a form-based UI that commits to git.
- **Later (optional):** when multiple editors, scheduling or rich media workflows are
  needed, implement `ContentProvider` for a headless CMS. Keep `/content` as the
  seed/fallback.

## Conventions

- TypeScript strict; zod schemas are the single source of truth for content shapes.
- Icons referenced by name in content (`src/components/ui/icons.tsx`).
- Brand tokens only via Tailwind theme (`navy-*`, `teal-*`, `slate-*`).
- Add new routes to `src/config/routes.ts` and `src/app/sitemap.ts`.
