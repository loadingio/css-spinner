# Change Logs

## v1.1.1

 - fix bug: proc-each should return Promise, instead of list of Promises
 - fix bug: ensure correct initialization order by waiting for init Promise to resolve before render when `init-render` is enabled.
 - fix bug: nested view initialization should return Promise returned by its own init function call.


## v1.1.0

 - support promise in `init` ( but not yet support render after init resolve )
 - add `view.init`


## v1.0.0

 - upgrade dev modules
 - release with compact directory structure


## v0.2.8

 - use minimized dist file as main / browser default file
 - further minimize minimized file
 - upgrade modules


## v0.2.7

 - fix bug: nested ld-eachs are not proper scoped.
   - to proper fix this we may need a breaking changes with upgraded ldquery dependency.
   - we workaround this for now and expect to remove the workaround in next major release.
 - fix bug ( caused by 0.2.5 ): context for nested views from ld-each doesn't updated by its data


## v0.2.6

 - dont insert ld-each comment if host provided since we don't need pivot from comment.


## v0.2.5

 - support nested local view


## v0.2.4

 - support virtual container


## v0.2.3

 - fix main entry point file name


## v0.2.2

 - add `template` to support recursive views
 - prevent internal view from overwriting options provided by ldview logic 


## v0.2.1

 - support refering to view root with name `@`.
 - support multiple arguments in `render` function.


## v0.2.0

 - only check direct parent instead of ancestor to verify if ld-each node has been processed.


## v0.1.1

 - fix bug: ldview is not in window


## v0.1.0

 - add `ctxs` for nested views.
 - add `ctx` as `context` shorthand. deprecate `context` and expect it to be removed in future major update.
 - add `views` for nested views. views are passed with `baseViews` option.
 - tweak building script and output file names / paths
 - generate with `--no-header` and wrap code with -p in livescript compilation.


## v0.0.2

 - add `attr` and `style` directive. 
 - add `view` directive for nested view for `ld-each`.
