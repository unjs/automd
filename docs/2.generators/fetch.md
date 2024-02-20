# fetch

The `fetch` generator fetches a URL (using [unjs/ofetch](https://ofetch.unjs.io)) and inlines response body.

<!-- automd:example generator=fetch url="https://gist.github.com/pi0/c176defbba5568b6d06ea619a75f6104/raw" -->

## Example

### Input

    <!-- automd:fetch url=https://gist.github.com/pi0/c176defbba5568b6d06ea619a75f6104/raw -->
    <!-- /automd -->

### Output

    <!-- automd:fetch url=https://gist.github.com/pi0/c176defbba5568b6d06ea619a75f6104/raw -->
    
    # The Lazy Coder's Guide to Programming
    
    ## Chapter 1: The Art of Copy-Pasting
    
    ### Section 1.1: Ctrl+C, Ctrl+V, Repeat
    
    Programming can be hard. But fear not! With the power of copy-paste, you can conquer any coding challenge without breaking a sweat. Just remember: if it works once, it'll work a thousand times. Who needs original code anyway?
    
    ## Chapter 2: Debugging 101: Blame the Compiler
    
    ### Section 2.1: It's Not You, It's the Computer
    
    When your code doesn't work, don't blame yourself. It's clearly the compiler's fault for not understanding your genius. Remember, the more error messages you get, the closer you are to becoming a programming master.
    
    ## Chapter 3: Stack Overflow: The Holy Grail
    
    ### Section 3.1: Why Figure It Out Yourself?
    
    Why waste time solving problems when someone else has already done it for you? Stack Overflow is your best friend, your mentor, and your savior. Just make sure to upvote the answers that save your bacon.
    
    <!-- /automd -->

<!-- /automd -->

## Arguments

- `url`: The URL to fetch from

> [!TIP]
> You can start url with `gh:` to use github contents!
