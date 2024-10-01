# pm-x

The `pm-x` generator generates commands for running/executing a package through JavaScript package managers.

## Example

<!-- automd:example generator=pm-x version=latest name="package-name" args="[files] <flags>" -->

### Input

    <!-- automd:pm-x version="latest" name="package-name" args="\"[files]" <flags>" -->
    <!-- /automd -->

### Output

    <!-- automd:pm-x version="latest" name="package-name" args="\"[files]" <flags>" -->

    ```sh
    # npm
    npx package-name@latest "[files]

    # pnpm
    pnpm dlx package-name@latest "[files]

    # bun
    bunx package-name@latest "[files]

    # deno
    deno run -A npm:package-name@latest "[files]
    ```

    <!-- /automd -->

<!-- /automd -->

## Arguments

::field-group

::field{name="name" type="string"}
The package name (by default tries to read from the `name` field in `package.json`).
::
::field{name="separate" type="boolean"}
Separate code blocks for each package manager (defaults to `false`).
::
::field{name="args" type="string"}
An additional string appended at the end of each command suggesting arguments to be used with the program. (defaults to `""`).
::
::field{name="version" type="boolean"}
Show version in exec command
::

::
