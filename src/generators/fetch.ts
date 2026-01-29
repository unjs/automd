import { defineGenerator } from "../generator.ts";

export const fetch = defineGenerator({
  name: "fetch",
  async generate({ args }) {
    const { $fetch } = await import("ofetch");

    let url = args.url;
    if (!url) {
      throw new Error("URL is required!");
    }
    if (url.startsWith("gh:")) {
      url = `https://raw.githubusercontent.com/${url.slice(3)}`;
    }

    const contents = await $fetch(url);

    return {
      contents,
    };
  },
});
