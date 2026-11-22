// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { readFileSync } from "node:fs";

// Product detail pages: one per catalogue product id.
const PRODUCT_IDS = [...readFileSync("src/lib/products.ts", "utf8").matchAll(/^\s+id: "([^"]+)"/gm)].map((m) => m[1]);

// Static-hosting migration: the complete set of public URLs is prerendered to
// real HTML files at build time, so Apache/cPanel can serve the site with no
// Node.js at runtime. autoStaticPathsDiscovery is pinned off so this list is
// the exact prerender set — add a URL here when a new public route is created.
const PRERENDER_PATHS = [
  "/",
  "/category/bags",
  "/category/jewellery",
  "/category/party-clutch-bags",
  "/category/tote-bags",
  "/category/handbags",
  "/category/clutch-bags",
  "/category/potli-bags",
  "/category/earrings",
  "/category/jewellery-sets",
  "/category/bracelets",
  "/category/ethnic-jewellery",
  "/category/wedding-occasion-jewellery",
  "/category/watches",
  ...PRODUCT_IDS.map((id) => `/product/${id}`),
];

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    pages: PRERENDER_PATHS.map((path) => ({ path })),
    prerender: { enabled: true, autoStaticPathsDiscovery: false },
  },
});
