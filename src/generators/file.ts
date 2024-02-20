import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { defineGenerator } from "../generator";

export const file = defineGenerator({
  name: "file",
  async generate({ args, config }) {
    const fullPath = resolve(config.dir, args.src);
    const contents = await readFile(fullPath, "utf8");

    return {
      contents,
    };
  },
});
