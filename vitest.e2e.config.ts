/// <reference types="vitest" />

import path from "path"
import { defineConfig } from "vitest/config"

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "node",
    include: ["src/tests/e2e/**/*.{spec,test}.ts"],
    exclude: ["node_modules", "dist"],
    globalSetup: "./src/tests/e2e/config/global-setup.ts",
    setupFiles: ["./src/tests/e2e/config/setup.ts"],
    testTimeout: 20000,
    hookTimeout: 20000,
    pool: "forks",
    forkOptions: {
      singleFork: true,
    },
  },
})
