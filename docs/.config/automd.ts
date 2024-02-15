import { defineGenerator, type Config } from "../../src";

export default <Config>{
  generators: {
    example: defineGenerator({
      name: "example",
      async generate({ args, transform }) {
        const { generator, ...generatorArgs } = args;

        const argsString = Object.entries(generatorArgs)
          .map(([k, v]) => `${k}=${v}`)
          .join(" ");

        const input = `<!-- automd:${generator} ${argsString} -->\n<!-- /automd -->`;
        const output = (await transform(input)).contents;
        return {
          contents: `## Example\n\n### Input\n\n${_mdCode(input)}\n\n### Output\n\n${_mdCode(output)}`,
        };
      },
    }),
  },
};

function _mdCode(md: string) {
  return md
    .split("\n")
    .map((l) => `    ${l}`)
    .join("\n");
}
