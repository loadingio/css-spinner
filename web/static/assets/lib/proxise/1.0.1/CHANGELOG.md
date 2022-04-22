# Change Logs

## v1.0.1

 - release with compact directory structure


## v1.0.0

 - remove `proxise.js`, `proxise.min.js` but keeping `index.js`, `index.min.js`
 - use minimized dist file as main / browser default file
 - update dev dependencies


## v0.1.6

 - make it work with nodejs
 - rename `proxise.js` to `index.js` but keep the deprecated `proxise.js`.


## v0.1.5

 - fix bug: scope of proxise.once should still be object instead of window.
 - fix bug: proxise.once should pass options into callback function yet it doesn't


## v0.1.4

 - reduce minimized js size with mangle + compress in uglifyjs
 - wrap js with compiler option
 - dont populate window if module is defined


## v0.1.3

 - resolve original return value for proxise.once.
 - accept additional optional option in proxise.once for alternative resolved value


## v0.1.2

 - bug fix: when proxise.once fails, promise for caller is still resolved instead of rejected.


## v0.1.1

 - don't assume `cb` in proxise.once return Promise - just wrap it with promise.


## v0.1.0

 - add `proxise.once` for running functions that should be executed successfully for at most only once.
