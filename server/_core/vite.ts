import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";
import { renderApp } from "../../client/src/entry-server";
import { getPageMeta } from "../../shared/routes";
import { pageHead } from "../pageHead";

function isAssetRequest(pathname: string) {
  return (
    pathname.startsWith("/assets/") ||
    pathname.startsWith("/api/") ||
    /\.[a-zA-Z0-9]+$/.test(pathname)
  );
}
export async function setupVite(app: Express, server: Server) {
  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: { middlewareMode: true, hmr: { server }, allowedHosts: true },
    appType: "custom",
  });
  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const pathname = req.originalUrl.split("?")[0];
    if (req.method !== "GET" || isAssetRequest(pathname)) {
      res.status(404).type("text").send("Not found");
      return;
    }
    try {
      const templatePath = path.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );
      const template = await fs.promises.readFile(templatePath, "utf-8");
      const module = await vite.ssrLoadModule("/src/entry-server.tsx");
      const html = module.renderApp(req.originalUrl);
      const page = await vite.transformIndexHtml(
        req.originalUrl,
        template
          .replace("<!--page-head-->", pageHead(pathname))
          .replace("<!--app-html-->", html)
      );
      res
        .status(getPageMeta(pathname) ? 200 : 404)
        .set({ "Content-Type": "text/html", "Cache-Control": "no-store" })
        .end(page);
    } catch (error) {
      vite.ssrFixStacktrace(error as Error);
      next(error);
    }
  });
}
export function serveStatic(app: Express) {
  const distPath = path.resolve(import.meta.dirname, "public");
  const template = fs.readFileSync(
    path.resolve(distPath, "index.html"),
    "utf-8"
  );
  app.use(express.static(distPath, { index: false }));
  app.use("*", (req, res, next) => {
    const pathname = req.originalUrl.split("?")[0];
    if (req.method !== "GET" || isAssetRequest(pathname)) {
      res.status(404).type("text").send("Not found");
      return;
    }
    try {
      const html = renderApp(req.originalUrl);
      const page = template
        .replace("<!--page-head-->", pageHead(pathname))
        .replace("<!--app-html-->", html);
      res
        .status(getPageMeta(pathname) ? 200 : 404)
        .set({ "Content-Type": "text/html", "Cache-Control": "no-store" })
        .end(page);
    } catch (error) {
      next(error);
    }
  });
}
