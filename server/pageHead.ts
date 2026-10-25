import { getPageMeta, publicPaths } from "../shared/routes";
import { business, services } from "../shared/catalog";
import { guides } from "../shared/guides";
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
  const value = process.env.SITE_URL || process.env.PUBLIC_SITE_URL;
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
  const service = services.find(item => path === `/services/${item.slug}`);
  const guide = guides.find(item => path === `/guides/${item.slug}`);

  const structuredEntities: Record<string, unknown>[] = [
    {
      "@type": "AutoRepair",
      "@id": origin ? `${origin}/#business` : "https://theautosurgeon.co.uk/#business",
      name: business.name,
      description,
      telephone: "+447767909397",
      url: origin || "https://theautosurgeon.co.uk",
      image,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Unit 3 Squirrels Trading Estate, Viveash Close",
        addressLocality: "Hayes",
        postalCode: "UB3 4RZ",
        addressCountry: "GB",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 51.5038,
        longitude: -0.4208,
      },
      areaServed: ["Hayes", "UB3", "West London", "Hillingdon"],
      openingHours: "Mo-Sa 09:00-18:00",
      hasMap: business.maps,
    },
  ];

  if (service) {
    structuredEntities.push({
      "@type": "Service",
      name: service.name,
      serviceType: service.name,
      description: service.short,
      provider: {
        "@id": origin ? `${origin}/#business` : "https://theautosurgeon.co.uk/#business",
        "@type": "AutoRepair",
        name: business.name,
      },
      areaServed: "Hayes",
      image: origin
        ? `${origin}/assets/photos/${service.image}.webp`
        : undefined,
      offers: {
        "@type": "Offer",
        priceCurrency: "GBP",
        price: service.price,
        url: pageUrl,
        availability: "https://schema.org/InStock",
      },
    });
  }

  if (guide) {
    structuredEntities.push({
      "@type": "Article",
      headline: guide.title,
      description: guide.summary,
      image: origin ? `${origin}${guide.image}` : undefined,
      author: {
        "@type": "Organization",
        name: "The Auto Surgeon",
        url: origin || "https://theautosurgeon.co.uk",
      },
      publisher: {
        "@type": "Organization",
        name: "The Auto Surgeon",
        logo: {
          "@type": "ImageObject",
          url: logo,
        },
      },
      mainEntityOfPage: pageUrl,
    });

    if (guide.faqs && guide.faqs.length > 0) {
      structuredEntities.push({
        "@type": "FAQPage",
        mainEntity: guide.faqs.map(faq => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      });
    }
  }
  const structuredData =
    meta && !meta.private
      ? `<script type="application/ld+json">${JSON.stringify({
          "@context": "https://schema.org",
          "@graph": structuredEntities,
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
