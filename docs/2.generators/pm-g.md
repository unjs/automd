# pm-g

The `pm-g` generator generates commands for installing a package globally using several JavaScript package managers.

## Example

<!-- automd:example generator=pm-g name="package-name" -->

### Input

    <!-- automd:pm-g name="package-name" -->
    <!-- /automd -->

### Output

    <!-- automd:pm-g name="package-name" -->

    <!-- ⚠️  Unknown generator:`pm-g`. Did you mean "generator:`pm-i`"? -->

    <!-- /automd -->

<!-- /automd -->

## Arguments

::field-group

::field{name="name" type="string"}
The package name (by default tries to read from the `name` field in `package.json`).
::
::field{name="separate" type="boolean"}
Separate code blocks for each package manager (defaults to `false`).
::

::
