# abdelrazig.me — Personal Portfolio

> **DevOps & Backend Engineer · Cloud-Native **  
> Live at [abdelrazig.me](https://abdelrazig.me)

---

## Tech Stack

| Layer     | Technology                            |
| --------- | ------------------------------------- |
| Framework | Next.js 16 (App Router)               |
| Language  | TypeScript 5 (strict)                 |
| Styling   | Tailwind CSS v4                       |
| i18n      | next-intl v4 — English + Arabic (RTL) |
| OG Images | `@vercel/og` / Satori                 |
| Booking   | Cal.com embed (`@calcom/embed-react`) |
| Runtime   | React 19                              |
| Hosting   | Vercel / Node.js                      |

---

## Features

- **Bilingual (EN / AR)** — full RTL layout flip, Saudi-market Arabic copy, locale-aware metadata
- **Dark mode** — custom `ThemeProvider` (no flash, SSR-safe, React 19 compatible)
- **Dynamic OG image** — auto-generated 1200×630 social preview at `/opengraph-image`
- **SEO-complete** — `sitemap.xml`, `robots.txt`, JSON-LD `Person` schema, per-page canonical + hreflang
- **Project case studies** — `/works/[slug]` dynamic routes with image lightbox
- **Services bento grid** — spotlight hover cards with animated visuals
- **Booking modal** — Cal.com 30-min architecture review, zero external redirect
- **Contact section** — WhatsApp CTA, email, LinkedIn, GitHub, CV download
- **Tech marquee** — animated daily-stack strip
- **Scroll animations** — `Reveal` + `fade-up` CSS keyframes, no heavy animation lib
- **Back-to-top** — smooth scroll, appears after 400 px

---

## Project Structure

```
app/
├── layout.tsx               # Root layout — <html>, fonts, providers
├── [locale]/
│   ├── layout.tsx           # Locale layout — metadata, JSON-LD, i18n
│   └── page.tsx             # Home page — Hero, Services, Works, Contact
│   └── works/[slug]/
│       └── page.tsx         # Case study detail page
├── _components/             # All UI components
├── _data/
│   ├── site.ts              # ← Single source of truth for personal info
│   └── projects.ts          # Project data
├── opengraph-image.tsx      # Dynamic OG image (Satori)
├── sitemap.ts               # Auto sitemap for EN + AR
└── robots.ts                # robots.txt
messages/
├── en.json                  # English strings
└── ar.json                  # Arabic strings
public/
├── works/                   # Project cover images
├── badges/                  # OCI certification badges
└── abdelrazig-sharif-cv.pdf
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# → http://localhost:3000

# Production build
npm run build
npm start
```

---

## Configuration

All personal details, links, and copy live in one file:

```
app/_data/site.ts
```

Update `email`, `url`, `links`, `calcom.username`, `location`, etc. there — everything else derives from it automatically.

---

## Deployment

**Vercel (recommended)**

```bash
# One-time
vercel link

# Deploy
vercel --prod
```

Add `NEXT_PUBLIC_*` environment variables in the Vercel dashboard if needed. No env vars are required by default.

**Self-hosted**

```bash
npm run build
npm start          # port 3000 by default
```

Front with Nginx + a `proxy_pass` to `localhost:3000`.

---

## SEO Checklist (post-deploy)

- [ ] Submit `https://abdelrazig.me/sitemap.xml` to Google Search Console
- [ ] Verify JSON-LD with [Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Check OG image with [OpenGraph Debugger](https://www.opengraph.xyz)
- [ ] Run Lighthouse — target 95+ on all categories
- [ ] Confirm Cal.com username matches `calcom.username` in `site.ts`

---

## License

Personal portfolio — source shared for reference. Not licensed for redistribution or commercial use.

---

<p align="center">
  Built by <a href="https://abdelrazig.me">Abdelrazig Sharif</a> · Riyadh, Saudi Arabia
</p>
