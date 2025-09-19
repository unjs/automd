# cli-output

The `cli-output` generator run a CLI command with `npx` inlines the output as Markdown code block.

Use `command` argument to specify the command to run, by default it will use the `name` field in `package.json`.

## Example

<!-- automd:example generator=cli-output command="automd" args="--help" -->

### Input

    <!-- automd:cli-output command="automd" args="--help" -->
    <!-- /automd -->

### Output

    <!-- automd:cli-output command="automd" args="--help" -->

    ```sh

    ```

    <!-- /automd -->

<!-- /automd -->

## Arguments

::field-group

::field{name="command" type="string"}
The command to run with `npx` (by default it will use the `name` field in `package.json`).
::

::field{name="args" type="string"}
The arguments to pass to the command. (defaults to `""`).
::

::field{name="usage" type="boolean"}
Show usage information. (defaults to `false`), shortcut for `args="--help"`.
::
