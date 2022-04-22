![ldcolorpicker Banner](https://loadingio.github.io/ldcolorpicker/img/banner.png)

Palette-Aware Color Picker. [Demo + docs here](http://loadingio.github.io/ldcolorpicker/).

Features:
 * Load palette on the fly
 * Share palette across pickers
 * vanilla JS / jQuery / AngularJS compatible
 * highly configurable


Usage
--------

Download and include [dist/ldcp.min.js](https://raw.githubusercontent.com/loadingio/ldcolorpicker/master/dist/ldcp.min.js) and [dist/ldcp.css](https://raw.githubusercontent.com/loadingio/ldcolorpicker/master/dist/ldcp.css) file of ldcolorpicker:

    <link rel="stylesheet" type="text/css" href="ldcp.css"/>
    <script type="text/javascript" src="ldcp.min.js"></script>


Add data-toggle="colorpicker" in the input box you want to apply ldcolorpicker, e.g.:

    <input type="input" id="ldcp">


and initialize with following script:

    <script type="text/javascript">
      new ldcolorpicker(document.querySelector('#ldcp'),{});
    </script>


Documentation
---------------

check [this url](http://loadingio.github.io/ldcolorpicker/) for documentation and demos.



Todo
---------------

 * add 'pinned' indicator
 * mobile support


Naming Issue
---------------

Due to naming conflict with `ld-color-picker`, this package is named "@loadingio/ldcolorpicker" instead of "ldcolorpicker".


License
---------

MIT License
