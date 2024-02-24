import { readFile } from "node:fs/promises";
import { basename, extname } from "pathe";
import { codeBlock } from "omark";
import { defineGenerator } from "../generator";
import { resolvePath } from "../_utils";

export const file = defineGenerator({
  name: "file",
  async generate({ args, config, url }) {
    const fullPath = resolvePath(args.src, { url, dir: config.dir });
    let contents = await readFile(fullPath, "utf8");

    if (args.code) {
      contents = codeBlock(contents, args.lang || extname(fullPath).slice(1), {
        // prettier-ignore
        ext: args.name === false ? undefined : (typeof args.name === 'string' ? args.name : `[${basename(fullPath)}]`),
      });
    }

    return {
      contents,
    };
  },
});
