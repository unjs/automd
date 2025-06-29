import { defineGenerator } from "../generator";
import { resolve } from "pathe";
import { readFile } from "node:fs/promises";

export const srcLink = defineGenerator({
  name: "src-link",
  async generate({ args, url }) {
    const { pattern, label } = args;
    let src = args.src;

    if (!src || !pattern || !label) {
      throw new Error("src, pattern, and label are required arguments");
    }

    let originalSrc = src;
    let contents = "";

    if (src.startsWith("gh:") || src.startsWith("https://github.com/")) {
      const url = new URL(
        src.startsWith("gh:") ? `https://github.com/${src.slice(3)}` : src,
      );
      originalSrc = url.toString();
      url.host = "raw.githubusercontent.com";
      src = url.toString();
    } else if (src.startsWith("http")) {
      // If it's a URL, we can't fetch the raw content, then we just use the Highlighted URL
      const url = `${src}#:~:text=${encodeURIComponent(pattern)}`;
      return {
        contents: `[${label}](${url})`,
      };
    } else {
      // Handle local file paths
      try {
        const localFilePath = resolve(url || "", src);
        contents = await readFile(localFilePath, "utf8");
      } catch (error) {
        return {
          contents: `[${label}](${originalSrc})`,
          issues: [`Failed to read local file: ${originalSrc}. ${error}`],
        };
      }
    }

    if (!contents) {
      // If contents weren't set by reading a local file, fetch from the network
      try {
        const { $fetch } = await import("ofetch");
        contents = await $fetch(src);
      } catch (error) {
        return {
          contents: `[${label}](${originalSrc})`,
          issues: [`Failed to fetch file: ${originalSrc}. ${error}`],
        };
      }
    }

    const re = parsePattern(pattern);
    const matches = [...contents.matchAll(re)];
    const matchedLines = matches.map(
      (match) => contents.slice(0, match.index).split("\n").length,
    );

    if (matchedLines.length === 0) {
      return {
        contents: `[${label}](${originalSrc})`,
        issues: [`Pattern "${pattern}" not found in the file: ${originalSrc}`],
      };
    }

    if (matchedLines.length > 1) {
      return {
        contents: `[${label}](${originalSrc})`,
        issues: [
          `Multiple matches found for pattern "${pattern}" in the file: ${originalSrc}. Matches found at lines: ${matchedLines.join(", ")}`,
        ],
      };
    }

    let linkUrl;
    if (originalSrc.startsWith("https://github.com")) {
      const firstMatch = [...matches][0];
      const matchStartLine = matchedLines[0];
      const matchEndLine = contents
        .slice(0, firstMatch.index + firstMatch[0].length)
        .split("\n").length;
      const matchHasMultipleLines = matchStartLine !== matchEndLine;
      const lines = matchHasMultipleLines
        ? `L${matchStartLine}-L${matchEndLine}`
        : `L${matchStartLine}`;
      linkUrl = `${originalSrc}#${lines}`;
    } else {
      linkUrl = `${originalSrc}:${matchedLines[0]}`;
    }

    return {
      contents: `[${label}](${linkUrl})`,
    };
  },
});

function parsePattern(pattern: string): RegExp {
  let regex;
  let flags = "g"; // Default to global search

  if (pattern.startsWith("/") && pattern.endsWith("/")) {
    // If the pattern is wrapped in slashes, extract it as a regex
    const parts = pattern.split("/");
    regex = parts[1]; // The actual pattern between the slashes
    flags = parts[2] || "g"; // Any flags provided after the last slash
  } else {
    // Treat as a literal string, escape special regex characters
    regex = pattern.replace(/[$()*+.?[\\\]^{|}]/g, String.raw`\$&`);
    if (pattern.includes("\n")) {
      flags += "m"; // Enable multi-line mode if the pattern contains newlines
    }
  }
  return new RegExp(regex, flags);
}
