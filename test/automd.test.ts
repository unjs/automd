import { fileURLToPath } from "node:url";
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
});
