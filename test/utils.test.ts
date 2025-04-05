import { resolvePath } from "../src/_utils";
import { expect, describe, it, vi } from "vitest";

describe("resolvePath", () => {
  it("when path startWith slash, return expected value", () => {
    const actual = resolvePath("/foo/bar", { dir: "/baz" });
    expect(actual).toBe("/baz/foo/bar");
  });

  it("when url undefined and path not startWith slash, resolve is called", () => {
    const actual = resolvePath("foo/bar", { dir: "/baz" });
    expect(actual).toBe("/baz/foo/bar");
  });

  it("when url defined and path not startWith slash, fileURLToPath is called", async () => {
    const fileURLToPathMock = await vi.hoisted(async () => {
      await import("mlly");
      return vi.fn();
    });
    vi.mock(import("mlly"), async (importOriginal) => {
      const actual = await importOriginal();
      return {
        ...actual,
        fileURLToPath: fileURLToPathMock,
      };
    });

    resolvePath("foo/bar", {
      url: "http://example.com",
      dir: "/baz",
    });

    expect(fileURLToPathMock).toHaveBeenCalledOnce();
    expect(fileURLToPathMock).toHaveBeenCalledWith(
      new URL("foo/bar", "http://example.com"),
    );
  });
});
