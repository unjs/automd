# ui-code-tree

The `ui-code-tree` generator creates a [Nuxt UI CodeTree](https://ui.nuxt.com/components/code-tree) component from a directory. It reads all files in the directory and generates MDC syntax that renders as an interactive file browser with syntax-highlighted code.

## Example

### Input

    <!-- automd:ui-code-tree src="./src" default="index.ts" -->
    <!-- /automd -->

### Output

    <!-- automd:ui-code-tree src="./src" default="index.ts" -->

    ::code-tree{defaultValue="index.ts"}

    ```ts [index.ts]
    export { automd } from "./automd.ts";
    ```

    ```ts [config.ts]
    export interface Config {
      input: string[];
    }
    ```

    ::

    <!-- /automd -->

## Arguments

::field-group

::field{name="src" type="string"}
Relative path to the directory. Defaults to `.`.
::

::field{name="default" type="string"}
The file path to select by default in the code tree (e.g., `default="src/index.ts"`).
::

::field{name="ignore" type="string"}
Comma-separated list of additional patterns to ignore (e.g., `ignore="README.md,*.test.ts"`).
::

::field{name="maxDepth" type="number"}
Maximum depth to traverse. Use `maxDepth=1` to show only the top level.
::

::field{name="expandAll" type="boolean"}
Expand all directories by default in the rendered code tree.
::

::

## Default Ignores

The following are ignored by default:

- `node_modules`
- `.git`
- `.DS_Store`
- `.output`
- `dist`
- `coverage`
- `.cache`
- `pnpm-lock.yaml`
- `package-lock.json`
- `yarn.lock`

Additionally, patterns from `.gitignore` in the target directory are automatically respected.

## Supported Languages

File extensions are automatically mapped to syntax highlighting languages:

| Extension | Language |
|-----------|----------|
| `.ts`, `.tsx` | TypeScript |
| `.js`, `.jsx`, `.mjs`, `.cjs` | JavaScript |
| `.vue` | Vue |
| `.json` | JSON |
| `.html` | HTML |
| `.css`, `.scss` | CSS |
| `.md` | Markdown |
| `.yaml`, `.yml` | YAML |
| `.toml` | TOML |
| `.sh`, `.bash`, `.zsh` | Bash |
