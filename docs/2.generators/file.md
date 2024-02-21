# file

The `file` generator reads a file and inlines it's contents.

## Example

<!-- automd:example generator=file src="test/fixture/TEST.md" -->

### Input

    <!-- automd:file src="test/fixture/TEST.md" -->
    <!-- /automd -->

### Output

    <!-- automd:file src="test/fixture/TEST.md" -->
    
    ## The Lazy Coder's Guide to Programming
    
    Programming can be hard. But fear not! With the power of copy-paste, you can conquer any coding challenge without breaking a sweat. Just remember: if it works once, it'll work a thousand times. Who needs original code anyway?
    
    When your code doesn't work, don't blame yourself. It's clearly the compiler's fault for not understanding your genius. Remember, the more error messages you get, the closer you are to becoming a programming master.
    
    Why waste time solving problems when someone else has already done it for you? Stack Overflow is your best friend, your mentor, and your savior. Just make sure to upvote the answers that save your bacon.
    
    <!-- /automd -->

<!-- /automd -->

## Arguments

- `src`: Relative path to the file.