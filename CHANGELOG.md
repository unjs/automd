# Changelog


## v0.4.1

[compare changes](https://github.com/unjs/automd/compare/v0.4.0...v0.4.1)

### 🩹 Fixes

- **pm-install:** Use `pnpm add` instead of `pnpm install` ([#122](https://github.com/unjs/automd/pull/122))
- **pm, pm-install:** Add `npm:` prefix for deno ([#115](https://github.com/unjs/automd/pull/115))
- **jsimport:** Bun doesn't support url imports ([#112](https://github.com/unjs/automd/pull/112))
- Create missing output dir ([#106](https://github.com/unjs/automd/pull/106))

### 📖 Documentation

- Update config section ([#107](https://github.com/unjs/automd/pull/107))

### 🏡 Chore

- Update deps ([a63bb3e](https://github.com/unjs/automd/commit/a63bb3e))

### ❤️ Contributors

- Daniel Rentz ([@danielrentz](https://github.com/danielrentz))
- Yvbopeng ([@yvbopeng](https://github.com/yvbopeng))
- Huseeiin ([@huseeiin](https://github.com/huseeiin))
- Keito ([@mst-mkt](https://github.com/mst-mkt))
- Selemon Brahanu ([@selemondev](https://github.com/selemondev))
- Pooya Parsa ([@pi0](https://github.com/pi0))

## v0.4.0

[compare changes](https://github.com/unjs/automd/compare/v0.3.12...v0.4.0)

### 🚀 Enhancements

- **file:** Trim contents by default ([#81](https://github.com/unjs/automd/pull/81))
- **file:** Support `lines` arg to limit content ([#46](https://github.com/unjs/automd/pull/46))
- **pm-install:** Support `global` arg ([#53](https://github.com/unjs/automd/pull/53))
- Add support for `markupgo` provider in contributors generator ([#67](https://github.com/unjs/automd/pull/67))

### 🩹 Fixes

- **badges:** Add packagephobia badge from badgen ([441c1df](https://github.com/unjs/automd/commit/441c1df))

### 💅 Refactors

- Migrate globby to tinyglobby ([607981d](https://github.com/unjs/automd/commit/607981d))
- Update to untyped v2 ([8cf342d](https://github.com/unjs/automd/commit/8cf342d))

### 📦 Build

- ⚠️  Esm-only dist ([162abd8](https://github.com/unjs/automd/commit/162abd8))

### 🏡 Chore

- Update deps ([43eaf8c](https://github.com/unjs/automd/commit/43eaf8c))
- Update major deps ([9d498f7](https://github.com/unjs/automd/commit/9d498f7))
- Update ci ([f71953c](https://github.com/unjs/automd/commit/f71953c))
- Lint ([a20f2ea](https://github.com/unjs/automd/commit/a20f2ea))
- Update snapshot ([3d30099](https://github.com/unjs/automd/commit/3d30099))
- Fix typo ([70a8bd0](https://github.com/unjs/automd/commit/70a8bd0))
- Apply automated fixes ([1dc4f8e](https://github.com/unjs/automd/commit/1dc4f8e))
- Update test ([0a8ed83](https://github.com/unjs/automd/commit/0a8ed83))
- Update tsconfig ([f6e5dd8](https://github.com/unjs/automd/commit/f6e5dd8))
- Update docs ([01397b0](https://github.com/unjs/automd/commit/01397b0))
- Apply automated fixes ([1dd1048](https://github.com/unjs/automd/commit/1dd1048))
- Fix lint:fix script ([f6947de](https://github.com/unjs/automd/commit/f6947de))

### ✅ Tests

- Fix typo ([#85](https://github.com/unjs/automd/pull/85))

#### ⚠️ Breaking Changes

- ⚠️  Esm-only dist ([162abd8](https://github.com/unjs/automd/commit/162abd8))

### ❤️ Contributors

- Pooya Parsa ([@pi0](https://github.com/pi0))
- Abdullah <abdullah.mara@skillshare.com>
- Hugo Richard ([@HugoRCD](https://github.com/HugoRCD))
- Horu ([@HigherOrderLogic](https://github.com/HigherOrderLogic))
- Daiki ([@k1tikurisu](https://github.com/k1tikurisu))
- Patryk Tomczyk ([@patzick](https://github.com/patzick))

## v0.3.12

[compare changes](https://github.com/unjs/automd/compare/v0.3.11...v0.3.12)

### 🩹 Fixes

- **jsdocs:** Disable jiti fs cache and module cache to avoid race conditions ([4c7138b](https://github.com/unjs/automd/commit/4c7138b))

### ❤️ Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))

## v0.3.11

[compare changes](https://github.com/unjs/automd/compare/v0.3.10...v0.3.11)

### 🩹 Fixes

- **transform:** Filter empty issues and keep stack trace ([83845d6](https://github.com/unjs/automd/commit/83845d6))

### 🏡 Chore

- **release:** V0.3.10 ([b88f28c](https://github.com/unjs/automd/commit/b88f28c))
- Add automd to `lint:fix` script ([1ed252e](https://github.com/unjs/automd/commit/1ed252e))
- Update dependencies ([0c038a2](https://github.com/unjs/automd/commit/0c038a2))

### ❤️ Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))

## v0.3.10

[compare changes](https://github.com/unjs/automd/compare/v0.3.9...v0.3.10)

### 💅 Refactors

- **badges:** Link to `npm.chart.dev` for npm downloads ([#75](https://github.com/unjs/automd/pull/75))

### 🏡 Chore

- Update deps ([3ad5dd2](https://github.com/unjs/automd/commit/3ad5dd2))

### ❤️ Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))
- Sébastien Chopin <seb@nuxtlabs.com>

## v0.3.9

[compare changes](https://github.com/unjs/automd/compare/v0.3.8...v0.3.9)

### 🚀 Enhancements

- Add support for deno as package manager ([#74](https://github.com/unjs/automd/pull/74))

### 🏡 Chore

- Update dependencies ([0828a0b](https://github.com/unjs/automd/commit/0828a0b))

### ❤️ Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))
- Bartek Iwańczuk <biwanczuk@gmail.com>

## v0.3.8

[compare changes](https://github.com/unjs/automd/compare/v0.3.7...v0.3.8)

### 🚀 Enhancements

- Upgrade c12 with jiti v2 with esm support ([a42d4d2](https://github.com/unjs/automd/commit/a42d4d2))

### 🩹 Fixes

- `version` should be obtained automatically when set to `true` ([#59](https://github.com/unjs/automd/pull/59))

### 📖 Documentation

- Add jsdocs for main exports ([#55](https://github.com/unjs/automd/pull/55))

### 🏡 Chore

- Apply automated fixes ([5ce5ba3](https://github.com/unjs/automd/commit/5ce5ba3))
- Update deps ([cde3b3a](https://github.com/unjs/automd/commit/cde3b3a))
- Update eslint to v9 ([9e68077](https://github.com/unjs/automd/commit/9e68077))

### ❤️ Contributors

- Byron ([@byronogis](http://github.com/byronogis))
- Pooya Parsa ([@pi0](http://github.com/pi0))
- Max ([@onmax](http://github.com/onmax))

## v0.3.7

[compare changes](https://github.com/unjs/automd/compare/v0.3.6...v0.3.7)

### 🚀 Enhancements

- **badges:** Support `bundlejs` ([0ab578e](https://github.com/unjs/automd/commit/0ab578e))

### 💅 Refactors

- **badges:** Switch to `shields` by default ([308381c](https://github.com/unjs/automd/commit/308381c))

### 🏡 Chore

- Update docs ([cc8b1c8](https://github.com/unjs/automd/commit/cc8b1c8))

### ❤️ Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))

## v0.3.6

[compare changes](https://github.com/unjs/automd/compare/v0.3.5...v0.3.6)

### 🚀 Enhancements

- **file:** Allow rendering in code block ([fbb4003](https://github.com/unjs/automd/commit/fbb4003))

### 🩹 Fixes

- **pm-x:** Make version optional ([ffada82](https://github.com/unjs/automd/commit/ffada82))
- **parser:** Support unicode ([21ed0e1](https://github.com/unjs/automd/commit/21ed0e1))
- **parser:** Support unicode ([7ed127a](https://github.com/unjs/automd/commit/7ed127a))
- **watcher:** Debounce event handling ([0ad9c81](https://github.com/unjs/automd/commit/0ad9c81))
- **pm-i:** Don't modify global array! ([977c2c3](https://github.com/unjs/automd/commit/977c2c3))
- Respect multiline description ([#39](https://github.com/unjs/automd/pull/39))

### 💅 Refactors

- Switch to mdbox ([5698d0d](https://github.com/unjs/automd/commit/5698d0d))

### 📖 Documentation

- Use `field-group` & `field` component in args section ([#34](https://github.com/unjs/automd/pull/34))
- Update `file` to `input` for cli usage ([#38](https://github.com/unjs/automd/pull/38))
- Update undocs ([f3c90e3](https://github.com/unjs/automd/commit/f3c90e3))
- Update `src` values to use relative path ([bbe3c12](https://github.com/unjs/automd/commit/bbe3c12))

### 🏡 Chore

- Upate docs ([5fe253e](https://github.com/unjs/automd/commit/5fe253e))
- **release:** V0.3.5 ([cd31db1](https://github.com/unjs/automd/commit/cd31db1))
- Format docs ([cbf800f](https://github.com/unjs/automd/commit/cbf800f))
- Apply automated fixes ([3ec3668](https://github.com/unjs/automd/commit/3ec3668))
- Remove unused code ([#40](https://github.com/unjs/automd/pull/40))

### ❤️ Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))
- Estéban ([@Barbapapazes](http://github.com/Barbapapazes))
- Christian Preston ([@cpreston321](http://github.com/cpreston321))

## v0.3.5

[compare changes](https://github.com/unjs/automd/compare/v0.3.4...v0.3.5)

### 🩹 Fixes

- **pm-x:** Make version optional ([ffada82](https://github.com/unjs/automd/commit/ffada82))

### 🏡 Chore

- **release:** V0.3.4 ([988535d](https://github.com/unjs/automd/commit/988535d))
- Apply automated fixes ([6c6ee1e](https://github.com/unjs/automd/commit/6c6ee1e))
- Upate docs ([5fe253e](https://github.com/unjs/automd/commit/5fe253e))

### ❤️ Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))

## v0.3.4

[compare changes](https://github.com/unjs/automd/compare/v0.3.3...v0.3.4)

### 🩹 Fixes

- **pm-install:** Disable version by default ([f59c5a6](https://github.com/unjs/automd/commit/f59c5a6))

### 📖 Documentation

- Improve auto format ([1fc788a](https://github.com/unjs/automd/commit/1fc788a))

### 🏡 Chore

- Apply automated fixes ([669567b](https://github.com/unjs/automd/commit/669567b))

### ✅ Tests

- Disable version in snapshots ([b7ce756](https://github.com/unjs/automd/commit/b7ce756))

### ❤️ Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))

## v0.3.3

[compare changes](https://github.com/unjs/automd/compare/v0.3.2...v0.3.3)

### 🚀 Enhancements

- Auto normalize key casings ([bc0e4d2](https://github.com/unjs/automd/commit/bc0e4d2))
- **automd:** Expose `unwatch` ([6ee0d6b](https://github.com/unjs/automd/commit/6ee0d6b))
- Improve jsdocs ([d2ee600](https://github.com/unjs/automd/commit/d2ee600))
- Resolve relative to file url ([4790e7c](https://github.com/unjs/automd/commit/4790e7c))

### 🩹 Fixes

- **config:** Add `dir` to defaults ([4017016](https://github.com/unjs/automd/commit/4017016))
- **with-automd:** Hide last update by default ([96e2ade](https://github.com/unjs/automd/commit/96e2ade))
- **cli:** Split input patterns ([efe6285](https://github.com/unjs/automd/commit/efe6285))
- **config:** Extend default ignores ([ea0667a](https://github.com/unjs/automd/commit/ea0667a))

### 📖 Documentation

- Update ([3552482](https://github.com/unjs/automd/commit/3552482))
- Explicitly add automd dep ([f876ff4](https://github.com/unjs/automd/commit/f876ff4))
- Add scule dep ([44fc486](https://github.com/unjs/automd/commit/44fc486))
- Remove additional dependency requirement ([5b0b197](https://github.com/unjs/automd/commit/5b0b197))
- Fix github repo ([a7beba1](https://github.com/unjs/automd/commit/a7beba1))

### 🏡 Chore

- Apply automated fixes ([29ca7d3](https://github.com/unjs/automd/commit/29ca7d3))
- Set automd config for repo ([361cd50](https://github.com/unjs/automd/commit/361cd50))
- Remove dependency on stub ([41cab79](https://github.com/unjs/automd/commit/41cab79))
- Avoid depending automd config on src ([224aad6](https://github.com/unjs/automd/commit/224aad6))
- Disable global setup for now ([41a621d](https://github.com/unjs/automd/commit/41a621d))

### ✅ Tests

- Integrate with automd on repo ([c66a576](https://github.com/unjs/automd/commit/c66a576))
- Fail on issues ([40c6fea](https://github.com/unjs/automd/commit/40c6fea))
- Add `hanging-process` reporter ([4ab612b](https://github.com/unjs/automd/commit/4ab612b))

### ❤️ Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))

## v0.3.2

[compare changes](https://github.com/unjs/automd/compare/v0.3.1...v0.3.2)

### 🚀 Enhancements

- Contributors generator ([f627d63](https://github.com/unjs/automd/commit/f627d63))
- **with-automd:** `separator` option ([7e5d3a6](https://github.com/unjs/automd/commit/7e5d3a6))

### 🩹 Fixes

- Fix auto updated message ([8eaaba9](https://github.com/unjs/automd/commit/8eaaba9))

### 📖 Documentation

- Use quote for args for more clarity ([6b261b9](https://github.com/unjs/automd/commit/6b261b9))

### 🏡 Chore

- **release:** V0.3.1 ([9f60d8d](https://github.com/unjs/automd/commit/9f60d8d))
- Apply automated fixes ([91bb79a](https://github.com/unjs/automd/commit/91bb79a))
- Update readme ([36ce791](https://github.com/unjs/automd/commit/36ce791))
- Update readme ([f74e9ff](https://github.com/unjs/automd/commit/f74e9ff))

### ❤️ Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))

## v0.3.1

[compare changes](https://github.com/unjs/automd/compare/v0.3.0...v0.3.1)

### 🚀 Enhancements

- **badges:** Support packagephobia ([79cb700](https://github.com/unjs/automd/commit/79cb700))
- `js-import` generator ([89a4bf0](https://github.com/unjs/automd/commit/89a4bf0))
- Add `with-automd` generator ([3df4a62](https://github.com/unjs/automd/commit/3df4a62))
- **fetch:** Support `gh:` prefix ([b12087e](https://github.com/unjs/automd/commit/b12087e))
- Support generator unwrap ([3d3422f](https://github.com/unjs/automd/commit/3d3422f))
- `file` generator ([3ca4924](https://github.com/unjs/automd/commit/3ca4924))

### 🩹 Fixes

- **jsdocs:** Trim last line ([7259a71](https://github.com/unjs/automd/commit/7259a71))
- **badges:** Respect `npmVersion` and `npmDownloads` ([01e49f4](https://github.com/unjs/automd/commit/01e49f4))
- **jsimport:** Wrap with `printWith` of `80` ([a65b0c3](https://github.com/unjs/automd/commit/a65b0c3))
- **transform:** Always trim before replace ([c2eb2a9](https://github.com/unjs/automd/commit/c2eb2a9))

### 💅 Refactors

- Rename `js-import` to `jsimport` ([bc9a221](https://github.com/unjs/automd/commit/bc9a221))

### 📖 Documentation

- Use shorthands in examples ([2a6b4de](https://github.com/unjs/automd/commit/2a6b4de))

### 🏡 Chore

- **release:** V0.3.0 ([610dbb3](https://github.com/unjs/automd/commit/610dbb3))
- Apply automated fixes ([0919539](https://github.com/unjs/automd/commit/0919539))
- Update docs ([c79b0e6](https://github.com/unjs/automd/commit/c79b0e6))
- Update snapshot ([c65ce22](https://github.com/unjs/automd/commit/c65ce22))
- Update readme ([cbb521d](https://github.com/unjs/automd/commit/cbb521d))
- Apply automated fixes ([b93f840](https://github.com/unjs/automd/commit/b93f840))
- Add STORY.md ([1aa13eb](https://github.com/unjs/automd/commit/1aa13eb))
- Update dev script ([1b39861](https://github.com/unjs/automd/commit/1b39861))
- Use `gh:` proto for fetch examples ([804ee57](https://github.com/unjs/automd/commit/804ee57))

### ✅ Tests

- Add format test ([0d0dfa1](https://github.com/unjs/automd/commit/0d0dfa1))

### ❤️ Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))

## v0.3.0

[compare changes](https://github.com/unjs/automd/compare/v0.2.0...v0.3.0)

### 🚀 Enhancements

- `pm-i` alias ([#22](https://github.com/unjs/automd/pull/22))
- Support `separate` for pm generators ([#24](https://github.com/unjs/automd/pull/24))
- Did you mean? ([#25](https://github.com/unjs/automd/pull/25))
- `license` badge ([#27](https://github.com/unjs/automd/pull/27))
- ⚠️  Allow to specify `input` and `output` ([92baec6](https://github.com/unjs/automd/commit/92baec6))
- Multi file input/output ([#21](https://github.com/unjs/automd/pull/21))
- Allow extending `ignore` patterns ([e4ac409](https://github.com/unjs/automd/commit/e4ac409))
- Support watcher ([13e391b](https://github.com/unjs/automd/commit/13e391b))
- Pass transform function to generators for sub-generation ([1700a9a](https://github.com/unjs/automd/commit/1700a9a))
- `fetch` generator ([155dfc0](https://github.com/unjs/automd/commit/155dfc0))

### 🔥 Performance

- Resolve config once ([62a757a](https://github.com/unjs/automd/commit/62a757a))

### 🩹 Fixes

- Graceful issue handling ([c02dc1b](https://github.com/unjs/automd/commit/c02dc1b))
- Return original content if no changes ([49421d3](https://github.com/unjs/automd/commit/49421d3))
- **parser:** Check `<!-- /automd -->` to be start of a line ([03a71a5](https://github.com/unjs/automd/commit/03a71a5))

### 💅 Refactors

- Improve badges ([db2fb78](https://github.com/unjs/automd/commit/db2fb78))
- ⚠️  Split transform utils ([014838b](https://github.com/unjs/automd/commit/014838b))
- Avoid `node:` static imports ([2ffa57b](https://github.com/unjs/automd/commit/2ffa57b))
- Simplify `node:` usage for now ([40e49d9](https://github.com/unjs/automd/commit/40e49d9))
- Improve cli impl ([9c6e747](https://github.com/unjs/automd/commit/9c6e747))

### 📖 Documentation

- Various fixes ([#16](https://github.com/unjs/automd/pull/16))
- Use unjs badge colors ([#17](https://github.com/unjs/automd/pull/17))
- Fix syntax example ([#18](https://github.com/unjs/automd/pull/18))
- Update with auto generated examples! ([375367a](https://github.com/unjs/automd/commit/375367a))

### 🏡 Chore

- **release:** V0.2.0 ([f2cc711](https://github.com/unjs/automd/commit/f2cc711))
- Fix readme ([#15](https://github.com/unjs/automd/pull/15))
- Initiate docs ([8801856](https://github.com/unjs/automd/commit/8801856))
- Improve docs formatting ([816bebb](https://github.com/unjs/automd/commit/816bebb))
- Add `docs:dev` script ([bf4bdb1](https://github.com/unjs/automd/commit/bf4bdb1))
- Apply automated fixes ([2b58e08](https://github.com/unjs/automd/commit/2b58e08))
- Remove unused code ([c041248](https://github.com/unjs/automd/commit/c041248))
- Update test ([30d3346](https://github.com/unjs/automd/commit/30d3346))
- Apply automated fixes ([40e11ba](https://github.com/unjs/automd/commit/40e11ba))
- Update lockfile ([a49c629](https://github.com/unjs/automd/commit/a49c629))
- Add `docs:auto:md` command ([dc8085a](https://github.com/unjs/automd/commit/dc8085a))
- Make timings more accurate ([ac1cb8d](https://github.com/unjs/automd/commit/ac1cb8d))

### ✅ Tests

- Update tests ([7c31f11](https://github.com/unjs/automd/commit/7c31f11))
- Add snapshot test for generators ([affd5ee](https://github.com/unjs/automd/commit/affd5ee))

#### ⚠️ Breaking Changes

- ⚠️  Allow to specify `input` and `output` ([92baec6](https://github.com/unjs/automd/commit/92baec6))
- ⚠️  Split transform utils ([014838b](https://github.com/unjs/automd/commit/014838b))

### ❤️ Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))
- Christian Preston ([@cpreston321](http://github.com/cpreston321))
- Uncenter

## v0.2.0

[compare changes](https://github.com/unjs/automd/compare/v0.1.5...v0.2.0)

### 🚀 Enhancements

- `pm-x` generator ([#11](https://github.com/unjs/automd/pull/11))
- Support config ([b05cccb](https://github.com/unjs/automd/commit/b05cccb))
- Custom generators ([c959738](https://github.com/unjs/automd/commit/c959738))
- ⚠️  Better syntax ([#13](https://github.com/unjs/automd/pull/13))
- `badges` generator ([#12](https://github.com/unjs/automd/pull/12))

### 🩹 Fixes

- Allow extended chars in automd comment ([33e440f](https://github.com/unjs/automd/commit/33e440f))

### 💅 Refactors

- Split parse utils ([2381934](https://github.com/unjs/automd/commit/2381934))

### 🏡 Chore

- Add nypm to the list ([8c41fb4](https://github.com/unjs/automd/commit/8c41fb4))
- Update dev script ([e950a09](https://github.com/unjs/automd/commit/e950a09))
- Add vitest dependency ([5b315d4](https://github.com/unjs/automd/commit/5b315d4))
- Update license ([8c8df45](https://github.com/unjs/automd/commit/8c8df45))
- Remove log ([e056ca4](https://github.com/unjs/automd/commit/e056ca4))

### ✅ Tests

- Add unit tests for parse utils ([0bf0a3c](https://github.com/unjs/automd/commit/0bf0a3c))
- Update test for keys with `-` ([c04df9d](https://github.com/unjs/automd/commit/c04df9d))

### 🤖 CI

- Enable vitest ([9ce08f4](https://github.com/unjs/automd/commit/9ce08f4))

#### ⚠️ Breaking Changes

- ⚠️  Better syntax ([#13](https://github.com/unjs/automd/pull/13))

### ❤️ Contributors

- Christian Preston ([@cpreston321](http://github.com/cpreston321))
- Pooya Parsa ([@pi0](http://github.com/pi0))
- Uncenter

## v0.1.5

[compare changes](https://github.com/unjs/automd/compare/v0.1.4...v0.1.5)

### 🚀 Enhancements

- `pm-install` generator ([#9](https://github.com/unjs/automd/pull/9))

### 🩹 Fixes

- Remove log ([b4cdf5f](https://github.com/unjs/automd/commit/b4cdf5f))

### 🏡 Chore

- **release:** V0.1.4 ([b36fe54](https://github.com/unjs/automd/commit/b36fe54))
- Update readme ([f8ee292](https://github.com/unjs/automd/commit/f8ee292))
- Update readme ([957c995](https://github.com/unjs/automd/commit/957c995))

### ❤️ Contributors

- Christian Preston ([@cpreston321](http://github.com/cpreston321))
- Pooya Parsa ([@pi0](http://github.com/pi0))

## v0.1.4

[compare changes](https://github.com/unjs/automd/compare/v0.1.3...v0.1.4)

### 🩹 Fixes

- Remove log ([b4cdf5f](https://github.com/unjs/automd/commit/b4cdf5f))

### ❤️ Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))

## v0.1.3

[compare changes](https://github.com/unjs/automd/compare/v0.1.2...v0.1.3)

### 🚀 Enhancements

- **jsdocs:** Support default group ([9bdda0b](https://github.com/unjs/automd/commit/9bdda0b))

### 🏡 Chore

- Stub after release ([5d7af8f](https://github.com/unjs/automd/commit/5d7af8f))

### ❤️ Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))

## v0.1.2

[compare changes](https://github.com/unjs/automd/compare/v0.1.1...v0.1.2)

### 🚀 Enhancements

- **jsdocs:** Add optional and simplified arg types for objects ([7dc55a4](https://github.com/unjs/automd/commit/7dc55a4))
- Allow desrializing args ([d49593e](https://github.com/unjs/automd/commit/d49593e))
- **jsdocs:** Allow group filter ([0e31974](https://github.com/unjs/automd/commit/0e31974))

### 🩹 Fixes

- Use title case for section titles ([d18e529](https://github.com/unjs/automd/commit/d18e529))

### 💅 Refactors

- Default `headingLevel` to 2 ([4faec97](https://github.com/unjs/automd/commit/4faec97))

### 🏡 Chore

- Add used by section ([3954be9](https://github.com/unjs/automd/commit/3954be9))

### ❤️ Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))

## v0.1.1


### 🚀 Enhancements

- **jsdocs:** Sections and sorting ([97e9b47](https://github.com/unjs/automd/commit/97e9b47))
- **jsdocs:** Upper-first headings ([78e9165](https://github.com/unjs/automd/commit/78e9165))

### 🩹 Fixes

- Skip unkown generators by default ([d28c5b2](https://github.com/unjs/automd/commit/d28c5b2))
- **jsdocs:** Sort uncategorized utils to the end ([8f30476](https://github.com/unjs/automd/commit/8f30476))

### 💅 Refactors

- Simplify cli ([2b09de1](https://github.com/unjs/automd/commit/2b09de1))

### 📖 Documentation

- Fix typos ([#7](https://github.com/unjs/automd/pull/7))

### 🏡 Chore

- Update readme ([7506739](https://github.com/unjs/automd/commit/7506739))
- Update readme ([ef8d3ac](https://github.com/unjs/automd/commit/ef8d3ac))

### ❤️ Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))
- Uncenter

