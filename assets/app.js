function ei(s) {
  if (s === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return s;
}
function Ko(s, t) {
  s.prototype = Object.create(t.prototype), s.prototype.constructor = s, s.__proto__ = t;
}
var Se = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
}, Qr = {
  duration: 0.5,
  overwrite: !1,
  delay: 0
}, As, Ft, at, Me = 1e8, nt = 1 / Me, us = Math.PI * 2, vl = us / 4, yl = 0, Qo = Math.sqrt, wl = Math.cos, xl = Math.sin, Rt = function(t) {
  return typeof t == "string";
}, _t = function(t) {
  return typeof t == "function";
}, oi = function(t) {
  return typeof t == "number";
}, Ls = function(t) {
  return typeof t > "u";
}, Ke = function(t) {
  return typeof t == "object";
}, ae = function(t) {
  return t !== !1;
}, zs = function() {
  return typeof window < "u";
}, fn = function(t) {
  return _t(t) || Rt(t);
}, Zo = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {
}, $t = Array.isArray, bl = /random\([^)]+\)/g, Sl = /,\s*/g, oo = /(?:-?\.?\d|\.)+/gi, jo = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, lr = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, Kn = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, Jo = /[+-]=-?[.\d]+/, Tl = /[^,'"\[\]\s]+/gi, kl = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, ct, He, cs, Ns, Te = {}, An = {}, ta, ea = function(t) {
  return (An = vr(t, Te)) && fe;
}, Fs = function(t, i) {
  return console.warn("Invalid property", t, "set to", i, "Missing plugin? gsap.registerPlugin()");
}, Zr = function(t, i) {
  return !i && console.warn(t);
}, ia = function(t, i) {
  return t && (Te[t] = i) && An && (An[t] = i) || Te;
}, jr = function() {
  return 0;
}, Cl = {
  suppressEvents: !0,
  isStart: !0,
  kill: !1
}, Tn = {
  suppressEvents: !0,
  kill: !1
}, Pl = {
  suppressEvents: !0
}, Is = {}, xi = [], fs = {}, ra, me = {}, Qn = {}, ao = 30, kn = [], Ys = "", Bs = function(t) {
  var i = t[0], e, r;
  if (Ke(i) || _t(i) || (t = [t]), !(e = (i._gsap || {}).harness)) {
    for (r = kn.length; r-- && !kn[r].targetTest(i); )
      ;
    e = kn[r];
  }
  for (r = t.length; r--; )
    t[r] && (t[r]._gsap || (t[r]._gsap = new ka(t[r], e))) || t.splice(r, 1);
  return t;
}, Xi = function(t) {
  return t._gsap || Bs(De(t))[0]._gsap;
}, na = function(t, i, e) {
  return (e = t[i]) && _t(e) ? t[i]() : Ls(e) && t.getAttribute && t.getAttribute(i) || e;
}, le = function(t, i) {
  return (t = t.split(",")).forEach(i) || t;
}, yt = function(t) {
  return Math.round(t * 1e5) / 1e5 || 0;
}, ut = function(t) {
  return Math.round(t * 1e7) / 1e7 || 0;
}, fr = function(t, i) {
  var e = i.charAt(0), r = parseFloat(i.substr(2));
  return t = parseFloat(t), e === "+" ? t + r : e === "-" ? t - r : e === "*" ? t * r : t / r;
}, El = function(t, i) {
  for (var e = i.length, r = 0; t.indexOf(i[r]) < 0 && ++r < e; )
    ;
  return r < e;
}, Ln = function() {
  var t = xi.length, i = xi.slice(0), e, r;
  for (fs = {}, xi.length = 0, e = 0; e < t; e++)
    r = i[e], r && r._lazy && (r.render(r._lazy[0], r._lazy[1], !0)._lazy = 0);
}, Xs = function(t) {
  return !!(t._initted || t._startAt || t.add);
}, sa = function(t, i, e, r) {
  xi.length && !Ft && Ln(), t.render(i, e, !!(Ft && i < 0 && Xs(t))), xi.length && !Ft && Ln();
}, oa = function(t) {
  var i = parseFloat(t);
  return (i || i === 0) && (t + "").match(Tl).length < 2 ? i : Rt(t) ? t.trim() : t;
}, aa = function(t) {
  return t;
}, ke = function(t, i) {
  for (var e in i)
    e in t || (t[e] = i[e]);
  return t;
}, Ol = function(t) {
  return function(i, e) {
    for (var r in e)
      r in i || r === "duration" && t || r === "ease" || (i[r] = e[r]);
  };
}, vr = function(t, i) {
  for (var e in i)
    t[e] = i[e];
  return t;
}, lo = function s(t, i) {
  for (var e in i)
    e !== "__proto__" && e !== "constructor" && e !== "prototype" && (t[e] = Ke(i[e]) ? s(t[e] || (t[e] = {}), i[e]) : i[e]);
  return t;
}, zn = function(t, i) {
  var e = {}, r;
  for (r in t)
    r in i || (e[r] = t[r]);
  return e;
}, Ir = function(t) {
  var i = t.parent || ct, e = t.keyframes ? Ol($t(t.keyframes)) : ke;
  if (ae(t.inherit))
    for (; i; )
      e(t, i.vars.defaults), i = i.parent || i._dp;
  return t;
}, Ml = function(t, i) {
  for (var e = t.length, r = e === i.length; r && e-- && t[e] === i[e]; )
    ;
  return e < 0;
}, la = function(t, i, e, r, n) {
  var o = t[r], a;
  if (n)
    for (a = i[n]; o && o[n] > a; )
      o = o._prev;
  return o ? (i._next = o._next, o._next = i) : (i._next = t[e], t[e] = i), i._next ? i._next._prev = i : t[r] = i, i._prev = o, i.parent = i._dp = t, i;
}, Vn = function(t, i, e, r) {
  e === void 0 && (e = "_first"), r === void 0 && (r = "_last");
  var n = i._prev, o = i._next;
  n ? n._next = o : t[e] === i && (t[e] = o), o ? o._prev = n : t[r] === i && (t[r] = n), i._next = i._prev = i.parent = null;
}, Ti = function(t, i) {
  t.parent && (!i || t.parent.autoRemoveChildren) && t.parent.remove && t.parent.remove(t), t._act = 0;
}, Wi = function(t, i) {
  if (t && (!i || i._end > t._dur || i._start < 0))
    for (var e = t; e; )
      e._dirty = 1, e = e.parent;
  return t;
}, Dl = function(t) {
  for (var i = t.parent; i && i.parent; )
    i._dirty = 1, i.totalDuration(), i = i.parent;
  return t;
}, hs = function(t, i, e, r) {
  return t._startAt && (Ft ? t._startAt.revert(Tn) : t.vars.immediateRender && !t.vars.autoRevert || t._startAt.render(i, !0, r));
}, Rl = function s(t) {
  return !t || t._ts && s(t.parent);
}, uo = function(t) {
  return t._repeat ? yr(t._tTime, t = t.duration() + t._rDelay) * t : 0;
}, yr = function(t, i) {
  var e = Math.floor(t = ut(t / i));
  return t && e === t ? e - 1 : e;
}, Nn = function(t, i) {
  return (t - i._start) * i._ts + (i._ts >= 0 ? 0 : i._dirty ? i.totalDuration() : i._tDur);
}, Un = function(t) {
  return t._end = ut(t._start + (t._tDur / Math.abs(t._ts || t._rts || nt) || 0));
}, qn = function(t, i) {
  var e = t._dp;
  return e && e.smoothChildTiming && t._ts && (t._start = ut(e._time - (t._ts > 0 ? i / t._ts : ((t._dirty ? t.totalDuration() : t._tDur) - i) / -t._ts)), Un(t), e._dirty || Wi(e, t)), t;
}, ua = function(t, i) {
  var e;
  if ((i._time || !i._dur && i._initted || i._start < t._time && (i._dur || !i.add)) && (e = Nn(t.rawTime(), i), (!i._dur || an(0, i.totalDuration(), e) - i._tTime > nt) && i.render(e, !0)), Wi(t, i)._dp && t._initted && t._time >= t._dur && t._ts) {
    if (t._dur < t.duration())
      for (e = t; e._dp; )
        e.rawTime() >= 0 && e.totalTime(e._tTime), e = e._dp;
    t._zTime = -nt;
  }
}, Ue = function(t, i, e, r) {
  return i.parent && Ti(i), i._start = ut((oi(e) ? e : e || t !== ct ? Pe(t, e, i) : t._time) + i._delay), i._end = ut(i._start + (i.totalDuration() / Math.abs(i.timeScale()) || 0)), la(t, i, "_first", "_last", t._sort ? "_start" : 0), ds(i) || (t._recent = i), r || ua(t, i), t._ts < 0 && qn(t, t._tTime), t;
}, ca = function(t, i) {
  return (Te.ScrollTrigger || Fs("scrollTrigger", i)) && Te.ScrollTrigger.create(i, t);
}, fa = function(t, i, e, r, n) {
  if (Hs(t, i, n), !t._initted)
    return 1;
  if (!e && t._pt && !Ft && (t._dur && t.vars.lazy !== !1 || !t._dur && t.vars.lazy) && ra !== ye.frame)
    return xi.push(t), t._lazy = [n, r], 1;
}, Al = function s(t) {
  var i = t.parent;
  return i && i._ts && i._initted && !i._lock && (i.rawTime() < 0 || s(i));
}, ds = function(t) {
  var i = t.data;
  return i === "isFromStart" || i === "isStart";
}, Ll = function(t, i, e, r) {
  var n = t.ratio, o = i < 0 || !i && (!t._start && Al(t) && !(!t._initted && ds(t)) || (t._ts < 0 || t._dp._ts < 0) && !ds(t)) ? 0 : 1, a = t._rDelay, l = 0, u, c, d;
  if (a && t._repeat && (l = an(0, t._tDur, i), c = yr(l, a), t._yoyo && c & 1 && (o = 1 - o), c !== yr(t._tTime, a) && (n = 1 - o, t.vars.repeatRefresh && t._initted && t.invalidate())), o !== n || Ft || r || t._zTime === nt || !i && t._zTime) {
    if (!t._initted && fa(t, i, r, e, l))
      return;
    for (d = t._zTime, t._zTime = i || (e ? nt : 0), e || (e = i && !d), t.ratio = o, t._from && (o = 1 - o), t._time = 0, t._tTime = l, u = t._pt; u; )
      u.r(o, u.d), u = u._next;
    i < 0 && hs(t, i, e, !0), t._onUpdate && !e && xe(t, "onUpdate"), l && t._repeat && !e && t.parent && xe(t, "onRepeat"), (i >= t._tDur || i < 0) && t.ratio === o && (o && Ti(t, 1), !e && !Ft && (xe(t, o ? "onComplete" : "onReverseComplete", !0), t._prom && t._prom()));
  } else t._zTime || (t._zTime = i);
}, zl = function(t, i, e) {
  var r;
  if (e > i)
    for (r = t._first; r && r._start <= e; ) {
      if (r.data === "isPause" && r._start > i)
        return r;
      r = r._next;
    }
  else
    for (r = t._last; r && r._start >= e; ) {
      if (r.data === "isPause" && r._start < i)
        return r;
      r = r._prev;
    }
}, wr = function(t, i, e, r) {
  var n = t._repeat, o = ut(i) || 0, a = t._tTime / t._tDur;
  return a && !r && (t._time *= o / t._dur), t._dur = o, t._tDur = n ? n < 0 ? 1e10 : ut(o * (n + 1) + t._rDelay * n) : o, a > 0 && !r && qn(t, t._tTime = t._tDur * a), t.parent && Un(t), e || Wi(t.parent, t), t;
}, co = function(t) {
  return t instanceof oe ? Wi(t) : wr(t, t._dur);
}, Nl = {
  _start: 0,
  endTime: jr,
  totalDuration: jr
}, Pe = function s(t, i, e) {
  var r = t.labels, n = t._recent || Nl, o = t.duration() >= Me ? n.endTime(!1) : t._dur, a, l, u;
  return Rt(i) && (isNaN(i) || i in r) ? (l = i.charAt(0), u = i.substr(-1) === "%", a = i.indexOf("="), l === "<" || l === ">" ? (a >= 0 && (i = i.replace(/=/, "")), (l === "<" ? n._start : n.endTime(n._repeat >= 0)) + (parseFloat(i.substr(1)) || 0) * (u ? (a < 0 ? n : e).totalDuration() / 100 : 1)) : a < 0 ? (i in r || (r[i] = o), r[i]) : (l = parseFloat(i.charAt(a - 1) + i.substr(a + 1)), u && e && (l = l / 100 * ($t(e) ? e[0] : e).totalDuration()), a > 1 ? s(t, i.substr(0, a - 1), e) + l : o + l)) : i == null ? o : +i;
}, Yr = function(t, i, e) {
  var r = oi(i[1]), n = (r ? 2 : 1) + (t < 2 ? 0 : 1), o = i[n], a, l;
  if (r && (o.duration = i[1]), o.parent = e, t) {
    for (a = o, l = e; l && !("immediateRender" in a); )
      a = l.vars.defaults || {}, l = ae(l.vars.inherit) && l.parent;
    o.immediateRender = ae(a.immediateRender), t < 2 ? o.runBackwards = 1 : o.startAt = i[n - 1];
  }
  return new Tt(i[0], o, i[n + 1]);
}, Ei = function(t, i) {
  return t || t === 0 ? i(t) : i;
}, an = function(t, i, e) {
  return e < t ? t : e > i ? i : e;
}, Ut = function(t, i) {
  return !Rt(t) || !(i = kl.exec(t)) ? "" : i[1];
}, Fl = function(t, i, e) {
  return Ei(e, function(r) {
    return an(t, i, r);
  });
}, ps = [].slice, ha = function(t, i) {
  return t && Ke(t) && "length" in t && (!i && !t.length || t.length - 1 in t && Ke(t[0])) && !t.nodeType && t !== He;
}, Il = function(t, i, e) {
  return e === void 0 && (e = []), t.forEach(function(r) {
    var n;
    return Rt(r) && !i || ha(r, 1) ? (n = e).push.apply(n, De(r)) : e.push(r);
  }) || e;
}, De = function(t, i, e) {
  return at && !i && at.selector ? at.selector(t) : Rt(t) && !e && (cs || !xr()) ? ps.call((i || Ns).querySelectorAll(t), 0) : $t(t) ? Il(t, e) : ha(t) ? ps.call(t, 0) : t ? [t] : [];
}, _s = function(t) {
  return t = De(t)[0] || Zr("Invalid scope") || {}, function(i) {
    var e = t.current || t.nativeElement || t;
    return De(i, e.querySelectorAll ? e : e === t ? Zr("Invalid scope") || Ns.createElement("div") : t);
  };
}, da = function(t) {
  return t.sort(function() {
    return 0.5 - Math.random();
  });
}, pa = function(t) {
  if (_t(t))
    return t;
  var i = Ke(t) ? t : {
    each: t
  }, e = Hi(i.ease), r = i.from || 0, n = parseFloat(i.base) || 0, o = {}, a = r > 0 && r < 1, l = isNaN(r) || a, u = i.axis, c = r, d = r;
  return Rt(r) ? c = d = {
    center: 0.5,
    edges: 0.5,
    end: 1
  }[r] || 0 : !a && l && (c = r[0], d = r[1]), function(h, f, _) {
    var p = (_ || i).length, g = o[p], b, w, T, v, S, P, x, E, C;
    if (!g) {
      if (C = i.grid === "auto" ? 0 : (i.grid || [1, Me])[1], !C) {
        for (x = -Me; x < (x = _[C++].getBoundingClientRect().left) && C < p; )
          ;
        C < p && C--;
      }
      for (g = o[p] = [], b = l ? Math.min(C, p) * c - 0.5 : r % C, w = C === Me ? 0 : l ? p * d / C - 0.5 : r / C | 0, x = 0, E = Me, P = 0; P < p; P++)
        T = P % C - b, v = w - (P / C | 0), g[P] = S = u ? Math.abs(u === "y" ? v : T) : Qo(T * T + v * v), S > x && (x = S), S < E && (E = S);
      r === "random" && da(g), g.max = x - E, g.min = E, g.v = p = (parseFloat(i.amount) || parseFloat(i.each) * (C > p ? p - 1 : u ? u === "y" ? p / C : C : Math.max(C, p / C)) || 0) * (r === "edges" ? -1 : 1), g.b = p < 0 ? n - p : n, g.u = Ut(i.amount || i.each) || 0, e = e && p < 0 ? Zl(e) : e;
    }
    return p = (g[h] - g.min) / g.max || 0, ut(g.b + (e ? e(p) : p) * g.v) + g.u;
  };
}, gs = function(t) {
  var i = Math.pow(10, ((t + "").split(".")[1] || "").length);
  return function(e) {
    var r = ut(Math.round(parseFloat(e) / t) * t * i);
    return (r - r % 1) / i + (oi(e) ? 0 : Ut(e));
  };
}, _a = function(t, i) {
  var e = $t(t), r, n;
  return !e && Ke(t) && (r = e = t.radius || Me, t.values ? (t = De(t.values), (n = !oi(t[0])) && (r *= r)) : t = gs(t.increment)), Ei(i, e ? _t(t) ? function(o) {
    return n = t(o), Math.abs(n - o) <= r ? n : o;
  } : function(o) {
    for (var a = parseFloat(n ? o.x : o), l = parseFloat(n ? o.y : 0), u = Me, c = 0, d = t.length, h, f; d--; )
      n ? (h = t[d].x - a, f = t[d].y - l, h = h * h + f * f) : h = Math.abs(t[d] - a), h < u && (u = h, c = d);
    return c = !r || u <= r ? t[c] : o, n || c === o || oi(o) ? c : c + Ut(o);
  } : gs(t));
}, ga = function(t, i, e, r) {
  return Ei($t(t) ? !i : e === !0 ? !!(e = 0) : !r, function() {
    return $t(t) ? t[~~(Math.random() * t.length)] : (e = e || 1e-5) && (r = e < 1 ? Math.pow(10, (e + "").length - 2) : 1) && Math.floor(Math.round((t - e / 2 + Math.random() * (i - t + e * 0.99)) / e) * e * r) / r;
  });
}, Yl = function() {
  for (var t = arguments.length, i = new Array(t), e = 0; e < t; e++)
    i[e] = arguments[e];
  return function(r) {
    return i.reduce(function(n, o) {
      return o(n);
    }, r);
  };
}, Bl = function(t, i) {
  return function(e) {
    return t(parseFloat(e)) + (i || Ut(e));
  };
}, Xl = function(t, i, e) {
  return va(t, i, 0, 1, e);
}, ma = function(t, i, e) {
  return Ei(e, function(r) {
    return t[~~i(r)];
  });
}, Wl = function s(t, i, e) {
  var r = i - t;
  return $t(t) ? ma(t, s(0, t.length), i) : Ei(e, function(n) {
    return (r + (n - t) % r) % r + t;
  });
}, Hl = function s(t, i, e) {
  var r = i - t, n = r * 2;
  return $t(t) ? ma(t, s(0, t.length - 1), i) : Ei(e, function(o) {
    return o = (n + (o - t) % n) % n || 0, t + (o > r ? n - o : o);
  });
}, Jr = function(t) {
  return t.replace(bl, function(i) {
    var e = i.indexOf("[") + 1, r = i.substring(e || 7, e ? i.indexOf("]") : i.length - 1).split(Sl);
    return ga(e ? r : +r[0], e ? 0 : +r[1], +r[2] || 1e-5);
  });
}, va = function(t, i, e, r, n) {
  var o = i - t, a = r - e;
  return Ei(n, function(l) {
    return e + ((l - t) / o * a || 0);
  });
}, Vl = function s(t, i, e, r) {
  var n = isNaN(t + i) ? 0 : function(f) {
    return (1 - f) * t + f * i;
  };
  if (!n) {
    var o = Rt(t), a = {}, l, u, c, d, h;
    if (e === !0 && (r = 1) && (e = null), o)
      t = {
        p: t
      }, i = {
        p: i
      };
    else if ($t(t) && !$t(i)) {
      for (c = [], d = t.length, h = d - 2, u = 1; u < d; u++)
        c.push(s(t[u - 1], t[u]));
      d--, n = function(_) {
        _ *= d;
        var p = Math.min(h, ~~_);
        return c[p](_ - p);
      }, e = i;
    } else r || (t = vr($t(t) ? [] : {}, t));
    if (!c) {
      for (l in i)
        Ws.call(a, t, l, "get", i[l]);
      n = function(_) {
        return qs(_, a) || (o ? t.p : t);
      };
    }
  }
  return Ei(e, n);
}, fo = function(t, i, e) {
  var r = t.labels, n = Me, o, a, l;
  for (o in r)
    a = r[o] - i, a < 0 == !!e && a && n > (a = Math.abs(a)) && (l = o, n = a);
  return l;
}, xe = function(t, i, e) {
  var r = t.vars, n = r[i], o = at, a = t._ctx, l, u, c;
  if (n)
    return l = r[i + "Params"], u = r.callbackScope || t, e && xi.length && Ln(), a && (at = a), c = l ? n.apply(u, l) : n.call(u), at = o, c;
}, Dr = function(t) {
  return Ti(t), t.scrollTrigger && t.scrollTrigger.kill(!!Ft), t.progress() < 1 && xe(t, "onInterrupt"), t;
}, ur, ya = [], wa = function(t) {
  if (t)
    if (t = !t.name && t.default || t, zs() || t.headless) {
      var i = t.name, e = _t(t), r = i && !e && t.init ? function() {
        this._props = [];
      } : t, n = {
        init: jr,
        render: qs,
        add: Ws,
        kill: au,
        modifier: ou,
        rawVars: 0
      }, o = {
        targetTest: 0,
        get: 0,
        getSetter: Us,
        aliases: {},
        register: 0
      };
      if (xr(), t !== r) {
        if (me[i])
          return;
        ke(r, ke(zn(t, n), o)), vr(r.prototype, vr(n, zn(t, o))), me[r.prop = i] = r, t.targetTest && (kn.push(r), Is[i] = 1), i = (i === "css" ? "CSS" : i.charAt(0).toUpperCase() + i.substr(1)) + "Plugin";
      }
      ia(i, r), t.register && t.register(fe, r, ue);
    } else
      ya.push(t);
}, rt = 255, Rr = {
  aqua: [0, rt, rt],
  lime: [0, rt, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, rt],
  navy: [0, 0, 128],
  white: [rt, rt, rt],
  olive: [128, 128, 0],
  yellow: [rt, rt, 0],
  orange: [rt, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [rt, 0, 0],
  pink: [rt, 192, 203],
  cyan: [0, rt, rt],
  transparent: [rt, rt, rt, 0]
}, Zn = function(t, i, e) {
  return t += t < 0 ? 1 : t > 1 ? -1 : 0, (t * 6 < 1 ? i + (e - i) * t * 6 : t < 0.5 ? e : t * 3 < 2 ? i + (e - i) * (2 / 3 - t) * 6 : i) * rt + 0.5 | 0;
}, xa = function(t, i, e) {
  var r = t ? oi(t) ? [t >> 16, t >> 8 & rt, t & rt] : 0 : Rr.black, n, o, a, l, u, c, d, h, f, _;
  if (!r) {
    if (t.substr(-1) === "," && (t = t.substr(0, t.length - 1)), Rr[t])
      r = Rr[t];
    else if (t.charAt(0) === "#") {
      if (t.length < 6 && (n = t.charAt(1), o = t.charAt(2), a = t.charAt(3), t = "#" + n + n + o + o + a + a + (t.length === 5 ? t.charAt(4) + t.charAt(4) : "")), t.length === 9)
        return r = parseInt(t.substr(1, 6), 16), [r >> 16, r >> 8 & rt, r & rt, parseInt(t.substr(7), 16) / 255];
      t = parseInt(t.substr(1), 16), r = [t >> 16, t >> 8 & rt, t & rt];
    } else if (t.substr(0, 3) === "hsl") {
      if (r = _ = t.match(oo), !i)
        l = +r[0] % 360 / 360, u = +r[1] / 100, c = +r[2] / 100, o = c <= 0.5 ? c * (u + 1) : c + u - c * u, n = c * 2 - o, r.length > 3 && (r[3] *= 1), r[0] = Zn(l + 1 / 3, n, o), r[1] = Zn(l, n, o), r[2] = Zn(l - 1 / 3, n, o);
      else if (~t.indexOf("="))
        return r = t.match(jo), e && r.length < 4 && (r[3] = 1), r;
    } else
      r = t.match(oo) || Rr.transparent;
    r = r.map(Number);
  }
  return i && !_ && (n = r[0] / rt, o = r[1] / rt, a = r[2] / rt, d = Math.max(n, o, a), h = Math.min(n, o, a), c = (d + h) / 2, d === h ? l = u = 0 : (f = d - h, u = c > 0.5 ? f / (2 - d - h) : f / (d + h), l = d === n ? (o - a) / f + (o < a ? 6 : 0) : d === o ? (a - n) / f + 2 : (n - o) / f + 4, l *= 60), r[0] = ~~(l + 0.5), r[1] = ~~(u * 100 + 0.5), r[2] = ~~(c * 100 + 0.5)), e && r.length < 4 && (r[3] = 1), r;
}, ba = function(t) {
  var i = [], e = [], r = -1;
  return t.split(bi).forEach(function(n) {
    var o = n.match(lr) || [];
    i.push.apply(i, o), e.push(r += o.length + 1);
  }), i.c = e, i;
}, ho = function(t, i, e) {
  var r = "", n = (t + r).match(bi), o = i ? "hsla(" : "rgba(", a = 0, l, u, c, d;
  if (!n)
    return t;
  if (n = n.map(function(h) {
    return (h = xa(h, i, 1)) && o + (i ? h[0] + "," + h[1] + "%," + h[2] + "%," + h[3] : h.join(",")) + ")";
  }), e && (c = ba(t), l = e.c, l.join(r) !== c.c.join(r)))
    for (u = t.replace(bi, "1").split(lr), d = u.length - 1; a < d; a++)
      r += u[a] + (~l.indexOf(a) ? n.shift() || o + "0,0,0,0)" : (c.length ? c : n.length ? n : e).shift());
  if (!u)
    for (u = t.split(bi), d = u.length - 1; a < d; a++)
      r += u[a] + n[a];
  return r + u[d];
}, bi = (function() {
  var s = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", t;
  for (t in Rr)
    s += "|" + t + "\\b";
  return new RegExp(s + ")", "gi");
})(), Ul = /hsl[a]?\(/, Sa = function(t) {
  var i = t.join(" "), e;
  if (bi.lastIndex = 0, bi.test(i))
    return e = Ul.test(i), t[1] = ho(t[1], e), t[0] = ho(t[0], e, ba(t[1])), !0;
}, tn, ye = (function() {
  var s = Date.now, t = 500, i = 33, e = s(), r = e, n = 1e3 / 240, o = n, a = [], l, u, c, d, h, f, _ = function p(g) {
    var b = s() - r, w = g === !0, T, v, S, P;
    if ((b > t || b < 0) && (e += b - i), r += b, S = r - e, T = S - o, (T > 0 || w) && (P = ++d.frame, h = S - d.time * 1e3, d.time = S = S / 1e3, o += T + (T >= n ? 4 : n - T), v = 1), w || (l = u(p)), v)
      for (f = 0; f < a.length; f++)
        a[f](S, h, P, g);
  };
  return d = {
    time: 0,
    frame: 0,
    tick: function() {
      _(!0);
    },
    deltaRatio: function(g) {
      return h / (1e3 / (g || 60));
    },
    wake: function() {
      ta && (!cs && zs() && (He = cs = window, Ns = He.document || {}, Te.gsap = fe, (He.gsapVersions || (He.gsapVersions = [])).push(fe.version), ea(An || He.GreenSockGlobals || !He.gsap && He || {}), ya.forEach(wa)), c = typeof requestAnimationFrame < "u" && requestAnimationFrame, l && d.sleep(), u = c || function(g) {
        return setTimeout(g, o - d.time * 1e3 + 1 | 0);
      }, tn = 1, _(2));
    },
    sleep: function() {
      (c ? cancelAnimationFrame : clearTimeout)(l), tn = 0, u = jr;
    },
    lagSmoothing: function(g, b) {
      t = g || 1 / 0, i = Math.min(b || 33, t);
    },
    fps: function(g) {
      n = 1e3 / (g || 240), o = d.time * 1e3 + n;
    },
    add: function(g, b, w) {
      var T = b ? function(v, S, P, x) {
        g(v, S, P, x), d.remove(T);
      } : g;
      return d.remove(g), a[w ? "unshift" : "push"](T), xr(), T;
    },
    remove: function(g, b) {
      ~(b = a.indexOf(g)) && a.splice(b, 1) && f >= b && f--;
    },
    _listeners: a
  }, d;
})(), xr = function() {
  return !tn && ye.wake();
}, $ = {}, ql = /^[\d.\-M][\d.\-,\s]/, $l = /["']/g, Gl = function(t) {
  for (var i = {}, e = t.substr(1, t.length - 3).split(":"), r = e[0], n = 1, o = e.length, a, l, u; n < o; n++)
    l = e[n], a = n !== o - 1 ? l.lastIndexOf(",") : l.length, u = l.substr(0, a), i[r] = isNaN(u) ? u.replace($l, "").trim() : +u, r = l.substr(a + 1).trim();
  return i;
}, Kl = function(t) {
  var i = t.indexOf("(") + 1, e = t.indexOf(")"), r = t.indexOf("(", i);
  return t.substring(i, ~r && r < e ? t.indexOf(")", e + 1) : e);
}, Ql = function(t) {
  var i = (t + "").split("("), e = $[i[0]];
  return e && i.length > 1 && e.config ? e.config.apply(null, ~t.indexOf("{") ? [Gl(i[1])] : Kl(t).split(",").map(oa)) : $._CE && ql.test(t) ? $._CE("", t) : e;
}, Zl = function(t) {
  return function(i) {
    return 1 - t(1 - i);
  };
}, Hi = function(t, i) {
  return t && (_t(t) ? t : $[t] || Ql(t)) || i;
}, ji = function(t, i, e, r) {
  e === void 0 && (e = function(l) {
    return 1 - i(1 - l);
  }), r === void 0 && (r = function(l) {
    return l < 0.5 ? i(l * 2) / 2 : 1 - i((1 - l) * 2) / 2;
  });
  var n = {
    easeIn: i,
    easeOut: e,
    easeInOut: r
  }, o;
  return le(t, function(a) {
    $[a] = Te[a] = n, $[o = a.toLowerCase()] = e;
    for (var l in n)
      $[o + (l === "easeIn" ? ".in" : l === "easeOut" ? ".out" : ".inOut")] = $[a + "." + l] = n[l];
  }), n;
}, Ta = function(t) {
  return function(i) {
    return i < 0.5 ? (1 - t(1 - i * 2)) / 2 : 0.5 + t((i - 0.5) * 2) / 2;
  };
}, jn = function s(t, i, e) {
  var r = i >= 1 ? i : 1, n = (e || (t ? 0.3 : 0.45)) / (i < 1 ? i : 1), o = n / us * (Math.asin(1 / r) || 0), a = function(c) {
    return c === 1 ? 1 : r * Math.pow(2, -10 * c) * xl((c - o) * n) + 1;
  }, l = t === "out" ? a : t === "in" ? function(u) {
    return 1 - a(1 - u);
  } : Ta(a);
  return n = us / n, l.config = function(u, c) {
    return s(t, u, c);
  }, l;
}, Jn = function s(t, i) {
  i === void 0 && (i = 1.70158);
  var e = function(o) {
    return o ? --o * o * ((i + 1) * o + i) + 1 : 0;
  }, r = t === "out" ? e : t === "in" ? function(n) {
    return 1 - e(1 - n);
  } : Ta(e);
  return r.config = function(n) {
    return s(t, n);
  }, r;
};
le("Linear,Quad,Cubic,Quart,Quint,Strong", function(s, t) {
  var i = t < 5 ? t + 1 : t;
  ji(s + ",Power" + (i - 1), t ? function(e) {
    return Math.pow(e, i);
  } : function(e) {
    return e;
  }, function(e) {
    return 1 - Math.pow(1 - e, i);
  }, function(e) {
    return e < 0.5 ? Math.pow(e * 2, i) / 2 : 1 - Math.pow((1 - e) * 2, i) / 2;
  });
});
$.Linear.easeNone = $.none = $.Linear.easeIn;
ji("Elastic", jn("in"), jn("out"), jn());
(function(s, t) {
  var i = 1 / t, e = 2 * i, r = 2.5 * i, n = function(a) {
    return a < i ? s * a * a : a < e ? s * Math.pow(a - 1.5 / t, 2) + 0.75 : a < r ? s * (a -= 2.25 / t) * a + 0.9375 : s * Math.pow(a - 2.625 / t, 2) + 0.984375;
  };
  ji("Bounce", function(o) {
    return 1 - n(1 - o);
  }, n);
})(7.5625, 2.75);
ji("Expo", function(s) {
  return Math.pow(2, 10 * (s - 1)) * s + s * s * s * s * s * s * (1 - s);
});
ji("Circ", function(s) {
  return -(Qo(1 - s * s) - 1);
});
ji("Sine", function(s) {
  return s === 1 ? 1 : -wl(s * vl) + 1;
});
ji("Back", Jn("in"), Jn("out"), Jn());
$.SteppedEase = $.steps = Te.SteppedEase = {
  config: function(t, i) {
    t === void 0 && (t = 1);
    var e = 1 / t, r = t + (i ? 0 : 1), n = i ? 1 : 0, o = 1 - nt;
    return function(a) {
      return ((r * an(0, o, a) | 0) + n) * e;
    };
  }
};
Qr.ease = $["quad.out"];
le("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(s) {
  return Ys += s + "," + s + "Params,";
});
var ka = function(t, i) {
  this.id = yl++, t._gsap = this, this.target = t, this.harness = i, this.get = i ? i.get : na, this.set = i ? i.getSetter : Us;
}, en = /* @__PURE__ */ (function() {
  function s(i) {
    this.vars = i, this._delay = +i.delay || 0, (this._repeat = i.repeat === 1 / 0 ? -2 : i.repeat || 0) && (this._rDelay = i.repeatDelay || 0, this._yoyo = !!i.yoyo || !!i.yoyoEase), this._ts = 1, wr(this, +i.duration, 1, 1), this.data = i.data, at && (this._ctx = at, at.data.push(this)), tn || ye.wake();
  }
  var t = s.prototype;
  return t.delay = function(e) {
    return e || e === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + e - this._delay), this._delay = e, this) : this._delay;
  }, t.duration = function(e) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? e + (e + this._rDelay) * this._repeat : e) : this.totalDuration() && this._dur;
  }, t.totalDuration = function(e) {
    return arguments.length ? (this._dirty = 0, wr(this, this._repeat < 0 ? e : (e - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
  }, t.totalTime = function(e, r) {
    if (xr(), !arguments.length)
      return this._tTime;
    var n = this._dp;
    if (n && n.smoothChildTiming && this._ts) {
      for (qn(this, e), !n._dp || n.parent || ua(n, this); n && n.parent; )
        n.parent._time !== n._start + (n._ts >= 0 ? n._tTime / n._ts : (n.totalDuration() - n._tTime) / -n._ts) && n.totalTime(n._tTime, !0), n = n.parent;
      !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && e < this._tDur || this._ts < 0 && e > 0 || !this._tDur && !e) && Ue(this._dp, this, this._start - this._delay);
    }
    return (this._tTime !== e || !this._dur && !r || this._initted && Math.abs(this._zTime) === nt || !this._initted && this._dur && e || !e && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = e), sa(this, e, r)), this;
  }, t.time = function(e, r) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), e + uo(this)) % (this._dur + this._rDelay) || (e ? this._dur : 0), r) : this._time;
  }, t.totalProgress = function(e, r) {
    return arguments.length ? this.totalTime(this.totalDuration() * e, r) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0;
  }, t.progress = function(e, r) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - e : e) + uo(this), r) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
  }, t.iteration = function(e, r) {
    var n = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (e - 1) * n, r) : this._repeat ? yr(this._tTime, n) + 1 : 1;
  }, t.timeScale = function(e, r) {
    if (!arguments.length)
      return this._rts === -nt ? 0 : this._rts;
    if (this._rts === e)
      return this;
    var n = this.parent && this._ts ? Nn(this.parent._time, this) : this._tTime;
    return this._rts = +e || 0, this._ts = this._ps || e === -nt ? 0 : this._rts, this.totalTime(an(-Math.abs(this._delay), this.totalDuration(), n), r !== !1), Un(this), Dl(this);
  }, t.paused = function(e) {
    return arguments.length ? (this._ps !== e && (this._ps = e, e ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (xr(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== nt && (this._tTime -= nt)))), this) : this._ps;
  }, t.startTime = function(e) {
    if (arguments.length) {
      this._start = ut(e);
      var r = this.parent || this._dp;
      return r && (r._sort || !this.parent) && Ue(r, this, this._start - this._delay), this;
    }
    return this._start;
  }, t.endTime = function(e) {
    return this._start + (ae(e) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  }, t.rawTime = function(e) {
    var r = this.parent || this._dp;
    return r ? e && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? Nn(r.rawTime(e), this) : this._tTime : this._tTime;
  }, t.revert = function(e) {
    e === void 0 && (e = Pl);
    var r = Ft;
    return Ft = e, Xs(this) && (this.timeline && this.timeline.revert(e), this.totalTime(-0.01, e.suppressEvents)), this.data !== "nested" && e.kill !== !1 && this.kill(), Ft = r, this;
  }, t.globalTime = function(e) {
    for (var r = this, n = arguments.length ? e : r.rawTime(); r; )
      n = r._start + n / (Math.abs(r._ts) || 1), r = r._dp;
    return !this.parent && this._sat ? this._sat.globalTime(e) : n;
  }, t.repeat = function(e) {
    return arguments.length ? (this._repeat = e === 1 / 0 ? -2 : e, co(this)) : this._repeat === -2 ? 1 / 0 : this._repeat;
  }, t.repeatDelay = function(e) {
    if (arguments.length) {
      var r = this._time;
      return this._rDelay = e, co(this), r ? this.time(r) : this;
    }
    return this._rDelay;
  }, t.yoyo = function(e) {
    return arguments.length ? (this._yoyo = e, this) : this._yoyo;
  }, t.seek = function(e, r) {
    return this.totalTime(Pe(this, e), ae(r));
  }, t.restart = function(e, r) {
    return this.play().totalTime(e ? -this._delay : 0, ae(r)), this._dur || (this._zTime = -nt), this;
  }, t.play = function(e, r) {
    return e != null && this.seek(e, r), this.reversed(!1).paused(!1);
  }, t.reverse = function(e, r) {
    return e != null && this.seek(e || this.totalDuration(), r), this.reversed(!0).paused(!1);
  }, t.pause = function(e, r) {
    return e != null && this.seek(e, r), this.paused(!0);
  }, t.resume = function() {
    return this.paused(!1);
  }, t.reversed = function(e) {
    return arguments.length ? (!!e !== this.reversed() && this.timeScale(-this._rts || (e ? -nt : 0)), this) : this._rts < 0;
  }, t.invalidate = function() {
    return this._initted = this._act = 0, this._zTime = -nt, this;
  }, t.isActive = function() {
    var e = this.parent || this._dp, r = this._start, n;
    return !!(!e || this._ts && this._initted && e.isActive() && (n = e.rawTime(!0)) >= r && n < this.endTime(!0) - nt);
  }, t.eventCallback = function(e, r, n) {
    var o = this.vars;
    return arguments.length > 1 ? (r ? (o[e] = r, n && (o[e + "Params"] = n), e === "onUpdate" && (this._onUpdate = r)) : delete o[e], this) : o[e];
  }, t.then = function(e) {
    var r = this, n = r._prom;
    return new Promise(function(o) {
      var a = _t(e) ? e : aa, l = function() {
        var c = r.then;
        r.then = null, n && n(), _t(a) && (a = a(r)) && (a.then || a === r) && (r.then = c), o(a), r.then = c;
      };
      r._initted && r.totalProgress() === 1 && r._ts >= 0 || !r._tTime && r._ts < 0 ? l() : r._prom = l;
    });
  }, t.kill = function() {
    Dr(this);
  }, s;
})();
ke(en.prototype, {
  _time: 0,
  _start: 0,
  _end: 0,
  _tTime: 0,
  _tDur: 0,
  _dirty: 0,
  _repeat: 0,
  _yoyo: !1,
  parent: null,
  _initted: !1,
  _rDelay: 0,
  _ts: 1,
  _dp: 0,
  ratio: 0,
  _zTime: -nt,
  _prom: 0,
  _ps: !1,
  _rts: 1
});
var oe = /* @__PURE__ */ (function(s) {
  Ko(t, s);
  function t(e, r) {
    var n;
    return e === void 0 && (e = {}), n = s.call(this, e) || this, n.labels = {}, n.smoothChildTiming = !!e.smoothChildTiming, n.autoRemoveChildren = !!e.autoRemoveChildren, n._sort = ae(e.sortChildren), ct && Ue(e.parent || ct, ei(n), r), e.reversed && n.reverse(), e.paused && n.paused(!0), e.scrollTrigger && ca(ei(n), e.scrollTrigger), n;
  }
  var i = t.prototype;
  return i.to = function(r, n, o) {
    return Yr(0, arguments, this), this;
  }, i.from = function(r, n, o) {
    return Yr(1, arguments, this), this;
  }, i.fromTo = function(r, n, o, a) {
    return Yr(2, arguments, this), this;
  }, i.set = function(r, n, o) {
    return n.duration = 0, n.parent = this, Ir(n).repeatDelay || (n.repeat = 0), n.immediateRender = !!n.immediateRender, new Tt(r, n, Pe(this, o), 1), this;
  }, i.call = function(r, n, o) {
    return Ue(this, Tt.delayedCall(0, r, n), o);
  }, i.staggerTo = function(r, n, o, a, l, u, c) {
    return o.duration = n, o.stagger = o.stagger || a, o.onComplete = u, o.onCompleteParams = c, o.parent = this, new Tt(r, o, Pe(this, l)), this;
  }, i.staggerFrom = function(r, n, o, a, l, u, c) {
    return o.runBackwards = 1, Ir(o).immediateRender = ae(o.immediateRender), this.staggerTo(r, n, o, a, l, u, c);
  }, i.staggerFromTo = function(r, n, o, a, l, u, c, d) {
    return a.startAt = o, Ir(a).immediateRender = ae(a.immediateRender), this.staggerTo(r, n, a, l, u, c, d);
  }, i.render = function(r, n, o) {
    var a = this._time, l = this._dirty ? this.totalDuration() : this._tDur, u = this._dur, c = r <= 0 ? 0 : ut(r), d = this._zTime < 0 != r < 0 && (this._initted || !u), h, f, _, p, g, b, w, T, v, S, P, x;
    if (this !== ct && c > l && r >= 0 && (c = l), c !== this._tTime || o || d) {
      if (a !== this._time && u && (c += this._time - a, r += this._time - a), h = c, v = this._start, T = this._ts, b = !T, d && (u || (a = this._zTime), (r || !n) && (this._zTime = r)), this._repeat) {
        if (P = this._yoyo, g = u + this._rDelay, this._repeat < -1 && r < 0)
          return this.totalTime(g * 100 + r, n, o);
        if (h = ut(c % g), c === l ? (p = this._repeat, h = u) : (S = ut(c / g), p = ~~S, p && p === S && (h = u, p--), h > u && (h = u)), S = yr(this._tTime, g), !a && this._tTime && S !== p && this._tTime - S * g - this._dur <= 0 && (S = p), P && p & 1 && (h = u - h, x = 1), p !== S && !this._lock) {
          var E = P && S & 1, C = E === (P && p & 1);
          if (p < S && (E = !E), a = E ? 0 : c % u ? u : c, this._lock = 1, this.render(a || (x ? 0 : ut(p * g)), n, !u)._lock = 0, this._tTime = c, !n && this.parent && xe(this, "onRepeat"), this.vars.repeatRefresh && !x && (this.invalidate()._lock = 1, S = p), a && a !== this._time || b !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
            return this;
          if (u = this._dur, l = this._tDur, C && (this._lock = 2, a = E ? u : -1e-4, this.render(a, !0), this.vars.repeatRefresh && !x && this.invalidate()), this._lock = 0, !this._ts && !b)
            return this;
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2 && (w = zl(this, ut(a), ut(h)), w && (c -= h - (h = w._start))), this._tTime = c, this._time = h, this._act = !!T, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = r, a = 0), !a && c && u && !n && !S && (xe(this, "onStart"), this._tTime !== c))
        return this;
      if (h >= a && r >= 0)
        for (f = this._first; f; ) {
          if (_ = f._next, (f._act || h >= f._start) && f._ts && w !== f) {
            if (f.parent !== this)
              return this.render(r, n, o);
            if (f.render(f._ts > 0 ? (h - f._start) * f._ts : (f._dirty ? f.totalDuration() : f._tDur) + (h - f._start) * f._ts, n, o), h !== this._time || !this._ts && !b) {
              w = 0, _ && (c += this._zTime = -nt);
              break;
            }
          }
          f = _;
        }
      else {
        f = this._last;
        for (var k = r < 0 ? r : h; f; ) {
          if (_ = f._prev, (f._act || k <= f._end) && f._ts && w !== f) {
            if (f.parent !== this)
              return this.render(r, n, o);
            if (f.render(f._ts > 0 ? (k - f._start) * f._ts : (f._dirty ? f.totalDuration() : f._tDur) + (k - f._start) * f._ts, n, o || Ft && Xs(f)), h !== this._time || !this._ts && !b) {
              w = 0, _ && (c += this._zTime = k ? -nt : nt);
              break;
            }
          }
          f = _;
        }
      }
      if (w && !n && (this.pause(), w.render(h >= a ? 0 : -nt)._zTime = h >= a ? 1 : -1, this._ts))
        return this._start = v, Un(this), this.render(r, n, o);
      this._onUpdate && !n && xe(this, "onUpdate", !0), (c === l && this._tTime >= this.totalDuration() || !c && a) && (v === this._start || Math.abs(T) !== Math.abs(this._ts)) && (this._lock || ((r || !u) && (c === l && this._ts > 0 || !c && this._ts < 0) && Ti(this, 1), !n && !(r < 0 && !a) && (c || a || !l) && (xe(this, c === l && r >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(c < l && this.timeScale() > 0) && this._prom())));
    }
    return this;
  }, i.add = function(r, n) {
    var o = this;
    if (oi(n) || (n = Pe(this, n, r)), !(r instanceof en)) {
      if ($t(r))
        return r.forEach(function(a) {
          return o.add(a, n);
        }), this;
      if (Rt(r))
        return this.addLabel(r, n);
      if (_t(r))
        r = Tt.delayedCall(0, r);
      else
        return this;
    }
    return this !== r ? Ue(this, r, n) : this;
  }, i.getChildren = function(r, n, o, a) {
    r === void 0 && (r = !0), n === void 0 && (n = !0), o === void 0 && (o = !0), a === void 0 && (a = -Me);
    for (var l = [], u = this._first; u; )
      u._start >= a && (u instanceof Tt ? n && l.push(u) : (o && l.push(u), r && l.push.apply(l, u.getChildren(!0, n, o)))), u = u._next;
    return l;
  }, i.getById = function(r) {
    for (var n = this.getChildren(1, 1, 1), o = n.length; o--; )
      if (n[o].vars.id === r)
        return n[o];
  }, i.remove = function(r) {
    return Rt(r) ? this.removeLabel(r) : _t(r) ? this.killTweensOf(r) : (r.parent === this && Vn(this, r), r === this._recent && (this._recent = this._last), Wi(this));
  }, i.totalTime = function(r, n) {
    return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = ut(ye.time - (this._ts > 0 ? r / this._ts : (this.totalDuration() - r) / -this._ts))), s.prototype.totalTime.call(this, r, n), this._forcing = 0, this) : this._tTime;
  }, i.addLabel = function(r, n) {
    return this.labels[r] = Pe(this, n), this;
  }, i.removeLabel = function(r) {
    return delete this.labels[r], this;
  }, i.addPause = function(r, n, o) {
    var a = Tt.delayedCall(0, n || jr, o);
    return a.data = "isPause", this._hasPause = 1, Ue(this, a, Pe(this, r));
  }, i.removePause = function(r) {
    var n = this._first;
    for (r = Pe(this, r); n; )
      n._start === r && n.data === "isPause" && Ti(n), n = n._next;
  }, i.killTweensOf = function(r, n, o) {
    for (var a = this.getTweensOf(r, o), l = a.length; l--; )
      gi !== a[l] && a[l].kill(r, n);
    return this;
  }, i.getTweensOf = function(r, n) {
    for (var o = [], a = De(r), l = this._first, u = oi(n), c; l; )
      l instanceof Tt ? El(l._targets, a) && (u ? (!gi || l._initted && l._ts) && l.globalTime(0) <= n && l.globalTime(l.totalDuration()) > n : !n || l.isActive()) && o.push(l) : (c = l.getTweensOf(a, n)).length && o.push.apply(o, c), l = l._next;
    return o;
  }, i.tweenTo = function(r, n) {
    n = n || {};
    var o = this, a = Pe(o, r), l = n, u = l.startAt, c = l.onStart, d = l.onStartParams, h = l.immediateRender, f, _ = Tt.to(o, ke({
      ease: n.ease || "none",
      lazy: !1,
      immediateRender: !1,
      time: a,
      overwrite: "auto",
      duration: n.duration || Math.abs((a - (u && "time" in u ? u.time : o._time)) / o.timeScale()) || nt,
      onStart: function() {
        if (o.pause(), !f) {
          var g = n.duration || Math.abs((a - (u && "time" in u ? u.time : o._time)) / o.timeScale());
          _._dur !== g && wr(_, g, 0, 1).render(_._time, !0, !0), f = 1;
        }
        c && c.apply(_, d || []);
      }
    }, n));
    return h ? _.render(0) : _;
  }, i.tweenFromTo = function(r, n, o) {
    return this.tweenTo(n, ke({
      startAt: {
        time: Pe(this, r)
      }
    }, o));
  }, i.recent = function() {
    return this._recent;
  }, i.nextLabel = function(r) {
    return r === void 0 && (r = this._time), fo(this, Pe(this, r));
  }, i.previousLabel = function(r) {
    return r === void 0 && (r = this._time), fo(this, Pe(this, r), 1);
  }, i.currentLabel = function(r) {
    return arguments.length ? this.seek(r, !0) : this.previousLabel(this._time + nt);
  }, i.shiftChildren = function(r, n, o) {
    o === void 0 && (o = 0);
    var a = this._first, l = this.labels, u;
    for (r = ut(r); a; )
      a._start >= o && (a._start += r, a._end += r), a = a._next;
    if (n)
      for (u in l)
        l[u] >= o && (l[u] += r);
    return Wi(this);
  }, i.invalidate = function(r) {
    var n = this._first;
    for (this._lock = 0; n; )
      n.invalidate(r), n = n._next;
    return s.prototype.invalidate.call(this, r);
  }, i.clear = function(r) {
    r === void 0 && (r = !0);
    for (var n = this._first, o; n; )
      o = n._next, this.remove(n), n = o;
    return this._dp && (this._time = this._tTime = this._pTime = 0), r && (this.labels = {}), Wi(this);
  }, i.totalDuration = function(r) {
    var n = 0, o = this, a = o._last, l = Me, u, c, d;
    if (arguments.length)
      return o.timeScale((o._repeat < 0 ? o.duration() : o.totalDuration()) / (o.reversed() ? -r : r));
    if (o._dirty) {
      for (d = o.parent; a; )
        u = a._prev, a._dirty && a.totalDuration(), c = a._start, c > l && o._sort && a._ts && !o._lock ? (o._lock = 1, Ue(o, a, c - a._delay, 1)._lock = 0) : l = c, c < 0 && a._ts && (n -= c, (!d && !o._dp || d && d.smoothChildTiming) && (o._start += ut(c / o._ts), o._time -= c, o._tTime -= c), o.shiftChildren(-c, !1, -1 / 0), l = 0), a._end > n && a._ts && (n = a._end), a = u;
      wr(o, o === ct && o._time > n ? o._time : n, 1, 1), o._dirty = 0;
    }
    return o._tDur;
  }, t.updateRoot = function(r) {
    if (ct._ts && (sa(ct, Nn(r, ct)), ra = ye.frame), ye.frame >= ao) {
      ao += Se.autoSleep || 120;
      var n = ct._first;
      if ((!n || !n._ts) && Se.autoSleep && ye._listeners.length < 2) {
        for (; n && !n._ts; )
          n = n._next;
        n || ye.sleep();
      }
    }
  }, t;
})(en);
ke(oe.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var jl = function(t, i, e, r, n, o, a) {
  var l = new ue(this._pt, t, i, 0, 1, Da, null, n), u = 0, c = 0, d, h, f, _, p, g, b, w;
  for (l.b = e, l.e = r, e += "", r += "", (b = ~r.indexOf("random(")) && (r = Jr(r)), o && (w = [e, r], o(w, t, i), e = w[0], r = w[1]), h = e.match(Kn) || []; d = Kn.exec(r); )
    _ = d[0], p = r.substring(u, d.index), f ? f = (f + 1) % 5 : p.substr(-5) === "rgba(" && (f = 1), _ !== h[c++] && (g = parseFloat(h[c - 1]) || 0, l._pt = {
      _next: l._pt,
      p: p || c === 1 ? p : ",",
      //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
      s: g,
      c: _.charAt(1) === "=" ? fr(g, _) - g : parseFloat(_) - g,
      m: f && f < 4 ? Math.round : 0
    }, u = Kn.lastIndex);
  return l.c = u < r.length ? r.substring(u, r.length) : "", l.fp = a, (Jo.test(r) || b) && (l.e = 0), this._pt = l, l;
}, Ws = function(t, i, e, r, n, o, a, l, u, c) {
  _t(r) && (r = r(n || 0, t, o));
  var d = t[i], h = e !== "get" ? e : _t(d) ? u ? t[i.indexOf("set") || !_t(t["get" + i.substr(3)]) ? i : "get" + i.substr(3)](u) : t[i]() : d, f = _t(d) ? u ? ru : Oa : Vs, _;
  if (Rt(r) && (~r.indexOf("random(") && (r = Jr(r)), r.charAt(1) === "=" && (_ = fr(h, r) + (Ut(h) || 0), (_ || _ === 0) && (r = _))), !c || h !== r || ms)
    return !isNaN(h * r) && r !== "" ? (_ = new ue(this._pt, t, i, +h || 0, r - (h || 0), typeof d == "boolean" ? su : Ma, 0, f), u && (_.fp = u), a && _.modifier(a, this, t), this._pt = _) : (!d && !(i in t) && Fs(i, r), jl.call(this, t, i, h, r, f, l || Se.stringFilter, u));
}, Jl = function(t, i, e, r, n) {
  if (_t(t) && (t = Br(t, n, i, e, r)), !Ke(t) || t.style && t.nodeType || $t(t) || Zo(t))
    return Rt(t) ? Br(t, n, i, e, r) : t;
  var o = {}, a;
  for (a in t)
    o[a] = Br(t[a], n, i, e, r);
  return o;
}, Ca = function(t, i, e, r, n, o) {
  var a, l, u, c;
  if (me[t] && (a = new me[t]()).init(n, a.rawVars ? i[t] : Jl(i[t], r, n, o, e), e, r, o) !== !1 && (e._pt = l = new ue(e._pt, n, t, 0, 1, a.render, a, 0, a.priority), e !== ur))
    for (u = e._ptLookup[e._targets.indexOf(n)], c = a._props.length; c--; )
      u[a._props[c]] = l;
  return a;
}, gi, ms, Hs = function s(t, i, e) {
  var r = t.vars, n = r.ease, o = r.startAt, a = r.immediateRender, l = r.lazy, u = r.onUpdate, c = r.runBackwards, d = r.yoyoEase, h = r.keyframes, f = r.autoRevert, _ = t._dur, p = t._startAt, g = t._targets, b = t.parent, w = b && b.data === "nested" ? b.vars.targets : g, T = t._overwrite === "auto" && !As, v = t.timeline, S = r.easeReverse || d, P, x, E, C, k, Y, M, G, F, K, U, A, Q;
  if (v && (!h || !n) && (n = "none"), t._ease = Hi(n, Qr.ease), t._rEase = S && (Hi(S) || t._ease), t._from = !v && !!r.runBackwards, t._from && (t.ratio = 1), !v || h && !r.stagger) {
    if (G = g[0] ? Xi(g[0]).harness : 0, A = G && r[G.prop], P = zn(r, Is), p && (p._zTime < 0 && p.progress(1), i < 0 && c && a && !f ? p.render(-1, !0) : p.revert(c && _ ? Tn : Cl), p._lazy = 0), o) {
      if (Ti(t._startAt = Tt.set(g, ke({
        data: "isStart",
        overwrite: !1,
        parent: b,
        immediateRender: !0,
        lazy: !p && ae(l),
        startAt: null,
        delay: 0,
        onUpdate: u && function() {
          return xe(t, "onUpdate");
        },
        stagger: 0
      }, o))), t._startAt._dp = 0, t._startAt._sat = t, i < 0 && (Ft || !a && !f) && t._startAt.revert(Tn), a && _ && i <= 0 && e <= 0) {
        i && (t._zTime = i);
        return;
      }
    } else if (c && _ && !p) {
      if (i && (a = !1), E = ke({
        overwrite: !1,
        data: "isFromStart",
        //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
        lazy: a && !p && ae(l),
        immediateRender: a,
        //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
        stagger: 0,
        parent: b
        //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
      }, P), A && (E[G.prop] = A), Ti(t._startAt = Tt.set(g, E)), t._startAt._dp = 0, t._startAt._sat = t, i < 0 && (Ft ? t._startAt.revert(Tn) : t._startAt.render(-1, !0)), t._zTime = i, !a)
        s(t._startAt, nt, nt);
      else if (!i)
        return;
    }
    for (t._pt = t._ptCache = 0, l = _ && ae(l) || l && !_, x = 0; x < g.length; x++) {
      if (k = g[x], M = k._gsap || Bs(g)[x]._gsap, t._ptLookup[x] = K = {}, fs[M.id] && xi.length && Ln(), U = w === g ? x : w.indexOf(k), G && (F = new G()).init(k, A || P, t, U, w) !== !1 && (t._pt = C = new ue(t._pt, k, F.name, 0, 1, F.render, F, 0, F.priority), F._props.forEach(function(et) {
        K[et] = C;
      }), F.priority && (Y = 1)), !G || A)
        for (E in P)
          me[E] && (F = Ca(E, P, t, U, k, w)) ? F.priority && (Y = 1) : K[E] = C = Ws.call(t, k, E, "get", P[E], U, w, 0, r.stringFilter);
      t._op && t._op[x] && t.kill(k, t._op[x]), T && t._pt && (gi = t, ct.killTweensOf(k, K, t.globalTime(i)), Q = !t.parent, gi = 0), t._pt && l && (fs[M.id] = 1);
    }
    Y && Ra(t), t._onInit && t._onInit(t);
  }
  t._onUpdate = u, t._initted = (!t._op || t._pt) && !Q, h && i <= 0 && v.render(Me, !0, !0);
}, tu = function(t, i, e, r, n, o, a, l) {
  var u = (t._pt && t._ptCache || (t._ptCache = {}))[i], c, d, h, f;
  if (!u)
    for (u = t._ptCache[i] = [], h = t._ptLookup, f = t._targets.length; f--; ) {
      if (c = h[f][i], c && c.d && c.d._pt)
        for (c = c.d._pt; c && c.p !== i && c.fp !== i; )
          c = c._next;
      if (!c)
        return ms = 1, t.vars[i] = "+=0", Hs(t, a), ms = 0, l ? Zr(i + " not eligible for reset. Try splitting into individual properties") : 1;
      u.push(c);
    }
  for (f = u.length; f--; )
    d = u[f], c = d._pt || d, c.s = (r || r === 0) && !n ? r : c.s + (r || 0) + o * c.c, c.c = e - c.s, d.e && (d.e = yt(e) + Ut(d.e)), d.b && (d.b = c.s + Ut(d.b));
}, eu = function(t, i) {
  var e = t[0] ? Xi(t[0]).harness : 0, r = e && e.aliases, n, o, a, l;
  if (!r)
    return i;
  n = vr({}, i);
  for (o in r)
    if (o in n)
      for (l = r[o].split(","), a = l.length; a--; )
        n[l[a]] = n[o];
  return n;
}, iu = function(t, i, e, r) {
  var n = i.ease || r || "power1.inOut", o, a;
  if ($t(i))
    a = e[t] || (e[t] = []), i.forEach(function(l, u) {
      return a.push({
        t: u / (i.length - 1) * 100,
        v: l,
        e: n
      });
    });
  else
    for (o in i)
      a = e[o] || (e[o] = []), o === "ease" || a.push({
        t: parseFloat(t),
        v: i[o],
        e: n
      });
}, Br = function(t, i, e, r, n) {
  return _t(t) ? t.call(i, e, r, n) : Rt(t) && ~t.indexOf("random(") ? Jr(t) : t;
}, Pa = Ys + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert", Ea = {};
le(Pa + ",id,stagger,delay,duration,paused,scrollTrigger", function(s) {
  return Ea[s] = 1;
});
var Tt = /* @__PURE__ */ (function(s) {
  Ko(t, s);
  function t(e, r, n, o) {
    var a;
    typeof r == "number" && (n.duration = r, r = n, n = null), a = s.call(this, o ? r : Ir(r)) || this;
    var l = a.vars, u = l.duration, c = l.delay, d = l.immediateRender, h = l.stagger, f = l.overwrite, _ = l.keyframes, p = l.defaults, g = l.scrollTrigger, b = r.parent || ct, w = ($t(e) || Zo(e) ? oi(e[0]) : "length" in r) ? [e] : De(e), T, v, S, P, x, E, C, k;
    if (a._targets = w.length ? Bs(w) : Zr("GSAP target " + e + " not found. https://gsap.com", !Se.nullTargetWarn) || [], a._ptLookup = [], a._overwrite = f, _ || h || fn(u) || fn(c)) {
      r = a.vars;
      var Y = r.easeReverse || r.yoyoEase;
      if (T = a.timeline = new oe({
        data: "nested",
        defaults: p || {},
        targets: b && b.data === "nested" ? b.vars.targets : w
      }), T.kill(), T.parent = T._dp = ei(a), T._start = 0, h || fn(u) || fn(c)) {
        if (P = w.length, C = h && pa(h), Ke(h))
          for (x in h)
            ~Pa.indexOf(x) && (k || (k = {}), k[x] = h[x]);
        for (v = 0; v < P; v++)
          S = zn(r, Ea), S.stagger = 0, Y && (S.easeReverse = Y), k && vr(S, k), E = w[v], S.duration = +Br(u, ei(a), v, E, w), S.delay = (+Br(c, ei(a), v, E, w) || 0) - a._delay, !h && P === 1 && S.delay && (a._delay = c = S.delay, a._start += c, S.delay = 0), T.to(E, S, C ? C(v, E, w) : 0), T._ease = $.none;
        T.duration() ? u = c = 0 : a.timeline = 0;
      } else if (_) {
        Ir(ke(T.vars.defaults, {
          ease: "none"
        })), T._ease = Hi(_.ease || r.ease || "none");
        var M = 0, G, F, K;
        if ($t(_))
          _.forEach(function(U) {
            return T.to(w, U, ">");
          }), T.duration();
        else {
          S = {};
          for (x in _)
            x === "ease" || x === "easeEach" || iu(x, _[x], S, _.easeEach);
          for (x in S)
            for (G = S[x].sort(function(U, A) {
              return U.t - A.t;
            }), M = 0, v = 0; v < G.length; v++)
              F = G[v], K = {
                ease: F.e,
                duration: (F.t - (v ? G[v - 1].t : 0)) / 100 * u
              }, K[x] = F.v, T.to(w, K, M), M += K.duration;
          T.duration() < u && T.to({}, {
            duration: u - T.duration()
          });
        }
      }
      u || a.duration(u = T.duration());
    } else
      a.timeline = 0;
    return f === !0 && !As && (gi = ei(a), ct.killTweensOf(w), gi = 0), Ue(b, ei(a), n), r.reversed && a.reverse(), r.paused && a.paused(!0), (d || !u && !_ && a._start === ut(b._time) && ae(d) && Rl(ei(a)) && b.data !== "nested") && (a._tTime = -nt, a.render(Math.max(0, -c) || 0)), g && ca(ei(a), g), a;
  }
  var i = t.prototype;
  return i.render = function(r, n, o) {
    var a = this._time, l = this._tDur, u = this._dur, c = r < 0, d = r > l - nt && !c ? l : r < nt ? 0 : r, h, f, _, p, g, b, w, T;
    if (!u)
      Ll(this, r, n, o);
    else if (d !== this._tTime || !r || o || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== c || this._lazy) {
      if (h = d, T = this.timeline, this._repeat) {
        if (p = u + this._rDelay, this._repeat < -1 && c)
          return this.totalTime(p * 100 + r, n, o);
        if (h = ut(d % p), d === l ? (_ = this._repeat, h = u) : (g = ut(d / p), _ = ~~g, _ && _ === g ? (h = u, _--) : h > u && (h = u)), b = this._yoyo && _ & 1, b && (h = u - h), g = yr(this._tTime, p), h === a && !o && this._initted && _ === g)
          return this._tTime = d, this;
        _ !== g && this.vars.repeatRefresh && !b && !this._lock && h !== p && this._initted && (this._lock = o = 1, this.render(ut(p * _), !0).invalidate()._lock = 0);
      }
      if (!this._initted) {
        if (fa(this, c ? r : h, o, n, d))
          return this._tTime = 0, this;
        if (a !== this._time && !(o && this.vars.repeatRefresh && _ !== g))
          return this;
        if (u !== this._dur)
          return this.render(r, n, o);
      }
      if (this._rEase) {
        var v = h < a;
        if (v !== this._inv) {
          var S = v ? a : u - a;
          this._inv = v, this._from && (this.ratio = 1 - this.ratio), this._invRatio = this.ratio, this._invTime = a, this._invRecip = S ? (v ? -1 : 1) / S : 0, this._invScale = v ? -this.ratio : 1 - this.ratio, this._invEase = v ? this._rEase : this._ease;
        }
        this.ratio = w = this._invRatio + this._invScale * this._invEase((h - this._invTime) * this._invRecip);
      } else
        this.ratio = w = this._ease(h / u);
      if (this._from && (this.ratio = w = 1 - w), this._tTime = d, this._time = h, !this._act && this._ts && (this._act = 1, this._lazy = 0), !a && d && !n && !g && (xe(this, "onStart"), this._tTime !== d))
        return this;
      for (f = this._pt; f; )
        f.r(w, f.d), f = f._next;
      T && T.render(r < 0 ? r : T._dur * T._ease(h / this._dur), n, o) || this._startAt && (this._zTime = r), this._onUpdate && !n && (c && hs(this, r, n, o), xe(this, "onUpdate")), this._repeat && _ !== g && this.vars.onRepeat && !n && this.parent && xe(this, "onRepeat"), (d === this._tDur || !d) && this._tTime === d && (c && !this._onUpdate && hs(this, r, !0, !0), (r || !u) && (d === this._tDur && this._ts > 0 || !d && this._ts < 0) && Ti(this, 1), !n && !(c && !a) && (d || a || b) && (xe(this, d === l ? "onComplete" : "onReverseComplete", !0), this._prom && !(d < l && this.timeScale() > 0) && this._prom()));
    }
    return this;
  }, i.targets = function() {
    return this._targets;
  }, i.invalidate = function(r) {
    return (!r || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(r), s.prototype.invalidate.call(this, r);
  }, i.resetTo = function(r, n, o, a, l) {
    tn || ye.wake(), this._ts || this.play();
    var u = Math.min(this._dur, (this._dp._time - this._start) * this._ts), c;
    return this._initted || Hs(this, u), c = this._ease(u / this._dur), tu(this, r, n, o, a, c, u, l) ? this.resetTo(r, n, o, a, 1) : (qn(this, 0), this.parent || la(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0));
  }, i.kill = function(r, n) {
    if (n === void 0 && (n = "all"), !r && (!n || n === "all"))
      return this._lazy = this._pt = 0, this.parent ? Dr(this) : this.scrollTrigger && this.scrollTrigger.kill(!!Ft), this;
    if (this.timeline) {
      var o = this.timeline.totalDuration();
      return this.timeline.killTweensOf(r, n, gi && gi.vars.overwrite !== !0)._first || Dr(this), this.parent && o !== this.timeline.totalDuration() && wr(this, this._dur * this.timeline._tDur / o, 0, 1), this;
    }
    var a = this._targets, l = r ? De(r) : a, u = this._ptLookup, c = this._pt, d, h, f, _, p, g, b;
    if ((!n || n === "all") && Ml(a, l))
      return n === "all" && (this._pt = 0), Dr(this);
    for (d = this._op = this._op || [], n !== "all" && (Rt(n) && (p = {}, le(n, function(w) {
      return p[w] = 1;
    }), n = p), n = eu(a, n)), b = a.length; b--; )
      if (~l.indexOf(a[b])) {
        h = u[b], n === "all" ? (d[b] = n, _ = h, f = {}) : (f = d[b] = d[b] || {}, _ = n);
        for (p in _)
          g = h && h[p], g && ((!("kill" in g.d) || g.d.kill(p) === !0) && Vn(this, g, "_pt"), delete h[p]), f !== "all" && (f[p] = 1);
      }
    return this._initted && !this._pt && c && Dr(this), this;
  }, t.to = function(r, n) {
    return new t(r, n, arguments[2]);
  }, t.from = function(r, n) {
    return Yr(1, arguments);
  }, t.delayedCall = function(r, n, o, a) {
    return new t(n, 0, {
      immediateRender: !1,
      lazy: !1,
      overwrite: !1,
      delay: r,
      onComplete: n,
      onReverseComplete: n,
      onCompleteParams: o,
      onReverseCompleteParams: o,
      callbackScope: a
    });
  }, t.fromTo = function(r, n, o) {
    return Yr(2, arguments);
  }, t.set = function(r, n) {
    return n.duration = 0, n.repeatDelay || (n.repeat = 0), new t(r, n);
  }, t.killTweensOf = function(r, n, o) {
    return ct.killTweensOf(r, n, o);
  }, t;
})(en);
ke(Tt.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
});
le("staggerTo,staggerFrom,staggerFromTo", function(s) {
  Tt[s] = function() {
    var t = new oe(), i = ps.call(arguments, 0);
    return i.splice(s === "staggerFromTo" ? 5 : 4, 0, 0), t[s].apply(t, i);
  };
});
var Vs = function(t, i, e) {
  return t[i] = e;
}, Oa = function(t, i, e) {
  return t[i](e);
}, ru = function(t, i, e, r) {
  return t[i](r.fp, e);
}, nu = function(t, i, e) {
  return t.setAttribute(i, e);
}, Us = function(t, i) {
  return _t(t[i]) ? Oa : Ls(t[i]) && t.setAttribute ? nu : Vs;
}, Ma = function(t, i) {
  return i.set(i.t, i.p, Math.round((i.s + i.c * t) * 1e6) / 1e6, i);
}, su = function(t, i) {
  return i.set(i.t, i.p, !!(i.s + i.c * t), i);
}, Da = function(t, i) {
  var e = i._pt, r = "";
  if (!t && i.b)
    r = i.b;
  else if (t === 1 && i.e)
    r = i.e;
  else {
    for (; e; )
      r = e.p + (e.m ? e.m(e.s + e.c * t) : Math.round((e.s + e.c * t) * 1e4) / 1e4) + r, e = e._next;
    r += i.c;
  }
  i.set(i.t, i.p, r, i);
}, qs = function(t, i) {
  for (var e = i._pt; e; )
    e.r(t, e.d), e = e._next;
}, ou = function(t, i, e, r) {
  for (var n = this._pt, o; n; )
    o = n._next, n.p === r && n.modifier(t, i, e), n = o;
}, au = function(t) {
  for (var i = this._pt, e, r; i; )
    r = i._next, i.p === t && !i.op || i.op === t ? Vn(this, i, "_pt") : i.dep || (e = 1), i = r;
  return !e;
}, lu = function(t, i, e, r) {
  r.mSet(t, i, r.m.call(r.tween, e, r.mt), r);
}, Ra = function(t) {
  for (var i = t._pt, e, r, n, o; i; ) {
    for (e = i._next, r = n; r && r.pr > i.pr; )
      r = r._next;
    (i._prev = r ? r._prev : o) ? i._prev._next = i : n = i, (i._next = r) ? r._prev = i : o = i, i = e;
  }
  t._pt = n;
}, ue = /* @__PURE__ */ (function() {
  function s(i, e, r, n, o, a, l, u, c) {
    this.t = e, this.s = n, this.c = o, this.p = r, this.r = a || Ma, this.d = l || this, this.set = u || Vs, this.pr = c || 0, this._next = i, i && (i._prev = this);
  }
  var t = s.prototype;
  return t.modifier = function(e, r, n) {
    this.mSet = this.mSet || this.set, this.set = lu, this.m = e, this.mt = n, this.tween = r;
  }, s;
})();
le(Ys + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse", function(s) {
  return Is[s] = 1;
});
Te.TweenMax = Te.TweenLite = Tt;
Te.TimelineLite = Te.TimelineMax = oe;
ct = new oe({
  sortChildren: !1,
  defaults: Qr,
  autoRemoveChildren: !0,
  id: "root",
  smoothChildTiming: !0
});
Se.stringFilter = Sa;
var Vi = [], Cn = {}, uu = [], po = 0, cu = 0, ts = function(t) {
  return (Cn[t] || uu).map(function(i) {
    return i();
  });
}, vs = function() {
  var t = Date.now(), i = [];
  t - po > 2 && (ts("matchMediaInit"), Vi.forEach(function(e) {
    var r = e.queries, n = e.conditions, o, a, l, u;
    for (a in r)
      o = He.matchMedia(r[a]).matches, o && (l = 1), o !== n[a] && (n[a] = o, u = 1);
    u && (e.revert(), l && i.push(e));
  }), ts("matchMediaRevert"), i.forEach(function(e) {
    return e.onMatch(e, function(r) {
      return e.add(null, r);
    });
  }), po = t, ts("matchMedia"));
}, Aa = /* @__PURE__ */ (function() {
  function s(i, e) {
    this.selector = e && _s(e), this.data = [], this._r = [], this.isReverted = !1, this.id = cu++, i && this.add(i);
  }
  var t = s.prototype;
  return t.add = function(e, r, n) {
    _t(e) && (n = r, r = e, e = _t);
    var o = this, a = function() {
      var u = at, c = o.selector, d;
      return u && u !== o && u.data.push(o), n && (o.selector = _s(n)), at = o, d = r.apply(o, arguments), _t(d) && o._r.push(d), at = u, o.selector = c, o.isReverted = !1, d;
    };
    return o.last = a, e === _t ? a(o, function(l) {
      return o.add(null, l);
    }) : e ? o[e] = a : a;
  }, t.ignore = function(e) {
    var r = at;
    at = null, e(this), at = r;
  }, t.getTweens = function() {
    var e = [];
    return this.data.forEach(function(r) {
      return r instanceof s ? e.push.apply(e, r.getTweens()) : r instanceof Tt && !(r.parent && r.parent.data === "nested") && e.push(r);
    }), e;
  }, t.clear = function() {
    this._r.length = this.data.length = 0;
  }, t.kill = function(e, r) {
    var n = this;
    if (e ? (function() {
      for (var a = n.getTweens(), l = n.data.length, u; l--; )
        u = n.data[l], u.data === "isFlip" && (u.revert(), u.getChildren(!0, !0, !1).forEach(function(c) {
          return a.splice(a.indexOf(c), 1);
        }));
      for (a.map(function(c) {
        return {
          g: c._dur || c._delay || c._sat && !c._sat.vars.immediateRender ? c.globalTime(0) : -1 / 0,
          t: c
        };
      }).sort(function(c, d) {
        return d.g - c.g || -1 / 0;
      }).forEach(function(c) {
        return c.t.revert(e);
      }), l = n.data.length; l--; )
        u = n.data[l], u instanceof oe ? u.data !== "nested" && (u.scrollTrigger && u.scrollTrigger.revert(), u.kill()) : !(u instanceof Tt) && u.revert && u.revert(e);
      n._r.forEach(function(c) {
        return c(e, n);
      }), n.isReverted = !0;
    })() : this.data.forEach(function(a) {
      return a.kill && a.kill();
    }), this.clear(), r)
      for (var o = Vi.length; o--; )
        Vi[o].id === this.id && Vi.splice(o, 1);
  }, t.revert = function(e) {
    this.kill(e || {});
  }, s;
})(), fu = /* @__PURE__ */ (function() {
  function s(i) {
    this.contexts = [], this.scope = i, at && at.data.push(this);
  }
  var t = s.prototype;
  return t.add = function(e, r, n) {
    Ke(e) || (e = {
      matches: e
    });
    var o = new Aa(0, n || this.scope), a = o.conditions = {}, l, u, c;
    at && !o.selector && (o.selector = at.selector), this.contexts.push(o), r = o.add("onMatch", r), o.queries = e;
    for (u in e)
      u === "all" ? c = 1 : (l = He.matchMedia(e[u]), l && (Vi.indexOf(o) < 0 && Vi.push(o), (a[u] = l.matches) && (c = 1), l.addListener ? l.addListener(vs) : l.addEventListener("change", vs)));
    return c && r(o, function(d) {
      return o.add(null, d);
    }), this;
  }, t.revert = function(e) {
    this.kill(e || {});
  }, t.kill = function(e) {
    this.contexts.forEach(function(r) {
      return r.kill(e, !0);
    });
  }, s;
})(), Fn = {
  registerPlugin: function() {
    for (var t = arguments.length, i = new Array(t), e = 0; e < t; e++)
      i[e] = arguments[e];
    i.forEach(function(r) {
      return wa(r);
    });
  },
  timeline: function(t) {
    return new oe(t);
  },
  getTweensOf: function(t, i) {
    return ct.getTweensOf(t, i);
  },
  getProperty: function(t, i, e, r) {
    Rt(t) && (t = De(t)[0]);
    var n = Xi(t || {}).get, o = e ? aa : oa;
    return e === "native" && (e = ""), t && (i ? o((me[i] && me[i].get || n)(t, i, e, r)) : function(a, l, u) {
      return o((me[a] && me[a].get || n)(t, a, l, u));
    });
  },
  quickSetter: function(t, i, e) {
    if (t = De(t), t.length > 1) {
      var r = t.map(function(c) {
        return fe.quickSetter(c, i, e);
      }), n = r.length;
      return function(c) {
        for (var d = n; d--; )
          r[d](c);
      };
    }
    t = t[0] || {};
    var o = me[i], a = Xi(t), l = a.harness && (a.harness.aliases || {})[i] || i, u = o ? function(c) {
      var d = new o();
      ur._pt = 0, d.init(t, e ? c + e : c, ur, 0, [t]), d.render(1, d), ur._pt && qs(1, ur);
    } : a.set(t, l);
    return o ? u : function(c) {
      return u(t, l, e ? c + e : c, a, 1);
    };
  },
  quickTo: function(t, i, e) {
    var r, n = fe.to(t, ke((r = {}, r[i] = "+=0.1", r.paused = !0, r.stagger = 0, r), e || {})), o = function(l, u, c) {
      return n.resetTo(i, l, u, c);
    };
    return o.tween = n, o;
  },
  isTweening: function(t) {
    return ct.getTweensOf(t, !0).length > 0;
  },
  defaults: function(t) {
    return t && t.ease && (t.ease = Hi(t.ease, Qr.ease)), lo(Qr, t || {});
  },
  config: function(t) {
    return lo(Se, t || {});
  },
  registerEffect: function(t) {
    var i = t.name, e = t.effect, r = t.plugins, n = t.defaults, o = t.extendTimeline;
    (r || "").split(",").forEach(function(a) {
      return a && !me[a] && !Te[a] && Zr(i + " effect requires " + a + " plugin.");
    }), Qn[i] = function(a, l, u) {
      return e(De(a), ke(l || {}, n), u);
    }, o && (oe.prototype[i] = function(a, l, u) {
      return this.add(Qn[i](a, Ke(l) ? l : (u = l) && {}, this), u);
    });
  },
  registerEase: function(t, i) {
    $[t] = Hi(i);
  },
  parseEase: function(t, i) {
    return arguments.length ? Hi(t, i) : $;
  },
  getById: function(t) {
    return ct.getById(t);
  },
  exportRoot: function(t, i) {
    t === void 0 && (t = {});
    var e = new oe(t), r, n;
    for (e.smoothChildTiming = ae(t.smoothChildTiming), ct.remove(e), e._dp = 0, e._time = e._tTime = ct._time, r = ct._first; r; )
      n = r._next, (i || !(!r._dur && r instanceof Tt && r.vars.onComplete === r._targets[0])) && Ue(e, r, r._start - r._delay), r = n;
    return Ue(ct, e, 0), e;
  },
  context: function(t, i) {
    return t ? new Aa(t, i) : at;
  },
  matchMedia: function(t) {
    return new fu(t);
  },
  matchMediaRefresh: function() {
    return Vi.forEach(function(t) {
      var i = t.conditions, e, r;
      for (r in i)
        i[r] && (i[r] = !1, e = 1);
      e && t.revert();
    }) || vs();
  },
  addEventListener: function(t, i) {
    var e = Cn[t] || (Cn[t] = []);
    ~e.indexOf(i) || e.push(i);
  },
  removeEventListener: function(t, i) {
    var e = Cn[t], r = e && e.indexOf(i);
    r >= 0 && e.splice(r, 1);
  },
  utils: {
    wrap: Wl,
    wrapYoyo: Hl,
    distribute: pa,
    random: ga,
    snap: _a,
    normalize: Xl,
    getUnit: Ut,
    clamp: Fl,
    splitColor: xa,
    toArray: De,
    selector: _s,
    mapRange: va,
    pipe: Yl,
    unitize: Bl,
    interpolate: Vl,
    shuffle: da
  },
  install: ea,
  effects: Qn,
  ticker: ye,
  updateRoot: oe.updateRoot,
  plugins: me,
  globalTimeline: ct,
  core: {
    PropTween: ue,
    globals: ia,
    Tween: Tt,
    Timeline: oe,
    Animation: en,
    getCache: Xi,
    _removeLinkedListItem: Vn,
    reverting: function() {
      return Ft;
    },
    context: function(t) {
      return t && at && (at.data.push(t), t._ctx = at), at;
    },
    suppressOverwrites: function(t) {
      return As = t;
    }
  }
};
le("to,from,fromTo,delayedCall,set,killTweensOf", function(s) {
  return Fn[s] = Tt[s];
});
ye.add(oe.updateRoot);
ur = Fn.to({}, {
  duration: 0
});
var hu = function(t, i) {
  for (var e = t._pt; e && e.p !== i && e.op !== i && e.fp !== i; )
    e = e._next;
  return e;
}, du = function(t, i) {
  var e = t._targets, r, n, o;
  for (r in i)
    for (n = e.length; n--; )
      o = t._ptLookup[n][r], o && (o = o.d) && (o._pt && (o = hu(o, r)), o && o.modifier && o.modifier(i[r], t, e[n], r));
}, es = function(t, i) {
  return {
    name: t,
    headless: 1,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function(r, n, o) {
      o._onInit = function(a) {
        var l, u;
        if (Rt(n) && (l = {}, le(n, function(c) {
          return l[c] = 1;
        }), n = l), i) {
          l = {};
          for (u in n)
            l[u] = i(n[u]);
          n = l;
        }
        du(a, n);
      };
    }
  };
}, fe = Fn.registerPlugin({
  name: "attr",
  init: function(t, i, e, r, n) {
    var o, a, l;
    this.tween = e;
    for (o in i)
      l = t.getAttribute(o) || "", a = this.add(t, "setAttribute", (l || 0) + "", i[o], r, n, 0, 0, o), a.op = o, a.b = l, this._props.push(o);
  },
  render: function(t, i) {
    for (var e = i._pt; e; )
      Ft ? e.set(e.t, e.p, e.b, e) : e.r(t, e.d), e = e._next;
  }
}, {
  name: "endArray",
  headless: 1,
  init: function(t, i) {
    for (var e = i.length; e--; )
      this.add(t, e, t[e] || 0, i[e], 0, 0, 0, 0, 0, 1);
  }
}, es("roundProps", gs), es("modifiers"), es("snap", _a)) || Fn;
Tt.version = oe.version = fe.version = "3.15.0";
ta = 1;
zs() && xr();
$.Power0;
$.Power1;
$.Power2;
$.Power3;
$.Power4;
$.Linear;
$.Quad;
$.Cubic;
$.Quart;
$.Quint;
$.Strong;
$.Elastic;
$.Back;
$.SteppedEase;
$.Bounce;
$.Sine;
$.Expo;
$.Circ;
var _o, mi, hr, $s, Yi, go, Gs, pu = function() {
  return typeof window < "u";
}, ai = {}, Ni = 180 / Math.PI, dr = Math.PI / 180, ir = Math.atan2, mo = 1e8, Ks = /([A-Z])/g, _u = /(left|right|width|margin|padding|x)/i, gu = /[\s,\(]\S/, qe = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
}, ys = function(t, i) {
  return i.set(i.t, i.p, Math.round((i.s + i.c * t) * 1e4) / 1e4 + i.u, i);
}, mu = function(t, i) {
  return i.set(i.t, i.p, t === 1 ? i.e : Math.round((i.s + i.c * t) * 1e4) / 1e4 + i.u, i);
}, vu = function(t, i) {
  return i.set(i.t, i.p, t ? Math.round((i.s + i.c * t) * 1e4) / 1e4 + i.u : i.b, i);
}, yu = function(t, i) {
  return i.set(i.t, i.p, t === 1 ? i.e : t ? Math.round((i.s + i.c * t) * 1e4) / 1e4 + i.u : i.b, i);
}, wu = function(t, i) {
  var e = i.s + i.c * t;
  i.set(i.t, i.p, ~~(e + (e < 0 ? -0.5 : 0.5)) + i.u, i);
}, La = function(t, i) {
  return i.set(i.t, i.p, t ? i.e : i.b, i);
}, za = function(t, i) {
  return i.set(i.t, i.p, t !== 1 ? i.b : i.e, i);
}, xu = function(t, i, e) {
  return t.style[i] = e;
}, bu = function(t, i, e) {
  return t.style.setProperty(i, e);
}, Su = function(t, i, e) {
  return t._gsap[i] = e;
}, Tu = function(t, i, e) {
  return t._gsap.scaleX = t._gsap.scaleY = e;
}, ku = function(t, i, e, r, n) {
  var o = t._gsap;
  o.scaleX = o.scaleY = e, o.renderTransform(n, o);
}, Cu = function(t, i, e, r, n) {
  var o = t._gsap;
  o[i] = e, o.renderTransform(n, o);
}, ft = "transform", ce = ft + "Origin", Pu = function s(t, i) {
  var e = this, r = this.target, n = r.style, o = r._gsap;
  if (t in ai && n) {
    if (this.tfm = this.tfm || {}, t !== "transform")
      t = qe[t] || t, ~t.indexOf(",") ? t.split(",").forEach(function(a) {
        return e.tfm[a] = ii(r, a);
      }) : this.tfm[t] = o.x ? o[t] : ii(r, t), t === ce && (this.tfm.zOrigin = o.zOrigin);
    else
      return qe.transform.split(",").forEach(function(a) {
        return s.call(e, a, i);
      });
    if (this.props.indexOf(ft) >= 0)
      return;
    o.svg && (this.svgo = r.getAttribute("data-svg-origin"), this.props.push(ce, i, "")), t = ft;
  }
  (n || i) && this.props.push(t, i, n[t]);
}, Na = function(t) {
  t.translate && (t.removeProperty("translate"), t.removeProperty("scale"), t.removeProperty("rotate"));
}, Eu = function() {
  var t = this.props, i = this.target, e = i.style, r = i._gsap, n, o;
  for (n = 0; n < t.length; n += 3)
    t[n + 1] ? t[n + 1] === 2 ? i[t[n]](t[n + 2]) : i[t[n]] = t[n + 2] : t[n + 2] ? e[t[n]] = t[n + 2] : e.removeProperty(t[n].substr(0, 2) === "--" ? t[n] : t[n].replace(Ks, "-$1").toLowerCase());
  if (this.tfm) {
    for (o in this.tfm)
      r[o] = this.tfm[o];
    r.svg && (r.renderTransform(), i.setAttribute("data-svg-origin", this.svgo || "")), n = Gs(), (!n || !n.isStart) && !e[ft] && (Na(e), r.zOrigin && e[ce] && (e[ce] += " " + r.zOrigin + "px", r.zOrigin = 0, r.renderTransform()), r.uncache = 1);
  }
}, Fa = function(t, i) {
  var e = {
    target: t,
    props: [],
    revert: Eu,
    save: Pu
  };
  return t._gsap || fe.core.getCache(t), i && t.style && t.nodeType && i.split(",").forEach(function(r) {
    return e.save(r);
  }), e;
}, Ia, ws = function(t, i) {
  var e = mi.createElementNS ? mi.createElementNS((i || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : mi.createElement(t);
  return e && e.style ? e : mi.createElement(t);
}, be = function s(t, i, e) {
  var r = getComputedStyle(t);
  return r[i] || r.getPropertyValue(i.replace(Ks, "-$1").toLowerCase()) || r.getPropertyValue(i) || !e && s(t, br(i) || i, 1) || "";
}, vo = "O,Moz,ms,Ms,Webkit".split(","), br = function(t, i, e) {
  var r = i || Yi, n = r.style, o = 5;
  if (t in n && !e)
    return t;
  for (t = t.charAt(0).toUpperCase() + t.substr(1); o-- && !(vo[o] + t in n); )
    ;
  return o < 0 ? null : (o === 3 ? "ms" : o >= 0 ? vo[o] : "") + t;
}, xs = function() {
  pu() && window.document && (_o = window, mi = _o.document, hr = mi.documentElement, Yi = ws("div") || {
    style: {}
  }, ws("div"), ft = br(ft), ce = ft + "Origin", Yi.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", Ia = !!br("perspective"), Gs = fe.core.reverting, $s = 1);
}, yo = function(t) {
  var i = t.ownerSVGElement, e = ws("svg", i && i.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), r = t.cloneNode(!0), n;
  r.style.display = "block", e.appendChild(r), hr.appendChild(e);
  try {
    n = r.getBBox();
  } catch {
  }
  return e.removeChild(r), hr.removeChild(e), n;
}, wo = function(t, i) {
  for (var e = i.length; e--; )
    if (t.hasAttribute(i[e]))
      return t.getAttribute(i[e]);
}, Ya = function(t) {
  var i, e;
  try {
    i = t.getBBox();
  } catch {
    i = yo(t), e = 1;
  }
  return i && (i.width || i.height) || e || (i = yo(t)), i && !i.width && !i.x && !i.y ? {
    x: +wo(t, ["x", "cx", "x1"]) || 0,
    y: +wo(t, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : i;
}, Ba = function(t) {
  return !!(t.getCTM && (!t.parentNode || t.ownerSVGElement) && Ya(t));
}, ki = function(t, i) {
  if (i) {
    var e = t.style, r;
    i in ai && i !== ce && (i = ft), e.removeProperty ? (r = i.substr(0, 2), (r === "ms" || i.substr(0, 6) === "webkit") && (i = "-" + i), e.removeProperty(r === "--" ? i : i.replace(Ks, "-$1").toLowerCase())) : e.removeAttribute(i);
  }
}, vi = function(t, i, e, r, n, o) {
  var a = new ue(t._pt, i, e, 0, 1, o ? za : La);
  return t._pt = a, a.b = r, a.e = n, t._props.push(e), a;
}, xo = {
  deg: 1,
  rad: 1,
  turn: 1
}, Ou = {
  grid: 1,
  flex: 1
}, Ci = function s(t, i, e, r) {
  var n = parseFloat(e) || 0, o = (e + "").trim().substr((n + "").length) || "px", a = Yi.style, l = _u.test(i), u = t.tagName.toLowerCase() === "svg", c = (u ? "client" : "offset") + (l ? "Width" : "Height"), d = 100, h = r === "px", f = r === "%", _, p, g, b;
  if (r === o || !n || xo[r] || xo[o])
    return n;
  if (o !== "px" && !h && (n = s(t, i, e, "px")), b = t.getCTM && Ba(t), (f || o === "%") && (ai[i] || ~i.indexOf("adius")))
    return _ = b ? t.getBBox()[l ? "width" : "height"] : t[c], yt(f ? n / _ * d : n / 100 * _);
  if (a[l ? "width" : "height"] = d + (h ? o : r), p = r !== "rem" && ~i.indexOf("adius") || r === "em" && t.appendChild && !u ? t : t.parentNode, b && (p = (t.ownerSVGElement || {}).parentNode), (!p || p === mi || !p.appendChild) && (p = mi.body), g = p._gsap, g && f && g.width && l && g.time === ye.time && !g.uncache)
    return yt(n / g.width * d);
  if (f && (i === "height" || i === "width")) {
    var w = t.style[i];
    t.style[i] = d + r, _ = t[c], w ? t.style[i] = w : ki(t, i);
  } else
    (f || o === "%") && !Ou[be(p, "display")] && (a.position = be(t, "position")), p === t && (a.position = "static"), p.appendChild(Yi), _ = Yi[c], p.removeChild(Yi), a.position = "absolute";
  return l && f && (g = Xi(p), g.time = ye.time, g.width = p[c]), yt(h ? _ * n / d : _ && n ? d / _ * n : 0);
}, ii = function(t, i, e, r) {
  var n;
  return $s || xs(), i in qe && i !== "transform" && (i = qe[i], ~i.indexOf(",") && (i = i.split(",")[0])), ai[i] && i !== "transform" ? (n = nn(t, r), n = i !== "transformOrigin" ? n[i] : n.svg ? n.origin : Yn(be(t, ce)) + " " + n.zOrigin + "px") : (n = t.style[i], (!n || n === "auto" || r || ~(n + "").indexOf("calc(")) && (n = In[i] && In[i](t, i, e) || be(t, i) || na(t, i) || (i === "opacity" ? 1 : 0))), e && !~(n + "").trim().indexOf(" ") ? Ci(t, i, n, e) + e : n;
}, Mu = function(t, i, e, r) {
  if (!e || e === "none") {
    var n = br(i, t, 1), o = n && be(t, n, 1);
    o && o !== e ? (i = n, e = o) : i === "borderColor" && (e = be(t, "borderTopColor"));
  }
  var a = new ue(this._pt, t.style, i, 0, 1, Da), l = 0, u = 0, c, d, h, f, _, p, g, b, w, T, v, S;
  if (a.b = e, a.e = r, e += "", r += "", r.substring(0, 6) === "var(--" && (r = be(t, r.substring(4, r.indexOf(")")))), r === "auto" && (p = t.style[i], t.style[i] = r, r = be(t, i) || r, p ? t.style[i] = p : ki(t, i)), c = [e, r], Sa(c), e = c[0], r = c[1], h = e.match(lr) || [], S = r.match(lr) || [], S.length) {
    for (; d = lr.exec(r); )
      g = d[0], w = r.substring(l, d.index), _ ? _ = (_ + 1) % 5 : (w.substr(-5) === "rgba(" || w.substr(-5) === "hsla(") && (_ = 1), g !== (p = h[u++] || "") && (f = parseFloat(p) || 0, v = p.substr((f + "").length), g.charAt(1) === "=" && (g = fr(f, g) + v), b = parseFloat(g), T = g.substr((b + "").length), l = lr.lastIndex - T.length, T || (T = T || Se.units[i] || v, l === r.length && (r += T, a.e += T)), v !== T && (f = Ci(t, i, p, T) || 0), a._pt = {
        _next: a._pt,
        p: w || u === 1 ? w : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: f,
        c: b - f,
        m: _ && _ < 4 || i === "zIndex" ? Math.round : 0
      });
    a.c = l < r.length ? r.substring(l, r.length) : "";
  } else
    a.r = i === "display" && r === "none" ? za : La;
  return Jo.test(r) && (a.e = 0), this._pt = a, a;
}, bo = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
}, Du = function(t) {
  var i = t.split(" "), e = i[0], r = i[1] || "50%";
  return (e === "top" || e === "bottom" || r === "left" || r === "right") && (t = e, e = r, r = t), i[0] = bo[e] || e, i[1] = bo[r] || r, i.join(" ");
}, Ru = function(t, i) {
  if (i.tween && i.tween._time === i.tween._dur) {
    var e = i.t, r = e.style, n = i.u, o = e._gsap, a, l, u;
    if (n === "all" || n === !0)
      r.cssText = "", l = 1;
    else
      for (n = n.split(","), u = n.length; --u > -1; )
        a = n[u], ai[a] && (l = 1, a = a === "transformOrigin" ? ce : ft), ki(e, a);
    l && (ki(e, ft), o && (o.svg && e.removeAttribute("transform"), r.scale = r.rotate = r.translate = "none", nn(e, 1), o.uncache = 1, Na(r)));
  }
}, In = {
  clearProps: function(t, i, e, r, n) {
    if (n.data !== "isFromStart") {
      var o = t._pt = new ue(t._pt, i, e, 0, 0, Ru);
      return o.u = r, o.pr = -10, o.tween = n, t._props.push(e), 1;
    }
  }
  /* className feature (about 0.4kb gzipped).
  , className(plugin, target, property, endValue, tween) {
  	let _renderClassName = (ratio, data) => {
  			data.css.render(ratio, data.css);
  			if (!ratio || ratio === 1) {
  				let inline = data.rmv,
  					target = data.t,
  					p;
  				target.setAttribute("class", ratio ? data.e : data.b);
  				for (p in inline) {
  					_removeProperty(target, p);
  				}
  			}
  		},
  		_getAllStyles = (target) => {
  			let styles = {},
  				computed = getComputedStyle(target),
  				p;
  			for (p in computed) {
  				if (isNaN(p) && p !== "cssText" && p !== "length") {
  					styles[p] = computed[p];
  				}
  			}
  			_setDefaults(styles, _parseTransform(target, 1));
  			return styles;
  		},
  		startClassList = target.getAttribute("class"),
  		style = target.style,
  		cssText = style.cssText,
  		cache = target._gsap,
  		classPT = cache.classPT,
  		inlineToRemoveAtEnd = {},
  		data = {t:target, plugin:plugin, rmv:inlineToRemoveAtEnd, b:startClassList, e:(endValue.charAt(1) !== "=") ? endValue : startClassList.replace(new RegExp("(?:\\s|^)" + endValue.substr(2) + "(?![\\w-])"), "") + ((endValue.charAt(0) === "+") ? " " + endValue.substr(2) : "")},
  		changingVars = {},
  		startVars = _getAllStyles(target),
  		transformRelated = /(transform|perspective)/i,
  		endVars, p;
  	if (classPT) {
  		classPT.r(1, classPT.d);
  		_removeLinkedListItem(classPT.d.plugin, classPT, "_pt");
  	}
  	target.setAttribute("class", data.e);
  	endVars = _getAllStyles(target, true);
  	target.setAttribute("class", startClassList);
  	for (p in endVars) {
  		if (endVars[p] !== startVars[p] && !transformRelated.test(p)) {
  			changingVars[p] = endVars[p];
  			if (!style[p] && style[p] !== "0") {
  				inlineToRemoveAtEnd[p] = 1;
  			}
  		}
  	}
  	cache.classPT = plugin._pt = new PropTween(plugin._pt, target, "className", 0, 0, _renderClassName, data, 0, -11);
  	if (style.cssText !== cssText) { //only apply if things change. Otherwise, in cases like a background-image that's pulled dynamically, it could cause a refresh. See https://gsap.com/forums/topic/20368-possible-gsap-bug-switching-classnames-in-chrome/.
  		style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
  	}
  	_parseTransform(target, true); //to clear the caching of transforms
  	data.css = new gsap.plugins.css();
  	data.css.init(target, changingVars, tween);
  	plugin._props.push(...data.css._props);
  	return 1;
  }
  */
}, rn = [1, 0, 0, 1, 0, 0], Xa = {}, Wa = function(t) {
  return t === "matrix(1, 0, 0, 1, 0, 0)" || t === "none" || !t;
}, So = function(t) {
  var i = be(t, ft);
  return Wa(i) ? rn : i.substr(7).match(jo).map(yt);
}, Qs = function(t, i) {
  var e = t._gsap || Xi(t), r = t.style, n = So(t), o, a, l, u;
  return e.svg && t.getAttribute("transform") ? (l = t.transform.baseVal.consolidate().matrix, n = [l.a, l.b, l.c, l.d, l.e, l.f], n.join(",") === "1,0,0,1,0,0" ? rn : n) : (n === rn && !t.offsetParent && t !== hr && !e.svg && (l = r.display, r.display = "block", o = t.parentNode, (!o || !t.offsetParent && !t.getBoundingClientRect().width) && (u = 1, a = t.nextElementSibling, hr.appendChild(t)), n = So(t), l ? r.display = l : ki(t, "display"), u && (a ? o.insertBefore(t, a) : o ? o.appendChild(t) : hr.removeChild(t))), i && n.length > 6 ? [n[0], n[1], n[4], n[5], n[12], n[13]] : n);
}, bs = function(t, i, e, r, n, o) {
  var a = t._gsap, l = n || Qs(t, !0), u = a.xOrigin || 0, c = a.yOrigin || 0, d = a.xOffset || 0, h = a.yOffset || 0, f = l[0], _ = l[1], p = l[2], g = l[3], b = l[4], w = l[5], T = i.split(" "), v = parseFloat(T[0]) || 0, S = parseFloat(T[1]) || 0, P, x, E, C;
  e ? l !== rn && (x = f * g - _ * p) && (E = v * (g / x) + S * (-p / x) + (p * w - g * b) / x, C = v * (-_ / x) + S * (f / x) - (f * w - _ * b) / x, v = E, S = C) : (P = Ya(t), v = P.x + (~T[0].indexOf("%") ? v / 100 * P.width : v), S = P.y + (~(T[1] || T[0]).indexOf("%") ? S / 100 * P.height : S)), r || r !== !1 && a.smooth ? (b = v - u, w = S - c, a.xOffset = d + (b * f + w * p) - b, a.yOffset = h + (b * _ + w * g) - w) : a.xOffset = a.yOffset = 0, a.xOrigin = v, a.yOrigin = S, a.smooth = !!r, a.origin = i, a.originIsAbsolute = !!e, t.style[ce] = "0px 0px", o && (vi(o, a, "xOrigin", u, v), vi(o, a, "yOrigin", c, S), vi(o, a, "xOffset", d, a.xOffset), vi(o, a, "yOffset", h, a.yOffset)), t.setAttribute("data-svg-origin", v + " " + S);
}, nn = function(t, i) {
  var e = t._gsap || new ka(t);
  if ("x" in e && !i && !e.uncache)
    return e;
  var r = t.style, n = e.scaleX < 0, o = "px", a = "deg", l = getComputedStyle(t), u = be(t, ce) || "0", c, d, h, f, _, p, g, b, w, T, v, S, P, x, E, C, k, Y, M, G, F, K, U, A, Q, et, m, st, Gt, Ae, ht, At;
  return c = d = h = p = g = b = w = T = v = 0, f = _ = 1, e.svg = !!(t.getCTM && Ba(t)), l.translate && ((l.translate !== "none" || l.scale !== "none" || l.rotate !== "none") && (r[ft] = (l.translate !== "none" ? "translate3d(" + (l.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (l.rotate !== "none" ? "rotate(" + l.rotate + ") " : "") + (l.scale !== "none" ? "scale(" + l.scale.split(" ").join(",") + ") " : "") + (l[ft] !== "none" ? l[ft] : "")), r.scale = r.rotate = r.translate = "none"), x = Qs(t, e.svg), e.svg && (e.uncache ? (Q = t.getBBox(), u = e.xOrigin - Q.x + "px " + (e.yOrigin - Q.y) + "px", A = "") : A = !i && t.getAttribute("data-svg-origin"), bs(t, A || u, !!A || e.originIsAbsolute, e.smooth !== !1, x)), S = e.xOrigin || 0, P = e.yOrigin || 0, x !== rn && (Y = x[0], M = x[1], G = x[2], F = x[3], c = K = x[4], d = U = x[5], x.length === 6 ? (f = Math.sqrt(Y * Y + M * M), _ = Math.sqrt(F * F + G * G), p = Y || M ? ir(M, Y) * Ni : 0, w = G || F ? ir(G, F) * Ni + p : 0, w && (_ *= Math.abs(Math.cos(w * dr))), e.svg && (c -= S - (S * Y + P * G), d -= P - (S * M + P * F))) : (At = x[6], Ae = x[7], m = x[8], st = x[9], Gt = x[10], ht = x[11], c = x[12], d = x[13], h = x[14], E = ir(At, Gt), g = E * Ni, E && (C = Math.cos(-E), k = Math.sin(-E), A = K * C + m * k, Q = U * C + st * k, et = At * C + Gt * k, m = K * -k + m * C, st = U * -k + st * C, Gt = At * -k + Gt * C, ht = Ae * -k + ht * C, K = A, U = Q, At = et), E = ir(-G, Gt), b = E * Ni, E && (C = Math.cos(-E), k = Math.sin(-E), A = Y * C - m * k, Q = M * C - st * k, et = G * C - Gt * k, ht = F * k + ht * C, Y = A, M = Q, G = et), E = ir(M, Y), p = E * Ni, E && (C = Math.cos(E), k = Math.sin(E), A = Y * C + M * k, Q = K * C + U * k, M = M * C - Y * k, U = U * C - K * k, Y = A, K = Q), g && Math.abs(g) + Math.abs(p) > 359.9 && (g = p = 0, b = 180 - b), f = yt(Math.sqrt(Y * Y + M * M + G * G)), _ = yt(Math.sqrt(U * U + At * At)), E = ir(K, U), w = Math.abs(E) > 2e-4 ? E * Ni : 0, v = ht ? 1 / (ht < 0 ? -ht : ht) : 0), e.svg && (A = t.getAttribute("transform"), e.forceCSS = t.setAttribute("transform", "") || !Wa(be(t, ft)), A && t.setAttribute("transform", A))), Math.abs(w) > 90 && Math.abs(w) < 270 && (n ? (f *= -1, w += p <= 0 ? 180 : -180, p += p <= 0 ? 180 : -180) : (_ *= -1, w += w <= 0 ? 180 : -180)), i = i || e.uncache, e.x = c - ((e.xPercent = c && (!i && e.xPercent || (Math.round(t.offsetWidth / 2) === Math.round(-c) ? -50 : 0))) ? t.offsetWidth * e.xPercent / 100 : 0) + o, e.y = d - ((e.yPercent = d && (!i && e.yPercent || (Math.round(t.offsetHeight / 2) === Math.round(-d) ? -50 : 0))) ? t.offsetHeight * e.yPercent / 100 : 0) + o, e.z = h + o, e.scaleX = yt(f), e.scaleY = yt(_), e.rotation = yt(p) + a, e.rotationX = yt(g) + a, e.rotationY = yt(b) + a, e.skewX = w + a, e.skewY = T + a, e.transformPerspective = v + o, (e.zOrigin = parseFloat(u.split(" ")[2]) || !i && e.zOrigin || 0) && (r[ce] = Yn(u)), e.xOffset = e.yOffset = 0, e.force3D = Se.force3D, e.renderTransform = e.svg ? Lu : Ia ? Ha : Au, e.uncache = 0, e;
}, Yn = function(t) {
  return (t = t.split(" "))[0] + " " + t[1];
}, is = function(t, i, e) {
  var r = Ut(i);
  return yt(parseFloat(i) + parseFloat(Ci(t, "x", e + "px", r))) + r;
}, Au = function(t, i) {
  i.z = "0px", i.rotationY = i.rotationX = "0deg", i.force3D = 0, Ha(t, i);
}, Li = "0deg", Er = "0px", zi = ") ", Ha = function(t, i) {
  var e = i || this, r = e.xPercent, n = e.yPercent, o = e.x, a = e.y, l = e.z, u = e.rotation, c = e.rotationY, d = e.rotationX, h = e.skewX, f = e.skewY, _ = e.scaleX, p = e.scaleY, g = e.transformPerspective, b = e.force3D, w = e.target, T = e.zOrigin, v = "", S = b === "auto" && t && t !== 1 || b === !0;
  if (T && (d !== Li || c !== Li)) {
    var P = parseFloat(c) * dr, x = Math.sin(P), E = Math.cos(P), C;
    P = parseFloat(d) * dr, C = Math.cos(P), o = is(w, o, x * C * -T), a = is(w, a, -Math.sin(P) * -T), l = is(w, l, E * C * -T + T);
  }
  g !== Er && (v += "perspective(" + g + zi), (r || n) && (v += "translate(" + r + "%, " + n + "%) "), (S || o !== Er || a !== Er || l !== Er) && (v += l !== Er || S ? "translate3d(" + o + ", " + a + ", " + l + ") " : "translate(" + o + ", " + a + zi), u !== Li && (v += "rotate(" + u + zi), c !== Li && (v += "rotateY(" + c + zi), d !== Li && (v += "rotateX(" + d + zi), (h !== Li || f !== Li) && (v += "skew(" + h + ", " + f + zi), (_ !== 1 || p !== 1) && (v += "scale(" + _ + ", " + p + zi), w.style[ft] = v || "translate(0, 0)";
}, Lu = function(t, i) {
  var e = i || this, r = e.xPercent, n = e.yPercent, o = e.x, a = e.y, l = e.rotation, u = e.skewX, c = e.skewY, d = e.scaleX, h = e.scaleY, f = e.target, _ = e.xOrigin, p = e.yOrigin, g = e.xOffset, b = e.yOffset, w = e.forceCSS, T = parseFloat(o), v = parseFloat(a), S, P, x, E, C;
  l = parseFloat(l), u = parseFloat(u), c = parseFloat(c), c && (c = parseFloat(c), u += c, l += c), l || u ? (l *= dr, u *= dr, S = Math.cos(l) * d, P = Math.sin(l) * d, x = Math.sin(l - u) * -h, E = Math.cos(l - u) * h, u && (c *= dr, C = Math.tan(u - c), C = Math.sqrt(1 + C * C), x *= C, E *= C, c && (C = Math.tan(c), C = Math.sqrt(1 + C * C), S *= C, P *= C)), S = yt(S), P = yt(P), x = yt(x), E = yt(E)) : (S = d, E = h, P = x = 0), (T && !~(o + "").indexOf("px") || v && !~(a + "").indexOf("px")) && (T = Ci(f, "x", o, "px"), v = Ci(f, "y", a, "px")), (_ || p || g || b) && (T = yt(T + _ - (_ * S + p * x) + g), v = yt(v + p - (_ * P + p * E) + b)), (r || n) && (C = f.getBBox(), T = yt(T + r / 100 * C.width), v = yt(v + n / 100 * C.height)), C = "matrix(" + S + "," + P + "," + x + "," + E + "," + T + "," + v + ")", f.setAttribute("transform", C), w && (f.style[ft] = C);
}, zu = function(t, i, e, r, n) {
  var o = 360, a = Rt(n), l = parseFloat(n) * (a && ~n.indexOf("rad") ? Ni : 1), u = l - r, c = r + u + "deg", d, h;
  return a && (d = n.split("_")[1], d === "short" && (u %= o, u !== u % (o / 2) && (u += u < 0 ? o : -o)), d === "cw" && u < 0 ? u = (u + o * mo) % o - ~~(u / o) * o : d === "ccw" && u > 0 && (u = (u - o * mo) % o - ~~(u / o) * o)), t._pt = h = new ue(t._pt, i, e, r, u, mu), h.e = c, h.u = "deg", t._props.push(e), h;
}, To = function(t, i) {
  for (var e in i)
    t[e] = i[e];
  return t;
}, Nu = function(t, i, e) {
  var r = To({}, e._gsap), n = "perspective,force3D,transformOrigin,svgOrigin", o = e.style, a, l, u, c, d, h, f, _;
  r.svg ? (u = e.getAttribute("transform"), e.setAttribute("transform", ""), o[ft] = i, a = nn(e, 1), ki(e, ft), e.setAttribute("transform", u)) : (u = getComputedStyle(e)[ft], o[ft] = i, a = nn(e, 1), o[ft] = u);
  for (l in ai)
    u = r[l], c = a[l], u !== c && n.indexOf(l) < 0 && (f = Ut(u), _ = Ut(c), d = f !== _ ? Ci(e, l, u, _) : parseFloat(u), h = parseFloat(c), t._pt = new ue(t._pt, a, l, d, h - d, ys), t._pt.u = _ || 0, t._props.push(l));
  To(a, r);
};
le("padding,margin,Width,Radius", function(s, t) {
  var i = "Top", e = "Right", r = "Bottom", n = "Left", o = (t < 3 ? [i, e, r, n] : [i + n, i + e, r + e, r + n]).map(function(a) {
    return t < 2 ? s + a : "border" + a + s;
  });
  In[t > 1 ? "border" + s : s] = function(a, l, u, c, d) {
    var h, f;
    if (arguments.length < 4)
      return h = o.map(function(_) {
        return ii(a, _, u);
      }), f = h.join(" "), f.split(h[0]).length === 5 ? h[0] : f;
    h = (c + "").split(" "), f = {}, o.forEach(function(_, p) {
      return f[_] = h[p] = h[p] || h[(p - 1) / 2 | 0];
    }), a.init(l, f, d);
  };
});
var Va = {
  name: "css",
  register: xs,
  targetTest: function(t) {
    return t.style && t.nodeType;
  },
  init: function(t, i, e, r, n) {
    var o = this._props, a = t.style, l = e.vars.startAt, u, c, d, h, f, _, p, g, b, w, T, v, S, P, x, E, C;
    $s || xs(), this.styles = this.styles || Fa(t), E = this.styles.props, this.tween = e;
    for (p in i)
      if (p !== "autoRound" && (c = i[p], !(me[p] && Ca(p, i, e, r, t, n)))) {
        if (f = typeof c, _ = In[p], f === "function" && (c = c.call(e, r, t, n), f = typeof c), f === "string" && ~c.indexOf("random(") && (c = Jr(c)), _)
          _(this, t, p, c, e) && (x = 1);
        else if (p.substr(0, 2) === "--")
          u = (getComputedStyle(t).getPropertyValue(p) + "").trim(), c += "", bi.lastIndex = 0, bi.test(u) || (g = Ut(u), b = Ut(c), b ? g !== b && (u = Ci(t, p, u, b) + b) : g && (c += g)), this.add(a, "setProperty", u, c, r, n, 0, 0, p), o.push(p), E.push(p, 0, a[p]);
        else if (f !== "undefined") {
          if (l && p in l ? (u = typeof l[p] == "function" ? l[p].call(e, r, t, n) : l[p], Rt(u) && ~u.indexOf("random(") && (u = Jr(u)), Ut(u + "") || u === "auto" || (u += Se.units[p] || Ut(ii(t, p)) || ""), (u + "").charAt(1) === "=" && (u = ii(t, p))) : u = ii(t, p), h = parseFloat(u), w = f === "string" && c.charAt(1) === "=" && c.substr(0, 2), w && (c = c.substr(2)), d = parseFloat(c), p in qe && (p === "autoAlpha" && (h === 1 && ii(t, "visibility") === "hidden" && d && (h = 0), E.push("visibility", 0, a.visibility), vi(this, a, "visibility", h ? "inherit" : "hidden", d ? "inherit" : "hidden", !d)), p !== "scale" && p !== "transform" && (p = qe[p], ~p.indexOf(",") && (p = p.split(",")[0]))), T = p in ai, T) {
            if (this.styles.save(p), C = c, f === "string" && c.substring(0, 6) === "var(--") {
              if (c = be(t, c.substring(4, c.indexOf(")"))), c.substring(0, 5) === "calc(") {
                var k = t.style.perspective;
                t.style.perspective = c, c = be(t, "perspective"), k ? t.style.perspective = k : ki(t, "perspective");
              }
              d = parseFloat(c);
            }
            if (v || (S = t._gsap, S.renderTransform && !i.parseTransform || nn(t, i.parseTransform), P = i.smoothOrigin !== !1 && S.smooth, v = this._pt = new ue(this._pt, a, ft, 0, 1, S.renderTransform, S, 0, -1), v.dep = 1), p === "scale")
              this._pt = new ue(this._pt, S, "scaleY", S.scaleY, (w ? fr(S.scaleY, w + d) : d) - S.scaleY || 0, ys), this._pt.u = 0, o.push("scaleY", p), p += "X";
            else if (p === "transformOrigin") {
              E.push(ce, 0, a[ce]), c = Du(c), S.svg ? bs(t, c, 0, P, 0, this) : (b = parseFloat(c.split(" ")[2]) || 0, b !== S.zOrigin && vi(this, S, "zOrigin", S.zOrigin, b), vi(this, a, p, Yn(u), Yn(c)));
              continue;
            } else if (p === "svgOrigin") {
              bs(t, c, 1, P, 0, this);
              continue;
            } else if (p in Xa) {
              zu(this, S, p, h, w ? fr(h, w + c) : c);
              continue;
            } else if (p === "smoothOrigin") {
              vi(this, S, "smooth", S.smooth, c);
              continue;
            } else if (p === "force3D") {
              S[p] = c;
              continue;
            } else if (p === "transform") {
              Nu(this, c, t);
              continue;
            }
          } else p in a || (p = br(p) || p);
          if (T || (d || d === 0) && (h || h === 0) && !gu.test(c) && p in a)
            g = (u + "").substr((h + "").length), d || (d = 0), b = Ut(c) || (p in Se.units ? Se.units[p] : g), g !== b && (h = Ci(t, p, u, b)), this._pt = new ue(this._pt, T ? S : a, p, h, (w ? fr(h, w + d) : d) - h, !T && (b === "px" || p === "zIndex") && i.autoRound !== !1 ? wu : ys), this._pt.u = b || 0, T && C !== c ? (this._pt.b = u, this._pt.e = C, this._pt.r = yu) : g !== b && b !== "%" && (this._pt.b = u, this._pt.r = vu);
          else if (p in a)
            Mu.call(this, t, p, u, w ? w + c : c);
          else if (p in t)
            this.add(t, p, u || t[p], w ? w + c : c, r, n);
          else if (p !== "parseTransform") {
            Fs(p, c);
            continue;
          }
          T || (p in a ? E.push(p, 0, a[p]) : typeof t[p] == "function" ? E.push(p, 2, t[p]()) : E.push(p, 1, u || t[p])), o.push(p);
        }
      }
    x && Ra(this);
  },
  render: function(t, i) {
    if (i.tween._time || !Gs())
      for (var e = i._pt; e; )
        e.r(t, e.d), e = e._next;
    else
      i.styles.revert();
  },
  get: ii,
  aliases: qe,
  getSetter: function(t, i, e) {
    var r = qe[i];
    return r && r.indexOf(",") < 0 && (i = r), i in ai && i !== ce && (t._gsap.x || ii(t, "x")) ? e && go === e ? i === "scale" ? Tu : Su : (go = e || {}) && (i === "scale" ? ku : Cu) : t.style && !Ls(t.style[i]) ? xu : ~i.indexOf("-") ? bu : Us(t, i);
  },
  core: {
    _removeProperty: ki,
    _getMatrix: Qs
  }
};
fe.utils.checkPrefix = br;
fe.core.getStyleSaver = Fa;
(function(s, t, i, e) {
  var r = le(s + "," + t + "," + i, function(n) {
    ai[n] = 1;
  });
  le(t, function(n) {
    Se.units[n] = "deg", Xa[n] = 1;
  }), qe[r[13]] = s + "," + t, le(e, function(n) {
    var o = n.split(":");
    qe[o[1]] = r[o[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
le("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(s) {
  Se.units[s] = "px";
});
fe.registerPlugin(Va);
var Ui = fe.registerPlugin(Va) || fe;
Ui.core.Tween;
function Fu(s, t) {
  for (var i = 0; i < t.length; i++) {
    var e = t[i];
    e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e && (e.writable = !0), Object.defineProperty(s, e.key, e);
  }
}
function Iu(s, t, i) {
  return t && Fu(s.prototype, t), s;
}
var Nt, Pn, we, yi, wi, pr, Ua, Fi, _r, qa, ni, Ye, $a, Ga = function() {
  return Nt || typeof window < "u" && (Nt = window.gsap) && Nt.registerPlugin && Nt;
}, Ka = 1, cr = [], H = [], Ge = [], Xr = Date.now, Ss = function(t, i) {
  return i;
}, Yu = function() {
  var t = _r.core, i = t.bridge || {}, e = t._scrollers, r = t._proxies;
  e.push.apply(e, H), r.push.apply(r, Ge), H = e, Ge = r, Ss = function(o, a) {
    return i[o](a);
  };
}, Si = function(t, i) {
  return ~Ge.indexOf(t) && Ge[Ge.indexOf(t) + 1][i];
}, Wr = function(t) {
  return !!~qa.indexOf(t);
}, Jt = function(t, i, e, r, n) {
  return t.addEventListener(i, e, {
    passive: r !== !1,
    capture: !!n
  });
}, jt = function(t, i, e, r) {
  return t.removeEventListener(i, e, !!r);
}, hn = "scrollLeft", dn = "scrollTop", Ts = function() {
  return ni && ni.isPressed || H.cache++;
}, Bn = function(t, i) {
  var e = function r(n) {
    if (n || n === 0) {
      Ka && (we.history.scrollRestoration = "manual");
      var o = ni && ni.isPressed;
      n = r.v = Math.round(n) || (ni && ni.iOS ? 1 : 0), t(n), r.cacheID = H.cache, o && Ss("ss", n);
    } else (i || H.cache !== r.cacheID || Ss("ref")) && (r.cacheID = H.cache, r.v = t());
    return r.v + r.offset;
  };
  return e.offset = 0, t && e;
}, re = {
  s: hn,
  p: "left",
  p2: "Left",
  os: "right",
  os2: "Right",
  d: "width",
  d2: "Width",
  a: "x",
  sc: Bn(function(s) {
    return arguments.length ? we.scrollTo(s, Pt.sc()) : we.pageXOffset || yi[hn] || wi[hn] || pr[hn] || 0;
  })
}, Pt = {
  s: dn,
  p: "top",
  p2: "Top",
  os: "bottom",
  os2: "Bottom",
  d: "height",
  d2: "Height",
  a: "y",
  op: re,
  sc: Bn(function(s) {
    return arguments.length ? we.scrollTo(re.sc(), s) : we.pageYOffset || yi[dn] || wi[dn] || pr[dn] || 0;
  })
}, se = function(t, i) {
  return (i && i._ctx && i._ctx.selector || Nt.utils.toArray)(t)[0] || (typeof t == "string" && Nt.config().nullTargetWarn !== !1 ? console.warn("Element not found:", t) : null);
}, Bu = function(t, i) {
  for (var e = i.length; e--; )
    if (i[e] === t || i[e].contains(t))
      return !0;
  return !1;
}, Pi = function(t, i) {
  var e = i.s, r = i.sc;
  Wr(t) && (t = yi.scrollingElement || wi);
  var n = H.indexOf(t), o = r === Pt.sc ? 1 : 2;
  !~n && (n = H.push(t) - 1), H[n + o] || Jt(t, "scroll", Ts);
  var a = H[n + o], l = a || (H[n + o] = Bn(Si(t, e), !0) || (Wr(t) ? r : Bn(function(u) {
    return arguments.length ? t[e] = u : t[e];
  })));
  return l.target = t, a || (l.smooth = Nt.getProperty(t, "scrollBehavior") === "smooth"), l;
}, ks = function(t, i, e) {
  var r = t, n = t, o = Xr(), a = o, l = i || 50, u = Math.max(500, l * 3), c = function(_, p) {
    var g = Xr();
    p || g - o > l ? (n = r, r = _, a = o, o = g) : e ? r += _ : r = n + (_ - n) / (g - a) * (o - a);
  }, d = function() {
    n = r = e ? 0 : r, a = o = 0;
  }, h = function(_) {
    var p = a, g = n, b = Xr();
    return (_ || _ === 0) && _ !== r && c(_), o === a || b - a > u ? 0 : (r + (e ? g : -g)) / ((e ? b : o) - p) * 1e3;
  };
  return {
    update: c,
    reset: d,
    getVelocity: h
  };
}, Or = function(t, i) {
  return i && !t._gsapAllow && t.cancelable !== !1 && t.preventDefault(), t.changedTouches ? t.changedTouches[0] : t;
}, ko = function(t) {
  var i = Math.max.apply(Math, t), e = Math.min.apply(Math, t);
  return Math.abs(i) >= Math.abs(e) ? i : e;
}, Qa = function() {
  _r = Nt.core.globals().ScrollTrigger, _r && _r.core && Yu();
}, Za = function(t) {
  return Nt = t || Ga(), !Pn && Nt && typeof document < "u" && document.body && (we = window, yi = document, wi = yi.documentElement, pr = yi.body, qa = [we, yi, wi, pr], Nt.utils.clamp, $a = Nt.core.context || function() {
  }, Fi = "onpointerenter" in pr ? "pointer" : "mouse", Ua = wt.isTouch = we.matchMedia && we.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in we || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, Ye = wt.eventTypes = ("ontouchstart" in wi ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in wi ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout(function() {
    return Ka = 0;
  }, 500), Pn = 1), _r || Qa(), Pn;
};
re.op = Pt;
H.cache = 0;
var wt = /* @__PURE__ */ (function() {
  function s(i) {
    this.init(i);
  }
  var t = s.prototype;
  return t.init = function(e) {
    Pn || Za(Nt) || console.warn("Please gsap.registerPlugin(Observer)"), _r || Qa();
    var r = e.tolerance, n = e.dragMinimum, o = e.type, a = e.target, l = e.lineHeight, u = e.debounce, c = e.preventDefault, d = e.onStop, h = e.onStopDelay, f = e.ignore, _ = e.wheelSpeed, p = e.event, g = e.onDragStart, b = e.onDragEnd, w = e.onDrag, T = e.onPress, v = e.onRelease, S = e.onRight, P = e.onLeft, x = e.onUp, E = e.onDown, C = e.onChangeX, k = e.onChangeY, Y = e.onChange, M = e.onToggleX, G = e.onToggleY, F = e.onHover, K = e.onHoverEnd, U = e.onMove, A = e.ignoreCheck, Q = e.isNormalizer, et = e.onGestureStart, m = e.onGestureEnd, st = e.onWheel, Gt = e.onEnable, Ae = e.onDisable, ht = e.onClick, At = e.scrollSpeed, It = e.capture, xt = e.allowClicks, Kt = e.lockAxis, Yt = e.onLockAxis;
    this.target = a = se(a) || wi, this.vars = e, f && (f = Nt.utils.toArray(f)), r = r || 1e-9, n = n || 0, _ = _ || 1, At = At || 1, o = o || "wheel,touch,pointer", u = u !== !1, l || (l = parseFloat(we.getComputedStyle(pr).lineHeight) || 22);
    var li, Qt, Zt, Z, gt, ne, he, y = this, de = 0, Qe = 0, ui = e.passive || !c && e.passive !== !1, dt = Pi(a, re), Ze = Pi(a, Pt), ci = dt(), Oi = Ze(), Et = ~o.indexOf("touch") && !~o.indexOf("pointer") && Ye[0] === "pointerdown", fi = Wr(a), mt = a.ownerDocument || yi, Le = [0, 0, 0], Ce = [0, 0, 0], je = 0, Tr = function() {
      return je = Xr();
    }, bt = function(L, j) {
      return (y.event = L) && f && Bu(L.target, f) || j && Et && L.pointerType !== "touch" || A && A(L, j);
    }, ln = function() {
      y._vx.reset(), y._vy.reset(), Qt.pause(), d && d(y);
    }, Je = function() {
      var L = y.deltaX = ko(Le), j = y.deltaY = ko(Ce), O = Math.abs(L) >= r, z = Math.abs(j) >= r;
      Y && (O || z) && Y(y, L, j, Le, Ce), O && (S && y.deltaX > 0 && S(y), P && y.deltaX < 0 && P(y), C && C(y), M && y.deltaX < 0 != de < 0 && M(y), de = y.deltaX, Le[0] = Le[1] = Le[2] = 0), z && (E && y.deltaY > 0 && E(y), x && y.deltaY < 0 && x(y), k && k(y), G && y.deltaY < 0 != Qe < 0 && G(y), Qe = y.deltaY, Ce[0] = Ce[1] = Ce[2] = 0), (Z || Zt) && (U && U(y), Zt && (g && Zt === 1 && g(y), w && w(y), Zt = 0), Z = !1), ne && !(ne = !1) && Yt && Yt(y), gt && (st(y), gt = !1), li = 0;
    }, Ji = function(L, j, O) {
      Le[O] += L, Ce[O] += j, y._vx.update(L), y._vy.update(j), u ? li || (li = requestAnimationFrame(Je)) : Je();
    }, tr = function(L, j) {
      Kt && !he && (y.axis = he = Math.abs(L) > Math.abs(j) ? "x" : "y", ne = !0), he !== "y" && (Le[2] += L, y._vx.update(L, !0)), he !== "x" && (Ce[2] += j, y._vy.update(j, !0)), u ? li || (li = requestAnimationFrame(Je)) : Je();
    }, hi = function(L) {
      if (!bt(L, 1)) {
        L = Or(L, c);
        var j = L.clientX, O = L.clientY, z = j - y.x, R = O - y.y, N = y.isDragging;
        y.x = j, y.y = O, (N || (z || R) && (Math.abs(y.startX - j) >= n || Math.abs(y.startY - O) >= n)) && (Zt || (Zt = N ? 2 : 1), N || (y.isDragging = !0), tr(z, R));
      }
    }, Mi = y.onPress = function(I) {
      bt(I, 1) || I && I.button || (y.axis = he = null, Qt.pause(), y.isPressed = !0, I = Or(I), de = Qe = 0, y.startX = y.x = I.clientX, y.startY = y.y = I.clientY, y._vx.reset(), y._vy.reset(), Jt(Q ? a : mt, Ye[1], hi, ui, !0), y.deltaX = y.deltaY = 0, T && T(y));
    }, V = y.onRelease = function(I) {
      if (!bt(I, 1)) {
        jt(Q ? a : mt, Ye[1], hi, !0);
        var L = !isNaN(y.y - y.startY), j = y.isDragging, O = j && (Math.abs(y.x - y.startX) > 3 || Math.abs(y.y - y.startY) > 3), z = Or(I);
        !O && L && (y._vx.reset(), y._vy.reset(), c && xt && Nt.delayedCall(0.08, function() {
          if (Xr() - je > 300 && !I.defaultPrevented) {
            if (I.target.click)
              I.target.click();
            else if (mt.createEvent) {
              var R = mt.createEvent("MouseEvents");
              R.initMouseEvent("click", !0, !0, we, 1, z.screenX, z.screenY, z.clientX, z.clientY, !1, !1, !1, !1, 0, null), I.target.dispatchEvent(R);
            }
          }
        })), y.isDragging = y.isGesturing = y.isPressed = !1, d && j && !Q && Qt.restart(!0), Zt && Je(), b && j && b(y), v && v(y, O);
      }
    }, Di = function(L) {
      return L.touches && L.touches.length > 1 && (y.isGesturing = !0) && et(L, y.isDragging);
    }, ze = function() {
      return (y.isGesturing = !1) || m(y);
    }, Ne = function(L) {
      if (!bt(L)) {
        var j = dt(), O = Ze();
        Ji((j - ci) * At, (O - Oi) * At, 1), ci = j, Oi = O, d && Qt.restart(!0);
      }
    }, Fe = function(L) {
      if (!bt(L)) {
        L = Or(L, c), st && (gt = !0);
        var j = (L.deltaMode === 1 ? l : L.deltaMode === 2 ? we.innerHeight : 1) * _;
        Ji(L.deltaX * j, L.deltaY * j, 0), d && !Q && Qt.restart(!0);
      }
    }, Ri = function(L) {
      if (!bt(L)) {
        var j = L.clientX, O = L.clientY, z = j - y.x, R = O - y.y;
        y.x = j, y.y = O, Z = !0, d && Qt.restart(!0), (z || R) && tr(z, R);
      }
    }, er = function(L) {
      y.event = L, F(y);
    }, ti = function(L) {
      y.event = L, K(y);
    }, kr = function(L) {
      return bt(L) || Or(L, c) && ht(y);
    };
    Qt = y._dc = Nt.delayedCall(h || 0.25, ln).pause(), y.deltaX = y.deltaY = 0, y._vx = ks(0, 50, !0), y._vy = ks(0, 50, !0), y.scrollX = dt, y.scrollY = Ze, y.isDragging = y.isGesturing = y.isPressed = !1, $a(this), y.enable = function(I) {
      return y.isEnabled || (Jt(fi ? mt : a, "scroll", Ts), o.indexOf("scroll") >= 0 && Jt(fi ? mt : a, "scroll", Ne, ui, It), o.indexOf("wheel") >= 0 && Jt(a, "wheel", Fe, ui, It), (o.indexOf("touch") >= 0 && Ua || o.indexOf("pointer") >= 0) && (Jt(a, Ye[0], Mi, ui, It), Jt(mt, Ye[2], V), Jt(mt, Ye[3], V), xt && Jt(a, "click", Tr, !0, !0), ht && Jt(a, "click", kr), et && Jt(mt, "gesturestart", Di), m && Jt(mt, "gestureend", ze), F && Jt(a, Fi + "enter", er), K && Jt(a, Fi + "leave", ti), U && Jt(a, Fi + "move", Ri)), y.isEnabled = !0, y.isDragging = y.isGesturing = y.isPressed = Z = Zt = !1, y._vx.reset(), y._vy.reset(), ci = dt(), Oi = Ze(), I && I.type && Mi(I), Gt && Gt(y)), y;
    }, y.disable = function() {
      y.isEnabled && (cr.filter(function(I) {
        return I !== y && Wr(I.target);
      }).length || jt(fi ? mt : a, "scroll", Ts), y.isPressed && (y._vx.reset(), y._vy.reset(), jt(Q ? a : mt, Ye[1], hi, !0)), jt(fi ? mt : a, "scroll", Ne, It), jt(a, "wheel", Fe, It), jt(a, Ye[0], Mi, It), jt(mt, Ye[2], V), jt(mt, Ye[3], V), jt(a, "click", Tr, !0), jt(a, "click", kr), jt(mt, "gesturestart", Di), jt(mt, "gestureend", ze), jt(a, Fi + "enter", er), jt(a, Fi + "leave", ti), jt(a, Fi + "move", Ri), y.isEnabled = y.isPressed = y.isDragging = !1, Ae && Ae(y));
    }, y.kill = y.revert = function() {
      y.disable();
      var I = cr.indexOf(y);
      I >= 0 && cr.splice(I, 1), ni === y && (ni = 0);
    }, cr.push(y), Q && Wr(a) && (ni = y), y.enable(p);
  }, Iu(s, [{
    key: "velocityX",
    get: function() {
      return this._vx.getVelocity();
    }
  }, {
    key: "velocityY",
    get: function() {
      return this._vy.getVelocity();
    }
  }]), s;
})();
wt.version = "3.15.0";
wt.create = function(s) {
  return new wt(s);
};
wt.register = Za;
wt.getAll = function() {
  return cr.slice();
};
wt.getById = function(s) {
  return cr.filter(function(t) {
    return t.vars.id === s;
  })[0];
};
Ga() && Nt.registerPlugin(wt);
var D, or, W, tt, ve, J, Zs, Xn, sn, Hr, Ar, pn, Ht, $n, Cs, ee, Co, Po, ar, ja, rs, Ja, te, Ps, tl, el, _i, Es, js, gr, Js, Vr, Os, ns, _n = 1, Vt = Date.now, ss = Vt(), Re = 0, Lr = 0, Eo = function(t, i, e) {
  var r = ge(t) && (t.substr(0, 6) === "clamp(" || t.indexOf("max") > -1);
  return e["_" + i + "Clamp"] = r, r ? t.substr(6, t.length - 7) : t;
}, Oo = function(t, i) {
  return i && (!ge(t) || t.substr(0, 6) !== "clamp(") ? "clamp(" + t + ")" : t;
}, Xu = function s() {
  return Lr && requestAnimationFrame(s);
}, Mo = function() {
  return $n = 1;
}, Do = function() {
  return $n = 0;
}, Ve = function(t) {
  return t;
}, zr = function(t) {
  return Math.round(t * 1e5) / 1e5 || 0;
}, il = function() {
  return typeof window < "u";
}, rl = function() {
  return D || il() && (D = window.gsap) && D.registerPlugin && D;
}, Ki = function(t) {
  return !!~Zs.indexOf(t);
}, nl = function(t) {
  return (t === "Height" ? Js : W["inner" + t]) || ve["client" + t] || J["client" + t];
}, sl = function(t) {
  return Si(t, "getBoundingClientRect") || (Ki(t) ? function() {
    return Rn.width = W.innerWidth, Rn.height = Js, Rn;
  } : function() {
    return ri(t);
  });
}, Wu = function(t, i, e) {
  var r = e.d, n = e.d2, o = e.a;
  return (o = Si(t, "getBoundingClientRect")) ? function() {
    return o()[r];
  } : function() {
    return (i ? nl(n) : t["client" + n]) || 0;
  };
}, Hu = function(t, i) {
  return !i || ~Ge.indexOf(t) ? sl(t) : function() {
    return Rn;
  };
}, $e = function(t, i) {
  var e = i.s, r = i.d2, n = i.d, o = i.a;
  return Math.max(0, (e = "scroll" + r) && (o = Si(t, e)) ? o() - sl(t)()[n] : Ki(t) ? (ve[e] || J[e]) - nl(r) : t[e] - t["offset" + r]);
}, gn = function(t, i) {
  for (var e = 0; e < ar.length; e += 3)
    (!i || ~i.indexOf(ar[e + 1])) && t(ar[e], ar[e + 1], ar[e + 2]);
}, ge = function(t) {
  return typeof t == "string";
}, qt = function(t) {
  return typeof t == "function";
}, Nr = function(t) {
  return typeof t == "number";
}, Ii = function(t) {
  return typeof t == "object";
}, Mr = function(t, i, e) {
  return t && t.progress(i ? 0 : 1) && e && t.pause();
}, rr = function(t, i, e) {
  if (t.enabled) {
    var r = t._ctx ? t._ctx.add(function() {
      return i(t, e);
    }) : i(t, e);
    r && r.totalTime && (t.callbackAnimation = r);
  }
}, nr = Math.abs, ol = "left", al = "top", to = "right", eo = "bottom", qi = "width", $i = "height", Ur = "Right", qr = "Left", $r = "Top", Gr = "Bottom", St = "padding", Ee = "margin", Sr = "Width", io = "Height", Ct = "px", Oe = function(t) {
  return W.getComputedStyle(t.nodeType === Node.DOCUMENT_NODE ? t.scrollingElement : t);
}, Vu = function(t) {
  var i = Oe(t).position;
  t.style.position = i === "absolute" || i === "fixed" ? i : "relative";
}, Ro = function(t, i) {
  for (var e in i)
    e in t || (t[e] = i[e]);
  return t;
}, ri = function(t, i) {
  var e = i && Oe(t)[Cs] !== "matrix(1, 0, 0, 1, 0, 0)" && D.to(t, {
    x: 0,
    y: 0,
    xPercent: 0,
    yPercent: 0,
    rotation: 0,
    rotationX: 0,
    rotationY: 0,
    scale: 1,
    skewX: 0,
    skewY: 0
  }).progress(1), r = t.getBoundingClientRect ? t.getBoundingClientRect() : t.scrollingElement.getBoundingClientRect();
  return e && e.progress(0).kill(), r;
}, Wn = function(t, i) {
  var e = i.d2;
  return t["offset" + e] || t["client" + e] || 0;
}, ll = function(t) {
  var i = [], e = t.labels, r = t.duration(), n;
  for (n in e)
    i.push(e[n] / r);
  return i;
}, Uu = function(t) {
  return function(i) {
    return D.utils.snap(ll(t), i);
  };
}, ro = function(t) {
  var i = D.utils.snap(t), e = Array.isArray(t) && t.slice(0).sort(function(r, n) {
    return r - n;
  });
  return e ? function(r, n, o) {
    o === void 0 && (o = 1e-3);
    var a;
    if (!n)
      return i(r);
    if (n > 0) {
      for (r -= o, a = 0; a < e.length; a++)
        if (e[a] >= r)
          return e[a];
      return e[a - 1];
    } else
      for (a = e.length, r += o; a--; )
        if (e[a] <= r)
          return e[a];
    return e[0];
  } : function(r, n, o) {
    o === void 0 && (o = 1e-3);
    var a = i(r);
    return !n || Math.abs(a - r) < o || a - r < 0 == n < 0 ? a : i(n < 0 ? r - t : r + t);
  };
}, qu = function(t) {
  return function(i, e) {
    return ro(ll(t))(i, e.direction);
  };
}, mn = function(t, i, e, r) {
  return e.split(",").forEach(function(n) {
    return t(i, n, r);
  });
}, Dt = function(t, i, e, r, n) {
  return t.addEventListener(i, e, {
    passive: !r,
    capture: !!n
  });
}, Mt = function(t, i, e, r) {
  return t.removeEventListener(i, e, !!r);
}, vn = function(t, i, e) {
  e = e && e.wheelHandler, e && (t(i, "wheel", e), t(i, "touchmove", e));
}, Ao = {
  startColor: "green",
  endColor: "red",
  indent: 0,
  fontSize: "16px",
  fontWeight: "normal"
}, yn = {
  toggleActions: "play",
  anticipatePin: 0
}, Hn = {
  top: 0,
  left: 0,
  center: 0.5,
  bottom: 1,
  right: 1
}, En = function(t, i) {
  if (ge(t)) {
    var e = t.indexOf("="), r = ~e ? +(t.charAt(e - 1) + 1) * parseFloat(t.substr(e + 1)) : 0;
    ~e && (t.indexOf("%") > e && (r *= i / 100), t = t.substr(0, e - 1)), t = r + (t in Hn ? Hn[t] * i : ~t.indexOf("%") ? parseFloat(t) * i / 100 : parseFloat(t) || 0);
  }
  return t;
}, wn = function(t, i, e, r, n, o, a, l) {
  var u = n.startColor, c = n.endColor, d = n.fontSize, h = n.indent, f = n.fontWeight, _ = tt.createElement("div"), p = Ki(e) || Si(e, "pinType") === "fixed", g = t.indexOf("scroller") !== -1, b = p ? J : e.tagName === "IFRAME" ? e.contentDocument.body : e, w = t.indexOf("start") !== -1, T = w ? u : c, v = "border-color:" + T + ";font-size:" + d + ";color:" + T + ";font-weight:" + f + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
  return v += "position:" + ((g || l) && p ? "fixed;" : "absolute;"), (g || l || !p) && (v += (r === Pt ? to : eo) + ":" + (o + parseFloat(h)) + "px;"), a && (v += "box-sizing:border-box;text-align:left;width:" + a.offsetWidth + "px;"), _._isStart = w, _.setAttribute("class", "gsap-marker-" + t + (i ? " marker-" + i : "")), _.style.cssText = v, _.innerText = i || i === 0 ? t + "-" + i : t, b.children[0] ? b.insertBefore(_, b.children[0]) : b.appendChild(_), _._offset = _["offset" + r.op.d2], On(_, 0, r, w), _;
}, On = function(t, i, e, r) {
  var n = {
    display: "block"
  }, o = e[r ? "os2" : "p2"], a = e[r ? "p2" : "os2"];
  t._isFlipped = r, n[e.a + "Percent"] = r ? -100 : 0, n[e.a] = r ? "1px" : 0, n["border" + o + Sr] = 1, n["border" + a + Sr] = 0, n[e.p] = i + "px", D.set(t, n);
}, B = [], Ms = {}, on, Lo = function() {
  return Vt() - Re > 34 && (on || (on = requestAnimationFrame(si)));
}, sr = function() {
  (!te || !te.isPressed || te.startX > J.clientWidth) && (H.cache++, te ? on || (on = requestAnimationFrame(si)) : si(), Re || Zi("scrollStart"), Re = Vt());
}, os = function() {
  el = W.innerWidth, tl = W.innerHeight;
}, Fr = function(t) {
  H.cache++, (t === !0 || !Ht && !Ja && !tt.fullscreenElement && !tt.webkitFullscreenElement && (!Ps || el !== W.innerWidth || Math.abs(W.innerHeight - tl) > W.innerHeight * 0.25)) && Xn.restart(!0);
}, Qi = {}, $u = [], ul = function s() {
  return Mt(X, "scrollEnd", s) || Bi(!0);
}, Zi = function(t) {
  return Qi[t] && Qi[t].map(function(i) {
    return i();
  }) || $u;
}, _e = [], cl = function(t) {
  for (var i = 0; i < _e.length; i += 5)
    (!t || _e[i + 4] && _e[i + 4].query === t) && (_e[i].style.cssText = _e[i + 1], _e[i].getBBox && _e[i].setAttribute("transform", _e[i + 2] || ""), _e[i + 3].uncache = 1);
}, fl = function() {
  return H.forEach(function(t) {
    return qt(t) && ++t.cacheID && (t.rec = t());
  });
}, no = function(t, i) {
  var e;
  for (ee = 0; ee < B.length; ee++)
    e = B[ee], e && (!i || e._ctx === i) && (t ? e.kill(1) : e.revert(!0, !0));
  Vr = !0, i && cl(i), i || Zi("revert");
}, hl = function(t, i) {
  H.cache++, (i || !ie) && H.forEach(function(e) {
    return qt(e) && e.cacheID++ && (e.rec = 0);
  }), ge(t) && (W.history.scrollRestoration = js = t);
}, ie, Gi = 0, zo, Gu = function() {
  if (zo !== Gi) {
    var t = zo = Gi;
    requestAnimationFrame(function() {
      return t === Gi && Bi(!0);
    });
  }
}, dl = function() {
  J.appendChild(gr), Js = !te && gr.offsetHeight || W.innerHeight, J.removeChild(gr);
}, No = function(t) {
  return sn(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(i) {
    return i.style.display = t ? "none" : "block";
  });
}, Bi = function(t, i) {
  if (ve = tt.documentElement, J = tt.body, Zs = [W, tt, ve, J], Re && !t && !Vr) {
    Dt(X, "scrollEnd", ul);
    return;
  }
  dl(), ie = X.isRefreshing = !0, Vr || fl();
  var e = Zi("refreshInit");
  ja && X.sort(), i || no(), H.forEach(function(r) {
    qt(r) && (r.smooth && (r.target.style.scrollBehavior = "auto"), r(0));
  }), B.slice(0).forEach(function(r) {
    return r.refresh();
  }), Vr = !1, B.forEach(function(r) {
    if (r._subPinOffset && r.pin) {
      var n = r.vars.horizontal ? "offsetWidth" : "offsetHeight", o = r.pin[n];
      r.revert(!0, 1), r.adjustPinSpacing(r.pin[n] - o), r.refresh();
    }
  }), Os = 1, No(!0), B.forEach(function(r) {
    var n = $e(r.scroller, r._dir), o = r.vars.end === "max" || r._endClamp && r.end > n, a = r._startClamp && r.start >= n;
    (o || a) && r.setPositions(a ? n - 1 : r.start, o ? Math.max(a ? n : r.start + 1, n) : r.end, !0);
  }), No(!1), Os = 0, e.forEach(function(r) {
    return r && r.render && r.render(-1);
  }), H.forEach(function(r) {
    qt(r) && (r.smooth && requestAnimationFrame(function() {
      return r.target.style.scrollBehavior = "smooth";
    }), r.rec && r(r.rec));
  }), hl(js, 1), Xn.pause(), Gi++, ie = 2, si(2), B.forEach(function(r) {
    return qt(r.vars.onRefresh) && r.vars.onRefresh(r);
  }), ie = X.isRefreshing = !1, Zi("refresh");
}, Ds = 0, Mn = 1, Kr, si = function(t) {
  if (t === 2 || !ie && !Vr) {
    X.isUpdating = !0, Kr && Kr.update(0);
    var i = B.length, e = Vt(), r = e - ss >= 50, n = i && B[0].scroll();
    if (Mn = Ds > n ? -1 : 1, ie || (Ds = n), r && (Re && !$n && e - Re > 200 && (Re = 0, Zi("scrollEnd")), Ar = ss, ss = e), Mn < 0) {
      for (ee = i; ee-- > 0; )
        B[ee] && B[ee].update(0, r);
      Mn = 1;
    } else
      for (ee = 0; ee < i; ee++)
        B[ee] && B[ee].update(0, r);
    X.isUpdating = !1;
  }
  on = 0;
}, Rs = [ol, al, eo, to, Ee + Gr, Ee + Ur, Ee + $r, Ee + qr, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], Dn = Rs.concat([qi, $i, "boxSizing", "max" + Sr, "max" + io, "position", Ee, St, St + $r, St + Ur, St + Gr, St + qr]), Ku = function(t, i, e) {
  mr(e);
  var r = t._gsap;
  if (r.spacerIsNative)
    mr(r.spacerState);
  else if (t._gsap.swappedIn) {
    var n = i.parentNode;
    n && (n.insertBefore(t, i), n.removeChild(i));
  }
  t._gsap.swappedIn = !1;
}, as = function(t, i, e, r) {
  if (!t._gsap.swappedIn) {
    for (var n = Rs.length, o = i.style, a = t.style, l; n--; )
      l = Rs[n], o[l] = e[l];
    o.position = e.position === "absolute" ? "absolute" : "relative", e.display === "inline" && (o.display = "inline-block"), a[eo] = a[to] = "auto", o.flexBasis = e.flexBasis || "auto", o.overflow = "visible", o.boxSizing = "border-box", o[qi] = Wn(t, re) + Ct, o[$i] = Wn(t, Pt) + Ct, o[St] = a[Ee] = a[al] = a[ol] = "0", mr(r), a[qi] = a["max" + Sr] = e[qi], a[$i] = a["max" + io] = e[$i], a[St] = e[St], t.parentNode !== i && (t.parentNode.insertBefore(i, t), i.appendChild(t)), t._gsap.swappedIn = !0;
  }
}, Qu = /([A-Z])/g, mr = function(t) {
  if (t) {
    var i = t.t.style, e = t.length, r = 0, n, o;
    for ((t.t._gsap || D.core.getCache(t.t)).uncache = 1; r < e; r += 2)
      o = t[r + 1], n = t[r], o ? i[n] = o : i[n] && i.removeProperty(n.replace(Qu, "-$1").toLowerCase());
  }
}, xn = function(t) {
  for (var i = Dn.length, e = t.style, r = [], n = 0; n < i; n++)
    r.push(Dn[n], e[Dn[n]]);
  return r.t = t, r;
}, Zu = function(t, i, e) {
  for (var r = [], n = t.length, o = e ? 8 : 0, a; o < n; o += 2)
    a = t[o], r.push(a, a in i ? i[a] : t[o + 1]);
  return r.t = t.t, r;
}, Rn = {
  left: 0,
  top: 0
}, Fo = function(t, i, e, r, n, o, a, l, u, c, d, h, f, _) {
  qt(t) && (t = t(l)), ge(t) && t.substr(0, 3) === "max" && (t = h + (t.charAt(4) === "=" ? En("0" + t.substr(3), e) : 0));
  var p = f ? f.time() : 0, g, b, w;
  if (f && f.seek(0), isNaN(t) || (t = +t), Nr(t))
    f && (t = D.utils.mapRange(f.scrollTrigger.start, f.scrollTrigger.end, 0, h, t)), a && On(a, e, r, !0);
  else {
    qt(i) && (i = i(l));
    var T = (t || "0").split(" "), v, S, P, x;
    w = se(i, l) || J, v = ri(w) || {}, (!v || !v.left && !v.top) && Oe(w).display === "none" && (x = w.style.display, w.style.display = "block", v = ri(w), x ? w.style.display = x : w.style.removeProperty("display")), S = En(T[0], v[r.d]), P = En(T[1] || "0", e), t = v[r.p] - u[r.p] - c + S + n - P, a && On(a, P, r, e - P < 20 || a._isStart && P > 20), e -= e - P;
  }
  if (_ && (l[_] = t || -1e-3, t < 0 && (t = 0)), o) {
    var E = t + e, C = o._isStart;
    g = "scroll" + r.d2, On(o, E, r, C && E > 20 || !C && (d ? Math.max(J[g], ve[g]) : o.parentNode[g]) <= E + 1), d && (u = ri(a), d && (o.style[r.op.p] = u[r.op.p] - r.op.m - o._offset + Ct));
  }
  return f && w && (g = ri(w), f.seek(h), b = ri(w), f._caScrollDist = g[r.p] - b[r.p], t = t / f._caScrollDist * h), f && f.seek(p), f ? t : Math.round(t);
}, ju = /(webkit|moz|length|cssText|inset)/i, Io = function(t, i, e, r) {
  if (t.parentNode !== i) {
    var n = t.style, o, a;
    if (i === J) {
      t._stOrig = n.cssText, a = Oe(t);
      for (o in a)
        !+o && !ju.test(o) && a[o] && typeof n[o] == "string" && o !== "0" && (n[o] = a[o]);
      n.top = e, n.left = r;
    } else
      n.cssText = t._stOrig;
    D.core.getCache(t).uncache = 1, i.appendChild(t);
  }
}, pl = function(t, i, e) {
  var r = i, n = r;
  return function(o) {
    var a = Math.round(t());
    return a !== r && a !== n && Math.abs(a - r) > 3 && Math.abs(a - n) > 3 && (o = a, e && e()), n = r, r = Math.round(o), r;
  };
}, bn = function(t, i, e) {
  var r = {};
  r[i.p] = "+=" + e, D.set(t, r);
}, Yo = function(t, i) {
  var e = Pi(t, i), r = "_scroll" + i.p2, n = function o(a, l, u, c, d) {
    var h = o.tween, f = l.onComplete, _ = {};
    u = u || e();
    var p = pl(e, u, function() {
      h.kill(), o.tween = 0;
    });
    return d = c && d || 0, c = c || a - u, h && h.kill(), l[r] = a, l.inherit = !1, l.modifiers = _, _[r] = function() {
      return p(u + c * h.ratio + d * h.ratio * h.ratio);
    }, l.onUpdate = function() {
      H.cache++, o.tween && si();
    }, l.onComplete = function() {
      o.tween = 0, f && f.call(h);
    }, h = o.tween = D.to(t, l), h;
  };
  return t[r] = e, e.wheelHandler = function() {
    return n.tween && n.tween.kill() && (n.tween = 0);
  }, Dt(t, "wheel", e.wheelHandler), X.isTouch && Dt(t, "touchmove", e.wheelHandler), n;
}, X = /* @__PURE__ */ (function() {
  function s(i, e) {
    or || s.register(D) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), Es(this), this.init(i, e);
  }
  var t = s.prototype;
  return t.init = function(e, r) {
    if (this.progress = this.start = 0, this.vars && this.kill(!0, !0), !Lr) {
      this.update = this.refresh = this.kill = Ve;
      return;
    }
    e = Ro(ge(e) || Nr(e) || e.nodeType ? {
      trigger: e
    } : e, yn);
    var n = e, o = n.onUpdate, a = n.toggleClass, l = n.id, u = n.onToggle, c = n.onRefresh, d = n.scrub, h = n.trigger, f = n.pin, _ = n.pinSpacing, p = n.invalidateOnRefresh, g = n.anticipatePin, b = n.onScrubComplete, w = n.onSnapComplete, T = n.once, v = n.snap, S = n.pinReparent, P = n.pinSpacer, x = n.containerAnimation, E = n.fastScrollEnd, C = n.preventOverlaps, k = e.horizontal || e.containerAnimation && e.horizontal !== !1 ? re : Pt, Y = !d && d !== 0, M = se(e.scroller || W), G = D.core.getCache(M), F = Ki(M), K = ("pinType" in e ? e.pinType : Si(M, "pinType") || F && "fixed") === "fixed", U = [e.onEnter, e.onLeave, e.onEnterBack, e.onLeaveBack], A = Y && e.toggleActions.split(" "), Q = "markers" in e ? e.markers : yn.markers, et = F ? 0 : parseFloat(Oe(M)["border" + k.p2 + Sr]) || 0, m = this, st = e.onRefreshInit && function() {
      return e.onRefreshInit(m);
    }, Gt = Wu(M, F, k), Ae = Hu(M, F), ht = 0, At = 0, It = 0, xt = Pi(M, k), Kt, Yt, li, Qt, Zt, Z, gt, ne, he, y, de, Qe, ui, dt, Ze, ci, Oi, Et, fi, mt, Le, Ce, je, Tr, bt, ln, Je, Ji, tr, hi, Mi, V, Di, ze, Ne, Fe, Ri, er, ti;
    if (m._startClamp = m._endClamp = !1, m._dir = k, g *= 45, m.scroller = M, m.scroll = x ? x.time.bind(x) : xt, Qt = xt(), m.vars = e, r = r || e.animation, "refreshPriority" in e && (ja = 1, e.refreshPriority === -9999 && (Kr = m)), G.tweenScroll = G.tweenScroll || {
      top: Yo(M, Pt),
      left: Yo(M, re)
    }, m.tweenTo = Kt = G.tweenScroll[k.p], m.scrubDuration = function(O) {
      Di = Nr(O) && O, Di ? V ? V.duration(O) : V = D.to(r, {
        ease: "expo",
        totalProgress: "+=0",
        inherit: !1,
        duration: Di,
        paused: !0,
        onComplete: function() {
          return b && b(m);
        }
      }) : (V && V.progress(1).kill(), V = 0);
    }, r && (r.vars.lazy = !1, r._initted && !m.isReverted || r.vars.immediateRender !== !1 && e.immediateRender !== !1 && r.duration() && r.render(0, !0, !0), m.animation = r.pause(), r.scrollTrigger = m, m.scrubDuration(d), hi = 0, l || (l = r.vars.id)), v && ((!Ii(v) || v.push) && (v = {
      snapTo: v
    }), "scrollBehavior" in J.style && D.set(F ? [J, ve] : M, {
      scrollBehavior: "auto"
    }), H.forEach(function(O) {
      return qt(O) && O.target === (F ? tt.scrollingElement || ve : M) && (O.smooth = !1);
    }), li = qt(v.snapTo) ? v.snapTo : v.snapTo === "labels" ? Uu(r) : v.snapTo === "labelsDirectional" ? qu(r) : v.directional !== !1 ? function(O, z) {
      return ro(v.snapTo)(O, Vt() - At < 500 ? 0 : z.direction);
    } : D.utils.snap(v.snapTo), ze = v.duration || {
      min: 0.1,
      max: 2
    }, ze = Ii(ze) ? Hr(ze.min, ze.max) : Hr(ze, ze), Ne = D.delayedCall(v.delay || Di / 2 || 0.1, function() {
      var O = xt(), z = Vt() - At < 500, R = Kt.tween;
      if ((z || Math.abs(m.getVelocity()) < 10) && !R && !$n && ht !== O) {
        var N = (O - Z) / dt, Ot = r && !Y ? r.totalProgress() : N, q = z ? 0 : (Ot - Mi) / (Vt() - Ar) * 1e3 || 0, vt = D.utils.clamp(-N, 1 - N, nr(q / 2) * q / 0.185), Bt = N + (v.inertia === !1 ? 0 : vt), pt, ot, it = v, Ie = it.onStart, lt = it.onInterrupt, pe = it.onComplete;
        if (pt = li(Bt, m), Nr(pt) || (pt = Bt), ot = Math.max(0, Math.round(Z + pt * dt)), O <= gt && O >= Z && ot !== O) {
          if (R && !R._initted && R.data <= nr(ot - O))
            return;
          v.inertia === !1 && (vt = pt - N), Kt(ot, {
            duration: ze(nr(Math.max(nr(Bt - Ot), nr(pt - Ot)) * 0.185 / q / 0.05 || 0)),
            ease: v.ease || "power3",
            data: nr(ot - O),
            // record the distance so that if another snap tween occurs (conflict) we can prioritize the closest snap.
            onInterrupt: function() {
              return Ne.restart(!0) && lt && rr(m, lt);
            },
            onComplete: function() {
              m.update(), ht = xt(), r && !Y && (V ? V.resetTo("totalProgress", pt, r._tTime / r._tDur) : r.progress(pt)), hi = Mi = r && !Y ? r.totalProgress() : m.progress, w && w(m), pe && rr(m, pe);
            }
          }, O, vt * dt, ot - O - vt * dt), Ie && rr(m, Ie, Kt.tween);
        }
      } else m.isActive && ht !== O && Ne.restart(!0);
    }).pause()), l && (Ms[l] = m), h = m.trigger = se(h || f !== !0 && f), ti = h && h._gsap && h._gsap.stRevert, ti && (ti = ti(m)), f = f === !0 ? h : se(f), ge(a) && (a = {
      targets: h,
      className: a
    }), f && (_ === !1 || _ === Ee || (_ = !_ && f.parentNode && f.parentNode.style && Oe(f.parentNode).display === "flex" ? !1 : St), m.pin = f, Yt = D.core.getCache(f), Yt.spacer ? Ze = Yt.pinState : (P && (P = se(P), P && !P.nodeType && (P = P.current || P.nativeElement), Yt.spacerIsNative = !!P, P && (Yt.spacerState = xn(P))), Yt.spacer = Et = P || tt.createElement("div"), Et.classList.add("pin-spacer"), l && Et.classList.add("pin-spacer-" + l), Yt.pinState = Ze = xn(f)), e.force3D !== !1 && D.set(f, {
      force3D: !0
    }), m.spacer = Et = Yt.spacer, tr = Oe(f), Tr = tr[_ + k.os2], mt = D.getProperty(f), Le = D.quickSetter(f, k.a, Ct), as(f, Et, tr), Oi = xn(f)), Q) {
      Qe = Ii(Q) ? Ro(Q, Ao) : Ao, y = wn("scroller-start", l, M, k, Qe, 0), de = wn("scroller-end", l, M, k, Qe, 0, y), fi = y["offset" + k.op.d2];
      var kr = se(Si(M, "content") || M);
      ne = this.markerStart = wn("start", l, kr, k, Qe, fi, 0, x), he = this.markerEnd = wn("end", l, kr, k, Qe, fi, 0, x), x && (er = D.quickSetter([ne, he], k.a, Ct)), !K && !(Ge.length && Si(M, "fixedMarkers") === !0) && (Vu(F ? J : M), D.set([y, de], {
        force3D: !0
      }), ln = D.quickSetter(y, k.a, Ct), Ji = D.quickSetter(de, k.a, Ct));
    }
    if (x) {
      var I = x.vars.onUpdate, L = x.vars.onUpdateParams;
      x.eventCallback("onUpdate", function() {
        m.update(0, 0, 1), I && I.apply(x, L || []);
      });
    }
    if (m.previous = function() {
      return B[B.indexOf(m) - 1];
    }, m.next = function() {
      return B[B.indexOf(m) + 1];
    }, m.revert = function(O, z) {
      if (!z)
        return m.kill(!0);
      var R = O !== !1 || !m.enabled, N = Ht;
      R !== m.isReverted && (R && (Fe = Math.max(xt(), m.scroll.rec || 0), It = m.progress, Ri = r && r.progress()), ne && [ne, he, y, de].forEach(function(Ot) {
        return Ot.style.display = R ? "none" : "block";
      }), R && (Ht = m, m.update(R)), f && (!S || !m.isActive) && (R ? Ku(f, Et, Ze) : as(f, Et, Oe(f), bt)), R || m.update(R), Ht = N, m.isReverted = R);
    }, m.refresh = function(O, z, R, N) {
      if (!((Ht || !m.enabled) && !z)) {
        if (f && O && Re) {
          Dt(s, "scrollEnd", ul);
          return;
        }
        !ie && st && st(m), Ht = m, Kt.tween && !R && (Kt.tween.kill(), Kt.tween = 0), V && V.pause(), p && r && (r.revert({
          kill: !1
        }).invalidate(), r.getChildren ? r.getChildren(!0, !0, !1).forEach(function(di) {
          return di.vars.immediateRender && di.render(0, !0, !0);
        }) : r.vars.immediateRender && r.render(0, !0, !0)), m.isReverted || m.revert(!0, !0), m._subPinOffset = !1;
        var Ot = Gt(), q = Ae(), vt = x ? x.duration() : $e(M, k), Bt = dt <= 0.01 || !dt, pt = 0, ot = N || 0, it = Ii(R) ? R.end : e.end, Ie = e.endTrigger || h, lt = Ii(R) ? R.start : e.start || (e.start === 0 || !h ? 0 : f ? "0 0" : "0 100%"), pe = m.pinnedContainer = e.pinnedContainer && se(e.pinnedContainer, m), Be = h && Math.max(0, B.indexOf(m)) || 0, Lt = Be, zt, Xt, Ai, un, Wt, kt, Xe, Gn, so, Cr, We, Pr, cn;
        for (Q && Ii(R) && (Pr = D.getProperty(y, k.p), cn = D.getProperty(de, k.p)); Lt-- > 0; )
          kt = B[Lt], kt.end || kt.refresh(0, 1) || (Ht = m), Xe = kt.pin, Xe && (Xe === h || Xe === f || Xe === pe) && !kt.isReverted && (Cr || (Cr = []), Cr.unshift(kt), kt.revert(!0, !0)), kt !== B[Lt] && (Be--, Lt--);
        for (qt(lt) && (lt = lt(m)), lt = Eo(lt, "start", m), Z = Fo(lt, h, Ot, k, xt(), ne, y, m, q, et, K, vt, x, m._startClamp && "_startClamp") || (f ? -1e-3 : 0), qt(it) && (it = it(m)), ge(it) && !it.indexOf("+=") && (~it.indexOf(" ") ? it = (ge(lt) ? lt.split(" ")[0] : "") + it : (pt = En(it.substr(2), Ot), it = ge(lt) ? lt : (x ? D.utils.mapRange(0, x.duration(), x.scrollTrigger.start, x.scrollTrigger.end, Z) : Z) + pt, Ie = h)), it = Eo(it, "end", m), gt = Math.max(Z, Fo(it || (Ie ? "100% 0" : vt), Ie, Ot, k, xt() + pt, he, de, m, q, et, K, vt, x, m._endClamp && "_endClamp")) || -1e-3, pt = 0, Lt = Be; Lt--; )
          kt = B[Lt] || {}, Xe = kt.pin, Xe && kt.start - kt._pinPush <= Z && !x && kt.end > 0 && (zt = kt.end - (m._startClamp ? Math.max(0, kt.start) : kt.start), (Xe === h && kt.start - kt._pinPush < Z || Xe === pe) && isNaN(lt) && (pt += zt * (1 - kt.progress)), Xe === f && (ot += zt));
        if (Z += pt, gt += pt, m._startClamp && (m._startClamp += pt), m._endClamp && !ie && (m._endClamp = gt || -1e-3, gt = Math.min(gt, $e(M, k))), dt = gt - Z || (Z -= 0.01) && 1e-3, Bt && (It = D.utils.clamp(0, 1, D.utils.normalize(Z, gt, Fe))), m._pinPush = ot, ne && pt && (zt = {}, zt[k.a] = "+=" + pt, pe && (zt[k.p] = "-=" + xt()), D.set([ne, he], zt)), f && !(Os && m.end >= $e(M, k)))
          zt = Oe(f), un = k === Pt, Ai = xt(), Ce = parseFloat(mt(k.a)) + ot, !vt && gt > 1 && (We = (F ? tt.scrollingElement || ve : M).style, We = {
            style: We,
            value: We["overflow" + k.a.toUpperCase()]
          }, F && Oe(J)["overflow" + k.a.toUpperCase()] !== "scroll" && (We.style["overflow" + k.a.toUpperCase()] = "scroll")), as(f, Et, zt), Oi = xn(f), Xt = ri(f, !0), Gn = K && Pi(M, un ? re : Pt)(), _ ? (bt = [_ + k.os2, dt + ot + Ct], bt.t = Et, Lt = _ === St ? Wn(f, k) + dt + ot : 0, Lt && (bt.push(k.d, Lt + Ct), Et.style.flexBasis !== "auto" && (Et.style.flexBasis = Lt + Ct)), mr(bt), pe && B.forEach(function(di) {
            di.pin === pe && di.vars.pinSpacing !== !1 && (di._subPinOffset = !0);
          }), K && xt(Fe)) : (Lt = Wn(f, k), Lt && Et.style.flexBasis !== "auto" && (Et.style.flexBasis = Lt + Ct)), K && (Wt = {
            top: Xt.top + (un ? Ai - Z : Gn) + Ct,
            left: Xt.left + (un ? Gn : Ai - Z) + Ct,
            boxSizing: "border-box",
            position: "fixed"
          }, Wt[qi] = Wt["max" + Sr] = Math.ceil(Xt.width) + Ct, Wt[$i] = Wt["max" + io] = Math.ceil(Xt.height) + Ct, Wt[Ee] = Wt[Ee + $r] = Wt[Ee + Ur] = Wt[Ee + Gr] = Wt[Ee + qr] = "0", Wt[St] = zt[St], Wt[St + $r] = zt[St + $r], Wt[St + Ur] = zt[St + Ur], Wt[St + Gr] = zt[St + Gr], Wt[St + qr] = zt[St + qr], ci = Zu(Ze, Wt, S), ie && xt(0)), r ? (so = r._initted, rs(1), r.render(r.duration(), !0, !0), je = mt(k.a) - Ce + dt + ot, Je = Math.abs(dt - je) > 1, K && Je && ci.splice(ci.length - 2, 2), r.render(0, !0, !0), so || r.invalidate(!0), r.parent || r.totalTime(r.totalTime()), rs(0)) : je = dt, We && (We.value ? We.style["overflow" + k.a.toUpperCase()] = We.value : We.style.removeProperty("overflow-" + k.a));
        else if (h && xt() && !x)
          for (Xt = h.parentNode; Xt && Xt !== J; )
            Xt._pinOffset && (Z -= Xt._pinOffset, gt -= Xt._pinOffset), Xt = Xt.parentNode;
        Cr && Cr.forEach(function(di) {
          return di.revert(!1, !0);
        }), m.start = Z, m.end = gt, Qt = Zt = ie ? Fe : xt(), !x && !ie && (Qt < Fe && xt(Fe), m.scroll.rec = 0), m.revert(!1, !0), At = Vt(), Ne && (ht = -1, Ne.restart(!0)), Ht = 0, r && Y && (r._initted || Ri) && r.progress() !== Ri && r.progress(Ri || 0, !0).render(r.time(), !0, !0), (Bt || It !== m.progress || x || p || r && !r._initted) && (r && !Y && (r._initted || It || r.vars.immediateRender !== !1) && r.totalProgress(x && Z < -1e-3 && !It ? D.utils.normalize(Z, gt, 0) : It, !0), m.progress = Bt || (Qt - Z) / dt === It ? 0 : It), f && _ && (Et._pinOffset = Math.round(m.progress * je)), V && V.invalidate(), isNaN(Pr) || (Pr -= D.getProperty(y, k.p), cn -= D.getProperty(de, k.p), bn(y, k, Pr), bn(ne, k, Pr - (N || 0)), bn(de, k, cn), bn(he, k, cn - (N || 0))), Bt && !ie && m.update(), c && !ie && !ui && (ui = !0, c(m), ui = !1);
      }
    }, m.getVelocity = function() {
      return (xt() - Zt) / (Vt() - Ar) * 1e3 || 0;
    }, m.endAnimation = function() {
      Mr(m.callbackAnimation), r && (V ? V.progress(1) : r.paused() ? Y || Mr(r, m.direction < 0, 1) : Mr(r, r.reversed()));
    }, m.labelToScroll = function(O) {
      return r && r.labels && (Z || m.refresh() || Z) + r.labels[O] / r.duration() * dt || 0;
    }, m.getTrailing = function(O) {
      var z = B.indexOf(m), R = m.direction > 0 ? B.slice(0, z).reverse() : B.slice(z + 1);
      return (ge(O) ? R.filter(function(N) {
        return N.vars.preventOverlaps === O;
      }) : R).filter(function(N) {
        return m.direction > 0 ? N.end <= Z : N.start >= gt;
      });
    }, m.update = function(O, z, R) {
      if (!(x && !R && !O)) {
        var N = ie === !0 ? Fe : m.scroll(), Ot = O ? 0 : (N - Z) / dt, q = Ot < 0 ? 0 : Ot > 1 ? 1 : Ot || 0, vt = m.progress, Bt, pt, ot, it, Ie, lt, pe, Be;
        if (z && (Zt = Qt, Qt = x ? xt() : N, v && (Mi = hi, hi = r && !Y ? r.totalProgress() : q)), g && f && !Ht && !_n && Re && (!q && Z < N + (N - Zt) / (Vt() - Ar) * g ? q = 1e-4 : q === 1 && gt > N + (N - Zt) / (Vt() - Ar) * g && (q = 0.9999)), q !== vt && m.enabled) {
          if (Bt = m.isActive = !!q && q < 1, pt = !!vt && vt < 1, lt = Bt !== pt, Ie = lt || !!q != !!vt, m.direction = q > vt ? 1 : -1, m.progress = q, Ie && !Ht && (ot = q && !vt ? 0 : q === 1 ? 1 : vt === 1 ? 2 : 3, Y && (it = !lt && A[ot + 1] !== "none" && A[ot + 1] || A[ot], Be = r && (it === "complete" || it === "reset" || it in r))), C && (lt || Be) && (Be || d || !r) && (qt(C) ? C(m) : m.getTrailing(C).forEach(function(Ai) {
            return Ai.endAnimation();
          })), Y || (V && !Ht && !_n ? (V._dp._time - V._start !== V._time && V.render(V._dp._time - V._start), V.resetTo ? V.resetTo("totalProgress", q, r._tTime / r._tDur) : (V.vars.totalProgress = q, V.invalidate().restart())) : r && r.totalProgress(q, !!(Ht && (At || O)))), f) {
            if (O && _ && (Et.style[_ + k.os2] = Tr), !K)
              Le(zr(Ce + je * q));
            else if (Ie) {
              if (pe = !O && q > vt && gt + 1 > N && N + 1 >= $e(M, k), S)
                if (!O && (Bt || pe)) {
                  var Lt = ri(f, !0), zt = N - Z;
                  Io(f, J, Lt.top + (k === Pt ? zt : 0) + Ct, Lt.left + (k === Pt ? 0 : zt) + Ct);
                } else
                  Io(f, Et);
              mr(Bt || pe ? ci : Oi), Je && q < 1 && Bt || Le(Ce + (q === 1 && !pe ? je : 0));
            }
          }
          v && !Kt.tween && !Ht && !_n && Ne.restart(!0), a && (lt || T && q && (q < 1 || !ns)) && sn(a.targets).forEach(function(Ai) {
            return Ai.classList[Bt || T ? "add" : "remove"](a.className);
          }), o && !Y && !O && o(m), Ie && !Ht ? (Y && (Be && (it === "complete" ? r.pause().totalProgress(1) : it === "reset" ? r.restart(!0).pause() : it === "restart" ? r.restart(!0) : r[it]()), o && o(m)), (lt || !ns) && (u && lt && rr(m, u), U[ot] && rr(m, U[ot]), T && (q === 1 ? m.kill(!1, 1) : U[ot] = 0), lt || (ot = q === 1 ? 1 : 3, U[ot] && rr(m, U[ot]))), E && !Bt && Math.abs(m.getVelocity()) > (Nr(E) ? E : 2500) && (Mr(m.callbackAnimation), V ? V.progress(1) : Mr(r, it === "reverse" ? 1 : !q, 1))) : Y && o && !Ht && o(m);
        }
        if (Ji) {
          var Xt = x ? N / x.duration() * (x._caScrollDist || 0) : N;
          ln(Xt + (y._isFlipped ? 1 : 0)), Ji(Xt);
        }
        er && er(-N / x.duration() * (x._caScrollDist || 0));
      }
    }, m.enable = function(O, z) {
      m.enabled || (m.enabled = !0, Dt(M, "resize", Fr), F || Dt(M, "scroll", sr), st && Dt(s, "refreshInit", st), O !== !1 && (m.progress = It = 0, Qt = Zt = ht = xt()), z !== !1 && m.refresh());
    }, m.getTween = function(O) {
      return O && Kt ? Kt.tween : V;
    }, m.setPositions = function(O, z, R, N) {
      if (x) {
        var Ot = x.scrollTrigger, q = x.duration(), vt = Ot.end - Ot.start;
        O = Ot.start + vt * O / q, z = Ot.start + vt * z / q;
      }
      m.refresh(!1, !1, {
        start: Oo(O, R && !!m._startClamp),
        end: Oo(z, R && !!m._endClamp)
      }, N), m.update();
    }, m.adjustPinSpacing = function(O) {
      if (bt && O) {
        var z = bt.indexOf(k.d) + 1;
        bt[z] = parseFloat(bt[z]) + O + Ct, bt[1] = parseFloat(bt[1]) + O + Ct, mr(bt);
      }
    }, m.disable = function(O, z) {
      if (O !== !1 && m.revert(!0, !0), m.enabled && (m.enabled = m.isActive = !1, z || V && V.pause(), Fe = 0, Yt && (Yt.uncache = 1), st && Mt(s, "refreshInit", st), Ne && (Ne.pause(), Kt.tween && Kt.tween.kill() && (Kt.tween = 0)), !F)) {
        for (var R = B.length; R--; )
          if (B[R].scroller === M && B[R] !== m)
            return;
        Mt(M, "resize", Fr), F || Mt(M, "scroll", sr);
      }
    }, m.kill = function(O, z) {
      m.disable(O, z), V && !z && V.kill(), l && delete Ms[l];
      var R = B.indexOf(m);
      R >= 0 && B.splice(R, 1), R === ee && Mn > 0 && ee--, R = 0, B.forEach(function(N) {
        return N.scroller === m.scroller && (R = 1);
      }), R || ie || (m.scroll.rec = 0), r && (r.scrollTrigger = null, O && r.revert({
        kill: !1
      }), z || r.kill()), ne && [ne, he, y, de].forEach(function(N) {
        return N.parentNode && N.parentNode.removeChild(N);
      }), Kr === m && (Kr = 0), f && (Yt && (Yt.uncache = 1), R = 0, B.forEach(function(N) {
        return N.pin === f && R++;
      }), R || (Yt.spacer = 0)), e.onKill && e.onKill(m);
    }, B.push(m), m.enable(!1, !1), ti && ti(m), r && r.add && !dt) {
      var j = m.update;
      m.update = function() {
        m.update = j, H.cache++, Z || gt || m.refresh();
      }, D.delayedCall(0.01, m.update), dt = 0.01, Z = gt = 0;
    } else
      m.refresh();
    f && Gu();
  }, s.register = function(e) {
    return or || (D = e || rl(), il() && window.document && s.enable(), or = Lr), or;
  }, s.defaults = function(e) {
    if (e)
      for (var r in e)
        yn[r] = e[r];
    return yn;
  }, s.disable = function(e, r) {
    Lr = 0, B.forEach(function(o) {
      return o[r ? "kill" : "disable"](e);
    }), Mt(W, "wheel", sr), Mt(tt, "scroll", sr), clearInterval(pn), Mt(tt, "touchcancel", Ve), Mt(J, "touchstart", Ve), mn(Mt, tt, "pointerdown,touchstart,mousedown", Mo), mn(Mt, tt, "pointerup,touchend,mouseup", Do), Xn.kill(), gn(Mt);
    for (var n = 0; n < H.length; n += 3)
      vn(Mt, H[n], H[n + 1]), vn(Mt, H[n], H[n + 2]);
  }, s.enable = function() {
    if (W = window, tt = document, ve = tt.documentElement, J = tt.body, D) {
      if (sn = D.utils.toArray, Hr = D.utils.clamp, Es = D.core.context || Ve, rs = D.core.suppressOverwrites || Ve, js = W.history.scrollRestoration || "auto", Ds = W.pageYOffset || 0, D.core.globals("ScrollTrigger", s), J) {
        Lr = 1, gr = document.createElement("div"), gr.style.height = "100vh", gr.style.position = "absolute", dl(), Xu(), wt.register(D), s.isTouch = wt.isTouch, _i = wt.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), Ps = wt.isTouch === 1, Dt(W, "wheel", sr), Zs = [W, tt, ve, J], D.matchMedia ? (s.matchMedia = function(c) {
          var d = D.matchMedia(), h;
          for (h in c)
            d.add(h, c[h]);
          return d;
        }, D.addEventListener("matchMediaInit", function() {
          fl(), no();
        }), D.addEventListener("matchMediaRevert", function() {
          return cl();
        }), D.addEventListener("matchMedia", function() {
          Bi(0, 1), Zi("matchMedia");
        }), D.matchMedia().add("(orientation: portrait)", function() {
          return os(), os;
        })) : console.warn("Requires GSAP 3.11.0 or later"), os(), Dt(tt, "scroll", sr);
        var e = J.hasAttribute("style"), r = J.style, n = r.borderTopStyle, o = D.core.Animation.prototype, a, l;
        for (o.revert || Object.defineProperty(o, "revert", {
          value: function() {
            return this.time(-0.01, !0);
          }
        }), r.borderTopStyle = "solid", a = ri(J), Pt.m = Math.round(a.top + Pt.sc()) || 0, re.m = Math.round(a.left + re.sc()) || 0, n ? r.borderTopStyle = n : r.removeProperty("border-top-style"), e || (J.setAttribute("style", ""), J.removeAttribute("style")), pn = setInterval(Lo, 250), D.delayedCall(0.5, function() {
          return _n = 0;
        }), Dt(tt, "touchcancel", Ve), Dt(J, "touchstart", Ve), mn(Dt, tt, "pointerdown,touchstart,mousedown", Mo), mn(Dt, tt, "pointerup,touchend,mouseup", Do), Cs = D.utils.checkPrefix("transform"), Dn.push(Cs), or = Vt(), Xn = D.delayedCall(0.2, Bi).pause(), ar = [tt, "visibilitychange", function() {
          var c = W.innerWidth, d = W.innerHeight;
          tt.hidden ? (Co = c, Po = d) : (Co !== c || Po !== d) && Fr();
        }, tt, "DOMContentLoaded", Bi, W, "load", Bi, W, "resize", Fr], gn(Dt), B.forEach(function(c) {
          return c.enable(0, 1);
        }), l = 0; l < H.length; l += 3)
          vn(Mt, H[l], H[l + 1]), vn(Mt, H[l], H[l + 2]);
      } else if (tt) {
        var u = function c() {
          s.enable(), tt.removeEventListener("DOMContentLoaded", c);
        };
        tt.addEventListener("DOMContentLoaded", u);
      }
    }
  }, s.config = function(e) {
    "limitCallbacks" in e && (ns = !!e.limitCallbacks);
    var r = e.syncInterval;
    r && clearInterval(pn) || (pn = r) && setInterval(Lo, r), "ignoreMobileResize" in e && (Ps = s.isTouch === 1 && e.ignoreMobileResize), "autoRefreshEvents" in e && (gn(Mt) || gn(Dt, e.autoRefreshEvents || "none"), Ja = (e.autoRefreshEvents + "").indexOf("resize") === -1);
  }, s.scrollerProxy = function(e, r) {
    var n = se(e), o = H.indexOf(n), a = Ki(n);
    ~o && H.splice(o, a ? 6 : 2), r && (a ? Ge.unshift(W, r, J, r, ve, r) : Ge.unshift(n, r));
  }, s.clearMatchMedia = function(e) {
    B.forEach(function(r) {
      return r._ctx && r._ctx.query === e && r._ctx.kill(!0, !0);
    });
  }, s.isInViewport = function(e, r, n) {
    var o = (ge(e) ? se(e) : e).getBoundingClientRect(), a = o[n ? qi : $i] * r || 0;
    return n ? o.right - a > 0 && o.left + a < W.innerWidth : o.bottom - a > 0 && o.top + a < W.innerHeight;
  }, s.positionInViewport = function(e, r, n) {
    ge(e) && (e = se(e));
    var o = e.getBoundingClientRect(), a = o[n ? qi : $i], l = r == null ? a / 2 : r in Hn ? Hn[r] * a : ~r.indexOf("%") ? parseFloat(r) * a / 100 : parseFloat(r) || 0;
    return n ? (o.left + l) / W.innerWidth : (o.top + l) / W.innerHeight;
  }, s.killAll = function(e) {
    if (B.slice(0).forEach(function(n) {
      return n.vars.id !== "ScrollSmoother" && n.kill();
    }), e !== !0) {
      var r = Qi.killAll || [];
      Qi = {}, r.forEach(function(n) {
        return n();
      });
    }
  }, s;
})();
X.version = "3.15.0";
X.saveStyles = function(s) {
  return s ? sn(s).forEach(function(t) {
    if (t && t.style) {
      var i = _e.indexOf(t);
      i >= 0 && _e.splice(i, 5), _e.push(t, t.style.cssText, t.getBBox && t.getAttribute("transform"), D.core.getCache(t), Es());
    }
  }) : _e;
};
X.revert = function(s, t) {
  return no(!s, t);
};
X.create = function(s, t) {
  return new X(s, t);
};
X.refresh = function(s) {
  return s ? Fr(!0) : (or || X.register()) && Bi(!0);
};
X.update = function(s) {
  return ++H.cache && si(s === !0 ? 2 : 0);
};
X.clearScrollMemory = hl;
X.maxScroll = function(s, t) {
  return $e(s, t ? re : Pt);
};
X.getScrollFunc = function(s, t) {
  return Pi(se(s), t ? re : Pt);
};
X.getById = function(s) {
  return Ms[s];
};
X.getAll = function() {
  return B.filter(function(s) {
    return s.vars.id !== "ScrollSmoother";
  });
};
X.isScrolling = function() {
  return !!Re;
};
X.snapDirectional = ro;
X.addEventListener = function(s, t) {
  var i = Qi[s] || (Qi[s] = []);
  ~i.indexOf(t) || i.push(t);
};
X.removeEventListener = function(s, t) {
  var i = Qi[s], e = i && i.indexOf(t);
  e >= 0 && i.splice(e, 1);
};
X.batch = function(s, t) {
  var i = [], e = {}, r = t.interval || 0.016, n = t.batchMax || 1e9, o = function(u, c) {
    var d = [], h = [], f = D.delayedCall(r, function() {
      c(d, h), d = [], h = [];
    }).pause();
    return function(_) {
      d.length || f.restart(!0), d.push(_.trigger), h.push(_), n <= d.length && f.progress(1);
    };
  }, a;
  for (a in t)
    e[a] = a.substr(0, 2) === "on" && qt(t[a]) && a !== "onRefreshInit" ? o(a, t[a]) : t[a];
  return qt(n) && (n = n(), Dt(X, "refresh", function() {
    return n = t.batchMax();
  })), sn(s).forEach(function(l) {
    var u = {};
    for (a in e)
      u[a] = e[a];
    u.trigger = l, i.push(X.create(u));
  }), i;
};
var Bo = function(t, i, e, r) {
  return i > r ? t(r) : i < 0 && t(0), e > r ? (r - i) / (e - i) : e < 0 ? i / (i - e) : 1;
}, ls = function s(t, i) {
  i === !0 ? t.style.removeProperty("touch-action") : t.style.touchAction = i === !0 ? "auto" : i ? "pan-" + i + (wt.isTouch ? " pinch-zoom" : "") : "none", t === ve && s(J, i);
}, Sn = {
  auto: 1,
  scroll: 1
}, Ju = function(t) {
  var i = t.event, e = t.target, r = t.axis, n = (i.changedTouches ? i.changedTouches[0] : i).target, o = n._gsap || D.core.getCache(n), a = Vt(), l;
  if (!o._isScrollT || a - o._isScrollT > 2e3) {
    for (; n && n !== J && (n.scrollHeight <= n.clientHeight && n.scrollWidth <= n.clientWidth || !(Sn[(l = Oe(n)).overflowY] || Sn[l.overflowX])); )
      n = n.parentNode;
    o._isScroll = n && n !== e && !Ki(n) && (Sn[(l = Oe(n)).overflowY] || Sn[l.overflowX]), o._isScrollT = a;
  }
  (o._isScroll || r === "x") && (i.stopPropagation(), i._gsapAllow = !0);
}, _l = function(t, i, e, r) {
  return wt.create({
    target: t,
    capture: !0,
    debounce: !1,
    lockAxis: !0,
    type: i,
    onWheel: r = r && Ju,
    onPress: r,
    onDrag: r,
    onScroll: r,
    onEnable: function() {
      return e && Dt(tt, wt.eventTypes[0], Wo, !1, !0);
    },
    onDisable: function() {
      return Mt(tt, wt.eventTypes[0], Wo, !0);
    }
  });
}, tc = /(input|label|select|textarea)/i, Xo, Wo = function(t) {
  var i = tc.test(t.target.tagName);
  (i || Xo) && (t._gsapAllow = !0, Xo = i);
}, ec = function(t) {
  Ii(t) || (t = {}), t.preventDefault = t.isNormalizer = t.allowClicks = !0, t.type || (t.type = "wheel,touch"), t.debounce = !!t.debounce, t.id = t.id || "normalizer";
  var i = t, e = i.normalizeScrollX, r = i.momentum, n = i.allowNestedScroll, o = i.onRelease, a, l, u = se(t.target) || ve, c = D.core.globals().ScrollSmoother, d = c && c.get(), h = _i && (t.content && se(t.content) || d && t.content !== !1 && !d.smooth() && d.content()), f = Pi(u, Pt), _ = Pi(u, re), p = 1, g = (wt.isTouch && W.visualViewport ? W.visualViewport.scale * W.visualViewport.width : W.outerWidth) / W.innerWidth, b = 0, w = qt(r) ? function() {
    return r(a);
  } : function() {
    return r || 2.8;
  }, T, v, S = _l(u, t.type, !0, n), P = function() {
    return v = !1;
  }, x = Ve, E = Ve, C = function() {
    l = $e(u, Pt), E = Hr(_i ? 1 : 0, l), e && (x = Hr(0, $e(u, re))), T = Gi;
  }, k = function() {
    h._gsap.y = zr(parseFloat(h._gsap.y) + f.offset) + "px", h.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(h._gsap.y) + ", 0, 1)", f.offset = f.cacheID = 0;
  }, Y = function() {
    if (v) {
      requestAnimationFrame(P);
      var Q = zr(a.deltaY / 2), et = E(f.v - Q);
      if (h && et !== f.v + f.offset) {
        f.offset = et - f.v;
        var m = zr((parseFloat(h && h._gsap.y) || 0) - f.offset);
        h.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + m + ", 0, 1)", h._gsap.y = m + "px", f.cacheID = H.cache, si();
      }
      return !0;
    }
    f.offset && k(), v = !0;
  }, M, G, F, K, U = function() {
    C(), M.isActive() && M.vars.scrollY > l && (f() > l ? M.progress(1) && f(l) : M.resetTo("scrollY", l));
  };
  return h && D.set(h, {
    y: "+=0"
  }), t.ignoreCheck = function(A) {
    return _i && A.type === "touchmove" && Y() || p > 1.05 && A.type !== "touchstart" || a.isGesturing || A.touches && A.touches.length > 1;
  }, t.onPress = function() {
    v = !1;
    var A = p;
    p = zr((W.visualViewport && W.visualViewport.scale || 1) / g), M.pause(), A !== p && ls(u, p > 1.01 ? !0 : e ? !1 : "x"), G = _(), F = f(), C(), T = Gi;
  }, t.onRelease = t.onGestureStart = function(A, Q) {
    if (f.offset && k(), !Q)
      K.restart(!0);
    else {
      H.cache++;
      var et = w(), m, st;
      e && (m = _(), st = m + et * 0.05 * -A.velocityX / 0.227, et *= Bo(_, m, st, $e(u, re)), M.vars.scrollX = x(st)), m = f(), st = m + et * 0.05 * -A.velocityY / 0.227, et *= Bo(f, m, st, $e(u, Pt)), M.vars.scrollY = E(st), M.invalidate().duration(et).play(0.01), (_i && M.vars.scrollY >= l || m >= l - 1) && D.to({}, {
        onUpdate: U,
        duration: et
      });
    }
    o && o(A);
  }, t.onWheel = function() {
    M._ts && M.pause(), Vt() - b > 1e3 && (T = 0, b = Vt());
  }, t.onChange = function(A, Q, et, m, st) {
    if (Gi !== T && C(), Q && e && _(x(m[2] === Q ? G + (A.startX - A.x) : _() + Q - m[1])), et) {
      f.offset && k();
      var Gt = st[2] === et, Ae = Gt ? F + A.startY - A.y : f() + et - st[1], ht = E(Ae);
      Gt && Ae !== ht && (F += ht - Ae), f(ht);
    }
    (et || Q) && si();
  }, t.onEnable = function() {
    ls(u, e ? !1 : "x"), X.addEventListener("refresh", U), Dt(W, "resize", U), f.smooth && (f.target.style.scrollBehavior = "auto", f.smooth = _.smooth = !1), S.enable();
  }, t.onDisable = function() {
    ls(u, !0), Mt(W, "resize", U), X.removeEventListener("refresh", U), S.kill();
  }, t.lockAxis = t.lockAxis !== !1, a = new wt(t), a.iOS = _i, _i && !f() && f(1), _i && D.ticker.add(Ve), K = a._dc, M = D.to(a, {
    ease: "power4",
    paused: !0,
    inherit: !1,
    scrollX: e ? "+=0.1" : "+=0",
    scrollY: "+=0.1",
    modifiers: {
      scrollY: pl(f, f(), function() {
        return M.pause();
      })
    },
    onUpdate: si,
    onComplete: K.vars.onComplete
  }), a;
};
X.sort = function(s) {
  if (qt(s))
    return B.sort(s);
  var t = W.pageYOffset || 0;
  return X.getAll().forEach(function(i) {
    return i._sortY = i.trigger ? t + i.trigger.getBoundingClientRect().top : i.start + W.innerHeight;
  }), B.sort(s || function(i, e) {
    return (i.vars.refreshPriority || 0) * -1e6 + (i.vars.containerAnimation ? 1e6 : i._sortY) - ((e.vars.containerAnimation ? 1e6 : e._sortY) + (e.vars.refreshPriority || 0) * -1e6);
  });
};
X.observe = function(s) {
  return new wt(s);
};
X.normalizeScroll = function(s) {
  if (typeof s > "u")
    return te;
  if (s === !0 && te)
    return te.enable();
  if (s === !1) {
    te && te.kill(), te = s;
    return;
  }
  var t = s instanceof wt ? s : ec(s);
  return te && te.target === t.target && te.kill(), Ki(t.target) && (te = t), t;
};
X.core = {
  // smaller file size way to leverage in ScrollSmoother and Observer
  _getVelocityProp: ks,
  _inputObserver: _l,
  _scrollers: H,
  _proxies: Ge,
  bridge: {
    // when normalizeScroll sets the scroll position (ss = setScroll)
    ss: function() {
      Re || Zi("scrollStart"), Re = Vt();
    },
    // a way to get the _refreshing value in Observer
    ref: function() {
      return Ht;
    }
  }
};
rl() && D.registerPlugin(X);
function ic() {
  const s = document.getElementById("heroFilm"), t = document.querySelector(".hero-fallback"), i = document.querySelector(".hero-pin"), e = document.querySelector(".hero-copy");
  if (!s || !i) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    i.classList.add("is-still"), s.querySelectorAll("source").forEach((g) => g.remove()), s.removeAttribute("src"), s.load(), s.remove(), t?.classList.add("is-locked");
    return;
  }
  s.muted = !0, s.defaultMuted = !0, s.playsInline = !0, s.setAttribute("playsinline", ""), s.setAttribute("webkit-playsinline", "true"), s.setAttribute("muted", ""), s.preload = "auto";
  const n = /iP(hone|ad|od)/i.test(navigator.userAgent) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1, o = window.matchMedia("(pointer: coarse)").matches && window.matchMedia("(max-width: 900px)").matches, a = window.matchMedia("(max-width: 760px)").matches, l = n || o || a;
  let u = !1, c = !1;
  const d = () => {
    c || !u || s.videoWidth < 2 || (c = !0, s.classList.add("is-ready"), t?.classList.add("is-behind"));
  }, h = () => {
    u = !0, typeof s.requestVideoFrameCallback == "function" && s.requestVideoFrameCallback(() => d()), d();
  };
  s.addEventListener("playing", d), s.addEventListener("timeupdate", d), s.addEventListener("seeked", d), s.addEventListener("error", () => {
    c = !1, s.classList.remove("is-ready"), t?.classList.remove("is-behind");
  });
  const f = () => {
    const g = s.play();
    g && typeof g.then == "function" ? g.then(h).catch(() => {
    }) : h();
  };
  if (l) {
    i.classList.add("is-phone-loop"), s.loop = !0, s.autoplay = !0, s.setAttribute("loop", ""), s.setAttribute("autoplay", ""), s.readyState >= 2 ? f() : s.addEventListener("canplay", f, { once: !0 }), document.addEventListener("touchstart", f, { once: !0, passive: !0 }), document.addEventListener("click", f, { once: !0 });
    return;
  }
  Ui.registerPlugin(X);
  const _ = async () => {
    try {
      await s.play(), h(), s.pause();
    } catch {
    }
  };
  s.readyState >= 2 ? _() : s.addEventListener("loadeddata", _, { once: !0 });
  const p = () => {
    const g = s.duration;
    !Number.isFinite(g) || g < 0.2 || (Ui.to(s, {
      currentTime: g - 0.04,
      ease: "none",
      scrollTrigger: {
        trigger: i,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        invalidateOnRefresh: !0
      }
    }), e && Ui.to(e, {
      opacity: 0,
      y: 24,
      ease: "none",
      scrollTrigger: {
        trigger: i,
        start: "top top",
        end: "center top",
        scrub: 1
      }
    }));
  };
  s.readyState >= 1 ? p() : s.addEventListener("loadedmetadata", p, { once: !0 });
}
var Ho = "1.3.26";
function gl(s, t, i) {
  return Math.max(s, Math.min(t, i));
}
function rc(s, t, i) {
  return (1 - i) * s + i * t;
}
function nc(s, t, i, e) {
  return rc(s, t, 1 - Math.exp(-i * e));
}
function sc(s, t) {
  return (s % t + t) % t;
}
var oc = class {
  isRunning = !1;
  value = 0;
  from = 0;
  to = 0;
  currentTime = 0;
  lerp;
  duration;
  easing;
  onUpdate;
  /**
  * Advance the animation by the given delta time
  *
  * @param deltaTime - The time in seconds to advance the animation
  */
  advance(s) {
    if (!this.isRunning) return;
    let t = !1;
    if (this.duration && this.easing) {
      this.currentTime += s;
      const i = gl(0, this.currentTime / this.duration, 1);
      t = i >= 1;
      const e = t ? 1 : this.easing(i);
      this.value = this.from + (this.to - this.from) * e;
    } else this.lerp ? (this.value = nc(this.value, this.to, this.lerp * 60, s), Math.round(this.value) === Math.round(this.to) && (this.value = this.to, t = !0)) : (this.value = this.to, t = !0);
    t && this.stop(), this.onUpdate?.(this.value, t);
  }
  /** Stop the animation */
  stop() {
    this.isRunning = !1;
  }
  /**
  * Set up the animation from a starting value to an ending value
  * with optional parameters for lerping, duration, easing, and onUpdate callback
  *
  * @param from - The starting value
  * @param to - The ending value
  * @param options - Options for the animation
  */
  fromTo(s, t, { lerp: i, duration: e, easing: r, onStart: n, onUpdate: o }) {
    this.from = this.value = s, this.to = t, this.lerp = i, this.duration = e, this.easing = r, this.currentTime = 0, this.isRunning = !0, n?.(), this.onUpdate = o;
  }
};
function ac(s, t) {
  let i;
  return function(...e) {
    clearTimeout(i), i = setTimeout(() => {
      i = void 0, s.apply(this, e);
    }, t);
  };
}
var lc = class {
  width = 0;
  height = 0;
  scrollHeight = 0;
  scrollWidth = 0;
  debouncedResize;
  wrapperResizeObserver;
  contentResizeObserver;
  constructor(s, t, { autoResize: i = !0, debounce: e = 250 } = {}) {
    this.wrapper = s, this.content = t, i && (this.debouncedResize = ac(this.resize, e), this.wrapper instanceof Window ? window.addEventListener("resize", this.debouncedResize) : (this.wrapperResizeObserver = new ResizeObserver(this.debouncedResize), this.wrapperResizeObserver.observe(this.wrapper)), this.contentResizeObserver = new ResizeObserver(this.debouncedResize), this.contentResizeObserver.observe(this.content)), this.resize();
  }
  destroy() {
    this.wrapperResizeObserver?.disconnect(), this.contentResizeObserver?.disconnect(), this.wrapper === window && this.debouncedResize && window.removeEventListener("resize", this.debouncedResize);
  }
  resize = () => {
    this.onWrapperResize(), this.onContentResize();
  };
  onWrapperResize = () => {
    this.wrapper instanceof Window ? (this.width = window.innerWidth, this.height = window.innerHeight) : (this.width = this.wrapper.clientWidth, this.height = this.wrapper.clientHeight);
  };
  onContentResize = () => {
    this.wrapper instanceof Window ? (this.scrollHeight = this.content.scrollHeight, this.scrollWidth = this.content.scrollWidth) : (this.scrollHeight = this.wrapper.scrollHeight, this.scrollWidth = this.wrapper.scrollWidth);
  };
  get limit() {
    return {
      x: this.scrollWidth - this.width,
      y: this.scrollHeight - this.height
    };
  }
}, ml = class {
  events = {};
  /**
  * Emit an event with the given data
  * @param event Event name
  * @param args Data to pass to the event handlers
  */
  emit(s, ...t) {
    const i = this.events[s] || [];
    for (let e = 0, r = i.length; e < r; e++) i[e]?.(...t);
  }
  /**
  * Add a callback to the event
  * @param event Event name
  * @param cb Callback function
  * @returns Unsubscribe function
  */
  on(s, t) {
    return this.events[s] ? this.events[s].push(t) : this.events[s] = [t], () => {
      this.events[s] = this.events[s]?.filter((i) => t !== i);
    };
  }
  /**
  * Remove a callback from the event
  * @param event Event name
  * @param callback Callback function
  */
  off(s, t) {
    this.events[s] = this.events[s]?.filter((i) => t !== i);
  }
  /**
  * Remove all event listeners and clean up
  */
  destroy() {
    this.events = {};
  }
};
const uc = 100 / 6, pi = { passive: !1 };
function Vo(s, t) {
  return s === 1 ? uc : s === 2 ? t : 1;
}
var cc = class {
  touchStart = {
    x: 0,
    y: 0
  };
  lastDelta = {
    x: 0,
    y: 0
  };
  window = {
    width: 0,
    height: 0
  };
  emitter = new ml();
  constructor(s, t = {
    wheelMultiplier: 1,
    touchMultiplier: 1
  }) {
    this.element = s, this.options = t, window.addEventListener("resize", this.onWindowResize), this.onWindowResize(), this.element.addEventListener("wheel", this.onWheel, pi), this.element.addEventListener("touchstart", this.onTouchStart, pi), this.element.addEventListener("touchmove", this.onTouchMove, pi), this.element.addEventListener("touchend", this.onTouchEnd, pi);
  }
  /**
  * Add an event listener for the given event and callback
  *
  * @param event Event name
  * @param callback Callback function
  */
  on(s, t) {
    return this.emitter.on(s, t);
  }
  /** Remove all event listeners and clean up */
  destroy() {
    this.emitter.destroy(), window.removeEventListener("resize", this.onWindowResize), this.element.removeEventListener("wheel", this.onWheel, pi), this.element.removeEventListener("touchstart", this.onTouchStart, pi), this.element.removeEventListener("touchmove", this.onTouchMove, pi), this.element.removeEventListener("touchend", this.onTouchEnd, pi);
  }
  /**
  * Event handler for 'touchstart' event
  *
  * @param event Touch event
  */
  onTouchStart = (s) => {
    const { clientX: t, clientY: i } = s.targetTouches ? s.targetTouches[0] : s;
    this.touchStart.x = t, this.touchStart.y = i, this.lastDelta = {
      x: 0,
      y: 0
    }, this.emitter.emit("scroll", {
      deltaX: 0,
      deltaY: 0,
      event: s
    });
  };
  /** Event handler for 'touchmove' event */
  onTouchMove = (s) => {
    const { clientX: t, clientY: i } = s.targetTouches ? s.targetTouches[0] : s, e = -(t - this.touchStart.x) * this.options.touchMultiplier, r = -(i - this.touchStart.y) * this.options.touchMultiplier;
    this.touchStart.x = t, this.touchStart.y = i, this.lastDelta = {
      x: e,
      y: r
    }, this.emitter.emit("scroll", {
      deltaX: e,
      deltaY: r,
      event: s
    });
  };
  onTouchEnd = (s) => {
    this.emitter.emit("scroll", {
      deltaX: this.lastDelta.x,
      deltaY: this.lastDelta.y,
      event: s
    });
  };
  /** Event handler for 'wheel' event */
  onWheel = (s) => {
    let { deltaX: t, deltaY: i, deltaMode: e } = s;
    const r = Vo(e, this.window.width), n = Vo(e, this.window.height);
    t *= r, i *= n, t *= this.options.wheelMultiplier, i *= this.options.wheelMultiplier, this.emitter.emit("scroll", {
      deltaX: t,
      deltaY: i,
      event: s
    });
  };
  onWindowResize = () => {
    this.window = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  };
};
const Uo = (s) => Math.min(1, 1.001 - 2 ** (-10 * s));
var fc = class {
  _isScrolling = !1;
  _isStopped = !1;
  _isLocked = !1;
  _preventNextNativeScrollEvent = !1;
  _resetVelocityTimeout = null;
  _rafId = null;
  _isDraggingSelection = !1;
  reducedMotionMediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  /**
  * Whether or not the user is touching the screen
  */
  isTouching;
  /**
  * Whether or not the device is running iOS
  */
  isIos;
  /**
  * The time in ms since the lenis instance was created
  */
  time = 0;
  /**
  * User data that will be forwarded through the scroll event
  *
  * @example
  * lenis.scrollTo(100, {
  *   userData: {
  *     foo: 'bar'
  *   }
  * })
  */
  userData = {};
  /**
  * The last velocity of the scroll
  */
  lastVelocity = 0;
  /**
  * The current velocity of the scroll
  */
  velocity = 0;
  /**
  * The direction of the scroll
  */
  direction = 0;
  /**
  * The options passed to the lenis instance
  */
  options;
  /**
  * The target scroll value
  */
  targetScroll;
  /**
  * The animated scroll value
  */
  animatedScroll;
  animate = new oc();
  emitter = new ml();
  dimensions;
  virtualScroll;
  constructor({ wrapper: s = window, content: t = document.documentElement, eventsTarget: i = s, smoothWheel: e = !0, syncTouch: r = !1, syncTouchLerp: n = 0.075, touchInertiaExponent: o = 1.7, duration: a, easing: l, lerp: u = 0.1, infinite: c = !1, orientation: d = "vertical", gestureOrientation: h = d === "horizontal" ? "both" : "vertical", touchMultiplier: f = 1, wheelMultiplier: _ = 1, autoResize: p = !0, prevent: g, virtualScroll: b, overscroll: w = !0, autoRaf: T = !1, anchors: v = !1, autoToggle: S = !1, allowNestedScroll: P = !1, __experimental__naiveDimensions: x = !1, naiveDimensions: E = x, stopInertiaOnNavigate: C = !1, respectReducedMotion: k = !0 } = {}) {
    window.lenisVersion = Ho, window.lenis || (window.lenis = {}), window.lenis.version = Ho, d === "horizontal" && (window.lenis.horizontal = !0), r === !0 && (window.lenis.touch = !0), this.isIos = /(iPad|iPhone|iPod)/g.test(navigator.userAgent), (!s || s === document.documentElement) && (s = window), typeof a == "number" && typeof l != "function" ? l = Uo : typeof l == "function" && typeof a != "number" && (a = 1), this.options = {
      wrapper: s,
      content: t,
      eventsTarget: i,
      smoothWheel: e,
      syncTouch: r,
      syncTouchLerp: n,
      touchInertiaExponent: o,
      duration: a,
      easing: l,
      lerp: u,
      infinite: c,
      gestureOrientation: h,
      orientation: d,
      touchMultiplier: f,
      wheelMultiplier: _,
      autoResize: p,
      prevent: g,
      virtualScroll: b,
      overscroll: w,
      autoRaf: T,
      anchors: v,
      autoToggle: S,
      allowNestedScroll: P,
      naiveDimensions: E,
      stopInertiaOnNavigate: C,
      respectReducedMotion: k
    }, this.dimensions = new lc(s, t, { autoResize: p }), this.updateClassName(), this.targetScroll = this.animatedScroll = this.actualScroll, this.options.wrapper.addEventListener("scroll", this.onNativeScroll), this.options.wrapper.addEventListener("scrollend", this.onScrollEnd, { capture: !0 }), (this.options.anchors || this.options.stopInertiaOnNavigate) && this.options.wrapper.addEventListener("click", this.onClick), this.options.wrapper.addEventListener("pointerdown", this.onPointerDown), this.virtualScroll = new cc(i, {
      touchMultiplier: f,
      wheelMultiplier: _
    }), this.virtualScroll.on("scroll", this.onVirtualScroll), this.options.autoToggle && (this.checkOverflow(), this.rootElement.addEventListener("transitionend", this.onTransitionEnd)), this.options.autoRaf && (this._rafId = requestAnimationFrame(this.raf));
  }
  /**
  * Destroy the lenis instance, remove all event listeners and clean up the class name
  */
  destroy() {
    this.emitter.destroy(), this.options.wrapper.removeEventListener("scroll", this.onNativeScroll), this.options.wrapper.removeEventListener("scrollend", this.onScrollEnd, { capture: !0 }), this.options.wrapper.removeEventListener("pointerdown", this.onPointerDown), (this.options.anchors || this.options.stopInertiaOnNavigate) && this.options.wrapper.removeEventListener("click", this.onClick), this.virtualScroll.destroy(), this.dimensions.destroy(), this.cleanUpClassName(), this._rafId && cancelAnimationFrame(this._rafId);
  }
  on(s, t) {
    return this.emitter.on(s, t);
  }
  off(s, t) {
    return this.emitter.off(s, t);
  }
  onScrollEnd = (s) => {
    s instanceof CustomEvent || (this.isScrolling === "smooth" || this.isScrolling === !1) && s.stopPropagation();
  };
  dispatchScrollendEvent = () => {
    this.options.wrapper.dispatchEvent(new CustomEvent("scrollend", {
      bubbles: this.options.wrapper === window,
      detail: { lenisScrollEnd: !0 }
    }));
  };
  get overflow() {
    const s = this.isHorizontal ? "overflow-x" : "overflow-y";
    return getComputedStyle(this.rootElement)[s];
  }
  checkOverflow() {
    ["hidden", "clip"].includes(this.overflow) ? this.internalStop() : this.internalStart();
  }
  onTransitionEnd = (s) => {
    s.propertyName?.includes("overflow") && s.target === this.rootElement && this.checkOverflow();
  };
  setScroll(s) {
    this.isHorizontal ? this.options.wrapper.scrollTo({
      left: s,
      behavior: "instant"
    }) : this.options.wrapper.scrollTo({
      top: s,
      behavior: "instant"
    });
  }
  onClick = (s) => {
    const t = s.composedPath().filter((e) => e instanceof HTMLAnchorElement && e.href).map((e) => new URL(e.href)), i = new URL(window.location.href);
    if (this.options.anchors) {
      const e = t.find((r) => i.host === r.host && i.pathname === r.pathname && r.hash);
      if (e) {
        const r = typeof this.options.anchors == "object" && this.options.anchors ? this.options.anchors : void 0, n = decodeURIComponent(e.hash);
        this.scrollTo(n, r);
        return;
      }
    }
    if (this.options.stopInertiaOnNavigate && t.some((e) => i.host === e.host && i.pathname !== e.pathname)) {
      this.reset();
      return;
    }
  };
  onPointerDown = (s) => {
    s.button === 1 && this.reset();
  };
  isTouchOnSelectionHandle(s) {
    const t = window.getSelection();
    if (!t || t.isCollapsed || t.rangeCount === 0) return !1;
    const i = s.targetTouches[0] ?? s.changedTouches[0];
    if (!i) return !1;
    const e = t.getRangeAt(0).getClientRects();
    if (e.length === 0) return !1;
    const r = e[0], n = e[e.length - 1], o = 40, a = Math.hypot(i.clientX - r.left, i.clientY - r.top) <= o, l = Math.hypot(i.clientX - n.right, i.clientY - n.bottom) <= o;
    return a || l;
  }
  onVirtualScroll = (s) => {
    if (typeof this.options.virtualScroll == "function" && this.options.virtualScroll(s) === !1) return;
    const { deltaX: t, deltaY: i, event: e } = s;
    if (this.emitter.emit("virtual-scroll", {
      deltaX: t,
      deltaY: i,
      event: e
    }), e.ctrlKey || e.lenisStopPropagation) return;
    const r = e.type.includes("touch"), n = e.type.includes("wheel");
    if (r && this.isIos && (e.type === "touchstart" && (this._isDraggingSelection = this.isTouchOnSelectionHandle(e)), this._isDraggingSelection)) {
      e.type === "touchend" && (this._isDraggingSelection = !1);
      return;
    }
    this.isTouching = e.type === "touchstart" || e.type === "touchmove";
    const o = t === 0 && i === 0;
    if (this.options.syncTouch && r && e.type === "touchstart" && o && !this.isStopped && !this.isLocked) {
      this.reset();
      return;
    }
    const a = this.options.gestureOrientation === "vertical" && i === 0 || this.options.gestureOrientation === "horizontal" && t === 0;
    if (o || a) return;
    let l = e.composedPath();
    l = l.slice(0, l.indexOf(this.rootElement));
    const u = this.options.prevent, c = Math.abs(t) >= Math.abs(i) ? "horizontal" : "vertical";
    if (l.find((_) => _ instanceof HTMLElement && (typeof u == "function" && u?.(_) || _.hasAttribute?.("data-lenis-prevent") || c === "vertical" && _.hasAttribute?.("data-lenis-prevent-vertical") || c === "horizontal" && _.hasAttribute?.("data-lenis-prevent-horizontal") || r && _.hasAttribute?.("data-lenis-prevent-touch") || n && _.hasAttribute?.("data-lenis-prevent-wheel") || this.options.allowNestedScroll && this.hasNestedScroll(_, {
      deltaX: t,
      deltaY: i
    })))) return;
    if (this.isStopped || this.isLocked) {
      e.cancelable && e.preventDefault();
      return;
    }
    if (!(this.options.syncTouch && r || this.options.smoothWheel && n)) {
      this.isScrolling = "native", this.animate.stop(), e.lenisStopPropagation = !0;
      return;
    }
    let d = i;
    this.options.gestureOrientation === "both" ? d = Math.abs(i) > Math.abs(t) ? i : t : this.options.gestureOrientation === "horizontal" && (d = t), (!this.options.overscroll || this.options.infinite || this.options.wrapper !== window && this.limit > 0 && (this.animatedScroll > 0 && this.animatedScroll < this.limit || this.animatedScroll === 0 && i > 0 || this.animatedScroll === this.limit && i < 0)) && (e.lenisStopPropagation = !0), e.cancelable && e.preventDefault();
    const h = r && this.options.syncTouch, f = r && e.type === "touchend";
    f && (d = Math.sign(d) * Math.abs(this.velocity) ** this.options.touchInertiaExponent), this.scrollTo(this.targetScroll + d, {
      programmatic: !1,
      ...h ? { lerp: f ? this.options.syncTouchLerp : 1 } : {
        lerp: this.options.lerp,
        duration: this.options.duration,
        easing: this.options.easing
      }
    });
  };
  /**
  * Force lenis to recalculate the dimensions
  */
  resize() {
    this.dimensions.resize(), this.animatedScroll = this.targetScroll = this.actualScroll, this.emit();
  }
  emit() {
    this.emitter.emit("scroll", this);
  }
  onNativeScroll = () => {
    if (this._resetVelocityTimeout !== null && (clearTimeout(this._resetVelocityTimeout), this._resetVelocityTimeout = null), this._preventNextNativeScrollEvent) {
      this._preventNextNativeScrollEvent = !1;
      return;
    }
    if (this.isScrolling === !1 || this.isScrolling === "native") {
      const s = this.animatedScroll;
      this.animatedScroll = this.targetScroll = this.actualScroll, this.lastVelocity = this.velocity, this.velocity = this.animatedScroll - s, this.direction = Math.sign(this.animatedScroll - s), this.isStopped || (this.isScrolling = "native"), this.emit(), this.velocity !== 0 && (this._resetVelocityTimeout = setTimeout(() => {
        this.lastVelocity = this.velocity, this.velocity = 0, this.isScrolling = !1, this.emit();
      }, 400));
    }
  };
  reset() {
    this.isLocked = !1, this.isScrolling = !1, this.animatedScroll = this.targetScroll = this.actualScroll, this.lastVelocity = this.velocity = 0, this.animate.stop();
  }
  /**
  * Start lenis scroll after it has been stopped
  */
  start() {
    if (this.isStopped) {
      if (this.options.autoToggle) {
        this.rootElement.style.removeProperty("overflow");
        return;
      }
      this.internalStart();
    }
  }
  internalStart() {
    this.isStopped && (this.reset(), this.isStopped = !1, this.emit());
  }
  /**
  * Stop lenis scroll
  */
  stop() {
    if (!this.isStopped) {
      if (this.options.autoToggle) {
        this.rootElement.style.setProperty("overflow", "clip");
        return;
      }
      this.internalStop();
    }
  }
  internalStop() {
    this.isStopped || (this.reset(), this.isStopped = !0, this.emit());
  }
  /**
  * RequestAnimationFrame for lenis
  *
  * @param time The time in ms from an external clock like `requestAnimationFrame` or Tempus
  */
  raf = (s) => {
    const t = s - (this.time || s);
    this.time = s, this.animate.advance(t * 1e-3), this.options.autoRaf && (this._rafId = requestAnimationFrame(this.raf));
  };
  /**
  * Scroll to a target value
  *
  * @param target The target value to scroll to
  * @param options The options for the scroll
  *
  * @example
  * lenis.scrollTo(100, {
  *   offset: 100,
  *   duration: 1,
  *   easing: (t) => 1 - Math.cos((t * Math.PI) / 2),
  *   lerp: 0.1,
  *   onStart: () => {
  *     console.log('onStart')
  *   },
  *   onComplete: () => {
  *     console.log('onComplete')
  *   },
  * })
  */
  scrollTo(s, { offset: t = 0, immediate: i = !1, lock: e = !1, programmatic: r = !0, lerp: n = r ? this.options.lerp : void 0, duration: o = r ? this.options.duration : void 0, easing: a = r ? this.options.easing : void 0, onStart: l, onComplete: u, force: c = !1, userData: d } = {}) {
    if (this.prefersReducedMotion && (r ? i = !0 : (n = 1, o = void 0, a = void 0)), (this.isStopped || this.isLocked) && !c) return;
    let h = s, f = t;
    if (typeof h == "string" && [
      "top",
      "left",
      "start",
      "#"
    ].includes(h)) h = 0;
    else if (typeof h == "string" && [
      "bottom",
      "right",
      "end"
    ].includes(h)) h = this.limit;
    else {
      let _ = null;
      if (typeof h == "string" ? (_ = h.startsWith("#") ? document.getElementById(h.slice(1)) : document.querySelector(h), _ || (h === "#top" ? h = 0 : console.warn("Lenis: Target not found", h))) : h instanceof HTMLElement && h?.nodeType && (_ = h), _) {
        if (this.options.wrapper !== window) {
          const v = this.rootElement.getBoundingClientRect();
          f -= this.isHorizontal ? v.left : v.top;
        }
        const p = _.getBoundingClientRect(), g = getComputedStyle(_), b = this.isHorizontal ? Number.parseFloat(g.scrollMarginLeft) : Number.parseFloat(g.scrollMarginTop), w = getComputedStyle(this.rootElement), T = this.isHorizontal ? Number.parseFloat(w.scrollPaddingLeft) : Number.parseFloat(w.scrollPaddingTop);
        h = (this.isHorizontal ? p.left : p.top) + this.animatedScroll - (Number.isNaN(b) ? 0 : b) - (Number.isNaN(T) ? 0 : T);
      }
    }
    if (typeof h == "number") {
      if (h += f, this.options.infinite) {
        if (r) {
          this.targetScroll = this.animatedScroll = this.scroll;
          const _ = h - this.animatedScroll;
          _ > this.limit / 2 ? h -= this.limit : _ < -this.limit / 2 && (h += this.limit);
        }
      } else h = gl(0, h, this.limit);
      if (h === this.targetScroll) {
        l?.(this), u?.(this);
        return;
      }
      if (this.userData = d ?? {}, i) {
        this.animatedScroll = this.targetScroll = h, this.setScroll(this.scroll), this.reset(), this.preventNextNativeScrollEvent(), this.emit(), u?.(this), this.userData = {}, requestAnimationFrame(() => {
          this.dispatchScrollendEvent();
        });
        return;
      }
      r || (this.targetScroll = h), typeof o == "number" && typeof a != "function" ? a = Uo : typeof a == "function" && typeof o != "number" && (o = 1), this.animate.fromTo(this.animatedScroll, h, {
        duration: o,
        easing: a,
        lerp: n,
        onStart: () => {
          e && (this.isLocked = !0), this.isScrolling = "smooth", l?.(this);
        },
        onUpdate: (_, p) => {
          this.isScrolling = "smooth", this.lastVelocity = this.velocity, this.velocity = _ - this.animatedScroll, this.direction = Math.sign(this.velocity), this.animatedScroll = _, this.setScroll(this.scroll), r && (this.targetScroll = _), p || this.emit(), p && (this.reset(), this.emit(), u?.(this), this.userData = {}, requestAnimationFrame(() => {
            this.dispatchScrollendEvent();
          }), this.preventNextNativeScrollEvent());
        }
      });
    }
  }
  preventNextNativeScrollEvent() {
    this._preventNextNativeScrollEvent = !0, requestAnimationFrame(() => {
      this._preventNextNativeScrollEvent = !1;
    });
  }
  hasNestedScroll(s, { deltaX: t, deltaY: i }) {
    const e = Date.now();
    s._lenis || (s._lenis = {});
    const r = s._lenis;
    let n, o, a, l, u, c, d, h, f, _;
    if (e - (r.time ?? 0) > 2e3) {
      r.time = Date.now();
      const P = window.getComputedStyle(s);
      if (r.computedStyle = P, n = [
        "auto",
        "overlay",
        "scroll"
      ].includes(P.overflowX), o = [
        "auto",
        "overlay",
        "scroll"
      ].includes(P.overflowY), u = ["auto"].includes(P.overscrollBehaviorX), c = ["auto"].includes(P.overscrollBehaviorY), r.hasOverflowX = n, r.hasOverflowY = o, !(n || o)) return !1;
      d = s.scrollWidth, h = s.scrollHeight, f = s.clientWidth, _ = s.clientHeight, a = d > f, l = h > _, r.isScrollableX = a, r.isScrollableY = l, r.scrollWidth = d, r.scrollHeight = h, r.clientWidth = f, r.clientHeight = _, r.hasOverscrollBehaviorX = u, r.hasOverscrollBehaviorY = c;
    } else
      a = r.isScrollableX, l = r.isScrollableY, n = r.hasOverflowX, o = r.hasOverflowY, d = r.scrollWidth, h = r.scrollHeight, f = r.clientWidth, _ = r.clientHeight, u = r.hasOverscrollBehaviorX, c = r.hasOverscrollBehaviorY;
    if (!(n && a || o && l)) return !1;
    const p = Math.abs(t) >= Math.abs(i) ? "horizontal" : "vertical";
    let g, b, w, T, v, S;
    if (p === "horizontal")
      g = Math.round(s.scrollLeft), b = d - f, w = t, T = n, v = a, S = u;
    else if (p === "vertical")
      g = Math.round(s.scrollTop), b = h - _, w = i, T = o, v = l, S = c;
    else return !1;
    return !S && (g >= b || g <= 0) ? !0 : (w > 0 ? g < b : g > 0) && T && v;
  }
  /**
  * The root element on which lenis is instanced
  */
  get rootElement() {
    return this.options.wrapper === window ? document.documentElement : this.options.wrapper;
  }
  /**
  * The limit which is the maximum scroll value
  */
  get limit() {
    return this.options.naiveDimensions ? this.isHorizontal ? this.rootElement.scrollWidth - this.rootElement.clientWidth : this.rootElement.scrollHeight - this.rootElement.clientHeight : this.dimensions.limit[this.isHorizontal ? "x" : "y"];
  }
  /**
  * Whether or not the scroll is horizontal
  */
  get isHorizontal() {
    return this.options.orientation === "horizontal";
  }
  /**
  * The actual scroll value
  */
  get actualScroll() {
    const s = this.options.wrapper;
    return this.isHorizontal ? s.scrollX ?? s.scrollLeft : s.scrollY ?? s.scrollTop;
  }
  /**
  * The current scroll value
  */
  get scroll() {
    return this.options.infinite ? sc(this.animatedScroll, this.limit) : this.animatedScroll;
  }
  /**
  * The progress of the scroll relative to the limit
  */
  get progress() {
    return this.limit === 0 ? 1 : this.scroll / this.limit;
  }
  /**
  * Current scroll state
  */
  get isScrolling() {
    return this._isScrolling;
  }
  set isScrolling(s) {
    this._isScrolling !== s && (this._isScrolling = s, this.updateClassName());
  }
  /**
  * Check if lenis is stopped
  */
  get isStopped() {
    return this._isStopped;
  }
  set isStopped(s) {
    this._isStopped !== s && (this._isStopped = s, this.updateClassName());
  }
  /**
  * Check if lenis is locked
  */
  get isLocked() {
    return this._isLocked;
  }
  set isLocked(s) {
    this._isLocked !== s && (this._isLocked = s, this.updateClassName());
  }
  /**
  * Check if lenis is smooth scrolling
  */
  get isSmooth() {
    return this.isScrolling === "smooth";
  }
  /**
  * Whether the user prefers reduced motion and lenis is honoring it (see `respectReducedMotion` option)
  */
  get prefersReducedMotion() {
    return this.options.respectReducedMotion && this.reducedMotionMediaQuery.matches;
  }
  /**
  * The class name applied to the wrapper element
  */
  get className() {
    let s = "lenis";
    return this.options.autoToggle && (s += " lenis-autoToggle"), this.isStopped && (s += " lenis-stopped"), this.isLocked && (s += " lenis-locked"), this.isScrolling && (s += " lenis-scrolling"), this.isScrolling === "smooth" && (s += " lenis-smooth"), s;
  }
  updateClassName() {
    this.cleanUpClassName(), this.className.split(" ").forEach((s) => {
      this.rootElement.classList.add(s);
    });
  }
  cleanUpClassName() {
    for (const s of Array.from(this.rootElement.classList)) (s === "lenis" || s.startsWith("lenis-")) && this.rootElement.classList.remove(s);
  }
};
function hc() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.documentElement.classList.add("reduced-motion");
    return;
  }
  Ui.registerPlugin(X);
  const t = new fc({
    duration: 1.05,
    easing: (i) => Math.min(1, 1.001 - Math.pow(2, -10 * i)),
    smoothWheel: !0
  });
  t.on("scroll", X.update), Ui.ticker.add((i) => t.raf(i * 1e3)), Ui.ticker.lagSmoothing(0);
}
function qo(s = document) {
  s.querySelectorAll("[data-compare]").forEach((t) => {
    const i = t.querySelector(".compare-after"), e = t.querySelector('input[type="range"]');
    if (!i || !e) return;
    const r = (n) => {
      i.style.clipPath = `inset(0 ${100 - n}% 0 0)`, t.style.setProperty("--pos", `${n}%`);
    };
    r(Number(e.value) || 50), e.addEventListener("input", () => r(Number(e.value)));
  });
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", () => qo()) : qo();
function $o() {
  const s = document.getElementById("nav"), t = document.getElementById("navToggle"), i = document.getElementById("navDrawer");
  function e() {
    s && (s.classList.contains("page-nav") || s.classList.toggle("is-solid", (window.scrollY || 0) > 40));
  }
  window.addEventListener("scroll", e, { passive: !0 }), e(), t && i && t.addEventListener("click", () => {
    const r = t.getAttribute("aria-expanded") === "true";
    t.setAttribute("aria-expanded", r ? "false" : "true"), r ? i.setAttribute("hidden", "") : i.removeAttribute("hidden");
  }), dc();
}
function dc() {
  const s = document.querySelector(".sticky-call");
  if (!s) return;
  const t = document.documentElement, i = document.querySelector(".hero-pin"), e = (n) => {
    s.classList.toggle("is-away", n), t.classList.toggle("call-docked", n);
  };
  if (!i || !t.classList.contains("home")) {
    e(!0);
    return;
  }
  if (!("IntersectionObserver" in window)) {
    e(!0);
    return;
  }
  new IntersectionObserver(
    ([n]) => e(!n.isIntersecting),
    { threshold: 0.08 }
  ).observe(i);
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", $o) : $o();
function Go() {
  hc(), ic();
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", Go) : Go();
