import { defineGenerator } from "../generator";

export const withAutomd = defineGenerator({
  name: "with-automd",
  generate({ args }) {
    const lastUpdate = args.lastUpdate
      ? ` (last updated: ${typeof args.lastUpdate === "string" ? args.lastUpdate : new Date().toDateString()})`
      : "";

    const emoji = args.emoji === false ? "" : "🤖 ";

    const lines: string[] = [];

    if (args.separator !== false) {
      lines.push("---", "");
    }

    lines.push(
      `_${emoji}auto updated with [automd](https://automd.unjs.io)${lastUpdate}_`,
    );

    return {
      contents: lines.join("\n"),
    };
  },
});
