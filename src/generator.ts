import { AutoMDOptions } from "./automd";

export interface GenerateContext {
  args: Record<string, any>;
  options: AutoMDOptions;
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
