import { destr } from "destr";
import { camelCase } from "scule";

export interface Block {
  generator: string;
  rawArgs: string;
  contents: string;
  loc: { start: number; end: number };
  _loc: { start: number; end: number };
}

export function findBlocks(md: string): Block[] {
  const blocks: Block[] = [];

  // Regex is stateful, so we need to reset it
  const AUTOMD_RE =
    /^(?<open><!--\s*automd:(?<generator>.+?)\s+(?<args>.*?)\s*-->)(?<contents>.+?)(?<close>^<!--\s*\/automd\s*-->)/gims;

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

export function containsAutomd(md: string) {
  return /^<!--\s*automd:/gims.test(md);
}

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
