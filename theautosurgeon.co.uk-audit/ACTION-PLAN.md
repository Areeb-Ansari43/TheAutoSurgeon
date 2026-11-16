# Action Plan: theautosurgeon.co.uk

Current SEO Health Score: **76/100**. Finding IDs (T1, P1, …) refer to `FULL-AUDIT-REPORT.md`.

## Week 1: quick wins (mostly under 1 hour each)

1. **P1:** Remove or replace the 1.1 MB `favicon.svg` (and the 1.1 MB `auto-surgeon-logo.svg`).
2. **P2:** Replace the 137 KB logo PNG with a ~8 KB 320×120 WebP in the header and footer.
3. **T1:** Add a Cloudflare 301 redirect rule from `www.` to the apex domain.
4. **T2:** Enable HSTS in Cloudflare.
5. **L1:** Confirm the Google Business Profile is claimed and complete, then link to it from the footer "Get directions" link and from the schema `sameAs`/`hasMap` (O3, S1).
6. **T4:** Fix the `/whatspp` link in `shared/guides.ts:394`.
7. **O1/O2/C7:** Trim two guide titles and the `/guides` description, and add "Hayes" to the `/faq` and `/workshop` titles.

## Weeks 2–3: high impact

8. **C1:** Add a named technician or owner to About (photo, qualifications, experience) and use them as the guides' `Person` author (S2).
9. **C2:** Run a Google review drive (QR code, follow-up message), link the GBP reviews from `/reviews`, and add real job stories.
10. **T3:** Fix the broken `/api/trpc` calls on the static deployment (remove them or deploy the backend), and hide `/account` if it isn't live.
11. **P3/P4:** Generate responsive image sizes with `srcset`, and add `width`/`height` to every `<img>`.
12. **T6/P5:** Remove the dev-only Vite plugins from production builds, and code-split non-critical JS.

## Month 2: content and authority

13. **C5:** New service pages for suspension repair, puncture repair, TPMS sensors and Mercedes engine/tappet repair.
14. **C4/C3:** Expand the 6 service pages to 700+ unique words each. Beef up `/pricing` and `/contact` (map, parking, directions).
15. **C6:** 3–5 area pages for the surrounding areas (Harlington, West Drayton, Southall, Hillingdon, Heathrow).
16. **A1:** Publish `/llms.txt`.
17. **A2:** Build consistent citations: Bing Places, Apple Business Connect, Yell, Thomson Local, Checkatrade, WhoCanFixMyCar.

## Ongoing

- Set up Google Search Console and Bing Webmaster Tools if you haven't, submit the sitemap, and watch the "Pages" and "Performance" reports monthly.
- Publish 2 guides a month on the questions customers actually ask (e.g. "MOT failure for warning lights", "Tesla Model Y alignment cost").
- Re-run PageSpeed Insights after P1–P4 and aim for mobile LCP under 2.5 s.
- Re-audit in about 8 weeks.
