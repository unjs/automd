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
  async generate({ options, args }) {
    const { name, version } = await getPkg(options.dir, args);

    if (!name) {
      return {
        contents: "<!-- package name is unspecified -->",
      };
    }

    // TODO: support noAuto/no-auto
    if (args.auto ?? true) {
      INSTALL_COMMANDS.unshift(["npx nypm", "i"]);
    }

    return {
      contents: codeBlock(
        INSTALL_COMMANDS.map(
          ([cmd, install]) =>
            `# ${cmd.includes("nypm") ? "✨ Auto-detect" : cmd}\n${cmd} ${install}${args.dev ? " -D" : ""} ${name}${version ? `@^${version}` : ""}`,
        ).join("\n\n"),
        "sh",
      ),
    };
  },
});

export const pmX = defineGenerator({
  name: "pm-x",
  async generate({ options, args }) {
    const { name, version } = await getPkg(options.dir, args);

    if (!name) {
      return {
        contents: "<!-- package name is unspecified -->",
      };
    }

    return {
      contents: codeBlock(
        RUN_COMMANDS.map(
          ([pm, cmd]) =>
            `# ${pm}\n${cmd} ${name}@${version ? `${version}` : ""}${args.args ? ` ${args.args}` : ""}`,
        ).join("\n\n"),
        "sh",
      ),
    };
  },
});
