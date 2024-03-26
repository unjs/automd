# badges

The `badges` generator generates badges for the latest npm version, npm download statistics, code coverage, and bundle size.

## Example

<!-- automd:example generator=badges color=yellow license name=defu codecov bundlephobia packagephobia -->

### Input

    <!-- automd:badges color="yellow" license name="defu" codecov bundlephobia packagephobia -->
    <!-- /automd -->

### Output

    <!-- automd:badges color="yellow" license name="defu" codecov bundlephobia packagephobia -->

    [![npm version](https://img.shields.io/npm/v/defu?color=yellow)](https://npmjs.com/package/defu)
    [![npm downloads](https://img.shields.io/npm/dm/defu?color=yellow)](https://npmjs.com/package/defu)
    [![bundle size](https://img.shields.io/bundlephobia/minzip/defu?color=yellow)](https://bundlephobia.com/package/defu)
    [![codecov](https://img.shields.io/codecov/c/gh/unjs/automd?color=yellow)](https://codecov.io/gh/unjs/automd)
    [![license](https://img.shields.io/github/license/unjs/automd?color=yellow)](https://github.com/unjs/automd/blob/main/LICENSE)

    <!-- /automd -->

<!-- /automd -->

## Arguments

::field-group

::field{name="name" type="string"}
The npm package name. By default tries to infer from `package.json`
::

::field{name="github" type="string"}
Github repository name. By default tries to infer from `package.json`
::

::field{name="license" type="boolean"}
Show license badge (requires `github`)
::

::field{name="licenseBranch" type="string"}
Branch to use for license badge defaults to `main`
::

::field{name="bundlephobia" type="boolean"}
Show [Bundlephobia](https://bundlephobia.com/) badge (requires `name`)
::

::field{name="codecov" type="boolean"}
Enable [Codecov](https://codecov.io) badge (requires `github`)
::

::field{name="no-npmDownloads" type="boolean"}
Hide npm downloads badge
::

::field{name="no-npmVersion" type="boolean"}
Hide npm version badge
::

::field{name="provider" type="string"}
Can be one of `shields` (for [shields.io](https://shields.io/)) or `badgen` / `badgenClassic` (for [badgen.net](https://badgen.net/)). Default is `badgen`.
::

::

> [!TIP]
> You can use additional args `color`, `labelColor` to customize style. For provider specific params, use `styleParams`.
