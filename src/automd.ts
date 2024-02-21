import { existsSync, promises as fsp } from "node:fs";
import { resolve, relative } from "pathe";
import type { SubscribeCallback } from "@parcel/watcher";
import { pathToFileURL } from "mlly";
import type { Config, ResolvedConfig } from "./config";
import { type TransformResult, transform } from "./transform";
import { loadConfig } from "./config";

export interface AutomdResult extends TransformResult {
  input: string;
  output: string;
}

export async function automd(_config: Config = {}): Promise<{
  results: AutomdResult[];
  time: number;
  config: ResolvedConfig;
  unwatch?: () => void | Promise<void>;
}> {
  const start = performance.now();
  const config = await loadConfig(_config.dir, _config);

  let inputFiles = config.input;
  if (inputFiles.some((i) => i.includes("*"))) {
    const { globby } = await import("globby");
    inputFiles = await globby(inputFiles, {
      cwd: config.dir,
      absolute: false,
      onlyFiles: true,
      ignore: config.ignore,
    });
  } else {
    inputFiles = inputFiles
      .map((i) => resolve(config.dir, i))
      .filter((i) => existsSync(i))
      .map((i) => relative(config.dir, i));
  }
  const multiFiles = inputFiles.length > 1;

  const cache: ResultCache = new Map();

  const results = await Promise.all(
    inputFiles.map((i) => _automd(i, config, multiFiles, cache)),
  );

  let unwatch;
  if (config.watch) {
    unwatch = await _watch(inputFiles, config, multiFiles, cache);
  }

  const time = performance.now() - start;

  return {
    time,
    results,
    config,
    unwatch,
  };
}

// -- internal --

type ResultCache = Map<string, AutomdResult>;

async function _automd(
  relativeInput: string,
  config: ResolvedConfig,
  multiFiles: boolean,
  cache: ResultCache,
): Promise<AutomdResult> {
  const start = performance.now();
  const input = resolve(config.dir, relativeInput);
  const contents = await fsp.readFile(input, "utf8");

  const cachedResult = await cache.get(input);
  if (cachedResult?.contents === contents) {
    cachedResult.time = performance.now() - start;
    return cachedResult;
  }

  const transformResult = await transform(
    contents,
    config,
    pathToFileURL(input),
  );

  const output = multiFiles
    ? resolve(config.dir, config.output || ".", relativeInput)
    : resolve(config.dir, config.output || relativeInput);

  await fsp.writeFile(output, transformResult.contents, "utf8");

  const result: AutomdResult = {
    input,
    output,
    ...transformResult,
  };
  cache.set(input, result);
  result.time = performance.now() - start;
  return result;
}

async function _watch(
  inputFiles: string[],
  config: ResolvedConfig,
  multiFiles: boolean,
  cache: ResultCache,
) {
  const watcher = await import("@parcel/watcher");

  const watchCb: SubscribeCallback = async (_err, events) => {
    const filesToUpdate = events
      .map((e) => relative(config.dir, e.path))
      .filter((p) => inputFiles.includes(p));
    const start = performance.now();
    const results = await Promise.all(
      filesToUpdate.map((f) => _automd(f, config, multiFiles, cache)),
    );
    const time = performance.now() - start;
    if (config.onWatch) {
      config.onWatch({ results, time });
    }
  };

  const subscription = await watcher.subscribe(config.dir, watchCb, {
    ignore: config.ignore,
  });

  process.on("SIGINT", () => {
    subscription.unsubscribe();
  });

  return subscription.unsubscribe;
}
