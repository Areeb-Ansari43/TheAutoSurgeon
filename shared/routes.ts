import { services } from "./catalog";
import { guides } from "./guides";
export type PageMeta = {
  path: string;
  title: string;
  description: string;
  private?: boolean;
  image?: string;
};
export const staticPages: PageMeta[] = [
  {
    path: "/",
    title: "The Auto Surgeon — Precision Car Care in Hayes",
    description:
      "Car repairs, emergency vehicle help, tyres, brakes, wheel alignment and diagnostics in Hayes UB3. Call The Auto Surgeon for fast, quality car care.",
  },
  {
    path: "/services",
    title: "Car Repairs, Tyres & Pricing in Hayes — The Auto Surgeon",
    description:
      "Compare car repair services, tyre fitting, puncture repairs and transparent labour pricing in one Hayes workshop hub. Call for urgent repair help.",
  },
  {
    path: "/tyres",
    title: "Tyres for Every Budget in Hayes — The Auto Surgeon",
    description:
      "Budget, mid-range, premium, performance and run-flat tyre options. Request a vehicle-specific fitted quote at our Hayes workshop.",
  },
  {
    path: "/pricing",
    title: "Honest Labour Price List — The Auto Surgeon Hayes",
    description:
      "View clear labour prices for brakes, oil service, punctures and wheel alignment. Parts quoted separately. Request a written quote for your vehicle.",
  },
  {
    path: "/about",
    title: "Quality Car Care in Hayes — About The Auto Surgeon",
    description:
      "The Auto Surgeon is a Hayes car-care workshop delivering quality repairs, honest advice and careful workmanship after a year serving local drivers.",
  },
  {
    path: "/workshop",
    title: "Inside Our Workshop & Process — The Auto Surgeon",
    description:
      "Understand what happens at your visit, from first inspection and vehicle-specific checks to agreed repairs and the final check.",
  },
  {
    path: "/reviews",
    title: "Customer Stories from Hayes — The Auto Surgeon",
    description:
      "Read customer experiences shared on the original Auto Surgeon website, including wheel alignment, transparent pricing and Tesla alignment.",
  },
  {
    path: "/faq",
    title: "Your Car Care Questions Answered — The Auto Surgeon",
    description:
      "Answers about workshop visits, requests, labour prices, tyres, diagnostics and Tesla alignment. Know what to expect before contacting us.",
  },
  {
    path: "/guides",
    title: "Car Repair & Emergency Care Guides in Hayes",
    description:
      "Find practical guides on tyres, warning lights, emergency car repairs, maintenance, pothole damage and wheel alignment from The Auto Surgeon in Hayes.",
  },
  {
    path: "/contact",
    title: "Contact Emergency Car Repairs in Hayes — The Auto Surgeon",
    description:
      "Need car repair help in Hayes? Call 07767 909397 for urgent vehicle advice, view our workshop map or send The Auto Surgeon a message.",
  },
  {
    path: "/whatspp",
    title: "WhatsApp Car Repair Enquiry in Hayes — The Auto Surgeon",
    description:
      "Send The Auto Surgeon a pre-filled WhatsApp enquiry about a car repair, quote or emergency vehicle problem in Hayes.",
  },
  {
    path: "/whatsapp",
    title: "WhatsApp Car Repair Enquiry in Hayes — The Auto Surgeon",
    description:
      "Send The Auto Surgeon a pre-filled WhatsApp enquiry about a car repair, quote or emergency vehicle problem in Hayes.",
  },
  {
    path: "/book",
    title: "Request a Vehicle Inspection — The Auto Surgeon",
    description:
      "Choose a service, enter your vehicle details and request a preferred visit at our Hayes workshop. All requests are subject to confirmation.",
    private: true,
  },
  {
    path: "/quote",
    title: "Request a Written Vehicle Quote — The Auto Surgeon",
    description:
      "Send your vehicle registration and service requirements to request a written quote. Parts and labour are agreed before work starts.",
    private: true,
  },
  {
    path: "/account",
    title: "Your Customer Account — The Auto Surgeon",
    description:
      "Sign in, manage your vehicle and contact profile and view your private appointment or quote requests.",
    private: true,
  },
  {
    path: "/login",
    title: "Customer Sign In — The Auto Surgeon",
    description: "Securely sign in to your Auto Surgeon customer account.",
    private: true,
  },
  {
    path: "/register",
    title: "Customer Account Access — The Auto Surgeon",
    description:
      "Sign in securely to view private vehicle requests and customer details.",
    private: true,
  },
  {
    path: "/manage",
    title: "Workshop Request Manager — The Auto Surgeon",
    description: "Private workspace for authorized workshop staff.",
    private: true,
  },
  {
    path: "/privacy",
    title: "Privacy & Cookie Notice — The Auto Surgeon",
    description:
      "How contact, vehicle and account details provided through The Auto Surgeon website are used to handle your requests.",
  },
];
export function getPageMeta(path: string): PageMeta | undefined {
  const clean = path.split("?")[0].replace(/\/$/, "") || "/";
  const known = staticPages.find(page => page.path === clean);
  if (known) return known;
  const service = services.find(item => clean === `/services/${item.slug}`);
  if (service)
    return {
      path: clean,
      title: `${service.name} in Hayes — The Auto Surgeon`,
      description:
        service.short +
        " Request a vehicle-specific inspection and quote at our Hayes workshop.",
      image: `/assets/photos/${service.image}.webp`,
    };
  const guide = guides.find(item => clean === `/guides/${item.slug}`);
  if (guide)
    return {
      path: clean,
      title: `${guide.category} Guide in Hayes — The Auto Surgeon`,
      description: guide.summary,
      image: guide.image,
    };
  return undefined;
}
export const pageRouteManifest = {
  routes: [
    ...staticPages.map(({ path, title }) => ({ path, title })),
    { path: "/services/:slug", title: "Service details" },
    { path: "/guides/:slug", title: "Vehicle-care guide" },
  ],
};
export const publicPaths = [
  ...staticPages.filter(page => !page.private).map(page => page.path),
  ...services.map(item => `/services/${item.slug}`),
  ...guides.map(item => `/guides/${item.slug}`),
];
