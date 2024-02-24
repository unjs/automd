# with-automd

The `with-automd` generator generates a benner that notifies docs are updated with automd + the last update time.

## Example

<!-- automd:example generator=with-automd -->

### Input

    <!-- automd:with-automd -->
    <!-- /automd -->

### Output

    <!-- automd:with-automd -->

    ---

    _🤖 auto updated with [automd](https://automd.unjs.io)_

    <!-- /automd -->

<!-- /automd -->

## Arguments

::field-group
    ::field{name="lastUpdate" type="string"}
    Show last updated date. (use string for static value)
    ::
    ::field{name="no-separator" type="boolean"}
    Disable addition of separator `---`
    ::
::
