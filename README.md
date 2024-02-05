# 🤖 automd

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]

Your automated markdown maintainer!

> [!NOTE]
> This project is in the early stages and under development.

## JSDocs Generator

Create a section in your `README.md`:

    # JSRand

    Random number utils.

    ## Utils

    <!-- AUTOMD_START generator="jsdocs" src="./index.ts" -->
    <!-- AUTOMD_END -->

Make sure to have some utility exports in `index.ts` annotated with JSDocs. **Example:**

````ts
/**
 * Adds two numbers together.
 *
 * @example
 *
 * ```js
 * add(1, 2); // 3
 * ```
 */
export function add(a: number, b: number) {
  return a + b;
}
````

Now invokate `automd update`:

```sh
npx automd@latest update
```

The declared section will be automatically updated:

    # JSRand

    Random number utils.

    ## Utils

    <!-- AUTOMD_START generator="jsdocs" src="./index.ts" -->

    ## `add(a, b)`

    Adds two numbers together.

    **Example:**

    ```js
    add(1, 2); // 3
    ```


    <!-- AUTOMD_END -->

Behind the scenes, we use [untyped](https://untyped.unjs.io/) with a [jiti](https://github.com/unjs/jiti) based loader for TypeScript support.

### Supported Args

- `src`: Path to the source file. The default is `./src/index` a and can be omitted.

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
