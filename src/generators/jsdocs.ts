import type { Schema } from "untyped";
import { resolve } from "pathe";
import { titleCase } from "scule";
import { defineGenerator } from "../generator";

export const jsdocs = defineGenerator({
  name: "jsdocs",
  async generate({ config, args }) {
    const { loadSchema } = await import("untyped/loader");

    const entryPath = resolve(config.dir, args.src || "./src/index");

    const schema = await loadSchema(entryPath);

    return {
      contents: renderSchema(schema, {
        ...args,
        headingLevel: Number.parseInt(args.headingLevel) || 2,
      }),
    };
  },
});

function renderSchema(
  schema: Schema,
  opts: {
    headingLevel: number;
    group?: string | string[];
    defaultGroup?: string;
  },
) {
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

    // Find group
    const group =
      tags.find((t) => t.tag === "@group")?.contents || opts.defaultGroup || "";

    // Filter by group if specified
    if (
      opts.group &&
      (typeof opts.group === "string"
        ? group !== opts.group
        : !opts.group.includes(group))
    ) {
      continue;
    }

    // Generate signature for function arguments
    const jsSig = `${name}(${(meta.args || [])
      .map((arg) => {
        let str = arg.name;
        if (arg.optional) {
          str += "?";
        }
        const tsType = simpleArgType(arg.tsType);
        if (tsType) {
          str += `: ${tsType}`;
        }
        return str;
      })
      .join(", ")})`;

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
      lines.push(`${"#".repeat(opts.headingLevel)} ${titleCase(group)}`, "");
    }
    for (const item of sections[group].sort((i1, i2) =>
      i1[0].localeCompare(i2[0]),
    )) {
      lines.push(...item[1]);
    }
  }

  return lines.join("\n").trim();
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

// Silly, but works!
function simpleArgType(tsType = "") {
  return tsType
    .split(/\s*\|\s*/)
    .filter((t) => t && t !== "object" && t.startsWith("{"))
    .map((ot) =>
      ot
        .split(/\s*[,;]\s*/g)
        .map((p) => p.replaceAll(/\s*:\s*(string|boolean|number)/g, ""))
        .join(", "),
    )
    .join(" | ");
}
