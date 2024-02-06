import { readPackageJSON, } from 'pkg-types'
import { codeBlock } from 'omark'
import { defineGenerator } from "../generator";

export default defineGenerator({
  name: "npm-install",
  async generate({ options, args }) {
    const pkg = await readPackageJSON(options.dir);
    const name = args.name || pkg.name || "package-name";
    const dev = !!args.dev;
    const pkgInstalls = [
      ["npm", "install", '--save-dev'],
      ["yarn", "add", '-D'],
      ["pnpm", "install", "-D"],
      ["bun" , "install", "-D"],
    ];

    return {
      contents: codeBlock(
        pkgInstalls.map(([cmd, install, d]) => `# ${cmd}\n${cmd} ${install} ${name}${dev ? " " + d : ''}`).join("\n\n"),
        'sh'
      ),
    };
  },
});
