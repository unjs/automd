import { readFile } from "node:fs/promises";
import { defineGenerator } from "../generator.ts";
import { resolvePath } from "../_utils.ts";

export const srcLink = defineGenerator({
  name: "src-link",
  async generate({ args, config, url }) {
    const { src, pattern, label } = args;
    if (![src, pattern, label].every((value) => typeof value === "string" && value)) {
      throw new Error("src, pattern, and label are required arguments");
    }

    let link = src;
    let contents: string;

    if (src.startsWith("gh:") || src.startsWith("https://github.com/")) {
      const githubSource = resolveGitHubSource(src);
      link = githubSource.link;
      try {
        const { $fetch } = await import("ofetch");
        contents = await $fetch<string>(githubSource.raw);
      } catch (error) {
        return {
          contents: `[${label}](${link})`,
          issues: [`Failed to fetch file: ${link}. ${error}`],
        };
      }
    } else if (/^https?:\/\//.test(src)) {
      return {
        contents: `[${label}](${src}#:~:text=${encodeURIComponent(pattern)})`,
      };
    } else {
      try {
        contents = await readFile(resolvePath(src, { url, dir: config.dir }), "utf8");
      } catch (error) {
        return {
          contents: `[${label}](${link})`,
          issues: [`Failed to read local file: ${link}. ${error}`],
        };
      }
    }

    const matches = [...contents.matchAll(parsePattern(pattern))];
    const matchedLines = matches.map((match) => lineNumber(contents, match.index));

    if (matches.length === 0) {
      return {
        contents: `[${label}](${link})`,
        issues: [`Pattern "${pattern}" not found in the file: ${link}`],
      };
    }

    if (matches.length > 1) {
      return {
        contents: `[${label}](${link})`,
        issues: [
          `Multiple matches found for pattern "${pattern}" in the file: ${link}. Matches found at lines: ${matchedLines.join(", ")}`,
        ],
      };
    }

    const match = matches[0]!;
    const startLine = matchedLines[0]!;
    const endLine = lineNumber(contents, match.index + Math.max(match[0].length - 1, 0));
    const lines = startLine === endLine ? `L${startLine}` : `L${startLine}-L${endLine}`;

    return {
      contents: `[${label}](${link}#${lines})`,
    };
  },
});

function resolveGitHubSource(src: string) {
  const path = src.startsWith("gh:") ? src.slice(3) : new URL(src).pathname.slice(1);
  const segments = path.split("/").filter(Boolean);
  if (segments[2] === "blob") {
    segments.splice(2, 1);
  }
  if (segments.length < 4) {
    throw new Error(`Invalid GitHub source: ${src}`);
  }

  const [owner, repo, ref, ...file] = segments;
  return {
    link: `https://github.com/${owner}/${repo}/blob/${ref}/${file.join("/")}`,
    raw: `https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${file.join("/")}`,
  };
}

function parsePattern(pattern: string) {
  const match = /^\/([\s\S]*)\/([dgimsuvy]*)$/.exec(pattern);
  if (!match) {
    return new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
  }

  const flags = match[2]!.includes("g") ? match[2]! : `${match[2]}g`;
  return new RegExp(match[1]!, flags);
}

function lineNumber(contents: string, index: number) {
  return contents.slice(0, index).split("\n").length;
}
