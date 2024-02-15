import { resolve } from "pathe";
import type { Generator } from "./generator";
import type { AutomdResult } from "./automd";

export interface Config {
  /**
   * Working directory
   *
   * Defaults to the current working directory
   */
  dir?: string;

  /**
   * Name or path to the input file or files with glob patterns.
   *
   * Default is `README.md`.
   */
  input?: string | string[];

  /**
   * Name or path of the output files.
   *
   * Default output is same as input.
   */
  output?: string;

  /**
   * Ignore patterns if input is a glob pattern
   *
   * By default `node_modules`, `dist` and `.*` files are ignored.
   */
  ignore?: string[];

  /**
   * Watch for changes in input files and regenerate output
   */
  watch?: boolean;

  /**
   * Watch callback
   */
  onWatch?: (event: { results: AutomdResult[]; time: number }) => void;

  /** Custom generators */
  generators?: Record<string, Generator>;
}

const RESOLVED_CONFIG_SYMBOL = Symbol("automdConfig");

export type ResolvedConfig = { [P in keyof Config]-?: Config[P] } & {
  [RESOLVED_CONFIG_SYMBOL]: true;
  input: string[];
  output?: string;
};

export function resolveConfig(
  config?: Config | ResolvedConfig,
): ResolvedConfig {
  if (config && RESOLVED_CONFIG_SYMBOL in config) {
    return config as ResolvedConfig;
  }

  const _config = <ResolvedConfig>{
    dir: ".",
    input: "README.md",
    generators: {},
    [RESOLVED_CONFIG_SYMBOL]: true,
    ...config,
  };

  _config.dir = resolve(_config.dir);

  _config.input = (
    Array.isArray(_config.input) ? _config.input : [_config.input]
  ).filter(Boolean);

  return _config;
}

export async function loadConfig(
  dir = ".",
  overrides: Config,
): Promise<ResolvedConfig> {
  const { loadConfig } = await import("c12");

  dir = resolve(dir);

  const { config } = await loadConfig<Config>({
    cwd: dir,
    name: "automd",
    dotenv: true,
    overrides,
    defaults: {
      ignore: ["node_modules", "dist", ".*"],
    },
  });

  return resolveConfig(config as Config);
}
