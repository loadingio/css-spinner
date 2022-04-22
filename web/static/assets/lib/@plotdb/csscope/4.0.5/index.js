(function(){
  var win, doc, fetch, semver, isScope, _fetch, csp, slice$ = [].slice;
  fetch = typeof window != 'undefined' && window !== null
    ? window.fetch
    : (typeof module != 'undefined' && module !== null) && (typeof require != 'undefined' && require !== null) ? require("node-fetch") : null;
  semver = typeof window != 'undefined' && window !== null
    ? window.semver
    : (typeof modeul != 'undefined' && modeul !== null) && (typeof require != 'undefined' && require !== null) ? require("@plotdb/semver") : null;
  isScope = function(it){
    return /^:scope[ .:\[#]|^:scope$/.exec(it);
  };
  _fetch = function(u, c){
    return fetch(u, c).then(function(ret){
      var ref$;
      if (ret && ret.ok) {
        return ret.text();
      }
      if (!ret) {
        return Promise.reject((ref$ = new Error("404"), ref$.name = 'lderror', ref$.id = 404, ref$));
      }
      return ret.clone().text().then(function(t){
        var i, e, ref$, j, err;
        i = ret.status || 404;
        e = (ref$ = new Error(i + " " + t), ref$.name = 'lderror', ref$.id = i, ref$.message = t, ref$);
        try {
          if ((j = JSON.parse(t)) && j.name === 'lderror') {
            import$(e, j).json = j;
          }
        } catch (e$) {
          err = e$;
        }
        return Promise.reject(e);
      });
    });
  };
  csp = function(a, b, c, d){
    if (!csp['default']) {
      csp['default'] = new csp.converter();
    }
    return csp['default'].convert(a, b, c, d);
  };
  csp.env = function(it){
    var ref$;
    return ref$ = [it, it.document], win = ref$[0], doc = ref$[1], ref$;
  };
  csp.id = function(o){
    return o.id || o.url || o.name + "@" + (o.version || '') + ":" + (o.path || '');
  };
  csp.scope = function(o){
    return o.scope || '_' + btoa(csp.id(o)).replace(/=/g, '_');
  };
  csp._cache = {};
  csp._ver = {
    map: {},
    list: {}
  };
  csp.cache = function(o){
    var that, ret, ref$, n, v, p, i$, to$, i, ver;
    if (typeof o === 'string') {
      o = {
        url: o
      };
    }
    if (!o.id) {
      o.id = csp.id(o);
    }
    if (that = this._cache[o.id]) {
      return that;
    }
    if (o.id && !o.name) {
      ret = /^(\S+)@(\S+):(\S+)$/.exec(o.id);
      if (!ret) {
        ref$ = [o.id, '', ''], n = ref$[0], v = ref$[1], p = ref$[2];
      } else {
        ref$ = [ret[1], ret[2], ret[3]], n = ref$[0], v = ref$[1], p = ref$[2];
      }
    } else {
      ref$ = [o.name, o.version || '', o.path || ''], n = ref$[0], v = ref$[1], p = ref$[2];
    }
    if (/[^0-9.]/.exec(v)) {
      if (that = ((ref$ = this._ver.map)[n] || (ref$[n] = {}))[v]) {
        v = that;
      }
      if (that = this._cache[csp.id({
        name: n,
        version: v,
        path: p
      })]) {
        return that;
      }
      for (i$ = 0, to$ = ((ref$ = this._ver.list)[n] || (ref$[n] = [])).length; i$ < to$; ++i$) {
        i = i$;
        ver = this._ver.list[n][i];
        if (!semver.fit(ver, v)) {
          continue;
        }
        this._ver.map[n][v] = ver;
        o.id = csp.id({
          name: n,
          version: ver,
          path: p
        });
        if (that = this._cache[o.id]) {
          return that;
        }
      }
    }
    if (!in$(v, (ref$ = this._ver.list)[n] || (ref$[n] = []))) {
      this._ver.list[n].push(v);
    }
    return this._cache[o.id] = o;
  };
  csp.converter = function(opt){
    var ifr;
    opt == null && (opt = {});
    this.scopeTest = opt.scopeTest;
    this.node = doc.createElement("style");
    this.iframe = ifr = doc.createElement("iframe");
    ifr.setAttribute('title', "for csscope parsing");
    ifr.style.display = 'none';
    ifr.src = 'about:blank';
    doc.body.appendChild(ifr);
    this.iframe.contentDocument.body.appendChild(this.node);
    this._idx = 0;
    return this;
  };
  csp.converter.prototype = import$(Object.create(Object.prototype), {
    getNames: function(rules, defs){
      var i$, len$, rule;
      defs == null && (defs = {});
      for (i$ = 0, len$ = rules.length; i$ < len$; ++i$) {
        rule = rules[i$];
        if (rule.name) {
          defs[rule.name] = true;
        } else if (rule.cssRules) {
          this.getNames(rule.cssRules, defs);
        }
      }
      return defs;
    },
    _convert: function(rules, scopeRule, name, scopeTest, defs){
      var ret, i$, len$, rule, matched, sel, code;
      defs == null && (defs = {});
      ret = "";
      for (i$ = 0, len$ = rules.length; i$ < len$; ++i$) {
        rule = rules[i$];
        if (rule.style) {
          if (defs[rule.style.animationName]) {
            rule.style.animationName = name + "__" + rule.style.animationName;
          } else if (rule.style.animation) {
            matched = false;
            rule.style.animation = rule.style.animation.split(' ').map(fn$).join(' ');
          }
        }
        if (rule.selectorText) {
          if (!scopeTest) {
            sel = rule.selectorText.split(',').map(fn1$).map(fn2$).join(',');
          } else {
            sel = rule.selectorText.split(',').map(fn3$).map(fn4$).join(',');
          }
          ret += sel + "{" + rule.style.cssText + "}";
          /*
          ret += """
          #sel {
            #{Array.from(rule.style).map(-> "#it:#{rule.style.getPropertyValue(it)}#{if rule.style.getPropertyPriority(it) == 'important' => '!important' else ''}").join(';')}
          }
          """
          */
          rule.selectorText = sel;
        } else if (rule.name) {
          sel = rule.name.split(',').map(fn5$).map(fn6$).join(',');
          rule.name = sel;
          ret += "@keyframes " + sel + " {\n  " + Array.from(rule.cssRules).map(fn7$).join('\n') + "\n}";
        } else if (rule.cssRules) {
          code = this._convert(rule.cssRules, scopeRule, name, scopeTest, defs);
          ret += "@media " + rule.conditionText + " {\n  " + code + "\n}";
        }
      }
      return ret;
      function fn$(it){
        var matched;
        if (matched || !defs[it]) {
          return it;
        }
        matched = true;
        return name + "__" + it;
      }
      function fn1$(it){
        return it.trim();
      }
      function fn2$(it){
        if (isScope(it)) {
          return it.replace(/^:scope/, scopeRule);
        } else {
          return scopeRule + " " + it;
        }
      }
      function fn3$(it){
        return it.trim();
      }
      function fn4$(it){
        var ref$, h, t, h1, h2;
        if (isScope(it)) {
          return it.replace(/^:scope/, scopeRule);
        }
        ref$ = it.split(' ').map(function(it){
          return it.trim();
        }).filter(function(it){
          return it;
        }), h = ref$[0], t = slice$.call(ref$, 1);
        ref$ = /^[a-zA-Z]/.exec(h)
          ? [h, '']
          : ['', h], h1 = ref$[0], h2 = ref$[1];
        return (scopeRule + " :not(" + scopeTest + ") " + it + ",") + (scopeRule + " > " + h1 + ":not(" + scopeTest + ")" + h2 + " " + t.join(' '));
      }
      function fn5$(it){
        return it.trim();
      }
      function fn6$(it){
        return name + "__" + it;
      }
      function fn7$(it){
        return it.cssText;
      }
    },
    convert: function(a, b, c, d){
      var opt, ref$, name, css, rule, scopeTest, rules, defs;
      ref$ = opt = typeof a === 'object'
        ? a
        : {
          name: a,
          css: b,
          rule: c,
          scopeTest: d
        }, name = ref$.name, css = ref$.css, rule = ref$.rule, scopeTest = ref$.scopeTest;
      if (!rule) {
        rule = "." + name;
      }
      if (!name) {
        name = rule;
      }
      if (!scopeTest) {
        scopeTest = this.scopeTest;
      }
      rules = typeof css === 'object'
        ? css
        : (this.node.textContent = (css || '') + ("/*" + (this._idx++) + "*/"), this.node.sheet.cssRules);
      defs = this.getNames(rules, {});
      return this._convert(rules, rule, name, scopeTest, defs) || '';
    }
  });
  csp.manager = function(o){
    o == null && (o = {});
    this.attrName = "csscope";
    this._cache = {};
    this.converter = new csp.converter();
    this.counter = 0;
    this.registry(o.registry || "/assets/lib/");
    this.init();
    return this;
  };
  csp.manager.prototype = import$(Object.create(Object.prototype), {
    cache: function(o){
      var that;
      if (typeof o === 'string') {
        o = {
          url: o
        };
      }
      if (!o.id) {
        o.id = csp.id(o);
      }
      if (that = this._cache[o.id]) {
        return that;
      }
      return this._cache[o.id] = csp.cache(o);
    },
    _ref: function(o){
      var that;
      return typeof o === 'string'
        ? o
        : (that = o.url)
          ? that
          : this._reg.fetch
            ? this._reg.fetch(o)
            : this._reg(o);
    },
    registry: function(v){
      if (typeof v === 'string') {
        if (v[v.length - 1] === '/') {
          v = v.substring(0, v.length - 1);
        }
        return this._reg = function(v){
          return function(o){
            return v + "/" + o.name + "/" + (o.version || 'main') + "/" + (o.path || 'index.min.css');
          };
        }(v);
      } else {
        return this._reg = v;
      }
    },
    init: function(){
      if (this.inited) {
        return;
      }
      this.inited = true;
      this.styleNode = doc.createElement('style');
      this.styleNode.setAttribute('type', 'text/css');
      this.styleNode.setAttribute('data-name', "csscope.manager");
      this.styleContent = [];
      return doc.body.appendChild(this.styleNode);
    },
    scope: function(node, urls){
      var ret;
      urls == null && (urls = []);
      ret = this.get(urls);
      node.classList.add.apply(node.classList, ret.map(function(it){
        return it.scope;
      }));
      return ret;
    },
    get: function(libs){
      var this$ = this;
      libs == null && (libs = []);
      return (Array.isArray(libs)
        ? libs
        : [libs]).map(function(it){
        return this$.cache(it);
      }).filter(function(it){
        return it.scope;
      });
    },
    bundle: function(libs, scopeTest){
      var hash, res$, k, v, this$ = this;
      libs = Array.isArray(libs)
        ? libs
        : [libs];
      hash = {};
      libs.map(function(o){
        return this$.cache(o);
      }).filter(function(it){
        return it && it.id;
      }).map(function(it){
        return hash[it.id] = it;
      });
      res$ = [];
      for (k in hash) {
        v = hash[k];
        res$.push(v);
      }
      libs = res$;
      return this.load(libs, scopeTest, true).then(function(libs){
        return libs.map(function(it){
          return it.code;
        }).join('\n');
      });
    },
    load: function(libs, scopeTest, bundle){
      var code, this$ = this;
      libs = (Array.isArray(libs)
        ? libs
        : [libs]).map(function(o){
        return this$.cache(o);
      });
      code = [];
      return Promise.all(libs.map(function(o){
        var ref, p;
        if (o.inited) {
          return Promise.resolve();
        }
        if (o.scope && o.code) {
          o.inited = true;
          code.push(o.code);
          return Promise.resolve();
        }
        ref = this$._ref(o);
        p = ref.then
          ? ref.then(function(it){
            this$.cache((o.id = undefined, o.version = it.version, o));
            return it;
          })
          : _fetch(ref, {
            method: 'GET'
          }).then(function(it){
            return {
              content: it
            };
          });
        return p.then(function(arg$){
          var content;
          content = arg$.content;
          o.inited = true;
          o.scope = csp.scope(o);
          o.code = this$.converter.convert({
            css: content,
            name: o.scope,
            scopeTest: scopeTest
          });
          return code.push(o.code);
        });
      })).then(function(){
        if (bundle) {
          return libs;
        }
        this$.styleContent.push.apply(this$.styleContent, code);
        this$.styleNode.textContent = this$.styleContent.join('\n');
        return this$.get(libs);
      });
    }
  });
  csp.env(typeof self != 'undefined' && self !== null ? self : globalThis);
  if (typeof module != 'undefined' && module !== null) {
    module.exports = csp;
  } else if (typeof window != 'undefined' && window !== null) {
    window.csscope = csp;
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
  function in$(x, xs){
    var i = -1, l = xs.length >>> 0;
    while (++i < l) if (x === xs[i]) return true;
    return false;
  }
}).call(this);
