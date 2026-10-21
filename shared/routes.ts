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
      "Tyres, wheel alignment, brakes, oil service and vehicle diagnostics in Hayes UB3. Clear labour prices and expert care. Request your inspection.",
  },
  {
    path: "/services",
    title: "Car Repair & Maintenance Services — The Auto Surgeon",
    description:
      "Explore tyre fitting, wheel alignment, brake service, engine oil, diagnostics and Tesla alignment at The Auto Surgeon workshop in Hayes.",
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
    title: "About Our Hayes Workshop — The Auto Surgeon",
    description:
      "Discover The Auto Surgeon's approach to car care: inspect first, explain clearly and agree the work before starting. Local expertise in Hayes UB3.",
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
    title: "Vehicle Care & Warning Sign Guides — The Auto Surgeon",
    description:
      "Practical, safety-minded car-care guides on tyre checks, warning lights and signs of poor alignment. Know when to seek a professional inspection.",
  },
  {
    path: "/contact",
    title: "Contact & Find Us in Hayes — The Auto Surgeon",
    description:
      "Visit Unit 3 Squirrels Trading Estate, Viveash Close, Hayes UB3 4RZ. Call 07767 909397, view directions or send a workshop inquiry.",
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
    title: "Create Your Customer Account — The Auto Surgeon",
    description: "Create your customer account securely through Manus sign-in.",
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
      title: `${guide.title} — The Auto Surgeon`,
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
