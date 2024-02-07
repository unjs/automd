import { readPackageJSON } from "pkg-types";

export async function inferPackageName(dir: string) {
  const pkgName = await readPackageJSON(dir)
    .then((pkg) => pkg?.name)
    .catch(() => undefined);
  return pkgName || process.env.npm_package_name;
}

export const INSTALL_COMMANDS = [
  ["npm", "install"],
  ["yarn", "add"],
  ["pnpm", "install"],
  ["bun", "install"],
];

export const RUN_COMMANDS = [
  ["npm", "npx"],
  ["pnpm", "pnpm dlx"],
  ["bun", "bunx"],
];
