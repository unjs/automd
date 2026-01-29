import { getPkg } from "../_utils.ts";
import { defineGenerator } from "../generator.ts";

const PROVIDERS = {
  CONTRIB_ROCKS: "contrib.rocks",
  MARKUPGO: "markupgo",
};

export const contributors = defineGenerator({
  name: "contributors",
  async generate({ config, args }) {
    const { github } = await getPkg(config.dir, args);
    const provider = args.provider || PROVIDERS.CONTRIB_ROCKS;

    if (!github) {
      throw new Error("`github` is required!");
    }

    const lines: string[] = [];

    // License
    if (typeof args.license === "string") {
      lines.push(
        `Published under the [${args.license.toUpperCase()}](https://github.com/${github}/blob/main/LICENSE) license.`,
      );
    }

    // Made by
    let madeBy = `[community](https://github.com/${github}/graphs/contributors) 💛`;
    if (typeof args.author === "string") {
      const authors = args.author
        .split(",")
        .map((author) => author.trim())
        .map((user) => `[@${user}](https://github.com/${user})`)
        .join(", ");
      if (authors.length > 0) {
        madeBy = `${authors} and ${madeBy}`;
      }
    }
    lines.push(`Made by ${madeBy}`);

    // Contributors
    if (provider === PROVIDERS.MARKUPGO) {
      const params = [];

      args = {
        circleSize: "64",
        center: "true",
        ...args,
      };

      if (Number(args.max) >= 0) {
        params.push(["count", args.max]);
      }

      if (Number(args.width)) {
        params.push(["width", args.width]);
      }

      if (Number(args.circleSize)) {
        params.push(["circleSize", args.circleSize]);
      }

      if (Number(args.circleRadius)) {
        params.push(["circleRadius", args.circleRadius]);
      }

      if (Number(args.circleSpacing)) {
        params.push(["circleSpacing", args.circleSpacing]);
      }

      if (args.center) {
        params.push(["center", Boolean(args.center).toString()]);
      }

      if (!args.markupGoLogo) {
        params.push(["removeLogo", "true"]);
      }

      if (args.anon) {
        params.push(["anon", Boolean(args.anon).toString()]);
      }

      let paramsStr = params.map(([k, v]) => `${k}=${v}`).join("&");

      paramsStr = paramsStr ? `?${paramsStr}` : "";

      lines.push(
        `<br><br>`,
        `<a href="https://github.com/${github}/graphs/contributors">`,
        `<img src="https://markupgo.com/github/${github}/contributors${paramsStr}" />`,
        `</a>`,
      );
    } else {
      const params = [["repo", github]];
      if (args.max) {
        params.push(["max", args.max]);
      }
      if (args.anon) {
        params.push(["anon", args.anon]);
      }
      const paramsStr = params.map(([k, v]) => `${k}=${v}`).join("&");
      lines.push(
        `<br><br>`,
        `<a href="https://github.com/${github}/graphs/contributors">`,
        `<img src="https://contrib.rocks/image?${paramsStr}" />`,
        `</a>`,
      );
    }

    return {
      contents: lines.join("\n"),
    };
  },
});
