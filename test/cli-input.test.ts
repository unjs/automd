import { describe, expect, it } from "vitest";
import { normalizeCliInput } from "../src/cli-input.ts";

describe("normalizeCliInput", () => {
  it("keeps shell-expanded input arguments", () => {
    expect(normalizeCliInput("content/a.md", ["content/b.md"])).toEqual([
      "content/a.md",
      "content/b.md",
    ]);
  });

  it("splits comma-separated input values", () => {
    expect(normalizeCliInput("content/a.md, content/b.md")).toEqual([
      "content/a.md",
      "content/b.md",
    ]);
  });
});
