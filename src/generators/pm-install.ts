import { readPackageJSON } from "pkg-types";
import { codeBlock } from "omark";
import { defineGenerator } from "../generator";

export default defineGenerator({
  name: "pm-install",
  async generate({ options, args }) {
    const name = args.name || (await inferPackageName(options.dir));

    if (!name) {
      return {
        contents: "<!-- package name is unspecified -->",
      };
    }

    const pkgInstalls = [
      ["npm", "install"],
      ["yarn", "add"],
      ["pnpm", "install"],
      ["bun", "install"],
    ];

    // TODO: support noAuto/no-auto
    if (args.auto ?? true) {
      pkgInstalls.unshift(["npx nypm", "i"]);
    }

    return {
      contents: codeBlock(
        pkgInstalls
          .map(
            ([cmd, install]) =>
              `# ${cmd.includes("nypm") ? "✨ Auto-detect" : cmd}\n${cmd} ${install}${args.dev ? " -D" : ""} ${name}`,
          )
          .join("\n\n"),
        "sh",
      ),
    };
  },
});

async function inferPackageName(dir: string) {
  const pkgName = await readPackageJSON(dir)
    .then((pkg) => pkg?.name)
    .catch(() => undefined);
  return pkgName || process.env.npm_package_name;
}
