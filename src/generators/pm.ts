import { md } from "mdbox";
import { defineGenerator } from "../generator.ts";
import { getPkg } from "../_utils.ts";

const INSTALL_COMMANDS = [
  ["npm", "install"],
  ["yarn", "add"],
  ["pnpm", "add"],
  ["bun", "install"],
  ["deno", "install", " --dev", "npm:"],
] as const;

const NYPM_COMMAND = ["npx nypm", "install"] as const;

const RUN_COMMANDS = [
  ["npm", "npx "],
  ["pnpm", "pnpm dlx "],
  ["bun", "bunx "],
  ["deno", "deno run -A npm:"],
] as const;

export const pmInstall = defineGenerator({
  name: "pm-install",
  async generate({ config, args }) {
    const { name, version } = await getPkg(config.dir, args);

    if (!name) {
      return {
        contents: "<!-- package name is unspecified -->",
      };
    }

    let versionSuffix = "";
    if (args.version) {
      versionSuffix = typeof args.version === "string" ? `@${args.version}` : `@^${version}`;
    }

    const commands = args.auto === false ? INSTALL_COMMANDS : [NYPM_COMMAND, ...INSTALL_COMMANDS];

    const contents = commands.map(
      ([cmd, install, dev = " -D", pkgPrefix = ""]) =>
        // prettier-ignore
        `# ${cmd.includes("nypm") ? "✨ Auto-detect" : cmd}\n${cmd} ${install}${args.dev ? dev : (args.global ? "g" : "")} ${pkgPrefix}${name}${versionSuffix}`,
    );

    if ((args.separate ?? false) === false) {
      return {
        contents: md.codeBlock(contents.join("\n\n"), "sh"),
      };
    }

    return {
      contents: contents.map((cmd) => md.codeBlock(cmd, "sh")).join("\n\n"),
    };
  },
});

export const pmX = defineGenerator({
  name: "pm-x",
  async generate({ config, args }) {
    const { name, version } = await getPkg(config.dir, args);

    if (!name) {
      return {
        contents: "<!-- package name is unspecified -->",
      };
    }

    let versionSuffix = "";
    if (args.version) {
      versionSuffix = typeof args.version === "string" ? `@${args.version}` : `@${version}`;
    }

    const contents = RUN_COMMANDS.map(
      ([pm, cmd]) => `# ${pm}\n${cmd}${name}${versionSuffix}${args.args ? ` ${args.args}` : ""}`,
    );

    if ((args.separate ?? false) === false) {
      return {
        contents: md.codeBlock(contents.join("\n\n"), "sh"),
      };
    }

    return {
      contents: contents.map((cmd) => md.codeBlock(cmd, "sh")).join("\n\n"),
    };
  },
});
