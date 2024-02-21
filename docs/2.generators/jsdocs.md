# jsdocs

The `jsdocs` generator can automatically read through your code and extract and sync documentation of function exports leveraging JSDocs and TypeScript hints.

Internally it uses [untyped](https://untyped.unjs.io/) and [jiti](https://github.com/unjs/jiti) loader for JSDocs parsing and TypeScript support.

## Example

<!-- automd:example generator=jsdocs src="test/fixture/src/index" -->

### Input

    <!-- automd:jsdocs src="test/fixture/src/index" -->
    <!-- /automd -->

### Output

    <!-- automd:jsdocs src="test/fixture/src/index" -->
    
    ### `add(a, b)`
    
    Adds two numbers together.
    
    **Example:**
    
    ```js
    add(1, 2); // 3
    ```
    
    <!-- /automd -->

<!-- /automd -->

## Arguments

- `src`: Path to the source file. The default is `./src/index` and can be omitted.
- `headingLevel`: Nested level for markdown group headings (default is `2` => `##`). Note: Each function uses `headingLevel+1` for the title in nested levels.
- `group`: Only render function exports annotated with `@group name`. By default, there is no group filter. Value can be a string or an array of strings.
