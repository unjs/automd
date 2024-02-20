# contributors

The `contributors` generator generates an image of contributors using [contrib.rocks](https://contrib.rocks/) service plus additional data about authors and license.

<!-- automd:example generator=contributors author=pi0 license=MIT -->

## Example

### Input

    <!-- automd:contributors author=pi0 license=MIT -->
    <!-- /automd -->

### Output

    <!-- automd:contributors author=pi0 license=MIT -->
    
    Published under the [MIT](https://github.com/unjs/automd/blob/main/LICENSE) license.
    Made by [@pi0](https://github.com/pi0) and [community](https://github.com/unjs/automd/graphs/contributors) 💛
    <br><br>
    <a href="https://github.com/unjs/automd/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=unjs/automd" />
    </a>
    
    <!-- /automd -->

<!-- /automd -->

## Arguments

- `github`: Github repository name (by default tries to read from `package.json`)
- `max`: Max contributor count (100 by default)
- `anon` Include anonymous users (false by default)
- `author`: Comma separated list of github usersnames.
- `license`: Name of license.
