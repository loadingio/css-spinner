# Change Logs

## v4.0.5

 - add missing `@plotdb/semver`


## v4.0.4

 - fix bug: default filename incorrectly written as `index.min.js`, which should be `index.min.css`.


## v4.0.3

 - fix bug: use `cssText` for wrapped content generation to keep css variable as is.


## v4.0.2

 - fix bug: `:scope` doesn't work if additional rules appended after `:scope`


## v4.0.1

 - downgrade `node-fetch` back to `v2.6.7` to make it work in nodejs


## v4.0.0

 - fix bug: registry.fetch is used even if not defined.
 - default empty in version / path when building id
 - lookup acceptable versions in cache if version range provided.
 - support custom registry that return content + version directly.
 - use minimized dist file as main / browser default file
 - upgrade modules
 - patch test code to make it work with upgraded modules
 - release with compact directory structure



## v3.0.3

 - fix bug: we use animationName, which is not available in JSDOM context.
 - dedup in bundler
 - fix typo in id function
 

## v3.0.2

 - fix bug: `csscope` instead of `csp` is used but only `csp` is defined


## v3.0.1

 - fix bug: missing `o` variable name in `load` function


## v3.0.0

 - rename `csscope.js`, `csscope.min.js` to `index.js`, `index.min.js`


## v2.0.3

 - remove ldquery dependency
 - support fetch in nodejs context
 - use stable scope naming
 - support bundling


## v2.0.2

 - support custom environment
 - support as a node module
 - use `cssRules` to replace legacy `rules` member of `CSSStyleSheet`
 - add sample usage in node environment


## v2.0.1

 - set `title` for iframe for accessibility
 - add `index.js`, `index.min.js` and deprecate `csscope.js`, `csscope.min.js`
 - upgrade modules
 - make building faster
 - add caching
 - simplify registry and url code
 - tweak variable naming
 - add lib spec information
 - use cache for prebundling to optimize loading process
 - fix bug: append different comment to force css rules to refresh
 - support scoping of parsed CSS string ( CSSRuleList ) directly


## v2.0.0

 - rename param `scope` to optional `rule` param, and and `name` as default param.


## v1.0.0

 - rename `set-registry` to `registry`.
 - align registry logic with `@plotdb/rescope` and `@plotdb/block`.
 - change from `lib` to `assets/lib` for default registry root


## v0.5.0

 - support module style( `{name,version,path}` ) style url
 - support customizing `registry` for module style url


## v0.4.1

 - fix bug: `!important` is gone after csscoping. add this by checking `getPropertyPriority`.


## v0.4.0

 - change api: `load` and `get` now returns url + scope class object ( { url, scope } )


## v0.3.1

 - fix bug: scoping doesn't work with css rules starting with a tag name.


## v0.3.0

 - upgrade modules
 - support csscope.manager for sharing css libraries / frameworks between different scopes.


## v0.2.1

 - fix bug: selector with pseudo class not work due to `:not` appended.


## v0.2.0

 - fix typo in comment
 - add `:scope` handling to support styling of element in scope root.


## v0.1.0

 - bug fix: scoped css should not affect child scope, unless enabled explicitly.
 - add `scope-test` option so user can specify how to identify a scope root.
 - additional comment.
 - upgrade dependency and remove useless package.


## v0.0.3

 - bug fix: manually generate css text since fields like `name`, `selectorText` in CSSStyleSheet are read-only.
   - overwriting `name`, `selectorText` randomly works in Chrome but is not reliable.

## v0.0.2

 - add support to animation names.
 - add support to (nested) media queries.

