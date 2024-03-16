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

    if (args.lines) {
      if (!/^(\d+)?:(\d+)?$/.test(args.lines)) {
        throw new Error("invalid lines format");
      }

      const [_startLine, _endLine] = args.lines.split(":");

      const lines = contents.split("\n");

      const startLine = _startLine === "" ? 0 : Number(_startLine);
      const endLine = _endLine === "" ? lines.length : Number(_endLine);

      if (startLine < 1) {
        throw new Error("first line's index can not be smaller than 1");
      }
      if (endLine > lines.length) {
        throw new Error(
          `line ${endLine} was specified while file ${fullPath} has only ${lines.length} lines`,
        );
      }

      contents = lines.slice(startLine - 1, endLine - 1).join("\n");
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
