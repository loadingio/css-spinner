# Change Logs

## v3.0.1

 - remove unnecessary `fs-etra` dependency


## v3.0.0

 - release with compact directory structure


## v2.1.2

 - add `style` field in `package.json`


## v2.1.1

 - use minimized dist file as main / browser default file
 - upgrade modules


## v2.1.0

 - support initializing DOM based on `template` tag for shadow DOM.
 - only insert DOM when cover is active. behavior controlled by `resident` option.
 - mangle + compress minimized js to optimize its size in advance.
 - lazy initializing until toggling if `root` is a template.
 - update document for undocumented features
 - member `root` is now a function for accessing `_r` (formal `root`)
 - support `inline` mode
   - modal displayed inline yet not affect layout
   - dismiss on clicking outside dialog


## v2.0.0

 - support `zmgr` directly in ldcover constructor
 - use zmgr fallback instead of zstack implementation to simplify code logic
 - remove legacy `ldCover` definition
 - update window object only if module is not available
 - rename `ldcv.*` to `index.*`
 - rename static method `set-zmgr` to `zmgr`
 - support multiple event syntax


## v1.3.3

 - add `cancel` api for canceling `get` call by promise rejection.
 - add `data-ldcv-cancel` directive corresponding to `cancel` api.


## v1.3.2

 - upgrade modules
 - add `ldcover` and deprecate `ldCover`


## v1.3.1

 - bug fix: move transition to `.running, .active` classes so there won't be a initial flash of dialog content.


## v1.3.0

 - add `setZmgr` for managing z-index globally.
 - update demo for testing `setZmgr`.


## v1.2.0

 - upgrade `template` and `livescript`
 - add `bootstrap.ldui` for development.
 - add `ldview` and `ldquery` for development.
 - tweak build script
 - refactor web/
 - add `mini` style ldcover.


## v1.1.1

 - fix bug: escape should not close all modals, but only the topmost modal.
   - as a side effect we add an ldcv list ( `popup` ) in ldCover object to track popup order.


## v1.1.0

 - add lock function
 - fix bug: incorrect z-index calculation for nested cover
 - change scrolling behavior - default no scrolling
 - add demo site code
