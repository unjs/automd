import { resolve } from "pathe";
import type { Generator } from "./generator";

export interface Config {
  /**
   * Working directory
   *
   * Defaults to the current working directory
   */
  dir?: string;

  /**
   * Name or path of the input file.
   *
   * Defaults to `README.md`
   */
  input?: string;

  /**
   * Name or path of the output file.
   *
   * Defaults to the same as `input`
   */
  output?: string;

  /** Custom generators */
  generators?: Record<string, Generator>;
}

const RESOLVED_CONFIG_SYMBOL = Symbol("automdConfig");

export type ResolvedConfig = { [P in keyof Config]-?: Config[P] } & {
  [RESOLVED_CONFIG_SYMBOL]: true;
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
  _config.input = resolve(_config.dir, _config.input);

  _config.output = _config.output
    ? resolve(_config.dir, _config.output)
    : _config.input;

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
  });

  return resolveConfig(config as Config);
}
