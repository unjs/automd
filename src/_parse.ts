import { destr } from "destr";

const AUTOMD_RE =
  /^(?<open><!--\s*AUTOMD_START\s*(?<args>.*?)\s*-->)(?<contents>.+?)(?<close><!--\s*AUTOMD_END\s*-->)/gms;

export function findAutoMdBlocks(md: string) {
  const blocks: {
    loc: { start: number; end: number };
    rawArgs: string;
    contents: string;
  }[] = [];

  for (const match of md.matchAll(AUTOMD_RE)) {
    if (match.index === undefined || !match.groups) {
      continue;
    }

    const start = match.index + match.groups.open.length;
    const end = start + match.groups.contents.length;

    blocks.push({
      loc: { start, end },
      rawArgs: match.groups.args,
      contents: match.groups.contents,
    });
  }

  return blocks;
}

export function parseRawArgs(rawArgs: string) {
  return Object.fromEntries(
    [...rawArgs.matchAll(/(?<key>\w+)=?(["'])?(?<value>[^\2]+?)\2/g)].map(
      (m) => [m.groups?.key, destr(m.groups?.value)],
    ),
  );
}
