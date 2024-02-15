# pm-x

The `pm-x` generator generates commands for running/executing a package through JavaScript package managers.

<!-- automd:example generator=pm-x name="package-name" args="[files] <flags>" -->

## Example

### Input

    <!-- automd:pm-x name=package-name args="[files] <flags>"=true -->
    <!-- /automd -->

### Output

    <!-- automd:pm-x name=package-name args="[files] <flags>"=true -->
    
    ```sh
    # npm
    npx package-name@0.2.0 "[files]
    
    # pnpm
    pnpm dlx package-name@0.2.0 "[files]
    
    # bun
    bunx package-name@0.2.0 "[files]
    ```
    
    <!-- /automd -->

<!-- /automd -->

## Arguments

- `name`: The package name (by default tries to read from the `name` field in `package.json`).
- `separate`: Separate code blocks for each package manager (defaults to `false`).
- `args`: An additional string appended at the end of each command suggesting arguments to be used with the program. (defaults to `""`).
