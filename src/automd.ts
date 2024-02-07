import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import MagicString from "magic-string";
import generators from "./generators";
import { GenerateContext, GenerateResult } from "./generator";
import { findAutoMdBlocks, parseRawArgs } from "./_parse";
import { consola } from "./_utils";
import { Config, resolveConfig } from "./config";

/**
 * Update markdown contents
 *
 * Options:
 * - `dir`: Working directory
 * - `file`: Name or path of the markdown file to update relative to dir
 *
 */
export async function automd(_config: Config = {}) {
  const config = resolveConfig(_config);

  if (!existsSync(config.file)) {
    throw new Error(`File not found: \`${config.file}\``);
  }

  const fileContents = await readFile(config.file, "utf8");
  const fileEditor = new MagicString(fileContents);

  type UpdateEntry = {
    block: ReturnType<typeof findAutoMdBlocks>[0];
    generatorName: string;
    context: GenerateContext;
  };
  const updates: UpdateEntry[] = [];

  const blocks = findAutoMdBlocks(fileContents);
  for (const block of blocks) {
    const args = parseRawArgs(block.rawArgs);
    const generatorName = args.generator;
    const generator = generators[generatorName];
    if (!generator) {
      consola.warn(`Unknown generator: \`${generatorName}\``);
      continue;
    }

    const context: GenerateContext = {
      args,
      config,
      oldContents: block.contents,
    };

    const generateResult: GenerateResult = await generator.generate(context);

    updates.push({ block, context, generatorName });

    fileEditor.overwrite(
      block.loc.start,
      block.loc.end,
      `\n\n${generateResult.contents}\n\n`,
    );
  }

  if (updates.length > 0 && fileEditor.hasChanged()) {
    writeFile(config.file, fileEditor.toString(), "utf8");
  }

  return {
    config,
    updates,
  };
}
