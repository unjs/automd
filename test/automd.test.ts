import { execFile } from "node:child_process";
import { promises as fsp } from "node:fs";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { join } from "pathe";
import { afterEach, expect, describe, it } from "vitest";
import { format } from "prettier";
import { resolveCliInputs } from "../src/_utils.ts";
import { automd } from "../src/index.ts";

const execFileAsync = promisify(execFile);
const cliPath = fileURLToPath(new URL("../src/cli.ts", import.meta.url));
const tempDirs: string[] = [];

async function createTempDir(): Promise<string> {
  const dir = await fsp.mkdtemp(join(tmpdir(), "automd-test-"));
  tempDirs.push(dir);
  return dir;
}

afterEach(async () => {
  await Promise.all(
    tempDirs.splice(0).map((dir) => fsp.rm(dir, { recursive: true, force: true })),
  );
});

describe("automd generators", () => {
  let output: string;

  it("run on fixture", async () => {
    const { results } = await automd({
      dir: fileURLToPath(new URL("fixture", import.meta.url)),
      input: "INPUT.md",
      output: "OUTPUT.md",
    });
    output = results[0]!.contents;
    await expect(output).toMatchFileSnapshot(`fixture/OUTPUT.md`);

    const issues = results
      .flatMap((r) => r.updates.flatMap((u) => u.result.issues))
      .filter(Boolean);
    expect(issues).toEqual([]);
  });

  it("is formatted", async () => {
    expect(await format(output, { parser: "markdown" })).toEqual(output);
  });
});

describe("resolveCliInputs", () => {
  it("collects shell-expanded positional files after --input", () => {
    expect(
      resolveCliInputs(
        { input: "content/1.intro.md", _: ["content/2.guide.md", "content/3.api.md"] },
        ["--input", "content/1.intro.md", "content/2.guide.md", "content/3.api.md"],
      ),
    ).toEqual(["content/1.intro.md", "content/2.guide.md", "content/3.api.md"]);
  });

  it("supports repeated --input flags, comma lists, and brace globs", () => {
    expect(
      resolveCliInputs(
        { input: "b.md", _: ["extra.md"] },
        ["--dir", "docs", "--input", "a.md, b.md", "--input=content/**/*.{md,mdc}", "--", "extra.md"],
      ),
    ).toEqual(["a.md", "b.md", "content/**/*.{md,mdc}", "extra.md"]);
  });

  it("supports positional inputs and returns undefined when none are given", () => {
    expect(resolveCliInputs({ _: ["a.md", "b.md"] }, ["a.md", "b.md"])).toEqual(["a.md", "b.md"]);
    expect(resolveCliInputs({ _: [] }, [])).toBeUndefined();
  });

  it("preserves commas inside character classes, escaped commas, positional paths, and existing files", async () => {
    const dir = await createTempDir();
    await fsp.writeFile(join(dir, "release,notes.md"), "# Release\n", "utf8");

    expect(
      resolveCliInputs(
        { dir, input: "release,notes.md", _: ["docs/other,file.md"] },
        ["--dir", dir, "--input", "release,notes.md", "--input", "docs/report[12,].md, a\\,b.md", "docs/other,file.md"],
      ),
    ).toEqual(["release,notes.md", "docs/report[12,].md", "a\\,b.md", "docs/other,file.md"]);
  });
});

describe("automd input patterns and CLI", () => {
  it.skipIf(process.platform === "win32")(
    "preserves whitespace in exact CLI filenames",
    async () => {
      const dir = await createTempDir();
      const first = " leading.md";
      const second = "trailing.md ";
      const template = '<!-- automd:file src="/snippet.txt" -->\n<!-- /automd -->\n';
      await fsp.writeFile(join(dir, "snippet.txt"), "Exact path");
      await fsp.writeFile(join(dir, first), template);
      await fsp.writeFile(join(dir, second), template);

      await execFileAsync(process.execPath, [cliPath, "--dir", dir, "--input", first, second]);

      expect(await fsp.readFile(join(dir, first), "utf8")).toContain("Exact path");
      expect(await fsp.readFile(join(dir, second), "utf8")).toContain("Exact path");
    },
  );

  it("expands brace/wildcard globs, skips directories, and deduplicates files", async () => {
    const dir = await createTempDir();
    await fsp.mkdir(join(dir, "content/sub"), { recursive: true });
    await fsp.writeFile(join(dir, "snippet.txt"), "Hello world!", "utf8");
    await fsp.writeFile(
      join(dir, "content/a.md"),
      '<!-- automd:file src="/snippet.txt" -->\n<!-- /automd -->\n',
      "utf8",
    );
    await fsp.writeFile(
      join(dir, "content/sub/b.mdc"),
      '<!-- automd:file src="/snippet.txt" -->\n<!-- /automd -->\n',
      "utf8",
    );

    const { results } = await automd({
      dir,
      input: ["content/sub", "content/a.md", "content/**/*.{md,mdc}"],
    });

    expect(results).toHaveLength(2);
    expect(await fsp.readFile(join(dir, "content/a.md"), "utf8")).toContain("Hello world!");
    expect(await fsp.readFile(join(dir, "content/sub/b.mdc"), "utf8")).toContain("Hello world!");
  });

  it("applies ignore patterns across mixed literal and glob batches and supports escaped brackets", async () => {
    const dir = await createTempDir();
    await fsp.mkdir(join(dir, "docs/private"), { recursive: true });
    await fsp.writeFile(join(dir, "snippet.txt"), "Included!", "utf8");
    await fsp.writeFile(
      join(dir, "docs/report[final]-v1.md"),
      '<!-- automd:file src="/snippet.txt" -->\n<!-- /automd -->\n',
      "utf8",
    );
    await fsp.writeFile(
      join(dir, "docs/private/draft.md"),
      '<!-- automd:file src="/snippet.txt" -->\n<!-- /automd -->\n',
      "utf8",
    );

    const { results } = await automd({
      dir,
      input: ["docs/report\\[final\\]*.md", "docs/private/draft.md"],
      ignore: ["docs/private/**"],
    });

    expect(results).toHaveLength(1);
    expect(await fsp.readFile(join(dir, "docs/report[final]-v1.md"), "utf8")).toContain("Included!");
    expect(await fsp.readFile(join(dir, "docs/private/draft.md"), "utf8")).not.toContain("Included!");
  });

  it("replaces configured input list when CLI or override inputs are provided and guards multi-file output", async () => {
    const parentDir = await createTempDir();
    const dir = join(parentDir, "project");
    await fsp.mkdir(dir, { recursive: true });
    await fsp.writeFile(join(dir, "snippet.txt"), "Override!", "utf8");
    await fsp.writeFile(
      join(dir, "automd.config.mjs"),
      'export default { input: ["all.md"] };\n',
      "utf8",
    );
    await fsp.writeFile(join(dir, "all.md"), '<!-- automd:file src="/snippet.txt" -->\n<!-- /automd -->\n', "utf8");
    await fsp.writeFile(join(dir, "one.md"), '<!-- automd:file src="/snippet.txt" -->\n<!-- /automd -->\n', "utf8");
    await fsp.writeFile(join(parentDir, "outside.md"), "# Outside\n", "utf8");

    await execFileAsync(process.execPath, [cliPath, "--dir", dir, "one.md"]);

    expect(await fsp.readFile(join(dir, "one.md"), "utf8")).toContain("Override!");
    expect(await fsp.readFile(join(dir, "all.md"), "utf8")).not.toContain("Override!");

    await expect(
      automd({
        dir,
        input: ["one.md", "../outside.md"],
        output: "generated",
      }),
    ).rejects.toThrow(/resolves outside output directory/);
  });

  it("processes all shell-expanded CLI inputs and ignores directory entries without EISDIR", async () => {
    const dir = await createTempDir();
    await fsp.mkdir(join(dir, "content/1.getting-started"), { recursive: true });
    await fsp.mkdir(join(dir, "content/2.guide"), { recursive: true });
    await fsp.writeFile(join(dir, "snippet.txt"), "CLI snippet!", "utf8");

    const intro = join(dir, "content/1.getting-started/1.introduction.md");
    const usage = join(dir, "content/2.guide/1.usage.md");
    await fsp.writeFile(intro, '<!-- automd:file src="/snippet.txt" -->\n<!-- /automd -->\n', "utf8");
    await fsp.writeFile(usage, '<!-- automd:file src="/snippet.txt" -->\n<!-- /automd -->\n', "utf8");

    await execFileAsync(process.execPath, [
      cliPath,
      "--dir",
      dir,
      "--input",
      "content/1.getting-started",
      "content/1.getting-started/1.introduction.md",
      "content/2.guide/1.usage.md",
    ]);

    expect(await fsp.readFile(intro, "utf8")).toContain("CLI snippet!");
    expect(await fsp.readFile(usage, "utf8")).toContain("CLI snippet!");
  });
});
