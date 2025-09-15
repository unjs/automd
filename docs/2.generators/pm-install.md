# pm-install

The `pm-install` or `pm-i` generator generates installation commands for several JavaScript package managers.

## Example

<!-- automd:example generator=pm-install name=package-name dev -->

### Input

    <!-- automd:pm-install name="package-name" dev -->
    <!-- /automd -->

### Output

    <!-- automd:pm-install name="package-name" dev -->

    ```sh
    # ✨ Auto-detect
    npx nypm install -D package-name

    # npm
    npm install -D package-name

    # yarn
    yarn add -D package-name

    # pnpm
    pnpm add -D package-name

    # bun
    bun install -D package-name

    # deno
    deno install --dev package-name
    ```

    <!-- /automd -->

<!-- /automd -->

## Arguments

::field-group

::field{name="name" type="string"}
The package name (by default tries to read from the `name` field in `package.json`).
::

::field{name="dev" type="boolean"}
Install as a dev dependency (defaults to `false`).
::

::field{name="global" type="boolean"}
Install globally (useful for CLIs) (defaults to `false`).
::

::field{name="separate" type="boolean"}
Separate code blocks for each package manager (defaults to `false`).
::

::field{name="auto" type="boolean"}
Auto-detect package manager using [unjs/nypm](https://github.com/unjs/nypm#-nypm) (defaults to `true`).
::

::field{name="version" type="boolean"}
Show version in install command
::

::
