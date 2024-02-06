import { readPackageJSON } from "pkg-types";
import { codeBlock } from "omark";
import { defineGenerator } from "../generator";

export default defineGenerator({
  name: "pm-install",
  async generate({ options, args }) {
    const name =
      args.name ||
      (await readPackageJSON(options.dir).then(
        (pkg) => pkg?.name || "package-name",
      ));
    const dev = !!args.dev;
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
              `# ${cmd}\n${cmd} ${install} ${name}${dev ? " -D" : ""}`,
          )
          .join("\n\n"),
        "sh",
      ),
    };
  },
});
