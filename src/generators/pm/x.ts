import { codeBlock } from "omark";
import { defineGenerator } from "../../generator";
import { RUN_COMMANDS, inferPackageName } from "./utils";

export default defineGenerator({
  name: "pm-x",
  async generate({ options, args }) {
    const name = args.name || (await inferPackageName(options.dir));

    if (!name) {
      return {
        contents: "<!-- package name is unspecified -->",
      };
    }

    return {
      contents: codeBlock(
        RUN_COMMANDS.map(
          ([pm, cmd]) =>
            `# ${pm}\n${cmd} ${name}${args.usage ? ` ${args.usage}` : ""}`,
        ).join("\n\n"),
        "sh",
      ),
    };
  },
});
