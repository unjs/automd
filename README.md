# 🤖 automd

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]

Your automated markdown maintainer!

> [!NOTE]
> This project is in the early stages and under development.

## 🦴 Used by

- [unjs/ufo](https://github.com/unjs/ufo)
- [unjs/omark](https://github.com/unjs/omark)
- [unjs/nypm](https://github.com/unjs/nypm)

## Usage

Automd scans for the annotation comments within the markdown document and updates their contents using built-in generators.

The syntax is like this:

```md
<!-- AUTOMD_START generator="jsdocs" [...args] -->

...

<!-- AUTOMD_END -->
```

### Using CLI

The easiest way to use automd is to use the CLI. You can install automd and add it to the `build` or `release` command in `package.json` or directly run `npx automd` in your project.

```sh
npx automd@latest
```

By default, the `README.md` file in the current working directory will be used as the target.

You can use `--dir` and `--file` arguments to customize the default behavior to operate on any other markdown file.

### Configuration

You can specify configuration in `.automdrc` or `automd.config` (`js`, `ts`, `mjs`, `cjs` or `json` format) (powered by [unjs/c12](https://c12.unjs.io)).

Example: `automd.config.js`

```ts
/** @type {import("automd").Config} */
export default {
  file: "DOCS.md",
};
```

#### Config

- `dir`: Working directory (defaults to current working directory)
  - You can use `--dir` to override with CLI
- `file`: The markdown file name or path (relative to dir)
  - You can use `--file` to override with CLI
- `generators`: A map of generator names to custom generators
  - You can use `automd.config` to specify them

### Programmatic API

[WIP]

## Generators

There are several available generators for automd each supporting different arguments.

See [open issues](https://github.com/unjs/automd/issues?q=is%3Aopen+is%3Aissue+label%3Agenerator) for proposed generators and feel free to suggest any generator ideas to be included!

### `jsdocs`

The `jsdocs` generator can automatically read through your code and extract and sync documentation of function exports leveraging JSDocs and TypeScript hints.

Internally it uses [untyped](https://untyped.unjs.io/) and [jiti](https://github.com/unjs/jiti) loader for JSDocs parsing and TypeScript support.

#### Usage

    <!-- AUTOMD_START generator="jsdocs" src="./src/index" -->
    <!-- AUTOMD_END -->

(make sure to have some utility exports in `src/index.ts` annotated with JSDocs.)

**Updated Result:**

    <!-- AUTOMD_START generator="jsdocs" src="./src/index" -->

    ### `add(a, b)`

    Adds two numbers together.

    **Example:**
    ```js
    add(1, 2); // 3
    ```

    <!-- AUTOMD_END -->

#### Arguments

- `src`: Path to the source file. The default is `./src/index` and can be omitted.
- `headingLevel`: Nested level for markdown group headings (default is `2` => `##`). Note: Each function uses `headingLevel+1` for the title in nested levels.
- `group`: Only render function exports annotated with `@group name`. By default, there is no group filter. Value can be a string or an array of strings.

### `pm-install`

The `pm-install` generator generates commands for several JavaScript package managers.

#### Usage

    <!-- AUTOMD_START generator="pm-install" name="package-name" dev="true" -->
    <!-- AUTOMD_END -->

**Updated Result:**

    <!-- AUTOMD_START generator="pm-install" name="package-name" dev="true" -->

    ```sh
    # ✨ Auto-detect
    npx nypm i -D package-name

    # npm
    npm install -D package-name

    # yarn
    yarn add -D package-name

    # pnpm
    pnpm install -D package-name

    # bun
    bun install -D package-name
    ```

    <!-- AUTOMD_END -->

#### Arguments

- `name`: The package name (by default tries to read from the `name` field in `package.json`).
- `dev`: Install as a dev dependency. (defaults to `false`).
- `auto`: Auto-detect package manager using [unjs/nypm](https://github.com/unjs/nypm#-nypm). (defaults to `true`).

### `pm-x`

The `pm-x` generator generates commands for running a package through JavaScript package managers.

#### Usage

    <!-- AUTOMD_START generator="pm-x" name="package-name" usage="[files] <flags>" -->
    <!-- AUTOMD_END -->

**Updated Result:**

    <!-- AUTOMD_START generator="pm-x" name="package-name" usage="[files] <flags>" -->

    ```sh
    # npm
    npx package-name@latest [files] <flags>

    # pnpm
    pnpm dlx package-name@latest [files] <flags>

    # bun
    bunx package-name@latest [files] <flags>
    ```

    <!-- AUTOMD_END -->

#### Arguments

- `name`: The package name (by default tries to read from the `name` field in `package.json`).
- `usage`: An additional string appended at the end of each command suggesting usage. (defaults to `""`).

## Development

- Clone this repository
- Install the latest LTS version of [Node.js](https://nodejs.org/en/)
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable`
- Install dependencies using `pnpm install`
- Run unit tests using `pnpm dev`
- Run playground test using `pnpm play`

## License

Made with 💛

Published under [MIT License](./LICENSE).

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/automd?style=flat&colorA=18181B&colorB=F0DB4F
[npm-version-href]: https://npmjs.com/package/automd
[npm-downloads-src]: https://img.shields.io/npm/dm/automd?style=flat&colorA=18181B&colorB=F0DB4F
[npm-downloads-href]: https://npmjs.com/package/automd
