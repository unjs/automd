# with-automd

The `with-automd` generator generates a benner that notifies docs are updated with automd + the last update time.

<!-- automd:example generator=with-automd lastUpdate="now" -->

## Example

### Input

    <!-- automd:with-automd lastUpdate=now -->
    <!-- /automd -->

### Output

    <!-- automd:with-automd lastUpdate=now -->
    
    _🤖docs are auto updated with [automd](https:/automd.unjs.io) (last updated: now)_
    
    <!-- /automd -->

<!-- /automd -->

## Arguments

- `lastUpdate`: Can override last updated time. Use `no-lastUpdate` to disable.
