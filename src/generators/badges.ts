import { readPackageJSON } from "pkg-types";
import { defineGenerator } from "../generator";

export const badges = defineGenerator({
  name: "badges",
  async generate({ options, args }) {
    const name = args.name || (await inferPackageName(options.dir));

    const colorA = args.colorA || "18181B";
    const colorB = args.colorB || "F0DB4F";
    const style: "flat" | "flat-square" | "plastic" = args.style || "flat";

    const badges = {
      version: {
        enabled: "true",
        name: "npm version",
        src: `https://img.shields.io/npm/v/${name}?style=${style}&colorA=${colorA}&colorB=${colorB}`,
        href: `https://npmjs.com/package/${name}`,
      },
      downloads: {
        enabled: "true",
        name: "npm downloads",
        src: `https://img.shields.io/npm/dm/${name}?style=${style}&colorA=${colorA}&colorB=${colorB}`,
        href: `https://npmjs.com/package/${name}`,
      },
      codecov: {
        enabled: "false",
        name: "Codecov",
        src: `https://img.shields.io/codecov/c/gh/${name}/main?style=${style}&colorA=${colorA}&colorB=${colorB}`,
        href: `https://codecov.io/gh/${name}`,
      },
      bundle: {
        enabled: "false",
        name: "Bundle size",
        src: `https://img.shields.io/bundlephobia/minzip/${name}?style=${style}&colorA=${colorA}&colorB=${colorB}`,
        href: `https://bundlephobia.com/result?p=${name}`,
      },
    };

    // TODO: Add custom badges? JSON.stringify(args['custom-badges'], null, 2)

    if (!name) {
      return {
        contents: "<!-- package name is unspecified for badges -->",
      };
    }

    // Dynamically replace values with args if they exist
    // e.g version-src="Test" -> badges.ersion.src="....."
    for (const key in badges) {
      const k = key as keyof typeof badges;
      for (const prop in badges[k]) {
        const p = prop as keyof (typeof badges)[typeof k];
        // Make sure the value is a string and exists
        if (args[`${k}-${p}`] && typeof args[`${k}-${p}`] === "string") {
          if (p === "enabled") {
            badges[k][p] = args[`${k}-${p}`] === "true" ? "true" : "false";
            continue;
          }
          badges[k][p] = args[`${k}-${p}`];
        }
      }
    }

    return {
      contents: generateBadgesMd(badges),
    };
  },
});

const generateBadgesMd = (badges: Record<string, any>) => {
  let str = "";

  for (const key in badges) {
    const badge = badges[key];

    if (badge.enabled === "false") {
      continue;
    }

    str += `[![${badge.name}](${badge.src})](${badge.href})\n`;
  }

  if (str.endsWith("\n")) {
    str = str.slice(0, -1);
  }

  return str;
};

async function inferPackageName(dir: string) {
  const pkgName = await readPackageJSON(dir)
    .then((pkg) => pkg?.name)
    .catch(() => undefined);
  return pkgName || process.env.npm_package_name;
}
