import type { PackageJson } from "pkg-types";
import { readPackageJSON } from "pkg-types";
import { defu } from "defu";
import { fileURLToPath } from "mlly";
import { resolve, join } from "pathe";

export function resolvePath(
  path: string,
  { url, dir }: { url?: string; dir: string },
) {
  if (path.startsWith("/")) {
    return join(dir, path);
  }
  return url ? fileURLToPath(new URL(path, url)) : resolve(dir, path);
}

export async function getPkg(dir: string, input: Record<string, string> = {}) {
  const pkg = await readPackageJSON(dir).catch(() => undefined);
  return defu(
    {
      name: input.name,
      version: typeof input.version === 'string' ? input.version : null,
      github: input.github || input.gh,
    },
    {
      name: pkg?.name,
      version: pkg?.version,
      github: _getGitRepo(pkg?.repository),
    },
    {
      name: process.env.npm_package_name,
      version: process.env.npm_package_version,
    },
  );
}

function _getGitRepo(repo: PackageJson["repository"]) {
  const url = typeof repo === "string" ? repo : repo?.url;
  if (!url || typeof url !== "string") {
    return;
  }
  const match =
    /(?:https:\/\/github\.com\/|gh:|github:|)([\w-]+)\/([\w-]+)/.exec(url);
  if (match && match[1] && match[2]) {
    return `${match[1]}/${match[2]}`;
  }
}
