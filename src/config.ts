import { resolve } from "node:path";
import type { Generator } from "./generator";

export interface Config {
  /**
   * Working directory
   *
   * Defaults to the current working directory
   */
  dir?: string;

  /**
   * Directories to scan for markdown files from the working directory
   *
   * @example `["docs", "src"]`
   * @example `"docs"`
   */
  dirs?: string[];

  /**
   * Name or path of the markdown file to update relative to dir
   *
   * Defaults to `README.md`
   */
  files?: string | string[];

  /** Custom generators */
  generators?: Record<string, Generator>;
}

export type ResolvedConfig = { [P in keyof Config]-?: Config[P] };

export function resolveConfig(config: Config | null): ResolvedConfig {
  const _config = <ResolvedConfig>{
    dir: ".",
    dirs: [],
    files: "README.md",
    generators: {},
    ...config,
  };
  _config.dir = resolve(_config.dir);
  _config.files = (
    Array.isArray(_config.files) ? _config.files : [_config.files]
  ).map((f) => resolve(_config.dir, f));
  _config.dirs = _config.dirs.map((d) => resolve(_config.dir, d));
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

  const _config = resolveConfig(config);

  if (_config.dirs.length > 0) {
    const fg = await import("fast-glob");
    const files = await fg.glob(
      [..._config.dirs].map((d) => `${d}/**/*.md`),
      { onlyFiles: true },
    );
    if (files && files.length > 0) {
      _config.files = [..._config.files, ...files];
    }
  }

  return _config;
}
