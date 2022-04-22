# Change Log

## v3.0.1

 - keeps only 3 decimal places in opacity when picking opacity with picker


## v3.0.0

 - upgrade modules
 - release with compact directory structure
 - rename `ldcp.js` to `index.js`, `ldcp.min.js` to `index.min.js`
 - rename `ldcp.css` to `index.css`, `ldcp.min.css` to `index.min.css`
 - update `style`, `main` and `browser` field in `package.json`.
 - further minimize generated js file with mangling and compression


## v2.0.5

 - only insert ldcp DOM when toggling on to improve performance.


## v2.0.4

 - improve popup boundary check
 - add `vertical`, `horizontal` class for automatically popup direction detection.


## v2.0.3

 - fix bug: typo during palette initialization 
 - make building faster
 - depenedency to ldcolor should be peerDependency. upgrade ldcolor


## v2.0.2

 - fix bug: if getColor returns a color object, a copy of the object should be returned instead.

## v2.0.1

 - remove postinstall to prevent from breaking dependency installation


## v2.0.0

 - upgrade ldcolor which deprecate the use of `ldColor` variable.
 - rename `ldColorPicker` to `ldcolorpicker`
 - fix typo which causes custom palettes in HTML not work.
 - support oncolorchange and onpalettechange correctly. 
 - parse custom palette with space separated colors correctly.
 - bind palpool later when @elem inited


## v1.1.1

 - upgrade modules for fixing vulnerabilities
 - upgrade livescript version


## v1.1.0

 - rename package.
 - limit distributed files.
