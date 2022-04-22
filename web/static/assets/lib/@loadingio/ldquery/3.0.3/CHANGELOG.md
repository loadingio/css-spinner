# Change Logs

## v3.0.3

 - downgrade `node-fetch` to `2.6.7` for working with `require`
 - upgrade modules for vulnerabilities fixing


## v3.0.2

 - upgrade `node-fetch` to `3.2.0` to resolve vulnerability.


## v3.0.1

 - release with compact directory structure


## v3.0.0

 - remove `ldq.js`, `ldq.min.js`, use `index.js`, `index.min.js` instead
 - use minimized dist file as main / browser default file
 - further minimize minimized file
 - update dev dependencies


## v2.2.1

 - fix bug: should check against `null` of ending element in `parent` before accessing it.


## v2.2.0

 - support positive and negative list in `cls`.
 - make build faster


## v2.1.0

 - let `parent` by default search up to null to support isolated DOM tree.


## v2.0.0

 - use `lderror` instead `ldError` ( need lderror >=0.1.0 )


## v1.1.3

 - release dist files only.


## v1.1.2

 - fix bug: `fetch` rejection should be handled and pass to upper rejection function.
 - upgrade modules


## v1.1.1

 - add xhr as fetch counterpart for supporting progressive upload
 - add node-fetch for nodeJS support
 - parent() test if contained if selector is ignored
 - use ldError style error ( without dependency ) in ajax error
 - add option to ignore default-header for using ajax.
 - update node-fetch version for vulnerability fixing.
