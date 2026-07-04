import { fileURLToPath } from "node:url";
import react from "@astrojs/react";
import keystatic from "@keystatic/astro";
import { defineConfig } from "astro/config";

const viteCacheDir = fileURLToPath(new URL("./vite-cache/", import.meta.url));
const isDevCommand = process.argv.includes("dev") || process.env.npm_lifecycle_event === "dev";

export default defineConfig({
  output: "static",
  integrations: [react(), ...(isDevCommand ? [keystatic()] : [])],
  build: { format: "directory" },
  vite: {
    cacheDir: viteCacheDir,
    ...(isDevCommand ? {} : { optimizeDeps: { noDiscovery: true, include: [], exclude: [] } })
  }
});
