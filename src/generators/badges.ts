import { image, link } from "omark";
import { defineGenerator } from "../generator";
import { getPkg } from "../_utils";

type BadgeType = keyof typeof badgeTypes;
type BadgeProvider = Record<BadgeType, string>;

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
  codecov: {
    name: "codecov",
    to: "https://codecov.io/gh/{github}",
  },
};

const badgeProviders = <Record<string, BadgeProvider>>{
  // https://shields.io/badges/static-badge
  shields: {
    npmVersion: "https://img.shields.io/npm/v/{name}",
    npmDownloads: "https://img.shields.io/npm/dm/{name}",
    bundlephobia: "https://img.shields.io/bundlephobia/minzip/{name}",
    codecov: "https://img.shields.io/codecov/c/gh/{github}",
  },
  // https://badgen.net/help
  badgen: {
    npmVersion: "https://flat.badgen.net/npm/v/{name}",
    npmDownloads: "https://flat.badgen.net/npm/dm/{name}",
    bundlephobia: "https://flat.badgen.net/bundlephobia/minzip/{name}",
    codecov: "https://flat.badgen.net/codecov/c/github/{github}",
  },
  badgenClassic: {
    npmVersion: "https://badgen.net/npm/v/{name}",
    npmDownloads: "https://badgen.net/npm/dm/{name}",
    bundlephobia: "https://badgen.net/bundlephobia/minzip/{name}",
    codecov: "https://badgen.net/codecov/c/github/{github}",
  },
};

export const badges = defineGenerator({
  name: "badges",
  async generate({ config, args }) {
    const pkg = await getPkg(config.dir, args);
    const ctx: Record<string, any> = {
      name: pkg.name,
      github: pkg.github,
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
        enabled: ctx.name,
        ...badgeTypes.npmVersion,
      },
      npmDownloads: {
        enabled: ctx.name,
        ...badgeTypes.npmDownloads,
      },
      bundlephobia: {
        enabled: args.bundlephobia && ctx.name,
        ...badgeTypes.bundlephobia,
      },
      codecov: {
        enabled: args.codecov && ctx.github,
        ...badgeTypes.codecov,
      },
    } as const;

    const md: string[] = [];

    for (const [badgeType, badge] of Object.entries(badges)) {
      if (!badge.enabled || !provider[badgeType as BadgeType]) {
        continue;
      }
      const to = fillStr(badge.to);
      const imgURL =
        fillStr(provider[badgeType as BadgeType]) +
        (providerParams ? `?${providerParams}` : "");
      md.push(link(to, image(imgURL, badge.name)));
    }

    return {
      contents: md.join("\n"),
    };
  },
});
