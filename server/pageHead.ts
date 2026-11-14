import { getPageMeta, ogImagePath, publicPaths } from "../shared/routes";
import { business, services, socials } from "../shared/catalog";
import { guides } from "../shared/guides";

const logoPath = "/assets/brand/auto-surgeon-logo.png";

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

  // Each public page has its own 1200×630 social preview card.
  const image = `${origin}${
    meta && !meta.private ? ogImagePath(meta.canonical || meta.path) : "/og/home.jpg"
  }`;
  const imageAlt = meta
    ? `${title.split(/\s[—|]\s/)[0]} — The Auto Surgeon, Hayes`
    : "The Auto Surgeon car repair workshop in Hayes";
  const pageUrl = meta ? `${origin}${meta.canonical || meta.path}` : `${origin}/`;
  const robots =
    !meta || meta.private
      ? "noindex, follow"
      : "index, follow, max-image-preview:large, max-snippet:-1";

  const service = services.find(item => path === `/services/${item.slug}`);
  const guide = guides.find(item => path === `/guides/${item.slug}`);

  // Base Schema Graph
  const structuredEntities: Record<string, unknown>[] = [
    {
      "@type": "AutoRepair",
      "@id": `${origin}/#business`,
      name: business.name,
      description:
        "Independent car repair workshop in Hayes, UB3 for tyres, wheel alignment, brakes, engine oil, diagnostics and Tesla wheel alignment.",
      telephone: "+447767909397",
      email: business.email,
      url: `${origin}/`,
      logo: `${origin}${logoPath}`,
      sameAs: socials.map(social => social.url),
      hasMap: business.maps,
      image: [
        `${origin}/assets/photos/workshop-lift.webp`,
        `${origin}/assets/photos/workshop-mercedes.webp`,
        `${origin}/assets/photos/workshop-engine.webp`,
      ],
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
      url: `${origin}/`,
      inLanguage: "en-GB",
      name: business.name,
      description:
        "Precision Car Care, Tyres, Wheel Alignment & Diagnostics in Hayes",
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
      const parentName = segments[0] === "services" ? "Services" : "Car care guides";
      const leafName = service?.name || guide?.title || meta.title.split("—")[0].trim();
      breadcrumbItems.push({
        "@type": "ListItem",
        position: 2,
        name: parentName,
        item: `${origin}${parentPath}`,
      });
      breadcrumbItems.push({
        "@type": "ListItem",
        position: 3,
        name: leafName,
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

  // Guide Article + HowTo schema
  if (guide) {
    structuredEntities.push({
      "@type": "Article",
      "@id": `${pageUrl}#article`,
      headline: guide.title,
      description: guide.summary,
      image: [`${origin}${guide.image}`, image],
      datePublished: guide.published,
      dateModified: guide.updated,
      inLanguage: "en-GB",
      articleSection: guide.category,
      mainEntityOfPage: pageUrl,
      author: { "@id": `${origin}/#business` },
      publisher: { "@id": `${origin}/#business` },
    });
    if (guide.steps && guide.steps.length > 0) {
      structuredEntities.push({
        "@type": "HowTo",
        name: guide.title,
        description: guide.summary,
        image: `${origin}${guide.image}`,
        step: guide.steps.map(step => ({
          "@type": "HowToStep",
          position: step.stepNumber,
          name: step.title,
          text: step.text,
          url: `${pageUrl}#step-${step.stepNumber}`,
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
${meta ? `<link rel="canonical" href="${escapeHtml(pageUrl)}" />
<link rel="alternate" hreflang="en-GB" href="${escapeHtml(pageUrl)}" />
<link rel="alternate" hreflang="x-default" href="${escapeHtml(pageUrl)}" />` : ""}
<meta property="og:type" content="${guide ? "article" : "website"}" />
<meta property="og:locale" content="en_GB" />
<meta property="og:site_name" content="The Auto Surgeon" />
<meta property="og:title" content="${escapeHtml(title)}" />
<meta property="og:description" content="${escapeHtml(description)}" />
<meta property="og:image" content="${escapeHtml(image)}" />
<meta property="og:url" content="${escapeHtml(pageUrl)}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${escapeHtml(title)}" />
<meta name="twitter:description" content="${escapeHtml(description)}" />
<meta name="twitter:image" content="${escapeHtml(image)}" />
<meta property="og:image:alt" content="${escapeHtml(imageAlt)}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:type" content="image/jpeg" />
<meta name="twitter:image:alt" content="${escapeHtml(imageAlt)}" />
<meta name="author" content="The Auto Surgeon" />${guide ? `
<meta property="article:published_time" content="${guide.published}" />
<meta property="article:modified_time" content="${guide.updated}" />
<meta property="article:section" content="${escapeHtml(guide.category)}" />` : ""}
${structuredData}`;
}

export function sitemapDocument() {
  const origin = publicOrigin();
  const today = new Date().toISOString().split("T")[0];
  const entries = publicPaths.map(path => {
    const meta = getPageMeta(path);
    const guide = guides.find(item => path === `/guides/${item.slug}`);
    const image = meta?.image
      ? `<image:image><image:loc>${escapeHtml(origin + meta.image)}</image:loc></image:image>`
      : "";
    return `  <url><loc>${escapeHtml(origin + path)}</loc><lastmod>${guide?.updated || today}</lastmod>${image}</url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.join("\n")}
</urlset>
`;
}

export function robotsDocument() {
  const origin = publicOrigin();
  return `User-agent: *
Allow: /
Disallow: /api/
Disallow: /account
Disallow: /manage
Disallow: /login
Disallow: /register
Disallow: /thank-you

Sitemap: ${origin}/sitemap.xml
`;
}
