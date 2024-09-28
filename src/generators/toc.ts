import { readFile } from "node:fs/promises";
import { fileURLToPath } from "mlly";
import { defineGenerator } from "../generator";

export const toc = defineGenerator({
  name: "toc",
  async generate({ args, url }) {
    const minLevel = args.minLevel ?? 2;
    const maxLevel = args.maxLevel ?? 3;

    if (url === undefined) {
      throw new Error("URL is required for toc generator");
    }

    const contents = await readFile(fileURLToPath(url), "utf8");
    const headingLines = contents
      .split("\n")
      .filter((line) => line.startsWith("#"));

    const lines: string[] = [];

    for (const line of headingLines) {
      const match = line.match(/^(#+)\s+(.*)$/);
      if (match === null) {
        continue;
      }

      const [, hashes, text] = match;
      const currentLevel = hashes.length;
      if (currentLevel < minLevel || currentLevel > maxLevel) {
        continue;
      }

      const indent = "  ".repeat(currentLevel - minLevel);
      lines.push(`${indent}- ${text}`);
    }

    return {
      contents: lines.join("\n"),
    };
  },
});
