import type { Config } from "../src";

export default <Config>{
  input: ["README.md", "docs/**/*.md"],
  ignore: ["test/fixture/**"],
  generators: {
    example: {
      name: "example",
      async generate({ args, transform }) {
        const { generator, ...generatorArgs } = args;

        const argsString = Object.entries(generatorArgs)
          .map(([k, v]) => {
            if (v === true) {
              return k;
            }
            if (v === false) {
              return k.startsWith("no-") ? k.slice(3) : `no-${k}`;
            }
            return `${k}=${JSON.stringify(v)}`;
          })
          .join(" ")
          .trim();

        const input = `<!-- automd:${generator}${argsString ? ` ${argsString}` : ""} -->\n<!-- /automd -->`;
        const output = (await transform(input)).contents;
        return {
          contents: `### Input\n\n${_mdCode(input)}\n\n### Output\n\n${_mdCode(output)}`,
        };
      },
    },
  },
};

function _mdCode(md: string) {
  return md
    .split("\n")
    .map((l) => {
      l = l.trim();
      return l ? `    ${l}` : "";
    })
    .join("\n");
}
