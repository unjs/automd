# pm-install

The `pm-install` or `pm-i` generator generates installation commands for several JavaScript package managers.

<!-- automd:example generator=pm-install name=package-name dev -->

## Example

### Input

    <!-- automd:pm-install name=package-name dev=true -->
    <!-- /automd -->

### Output

    <!-- automd:pm-install name=package-name dev=true -->
    
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

<!-- /automd -->

## Arguments

- `name`: The package name (by default tries to read from the `name` field in `package.json`).
- `dev`: Install as a dev dependency (defaults to `false`).
- `separate`: Separate code blocks for each package manager (defaults to `false`).
- `auto`: Auto-detect package manager using [unjs/nypm](https://github.com/unjs/nypm#-nypm) (defaults to `true`).
