# Automd built-in generator fixtures

## `badges`

<!-- automd:badges bundlephobia packagephobia  -->

[![npm version](https://img.shields.io/npm/v/automd)](https://npmjs.com/package/automd)
[![npm downloads](https://img.shields.io/npm/dm/automd)](https://npmjs.com/package/automd)
[![bundle size](https://img.shields.io/bundlephobia/minzip/automd)](https://bundlephobia.com/package/automd)

<!-- /automd -->

## `pm-x`

<!-- automd:pm-x args=. -->

```sh
# npm
npx automd .

# pnpm
pnpm dlx automd .

# bun
bunx automd .
```

<!-- /automd -->

## `pm-install`

<!-- automd:pm-install dev separate-->

```sh
# ✨ Auto-detect
npx nypm install -D automd
```

```sh
# npm
npm install -D automd
```

```sh
# yarn
yarn add -D automd
```

```sh
# pnpm
pnpm install -D automd
```

```sh
# bun
bun install -D automd
```

<!-- /automd -->

## `jsdocs`

<!-- automd:jsdocs src=./src/test -->

### `config`

#### `checked`

- **Type**: `boolean`
- **Default**: `false`

checked state

#### `dimensions`

Configure the dimensions

**Example:**

```js
{ width: 10, height: 10 }
```

##### `height`

- **Type**: `number`
- **Default**: `10`

Height in px

##### `width`

- **Type**: `number`
- **Default**: `10`

Width in px

#### `name`

- **Type**: `string`
- **Default**: `"default"`

The name of the configuration

#### `price`

- **Type**: `number`
- **Default**: `12.5`

The price

#### `tags`

- **Type**: `array`
- **Default**: `["tag1",null]`

A list of tags

### `sendMessage(message, date, flash?)`

Send a message

This is another description of the function that spans multiple lines.

Again, this is another description of the function that spans multiple lines.

**Example:**

```js
sendMessage("Hello", "7/1/1995", false); // => "OK"
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

---

_🤖 auto updated with [automd](https://automd.unjs.io)_

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

## `contributors`

<!-- automd:contributors author=pi0 license=MIT -->

Published under the [MIT](https://github.com/unjs/automd/blob/main/LICENSE) license.
Made by [@pi0](https://github.com/pi0) and [community](https://github.com/unjs/automd/graphs/contributors) 💛
<br><br>
<a href="https://github.com/unjs/automd/graphs/contributors">
<img src="https://contrib.rocks/image?repo=unjs/automd" />
</a>

<!-- /automd -->

<!-- automd:contributors author=pi0 license=MIT provider=markupgo circleSize=48 center=true  -->

Published under the [MIT](https://github.com/unjs/automd/blob/main/LICENSE) license.
Made by [@pi0](https://github.com/pi0) and [community](https://github.com/unjs/automd/graphs/contributors) 💛
<br><br>
<a href="https://github.com/unjs/automd/graphs/contributors">
<img src="https://markupgo.com/github/unjs/automd/contributors?circleSize=48&center=true" />
</a>

<!-- /automd -->
