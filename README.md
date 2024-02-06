# 🤖 automd

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]

Your automated markdown maintainer!

> [!NOTE]
> This project is in the early stages and under development.

## 🦴 Used by

- [unjs/ufo](https://github.com/unjs/ufo)
- [unjs/omark](https://github.com/unjs/omark)

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

### Programmatic API

[WIP]

## Generators

There are several available generators for automd each supporting different arguments.

See [open issues](https://github.com/unjs/automd/issues?q=is%3Aopen+is%3Aissue+label%3Agenerator) for proposed generators and feel free to suggest any generator ideas to be included!

### `jsdocs` Generator

`jsdocs` generator can automatically read through your code and extract and sync documentation of function exports leveraging JSDocs and TypeScript hints.

Internally it uses [untyped](https://untyped.unjs.io/) and [jiti](https://github.com/unjs/jiti) loader for JSDocs parsing and TypeScript support.

#### Usage

```md
<!-- AUTOMD_START generator="jsdocs" src="./src/index" -->
<!-- AUTOMD_END -->
```

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

#### Args supported for `jsdocs`

- `src`: Path to the source file. The default is `./src/index` and can be omitted.
- `headingLevel`: Nested level for markdown group headings (default is `2` => `##`). Note: Each function uses `headingLevel+1` for the title in nested levels.
- `group`: Only render function exportes annotated with `@group name`. By default, there is no group filter. Value can be a string or array of strings.

### `pm-install` Generator

`pm-install` Generator generates commands for several JavaScript package managers.

#### Usage

```md
<!-- AUTOMD_START generator="pm-install" name="package-name" dev="true" -->
<!-- AUTOMD_END -->
```

**Updated Result:**

    ## Usage

    <!-- AUTOMD_START generator="pm-install" name="package-name" dev="true" -->

    ```sh
    # npm
    npm install package-name -D

    # yarn
    yarn add package-name -D

    # pnpm
    pnpm install package-name -D

    # bun
    bun install package-name -D
    ```

    <!-- AUTOMD_END -->

## Development

- Clone this repository
- Install the latest LTS version of [Node.js](https://nodejs.org/en/)
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable`
- Install dependencies using `pnpm install`
- Run playground test using `pnpm dev`

## License

Made with 💛

Published under [MIT License](./LICENSE).

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/automd?style=flat&colorA=18181B&colorB=F0DB4F
[npm-version-href]: https://npmjs.com/package/automd
[npm-downloads-src]: https://img.shields.io/npm/dm/automd?style=flat&colorA=18181B&colorB=F0DB4F
[npm-downloads-href]: https://npmjs.com/package/automd
