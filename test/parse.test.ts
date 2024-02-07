import { describe, it, expect } from "vitest";
import { parseRawArgs, findAutoMdBlocks } from "../src/_parse";

describe("parseRawArgs", () => {
  const tests = [[`foo="bar"`, { foo: "bar" }]] as const;
  for (const [input, expected] of tests) {
    it(`${input} => ${JSON.stringify(expected)}`, () => {
      expect(parseRawArgs(input)).toEqual(expected);
    });
  }
});

describe("findAutoMdBlocks", () => {
  const fixture = `
<!-- AUTOMD_START generator="pm-x" args="." -->
<!-- AUTOMD_END -->

<!-- AUTOMD_START generator="pm-install" dev="true" -->
<!-- AUTOMD_END -->

<!-- AUTOMD_START generator="jsdocs" -->
<!-- AUTOMD_END -->
  `;

  it("should find all blocks", () => {
    expect(findAutoMdBlocks(fixture)).toMatchInlineSnapshot(`
      [
        {
          "contents": "
      ",
          "loc": {
            "end": 49,
            "start": 48,
          },
          "rawArgs": "generator="pm-x" args="."",
        },
        {
          "contents": "
      ",
          "loc": {
            "end": 126,
            "start": 125,
          },
          "rawArgs": "generator="pm-install" dev="true"",
        },
        {
          "contents": "
      ",
          "loc": {
            "end": 188,
            "start": 187,
          },
          "rawArgs": "generator="jsdocs"",
        },
      ]
    `);
  });
});
