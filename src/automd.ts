import type { Config, ResolvedConfig } from "./config";
import { TransformResult, transform } from "./transform";

export interface AutomdResult extends TransformResult {
  config: ResolvedConfig;
}

export async function automd(_config: Config = {}): Promise<AutomdResult> {
  const { existsSync, promises: fsp } = await import("node:fs");
  const { loadConfig } = await import("./config");
  const config = await loadConfig(_config.dir, _config);

  if (!existsSync(config.file)) {
    throw new Error(`File not found: ${config.file}`);
  }

  const contents = await fsp.readFile(config.file, "utf8");

  const result = await transform(contents, config);

  await fsp.writeFile(config.file, result.contents, "utf8");

  return {
    config,
    ...result,
  };
}
