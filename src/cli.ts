#!/usr/bin/env node

import { defineCommand, runMain } from "citty";
import consola from "consola";
import { name, description, version } from "../package.json";
import { automd } from "./automd";
import { loadConfig } from "./config";

const main = defineCommand({
  meta: {
    name,
    description,
    version,
  },
  args: {
    dir: {
      description: "current working directory",
      type: "string",
    },
    file: {
      description: "name or path the markdown file to update",
      type: "string",
      default: "README.md",
    },
    verbose: {
      description: "show verbose output",
      type: "boolean",
    },
  },
  async setup({ args }) {
    const _config = await loadConfig(args.dir, {
      dir: args.dir,
      files: [args.file],
    });

    const { updates } = await automd(_config);

    let newContent = 0;
    for (const [file, entries] of updates) {
      for (const { block, context } of entries) {
        if (context.oldContents === block.contents) { continue; }
        newContent++;
        consola.success(`Updated \`${file}\` (\`${entries.length}\` ent${entries.length > 1 ? 'ies' : 'ry'}) `);

        if (args.verbose) {
          consola.info(`- <!-- automd:${block.generator} ${block.rawArgs} -->`);
        }
      }
    }

    if (newContent === 0) {
      consola.info("No updates applied");
    }
  },
});

runMain(main);
