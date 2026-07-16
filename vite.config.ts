import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  fmt: {
    ignorePatterns: ["**/routeTree.gen.ts", ".agents/**", ".claude/**"],
  },
  lint: {
    ignorePatterns: [".agents/**", ".claude/**"],
    options: { typeAware: true, typeCheck: true },
  },
  run: {
    cache: true,
  },
});
