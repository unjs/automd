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
    input: {
      description: "name or path the markdown input to update",
      type: "string",
      default: "README.md",
    },
    output: {
      description: "name or path the markdown output (defaults to input)",
      type: "string",
    },
  },
  async setup({ args }) {
    const { updates, config } = await automd({
      dir: args.dir,
      input: args.input,
      output: args.output,
    });

    if (updates.length === 0) {
      consola.warn(`No updates applied to \`${config.input}\``);
      process.exit(1);
    }

    consola.success(
      `Updated \`${config.input}\` in \`${updates.length}\` sections.`,
    );
  },
});

runMain(main);
