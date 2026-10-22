# Cloudflare Pages deployment

Use these Cloudflare Pages settings:

- **Framework preset:** None (or Vite)
- **Build command:** `pnpm build:static`
- **Build output directory:** `dist/public`
- **Node version:** 20 or newer
- **Environment variable:** `SITE_URL=https://your-real-production-domain.example`

Set `SITE_URL` to the exact public origin customers will use, including `https://` and without a trailing slash. The build prerenders the public route HTML and writes `sitemap.xml`, `robots.txt`, favicon fallbacks, canonical URLs, Open Graph URLs and JSON-LD structured data into `dist/public`.

The default value is `https://theautosurgeon.co.uk` because it matches the business email domain currently in the project. Override it in Cloudflare Pages if the live site uses a different domain or `pages.dev` address. Never use a Preview, localhost or internal URL as `SITE_URL`.

Cloudflare Pages should serve the generated route folders directly, for example `/services/wheel-alignment/index.html` and `/guides/tyre-safety-checks/index.html`. Do not replace all routes with a single home-page fallback if you want route-specific H1s, metadata and canonical tags indexed.

The local images are committed under `client/public/assets`; Vite copies them to `dist/public/assets`. The root `/favicon.ico`, `/favicon.svg`, `/site.webmanifest`, `/sitemap.xml` and `/robots.txt` are generated or copied into the same output directory.

The repository still contains the full-stack server and database implementation. Cloudflare Pages static hosting serves the prerendered website and UI; appointment, quote and contact API persistence requires deploying the server/database-capable application as well or connecting those API routes to Cloudflare-compatible backend functions.

Emergency repair enquiries now use `/whatspp` (with `/whatsapp` as an alias). The page builds a pre-filled `https://wa.me/447767909397` link. The Contact form is reserved for quote requests and questions about whether the workshop can fix a vehicle.
