# SEO Audit: theautosurgeon.co.uk

**Date:** 16 November 2026
**Method:** [claude-seo](https://github.com/AgriciDaniel/claude-seo) v2.6.2 methodology and scripts (`page_checks.py` on every page), plus Lighthouse 12.6 (mobile emulation), a Playwright mobile render, and manual checks of robots.txt, the sitemap, redirects, schema and every internal link.
**Scope:** All 28 URLs in the sitemap, plus the 404 page, `/book`, `/quote` and `/account`.
**Business type:** Local service, brick-and-mortar car repair workshop (Hayes, UB3).

## SEO Health Score: 76 / 100

| Category | Weight | Score | Notes |
|---|---|---|---|
| Technical SEO | 22% | 80 | Clean indexing setup. www host not redirected, no HSTS. |
| Content quality | 23% | 68 | Good guides. Weak E-E-A-T and review evidence, some thin pages. |
| On-page SEO | 20% | 88 | Unique titles and descriptions on every page, one H1 each. |
| Schema | 10% | 75 | Wide coverage. A few gaps (GBP link, named author). |
| Performance (lab) | 10% | 65 | Mobile LCP 5.1–6.6 s. Large logo and favicon files. |
| AI search readiness | 10% | 70 | AI search bots allowed, good answer-first structure. No llms.txt. |
| Images | 5% | 78 | All images have alt text and use WebP. Most lack width/height and are oversized. |

> **Caveat on performance numbers:** Google's public PageSpeed API quota was exhausted, so Lighthouse ran locally through a proxy. Treat the timings as directional. The *causes* listed (file sizes, unused JS) are exact. The site has no Chrome UX Report field data yet, which is normal for a low-traffic site.

---

## What's already working well

- **Server-rendered HTML.** Every public page ships full content in the initial HTML, so there's no reliance on JavaScript for indexing.
- **Indexing controls are correct.** Each page has a self-referencing canonical. `/book`, `/quote`, `/account` and the 404 page are `noindex, follow`. Trailing slashes 308 to the slash-less URL. `/index.html` 301s to `/`. Unknown URLs return a real HTTP 404.
- **Sitemap.** It covers all 28 indexable pages, with image entries and lastmod dates, and is referenced in robots.txt.
- **On-page basics.** All 28 titles and meta descriptions are unique and include "Hayes". Each page has exactly one H1, there are no heading-level skips, `lang="en-GB"` is set, and Open Graph images are 1200×630.
- **Structured data.** An `AutoRepair` entity (with address, geo, hours and sameAs) appears on every page, along with `BreadcrumbList`, `Service` with offers on service pages, and `Article`, `HowTo` and `FAQPage` on guides. All JSON-LD parses.
- **Content.** The 10 guides (620–950 words) have "In short" summaries, step lists, a UK-law section and FAQs. That structure is ideal for featured snippets and AI citations.
- **Mobile above the fold.** The H1 reads "Precision car repairs in Hayes", with Book and Call buttons visible immediately. There's no horizontal scroll and CLS is 0.
- **Internal links.** All 75 unique internal links resolve. Only one goes through a redirect (see below).

---

## Findings

### Technical SEO

| # | Severity | Finding | Evidence | Fix |
|---|---|---|---|---|
| T1 | **High** | `www.theautosurgeon.co.uk` serves a full 200 copy of the site instead of redirecting | `curl -I https://www.theautosurgeon.co.uk/services` returns 200. The canonical points to the apex, which limits the damage, but links and signals still split across two hosts. | Add a Cloudflare **Redirect Rule** (Rules → Redirect Rules): host `www.theautosurgeon.co.uk` → `https://theautosurgeon.co.uk${path}`, 301, keep query string. `_redirects` can't match on hostname. |
| T2 | Medium | No HSTS header | Response headers include only `nosniff` and `Referrer-Policy`. | Turn on HSTS in Cloudflare (SSL/TLS → Edge Certificates), or add `Strict-Transport-Security: max-age=31536000; includeSubDomains` to `client/public/_headers`. |
| T3 | Medium | `/account` and tRPC API calls fail on the live (Cloudflare Pages) deployment | `/api/trpc/*` returns the 404 HTML page, so the console logs `TRPCClientError: Unexpected token '<'` on every page (this cost Best Practices: 79). `/account` is linked in every footer. | Either deploy the Express backend, or remove the tRPC auth query and the `/account` footer link from the static build. |
| T4 | Low | One internal link points at a redirect | `/guides/emergency-car-repair-hayes` links to `/whatspp`, which 301s to `/whatsapp`. | `shared/guides.ts:394`: change the href to `/whatsapp`. |
| T5 | Low | Lighthouse marks robots.txt invalid | `Content-Signal: search=yes,ai-train=no,use=reference` (unknown directive, added by Cloudflare's managed robots.txt). Google ignores it, but it lowers the Lighthouse SEO score to 92. | Optional. Leave it if you want the AI-training opt-out signal. |
| T6 | Low | The build ships development plugins | `jsxLocPlugin()` and `vitePluginManusDebugCollector()` run in production (`vite.config.ts:171`), adding `data-loc="client/src/..."` attributes to the live DOM and extra JS. | Only add these plugins when `mode === 'development'`. |

### Content quality and E-E-A-T

| # | Severity | Finding | Fix |
|---|---|---|---|
| C1 | **High** | **Weak trust signals for a "your money or your life"-adjacent topic (vehicle safety).** No named mechanic or owner, no qualifications (IMI, manufacturer training), no years of experience, no insurance or guarantee details. The About page says "the last year". | Add a "Meet the technician" block to About: name, photo, qualifications, years in the trade, specialisms (Mercedes tappets/rockers, Tesla alignment). Name that person as the author on the guides. |
| C2 | **High** | **Review evidence is minimal.** `/reviews` has 3 testimonials, labelled "not independently verified", and 222 words. There's no link to Google reviews. | Link to the Google Business Profile reviews, embed recent Google review snippets, and add before/after job stories to `/reviews`. Ask every customer for a Google review (QR code at the counter). |
| C3 | Medium | Thin pages | `/whatsapp` has 145 words (flagged thin), `/reviews` 222, `/pricing` 232 and `/contact` 246. | `/pricing`: add what each price includes, typical durations and a "why prices vary" FAQ. `/contact`: add an embedded map, parking and access directions, and nearby landmarks. |
| C4 | Medium | Service pages are moderate length (~370–390 words) and share one template | — | Expand each to 700+ words with unique content: the process, signs you need it, the equipment used, real examples, and models commonly serviced. |
| C5 | Medium | **Content gaps** for services you already quote or promote | Quote links exist for *Suspension Repair*, *Tyre Puncture Repair* and *TPMS Sensor Change*, and the About page pushes *Mercedes tappets/rockers/engines*, but none of these has its own page. | Create `/services/suspension-repair`, `/services/puncture-repair`, `/services/tpms-sensors` and `/services/mercedes-engine-repair`. |
| C6 | Medium | No area pages for the catchment | Only "Hayes / West London" is targeted. | Add 3–5 genuinely useful area pages (e.g. Harlington, Heathrow/Harmondsworth, West Drayton, Southall, Hillingdon) with distance, route and parking from each. |
| C7 | Low | Two pages' titles don't match their content well | `/faq` ("Your Car Care Questions Answered") and `/workshop` ("Inside Our Workshop & Process"). | Work "Hayes" and service keywords in, e.g. "Car Repair FAQs, Hayes UB3 — The Auto Surgeon". |

### On-page SEO

| # | Severity | Finding | Fix |
|---|---|---|---|
| O1 | Low | Two titles are over 60 characters: `/guides/toyota-hybrid-warning-lights` (63) and `/guides/common-car-problems-by-make` (62). | Trim, e.g. "Toyota Hybrid Warning Lights: Next Steps in Hayes". |
| O2 | Low | The `/guides` meta description is 162 characters. | Trim to under 155. |
| O3 | Low | The footer "Get directions" link goes to `/contact`, not to Google Maps. | Link it to the Google Business Profile or Maps listing. That's a better experience and a useful local signal. |

### Schema / structured data

| # | Severity | Finding | Fix |
|---|---|---|---|
| S1 | Medium | `sameAs` has no Google Business Profile URL, and `hasMap` is a search URL rather than the place URL. | Add the GBP `https://maps.google.com/?cid=…` URL to `sameAs` and `hasMap` (in `server/pageHead.ts`). |
| S2 | Medium | Guides use `author: {@id: #business}` (an organisation). | Once C1 is done, use a `Person` author with `jobTitle` and `knowsAbout`, and link to the About page. |
| S3 | Low | "Sunday by appointment" isn't represented in the schema. Geo coordinates use only 3 decimal places. | Add the exact coordinates from Google Maps (5–6 decimals). Optionally note Sunday availability in `description`. |
| S4 | Info | `HowTo` and `FAQPage` no longer produce Google rich results for this kind of site. | Keep them, because AI engines and Bing still use them. Don't expect SERP enhancements from them. |
| S5 | Info | No `aggregateRating`. | Correct as it is. Don't add self-served review stars. Earn stars on GBP instead. |

### Performance (Lighthouse, mobile, lab)

| Page | Perf | LCP | FCP | TBT | CLS | Weight |
|---|---|---|---|---|---|---|
| `/` | 68 | 5.1 s | 3.6 s | 230 ms | 0 | 1,296 KiB |
| `/services/wheel-alignment` | 89 | 2.8 s | 2.8 s | 160 ms | 0 | 989 KiB |
| `/guides/warning-lights` | 65 | 6.6 s | 3.6 s | 210 ms | 0 | 1,185 KiB |

| # | Severity | Finding | Fix |
|---|---|---|---|
| P1 | **High** | **`/favicon.svg` is 1.1 MB.** It's an embedded raster inside an SVG, and Chrome prefers the SVG icon, so every new visitor downloads 1.1 MB. `/assets/brand/auto-surgeon-logo.svg` (1.1 MB) and `favicon.png` (60 KB) have the same problem. | Remove the `<link rel="icon" href="/favicon.svg">` tag, or replace the file with a real vector or a 32×32 PNG (under 5 KB). |
| P2 | **High** | **The homepage LCP element is the logo PNG (137 KB, 1500 px wide) displayed at 160×60.** It's loaded twice: in the header and the footer. | Export a 320×120 WebP/AVIF (~8 KB), use `srcset`, and keep the preload pointing at the small file (`components/Site.tsx:97,550`). |
| P3 | Medium | Oversized images: about 280–380 KB could be saved per page (e.g. `tyre-dunlop-dark.webp` is 154 KB for a card thumbnail). | Generate 400/800/1200 px variants and use `srcset` + `sizes`. |
| P4 | Medium | 21 of the 23 images on the homepage, and most images site-wide, have no `width`/`height`. CLS is currently 0 thanks to CSS, but this is fragile. | Add intrinsic `width`/`height` attributes. |
| P5 | Medium | `app.js` is 174 KB, with ~92 KB unused on first load. Time to Interactive is 7–8 s on mobile. | Split heavy routes and components (forms, account, motion) with `React.lazy`, and drop the dev plugins (T6). |
| P6 | Low | Render-blocking requests: `app.css` (38 KB) and the Google Fonts CSS. `/services` lazy-loads its first image. | Self-host the two fonts with `font-display: swap`, and inline critical CSS. Don't lazy-load the first image on `/services`. |
| P7 | Low | Cloudflare **Email Obfuscation** rewrites the email as `[email protected]` and adds a script. | Optional: turn it off so the email (a NAP element) is visible to crawlers and AI. It's already public in the schema. |

### AI search readiness (GEO)

- **Allowed:** Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User, PerplexityBot and Claude-SearchBot (not blocked).
- **Blocked by Cloudflare's managed robots.txt:** GPTBot, ClaudeBot, Google-Extended, CCBot and others (training crawlers), plus GoogleOther. That's a reasonable choice: blocking Google-Extended doesn't affect AI Overviews.
- **A1 (Medium):** There's no `/llms.txt` (it returns 404). Add a short one listing the business facts (NAP, hours, services with prices) and links to the service pages and guides.
- **A2 (Medium):** Entity strength is low. Only 3 social profiles are linked in `sameAs`. Get listed and linked on Yell, Thomson Local, Checkatrade/Bark, WhoCanFixMyCar, ClickMechanic, Bing Places and Apple Business Connect, with the exact same NAP.
- **Strength:** The "In short" blocks, question-style H2s and the UK MOT law section make the guides very citable.

### Local SEO

- NAP is consistent across all pages and the schema: *Unit 3 Squirrels Trading Estate, Viveash Close, Hayes UB3 4RZ · 07767 909397*.
- **L1 (High):** The site never links to a Google Business Profile, and the GBP couldn't be verified from here. For a local workshop the GBP is the biggest ranking lever. Make sure it is claimed, uses the primary category *Auto repair shop*, lists every service with prices, has weekly photos, and has a steady flow of reviews. Link the site to it, and the GBP to the site.
- **L2 (Medium):** Embed a Google Map on `/contact` and add parking and access directions (trading estates are hard to find).
