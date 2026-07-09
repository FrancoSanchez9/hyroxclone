import path from "node:path";
import { defineConfig } from "vite-plus";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// ponytail: react()/tailwindcss() cast to any below — they ship a Plugin type
// from a different vite version; type-aware lint chokes ("excessive stack
// depth") unifying the array. Drop the casts if plugin versions align.
export default defineConfig({
  plugins: [
    tailwindcss() as any,
    tanstackStart({
      srcDirectory: "src",
      router: {
        // Paths are resolved relative to `srcDirectory` above — no `src/` prefix,
        // or the generator scans `src/src/routes`.
        routesDirectory: "routes",
        generatedRouteTree: "routeTree.gen.ts",
      },
    }) as any,
    react() as any,
    nitro() as any,
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
    // Force a single React instance across the SSR bundle. A hard `react` alias
    // resolved to the symlink path while @tanstack/react-router resolved to the
    // real `.bun/react@…` path — two module instances — so every hook threw
    // "Cannot read properties of null (reading 'useState')" during SSR. `dedupe`
    // canonicalizes by package name so the renderer and components share React.
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
  fmt: { ignore: ["src/routeTree.gen.ts"] },
  lint: { options: { typeAware: true, typeCheck: true } },
});
