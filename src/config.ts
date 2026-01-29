import { resolve } from "pathe";
import type { Generator } from "./generator.ts";
import type { AutomdResult } from "./automd.ts";

export interface Config {
  /**
   * The working directory
   *
   * @default "." (current directory)
   */
  dir?: string;

  /**
   * Name or path to the input file or files with glob patterns.
   *
   * @default "README.md"
   */
  input?: string | string[];

  /**
   * Name or path of the output files. If not provided, the input file will be overwritten.
   *
   * @default input
   */
  output?: string;

  /**
   * Ignore patterns if input is a glob pattern
   *
   * @default ["node_modules", "dist", "/.*"]
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

export function resolveConfig(config?: Config | ResolvedConfig): ResolvedConfig {
  if (config && RESOLVED_CONFIG_SYMBOL in config) {
    return config as ResolvedConfig;
  }

  const _config = {
    dir: ".",
    input: "README.md",
    generators: {},
    [RESOLVED_CONFIG_SYMBOL]: true,
    ...config as Partial<ResolvedConfig>,
  } as ResolvedConfig;

  _config.dir = resolve(_config.dir);

  _config.input = (Array.isArray(_config.input) ? _config.input : [_config.input]).filter(Boolean);

  return _config;
}

export async function loadConfig(dir = ".", overrides: Config): Promise<ResolvedConfig> {
  const { loadConfig } = await import("c12");

  dir = resolve(dir);

  const { config } = await loadConfig<Config>({
    cwd: dir,
    name: "automd",
    dotenv: true,
    overrides,
    defaults: {
      ignore: ["**/node_modules", "**/dist", "**/.*"],
      dir,
    },
  });

  return resolveConfig(config as Config);
}
