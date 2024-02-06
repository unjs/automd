# 🤖 automd

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]

Your automated markdown maintainer!

> [!NOTE]
> This project is in the early stages and under development.

## 🦴 Used by

- [unjs/ufo](https://github.com/unjs/ufo)
- [unjs/omark](https://github.com/unjs/omark)

## Generators

There are several available generators for automd. See [issues](https://github.com/unjs/automd/issues?q=is%3Aopen+is%3Aissue+label%3Agenerator) for proposed generators and feel free to suggest any generator ideas to be included!

### `jsdocs` Generator

Create a section in your `README.md`:

    ## Utils
    <!-- AUTOMD_START generator="jsdocs" src="./src/index" -->
    <!-- AUTOMD_END -->

Make sure to have some utility exports in `src/index.ts` annotated with JSDocs.

Now invoke `automd`

```sh
npx automd@latest
```

The declared section will be automatically updated!

    ## Utils

    <!-- AUTOMD_START generator="jsdocs" src="./src/index" -->

    ### `add(a, b)`

    Adds two numbers together.

    **Example:**
    ```js
    add(1, 2); // 3
    ```

    <!-- AUTOMD_END -->

> [!NOTE]
> automd uses [untyped](https://untyped.unjs.io/) and [jiti](https://github.com/unjs/jiti) loader for JSDocs parsing and TypeScript support .

#### JSDocs Supported Args

- `src`: Path to the source file. The default is `./src/index` and can be omitted.
- `headingLevel`: Nested level for markdown group headings (default is `2` => `##`). Note: Each function uses `headingLevel+1` for title in nested levels.
- `group`: Only render function exportes anotated with `@group name`. By default there is no group filter. Value can be an string or array of strings.

### `pm-install` Generator

Create a section in your `README.md`:

    ## Usage

    <!-- AUTOMD_START generator="pm-install" -->
    <!-- AUTOMD_END -->

Now invoke `automd`

```sh
npx automd@latest
```

The declared section will be automatically updated!

    ## Usage

    <!-- AUTOMD_START generator="pm-install" name="example-package" dev="true" -->

    ```sh
    # npm
    npm install example-package -D

    # yarn
    yarn add example-package -D

    # pnpm
    pnpm install example-package -D

    # bun
    bun install example-package -D
    ```

    <!-- AUTOMD_END -->

#### Supported Args

- `name`: The package name. (by default tries to read to the `name` field in `package.json`).
- `dev`: Install as a dev dependency. (defaults to `false`).
- `auto`: Auto-detect package manager. (defaults to `true`). [Docs](https://github.com/unjs/nypm#-nypm)

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
