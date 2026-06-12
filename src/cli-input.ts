export function normalizeCliInput(input?: string | string[], positionals: string[] = []) {
  return [...toArray(input), ...positionals]
    .flatMap((i) => i.split(","))
    .map((i) => i.trim())
    .filter(Boolean);
}

function toArray(value?: string | string[]) {
  return Array.isArray(value) ? value : value ? [value] : [];
}
