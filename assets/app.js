function Tl() {
  const s = document.getElementById("heroFilm"), t = document.querySelector(".hero-fallback"), i = document.querySelector(".hero-pin");
  if (!s || !i) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    i.classList.add("is-still"), s.querySelectorAll("source").forEach((d) => d.remove()), s.removeAttribute("src"), s.load(), s.remove(), t?.classList.add("is-locked");
    return;
  }
  s.muted = !0, s.defaultMuted = !0, s.playsInline = !0, s.setAttribute("playsinline", ""), s.setAttribute("webkit-playsinline", "true"), s.setAttribute("muted", ""), s.preload = "auto";
  let r = !1, n = !1;
  const o = () => {
    n || !r || s.videoWidth < 2 || (n = !0, s.classList.add("is-ready"), t?.classList.add("is-behind"));
  }, a = () => {
    r = !0, typeof s.requestVideoFrameCallback == "function" && s.requestVideoFrameCallback(() => o()), o();
  };
  s.addEventListener("playing", o), s.addEventListener("timeupdate", o), s.addEventListener("seeked", o), s.addEventListener("error", () => {
    n = !1, s.classList.remove("is-ready"), t?.classList.remove("is-behind");
  });
  const l = () => {
    if (r && !s.paused) return;
    const d = s.play();
    d && typeof d.then == "function" ? d.then(a).catch(() => {
    }) : a();
  };
  i.classList.add("is-phone-loop"), s.loop = !0, s.autoplay = !0, s.setAttribute("loop", ""), s.setAttribute("autoplay", "");
  const u = () => {
    r && !s.paused || l();
  }, c = () => {
    document.visibilityState === "visible" && u();
  };
  s.addEventListener("loadeddata", u), s.addEventListener("canplay", u), document.addEventListener("visibilitychange", c), window.addEventListener("pageshow", u), document.addEventListener("touchstart", u, { passive: !0 }), document.addEventListener("click", u), u();
}
var co = "1.3.26";
function ta(s, t, i) {
  return Math.max(s, Math.min(t, i));
}
function Cl(s, t, i) {
  return (1 - i) * s + i * t;
}
function kl(s, t, i, e) {
  return Cl(s, t, 1 - Math.exp(-i * e));
}
function El(s, t) {
  return (s % t + t) % t;
}
var Pl = class {
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
      const i = ta(0, this.currentTime / this.duration, 1);
      t = i >= 1;
      const e = t ? 1 : this.easing(i);
      this.value = this.from + (this.to - this.from) * e;
    } else this.lerp ? (this.value = kl(this.value, this.to, this.lerp * 60, s), Math.round(this.value) === Math.round(this.to) && (this.value = this.to, t = !0)) : (this.value = this.to, t = !0);
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
function Ol(s, t) {
  let i;
  return function(...e) {
    clearTimeout(i), i = setTimeout(() => {
      i = void 0, s.apply(this, e);
    }, t);
  };
}
var Ml = class {
  width = 0;
  height = 0;
  scrollHeight = 0;
  scrollWidth = 0;
  debouncedResize;
  wrapperResizeObserver;
  contentResizeObserver;
  constructor(s, t, { autoResize: i = !0, debounce: e = 250 } = {}) {
    this.wrapper = s, this.content = t, i && (this.debouncedResize = Ol(this.resize, e), this.wrapper instanceof Window ? window.addEventListener("resize", this.debouncedResize) : (this.wrapperResizeObserver = new ResizeObserver(this.debouncedResize), this.wrapperResizeObserver.observe(this.wrapper)), this.contentResizeObserver = new ResizeObserver(this.debouncedResize), this.contentResizeObserver.observe(this.content)), this.resize();
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
}, ea = class {
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
const Rl = 100 / 6, pi = { passive: !1 };
function fo(s, t) {
  return s === 1 ? Rl : s === 2 ? t : 1;
}
var Dl = class {
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
  emitter = new ea();
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
    const r = fo(e, this.window.width), n = fo(e, this.window.height);
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
const ho = (s) => Math.min(1, 1.001 - 2 ** (-10 * s));
var Al = class {
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
  animate = new Pl();
  emitter = new ea();
  dimensions;
  virtualScroll;
  constructor({ wrapper: s = window, content: t = document.documentElement, eventsTarget: i = s, smoothWheel: e = !0, syncTouch: r = !1, syncTouchLerp: n = 0.075, touchInertiaExponent: o = 1.7, duration: a, easing: l, lerp: u = 0.1, infinite: c = !1, orientation: d = "vertical", gestureOrientation: h = d === "horizontal" ? "both" : "vertical", touchMultiplier: f = 1, wheelMultiplier: _ = 1, autoResize: p = !0, prevent: m, virtualScroll: S, overscroll: w = !0, autoRaf: T = !1, anchors: v = !1, autoToggle: b = !1, allowNestedScroll: E = !1, __experimental__naiveDimensions: x = !1, naiveDimensions: P = x, stopInertiaOnNavigate: k = !1, respectReducedMotion: C = !0 } = {}) {
    window.lenisVersion = co, window.lenis || (window.lenis = {}), window.lenis.version = co, d === "horizontal" && (window.lenis.horizontal = !0), r === !0 && (window.lenis.touch = !0), this.isIos = /(iPad|iPhone|iPod)/g.test(navigator.userAgent), (!s || s === document.documentElement) && (s = window), typeof a == "number" && typeof l != "function" ? l = ho : typeof l == "function" && typeof a != "number" && (a = 1), this.options = {
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
      prevent: m,
      virtualScroll: S,
      overscroll: w,
      autoRaf: T,
      anchors: v,
      autoToggle: b,
      allowNestedScroll: E,
      naiveDimensions: P,
      stopInertiaOnNavigate: k,
      respectReducedMotion: C
    }, this.dimensions = new Ml(s, t, { autoResize: p }), this.updateClassName(), this.targetScroll = this.animatedScroll = this.actualScroll, this.options.wrapper.addEventListener("scroll", this.onNativeScroll), this.options.wrapper.addEventListener("scrollend", this.onScrollEnd, { capture: !0 }), (this.options.anchors || this.options.stopInertiaOnNavigate) && this.options.wrapper.addEventListener("click", this.onClick), this.options.wrapper.addEventListener("pointerdown", this.onPointerDown), this.virtualScroll = new Dl(i, {
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
        const p = _.getBoundingClientRect(), m = getComputedStyle(_), S = this.isHorizontal ? Number.parseFloat(m.scrollMarginLeft) : Number.parseFloat(m.scrollMarginTop), w = getComputedStyle(this.rootElement), T = this.isHorizontal ? Number.parseFloat(w.scrollPaddingLeft) : Number.parseFloat(w.scrollPaddingTop);
        h = (this.isHorizontal ? p.left : p.top) + this.animatedScroll - (Number.isNaN(S) ? 0 : S) - (Number.isNaN(T) ? 0 : T);
      }
    }
    if (typeof h == "number") {
      if (h += f, this.options.infinite) {
        if (r) {
          this.targetScroll = this.animatedScroll = this.scroll;
          const _ = h - this.animatedScroll;
          _ > this.limit / 2 ? h -= this.limit : _ < -this.limit / 2 && (h += this.limit);
        }
      } else h = ta(0, h, this.limit);
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
      r || (this.targetScroll = h), typeof o == "number" && typeof a != "function" ? a = ho : typeof a == "function" && typeof o != "number" && (o = 1), this.animate.fromTo(this.animatedScroll, h, {
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
      const E = window.getComputedStyle(s);
      if (r.computedStyle = E, n = [
        "auto",
        "overlay",
        "scroll"
      ].includes(E.overflowX), o = [
        "auto",
        "overlay",
        "scroll"
      ].includes(E.overflowY), u = ["auto"].includes(E.overscrollBehaviorX), c = ["auto"].includes(E.overscrollBehaviorY), r.hasOverflowX = n, r.hasOverflowY = o, !(n || o)) return !1;
      d = s.scrollWidth, h = s.scrollHeight, f = s.clientWidth, _ = s.clientHeight, a = d > f, l = h > _, r.isScrollableX = a, r.isScrollableY = l, r.scrollWidth = d, r.scrollHeight = h, r.clientWidth = f, r.clientHeight = _, r.hasOverscrollBehaviorX = u, r.hasOverscrollBehaviorY = c;
    } else
      a = r.isScrollableX, l = r.isScrollableY, n = r.hasOverflowX, o = r.hasOverflowY, d = r.scrollWidth, h = r.scrollHeight, f = r.clientWidth, _ = r.clientHeight, u = r.hasOverscrollBehaviorX, c = r.hasOverscrollBehaviorY;
    if (!(n && a || o && l)) return !1;
    const p = Math.abs(t) >= Math.abs(i) ? "horizontal" : "vertical";
    let m, S, w, T, v, b;
    if (p === "horizontal")
      m = Math.round(s.scrollLeft), S = d - f, w = t, T = n, v = a, b = u;
    else if (p === "vertical")
      m = Math.round(s.scrollTop), S = h - _, w = i, T = o, v = l, b = c;
    else return !1;
    return !b && (m >= S || m <= 0) ? !0 : (w > 0 ? m < S : m > 0) && T && v;
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
    return this.options.infinite ? El(this.animatedScroll, this.limit) : this.animatedScroll;
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
function ei(s) {
  if (s === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return s;
}
function ia(s, t) {
  s.prototype = Object.create(t.prototype), s.prototype.constructor = s, s.__proto__ = t;
}
var be = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
}, Kr = {
  duration: 0.5,
  overwrite: !1,
  delay: 0
}, Ns, Nt, at, Me = 1e8, nt = 1 / Me, cs = Math.PI * 2, Ll = cs / 4, zl = 0, ra = Math.sqrt, Fl = Math.cos, Nl = Math.sin, Dt = function(t) {
  return typeof t == "string";
}, _t = function(t) {
  return typeof t == "function";
}, oi = function(t) {
  return typeof t == "number";
}, Is = function(t) {
  return typeof t > "u";
}, Ke = function(t) {
  return typeof t == "object";
}, ae = function(t) {
  return t !== !1;
}, Ys = function() {
  return typeof window < "u";
}, cn = function(t) {
  return _t(t) || Dt(t);
}, na = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {
}, $t = Array.isArray, Il = /random\([^)]+\)/g, Yl = /,\s*/g, po = /(?:-?\.?\d|\.)+/gi, sa = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, ar = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, Kn = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, oa = /[+-]=-?[.\d]+/, Bl = /[^,'"\[\]\s]+/gi, Xl = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, ct, Ve, fs, Bs, Te = {}, An = {}, aa, la = function(t) {
  return (An = mr(t, Te)) && fe;
}, Xs = function(t, i) {
  return console.warn("Invalid property", t, "set to", i, "Missing plugin? gsap.registerPlugin()");
}, Qr = function(t, i) {
  return !i && console.warn(t);
}, ua = function(t, i) {
  return t && (Te[t] = i) && An && (An[t] = i) || Te;
}, Zr = function() {
  return 0;
}, Wl = {
  suppressEvents: !0,
  isStart: !0,
  kill: !1
}, bn = {
  suppressEvents: !0,
  kill: !1
}, Vl = {
  suppressEvents: !0
}, Ws = {}, xi = [], hs = {}, ca, me = {}, Qn = {}, _o = 30, Tn = [], Vs = "", Hs = function(t) {
  var i = t[0], e, r;
  if (Ke(i) || _t(i) || (t = [t]), !(e = (i._gsap || {}).harness)) {
    for (r = Tn.length; r-- && !Tn[r].targetTest(i); )
      ;
    e = Tn[r];
  }
  for (r = t.length; r--; )
    t[r] && (t[r]._gsap || (t[r]._gsap = new Da(t[r], e))) || t.splice(r, 1);
  return t;
}, Xi = function(t) {
  return t._gsap || Hs(Re(t))[0]._gsap;
}, fa = function(t, i, e) {
  return (e = t[i]) && _t(e) ? t[i]() : Is(e) && t.getAttribute && t.getAttribute(i) || e;
}, le = function(t, i) {
  return (t = t.split(",")).forEach(i) || t;
}, yt = function(t) {
  return Math.round(t * 1e5) / 1e5 || 0;
}, ut = function(t) {
  return Math.round(t * 1e7) / 1e7 || 0;
}, cr = function(t, i) {
  var e = i.charAt(0), r = parseFloat(i.substr(2));
  return t = parseFloat(t), e === "+" ? t + r : e === "-" ? t - r : e === "*" ? t * r : t / r;
}, Hl = function(t, i) {
  for (var e = i.length, r = 0; t.indexOf(i[r]) < 0 && ++r < e; )
    ;
  return r < e;
}, Ln = function() {
  var t = xi.length, i = xi.slice(0), e, r;
  for (hs = {}, xi.length = 0, e = 0; e < t; e++)
    r = i[e], r && r._lazy && (r.render(r._lazy[0], r._lazy[1], !0)._lazy = 0);
}, Us = function(t) {
  return !!(t._initted || t._startAt || t.add);
}, ha = function(t, i, e, r) {
  xi.length && !Nt && Ln(), t.render(i, e, !!(Nt && i < 0 && Us(t))), xi.length && !Nt && Ln();
}, da = function(t) {
  var i = parseFloat(t);
  return (i || i === 0) && (t + "").match(Bl).length < 2 ? i : Dt(t) ? t.trim() : t;
}, pa = function(t) {
  return t;
}, Ce = function(t, i) {
  for (var e in i)
    e in t || (t[e] = i[e]);
  return t;
}, Ul = function(t) {
  return function(i, e) {
    for (var r in e)
      r in i || r === "duration" && t || r === "ease" || (i[r] = e[r]);
  };
}, mr = function(t, i) {
  for (var e in i)
    t[e] = i[e];
  return t;
}, go = function s(t, i) {
  for (var e in i)
    e !== "__proto__" && e !== "constructor" && e !== "prototype" && (t[e] = Ke(i[e]) ? s(t[e] || (t[e] = {}), i[e]) : i[e]);
  return t;
}, zn = function(t, i) {
  var e = {}, r;
  for (r in t)
    r in i || (e[r] = t[r]);
  return e;
}, Nr = function(t) {
  var i = t.parent || ct, e = t.keyframes ? Ul($t(t.keyframes)) : Ce;
  if (ae(t.inherit))
    for (; i; )
      e(t, i.vars.defaults), i = i.parent || i._dp;
  return t;
}, ql = function(t, i) {
  for (var e = t.length, r = e === i.length; r && e-- && t[e] === i[e]; )
    ;
  return e < 0;
}, _a = function(t, i, e, r, n) {
  var o = t[r], a;
  if (n)
    for (a = i[n]; o && o[n] > a; )
      o = o._prev;
  return o ? (i._next = o._next, o._next = i) : (i._next = t[e], t[e] = i), i._next ? i._next._prev = i : t[r] = i, i._prev = o, i.parent = i._dp = t, i;
}, Hn = function(t, i, e, r) {
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
}, $l = function(t) {
  for (var i = t.parent; i && i.parent; )
    i._dirty = 1, i.totalDuration(), i = i.parent;
  return t;
}, ds = function(t, i, e, r) {
  return t._startAt && (Nt ? t._startAt.revert(bn) : t.vars.immediateRender && !t.vars.autoRevert || t._startAt.render(i, !0, r));
}, Gl = function s(t) {
  return !t || t._ts && s(t.parent);
}, mo = function(t) {
  return t._repeat ? vr(t._tTime, t = t.duration() + t._rDelay) * t : 0;
}, vr = function(t, i) {
  var e = Math.floor(t = ut(t / i));
  return t && e === t ? e - 1 : e;
}, Fn = function(t, i) {
  return (t - i._start) * i._ts + (i._ts >= 0 ? 0 : i._dirty ? i.totalDuration() : i._tDur);
}, Un = function(t) {
  return t._end = ut(t._start + (t._tDur / Math.abs(t._ts || t._rts || nt) || 0));
}, qn = function(t, i) {
  var e = t._dp;
  return e && e.smoothChildTiming && t._ts && (t._start = ut(e._time - (t._ts > 0 ? i / t._ts : ((t._dirty ? t.totalDuration() : t._tDur) - i) / -t._ts)), Un(t), e._dirty || Wi(e, t)), t;
}, ga = function(t, i) {
  var e;
  if ((i._time || !i._dur && i._initted || i._start < t._time && (i._dur || !i.add)) && (e = Fn(t.rawTime(), i), (!i._dur || on(0, i.totalDuration(), e) - i._tTime > nt) && i.render(e, !0)), Wi(t, i)._dp && t._initted && t._time >= t._dur && t._ts) {
    if (t._dur < t.duration())
      for (e = t; e._dp; )
        e.rawTime() >= 0 && e.totalTime(e._tTime), e = e._dp;
    t._zTime = -nt;
  }
}, Ue = function(t, i, e, r) {
  return i.parent && Ti(i), i._start = ut((oi(e) ? e : e || t !== ct ? Ee(t, e, i) : t._time) + i._delay), i._end = ut(i._start + (i.totalDuration() / Math.abs(i.timeScale()) || 0)), _a(t, i, "_first", "_last", t._sort ? "_start" : 0), ps(i) || (t._recent = i), r || ga(t, i), t._ts < 0 && qn(t, t._tTime), t;
}, ma = function(t, i) {
  return (Te.ScrollTrigger || Xs("scrollTrigger", i)) && Te.ScrollTrigger.create(i, t);
}, va = function(t, i, e, r, n) {
  if ($s(t, i, n), !t._initted)
    return 1;
  if (!e && t._pt && !Nt && (t._dur && t.vars.lazy !== !1 || !t._dur && t.vars.lazy) && ca !== ye.frame)
    return xi.push(t), t._lazy = [n, r], 1;
}, Kl = function s(t) {
  var i = t.parent;
  return i && i._ts && i._initted && !i._lock && (i.rawTime() < 0 || s(i));
}, ps = function(t) {
  var i = t.data;
  return i === "isFromStart" || i === "isStart";
}, Ql = function(t, i, e, r) {
  var n = t.ratio, o = i < 0 || !i && (!t._start && Kl(t) && !(!t._initted && ps(t)) || (t._ts < 0 || t._dp._ts < 0) && !ps(t)) ? 0 : 1, a = t._rDelay, l = 0, u, c, d;
  if (a && t._repeat && (l = on(0, t._tDur, i), c = vr(l, a), t._yoyo && c & 1 && (o = 1 - o), c !== vr(t._tTime, a) && (n = 1 - o, t.vars.repeatRefresh && t._initted && t.invalidate())), o !== n || Nt || r || t._zTime === nt || !i && t._zTime) {
    if (!t._initted && va(t, i, r, e, l))
      return;
    for (d = t._zTime, t._zTime = i || (e ? nt : 0), e || (e = i && !d), t.ratio = o, t._from && (o = 1 - o), t._time = 0, t._tTime = l, u = t._pt; u; )
      u.r(o, u.d), u = u._next;
    i < 0 && ds(t, i, e, !0), t._onUpdate && !e && xe(t, "onUpdate"), l && t._repeat && !e && t.parent && xe(t, "onRepeat"), (i >= t._tDur || i < 0) && t.ratio === o && (o && Ti(t, 1), !e && !Nt && (xe(t, o ? "onComplete" : "onReverseComplete", !0), t._prom && t._prom()));
  } else t._zTime || (t._zTime = i);
}, Zl = function(t, i, e) {
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
}, yr = function(t, i, e, r) {
  var n = t._repeat, o = ut(i) || 0, a = t._tTime / t._tDur;
  return a && !r && (t._time *= o / t._dur), t._dur = o, t._tDur = n ? n < 0 ? 1e10 : ut(o * (n + 1) + t._rDelay * n) : o, a > 0 && !r && qn(t, t._tTime = t._tDur * a), t.parent && Un(t), e || Wi(t.parent, t), t;
}, vo = function(t) {
  return t instanceof oe ? Wi(t) : yr(t, t._dur);
}, jl = {
  _start: 0,
  endTime: Zr,
  totalDuration: Zr
}, Ee = function s(t, i, e) {
  var r = t.labels, n = t._recent || jl, o = t.duration() >= Me ? n.endTime(!1) : t._dur, a, l, u;
  return Dt(i) && (isNaN(i) || i in r) ? (l = i.charAt(0), u = i.substr(-1) === "%", a = i.indexOf("="), l === "<" || l === ">" ? (a >= 0 && (i = i.replace(/=/, "")), (l === "<" ? n._start : n.endTime(n._repeat >= 0)) + (parseFloat(i.substr(1)) || 0) * (u ? (a < 0 ? n : e).totalDuration() / 100 : 1)) : a < 0 ? (i in r || (r[i] = o), r[i]) : (l = parseFloat(i.charAt(a - 1) + i.substr(a + 1)), u && e && (l = l / 100 * ($t(e) ? e[0] : e).totalDuration()), a > 1 ? s(t, i.substr(0, a - 1), e) + l : o + l)) : i == null ? o : +i;
}, Ir = function(t, i, e) {
  var r = oi(i[1]), n = (r ? 2 : 1) + (t < 2 ? 0 : 1), o = i[n], a, l;
  if (r && (o.duration = i[1]), o.parent = e, t) {
    for (a = o, l = e; l && !("immediateRender" in a); )
      a = l.vars.defaults || {}, l = ae(l.vars.inherit) && l.parent;
    o.immediateRender = ae(a.immediateRender), t < 2 ? o.runBackwards = 1 : o.startAt = i[n - 1];
  }
  return new Tt(i[0], o, i[n + 1]);
}, Pi = function(t, i) {
  return t || t === 0 ? i(t) : i;
}, on = function(t, i, e) {
  return e < t ? t : e > i ? i : e;
}, Ut = function(t, i) {
  return !Dt(t) || !(i = Xl.exec(t)) ? "" : i[1];
}, Jl = function(t, i, e) {
  return Pi(e, function(r) {
    return on(t, i, r);
  });
}, _s = [].slice, ya = function(t, i) {
  return t && Ke(t) && "length" in t && (!i && !t.length || t.length - 1 in t && Ke(t[0])) && !t.nodeType && t !== Ve;
}, tu = function(t, i, e) {
  return e === void 0 && (e = []), t.forEach(function(r) {
    var n;
    return Dt(r) && !i || ya(r, 1) ? (n = e).push.apply(n, Re(r)) : e.push(r);
  }) || e;
}, Re = function(t, i, e) {
  return at && !i && at.selector ? at.selector(t) : Dt(t) && !e && (fs || !wr()) ? _s.call((i || Bs).querySelectorAll(t), 0) : $t(t) ? tu(t, e) : ya(t) ? _s.call(t, 0) : t ? [t] : [];
}, gs = function(t) {
  return t = Re(t)[0] || Qr("Invalid scope") || {}, function(i) {
    var e = t.current || t.nativeElement || t;
    return Re(i, e.querySelectorAll ? e : e === t ? Qr("Invalid scope") || Bs.createElement("div") : t);
  };
}, wa = function(t) {
  return t.sort(function() {
    return 0.5 - Math.random();
  });
}, xa = function(t) {
  if (_t(t))
    return t;
  var i = Ke(t) ? t : {
    each: t
  }, e = Vi(i.ease), r = i.from || 0, n = parseFloat(i.base) || 0, o = {}, a = r > 0 && r < 1, l = isNaN(r) || a, u = i.axis, c = r, d = r;
  return Dt(r) ? c = d = {
    center: 0.5,
    edges: 0.5,
    end: 1
  }[r] || 0 : !a && l && (c = r[0], d = r[1]), function(h, f, _) {
    var p = (_ || i).length, m = o[p], S, w, T, v, b, E, x, P, k;
    if (!m) {
      if (k = i.grid === "auto" ? 0 : (i.grid || [1, Me])[1], !k) {
        for (x = -Me; x < (x = _[k++].getBoundingClientRect().left) && k < p; )
          ;
        k < p && k--;
      }
      for (m = o[p] = [], S = l ? Math.min(k, p) * c - 0.5 : r % k, w = k === Me ? 0 : l ? p * d / k - 0.5 : r / k | 0, x = 0, P = Me, E = 0; E < p; E++)
        T = E % k - S, v = w - (E / k | 0), m[E] = b = u ? Math.abs(u === "y" ? v : T) : ra(T * T + v * v), b > x && (x = b), b < P && (P = b);
      r === "random" && wa(m), m.max = x - P, m.min = P, m.v = p = (parseFloat(i.amount) || parseFloat(i.each) * (k > p ? p - 1 : u ? u === "y" ? p / k : k : Math.max(k, p / k)) || 0) * (r === "edges" ? -1 : 1), m.b = p < 0 ? n - p : n, m.u = Ut(i.amount || i.each) || 0, e = e && p < 0 ? du(e) : e;
    }
    return p = (m[h] - m.min) / m.max || 0, ut(m.b + (e ? e(p) : p) * m.v) + m.u;
  };
}, ms = function(t) {
  var i = Math.pow(10, ((t + "").split(".")[1] || "").length);
  return function(e) {
    var r = ut(Math.round(parseFloat(e) / t) * t * i);
    return (r - r % 1) / i + (oi(e) ? 0 : Ut(e));
  };
}, Sa = function(t, i) {
  var e = $t(t), r, n;
  return !e && Ke(t) && (r = e = t.radius || Me, t.values ? (t = Re(t.values), (n = !oi(t[0])) && (r *= r)) : t = ms(t.increment)), Pi(i, e ? _t(t) ? function(o) {
    return n = t(o), Math.abs(n - o) <= r ? n : o;
  } : function(o) {
    for (var a = parseFloat(n ? o.x : o), l = parseFloat(n ? o.y : 0), u = Me, c = 0, d = t.length, h, f; d--; )
      n ? (h = t[d].x - a, f = t[d].y - l, h = h * h + f * f) : h = Math.abs(t[d] - a), h < u && (u = h, c = d);
    return c = !r || u <= r ? t[c] : o, n || c === o || oi(o) ? c : c + Ut(o);
  } : ms(t));
}, ba = function(t, i, e, r) {
  return Pi($t(t) ? !i : e === !0 ? !!(e = 0) : !r, function() {
    return $t(t) ? t[~~(Math.random() * t.length)] : (e = e || 1e-5) && (r = e < 1 ? Math.pow(10, (e + "").length - 2) : 1) && Math.floor(Math.round((t - e / 2 + Math.random() * (i - t + e * 0.99)) / e) * e * r) / r;
  });
}, eu = function() {
  for (var t = arguments.length, i = new Array(t), e = 0; e < t; e++)
    i[e] = arguments[e];
  return function(r) {
    return i.reduce(function(n, o) {
      return o(n);
    }, r);
  };
}, iu = function(t, i) {
  return function(e) {
    return t(parseFloat(e)) + (i || Ut(e));
  };
}, ru = function(t, i, e) {
  return Ca(t, i, 0, 1, e);
}, Ta = function(t, i, e) {
  return Pi(e, function(r) {
    return t[~~i(r)];
  });
}, nu = function s(t, i, e) {
  var r = i - t;
  return $t(t) ? Ta(t, s(0, t.length), i) : Pi(e, function(n) {
    return (r + (n - t) % r) % r + t;
  });
}, su = function s(t, i, e) {
  var r = i - t, n = r * 2;
  return $t(t) ? Ta(t, s(0, t.length - 1), i) : Pi(e, function(o) {
    return o = (n + (o - t) % n) % n || 0, t + (o > r ? n - o : o);
  });
}, jr = function(t) {
  return t.replace(Il, function(i) {
    var e = i.indexOf("[") + 1, r = i.substring(e || 7, e ? i.indexOf("]") : i.length - 1).split(Yl);
    return ba(e ? r : +r[0], e ? 0 : +r[1], +r[2] || 1e-5);
  });
}, Ca = function(t, i, e, r, n) {
  var o = i - t, a = r - e;
  return Pi(n, function(l) {
    return e + ((l - t) / o * a || 0);
  });
}, ou = function s(t, i, e, r) {
  var n = isNaN(t + i) ? 0 : function(f) {
    return (1 - f) * t + f * i;
  };
  if (!n) {
    var o = Dt(t), a = {}, l, u, c, d, h;
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
    } else r || (t = mr($t(t) ? [] : {}, t));
    if (!c) {
      for (l in i)
        qs.call(a, t, l, "get", i[l]);
      n = function(_) {
        return Qs(_, a) || (o ? t.p : t);
      };
    }
  }
  return Pi(e, n);
}, yo = function(t, i, e) {
  var r = t.labels, n = Me, o, a, l;
  for (o in r)
    a = r[o] - i, a < 0 == !!e && a && n > (a = Math.abs(a)) && (l = o, n = a);
  return l;
}, xe = function(t, i, e) {
  var r = t.vars, n = r[i], o = at, a = t._ctx, l, u, c;
  if (n)
    return l = r[i + "Params"], u = r.callbackScope || t, e && xi.length && Ln(), a && (at = a), c = l ? n.apply(u, l) : n.call(u), at = o, c;
}, Mr = function(t) {
  return Ti(t), t.scrollTrigger && t.scrollTrigger.kill(!!Nt), t.progress() < 1 && xe(t, "onInterrupt"), t;
}, lr, ka = [], Ea = function(t) {
  if (t)
    if (t = !t.name && t.default || t, Ys() || t.headless) {
      var i = t.name, e = _t(t), r = i && !e && t.init ? function() {
        this._props = [];
      } : t, n = {
        init: Zr,
        render: Qs,
        add: qs,
        kill: bu,
        modifier: Su,
        rawVars: 0
      }, o = {
        targetTest: 0,
        get: 0,
        getSetter: Ks,
        aliases: {},
        register: 0
      };
      if (wr(), t !== r) {
        if (me[i])
          return;
        Ce(r, Ce(zn(t, n), o)), mr(r.prototype, mr(n, zn(t, o))), me[r.prop = i] = r, t.targetTest && (Tn.push(r), Ws[i] = 1), i = (i === "css" ? "CSS" : i.charAt(0).toUpperCase() + i.substr(1)) + "Plugin";
      }
      ua(i, r), t.register && t.register(fe, r, ue);
    } else
      ka.push(t);
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
}, Pa = function(t, i, e) {
  var r = t ? oi(t) ? [t >> 16, t >> 8 & rt, t & rt] : 0 : Rr.black, n, o, a, l, u, c, d, h, f, _;
  if (!r) {
    if (t.substr(-1) === "," && (t = t.substr(0, t.length - 1)), Rr[t])
      r = Rr[t];
    else if (t.charAt(0) === "#") {
      if (t.length < 6 && (n = t.charAt(1), o = t.charAt(2), a = t.charAt(3), t = "#" + n + n + o + o + a + a + (t.length === 5 ? t.charAt(4) + t.charAt(4) : "")), t.length === 9)
        return r = parseInt(t.substr(1, 6), 16), [r >> 16, r >> 8 & rt, r & rt, parseInt(t.substr(7), 16) / 255];
      t = parseInt(t.substr(1), 16), r = [t >> 16, t >> 8 & rt, t & rt];
    } else if (t.substr(0, 3) === "hsl") {
      if (r = _ = t.match(po), !i)
        l = +r[0] % 360 / 360, u = +r[1] / 100, c = +r[2] / 100, o = c <= 0.5 ? c * (u + 1) : c + u - c * u, n = c * 2 - o, r.length > 3 && (r[3] *= 1), r[0] = Zn(l + 1 / 3, n, o), r[1] = Zn(l, n, o), r[2] = Zn(l - 1 / 3, n, o);
      else if (~t.indexOf("="))
        return r = t.match(sa), e && r.length < 4 && (r[3] = 1), r;
    } else
      r = t.match(po) || Rr.transparent;
    r = r.map(Number);
  }
  return i && !_ && (n = r[0] / rt, o = r[1] / rt, a = r[2] / rt, d = Math.max(n, o, a), h = Math.min(n, o, a), c = (d + h) / 2, d === h ? l = u = 0 : (f = d - h, u = c > 0.5 ? f / (2 - d - h) : f / (d + h), l = d === n ? (o - a) / f + (o < a ? 6 : 0) : d === o ? (a - n) / f + 2 : (n - o) / f + 4, l *= 60), r[0] = ~~(l + 0.5), r[1] = ~~(u * 100 + 0.5), r[2] = ~~(c * 100 + 0.5)), e && r.length < 4 && (r[3] = 1), r;
}, Oa = function(t) {
  var i = [], e = [], r = -1;
  return t.split(Si).forEach(function(n) {
    var o = n.match(ar) || [];
    i.push.apply(i, o), e.push(r += o.length + 1);
  }), i.c = e, i;
}, wo = function(t, i, e) {
  var r = "", n = (t + r).match(Si), o = i ? "hsla(" : "rgba(", a = 0, l, u, c, d;
  if (!n)
    return t;
  if (n = n.map(function(h) {
    return (h = Pa(h, i, 1)) && o + (i ? h[0] + "," + h[1] + "%," + h[2] + "%," + h[3] : h.join(",")) + ")";
  }), e && (c = Oa(t), l = e.c, l.join(r) !== c.c.join(r)))
    for (u = t.replace(Si, "1").split(ar), d = u.length - 1; a < d; a++)
      r += u[a] + (~l.indexOf(a) ? n.shift() || o + "0,0,0,0)" : (c.length ? c : n.length ? n : e).shift());
  if (!u)
    for (u = t.split(Si), d = u.length - 1; a < d; a++)
      r += u[a] + n[a];
  return r + u[d];
}, Si = (function() {
  var s = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", t;
  for (t in Rr)
    s += "|" + t + "\\b";
  return new RegExp(s + ")", "gi");
})(), au = /hsl[a]?\(/, Ma = function(t) {
  var i = t.join(" "), e;
  if (Si.lastIndex = 0, Si.test(i))
    return e = au.test(i), t[1] = wo(t[1], e), t[0] = wo(t[0], e, Oa(t[1])), !0;
}, Jr, ye = (function() {
  var s = Date.now, t = 500, i = 33, e = s(), r = e, n = 1e3 / 240, o = n, a = [], l, u, c, d, h, f, _ = function p(m) {
    var S = s() - r, w = m === !0, T, v, b, E;
    if ((S > t || S < 0) && (e += S - i), r += S, b = r - e, T = b - o, (T > 0 || w) && (E = ++d.frame, h = b - d.time * 1e3, d.time = b = b / 1e3, o += T + (T >= n ? 4 : n - T), v = 1), w || (l = u(p)), v)
      for (f = 0; f < a.length; f++)
        a[f](b, h, E, m);
  };
  return d = {
    time: 0,
    frame: 0,
    tick: function() {
      _(!0);
    },
    deltaRatio: function(m) {
      return h / (1e3 / (m || 60));
    },
    wake: function() {
      aa && (!fs && Ys() && (Ve = fs = window, Bs = Ve.document || {}, Te.gsap = fe, (Ve.gsapVersions || (Ve.gsapVersions = [])).push(fe.version), la(An || Ve.GreenSockGlobals || !Ve.gsap && Ve || {}), ka.forEach(Ea)), c = typeof requestAnimationFrame < "u" && requestAnimationFrame, l && d.sleep(), u = c || function(m) {
        return setTimeout(m, o - d.time * 1e3 + 1 | 0);
      }, Jr = 1, _(2));
    },
    sleep: function() {
      (c ? cancelAnimationFrame : clearTimeout)(l), Jr = 0, u = Zr;
    },
    lagSmoothing: function(m, S) {
      t = m || 1 / 0, i = Math.min(S || 33, t);
    },
    fps: function(m) {
      n = 1e3 / (m || 240), o = d.time * 1e3 + n;
    },
    add: function(m, S, w) {
      var T = S ? function(v, b, E, x) {
        m(v, b, E, x), d.remove(T);
      } : m;
      return d.remove(m), a[w ? "unshift" : "push"](T), wr(), T;
    },
    remove: function(m, S) {
      ~(S = a.indexOf(m)) && a.splice(S, 1) && f >= S && f--;
    },
    _listeners: a
  }, d;
})(), wr = function() {
  return !Jr && ye.wake();
}, $ = {}, lu = /^[\d.\-M][\d.\-,\s]/, uu = /["']/g, cu = function(t) {
  for (var i = {}, e = t.substr(1, t.length - 3).split(":"), r = e[0], n = 1, o = e.length, a, l, u; n < o; n++)
    l = e[n], a = n !== o - 1 ? l.lastIndexOf(",") : l.length, u = l.substr(0, a), i[r] = isNaN(u) ? u.replace(uu, "").trim() : +u, r = l.substr(a + 1).trim();
  return i;
}, fu = function(t) {
  var i = t.indexOf("(") + 1, e = t.indexOf(")"), r = t.indexOf("(", i);
  return t.substring(i, ~r && r < e ? t.indexOf(")", e + 1) : e);
}, hu = function(t) {
  var i = (t + "").split("("), e = $[i[0]];
  return e && i.length > 1 && e.config ? e.config.apply(null, ~t.indexOf("{") ? [cu(i[1])] : fu(t).split(",").map(da)) : $._CE && lu.test(t) ? $._CE("", t) : e;
}, du = function(t) {
  return function(i) {
    return 1 - t(1 - i);
  };
}, Vi = function(t, i) {
  return t && (_t(t) ? t : $[t] || hu(t)) || i;
}, Zi = function(t, i, e, r) {
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
}, Ra = function(t) {
  return function(i) {
    return i < 0.5 ? (1 - t(1 - i * 2)) / 2 : 0.5 + t((i - 0.5) * 2) / 2;
  };
}, jn = function s(t, i, e) {
  var r = i >= 1 ? i : 1, n = (e || (t ? 0.3 : 0.45)) / (i < 1 ? i : 1), o = n / cs * (Math.asin(1 / r) || 0), a = function(c) {
    return c === 1 ? 1 : r * Math.pow(2, -10 * c) * Nl((c - o) * n) + 1;
  }, l = t === "out" ? a : t === "in" ? function(u) {
    return 1 - a(1 - u);
  } : Ra(a);
  return n = cs / n, l.config = function(u, c) {
    return s(t, u, c);
  }, l;
}, Jn = function s(t, i) {
  i === void 0 && (i = 1.70158);
  var e = function(o) {
    return o ? --o * o * ((i + 1) * o + i) + 1 : 0;
  }, r = t === "out" ? e : t === "in" ? function(n) {
    return 1 - e(1 - n);
  } : Ra(e);
  return r.config = function(n) {
    return s(t, n);
  }, r;
};
le("Linear,Quad,Cubic,Quart,Quint,Strong", function(s, t) {
  var i = t < 5 ? t + 1 : t;
  Zi(s + ",Power" + (i - 1), t ? function(e) {
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
Zi("Elastic", jn("in"), jn("out"), jn());
(function(s, t) {
  var i = 1 / t, e = 2 * i, r = 2.5 * i, n = function(a) {
    return a < i ? s * a * a : a < e ? s * Math.pow(a - 1.5 / t, 2) + 0.75 : a < r ? s * (a -= 2.25 / t) * a + 0.9375 : s * Math.pow(a - 2.625 / t, 2) + 0.984375;
  };
  Zi("Bounce", function(o) {
    return 1 - n(1 - o);
  }, n);
})(7.5625, 2.75);
Zi("Expo", function(s) {
  return Math.pow(2, 10 * (s - 1)) * s + s * s * s * s * s * s * (1 - s);
});
Zi("Circ", function(s) {
  return -(ra(1 - s * s) - 1);
});
Zi("Sine", function(s) {
  return s === 1 ? 1 : -Fl(s * Ll) + 1;
});
Zi("Back", Jn("in"), Jn("out"), Jn());
$.SteppedEase = $.steps = Te.SteppedEase = {
  config: function(t, i) {
    t === void 0 && (t = 1);
    var e = 1 / t, r = t + (i ? 0 : 1), n = i ? 1 : 0, o = 1 - nt;
    return function(a) {
      return ((r * on(0, o, a) | 0) + n) * e;
    };
  }
};
Kr.ease = $["quad.out"];
le("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(s) {
  return Vs += s + "," + s + "Params,";
});
var Da = function(t, i) {
  this.id = zl++, t._gsap = this, this.target = t, this.harness = i, this.get = i ? i.get : fa, this.set = i ? i.getSetter : Ks;
}, tn = /* @__PURE__ */ (function() {
  function s(i) {
    this.vars = i, this._delay = +i.delay || 0, (this._repeat = i.repeat === 1 / 0 ? -2 : i.repeat || 0) && (this._rDelay = i.repeatDelay || 0, this._yoyo = !!i.yoyo || !!i.yoyoEase), this._ts = 1, yr(this, +i.duration, 1, 1), this.data = i.data, at && (this._ctx = at, at.data.push(this)), Jr || ye.wake();
  }
  var t = s.prototype;
  return t.delay = function(e) {
    return e || e === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + e - this._delay), this._delay = e, this) : this._delay;
  }, t.duration = function(e) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? e + (e + this._rDelay) * this._repeat : e) : this.totalDuration() && this._dur;
  }, t.totalDuration = function(e) {
    return arguments.length ? (this._dirty = 0, yr(this, this._repeat < 0 ? e : (e - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
  }, t.totalTime = function(e, r) {
    if (wr(), !arguments.length)
      return this._tTime;
    var n = this._dp;
    if (n && n.smoothChildTiming && this._ts) {
      for (qn(this, e), !n._dp || n.parent || ga(n, this); n && n.parent; )
        n.parent._time !== n._start + (n._ts >= 0 ? n._tTime / n._ts : (n.totalDuration() - n._tTime) / -n._ts) && n.totalTime(n._tTime, !0), n = n.parent;
      !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && e < this._tDur || this._ts < 0 && e > 0 || !this._tDur && !e) && Ue(this._dp, this, this._start - this._delay);
    }
    return (this._tTime !== e || !this._dur && !r || this._initted && Math.abs(this._zTime) === nt || !this._initted && this._dur && e || !e && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = e), ha(this, e, r)), this;
  }, t.time = function(e, r) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), e + mo(this)) % (this._dur + this._rDelay) || (e ? this._dur : 0), r) : this._time;
  }, t.totalProgress = function(e, r) {
    return arguments.length ? this.totalTime(this.totalDuration() * e, r) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0;
  }, t.progress = function(e, r) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - e : e) + mo(this), r) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
  }, t.iteration = function(e, r) {
    var n = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (e - 1) * n, r) : this._repeat ? vr(this._tTime, n) + 1 : 1;
  }, t.timeScale = function(e, r) {
    if (!arguments.length)
      return this._rts === -nt ? 0 : this._rts;
    if (this._rts === e)
      return this;
    var n = this.parent && this._ts ? Fn(this.parent._time, this) : this._tTime;
    return this._rts = +e || 0, this._ts = this._ps || e === -nt ? 0 : this._rts, this.totalTime(on(-Math.abs(this._delay), this.totalDuration(), n), r !== !1), Un(this), $l(this);
  }, t.paused = function(e) {
    return arguments.length ? (this._ps !== e && (this._ps = e, e ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (wr(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== nt && (this._tTime -= nt)))), this) : this._ps;
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
    return r ? e && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? Fn(r.rawTime(e), this) : this._tTime : this._tTime;
  }, t.revert = function(e) {
    e === void 0 && (e = Vl);
    var r = Nt;
    return Nt = e, Us(this) && (this.timeline && this.timeline.revert(e), this.totalTime(-0.01, e.suppressEvents)), this.data !== "nested" && e.kill !== !1 && this.kill(), Nt = r, this;
  }, t.globalTime = function(e) {
    for (var r = this, n = arguments.length ? e : r.rawTime(); r; )
      n = r._start + n / (Math.abs(r._ts) || 1), r = r._dp;
    return !this.parent && this._sat ? this._sat.globalTime(e) : n;
  }, t.repeat = function(e) {
    return arguments.length ? (this._repeat = e === 1 / 0 ? -2 : e, vo(this)) : this._repeat === -2 ? 1 / 0 : this._repeat;
  }, t.repeatDelay = function(e) {
    if (arguments.length) {
      var r = this._time;
      return this._rDelay = e, vo(this), r ? this.time(r) : this;
    }
    return this._rDelay;
  }, t.yoyo = function(e) {
    return arguments.length ? (this._yoyo = e, this) : this._yoyo;
  }, t.seek = function(e, r) {
    return this.totalTime(Ee(this, e), ae(r));
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
      var a = _t(e) ? e : pa, l = function() {
        var c = r.then;
        r.then = null, n && n(), _t(a) && (a = a(r)) && (a.then || a === r) && (r.then = c), o(a), r.then = c;
      };
      r._initted && r.totalProgress() === 1 && r._ts >= 0 || !r._tTime && r._ts < 0 ? l() : r._prom = l;
    });
  }, t.kill = function() {
    Mr(this);
  }, s;
})();
Ce(tn.prototype, {
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
  ia(t, s);
  function t(e, r) {
    var n;
    return e === void 0 && (e = {}), n = s.call(this, e) || this, n.labels = {}, n.smoothChildTiming = !!e.smoothChildTiming, n.autoRemoveChildren = !!e.autoRemoveChildren, n._sort = ae(e.sortChildren), ct && Ue(e.parent || ct, ei(n), r), e.reversed && n.reverse(), e.paused && n.paused(!0), e.scrollTrigger && ma(ei(n), e.scrollTrigger), n;
  }
  var i = t.prototype;
  return i.to = function(r, n, o) {
    return Ir(0, arguments, this), this;
  }, i.from = function(r, n, o) {
    return Ir(1, arguments, this), this;
  }, i.fromTo = function(r, n, o, a) {
    return Ir(2, arguments, this), this;
  }, i.set = function(r, n, o) {
    return n.duration = 0, n.parent = this, Nr(n).repeatDelay || (n.repeat = 0), n.immediateRender = !!n.immediateRender, new Tt(r, n, Ee(this, o), 1), this;
  }, i.call = function(r, n, o) {
    return Ue(this, Tt.delayedCall(0, r, n), o);
  }, i.staggerTo = function(r, n, o, a, l, u, c) {
    return o.duration = n, o.stagger = o.stagger || a, o.onComplete = u, o.onCompleteParams = c, o.parent = this, new Tt(r, o, Ee(this, l)), this;
  }, i.staggerFrom = function(r, n, o, a, l, u, c) {
    return o.runBackwards = 1, Nr(o).immediateRender = ae(o.immediateRender), this.staggerTo(r, n, o, a, l, u, c);
  }, i.staggerFromTo = function(r, n, o, a, l, u, c, d) {
    return a.startAt = o, Nr(a).immediateRender = ae(a.immediateRender), this.staggerTo(r, n, a, l, u, c, d);
  }, i.render = function(r, n, o) {
    var a = this._time, l = this._dirty ? this.totalDuration() : this._tDur, u = this._dur, c = r <= 0 ? 0 : ut(r), d = this._zTime < 0 != r < 0 && (this._initted || !u), h, f, _, p, m, S, w, T, v, b, E, x;
    if (this !== ct && c > l && r >= 0 && (c = l), c !== this._tTime || o || d) {
      if (a !== this._time && u && (c += this._time - a, r += this._time - a), h = c, v = this._start, T = this._ts, S = !T, d && (u || (a = this._zTime), (r || !n) && (this._zTime = r)), this._repeat) {
        if (E = this._yoyo, m = u + this._rDelay, this._repeat < -1 && r < 0)
          return this.totalTime(m * 100 + r, n, o);
        if (h = ut(c % m), c === l ? (p = this._repeat, h = u) : (b = ut(c / m), p = ~~b, p && p === b && (h = u, p--), h > u && (h = u)), b = vr(this._tTime, m), !a && this._tTime && b !== p && this._tTime - b * m - this._dur <= 0 && (b = p), E && p & 1 && (h = u - h, x = 1), p !== b && !this._lock) {
          var P = E && b & 1, k = P === (E && p & 1);
          if (p < b && (P = !P), a = P ? 0 : c % u ? u : c, this._lock = 1, this.render(a || (x ? 0 : ut(p * m)), n, !u)._lock = 0, this._tTime = c, !n && this.parent && xe(this, "onRepeat"), this.vars.repeatRefresh && !x && (this.invalidate()._lock = 1, b = p), a && a !== this._time || S !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
            return this;
          if (u = this._dur, l = this._tDur, k && (this._lock = 2, a = P ? u : -1e-4, this.render(a, !0), this.vars.repeatRefresh && !x && this.invalidate()), this._lock = 0, !this._ts && !S)
            return this;
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2 && (w = Zl(this, ut(a), ut(h)), w && (c -= h - (h = w._start))), this._tTime = c, this._time = h, this._act = !!T, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = r, a = 0), !a && c && u && !n && !b && (xe(this, "onStart"), this._tTime !== c))
        return this;
      if (h >= a && r >= 0)
        for (f = this._first; f; ) {
          if (_ = f._next, (f._act || h >= f._start) && f._ts && w !== f) {
            if (f.parent !== this)
              return this.render(r, n, o);
            if (f.render(f._ts > 0 ? (h - f._start) * f._ts : (f._dirty ? f.totalDuration() : f._tDur) + (h - f._start) * f._ts, n, o), h !== this._time || !this._ts && !S) {
              w = 0, _ && (c += this._zTime = -nt);
              break;
            }
          }
          f = _;
        }
      else {
        f = this._last;
        for (var C = r < 0 ? r : h; f; ) {
          if (_ = f._prev, (f._act || C <= f._end) && f._ts && w !== f) {
            if (f.parent !== this)
              return this.render(r, n, o);
            if (f.render(f._ts > 0 ? (C - f._start) * f._ts : (f._dirty ? f.totalDuration() : f._tDur) + (C - f._start) * f._ts, n, o || Nt && Us(f)), h !== this._time || !this._ts && !S) {
              w = 0, _ && (c += this._zTime = C ? -nt : nt);
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
    if (oi(n) || (n = Ee(this, n, r)), !(r instanceof tn)) {
      if ($t(r))
        return r.forEach(function(a) {
          return o.add(a, n);
        }), this;
      if (Dt(r))
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
    return Dt(r) ? this.removeLabel(r) : _t(r) ? this.killTweensOf(r) : (r.parent === this && Hn(this, r), r === this._recent && (this._recent = this._last), Wi(this));
  }, i.totalTime = function(r, n) {
    return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = ut(ye.time - (this._ts > 0 ? r / this._ts : (this.totalDuration() - r) / -this._ts))), s.prototype.totalTime.call(this, r, n), this._forcing = 0, this) : this._tTime;
  }, i.addLabel = function(r, n) {
    return this.labels[r] = Ee(this, n), this;
  }, i.removeLabel = function(r) {
    return delete this.labels[r], this;
  }, i.addPause = function(r, n, o) {
    var a = Tt.delayedCall(0, n || Zr, o);
    return a.data = "isPause", this._hasPause = 1, Ue(this, a, Ee(this, r));
  }, i.removePause = function(r) {
    var n = this._first;
    for (r = Ee(this, r); n; )
      n._start === r && n.data === "isPause" && Ti(n), n = n._next;
  }, i.killTweensOf = function(r, n, o) {
    for (var a = this.getTweensOf(r, o), l = a.length; l--; )
      gi !== a[l] && a[l].kill(r, n);
    return this;
  }, i.getTweensOf = function(r, n) {
    for (var o = [], a = Re(r), l = this._first, u = oi(n), c; l; )
      l instanceof Tt ? Hl(l._targets, a) && (u ? (!gi || l._initted && l._ts) && l.globalTime(0) <= n && l.globalTime(l.totalDuration()) > n : !n || l.isActive()) && o.push(l) : (c = l.getTweensOf(a, n)).length && o.push.apply(o, c), l = l._next;
    return o;
  }, i.tweenTo = function(r, n) {
    n = n || {};
    var o = this, a = Ee(o, r), l = n, u = l.startAt, c = l.onStart, d = l.onStartParams, h = l.immediateRender, f, _ = Tt.to(o, Ce({
      ease: n.ease || "none",
      lazy: !1,
      immediateRender: !1,
      time: a,
      overwrite: "auto",
      duration: n.duration || Math.abs((a - (u && "time" in u ? u.time : o._time)) / o.timeScale()) || nt,
      onStart: function() {
        if (o.pause(), !f) {
          var m = n.duration || Math.abs((a - (u && "time" in u ? u.time : o._time)) / o.timeScale());
          _._dur !== m && yr(_, m, 0, 1).render(_._time, !0, !0), f = 1;
        }
        c && c.apply(_, d || []);
      }
    }, n));
    return h ? _.render(0) : _;
  }, i.tweenFromTo = function(r, n, o) {
    return this.tweenTo(n, Ce({
      startAt: {
        time: Ee(this, r)
      }
    }, o));
  }, i.recent = function() {
    return this._recent;
  }, i.nextLabel = function(r) {
    return r === void 0 && (r = this._time), yo(this, Ee(this, r));
  }, i.previousLabel = function(r) {
    return r === void 0 && (r = this._time), yo(this, Ee(this, r), 1);
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
      yr(o, o === ct && o._time > n ? o._time : n, 1, 1), o._dirty = 0;
    }
    return o._tDur;
  }, t.updateRoot = function(r) {
    if (ct._ts && (ha(ct, Fn(r, ct)), ca = ye.frame), ye.frame >= _o) {
      _o += be.autoSleep || 120;
      var n = ct._first;
      if ((!n || !n._ts) && be.autoSleep && ye._listeners.length < 2) {
        for (; n && !n._ts; )
          n = n._next;
        n || ye.sleep();
      }
    }
  }, t;
})(tn);
Ce(oe.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var pu = function(t, i, e, r, n, o, a) {
  var l = new ue(this._pt, t, i, 0, 1, Ia, null, n), u = 0, c = 0, d, h, f, _, p, m, S, w;
  for (l.b = e, l.e = r, e += "", r += "", (S = ~r.indexOf("random(")) && (r = jr(r)), o && (w = [e, r], o(w, t, i), e = w[0], r = w[1]), h = e.match(Kn) || []; d = Kn.exec(r); )
    _ = d[0], p = r.substring(u, d.index), f ? f = (f + 1) % 5 : p.substr(-5) === "rgba(" && (f = 1), _ !== h[c++] && (m = parseFloat(h[c - 1]) || 0, l._pt = {
      _next: l._pt,
      p: p || c === 1 ? p : ",",
      //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
      s: m,
      c: _.charAt(1) === "=" ? cr(m, _) - m : parseFloat(_) - m,
      m: f && f < 4 ? Math.round : 0
    }, u = Kn.lastIndex);
  return l.c = u < r.length ? r.substring(u, r.length) : "", l.fp = a, (oa.test(r) || S) && (l.e = 0), this._pt = l, l;
}, qs = function(t, i, e, r, n, o, a, l, u, c) {
  _t(r) && (r = r(n || 0, t, o));
  var d = t[i], h = e !== "get" ? e : _t(d) ? u ? t[i.indexOf("set") || !_t(t["get" + i.substr(3)]) ? i : "get" + i.substr(3)](u) : t[i]() : d, f = _t(d) ? u ? yu : Fa : Gs, _;
  if (Dt(r) && (~r.indexOf("random(") && (r = jr(r)), r.charAt(1) === "=" && (_ = cr(h, r) + (Ut(h) || 0), (_ || _ === 0) && (r = _))), !c || h !== r || vs)
    return !isNaN(h * r) && r !== "" ? (_ = new ue(this._pt, t, i, +h || 0, r - (h || 0), typeof d == "boolean" ? xu : Na, 0, f), u && (_.fp = u), a && _.modifier(a, this, t), this._pt = _) : (!d && !(i in t) && Xs(i, r), pu.call(this, t, i, h, r, f, l || be.stringFilter, u));
}, _u = function(t, i, e, r, n) {
  if (_t(t) && (t = Yr(t, n, i, e, r)), !Ke(t) || t.style && t.nodeType || $t(t) || na(t))
    return Dt(t) ? Yr(t, n, i, e, r) : t;
  var o = {}, a;
  for (a in t)
    o[a] = Yr(t[a], n, i, e, r);
  return o;
}, Aa = function(t, i, e, r, n, o) {
  var a, l, u, c;
  if (me[t] && (a = new me[t]()).init(n, a.rawVars ? i[t] : _u(i[t], r, n, o, e), e, r, o) !== !1 && (e._pt = l = new ue(e._pt, n, t, 0, 1, a.render, a, 0, a.priority), e !== lr))
    for (u = e._ptLookup[e._targets.indexOf(n)], c = a._props.length; c--; )
      u[a._props[c]] = l;
  return a;
}, gi, vs, $s = function s(t, i, e) {
  var r = t.vars, n = r.ease, o = r.startAt, a = r.immediateRender, l = r.lazy, u = r.onUpdate, c = r.runBackwards, d = r.yoyoEase, h = r.keyframes, f = r.autoRevert, _ = t._dur, p = t._startAt, m = t._targets, S = t.parent, w = S && S.data === "nested" ? S.vars.targets : m, T = t._overwrite === "auto" && !Ns, v = t.timeline, b = r.easeReverse || d, E, x, P, k, C, Y, M, G, N, K, U, A, Q;
  if (v && (!h || !n) && (n = "none"), t._ease = Vi(n, Kr.ease), t._rEase = b && (Vi(b) || t._ease), t._from = !v && !!r.runBackwards, t._from && (t.ratio = 1), !v || h && !r.stagger) {
    if (G = m[0] ? Xi(m[0]).harness : 0, A = G && r[G.prop], E = zn(r, Ws), p && (p._zTime < 0 && p.progress(1), i < 0 && c && a && !f ? p.render(-1, !0) : p.revert(c && _ ? bn : Wl), p._lazy = 0), o) {
      if (Ti(t._startAt = Tt.set(m, Ce({
        data: "isStart",
        overwrite: !1,
        parent: S,
        immediateRender: !0,
        lazy: !p && ae(l),
        startAt: null,
        delay: 0,
        onUpdate: u && function() {
          return xe(t, "onUpdate");
        },
        stagger: 0
      }, o))), t._startAt._dp = 0, t._startAt._sat = t, i < 0 && (Nt || !a && !f) && t._startAt.revert(bn), a && _ && i <= 0 && e <= 0) {
        i && (t._zTime = i);
        return;
      }
    } else if (c && _ && !p) {
      if (i && (a = !1), P = Ce({
        overwrite: !1,
        data: "isFromStart",
        //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
        lazy: a && !p && ae(l),
        immediateRender: a,
        //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
        stagger: 0,
        parent: S
        //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
      }, E), A && (P[G.prop] = A), Ti(t._startAt = Tt.set(m, P)), t._startAt._dp = 0, t._startAt._sat = t, i < 0 && (Nt ? t._startAt.revert(bn) : t._startAt.render(-1, !0)), t._zTime = i, !a)
        s(t._startAt, nt, nt);
      else if (!i)
        return;
    }
    for (t._pt = t._ptCache = 0, l = _ && ae(l) || l && !_, x = 0; x < m.length; x++) {
      if (C = m[x], M = C._gsap || Hs(m)[x]._gsap, t._ptLookup[x] = K = {}, hs[M.id] && xi.length && Ln(), U = w === m ? x : w.indexOf(C), G && (N = new G()).init(C, A || E, t, U, w) !== !1 && (t._pt = k = new ue(t._pt, C, N.name, 0, 1, N.render, N, 0, N.priority), N._props.forEach(function(et) {
        K[et] = k;
      }), N.priority && (Y = 1)), !G || A)
        for (P in E)
          me[P] && (N = Aa(P, E, t, U, C, w)) ? N.priority && (Y = 1) : K[P] = k = qs.call(t, C, P, "get", E[P], U, w, 0, r.stringFilter);
      t._op && t._op[x] && t.kill(C, t._op[x]), T && t._pt && (gi = t, ct.killTweensOf(C, K, t.globalTime(i)), Q = !t.parent, gi = 0), t._pt && l && (hs[M.id] = 1);
    }
    Y && Ya(t), t._onInit && t._onInit(t);
  }
  t._onUpdate = u, t._initted = (!t._op || t._pt) && !Q, h && i <= 0 && v.render(Me, !0, !0);
}, gu = function(t, i, e, r, n, o, a, l) {
  var u = (t._pt && t._ptCache || (t._ptCache = {}))[i], c, d, h, f;
  if (!u)
    for (u = t._ptCache[i] = [], h = t._ptLookup, f = t._targets.length; f--; ) {
      if (c = h[f][i], c && c.d && c.d._pt)
        for (c = c.d._pt; c && c.p !== i && c.fp !== i; )
          c = c._next;
      if (!c)
        return vs = 1, t.vars[i] = "+=0", $s(t, a), vs = 0, l ? Qr(i + " not eligible for reset. Try splitting into individual properties") : 1;
      u.push(c);
    }
  for (f = u.length; f--; )
    d = u[f], c = d._pt || d, c.s = (r || r === 0) && !n ? r : c.s + (r || 0) + o * c.c, c.c = e - c.s, d.e && (d.e = yt(e) + Ut(d.e)), d.b && (d.b = c.s + Ut(d.b));
}, mu = function(t, i) {
  var e = t[0] ? Xi(t[0]).harness : 0, r = e && e.aliases, n, o, a, l;
  if (!r)
    return i;
  n = mr({}, i);
  for (o in r)
    if (o in n)
      for (l = r[o].split(","), a = l.length; a--; )
        n[l[a]] = n[o];
  return n;
}, vu = function(t, i, e, r) {
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
}, Yr = function(t, i, e, r, n) {
  return _t(t) ? t.call(i, e, r, n) : Dt(t) && ~t.indexOf("random(") ? jr(t) : t;
}, La = Vs + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert", za = {};
le(La + ",id,stagger,delay,duration,paused,scrollTrigger", function(s) {
  return za[s] = 1;
});
var Tt = /* @__PURE__ */ (function(s) {
  ia(t, s);
  function t(e, r, n, o) {
    var a;
    typeof r == "number" && (n.duration = r, r = n, n = null), a = s.call(this, o ? r : Nr(r)) || this;
    var l = a.vars, u = l.duration, c = l.delay, d = l.immediateRender, h = l.stagger, f = l.overwrite, _ = l.keyframes, p = l.defaults, m = l.scrollTrigger, S = r.parent || ct, w = ($t(e) || na(e) ? oi(e[0]) : "length" in r) ? [e] : Re(e), T, v, b, E, x, P, k, C;
    if (a._targets = w.length ? Hs(w) : Qr("GSAP target " + e + " not found. https://gsap.com", !be.nullTargetWarn) || [], a._ptLookup = [], a._overwrite = f, _ || h || cn(u) || cn(c)) {
      r = a.vars;
      var Y = r.easeReverse || r.yoyoEase;
      if (T = a.timeline = new oe({
        data: "nested",
        defaults: p || {},
        targets: S && S.data === "nested" ? S.vars.targets : w
      }), T.kill(), T.parent = T._dp = ei(a), T._start = 0, h || cn(u) || cn(c)) {
        if (E = w.length, k = h && xa(h), Ke(h))
          for (x in h)
            ~La.indexOf(x) && (C || (C = {}), C[x] = h[x]);
        for (v = 0; v < E; v++)
          b = zn(r, za), b.stagger = 0, Y && (b.easeReverse = Y), C && mr(b, C), P = w[v], b.duration = +Yr(u, ei(a), v, P, w), b.delay = (+Yr(c, ei(a), v, P, w) || 0) - a._delay, !h && E === 1 && b.delay && (a._delay = c = b.delay, a._start += c, b.delay = 0), T.to(P, b, k ? k(v, P, w) : 0), T._ease = $.none;
        T.duration() ? u = c = 0 : a.timeline = 0;
      } else if (_) {
        Nr(Ce(T.vars.defaults, {
          ease: "none"
        })), T._ease = Vi(_.ease || r.ease || "none");
        var M = 0, G, N, K;
        if ($t(_))
          _.forEach(function(U) {
            return T.to(w, U, ">");
          }), T.duration();
        else {
          b = {};
          for (x in _)
            x === "ease" || x === "easeEach" || vu(x, _[x], b, _.easeEach);
          for (x in b)
            for (G = b[x].sort(function(U, A) {
              return U.t - A.t;
            }), M = 0, v = 0; v < G.length; v++)
              N = G[v], K = {
                ease: N.e,
                duration: (N.t - (v ? G[v - 1].t : 0)) / 100 * u
              }, K[x] = N.v, T.to(w, K, M), M += K.duration;
          T.duration() < u && T.to({}, {
            duration: u - T.duration()
          });
        }
      }
      u || a.duration(u = T.duration());
    } else
      a.timeline = 0;
    return f === !0 && !Ns && (gi = ei(a), ct.killTweensOf(w), gi = 0), Ue(S, ei(a), n), r.reversed && a.reverse(), r.paused && a.paused(!0), (d || !u && !_ && a._start === ut(S._time) && ae(d) && Gl(ei(a)) && S.data !== "nested") && (a._tTime = -nt, a.render(Math.max(0, -c) || 0)), m && ma(ei(a), m), a;
  }
  var i = t.prototype;
  return i.render = function(r, n, o) {
    var a = this._time, l = this._tDur, u = this._dur, c = r < 0, d = r > l - nt && !c ? l : r < nt ? 0 : r, h, f, _, p, m, S, w, T;
    if (!u)
      Ql(this, r, n, o);
    else if (d !== this._tTime || !r || o || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== c || this._lazy) {
      if (h = d, T = this.timeline, this._repeat) {
        if (p = u + this._rDelay, this._repeat < -1 && c)
          return this.totalTime(p * 100 + r, n, o);
        if (h = ut(d % p), d === l ? (_ = this._repeat, h = u) : (m = ut(d / p), _ = ~~m, _ && _ === m ? (h = u, _--) : h > u && (h = u)), S = this._yoyo && _ & 1, S && (h = u - h), m = vr(this._tTime, p), h === a && !o && this._initted && _ === m)
          return this._tTime = d, this;
        _ !== m && this.vars.repeatRefresh && !S && !this._lock && h !== p && this._initted && (this._lock = o = 1, this.render(ut(p * _), !0).invalidate()._lock = 0);
      }
      if (!this._initted) {
        if (va(this, c ? r : h, o, n, d))
          return this._tTime = 0, this;
        if (a !== this._time && !(o && this.vars.repeatRefresh && _ !== m))
          return this;
        if (u !== this._dur)
          return this.render(r, n, o);
      }
      if (this._rEase) {
        var v = h < a;
        if (v !== this._inv) {
          var b = v ? a : u - a;
          this._inv = v, this._from && (this.ratio = 1 - this.ratio), this._invRatio = this.ratio, this._invTime = a, this._invRecip = b ? (v ? -1 : 1) / b : 0, this._invScale = v ? -this.ratio : 1 - this.ratio, this._invEase = v ? this._rEase : this._ease;
        }
        this.ratio = w = this._invRatio + this._invScale * this._invEase((h - this._invTime) * this._invRecip);
      } else
        this.ratio = w = this._ease(h / u);
      if (this._from && (this.ratio = w = 1 - w), this._tTime = d, this._time = h, !this._act && this._ts && (this._act = 1, this._lazy = 0), !a && d && !n && !m && (xe(this, "onStart"), this._tTime !== d))
        return this;
      for (f = this._pt; f; )
        f.r(w, f.d), f = f._next;
      T && T.render(r < 0 ? r : T._dur * T._ease(h / this._dur), n, o) || this._startAt && (this._zTime = r), this._onUpdate && !n && (c && ds(this, r, n, o), xe(this, "onUpdate")), this._repeat && _ !== m && this.vars.onRepeat && !n && this.parent && xe(this, "onRepeat"), (d === this._tDur || !d) && this._tTime === d && (c && !this._onUpdate && ds(this, r, !0, !0), (r || !u) && (d === this._tDur && this._ts > 0 || !d && this._ts < 0) && Ti(this, 1), !n && !(c && !a) && (d || a || S) && (xe(this, d === l ? "onComplete" : "onReverseComplete", !0), this._prom && !(d < l && this.timeScale() > 0) && this._prom()));
    }
    return this;
  }, i.targets = function() {
    return this._targets;
  }, i.invalidate = function(r) {
    return (!r || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(r), s.prototype.invalidate.call(this, r);
  }, i.resetTo = function(r, n, o, a, l) {
    Jr || ye.wake(), this._ts || this.play();
    var u = Math.min(this._dur, (this._dp._time - this._start) * this._ts), c;
    return this._initted || $s(this, u), c = this._ease(u / this._dur), gu(this, r, n, o, a, c, u, l) ? this.resetTo(r, n, o, a, 1) : (qn(this, 0), this.parent || _a(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0));
  }, i.kill = function(r, n) {
    if (n === void 0 && (n = "all"), !r && (!n || n === "all"))
      return this._lazy = this._pt = 0, this.parent ? Mr(this) : this.scrollTrigger && this.scrollTrigger.kill(!!Nt), this;
    if (this.timeline) {
      var o = this.timeline.totalDuration();
      return this.timeline.killTweensOf(r, n, gi && gi.vars.overwrite !== !0)._first || Mr(this), this.parent && o !== this.timeline.totalDuration() && yr(this, this._dur * this.timeline._tDur / o, 0, 1), this;
    }
    var a = this._targets, l = r ? Re(r) : a, u = this._ptLookup, c = this._pt, d, h, f, _, p, m, S;
    if ((!n || n === "all") && ql(a, l))
      return n === "all" && (this._pt = 0), Mr(this);
    for (d = this._op = this._op || [], n !== "all" && (Dt(n) && (p = {}, le(n, function(w) {
      return p[w] = 1;
    }), n = p), n = mu(a, n)), S = a.length; S--; )
      if (~l.indexOf(a[S])) {
        h = u[S], n === "all" ? (d[S] = n, _ = h, f = {}) : (f = d[S] = d[S] || {}, _ = n);
        for (p in _)
          m = h && h[p], m && ((!("kill" in m.d) || m.d.kill(p) === !0) && Hn(this, m, "_pt"), delete h[p]), f !== "all" && (f[p] = 1);
      }
    return this._initted && !this._pt && c && Mr(this), this;
  }, t.to = function(r, n) {
    return new t(r, n, arguments[2]);
  }, t.from = function(r, n) {
    return Ir(1, arguments);
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
    return Ir(2, arguments);
  }, t.set = function(r, n) {
    return n.duration = 0, n.repeatDelay || (n.repeat = 0), new t(r, n);
  }, t.killTweensOf = function(r, n, o) {
    return ct.killTweensOf(r, n, o);
  }, t;
})(tn);
Ce(Tt.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
});
le("staggerTo,staggerFrom,staggerFromTo", function(s) {
  Tt[s] = function() {
    var t = new oe(), i = _s.call(arguments, 0);
    return i.splice(s === "staggerFromTo" ? 5 : 4, 0, 0), t[s].apply(t, i);
  };
});
var Gs = function(t, i, e) {
  return t[i] = e;
}, Fa = function(t, i, e) {
  return t[i](e);
}, yu = function(t, i, e, r) {
  return t[i](r.fp, e);
}, wu = function(t, i, e) {
  return t.setAttribute(i, e);
}, Ks = function(t, i) {
  return _t(t[i]) ? Fa : Is(t[i]) && t.setAttribute ? wu : Gs;
}, Na = function(t, i) {
  return i.set(i.t, i.p, Math.round((i.s + i.c * t) * 1e6) / 1e6, i);
}, xu = function(t, i) {
  return i.set(i.t, i.p, !!(i.s + i.c * t), i);
}, Ia = function(t, i) {
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
}, Qs = function(t, i) {
  for (var e = i._pt; e; )
    e.r(t, e.d), e = e._next;
}, Su = function(t, i, e, r) {
  for (var n = this._pt, o; n; )
    o = n._next, n.p === r && n.modifier(t, i, e), n = o;
}, bu = function(t) {
  for (var i = this._pt, e, r; i; )
    r = i._next, i.p === t && !i.op || i.op === t ? Hn(this, i, "_pt") : i.dep || (e = 1), i = r;
  return !e;
}, Tu = function(t, i, e, r) {
  r.mSet(t, i, r.m.call(r.tween, e, r.mt), r);
}, Ya = function(t) {
  for (var i = t._pt, e, r, n, o; i; ) {
    for (e = i._next, r = n; r && r.pr > i.pr; )
      r = r._next;
    (i._prev = r ? r._prev : o) ? i._prev._next = i : n = i, (i._next = r) ? r._prev = i : o = i, i = e;
  }
  t._pt = n;
}, ue = /* @__PURE__ */ (function() {
  function s(i, e, r, n, o, a, l, u, c) {
    this.t = e, this.s = n, this.c = o, this.p = r, this.r = a || Na, this.d = l || this, this.set = u || Gs, this.pr = c || 0, this._next = i, i && (i._prev = this);
  }
  var t = s.prototype;
  return t.modifier = function(e, r, n) {
    this.mSet = this.mSet || this.set, this.set = Tu, this.m = e, this.mt = n, this.tween = r;
  }, s;
})();
le(Vs + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse", function(s) {
  return Ws[s] = 1;
});
Te.TweenMax = Te.TweenLite = Tt;
Te.TimelineLite = Te.TimelineMax = oe;
ct = new oe({
  sortChildren: !1,
  defaults: Kr,
  autoRemoveChildren: !0,
  id: "root",
  smoothChildTiming: !0
});
be.stringFilter = Ma;
var Hi = [], Cn = {}, Cu = [], xo = 0, ku = 0, ts = function(t) {
  return (Cn[t] || Cu).map(function(i) {
    return i();
  });
}, ys = function() {
  var t = Date.now(), i = [];
  t - xo > 2 && (ts("matchMediaInit"), Hi.forEach(function(e) {
    var r = e.queries, n = e.conditions, o, a, l, u;
    for (a in r)
      o = Ve.matchMedia(r[a]).matches, o && (l = 1), o !== n[a] && (n[a] = o, u = 1);
    u && (e.revert(), l && i.push(e));
  }), ts("matchMediaRevert"), i.forEach(function(e) {
    return e.onMatch(e, function(r) {
      return e.add(null, r);
    });
  }), xo = t, ts("matchMedia"));
}, Ba = /* @__PURE__ */ (function() {
  function s(i, e) {
    this.selector = e && gs(e), this.data = [], this._r = [], this.isReverted = !1, this.id = ku++, i && this.add(i);
  }
  var t = s.prototype;
  return t.add = function(e, r, n) {
    _t(e) && (n = r, r = e, e = _t);
    var o = this, a = function() {
      var u = at, c = o.selector, d;
      return u && u !== o && u.data.push(o), n && (o.selector = gs(n)), at = o, d = r.apply(o, arguments), _t(d) && o._r.push(d), at = u, o.selector = c, o.isReverted = !1, d;
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
      for (var o = Hi.length; o--; )
        Hi[o].id === this.id && Hi.splice(o, 1);
  }, t.revert = function(e) {
    this.kill(e || {});
  }, s;
})(), Eu = /* @__PURE__ */ (function() {
  function s(i) {
    this.contexts = [], this.scope = i, at && at.data.push(this);
  }
  var t = s.prototype;
  return t.add = function(e, r, n) {
    Ke(e) || (e = {
      matches: e
    });
    var o = new Ba(0, n || this.scope), a = o.conditions = {}, l, u, c;
    at && !o.selector && (o.selector = at.selector), this.contexts.push(o), r = o.add("onMatch", r), o.queries = e;
    for (u in e)
      u === "all" ? c = 1 : (l = Ve.matchMedia(e[u]), l && (Hi.indexOf(o) < 0 && Hi.push(o), (a[u] = l.matches) && (c = 1), l.addListener ? l.addListener(ys) : l.addEventListener("change", ys)));
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
})(), Nn = {
  registerPlugin: function() {
    for (var t = arguments.length, i = new Array(t), e = 0; e < t; e++)
      i[e] = arguments[e];
    i.forEach(function(r) {
      return Ea(r);
    });
  },
  timeline: function(t) {
    return new oe(t);
  },
  getTweensOf: function(t, i) {
    return ct.getTweensOf(t, i);
  },
  getProperty: function(t, i, e, r) {
    Dt(t) && (t = Re(t)[0]);
    var n = Xi(t || {}).get, o = e ? pa : da;
    return e === "native" && (e = ""), t && (i ? o((me[i] && me[i].get || n)(t, i, e, r)) : function(a, l, u) {
      return o((me[a] && me[a].get || n)(t, a, l, u));
    });
  },
  quickSetter: function(t, i, e) {
    if (t = Re(t), t.length > 1) {
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
      lr._pt = 0, d.init(t, e ? c + e : c, lr, 0, [t]), d.render(1, d), lr._pt && Qs(1, lr);
    } : a.set(t, l);
    return o ? u : function(c) {
      return u(t, l, e ? c + e : c, a, 1);
    };
  },
  quickTo: function(t, i, e) {
    var r, n = fe.to(t, Ce((r = {}, r[i] = "+=0.1", r.paused = !0, r.stagger = 0, r), e || {})), o = function(l, u, c) {
      return n.resetTo(i, l, u, c);
    };
    return o.tween = n, o;
  },
  isTweening: function(t) {
    return ct.getTweensOf(t, !0).length > 0;
  },
  defaults: function(t) {
    return t && t.ease && (t.ease = Vi(t.ease, Kr.ease)), go(Kr, t || {});
  },
  config: function(t) {
    return go(be, t || {});
  },
  registerEffect: function(t) {
    var i = t.name, e = t.effect, r = t.plugins, n = t.defaults, o = t.extendTimeline;
    (r || "").split(",").forEach(function(a) {
      return a && !me[a] && !Te[a] && Qr(i + " effect requires " + a + " plugin.");
    }), Qn[i] = function(a, l, u) {
      return e(Re(a), Ce(l || {}, n), u);
    }, o && (oe.prototype[i] = function(a, l, u) {
      return this.add(Qn[i](a, Ke(l) ? l : (u = l) && {}, this), u);
    });
  },
  registerEase: function(t, i) {
    $[t] = Vi(i);
  },
  parseEase: function(t, i) {
    return arguments.length ? Vi(t, i) : $;
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
    return t ? new Ba(t, i) : at;
  },
  matchMedia: function(t) {
    return new Eu(t);
  },
  matchMediaRefresh: function() {
    return Hi.forEach(function(t) {
      var i = t.conditions, e, r;
      for (r in i)
        i[r] && (i[r] = !1, e = 1);
      e && t.revert();
    }) || ys();
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
    wrap: nu,
    wrapYoyo: su,
    distribute: xa,
    random: ba,
    snap: Sa,
    normalize: ru,
    getUnit: Ut,
    clamp: Jl,
    splitColor: Pa,
    toArray: Re,
    selector: gs,
    mapRange: Ca,
    pipe: eu,
    unitize: iu,
    interpolate: ou,
    shuffle: wa
  },
  install: la,
  effects: Qn,
  ticker: ye,
  updateRoot: oe.updateRoot,
  plugins: me,
  globalTimeline: ct,
  core: {
    PropTween: ue,
    globals: ua,
    Tween: Tt,
    Timeline: oe,
    Animation: tn,
    getCache: Xi,
    _removeLinkedListItem: Hn,
    reverting: function() {
      return Nt;
    },
    context: function(t) {
      return t && at && (at.data.push(t), t._ctx = at), at;
    },
    suppressOverwrites: function(t) {
      return Ns = t;
    }
  }
};
le("to,from,fromTo,delayedCall,set,killTweensOf", function(s) {
  return Nn[s] = Tt[s];
});
ye.add(oe.updateRoot);
lr = Nn.to({}, {
  duration: 0
});
var Pu = function(t, i) {
  for (var e = t._pt; e && e.p !== i && e.op !== i && e.fp !== i; )
    e = e._next;
  return e;
}, Ou = function(t, i) {
  var e = t._targets, r, n, o;
  for (r in i)
    for (n = e.length; n--; )
      o = t._ptLookup[n][r], o && (o = o.d) && (o._pt && (o = Pu(o, r)), o && o.modifier && o.modifier(i[r], t, e[n], r));
}, es = function(t, i) {
  return {
    name: t,
    headless: 1,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function(r, n, o) {
      o._onInit = function(a) {
        var l, u;
        if (Dt(n) && (l = {}, le(n, function(c) {
          return l[c] = 1;
        }), n = l), i) {
          l = {};
          for (u in n)
            l[u] = i(n[u]);
          n = l;
        }
        Ou(a, n);
      };
    }
  };
}, fe = Nn.registerPlugin({
  name: "attr",
  init: function(t, i, e, r, n) {
    var o, a, l;
    this.tween = e;
    for (o in i)
      l = t.getAttribute(o) || "", a = this.add(t, "setAttribute", (l || 0) + "", i[o], r, n, 0, 0, o), a.op = o, a.b = l, this._props.push(o);
  },
  render: function(t, i) {
    for (var e = i._pt; e; )
      Nt ? e.set(e.t, e.p, e.b, e) : e.r(t, e.d), e = e._next;
  }
}, {
  name: "endArray",
  headless: 1,
  init: function(t, i) {
    for (var e = i.length; e--; )
      this.add(t, e, t[e] || 0, i[e], 0, 0, 0, 0, 0, 1);
  }
}, es("roundProps", ms), es("modifiers"), es("snap", Sa)) || Nn;
Tt.version = oe.version = fe.version = "3.15.0";
aa = 1;
Ys() && wr();
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
var So, mi, fr, Zs, Yi, bo, js, Mu = function() {
  return typeof window < "u";
}, ai = {}, Fi = 180 / Math.PI, hr = Math.PI / 180, er = Math.atan2, To = 1e8, Js = /([A-Z])/g, Ru = /(left|right|width|margin|padding|x)/i, Du = /[\s,\(]\S/, qe = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
}, ws = function(t, i) {
  return i.set(i.t, i.p, Math.round((i.s + i.c * t) * 1e4) / 1e4 + i.u, i);
}, Au = function(t, i) {
  return i.set(i.t, i.p, t === 1 ? i.e : Math.round((i.s + i.c * t) * 1e4) / 1e4 + i.u, i);
}, Lu = function(t, i) {
  return i.set(i.t, i.p, t ? Math.round((i.s + i.c * t) * 1e4) / 1e4 + i.u : i.b, i);
}, zu = function(t, i) {
  return i.set(i.t, i.p, t === 1 ? i.e : t ? Math.round((i.s + i.c * t) * 1e4) / 1e4 + i.u : i.b, i);
}, Fu = function(t, i) {
  var e = i.s + i.c * t;
  i.set(i.t, i.p, ~~(e + (e < 0 ? -0.5 : 0.5)) + i.u, i);
}, Xa = function(t, i) {
  return i.set(i.t, i.p, t ? i.e : i.b, i);
}, Wa = function(t, i) {
  return i.set(i.t, i.p, t !== 1 ? i.b : i.e, i);
}, Nu = function(t, i, e) {
  return t.style[i] = e;
}, Iu = function(t, i, e) {
  return t.style.setProperty(i, e);
}, Yu = function(t, i, e) {
  return t._gsap[i] = e;
}, Bu = function(t, i, e) {
  return t._gsap.scaleX = t._gsap.scaleY = e;
}, Xu = function(t, i, e, r, n) {
  var o = t._gsap;
  o.scaleX = o.scaleY = e, o.renderTransform(n, o);
}, Wu = function(t, i, e, r, n) {
  var o = t._gsap;
  o[i] = e, o.renderTransform(n, o);
}, ft = "transform", ce = ft + "Origin", Vu = function s(t, i) {
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
}, Va = function(t) {
  t.translate && (t.removeProperty("translate"), t.removeProperty("scale"), t.removeProperty("rotate"));
}, Hu = function() {
  var t = this.props, i = this.target, e = i.style, r = i._gsap, n, o;
  for (n = 0; n < t.length; n += 3)
    t[n + 1] ? t[n + 1] === 2 ? i[t[n]](t[n + 2]) : i[t[n]] = t[n + 2] : t[n + 2] ? e[t[n]] = t[n + 2] : e.removeProperty(t[n].substr(0, 2) === "--" ? t[n] : t[n].replace(Js, "-$1").toLowerCase());
  if (this.tfm) {
    for (o in this.tfm)
      r[o] = this.tfm[o];
    r.svg && (r.renderTransform(), i.setAttribute("data-svg-origin", this.svgo || "")), n = js(), (!n || !n.isStart) && !e[ft] && (Va(e), r.zOrigin && e[ce] && (e[ce] += " " + r.zOrigin + "px", r.zOrigin = 0, r.renderTransform()), r.uncache = 1);
  }
}, Ha = function(t, i) {
  var e = {
    target: t,
    props: [],
    revert: Hu,
    save: Vu
  };
  return t._gsap || fe.core.getCache(t), i && t.style && t.nodeType && i.split(",").forEach(function(r) {
    return e.save(r);
  }), e;
}, Ua, xs = function(t, i) {
  var e = mi.createElementNS ? mi.createElementNS((i || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : mi.createElement(t);
  return e && e.style ? e : mi.createElement(t);
}, Se = function s(t, i, e) {
  var r = getComputedStyle(t);
  return r[i] || r.getPropertyValue(i.replace(Js, "-$1").toLowerCase()) || r.getPropertyValue(i) || !e && s(t, xr(i) || i, 1) || "";
}, Co = "O,Moz,ms,Ms,Webkit".split(","), xr = function(t, i, e) {
  var r = i || Yi, n = r.style, o = 5;
  if (t in n && !e)
    return t;
  for (t = t.charAt(0).toUpperCase() + t.substr(1); o-- && !(Co[o] + t in n); )
    ;
  return o < 0 ? null : (o === 3 ? "ms" : o >= 0 ? Co[o] : "") + t;
}, Ss = function() {
  Mu() && window.document && (So = window, mi = So.document, fr = mi.documentElement, Yi = xs("div") || {
    style: {}
  }, xs("div"), ft = xr(ft), ce = ft + "Origin", Yi.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", Ua = !!xr("perspective"), js = fe.core.reverting, Zs = 1);
}, ko = function(t) {
  var i = t.ownerSVGElement, e = xs("svg", i && i.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), r = t.cloneNode(!0), n;
  r.style.display = "block", e.appendChild(r), fr.appendChild(e);
  try {
    n = r.getBBox();
  } catch {
  }
  return e.removeChild(r), fr.removeChild(e), n;
}, Eo = function(t, i) {
  for (var e = i.length; e--; )
    if (t.hasAttribute(i[e]))
      return t.getAttribute(i[e]);
}, qa = function(t) {
  var i, e;
  try {
    i = t.getBBox();
  } catch {
    i = ko(t), e = 1;
  }
  return i && (i.width || i.height) || e || (i = ko(t)), i && !i.width && !i.x && !i.y ? {
    x: +Eo(t, ["x", "cx", "x1"]) || 0,
    y: +Eo(t, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : i;
}, $a = function(t) {
  return !!(t.getCTM && (!t.parentNode || t.ownerSVGElement) && qa(t));
}, Ci = function(t, i) {
  if (i) {
    var e = t.style, r;
    i in ai && i !== ce && (i = ft), e.removeProperty ? (r = i.substr(0, 2), (r === "ms" || i.substr(0, 6) === "webkit") && (i = "-" + i), e.removeProperty(r === "--" ? i : i.replace(Js, "-$1").toLowerCase())) : e.removeAttribute(i);
  }
}, vi = function(t, i, e, r, n, o) {
  var a = new ue(t._pt, i, e, 0, 1, o ? Wa : Xa);
  return t._pt = a, a.b = r, a.e = n, t._props.push(e), a;
}, Po = {
  deg: 1,
  rad: 1,
  turn: 1
}, Uu = {
  grid: 1,
  flex: 1
}, ki = function s(t, i, e, r) {
  var n = parseFloat(e) || 0, o = (e + "").trim().substr((n + "").length) || "px", a = Yi.style, l = Ru.test(i), u = t.tagName.toLowerCase() === "svg", c = (u ? "client" : "offset") + (l ? "Width" : "Height"), d = 100, h = r === "px", f = r === "%", _, p, m, S;
  if (r === o || !n || Po[r] || Po[o])
    return n;
  if (o !== "px" && !h && (n = s(t, i, e, "px")), S = t.getCTM && $a(t), (f || o === "%") && (ai[i] || ~i.indexOf("adius")))
    return _ = S ? t.getBBox()[l ? "width" : "height"] : t[c], yt(f ? n / _ * d : n / 100 * _);
  if (a[l ? "width" : "height"] = d + (h ? o : r), p = r !== "rem" && ~i.indexOf("adius") || r === "em" && t.appendChild && !u ? t : t.parentNode, S && (p = (t.ownerSVGElement || {}).parentNode), (!p || p === mi || !p.appendChild) && (p = mi.body), m = p._gsap, m && f && m.width && l && m.time === ye.time && !m.uncache)
    return yt(n / m.width * d);
  if (f && (i === "height" || i === "width")) {
    var w = t.style[i];
    t.style[i] = d + r, _ = t[c], w ? t.style[i] = w : Ci(t, i);
  } else
    (f || o === "%") && !Uu[Se(p, "display")] && (a.position = Se(t, "position")), p === t && (a.position = "static"), p.appendChild(Yi), _ = Yi[c], p.removeChild(Yi), a.position = "absolute";
  return l && f && (m = Xi(p), m.time = ye.time, m.width = p[c]), yt(h ? _ * n / d : _ && n ? d / _ * n : 0);
}, ii = function(t, i, e, r) {
  var n;
  return Zs || Ss(), i in qe && i !== "transform" && (i = qe[i], ~i.indexOf(",") && (i = i.split(",")[0])), ai[i] && i !== "transform" ? (n = rn(t, r), n = i !== "transformOrigin" ? n[i] : n.svg ? n.origin : Yn(Se(t, ce)) + " " + n.zOrigin + "px") : (n = t.style[i], (!n || n === "auto" || r || ~(n + "").indexOf("calc(")) && (n = In[i] && In[i](t, i, e) || Se(t, i) || fa(t, i) || (i === "opacity" ? 1 : 0))), e && !~(n + "").trim().indexOf(" ") ? ki(t, i, n, e) + e : n;
}, qu = function(t, i, e, r) {
  if (!e || e === "none") {
    var n = xr(i, t, 1), o = n && Se(t, n, 1);
    o && o !== e ? (i = n, e = o) : i === "borderColor" && (e = Se(t, "borderTopColor"));
  }
  var a = new ue(this._pt, t.style, i, 0, 1, Ia), l = 0, u = 0, c, d, h, f, _, p, m, S, w, T, v, b;
  if (a.b = e, a.e = r, e += "", r += "", r.substring(0, 6) === "var(--" && (r = Se(t, r.substring(4, r.indexOf(")")))), r === "auto" && (p = t.style[i], t.style[i] = r, r = Se(t, i) || r, p ? t.style[i] = p : Ci(t, i)), c = [e, r], Ma(c), e = c[0], r = c[1], h = e.match(ar) || [], b = r.match(ar) || [], b.length) {
    for (; d = ar.exec(r); )
      m = d[0], w = r.substring(l, d.index), _ ? _ = (_ + 1) % 5 : (w.substr(-5) === "rgba(" || w.substr(-5) === "hsla(") && (_ = 1), m !== (p = h[u++] || "") && (f = parseFloat(p) || 0, v = p.substr((f + "").length), m.charAt(1) === "=" && (m = cr(f, m) + v), S = parseFloat(m), T = m.substr((S + "").length), l = ar.lastIndex - T.length, T || (T = T || be.units[i] || v, l === r.length && (r += T, a.e += T)), v !== T && (f = ki(t, i, p, T) || 0), a._pt = {
        _next: a._pt,
        p: w || u === 1 ? w : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: f,
        c: S - f,
        m: _ && _ < 4 || i === "zIndex" ? Math.round : 0
      });
    a.c = l < r.length ? r.substring(l, r.length) : "";
  } else
    a.r = i === "display" && r === "none" ? Wa : Xa;
  return oa.test(r) && (a.e = 0), this._pt = a, a;
}, Oo = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
}, $u = function(t) {
  var i = t.split(" "), e = i[0], r = i[1] || "50%";
  return (e === "top" || e === "bottom" || r === "left" || r === "right") && (t = e, e = r, r = t), i[0] = Oo[e] || e, i[1] = Oo[r] || r, i.join(" ");
}, Gu = function(t, i) {
  if (i.tween && i.tween._time === i.tween._dur) {
    var e = i.t, r = e.style, n = i.u, o = e._gsap, a, l, u;
    if (n === "all" || n === !0)
      r.cssText = "", l = 1;
    else
      for (n = n.split(","), u = n.length; --u > -1; )
        a = n[u], ai[a] && (l = 1, a = a === "transformOrigin" ? ce : ft), Ci(e, a);
    l && (Ci(e, ft), o && (o.svg && e.removeAttribute("transform"), r.scale = r.rotate = r.translate = "none", rn(e, 1), o.uncache = 1, Va(r)));
  }
}, In = {
  clearProps: function(t, i, e, r, n) {
    if (n.data !== "isFromStart") {
      var o = t._pt = new ue(t._pt, i, e, 0, 0, Gu);
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
}, en = [1, 0, 0, 1, 0, 0], Ga = {}, Ka = function(t) {
  return t === "matrix(1, 0, 0, 1, 0, 0)" || t === "none" || !t;
}, Mo = function(t) {
  var i = Se(t, ft);
  return Ka(i) ? en : i.substr(7).match(sa).map(yt);
}, to = function(t, i) {
  var e = t._gsap || Xi(t), r = t.style, n = Mo(t), o, a, l, u;
  return e.svg && t.getAttribute("transform") ? (l = t.transform.baseVal.consolidate().matrix, n = [l.a, l.b, l.c, l.d, l.e, l.f], n.join(",") === "1,0,0,1,0,0" ? en : n) : (n === en && !t.offsetParent && t !== fr && !e.svg && (l = r.display, r.display = "block", o = t.parentNode, (!o || !t.offsetParent && !t.getBoundingClientRect().width) && (u = 1, a = t.nextElementSibling, fr.appendChild(t)), n = Mo(t), l ? r.display = l : Ci(t, "display"), u && (a ? o.insertBefore(t, a) : o ? o.appendChild(t) : fr.removeChild(t))), i && n.length > 6 ? [n[0], n[1], n[4], n[5], n[12], n[13]] : n);
}, bs = function(t, i, e, r, n, o) {
  var a = t._gsap, l = n || to(t, !0), u = a.xOrigin || 0, c = a.yOrigin || 0, d = a.xOffset || 0, h = a.yOffset || 0, f = l[0], _ = l[1], p = l[2], m = l[3], S = l[4], w = l[5], T = i.split(" "), v = parseFloat(T[0]) || 0, b = parseFloat(T[1]) || 0, E, x, P, k;
  e ? l !== en && (x = f * m - _ * p) && (P = v * (m / x) + b * (-p / x) + (p * w - m * S) / x, k = v * (-_ / x) + b * (f / x) - (f * w - _ * S) / x, v = P, b = k) : (E = qa(t), v = E.x + (~T[0].indexOf("%") ? v / 100 * E.width : v), b = E.y + (~(T[1] || T[0]).indexOf("%") ? b / 100 * E.height : b)), r || r !== !1 && a.smooth ? (S = v - u, w = b - c, a.xOffset = d + (S * f + w * p) - S, a.yOffset = h + (S * _ + w * m) - w) : a.xOffset = a.yOffset = 0, a.xOrigin = v, a.yOrigin = b, a.smooth = !!r, a.origin = i, a.originIsAbsolute = !!e, t.style[ce] = "0px 0px", o && (vi(o, a, "xOrigin", u, v), vi(o, a, "yOrigin", c, b), vi(o, a, "xOffset", d, a.xOffset), vi(o, a, "yOffset", h, a.yOffset)), t.setAttribute("data-svg-origin", v + " " + b);
}, rn = function(t, i) {
  var e = t._gsap || new Da(t);
  if ("x" in e && !i && !e.uncache)
    return e;
  var r = t.style, n = e.scaleX < 0, o = "px", a = "deg", l = getComputedStyle(t), u = Se(t, ce) || "0", c, d, h, f, _, p, m, S, w, T, v, b, E, x, P, k, C, Y, M, G, N, K, U, A, Q, et, g, st, Gt, Ae, ht, At;
  return c = d = h = p = m = S = w = T = v = 0, f = _ = 1, e.svg = !!(t.getCTM && $a(t)), l.translate && ((l.translate !== "none" || l.scale !== "none" || l.rotate !== "none") && (r[ft] = (l.translate !== "none" ? "translate3d(" + (l.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (l.rotate !== "none" ? "rotate(" + l.rotate + ") " : "") + (l.scale !== "none" ? "scale(" + l.scale.split(" ").join(",") + ") " : "") + (l[ft] !== "none" ? l[ft] : "")), r.scale = r.rotate = r.translate = "none"), x = to(t, e.svg), e.svg && (e.uncache ? (Q = t.getBBox(), u = e.xOrigin - Q.x + "px " + (e.yOrigin - Q.y) + "px", A = "") : A = !i && t.getAttribute("data-svg-origin"), bs(t, A || u, !!A || e.originIsAbsolute, e.smooth !== !1, x)), b = e.xOrigin || 0, E = e.yOrigin || 0, x !== en && (Y = x[0], M = x[1], G = x[2], N = x[3], c = K = x[4], d = U = x[5], x.length === 6 ? (f = Math.sqrt(Y * Y + M * M), _ = Math.sqrt(N * N + G * G), p = Y || M ? er(M, Y) * Fi : 0, w = G || N ? er(G, N) * Fi + p : 0, w && (_ *= Math.abs(Math.cos(w * hr))), e.svg && (c -= b - (b * Y + E * G), d -= E - (b * M + E * N))) : (At = x[6], Ae = x[7], g = x[8], st = x[9], Gt = x[10], ht = x[11], c = x[12], d = x[13], h = x[14], P = er(At, Gt), m = P * Fi, P && (k = Math.cos(-P), C = Math.sin(-P), A = K * k + g * C, Q = U * k + st * C, et = At * k + Gt * C, g = K * -C + g * k, st = U * -C + st * k, Gt = At * -C + Gt * k, ht = Ae * -C + ht * k, K = A, U = Q, At = et), P = er(-G, Gt), S = P * Fi, P && (k = Math.cos(-P), C = Math.sin(-P), A = Y * k - g * C, Q = M * k - st * C, et = G * k - Gt * C, ht = N * C + ht * k, Y = A, M = Q, G = et), P = er(M, Y), p = P * Fi, P && (k = Math.cos(P), C = Math.sin(P), A = Y * k + M * C, Q = K * k + U * C, M = M * k - Y * C, U = U * k - K * C, Y = A, K = Q), m && Math.abs(m) + Math.abs(p) > 359.9 && (m = p = 0, S = 180 - S), f = yt(Math.sqrt(Y * Y + M * M + G * G)), _ = yt(Math.sqrt(U * U + At * At)), P = er(K, U), w = Math.abs(P) > 2e-4 ? P * Fi : 0, v = ht ? 1 / (ht < 0 ? -ht : ht) : 0), e.svg && (A = t.getAttribute("transform"), e.forceCSS = t.setAttribute("transform", "") || !Ka(Se(t, ft)), A && t.setAttribute("transform", A))), Math.abs(w) > 90 && Math.abs(w) < 270 && (n ? (f *= -1, w += p <= 0 ? 180 : -180, p += p <= 0 ? 180 : -180) : (_ *= -1, w += w <= 0 ? 180 : -180)), i = i || e.uncache, e.x = c - ((e.xPercent = c && (!i && e.xPercent || (Math.round(t.offsetWidth / 2) === Math.round(-c) ? -50 : 0))) ? t.offsetWidth * e.xPercent / 100 : 0) + o, e.y = d - ((e.yPercent = d && (!i && e.yPercent || (Math.round(t.offsetHeight / 2) === Math.round(-d) ? -50 : 0))) ? t.offsetHeight * e.yPercent / 100 : 0) + o, e.z = h + o, e.scaleX = yt(f), e.scaleY = yt(_), e.rotation = yt(p) + a, e.rotationX = yt(m) + a, e.rotationY = yt(S) + a, e.skewX = w + a, e.skewY = T + a, e.transformPerspective = v + o, (e.zOrigin = parseFloat(u.split(" ")[2]) || !i && e.zOrigin || 0) && (r[ce] = Yn(u)), e.xOffset = e.yOffset = 0, e.force3D = be.force3D, e.renderTransform = e.svg ? Qu : Ua ? Qa : Ku, e.uncache = 0, e;
}, Yn = function(t) {
  return (t = t.split(" "))[0] + " " + t[1];
}, is = function(t, i, e) {
  var r = Ut(i);
  return yt(parseFloat(i) + parseFloat(ki(t, "x", e + "px", r))) + r;
}, Ku = function(t, i) {
  i.z = "0px", i.rotationY = i.rotationX = "0deg", i.force3D = 0, Qa(t, i);
}, Li = "0deg", Er = "0px", zi = ") ", Qa = function(t, i) {
  var e = i || this, r = e.xPercent, n = e.yPercent, o = e.x, a = e.y, l = e.z, u = e.rotation, c = e.rotationY, d = e.rotationX, h = e.skewX, f = e.skewY, _ = e.scaleX, p = e.scaleY, m = e.transformPerspective, S = e.force3D, w = e.target, T = e.zOrigin, v = "", b = S === "auto" && t && t !== 1 || S === !0;
  if (T && (d !== Li || c !== Li)) {
    var E = parseFloat(c) * hr, x = Math.sin(E), P = Math.cos(E), k;
    E = parseFloat(d) * hr, k = Math.cos(E), o = is(w, o, x * k * -T), a = is(w, a, -Math.sin(E) * -T), l = is(w, l, P * k * -T + T);
  }
  m !== Er && (v += "perspective(" + m + zi), (r || n) && (v += "translate(" + r + "%, " + n + "%) "), (b || o !== Er || a !== Er || l !== Er) && (v += l !== Er || b ? "translate3d(" + o + ", " + a + ", " + l + ") " : "translate(" + o + ", " + a + zi), u !== Li && (v += "rotate(" + u + zi), c !== Li && (v += "rotateY(" + c + zi), d !== Li && (v += "rotateX(" + d + zi), (h !== Li || f !== Li) && (v += "skew(" + h + ", " + f + zi), (_ !== 1 || p !== 1) && (v += "scale(" + _ + ", " + p + zi), w.style[ft] = v || "translate(0, 0)";
}, Qu = function(t, i) {
  var e = i || this, r = e.xPercent, n = e.yPercent, o = e.x, a = e.y, l = e.rotation, u = e.skewX, c = e.skewY, d = e.scaleX, h = e.scaleY, f = e.target, _ = e.xOrigin, p = e.yOrigin, m = e.xOffset, S = e.yOffset, w = e.forceCSS, T = parseFloat(o), v = parseFloat(a), b, E, x, P, k;
  l = parseFloat(l), u = parseFloat(u), c = parseFloat(c), c && (c = parseFloat(c), u += c, l += c), l || u ? (l *= hr, u *= hr, b = Math.cos(l) * d, E = Math.sin(l) * d, x = Math.sin(l - u) * -h, P = Math.cos(l - u) * h, u && (c *= hr, k = Math.tan(u - c), k = Math.sqrt(1 + k * k), x *= k, P *= k, c && (k = Math.tan(c), k = Math.sqrt(1 + k * k), b *= k, E *= k)), b = yt(b), E = yt(E), x = yt(x), P = yt(P)) : (b = d, P = h, E = x = 0), (T && !~(o + "").indexOf("px") || v && !~(a + "").indexOf("px")) && (T = ki(f, "x", o, "px"), v = ki(f, "y", a, "px")), (_ || p || m || S) && (T = yt(T + _ - (_ * b + p * x) + m), v = yt(v + p - (_ * E + p * P) + S)), (r || n) && (k = f.getBBox(), T = yt(T + r / 100 * k.width), v = yt(v + n / 100 * k.height)), k = "matrix(" + b + "," + E + "," + x + "," + P + "," + T + "," + v + ")", f.setAttribute("transform", k), w && (f.style[ft] = k);
}, Zu = function(t, i, e, r, n) {
  var o = 360, a = Dt(n), l = parseFloat(n) * (a && ~n.indexOf("rad") ? Fi : 1), u = l - r, c = r + u + "deg", d, h;
  return a && (d = n.split("_")[1], d === "short" && (u %= o, u !== u % (o / 2) && (u += u < 0 ? o : -o)), d === "cw" && u < 0 ? u = (u + o * To) % o - ~~(u / o) * o : d === "ccw" && u > 0 && (u = (u - o * To) % o - ~~(u / o) * o)), t._pt = h = new ue(t._pt, i, e, r, u, Au), h.e = c, h.u = "deg", t._props.push(e), h;
}, Ro = function(t, i) {
  for (var e in i)
    t[e] = i[e];
  return t;
}, ju = function(t, i, e) {
  var r = Ro({}, e._gsap), n = "perspective,force3D,transformOrigin,svgOrigin", o = e.style, a, l, u, c, d, h, f, _;
  r.svg ? (u = e.getAttribute("transform"), e.setAttribute("transform", ""), o[ft] = i, a = rn(e, 1), Ci(e, ft), e.setAttribute("transform", u)) : (u = getComputedStyle(e)[ft], o[ft] = i, a = rn(e, 1), o[ft] = u);
  for (l in ai)
    u = r[l], c = a[l], u !== c && n.indexOf(l) < 0 && (f = Ut(u), _ = Ut(c), d = f !== _ ? ki(e, l, u, _) : parseFloat(u), h = parseFloat(c), t._pt = new ue(t._pt, a, l, d, h - d, ws), t._pt.u = _ || 0, t._props.push(l));
  Ro(a, r);
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
var Za = {
  name: "css",
  register: Ss,
  targetTest: function(t) {
    return t.style && t.nodeType;
  },
  init: function(t, i, e, r, n) {
    var o = this._props, a = t.style, l = e.vars.startAt, u, c, d, h, f, _, p, m, S, w, T, v, b, E, x, P, k;
    Zs || Ss(), this.styles = this.styles || Ha(t), P = this.styles.props, this.tween = e;
    for (p in i)
      if (p !== "autoRound" && (c = i[p], !(me[p] && Aa(p, i, e, r, t, n)))) {
        if (f = typeof c, _ = In[p], f === "function" && (c = c.call(e, r, t, n), f = typeof c), f === "string" && ~c.indexOf("random(") && (c = jr(c)), _)
          _(this, t, p, c, e) && (x = 1);
        else if (p.substr(0, 2) === "--")
          u = (getComputedStyle(t).getPropertyValue(p) + "").trim(), c += "", Si.lastIndex = 0, Si.test(u) || (m = Ut(u), S = Ut(c), S ? m !== S && (u = ki(t, p, u, S) + S) : m && (c += m)), this.add(a, "setProperty", u, c, r, n, 0, 0, p), o.push(p), P.push(p, 0, a[p]);
        else if (f !== "undefined") {
          if (l && p in l ? (u = typeof l[p] == "function" ? l[p].call(e, r, t, n) : l[p], Dt(u) && ~u.indexOf("random(") && (u = jr(u)), Ut(u + "") || u === "auto" || (u += be.units[p] || Ut(ii(t, p)) || ""), (u + "").charAt(1) === "=" && (u = ii(t, p))) : u = ii(t, p), h = parseFloat(u), w = f === "string" && c.charAt(1) === "=" && c.substr(0, 2), w && (c = c.substr(2)), d = parseFloat(c), p in qe && (p === "autoAlpha" && (h === 1 && ii(t, "visibility") === "hidden" && d && (h = 0), P.push("visibility", 0, a.visibility), vi(this, a, "visibility", h ? "inherit" : "hidden", d ? "inherit" : "hidden", !d)), p !== "scale" && p !== "transform" && (p = qe[p], ~p.indexOf(",") && (p = p.split(",")[0]))), T = p in ai, T) {
            if (this.styles.save(p), k = c, f === "string" && c.substring(0, 6) === "var(--") {
              if (c = Se(t, c.substring(4, c.indexOf(")"))), c.substring(0, 5) === "calc(") {
                var C = t.style.perspective;
                t.style.perspective = c, c = Se(t, "perspective"), C ? t.style.perspective = C : Ci(t, "perspective");
              }
              d = parseFloat(c);
            }
            if (v || (b = t._gsap, b.renderTransform && !i.parseTransform || rn(t, i.parseTransform), E = i.smoothOrigin !== !1 && b.smooth, v = this._pt = new ue(this._pt, a, ft, 0, 1, b.renderTransform, b, 0, -1), v.dep = 1), p === "scale")
              this._pt = new ue(this._pt, b, "scaleY", b.scaleY, (w ? cr(b.scaleY, w + d) : d) - b.scaleY || 0, ws), this._pt.u = 0, o.push("scaleY", p), p += "X";
            else if (p === "transformOrigin") {
              P.push(ce, 0, a[ce]), c = $u(c), b.svg ? bs(t, c, 0, E, 0, this) : (S = parseFloat(c.split(" ")[2]) || 0, S !== b.zOrigin && vi(this, b, "zOrigin", b.zOrigin, S), vi(this, a, p, Yn(u), Yn(c)));
              continue;
            } else if (p === "svgOrigin") {
              bs(t, c, 1, E, 0, this);
              continue;
            } else if (p in Ga) {
              Zu(this, b, p, h, w ? cr(h, w + c) : c);
              continue;
            } else if (p === "smoothOrigin") {
              vi(this, b, "smooth", b.smooth, c);
              continue;
            } else if (p === "force3D") {
              b[p] = c;
              continue;
            } else if (p === "transform") {
              ju(this, c, t);
              continue;
            }
          } else p in a || (p = xr(p) || p);
          if (T || (d || d === 0) && (h || h === 0) && !Du.test(c) && p in a)
            m = (u + "").substr((h + "").length), d || (d = 0), S = Ut(c) || (p in be.units ? be.units[p] : m), m !== S && (h = ki(t, p, u, S)), this._pt = new ue(this._pt, T ? b : a, p, h, (w ? cr(h, w + d) : d) - h, !T && (S === "px" || p === "zIndex") && i.autoRound !== !1 ? Fu : ws), this._pt.u = S || 0, T && k !== c ? (this._pt.b = u, this._pt.e = k, this._pt.r = zu) : m !== S && S !== "%" && (this._pt.b = u, this._pt.r = Lu);
          else if (p in a)
            qu.call(this, t, p, u, w ? w + c : c);
          else if (p in t)
            this.add(t, p, u || t[p], w ? w + c : c, r, n);
          else if (p !== "parseTransform") {
            Xs(p, c);
            continue;
          }
          T || (p in a ? P.push(p, 0, a[p]) : typeof t[p] == "function" ? P.push(p, 2, t[p]()) : P.push(p, 1, u || t[p])), o.push(p);
        }
      }
    x && Ya(this);
  },
  render: function(t, i) {
    if (i.tween._time || !js())
      for (var e = i._pt; e; )
        e.r(t, e.d), e = e._next;
    else
      i.styles.revert();
  },
  get: ii,
  aliases: qe,
  getSetter: function(t, i, e) {
    var r = qe[i];
    return r && r.indexOf(",") < 0 && (i = r), i in ai && i !== ce && (t._gsap.x || ii(t, "x")) ? e && bo === e ? i === "scale" ? Bu : Yu : (bo = e || {}) && (i === "scale" ? Xu : Wu) : t.style && !Is(t.style[i]) ? Nu : ~i.indexOf("-") ? Iu : Ks(t, i);
  },
  core: {
    _removeProperty: Ci,
    _getMatrix: to
  }
};
fe.utils.checkPrefix = xr;
fe.core.getStyleSaver = Ha;
(function(s, t, i, e) {
  var r = le(s + "," + t + "," + i, function(n) {
    ai[n] = 1;
  });
  le(t, function(n) {
    be.units[n] = "deg", Ga[n] = 1;
  }), qe[r[13]] = s + "," + t, le(e, function(n) {
    var o = n.split(":");
    qe[o[1]] = r[o[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
le("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(s) {
  be.units[s] = "px";
});
fe.registerPlugin(Za);
var kn = fe.registerPlugin(Za) || fe;
kn.core.Tween;
function Ju(s, t) {
  for (var i = 0; i < t.length; i++) {
    var e = t[i];
    e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e && (e.writable = !0), Object.defineProperty(s, e.key, e);
  }
}
function tc(s, t, i) {
  return t && Ju(s.prototype, t), s;
}
var Ft, En, we, yi, wi, dr, ja, Ni, pr, Ja, ni, Ye, tl, el = function() {
  return Ft || typeof window < "u" && (Ft = window.gsap) && Ft.registerPlugin && Ft;
}, il = 1, ur = [], W = [], Ge = [], Br = Date.now, Ts = function(t, i) {
  return i;
}, ec = function() {
  var t = pr.core, i = t.bridge || {}, e = t._scrollers, r = t._proxies;
  e.push.apply(e, W), r.push.apply(r, Ge), W = e, Ge = r, Ts = function(o, a) {
    return i[o](a);
  };
}, bi = function(t, i) {
  return ~Ge.indexOf(t) && Ge[Ge.indexOf(t) + 1][i];
}, Xr = function(t) {
  return !!~Ja.indexOf(t);
}, Jt = function(t, i, e, r, n) {
  return t.addEventListener(i, e, {
    passive: r !== !1,
    capture: !!n
  });
}, jt = function(t, i, e, r) {
  return t.removeEventListener(i, e, !!r);
}, fn = "scrollLeft", hn = "scrollTop", Cs = function() {
  return ni && ni.isPressed || W.cache++;
}, Bn = function(t, i) {
  var e = function r(n) {
    if (n || n === 0) {
      il && (we.history.scrollRestoration = "manual");
      var o = ni && ni.isPressed;
      n = r.v = Math.round(n) || (ni && ni.iOS ? 1 : 0), t(n), r.cacheID = W.cache, o && Ts("ss", n);
    } else (i || W.cache !== r.cacheID || Ts("ref")) && (r.cacheID = W.cache, r.v = t());
    return r.v + r.offset;
  };
  return e.offset = 0, t && e;
}, re = {
  s: fn,
  p: "left",
  p2: "Left",
  os: "right",
  os2: "Right",
  d: "width",
  d2: "Width",
  a: "x",
  sc: Bn(function(s) {
    return arguments.length ? we.scrollTo(s, Et.sc()) : we.pageXOffset || yi[fn] || wi[fn] || dr[fn] || 0;
  })
}, Et = {
  s: hn,
  p: "top",
  p2: "Top",
  os: "bottom",
  os2: "Bottom",
  d: "height",
  d2: "Height",
  a: "y",
  op: re,
  sc: Bn(function(s) {
    return arguments.length ? we.scrollTo(re.sc(), s) : we.pageYOffset || yi[hn] || wi[hn] || dr[hn] || 0;
  })
}, se = function(t, i) {
  return (i && i._ctx && i._ctx.selector || Ft.utils.toArray)(t)[0] || (typeof t == "string" && Ft.config().nullTargetWarn !== !1 ? console.warn("Element not found:", t) : null);
}, ic = function(t, i) {
  for (var e = i.length; e--; )
    if (i[e] === t || i[e].contains(t))
      return !0;
  return !1;
}, Ei = function(t, i) {
  var e = i.s, r = i.sc;
  Xr(t) && (t = yi.scrollingElement || wi);
  var n = W.indexOf(t), o = r === Et.sc ? 1 : 2;
  !~n && (n = W.push(t) - 1), W[n + o] || Jt(t, "scroll", Cs);
  var a = W[n + o], l = a || (W[n + o] = Bn(bi(t, e), !0) || (Xr(t) ? r : Bn(function(u) {
    return arguments.length ? t[e] = u : t[e];
  })));
  return l.target = t, a || (l.smooth = Ft.getProperty(t, "scrollBehavior") === "smooth"), l;
}, ks = function(t, i, e) {
  var r = t, n = t, o = Br(), a = o, l = i || 50, u = Math.max(500, l * 3), c = function(_, p) {
    var m = Br();
    p || m - o > l ? (n = r, r = _, a = o, o = m) : e ? r += _ : r = n + (_ - n) / (m - a) * (o - a);
  }, d = function() {
    n = r = e ? 0 : r, a = o = 0;
  }, h = function(_) {
    var p = a, m = n, S = Br();
    return (_ || _ === 0) && _ !== r && c(_), o === a || S - a > u ? 0 : (r + (e ? m : -m)) / ((e ? S : o) - p) * 1e3;
  };
  return {
    update: c,
    reset: d,
    getVelocity: h
  };
}, Pr = function(t, i) {
  return i && !t._gsapAllow && t.cancelable !== !1 && t.preventDefault(), t.changedTouches ? t.changedTouches[0] : t;
}, Do = function(t) {
  var i = Math.max.apply(Math, t), e = Math.min.apply(Math, t);
  return Math.abs(i) >= Math.abs(e) ? i : e;
}, rl = function() {
  pr = Ft.core.globals().ScrollTrigger, pr && pr.core && ec();
}, nl = function(t) {
  return Ft = t || el(), !En && Ft && typeof document < "u" && document.body && (we = window, yi = document, wi = yi.documentElement, dr = yi.body, Ja = [we, yi, wi, dr], Ft.utils.clamp, tl = Ft.core.context || function() {
  }, Ni = "onpointerenter" in dr ? "pointer" : "mouse", ja = wt.isTouch = we.matchMedia && we.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in we || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, Ye = wt.eventTypes = ("ontouchstart" in wi ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in wi ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout(function() {
    return il = 0;
  }, 500), En = 1), pr || rl(), En;
};
re.op = Et;
W.cache = 0;
var wt = /* @__PURE__ */ (function() {
  function s(i) {
    this.init(i);
  }
  var t = s.prototype;
  return t.init = function(e) {
    En || nl(Ft) || console.warn("Please gsap.registerPlugin(Observer)"), pr || rl();
    var r = e.tolerance, n = e.dragMinimum, o = e.type, a = e.target, l = e.lineHeight, u = e.debounce, c = e.preventDefault, d = e.onStop, h = e.onStopDelay, f = e.ignore, _ = e.wheelSpeed, p = e.event, m = e.onDragStart, S = e.onDragEnd, w = e.onDrag, T = e.onPress, v = e.onRelease, b = e.onRight, E = e.onLeft, x = e.onUp, P = e.onDown, k = e.onChangeX, C = e.onChangeY, Y = e.onChange, M = e.onToggleX, G = e.onToggleY, N = e.onHover, K = e.onHoverEnd, U = e.onMove, A = e.ignoreCheck, Q = e.isNormalizer, et = e.onGestureStart, g = e.onGestureEnd, st = e.onWheel, Gt = e.onEnable, Ae = e.onDisable, ht = e.onClick, At = e.scrollSpeed, It = e.capture, xt = e.allowClicks, Kt = e.lockAxis, Yt = e.onLockAxis;
    this.target = a = se(a) || wi, this.vars = e, f && (f = Ft.utils.toArray(f)), r = r || 1e-9, n = n || 0, _ = _ || 1, At = At || 1, o = o || "wheel,touch,pointer", u = u !== !1, l || (l = parseFloat(we.getComputedStyle(dr).lineHeight) || 22);
    var li, Qt, Zt, Z, gt, ne, he, y = this, de = 0, Qe = 0, ui = e.passive || !c && e.passive !== !1, dt = Ei(a, re), Ze = Ei(a, Et), ci = dt(), Oi = Ze(), Pt = ~o.indexOf("touch") && !~o.indexOf("pointer") && Ye[0] === "pointerdown", fi = Xr(a), mt = a.ownerDocument || yi, Le = [0, 0, 0], ke = [0, 0, 0], je = 0, br = function() {
      return je = Br();
    }, St = function(L, j) {
      return (y.event = L) && f && ic(L.target, f) || j && Pt && L.pointerType !== "touch" || A && A(L, j);
    }, an = function() {
      y._vx.reset(), y._vy.reset(), Qt.pause(), d && d(y);
    }, Je = function() {
      var L = y.deltaX = Do(Le), j = y.deltaY = Do(ke), O = Math.abs(L) >= r, z = Math.abs(j) >= r;
      Y && (O || z) && Y(y, L, j, Le, ke), O && (b && y.deltaX > 0 && b(y), E && y.deltaX < 0 && E(y), k && k(y), M && y.deltaX < 0 != de < 0 && M(y), de = y.deltaX, Le[0] = Le[1] = Le[2] = 0), z && (P && y.deltaY > 0 && P(y), x && y.deltaY < 0 && x(y), C && C(y), G && y.deltaY < 0 != Qe < 0 && G(y), Qe = y.deltaY, ke[0] = ke[1] = ke[2] = 0), (Z || Zt) && (U && U(y), Zt && (m && Zt === 1 && m(y), w && w(y), Zt = 0), Z = !1), ne && !(ne = !1) && Yt && Yt(y), gt && (st(y), gt = !1), li = 0;
    }, ji = function(L, j, O) {
      Le[O] += L, ke[O] += j, y._vx.update(L), y._vy.update(j), u ? li || (li = requestAnimationFrame(Je)) : Je();
    }, Ji = function(L, j) {
      Kt && !he && (y.axis = he = Math.abs(L) > Math.abs(j) ? "x" : "y", ne = !0), he !== "y" && (Le[2] += L, y._vx.update(L, !0)), he !== "x" && (ke[2] += j, y._vy.update(j, !0)), u ? li || (li = requestAnimationFrame(Je)) : Je();
    }, hi = function(L) {
      if (!St(L, 1)) {
        L = Pr(L, c);
        var j = L.clientX, O = L.clientY, z = j - y.x, D = O - y.y, F = y.isDragging;
        y.x = j, y.y = O, (F || (z || D) && (Math.abs(y.startX - j) >= n || Math.abs(y.startY - O) >= n)) && (Zt || (Zt = F ? 2 : 1), F || (y.isDragging = !0), Ji(z, D));
      }
    }, Mi = y.onPress = function(I) {
      St(I, 1) || I && I.button || (y.axis = he = null, Qt.pause(), y.isPressed = !0, I = Pr(I), de = Qe = 0, y.startX = y.x = I.clientX, y.startY = y.y = I.clientY, y._vx.reset(), y._vy.reset(), Jt(Q ? a : mt, Ye[1], hi, ui, !0), y.deltaX = y.deltaY = 0, T && T(y));
    }, H = y.onRelease = function(I) {
      if (!St(I, 1)) {
        jt(Q ? a : mt, Ye[1], hi, !0);
        var L = !isNaN(y.y - y.startY), j = y.isDragging, O = j && (Math.abs(y.x - y.startX) > 3 || Math.abs(y.y - y.startY) > 3), z = Pr(I);
        !O && L && (y._vx.reset(), y._vy.reset(), c && xt && Ft.delayedCall(0.08, function() {
          if (Br() - je > 300 && !I.defaultPrevented) {
            if (I.target.click)
              I.target.click();
            else if (mt.createEvent) {
              var D = mt.createEvent("MouseEvents");
              D.initMouseEvent("click", !0, !0, we, 1, z.screenX, z.screenY, z.clientX, z.clientY, !1, !1, !1, !1, 0, null), I.target.dispatchEvent(D);
            }
          }
        })), y.isDragging = y.isGesturing = y.isPressed = !1, d && j && !Q && Qt.restart(!0), Zt && Je(), S && j && S(y), v && v(y, O);
      }
    }, Ri = function(L) {
      return L.touches && L.touches.length > 1 && (y.isGesturing = !0) && et(L, y.isDragging);
    }, ze = function() {
      return (y.isGesturing = !1) || g(y);
    }, Fe = function(L) {
      if (!St(L)) {
        var j = dt(), O = Ze();
        ji((j - ci) * At, (O - Oi) * At, 1), ci = j, Oi = O, d && Qt.restart(!0);
      }
    }, Ne = function(L) {
      if (!St(L)) {
        L = Pr(L, c), st && (gt = !0);
        var j = (L.deltaMode === 1 ? l : L.deltaMode === 2 ? we.innerHeight : 1) * _;
        ji(L.deltaX * j, L.deltaY * j, 0), d && !Q && Qt.restart(!0);
      }
    }, Di = function(L) {
      if (!St(L)) {
        var j = L.clientX, O = L.clientY, z = j - y.x, D = O - y.y;
        y.x = j, y.y = O, Z = !0, d && Qt.restart(!0), (z || D) && Ji(z, D);
      }
    }, tr = function(L) {
      y.event = L, N(y);
    }, ti = function(L) {
      y.event = L, K(y);
    }, Tr = function(L) {
      return St(L) || Pr(L, c) && ht(y);
    };
    Qt = y._dc = Ft.delayedCall(h || 0.25, an).pause(), y.deltaX = y.deltaY = 0, y._vx = ks(0, 50, !0), y._vy = ks(0, 50, !0), y.scrollX = dt, y.scrollY = Ze, y.isDragging = y.isGesturing = y.isPressed = !1, tl(this), y.enable = function(I) {
      return y.isEnabled || (Jt(fi ? mt : a, "scroll", Cs), o.indexOf("scroll") >= 0 && Jt(fi ? mt : a, "scroll", Fe, ui, It), o.indexOf("wheel") >= 0 && Jt(a, "wheel", Ne, ui, It), (o.indexOf("touch") >= 0 && ja || o.indexOf("pointer") >= 0) && (Jt(a, Ye[0], Mi, ui, It), Jt(mt, Ye[2], H), Jt(mt, Ye[3], H), xt && Jt(a, "click", br, !0, !0), ht && Jt(a, "click", Tr), et && Jt(mt, "gesturestart", Ri), g && Jt(mt, "gestureend", ze), N && Jt(a, Ni + "enter", tr), K && Jt(a, Ni + "leave", ti), U && Jt(a, Ni + "move", Di)), y.isEnabled = !0, y.isDragging = y.isGesturing = y.isPressed = Z = Zt = !1, y._vx.reset(), y._vy.reset(), ci = dt(), Oi = Ze(), I && I.type && Mi(I), Gt && Gt(y)), y;
    }, y.disable = function() {
      y.isEnabled && (ur.filter(function(I) {
        return I !== y && Xr(I.target);
      }).length || jt(fi ? mt : a, "scroll", Cs), y.isPressed && (y._vx.reset(), y._vy.reset(), jt(Q ? a : mt, Ye[1], hi, !0)), jt(fi ? mt : a, "scroll", Fe, It), jt(a, "wheel", Ne, It), jt(a, Ye[0], Mi, It), jt(mt, Ye[2], H), jt(mt, Ye[3], H), jt(a, "click", br, !0), jt(a, "click", Tr), jt(mt, "gesturestart", Ri), jt(mt, "gestureend", ze), jt(a, Ni + "enter", tr), jt(a, Ni + "leave", ti), jt(a, Ni + "move", Di), y.isEnabled = y.isPressed = y.isDragging = !1, Ae && Ae(y));
    }, y.kill = y.revert = function() {
      y.disable();
      var I = ur.indexOf(y);
      I >= 0 && ur.splice(I, 1), ni === y && (ni = 0);
    }, ur.push(y), Q && Xr(a) && (ni = y), y.enable(p);
  }, tc(s, [{
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
wt.register = nl;
wt.getAll = function() {
  return ur.slice();
};
wt.getById = function(s) {
  return ur.filter(function(t) {
    return t.vars.id === s;
  })[0];
};
el() && Ft.registerPlugin(wt);
var R, sr, X, tt, ve, J, eo, Xn, nn, Wr, Dr, dn, Vt, $n, Es, ee, Ao, Lo, or, sl, rs, ol, te, Ps, al, ll, _i, Os, io, _r, ro, Vr, Ms, ns, pn = 1, Ht = Date.now, ss = Ht(), De = 0, Ar = 0, zo = function(t, i, e) {
  var r = ge(t) && (t.substr(0, 6) === "clamp(" || t.indexOf("max") > -1);
  return e["_" + i + "Clamp"] = r, r ? t.substr(6, t.length - 7) : t;
}, Fo = function(t, i) {
  return i && (!ge(t) || t.substr(0, 6) !== "clamp(") ? "clamp(" + t + ")" : t;
}, rc = function s() {
  return Ar && requestAnimationFrame(s);
}, No = function() {
  return $n = 1;
}, Io = function() {
  return $n = 0;
}, He = function(t) {
  return t;
}, Lr = function(t) {
  return Math.round(t * 1e5) / 1e5 || 0;
}, ul = function() {
  return typeof window < "u";
}, cl = function() {
  return R || ul() && (R = window.gsap) && R.registerPlugin && R;
}, Gi = function(t) {
  return !!~eo.indexOf(t);
}, fl = function(t) {
  return (t === "Height" ? ro : X["inner" + t]) || ve["client" + t] || J["client" + t];
}, hl = function(t) {
  return bi(t, "getBoundingClientRect") || (Gi(t) ? function() {
    return Dn.width = X.innerWidth, Dn.height = ro, Dn;
  } : function() {
    return ri(t);
  });
}, nc = function(t, i, e) {
  var r = e.d, n = e.d2, o = e.a;
  return (o = bi(t, "getBoundingClientRect")) ? function() {
    return o()[r];
  } : function() {
    return (i ? fl(n) : t["client" + n]) || 0;
  };
}, sc = function(t, i) {
  return !i || ~Ge.indexOf(t) ? hl(t) : function() {
    return Dn;
  };
}, $e = function(t, i) {
  var e = i.s, r = i.d2, n = i.d, o = i.a;
  return Math.max(0, (e = "scroll" + r) && (o = bi(t, e)) ? o() - hl(t)()[n] : Gi(t) ? (ve[e] || J[e]) - fl(r) : t[e] - t["offset" + r]);
}, _n = function(t, i) {
  for (var e = 0; e < or.length; e += 3)
    (!i || ~i.indexOf(or[e + 1])) && t(or[e], or[e + 1], or[e + 2]);
}, ge = function(t) {
  return typeof t == "string";
}, qt = function(t) {
  return typeof t == "function";
}, zr = function(t) {
  return typeof t == "number";
}, Ii = function(t) {
  return typeof t == "object";
}, Or = function(t, i, e) {
  return t && t.progress(i ? 0 : 1) && e && t.pause();
}, ir = function(t, i, e) {
  if (t.enabled) {
    var r = t._ctx ? t._ctx.add(function() {
      return i(t, e);
    }) : i(t, e);
    r && r.totalTime && (t.callbackAnimation = r);
  }
}, rr = Math.abs, dl = "left", pl = "top", no = "right", so = "bottom", Ui = "width", qi = "height", Hr = "Right", Ur = "Left", qr = "Top", $r = "Bottom", bt = "padding", Pe = "margin", Sr = "Width", oo = "Height", kt = "px", Oe = function(t) {
  return X.getComputedStyle(t.nodeType === Node.DOCUMENT_NODE ? t.scrollingElement : t);
}, oc = function(t) {
  var i = Oe(t).position;
  t.style.position = i === "absolute" || i === "fixed" ? i : "relative";
}, Yo = function(t, i) {
  for (var e in i)
    e in t || (t[e] = i[e]);
  return t;
}, ri = function(t, i) {
  var e = i && Oe(t)[Es] !== "matrix(1, 0, 0, 1, 0, 0)" && R.to(t, {
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
}, _l = function(t) {
  var i = [], e = t.labels, r = t.duration(), n;
  for (n in e)
    i.push(e[n] / r);
  return i;
}, ac = function(t) {
  return function(i) {
    return R.utils.snap(_l(t), i);
  };
}, ao = function(t) {
  var i = R.utils.snap(t), e = Array.isArray(t) && t.slice(0).sort(function(r, n) {
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
}, lc = function(t) {
  return function(i, e) {
    return ao(_l(t))(i, e.direction);
  };
}, gn = function(t, i, e, r) {
  return e.split(",").forEach(function(n) {
    return t(i, n, r);
  });
}, Rt = function(t, i, e, r, n) {
  return t.addEventListener(i, e, {
    passive: !r,
    capture: !!n
  });
}, Mt = function(t, i, e, r) {
  return t.removeEventListener(i, e, !!r);
}, mn = function(t, i, e) {
  e = e && e.wheelHandler, e && (t(i, "wheel", e), t(i, "touchmove", e));
}, Bo = {
  startColor: "green",
  endColor: "red",
  indent: 0,
  fontSize: "16px",
  fontWeight: "normal"
}, vn = {
  toggleActions: "play",
  anticipatePin: 0
}, Vn = {
  top: 0,
  left: 0,
  center: 0.5,
  bottom: 1,
  right: 1
}, Pn = function(t, i) {
  if (ge(t)) {
    var e = t.indexOf("="), r = ~e ? +(t.charAt(e - 1) + 1) * parseFloat(t.substr(e + 1)) : 0;
    ~e && (t.indexOf("%") > e && (r *= i / 100), t = t.substr(0, e - 1)), t = r + (t in Vn ? Vn[t] * i : ~t.indexOf("%") ? parseFloat(t) * i / 100 : parseFloat(t) || 0);
  }
  return t;
}, yn = function(t, i, e, r, n, o, a, l) {
  var u = n.startColor, c = n.endColor, d = n.fontSize, h = n.indent, f = n.fontWeight, _ = tt.createElement("div"), p = Gi(e) || bi(e, "pinType") === "fixed", m = t.indexOf("scroller") !== -1, S = p ? J : e.tagName === "IFRAME" ? e.contentDocument.body : e, w = t.indexOf("start") !== -1, T = w ? u : c, v = "border-color:" + T + ";font-size:" + d + ";color:" + T + ";font-weight:" + f + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
  return v += "position:" + ((m || l) && p ? "fixed;" : "absolute;"), (m || l || !p) && (v += (r === Et ? no : so) + ":" + (o + parseFloat(h)) + "px;"), a && (v += "box-sizing:border-box;text-align:left;width:" + a.offsetWidth + "px;"), _._isStart = w, _.setAttribute("class", "gsap-marker-" + t + (i ? " marker-" + i : "")), _.style.cssText = v, _.innerText = i || i === 0 ? t + "-" + i : t, S.children[0] ? S.insertBefore(_, S.children[0]) : S.appendChild(_), _._offset = _["offset" + r.op.d2], On(_, 0, r, w), _;
}, On = function(t, i, e, r) {
  var n = {
    display: "block"
  }, o = e[r ? "os2" : "p2"], a = e[r ? "p2" : "os2"];
  t._isFlipped = r, n[e.a + "Percent"] = r ? -100 : 0, n[e.a] = r ? "1px" : 0, n["border" + o + Sr] = 1, n["border" + a + Sr] = 0, n[e.p] = i + "px", R.set(t, n);
}, B = [], Rs = {}, sn, Xo = function() {
  return Ht() - De > 34 && (sn || (sn = requestAnimationFrame(si)));
}, nr = function() {
  (!te || !te.isPressed || te.startX > J.clientWidth) && (W.cache++, te ? sn || (sn = requestAnimationFrame(si)) : si(), De || Qi("scrollStart"), De = Ht());
}, os = function() {
  ll = X.innerWidth, al = X.innerHeight;
}, Fr = function(t) {
  W.cache++, (t === !0 || !Vt && !ol && !tt.fullscreenElement && !tt.webkitFullscreenElement && (!Ps || ll !== X.innerWidth || Math.abs(X.innerHeight - al) > X.innerHeight * 0.25)) && Xn.restart(!0);
}, Ki = {}, uc = [], gl = function s() {
  return Mt(V, "scrollEnd", s) || Bi(!0);
}, Qi = function(t) {
  return Ki[t] && Ki[t].map(function(i) {
    return i();
  }) || uc;
}, _e = [], ml = function(t) {
  for (var i = 0; i < _e.length; i += 5)
    (!t || _e[i + 4] && _e[i + 4].query === t) && (_e[i].style.cssText = _e[i + 1], _e[i].getBBox && _e[i].setAttribute("transform", _e[i + 2] || ""), _e[i + 3].uncache = 1);
}, vl = function() {
  return W.forEach(function(t) {
    return qt(t) && ++t.cacheID && (t.rec = t());
  });
}, lo = function(t, i) {
  var e;
  for (ee = 0; ee < B.length; ee++)
    e = B[ee], e && (!i || e._ctx === i) && (t ? e.kill(1) : e.revert(!0, !0));
  Vr = !0, i && ml(i), i || Qi("revert");
}, yl = function(t, i) {
  W.cache++, (i || !ie) && W.forEach(function(e) {
    return qt(e) && e.cacheID++ && (e.rec = 0);
  }), ge(t) && (X.history.scrollRestoration = io = t);
}, ie, $i = 0, Wo, cc = function() {
  if (Wo !== $i) {
    var t = Wo = $i;
    requestAnimationFrame(function() {
      return t === $i && Bi(!0);
    });
  }
}, wl = function() {
  J.appendChild(_r), ro = !te && _r.offsetHeight || X.innerHeight, J.removeChild(_r);
}, Vo = function(t) {
  return nn(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(i) {
    return i.style.display = t ? "none" : "block";
  });
}, Bi = function(t, i) {
  if (ve = tt.documentElement, J = tt.body, eo = [X, tt, ve, J], De && !t && !Vr) {
    Rt(V, "scrollEnd", gl);
    return;
  }
  wl(), ie = V.isRefreshing = !0, Vr || vl();
  var e = Qi("refreshInit");
  sl && V.sort(), i || lo(), W.forEach(function(r) {
    qt(r) && (r.smooth && (r.target.style.scrollBehavior = "auto"), r(0));
  }), B.slice(0).forEach(function(r) {
    return r.refresh();
  }), Vr = !1, B.forEach(function(r) {
    if (r._subPinOffset && r.pin) {
      var n = r.vars.horizontal ? "offsetWidth" : "offsetHeight", o = r.pin[n];
      r.revert(!0, 1), r.adjustPinSpacing(r.pin[n] - o), r.refresh();
    }
  }), Ms = 1, Vo(!0), B.forEach(function(r) {
    var n = $e(r.scroller, r._dir), o = r.vars.end === "max" || r._endClamp && r.end > n, a = r._startClamp && r.start >= n;
    (o || a) && r.setPositions(a ? n - 1 : r.start, o ? Math.max(a ? n : r.start + 1, n) : r.end, !0);
  }), Vo(!1), Ms = 0, e.forEach(function(r) {
    return r && r.render && r.render(-1);
  }), W.forEach(function(r) {
    qt(r) && (r.smooth && requestAnimationFrame(function() {
      return r.target.style.scrollBehavior = "smooth";
    }), r.rec && r(r.rec));
  }), yl(io, 1), Xn.pause(), $i++, ie = 2, si(2), B.forEach(function(r) {
    return qt(r.vars.onRefresh) && r.vars.onRefresh(r);
  }), ie = V.isRefreshing = !1, Qi("refresh");
}, Ds = 0, Mn = 1, Gr, si = function(t) {
  if (t === 2 || !ie && !Vr) {
    V.isUpdating = !0, Gr && Gr.update(0);
    var i = B.length, e = Ht(), r = e - ss >= 50, n = i && B[0].scroll();
    if (Mn = Ds > n ? -1 : 1, ie || (Ds = n), r && (De && !$n && e - De > 200 && (De = 0, Qi("scrollEnd")), Dr = ss, ss = e), Mn < 0) {
      for (ee = i; ee-- > 0; )
        B[ee] && B[ee].update(0, r);
      Mn = 1;
    } else
      for (ee = 0; ee < i; ee++)
        B[ee] && B[ee].update(0, r);
    V.isUpdating = !1;
  }
  sn = 0;
}, As = [dl, pl, so, no, Pe + $r, Pe + Hr, Pe + qr, Pe + Ur, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], Rn = As.concat([Ui, qi, "boxSizing", "max" + Sr, "max" + oo, "position", Pe, bt, bt + qr, bt + Hr, bt + $r, bt + Ur]), fc = function(t, i, e) {
  gr(e);
  var r = t._gsap;
  if (r.spacerIsNative)
    gr(r.spacerState);
  else if (t._gsap.swappedIn) {
    var n = i.parentNode;
    n && (n.insertBefore(t, i), n.removeChild(i));
  }
  t._gsap.swappedIn = !1;
}, as = function(t, i, e, r) {
  if (!t._gsap.swappedIn) {
    for (var n = As.length, o = i.style, a = t.style, l; n--; )
      l = As[n], o[l] = e[l];
    o.position = e.position === "absolute" ? "absolute" : "relative", e.display === "inline" && (o.display = "inline-block"), a[so] = a[no] = "auto", o.flexBasis = e.flexBasis || "auto", o.overflow = "visible", o.boxSizing = "border-box", o[Ui] = Wn(t, re) + kt, o[qi] = Wn(t, Et) + kt, o[bt] = a[Pe] = a[pl] = a[dl] = "0", gr(r), a[Ui] = a["max" + Sr] = e[Ui], a[qi] = a["max" + oo] = e[qi], a[bt] = e[bt], t.parentNode !== i && (t.parentNode.insertBefore(i, t), i.appendChild(t)), t._gsap.swappedIn = !0;
  }
}, hc = /([A-Z])/g, gr = function(t) {
  if (t) {
    var i = t.t.style, e = t.length, r = 0, n, o;
    for ((t.t._gsap || R.core.getCache(t.t)).uncache = 1; r < e; r += 2)
      o = t[r + 1], n = t[r], o ? i[n] = o : i[n] && i.removeProperty(n.replace(hc, "-$1").toLowerCase());
  }
}, wn = function(t) {
  for (var i = Rn.length, e = t.style, r = [], n = 0; n < i; n++)
    r.push(Rn[n], e[Rn[n]]);
  return r.t = t, r;
}, dc = function(t, i, e) {
  for (var r = [], n = t.length, o = e ? 8 : 0, a; o < n; o += 2)
    a = t[o], r.push(a, a in i ? i[a] : t[o + 1]);
  return r.t = t.t, r;
}, Dn = {
  left: 0,
  top: 0
}, Ho = function(t, i, e, r, n, o, a, l, u, c, d, h, f, _) {
  qt(t) && (t = t(l)), ge(t) && t.substr(0, 3) === "max" && (t = h + (t.charAt(4) === "=" ? Pn("0" + t.substr(3), e) : 0));
  var p = f ? f.time() : 0, m, S, w;
  if (f && f.seek(0), isNaN(t) || (t = +t), zr(t))
    f && (t = R.utils.mapRange(f.scrollTrigger.start, f.scrollTrigger.end, 0, h, t)), a && On(a, e, r, !0);
  else {
    qt(i) && (i = i(l));
    var T = (t || "0").split(" "), v, b, E, x;
    w = se(i, l) || J, v = ri(w) || {}, (!v || !v.left && !v.top) && Oe(w).display === "none" && (x = w.style.display, w.style.display = "block", v = ri(w), x ? w.style.display = x : w.style.removeProperty("display")), b = Pn(T[0], v[r.d]), E = Pn(T[1] || "0", e), t = v[r.p] - u[r.p] - c + b + n - E, a && On(a, E, r, e - E < 20 || a._isStart && E > 20), e -= e - E;
  }
  if (_ && (l[_] = t || -1e-3, t < 0 && (t = 0)), o) {
    var P = t + e, k = o._isStart;
    m = "scroll" + r.d2, On(o, P, r, k && P > 20 || !k && (d ? Math.max(J[m], ve[m]) : o.parentNode[m]) <= P + 1), d && (u = ri(a), d && (o.style[r.op.p] = u[r.op.p] - r.op.m - o._offset + kt));
  }
  return f && w && (m = ri(w), f.seek(h), S = ri(w), f._caScrollDist = m[r.p] - S[r.p], t = t / f._caScrollDist * h), f && f.seek(p), f ? t : Math.round(t);
}, pc = /(webkit|moz|length|cssText|inset)/i, Uo = function(t, i, e, r) {
  if (t.parentNode !== i) {
    var n = t.style, o, a;
    if (i === J) {
      t._stOrig = n.cssText, a = Oe(t);
      for (o in a)
        !+o && !pc.test(o) && a[o] && typeof n[o] == "string" && o !== "0" && (n[o] = a[o]);
      n.top = e, n.left = r;
    } else
      n.cssText = t._stOrig;
    R.core.getCache(t).uncache = 1, i.appendChild(t);
  }
}, xl = function(t, i, e) {
  var r = i, n = r;
  return function(o) {
    var a = Math.round(t());
    return a !== r && a !== n && Math.abs(a - r) > 3 && Math.abs(a - n) > 3 && (o = a, e && e()), n = r, r = Math.round(o), r;
  };
}, xn = function(t, i, e) {
  var r = {};
  r[i.p] = "+=" + e, R.set(t, r);
}, qo = function(t, i) {
  var e = Ei(t, i), r = "_scroll" + i.p2, n = function o(a, l, u, c, d) {
    var h = o.tween, f = l.onComplete, _ = {};
    u = u || e();
    var p = xl(e, u, function() {
      h.kill(), o.tween = 0;
    });
    return d = c && d || 0, c = c || a - u, h && h.kill(), l[r] = a, l.inherit = !1, l.modifiers = _, _[r] = function() {
      return p(u + c * h.ratio + d * h.ratio * h.ratio);
    }, l.onUpdate = function() {
      W.cache++, o.tween && si();
    }, l.onComplete = function() {
      o.tween = 0, f && f.call(h);
    }, h = o.tween = R.to(t, l), h;
  };
  return t[r] = e, e.wheelHandler = function() {
    return n.tween && n.tween.kill() && (n.tween = 0);
  }, Rt(t, "wheel", e.wheelHandler), V.isTouch && Rt(t, "touchmove", e.wheelHandler), n;
}, V = /* @__PURE__ */ (function() {
  function s(i, e) {
    sr || s.register(R) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), Os(this), this.init(i, e);
  }
  var t = s.prototype;
  return t.init = function(e, r) {
    if (this.progress = this.start = 0, this.vars && this.kill(!0, !0), !Ar) {
      this.update = this.refresh = this.kill = He;
      return;
    }
    e = Yo(ge(e) || zr(e) || e.nodeType ? {
      trigger: e
    } : e, vn);
    var n = e, o = n.onUpdate, a = n.toggleClass, l = n.id, u = n.onToggle, c = n.onRefresh, d = n.scrub, h = n.trigger, f = n.pin, _ = n.pinSpacing, p = n.invalidateOnRefresh, m = n.anticipatePin, S = n.onScrubComplete, w = n.onSnapComplete, T = n.once, v = n.snap, b = n.pinReparent, E = n.pinSpacer, x = n.containerAnimation, P = n.fastScrollEnd, k = n.preventOverlaps, C = e.horizontal || e.containerAnimation && e.horizontal !== !1 ? re : Et, Y = !d && d !== 0, M = se(e.scroller || X), G = R.core.getCache(M), N = Gi(M), K = ("pinType" in e ? e.pinType : bi(M, "pinType") || N && "fixed") === "fixed", U = [e.onEnter, e.onLeave, e.onEnterBack, e.onLeaveBack], A = Y && e.toggleActions.split(" "), Q = "markers" in e ? e.markers : vn.markers, et = N ? 0 : parseFloat(Oe(M)["border" + C.p2 + Sr]) || 0, g = this, st = e.onRefreshInit && function() {
      return e.onRefreshInit(g);
    }, Gt = nc(M, N, C), Ae = sc(M, N), ht = 0, At = 0, It = 0, xt = Ei(M, C), Kt, Yt, li, Qt, Zt, Z, gt, ne, he, y, de, Qe, ui, dt, Ze, ci, Oi, Pt, fi, mt, Le, ke, je, br, St, an, Je, ji, Ji, hi, Mi, H, Ri, ze, Fe, Ne, Di, tr, ti;
    if (g._startClamp = g._endClamp = !1, g._dir = C, m *= 45, g.scroller = M, g.scroll = x ? x.time.bind(x) : xt, Qt = xt(), g.vars = e, r = r || e.animation, "refreshPriority" in e && (sl = 1, e.refreshPriority === -9999 && (Gr = g)), G.tweenScroll = G.tweenScroll || {
      top: qo(M, Et),
      left: qo(M, re)
    }, g.tweenTo = Kt = G.tweenScroll[C.p], g.scrubDuration = function(O) {
      Ri = zr(O) && O, Ri ? H ? H.duration(O) : H = R.to(r, {
        ease: "expo",
        totalProgress: "+=0",
        inherit: !1,
        duration: Ri,
        paused: !0,
        onComplete: function() {
          return S && S(g);
        }
      }) : (H && H.progress(1).kill(), H = 0);
    }, r && (r.vars.lazy = !1, r._initted && !g.isReverted || r.vars.immediateRender !== !1 && e.immediateRender !== !1 && r.duration() && r.render(0, !0, !0), g.animation = r.pause(), r.scrollTrigger = g, g.scrubDuration(d), hi = 0, l || (l = r.vars.id)), v && ((!Ii(v) || v.push) && (v = {
      snapTo: v
    }), "scrollBehavior" in J.style && R.set(N ? [J, ve] : M, {
      scrollBehavior: "auto"
    }), W.forEach(function(O) {
      return qt(O) && O.target === (N ? tt.scrollingElement || ve : M) && (O.smooth = !1);
    }), li = qt(v.snapTo) ? v.snapTo : v.snapTo === "labels" ? ac(r) : v.snapTo === "labelsDirectional" ? lc(r) : v.directional !== !1 ? function(O, z) {
      return ao(v.snapTo)(O, Ht() - At < 500 ? 0 : z.direction);
    } : R.utils.snap(v.snapTo), ze = v.duration || {
      min: 0.1,
      max: 2
    }, ze = Ii(ze) ? Wr(ze.min, ze.max) : Wr(ze, ze), Fe = R.delayedCall(v.delay || Ri / 2 || 0.1, function() {
      var O = xt(), z = Ht() - At < 500, D = Kt.tween;
      if ((z || Math.abs(g.getVelocity()) < 10) && !D && !$n && ht !== O) {
        var F = (O - Z) / dt, Ot = r && !Y ? r.totalProgress() : F, q = z ? 0 : (Ot - Mi) / (Ht() - Dr) * 1e3 || 0, vt = R.utils.clamp(-F, 1 - F, rr(q / 2) * q / 0.185), Bt = F + (v.inertia === !1 ? 0 : vt), pt, ot, it = v, Ie = it.onStart, lt = it.onInterrupt, pe = it.onComplete;
        if (pt = li(Bt, g), zr(pt) || (pt = Bt), ot = Math.max(0, Math.round(Z + pt * dt)), O <= gt && O >= Z && ot !== O) {
          if (D && !D._initted && D.data <= rr(ot - O))
            return;
          v.inertia === !1 && (vt = pt - F), Kt(ot, {
            duration: ze(rr(Math.max(rr(Bt - Ot), rr(pt - Ot)) * 0.185 / q / 0.05 || 0)),
            ease: v.ease || "power3",
            data: rr(ot - O),
            // record the distance so that if another snap tween occurs (conflict) we can prioritize the closest snap.
            onInterrupt: function() {
              return Fe.restart(!0) && lt && ir(g, lt);
            },
            onComplete: function() {
              g.update(), ht = xt(), r && !Y && (H ? H.resetTo("totalProgress", pt, r._tTime / r._tDur) : r.progress(pt)), hi = Mi = r && !Y ? r.totalProgress() : g.progress, w && w(g), pe && ir(g, pe);
            }
          }, O, vt * dt, ot - O - vt * dt), Ie && ir(g, Ie, Kt.tween);
        }
      } else g.isActive && ht !== O && Fe.restart(!0);
    }).pause()), l && (Rs[l] = g), h = g.trigger = se(h || f !== !0 && f), ti = h && h._gsap && h._gsap.stRevert, ti && (ti = ti(g)), f = f === !0 ? h : se(f), ge(a) && (a = {
      targets: h,
      className: a
    }), f && (_ === !1 || _ === Pe || (_ = !_ && f.parentNode && f.parentNode.style && Oe(f.parentNode).display === "flex" ? !1 : bt), g.pin = f, Yt = R.core.getCache(f), Yt.spacer ? Ze = Yt.pinState : (E && (E = se(E), E && !E.nodeType && (E = E.current || E.nativeElement), Yt.spacerIsNative = !!E, E && (Yt.spacerState = wn(E))), Yt.spacer = Pt = E || tt.createElement("div"), Pt.classList.add("pin-spacer"), l && Pt.classList.add("pin-spacer-" + l), Yt.pinState = Ze = wn(f)), e.force3D !== !1 && R.set(f, {
      force3D: !0
    }), g.spacer = Pt = Yt.spacer, Ji = Oe(f), br = Ji[_ + C.os2], mt = R.getProperty(f), Le = R.quickSetter(f, C.a, kt), as(f, Pt, Ji), Oi = wn(f)), Q) {
      Qe = Ii(Q) ? Yo(Q, Bo) : Bo, y = yn("scroller-start", l, M, C, Qe, 0), de = yn("scroller-end", l, M, C, Qe, 0, y), fi = y["offset" + C.op.d2];
      var Tr = se(bi(M, "content") || M);
      ne = this.markerStart = yn("start", l, Tr, C, Qe, fi, 0, x), he = this.markerEnd = yn("end", l, Tr, C, Qe, fi, 0, x), x && (tr = R.quickSetter([ne, he], C.a, kt)), !K && !(Ge.length && bi(M, "fixedMarkers") === !0) && (oc(N ? J : M), R.set([y, de], {
        force3D: !0
      }), an = R.quickSetter(y, C.a, kt), ji = R.quickSetter(de, C.a, kt));
    }
    if (x) {
      var I = x.vars.onUpdate, L = x.vars.onUpdateParams;
      x.eventCallback("onUpdate", function() {
        g.update(0, 0, 1), I && I.apply(x, L || []);
      });
    }
    if (g.previous = function() {
      return B[B.indexOf(g) - 1];
    }, g.next = function() {
      return B[B.indexOf(g) + 1];
    }, g.revert = function(O, z) {
      if (!z)
        return g.kill(!0);
      var D = O !== !1 || !g.enabled, F = Vt;
      D !== g.isReverted && (D && (Ne = Math.max(xt(), g.scroll.rec || 0), It = g.progress, Di = r && r.progress()), ne && [ne, he, y, de].forEach(function(Ot) {
        return Ot.style.display = D ? "none" : "block";
      }), D && (Vt = g, g.update(D)), f && (!b || !g.isActive) && (D ? fc(f, Pt, Ze) : as(f, Pt, Oe(f), St)), D || g.update(D), Vt = F, g.isReverted = D);
    }, g.refresh = function(O, z, D, F) {
      if (!((Vt || !g.enabled) && !z)) {
        if (f && O && De) {
          Rt(s, "scrollEnd", gl);
          return;
        }
        !ie && st && st(g), Vt = g, Kt.tween && !D && (Kt.tween.kill(), Kt.tween = 0), H && H.pause(), p && r && (r.revert({
          kill: !1
        }).invalidate(), r.getChildren ? r.getChildren(!0, !0, !1).forEach(function(di) {
          return di.vars.immediateRender && di.render(0, !0, !0);
        }) : r.vars.immediateRender && r.render(0, !0, !0)), g.isReverted || g.revert(!0, !0), g._subPinOffset = !1;
        var Ot = Gt(), q = Ae(), vt = x ? x.duration() : $e(M, C), Bt = dt <= 0.01 || !dt, pt = 0, ot = F || 0, it = Ii(D) ? D.end : e.end, Ie = e.endTrigger || h, lt = Ii(D) ? D.start : e.start || (e.start === 0 || !h ? 0 : f ? "0 0" : "0 100%"), pe = g.pinnedContainer = e.pinnedContainer && se(e.pinnedContainer, g), Be = h && Math.max(0, B.indexOf(g)) || 0, Lt = Be, zt, Xt, Ai, ln, Wt, Ct, Xe, Gn, uo, Cr, We, kr, un;
        for (Q && Ii(D) && (kr = R.getProperty(y, C.p), un = R.getProperty(de, C.p)); Lt-- > 0; )
          Ct = B[Lt], Ct.end || Ct.refresh(0, 1) || (Vt = g), Xe = Ct.pin, Xe && (Xe === h || Xe === f || Xe === pe) && !Ct.isReverted && (Cr || (Cr = []), Cr.unshift(Ct), Ct.revert(!0, !0)), Ct !== B[Lt] && (Be--, Lt--);
        for (qt(lt) && (lt = lt(g)), lt = zo(lt, "start", g), Z = Ho(lt, h, Ot, C, xt(), ne, y, g, q, et, K, vt, x, g._startClamp && "_startClamp") || (f ? -1e-3 : 0), qt(it) && (it = it(g)), ge(it) && !it.indexOf("+=") && (~it.indexOf(" ") ? it = (ge(lt) ? lt.split(" ")[0] : "") + it : (pt = Pn(it.substr(2), Ot), it = ge(lt) ? lt : (x ? R.utils.mapRange(0, x.duration(), x.scrollTrigger.start, x.scrollTrigger.end, Z) : Z) + pt, Ie = h)), it = zo(it, "end", g), gt = Math.max(Z, Ho(it || (Ie ? "100% 0" : vt), Ie, Ot, C, xt() + pt, he, de, g, q, et, K, vt, x, g._endClamp && "_endClamp")) || -1e-3, pt = 0, Lt = Be; Lt--; )
          Ct = B[Lt] || {}, Xe = Ct.pin, Xe && Ct.start - Ct._pinPush <= Z && !x && Ct.end > 0 && (zt = Ct.end - (g._startClamp ? Math.max(0, Ct.start) : Ct.start), (Xe === h && Ct.start - Ct._pinPush < Z || Xe === pe) && isNaN(lt) && (pt += zt * (1 - Ct.progress)), Xe === f && (ot += zt));
        if (Z += pt, gt += pt, g._startClamp && (g._startClamp += pt), g._endClamp && !ie && (g._endClamp = gt || -1e-3, gt = Math.min(gt, $e(M, C))), dt = gt - Z || (Z -= 0.01) && 1e-3, Bt && (It = R.utils.clamp(0, 1, R.utils.normalize(Z, gt, Ne))), g._pinPush = ot, ne && pt && (zt = {}, zt[C.a] = "+=" + pt, pe && (zt[C.p] = "-=" + xt()), R.set([ne, he], zt)), f && !(Ms && g.end >= $e(M, C)))
          zt = Oe(f), ln = C === Et, Ai = xt(), ke = parseFloat(mt(C.a)) + ot, !vt && gt > 1 && (We = (N ? tt.scrollingElement || ve : M).style, We = {
            style: We,
            value: We["overflow" + C.a.toUpperCase()]
          }, N && Oe(J)["overflow" + C.a.toUpperCase()] !== "scroll" && (We.style["overflow" + C.a.toUpperCase()] = "scroll")), as(f, Pt, zt), Oi = wn(f), Xt = ri(f, !0), Gn = K && Ei(M, ln ? re : Et)(), _ ? (St = [_ + C.os2, dt + ot + kt], St.t = Pt, Lt = _ === bt ? Wn(f, C) + dt + ot : 0, Lt && (St.push(C.d, Lt + kt), Pt.style.flexBasis !== "auto" && (Pt.style.flexBasis = Lt + kt)), gr(St), pe && B.forEach(function(di) {
            di.pin === pe && di.vars.pinSpacing !== !1 && (di._subPinOffset = !0);
          }), K && xt(Ne)) : (Lt = Wn(f, C), Lt && Pt.style.flexBasis !== "auto" && (Pt.style.flexBasis = Lt + kt)), K && (Wt = {
            top: Xt.top + (ln ? Ai - Z : Gn) + kt,
            left: Xt.left + (ln ? Gn : Ai - Z) + kt,
            boxSizing: "border-box",
            position: "fixed"
          }, Wt[Ui] = Wt["max" + Sr] = Math.ceil(Xt.width) + kt, Wt[qi] = Wt["max" + oo] = Math.ceil(Xt.height) + kt, Wt[Pe] = Wt[Pe + qr] = Wt[Pe + Hr] = Wt[Pe + $r] = Wt[Pe + Ur] = "0", Wt[bt] = zt[bt], Wt[bt + qr] = zt[bt + qr], Wt[bt + Hr] = zt[bt + Hr], Wt[bt + $r] = zt[bt + $r], Wt[bt + Ur] = zt[bt + Ur], ci = dc(Ze, Wt, b), ie && xt(0)), r ? (uo = r._initted, rs(1), r.render(r.duration(), !0, !0), je = mt(C.a) - ke + dt + ot, Je = Math.abs(dt - je) > 1, K && Je && ci.splice(ci.length - 2, 2), r.render(0, !0, !0), uo || r.invalidate(!0), r.parent || r.totalTime(r.totalTime()), rs(0)) : je = dt, We && (We.value ? We.style["overflow" + C.a.toUpperCase()] = We.value : We.style.removeProperty("overflow-" + C.a));
        else if (h && xt() && !x)
          for (Xt = h.parentNode; Xt && Xt !== J; )
            Xt._pinOffset && (Z -= Xt._pinOffset, gt -= Xt._pinOffset), Xt = Xt.parentNode;
        Cr && Cr.forEach(function(di) {
          return di.revert(!1, !0);
        }), g.start = Z, g.end = gt, Qt = Zt = ie ? Ne : xt(), !x && !ie && (Qt < Ne && xt(Ne), g.scroll.rec = 0), g.revert(!1, !0), At = Ht(), Fe && (ht = -1, Fe.restart(!0)), Vt = 0, r && Y && (r._initted || Di) && r.progress() !== Di && r.progress(Di || 0, !0).render(r.time(), !0, !0), (Bt || It !== g.progress || x || p || r && !r._initted) && (r && !Y && (r._initted || It || r.vars.immediateRender !== !1) && r.totalProgress(x && Z < -1e-3 && !It ? R.utils.normalize(Z, gt, 0) : It, !0), g.progress = Bt || (Qt - Z) / dt === It ? 0 : It), f && _ && (Pt._pinOffset = Math.round(g.progress * je)), H && H.invalidate(), isNaN(kr) || (kr -= R.getProperty(y, C.p), un -= R.getProperty(de, C.p), xn(y, C, kr), xn(ne, C, kr - (F || 0)), xn(de, C, un), xn(he, C, un - (F || 0))), Bt && !ie && g.update(), c && !ie && !ui && (ui = !0, c(g), ui = !1);
      }
    }, g.getVelocity = function() {
      return (xt() - Zt) / (Ht() - Dr) * 1e3 || 0;
    }, g.endAnimation = function() {
      Or(g.callbackAnimation), r && (H ? H.progress(1) : r.paused() ? Y || Or(r, g.direction < 0, 1) : Or(r, r.reversed()));
    }, g.labelToScroll = function(O) {
      return r && r.labels && (Z || g.refresh() || Z) + r.labels[O] / r.duration() * dt || 0;
    }, g.getTrailing = function(O) {
      var z = B.indexOf(g), D = g.direction > 0 ? B.slice(0, z).reverse() : B.slice(z + 1);
      return (ge(O) ? D.filter(function(F) {
        return F.vars.preventOverlaps === O;
      }) : D).filter(function(F) {
        return g.direction > 0 ? F.end <= Z : F.start >= gt;
      });
    }, g.update = function(O, z, D) {
      if (!(x && !D && !O)) {
        var F = ie === !0 ? Ne : g.scroll(), Ot = O ? 0 : (F - Z) / dt, q = Ot < 0 ? 0 : Ot > 1 ? 1 : Ot || 0, vt = g.progress, Bt, pt, ot, it, Ie, lt, pe, Be;
        if (z && (Zt = Qt, Qt = x ? xt() : F, v && (Mi = hi, hi = r && !Y ? r.totalProgress() : q)), m && f && !Vt && !pn && De && (!q && Z < F + (F - Zt) / (Ht() - Dr) * m ? q = 1e-4 : q === 1 && gt > F + (F - Zt) / (Ht() - Dr) * m && (q = 0.9999)), q !== vt && g.enabled) {
          if (Bt = g.isActive = !!q && q < 1, pt = !!vt && vt < 1, lt = Bt !== pt, Ie = lt || !!q != !!vt, g.direction = q > vt ? 1 : -1, g.progress = q, Ie && !Vt && (ot = q && !vt ? 0 : q === 1 ? 1 : vt === 1 ? 2 : 3, Y && (it = !lt && A[ot + 1] !== "none" && A[ot + 1] || A[ot], Be = r && (it === "complete" || it === "reset" || it in r))), k && (lt || Be) && (Be || d || !r) && (qt(k) ? k(g) : g.getTrailing(k).forEach(function(Ai) {
            return Ai.endAnimation();
          })), Y || (H && !Vt && !pn ? (H._dp._time - H._start !== H._time && H.render(H._dp._time - H._start), H.resetTo ? H.resetTo("totalProgress", q, r._tTime / r._tDur) : (H.vars.totalProgress = q, H.invalidate().restart())) : r && r.totalProgress(q, !!(Vt && (At || O)))), f) {
            if (O && _ && (Pt.style[_ + C.os2] = br), !K)
              Le(Lr(ke + je * q));
            else if (Ie) {
              if (pe = !O && q > vt && gt + 1 > F && F + 1 >= $e(M, C), b)
                if (!O && (Bt || pe)) {
                  var Lt = ri(f, !0), zt = F - Z;
                  Uo(f, J, Lt.top + (C === Et ? zt : 0) + kt, Lt.left + (C === Et ? 0 : zt) + kt);
                } else
                  Uo(f, Pt);
              gr(Bt || pe ? ci : Oi), Je && q < 1 && Bt || Le(ke + (q === 1 && !pe ? je : 0));
            }
          }
          v && !Kt.tween && !Vt && !pn && Fe.restart(!0), a && (lt || T && q && (q < 1 || !ns)) && nn(a.targets).forEach(function(Ai) {
            return Ai.classList[Bt || T ? "add" : "remove"](a.className);
          }), o && !Y && !O && o(g), Ie && !Vt ? (Y && (Be && (it === "complete" ? r.pause().totalProgress(1) : it === "reset" ? r.restart(!0).pause() : it === "restart" ? r.restart(!0) : r[it]()), o && o(g)), (lt || !ns) && (u && lt && ir(g, u), U[ot] && ir(g, U[ot]), T && (q === 1 ? g.kill(!1, 1) : U[ot] = 0), lt || (ot = q === 1 ? 1 : 3, U[ot] && ir(g, U[ot]))), P && !Bt && Math.abs(g.getVelocity()) > (zr(P) ? P : 2500) && (Or(g.callbackAnimation), H ? H.progress(1) : Or(r, it === "reverse" ? 1 : !q, 1))) : Y && o && !Vt && o(g);
        }
        if (ji) {
          var Xt = x ? F / x.duration() * (x._caScrollDist || 0) : F;
          an(Xt + (y._isFlipped ? 1 : 0)), ji(Xt);
        }
        tr && tr(-F / x.duration() * (x._caScrollDist || 0));
      }
    }, g.enable = function(O, z) {
      g.enabled || (g.enabled = !0, Rt(M, "resize", Fr), N || Rt(M, "scroll", nr), st && Rt(s, "refreshInit", st), O !== !1 && (g.progress = It = 0, Qt = Zt = ht = xt()), z !== !1 && g.refresh());
    }, g.getTween = function(O) {
      return O && Kt ? Kt.tween : H;
    }, g.setPositions = function(O, z, D, F) {
      if (x) {
        var Ot = x.scrollTrigger, q = x.duration(), vt = Ot.end - Ot.start;
        O = Ot.start + vt * O / q, z = Ot.start + vt * z / q;
      }
      g.refresh(!1, !1, {
        start: Fo(O, D && !!g._startClamp),
        end: Fo(z, D && !!g._endClamp)
      }, F), g.update();
    }, g.adjustPinSpacing = function(O) {
      if (St && O) {
        var z = St.indexOf(C.d) + 1;
        St[z] = parseFloat(St[z]) + O + kt, St[1] = parseFloat(St[1]) + O + kt, gr(St);
      }
    }, g.disable = function(O, z) {
      if (O !== !1 && g.revert(!0, !0), g.enabled && (g.enabled = g.isActive = !1, z || H && H.pause(), Ne = 0, Yt && (Yt.uncache = 1), st && Mt(s, "refreshInit", st), Fe && (Fe.pause(), Kt.tween && Kt.tween.kill() && (Kt.tween = 0)), !N)) {
        for (var D = B.length; D--; )
          if (B[D].scroller === M && B[D] !== g)
            return;
        Mt(M, "resize", Fr), N || Mt(M, "scroll", nr);
      }
    }, g.kill = function(O, z) {
      g.disable(O, z), H && !z && H.kill(), l && delete Rs[l];
      var D = B.indexOf(g);
      D >= 0 && B.splice(D, 1), D === ee && Mn > 0 && ee--, D = 0, B.forEach(function(F) {
        return F.scroller === g.scroller && (D = 1);
      }), D || ie || (g.scroll.rec = 0), r && (r.scrollTrigger = null, O && r.revert({
        kill: !1
      }), z || r.kill()), ne && [ne, he, y, de].forEach(function(F) {
        return F.parentNode && F.parentNode.removeChild(F);
      }), Gr === g && (Gr = 0), f && (Yt && (Yt.uncache = 1), D = 0, B.forEach(function(F) {
        return F.pin === f && D++;
      }), D || (Yt.spacer = 0)), e.onKill && e.onKill(g);
    }, B.push(g), g.enable(!1, !1), ti && ti(g), r && r.add && !dt) {
      var j = g.update;
      g.update = function() {
        g.update = j, W.cache++, Z || gt || g.refresh();
      }, R.delayedCall(0.01, g.update), dt = 0.01, Z = gt = 0;
    } else
      g.refresh();
    f && cc();
  }, s.register = function(e) {
    return sr || (R = e || cl(), ul() && window.document && s.enable(), sr = Ar), sr;
  }, s.defaults = function(e) {
    if (e)
      for (var r in e)
        vn[r] = e[r];
    return vn;
  }, s.disable = function(e, r) {
    Ar = 0, B.forEach(function(o) {
      return o[r ? "kill" : "disable"](e);
    }), Mt(X, "wheel", nr), Mt(tt, "scroll", nr), clearInterval(dn), Mt(tt, "touchcancel", He), Mt(J, "touchstart", He), gn(Mt, tt, "pointerdown,touchstart,mousedown", No), gn(Mt, tt, "pointerup,touchend,mouseup", Io), Xn.kill(), _n(Mt);
    for (var n = 0; n < W.length; n += 3)
      mn(Mt, W[n], W[n + 1]), mn(Mt, W[n], W[n + 2]);
  }, s.enable = function() {
    if (X = window, tt = document, ve = tt.documentElement, J = tt.body, R) {
      if (nn = R.utils.toArray, Wr = R.utils.clamp, Os = R.core.context || He, rs = R.core.suppressOverwrites || He, io = X.history.scrollRestoration || "auto", Ds = X.pageYOffset || 0, R.core.globals("ScrollTrigger", s), J) {
        Ar = 1, _r = document.createElement("div"), _r.style.height = "100vh", _r.style.position = "absolute", wl(), rc(), wt.register(R), s.isTouch = wt.isTouch, _i = wt.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), Ps = wt.isTouch === 1, Rt(X, "wheel", nr), eo = [X, tt, ve, J], R.matchMedia ? (s.matchMedia = function(c) {
          var d = R.matchMedia(), h;
          for (h in c)
            d.add(h, c[h]);
          return d;
        }, R.addEventListener("matchMediaInit", function() {
          vl(), lo();
        }), R.addEventListener("matchMediaRevert", function() {
          return ml();
        }), R.addEventListener("matchMedia", function() {
          Bi(0, 1), Qi("matchMedia");
        }), R.matchMedia().add("(orientation: portrait)", function() {
          return os(), os;
        })) : console.warn("Requires GSAP 3.11.0 or later"), os(), Rt(tt, "scroll", nr);
        var e = J.hasAttribute("style"), r = J.style, n = r.borderTopStyle, o = R.core.Animation.prototype, a, l;
        for (o.revert || Object.defineProperty(o, "revert", {
          value: function() {
            return this.time(-0.01, !0);
          }
        }), r.borderTopStyle = "solid", a = ri(J), Et.m = Math.round(a.top + Et.sc()) || 0, re.m = Math.round(a.left + re.sc()) || 0, n ? r.borderTopStyle = n : r.removeProperty("border-top-style"), e || (J.setAttribute("style", ""), J.removeAttribute("style")), dn = setInterval(Xo, 250), R.delayedCall(0.5, function() {
          return pn = 0;
        }), Rt(tt, "touchcancel", He), Rt(J, "touchstart", He), gn(Rt, tt, "pointerdown,touchstart,mousedown", No), gn(Rt, tt, "pointerup,touchend,mouseup", Io), Es = R.utils.checkPrefix("transform"), Rn.push(Es), sr = Ht(), Xn = R.delayedCall(0.2, Bi).pause(), or = [tt, "visibilitychange", function() {
          var c = X.innerWidth, d = X.innerHeight;
          tt.hidden ? (Ao = c, Lo = d) : (Ao !== c || Lo !== d) && Fr();
        }, tt, "DOMContentLoaded", Bi, X, "load", Bi, X, "resize", Fr], _n(Rt), B.forEach(function(c) {
          return c.enable(0, 1);
        }), l = 0; l < W.length; l += 3)
          mn(Mt, W[l], W[l + 1]), mn(Mt, W[l], W[l + 2]);
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
    r && clearInterval(dn) || (dn = r) && setInterval(Xo, r), "ignoreMobileResize" in e && (Ps = s.isTouch === 1 && e.ignoreMobileResize), "autoRefreshEvents" in e && (_n(Mt) || _n(Rt, e.autoRefreshEvents || "none"), ol = (e.autoRefreshEvents + "").indexOf("resize") === -1);
  }, s.scrollerProxy = function(e, r) {
    var n = se(e), o = W.indexOf(n), a = Gi(n);
    ~o && W.splice(o, a ? 6 : 2), r && (a ? Ge.unshift(X, r, J, r, ve, r) : Ge.unshift(n, r));
  }, s.clearMatchMedia = function(e) {
    B.forEach(function(r) {
      return r._ctx && r._ctx.query === e && r._ctx.kill(!0, !0);
    });
  }, s.isInViewport = function(e, r, n) {
    var o = (ge(e) ? se(e) : e).getBoundingClientRect(), a = o[n ? Ui : qi] * r || 0;
    return n ? o.right - a > 0 && o.left + a < X.innerWidth : o.bottom - a > 0 && o.top + a < X.innerHeight;
  }, s.positionInViewport = function(e, r, n) {
    ge(e) && (e = se(e));
    var o = e.getBoundingClientRect(), a = o[n ? Ui : qi], l = r == null ? a / 2 : r in Vn ? Vn[r] * a : ~r.indexOf("%") ? parseFloat(r) * a / 100 : parseFloat(r) || 0;
    return n ? (o.left + l) / X.innerWidth : (o.top + l) / X.innerHeight;
  }, s.killAll = function(e) {
    if (B.slice(0).forEach(function(n) {
      return n.vars.id !== "ScrollSmoother" && n.kill();
    }), e !== !0) {
      var r = Ki.killAll || [];
      Ki = {}, r.forEach(function(n) {
        return n();
      });
    }
  }, s;
})();
V.version = "3.15.0";
V.saveStyles = function(s) {
  return s ? nn(s).forEach(function(t) {
    if (t && t.style) {
      var i = _e.indexOf(t);
      i >= 0 && _e.splice(i, 5), _e.push(t, t.style.cssText, t.getBBox && t.getAttribute("transform"), R.core.getCache(t), Os());
    }
  }) : _e;
};
V.revert = function(s, t) {
  return lo(!s, t);
};
V.create = function(s, t) {
  return new V(s, t);
};
V.refresh = function(s) {
  return s ? Fr(!0) : (sr || V.register()) && Bi(!0);
};
V.update = function(s) {
  return ++W.cache && si(s === !0 ? 2 : 0);
};
V.clearScrollMemory = yl;
V.maxScroll = function(s, t) {
  return $e(s, t ? re : Et);
};
V.getScrollFunc = function(s, t) {
  return Ei(se(s), t ? re : Et);
};
V.getById = function(s) {
  return Rs[s];
};
V.getAll = function() {
  return B.filter(function(s) {
    return s.vars.id !== "ScrollSmoother";
  });
};
V.isScrolling = function() {
  return !!De;
};
V.snapDirectional = ao;
V.addEventListener = function(s, t) {
  var i = Ki[s] || (Ki[s] = []);
  ~i.indexOf(t) || i.push(t);
};
V.removeEventListener = function(s, t) {
  var i = Ki[s], e = i && i.indexOf(t);
  e >= 0 && i.splice(e, 1);
};
V.batch = function(s, t) {
  var i = [], e = {}, r = t.interval || 0.016, n = t.batchMax || 1e9, o = function(u, c) {
    var d = [], h = [], f = R.delayedCall(r, function() {
      c(d, h), d = [], h = [];
    }).pause();
    return function(_) {
      d.length || f.restart(!0), d.push(_.trigger), h.push(_), n <= d.length && f.progress(1);
    };
  }, a;
  for (a in t)
    e[a] = a.substr(0, 2) === "on" && qt(t[a]) && a !== "onRefreshInit" ? o(a, t[a]) : t[a];
  return qt(n) && (n = n(), Rt(V, "refresh", function() {
    return n = t.batchMax();
  })), nn(s).forEach(function(l) {
    var u = {};
    for (a in e)
      u[a] = e[a];
    u.trigger = l, i.push(V.create(u));
  }), i;
};
var $o = function(t, i, e, r) {
  return i > r ? t(r) : i < 0 && t(0), e > r ? (r - i) / (e - i) : e < 0 ? i / (i - e) : 1;
}, ls = function s(t, i) {
  i === !0 ? t.style.removeProperty("touch-action") : t.style.touchAction = i === !0 ? "auto" : i ? "pan-" + i + (wt.isTouch ? " pinch-zoom" : "") : "none", t === ve && s(J, i);
}, Sn = {
  auto: 1,
  scroll: 1
}, _c = function(t) {
  var i = t.event, e = t.target, r = t.axis, n = (i.changedTouches ? i.changedTouches[0] : i).target, o = n._gsap || R.core.getCache(n), a = Ht(), l;
  if (!o._isScrollT || a - o._isScrollT > 2e3) {
    for (; n && n !== J && (n.scrollHeight <= n.clientHeight && n.scrollWidth <= n.clientWidth || !(Sn[(l = Oe(n)).overflowY] || Sn[l.overflowX])); )
      n = n.parentNode;
    o._isScroll = n && n !== e && !Gi(n) && (Sn[(l = Oe(n)).overflowY] || Sn[l.overflowX]), o._isScrollT = a;
  }
  (o._isScroll || r === "x") && (i.stopPropagation(), i._gsapAllow = !0);
}, Sl = function(t, i, e, r) {
  return wt.create({
    target: t,
    capture: !0,
    debounce: !1,
    lockAxis: !0,
    type: i,
    onWheel: r = r && _c,
    onPress: r,
    onDrag: r,
    onScroll: r,
    onEnable: function() {
      return e && Rt(tt, wt.eventTypes[0], Ko, !1, !0);
    },
    onDisable: function() {
      return Mt(tt, wt.eventTypes[0], Ko, !0);
    }
  });
}, gc = /(input|label|select|textarea)/i, Go, Ko = function(t) {
  var i = gc.test(t.target.tagName);
  (i || Go) && (t._gsapAllow = !0, Go = i);
}, mc = function(t) {
  Ii(t) || (t = {}), t.preventDefault = t.isNormalizer = t.allowClicks = !0, t.type || (t.type = "wheel,touch"), t.debounce = !!t.debounce, t.id = t.id || "normalizer";
  var i = t, e = i.normalizeScrollX, r = i.momentum, n = i.allowNestedScroll, o = i.onRelease, a, l, u = se(t.target) || ve, c = R.core.globals().ScrollSmoother, d = c && c.get(), h = _i && (t.content && se(t.content) || d && t.content !== !1 && !d.smooth() && d.content()), f = Ei(u, Et), _ = Ei(u, re), p = 1, m = (wt.isTouch && X.visualViewport ? X.visualViewport.scale * X.visualViewport.width : X.outerWidth) / X.innerWidth, S = 0, w = qt(r) ? function() {
    return r(a);
  } : function() {
    return r || 2.8;
  }, T, v, b = Sl(u, t.type, !0, n), E = function() {
    return v = !1;
  }, x = He, P = He, k = function() {
    l = $e(u, Et), P = Wr(_i ? 1 : 0, l), e && (x = Wr(0, $e(u, re))), T = $i;
  }, C = function() {
    h._gsap.y = Lr(parseFloat(h._gsap.y) + f.offset) + "px", h.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(h._gsap.y) + ", 0, 1)", f.offset = f.cacheID = 0;
  }, Y = function() {
    if (v) {
      requestAnimationFrame(E);
      var Q = Lr(a.deltaY / 2), et = P(f.v - Q);
      if (h && et !== f.v + f.offset) {
        f.offset = et - f.v;
        var g = Lr((parseFloat(h && h._gsap.y) || 0) - f.offset);
        h.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + g + ", 0, 1)", h._gsap.y = g + "px", f.cacheID = W.cache, si();
      }
      return !0;
    }
    f.offset && C(), v = !0;
  }, M, G, N, K, U = function() {
    k(), M.isActive() && M.vars.scrollY > l && (f() > l ? M.progress(1) && f(l) : M.resetTo("scrollY", l));
  };
  return h && R.set(h, {
    y: "+=0"
  }), t.ignoreCheck = function(A) {
    return _i && A.type === "touchmove" && Y() || p > 1.05 && A.type !== "touchstart" || a.isGesturing || A.touches && A.touches.length > 1;
  }, t.onPress = function() {
    v = !1;
    var A = p;
    p = Lr((X.visualViewport && X.visualViewport.scale || 1) / m), M.pause(), A !== p && ls(u, p > 1.01 ? !0 : e ? !1 : "x"), G = _(), N = f(), k(), T = $i;
  }, t.onRelease = t.onGestureStart = function(A, Q) {
    if (f.offset && C(), !Q)
      K.restart(!0);
    else {
      W.cache++;
      var et = w(), g, st;
      e && (g = _(), st = g + et * 0.05 * -A.velocityX / 0.227, et *= $o(_, g, st, $e(u, re)), M.vars.scrollX = x(st)), g = f(), st = g + et * 0.05 * -A.velocityY / 0.227, et *= $o(f, g, st, $e(u, Et)), M.vars.scrollY = P(st), M.invalidate().duration(et).play(0.01), (_i && M.vars.scrollY >= l || g >= l - 1) && R.to({}, {
        onUpdate: U,
        duration: et
      });
    }
    o && o(A);
  }, t.onWheel = function() {
    M._ts && M.pause(), Ht() - S > 1e3 && (T = 0, S = Ht());
  }, t.onChange = function(A, Q, et, g, st) {
    if ($i !== T && k(), Q && e && _(x(g[2] === Q ? G + (A.startX - A.x) : _() + Q - g[1])), et) {
      f.offset && C();
      var Gt = st[2] === et, Ae = Gt ? N + A.startY - A.y : f() + et - st[1], ht = P(Ae);
      Gt && Ae !== ht && (N += ht - Ae), f(ht);
    }
    (et || Q) && si();
  }, t.onEnable = function() {
    ls(u, e ? !1 : "x"), V.addEventListener("refresh", U), Rt(X, "resize", U), f.smooth && (f.target.style.scrollBehavior = "auto", f.smooth = _.smooth = !1), b.enable();
  }, t.onDisable = function() {
    ls(u, !0), Mt(X, "resize", U), V.removeEventListener("refresh", U), b.kill();
  }, t.lockAxis = t.lockAxis !== !1, a = new wt(t), a.iOS = _i, _i && !f() && f(1), _i && R.ticker.add(He), K = a._dc, M = R.to(a, {
    ease: "power4",
    paused: !0,
    inherit: !1,
    scrollX: e ? "+=0.1" : "+=0",
    scrollY: "+=0.1",
    modifiers: {
      scrollY: xl(f, f(), function() {
        return M.pause();
      })
    },
    onUpdate: si,
    onComplete: K.vars.onComplete
  }), a;
};
V.sort = function(s) {
  if (qt(s))
    return B.sort(s);
  var t = X.pageYOffset || 0;
  return V.getAll().forEach(function(i) {
    return i._sortY = i.trigger ? t + i.trigger.getBoundingClientRect().top : i.start + X.innerHeight;
  }), B.sort(s || function(i, e) {
    return (i.vars.refreshPriority || 0) * -1e6 + (i.vars.containerAnimation ? 1e6 : i._sortY) - ((e.vars.containerAnimation ? 1e6 : e._sortY) + (e.vars.refreshPriority || 0) * -1e6);
  });
};
V.observe = function(s) {
  return new wt(s);
};
V.normalizeScroll = function(s) {
  if (typeof s > "u")
    return te;
  if (s === !0 && te)
    return te.enable();
  if (s === !1) {
    te && te.kill(), te = s;
    return;
  }
  var t = s instanceof wt ? s : mc(s);
  return te && te.target === t.target && te.kill(), Gi(t.target) && (te = t), t;
};
V.core = {
  // smaller file size way to leverage in ScrollSmoother and Observer
  _getVelocityProp: ks,
  _inputObserver: Sl,
  _scrollers: W,
  _proxies: Ge,
  bridge: {
    // when normalizeScroll sets the scroll position (ss = setScroll)
    ss: function() {
      De || Qi("scrollStart"), De = Ht();
    },
    // a way to get the _refreshing value in Observer
    ref: function() {
      return Vt;
    }
  }
};
cl() && R.registerPlugin(V);
function vc() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.documentElement.classList.add("reduced-motion"), "scrollRestoration" in history && (history.scrollRestoration = "manual");
    return;
  }
  "scrollRestoration" in history && (history.scrollRestoration = "manual"), kn.registerPlugin(V);
  const t = new Al({
    duration: 1.05,
    easing: (i) => Math.min(1, 1.001 - Math.pow(2, -10 * i)),
    smoothWheel: !0,
    anchors: !1
  });
  t.on("scroll", V.update), kn.ticker.add((i) => t.raf(i * 1e3)), kn.ticker.lagSmoothing(0), window.__ujLenis = t;
}
const yc = 24;
let Qo = !1;
function Ls() {
  const s = document.querySelector("#nav .nav-inner") || document.getElementById("nav"), t = s ? s.getBoundingClientRect().height : 67, i = Math.ceil(t) + yc;
  return document.documentElement.style.setProperty("--nav-offset", `${i}px`), i;
}
function zs() {
  const s = getComputedStyle(document.documentElement).getPropertyValue("--nav-offset").trim(), t = parseFloat(s);
  if (!Number.isFinite(t) || t <= 0) return 91;
  if (s.endsWith("rem")) {
    const i = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    return t * i;
  }
  return t;
}
function bl(s) {
  return !!(s && s.matches && s.matches("h2, .lede, .steps h3"));
}
function wc(s) {
  const t = parseFloat(getComputedStyle(s).scrollMarginTop) || 0, i = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0, r = (bl(s) ? zs() : 0) ? 0 : zs();
  return t + i - r;
}
function us(s, { immediate: t = !0, duration: i = 0.9 } = {}) {
  if (!s) return;
  const e = window.__ujLenis;
  if (e) {
    e.scrollTo(s, {
      offset: wc(s),
      immediate: t,
      duration: t ? 0 : i
    });
    return;
  }
  const r = bl(s) ? 0 : -zs(), n = s.getBoundingClientRect().top + (window.scrollY || 0) + r;
  window.scrollTo({ top: Math.max(0, n), behavior: t ? "auto" : "smooth" });
}
function xc() {
  if (Qo) return;
  if (Qo = !0, Ls(), window.addEventListener("resize", Ls, { passive: !0 }), !Element.prototype.__ujScrollIntoView) {
    const i = Element.prototype.scrollIntoView;
    Element.prototype.__ujScrollIntoView = i, Element.prototype.scrollIntoView = function(r) {
      if (this.nodeType !== 1) return i.call(this, r);
      const n = !(r && typeof r == "object" && r.behavior === "smooth");
      us(this, { immediate: n });
    };
  }
  const s = (i) => {
    if (!i || i === "#") return null;
    try {
      return document.querySelector(i);
    } catch {
      return null;
    }
  }, t = (i) => {
    const e = s(window.location.hash);
    e && us(e, { immediate: i });
  };
  requestAnimationFrame(() => t(!0)), setTimeout(() => t(!0), 80), window.addEventListener("hashchange", () => t(!0)), document.addEventListener("click", (i) => {
    const e = i.target.closest('a[href^="#"]');
    if (!e) return;
    const r = e.getAttribute("href"), n = s(r);
    if (!n) return;
    i.preventDefault(), history.pushState(null, "", r);
    const o = window.matchMedia("(max-width: 760px)").matches;
    us(n, { immediate: o });
  });
}
let Zo = !1;
function Fs() {
  if (Zo) return;
  Zo = !0;
  const s = document.getElementById("nav"), t = document.getElementById("navToggle"), i = document.getElementById("navDrawer");
  xc();
  function e() {
    s && (s.classList.contains("page-nav") || s.classList.toggle("is-solid", (window.scrollY || 0) > 40));
  }
  window.addEventListener("scroll", e, { passive: !0 }), e(), t && i && t.addEventListener("click", () => {
    const n = !(t.getAttribute("aria-expanded") === "true");
    t.setAttribute("aria-expanded", n ? "true" : "false"), n ? (i.removeAttribute("hidden"), s?.classList.add("is-open")) : (i.setAttribute("hidden", ""), s?.classList.remove("is-open")), Ls();
  }), Sc();
}
function Sc() {
  const s = document.querySelector(".sticky-call");
  if (!s) return;
  const t = document.documentElement, i = document.querySelector(".hero-pin");
  let e = t.classList.contains("call-docked");
  const r = (o) => {
    o !== e && (e = o, s.classList.toggle("is-away", o), t.classList.toggle("call-docked", o));
  };
  if (!i || !t.classList.contains("home")) {
    r(!0);
    return;
  }
  if (!("IntersectionObserver" in window)) {
    r(!0);
    return;
  }
  new IntersectionObserver(
    ([o]) => {
      if (!o) return;
      const a = o.intersectionRatio;
      e ? a > 0.16 && r(!1) : a < 0.03 && r(!0);
    },
    { threshold: [0, 0.03, 0.08, 0.16, 1] }
  ).observe(i);
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", Fs) : Fs();
function jo(s = document) {
  s.querySelectorAll("[data-compare]").forEach((t) => {
    const i = t.querySelector(".compare-after"), e = t.querySelector('input[type="range"]');
    if (!i || !e) return;
    const r = (n) => {
      i.style.clipPath = `inset(0 ${100 - n}% 0 0)`, t.style.setProperty("--pos", `${n}%`);
    };
    r(Number(e.value) || 50), e.addEventListener("input", () => r(Number(e.value)));
  });
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", () => jo()) : jo();
function Jo() {
  vc(), Fs(), Tl();
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", Jo) : Jo();
