import { describe, it, expect } from "vitest";
import { transform } from "../src";

describe("transform", () => {
  it("basic transform works", async () => {
    const input = `
<!-- automd:test foo=bar -->
<!-- /automd -->
    `.trim();

    const result = await transform(input, {
      generators: {
        test: {
          name: "test",
          generate({ args }) {
            return { contents: JSON.stringify({ args }) };
          },
        },
      },
    });

    expect(result.hasChanged).toBe(true);
    expect(result.contents).toMatchInlineSnapshot(`
      "<!-- automd:test foo=bar -->

      {"args":{"foo":"bar"}}

      <!-- /automd -->"
    `);

    expect(result.updates).toHaveLength(1);
    expect(result.updates[0].block).toMatchInlineSnapshot(`
      {
        "contents": "
      ",
        "generator": "test",
        "loc": {
          "end": 29,
          "start": 28,
        },
        "rawArgs": "foo=bar",
      }
    `);
  });
});
