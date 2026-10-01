# Deployment, domain and business email

## Hosting

The site is a standard Next.js application and deploys unchanged to **Vercel**
(recommended), Netlify, or any Node 20+ host (`npm run build && npm run start`).

1. Import the GitHub repository into Vercel.
2. Set the environment variables below.
3. Add the custom domain `insight360.solutions` and `www.insight360.solutions`;
   Vercel issues TLS certificates automatically.

### Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | yes | Canonical URL for metadata, sitemap and Open Graph (`https://www.insight360.solutions`) |
| `RESEND_API_KEY` | yes (prod) | Email delivery for the contact and tools-interest forms |
| `MAIL_FROM` | yes (prod) | Verified sender, e.g. `Insight.360° Website <website@insight360.solutions>` |
| `MAIL_TO` | yes (prod) | Destination inbox (comma-separated for several) |
| `NEXT_PUBLIC_FEATURE_MARKETPLACE` | no | `true` when Stage 2 launches |
| `NEXT_PUBLIC_FEATURE_CLIENT_PLATFORM` | no | `true` when Stage 3 launches |

Without the mail variables the forms return a friendly error in production and log to the
console in development.

## DNS overview

| Record | Host | Value | Purpose |
| --- | --- | --- | --- |
| A / CNAME | `@`, `www` | as provided by Vercel | Website |
| MX | `@` | as provided by the mailbox provider | Receiving business email |
| TXT (SPF) | `@` | `v=spf1 include:<mailbox provider> include:<resend> ~all` | Authorise senders |
| TXT (DKIM) | provider-specific | provider-specific | Email authentication |
| TXT (DMARC) | `_dmarc` | `v=DMARC1; p=quarantine; rua=mailto:dmarc@insight360.solutions` | Policy and reporting |

## Domain-based business email (FRD objective)

The website does not host mailboxes; choose a mailbox provider and point MX records at it:

- **Google Workspace** (Business Starter) – Gmail interface, Meet, Drive; strong spam
  protection. Add the five Google MX records and the SPF/DKIM TXT records from the admin
  console.
- **Microsoft 365 Business Basic** – Outlook/Teams; good fit if clients are on Microsoft.
- **Zoho Mail** – lowest cost, adequate for a small practice.

Suggested mailboxes: `info@` (public contact, used on the site), `hello@` alias,
one mailbox per advisor, and `website@` as the sending identity for form notifications.

Form notifications are sent through Resend from `website@insight360.solutions` with the
visitor's address as reply-to, so replying from the inbox goes straight to the enquirer.
Verify the domain in Resend (DKIM + return-path records) before go-live.

## Pre-launch checklist

- [ ] Replace placeholder social links in `content/site.json`
- [ ] Add telephone/address if they should be public
- [ ] Review `/privacy` with a data-protection lens (Mauritius DPA 2017)
- [ ] Set `videoUrl` on video insights once published
- [ ] Confirm `NEXT_PUBLIC_SITE_URL` and test `/sitemap.xml`, `/robots.txt`
- [ ] Submit the sitemap in Google Search Console
- [ ] Send a test enquiry and a test tools-interest registration
