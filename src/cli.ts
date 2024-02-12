#!/usr/bin/env node

import { relative } from "pathe";
import { defineCommand, runMain } from "citty";
import consola from "consola";
import { getColor } from "consola/utils";
import { name, description, version } from "../package.json";
import { AutomdResult, automd } from "./automd";

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
      issues: { label: "with issues", color: getColor("yellow") },
    };
    const getChangeType = (res: AutomdResult) => {
      if (res.updates.length === 0) {
        return changeTypes.alreadyUpdate;
      }
      if (res.hasIssues) {
        return changeTypes.issues;
      }
      return res.hasChanged ? changeTypes.updated : changeTypes.noChanges;
    };

    for (const res of fileUpdates) {
      const [input, output] = [res.input, res.output].map((i) =>
        relative(res._config.dir, i),
      );
      const t = getChangeType(res);

      const f = `${input === output ? `  ${input}` : `  ${input} ~> ${output}`}`;

      consola.log(t.color(`  ─  ${f} ${t.label}`));
    }

    const issues = fileUpdates
      .filter((f) => f.hasIssues)
      .map(
        (f) =>
          `${changeTypes.issues.color(relative(f._config.dir, f.input))} \n\n ${f.updates.flatMap((u) => u.result.issues).join("\n")}`,
      );

    if (issues.length > 0) {
      consola.warn(`Some issues happened during update!`);
      for (const issue of issues) {
        consola.error(issue);
      }
    }
  },
});

runMain(main);
