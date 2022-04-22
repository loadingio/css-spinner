(function(){
  var named, ReI, ReN, ReP, re, parse, ldcolor, t0, t1, t2, t3, Xn, Yn, Zn, conv, utils, k, v;
  named = {
    aliceblue: 0xf0f8ff,
    antiquewhite: 0xfaebd7,
    aqua: 0x00ffff,
    aquamarine: 0x7fffd4,
    azure: 0xf0ffff,
    beige: 0xf5f5dc,
    bisque: 0xffe4c4,
    black: 0x000000,
    blanchedalmond: 0xffebcd,
    blue: 0x0000ff,
    blueviolet: 0x8a2be2,
    brown: 0xa52a2a,
    burlywood: 0xdeb887,
    cadetblue: 0x5f9ea0,
    chartreuse: 0x7fff00,
    chocolate: 0xd2691e,
    coral: 0xff7f50,
    cornflowerblue: 0x6495ed,
    cornsilk: 0xfff8dc,
    crimson: 0xdc143c,
    cyan: 0x00ffff,
    darkblue: 0x00008b,
    darkcyan: 0x008b8b,
    darkgoldenrod: 0xb8860b,
    darkgray: 0xa9a9a9,
    darkgreen: 0x006400,
    darkgrey: 0xa9a9a9,
    darkkhaki: 0xbdb76b,
    darkmagenta: 0x8b008b,
    darkolivegreen: 0x556b2f,
    darkorange: 0xff8c00,
    darkorchid: 0x9932cc,
    darkred: 0x8b0000,
    darksalmon: 0xe9967a,
    darkseagreen: 0x8fbc8f,
    darkslateblue: 0x483d8b,
    darkslategray: 0x2f4f4f,
    darkslategrey: 0x2f4f4f,
    darkturquoise: 0x00ced1,
    darkviolet: 0x9400d3,
    deeppink: 0xff1493,
    deepskyblue: 0x00bfff,
    dimgray: 0x696969,
    dimgrey: 0x696969,
    dodgerblue: 0x1e90ff,
    firebrick: 0xb22222,
    floralwhite: 0xfffaf0,
    forestgreen: 0x228b22,
    fuchsia: 0xff00ff,
    gainsboro: 0xdcdcdc,
    ghostwhite: 0xf8f8ff,
    gold: 0xffd700,
    goldenrod: 0xdaa520,
    gray: 0x808080,
    green: 0x008000,
    greenyellow: 0xadff2f,
    grey: 0x808080,
    honeydew: 0xf0fff0,
    hotpink: 0xff69b4,
    indianred: 0xcd5c5c,
    indigo: 0x4b0082,
    ivory: 0xfffff0,
    khaki: 0xf0e68c,
    lavender: 0xe6e6fa,
    lavenderblush: 0xfff0f5,
    lawngreen: 0x7cfc00,
    lemonchiffon: 0xfffacd,
    lightblue: 0xadd8e6,
    lightcoral: 0xf08080,
    lightcyan: 0xe0ffff,
    lightgoldenrodyellow: 0xfafad2,
    lightgray: 0xd3d3d3,
    lightgreen: 0x90ee90,
    lightgrey: 0xd3d3d3,
    lightpink: 0xffb6c1,
    lightsalmon: 0xffa07a,
    lightseagreen: 0x20b2aa,
    lightskyblue: 0x87cefa,
    lightslategray: 0x778899,
    lightslategrey: 0x778899,
    lightsteelblue: 0xb0c4de,
    lightyellow: 0xffffe0,
    lime: 0x00ff00,
    limegreen: 0x32cd32,
    linen: 0xfaf0e6,
    magenta: 0xff00ff,
    maroon: 0x800000,
    mediumaquamarine: 0x66cdaa,
    mediumblue: 0x0000cd,
    mediumorchid: 0xba55d3,
    mediumpurple: 0x9370db,
    mediumseagreen: 0x3cb371,
    mediumslateblue: 0x7b68ee,
    mediumspringgreen: 0x00fa9a,
    mediumturquoise: 0x48d1cc,
    mediumvioletred: 0xc71585,
    midnightblue: 0x191970,
    mintcream: 0xf5fffa,
    mistyrose: 0xffe4e1,
    moccasin: 0xffe4b5,
    navajowhite: 0xffdead,
    navy: 0x000080,
    oldlace: 0xfdf5e6,
    olive: 0x808000,
    olivedrab: 0x6b8e23,
    orange: 0xffa500,
    orangered: 0xff4500,
    orchid: 0xda70d6,
    palegoldenrod: 0xeee8aa,
    palegreen: 0x98fb98,
    paleturquoise: 0xafeeee,
    palevioletred: 0xdb7093,
    papayawhip: 0xffefd5,
    peachpuff: 0xffdab9,
    peru: 0xcd853f,
    pink: 0xffc0cb,
    plum: 0xdda0dd,
    powderblue: 0xb0e0e6,
    purple: 0x800080,
    rebeccapurple: 0x663399,
    red: 0xff0000,
    rosybrown: 0xbc8f8f,
    royalblue: 0x4169e1,
    saddlebrown: 0x8b4513,
    salmon: 0xfa8072,
    sandybrown: 0xf4a460,
    seagreen: 0x2e8b57,
    seashell: 0xfff5ee,
    sienna: 0xa0522d,
    silver: 0xc0c0c0,
    skyblue: 0x87ceeb,
    slateblue: 0x6a5acd,
    slategray: 0x708090,
    slategrey: 0x708090,
    snow: 0xfffafa,
    springgreen: 0x00ff7f,
    steelblue: 0x4682b4,
    tan: 0xd2b48c,
    teal: 0x008080,
    thistle: 0xd8bfd8,
    tomato: 0xff6347,
    turquoise: 0x40e0d0,
    violet: 0xee82ee,
    wheat: 0xf5deb3,
    white: 0xffffff,
    whitesmoke: 0xf5f5f5,
    yellow: 0xffff00,
    yellowgreen: 0x9acd32
  };
  ReI = "\\s*([+-]?\\d+|nan|NaN)\\s*";
  ReN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?|nan|NaN)\\s*";
  ReP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
  re = {
    hex3: /^#([0-9a-fA-F]{3})$/,
    hex6: /^#([0-9a-fA-F]{6})$/,
    rgbint: new RegExp("^rgb\\(" + [ReI, ReI, ReI] + "\\)$"),
    rgbp: new RegExp("^rgb\\(" + [ReP, ReP, ReP] + "\\)$"),
    rgbaint: new RegExp("^rgba\\(" + [ReI, ReI, ReI, ReN] + "\\)$"),
    rgbap: new RegExp("^rgba\\(" + [ReP, ReP, ReP, ReN] + "\\)$"),
    hslp: new RegExp("^hsl\\(" + [ReN, ReP, ReP] + "\\)$"),
    hslap: new RegExp("^hsla\\(" + [ReN, ReP, ReP, ReN] + "\\)$")
  };
  parse = {
    hex3: function(v){
      v = parseInt(v[1], 16);
      return {
        r: (v >> 8) * 17,
        g: (v & 0xf0) * 17 >> 4,
        b: (v & 0xf) * 17,
        a: 1
      };
    },
    hex6: function(v){
      v = parseInt(v[1], 16);
      return {
        r: v >> 16,
        g: v >> 8 & 0xff,
        b: v & 0xff,
        a: 1
      };
    },
    rgbint: function(v){
      return {
        r: +v[1],
        g: +v[2],
        b: +v[3],
        a: 1
      };
    },
    rgbp: function(v){
      return {
        r: v[1] * 255 / 100,
        g: +v[2] * 255 / 100,
        b: +v[3] * 255 / 100,
        a: 1
      };
    },
    rgbaint: function(v){
      return {
        r: +v[1],
        g: +v[2],
        b: +v[3],
        a: +v[4]
      };
    },
    rgbap: function(v){
      return {
        r: v[1] * 255 / 100,
        g: +v[2] * 255 / 100,
        b: v[3] * 255 / 100,
        a: +v[4]
      };
    },
    hslap: function(v){
      return {
        h: +v[1],
        s: v[2] / 100,
        l: v[3] / 100,
        a: +v[4]
      };
    },
    hslp: function(v){
      return {
        h: +v[1],
        s: v[2] / 100,
        l: v[3] / 100,
        a: 1
      };
    },
    all: function(o){
      var that, ref$, k, v;
      if (typeof o === 'object') {
        if (!(o.a != null)) {
          o.a = 1;
        }
        return o["@a"]
          ? o = conv.lab2rgb(o)
          : o["c"]
            ? o = conv.hcl2rgb(o)
            : o.hex
              ? (that = re.hex3.exec(o.hex))
                ? (ref$ = parse.hex3(that) || {}, ref$.a = o.a, ref$)
                : (that = re.hex6.exec(o.hex)) ? (ref$ = parse.hex6(that), ref$.a = o.a, ref$) : o
              : o.value ? parse.all(o.value) : o;
      } else if (typeof o === 'number') {
        return conv.num2rgb(o);
      }
      o = (o + "").trim().toLowerCase();
      for (k in ref$ = re) {
        v = ref$[k];
        if (that = v.exec(o)) {
          return parse[k](that);
        } else {
          continue;
        }
      }
      if (named != null && named[o]) {
        return conv.num2rgb(named[o]);
      }
      if (o === 'transparent') {
        return {
          r: NaN,
          g: NaN,
          b: NaN,
          a: 0
        };
      }
      return {
        r: NaN,
        g: NaN,
        b: NaN,
        a: NaN
      };
    }
  };
  ldcolor = function(v){
    return import$(this, parse.all(v));
  };
  t0 = 4 / 29;
  t1 = 6 / 29;
  t2 = 3 * t1 * t1;
  t3 = t1 * t1 * t1;
  Xn = 0.96422;
  Yn = 1;
  Zn = 0.82521;
  conv = {
    num2rgb: function(v){
      return {
        r: v >> 16,
        g: v >> 8 & 0xff,
        b: v & 0xff,
        a: 1
      };
    },
    _hsl2rgb: function(h, m1, m2){
      return (h < 60
        ? m1 + (m2 - m1) * h / 60
        : h < 180
          ? m2
          : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
    },
    hsl2rgb: function(arg$){
      var h, s, l, a, m2, m1, ref$;
      h = arg$.h, s = arg$.s, l = arg$.l, a = arg$.a;
      h = h % 360 + (h < 0) * 360;
      s = isNaN(h) || isNaN(s) ? 0 : s;
      m2 = l + (l < 0.5
        ? l
        : 1 - l) * s;
      m1 = 2 * l - m2;
      return {
        r: (ref$ = this._hsl2rgb(h >= 240
          ? h - 240
          : h + 120, m1, m2)) > 0 ? ref$ : 0,
        g: (ref$ = this._hsl2rgb(h, m1, m2)) > 0 ? ref$ : 0,
        b: (ref$ = this._hsl2rgb(h < 120
          ? h + 240
          : h - 120, m1, m2)) > 0 ? ref$ : 0,
        a: a
      };
    },
    rgb2hsl: function(arg$){
      var r, g, b, a, ref$, Cmax, Cmin, delta, l, h, s;
      r = arg$.r, g = arg$.g, b = arg$.b, a = arg$.a;
      ref$ = [r / 255, g / 255, b / 255], r = ref$[0], g = ref$[1], b = ref$[2];
      Cmax = Math.max(r, g, b);
      Cmin = Math.min(r, g, b);
      delta = Cmax - Cmin;
      l = (Cmax + Cmin) / 2;
      if (delta === 0) {
        ref$ = [0, 0], h = ref$[0], s = ref$[1];
      } else {
        h = (function(){
          switch (false) {
          case Cmax !== r:
            return 60 * (((g - b) / delta) % 6);
          case Cmax !== g:
            return 60 * ((b - r) / delta + 2);
          case Cmax !== b:
            return 60 * ((r - g) / delta + 4);
          }
        }());
        s = delta / (1 - Math.abs(2 * l - 1));
      }
      h = (h + 360) % 360;
      return {
        h: h,
        s: s,
        l: l,
        a: a
      };
    },
    _rgb2lrgb: function(x){
      if ((x /= 255) <= 0.04045) {
        return x / 12.92;
      } else {
        return Math.pow((x + 0.055) / 1.055, 2.4);
      }
    },
    _xyz2lab: function(t){
      if (t > t3) {
        return Math.pow(t, 1 / 3);
      } else {
        return t / t2 + t0;
      }
    },
    _lab2xyz: function(t){
      if (t > t1) {
        return t * t * t;
      } else {
        return t2 * (t - t0);
      }
    },
    _lrgb2rgb: function(x){
      var ref$, ref1$;
      return (ref$ = (ref1$ = 255 * (x <= 0.0031308
        ? 12.92 * x
        : 1.055 * Math.pow(x, 1 / 2.4) - 0.055)) < 255 ? ref1$ : 255) > 0 ? ref$ : 0;
    },
    lab2rgb: function(v){
      var ref$, l, a, b, o, y, x, z;
      ref$ = [v["@l"], v["@a"], v["@b"], v["a"] != null ? v["a"] : 1], l = ref$[0], a = ref$[1], b = ref$[2], o = ref$[3];
      y = (l + 16) / 116;
      x = isNaN(a)
        ? y
        : y + a / 500;
      z = isNaN(b)
        ? y
        : y - b / 200;
      x = Xn * conv._lab2xyz(x);
      y = Yn * conv._lab2xyz(y);
      z = Zn * conv._lab2xyz(z);
      return {
        r: conv._lrgb2rgb(3.1338561 * x - 1.6168667 * y - 0.4906146 * z),
        g: conv._lrgb2rgb(-0.9787684 * x + 1.9161415 * y + 0.0334540 * z),
        b: conv._lrgb2rgb(0.0719453 * x - 0.2289914 * y + 1.4052427 * z),
        a: o
      };
    },
    lab2hcl: function(v){
      var ref$, l, a, b, o, h;
      ref$ = [v["@l"], v["@a"], v["@b"], v["a"] != null ? v["a"] : 1], l = ref$[0], a = ref$[1], b = ref$[2], o = ref$[3];
      if (a === 0 && b === 0) {
        return {
          h: NaN,
          c: 0,
          l: l,
          a: o
        };
      }
      h = Math.atan2(b, a) * 180 / Math.PI;
      return {
        h: isNaN(h)
          ? h
          : h < 0
            ? h + 360
            : h > 0 ? h : 0,
        c: Math.sqrt(a * a + b * b),
        l: isNaN(l)
          ? l
          : l > 0 ? l : 0,
        a: o
      };
    },
    hcl2lab: function(v){
      var h;
      v.a = v.a != null ? v.a : 1;
      if (isNaN(v.h)) {
        return {
          "@l": v.l,
          "@a": 0,
          "@b": 0,
          a: v.a
        };
      }
      h = v.h * Math.PI / 180;
      return {
        "@l": v.l,
        "@a": Math.cos(h) * v.c,
        "@b": Math.sin(h) * v.c,
        a: v.a
      };
    },
    hcl2rgb: function(v){
      return this.lab2rgb(this.hcl2lab(v));
    }
  };
  utils = {
    same: function(a, b){
      var ref$;
      b == null && (b = this);
      ref$ = [this.rgb(a), this.rgb(b)], a = ref$[0], b = ref$[1];
      return a.r === b.r && a.g === b.g && a.b === b.b && a.a === b.a;
    },
    rgb: function(v){
      var ret;
      v == null && (v = this);
      ret = parse.all(v);
      if (ret.c != null) {
        return conv.lab2rgb(conv.hcl2lab(ret));
      }
      if (ret.h != null) {
        return conv.hsl2rgb(ret);
      } else {
        return ret;
      }
    },
    rgbfv: function(v){
      var ret;
      v == null && (v = this);
      ret = this.rgb(v);
      return [ret.r / 255, ret.g / 255, ret.b / 255];
    },
    web: function(v, compact){
      var ret;
      v == null && (v = this);
      compact == null && (compact = false);
      ret = utils.rgb(v);
      if (ret.a != null && (isNaN(ret.a) || (!ret.a && ['r', 'g', 'b'].filter(function(it){
        return ret[it] != null && isNaN(ret[it]);
      })))) {
        return 'transparent';
      }
      if (ret.a < 1) {
        return this.rgbaStr(ret);
      } else {
        return this.hex(ret, compact);
      }
    },
    rgbaStr: function(v){
      var ret;
      v == null && (v = this);
      ret = utils.rgb(v);
      return "rgba(" + Math.round(ret.r) + ", " + Math.round(ret.g) + ", " + Math.round(ret.b) + ", " + ret.a + ")";
    },
    hsl: function(v){
      var ret;
      v == null && (v = this);
      ret = parse.all(v);
      if (ret.r != null) {
        return conv.rgb2hsl(ret);
      } else {
        return ret;
      }
    },
    hex: function(v, compact){
      var ref$, ret;
      v == null && (v = this);
      compact == null && (compact = false);
      if (v != null && typeof v === 'boolean') {
        ref$ = [this, v], v = ref$[0], compact = ref$[1];
      }
      ret = utils.rgb(v);
      ret = ['r', 'g', 'b'].map(function(it){
        var v, ref$;
        v = ((ref$ = Math.round(ret[it])) < 255 ? ref$ : 255).toString(16) + "";
        return v = repeatString$("0", 2 - v.length) + v;
      }).join('');
      if (compact && ret[0] === ret[1] && ret[2] === ret[3] && ret[4] === ret[5]) {
        ret = ret[0] + ret[2] + ret[4];
      }
      return "#" + ret;
    },
    lab: function(v){
      var ref$, r, g, b, a, y, x, z;
      v == null && (v = this);
      if (v.c) {
        return conv.hcl2lab(v);
      }
      ref$ = utils.rgb(v), r = ref$.r, g = ref$.g, b = ref$.b, a = ref$.a;
      r = conv._rgb2lrgb(r);
      g = conv._rgb2lrgb(g);
      b = conv._rgb2lrgb(b);
      y = conv._xyz2lab((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn);
      if (r === g && g === b) {
        x = z = y;
      } else {
        x = conv._xyz2lab((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / Xn);
        z = conv._xyz2lab((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / Zn);
      }
      return {
        "@l": 116 * y - 16,
        "@a": 500 * (x - y),
        "@b": 200 * (y - z),
        a: a
      };
    },
    hcl: function(v){
      v == null && (v = this);
      return conv.lab2hcl(utils.lab(v));
    },
    int: function(v){
      v == null && (v = this);
      v = utils.rgb(v);
      return (Math.round(v.r) << 16) + (Math.round(v.g) << 8) + Math.round(v.b);
    },
    rand: function(){
      return {
        h: Math.random() * 360,
        s: Math.random(),
        l: Math.random(),
        a: 1
      };
    },
    complement: function(v){
      var rgb;
      rgb = utils.rgb(v);
      return utils.hsl({
        r: 255 - rgb.r,
        g: 255 - rgb.g,
        b: 255 - rgb.b
      });
    },
    lighter: function(v, k){
      var hsl;
      v == null && (v = this);
      k == null && (k = 1);
      hsl = utils.hsl(v);
      hsl.l *= Math.pow(1 / 0.7, k);
      return hsl;
    },
    darker: function(v, k){
      var hsl;
      v == null && (v = this);
      k == null && (k = 1);
      hsl = utils.hsl(v);
      hsl.l *= Math.pow(0.7, k);
      return hsl;
    }
  };
  import$(ldcolor, utils);
  ldcolor.prototype = import$(Object.create(Object.prototype), utils);
  for (k in utils) {
    v = utils[k];
    fn$(k, v);
  }
  if (typeof module != 'undefined' && module !== null) {
    module.exports = ldcolor;
  } else {
    window.ldColor = window.ldcolor = ldcolor;
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
  function repeatString$(str, n){
    for (var r = ''; n > 0; (n >>= 1) && (str += str)) if (n & 1) r += str;
    return r;
  }
  function fn$(k, v){
    return ldcolor.prototype[k] = function(){
      return v(this);
    };
  }
}).call(this);
