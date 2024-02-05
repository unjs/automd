import { resolve } from "node:path";
import { loadSchema } from "untyped/loader";
import type { Schema } from "untyped";
import { defineGenerator } from "../generator";

export default defineGenerator({
  name: "api",
  async generate({ options, args }) {
    const entryPath = resolve(options.dir, args.src || "./src/index");

    const schema = await loadSchema(entryPath);

    return {
      contents: renderSchema(schema, {
        headingLevel: Number.parseInt(args.headingLevel) || 3,
      }),
    };
  },
});

function renderSchema(schema: Schema, opts: { headingLevel: number }) {
  const md: string[] = [];
  for (const [name, meta] of Object.entries(schema.properties || {})) {
    // Only functions
    if (meta.type !== "function") {
      continue;
    }

    // Parse tag annotations
    const tags = parseTags(meta.tags);

    // Ignore deprecated and intenral functions
    if (tags.some((t) => t.tag === "@deprecated" || t.tag === "@internal")) {
      continue;
    }

    const jsSig = `${name}(${(meta.args || []).map((arg) => arg.name).join(", ")})`;

    md.push(`${"#".repeat(opts.headingLevel)} \`${jsSig}\``, "");

    if (meta.title) {
      md.push(meta.title.trim());
    }
    if (meta.description) {
      md.push("", meta.description.trim());
    }

    for (const tag of tags) {
      if (tag.tag === "@example") {
        const codeBlock = tag.contents.startsWith("`")
          ? tag.contents
          : `\`\`\`ts\n${tag.contents}\n\`\`\``;
        md.push("", "**Example:**", "", codeBlock);
      }
    }

    md.push("");
  }

  return md.join("\n");
}

function parseTags(lines: string[] = []) {
  const parsedTags: { tag: string; contents: string }[] = [];

  let tag = "";
  let contentLines: string[] = [];

  for (const line of lines.join("\n").split("\n")) {
    if (line.startsWith("@")) {
      if (tag) {
        parsedTags.push({
          tag,
          contents: contentLines.join("\n"),
        });
      }
      const [_tag, ...rest] = line.split(" ");
      tag = _tag;
      contentLines = rest;
    } else {
      contentLines.push(line);
    }
  }

  if (tag) {
    parsedTags.push({ tag, contents: contentLines.join("\n") });
  }

  return parsedTags;
}
