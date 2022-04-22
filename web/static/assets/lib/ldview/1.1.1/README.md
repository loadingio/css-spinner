# ldView

A simple, logic-less client side template engine.


## Usage

ldView works by defining what elements are and how should they be processed - you can think of this as the concept of `JS Selector`, like `CSS Selector`.

Instead of defining how html should be rendered inside DOM, we name elements and assign processors in JavaScript according to their names.

For example, following code names three DIVs with "ld" attributes in "plan free", "plan month", and "plan year":

    body
      div(ld="plan free")
      div(ld="plan month")
      div(ld="plan year")


To bind the corresponding processor, create a new ldView object with a handler object:

    view = new ldview do
      root: document.body
      handler:
        # this example actually demonstrates how to do a if/else or switch/case statement.
        plan: ({node, names, name, idx, ctx, local, views}) ->
          node.style.display = (if currentPlan in names => 'block' else 'none')

view by default will be rendered after initialized, but you can render it again with `render` api:

    view.render!


### loop with ld-each

ldView supports basic looping too. Declare an element to be looped with "ld-each" attribute:

    .shelf
      div(ld-each="book")
        .name(ld="name") Sample Name
        .author(ld="author") Sample Author

the element with "book" ld-each attribute will be replaced by a comment node. Then, you can bind it with an array of elements to automatically generate a list of similar book elements with a slightly different handler config:

    new ldview do
      handler:
        # instead of a simple handler function,
        # here we have an object containing a list function and a handler function
        book:
          # tell ldView to map book elements to myBookList
          list: -> myBookList

          # optional key getter for stable update
          # key: -> it.key

          # node is one of the nodes cloned from the original book element
          # and the data is entry bound to node from myBookList.
          handler: ({node,data,name}) ->

in list config, you can use all configs available for a generic items. for example,

    book:
      list: -> ...
      init: ({node, data, name, idx}) ->
      handler: ({node, data, name, idx}) -> ...
      text: -> ...
      action: click: ({node, name, evt, idx}) -> ...


### ld-each view

While you can manually update DOM content in the handler, you can also recursively apply ldView to make the whole process simpler:

    new ldview do
      handler:
        # instead of a simple handler function,
        # here we have an object containing a list function and a handle function
        book:
          list: -> myBookList # tell ldView to map book elements to myBookList
          init: ({node,data}) ->
            (new ldview do
               root: node,
               handler:
                 name: (.node.textContent = data.name)
                 author: (.node.textContent = data.author)
            ).render!

Or, let ldView do it for you with `view` option:

    new ldview do
      handler:
        # instead of a simple handler function,
        # here we have an object containing a list function and a handle function
        book:
          list: -> myBookList # tell ldView to map book elements to myBookList
          view:
            handler:
              name: ({node, ctx}) -> node.textContent = ctx.name
              author: ({node, ctx}) -> node.textContent = ctx.author

While you can use the same options in this view config as the ldview constructor, following fields will be overwritten by ldview:

 - `initRender`
 - `root`
 - `baseViews`
 - `ctx`
 - `ctxs`

It's also possible to recursively apply ldview. For more information, check `Recursive Views and Template` section below.


### partial rendering

After initialization, You probably will want to update some elements instead of updating every node. Just pass target names into render function:

    view = new ldview( ... );
    view.render!
    # after some updates ... only update ld="name" elements.
    view.render <[name]>

For updating partial entries in `ld-each`, use following syntax with keys:

    view.render {name: 'some-ld-each-name', key: [key1, key2, ... ]}

Be sure to make sure keys here matches the return value of `key` accessor, in case of matching failure.


### customize ld-each behavior / list optimization

You can also specify `host` parameter to tell ldview how to process child elements. For example, with a large list of data, we may want to use `@loadingio/vscroll` for virtual scrolling, which effectively reduces amount of elements in the DOM tree:

    new ldview({
      handler:
        item:
          host: vscroll.fixed
          list: -> ...
          ...
    })

where the `host` parameter should be a constructor that mimic basic DOM element interface. For more information, check `@loadingio/vscroll`.


## Scoping

Scope the DOM fragment with `scope` pug mixin and `scope` function available in ldview's `index.pug`:

    include /path-to-ldview/index.pug
    +scope("scope-name")
      div(ld="node-name") my element.

Above code fragment will output something like this:

    <div ld-scope="scope-name">
      <div ld="node-name"> my element </div>
    </div>

`ld-scope` will prevent other views to look up elements inside this scope.

If you want to mix views, you can set the scope to `naked` by adding a `naked-scope` class:

    +scope("scope-name").naked-scope
      div(ld="node-name") my element

This will output following:

    <div ld="node-name"> my element </div>

While this seems to equal to doing nothing, you can prefix `ld` attribute by `scope-name` with `prefix` function in order to distinguish elements for different views:

    +scope("scope-name").naked-scope
      div(ld=prefix("node-name")) my element
      div(ld="global-name") global element

becomes

    <div ld="scope-name$node-name"> my element </div>
    <div ld="global-name"> global element </div>

To access prefix-ed node, adding `prefix` option when initializing ldView:

    var localView = new ldview({prefix: 'scope-name', handler: {
      "node-name": function(node) { ... }
    });
    var localNode = localView.get("node-name");

    var globalView = new ldview({handler: {
      "node-name": function(node) { ... }
    });
    var globalNode = globalView.get("global-name");


Basically `Scope` and `Prefix` are mutual exclusive; with `scope` you don't have to prefix since only you can access `ld` elements within this scope.


## Configurations

 * `root` - view root
 * `handler` - object containing name / handler pairs.
   - name will be used when querying DOM in `ld` attribute.
   - handler accept an object as argument:
   - node: the target node
 * `action` - action handler. object containing event names such as click, mousemove, etc.
   - each member contains a handler object similar to the root handler.
   - example:

    action: {
      click: {
        buy: ({node, evt}) -> ...
      }
      change: {
        name: ({node, evt}) -> ...
        title: ({node, evt}) -> ...
      }

 * `prefix` - prefix name for this view. view will be global if scope name is not defined.
   this should be used along with the scope pug mixin.
 * `initRender` - if set to true, ldView automatically calls render immediately after initialized. default true
 * `global` - set true to use `pd` and `pd-each` for access nodes globally beyond ld-scope. default false.
 * `ctx` - default data accessible with in handler functions. can be set later with `setContext` api.
   - `context` is used as `ctx` before `0.1.0`, and it's now `ctx`.
 * `template` - template DOM for replacing root content. It's for supporting recursive views.
 * `ctxs` and `baseViews` - these config are used internally. Don't use this unless you know what's your doing.

## API

 * new ldview({root, handler , ...})
   handler: hash with node-names as key and function as value.
   - function: ({node}) which node is the element matched with this node-name.
 * view.getAll("node-name") - return a list of nodes in the name of node-name.
 * view.get("node-name") - return the first node with the name of node-name. shorthand for getAll(...)[0]
 * view.init(cfg) - return a Promise that resolves after all init resolves.
 * view.render(cfg)
 * view.setCtx(v) - set a custom context object for using in handler functions.
   - `setContext` is used before `0.1.0`. use `setCtx` now.
 * view.bindEachNode({container, name, node, idx})
   - ldView keeps track of nodes once they are created as in ld-each.
     If for some reason we need a node to be removed from ld-each list but use in other place ( e.g.,
     when dragging outside we need the dragged node to exist for better user experience ), we can
     unbind it and rebind it later.
   - while node is removed from / inserted into ld-each node list, these functions wont update data.
     User should update data themselves otherwise inserted node will be deleted / removed node will
     be re-created in the next render call.
   - parameters:
     - container: container of these ld-each nodes.
     - idx: index to insert this node.
     - node: node to be inserted.
     - name: name of ld-each.
 * view.unbindEachNode({container, name, node, idx})
   - counterpart of bindEachNode.
   - parameters:
     - container: container of these ld-each nodes.
     - idx: if provided, remove node in this position and return it.
     - node: if idx is not provided, user can use the node itself to hint ldView.
     - name: name of ld-each.

## Handler Parameters

When handlers for each ld node is called, it contains following parameters:

 * `node` - current node
 * `names` - all name in ld/pd for current node, space separated.
 * `name` - matched name for current handler of this node.
 * `idx` - index of current node, if this rule matches multiple times.
 * `local` - local data for storing information along with the node, in its life cycle.
 * `ctx` - view-wise data, set via `setCtx` API. default null.
   - `context` is used before 0.1.0. use `ctx` now.
 * `data` - only for `ld-each` node. bound data for this node.
 * `evt` - event object if this handler is an event handler.
 * `evts` - hash for listing all bound events.
 * `ctxs` - contexts in all parent view when using nested view feature.
 * `views` - list of views (including views built recursively) for invoking this handler
   - `views[0]` is always the current view. larger number gets ancestor views.


## Recursive Views and Template

It's possible to define view recursively - simply refer a view config in itself:

    (cfg = {}) <<< handler: someDirective: {
      list: -> ...
      view: cfg
    }

However, this requires a recursively defined DOM, which is only possible with `template` option:

    div(data-name="template"): ...
    script(type="text/livescript").
      new ldview (cfg = {}) <<< {
        template: document.querySelector('[data-name=template]')
        handler: someDirective: {
          list: ({ctx}) -> ...
          view: cfg
        }
      }

In this case, the div named `template` will be cloned, attached and used as inner DOM of this view, recursively applied according to the return content of `list`. For a working example, check `web/src/pug/recurse/index.ls`.


## Nested Local Views and Template

It's possible to nest a local view in a selector:

    new ldview({
      handler: localView:
        handler: ...
    });

However, nodes under this local view are still visble to its parent view. Use `ld-scope` to prevent accessing from parent view:

    div(ld-scope,ld="localView"): ...


Or, use `template` instead, which is by default scoped:

    new ldview({
      handler: localView:
        template: ...
        handler: ...
    });

check `web/src/pug/scope/index.ls` for a working example of local views.

## License

MIT

