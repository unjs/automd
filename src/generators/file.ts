import { readFile } from "node:fs/promises";
import { basename, extname } from "pathe";
import { md } from "mdbox";
import { defineGenerator } from "../generator";
import { resolvePath } from "../_utils";

export const file = defineGenerator({
  name: "file",
  async generate({ args, config, url }) {
    const fullPath = resolvePath(args.src, { url, dir: config.dir });
    let contents = await readFile(fullPath, "utf8");
    if (!args.noTrim) {
      contents = contents.trim();
    }

    if (args.lines) {
      const groups = /^(?<startLine>\d+)?:(?<endLine>\d+)?$/.exec(args.lines)?.groups;

      if (!groups) {
        throw new Error("invalid lines format");
      }

      const lines = contents.split("\n");

      const startLine = Number(groups.startLine) || 1;
      const endLine = Number(groups.endLine) || (lines.length as number);

      if (startLine < 1) {
        throw new Error("first line's index can not be smaller than 1");
      }

      contents = lines.slice(startLine - 1, endLine).join("\n");
    }

    if (args.code) {
      contents = md.codeBlock(contents, args.lang || extname(fullPath).slice(1), {
        // prettier-ignore
        ext: args.name === false ? undefined : (typeof args.name === 'string' ? args.name : `[${basename(fullPath)}]`),
      });
    }

    return {
      contents,
    };
  },
});
