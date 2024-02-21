import { readFile } from "node:fs/promises";
import { defineGenerator } from "../generator";
import { resolvePath } from "../_utils";

export const file = defineGenerator({
  name: "file",
  async generate({ args, config, url }) {
    const fullPath = resolvePath(args.src, { url, dir: config.dir });
    const contents = await readFile(fullPath, "utf8");

    return {
      contents,
    };
  },
});
