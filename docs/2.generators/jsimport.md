# jsimport

The `jsimport` generator generates JavaScript usage example to be imported.

## Example

<!-- automd:example cjs cdn generator=jsimport name=pkg imports="foo,bar" -->

### Input

    <!-- automd:jsimport cjs cdn name="pkg" imports="foo,bar" -->
    <!-- /automd -->

### Output

    <!-- automd:jsimport cjs cdn name="pkg" imports="foo,bar" -->

    **ESM** (Node.js, Bun, Deno)

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

<!-- /automd -->

## Arguments

::field-group

::field{name="name" type="string"}
The package name (by default tries to read from the `name` field in `package.json`).
::

::field{name="import/imports" type="string"}
Array or comma separated list of export names.
::

::field{name="no-esm" type="boolean"}
Disable ESM instructions.
::

::field{name="cdn" type="boolean"}
Generate CDN import usage.
::

::field{name="cjs" type="boolean"}
Generate CommonJS require usage.
::

::field{name="src" type="boolean"}
Auto scan export names from src using [unjs/mlly](https://mlly.unjs.io).
::

::field{name="printWidth" type="number"}
The maximum length that requires wrapping lines. Default is `80`
::

::
