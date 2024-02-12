#!/usr/bin/env node

import { relative } from "pathe";
import { defineCommand, runMain } from "citty";
import consola from "consola";
import { getColor } from "consola/utils";
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
    const fileUpdates = await automd({
      dir: args.dir,
      input: args.input,
      output: args.output,
    });

    if (fileUpdates.length === 0) {
      consola.warn(`No files processed!`);
      process.exit(1);
    }

    consola.success(
      `Automd updated in \`${relative(process.cwd(), fileUpdates[0]._config.dir)}\``,
    );

    const changeTypes = {
      updated: { label: "updated", color: getColor("blue") },
      noChanges: { label: "no changes", color: getColor("green") },
      alreadyUpdate: { label: "already up-to-date", color: getColor("gray") },
    };

    for (const f of fileUpdates) {
      const [input, output] = [f.input, f.output].map((i) =>
        relative(f._config.dir, i),
      );
      const fileStr =
        input === output ? `  ${input}` : `  ${input} ~> ${output}`;

      const changesStr =
        f.updates.map((u) => u.block.generator).join(", ") || "-";

      const t =
        // prettier-ignore
        f.updates.length === 0 ? changeTypes.alreadyUpdate : (f.hasChanged ? changeTypes.updated : changeTypes.noChanges);

      consola.log(t.color(`  ─ ${fileStr} ${t.label}`));
    }
  },
});

runMain(main);
