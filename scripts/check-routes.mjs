const base = process.env.CHECK_ORIGIN || "http://127.0.0.1:3000";
const pages = [
  "/",
  "/services",
  "/services/tyre-fitting",
  "/services/wheel-alignment",
  "/services/brake-service",
  "/services/engine-oil",
  "/services/diagnostics",
  "/services/tesla-alignment",
  "/tyres",
  "/pricing",
  "/about",
  "/workshop",
  "/reviews",
  "/faq",
  "/guides",
  "/guides/tyre-safety-checks",
  "/guides/warning-lights",
  "/guides/wheel-alignment-signs",
  "/guides/emergency-car-repair-hayes",
  "/guides/car-maintenance-checklist",
  "/guides/after-a-pothole-or-kerb-hit",
  "/contact",
  "/whatspp",
  "/whatsapp",
  "/book",
  "/quote",
  "/account",
  "/login",
  "/register",
  "/manage",
  "/privacy",
  "/missing-page",
  "/services/invalid",
];
const assets = new Set();
for (const path of pages) {
  const response = await fetch(base + path);
  const text = await response.text();
  const expected = ["/missing-page", "/services/invalid"].includes(path)
    ? 404
    : 200;
  if (
    response.status !== expected ||
    !text.includes("<h1") ||
    !text.includes("<title>") ||
    text.includes("<!--app-html-->")
  )
    throw new Error(`Invalid initial response for ${path}: ${response.status}`);
  if (path === "/missing-page" && !text.includes("Page Not Found"))
    throw new Error("Missing-page title is not correct");
  if (path === "/services" && !text.includes("URGENT CAR REPAIRS IN HAYES"))
    throw new Error("Combined Services sections missing");
  if (
    path === "/services/wheel-alignment" &&
    !text.includes("Wheel Alignment in Hayes")
  )
    throw new Error("Service page metadata is not route-specific");
  for (const match of text.matchAll(/(?:src|href)="(\/assets\/[^"\s]+)"/g))
    assets.add(match[1]);
  console.log(`${response.status} ${path} — ${text.length} chars`);
}
for (const asset of assets) {
  const response = await fetch(base + asset);
  if (response.status !== 200) throw new Error(`Missing asset: ${asset}`);
  await response.arrayBuffer();
}
const manifest = await fetch(base + "/manus-routes.json");
if (
  manifest.status !== 200 ||
  !manifest.headers.get("content-type")?.includes("application/json")
)
  throw new Error("Manifest response is not JSON");
const routes = (await manifest.json()).routes;
if (
  routes.length !== 21 ||
  !routes.some(route => route.path === "/services/:slug") ||
  !routes.some(route => route.path === "/guides/:slug")
)
  throw new Error("Incomplete manifest");
for (const route of [
  "/api/trpc/appointments.mine",
  "/api/trpc/account.profile",
  "/api/trpc/inquiries.mine",
  "/api/trpc/admin.requests",
]) {
  const response = await fetch(base + route);
  if (response.status !== 401 && response.status !== 403)
    throw new Error(`Protected route admitted a guest: ${route}`);
}
console.log(
  `Passed: ${pages.length} initial page responses, ${assets.size} assets, ${routes.length} routes and guest authorization boundaries. No customer records were submitted.`
);
