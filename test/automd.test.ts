import { fileURLToPath } from "node:url";
import { expect, it } from "vitest";
import { automd } from "../src";

it("automd generators", async () => {
  const [result] = await automd({
    dir: fileURLToPath(new URL("fixture", import.meta.url)),
    input: "INPUT.md",
    output: "OUTPUT.md",
  });

  expect(result.contents).toMatchFileSnapshot(`fixture/OUTPUT.md`);
});
