import type { ResolvedConfig } from "./config";

export interface GenerateContext {
  args: Record<string, any>;
  config: ResolvedConfig;
  oldContents: string;
}

export interface GenerateResult {
  contents: string;
}

export interface Generator {
  name: string;
  generate: (ctx: GenerateContext) => GenerateResult | Promise<GenerateResult>;
}

/**
 * @internal
 */
export function defineGenerator(generator: Generator) {
  return generator;
}
