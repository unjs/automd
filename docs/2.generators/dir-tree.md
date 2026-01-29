# dir-tree

The `dir-tree` generator creates a directory tree visualization for a given path.

## Example

### Input

    <!-- automd:dir-tree src="./src" -->
    <!-- /automd -->

### Output

    <!-- automd:dir-tree src="./src" -->

    ```
    ├── generators/
    │   ├── badges.ts
    │   ├── dir-tree.ts
    │   └── ...
    ├── _utils.ts
    ├── automd.ts
    └── index.ts
    ```

    <!-- /automd -->

## Arguments

::field-group

::field{name="src" type="string"}
Relative path to the directory. Defaults to `.`.
::

::field{name="ignore" type="string"}
Comma-separated list of additional patterns to ignore (e.g., `ignore="tests,*.config.ts"`).
::

::field{name="maxDepth" type="number"}
Maximum depth to traverse. Use `maxDepth=1` to show only the top level.
::

::

## Default Ignores

The following are ignored by default:

- `node_modules`
- `.git`
- `.DS_Store`
- `.nuxt`
- `.output`
- `.nitro`
- `dist`
- `coverage`
- `.cache`
- `.turbo`

Additionally, patterns from `.gitignore` in the target directory are automatically respected.
