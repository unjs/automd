# pm-x

The `pm-x` generator generates commands for running/executing a package through JavaScript package managers.

<!-- automd:example generator=pm-x version=latest name="package-name" args="[files] <flags>" -->

## Example

### Input

    <!-- automd:pm-x version=latest name=package-name args="[files] <flags>" -->
    <!-- /automd -->

### Output

    <!-- automd:pm-x version=latest name=package-name args="[files] <flags>" -->
    
    ```sh
    # npm
    npx package-name@latest "[files]
    
    # pnpm
    pnpm dlx package-name@latest "[files]
    
    # bun
    bunx package-name@latest "[files]
    ```
    
    <!-- /automd -->

<!-- /automd -->

## Arguments

- `name`: The package name (by default tries to read from the `name` field in `package.json`).
- `separate`: Separate code blocks for each package manager (defaults to `false`).
- `args`: An additional string appended at the end of each command suggesting arguments to be used with the program. (defaults to `""`).
