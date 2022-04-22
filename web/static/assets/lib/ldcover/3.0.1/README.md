# ldcover

vanilla popup / dialog library.


## Usage

install with npm:

    npm install ldcover

include required files ( `index.js` and `index.css` ), and create a ldcover object:

    var ldcv = new ldcover({ ... });


## Constructor Options

 - `root`: container.
   - you can use `template` tag as root for better performance during initialization. The first child in the template will be used as the real root for this ldcover.
 - `type`: additional class to add. default: ''. space seprated.
 - `transform-fix`: true/false. default: false.
   add a 'shown' class after ldcover is shown, which removes transform from .inner block.
   useful when content is blurred due to transform, but might lead to glitches when doing transition. use it carefully.
 - `delay`: milliseconds. default 300. should be aligned with transition duration. use to control 'shown' and 'running' classes.
 - `auto-z`: update root's z-index automatically. default true.
 - `base-z`: the minimal z-index of root. default 1000.
   - with auto-z, ldcover keeps track of all cover' z-index and always use larger z-index for newly toggled covers. base-z is then used as a base value for all auto-z covers.
 - `animation`: optional space separated class list.
   - will be added to .inner node when toggling on, and removed when toggling off.
   - handy for adding customized animation from libraries like transition.css or animate.css.
 - `escape`: should pressing escape key close the dialog. boolean, default true, optional.
 - `lock`: default false. if set to true, only API or data-ldcv-set could close this modal.
 - `resident`: default false. if set to true, DOM for this cover will always attached under document. otherwise false.
   - not resident node will be attached under `container` or document.body.
 - `container`: container for non-resident cover. by default parent of DOM or document.body
   - by default, non-resident cover is inserted to the location we find it. Set `container` to change this behavior.
     - when `container` is null, `root` is appended at the end of `document.body` when toggled.
     - otherwise, `root`is appended at the end of `container` when toggled.


## Object Methods

 - `toggle(state)`: toggle on/off ldcover.
 - `get()`: toggle on ldcover and return a promise, which will only be resolved when ldcover.set is called.
 - `set(v, hide=true)`: set value, which resolve promises from get, and hide ldcover if hide = true.
   - use `data-ldcv-set` on elements to automatically set value when elements are clicked.
 - `cancel(err, hide=true)`: reject promise returned by `get` with given error `err`.
   - a default `Error` object with `{name: 'lderror', id: 999}` will be used if `err` is omitted.
   - ldcover is hidden if `hide` = true. true by default.
   - use `data-ldcv-cancel` on elements to automatically cancel when clicked.
 - `on(event, cb)`: listen to certain event. evnets:
   - toggle.on: when ldcover is toggled on.
   - toggle.off: when ldcover is toggled off.
 - `isOn()`: is this modal active ( opened ). return true or false
 - `root()`: get cover root node.
 - `zmgr(mgr)`: set z-index manager for this cover. return the zmgr used if `mgr` is omitted.
 - `append(node)`: insert `node` in the base node of this cover.
   - useful if this ldcover is created without root.


## Class Method

 - `zmgr(zmgr)`: set a shared z-index manager. useful to manager widget z-index globally.
   this manager should provide following methods:
   - `add(baseVal, size)`: return actual added value.
     - baseVal: hint value for the z-index we'd like to use
     - size: hint size about how large the object we added is
   - `remove(val)`: remove val ( returned by add ) from this manager.


## Spec. and structure

A simple ldcover popup are built with following html structure:

 * .ldcv          - topmost, fullscreen container
   * .base        - control the overall size and position for this box ( could be omit )
     * .inner     - dialog container. constraint size. transition animation goes here


one can decorate ldcover widgets by adding classes over the outmost element. following classes are defined by default:

 * .ldcv.bare:
   - no covered bk.
   - custom position for .ldcv > .base
   - overflow: visible for .ldcv > .base > .inner (why?)
 * .ldcv.lg, .ldcv.md
   - different size of panel. instead of using this, you could also set size directly on .base element.
 * .ldcv.full - fullscreen modal.
 * .ldcv.light - light overlay bk
 * .ldcv.mini - non-blocking, float style dialog with following position available:
   - .ldcv.mini.left
   - .ldcv.mini.right
   - .ldcv.mini.top
   - .ldcv.mini.bottom
 * .ldcv.inline - inline cover. Won't affect local layout

 * centering
   - by default .base is centered with vertical-align + ::after pseudo class. instead you can choose different methods, described below:
   - .ldcv.margin-centered
     - center with margin: auto + left/right/top/bottom: 0 and position: absolute. need width/height to be provided.
   - .ldcv.transform-centered
     - with transform-center, .base is centered with left: 50%, top: 50% + transform: translate(-50%,-50%), which don't need width/height to be provided anymore.
     - NOTE: this might causes content to be blur, so use it carefully.

 * .ldcv.scroll:
   - add `scroll` class on the ldcv node when you expect the modal content to longer than a screen's height. It makes the modal scrollable by users.

 * alternative transition
   - you can use alternative transition by adding additional class in .ldcv, including following classes:
     - ldcv-scale
     - ldcv-zoom
     - ldcv-vortex
     - ldcv-slide-rtl
     - ldcv-slide-ltr
     - ldcv-slide-ttb
     - ldcv-slide-btt
     - ldcv-flip-h-left
     - ldcv-flip-h-right
     - ldcv-flip-v-top
     - ldcv-flip-v-bottom
     - ldcv-fade
   - example of setting a alternative transition:


    <div class="ldcv ldcv-scale"> ... </div>



## Action

Simple popup could be configured with automatically set invocation to resolve promises waited by get. use `data-ldcv-set` attribute on elements to indicate what values to be passed into set:

    <div class="ldcv">
      <button data-ldcv-set="1"> OK </button>
      <button data-ldcv-set="0"> Cancel </button>
    </div>

use get function to wait for the return value:

    ldcv.get!then -> if it == "1" => "OK" else "Cancel"


## Todo

 * implement all this nice transitional effect:
   - https://tympanus.net/Development/ModalWindowEffects/
   - https://tympanus.net/Development/PageTransitions/
 
 * remove dependency to ldQuery ( only two function call )


## License

MIT
