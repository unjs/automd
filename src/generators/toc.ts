import { readFile } from "node:fs/promises";
import { md } from "mdbox";
import { initMdAstParser } from "mdbox/parser";
import type { ParsedTree } from "mdbox/parser";
import { fileURLToPath } from "mlly";
import { defineGenerator } from "../generator";
import { slug } from "github-slugger";

function getTextContentFromAst(tree: ParsedTree): string {
  let content = "";
  for (const node of tree) {
    if (typeof node === "string") {
      content += node;
      continue;
    }
    content += getTextContentFromAst(node.children ?? []);
  }
  return content;
}

export const toc = defineGenerator({
  name: "toc",
  async generate({ args, url }) {
    const minLevel: number = args.minLevel ?? 2;
    const maxLevel: number = args.maxLevel ?? 3;

    if (url === undefined) {
      throw new Error("URL is required for toc generator");
    }

    const contents = await readFile(fileURLToPath(url), "utf8");
    const parser = await initMdAstParser();
    const { tree } = parser.parse(contents);

    console.log(JSON.stringify(tree, undefined, 2));

    const toc = [];
    const allowedNodeTypes = new Set(
      ["h1", "h2", "h3", "h4", "h5", "h6"].slice(minLevel - 1, maxLevel),
    );
    for (const node of tree) {
      if (typeof node === "string") {
        continue;
      }
      if (allowedNodeTypes.has(node.type)) {
        toc.push({
          level: Number.parseInt(node.type.slice(1)) - minLevel,
          text: getTextContentFromAst(node.children ?? []),
        });
      }
    }

    const tocMd = toc
      .map(({ level, text }) => {
        const content = md.link(`#${slug(text)}`, text);
        return `${"  ".repeat(level)}- ${content}`;
      })
      .join("\n");

    return {
      contents: tocMd,
    };
  },
});
