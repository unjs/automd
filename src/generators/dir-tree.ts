import { readdir, stat, readFile } from "node:fs/promises";
import { join } from "pathe";
import { defineGenerator } from "../generator";
import { resolvePath } from "../_utils";

interface TreeEntry {
  name: string;
  isDirectory: boolean;
  children?: TreeEntry[];
}

const DEFAULT_IGNORE = [
  "node_modules",
  ".git",
  ".DS_Store",
  ".nuxt",
  ".output",
  ".nitro",
  "dist",
  "coverage",
  ".cache",
  ".turbo",
];

async function parseGitignore(dir: string): Promise<string[]> {
  try {
    const gitignorePath = join(dir, ".gitignore");
    const content = await readFile(gitignorePath, "utf8");
    return content
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#"));
  } catch {
    return [];
  }
}

function shouldIgnore(
  name: string,
  ignorePatterns: string[],
  defaultIgnore: string[],
): boolean {
  const allPatterns = [...defaultIgnore, ...ignorePatterns];
  for (const pattern of allPatterns) {
    const cleanPattern = pattern.replace(/^\//, "").replace(/\/$/, "");
    if (name === cleanPattern) {
      return true;
    }
    if (pattern.startsWith("*") && name.endsWith(pattern.slice(1))) {
      return true;
    }
    if (pattern.endsWith("*") && name.startsWith(pattern.slice(0, -1))) {
      return true;
    }
  }
  return false;
}

async function buildTree(
  dir: string,
  ignorePatterns: string[],
  maxDepth: number,
  currentDepth: number = 0,
): Promise<TreeEntry[]> {
  if (maxDepth > 0 && currentDepth >= maxDepth) {
    return [];
  }

  const entries = await readdir(dir);
  const result: TreeEntry[] = [];

  for (const entry of entries) {
    if (shouldIgnore(entry, ignorePatterns, DEFAULT_IGNORE)) {
      continue;
    }

    const fullPath = join(dir, entry);
    const stats = await stat(fullPath);
    const isDirectory = stats.isDirectory();

    const treeEntry: TreeEntry = {
      name: entry,
      isDirectory,
    };

    if (isDirectory) {
      treeEntry.children = await buildTree(
        fullPath,
        ignorePatterns,
        maxDepth,
        currentDepth + 1,
      );
    }

    result.push(treeEntry);
  }

  result.sort((a, b) => {
    if (a.isDirectory !== b.isDirectory) {
      return a.isDirectory ? -1 : 1;
    }
    return a.name.localeCompare(b.name);
  });

  return result;
}

function renderTree(entries: TreeEntry[], isLast: boolean[] = []): string[] {
  const lines: string[] = [];

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    const isLastEntry = i === entries.length - 1;

    let linePrefix = "";
    for (const element_ of isLast) {
      linePrefix += element_ ? "    " : "│   ";
    }

    const connector = isLastEntry ? "└── " : "├── ";
    const suffix = entry.isDirectory ? "/" : "";
    lines.push(`${linePrefix}${connector}${entry.name}${suffix}`);

    if (entry.children && entry.children.length > 0) {
      const childLines = renderTree(entry.children, [...isLast, isLastEntry]);
      lines.push(...childLines);
    }
  }

  return lines;
}

export const dirTree = defineGenerator({
  name: "dir-tree",
  async generate({ args, config, url }) {
    const srcPath = args.src || ".";
    const fullPath = resolvePath(srcPath, { url, dir: config.dir });

    const stats = await stat(fullPath);
    if (!stats.isDirectory()) {
      throw new Error(`Path "${srcPath}" is not a directory`);
    }

    const userIgnore: string[] = args.ignore
      ? String(args.ignore)
          .split(",")
          .map((s: string) => s.trim())
      : [];

    const gitignorePatterns = await parseGitignore(fullPath);
    const ignorePatterns = [...gitignorePatterns, ...userIgnore];

    const maxDepth = args.maxDepth ? Number(args.maxDepth) : 0;

    const tree = await buildTree(fullPath, ignorePatterns, maxDepth);
    const treeLines = renderTree(tree);

    const contents = "```\n" + treeLines.join("\n") + "\n```";

    return { contents };
  },
});
