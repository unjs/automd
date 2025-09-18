# cli-usage

The `cli-usage` generator run a CLI command with `npx` and `--help` flag and inlines the output as Markdown code block.

Use `command` argument to specify the command to run, by default it will use the `name` field in `package.json`.

## Example

<!-- automd:example generator=cli-usage command="automd" -->

### Input

    <!-- automd:cli-usage command="automd" -->
    <!-- /automd -->

### Output

    <!-- automd:cli-usage command="automd" -->

    ```sh
    [log] Your automated markdown maintainer! (automd v0.4.0)

    USAGE `automd [OPTIONS] `

    OPTIONS

    `--dir`    current working directory
    `--input="README.md"`    name or path the markdown input to update
    `--output`    name or path the markdown output (defaults to input)
    `--watch`    watch for changes in input files and regenerate output
    ```

    <!-- /automd -->

<!-- /automd -->

## Arguments

::field-group

::field{name="command" type="string"}
The command to run with `npx` (by default it will use the `name` field in `package.json`).
::
