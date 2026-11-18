#!/usr/bin/env node

import { relative } from "pathe";
import { defineCommand, runMain } from "citty";
import consola from "consola";
import { colorize } from "consola/utils";
import pkg from "../package.json" with { type: "json" };
import { resolveCliInputs } from "./_utils.ts";
import { type AutomdResult, automd } from "./automd.ts";
import { type ResolvedConfig } from "./config.ts";

const main = defineCommand({
  meta: {
    name: pkg.name,
    description: pkg.description,
    version: pkg.version,
  },
  args: {
    dir: {
      description: "current working directory",
      type: "string",
    },
    input: {
      description: "name or path the markdown input to update (default: README.md)",
      type: "string",
    },
    output: {
      description: "name or path the markdown output (defaults to input)",
      type: "string",
    },
    watch: {
      description: "watch for changes in input files and regenerate output",
      type: "boolean",
    },
  },
  async setup({ args, rawArgs }) {
    const input = resolveCliInputs(args, rawArgs);
    const { results, config, time } = await automd({
      dir: args.dir,
      ...(input ? { input } : {}),
      output: args.output,
      watch: args.watch,
      onWatch: (event) => {
        console.clear();
        _printResults(event.results, event.time, config);
      },
    });
    if (results.length === 0) {
      consola.warn(`No files processed!`);
      process.exit(1);
    }

    if (args.watch) {
      console.clear();
      const watchedInputs = results.map((res) => relative(config.dir, res.input));
      consola.info(`Watching for changes in \`${watchedInputs.join(", ")}\``);
    }

    _printResults(results, time, config);
  },
});

runMain(main);

// -- internal --

const _types = {
  updated: { label: "updated", color: "blue" },
  noChanges: { label: "no changes", color: "gray" },
  alreadyUpdate: { label: "already up-to-date", color: "green" },
  issues: { label: "with issues", color: "yellow" },
} as const;

function _printResults(results: AutomdResult[], time: number, config: ResolvedConfig) {
  const rDir = relative(process.cwd(), config.dir);
  consola.success(`Automd updated${rDir ? ` in \`${rDir}\` dir` : ""} ${_formatTime(time)}\n`);
  for (const res of results) {
    const type = _getChangeType(res);
    const input = relative(config.dir, res.input);
    const output = relative(config.dir, res.output);
    const name = `${input === output ? `  ${input}` : `  ${input} ~> ${output}`}`;
    consola.log(colorize(type.color, `  ─  ${name} ${type.label} ${_formatTime(res.time)}`));
  }
  const issues = results.filter((res) => res.hasIssues).map((res) => _formatIssues(res, config));
  if (issues.length > 0) {
    consola.warn(`Some issues happened during automd update:`);
    for (const issue of issues) {
      consola.log(issue);
    }
  }
  consola.log("");
}

function _getChangeType(res: AutomdResult) {
  if (res.updates.length === 0) {
    return _types.noChanges;
  }
  if (res.hasIssues) {
    return _types.issues;
  }
  return res.hasChanged ? _types.updated : _types.alreadyUpdate;
}

function _formatIssues(res: AutomdResult, config: ResolvedConfig) {
  return `${colorize(_types.issues.color, relative(config.dir, res.input))} \n\n ${res.updates.flatMap((u) => u.result.issues).join("\n")}`;
}

function _formatTime(time: number) {
  return colorize("gray", `(${Math.round(time * 100) / 100 + "ms"})`);
}
