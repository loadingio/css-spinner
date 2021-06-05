var ldslider;
ldslider = function(opt){
  var root, i$, to$, i, that, handle, el, mouse, this$ = this;
  opt == null && (opt = {});
  this.evtHandler = {};
  this.opt = import$({
    min: 0,
    max: 100,
    from: 0,
    to: 0,
    step: 1
  }, opt);
  this.val = {
    to: 0,
    from: 0
  };
  this.root = root = typeof opt.root === 'string'
    ? document.querySelector(opt.root)
    : opt.root;
  if (this.root.tagName === 'INPUT') {
    this.input = this.root;
    ld$.attr(this.input, 'type', 'hidden');
    this.root = root = document.createElement("div");
    this.input.parentNode.insertBefore(this.root, this.input);
    this.input.classList;
    for (i$ = 0, to$ = this.input.classList.length; i$ < to$; ++i$) {
      i = i$;
      this.root.classList.add(this.input.classList[i]);
    }
    this.input.setAttribute('class', '');
    if (that = this.input.getAttribute('data-class')) {
      this.input.classList.add.apply(this.input.classList, that.split(' '));
    }
    handle = function(){
      var v;
      if (this$.range) {
        v = (this$.input.value || '').split(/\s*~\s*/);
        v = {
          from: parseFloat((v[0] || '').trim()),
          to: parseFloat((v[1] || '').trim())
        };
        if (isNaN(v.from)) {
          v.from = 0;
        }
        if (isNaN(v.to)) {
          v.from = 0;
        }
        this$.repos(v.from, true, false, true, false);
        return this$.repos(v.to, true, false, true, true);
      } else {
        v = parseFloat((this$.input.value || '').trim());
        if (isNaN(v)) {
          v = 0;
        }
        return this$.repos(v, true, false, true);
      }
    };
    this.input.addEventListener('change', handle);
    this.input.addEventListener('input', handle);
  }
  this.root._ldrs = this;
  this.root.classList.add('ldrs');
  this.root.innerHTML = "<div class=\"bar\">\n  <div class=\"cap\"></div>\n  <div class=\"cap\"></div>\n  <div class=\"bar-inner\">\n    <div class=\"bk\"></div>\n    <div class=\"fg\"></div>\n    <div class=\"line lock\"></div>\n    <div class=\"line p\"></div>\n    <div class=\"hint p\"></div>\n    <div class=\"line p alt\"></div>\n    <div class=\"hint p alt\"></div>\n  </div>\n</div>\n<div class=\"hint l\"></div>\n<div class=\"hint lock\"></div>\n<div class=\"hint r\"></div>";
  this.el = el = {
    b: {
      fg: ld$.find(root, '.fg', 0)
    },
    p: ld$.find(root, '.line.p', 0),
    q: ld$.find(root, '.line.p.alt', 0),
    h: {
      p: ld$.find(root, '.hint.p', 0),
      q: ld$.find(root, '.hint.p.alt', 0),
      l: ld$.find(root, '.hint.l', 0),
      r: ld$.find(root, '.hint.r', 0),
      lock: ld$.find(root, '.hint.lock', 0),
      lockLine: ld$.find(root, '.lock-line', 0)
    }
  };
  mouse = {
    move: function(e){
      if (e.buttons & 1) {
        return this$.repos(e.clientX, true, true, false, mouse.alt);
      } else {
        return mouse.up(e);
      }
    },
    up: function(){
      var ref$, p, v;
      document.removeEventListener('mouseup', mouse.up);
      document.removeEventListener('mousemove', mouse.move);
      ref$ = !mouse.alt
        ? [this$.el.h.p, this$.val.from]
        : [this$.el.h.q, this$.val.to], p = ref$[0], v = ref$[1];
      return p.innerText = this$.label.ptr(Math.round(10000 * v) / 10000);
    },
    prepare: function(e){
      mouse.alt = e.target && e.target.classList && e.target.classList.contains('alt') ? true : false;
      document.addEventListener('mousemove', mouse.move);
      return document.addEventListener('mouseup', mouse.up);
    }
  };
  el.p.addEventListener('mousedown', mouse.prepare);
  root.addEventListener('click', mouse.move);
  root.addEventListener('mousedown', mouse.prepare);
  this.prepare();
  return this;
};
ldslider.prototype = import$(Object.create(Object.prototype), {
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
  },
  update: function(){
    if (this.range) {
      return this.set(this.val);
    } else {
      return this.set(this.val.from);
    }
  },
  updateInput: function(arg$){
    var now, this$ = this;
    now = (arg$ != null
      ? arg$
      : {
        now: false
      }).now;
    clearTimeout(this.debounce);
    return this.debounce = setTimeout(function(){
      var v;
      if (this$.range) {
        v = this$.val.from + " ~ " + this$.val.to;
        if (this$.input.value !== v) {
          return this$.input.value = v;
        }
      } else {
        if (this$.input.value !== this$.val.from) {
          return this$.input.value = this$.val.from;
        }
      }
    }, now ? 0 : 500);
  },
  edit: function(v){
    if (!this.input) {
      return;
    }
    if (!(v != null)) {
      v = this.input.getAttribute('type') === 'hidden';
    }
    this.input.setAttribute('type', v ? 'text' : 'hidden');
    this.root.style.display = v ? 'none' : '';
    if (!v) {
      return this.update();
    }
  },
  prepare: function(){
    var this$ = this;
    if (this.opt.from != null) {
      this.val.from = this.opt.from;
    }
    if (this.opt.to != null) {
      this.val.to = this.opt.to;
    }
    if (this.opt.exp) {
      this.expFactor = Math.log(this.opt.exp.output || this.opt.max - this.opt.min) / Math.log(this.opt.exp.input);
    }
    this.label = import$({
      ptr: function(it){
        if (it === this$.opt.min && this$.label.min != null) {
          return this$.label.min;
        } else if (it === this$.opt.max && this$.label.max != null) {
          return this$.label.max;
        } else {
          return it;
        }
      }
    }, this.opt.label || {});
    this.el.h.l.innerText = this.label.min != null
      ? this.label.min
      : this.opt.min;
    this.el.h.r.innerText = this.label.max != null
      ? this.label.max
      : this.opt.max;
    this.el.h.p.innerText = this.label.ptr(this.opt.from);
    this.el.h.q.innerText = this.label.ptr(this.opt.to);
    this.root.classList[this.opt.limitMax != null ? 'add' : 'remove']('limit');
    this.range = this.opt.range != null
      ? this.opt.range
      : this.root.classList.contains('range') ? true : false;
    if (this.range) {
      this.root.classList.toggle('range', this.range);
    }
    return this.update();
  },
  setConfig: function(opt){
    opt == null && (opt = {});
    this.opt = import$({}, opt);
    return this.prepare();
  },
  set: function(v, forceNotify){
    forceNotify == null && (forceNotify = false);
    if (this.range) {
      this.repos(v.from, forceNotify, false, false, false);
      return this.repos(v.to, forceNotify, false, false, true);
    } else {
      return this.repos(v, forceNotify);
    }
  },
  get: function(){
    if (this.range) {
      return this.val;
    } else {
      return this.val.from;
    }
  }
  /* v is e.clientX or value, depends on is-event */,
  repos: function(v, forceNotify, isEvent, fromInput, alt){
    /* normalize value and position */
    var label, old, elH, elL, rbox, w06, x, ref$, ref1$, ref2$, dx, value, ref3$, xs, k, left, width, hbox;
    forceNotify == null && (forceNotify = false);
    isEvent == null && (isEvent = false);
    fromInput == null && (fromInput = false);
    alt == null && (alt = false);
    label = alt ? 'to' : 'from';
    old = this.val[label];
    elH = this.el.h[alt ? 'q' : 'p'];
    elL = this.el[alt ? 'q' : 'p'];
    rbox = elL.parentNode.getBoundingClientRect();
    w06 = rbox.width * 0.6;
    if (isEvent) {
      x = (ref$ = (ref2$ = v - rbox.x) > 0 ? ref2$ : 0) < (ref1$ = rbox.width) ? ref$ : ref1$;
      dx = x / rbox.width;
      if (this.expFactor) {
        dx = Math.pow(dx, this.expFactor);
      }
      value = this.opt.min + (this.opt.max - this.opt.min) * dx;
      if (this.opt.limitMax != null) {
        if (x > w06) {
          value = this.opt.limitMax + (this.opt.max - this.opt.limitMax) * (x - w06) / (rbox.width - w06);
        } else {
          dx = x / w06;
          if (this.expFactor) {
            dx = Math.pow(dx, this.expFactor);
          }
          value = this.opt.min + this.opt.limitMax * dx;
        }
      }
    } else {
      value = v;
    }
    value = v = (ref$ = (ref2$ = this.opt.min + Math.round((value - this.opt.min) / this.opt.step) * this.opt.step) > (ref3$ = this.opt.min) ? ref2$ : ref3$) < (ref1$ = this.opt.max) ? ref$ : ref1$;
    this.val[label] = value;
    xs = {};
    for (k in ref$ = this.val) {
      v = ref$[k];
      if (!this.range && k === 'to') {
        continue;
      }
      if (this.opt.limitMax != null) {
        if (v > this.opt.limitMax) {
          x = (v - this.opt.limitMax) / (this.opt.max - this.opt.limitMax) * 40 + 60;
        } else {
          if (this.expFactor) {
            x = 60 * Math.pow((v - this.opt.min) / (this.opt.limitMax - this.opt.min), 1 / this.expFactor);
          } else {
            x = 60 * (v - this.opt.min) / (this.opt.limitMax - this.opt.min);
          }
        }
      } else {
        if (this.expFactor) {
          x = 100 * Math.pow((v - this.opt.min) / (this.opt.max - this.opt.min), 1 / this.expFactor);
        } else {
          x = 100 * ((v - this.opt.min) / (this.opt.max - this.opt.min));
        }
      }
      if (this.opt.limitMax != null && this.opt.limitHard) {
        if (x > 60) {
          x = 60;
        }
        if (v > this.opt.limitMax) {
          v = this.opt.limitMax;
        }
      }
      this.val[k] = v;
      xs[k] = x;
    }
    x = xs[label];
    v = this.val[label];
    left = !this.range
      ? 0
      : Math.min(xs.from, xs.to) + 0.5;
    width = !this.range
      ? xs.from
      : Math.max(xs.from, xs.to) - left + 0.5;
    /* update value and position into view */
    hbox = elH.getBoundingClientRect();
    elH.innerText = this.label.ptr(Math.round(10000 * v) / 10000);
    elH.style.left = 100 * (0.01 * x * rbox.width) / rbox.width + "%";
    elH.style.transform = "translate(-50%,0)";
    elL.style.left = x + "%";
    this.el.b.fg.style.width = width + "%";
    this.el.b.fg.style.left = left + "%";
    /* notification if necessary*/
    if (v !== old && forceNotify) {
      this.fire('change', this.range
        ? this.val
        : this.val[label]);
    }
    if (this.input) {
      return this.updateInput({
        now: !fromInput
      });
    }
  }
});
if (typeof module != 'undefined' && module !== null) {
  module.exports = ldslider;
} else if (typeof window != 'undefined' && window !== null) {
  window.ldSlider = window.ldslider = ldslider;
}
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}
