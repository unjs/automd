import { describe, it, expect } from "vitest";
import { transform } from "../src";

describe("transform", () => {
  it("basic transform works", async () => {
    const input = `<!-- automd:test foo=bar -->\n\n<!-- /automd -->`;

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
        "_loc": {
          "end": 46,
          "start": 0,
        },
        "contents": "

      ",
        "generator": "test",
        "loc": {
          "end": 30,
          "start": 28,
        },
        "rawArgs": "foo=bar",
      }
    `);
  });

  describe("unwrap", () => {
    it("manual unwrap", async () => {
      const input = `foo\n<!-- automd:test -->\n<!-- /automd -->\nbaz`;

      const result = await transform(input, {
        generators: {
          test: {
            name: "test",
            generate() {
              return {
                contents: `bar`,
                unwrap: true,
              };
            },
          },
        },
      });

      expect(result.contents).toMatchInlineSnapshot(`
        "foo
        bar
        baz"
      `);
    });
    it("auto unwrap", async () => {
      const input = `a\n<!-- automd:test -->\n<!-- /automd -->\nd`;

      const result = await transform(input, {
        generators: {
          test: {
            name: "test",
            generate() {
              return {
                contents: `b\n<!-- automd:with-automd lastUpdate=now -->\n<!-- /automd -->\nc`,
              };
            },
          },
        },
      });

      expect(result.contents).toMatchInlineSnapshot(`
        "a
        b
        <!-- automd:with-automd lastUpdate=now -->

        _🤖 docs are auto updated with [automd](https:/automd.unjs.io) (last updated: now)_

        <!-- /automd -->
        c
        d"
      `);
    });
  });
});
