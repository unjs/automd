import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import MagicString from "magic-string";
import didYouMean from "didyoumean2";
import builtinGenerators from "./generators";
import { GenerateContext, GenerateResult } from "./generator";
import { findAutoMdBlocks, parseRawArgs } from "./_parse";
import { consola } from "./_utils";
import { Config, resolveConfig } from "./config";

/**
 * Update markdown contents
 *
 * Options:
 * - `dir`: Working directory
 * - `files`: Names or paths of the markdown file to update relative to dir
 *
 */
export async function automd(_config: Config = {}) {
  const config = resolveConfig(_config);
  type UpdateEntry = {
    block: ReturnType<typeof findAutoMdBlocks>[0];
    context: GenerateContext;
  };

  const updates: Map<string, UpdateEntry[]> = new Map();

  for (const file of config.files) {
    if (!existsSync(file)) {
      consola.warn(`File not found: \`${file}\``);
      continue;
    }

    const fileContents = await readFile(file, "utf8");

    const fileEditor = new MagicString(fileContents);

    const generators = {
      ...builtinGenerators,
      ...config.generators,
    };

    const blocks = findAutoMdBlocks(fileContents);

    for (const block of blocks) {
      const args = parseRawArgs(block.rawArgs);
      const generator = generators[block.generator];
      if (!generator) {
        const suggestions = didYouMean(block.generator, Object.keys(generators));
        consola.warn(
          `Unknown generator:\`${block.generator}\`.${suggestions ? ` Did you mean "generator:\`${suggestions}\`"?` : ""}`,
        );
        continue;
      }

      const context: GenerateContext = {
        args,
        config,
        oldContents: block.contents,
      };

      const generateResult: GenerateResult = await generator.generate(context);

      updates.set(file, [
        ...(updates.get(file) || []),
        {
          block,
          context,
        },
      ]);

      fileEditor.overwrite(
        block.loc.start,
        block.loc.end,
        `\n\n${generateResult.contents}\n\n`,
      );
    }

    if ((updates.get(file) || [])?.length  > 0 && fileEditor.hasChanged()) {
      await writeFile(file, fileEditor.toString(), "utf8");
    }
  }

  return {
    config,
    updates: [...updates.entries()]
  };
}
