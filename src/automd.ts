import { existsSync, promises as fsp } from "node:fs";
import { resolve, relative } from "pathe";
import type { Config, ResolvedConfig } from "./config";
import { TransformResult, transform } from "./transform";
import { loadConfig } from "./config";

export interface AutomdResult extends TransformResult {
  _config: ResolvedConfig;
  input: string;
  output: string;
}

export async function automd(_config: Config = {}): Promise<AutomdResult[]> {
  const config = await loadConfig(_config.dir, _config);

  let inputFiles = config.input;
  if (inputFiles.some((i) => i.includes("*"))) {
    const { globby } = await import("globby");
    inputFiles = await globby(inputFiles, {
      cwd: config.dir,
      absolute: false,
      onlyFiles: true,
      ignore: ["node_modules", "dist"],
    });
  } else {
    inputFiles = inputFiles
      .map((i) => resolve(config.dir, i))
      .filter((i) => existsSync(i))
      .map((i) => relative(config.dir, i));
  }

  return Promise.all(
    inputFiles.map((i) => _automd(i, config, inputFiles.length > 1)),
  );
}

export async function _automd(
  relativeInput: string,
  config: ResolvedConfig,
  multi: boolean,
): Promise<AutomdResult> {
  const input = resolve(config.dir, relativeInput);
  const contents = await fsp.readFile(input, "utf8");

  const result = await transform(contents, config);

  const output = multi
    ? resolve(config.dir, config.output || ".", relativeInput)
    : resolve(config.dir, config.output || relativeInput);

  await fsp.writeFile(output, result.contents, "utf8");

  return {
    _config: config,
    input,
    output,
    ...result,
  };
}
