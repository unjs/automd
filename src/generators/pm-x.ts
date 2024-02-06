import { readPackageJSON } from "pkg-types";
import { codeBlock } from "omark";
import { defineGenerator } from "../generator";

export default defineGenerator({
  name: "pm-x",
  async generate({ options, args }) {
    const name = args.name || (await inferPackageName(options.dir));

    if (!name) {
      return {
        contents: "<!-- package name is unspecified -->",
      };
    }

    const commands = [
      ["npm", "npx"],
      ["pnpm", "pnpm dlx"],
      ["bun", "bunx"],
    ];

    return {
      contents: codeBlock(
        commands
          .map(
            ([pm, cmd]) =>
              `# ${pm}\n${cmd} ${name}${args.usage ? ` ${args.usage}` : ""}`,
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
