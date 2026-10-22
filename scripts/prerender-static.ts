import fs from "node:fs/promises";
import path from "node:path";
import { renderApp } from "../client/src/entry-server";
import { pageHead } from "../server/pageHead";
import { getPageMeta, pageRouteManifest, publicPaths } from "../shared/routes";
import { guides } from "../shared/guides";
import { services } from "../shared/catalog";

const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist", "public");
const template = await fs.readFile(
  path.join(root, "client", "index.html"),
  "utf8"
);
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
function fileFor(route: string) {
  if (route === "/") return path.join(dist, "index.html");
  return path.join(dist, route.replace(/^\//, ""), "index.html");
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
await fs.writeFile(
  path.join(dist, "404.html"),
  htmlFor("/missing-page"),
  "utf8"
);
const urls = publicPaths
  .map(route => `  <url><loc>${siteUrl}${route}</loc></url>`)
  .join("\n");
await fs.writeFile(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  "utf8"
);
await fs.writeFile(
  path.join(dist, "robots.txt"),
  `User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /account\nDisallow: /manage\nDisallow: /book\nDisallow: /quote\nDisallow: /login\nDisallow: /register\nSitemap: ${siteUrl}/sitemap.xml\n`,
  "utf8"
);
console.log(
  `Prerendered ${new Set(routes).size} routes with SITE_URL=${siteUrl}`
);
