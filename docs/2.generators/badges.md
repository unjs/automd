# badges

The `badges` generator generates badges for the latest npm version, npm download statistics, code coverage, and bundle size.

## Example

<!-- automd:example generator=badges color=yellow license name=defu codecov bundlephobia packagephobia -->

### Input

    <!-- automd:badges color="yellow" license name="defu" codecov bundlephobia packagephobia -->
    <!-- /automd -->

### Output

    <!-- automd:badges color="yellow" license name="defu" codecov bundlephobia packagephobia -->
    
    [![npm version](https://flat.badgen.net/npm/v/defu?color=yellow)](https://npmjs.com/package/defu)
    [![npm downloads](https://flat.badgen.net/npm/dm/defu?color=yellow)](https://npmjs.com/package/defu)
    [![bundle size](https://flat.badgen.net/bundlephobia/minzip/defu?color=yellow)](https://bundlephobia.com/package/defu)
    [![install size](https://flat.badgen.net/packagephobia/publish/defu?color=yellow)](https://packagephobia.com/result?p=defu)
    [![codecov](https://flat.badgen.net/codecov/c/github/unjs/automd?color=yellow)](https://codecov.io/gh/unjs/automd)
    [![license](https://flat.badgen.net/github/license/unjs/automd?color=yellow)](https://github.com/unjs/automd/blob/main/LICENSE)
    
    <!-- /automd -->

<!-- /automd -->

## Arguments

- `name`: The npm package name. By default tries to infer from `package.json`.
- `github`: Github repository name. By default tries to infer from `package.json`.
- `license`: Show license badge (requires `github`).
- `licenseBranch`: Branch to use for license badge defaults to `main`.
- `bundlephobia`: Show [Bundlephobia](https://bundlephobia.com/) badge (requires `name`).
- `codecov`: Enable [Codecov](https://codecov.io) badge (requires `github`).
- `no-npmDownloads`: Hide npm downloads badge.
- `no-npmVersion`: Hide npm version badge.
- `provider`: Can be one of `shields` (for [shields.io](https://shields.io/)) or `badgen` / `badgenClassic` (for [badgen.net](https://badgen.net/)). Default is `badgen`.

> [!TIP]
> You can use additional args `color`, `labelColor` to customize style. For provider specific params, use `styleParams`.
