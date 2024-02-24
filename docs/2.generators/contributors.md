# contributors

The `contributors` generator generates an image of contributors using [contrib.rocks](https://contrib.rocks/) service plus additional data about authors and license.

## Example

<!-- automd:example generator=contributors author=pi0 license=MIT -->

### Input

    <!-- automd:contributors author="pi0" license="MIT" -->
    <!-- /automd -->

### Output

    <!-- automd:contributors author="pi0" license="MIT" -->

    Published under the [MIT](https://github.com/unjs/automd/blob/main/LICENSE) license.
    Made by [@pi0](https://github.com/pi0) and [community](https://github.com/unjs/automd/graphs/contributors) 💛
    <br><br>
    <a href="https://github.com/unjs/automd/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=unjs/automd" />
    </a>

    <!-- /automd -->

<!-- /automd -->

## Arguments

::field-group
    ::field{name="github" type="string"}
    Github repository name (by default tries to read from `package.json`)
    ::

    ::field{name="max" type="number"}
    Max contributor count (100 by default)
    ::

    ::field{name="anon" type="boolean"}
    Include anonymous users (false by default)
    ::

    ::field{name="author" type="string"}
    Comma separated list of github usersnames.
    ::

    ::field{name="license" type="string"}
    Name of license.
    ::
::
