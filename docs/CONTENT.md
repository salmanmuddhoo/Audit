# Content guide

All editable content lives in the `/content` folder. Changes are validated on build:
an invalid file fails the build with a message naming the file and field, so mistakes
never reach production.

You can edit content in three ways:

1. **GitHub web editor** – open the file on GitHub, click the pencil, commit. The site
   redeploys automatically.
2. **Decap CMS** – a form-based editor at `https://<your-domain>/admin`. See setup below.
3. **Locally** – edit files and run `npm run content:check`.

## Files

| File | What it controls |
| --- | --- |
| `content/site.json` | Tagline, descriptor, purpose statement, contact details, opening hours, social links |
| `content/services/*.json` | One file per pillar (Business Advisory, Governance, Risk, Compliance) and its solutions |
| `content/tools/*.json` | One file per tool collection and the tools within it |
| `content/insights/*.mdx` | One file per article / guide / video / downloadable resource |

### Adding an insight

Create `content/insights/my-new-article.mdx` (the file name becomes the URL slug):

```mdx
---
title: "Title of the piece"
excerpt: "One or two sentences shown in listings."
type: article            # article | guide | video | download
category: Risk           # Business Advisory | Governance | Risk | Compliance
tags: [risk register, reporting]
date: 2026-10-01
featured: false
relatedServices: [risk-management-setup]   # solution slugs (optional)
# videoUrl: https://www.youtube.com/watch?v=...          # video type
# resourceUrl: /downloads/my-file.pdf                    # download type
# resourceLabel: Download the checklist (PDF)
---

Write the body in Markdown. Headings (`##`), lists, tables, links and bold work.
You can also use <Callout title="Tip">…</Callout> and <Cta href="/contact">Talk to us</Cta>.
```

Set `draft: true` to hide a piece in production while you work on it.

### Adding or changing a service

Edit the pillar file in `content/services`. Each solution needs a unique `slug` (used in
the URL and in enquiry forms), `name`, `tagline`, `summary`, and optional lists
`whoItIsFor`, `whatWeAssess`, `outcomes`, `relatedTools`.

### Tools

Edit `content/tools`. Each tool has `status: coming-soon | available | retired`. The
Stage 2 marketplace will use the optional `sku`, `price`, `format` and `includes` fields.

### Icons

Fields called `icon` accept any name from `src/components/ui/icons.tsx`
(`briefcase`, `landmark`, `shield`, `clipboard-check`, `compass`, `workflow`,
`bar-chart`, `shield-check`, `shield-alert`, `wrench`, `lightbulb`, …).

## Decap CMS setup (optional)

The editor at `/admin` is configured in `public/admin/config.yml` with the GitHub backend.
To enable it you need an OAuth gateway so editors can sign in with GitHub:

1. Create a GitHub OAuth App (Settings → Developer settings → OAuth Apps) with
   callback URL `https://<your-domain>/api/auth`.
2. Deploy a small OAuth provider – e.g. the Vercel-ready
   [`decap-cms-github-oauth`](https://github.com/ublabs/netlify-cms-oauth) or Netlify
   Identity if hosting on Netlify – and set `base_url`/`auth_endpoint` in `config.yml`
   accordingly.
3. Give editors access to the GitHub repository.

If you prefer not to run the editor, delete `public/admin` and edit files directly.
