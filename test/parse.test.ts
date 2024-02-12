import { describe, it, expect } from "vitest";
import { parseRawArgs, findBlocks } from "../src/_parse";

describe("parseRawArgs", () => {
  const tests = [
    [`foo`, { foo: true }],
    [`no-foo`, { foo: false }],
    [`foo="bar"`, { foo: "bar" }],
    [`foo=bar`, { foo: "bar" }],
    [
      `a-key=a-value another-key=another-value`,
      { "a-key": "a-value", "another-key": "another-value" },
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
