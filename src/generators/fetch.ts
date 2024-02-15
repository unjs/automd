import { defineGenerator } from "../generator";

export const fetch = defineGenerator({
  name: "fetch",
  async generate({ args }) {
    const { $fetch } = await import("ofetch");
    const body = await $fetch(args.url);
    return {
      contents: body,
    };
  },
});
