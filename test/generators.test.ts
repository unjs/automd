import { fileURLToPath } from "node:url";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { expect, it } from "vitest";
import { transform } from "../src/transform";

it("generator snapshots", async () => {
  const fixtureDir = fileURLToPath(new URL("fixture", import.meta.url));

  const input = await readFile(join(fixtureDir, "INPUT.md"), "utf8");
  const result = await transform(input, { dir: fixtureDir });

  expect(result.contents).toMatchFileSnapshot(`fixture/OUTPUT.md`);
});
