# badges

The `badges` generator generates badges for the latest npm version, npm download statistics, code coverage, and bundle size.

## Usage

```md
  <!-- automd:badges color=yellow name=defu codecov bundlephobia -->
  <!-- /automd -->
```

**Generated Result:**

<!-- automd:badges color=yellow name=defu codecov bundlephobia -->

[![npm version](https://flat.badgen.net/npm/v/defu?color=yellow)](https://npmjs.com/package/defu)
[![npm downloads](https://flat.badgen.net/npm/dm/defu?color=yellow)](https://npmjs.com/package/defu)
[![bundle size](https://flat.badgen.net/bundlephobia/minzip/defu?color=yellow)](https://bundlephobia.com/package/defu)

<!-- /automd -->

## Arguments

- `name`: The npm package name. By default tries to infer from `package.json`.
- `github`: Github repository name. By default tries to infer from `package.json`.
- `bundlephobia`: Show [Bundlephobia](https://bundlephobia.com/) badge (requires `name`).
- `codecov`: Enable [Codecov](https://codecov.io) badge (requires `github`).
- `no-npmDownloads`: Hide npm downloads badge.
- `no-npmVersion`: Hide npm version badge.
- `provider`: Can be one of `shields` (for [shields.io](https://shields.io/)) or `badgen` / `badgenClassic` (for [badgen.net](https://badgen.net/)). Default is `badgen`.

> [!TIP]
> You can use additional args `color`, `labelColor` to customize style. For provider specific params, use `styleParams`.
