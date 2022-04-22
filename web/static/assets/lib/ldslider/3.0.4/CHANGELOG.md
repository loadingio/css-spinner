# Change Log

## v3.0.4

 - upgrade modules to fix vulnerabilities
 - fix bug: resizeObserver should be installed after root is correctly set


## v3.0.3

 - add resizeObserver to fix slider rendering bug when off screen.


## v3.0.2

 - release with compact directory structure


## v3.0.1

 - remove `ldSlider` and keep `ldslider` since we expect to remove it in v3


## v3.0.0

 - rename `ldrs.js`, `ldrs.css` to `index.js`, `index.css`. also do the same to source files.
 - add `main`, `browser` and `style` fields in `package.json`.
 - further minimize js file with mangling and compression options.
 - make build faster by bypassing `npx` command
 - upgrade modules


## v2.0.6

 - fix bug: ldrs.update should check range flag.


## v2.0.5

 - remove postinstall to prevent from breaking dependency installation


## v2.0.4

 - add `ldslider` and deprecate `ldSlider`.


## v2.0.3

 - use `number ~ number` instead of `number to number` for input value.
 - duse default value `0` for input value if parseFloat fails.


## v2.0.2

 - handle right-click issue


## v2.0.1

 - remove the dependency of ldiconfont by mimicing lock icon with pure CSS.


## v2.0.0

 - use `crash numbering gothic` font and tweak vertical offset, especially for Firefox.
 - remove redundant and unnecessary width / right style in bar width
 - align class name ( .lock-line to .line.lock, .ptr to .line.p )
 - tweak stylus source code for better readability
 - add crashing-number default font for consistent size.
   - use `ldrs-default-font` for placeholder and easier plug-play.
 - add font.styl which inline font directly.
 - support range slider and custom variables for styling


## v1.1.1

 - upgrade modules


## v1.1.0

 - rename package.
