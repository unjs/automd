import { image, link } from "mdbox";
import { defineGenerator } from "../generator";
import { getPkg } from "../_utils";

type BadgeType = keyof typeof badgeTypes;
type BadgeProvider = Record<BadgeType, string | false>;

const badgeTypes = {
  npmVersion: {
    name: "npm version",
    to: "https://npmjs.com/package/{name}",
  },
  npmDownloads: {
    name: "npm downloads",
    to: "https://npmjs.com/package/{name}",
  },
  bundlephobia: {
    name: "bundle size",
    to: "https://bundlephobia.com/package/{name}",
  },
  packagephobia: {
    name: "install size",
    to: "https://packagephobia.com/result?p={name}",
  },
  codecov: {
    name: "codecov",
    to: "https://codecov.io/gh/{github}",
  },
  license: {
    name: "license",
    to: "https://github.com/{github}/blob/{licenseBranch}/LICENSE",
  },
};

const badgeProviders = <Record<string, BadgeProvider>>{
  // https://shields.io/badges/static-badge
  shields: {
    npmVersion: "https://img.shields.io/npm/v/{name}",
    npmDownloads: "https://img.shields.io/npm/dm/{name}",
    bundlephobia: "https://img.shields.io/bundlephobia/minzip/{name}",
    packagephobia: false, // https://github.com/badges/shields/issues/1701
    codecov: "https://img.shields.io/codecov/c/gh/{github}",
    license: "https://img.shields.io/github/license/{github}",
  },
  // https://badgen.net/help
  badgen: {
    npmVersion: "https://flat.badgen.net/npm/v/{name}",
    npmDownloads: "https://flat.badgen.net/npm/dm/{name}",
    bundlephobia: "https://flat.badgen.net/bundlephobia/minzip/{name}",
    packagephobia: "https://flat.badgen.net/packagephobia/publish/{name}",
    codecov: "https://flat.badgen.net/codecov/c/github/{github}",
    license: "https://flat.badgen.net/github/license/{github}",
  },
  badgenClassic: {
    npmVersion: "https://badgen.net/npm/v/{name}",
    npmDownloads: "https://badgen.net/npm/dm/{name}",
    bundlephobia: "https://badgen.net/bundlephobia/minzip/{name}",
    packagephobia: "https://badgen.net/packagephobia/publish/{name}",
    codecov: "https://badgen.net/codecov/c/github/{github}",
    license: "https://badgen.net/github/license/{github}",
  },
};

export const badges = defineGenerator({
  name: "badges",
  async generate({ config, args }) {
    const pkg = await getPkg(config.dir, args);
    const ctx: Record<string, any> = {
      name: pkg.name,
      github: pkg.github,
      licenseBranch: "main",
      ...args,
    };

    const fillStr = (str: string) =>
      str.replace(/{(\w+)}/g, (_, key) => ctx[key] || "");

    const provider = badgeProviders[args.provider] || badgeProviders.badgen;
    const providerParams = Object.entries({
      color: args.color,
      labelColor: args.labelColor,
      ...args.styleParams,
    })
      .filter(([, value]) => value)
      .map(([key, value]) => `${key}=${encodeURIComponent(value as string)}`)
      .join("&");

    const badges = {
      npmVersion: {
        enabled: ctx.name && args.npmVersion !== false,
        ...badgeTypes.npmVersion,
      },
      npmDownloads: {
        enabled: ctx.name && args.npmDownloads !== false,
        ...badgeTypes.npmDownloads,
      },
      bundlephobia: {
        enabled: args.bundlephobia && ctx.name,
        ...badgeTypes.bundlephobia,
      },
      packagephobia: {
        enabled: args.packagephobia && ctx.name,
        ...badgeTypes.packagephobia,
      },
      codecov: {
        enabled: args.codecov && ctx.github,
        ...badgeTypes.codecov,
      },
      license: {
        enabled: args.license && ctx.github,
        ...badgeTypes.license,
      },
    } as const;

    const md: string[] = [];

    for (const [badgeType, badge] of Object.entries(badges)) {
      if (!badge.enabled || !provider[badgeType as BadgeType]) {
        continue;
      }
      const to = fillStr(badge.to);
      const imgURL =
        fillStr(provider[badgeType as BadgeType] as string) +
        (providerParams ? `?${providerParams}` : "");
      md.push(link(to, image(imgURL, badge.name)));
    }

    return {
      contents: md.join("\n"),
    };
  },
});
