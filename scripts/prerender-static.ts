import fs from "node:fs/promises";
import path from "node:path";
import { renderApp } from "../client/src/entry-server";
import { pageHead, robotsDocument, sitemapDocument } from "../server/pageHead";
import { pageRouteManifest } from "../shared/routes";
import { guides } from "../shared/guides";
import { services } from "../shared/catalog";

const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist", "public");
// Use the Vite-built template so the compiled /assets/app.js and
// /assets/app.css are referenced (never the /src/main.tsx dev entry).
const template = await fs.readFile(path.join(dist, "index.html"), "utf8");
if (!template.includes("<!--app-html-->")) {
  throw new Error("dist/public/index.html is missing the <!--app-html--> slot");
}
const siteUrl = (
  process.env.SITE_URL ||
  process.env.PUBLIC_SITE_URL ||
  "https://theautosurgeon.co.uk"
).replace(/\/$/, "");
process.env.SITE_URL ||= siteUrl;

function htmlFor(route: string) {
  const head = pageHead(route);
  const body = renderApp(route);
  return template
    .replace("<!--page-head-->", head)
    .replace("<!--app-html-->", body);
}

// Cloudflare Pages serves `/guides` from `guides.html` with a 200 and redirects
// `/guides/` to it. Writing flat files keeps every served URL identical to the
// canonical URL (no trailing slash), so Google never sees a redirecting canonical.
function fileFor(route: string) {
  if (route === "/") return path.join(dist, "index.html");
  return path.join(dist, `${route.replace(/^\//, "")}.html`);
}

const routes = [
  ...pageRouteManifest.routes
    .map(route => route.path)
    .filter(pathname => !pathname.includes(":")),
  ...services.map(service => `/services/${service.slug}`),
  ...guides.map(guide => `/guides/${guide.slug}`),
];

for (const route of [...new Set(routes)]) {
  const target = fileFor(route);
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, htmlFor(route), "utf8");
}

await fs.writeFile(path.join(dist, "404.html"), htmlFor("/missing-page"), "utf8");
await fs.writeFile(path.join(dist, "sitemap.xml"), sitemapDocument(), "utf8");
await fs.writeFile(path.join(dist, "robots.txt"), robotsDocument(), "utf8");

console.log(`Prerendered ${new Set(routes).size} routes with SITE_URL=${siteUrl}`);
