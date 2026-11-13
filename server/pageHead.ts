import { getPageMeta, publicPaths } from "../shared/routes";
import { business, services } from "../shared/catalog";
import { guides } from "../shared/guides";
import { homeFaqs, siteFaqs, type Faq } from "../shared/faqs";

const logoPath = "/assets/brand/auto-surgeon-logo.png";
const facebookUrl = "https://www.facebook.com/profile.php?id=61595972917406";
const geo = { latitude: 51.503, longitude: -0.421 };

// JSON-LD is embedded in a <script>; keep "</" sequences from closing it early.
const safeJson = (value: unknown) =>
  JSON.stringify(value).replace(/</g, "\\u003c");

function faqPage(faqs: Faq[], url: string) {
  return {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

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

  const logo = `${origin}${logoPath}`;
  const image = meta?.image ? `${origin}${meta.image}` : logo;
  const pageUrl = meta ? `${origin}${meta.path}` : `${origin}/`;
  const robots = !meta || meta.private ? "noindex, nofollow" : "index, follow";

  const service = services.find(item => path === `/services/${item.slug}`);
  const guide = guides.find(item => path === `/guides/${item.slug}`);

  // Base Schema Graph
  const structuredEntities: Record<string, unknown>[] = [
    {
      "@type": "AutoRepair",
      "@id": `${origin}/#business`,
      name: business.name,
      alternateName: "Auto Surgeon Hayes",
      description:
        "Independent car repair workshop in Hayes (UB3), West London, offering tyre fitting, puncture repair, wheel alignment, brake servicing, engine oil servicing, vehicle diagnostics, Tesla wheel alignment and Mercedes engine work.",
      slogan: "Precision repairs. Expert service. Your car deserves a surgeon.",
      telephone: "+447767909397",
      email: business.email,
      url: `${origin}/`,
      logo: { "@type": "ImageObject", url: logo, width: 823, height: 335 },
      hasMap: business.maps,
      sameAs: [facebookUrl],
      currenciesAccepted: "GBP",
      knowsAbout: [
        "Car repair",
        "Tyre fitting",
        "Puncture repair",
        "Wheel alignment",
        "Tesla wheel alignment",
        "Brake pads and discs",
        "Engine oil service",
        "Vehicle diagnostics",
        "Dashboard warning lights",
        "Mercedes tappet and rocker repairs",
        "TPMS sensors",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+447767909397",
        email: business.email,
        contactType: "customer service",
        areaServed: "GB",
        availableLanguage: ["English"],
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Car repair and tyre services",
        itemListElement: services.map(item => ({
          "@type": "Offer",
          priceCurrency: "GBP",
          price: item.price,
          url: `${origin}/services/${item.slug}`,
          itemOffered: {
            "@type": "Service",
            name: item.name,
            description: item.short,
          },
        })),
      },
      image: [
        image,
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
        latitude: geo.latitude,
        longitude: geo.longitude,
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
      name: business.name,
      inLanguage: "en-GB",
      description:
        "Precision Car Care, Tyres, Wheel Alignment & Diagnostics in Hayes",
      publisher: {
        "@id": `${origin}/#business`,
      },
    },
  ];

  if (meta) {
    structuredEntities.push({
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: title,
      description,
      inLanguage: "en-GB",
      isPartOf: { "@id": `${origin}/#website` },
      about: { "@id": `${origin}/#business` },
      primaryImageOfPage: { "@type": "ImageObject", url: image },
    });
  }
  if (meta?.path === "/") structuredEntities.push(faqPage(homeFaqs, pageUrl));
  if (meta?.path === "/faq") structuredEntities.push(faqPage(siteFaqs, pageUrl));

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
      "@id": `${pageUrl}#service`,
      url: pageUrl,
      name: service.name,
      serviceType: service.name,
      description: service.short,
      provider: {
        "@id": `${origin}/#business`,
      },
      areaServed: [
        { "@type": "City", name: "Hayes" },
        { "@type": "AdministrativeArea", name: "West London" },
      ],
      image: `${origin}/assets/photos/${service.image}.webp`,
      offers: {
        "@type": "Offer",
        priceCurrency: "GBP",
        price: service.price,
        url: pageUrl,
        availability: "https://schema.org/InStock",
      },
    });

    if (service.faqs && service.faqs.length > 0)
      structuredEntities.push(faqPage(service.faqs, pageUrl));
  }

  // Guide FAQ Schema
  if (guide) {
    structuredEntities.push({
      "@type": "Article",
      "@id": `${pageUrl}#article`,
      headline: guide.title,
      description: guide.summary,
      image,
      inLanguage: "en-GB",
      mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
      author: { "@id": `${origin}/#business` },
      publisher: { "@id": `${origin}/#business` },
    });
    if (guide.faqs && guide.faqs.length > 0)
      structuredEntities.push(faqPage(guide.faqs, pageUrl));
  }

  const structuredData =
    meta && !meta.private
      ? `<script type="application/ld+json">${safeJson({
          "@context": "https://schema.org",
          "@graph": structuredEntities,
        })}</script>`
      : "";

  const canonicalTags =
    meta && !meta.private
      ? `<link rel="canonical" href="${escapeHtml(pageUrl)}" />
<link rel="alternate" hreflang="en-GB" href="${escapeHtml(pageUrl)}" />
<link rel="alternate" hreflang="x-default" href="${escapeHtml(pageUrl)}" />`
      : "";
  const preload =
    meta?.path === "/"
      ? `<link rel="preload" as="image" href="/assets/photos/hero-orange-caliper.webp" fetchpriority="high" />\n`
      : "";

  return `<title>${escapeHtml(title)}</title>
${preload}<meta name="description" content="${escapeHtml(description)}" />
<meta name="robots" content="${robots}${robots.startsWith("index") ? ", max-image-preview:large, max-snippet:-1" : ""}" />
<meta name="geo.region" content="GB-HIL" />
<meta name="geo.placename" content="Hayes, London" />
<meta name="geo.position" content="${geo.latitude};${geo.longitude}" />
<meta name="ICBM" content="${geo.latitude}, ${geo.longitude}" />
<meta name="keywords" content="car repair Hayes, emergency car repairs Hayes, tyre fitting Hayes, wheel alignment Hayes, brake repair Hayes, vehicle diagnostics Hayes, puncture repair Hayes, Tesla wheel alignment Hayes" />
<meta property="og:type" content="${guide ? "article" : "website"}" />
<meta property="og:locale" content="en_GB" />
<meta property="og:site_name" content="The Auto Surgeon" />
<meta property="og:title" content="${escapeHtml(title)}" />
<meta property="og:description" content="${escapeHtml(description)}" />
<meta property="og:image" content="${escapeHtml(image)}" />
<meta property="og:image:alt" content="${escapeHtml(title)}" />
<meta property="og:url" content="${escapeHtml(pageUrl)}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${escapeHtml(title)}" />
<meta name="twitter:description" content="${escapeHtml(description)}" />
<meta name="twitter:image" content="${escapeHtml(image)}" />
${canonicalTags}
${structuredData}`;
}

export function sitemapDocument() {
  const origin = publicOrigin();
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${publicPaths.map(path => `<url><loc>${escapeHtml(origin + path)}</loc></url>`).join("")}</urlset>`;
}

export function robotsDocument() {
  const origin = publicOrigin();
  return robotsText(origin);
}

const privatePaths = ["/api/", "/account", "/manage", "/book", "/quote", "/login", "/register", "/thank-you"];
// Answer engines and AI assistants are welcome to read the public pages.
const aiCrawlers = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-User", "Claude-SearchBot", "PerplexityBot", "Google-Extended", "Applebot-Extended", "Bingbot"];

export function robotsText(origin: string) {
  const rules = ["Allow: /", ...privatePaths.map(path => `Disallow: ${path}`)].join("\n");
  const groups = ["*", ...aiCrawlers].map(agent => `User-agent: ${agent}\n${rules}`);
  return `${groups.join("\n\n")}\n\nSitemap: ${origin}/sitemap.xml\n`;
}

/** Plain-text summary for AI assistants (https://llmstxt.org). */
export function llmsText() {
  const origin = publicOrigin();
  const serviceLines = services
    .map(item => `- [${item.name}](${origin}/services/${item.slug}): ${item.short} ${item.priceLabel} £${item.price}.`)
    .join("\n");
  const guideLines = guides
    .map(item => `- [${item.title}](${origin}/guides/${item.slug}): ${item.summary}`)
    .join("\n");
  return `# ${business.name}

> Independent car repair workshop in Hayes (UB3), West London. Tyre fitting, puncture repair, wheel alignment, brakes, engine oil servicing, diagnostics, Tesla wheel alignment and Mercedes engine work. Walk-ins welcome Monday–Saturday, 9 AM–6 PM; Sunday by appointment.

- Address: ${business.address}
- Phone: ${business.phone} (+44 7767 909397)
- Email: ${business.email}
- WhatsApp: ${business.whatsapp}
- Facebook: ${facebookUrl}
- Prices are labour only unless noted; parts are quoted separately and agreed before work starts. Online requests are not confirmed appointments until the workshop confirms them.

## Services

${serviceLines}

## Key pages

- [Services and pricing](${origin}/services)
- [Labour price list](${origin}/pricing)
- [Tyres](${origin}/tyres)
- [About the workshop](${origin}/about)
- [Frequently asked questions](${origin}/faq)
- [Contact and directions](${origin}/contact)

## Car care guides

${guideLines}
`;
}
