# Plan: Portfolio Client-Ready Sprint (7 Steps)

Transform the portfolio from "good" to "client-ready" by shipping 7 high-impact features in one focused sprint. The site already has: dark theme, dot-matrix bg, sticky nav with active-section highlight, hero (id=`about`), bento Services section, Featured Projects + Systems Engineering sub-section, Publications, Footer, scroll-reveal animations, Inter font, smooth scroll.

## This plan covers the gaps that block conversion: dead "Book a call" CTA, no CV download, no credibility signals (certs/stats), missing SEO/social previews, broken mobile nav, no premium polish on bento cards, and project cards that lead nowhere.

## Phase 1 — Conversion essentials (do first)

### Step 1. Wire up "Book a call" (Cal.com embed)

- Add a real booking flow. Two implementation options:
  - **Recommended**: Cal.com inline embed in a modal triggered by every "Book a call" button. Use `@calcom/embed-react` (lightweight, ~6 KB).
  - **Fallback**: simple `<a href="https://cal.com/abdelrazig">` link if user doesn't have Cal.com account yet — easy to swap later.
- Create `app/_components/book-call-modal.tsx` (client component): a portal-rendered modal with backdrop blur, ESC-to-close, focus trap, embedded `<Cal />` iframe, and orange-accented close button.
- Replace all 3 `href="#contact"` CTA anchors (navbar, hero/services CTA strip, footer) with a `<BookCallButton>` client component that opens the modal.
- Need from user: their Cal.com username (or fallback URL).

### Step 2. Real footer links + CV download

- Footer: replace `href="#"` placeholders for LinkedIn and GitHub with real URLs; replace generic email with the actual `mailto:Abdelrazig.sharif1@gmail.com`.
- Add a "Download CV" button to:
  - Hero (next to "Discover my skills" — secondary outline style)
  - Footer (small text link)
- Place the PDF at `public/abdelrazig-sharif-cv.pdf`. Button uses `<a download>` for direct download.
- Need from user: LinkedIn URL, GitHub URL, and CV PDF file (or LaTeX → PDF compile).

---

## Phase 2 — Credibility signals (parallel with Phase 1)

### Step 3. OCI certifications badge row + stats strip

Two complementary trust elements added to the hero area.

- **Stats strip** (immediately under the tech-stack row in hero): 4 inline stats with orange accent numbers.
  - "4× OCI Certified"
  - "12+ Production Deploys"
  - "2 Published Papers"
  - "MENA-based · Remote-ready"
- **OCI certs section**: a new horizontal scrollable strip or compact 2×2 grid placed between Hero and Services. Displays the 4 certs as badge cards:
  1. OCI Multicloud Architect Professional (2025)
  2. OCI Certified Architect Associate (2025)
  3. OCI AI Foundations Associate (2025)
  4. OCI Certified Foundations Associate (2025)
- Each card: small Oracle-red "OCI" mono badge placeholder (no real logo to avoid trademark issues — user can swap), title, year, subtle border, hover lift.
- Update navbar to add a "Credentials" link OR keep certs as a sub-section under About — to be decided. Recommendation: keep them under hero, no nav entry, to avoid clutter.

---

## Phase 3 — SEO & social (parallel with Phase 2)

### Step 4. Favicon, OG image, sitemap, robots, JSON-LD

Critical for LinkedIn/Twitter previews and Google indexing.

- `app/icon.tsx` — generate dynamic favicon using `ImageResponse` (orange "AS" monogram on dark bg).
- `app/opengraph-image.tsx` — 1200×630 OG image with name, role, dark theme + orange accent, dot-matrix bg. Auto-applied to all pages.
- `app/twitter-image.tsx` — same image reused for Twitter cards.
- `app/sitemap.ts` — return list of routes (initially just `/`, will auto-extend when project pages land in step 7).
- `app/robots.ts` — allow all, point to sitemap.
- `app/layout.tsx`: extend `metadata` with full Open Graph + Twitter Card fields, canonical URL, keywords, author, locale.
- Add `<script type="application/ld+json">` with `Person` schema (name, jobTitle, address Riyadh SA, sameAs links to LinkedIn/GitHub, alumniOf University of Khartoum, knowsAbout array).
- Need from user: production domain (e.g., `abdelrazig.dev`) — fallback to `https://abdelrazig.com` placeholder.

---

## Phase 4 — Mobile UX (depends on Phase 1 navbar refactor)

### Step 5. Mobile menu

Currently the center nav is `hidden md:flex` with no mobile replacement.

- Add a hamburger icon button (visible only `<md`) inside `app/_components/navbar.tsx`.
- On click, toggle a full-width slide-down panel under the navbar with: Services, Works, Research, "Book a call", "Download CV" — same active-state styling as desktop.
- Use Tailwind transition classes for smooth open/close (no library).
- Auto-close when a link is clicked.
- Lock body scroll when open; restore on close.
- Ensure the panel uses backdrop blur to match desktop nav.

---

## Phase 5 — Premium polish (parallel with Phase 4)

### Step 6. Cursor spotlight on bento cards

Adds a "premium feel" — a soft radial gradient that follows the cursor on each Services bento card.

- Create `app/_components/spotlight-card.tsx` (client component) that:
  - Tracks mouse position with `onMouseMove` (uses CSS custom properties `--mx`, `--my`).
  - Renders a `::before` (or absolute div) with `radial-gradient(circle at var(--mx) var(--my), rgba(249,115,22,0.18), transparent 40%)` that becomes visible on hover.
  - Wraps the existing card content (replaces the outer `<article>` of `BentoCard`).
- Refactor `BentoCard` in `app/page.tsx` to use this wrapper.
- Respect `prefers-reduced-motion` (skip the effect).
- Optional: also apply to project cards for consistency.

---

## Phase 6 — Project case studies (biggest payoff, do last)

### Step 7. Dedicated project detail pages (`/works/[slug]`)

Each Featured Project becomes a clickable case-study page with shareable URL.

**Routing & data structure**

- New folder `app/works/[slug]/page.tsx` — dynamic route per project.
- New file `app/_data/projects.ts` — single source of truth: typed `Project` array with full case-study fields (slug, title, status, tags, summary, problem, solution, stack, outcomes/metrics, year, role, links). The homepage `FeaturedProjects` and the detail pages both consume this.
- `generateStaticParams` in the dynamic page so all 4 routes are pre-rendered at build time (zero runtime cost).
- `generateMetadata` per slug for unique titles + OG image overrides.

**Page layout (per project)**

- Sticky breadcrumb: Home / Works / [Project Title].
- Hero: project title, status pill, year, role, tags row.
- "Overview" section: 2-column — left is summary text, right is sticky info card (Client, Year, Role, Stack, Live URL).
- "The Challenge" — 2–3 paragraphs.
- "The Solution" — architecture description + diagram placeholder (`<div className="aspect-[16/9] bg-neutral-900 rounded-2xl">`).
- "Outcomes" — 3-up grid of metric cards (placeholder numbers with caveats: "uptime 99.9%", "deployment time -70%", etc. — user fills in real values).
- "Tech Stack" — chips grid.
- Bottom CTA: "Like what you see? Book a call" + "Next project →" link.

**Homepage card update**

- Wrap each `ProjectCard` in `<Link href={`/works/${slug}`}>`.
- Add a "Read case study →" link inside the card body with hover arrow translate.
- Remove the "demo placeholder" feel — visuals look like teasers for the real case study.

**Scope for this sprint**

- Build the dynamic route + data file infrastructure.
- Write **full content for top 2 projects** (Saeerha, Secure Payment Tracker) — these are the highest-credibility ones.
- Stub the other 2 (BDG/QAST, Pricing Engine) with minimal content + a "Case study coming soon" notice — still SEO-indexable, still shareable URLs.

---

## Relevant files

**Existing (will be modified)**

- [app/page.tsx](app/page.tsx) — hero stats strip, OCI certs section, `BookCallButton` swap, project card linking, spotlight on bento.
- [app/layout.tsx](app/layout.tsx) — extended metadata, JSON-LD script, `<html>` lang/locale.
- [app/\_components/navbar.tsx](app/_components/navbar.tsx) — add mobile menu, swap "Book a call" anchor for `BookCallButton`, optional add `Credentials` or `Works` link review.
- [app/\_components/motion.tsx](app/_components/motion.tsx) — no changes (existing `Reveal` reused on new sections).
- [app/globals.css](app/globals.css) — add CSS custom-property fallbacks for spotlight (only if needed).

**New files**

- [app/\_components/book-call-modal.tsx](app/_components/book-call-modal.tsx) — Cal.com modal + `BookCallButton`.
- [app/\_components/spotlight-card.tsx](app/_components/spotlight-card.tsx) — cursor-tracking wrapper.
- [app/\_components/oci-certs.tsx](app/_components/oci-certs.tsx) — certs strip section component.
- [app/\_components/stats-strip.tsx](app/_components/stats-strip.tsx) — hero stats row.
- [app/\_components/mobile-menu.tsx](app/_components/mobile-menu.tsx) — slide-down mobile panel (or inline in navbar.tsx).
- [app/\_data/projects.ts](app/_data/projects.ts) — typed Project array (case studies).
- [app/works/[slug]/page.tsx](app/works/[slug]/page.tsx) — dynamic case-study page.
- [app/works/[slug]/not-found.tsx](app/works/[slug]/not-found.tsx) — handles bad slugs.
- [app/icon.tsx](app/icon.tsx) — dynamic favicon.
- [app/opengraph-image.tsx](app/opengraph-image.tsx) — homepage OG image.
- [app/twitter-image.tsx](app/twitter-image.tsx) — Twitter card.
- [app/sitemap.ts](app/sitemap.ts) — dynamic sitemap.
- [app/robots.ts](app/robots.ts) — robots config.
- [public/abdelrazig-sharif-cv.pdf](public/abdelrazig-sharif-cv.pdf) — user-supplied CV.

**Dependencies to install**

- `@calcom/embed-react` (only if using inline embed; skip if going with simple link).

---

## Verification

1. `npm run dev` — visual check each section in order: hero → stats → certs → services → works → research → footer.
2. `npx next build` — passes typecheck + static-generation of all `/works/[slug]` routes.
3. Click "Book a call" from navbar, hero CTA strip, and footer — all open the same modal.
4. Click "Download CV" — file downloads with correct filename.
5. Mobile (DevTools 375 px): hamburger opens slide-down panel, links scroll smoothly, panel closes on link tap, body scroll unlocks.
6. Hover bento cards on desktop — orange spotlight tracks the cursor; on `prefers-reduced-motion: reduce` the spotlight is disabled.
7. Visit `/works/saeerha` and `/works/secure-payment-tracker` directly — pages render with full content; visit `/works/foo` — shows 404.
8. View page source on `/`: `<title>`, OG meta tags, Twitter tags, JSON-LD `Person` block all present.
9. Visit `/sitemap.xml` and `/robots.txt` — both serve correct XML/text with all 5 URLs.
10. Open `/opengraph-image` and `/icon` directly — both render.
11. Run Lighthouse on `/` — target ≥95 Performance, ≥95 Accessibility, ≥100 SEO.
12. Paste production URL into the LinkedIn Post Inspector — preview shows custom OG image + title.

---

## Decisions

- **Project pages over modals** — chosen for SEO + shareability.
- **Cal.com modal over external link** — keeps users on-site, but only if user has Cal.com.
- **Sub-set of projects fully written** — 2 full case studies + 2 stubs; iterate later.
- **No new "Credentials" nav link** — certs live under hero to avoid clutter.
- **Excluded from this sprint**: testimonials, blog/MDX, analytics, bilingual EN/AR, command palette, GitHub activity widget — flagged as future work.

---

## Further Considerations (need user input)

1. **Cal.com username / booking URL?** If you don't have one, recommend signing up at cal.com (free) — alternative is a `mailto:` link for now and swap later. _(Recommend: Cal.com free tier)_
2. **Do you have a CV PDF ready, or should I compile the LaTeX you shared into one?** _(Recommend: I compile via `pdflatex` — fast, on-brand)_
3. **Real domain?** Affects sitemap canonical URLs and OG metadata. _(Recommend: pick a domain now even if not deployed yet — easy placeholder, e.g., `abdelrazig.dev`)_
4. **LinkedIn + GitHub URLs?** Required for footer + JSON-LD `sameAs`.
5. **Top 2 projects to fully write** — confirm Saeerha + Secure Payment Tracker, or swap for BDG/QAST?
6. **Project metrics** — any real numbers you can share for the "Outcomes" sections (uptime, latency improvements, deploy frequency, cost savings)?
