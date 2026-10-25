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
  const value =
    process.env.SITE_URL ||
    process.env.PUBLIC_SITE_URL ||
    "https://theautosurgeon.co.uk";
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:"
      ? url.origin
      : "https://theautosurgeon.co.uk";
  } catch {
    return "https://theautosurgeon.co.uk";
  }
}

export function pageHead(path: string) {
  const meta = getPageMeta(path);
  const origin = publicOrigin();
  const title = meta?.title || "Page Not Found — The Auto Surgeon";
  const description =
    meta?.description ||
    "The page you requested could not be found. Return to The Auto Surgeon homepage or explore our Hayes workshop services.";

  const image = origin && meta?.image ? `${origin}${meta.image}` : logo;
  const pageUrl = origin && meta ? `${origin}${meta.path}` : `${origin}/`;
  const robots = !meta || meta.private ? "noindex, nofollow" : "index, follow";

  const service = services.find(item => path === `/services/${item.slug}`);
  const guide = guides.find(item => path === `/guides/${item.slug}`);

  // Base Schema Graph
  const structuredEntities: Record<string, unknown>[] = [
    {
      "@type": "AutoRepair",
      "@id": `${origin}/#business`,
      name: business.name,
      description,
      telephone: "+447767909397",
      url: origin,
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
        latitude: 51.503,
        longitude: -0.421,
      },
      areaServed: [
        { "@type": "AdministrativeArea", name: "Hayes" },
        { "@type": "AdministrativeArea", name: "West London" },
        { "@type": "PostalAddress", postalCode: "UB3" },
      ],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "09:00",
          closes: "18:00",
        },
      ],
      priceRange: "££",
    },
    {
      "@type": "WebSite",
      "@id": `${origin}/#website`,
      url: origin,
      name: business.name,
      description: "Precision Car Care, Tyres, Wheel Alignment & Diagnostics in Hayes",
      publisher: {
        "@id": `${origin}/#business`,
      },
    },
  ];

  // Breadcrumbs
  if (meta && meta.path !== "/") {
    const segments = meta.path.split("/").filter(Boolean);
    const breadcrumbItems = [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${origin}/`,
      },
    ];

    if (segments.length === 1) {
      breadcrumbItems.push({
        "@type": "ListItem",
        position: 2,
        name: meta.title.split("—")[0].trim(),
        item: `${origin}${meta.path}`,
      });
    } else if (segments.length >= 2) {
      const parentPath = `/${segments[0]}`;
      const parentName = segments[0] === "services" ? "Services" : "Guides";
      breadcrumbItems.push({
        "@type": "ListItem",
        position: 2,
        name: parentName,
        item: `${origin}${parentPath}`,
      });
      breadcrumbItems.push({
        "@type": "ListItem",
        position: 3,
        name: meta.title.split("—")[0].trim(),
        item: `${origin}${meta.path}`,
      });
    }

    structuredEntities.push({
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems,
    });
  }

  // Service Schema
  if (service) {
    structuredEntities.push({
      "@type": "Service",
      name: service.name,
      serviceType: service.name,
      description: service.short,
      provider: {
        "@id": `${origin}/#business`,
      },
      areaServed: "Hayes",
      image: `${origin}/assets/photos/${service.image}.webp`,
      offers: {
        "@type": "Offer",
        priceCurrency: "GBP",
        price: service.price,
        url: pageUrl,
        availability: "https://schema.org/InStock",
      },
    });

    if (service.faqs && service.faqs.length > 0) {
      structuredEntities.push({
        "@type": "FAQPage",
        mainEntity: service.faqs.map(faq => ({
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

  // Guide FAQ Schema
  if (guide && guide.faqs && guide.faqs.length > 0) {
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

  const structuredData =
    meta && !meta.private
      ? `<script type="application/ld+json">${JSON.stringify({
          "@context": "https://schema.org",
          "@graph": structuredEntities,
        })}</script>`
      : "";

  return `<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}" />
<meta name="robots" content="${robots}" />
<meta name="keywords" content="car repair Hayes, emergency car repairs Hayes, tyre fitting Hayes, wheel alignment Hayes, brake repair Hayes, vehicle diagnostics Hayes, puncture repair Hayes, Tesla wheel alignment Hayes" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="The Auto Surgeon" />
<meta property="og:title" content="${escapeHtml(title)}" />
<meta property="og:description" content="${escapeHtml(description)}" />
<meta property="og:image" content="${escapeHtml(image)}" />
<meta property="og:url" content="${escapeHtml(pageUrl)}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${escapeHtml(title)}" />
<meta name="twitter:description" content="${escapeHtml(description)}" />
<meta name="twitter:image" content="${escapeHtml(image)}" />
<link rel="canonical" href="${escapeHtml(pageUrl)}" />
${structuredData}`;
}

export function sitemapDocument() {
  const origin = publicOrigin();
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${publicPaths.map(path => `<url><loc>${escapeHtml(origin + path)}</loc></url>`).join("")}</urlset>`;
}

export function robotsDocument() {
  const origin = publicOrigin();
  return `User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /account\nDisallow: /manage\nDisallow: /book\nDisallow: /quote\nDisallow: /login\nDisallow: /register\nSitemap: ${origin}/sitemap.xml\n`;
}
