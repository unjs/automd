# 🤖 automd

<!-- automd:badges -->

[![npm version](https://img.shields.io/npm/v/automd)](https://npmjs.com/package/automd)
[![npm downloads](https://img.shields.io/npm/dm/automd)](https://npmjs.com/package/automd)

<!-- /automd -->

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

  <!-- automd:generator [...args] -->
  <!-- /automd -->

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

    <!-- automd:jsdocs src="./src/index" -->
    <!-- /automd -->

(make sure to have some utility exports in `src/index.ts` annotated with JSDocs.)

**Updated Result:**

    <!-- automd:jsdocs src="./src/index" -->

    ### `add(a, b)`

    Adds two numbers together.

    **Example:**
    ```js
    add(1, 2); // 3
    ```

    <!-- /automd -->

#### Arguments

- `src`: Path to the source file. The default is `./src/index` and can be omitted.
- `headingLevel`: Nested level for markdown group headings (default is `2` => `##`). Note: Each function uses `headingLevel+1` for the title in nested levels.
- `group`: Only render function exports annotated with `@group name`. By default, there is no group filter. Value can be a string or an array of strings.

### `pm-install`

The `pm-install` generator generates commands for several JavaScript package managers.

#### Usage

    <!-- automd:pm-install name=package-name dev -->
    <!-- /automd -->

**Updated Result:**

    <!-- automd:pm-install name=package-name dev -->

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

    <!-- /automd -->

#### Arguments

- `name`: The package name (by default tries to read from the `name` field in `package.json`).
- `dev`: Install as a dev dependency. (defaults to `false`).
- `auto`: Auto-detect package manager using [unjs/nypm](https://github.com/unjs/nypm#-nypm). (defaults to `true`).

### `pm-x`

The `pm-x` generator generates commands for running a package through JavaScript package managers.

#### Usage

    <!-- automd:pm-x name="package-name" usage="[files] <flags>" -->
    <!-- /automd -->

**Updated Result:**

    <!-- automd:pm-x name="package-name" usage="[files] <flags>" -->

    ```sh
    # npm
    npx package-name@latest [files] <flags>

    # pnpm
    pnpm dlx package-name@latest [files] <flags>

    # bun
    bunx package-name@latest [files] <flags>
    ```

    <!-- /automd -->

#### Arguments

- `name`: The package name (by default tries to read from the `name` field in `package.json`).
- `usage`: An additional string appended at the end of each command suggesting usage. (defaults to `""`).

### `badges`

The `badges` generator generates badges for npm version, npm downloads and some optional ones like codecov and bundle.

#### Usage

    <!-- automd:badges name=defu codecov bundlephobia -->
    <!-- /automd -->

**Updated Result:**

    <!-- automd:badges name=defu codecov bundlephobia -->

    [![npm version](https://img.shields.io/npm/v/defu)](https://npmjs.com/package/defu)
    [![npm downloads](https://img.shields.io/npm/dm/defu)](https://npmjs.com/package/defu)
    [![bundle size](https://img.shields.io/bundlephobia/minzip/defu)](https://bundlephobia.com/package/defu)
    [![codecov](https://img.shields.io/codecov/c/gh/unjs/automd)](https://codecov.io/gh/unjs/automd)

    <!-- /automd -->

#### Arguments

- `name`: The npm package name. By default tries to infer from `package.json`.
- `github`: Github repository name. By default tries to infer from `package.json`.
- `bundlephobia`: Show [bundle-phobia](https://bundlephobia.com/) badge (requires `name`).
- `codecov`: Enable [codecov](https://codecov.io) badge (requires `github`).
- `no-npmDownloads`: Hide npm downloads badge.
- `no-npmVersion`: Hide npm version badge.
- `provider`: Can be one of `shields` (for [shields.io](https://shields.io/)) or `badgen` / `badgenClassic` (for [badgen.net](https://badgen.net/)). Default is `badgen`.

> [!TIP]
> You can use additional `style`, `labelColor` and `color` args for `shields` provider for example: `provider=shields style=flat-square labelColor=f0db4f color=18181b`.

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
