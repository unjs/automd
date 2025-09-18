import * as md from "mdbox";
import { defineGenerator } from "../generator";
import { getPkg } from "../_utils";
import { x } from "tinyexec";

export const cliUsage = defineGenerator({
  name: "cli-usage",
  async generate({ config, args }) {
    const pkg = await getPkg(config.dir, args);
    const command: string = args.command || pkg.name;

    try {
      const result = await x("npx", [command, "--help"], {
        nodeOptions: {
          env: {
            NO_COLOR: "1",
          },
        },
      });
      const stdout = result.stdout.trim();

      return {
        contents: md.codeBlock(stdout, "sh"),
      };
    } catch (error_) {
      throw new Error(`[cli-usage] Could not execute ${command}: ${error_}`);
    }
  },
});
