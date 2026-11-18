import { promises as fsp } from "node:fs";
import { resolve, relative, dirname, isAbsolute } from "pathe";
import type { SubscribeCallback } from "@parcel/watcher";
import { pathToFileURL } from "mlly";
import { debounce } from "perfect-debounce";
import { safeStat } from "./_utils.ts";
import type { Config, ResolvedConfig } from "./config.ts";
import { type TransformResult, transform } from "./transform.ts";
import { loadConfig } from "./config.ts";

export interface AutomdResult extends TransformResult {
  input: string;
  output: string;
}

/**
 * Describes what you get back from the `automd` function.
 */
export interface AutomdReturn {
  /**
   * A list of the changes made to the file(s) by `automd`.
   */
  results: AutomdResult[];

  /**
   * How long it took to make the changes, in milliseconds.
   */
  time: number;

  /**
   * The resolved configuration that were used for these changes.
   */
  config: ResolvedConfig;

  /**
   * If you started watching the file(s) for changes, this function can be called to stop watching.
   */
  unwatch?: () => void | Promise<void>;
}

/**
 * Scans a markdown file looking for special comments.
 * These comments tell the function to add or update certain parts of the file automatically.
 * You can change how this works by giving it different settings in the `_config` option.
 *
 * @param _config - The settings to use for the update process. See {@link Config}.
 * @returns - An object containing the results of the update, including any changes made and any problems found. See {@link AutomdReturn}.
 *
 * @see https://automd.unjs.io/guide
 */
export async function automd(_config: Config = {}): Promise<AutomdReturn> {
  const start = performance.now();
  const config = await loadConfig(_config.dir, _config);

  const literalFiles: string[] = [];
  const globPatterns: string[] = [];

  for (const rawInput of config.input) {
    const fullPath = resolve(config.dir, rawInput);
    const stat = safeStat(fullPath);
    if (stat) {
      if (stat.isFile()) {
        literalFiles.push(relative(config.dir, fullPath));
      }
      continue;
    }
    const normalized =
      process.platform === "win32" ? rawInput.replace(/\\(?![[\]{}()!\\])/g, "/") : rawInput;
    if (/[*?[\]{}()!]/.test(normalized)) {
      globPatterns.push(normalized);
    }
  }

  let inputFiles = literalFiles;
  if (globPatterns.length > 0) {
    const { escapePath, glob, isDynamicPattern } = await import("tinyglobby");
    const dynamicPatterns = globPatterns.filter((p) => isDynamicPattern(p));
    if (dynamicPatterns.length > 0) {
      const externalLiterals: string[] = [];
      const inDirPatterns: string[] = [];
      for (const file of literalFiles) {
        if (file === ".." || file.startsWith("../") || isAbsolute(file)) {
          externalLiterals.push(file);
        } else {
          inDirPatterns.push(escapePath(file));
        }
      }
      const matched = await glob([...inDirPatterns, ...dynamicPatterns], {
        cwd: config.dir,
        absolute: false,
        onlyFiles: true,
        ignore: config.ignore,
      });
      const globFiles = matched.map((f) => relative(config.dir, resolve(config.dir, f)));
      inputFiles = [...externalLiterals, ...globFiles];
    }
  }

  inputFiles = [...new Set(inputFiles)];
  const multiFiles = inputFiles.length > 1;

  const cache: ResultCache = new Map();

  const results = await Promise.all(inputFiles.map((i) => _automd(i, config, multiFiles, cache)));

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

  const transformResult = await transform(contents, config, pathToFileURL(input));

  let output: string;
  if (multiFiles) {
    if (config.output) {
      const outputDir = resolve(config.dir, config.output);
      output = resolve(outputDir, relativeInput);
      const relOutput = relative(outputDir, output);
      if (relOutput === ".." || relOutput.startsWith("../") || isAbsolute(relOutput)) {
        throw new Error(
          `Input "${relativeInput}" resolves outside output directory "${config.output}"`,
        );
      }
    } else {
      output = resolve(config.dir, relativeInput);
    }
  } else {
    output = resolve(config.dir, config.output || relativeInput);
  }

  await fsp.mkdir(dirname(output), { recursive: true });
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

  const watchCb: SubscribeCallback = debounce(async (_err, events) => {
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
  });

  const subscription = await watcher.subscribe(config.dir, watchCb, {
    ignore: config.ignore,
  });

  process.on("SIGINT", () => {
    subscription.unsubscribe();
  });

  return subscription.unsubscribe;
}
