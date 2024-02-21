import type { Block } from "./_parse";
import type { ResolvedConfig } from "./config";
import type { TransformResult } from "./transform";

export interface GenerateContext {
  args: Record<string, any>;
  config: ResolvedConfig;
  block: Block;
  url?: string;
  transform: (contents: string) => Promise<TransformResult>;
}

export interface GenerateResult {
  contents: string;
  issues?: string[];
  unwrap?: boolean;
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
