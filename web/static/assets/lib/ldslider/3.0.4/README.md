# ldSlider

Slider Library in Vanilla JS. Support exponential scale.


## Usage


1. download and include ldSlider [JS](https://github.com/loadingio/ldslider/releases/latest/download/ldrs.min.js) / [CSS](https://github.com/loadingio/ldslider/releases/latest/download/ldrs.min.css):

    <link rel="stylesheet" type="text/css" href="ldrs.css"/>
    <script type="text/javascript" src="ldrs.js"></script>

you an use a CDN, such as, from jsDelivr:

    <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/gh/loadingio/ldslider@v1.0.0/dist/ldrs.min.css"/>
    <script type="text/javascript" src="//cdn.jsdelivr.net/gh/loadingio/ldslider@v1.0.0/dist/ldrs.min.js"/>


2. create a new ldslider instance for using ldSlider's API:

    ldrs = new ldslider(configs);
    ldrs.set(value);

Example:

    <div class="ldrs"></div>
    <script> ldrs = new ldslider({root: document.querySelector('.ldrs')}); </script>

You can also use an input box to initialize ldslider:

    <input class="ldrs" data-class="form-control">
    <script> ldrs = new ldslider({root: document.querySelector('.ldrs')}); </script>

In this case, a new `div` will be created and inserted before the `input` element, inherits all classes of the `input` element. The `input` element's type will be set to `hidden`.

You can use an optional `data-class` attribute in `input` to define the classes of the input element.


## API

 - `set(value, forceNotify)`: set slider's value
    - if `forceNotify` set to true, Notify listeners if value is changed.
    - value is a number with number slider, and is `{from, to}` object with range slider.
 - `get()`: get slider's value. return number with number slider, and `{from,to}` object with range slider.
 - `setConfig(config)`: update slider's config. 
 - `on("change", cb(value))`: listen to value change.
   - `value` parameter in `cb` is a number with number slider and `{from,to}` object with range slider.
 - `edit(v)`: toggle input box on (v = true) or off (v = false). auto swtich if v is undefined.
   this only works if you init ldrs over input element.
 - `update()`: update ui. useful when your slider is out of place ( sometimes due to toggle display and set value when widget is not visible.)


## Configuration

 * `root`: when the range slider kicks in.
 * `range`: true if it's a range slider.
 * `min`: minimal value
 * `max`: maximal value
 * `step`: each step when dragging
 * `from`: default value
 * `to`: default value for alternative pointer. ( only effective in range slider )
 * `exp`: setup exponential scale.
   - `exp.percent`: when slider to move this percent ...
   - `exp.value`: ... the value should be map to this percent. 
   - for example:
     - {output: 0.9, input: 0.1} lets the slider to output 90% from min to max when slider is in the 10% position.
     - {output: 0.5, input: 0.5} equals to linear scale.
 * `label`: custom label.
   - `label.min` - text for showing in minimal value label
   - `label.max` - text for showing in maximal value label
   - `label.ptr(v)` - function that convert v ( value ) to the returned customized string that representing v.


## Decorating Classes

Add following css classes to decorate your range slider:

 * `up` - force all tips toward up.
 * `ldrs.sm` - small size slider
 * `ldrs.lg` - large size slider
 * `ldrs.auto` - adjust slider size based on context font size
 * `ldrs.auto.sm` - adjust slider size based on context font size, while make it smaller
 * `ldrs.auto.lg` - adjust slider size based on context font size, while make it larger


Some quick and useful tweaks:

 * gap between bar and tips:
   - .ldrs { height: 34px; }
   - .ldrs .hint { top: 0; }
   - .ldrs .bar { top: 18px; }
   - .ldrs .ptr { top: 15px; }

## Restyling with CSS Variable

Default colorschema of ldslider can be changed with CSS variables by adding `tone` class along with `ldrs` class:

    <div class="ldrs tone"> ... </div>

There are four variables:

 - `--fg`: foreground color.
 - `--bg`: background color.
 - `--text`: active text color.
 - `--text-muted`: muted text color.

Here is an example with blue slider bar and yellow active text:


    .ldrs.tone {
      --fg: #09f
      --bg: #eee
      --text: #ff0
      --text-muted: #aaa
    }


## DOM Structure

    .ldrs
      .bar
        .cap
        .cap
        .bar-inner
          .bk
          .fg
          .line.p     //- indicator line for chosen value
          .line.lock  //- indicator line for lock value
          .hint.p     //- chosen value pointer
      .hint.l
      .hint.lock
      .hint.r


## Off Screen Rendering Issue

Off screen rendering of the slider may be incorrect because we don't have the correct box size. We use ResizeObserver to redraw so you will consider using ResizeObserver Polyfill in older browser.


## Credit

To provide a more consistent visual effect, ldslider embeds a number font directly in CSS: 

 - [Crash Numbering Gothic](https://www.psyops.com/crash-numbering/), released under free license

We expect to replace this with a more compact font file crafted exclusively for ldslider.

The font-family value in ldrs.css is set to `ldrs-default-font` only for convenience.


## License

MIT
