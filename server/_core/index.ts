import "dotenv/config";
import express, { type ErrorRequestHandler } from "express";
import { createServer } from "http";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { publicPlatformScript } from "./publicConfig";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { pageRouteManifest } from "../../shared/routes";
import { robotsDocument, sitemapDocument } from "../pageHead";

async function startServer() {
  const app = express();
  const server = createServer(app);
  app.disable("x-powered-by");
  app.use((_req, res, next) => {
    res.set("X-Content-Type-Options", "nosniff");
    res.set("Referrer-Policy", "strict-origin-when-cross-origin");
    next();
  });
  app.use(express.json({ limit: "64kb" }));
  app.use(express.urlencoded({ limit: "64kb", extended: true }));
  app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
  app.get("/manus-routes.json", (_req, res) => res.json(pageRouteManifest));
  app.get("/robots.txt", (_req, res) =>
    res.type("text").send(robotsDocument())
  );
  app.get("/sitemap.xml", (_req, res, next) => {
    const doc = sitemapDocument();
    if (doc) res.type("application/xml").send(doc);
    else next();
  });
  app.get("/api/platform/config.js", (_req, res) =>
    res
      .set("Cache-Control", "no-store")
      .type("application/javascript")
      .send(publicPlatformScript())
  );
  registerOAuthRoutes(app);
  app.use(
    "/api/trpc",
    (_req, res, next) => {
      res.set("Cache-Control", "private, no-store");
      next();
    },
    createExpressMiddleware({ router: appRouter, createContext })
  );
  if (process.env.NODE_ENV === "development") await setupVite(app, server);
  else serveStatic(app);
  const errorHandler: ErrorRequestHandler = (error, req, res, _next) => {
    console.error(
      "Request failed",
      error instanceof Error ? error.message : "unknown error"
    );
    const status =
      error?.type === "entity.too.large"
        ? 413
        : error instanceof SyntaxError
          ? 400
          : 500;
    if (req.path.startsWith("/api/")) {
      res
        .status(status)
        .json({
          error:
            status === 413
              ? "Request too large."
              : "We couldn’t process this request. Please try again.",
        });
      return;
    }
    res
      .status(status)
      .type("html")
      .send(
        `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Something Went Wrong — The Auto Surgeon</title></head><body style="margin:0;background:#0b0b0b;color:#fff;font-family:Arial,sans-serif;padding:12vh 10vw"><p style="color:#f26a00;letter-spacing:3px;font-size:12px">THE AUTO SURGEON</p><h1>Let’s get you back on track.</h1><p style="color:#aaa;line-height:1.8">This page couldn’t load. Please try again, or call the workshop on 07767 909397.</p><a href="/" style="display:inline-block;background:#f26a00;color:#0b0b0b;padding:15px 25px;text-decoration:none;border-radius:6px;margin-top:20px">Return home</a></body></html>`
      );
  };
  app.use(errorHandler);
  const port = Number(process.env.PORT || "3000");
  if (!Number.isInteger(port) || port < 1 || port > 65535)
    throw new Error("Invalid PORT");
  server.on("error", error => {
    console.error("Server failed:", error.message);
    process.exit(1);
  });
  server.listen(port, "0.0.0.0", () =>
    console.log(`Server listening on port ${port}`)
  );
}
startServer().catch(error => {
  console.error(error);
  process.exit(1);
});
