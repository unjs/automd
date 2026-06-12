import { fileURLToPath } from "node:url";
import { promises as fsp } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { expect, describe, it } from "vitest";
import { format } from "prettier";
import { automd } from "../src/index.ts";

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

  it("ignores directories from expanded input lists", async () => {
    const dir = await fsp.mkdtemp(join(tmpdir(), "automd-dir-input-"));

    try {
      await fsp.copyFile(
        fileURLToPath(new URL("fixture/INPUT.md", import.meta.url)),
        join(dir, "INPUT.md"),
      );
      await fsp.mkdir(join(dir, "src"));

      const { results } = await automd({
        dir,
        input: ["INPUT.md", "src"],
      });

      expect(results).toHaveLength(1);
      expect(results[0]!.input).toBe(join(dir, "INPUT.md"));
    } finally {
      await fsp.rm(dir, { recursive: true, force: true });
    }
  });
});
