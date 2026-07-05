import path from "node:path";
import { defineConfig } from "vite-plus";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// ponytail: react()/tailwindcss() cast to any below — they ship a Plugin type
// from a different vite version; type-aware lint chokes ("excessive stack
// depth") unifying the array. Drop the casts if plugin versions align.
export default defineConfig({
  plugins: [
    TanStackRouterVite({
      routesDirectory: "./src/routes",
      generatedRouteTree: "./src/routeTree.gen.ts",
      autoCodeSplitting: true,
    }),
    react() as any,
    tailwindcss() as any,
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
      react: path.resolve(import.meta.dirname, "../../node_modules/react"),
      "react-dom": path.resolve(import.meta.dirname, "../../node_modules/react-dom"),
    },
  },
  fmt: { ignore: ["src/routeTree.gen.ts"] },
  lint: { options: { typeAware: true, typeCheck: true } },
});
