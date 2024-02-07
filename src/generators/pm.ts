import { codeBlock } from "omark";
import { readPackageJSON } from "pkg-types";
import { defineGenerator } from "../generator";

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
    const name = args.name || (await _inferPackageName(options.dir));

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
            `# ${cmd.includes("nypm") ? "✨ Auto-detect" : cmd}\n${cmd} ${install}${args.dev ? " -D" : ""} ${name}`,
        ).join("\n\n"),
        "sh",
      ),
    };
  },
});

export const pmX = defineGenerator({
  name: "pm-x",
  async generate({ options, args }) {
    const name = args.name || (await _inferPackageName(options.dir));

    if (!name) {
      return {
        contents: "<!-- package name is unspecified -->",
      };
    }

    return {
      contents: codeBlock(
        RUN_COMMANDS.map(
          ([pm, cmd]) =>
            `# ${pm}\n${cmd} ${name}@latest${args.usage ? ` ${args.usage}` : ""}`,
        ).join("\n\n"),
        "sh",
      ),
    };
  },
});

async function _inferPackageName(dir: string) {
  const pkgName = await readPackageJSON(dir)
    .then((pkg) => pkg?.name)
    .catch(() => undefined);
  return pkgName || process.env.npm_package_name;
}
