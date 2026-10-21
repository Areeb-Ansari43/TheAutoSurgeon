import { getPageMeta, publicPaths } from "../shared/routes";
const logo =
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519664037278955/PNfFIWOvLpgultzE.png";
export function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    char =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ]!
  );
}
function publicOrigin() {
  const value = process.env.PUBLIC_SITE_URL;
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password
      ? url.origin
      : undefined;
  } catch {
    return undefined;
  }
}
export function pageHead(path: string) {
  const meta = getPageMeta(path);
  const title = meta?.title || "Page Not Found — The Auto Surgeon";
  const description =
    meta?.description ||
    "The page you requested could not be found. Return to The Auto Surgeon homepage or explore our workshop services.";
  const origin = publicOrigin();
  const image = origin && meta?.image ? `${origin}${meta.image}` : logo;
  const pageUrl = origin && meta ? `${origin}${meta.path}` : undefined;
  const robots = !meta || meta.private ? "noindex, nofollow" : "index, follow";
  const structuredData =
    meta && !meta.private
      ? `<script type="application/ld+json">${JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AutoRepair",
          name: "The Auto Surgeon",
          description,
          telephone: "+447767909397",
          url: pageUrl,
          image,
          address: {
            "@type": "PostalAddress",
            streetAddress: "Unit 3 Squirrels Trading Estate, Viveash Close",
            addressLocality: "Hayes",
            postalCode: "UB3 4RZ",
            addressCountry: "GB",
          },
          areaServed: ["Hayes", "UB3", "West London"],
          openingHours: "Mo-Sa 09:00-18:00",
        })}</script>`
      : "";
  return `<title>${escapeHtml(title)}</title>\n<meta name="description" content="${escapeHtml(description)}" />\n<meta name="robots" content="${robots}" />\n<meta name="keywords" content="car repair Hayes, emergency car repairs Hayes, tyre fitting Hayes, wheel alignment Hayes, brake repair Hayes, vehicle diagnostics Hayes, puncture repair Hayes" />\n<meta property="og:type" content="website" />\n<meta property="og:site_name" content="The Auto Surgeon" />\n<meta property="og:title" content="${escapeHtml(title)}" />\n<meta property="og:description" content="${escapeHtml(description)}" />\n<meta property="og:image" content="${escapeHtml(image)}" />\n<meta name="twitter:card" content="summary_large_image" />\n<meta name="twitter:title" content="${escapeHtml(title)}" />\n<meta name="twitter:description" content="${escapeHtml(description)}" />\n<meta name="twitter:image" content="${escapeHtml(image)}" />${pageUrl ? `\n<link rel="canonical" href="${escapeHtml(pageUrl)}" />\n<meta property="og:url" content="${escapeHtml(pageUrl)}" />` : ""}${structuredData}`;
}
export function sitemapDocument() {
  const origin = publicOrigin();
  return origin
    ? `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${publicPaths.map(path => `<url><loc>${escapeHtml(origin + path)}</loc></url>`).join("")}</urlset>`
    : undefined;
}
export function robotsDocument() {
  const origin = publicOrigin();
  return `User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /account\nDisallow: /manage\nDisallow: /book\nDisallow: /quote\nDisallow: /login\nDisallow: /register\n${origin ? `Sitemap: ${origin}/sitemap.xml\n` : ""}`;
}
