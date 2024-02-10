# pm-install

The `pm-install` or `pm-i` generator generates installation commands for several JavaScript package managers.

## Usage

```md
  <!-- automd:pm-install name=package-name dev -->
  <!-- /automd -->
```

**Generated Result:**

<!-- automd:pm-install name=package-name dev -->

```sh
# ✨ Auto-detect
npx nypm i -D package-name@^0.2.0

# npm
npm install -D package-name@^0.2.0

# yarn
yarn add -D package-name@^0.2.0

# pnpm
pnpm install -D package-name@^0.2.0

# bun
bun install -D package-name@^0.2.0
```

<!-- /automd -->

## Arguments

- `name`: The package name (by default tries to read from the `name` field in `package.json`).
- `dev`: Install as a dev dependency (defaults to `false`).
- `separate`: Separate code blocks for each package manager (defaults to `false`).
- `auto`: Auto-detect package manager using [unjs/nypm](https://github.com/unjs/nypm#-nypm) (defaults to `true`).
