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

    return {
      contents: codeBlock(
        pkgInstalls
          .map(
            ([cmd, install]) =>
              `# ${cmd}\n${cmd} ${install} ${name}${args.dev ? " -D" : ""}`,
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
