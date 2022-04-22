# @plotdb/rescope

experimental project. Load and scope any external JavaScript and reload scope on demand. 

For example, assume here are the list of js url we'd like to load, which kept in `libs` variable:

 - assets/lib/bootstrap.native/main/bootstrap-native.min.js
 - assets/lib/bootstrap.ldui/main/bootstrap.ldui.min.js
 - assets/lib/@loadingio/ldquery/main/ldq.min.js
 - assets/lib/ldcover/main/ldcv.min.js
 - assets/lib/ldview/main/ldview.min.js


We can load all above js files with rescope, with a resolveed context containing all imported variables:

    scope = new rescope!
    scope.init!
      .then -> scope.load libs
      .then (context) -> myfunc(context)


Once loaded, we can access context for those libraries:

    myfunc = ->
      scope.context libs, (context) ->
        {ldcover, ld$} = context
        # now ldcover and ld$ are available ...
        ldcv = new ldcover do
          root: ld$.find('.ldcv', 0)

This is useful when you need the same library with different versions:

    d3 = do
      v3: 'https://d3js.org/d3.v3.min.js'
      v6: 'https://d3js.org/d3.v6.min.js'

    scope = new rescope!
    scope.load d3.v6
      .then -> scope.load d3.v3
      .then -> scope.context d3.v6, ({d3}) -> /* run v6 code with local d3 variable ... */
      .then -> scope.context d3.v3, ({d3}) -> /* run v3 code with local d3 variable ... */

While it's possible to load context into window object, we may run into trouble with concurrent overlapped context calls, so the context is always available as local variables. Always rely on the passed `context` object to access required libraries.


## Semantic URL / Module Loading

Instead of plain URLs, you can also request a library with its name, version and relative path. For example, 

    {url: "assets/lib/@loadingio/ldquery/main/ldq.min.js"}

can be represented as:

    {name: "@loadingio/ldquery", version: "main", path: "ldq.min.js"}

This abstracts the location of libraries and thus can be customized if needed with `registry` option:

    new rescope({registry: function(opt) {  return opt.name + opt.version + opt.path; });

Return promise from a registry function call for a directly content resolving - in this case you should return an object in following form:

 - `version`: exact version of the return object.
 - `content`: content for the requested resource.

`registry` can also be an object with `fetch` as a member function. Check `@plotdb/registry` for advanced registry usage.


where registry, if provided, should be a function:

 - accepting an object with following members:
   - `name`: module name
   - `version`: module version
   - `path`: relative path to the requested file
 - and return corresponding url based on those members, for example:
   - `return ["https://jsdelivr.net/npm", opt.name, opt.version, opt.path].join('/');`


## Customized Context

Libraries can be loaded correctly in one single `load` invocation because `rescope` take care of the scope issue in `load` stage for us.

However,

 - if we need `load` in separated stages, we may run into trouble of missing dependencies to libraries loaded earlier.
 - Additionally, we may want to load libraries into a specific context stored before.

To keep track of the context loaded , we pass an optional object directly into `load`:

    scope.load libs, (ctx = {}) .then -> ...

once loaded, the empty object `ctx` above will be filled with the loaded objects from libraries in `libs`. This `ctx` can then be used in turn in the following `load` calls:

    ctx = {}
    scope.load libs1, ctx
      .then -> scope.load libs2, ctx
      .then -> scope.load libs3, ctx
      .then -> ...

in this manner, following libraries `libs2` and `libs3` can be loaded with the context of previous loaded libraries `libs1` without them being written in 1 load call.


## Asynchronous Script Loading

By default all script are loaded asynchronously. You can force them loaded in synchronous manner, by extending URL into object with following options:

 - url: URL to load
 - async: load asynchronously if set to true. default true.


## Delegate Window

By default `rescope` uses iframe window to preload libraries and peek variables they defined. The iframe is called delegate window. Apparently behavior for the host and the delegate is not the same.

We specify an option `delegate` and set it to false to tell `@plotdb/rescope` that this instance doesn't use delegate ( itself is a delegate ):

    new rescope({delegate: false});

Additionally, you can also run code within delegate's context, by setting 'useDelegateLib' to `true`:

    new resope({useDelegateLib: true})

This will only work when `delegate` is set to true ( which is by default ). With `useDelegateLib` set to true, all libraries loaded with the rescope object will work under a separated window and document object. Please note, it won't work as expected when cross refer libraries between two different global scope, so don't mix up libraries in different global scope.

Even with `useDelegateLib` set to true, you can still enter host context by setting the second parameter to `false` when calling `context`:

    res = new rescope({useDelegateLib: true});
    res.context("some-lib", false, function() { ... });

## Caching

Instead of downloading libraries everytime, you can also precache libraries into a single js file.

After downloading all necessary libraries, get js for caching by:

    ret = rescope.cacheDump();

the return value `ret` is the runnable JS string which insert cached libraries into `rescope` class. Or, manually inject cache by calling:

    rescope.cache(
      "some-url",
      {
        code: "code",
        vars: [list of string for available variable names in dependency]
      }
    )


## Polyfills

use `prejs` when constructing for inserting pre-required JS into both host and delegate environment:

    new rescope({prejs: ["https://...", ...]});


## TODO

 - Browser compatibility check
   - works in all major browsers ( latest Chrome, Firefox, Safari, Opera, Edge )
   - doesn't work in IE11
 - Performance benchmark


## Note

 - This is not meant to be used for sandboxing or for security reason. `@plotdb/rescope` never prevent any scripts from accessing document, and all scripts are still run in the main thread.
 - some libraries such as `d3` may check and use object with the name they are going to use if exists. Thus we always have to restore context in case of disrupt their initialization process.
 - rescope mimics `window` object but there are still limitations. If a library declares a variable by `window.somevar` but accessing it with `somevar`, it will fail.


## Resources

 - Realm may help in what we want to do:
   - https://github.com/tc39/proposal-realms/#ecmascript-spec-proposal-for-realms-api
   - https://github.com/Agoric/realms-shim
   - https://www.figma.com/blog/how-we-built-the-figma-plugin-system/
 - also check how Vue does its own scoping in template:
   - https://github.com/vuejs/vue/blob/v2.6.10/src/core/instance/proxy.js#L9


## License 

MIT
