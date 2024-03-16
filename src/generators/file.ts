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

    if (args.fromLine) {
      if (args.fromLine < 0) {
        throw new Error("line index can not be smaller than 1");
      }
      if (!args.toLine) {
        throw new Error("fromLine exists but toLine is not defined");
      }

      const lines = contents.split("\n");
      if (args.toLine > lines.length) {
        throw new Error(
          `line ${args.toLine} exceeds the total line number of the file`,
        );
      }

      contents = lines.slice(args.fromLine - 1, args.toLine - 1).join("\n");
    }

    if (args.code) {
      contents = md.codeBlock(
        contents,
        args.lang || extname(fullPath).slice(1),
        {
          // prettier-ignore
          ext: args.name === false ? undefined : (typeof args.name === 'string' ? args.name : `[${basename(fullPath)}]`),
        },
      );
    }

    return {
      contents,
    };
  },
});
