# js-import

The `js-import` generator generates JavaScript usage example to be imported.

<!-- automd:example cjs cdn generator=js-import name=pkg imports="foo,bar" -->

## Example

### Input

    <!-- automd:js-import cjs=true cdn=true name=pkg imports=foo,bar -->
    <!-- /automd -->

### Output

    <!-- automd:js-import cjs=true cdn=true name=pkg imports=foo,bar -->
    
    **ESM** (Node.js, Bun)
    
    ```js
    import {
      foo,
      bar,
    } from "pkg";
    ```
    
    **CommonJS** (Legacy Node.js)
    
    ```js
    const {
      foo,
      bar,
    } = require("pkg");
    ```
    
    **CDN** (Deno, Bun and Browsers)
    
    ```js
    import {
      foo,
      bar,
    } from "https://esm.sh/pkg";
    ```
    
    <!-- /automd -->

<!-- /automd -->

## Arguments

- `name`: The package name (by default tries to read from the `name` field in `package.json`).
- `import`/`imports`: Array or comma seperated list of export names.
- `no-esm`: Disable ESM instructions.
- `cdn`: Generate CDN import usage.
- `cjs`: Generate CommonJS require usage.
- `src`: Auto scan export names from src using [unjs/mlly](https://mlly.unjs.io).
