# src-link

The `src-link` generator automatically creates links to specific lines in the GitHub file, or relative to the markdown file, by looking for patterns.

## Example

<!-- automd:example generator=src-link src="gh:nuxt/nuxt/blob/main/packages/schema/src/types/hooks.ts" pattern="export interface NuxtHooks" label="schema source code" -->

### Input

    <!-- automd:src-link src="gh:nuxt/nuxt/blob/main/packages/schema/src/types/hooks.ts" pattern="\"export" interface NuxtHooks" label="\"schema" source code" -->
    <!-- /automd -->

### Output

    <!-- automd:src-link src="gh:nuxt/nuxt/blob/main/packages/schema/src/types/hooks.ts" pattern="\"export" interface NuxtHooks" label="\"schema" source code" -->

    <!-- ⚠️  Unknown generator:`src-link`. -->

    <!-- /automd -->

<!-- /automd -->

## Arguments

::field-group

::field{name="src" type="string"}
The relative path of the file or the GitHub URL where the file is located. If it is a GitHub URL, it should start with `gh:`.
::

::field{name="pattern" type="string"}
The pattern to search for in the file. This can be a string or a regular expression.
::

::field{name="label" type="string"}
The text for the link to appear in the markdown output.
::

::

## Usage

Instead of manually maintaining line numbers in your documentation, you can use the `src-link` generator to automatically create links to specific lines in GitHub files or relative to the markdown file. For example:

```markdown
Check the <!-- automd:src-link src="gh:nuxt/nuxt/blob/main/packages/schema/src/types/hooks.ts" pattern="export interface NuxtHooks" label="schema source code" --> for all available hooks.
```

This will generate a link to the correct line in the file, even if the line number changes in the future.