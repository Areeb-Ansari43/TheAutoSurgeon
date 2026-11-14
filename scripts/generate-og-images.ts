/**
 * Generates a 1200×630 social preview card (Open Graph / Twitter / WhatsApp)
 * for every public page into client/public/og/.
 *
 *   pnpm og:images
 *
 * Re-run after adding or renaming a page, service or guide, then commit the
 * images. Needs Playwright with Chromium (npx playwright install chromium).
 * Set PLAYWRIGHT_MODULE to an absolute path to use a preinstalled copy.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { business, socials } from "../shared/catalog";
import {
  getPageMeta,
  ogEyebrow,
  ogHeadline,
  ogImagePath,
  publicPaths,
} from "../shared/routes";

const root = path.resolve(import.meta.dirname, "..");
const publicDir = path.join(root, "client", "public");
const outDir = path.join(publicDir, "og");

const playwrightModule = process.env.PLAYWRIGHT_MODULE
  ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href
  : "playwright";
const { chromium } = await import(playwrightModule);

async function dataUri(file: string) {
  const buffer = await fs.readFile(path.join(publicDir, file));
  const ext = path.extname(file).slice(1).replace("jpg", "jpeg");
  return `data:image/${ext};base64,${buffer.toString("base64")}`;
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"]/g,
    char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[char]!
  );
}

const logo = await dataUri("assets/brand/auto-surgeon-logo.png");
const handles = socials
  .filter(social => social.id !== "facebook")
  .map(social => social.handle)
  .join("  ·  ");

function card(headline: string, eyebrow: string, photo: string) {
  const size = headline.length > 58 ? 58 : headline.length > 40 ? 66 : 76;
  return `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&family=Inter:wght@500;600;700&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;overflow:hidden;background:#0b0b0c;font-family:Inter,sans-serif;color:#fff}
.card{position:relative;width:1200px;height:630px;display:grid;grid-template-columns:690px 1fr}
.copy{position:relative;z-index:2;padding:52px 0 48px 64px;display:flex;flex-direction:column}
.logo{width:190px;height:70px;object-fit:contain;object-position:left center}
.eyebrow{margin-top:auto;display:flex;align-items:center;gap:12px;font-size:21px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#ff9a4a}
.eyebrow:before{content:"";width:34px;height:3px;border-radius:3px;background:#f26a00}
h1{margin-top:18px;font-family:Archivo,sans-serif;font-stretch:110%;font-weight:850;font-size:${size}px;line-height:1.02;letter-spacing:-.035em;max-width:620px}
.foot{margin-top:34px;display:flex;gap:22px;align-items:center;font-size:20px;color:#c9c9ce;font-weight:500}
.foot b{color:#fff;font-weight:700}
.dot{width:6px;height:6px;border-radius:50%;background:#f26a00}
.photo{position:absolute;inset:0 0 0 520px;overflow:hidden}
.photo img{width:100%;height:100%;object-fit:cover}
.photo:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#0b0b0c 0%,rgba(11,11,12,.86) 22%,rgba(11,11,12,.15) 62%,rgba(11,11,12,.05))}
.bar{position:absolute;left:0;right:0;bottom:0;height:8px;background:linear-gradient(90deg,#f26a00,#ff9a4a 60%,#f26a00)}
.tag{position:absolute;right:40px;top:44px;z-index:3;padding:10px 18px;border-radius:999px;background:rgba(11,11,12,.72);border:1px solid rgba(255,255,255,.18);font-size:18px;font-weight:600;color:#fff}
</style></head><body><div class="card">
<div class="photo"><img src="${photo}"></div>
<div class="copy">
<img class="logo" src="${logo}">
<p class="eyebrow">${escapeHtml(eyebrow)}</p>
<h1>${escapeHtml(headline)}</h1>
<div class="foot"><b>theautosurgeon.co.uk</b><span class="dot"></span><span>Hayes, UB3</span><span class="dot"></span><span>${business.phone}</span></div>
</div>
<span class="tag">${escapeHtml(handles)}</span>
<div class="bar"></div>
</div></body></html>`;
}

await fs.mkdir(outDir, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
});

let count = 0;
for (const route of publicPaths) {
  const meta = getPageMeta(route);
  if (!meta) continue;
  const photo = await dataUri(
    (meta.image || "/assets/photos/workshop-lift.webp").replace(/^\//, "")
  );
  await page.setContent(card(ogHeadline(meta), ogEyebrow(route), photo), {
    waitUntil: "networkidle",
  });
  await page.evaluate(() => document.fonts.ready);
  const target = path.join(publicDir, ogImagePath(route).replace(/^\//, ""));
  await page.screenshot({ path: target, type: "jpeg", quality: 84 });
  count++;
}
await browser.close();
console.log(`Generated ${count} social preview cards in client/public/og/`);
