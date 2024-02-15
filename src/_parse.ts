import { destr } from "destr";

const AUTOMD_RE =
  /^(?<open><!--\s*automd:(?<generator>.+?)\s+(?<args>.*?)\s*-->)(?<contents>.+?)(?<close>^<!--\s*\/automd\s*-->)/gims;

export interface Block {
  generator: string;
  rawArgs: string;
  contents: string;
  loc: { start: number; end: number };
}

export function findBlocks(md: string): Block[] {
  const blocks: Block[] = [];

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
    });
  }

  return blocks;
}

export function parseRawArgs(rawArgs: string) {
  const args = Object.create(null);

  for (const part of rawArgs.split(/\s+/)) {
    const [key, value] = part.split("=");
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
