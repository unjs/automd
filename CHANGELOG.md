# Changelog


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

