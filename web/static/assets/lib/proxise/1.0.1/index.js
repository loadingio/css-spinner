(function(){
  var _, proxise;
  _ = function(q, v, n){
    return q.splice(0, q.length).map(function(o){
      o[n](v);
      if (o.timeout) {
        return clearTimeout(o.timeout);
      }
    });
  };
  proxise = function(a, b){
    var ref$, f, timeout, q, ret;
    ref$ = a instanceof Function
      ? [a, b || 0]
      : [b, a || 0], f = ref$[0], timeout = ref$[1];
    q = [];
    ret = function(){
      var args, res$, i$, to$, r, pair, handle;
      res$ = [];
      for (i$ = 0, to$ = arguments.length; i$ < to$; ++i$) {
        res$.push(arguments[i$]);
      }
      args = res$;
      if ((r = f.apply(this, args)) instanceof Promise) {
        return r;
      } else {
        pair = null;
        handle = timeout ? setTimeout(function(){
          var idx;
          if (!(pair && ~(idx = q.indexOf(pair)))) {
            return;
          }
          q.splice(idx, 1);
          return pair.rej(new Error("timeout"));
        }, timeout) : null;
        return new Promise(function(res, rej){
          return q.push(pair = {
            res: res,
            rej: rej,
            timeout: handle
          });
        });
      }
    };
    ret.resolve = function(v){
      return _(q, v, 'res');
    };
    ret.reject = function(v){
      return _(q, v, 'rej');
    };
    return ret;
  };
  proxise.once = function(cb, v){
    var lc, ret;
    lc = {};
    return ret = proxise(function(){
      var args, res$, i$, to$, this$ = this;
      res$ = [];
      for (i$ = 0, to$ = arguments.length; i$ < to$; ++i$) {
        res$.push(arguments[i$]);
      }
      args = res$;
      if (lc.inited) {
        return Promise.resolve(!(v != null)
          ? lc.val
          : typeof v === 'function' ? v() : v);
      }
      if (lc.initing) {
        return;
      }
      lc.initing = true;
      return Promise.resolve().then(function(){
        return cb.apply(this$, args);
      })['finally'](function(){
        return lc.initing = false;
      }).then(function(val){
        lc.inited = true;
        ret.resolve(val = !(v != null)
          ? lc.val = val
          : typeof v === 'function' ? v() : v);
        return val;
      })['catch'](function(it){
        ret.reject(it);
        return Promise.reject(it);
      });
    });
  };
  if (typeof module != 'undefined' && module !== null) {
    module.exports = proxise;
  } else if (typeof window != 'undefined' && window !== null) {
    window.proxise = proxise;
  }
}).call(this);
