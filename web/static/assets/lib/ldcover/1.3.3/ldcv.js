(function(){
  var parent, ldcover;
  parent = function(r, s, e){
    var n;
    e == null && (e = document);
    n = r;
    while (n && n !== e) {
      n = n.parentNode;
    }
    if (n !== e) {
      return null;
    }
    n = r;
    while (n && n !== e && n.matches && !n.matches(s)) {
      n = n.parentNode;
    }
    if (n === e && (!e.matches || !e.matches(s))) {
      return null;
    }
    return n;
  };
  ldcover = function(opt){
    var ret, cls, that, clicksrc, this$ = this;
    opt == null && (opt = {});
    this.opt = import$({
      delay: 300,
      autoZ: true,
      baseZ: 3000,
      escape: true,
      byDisplay: true
    }, opt);
    this.promises = [];
    this.root = !opt.root
      ? (ret = document.createElement("div"), ret.innerHTML = "<div class=\"base\"></div>", ret)
      : typeof opt.root === 'string'
        ? document.querySelector(opt.root)
        : opt.root;
    cls = typeof opt.type === 'string'
      ? opt.type.split(' ')
      : opt.type;
    if (that = this.root.getAttribute('data-lock')) {
      if (that === 'true') {
        this.opt.lock = true;
      }
    }
    this.inner = this.root.querySelector('.inner');
    this.base = this.root.querySelector('.base');
    this.root.classList.add.apply(this.root.classList, ['ldcv'].concat(cls || []));
    if (this.opt.byDisplay) {
      this.root.style.display = 'none';
    }
    clicksrc = null;
    this.root.addEventListener('mousedown', function(e){
      return clicksrc = e.target;
    });
    this.root.addEventListener('click', function(e){
      var tgt, action;
      if (clicksrc === this$.root && !this$.opt.lock) {
        return this$.toggle(false);
      }
      if (parent(e.target, '*[data-ldcv-cancel]', this$.root)) {
        return this$.cancel();
      }
      tgt = parent(e.target, '*[data-ldcv-set]', this$.root);
      if (tgt && (action = tgt.getAttribute("data-ldcv-set")) != null) {
        if (!parent(tgt, '.disabled', this$.root)) {
          return this$.set(action);
        }
      }
    });
    this.evtHandler = {};
    return this;
  };
  ldcover.prototype = import$(Object.create(Object.prototype), {
    append: function(it){
      var base;
      base = this.root.childNodes[0];
      return (base && base.classList.contains('base')
        ? base
        : this.root).appendChild(it);
    },
    get: function(){
      var this$ = this;
      return new Promise(function(res, rej){
        this$.promises.push({
          res: res,
          rej: rej
        });
        return this$.toggle(true);
      });
    },
    cancel: function(err, hide){
      hide == null && (hide = true);
      this.promises.splice(0).map(function(p){
        var ref$;
        return p.rej(err || (ref$ = new Error(), ref$.name = 'lderror', ref$.id = 999, ref$));
      });
      if (hide) {
        return this.toggle(false);
      }
    },
    set: function(v, hide){
      hide == null && (hide = true);
      this.promises.splice(0).map(function(p){
        return p.res(v);
      });
      if (hide) {
        return this.toggle(false);
      }
    },
    isOn: function(){
      return this.root.classList.contains('active');
    },
    lock: function(){
      return this.opt.lock = true;
    },
    toggle: function(v){
      var this$ = this;
      return new Promise(function(res, rej){
        if (!(v != null) && this$.root.classList.contains('running')) {
          return res();
        }
        this$.root.classList.add('running');
        if (this$.opt.byDisplay) {
          this$.root.style.display = 'block';
        }
        return setTimeout(function(){
          var isActive, esc, idx, z, ref$, r;
          if (v != null) {
            this$.root.classList[v ? 'add' : 'remove']('active');
          } else {
            this$.root.classList.toggle('active');
          }
          isActive = this$.root.classList.contains('active');
          if (!this$.opt.lock && this$.opt.escape && isActive) {
            esc = function(e){
              var ref$;
              if (e.keyCode === 27) {
                if ((ref$ = ldcover.popups)[ref$.length - 1] !== this$) {
                  return;
                }
                this$.toggle(false);
                return document.removeEventListener('keyup', esc);
              }
            };
            document.addEventListener('keyup', esc);
          }
          if (this$.opt.animation && this$.inner) {
            this$.inner.classList[isActive ? 'add' : 'remove'].apply(this$.inner.classList, this$.opt.animation.split(' '));
          }
          if (isActive) {
            ldcover.popups.push(this$);
          } else {
            idx = ldcover.popups.indexOf(this$);
            if (idx >= 0) {
              ldcover.popups.splice(idx, 1);
            }
          }
          if (this$.opt.autoZ) {
            if (isActive) {
              if (ldcover.zmgr) {
                this$.root.style.zIndex = this$.z = ldcover.zmgr.add(this$.opt.baseZ);
              } else {
                this$.root.style.zIndex = this$.z = z = ((ref$ = ldcover.zstack)[ref$.length - 1] || this$.opt.baseZ) + 1;
                ldcover.zstack.push(z);
              }
            } else {
              if (ldcover.zmgr) {
                ldcover.zmgr.remove(this$.z);
              } else {
                idx = ldcover.zstack.indexOf(this$.z);
              }
              delete this$.z;
              if (idx < 0) {
                this$.root.classList.remove('running');
                return res();
              }
              this$.root.style.zIndex = "";
              r = ldcover.zstack.splice(idx, 1);
            }
          }
          if (this$.opt.transformFix && !isActive) {
            this$.root.classList.remove('shown');
          }
          setTimeout(function(){
            this$.root.classList.remove('running');
            if (this$.opt.transformFix && isActive) {
              this$.root.classList.add('shown');
            }
            if (!isActive && this$.opt.byDisplay) {
              return this$.root.style.display = 'none';
            }
          }, this$.opt.delay);
          if (this$.promises.length && !isActive) {
            this$.set(undefined, false);
          }
          this$.fire("toggle." + (isActive ? 'on' : 'off'));
          return res();
        }, 50);
      });
    },
    on: function(n, cb){
      var ref$;
      return ((ref$ = this.evtHandler)[n] || (ref$[n] = [])).push(cb);
    },
    fire: function(n){
      var v, res$, i$, to$, ref$, len$, cb, results$ = [];
      res$ = [];
      for (i$ = 1, to$ = arguments.length; i$ < to$; ++i$) {
        res$.push(arguments[i$]);
      }
      v = res$;
      for (i$ = 0, len$ = (ref$ = this.evtHandler[n] || []).length; i$ < len$; ++i$) {
        cb = ref$[i$];
        results$.push(cb.apply(this, v));
      }
      return results$;
    }
  });
  import$(ldcover, {
    zstack: [],
    popups: [],
    setZmgr: function(it){
      return this.zmgr = it;
    }
  });
  if (typeof module != 'undefined' && module !== null) {
    module.exports = ldcover;
  }
  if (window) {
    window.ldCover = window.ldcover = ldcover;
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
