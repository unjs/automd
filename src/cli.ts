#!/usr/bin/env node

import { defineCommand, runMain } from "citty";
import consola from "consola";
import { automd } from "./automd";

const update = defineCommand({
  meta: {
    name: "update",
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
    const { updates, options } = await automd(args);
    if (updates.length === 0) {
      consola.warn(`No updates applied to \`${options.file}\``);
      process.exit(1);
    }
    consola.success(
      `Updated \`${options.file}\` in \`${updates.length}\` sections.`,
    );
  },
});

const main = defineCommand({
  meta: {
    name: "automd",
    description: "automatically maintain markdown contents",
  },
  subCommands: {
    update,
  },
});

runMain(main);
