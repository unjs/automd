# Automd built-in generator fixtures

## `badges`

<!-- automd:badges bundlephobia packagephobia  -->

[![npm version](https://flat.badgen.net/npm/v/automd)](https://npmjs.com/package/automd)
[![npm downloads](https://flat.badgen.net/npm/dm/automd)](https://npmjs.com/package/automd)
[![bundle size](https://flat.badgen.net/bundlephobia/minzip/automd)](https://bundlephobia.com/package/automd)
[![install size](https://flat.badgen.net/packagephobia/publish/automd)](https://packagephobia.com/result?p=automd)

<!-- /automd -->

## `pm-x`

<!-- automd:pm-x args=. -->

```sh
# npm
npx automd@0.3.0 .

# pnpm
pnpm dlx automd@0.3.0 .

# bun
bunx automd@0.3.0 .
```

<!-- /automd -->

## `pm-install`

<!-- automd:pm-install dev separate-->

```sh
# ✨ Auto-detect
npx nypm i -D automd@^0.3.0
```

```sh
# npm
npm install -D automd@^0.3.0
```

```sh
# yarn
yarn add -D automd@^0.3.0
```

```sh
# pnpm
pnpm install -D automd@^0.3.0
```

```sh
# bun
bun install -D automd@^0.3.0
```

<!-- /automd -->

## `jsdocs`

<!-- automd:jsdocs -->

### `add(a, b)`

Adds two numbers together.

**Example:**

```js
add(1, 2); // 3
```

<!-- /automd -->

## `jsimport`

<!-- automd:jsimport cjs=true cdn=true name=pkg imports=foo,bar -->

**ESM** (Node.js, Bun)

```js
import { foo, bar } from "pkg";
```

**CommonJS** (Legacy Node.js)

```js
const { foo, bar } = require("pkg");
```

**CDN** (Deno, Bun and Browsers)

```js
import { foo, bar } from "https://esm.sh/pkg";
```

<!-- /automd -->

## `with-automd`

<!-- automd:with-automd -->

_🤖 docs are auto updated with [automd](https:/automd.unjs.io) (last updated: Tue Feb 20 2024)_

<!-- /automd -->

## `fetch`

<!-- automd:fetch url="gh:unjs/automd/main/test/fixture/TEST.md" -->

## The Lazy Coder's Guide to Programming

Programming can be hard. But fear not! With the power of copy-paste, you can conquer any coding challenge without breaking a sweat. Just remember: if it works once, it'll work a thousand times. Who needs original code anyway?

When your code doesn't work, don't blame yourself. It's clearly the compiler's fault for not understanding your genius. Remember, the more error messages you get, the closer you are to becoming a programming master.

Why waste time solving problems when someone else has already done it for you? Stack Overflow is your best friend, your mentor, and your savior. Just make sure to upvote the answers that save your bacon.

<!-- /automd -->

## `file`

<!-- automd:file src="./TEST.md" -->

## The Lazy Coder's Guide to Programming

Programming can be hard. But fear not! With the power of copy-paste, you can conquer any coding challenge without breaking a sweat. Just remember: if it works once, it'll work a thousand times. Who needs original code anyway?

When your code doesn't work, don't blame yourself. It's clearly the compiler's fault for not understanding your genius. Remember, the more error messages you get, the closer you are to becoming a programming master.

Why waste time solving problems when someone else has already done it for you? Stack Overflow is your best friend, your mentor, and your savior. Just make sure to upvote the answers that save your bacon.

<!-- /automd -->
