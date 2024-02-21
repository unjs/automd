import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    reporters: ["hanging-process"],
    // globalSetup: "./test/_setup.ts",
  },
});
