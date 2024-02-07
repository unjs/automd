import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { existsSync } from "node:fs";
import MagicString from "magic-string";
import { destr } from "destr";
import generators from "./generators";
import { GenerateContext, GenerateResult } from "./generator";

const AUTOMD_RE =
  /^(?<open><!--\s*AUTOMD_START\s*(?<args>[^>]*)\s*-->)(?<contents>.+?)(?<close><!--\s*AUTOMD_END\s*-->)/gms;

export interface AutoMDOptions {
  /**
   * Working directory
   *
   * Defaults to the current working directory
   */
  dir: string;

  /**
   * Name or path of the markdown file to update relative to dir
   *
   * Defaults to `README.md`
   */
  file: string;
}

/**
 * Update markdown contents
 *
 * Options:
 * - `dir`: Working directory
 * - `file`: Name or path of the markdown file to update relative to dir
 *
 */
export async function automd(_options: Partial<AutoMDOptions> = {}) {
  const options: AutoMDOptions = {
    dir: ".",
    file: "README.md",
    ..._options,
  };
  options.dir = resolve(options.dir);
  options.file = resolve(options.dir, options.file);

  if (!existsSync(options.file)) {
    throw new Error(`File not found: \`${options.file}\``);
  }

  const fileContents = await readFile(options.file, "utf8");
  const fileEditor = new MagicString(fileContents);

  type UpdateEntry = {
    generatorName: string;
    context: GenerateContext;
    loc: { start: number; end: number };
  };
  const updates: UpdateEntry[] = [];

  for (const match of fileContents.matchAll(AUTOMD_RE)) {
    if (match.index === undefined || !match.groups) {
      continue;
    }

    const start = match.index + match.groups.open.length;
    const end = start + match.groups.contents.length;

    const args = Object.fromEntries(
      [
        ...match.groups.args.matchAll(
          /(?<key>[\w-]+)=(["'])(?<value>[^\2]+?)\2/g,
        ),
      ].map((m) => [m.groups?.key, destr(m.groups?.value)]),
    );

    const generatorName = args.generator;
    const generator = generators[generatorName];
    if (!generator) {
      // TODO: Warn?
      continue;
    }

    const generateContext: GenerateContext = {
      args,
      options,
      oldContents: match.groups.contents,
    };

    const generateResult: GenerateResult =
      await generator.generate(generateContext);

    updates.push({
      generatorName,
      context: generateContext,
      loc: { start, end },
    });

    fileEditor.overwrite(start, end, `\n\n${generateResult.contents}\n\n`);
  }

  if (updates.length > 0 && fileEditor.hasChanged()) {
    writeFile(options.file, fileEditor.toString(), "utf8");
  }

  return {
    options,
    updates,
  };
}
