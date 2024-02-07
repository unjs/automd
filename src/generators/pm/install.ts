import { codeBlock } from "omark";
import { defineGenerator } from "../../generator";
import { INSTALL_COMMANDS, inferPackageName } from "./utils";

export default defineGenerator({
  name: "pm-install",
  async generate({ options, args }) {
    const name = args.name || (await inferPackageName(options.dir));

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
