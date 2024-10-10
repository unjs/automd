# src-link

The `src-link` generator creates a Markdown link to the lines matching a string or regular expression in a local or GitHub source file.

## Example

<!-- automd:example generator=src-link src="../../test/fixture/TEST.md" pattern="Lazy Coder's Guide" label="fixture source" -->

### Input

    <!-- automd:src-link src="../../test/fixture/TEST.md" pattern="Lazy Coder's Guide" label="fixture source" -->
    <!-- /automd -->

### Output

    <!-- automd:src-link src="../../test/fixture/TEST.md" pattern="Lazy Coder's Guide" label="fixture source" -->

    [fixture source](../../test/fixture/TEST.md#L1)

    <!-- /automd -->

<!-- /automd -->

## Arguments

::field-group

::field{name="src" type="string"}
The local path or GitHub source. GitHub sources can use a full URL or the `gh:owner/repo/blob/ref/path` shorthand.
::

::field{name="pattern" type="string"}
The text to find. Wrap the value in `/.../flags` to use a regular expression.
::

::field{name="label" type="string"}
The link text.
::

::

## Usage

```markdown
<!-- automd:src-link src="gh:nuxt/nuxt/blob/main/packages/schema/src/types/hooks.ts" pattern="/export interface NuxtHooks/" label="Nuxt hooks source" -->

[Nuxt hooks source](https://github.com/nuxt/nuxt/blob/main/packages/schema/src/types/hooks.ts#L110)

<!-- /automd -->
```
