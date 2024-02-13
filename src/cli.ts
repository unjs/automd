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
    const results = await automd({
      dir: args.dir,
      input: args.input,
      output: args.output,
    });

    if (results.length === 0) {
      consola.warn(`No files processed!`);
      process.exit(1);
    }
    consola.success(
      `Automd updated in \`${relative(process.cwd(), results[0]._config.dir)}\``,
    );
    _printResults(results);
  },
});

runMain(main);

// --- internal utils ---

const _types = {
  updated: { label: "updated", color: getColor("blue") },
  noChanges: { label: "no changes", color: getColor("green") },
  alreadyUpdate: { label: "already up-to-date", color: getColor("gray") },
  issues: { label: "with issues", color: getColor("yellow") },
};

function _printResults(results: AutomdResult[]) {
  for (const res of results) {
    const type = _getChangeType(res);
    const input = relative(res._config.dir, res.input);
    const output = relative(res._config.dir, res.output);
    const name = `${input === output ? `  ${input}` : `  ${input} ~> ${output}`}`;
    consola.log(type.color(`  ─  ${name} ${type.label}`));
  }
  const issues = results
    .filter((res) => res.hasIssues)
    .map((res) => _formatIssues(res));
  if (issues.length > 0) {
    consola.warn(`Some issues happened during update:`);
    for (const issue of issues) {
      consola.error(issue);
    }
  }
}

function _getChangeType(res: AutomdResult) {
  if (res.updates.length === 0) {
    return _types.alreadyUpdate;
  }
  if (res.hasIssues) {
    return _types.issues;
  }
  return res.hasChanged ? _types.updated : _types.noChanges;
}

function _formatIssues(res: AutomdResult) {
  return `${_types.issues.color(relative(res._config.dir, res.input))} \n\n ${res.updates.flatMap((u) => u.result.issues).join("\n")}`;
}
