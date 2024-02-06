import { resolve } from "node:path";
import { loadSchema } from "untyped/loader";
import type { Schema } from "untyped";
import { upperFirst } from "scule";
import { defineGenerator } from "../generator";

export default defineGenerator({
  name: "jsdocs",
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
  const sections = Object.create(null) as Record<string, [string, string[]][]>;

  for (const [name, meta] of Object.entries(schema.properties || {})) {
    // Only functions
    if (
      meta.type !== "function" ||
      meta.default?.toString?.().startsWith("class")
    ) {
      continue;
    }

    const lines: string[] = [];

    // Parse tag annotations
    const tags = parseTags(meta.tags);

    // Ignore deprecated and intenral functions
    if (tags.some((t) => t.tag === "@deprecated" || t.tag === "@internal")) {
      continue;
    }

    const jsSig = `${name}(${(meta.args || []).map((arg) => arg.name).join(", ")})`;

    lines.push(`${"#".repeat(opts.headingLevel + 1)} \`${jsSig}\``, "");

    if (meta.title) {
      lines.push(meta.title.trim());
    }
    if (meta.description) {
      lines.push("", meta.description.trim());
    }

    for (const tag of tags) {
      if (tag.tag === "@example") {
        const codeBlock = tag.contents.startsWith("`")
          ? tag.contents
          : `\`\`\`ts\n${tag.contents}\n\`\`\``;
        lines.push("", "**Example:**", "", codeBlock);
      }
    }

    lines.push("");

    const group = tags.find((t) => t.tag === "@group")?.contents || "";
    sections[group] = sections[group] || [];
    sections[group].push([name, lines]);
  }

  const lines: string[] = [];
  for (const group of Object.keys(sections).sort((a, b) => {
    if (a === "") {
      return 1;
    }
    if (b === "") {
      return -1;
    }
    return a.localeCompare(b);
  })) {
    if (group) {
      lines.push(`${"#".repeat(opts.headingLevel)} ${upperFirst(group)}`, "");
    }
    for (const item of sections[group].sort((i1, i2) =>
      i1[0].localeCompare(i2[0]),
    )) {
      lines.push(...item[1]);
    }
  }

  return lines.join("\n");
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
