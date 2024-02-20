import { defineGenerator } from "../generator";

export const withAutomd = defineGenerator({
  name: "with-automd",
  generate({ args }) {
    const lastUpdate =
      args.lastUpdate === false
        ? ""
        : ` (last updated: ${args.lastUpdate || new Date().toDateString()})`;

    const emoji = args.emoji === false ? "" : "🤖 ";

    return {
      contents: `_${emoji}docs are auto updated with [automd](https:/automd.unjs.io)${lastUpdate}_`,
    };
  },
});
