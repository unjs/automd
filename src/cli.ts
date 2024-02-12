#!/usr/bin/env node

import { defineCommand, runMain } from "citty";
import consola from "consola";
import { name, description, version } from "../package.json";
import { automd } from "./automd";

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
  },
  async setup({ args }) {
    const { updates, config } = await automd({
      dir: args.dir,
      file: args.file,
    });

    if (updates.length === 0) {
      consola.warn(`No updates applied to \`${config.file}\``);
      process.exit(1);
    }

    consola.success(
      `Updated \`${config.file}\` in \`${updates.length}\` sections.`,
    );
  },
});

runMain(main);
