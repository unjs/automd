import type { Schema } from "untyped";
import { titleCase } from "scule";
import { defineGenerator } from "../generator";
import { resolvePath } from "../_utils";

type RenderOptions = {
  group?: string | string[];
  defaultGroup?: string;
};

export const jsdocs = defineGenerator({
  name: "jsdocs",
  async generate({ config, args, url }) {
    const { loadSchema } = await import("untyped/loader");
    const fullPath = resolvePath(args.src, {
      url,
      dir: config.dir,
      alias: config.alias,
    });

    const schema = await loadSchema(fullPath);

    return {
      contents: _render(
        schema,
        args as RenderOptions,
        Number.parseInt(args.headingLevel) || 2,
      )
        .join("\n")
        .replace(/\n{3,}/g, "\n\n"),
    };
  },
});

// -- main renderer --

function _render(schema: Schema, opts: RenderOptions, headingLevel: number) {
  const sections = Object.create(null) as Record<string, [string, string[]][]>;
  for (const [key, keySchema] of Object.entries(schema.properties || {})) {
    const section = _renderSection(key, keySchema, opts, headingLevel + 1);
    if (!section) {
      continue;
    }
    sections[section.group] = sections[section.group] || [];
    sections[section.group].push([section.heading, section.lines]);
  }

  const lines: string[] = [];

  const sortedGroups = Object.keys(sections).sort((a, b) => {
    if (a === "") {
      return 1;
    }
    if (b === "") {
      return -1;
    }
    return a.localeCompare(b);
  });
  for (const group of sortedGroups) {
    if (group) {
      lines.push(`\n${"#".repeat(headingLevel)} ${titleCase(group)}\n`);
    }
    const sortedSections = sections[group].sort((a, b) =>
      a[0].localeCompare(b[0]),
    );
    for (const section of sortedSections) {
      const heading = `\n${"#".repeat(headingLevel + 1)} ${section[0]}\n`;
      lines.push(heading, ...section[1]);
    }
  }

  return lines;
}

// --- section renderer ---

function _renderSection(
  key: string,
  schema: Schema,
  opts: RenderOptions,
  headingLevel: number,
) {
  // Parse tag annotations
  const tags = _parseTags(schema.tags);

  // Ignore deprecated and intenral functions
  if (tags.some((t) => t.tag === "@deprecated" || t.tag === "@internal")) {
    return;
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
    return;
  }

  let heading = `\`${key}\``;
  const lines: string[] = [];

  if (schema.type === "function") {
    // Function signature in heading
    heading = `\`${_generateFunctionSig(key, schema)}\``;
  } else if (schema.type !== "object") {
    // JS value
    lines.push(
      `- **Type**: \`${schema.markdownType || schema.tsType || schema.type}\``,
    );
    if ("default" in schema) {
      lines.push(`- **Default**: \`${JSON.stringify(schema.default)}\``);
    }
    lines.push("");
  }

  // Add body
  lines.push(..._renderBody(schema));

  // Render example tags
  for (const tag of tags) {
    if (tag.tag === "@example") {
      const codeBlock = tag.contents.startsWith("`")
        ? tag.contents
        : `\`\`\`ts\n${tag.contents}\n\`\`\``;
      lines.push("", "**Example:**", "", codeBlock);
    }
  }

  // Add object properties
  if (schema.type === "object") {
    lines.push(..._render(schema, opts, headingLevel));
  }

  return {
    heading,
    lines,
    group,
  };
}

// -- body ---

function _renderBody(schema: Schema) {
  const lines: string[] = [];
  if (schema.title) {
    lines.push(schema.title.trim());
  }
  if (schema.title && schema.description) {
    // Insert an empty line between the title and the description to separate them.
    lines.push("");
  }
  if (schema.description) {
    // Insert an empty line between each line of the description that contains a newline.
    lines.push(
      ...schema.description
        .split("\n")
        .map((line) => line.trim())
        .join("\n\n")
        .split("\n"),
    );
  }

  return lines;
}

// --- tag parsing ---

function _parseTags(lines: string[] = []) {
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

// --- function signature ---

function _generateFunctionSig(name: string, meta: Schema) {
  return `${name}(${(meta.args || [])
    .map((arg) => {
      let str = arg.name;
      if (arg.optional) {
        str += "?";
      }
      const tsType = _simpleArgType(arg.tsType);
      if (tsType) {
        str += `: ${tsType}`;
      }
      return str;
    })
    .join(", ")})`;
}

function _simpleArgType(tsType = "") {
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
