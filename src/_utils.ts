import { readPackageJSON } from "pkg-types";
import _consola from "consola";

export const consola = _consola.withTag("automd");

export async function getPkg(
  dir: string,
  input: { name?: string; version?: string } = {},
) {
  if (input.name && input.version) {
    return input;
  }
  const pkg = await readPackageJSON(dir).catch(() => undefined);
  return {
    name: process.env.npm_package_name,
    version: process.env.npm_package_name,
    ...pkg,
    ...input,
  };
}
