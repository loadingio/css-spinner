# ldcolor

lightweight JS color library, adopted from d3-color.


## USAGE

construct a color object from some input, such as "#f00", "rgba(0,255,128,1)":

```
    color = new ldcolor(some-color-object-or-string);
```

the result color will be in either RGBA or HSLA. Or, convert to the target format directly:

```
    ldcolor.hex(0xff9922);
    ldcolor.hcl("#f92");
    color = new ldcolor("hsl(50%,50%,50%)");
    rgb = color.rgb();
```


## Spec

ldcolor is an object with following fields:

 * color space specific fields:
   * RGB
     * r: Red component, for RGB.
     * g: Green component, for RGB.
     * b: Blue component, for RGB.
   * HCL / HSL
     * h: Hue component, for HSL/HCL.
     * s: Saturation component, for HSL.
     * c: Chroma component, for HCL.
     * l: Red component, for HSL/HCL.
   * LAB
     * @l: L(Lightness) component, for LAB
     * @a: A\*(Green-Red) component, for LAB
     * @b: B\*(Blue-Yellow) component, for LAB.
   * Generic
     * a: Alpha component, if applicable.
     * hex: hex code for this color, if exists.
     * value: web color value for this color. deprecated.
     * offset: between 0 ~ 1, position if visualized. Also work as offset in gradient.
     * mean: purpose for this color in a palette, if applicable.
   * Application Defined
     TBD.

ldcolor.js wont't write into offset, hex and mean fields.

## API

ldcolor provides following API:

 - `same(color1, color2)` - check if `color1` equals to `color2`.
 - `rgb(color)` - convert `color` to RGB space ( range: 0 ~ 255 ).
 - `rgbfv(color)` - convert `color` to RGB space ( range: 0 ~ 1 ).
 - `web(color)` - convert `color` to web friendly string.
 - `hex(color,compact)` - convert `color` to hex string. use `#fff` format when possible if `compact` is true.
 - `rgbaStr(color)` - convert `color` to rgba string.
 - `hsl(color)` - convert `color` to HSL space
 - `hcl(color)` - convert `color` to HCL space
 - `lab(color)` - convert `color` to LAB space
 - `int(color)` - convert `color` to 24bit integer.
 - `rand()` - randomize and return a color
 - `lighter(color, strength)` - make `color` lighter
 - `darker(color, strength)` - make `color` darker
 - `complement(color)` - get complementary of `color`

These API are also available as a member function in a `ldcolor` object:

    (new ldcolor('#fff')).darker!


## Boundary Condition

 - there is no RGB information in `transparent` string, thus it will return `rgba(NaN,NaN,NaN,0)`.
 - colors with NaN or semi-transparent colors can't be converted to hex code. Thus, in order to use them safely, use `ldcolor.web` instead of `ldcolor.hex` to convert colors if transparency is needed.

## LICENSE

MIT
