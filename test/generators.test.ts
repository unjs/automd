import { describe, it, expect, vi } from "vitest";
import { srcLink } from "../src/generators/src-link";


describe("src-link generator", () => {
  vi.mock("ofetch", () => ({
    $fetch: vi.fn().mockResolvedValue(`{
      "name": "nuxt-framework",
      "version": "1.0.0",
      "dependencies": {}
    }`),
  }));

  vi.mock('node:fs/promises', () => ({
    readFile: vi.fn().mockImplementation(() => ''),
  }));

  vi.mock('pathe', () => ({
    resolve: vi.fn().mockImplementation(() => ''),
  }));

  it("generates correct link for GitHub URL", async () => {
    const result = await srcLink.generate({
      args: {
        src: "gh:nuxt/framework/blob/main/package.json",
        pattern: "\"name\": \"nuxt-framework\"",
        label: "long live nuxt",
      },
      config: {} as any,
      block: {} as any,
      transform: async () => ({ contents: "", hasChanged: false, hasIssues: false, updates: [], time: 0 }),
    });

    expect(result.contents).toBe("[long live nuxt](https://github.com/nuxt/framework/blob/main/package.json#L2)");
  });

  it("generates correct link for GitHub URL with a Regex", async () => {
    const re = /name/;
    const result = await srcLink.generate({
      args: {
        src: "gh:nuxt/framework/blob/main/package.json",
        pattern: re.toString(),
        label: "long live nuxt",
      },
      config: {} as any,
      block: {} as any,
      transform: async () => ({ contents: "", hasChanged: false, hasIssues: false, updates: [], time: 0 }),
    });

    expect(result.contents).toBe("[long live nuxt](https://github.com/nuxt/framework/blob/main/package.json#L2)");
  });

  it("generates correct link for GitHub URL with multiple lines and Regex", async () => {
    const re = /"name"[^}]*"dependencies"/;
    const result = await srcLink.generate({
      args: {
        src: "gh:nuxt/framework/blob/main/package.json",
        pattern: re.toString(),
        label: "long live nuxt",
      },
      config: {} as any,
      block: {} as any,
      transform: async () => ({ contents: "", hasChanged: false, hasIssues: false, updates: [], time: 0 }),
    });

    expect(result.contents).toBe("[long live nuxt](https://github.com/nuxt/framework/blob/main/package.json#L2-L4)");
  });

  it("generates correct link for full GitHub URL", async () => {
    const result = await srcLink.generate({
      args: {
        src: "https://github.com/nuxt/framework/blob/main/package.json",
        pattern: "\"name\": \"nuxt-framework\"",
        label: "long live nuxt",
      },
      config: {} as any,
      block: {} as any,
      transform: async () => ({ contents: "", hasChanged: false, hasIssues: false, updates: [], time: 0 }),
    });

    expect(result.contents).toBe("[long live nuxt](https://github.com/nuxt/framework/blob/main/package.json#L2)");
  });

  it("appends link to file but not the line number if no pattern or multiple patterns are found", async () => {
    const resultNonExistent = await srcLink.generate({
      args: {
        src: "gh:nuxt/framework/blob/main/package.json",
        pattern: "NonexistentPattern",
        label: "long live nuxt",
      },
      config: {} as any,
      block: {} as any,
      transform: async () => ({ contents: "", hasChanged: false, hasIssues: false, updates: [], time: 0 }),
    });

    expect(resultNonExistent.contents).toBe("[long live nuxt](https://github.com/nuxt/framework/blob/main/package.json)");

    const resultMultipleResults = await srcLink.generate({
      args: {
        src: "gh:nuxt/framework/blob/main/package.json",
        pattern: "\n",
        label: "long live nuxt",
      },
      config: {} as any,
      block: {} as any,
      transform: async () => ({ contents: "", hasChanged: false, hasIssues: false, updates: [], time: 0 }),
    });

    expect(resultMultipleResults.contents).toBe("[long live nuxt](https://github.com/nuxt/framework/blob/main/package.json)");
  });

  it("throws error when required arguments are missing", async () => {
    await expect(srcLink.generate({
      args: {},
      config: {} as any,
      block: {} as any,
      transform: async () => ({ contents: "", hasChanged: false, hasIssues: false, updates: [], time: 0 }),
    })).rejects.toThrow("src, pattern, and label are required arguments");
  });

  it("generates correct link using highlight API for non-GitHub URL", async () => {
    const result = await srcLink.generate({
      args: {
        src: "https://example.com/some-page",
        pattern: "highlighted text",
        label: "Check this out",
      },
      config: {} as any,
      block: {} as any,
      url: "",
      transform: async () => ({ contents: "", hasChanged: false, hasIssues: false, updates: [], time: 0 }),
    });

    const expectedUrl = `https://example.com/some-page#:~:text=${encodeURIComponent(
      "highlighted text"
    )}`;
    expect(result.contents).toBe(`[Check this out](${expectedUrl})`);
  });

  it("generates correct link for local file", async () => {
    const mockReadFile = vi
      .spyOn(await import("node:fs/promises"), "readFile")
      .mockResolvedValue("line1\nline2\nline3\npattern line\nline5");

    const mockResolve = vi.spyOn(await import("pathe"), "resolve").mockImplementation(() => "/mocked/path/to/local/file");

    const result = await srcLink.generate({
      args: {
        src: "/path/to/local/file",
        pattern: "pattern line",
        label: "Local File Label",
      },
      url: "/current/directory", // Simulate current directory
      config: {} as any,
      block: {} as any,
      transform: async () => ({
        contents: "",
        hasChanged: false,
        hasIssues: false,
        updates: [],
        time: 0,
      }),
    });

    expect(mockReadFile).toHaveBeenCalledWith("/mocked/path/to/local/file", "utf8");
    expect(result.contents).toBe("[Local File Label](/path/to/local/file:4)");

    mockReadFile.mockRestore();
    mockResolve.mockRestore();
  });

  it("handles local file read error gracefully", async () => {
    const mockReadFile = vi
      .spyOn(await import("node:fs/promises"), "readFile")
      .mockRejectedValue(new Error("File not found"));

    const result = await srcLink.generate({
      args: {
        src: "/non/existent/file",
        pattern: "pattern",
        label: "Missing File",
      },
      url: "/current/directory",
      config: {} as any,
      block: {} as any,
      transform: async () => ({
        contents: "",
        hasChanged: false,
        hasIssues: false,
        updates: [],
        time: 0,
      }),
    });

    expect(result.contents).toBe("[Missing File](/non/existent/file)");

    mockReadFile.mockRestore();
  });
});