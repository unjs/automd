import { codeBlock } from "omark";
import { defineGenerator } from "../generator";
import { getPkg } from "../_utils";

const INSTALL_COMMANDS = [
  ["npm", "install"],
  ["yarn", "add"],
  ["pnpm", "install"],
  ["bun", "install"],
];

const RUN_COMMANDS = [
  ["npm", "npx"],
  ["pnpm", "pnpm dlx"],
  ["bun", "bunx"],
];

export const pmInstall = defineGenerator({
  name: "pm-install",
  async generate({ config, args }) {
    const { name, version } = await getPkg(config.dir, args);

    if (!name) {
      return {
        contents: "<!-- package name is unspecified -->",
      };
    }

    if (args.auto ?? true) {
      INSTALL_COMMANDS.unshift(["npx nypm", "i"]);
    }

    const contents = INSTALL_COMMANDS.map(
      ([cmd, install]) =>
        `# ${cmd.includes("nypm") ? "✨ Auto-detect" : cmd}\n${cmd} ${install}${args.dev ? " -D" : ""} ${name}${version ? `@^${version}` : ""}`,
    );

    if ((args.separate ?? false) === false) {
      return {
        contents: codeBlock(contents.join("\n\n"), "sh"),
      };
    }

    return {
      contents: contents.map((cmd) => codeBlock(cmd, "sh")).join("\n\n"),
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

    const contents = RUN_COMMANDS.map(
      ([pm, cmd]) =>
        `# ${pm}\n${cmd} ${name}@${version ? `${version}` : ""}${args.args ? ` ${args.args}` : ""}`,
    );

    if ((args.separate ?? false) === false) {
      return {
        contents: codeBlock(contents.join("\n\n"), "sh"),
      };
    }

    return {
      contents: contents.map((cmd) => codeBlock(cmd, "sh")).join("\n\n"),
    };
  },
});
