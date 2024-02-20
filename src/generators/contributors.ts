import { getPkg } from "../_utils";
import { defineGenerator } from "../generator";

export const contributors = defineGenerator({
  name: "contributors",
  async generate({ config, args }) {
    const { github } = await getPkg(config.dir, args);

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

    return {
      contents: lines.join("\n"),
    };
  },
});
