# file

The `file` generator reads a file and inlines it's contents.

## Example

<!-- automd:example generator=file src="../../test/fixture/src/example.ts" code -->

### Input

    <!-- automd:file src="../../test/fixture/src/example.ts" code -->
    <!-- /automd -->

### Output

    <!-- automd:file src="../../test/fixture/src/example.ts" code -->

    ```ts [example.ts]
    /**
    * Adds two numbers together.
    *
    * @example
    *
    * ```js
    * add(1, 2); // 3
    * ```
    */
    export function add(a: number, b: number) {
    return a + b;
    }

    export const object = {
    /**
    * An object key
    */
    key: {
    /**
    * A subkey
    */
    subkey: "value",
    },
    };
    ```

    <!-- /automd -->

<!-- /automd -->

## Arguments

::field-group

::field{name="src" type="string"}
Relative path to the file.
::

::field{name="code" type="boolean"}
Render file as code.
::

::field{name="lang" type="string"}
Code lang.
::

::field{name="name" type="string|boolean"}
File name in code. Use `no-name` to disable name in code.
::

::field{name="noTrim" type="boolean"}
Don't trim the file contents.
::

::field{name="lines" type="string"}
Limit content to specific lines. e.g. `1:10` for lines 1 to 10.
::

::field{name="delimiter" type="string"}
Limit content using a delimiter string. e.g. `// #######MyFunction#######`   
Delimiter strings can only come in pairs on the src file.
::

