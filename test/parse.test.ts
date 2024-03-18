import { resolve } from "node:path";
import { describe, it, expect } from "vitest";
import { parseRawArgs, findBlocks } from "../src/_parse";
import { transform } from "../src/transform";

describe("parseRawArgs", () => {
  const tests = [
    [`foo`, { foo: true }],
    [`no-foo`, { foo: false }],
    [`foo="bar"`, { foo: "bar" }],
    [`foo=bar`, { foo: "bar" }],
    [
      `a-key=a-value another-key=another-value`,
      { aKey: "a-value", anotherKey: "another-value" },
    ],
  ] as const;
  for (const [input, expected] of tests) {
    it(`${JSON.stringify(input)} => ${JSON.stringify(expected)}`, () => {
      expect(parseRawArgs(input)).toEqual(expected);
    });
  }
});

describe("findBlocks", () => {
  const fixture = `
<!-- automd:pm-x args=. -->
(a)
<!-- /automd -->

<!-- automd:pm-install dev no-auto -->
(b)
<!-- /automd -->

<!-- automd:jsdocs -->
(c)
<!-- /automd -->
  `;

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const mkBlock = (generator: string, rawArgs: string, contents: string) => ({
    generator,
    rawArgs,
    contents: expect.stringContaining(contents),
    loc: { start: expect.any(Number), end: expect.any(Number) },
  });

  it("should find all blocks", () => {
    const blocks = findBlocks(fixture);
    expect(blocks[0]).toMatchObject(mkBlock("pm-x", "args=.", "(a)"));
    expect(blocks[1]).toMatchObject(
      mkBlock("pm-install", "dev no-auto", "(b)"),
    );
    expect(blocks[2]).toMatchObject(mkBlock("jsdocs", "", "(c)"));
  });
});

describe("transform with alias", () => {
  it("should parse alias correctly in jsdoc", async () => {
    const input = `<!-- automd:jsdocs src="~/fixture/src/example" -->\n\n<!-- /automd -->`;

    const result = await transform(input, {
      alias: {
        "~": resolve("./test"),
      },
    });

    expect(result.contents).toMatchInlineSnapshot(`
      "<!-- automd:jsdocs src="~/fixture/src/example" -->

      ### \`add(a, b)\`

      Adds two numbers together.

      **Example:**

      \`\`\`js
      add(1, 2); // 3
      \`\`\`

      ### \`object\`

      #### \`key\`

      An object key

      ##### \`subkey\`

      - **Type**: \`string\`
      - **Default**: \`"value"\`

      A subkey

      <!-- /automd -->"
    `);
  });

  it("should parse alias correctly in file", async () => {
    const input = `<!-- automd:file src="~/fixture/TEST.md" -->\n\n<!-- /automd -->`;

    const result = await transform(input, {
      alias: {
        "~": resolve("./test"),
      },
    });

    expect(result.contents).toMatchInlineSnapshot(`
      "<!-- automd:file src="~/fixture/TEST.md" -->

      ## The Lazy Coder's Guide to Programming

      Programming can be hard. But fear not! With the power of copy-paste, you can conquer any coding challenge without breaking a sweat. Just remember: if it works once, it'll work a thousand times. Who needs original code anyway?

      When your code doesn't work, don't blame yourself. It's clearly the compiler's fault for not understanding your genius. Remember, the more error messages you get, the closer you are to becoming a programming master.

      Why waste time solving problems when someone else has already done it for you? Stack Overflow is your best friend, your mentor, and your savior. Just make sure to upvote the answers that save your bacon.

      <!-- /automd -->"
    `);
  });
});
