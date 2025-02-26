import { destr } from "destr";
import { camelCase } from "scule";

export interface Block {
  /**
   * The name of the generator to use for updates.
   */
  generator: string;

  /**
   * The arguments that are passed to the generator.
   */
  rawArgs: string;

  /**
   * The current content of the block.
   */
  contents: string;

  /**
   * The location of the content in the original document.
   */
  loc: { start: number; end: number };

  /**
   * The location including the automd comments.
   */
  _loc: { start: number; end: number };
}

/**
 * Searches a markdown document for special sections that `automd` can update.
 *
 * @param md - The markdown document as a string.
 * @returns an array of blocks that can be updated automatically. {@link Block}
 */
export function findBlocks(md: string): Block[] {
  const blocks: Block[] = [];

  // Regex is stateful, so we need to reset it
  const AUTOMD_RE =
    /^(?<open><!--\s*automd:(?<generator>.+?)\s+(?<args>.*?)\s*-->)(?<contents>.+?)(?<close>^<!--\s*\/automd\s*-->)/gimsu;

  for (const match of md.matchAll(AUTOMD_RE)) {
    if (match.index === undefined || !match.groups) {
      continue;
    }

    const start = match.index + match.groups.open.length;
    const end = start + match.groups.contents.length;

    blocks.push({
      generator: match.groups.generator,
      rawArgs: match.groups.args,
      contents: match.groups.contents,
      loc: { start, end },
      _loc: { start: match.index, end: match.index + match[0].length },
    });
  }

  return blocks;
}

/**
 * Checks if a markdown document contains sections that can be automatically updated.
 *
 * @param md - The markdown document as a string.
 * @returns true if there are `automd` sections, false otherwise.
 */
export function containsAutomd(md: string) {
  return /^<!--\s*automd:/gimsu.test(md);
}

/**
 * Converts a string of raw arguments to an object.
 * Each argument is separated by spaces. Arguments can be key-value pairs separated by '='.
 * If an argument starts with "no-", the key is set to false.
 * Otherwise it sets the key to true. Keys are converted to camelCase.
 * Values are processed to determine their actual type (e.g. string, boolean).
 *
 * @param {string} rawArgs - The string of arguments to parse.
 * @return {Object} - An object with keys derived from the arguments.
 * Keys are in camelCase. Values are true, false, or strings.
 */
export function parseRawArgs(rawArgs: string) {
  const args = Object.create(null);

  for (const part of rawArgs.split(/\s+/)) {
    const [_key, value] = part.split("=");
    const key = _key && camelCase(_key);
    if (key && value) {
      args[key] = destr(value);
    } else if (part.startsWith("no-")) {
      args[part.slice(3)] = false;
    } else {
      args[part] = true;
    }
  }

  return args;
}
