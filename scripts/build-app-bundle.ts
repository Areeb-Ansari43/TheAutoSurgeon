// Rebuilds the stable Cloudflare Pages bundle (client/public/assets/app.js + app.css)
// from client/src/main.tsx. client/index.html loads these fixed filenames, so run
// this after any change to client/src before committing or deploying.
import fs from "node:fs/promises";
import path from "node:path";
import { build } from "vite";

const root = path.resolve(import.meta.dirname, "..");
const outDir = path.join(root, "node_modules", ".app-bundle");
const target = path.join(root, "client", "public", "assets");

await build({
  configFile: path.join(root, "vite.config.ts"),
  mode: "production",
  publicDir: false,
  logLevel: "warn",
  build: {
    outDir,
    emptyOutDir: true,
    cssCodeSplit: false,
    rollupOptions: {
      input: path.join(root, "client", "src", "main.tsx"),
      output: {
        inlineDynamicImports: true,
        entryFileNames: "app.js",
        assetFileNames: info =>
          info.names?.some(name => name.endsWith(".css"))
            ? "app.css"
            : "assets/[name]-[hash][extname]",
      },
    },
  },
});

for (const file of ["app.js", "app.css"]) {
  await fs.copyFile(path.join(outDir, file), path.join(target, file));
  const { size } = await fs.stat(path.join(target, file));
  console.log(`client/public/assets/${file}  ${(size / 1024).toFixed(1)} kB`);
}
