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

::field{name="provider" type="string"}
Available providers are `markupgo` and `contrib.rocks` (default is `contrib.rocks`)
::

::field{name="github" type="string"}
Github repository name (by default tries to read from `package.json`) e.g. `unjs/automd`
::

::field{name="max" type="number"}
Max contributor count (100 by default). 

Set to 0 for all contributors. Max avatar count is 500. (Only available for `markupgo`)
::

::field{name="circleSize" type="number"}
Size of contributor circle (40 by default) (Only available for `markupgo`)
::

::field{name="circleSpacing" type="number"}
Spacing between contributor circles (6 by default) (Only available for `markupgo`)
::

::field{name="circleRadius" type="number"}
Radius of contributor circle (40 by default) (Only available for `markupgo`)
::

::field{name="center" type="boolean"}
Center the contributor circles (false by default) (Only available for `markupgo`)
::

::field{name="removeLogo" type="boolean"}
Remove the logo (false by default) (Only available for `markupgo`)
::

::field{name="width" type="number"}
Width of the image (890 by default) (Only available for `markupgo`)
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
