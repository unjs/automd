import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globalSetup: "./test/_setup.ts",
  },
});
