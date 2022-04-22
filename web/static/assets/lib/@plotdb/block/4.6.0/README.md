# @plotdb/block

Frontend module library with following features:

 - scoped JS / CSS for vanilla libraries, no bundling required.
 - reuseable, extendable components


## Usage

install `@plotdb/block` along with all necessary js libraries:

    npm install @plotdb/block @plotdb/rescope @plotdb/csscope proxise

and include them:

    <script src="path-to-semver/index.min.js"></script>
    <script src="path-to-proxise/index.min.js"></script>
    <script src="path-to-csscope/index.min.js"></script>
    <script src="path-to-rescope/index.min.js"></script>
    <script src="path-to-block/index.min.js"></script>


## Concept

Similar to `web component`, `@plotdb/block` modularizes frontend codes int components called `block`. A block is defined with a plain HTML file, containing following 3 parts ( all parts are optional ):

 - HTML
 - CSS
 - JavaScript

This is an example of a block HTML file:

    <div>
      <h1> Hello World! </h1>
      <style type="@plotdb/block"> ... </style>
      <script type="@plotdb/block"> ... </script>
    </div>

There is no preferred languages for creae this file. Users can write script in `TypeScript`, use `SASS` for stylesheet. Following is an example with Pug, LiveScript and Stylus with additional Pug filters ( `:stylus` and `:lsc` ):

    div
      h1 Hello World!
      style(type="@plotdb/block"): :stylus
        h1 { color: #543; }
      script(type="@plotdb/block"): :lsc
        module.export = { init: -> console.log \loaded. };

Script can either be an object described as below, or a function returning that object. Styles will be automatically scoped and limited in this block.


## Block Naming and Accessing

To use a block, we need to know how to identify it. Like npm modules, blocks are defined with a `name`, a `version` and an optional `path` and `ns`, where:

 - `name`: use the naming convention as npm. e.g., `@loadingio/spinner`
 - `version`: sematic versioning, tag or hash value. e.g., `0.0.1`
 - `path`: path of the block definition file inside the module `name@version`. `index.html` if omitted.
 - `ns`: namespace for this block, e.g., `npm` or `github`. How this works depends on how registry is implemented.

To access a block with its name, we need a manager ( `block.manager` ):

    manager = new block.manager registry: ({ns,name,version,path}) -> "/block/#name/#version/#path/index.html"
    mananger.init!
      .then -> manager.get({name: "my-block", version: "0.1.0"})
      .then (block) -> ...

A block is represented by a JS object `block.class`, serving as the class for creating a live block instance. A `block.class` is returned by `block.manager`, which can be used to create a block instance ( `block.instance` ):

    manager.get(...)
      .then (block-class) -> block-class.create!
      .then (block-instance) -> ...

A block instance is then injected into web page:

    block-instance.attach({root: document.body})
      .then -> ...


## Core modules

As described above, `@plotdb/block` contains following basic elements:

 - `block.manager` - to access, register, get and cache `block.class`
 - `block.class` - representing the definition of a block, and is used to generate `block.instance`.
 - `block.instance` - object for manipulating state / DOM of a given block.

Additionally, `block` itself provides following functions:

 - `block.id(obj)` - return an ID corresponding to input object with following possible fields:
   - `id`: if `id` exists, it will be returned directly.
   - `url`: if `id` is not found abut `url` exists, `url` will be returned instead.
   - `ns`, `name`, `version`, `path`: if none of above is found, use these to generate an ID.
     - `name` is required in this case.
     - `version` default to `main`, `path` default to `index.html` if not provided.
 - `block.id2obj(id)` - reversely convert id into block with `ns`, `name`, `version` and `path` fields.
 - `block.i18n`
   - `module`: default i18n module object.
   - `use(obj)`: use `obj` to replace `module`.
   - `language`: current used language.
   - `changeLangauge(ns)`: set default language to `ns`.
   - `addResourceBundle(...)`: add resource bundle, with following parameters ( in order ):
     - `lng`: ns for this resource to add.
     - `id`: id if any. default undefined.
     - `resource`: resource to add
     - `deep`: default true.
     - `overwrite`: default true. whether overwrite existing resource or not.
 - `block.env(win)` - set current environment to `win`.


### block.manager

Blocks may be stored in places like:

 - `local`: blocks are loaded into webpages directly via `<script>` tag in HTML.
 - `remote`:  blocks are stored as files in remote URL, accessing via AJAX.

either way we have to provide a way to load, register, cache these blocks - that is, to manage them.


`block.manager` helps us manage blocks by providing following APIs:

 - `constructor(opts)`: create a new block.manager object before using it with opts:
   - `registry`: either function or string, tell `block.manager` where to find remote blocks.
     - `function({name,version,path})`: return URL for given `name`, `version` and `path` of a block.
     - `string`: the registry base url. block.manager will look up blocks under this url with this rule:
       - `/block/<name>/<version>/<path>`
     - this will be used for both block and libraries. To distinquish them, use:

       registry: {lib: (-> ...), block: (-> ...)}   

     - `registry.lib` will be used for querying block if `registry.block` is omitted.

   - `rescope`: optional. should be a `@plotdb/rescope` object if provided.
     - will replace internal rescope object if provided.
   - `csscope`: optional. should be a `@plotdb/csscope` object if provied.
     - will replace internal csscope object if provided.
   - `chain`: optional. fallback manager for chaining block lookup if requested block is not found in current manager.
 - `registry(v)`: update `registry` dynamically.
   - `v`: can be a function, string or an object, similar to the option in constructor.
 - `set({name,version,path,block}): register a block with `name`, `version` and `path`.
   - `block`: a `block-class` object, explained below.
   - `set` also accepts Array of {name,version,block} object for batching `set`.
 - `getUrl({name,version,path})`: get corresponding url for a block with `name`, `version` and `path`.
 - `get({name,version,path,force})`: return a `block-class` object corresponding to `name`, `version` and `path`.
   - `force`: by default, `block.manager` caches result. set `force` to true to force `block.manager` re-fetch data.
   - `get` also accept an array of `{name,version,path,force}` tuples for batching `get`.
      - in this case, `get` returns an array of `block.class`.
 - `from(block-def, attach-opt)`: shorthand for manager.get + class.create + instance.attach + instace.interface
   - return a Promise which resolves to an object `{interface, instance}`:
     - `instance`: created instance
     - `interface`: created interface
   - `block-def`: block definition. see `get()` and above description.
   - `attach-opt`: attach options. see `block.instance`'s `attach()` function.
 - `chain(mgr)`: set a fallback manager for chaining lookup of requested block.
 - `rescope`: rescope object, either global one or customized one.
 - `csscope`: csscope object, either global one or customized one.
 - `id`: shortcut for `block.id`
 - `id2obj`: shortcut for `block.id2obj`


### block.class

`block.class` is a factory for generating block instances. It parses the code of a block based on the block specification and convert them into clonable code, preparing for generating `block.instance` objects on demand.

`block.class` provides following APIs:

 - `constructor(opt)` with following options:
   - `manager`: default block manager for this class. mandatory
   - `name`: block name. mandatory.
   - `version`: block version. mandatory.
   - `path`: block path. optional. `index.html` if omitted.
   - `code`: use to create DOM / style / internal object. it can be one of following:
     - a function. should return either html code or object; returned value will be parsed by corresponding rules.
     - a string, providing HTML code. structure of HTML should follow the definition of a block.
     - an object, containing `dom`, `style` and `script` members.
       - `dom`: HTML code string, or a function returning HTML code string.
       - `style`: should be string for CSS.
       - `script`: function, object or string of code, for interface of the internal object by:
         - function: return the interface.
         - object: as the interface.
         - string: evaled to the interface, or a function which return the interface.
         - for detail of the "interface", see "interface of the internal object" section below.
   - `root`: root of a DOM tree. use to create internal dom tree if provided. Overwrite code.
 - `create(opt)`: create a `block.instance` based on this object. options:
   - `data`: instance data
   - `root`: optional. if provided, attach created instance to `root`, and if provided, before `before`.
   - `before`: optional. as `root`
 - `context()`: get library context corresponding to this block.
 - `i18n(text)`: return translated text based on the current context.

and following private members:

 - `name`: name of this block.
 - `version`: version of this block.
 - `path`: path of this block.
 - `manager`: block manager to use when resolving recursive blocks.
 - `dom`: block DOM tree.
 - `scope`: unique id randomly generated each time when `block.class` is created mainly for scoping purpose.
 - `opt`: raw constructor options.
 - `code`: source code for constructing this block.
 - `script`: source code for this block's script definition.
 - `style`: source code for this block's style definition.
 - `link`: reserved for future use.
 - `styleNode`: node storing parsed / scoped style of this block.
 - `interface`: javascript interface for this block.
   - This will also be used as prototype of the instance object, created by `factory` method below.
 - `factory`: constructor for generating an object defined by `script` part.
 - `id`: unique name for this block.
   - "name@version/path" or randomly generated one if `name` and `version` is not available.
 - `\_ctx`: js context object from `rescope`.
 - `csscopes`
   - `local`: scope list of css for local scope.
   - `global`: scope list of css scope name for global scope.
 - `extend`: extended block, as a `block.class` object.
 - `extendDom`: to extend dom or not.
 - `extends`: array of extended blocks. `extends[0]` is the direct parent class.

To create a `block.instance` based on a `block.class`:

    instance = aBlockClass.create()


To generate block's internal object:

    obj = new aBlockClass.factory(class, instance);

Please note that `obj` (block's internal object) is not the `block.instance` object, but an object based on how this block is defined in its script part.


### block.instance

`block.instance` is an instance of block created from a `block.class`. It's responsible for maintaining block's state and DOM status.

`block.instance` provides following APIs:

 - `constructor(opts)` with following options:
   - `block`: block definition ( `block.class` ) for this instance.
 - `attach({root, data, before})`: attach DOM of this instance to a specific node ( `root` ).
   - return Promise, resolves a list of internal object based on inheriance hierarchy.
   - when run, a block `obj` is created via `block.class`'s factory method and stored in `@obj` member.
     - note `obj` is the block's internal object described above, not the block instance object.
   - when root is omitted, attach block in headless mode ( for pure script )
   - attach DOM by `appendChild` when `before` is omitted, and by `insertBefore` otherwise.
 - `detach()`: detach DOM. return Promise.
 - `update(ops)`: update `datadom` based on provided ops ( array of operational transformation ).
 - `i18n(text)`: return translated text based on the current context.
 - `dom()`: return DOM corresponding to this block. Create a new one if not yet created.
 - `run({node,type})`: execute `type` API provided by `block` implementation with `node` as root. 
 - `transform(cfg)`: (re)transform DOM based on the given `cfg` option, which is:
   - string: name of the transform (e.g., `i18n`) to apply.


and following private members:

 - `obj` - block's data and interface. it's a list containing all objects in the inheritant chain.


### Interface of the internal object

`block.instance` is just a generic object for managing block life cycle. Every block has another object, serves as the internal object that provides real dynamics of the block. This object is created along with `block.instance`, by default with only two members for its creator:

 - `_class`: block class creating the below `_instance`.
 - `_instance`: block instance creating this internal object.

It's interface is implemented by developers with the following spec:

 - `pkg`: block information, described below. optional.
 - `init({root, context, parent, pubsub, data, t, i18n})`: initializing a block. optional.
   - `root`: root element
   - `context`: dependencies in an object.
   - `parent`: object for the direct base block.
   - `pubsub`: for communication between block in extend chain. `pubsub` is an object with following methods:
      - `on(event, cb(parmas))`: handle event with `cb` callback, params from `fire`.
        - return value will be passed and resolved to the returned promise of `fire`.
      - `fire(event, params): fire `event`. return promise.
   - `data`: data passing to `create`. optional and up to user.
   - `t(text)`: translation function based on local, base class and global i18n information. shorthand of `i18n.t`.
   - `i18n`: i18n related helpers including:
     - getLanguage()`: return current used language.
     - `t(text)`: as described above.
     - `addResourceBundles(res)`: dynamically adding i18n resources. sample `res`:
        
        { "zh-TW": {"string", "文字"}, "en-US": {"string": "string"} }

 - `destroy({root, context})`: destroying a block. optional.
 - `interface`: for accessing custom object. optional.
    - either a function returning interface object, or the interface object itself.
    - child block always overwrite parents' interface in an inheritance chain, if available
 - `exports(global)`: for sharing block as a JS library. return objects to export. optional
   - (TBD) user can use a block as a library by adding it in the `dependencies` config, such as:
     - [{name: "some-block", version: "some-vesion", path: "path-to-file"}, ...]

All members are optional thus the minimal definition will be an empty object or even `undefined`:

    {}

Use `module.exports` to explicitly export the desired object:

    module.exports = { .... };


#### Block Information

The `pkg` field of a block interface is defined as:

 - `author`: author name. optional
 - `name`: block name. Follow NPM package naming convention. optional.
 - `version`: Semver string. optional.
    - `name` and `version` is not always necessary if the current block definition is not a standalone package but inside some package.
 - `path`: path of the block definition file in the module. optional.
 - `license`: License. required
 - `description`: description of this block. optional
 - `extend`: optional. block identifier ( `name@version` or `{name, version, path}` ) of block to extend.
   - `name`: parent block's name
   - `version`: parent block's version.
   - `path`: path of the block definition file.
   - `dom`: default true. can be any of following:
     - `true`: use parent's DOM if set true.
     - `false`: completely ignore extended DOM in any ancestor.
     - `"overwrite"`: overwrite parent DOM but extend DOM from grantparent, if any.
   - `style`: default true. can be any of following:
     - `true`: use parent's style if set true.
     - `false`: completely ignore extended style in any ancestor.
     - `"overwrite"`: overwrite parent style but extend style from grantparent, if any.
   - use `plug` ( for html ), `obj` and `pubsub` ( js ) to work with extended block. ( TODO: documentation )
 - `dependencies`: dependencies of this block.
   - list or modules, in case of mutual dependencies:
     ["some-url", {url: "some-url", async: false, dev: true, global: true, type: "css or js"}]
   - options in object notation:
     - `async: true to load this module asynchronously. true by default.
     - `global: for CSS. true if the CSS should also work in global scope. ( under body ). default false.
     - `type`: default `js`. either `css` or `js`.
       - (TBD) support `block` type for preloading block / export block library.
     - `url`: path of required module.
       - generated from name + version + path if omitted. ( TODO )
     - `name`: name of required module ( TODO )
     - `version`: version of required module ( TODO )
     - `mode`: use to control when this module should be loaded. ( TODO )
   - dependencies will be additive in inheritance chain.
 - `i18n`: `i18next` style i18n resource. e.g.,

    {
      "zh-TW": { "name": "名字" }
    }


#### Block Events

(TBD) Following are possible events:

 - before insert
 - init
 - after insert
 - before destroy
 - destroy
 - after destroy
 - update

## i18n configuration

use `block.i18n.use(...)` to switch the core i18n module, which should at least implement following API:

 - `addResourceBundle(lng, ns, resource, deep, overwrite)`
 - `changeLanguage(lng)`
 - `t(text)`

These API are intentionally aligned with `i18next`. Check [i18next documentation](https://www.i18next.com/overview/api) for more information about these API.


A sample setup with `i18next` and `@plotdb/block`:

    i18next.init({supportedLng: ["en", "zh-TW"], fallbackLng: "en"})
      .then(function() { i18next.changeLanguage("zh-TW"); })
      .then(function() { block.i18n.use(i18next); })


## Why block

At first we just want to make web editing easier across expertise, and *block design* ( see [future of web design comes in blocks](https://thecode.co/block-web-design/), [Editor.js](https://editorjs.io/) ) seems to be a trend in web design. It's similar to web components but we will have to do more for making visually editing possible.

While what `@plotdb/block` ( web component & management ) provides is already available in other popular frameworks, `@plotdb/block` is actually designed with following criteria thus makes it different with others:

 * version management
   - blocks are managed with proper versioning.
   - blocks should work even using the same lib with different versions without `import`.
     - popular frameworks use `import` which will have to bundle js within.
     - even if bundle is not necessary, many libs don't support `import` and will need wrapper.
 * framework agnostic
   - prevent from abducted by specific framework
   - while we seem to invent `yet another framework`:
     - `@plotdb/block` is only for components. no state management, no reactive.
     - thus, any js frameworks are expected to work well with `@plotdb/block`.
 * As Simple as Possible
   - making a component is extremely easy. ( KISS principle )
     - there is no new syntax to learn in `@plotdb/block`, only interface.
 * Collaborative
   - `@plotdb/block` is built along with `@plotdb/datadom` for DOM serialization.
     - this makes it by default suitable for serialization, thus also for collaboration
     - editing can be described by concepts such as operational transformation
 * DOM manipulating with UI ( cross expertise editing )
   - this is covered in `@plotdb/editable`.


## Resources

 - Related modules
   - editable: cross-expertise editor interface based on a set of predefined attributes over plain HTML.
   - datadom: DOM in JSON, with extension.
   - registry: block module storage and delivery.


## License

MIT
