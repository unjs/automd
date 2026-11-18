import { type Stats, statSync } from "node:fs";
import type { PackageJson } from "pkg-types";
import { readPackageJSON } from "pkg-types";
import { defu } from "defu";
import { fileURLToPath } from "mlly";
import { resolve, join } from "pathe";

export function safeStat(path: string): Stats | undefined {
  try {
    return statSync(path, { throwIfNoEntry: false });
  } catch {
    return undefined;
  }
}

export function resolvePath(path: string, { url, dir }: { url?: string; dir: string }) {
  if (path.startsWith("/")) {
    return join(dir, path);
  }
  return url ? fileURLToPath(new URL(path, url)) : resolve(dir, path);
}

export function resolveCliInputs(
  args: { dir?: string; input?: string; _?: string[] },
  rawArgs: string[] = [],
): string[] | undefined {
  const flagInputs: string[] = [];
  for (let i = 0; i < rawArgs.length; i++) {
    const arg = rawArgs[i]!;
    if (arg === "--") {
      break;
    }
    if (arg === "--dir" || arg === "--output") {
      i++;
      continue;
    }
    if (arg === "--input" && i + 1 < rawArgs.length) {
      flagInputs.push(rawArgs[++i]!);
    } else if (arg.startsWith("--input=")) {
      flagInputs.push(arg.slice("--input=".length));
    }
  }
  if (flagInputs.length === 0 && args.input !== undefined) {
    flagInputs.push(args.input);
  }
  const baseDir = resolve(args.dir || ".");
  const parsedFlagInputs = flagInputs.flatMap((value) => {
    return value && safeStat(resolve(baseDir, value)) ? [value] : _splitInput(value);
  });
  const positionalInputs = (args._ || []).filter(Boolean);
  const resolved = [...parsedFlagInputs, ...positionalInputs];
  if (flagInputs.length > 0 && resolved.length === 0) {
    throw new Error("--input requires at least one path");
  }
  return resolved.length > 0 ? resolved : undefined;
}

function _splitInput(input: string): string[] {
  const parts: string[] = [];
  let current = "";
  let braceDepth = 0;
  let inBracket = false;
  let bracketStart = -1;
  for (let i = 0; i < input.length; i++) {
    const ch = input[i]!;
    if (ch === "\\" && i + 1 < input.length) {
      current += ch + input[++i]!;
      continue;
    }
    if (inBracket) {
      const canClose =
        i > bracketStart + 1 &&
        !(
          i === bracketStart + 2 &&
          (input[bracketStart + 1] === "!" || input[bracketStart + 1] === "^")
        );
      if (ch === "]" && canClose) {
        inBracket = false;
      }
      current += ch;
      continue;
    }
    if (ch === "[" && _hasClosingBracket(input, i)) {
      inBracket = true;
      bracketStart = i;
      current += ch;
      continue;
    }
    if (ch === "{" && input.includes("}", i + 1)) {
      braceDepth++;
    } else if (ch === "}" && braceDepth > 0) {
      braceDepth--;
    } else if (ch === "," && braceDepth === 0) {
      const trimmed = current.trim();
      if (trimmed) {
        parts.push(trimmed);
      }
      current = "";
      continue;
    }
    current += ch;
  }
  const trimmed = current.trim();
  if (trimmed) {
    parts.push(trimmed);
  }
  return parts;
}

function _hasClosingBracket(input: string, openIdx: number): boolean {
  for (let j = openIdx + 1; j < input.length; j++) {
    if (input[j] === "\\") {
      j++;
      continue;
    }
    if (
      input[j] === "]" &&
      j > openIdx + 1 &&
      !(j === openIdx + 2 && (input[openIdx + 1] === "!" || input[openIdx + 1] === "^"))
    ) {
      return true;
    }
  }
  return false;
}

export async function getPkg(dir: string, input: Record<string, string> = {}) {
  const pkg = await readPackageJSON(dir).catch(() => undefined);
  return defu(
    {
      name: input.name,
      version: typeof input.version === "string" ? input.version : undefined,
      github: input.github || input.gh,
    },
    {
      name: pkg?.name,
      version: pkg?.version,
      github: _getGitRepo(pkg?.repository),
    },
    {
      name: process.env.npm_package_name,
      version: process.env.npm_package_version,
    },
  );
}

function _getGitRepo(repo: PackageJson["repository"]) {
  const url = typeof repo === "string" ? repo : repo?.url;
  if (!url || typeof url !== "string") {
    return;
  }
  const match = /(?:https:\/\/github\.com\/|gh:|github:|)([\w-]+)\/([\w-]+)/.exec(url);
  if (match && match[1] && match[2]) {
    return `${match[1]}/${match[2]}`;
  }
}
