(() => {
  "use strict";
  function e(e) {
    return (
      null !== e &&
      "object" == typeof e &&
      "constructor" in e &&
      e.constructor === Object
    );
  }
  function t(s, i) {
    void 0 === s && (s = {}), void 0 === i && (i = {});
    const a = ["__proto__", "constructor", "prototype"];
    Object.keys(i)
      .filter((e) => a.indexOf(e) < 0)
      .forEach((a) => {
        void 0 === s[a]
          ? (s[a] = i[a])
          : e(i[a]) && e(s[a]) && Object.keys(i[a]).length > 0 && t(s[a], i[a]);
      });
  }
  const s = {
    body: {},
    addEventListener() {},
    removeEventListener() {},
    activeElement: { blur() {}, nodeName: "" },
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null,
    createEvent: () => ({ initEvent() {} }),
    createElement: () => ({
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName: () => [],
    }),
    createElementNS: () => ({}),
    importNode: () => null,
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
  };
  function i() {
    const e = "undefined" != typeof document ? document : {};
    return t(e, s), e;
  }
  const a = {
    document: s,
    navigator: { userAgent: "" },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
    history: { replaceState() {}, pushState() {}, go() {}, back() {} },
    CustomEvent: function () {
      return this;
    },
    addEventListener() {},
    removeEventListener() {},
    getComputedStyle: () => ({ getPropertyValue: () => "" }),
    Image() {},
    Date() {},
    screen: {},
    setTimeout() {},
    clearTimeout() {},
    matchMedia: () => ({}),
    requestAnimationFrame: (e) =>
      "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
    cancelAnimationFrame(e) {
      "undefined" != typeof setTimeout && clearTimeout(e);
    },
  };
  function r() {
    const e = "undefined" != typeof window ? window : {};
    return t(e, a), e;
  }
  function n(e) {
    return (
      void 0 === e && (e = ""),
      e
        .trim()
        .split(" ")
        .filter((e) => !!e.trim())
    );
  }
  function l(e, t) {
    return void 0 === t && (t = 0), setTimeout(e, t);
  }
  function o() {
    return Date.now();
  }
  function d(e, t) {
    void 0 === t && (t = "x");
    const s = r();
    let i, a, n;
    const l = (function (e) {
      const t = r();
      let s;
      return (
        t.getComputedStyle && (s = t.getComputedStyle(e, null)),
        !s && e.currentStyle && (s = e.currentStyle),
        s || (s = e.style),
        s
      );
    })(e);
    return (
      s.WebKitCSSMatrix
        ? ((a = l.transform || l.webkitTransform),
          a.split(",").length > 6 &&
            (a = a
              .split(", ")
              .map((e) => e.replace(",", "."))
              .join(", ")),
          (n = new s.WebKitCSSMatrix("none" === a ? "" : a)))
        : ((n =
            l.MozTransform ||
            l.OTransform ||
            l.MsTransform ||
            l.msTransform ||
            l.transform ||
            l
              .getPropertyValue("transform")
              .replace("translate(", "matrix(1, 0, 0, 1,")),
          (i = n.toString().split(","))),
      "x" === t &&
        (a = s.WebKitCSSMatrix
          ? n.m41
          : 16 === i.length
            ? parseFloat(i[12])
            : parseFloat(i[4])),
      "y" === t &&
        (a = s.WebKitCSSMatrix
          ? n.m42
          : 16 === i.length
            ? parseFloat(i[13])
            : parseFloat(i[5])),
      a || 0
    );
  }
  function c(e) {
    return (
      "object" == typeof e &&
      null !== e &&
      e.constructor &&
      "Object" === Object.prototype.toString.call(e).slice(8, -1)
    );
  }
  function p() {
    const e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
      t = ["__proto__", "constructor", "prototype"];
    for (let i = 1; i < arguments.length; i += 1) {
      const a = i < 0 || arguments.length <= i ? void 0 : arguments[i];
      if (
        null != a &&
        ((s = a),
        !("undefined" != typeof window && void 0 !== window.HTMLElement
          ? s instanceof HTMLElement
          : s && (1 === s.nodeType || 11 === s.nodeType)))
      ) {
        const s = Object.keys(Object(a)).filter((e) => t.indexOf(e) < 0);
        for (let t = 0, i = s.length; t < i; t += 1) {
          const i = s[t],
            r = Object.getOwnPropertyDescriptor(a, i);
          void 0 !== r &&
            r.enumerable &&
            (c(e[i]) && c(a[i])
              ? a[i].__swiper__
                ? (e[i] = a[i])
                : p(e[i], a[i])
              : !c(e[i]) && c(a[i])
                ? ((e[i] = {}), a[i].__swiper__ ? (e[i] = a[i]) : p(e[i], a[i]))
                : (e[i] = a[i]));
        }
      }
    }
    var s;
    return e;
  }
  function u(e, t, s) {
    e.style.setProperty(t, s);
  }
  function m(e) {
    let { swiper: t, targetPosition: s, side: i } = e;
    const a = r(),
      n = -t.translate;
    let l,
      o = null;
    const d = t.params.speed;
    (t.wrapperEl.style.scrollSnapType = "none"),
      a.cancelAnimationFrame(t.cssModeFrameID);
    const c = s > n ? "next" : "prev",
      p = (e, t) => ("next" === c && e >= t) || ("prev" === c && e <= t),
      u = () => {
        (l = new Date().getTime()), null === o && (o = l);
        const e = Math.max(Math.min((l - o) / d, 1), 0),
          r = 0.5 - Math.cos(e * Math.PI) / 2;
        let c = n + r * (s - n);
        if ((p(c, s) && (c = s), t.wrapperEl.scrollTo({ [i]: c }), p(c, s)))
          return (
            (t.wrapperEl.style.overflow = "hidden"),
            (t.wrapperEl.style.scrollSnapType = ""),
            setTimeout(() => {
              (t.wrapperEl.style.overflow = ""),
                t.wrapperEl.scrollTo({ [i]: c });
            }),
            void a.cancelAnimationFrame(t.cssModeFrameID)
          );
        t.cssModeFrameID = a.requestAnimationFrame(u);
      };
    u();
  }
  function h(e) {
    return (
      e.querySelector(".swiper-slide-transform") ||
      (e.shadowRoot && e.shadowRoot.querySelector(".swiper-slide-transform")) ||
      e
    );
  }
  function f(e, t) {
    void 0 === t && (t = "");
    const s = r(),
      i = [...e.children];
    return (
      s.HTMLSlotElement &&
        e instanceof HTMLSlotElement &&
        i.push(...e.assignedElements()),
      t ? i.filter((e) => e.matches(t)) : i
    );
  }
  function g(e) {
    try {
      return void console.warn(e);
    } catch (e) {}
  }
  function v(e, t) {
    void 0 === t && (t = []);
    const s = document.createElement(e);
    return s.classList.add(...(Array.isArray(t) ? t : n(t))), s;
  }
  function w(e) {
    const t = r(),
      s = i(),
      a = e.getBoundingClientRect(),
      n = s.body,
      l = e.clientTop || n.clientTop || 0,
      o = e.clientLeft || n.clientLeft || 0,
      d = e === t ? t.scrollY : e.scrollTop,
      c = e === t ? t.scrollX : e.scrollLeft;
    return { top: a.top + d - l, left: a.left + c - o };
  }
  function b(e, t) {
    return r().getComputedStyle(e, null).getPropertyValue(t);
  }
  function y(e) {
    let t,
      s = e;
    if (s) {
      for (t = 0; null !== (s = s.previousSibling); )
        1 === s.nodeType && (t += 1);
      return t;
    }
  }
  function E(e, t) {
    const s = [];
    let i = e.parentElement;
    for (; i; )
      t ? i.matches(t) && s.push(i) : s.push(i), (i = i.parentElement);
    return s;
  }
  function S(e, t) {
    t &&
      e.addEventListener("transitionend", function s(i) {
        i.target === e &&
          (t.call(e, i), e.removeEventListener("transitionend", s));
      });
  }
  function x(e, t, s) {
    const i = r();
    return s
      ? e["width" === t ? "offsetWidth" : "offsetHeight"] +
          parseFloat(
            i
              .getComputedStyle(e, null)
              .getPropertyValue("width" === t ? "margin-right" : "margin-top"),
          ) +
          parseFloat(
            i
              .getComputedStyle(e, null)
              .getPropertyValue(
                "width" === t ? "margin-left" : "margin-bottom",
              ),
          )
      : e.offsetWidth;
  }
  function T(e) {
    return (Array.isArray(e) ? e : [e]).filter((e) => !!e);
  }
  function M(e) {
    return (t) =>
      Math.abs(t) > 0 &&
      e.browser &&
      e.browser.need3dFix &&
      Math.abs(t) % 90 == 0
        ? t + 0.001
        : t;
  }
  let C, L, P;
  function O() {
    return (
      C ||
        (C = (function () {
          const e = r(),
            t = i();
          return {
            smoothScroll:
              t.documentElement &&
              t.documentElement.style &&
              "scrollBehavior" in t.documentElement.style,
            touch: !!(
              "ontouchstart" in e ||
              (e.DocumentTouch && t instanceof e.DocumentTouch)
            ),
          };
        })()),
      C
    );
  }
  function A(e) {
    return (
      void 0 === e && (e = {}),
      L ||
        (L = (function (e) {
          let { userAgent: t } = void 0 === e ? {} : e;
          const s = O(),
            i = r(),
            a = i.navigator.platform,
            n = t || i.navigator.userAgent,
            l = { ios: !1, android: !1 },
            o = i.screen.width,
            d = i.screen.height,
            c = n.match(/(Android);?[\s\/]+([\d.]+)?/);
          let p = n.match(/(iPad).*OS\s([\d_]+)/);
          const u = n.match(/(iPod)(.*OS\s([\d_]+))?/),
            m = !p && n.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
            h = "Win32" === a;
          let f = "MacIntel" === a;
          return (
            !p &&
              f &&
              s.touch &&
              [
                "1024x1366",
                "1366x1024",
                "834x1194",
                "1194x834",
                "834x1112",
                "1112x834",
                "768x1024",
                "1024x768",
                "820x1180",
                "1180x820",
                "810x1080",
                "1080x810",
              ].indexOf(`${o}x${d}`) >= 0 &&
              ((p = n.match(/(Version)\/([\d.]+)/)),
              p || (p = [0, 1, "13_0_0"]),
              (f = !1)),
            c && !h && ((l.os = "android"), (l.android = !0)),
            (p || m || u) && ((l.os = "ios"), (l.ios = !0)),
            l
          );
        })(e)),
      L
    );
  }
  function $() {
    return (
      P ||
        (P = (function () {
          const e = r(),
            t = A();
          let s = !1;
          function i() {
            const t = e.navigator.userAgent.toLowerCase();
            return (
              t.indexOf("safari") >= 0 &&
              t.indexOf("chrome") < 0 &&
              t.indexOf("android") < 0
            );
          }
          if (i()) {
            const t = String(e.navigator.userAgent);
            if (t.includes("Version/")) {
              const [e, i] = t
                .split("Version/")[1]
                .split(" ")[0]
                .split(".")
                .map((e) => Number(e));
              s = e < 16 || (16 === e && i < 2);
            }
          }
          const a = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
              e.navigator.userAgent,
            ),
            n = i();
          return {
            isSafari: s || n,
            needPerspectiveFix: s,
            need3dFix: n || (a && t.ios),
            isWebView: a,
          };
        })()),
      P
    );
  }
  var k = {
    on(e, t, s) {
      const i = this;
      if (!i.eventsListeners || i.destroyed) return i;
      if ("function" != typeof t) return i;
      const a = s ? "unshift" : "push";
      return (
        e.split(" ").forEach((e) => {
          i.eventsListeners[e] || (i.eventsListeners[e] = []),
            i.eventsListeners[e][a](t);
        }),
        i
      );
    },
    once(e, t, s) {
      const i = this;
      if (!i.eventsListeners || i.destroyed) return i;
      if ("function" != typeof t) return i;
      function a() {
        i.off(e, a), a.__emitterProxy && delete a.__emitterProxy;
        for (var s = arguments.length, r = new Array(s), n = 0; n < s; n++)
          r[n] = arguments[n];
        t.apply(i, r);
      }
      return (a.__emitterProxy = t), i.on(e, a, s);
    },
    onAny(e, t) {
      const s = this;
      if (!s.eventsListeners || s.destroyed) return s;
      if ("function" != typeof e) return s;
      const i = t ? "unshift" : "push";
      return (
        s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[i](e), s
      );
    },
    offAny(e) {
      const t = this;
      if (!t.eventsListeners || t.destroyed) return t;
      if (!t.eventsAnyListeners) return t;
      const s = t.eventsAnyListeners.indexOf(e);
      return s >= 0 && t.eventsAnyListeners.splice(s, 1), t;
    },
    off(e, t) {
      const s = this;
      return !s.eventsListeners || s.destroyed
        ? s
        : s.eventsListeners
          ? (e.split(" ").forEach((e) => {
              void 0 === t
                ? (s.eventsListeners[e] = [])
                : s.eventsListeners[e] &&
                  s.eventsListeners[e].forEach((i, a) => {
                    (i === t || (i.__emitterProxy && i.__emitterProxy === t)) &&
                      s.eventsListeners[e].splice(a, 1);
                  });
            }),
            s)
          : s;
    },
    emit() {
      const e = this;
      if (!e.eventsListeners || e.destroyed) return e;
      if (!e.eventsListeners) return e;
      let t, s, i;
      for (var a = arguments.length, r = new Array(a), n = 0; n < a; n++)
        r[n] = arguments[n];
      "string" == typeof r[0] || Array.isArray(r[0])
        ? ((t = r[0]), (s = r.slice(1, r.length)), (i = e))
        : ((t = r[0].events), (s = r[0].data), (i = r[0].context || e)),
        s.unshift(i);
      return (
        (Array.isArray(t) ? t : t.split(" ")).forEach((t) => {
          e.eventsAnyListeners &&
            e.eventsAnyListeners.length &&
            e.eventsAnyListeners.forEach((e) => {
              e.apply(i, [t, ...s]);
            }),
            e.eventsListeners &&
              e.eventsListeners[t] &&
              e.eventsListeners[t].forEach((e) => {
                e.apply(i, s);
              });
        }),
        e
      );
    },
  };
  const _ = (e, t, s) => {
    t && !e.classList.contains(s)
      ? e.classList.add(s)
      : !t && e.classList.contains(s) && e.classList.remove(s);
  };
  const I = (e, t, s) => {
    t && !e.classList.contains(s)
      ? e.classList.add(s)
      : !t && e.classList.contains(s) && e.classList.remove(s);
  };
  const z = (e, t) => {
      if (!e || e.destroyed || !e.params) return;
      const s = t.closest(
        e.isElement ? "swiper-slide" : `.${e.params.slideClass}`,
      );
      if (s) {
        let t = s.querySelector(`.${e.params.lazyPreloaderClass}`);
        !t &&
          e.isElement &&
          (s.shadowRoot
            ? (t = s.shadowRoot.querySelector(
                `.${e.params.lazyPreloaderClass}`,
              ))
            : requestAnimationFrame(() => {
                s.shadowRoot &&
                  ((t = s.shadowRoot.querySelector(
                    `.${e.params.lazyPreloaderClass}`,
                  )),
                  t && t.remove());
              })),
          t && t.remove();
      }
    },
    D = (e, t) => {
      if (!e.slides[t]) return;
      const s = e.slides[t].querySelector('[loading="lazy"]');
      s && s.removeAttribute("loading");
    },
    G = (e) => {
      if (!e || e.destroyed || !e.params) return;
      let t = e.params.lazyPreloadPrevNext;
      const s = e.slides.length;
      if (!s || !t || t < 0) return;
      t = Math.min(t, s);
      const i =
          "auto" === e.params.slidesPerView
            ? e.slidesPerViewDynamic()
            : Math.ceil(e.params.slidesPerView),
        a = e.activeIndex;
      if (e.params.grid && e.params.grid.rows > 1) {
        const s = a,
          r = [s - t];
        return (
          r.push(...Array.from({ length: t }).map((e, t) => s + i + t)),
          void e.slides.forEach((t, s) => {
            r.includes(t.column) && D(e, s);
          })
        );
      }
      const r = a + i - 1;
      if (e.params.rewind || e.params.loop)
        for (let i = a - t; i <= r + t; i += 1) {
          const t = ((i % s) + s) % s;
          (t < a || t > r) && D(e, t);
        }
      else
        for (let i = Math.max(a - t, 0); i <= Math.min(r + t, s - 1); i += 1)
          i !== a && (i > r || i < a) && D(e, i);
    };
  var H = {
    updateSize: function () {
      const e = this;
      let t, s;
      const i = e.el;
      (t =
        void 0 !== e.params.width && null !== e.params.width
          ? e.params.width
          : i.clientWidth),
        (s =
          void 0 !== e.params.height && null !== e.params.height
            ? e.params.height
            : i.clientHeight),
        (0 === t && e.isHorizontal()) ||
          (0 === s && e.isVertical()) ||
          ((t =
            t -
            parseInt(b(i, "padding-left") || 0, 10) -
            parseInt(b(i, "padding-right") || 0, 10)),
          (s =
            s -
            parseInt(b(i, "padding-top") || 0, 10) -
            parseInt(b(i, "padding-bottom") || 0, 10)),
          Number.isNaN(t) && (t = 0),
          Number.isNaN(s) && (s = 0),
          Object.assign(e, {
            width: t,
            height: s,
            size: e.isHorizontal() ? t : s,
          }));
    },
    updateSlides: function () {
      const e = this;
      function t(t, s) {
        return parseFloat(t.getPropertyValue(e.getDirectionLabel(s)) || 0);
      }
      const s = e.params,
        {
          wrapperEl: i,
          slidesEl: a,
          size: r,
          rtlTranslate: n,
          wrongRTL: l,
        } = e,
        o = e.virtual && s.virtual.enabled,
        d = o ? e.virtual.slides.length : e.slides.length,
        c = f(a, `.${e.params.slideClass}, swiper-slide`),
        p = o ? e.virtual.slides.length : c.length;
      let m = [];
      const h = [],
        g = [];
      let v = s.slidesOffsetBefore;
      "function" == typeof v && (v = s.slidesOffsetBefore.call(e));
      let w = s.slidesOffsetAfter;
      "function" == typeof w && (w = s.slidesOffsetAfter.call(e));
      const y = e.snapGrid.length,
        E = e.slidesGrid.length;
      let S = s.spaceBetween,
        T = -v,
        M = 0,
        C = 0;
      if (void 0 === r) return;
      "string" == typeof S && S.indexOf("%") >= 0
        ? (S = (parseFloat(S.replace("%", "")) / 100) * r)
        : "string" == typeof S && (S = parseFloat(S)),
        (e.virtualSize = -S),
        c.forEach((e) => {
          n ? (e.style.marginLeft = "") : (e.style.marginRight = ""),
            (e.style.marginBottom = ""),
            (e.style.marginTop = "");
        }),
        s.centeredSlides &&
          s.cssMode &&
          (u(i, "--swiper-centered-offset-before", ""),
          u(i, "--swiper-centered-offset-after", ""));
      const L = s.grid && s.grid.rows > 1 && e.grid;
      let P;
      L ? e.grid.initSlides(c) : e.grid && e.grid.unsetSlides();
      const O =
        "auto" === s.slidesPerView &&
        s.breakpoints &&
        Object.keys(s.breakpoints).filter(
          (e) => void 0 !== s.breakpoints[e].slidesPerView,
        ).length > 0;
      for (let i = 0; i < p; i += 1) {
        let a;
        if (
          ((P = 0),
          c[i] && (a = c[i]),
          L && e.grid.updateSlide(i, a, c),
          !c[i] || "none" !== b(a, "display"))
        ) {
          if ("auto" === s.slidesPerView) {
            O && (c[i].style[e.getDirectionLabel("width")] = "");
            const r = getComputedStyle(a),
              n = a.style.transform,
              l = a.style.webkitTransform;
            if (
              (n && (a.style.transform = "none"),
              l && (a.style.webkitTransform = "none"),
              s.roundLengths)
            )
              P = e.isHorizontal() ? x(a, "width", !0) : x(a, "height", !0);
            else {
              const e = t(r, "width"),
                s = t(r, "padding-left"),
                i = t(r, "padding-right"),
                n = t(r, "margin-left"),
                l = t(r, "margin-right"),
                o = r.getPropertyValue("box-sizing");
              if (o && "border-box" === o) P = e + n + l;
              else {
                const { clientWidth: t, offsetWidth: r } = a;
                P = e + s + i + n + l + (r - t);
              }
            }
            n && (a.style.transform = n),
              l && (a.style.webkitTransform = l),
              s.roundLengths && (P = Math.floor(P));
          } else
            (P = (r - (s.slidesPerView - 1) * S) / s.slidesPerView),
              s.roundLengths && (P = Math.floor(P)),
              c[i] && (c[i].style[e.getDirectionLabel("width")] = `${P}px`);
          c[i] && (c[i].swiperSlideSize = P),
            g.push(P),
            s.centeredSlides
              ? ((T = T + P / 2 + M / 2 + S),
                0 === M && 0 !== i && (T = T - r / 2 - S),
                0 === i && (T = T - r / 2 - S),
                Math.abs(T) < 0.001 && (T = 0),
                s.roundLengths && (T = Math.floor(T)),
                C % s.slidesPerGroup == 0 && m.push(T),
                h.push(T))
              : (s.roundLengths && (T = Math.floor(T)),
                (C - Math.min(e.params.slidesPerGroupSkip, C)) %
                  e.params.slidesPerGroup ==
                  0 && m.push(T),
                h.push(T),
                (T = T + P + S)),
            (e.virtualSize += P + S),
            (M = P),
            (C += 1);
        }
      }
      if (
        ((e.virtualSize = Math.max(e.virtualSize, r) + w),
        n &&
          l &&
          ("slide" === s.effect || "coverflow" === s.effect) &&
          (i.style.width = `${e.virtualSize + S}px`),
        s.setWrapperSize &&
          (i.style[e.getDirectionLabel("width")] = `${e.virtualSize + S}px`),
        L && e.grid.updateWrapperSize(P, m),
        !s.centeredSlides)
      ) {
        const t = [];
        for (let i = 0; i < m.length; i += 1) {
          let a = m[i];
          s.roundLengths && (a = Math.floor(a)),
            m[i] <= e.virtualSize - r && t.push(a);
        }
        (m = t),
          Math.floor(e.virtualSize - r) - Math.floor(m[m.length - 1]) > 1 &&
            m.push(e.virtualSize - r);
      }
      if (o && s.loop) {
        const t = g[0] + S;
        if (s.slidesPerGroup > 1) {
          const i = Math.ceil(
              (e.virtual.slidesBefore + e.virtual.slidesAfter) /
                s.slidesPerGroup,
            ),
            a = t * s.slidesPerGroup;
          for (let e = 0; e < i; e += 1) m.push(m[m.length - 1] + a);
        }
        for (
          let i = 0;
          i < e.virtual.slidesBefore + e.virtual.slidesAfter;
          i += 1
        )
          1 === s.slidesPerGroup && m.push(m[m.length - 1] + t),
            h.push(h[h.length - 1] + t),
            (e.virtualSize += t);
      }
      if ((0 === m.length && (m = [0]), 0 !== S)) {
        const t =
          e.isHorizontal() && n
            ? "marginLeft"
            : e.getDirectionLabel("marginRight");
        c.filter(
          (e, t) => !(s.cssMode && !s.loop) || t !== c.length - 1,
        ).forEach((e) => {
          e.style[t] = `${S}px`;
        });
      }
      if (s.centeredSlides && s.centeredSlidesBounds) {
        let e = 0;
        g.forEach((t) => {
          e += t + (S || 0);
        }),
          (e -= S);
        const t = e > r ? e - r : 0;
        m = m.map((e) => (e <= 0 ? -v : e > t ? t + w : e));
      }
      if (s.centerInsufficientSlides) {
        let e = 0;
        g.forEach((t) => {
          e += t + (S || 0);
        }),
          (e -= S);
        const t = (s.slidesOffsetBefore || 0) + (s.slidesOffsetAfter || 0);
        if (e + t < r) {
          const s = (r - e - t) / 2;
          m.forEach((e, t) => {
            m[t] = e - s;
          }),
            h.forEach((e, t) => {
              h[t] = e + s;
            });
        }
      }
      if (
        (Object.assign(e, {
          slides: c,
          snapGrid: m,
          slidesGrid: h,
          slidesSizesGrid: g,
        }),
        s.centeredSlides && s.cssMode && !s.centeredSlidesBounds)
      ) {
        u(i, "--swiper-centered-offset-before", -m[0] + "px"),
          u(
            i,
            "--swiper-centered-offset-after",
            e.size / 2 - g[g.length - 1] / 2 + "px",
          );
        const t = -e.snapGrid[0],
          s = -e.slidesGrid[0];
        (e.snapGrid = e.snapGrid.map((e) => e + t)),
          (e.slidesGrid = e.slidesGrid.map((e) => e + s));
      }
      if (
        (p !== d && e.emit("slidesLengthChange"),
        m.length !== y &&
          (e.params.watchOverflow && e.checkOverflow(),
          e.emit("snapGridLengthChange")),
        h.length !== E && e.emit("slidesGridLengthChange"),
        s.watchSlidesProgress && e.updateSlidesOffset(),
        e.emit("slidesUpdated"),
        !(o || s.cssMode || ("slide" !== s.effect && "fade" !== s.effect)))
      ) {
        const t = `${s.containerModifierClass}backface-hidden`,
          i = e.el.classList.contains(t);
        p <= s.maxBackfaceHiddenSlides
          ? i || e.el.classList.add(t)
          : i && e.el.classList.remove(t);
      }
    },
    updateAutoHeight: function (e) {
      const t = this,
        s = [],
        i = t.virtual && t.params.virtual.enabled;
      let a,
        r = 0;
      "number" == typeof e
        ? t.setTransition(e)
        : !0 === e && t.setTransition(t.params.speed);
      const n = (e) => (i ? t.slides[t.getSlideIndexByData(e)] : t.slides[e]);
      if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
        if (t.params.centeredSlides)
          (t.visibleSlides || []).forEach((e) => {
            s.push(e);
          });
        else
          for (a = 0; a < Math.ceil(t.params.slidesPerView); a += 1) {
            const e = t.activeIndex + a;
            if (e > t.slides.length && !i) break;
            s.push(n(e));
          }
      else s.push(n(t.activeIndex));
      for (a = 0; a < s.length; a += 1)
        if (void 0 !== s[a]) {
          const e = s[a].offsetHeight;
          r = e > r ? e : r;
        }
      (r || 0 === r) && (t.wrapperEl.style.height = `${r}px`);
    },
    updateSlidesOffset: function () {
      const e = this,
        t = e.slides,
        s = e.isElement
          ? e.isHorizontal()
            ? e.wrapperEl.offsetLeft
            : e.wrapperEl.offsetTop
          : 0;
      for (let i = 0; i < t.length; i += 1)
        t[i].swiperSlideOffset =
          (e.isHorizontal() ? t[i].offsetLeft : t[i].offsetTop) -
          s -
          e.cssOverflowAdjustment();
    },
    updateSlidesProgress: function (e) {
      void 0 === e && (e = (this && this.translate) || 0);
      const t = this,
        s = t.params,
        { slides: i, rtlTranslate: a, snapGrid: r } = t;
      if (0 === i.length) return;
      void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
      let n = -e;
      a && (n = e), (t.visibleSlidesIndexes = []), (t.visibleSlides = []);
      let l = s.spaceBetween;
      "string" == typeof l && l.indexOf("%") >= 0
        ? (l = (parseFloat(l.replace("%", "")) / 100) * t.size)
        : "string" == typeof l && (l = parseFloat(l));
      for (let e = 0; e < i.length; e += 1) {
        const o = i[e];
        let d = o.swiperSlideOffset;
        s.cssMode && s.centeredSlides && (d -= i[0].swiperSlideOffset);
        const c =
            (n + (s.centeredSlides ? t.minTranslate() : 0) - d) /
            (o.swiperSlideSize + l),
          p =
            (n - r[0] + (s.centeredSlides ? t.minTranslate() : 0) - d) /
            (o.swiperSlideSize + l),
          u = -(n - d),
          m = u + t.slidesSizesGrid[e],
          h = u >= 0 && u <= t.size - t.slidesSizesGrid[e],
          f =
            (u >= 0 && u < t.size - 1) ||
            (m > 1 && m <= t.size) ||
            (u <= 0 && m >= t.size);
        f && (t.visibleSlides.push(o), t.visibleSlidesIndexes.push(e)),
          _(o, f, s.slideVisibleClass),
          _(o, h, s.slideFullyVisibleClass),
          (o.progress = a ? -c : c),
          (o.originalProgress = a ? -p : p);
      }
    },
    updateProgress: function (e) {
      const t = this;
      if (void 0 === e) {
        const s = t.rtlTranslate ? -1 : 1;
        e = (t && t.translate && t.translate * s) || 0;
      }
      const s = t.params,
        i = t.maxTranslate() - t.minTranslate();
      let { progress: a, isBeginning: r, isEnd: n, progressLoop: l } = t;
      const o = r,
        d = n;
      if (0 === i) (a = 0), (r = !0), (n = !0);
      else {
        a = (e - t.minTranslate()) / i;
        const s = Math.abs(e - t.minTranslate()) < 1,
          l = Math.abs(e - t.maxTranslate()) < 1;
        (r = s || a <= 0), (n = l || a >= 1), s && (a = 0), l && (a = 1);
      }
      if (s.loop) {
        const s = t.getSlideIndexByData(0),
          i = t.getSlideIndexByData(t.slides.length - 1),
          a = t.slidesGrid[s],
          r = t.slidesGrid[i],
          n = t.slidesGrid[t.slidesGrid.length - 1],
          o = Math.abs(e);
        (l = o >= a ? (o - a) / n : (o + n - r) / n), l > 1 && (l -= 1);
      }
      Object.assign(t, {
        progress: a,
        progressLoop: l,
        isBeginning: r,
        isEnd: n,
      }),
        (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) &&
          t.updateSlidesProgress(e),
        r && !o && t.emit("reachBeginning toEdge"),
        n && !d && t.emit("reachEnd toEdge"),
        ((o && !r) || (d && !n)) && t.emit("fromEdge"),
        t.emit("progress", a);
    },
    updateSlidesClasses: function () {
      const e = this,
        { slides: t, params: s, slidesEl: i, activeIndex: a } = e,
        r = e.virtual && s.virtual.enabled,
        n = e.grid && s.grid && s.grid.rows > 1,
        l = (e) => f(i, `.${s.slideClass}${e}, swiper-slide${e}`)[0];
      let o, d, c;
      if (r)
        if (s.loop) {
          let t = a - e.virtual.slidesBefore;
          t < 0 && (t = e.virtual.slides.length + t),
            t >= e.virtual.slides.length && (t -= e.virtual.slides.length),
            (o = l(`[data-swiper-slide-index="${t}"]`));
        } else o = l(`[data-swiper-slide-index="${a}"]`);
      else
        n
          ? ((o = t.find((e) => e.column === a)),
            (c = t.find((e) => e.column === a + 1)),
            (d = t.find((e) => e.column === a - 1)))
          : (o = t[a]);
      o &&
        (n ||
          ((c = (function (e, t) {
            const s = [];
            for (; e.nextElementSibling; ) {
              const i = e.nextElementSibling;
              t ? i.matches(t) && s.push(i) : s.push(i), (e = i);
            }
            return s;
          })(o, `.${s.slideClass}, swiper-slide`)[0]),
          s.loop && !c && (c = t[0]),
          (d = (function (e, t) {
            const s = [];
            for (; e.previousElementSibling; ) {
              const i = e.previousElementSibling;
              t ? i.matches(t) && s.push(i) : s.push(i), (e = i);
            }
            return s;
          })(o, `.${s.slideClass}, swiper-slide`)[0]),
          s.loop && 0 === !d && (d = t[t.length - 1]))),
        t.forEach((e) => {
          I(e, e === o, s.slideActiveClass),
            I(e, e === c, s.slideNextClass),
            I(e, e === d, s.slidePrevClass);
        }),
        e.emitSlidesClasses();
    },
    updateActiveIndex: function (e) {
      const t = this,
        s = t.rtlTranslate ? t.translate : -t.translate,
        {
          snapGrid: i,
          params: a,
          activeIndex: r,
          realIndex: n,
          snapIndex: l,
        } = t;
      let o,
        d = e;
      const c = (e) => {
        let s = e - t.virtual.slidesBefore;
        return (
          s < 0 && (s = t.virtual.slides.length + s),
          s >= t.virtual.slides.length && (s -= t.virtual.slides.length),
          s
        );
      };
      if (
        (void 0 === d &&
          (d = (function (e) {
            const { slidesGrid: t, params: s } = e,
              i = e.rtlTranslate ? e.translate : -e.translate;
            let a;
            for (let e = 0; e < t.length; e += 1)
              void 0 !== t[e + 1]
                ? i >= t[e] && i < t[e + 1] - (t[e + 1] - t[e]) / 2
                  ? (a = e)
                  : i >= t[e] && i < t[e + 1] && (a = e + 1)
                : i >= t[e] && (a = e);
            return (
              s.normalizeSlideIndex && (a < 0 || void 0 === a) && (a = 0), a
            );
          })(t)),
        i.indexOf(s) >= 0)
      )
        o = i.indexOf(s);
      else {
        const e = Math.min(a.slidesPerGroupSkip, d);
        o = e + Math.floor((d - e) / a.slidesPerGroup);
      }
      if ((o >= i.length && (o = i.length - 1), d === r && !t.params.loop))
        return void (o !== l && ((t.snapIndex = o), t.emit("snapIndexChange")));
      if (d === r && t.params.loop && t.virtual && t.params.virtual.enabled)
        return void (t.realIndex = c(d));
      const p = t.grid && a.grid && a.grid.rows > 1;
      let u;
      if (t.virtual && a.virtual.enabled && a.loop) u = c(d);
      else if (p) {
        const e = t.slides.find((e) => e.column === d);
        let s = parseInt(e.getAttribute("data-swiper-slide-index"), 10);
        Number.isNaN(s) && (s = Math.max(t.slides.indexOf(e), 0)),
          (u = Math.floor(s / a.grid.rows));
      } else if (t.slides[d]) {
        const e = t.slides[d].getAttribute("data-swiper-slide-index");
        u = e ? parseInt(e, 10) : d;
      } else u = d;
      Object.assign(t, {
        previousSnapIndex: l,
        snapIndex: o,
        previousRealIndex: n,
        realIndex: u,
        previousIndex: r,
        activeIndex: d,
      }),
        t.initialized && G(t),
        t.emit("activeIndexChange"),
        t.emit("snapIndexChange"),
        (t.initialized || t.params.runCallbacksOnInit) &&
          (n !== u && t.emit("realIndexChange"), t.emit("slideChange"));
    },
    updateClickedSlide: function (e, t) {
      const s = this,
        i = s.params;
      let a = e.closest(`.${i.slideClass}, swiper-slide`);
      !a &&
        s.isElement &&
        t &&
        t.length > 1 &&
        t.includes(e) &&
        [...t.slice(t.indexOf(e) + 1, t.length)].forEach((e) => {
          !a &&
            e.matches &&
            e.matches(`.${i.slideClass}, swiper-slide`) &&
            (a = e);
        });
      let r,
        n = !1;
      if (a)
        for (let e = 0; e < s.slides.length; e += 1)
          if (s.slides[e] === a) {
            (n = !0), (r = e);
            break;
          }
      if (!a || !n)
        return (s.clickedSlide = void 0), void (s.clickedIndex = void 0);
      (s.clickedSlide = a),
        s.virtual && s.params.virtual.enabled
          ? (s.clickedIndex = parseInt(
              a.getAttribute("data-swiper-slide-index"),
              10,
            ))
          : (s.clickedIndex = r),
        i.slideToClickedSlide &&
          void 0 !== s.clickedIndex &&
          s.clickedIndex !== s.activeIndex &&
          s.slideToClickedSlide();
    },
  };
  var q = {
    getTranslate: function (e) {
      void 0 === e && (e = this.isHorizontal() ? "x" : "y");
      const { params: t, rtlTranslate: s, translate: i, wrapperEl: a } = this;
      if (t.virtualTranslate) return s ? -i : i;
      if (t.cssMode) return i;
      let r = d(a, e);
      return (r += this.cssOverflowAdjustment()), s && (r = -r), r || 0;
    },
    setTranslate: function (e, t) {
      const s = this,
        { rtlTranslate: i, params: a, wrapperEl: r, progress: n } = s;
      let l,
        o = 0,
        d = 0;
      s.isHorizontal() ? (o = i ? -e : e) : (d = e),
        a.roundLengths && ((o = Math.floor(o)), (d = Math.floor(d))),
        (s.previousTranslate = s.translate),
        (s.translate = s.isHorizontal() ? o : d),
        a.cssMode
          ? (r[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal()
              ? -o
              : -d)
          : a.virtualTranslate ||
            (s.isHorizontal()
              ? (o -= s.cssOverflowAdjustment())
              : (d -= s.cssOverflowAdjustment()),
            (r.style.transform = `translate3d(${o}px, ${d}px, 0px)`));
      const c = s.maxTranslate() - s.minTranslate();
      (l = 0 === c ? 0 : (e - s.minTranslate()) / c),
        l !== n && s.updateProgress(e),
        s.emit("setTranslate", s.translate, t);
    },
    minTranslate: function () {
      return -this.snapGrid[0];
    },
    maxTranslate: function () {
      return -this.snapGrid[this.snapGrid.length - 1];
    },
    translateTo: function (e, t, s, i, a) {
      void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === s && (s = !0),
        void 0 === i && (i = !0);
      const r = this,
        { params: n, wrapperEl: l } = r;
      if (r.animating && n.preventInteractionOnTransition) return !1;
      const o = r.minTranslate(),
        d = r.maxTranslate();
      let c;
      if (
        ((c = i && e > o ? o : i && e < d ? d : e),
        r.updateProgress(c),
        n.cssMode)
      ) {
        const e = r.isHorizontal();
        if (0 === t) l[e ? "scrollLeft" : "scrollTop"] = -c;
        else {
          if (!r.support.smoothScroll)
            return (
              m({ swiper: r, targetPosition: -c, side: e ? "left" : "top" }), !0
            );
          l.scrollTo({ [e ? "left" : "top"]: -c, behavior: "smooth" });
        }
        return !0;
      }
      return (
        0 === t
          ? (r.setTransition(0),
            r.setTranslate(c),
            s &&
              (r.emit("beforeTransitionStart", t, a), r.emit("transitionEnd")))
          : (r.setTransition(t),
            r.setTranslate(c),
            s &&
              (r.emit("beforeTransitionStart", t, a),
              r.emit("transitionStart")),
            r.animating ||
              ((r.animating = !0),
              r.onTranslateToWrapperTransitionEnd ||
                (r.onTranslateToWrapperTransitionEnd = function (e) {
                  r &&
                    !r.destroyed &&
                    e.target === this &&
                    (r.wrapperEl.removeEventListener(
                      "transitionend",
                      r.onTranslateToWrapperTransitionEnd,
                    ),
                    (r.onTranslateToWrapperTransitionEnd = null),
                    delete r.onTranslateToWrapperTransitionEnd,
                    (r.animating = !1),
                    s && r.emit("transitionEnd"));
                }),
              r.wrapperEl.addEventListener(
                "transitionend",
                r.onTranslateToWrapperTransitionEnd,
              ))),
        !0
      );
    },
  };
  function B(e) {
    let { swiper: t, runCallbacks: s, direction: i, step: a } = e;
    const { activeIndex: r, previousIndex: n } = t;
    let l = i;
    if (
      (l || (l = r > n ? "next" : r < n ? "prev" : "reset"),
      t.emit(`transition${a}`),
      s && r !== n)
    ) {
      if ("reset" === l) return void t.emit(`slideResetTransition${a}`);
      t.emit(`slideChangeTransition${a}`),
        "next" === l
          ? t.emit(`slideNextTransition${a}`)
          : t.emit(`slidePrevTransition${a}`);
    }
  }
  var X = {
    slideTo: function (e, t, s, i, a) {
      void 0 === e && (e = 0),
        void 0 === s && (s = !0),
        "string" == typeof e && (e = parseInt(e, 10));
      const r = this;
      let n = e;
      n < 0 && (n = 0);
      const {
        params: l,
        snapGrid: o,
        slidesGrid: d,
        previousIndex: c,
        activeIndex: p,
        rtlTranslate: u,
        wrapperEl: h,
        enabled: f,
      } = r;
      if (
        (!f && !i && !a) ||
        r.destroyed ||
        (r.animating && l.preventInteractionOnTransition)
      )
        return !1;
      void 0 === t && (t = r.params.speed);
      const g = Math.min(r.params.slidesPerGroupSkip, n);
      let v = g + Math.floor((n - g) / r.params.slidesPerGroup);
      v >= o.length && (v = o.length - 1);
      const w = -o[v];
      if (l.normalizeSlideIndex)
        for (let e = 0; e < d.length; e += 1) {
          const t = -Math.floor(100 * w),
            s = Math.floor(100 * d[e]),
            i = Math.floor(100 * d[e + 1]);
          void 0 !== d[e + 1]
            ? t >= s && t < i - (i - s) / 2
              ? (n = e)
              : t >= s && t < i && (n = e + 1)
            : t >= s && (n = e);
        }
      if (r.initialized && n !== p) {
        if (
          !r.allowSlideNext &&
          (u
            ? w > r.translate && w > r.minTranslate()
            : w < r.translate && w < r.minTranslate())
        )
          return !1;
        if (
          !r.allowSlidePrev &&
          w > r.translate &&
          w > r.maxTranslate() &&
          (p || 0) !== n
        )
          return !1;
      }
      let b;
      n !== (c || 0) && s && r.emit("beforeSlideChangeStart"),
        r.updateProgress(w),
        (b = n > p ? "next" : n < p ? "prev" : "reset");
      const y = r.virtual && r.params.virtual.enabled;
      if (!(y && a) && ((u && -w === r.translate) || (!u && w === r.translate)))
        return (
          r.updateActiveIndex(n),
          l.autoHeight && r.updateAutoHeight(),
          r.updateSlidesClasses(),
          "slide" !== l.effect && r.setTranslate(w),
          "reset" !== b && (r.transitionStart(s, b), r.transitionEnd(s, b)),
          !1
        );
      if (l.cssMode) {
        const e = r.isHorizontal(),
          s = u ? w : -w;
        if (0 === t)
          y &&
            ((r.wrapperEl.style.scrollSnapType = "none"),
            (r._immediateVirtual = !0)),
            y && !r._cssModeVirtualInitialSet && r.params.initialSlide > 0
              ? ((r._cssModeVirtualInitialSet = !0),
                requestAnimationFrame(() => {
                  h[e ? "scrollLeft" : "scrollTop"] = s;
                }))
              : (h[e ? "scrollLeft" : "scrollTop"] = s),
            y &&
              requestAnimationFrame(() => {
                (r.wrapperEl.style.scrollSnapType = ""),
                  (r._immediateVirtual = !1);
              });
        else {
          if (!r.support.smoothScroll)
            return (
              m({ swiper: r, targetPosition: s, side: e ? "left" : "top" }), !0
            );
          h.scrollTo({ [e ? "left" : "top"]: s, behavior: "smooth" });
        }
        return !0;
      }
      const E = $().isSafari;
      return (
        y && !a && E && r.isElement && r.virtual.update(!1, !1, n),
        r.setTransition(t),
        r.setTranslate(w),
        r.updateActiveIndex(n),
        r.updateSlidesClasses(),
        r.emit("beforeTransitionStart", t, i),
        r.transitionStart(s, b),
        0 === t
          ? r.transitionEnd(s, b)
          : r.animating ||
            ((r.animating = !0),
            r.onSlideToWrapperTransitionEnd ||
              (r.onSlideToWrapperTransitionEnd = function (e) {
                r &&
                  !r.destroyed &&
                  e.target === this &&
                  (r.wrapperEl.removeEventListener(
                    "transitionend",
                    r.onSlideToWrapperTransitionEnd,
                  ),
                  (r.onSlideToWrapperTransitionEnd = null),
                  delete r.onSlideToWrapperTransitionEnd,
                  r.transitionEnd(s, b));
              }),
            r.wrapperEl.addEventListener(
              "transitionend",
              r.onSlideToWrapperTransitionEnd,
            )),
        !0
      );
    },
    slideToLoop: function (e, t, s, i) {
      if (
        (void 0 === e && (e = 0),
        void 0 === s && (s = !0),
        "string" == typeof e)
      ) {
        e = parseInt(e, 10);
      }
      const a = this;
      if (a.destroyed) return;
      void 0 === t && (t = a.params.speed);
      const r = a.grid && a.params.grid && a.params.grid.rows > 1;
      let n = e;
      if (a.params.loop)
        if (a.virtual && a.params.virtual.enabled) n += a.virtual.slidesBefore;
        else {
          let e;
          if (r) {
            const t = n * a.params.grid.rows;
            e = a.slides.find(
              (e) => 1 * e.getAttribute("data-swiper-slide-index") === t,
            ).column;
          } else e = a.getSlideIndexByData(n);
          const t = r
              ? Math.ceil(a.slides.length / a.params.grid.rows)
              : a.slides.length,
            { centeredSlides: s } = a.params;
          let l = a.params.slidesPerView;
          "auto" === l
            ? (l = a.slidesPerViewDynamic())
            : ((l = Math.ceil(parseFloat(a.params.slidesPerView, 10))),
              s && l % 2 == 0 && (l += 1));
          let o = t - e < l;
          if (
            (s && (o = o || e < Math.ceil(l / 2)),
            i && s && "auto" !== a.params.slidesPerView && !r && (o = !1),
            o)
          ) {
            const i = s
              ? e < a.activeIndex
                ? "prev"
                : "next"
              : e - a.activeIndex - 1 < a.params.slidesPerView
                ? "next"
                : "prev";
            a.loopFix({
              direction: i,
              slideTo: !0,
              activeSlideIndex: "next" === i ? e + 1 : e - t + 1,
              slideRealIndex: "next" === i ? a.realIndex : void 0,
            });
          }
          if (r) {
            const e = n * a.params.grid.rows;
            n = a.slides.find(
              (t) => 1 * t.getAttribute("data-swiper-slide-index") === e,
            ).column;
          } else n = a.getSlideIndexByData(n);
        }
      return (
        requestAnimationFrame(() => {
          a.slideTo(n, t, s, i);
        }),
        a
      );
    },
    slideNext: function (e, t, s) {
      void 0 === t && (t = !0);
      const i = this,
        { enabled: a, params: r, animating: n } = i;
      if (!a || i.destroyed) return i;
      void 0 === e && (e = i.params.speed);
      let l = r.slidesPerGroup;
      "auto" === r.slidesPerView &&
        1 === r.slidesPerGroup &&
        r.slidesPerGroupAuto &&
        (l = Math.max(i.slidesPerViewDynamic("current", !0), 1));
      const o = i.activeIndex < r.slidesPerGroupSkip ? 1 : l,
        d = i.virtual && r.virtual.enabled;
      if (r.loop) {
        if (n && !d && r.loopPreventsSliding) return !1;
        if (
          (i.loopFix({ direction: "next" }),
          (i._clientLeft = i.wrapperEl.clientLeft),
          i.activeIndex === i.slides.length - 1 && r.cssMode)
        )
          return (
            requestAnimationFrame(() => {
              i.slideTo(i.activeIndex + o, e, t, s);
            }),
            !0
          );
      }
      return r.rewind && i.isEnd
        ? i.slideTo(0, e, t, s)
        : i.slideTo(i.activeIndex + o, e, t, s);
    },
    slidePrev: function (e, t, s) {
      void 0 === t && (t = !0);
      const i = this,
        {
          params: a,
          snapGrid: r,
          slidesGrid: n,
          rtlTranslate: l,
          enabled: o,
          animating: d,
        } = i;
      if (!o || i.destroyed) return i;
      void 0 === e && (e = i.params.speed);
      const c = i.virtual && a.virtual.enabled;
      if (a.loop) {
        if (d && !c && a.loopPreventsSliding) return !1;
        i.loopFix({ direction: "prev" }),
          (i._clientLeft = i.wrapperEl.clientLeft);
      }
      function p(e) {
        return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
      }
      const u = p(l ? i.translate : -i.translate),
        m = r.map((e) => p(e)),
        h = a.freeMode && a.freeMode.enabled;
      let f = r[m.indexOf(u) - 1];
      if (void 0 === f && (a.cssMode || h)) {
        let e;
        r.forEach((t, s) => {
          u >= t && (e = s);
        }),
          void 0 !== e && (f = h ? r[e] : r[e > 0 ? e - 1 : e]);
      }
      let g = 0;
      if (
        (void 0 !== f &&
          ((g = n.indexOf(f)),
          g < 0 && (g = i.activeIndex - 1),
          "auto" === a.slidesPerView &&
            1 === a.slidesPerGroup &&
            a.slidesPerGroupAuto &&
            ((g = g - i.slidesPerViewDynamic("previous", !0) + 1),
            (g = Math.max(g, 0)))),
        a.rewind && i.isBeginning)
      ) {
        const a =
          i.params.virtual && i.params.virtual.enabled && i.virtual
            ? i.virtual.slides.length - 1
            : i.slides.length - 1;
        return i.slideTo(a, e, t, s);
      }
      return a.loop && 0 === i.activeIndex && a.cssMode
        ? (requestAnimationFrame(() => {
            i.slideTo(g, e, t, s);
          }),
          !0)
        : i.slideTo(g, e, t, s);
    },
    slideReset: function (e, t, s) {
      void 0 === t && (t = !0);
      const i = this;
      if (!i.destroyed)
        return (
          void 0 === e && (e = i.params.speed),
          i.slideTo(i.activeIndex, e, t, s)
        );
    },
    slideToClosest: function (e, t, s, i) {
      void 0 === t && (t = !0), void 0 === i && (i = 0.5);
      const a = this;
      if (a.destroyed) return;
      void 0 === e && (e = a.params.speed);
      let r = a.activeIndex;
      const n = Math.min(a.params.slidesPerGroupSkip, r),
        l = n + Math.floor((r - n) / a.params.slidesPerGroup),
        o = a.rtlTranslate ? a.translate : -a.translate;
      if (o >= a.snapGrid[l]) {
        const e = a.snapGrid[l];
        o - e > (a.snapGrid[l + 1] - e) * i && (r += a.params.slidesPerGroup);
      } else {
        const e = a.snapGrid[l - 1];
        o - e <= (a.snapGrid[l] - e) * i && (r -= a.params.slidesPerGroup);
      }
      return (
        (r = Math.max(r, 0)),
        (r = Math.min(r, a.slidesGrid.length - 1)),
        a.slideTo(r, e, t, s)
      );
    },
    slideToClickedSlide: function () {
      const e = this;
      if (e.destroyed) return;
      const { params: t, slidesEl: s } = e,
        i =
          "auto" === t.slidesPerView
            ? e.slidesPerViewDynamic()
            : t.slidesPerView;
      let a,
        r = e.clickedIndex;
      const n = e.isElement ? "swiper-slide" : `.${t.slideClass}`;
      if (t.loop) {
        if (e.animating) return;
        (a = parseInt(
          e.clickedSlide.getAttribute("data-swiper-slide-index"),
          10,
        )),
          t.centeredSlides
            ? r < e.loopedSlides - i / 2 ||
              r > e.slides.length - e.loopedSlides + i / 2
              ? (e.loopFix(),
                (r = e.getSlideIndex(
                  f(s, `${n}[data-swiper-slide-index="${a}"]`)[0],
                )),
                l(() => {
                  e.slideTo(r);
                }))
              : e.slideTo(r)
            : r > e.slides.length - i
              ? (e.loopFix(),
                (r = e.getSlideIndex(
                  f(s, `${n}[data-swiper-slide-index="${a}"]`)[0],
                )),
                l(() => {
                  e.slideTo(r);
                }))
              : e.slideTo(r);
      } else e.slideTo(r);
    },
  };
  var Y = {
    loopCreate: function (e, t) {
      const s = this,
        { params: i, slidesEl: a } = s;
      if (!i.loop || (s.virtual && s.params.virtual.enabled)) return;
      const r = () => {
          f(a, `.${i.slideClass}, swiper-slide`).forEach((e, t) => {
            e.setAttribute("data-swiper-slide-index", t);
          });
        },
        n = s.grid && i.grid && i.grid.rows > 1,
        l = i.slidesPerGroup * (n ? i.grid.rows : 1),
        o = s.slides.length % l != 0,
        d = n && s.slides.length % i.grid.rows != 0,
        c = (e) => {
          for (let t = 0; t < e; t += 1) {
            const e = s.isElement
              ? v("swiper-slide", [i.slideBlankClass])
              : v("div", [i.slideClass, i.slideBlankClass]);
            s.slidesEl.append(e);
          }
        };
      if (o) {
        if (i.loopAddBlankSlides) {
          c(l - (s.slides.length % l)), s.recalcSlides(), s.updateSlides();
        } else
          g(
            "Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)",
          );
        r();
      } else if (d) {
        if (i.loopAddBlankSlides) {
          c(i.grid.rows - (s.slides.length % i.grid.rows)),
            s.recalcSlides(),
            s.updateSlides();
        } else
          g(
            "Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)",
          );
        r();
      } else r();
      s.loopFix({
        slideRealIndex: e,
        direction: i.centeredSlides ? void 0 : "next",
        initial: t,
      });
    },
    loopFix: function (e) {
      let {
        slideRealIndex: t,
        slideTo: s = !0,
        direction: i,
        setTranslate: a,
        activeSlideIndex: r,
        initial: n,
        byController: l,
        byMousewheel: o,
      } = void 0 === e ? {} : e;
      const d = this;
      if (!d.params.loop) return;
      d.emit("beforeLoopFix");
      const {
          slides: c,
          allowSlidePrev: p,
          allowSlideNext: u,
          slidesEl: m,
          params: h,
        } = d,
        { centeredSlides: f, initialSlide: v } = h;
      if (
        ((d.allowSlidePrev = !0),
        (d.allowSlideNext = !0),
        d.virtual && h.virtual.enabled)
      )
        return (
          s &&
            (h.centeredSlides || 0 !== d.snapIndex
              ? h.centeredSlides && d.snapIndex < h.slidesPerView
                ? d.slideTo(d.virtual.slides.length + d.snapIndex, 0, !1, !0)
                : d.snapIndex === d.snapGrid.length - 1 &&
                  d.slideTo(d.virtual.slidesBefore, 0, !1, !0)
              : d.slideTo(d.virtual.slides.length, 0, !1, !0)),
          (d.allowSlidePrev = p),
          (d.allowSlideNext = u),
          void d.emit("loopFix")
        );
      let w = h.slidesPerView;
      "auto" === w
        ? (w = d.slidesPerViewDynamic())
        : ((w = Math.ceil(parseFloat(h.slidesPerView, 10))),
          f && w % 2 == 0 && (w += 1));
      const b = h.slidesPerGroupAuto ? w : h.slidesPerGroup;
      let y = b;
      y % b != 0 && (y += b - (y % b)),
        (y += h.loopAdditionalSlides),
        (d.loopedSlides = y);
      const E = d.grid && h.grid && h.grid.rows > 1;
      c.length < w + y || ("cards" === d.params.effect && c.length < w + 2 * y)
        ? g(
            "Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled or not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters",
          )
        : E &&
          "row" === h.grid.fill &&
          g(
            "Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`",
          );
      const S = [],
        x = [],
        T = E ? Math.ceil(c.length / h.grid.rows) : c.length,
        M = n && T - v < w && !f;
      let C = M ? v : d.activeIndex;
      void 0 === r
        ? (r = d.getSlideIndex(
            c.find((e) => e.classList.contains(h.slideActiveClass)),
          ))
        : (C = r);
      const L = "next" === i || !i,
        P = "prev" === i || !i;
      let O = 0,
        A = 0;
      const $ = (E ? c[r].column : r) + (f && void 0 === a ? -w / 2 + 0.5 : 0);
      if ($ < y) {
        O = Math.max(y - $, b);
        for (let e = 0; e < y - $; e += 1) {
          const t = e - Math.floor(e / T) * T;
          if (E) {
            const e = T - t - 1;
            for (let t = c.length - 1; t >= 0; t -= 1)
              c[t].column === e && S.push(t);
          } else S.push(T - t - 1);
        }
      } else if ($ + w > T - y) {
        (A = Math.max($ - (T - 2 * y), b)),
          M && (A = Math.max(A, w - T + v + 1));
        for (let e = 0; e < A; e += 1) {
          const t = e - Math.floor(e / T) * T;
          E
            ? c.forEach((e, s) => {
                e.column === t && x.push(s);
              })
            : x.push(t);
        }
      }
      if (
        ((d.__preventObserver__ = !0),
        requestAnimationFrame(() => {
          d.__preventObserver__ = !1;
        }),
        "cards" === d.params.effect &&
          c.length < w + 2 * y &&
          (x.includes(r) && x.splice(x.indexOf(r), 1),
          S.includes(r) && S.splice(S.indexOf(r), 1)),
        P &&
          S.forEach((e) => {
            (c[e].swiperLoopMoveDOM = !0),
              m.prepend(c[e]),
              (c[e].swiperLoopMoveDOM = !1);
          }),
        L &&
          x.forEach((e) => {
            (c[e].swiperLoopMoveDOM = !0),
              m.append(c[e]),
              (c[e].swiperLoopMoveDOM = !1);
          }),
        d.recalcSlides(),
        "auto" === h.slidesPerView
          ? d.updateSlides()
          : E &&
            ((S.length > 0 && P) || (x.length > 0 && L)) &&
            d.slides.forEach((e, t) => {
              d.grid.updateSlide(t, e, d.slides);
            }),
        h.watchSlidesProgress && d.updateSlidesOffset(),
        s)
      )
        if (S.length > 0 && P) {
          if (void 0 === t) {
            const e = d.slidesGrid[C],
              t = d.slidesGrid[C + O] - e;
            o
              ? d.setTranslate(d.translate - t)
              : (d.slideTo(C + Math.ceil(O), 0, !1, !0),
                a &&
                  ((d.touchEventsData.startTranslate =
                    d.touchEventsData.startTranslate - t),
                  (d.touchEventsData.currentTranslate =
                    d.touchEventsData.currentTranslate - t)));
          } else if (a) {
            const e = E ? S.length / h.grid.rows : S.length;
            d.slideTo(d.activeIndex + e, 0, !1, !0),
              (d.touchEventsData.currentTranslate = d.translate);
          }
        } else if (x.length > 0 && L)
          if (void 0 === t) {
            const e = d.slidesGrid[C],
              t = d.slidesGrid[C - A] - e;
            o
              ? d.setTranslate(d.translate - t)
              : (d.slideTo(C - A, 0, !1, !0),
                a &&
                  ((d.touchEventsData.startTranslate =
                    d.touchEventsData.startTranslate - t),
                  (d.touchEventsData.currentTranslate =
                    d.touchEventsData.currentTranslate - t)));
          } else {
            const e = E ? x.length / h.grid.rows : x.length;
            d.slideTo(d.activeIndex - e, 0, !1, !0);
          }
      if (
        ((d.allowSlidePrev = p),
        (d.allowSlideNext = u),
        d.controller && d.controller.control && !l)
      ) {
        const e = {
          slideRealIndex: t,
          direction: i,
          setTranslate: a,
          activeSlideIndex: r,
          byController: !0,
        };
        Array.isArray(d.controller.control)
          ? d.controller.control.forEach((t) => {
              !t.destroyed &&
                t.params.loop &&
                t.loopFix({
                  ...e,
                  slideTo: t.params.slidesPerView === h.slidesPerView && s,
                });
            })
          : d.controller.control instanceof d.constructor &&
            d.controller.control.params.loop &&
            d.controller.control.loopFix({
              ...e,
              slideTo:
                d.controller.control.params.slidesPerView === h.slidesPerView &&
                s,
            });
      }
      d.emit("loopFix");
    },
    loopDestroy: function () {
      const e = this,
        { params: t, slidesEl: s } = e;
      if (!t.loop || !s || (e.virtual && e.params.virtual.enabled)) return;
      e.recalcSlides();
      const i = [];
      e.slides.forEach((e) => {
        const t =
          void 0 === e.swiperSlideIndex
            ? 1 * e.getAttribute("data-swiper-slide-index")
            : e.swiperSlideIndex;
        i[t] = e;
      }),
        e.slides.forEach((e) => {
          e.removeAttribute("data-swiper-slide-index");
        }),
        i.forEach((e) => {
          s.append(e);
        }),
        e.recalcSlides(),
        e.slideTo(e.realIndex, 0);
    },
  };
  function N(e, t, s) {
    const i = r(),
      { params: a } = e,
      n = a.edgeSwipeDetection,
      l = a.edgeSwipeThreshold;
    return (
      !n ||
      !(s <= l || s >= i.innerWidth - l) ||
      ("prevent" === n && (t.preventDefault(), !0))
    );
  }
  function R(e) {
    const t = this,
      s = i();
    let a = e;
    a.originalEvent && (a = a.originalEvent);
    const n = t.touchEventsData;
    if ("pointerdown" === a.type) {
      if (null !== n.pointerId && n.pointerId !== a.pointerId) return;
      n.pointerId = a.pointerId;
    } else
      "touchstart" === a.type &&
        1 === a.targetTouches.length &&
        (n.touchId = a.targetTouches[0].identifier);
    if ("touchstart" === a.type) return void N(t, a, a.targetTouches[0].pageX);
    const { params: l, touches: d, enabled: c } = t;
    if (!c) return;
    if (!l.simulateTouch && "mouse" === a.pointerType) return;
    if (t.animating && l.preventInteractionOnTransition) return;
    !t.animating && l.cssMode && l.loop && t.loopFix();
    let p = a.target;
    if (
      "wrapper" === l.touchEventsTarget &&
      !(function (e, t) {
        const s = r();
        let i = t.contains(e);
        !i &&
          s.HTMLSlotElement &&
          t instanceof HTMLSlotElement &&
          ((i = [...t.assignedElements()].includes(e)),
          i ||
            (i = (function (e, t) {
              const s = [t];
              for (; s.length > 0; ) {
                const t = s.shift();
                if (e === t) return !0;
                s.push(
                  ...t.children,
                  ...(t.shadowRoot ? t.shadowRoot.children : []),
                  ...(t.assignedElements ? t.assignedElements() : []),
                );
              }
            })(e, t)));
        return i;
      })(p, t.wrapperEl)
    )
      return;
    if ("which" in a && 3 === a.which) return;
    if ("button" in a && a.button > 0) return;
    if (n.isTouched && n.isMoved) return;
    const u = !!l.noSwipingClass && "" !== l.noSwipingClass,
      m = a.composedPath ? a.composedPath() : a.path;
    u && a.target && a.target.shadowRoot && m && (p = m[0]);
    const h = l.noSwipingSelector
        ? l.noSwipingSelector
        : `.${l.noSwipingClass}`,
      f = !(!a.target || !a.target.shadowRoot);
    if (
      l.noSwiping &&
      (f
        ? (function (e, t) {
            return (
              void 0 === t && (t = this),
              (function t(s) {
                if (!s || s === i() || s === r()) return null;
                s.assignedSlot && (s = s.assignedSlot);
                const a = s.closest(e);
                return a || s.getRootNode ? a || t(s.getRootNode().host) : null;
              })(t)
            );
          })(h, p)
        : p.closest(h))
    )
      return void (t.allowClick = !0);
    if (l.swipeHandler && !p.closest(l.swipeHandler)) return;
    (d.currentX = a.pageX), (d.currentY = a.pageY);
    const g = d.currentX,
      v = d.currentY;
    if (!N(t, a, g)) return;
    Object.assign(n, {
      isTouched: !0,
      isMoved: !1,
      allowTouchCallbacks: !0,
      isScrolling: void 0,
      startMoving: void 0,
    }),
      (d.startX = g),
      (d.startY = v),
      (n.touchStartTime = o()),
      (t.allowClick = !0),
      t.updateSize(),
      (t.swipeDirection = void 0),
      l.threshold > 0 && (n.allowThresholdMove = !1);
    let w = !0;
    p.matches(n.focusableElements) &&
      ((w = !1), "SELECT" === p.nodeName && (n.isTouched = !1)),
      s.activeElement &&
        s.activeElement.matches(n.focusableElements) &&
        s.activeElement !== p &&
        ("mouse" === a.pointerType ||
          ("mouse" !== a.pointerType && !p.matches(n.focusableElements))) &&
        s.activeElement.blur();
    const b = w && t.allowTouchMove && l.touchStartPreventDefault;
    (!l.touchStartForcePreventDefault && !b) ||
      p.isContentEditable ||
      a.preventDefault(),
      l.freeMode &&
        l.freeMode.enabled &&
        t.freeMode &&
        t.animating &&
        !l.cssMode &&
        t.freeMode.onTouchStart(),
      t.emit("touchStart", a);
  }
  function F(e) {
    const t = i(),
      s = this,
      a = s.touchEventsData,
      { params: r, touches: n, rtlTranslate: l, enabled: d } = s;
    if (!d) return;
    if (!r.simulateTouch && "mouse" === e.pointerType) return;
    let c,
      p = e;
    if ((p.originalEvent && (p = p.originalEvent), "pointermove" === p.type)) {
      if (null !== a.touchId) return;
      if (p.pointerId !== a.pointerId) return;
    }
    if ("touchmove" === p.type) {
      if (
        ((c = [...p.changedTouches].find((e) => e.identifier === a.touchId)),
        !c || c.identifier !== a.touchId)
      )
        return;
    } else c = p;
    if (!a.isTouched)
      return void (
        a.startMoving &&
        a.isScrolling &&
        s.emit("touchMoveOpposite", p)
      );
    const u = c.pageX,
      m = c.pageY;
    if (p.preventedByNestedSwiper) return (n.startX = u), void (n.startY = m);
    if (!s.allowTouchMove)
      return (
        p.target.matches(a.focusableElements) || (s.allowClick = !1),
        void (
          a.isTouched &&
          (Object.assign(n, { startX: u, startY: m, currentX: u, currentY: m }),
          (a.touchStartTime = o()))
        )
      );
    if (r.touchReleaseOnEdges && !r.loop)
      if (s.isVertical()) {
        if (
          (m < n.startY && s.translate <= s.maxTranslate()) ||
          (m > n.startY && s.translate >= s.minTranslate())
        )
          return (a.isTouched = !1), void (a.isMoved = !1);
      } else {
        if (
          l &&
          ((u > n.startX && -s.translate <= s.maxTranslate()) ||
            (u < n.startX && -s.translate >= s.minTranslate()))
        )
          return;
        if (
          !l &&
          ((u < n.startX && s.translate <= s.maxTranslate()) ||
            (u > n.startX && s.translate >= s.minTranslate()))
        )
          return;
      }
    if (
      (t.activeElement &&
        t.activeElement.matches(a.focusableElements) &&
        t.activeElement !== p.target &&
        "mouse" !== p.pointerType &&
        t.activeElement.blur(),
      t.activeElement &&
        p.target === t.activeElement &&
        p.target.matches(a.focusableElements))
    )
      return (a.isMoved = !0), void (s.allowClick = !1);
    a.allowTouchCallbacks && s.emit("touchMove", p),
      (n.previousX = n.currentX),
      (n.previousY = n.currentY),
      (n.currentX = u),
      (n.currentY = m);
    const h = n.currentX - n.startX,
      f = n.currentY - n.startY;
    if (s.params.threshold && Math.sqrt(h ** 2 + f ** 2) < s.params.threshold)
      return;
    if (void 0 === a.isScrolling) {
      let e;
      (s.isHorizontal() && n.currentY === n.startY) ||
      (s.isVertical() && n.currentX === n.startX)
        ? (a.isScrolling = !1)
        : h * h + f * f >= 25 &&
          ((e = (180 * Math.atan2(Math.abs(f), Math.abs(h))) / Math.PI),
          (a.isScrolling = s.isHorizontal()
            ? e > r.touchAngle
            : 90 - e > r.touchAngle));
    }
    if (
      (a.isScrolling && s.emit("touchMoveOpposite", p),
      void 0 === a.startMoving &&
        ((n.currentX === n.startX && n.currentY === n.startY) ||
          (a.startMoving = !0)),
      a.isScrolling ||
        ("touchmove" === p.type && a.preventTouchMoveFromPointerMove))
    )
      return void (a.isTouched = !1);
    if (!a.startMoving) return;
    (s.allowClick = !1),
      !r.cssMode && p.cancelable && p.preventDefault(),
      r.touchMoveStopPropagation && !r.nested && p.stopPropagation();
    let g = s.isHorizontal() ? h : f,
      v = s.isHorizontal()
        ? n.currentX - n.previousX
        : n.currentY - n.previousY;
    r.oneWayMovement &&
      ((g = Math.abs(g) * (l ? 1 : -1)), (v = Math.abs(v) * (l ? 1 : -1))),
      (n.diff = g),
      (g *= r.touchRatio),
      l && ((g = -g), (v = -v));
    const w = s.touchesDirection;
    (s.swipeDirection = g > 0 ? "prev" : "next"),
      (s.touchesDirection = v > 0 ? "prev" : "next");
    const b = s.params.loop && !r.cssMode,
      y =
        ("next" === s.touchesDirection && s.allowSlideNext) ||
        ("prev" === s.touchesDirection && s.allowSlidePrev);
    if (!a.isMoved) {
      if (
        (b && y && s.loopFix({ direction: s.swipeDirection }),
        (a.startTranslate = s.getTranslate()),
        s.setTransition(0),
        s.animating)
      ) {
        const e = new window.CustomEvent("transitionend", {
          bubbles: !0,
          cancelable: !0,
          detail: { bySwiperTouchMove: !0 },
        });
        s.wrapperEl.dispatchEvent(e);
      }
      (a.allowMomentumBounce = !1),
        !r.grabCursor ||
          (!0 !== s.allowSlideNext && !0 !== s.allowSlidePrev) ||
          s.setGrabCursor(!0),
        s.emit("sliderFirstMove", p);
    }
    if (
      (new Date().getTime(),
      !1 !== r._loopSwapReset &&
        a.isMoved &&
        a.allowThresholdMove &&
        w !== s.touchesDirection &&
        b &&
        y &&
        Math.abs(g) >= 1)
    )
      return (
        Object.assign(n, {
          startX: u,
          startY: m,
          currentX: u,
          currentY: m,
          startTranslate: a.currentTranslate,
        }),
        (a.loopSwapReset = !0),
        void (a.startTranslate = a.currentTranslate)
      );
    s.emit("sliderMove", p),
      (a.isMoved = !0),
      (a.currentTranslate = g + a.startTranslate);
    let E = !0,
      S = r.resistanceRatio;
    if (
      (r.touchReleaseOnEdges && (S = 0),
      g > 0
        ? (b &&
            y &&
            a.allowThresholdMove &&
            a.currentTranslate >
              (r.centeredSlides
                ? s.minTranslate() -
                  s.slidesSizesGrid[s.activeIndex + 1] -
                  ("auto" !== r.slidesPerView &&
                  s.slides.length - r.slidesPerView >= 2
                    ? s.slidesSizesGrid[s.activeIndex + 1] +
                      s.params.spaceBetween
                    : 0) -
                  s.params.spaceBetween
                : s.minTranslate()) &&
            s.loopFix({
              direction: "prev",
              setTranslate: !0,
              activeSlideIndex: 0,
            }),
          a.currentTranslate > s.minTranslate() &&
            ((E = !1),
            r.resistance &&
              (a.currentTranslate =
                s.minTranslate() -
                1 +
                (-s.minTranslate() + a.startTranslate + g) ** S)))
        : g < 0 &&
          (b &&
            y &&
            a.allowThresholdMove &&
            a.currentTranslate <
              (r.centeredSlides
                ? s.maxTranslate() +
                  s.slidesSizesGrid[s.slidesSizesGrid.length - 1] +
                  s.params.spaceBetween +
                  ("auto" !== r.slidesPerView &&
                  s.slides.length - r.slidesPerView >= 2
                    ? s.slidesSizesGrid[s.slidesSizesGrid.length - 1] +
                      s.params.spaceBetween
                    : 0)
                : s.maxTranslate()) &&
            s.loopFix({
              direction: "next",
              setTranslate: !0,
              activeSlideIndex:
                s.slides.length -
                ("auto" === r.slidesPerView
                  ? s.slidesPerViewDynamic()
                  : Math.ceil(parseFloat(r.slidesPerView, 10))),
            }),
          a.currentTranslate < s.maxTranslate() &&
            ((E = !1),
            r.resistance &&
              (a.currentTranslate =
                s.maxTranslate() +
                1 -
                (s.maxTranslate() - a.startTranslate - g) ** S))),
      E && (p.preventedByNestedSwiper = !0),
      !s.allowSlideNext &&
        "next" === s.swipeDirection &&
        a.currentTranslate < a.startTranslate &&
        (a.currentTranslate = a.startTranslate),
      !s.allowSlidePrev &&
        "prev" === s.swipeDirection &&
        a.currentTranslate > a.startTranslate &&
        (a.currentTranslate = a.startTranslate),
      s.allowSlidePrev ||
        s.allowSlideNext ||
        (a.currentTranslate = a.startTranslate),
      r.threshold > 0)
    ) {
      if (!(Math.abs(g) > r.threshold || a.allowThresholdMove))
        return void (a.currentTranslate = a.startTranslate);
      if (!a.allowThresholdMove)
        return (
          (a.allowThresholdMove = !0),
          (n.startX = n.currentX),
          (n.startY = n.currentY),
          (a.currentTranslate = a.startTranslate),
          void (n.diff = s.isHorizontal()
            ? n.currentX - n.startX
            : n.currentY - n.startY)
        );
    }
    r.followFinger &&
      !r.cssMode &&
      (((r.freeMode && r.freeMode.enabled && s.freeMode) ||
        r.watchSlidesProgress) &&
        (s.updateActiveIndex(), s.updateSlidesClasses()),
      r.freeMode &&
        r.freeMode.enabled &&
        s.freeMode &&
        s.freeMode.onTouchMove(),
      s.updateProgress(a.currentTranslate),
      s.setTranslate(a.currentTranslate));
  }
  function V(e) {
    const t = this,
      s = t.touchEventsData;
    let i,
      a = e;
    a.originalEvent && (a = a.originalEvent);
    if ("touchend" === a.type || "touchcancel" === a.type) {
      if (
        ((i = [...a.changedTouches].find((e) => e.identifier === s.touchId)),
        !i || i.identifier !== s.touchId)
      )
        return;
    } else {
      if (null !== s.touchId) return;
      if (a.pointerId !== s.pointerId) return;
      i = a;
    }
    if (
      ["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(
        a.type,
      )
    ) {
      if (
        !(
          ["pointercancel", "contextmenu"].includes(a.type) &&
          (t.browser.isSafari || t.browser.isWebView)
        )
      )
        return;
    }
    (s.pointerId = null), (s.touchId = null);
    const {
      params: r,
      touches: n,
      rtlTranslate: d,
      slidesGrid: c,
      enabled: p,
    } = t;
    if (!p) return;
    if (!r.simulateTouch && "mouse" === a.pointerType) return;
    if (
      (s.allowTouchCallbacks && t.emit("touchEnd", a),
      (s.allowTouchCallbacks = !1),
      !s.isTouched)
    )
      return (
        s.isMoved && r.grabCursor && t.setGrabCursor(!1),
        (s.isMoved = !1),
        void (s.startMoving = !1)
      );
    r.grabCursor &&
      s.isMoved &&
      s.isTouched &&
      (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
      t.setGrabCursor(!1);
    const u = o(),
      m = u - s.touchStartTime;
    if (t.allowClick) {
      const e = a.path || (a.composedPath && a.composedPath());
      t.updateClickedSlide((e && e[0]) || a.target, e),
        t.emit("tap click", a),
        m < 300 &&
          u - s.lastClickTime < 300 &&
          t.emit("doubleTap doubleClick", a);
    }
    if (
      ((s.lastClickTime = o()),
      l(() => {
        t.destroyed || (t.allowClick = !0);
      }),
      !s.isTouched ||
        !s.isMoved ||
        !t.swipeDirection ||
        (0 === n.diff && !s.loopSwapReset) ||
        (s.currentTranslate === s.startTranslate && !s.loopSwapReset))
    )
      return (s.isTouched = !1), (s.isMoved = !1), void (s.startMoving = !1);
    let h;
    if (
      ((s.isTouched = !1),
      (s.isMoved = !1),
      (s.startMoving = !1),
      (h = r.followFinger
        ? d
          ? t.translate
          : -t.translate
        : -s.currentTranslate),
      r.cssMode)
    )
      return;
    if (r.freeMode && r.freeMode.enabled)
      return void t.freeMode.onTouchEnd({ currentPos: h });
    const f = h >= -t.maxTranslate() && !t.params.loop;
    let g = 0,
      v = t.slidesSizesGrid[0];
    for (
      let e = 0;
      e < c.length;
      e += e < r.slidesPerGroupSkip ? 1 : r.slidesPerGroup
    ) {
      const t = e < r.slidesPerGroupSkip - 1 ? 1 : r.slidesPerGroup;
      void 0 !== c[e + t]
        ? (f || (h >= c[e] && h < c[e + t])) && ((g = e), (v = c[e + t] - c[e]))
        : (f || h >= c[e]) &&
          ((g = e), (v = c[c.length - 1] - c[c.length - 2]));
    }
    let w = null,
      b = null;
    r.rewind &&
      (t.isBeginning
        ? (b =
            r.virtual && r.virtual.enabled && t.virtual
              ? t.virtual.slides.length - 1
              : t.slides.length - 1)
        : t.isEnd && (w = 0));
    const y = (h - c[g]) / v,
      E = g < r.slidesPerGroupSkip - 1 ? 1 : r.slidesPerGroup;
    if (m > r.longSwipesMs) {
      if (!r.longSwipes) return void t.slideTo(t.activeIndex);
      "next" === t.swipeDirection &&
        (y >= r.longSwipesRatio
          ? t.slideTo(r.rewind && t.isEnd ? w : g + E)
          : t.slideTo(g)),
        "prev" === t.swipeDirection &&
          (y > 1 - r.longSwipesRatio
            ? t.slideTo(g + E)
            : null !== b && y < 0 && Math.abs(y) > r.longSwipesRatio
              ? t.slideTo(b)
              : t.slideTo(g));
    } else {
      if (!r.shortSwipes) return void t.slideTo(t.activeIndex);
      t.navigation &&
      (a.target === t.navigation.nextEl || a.target === t.navigation.prevEl)
        ? a.target === t.navigation.nextEl
          ? t.slideTo(g + E)
          : t.slideTo(g)
        : ("next" === t.swipeDirection && t.slideTo(null !== w ? w : g + E),
          "prev" === t.swipeDirection && t.slideTo(null !== b ? b : g));
    }
  }
  function W() {
    const e = this,
      { params: t, el: s } = e;
    if (s && 0 === s.offsetWidth) return;
    t.breakpoints && e.setBreakpoint();
    const { allowSlideNext: i, allowSlidePrev: a, snapGrid: r } = e,
      n = e.virtual && e.params.virtual.enabled;
    (e.allowSlideNext = !0),
      (e.allowSlidePrev = !0),
      e.updateSize(),
      e.updateSlides(),
      e.updateSlidesClasses();
    const l = n && t.loop;
    !("auto" === t.slidesPerView || t.slidesPerView > 1) ||
    !e.isEnd ||
    e.isBeginning ||
    e.params.centeredSlides ||
    l
      ? e.params.loop && !n
        ? e.slideToLoop(e.realIndex, 0, !1, !0)
        : e.slideTo(e.activeIndex, 0, !1, !0)
      : e.slideTo(e.slides.length - 1, 0, !1, !0),
      e.autoplay &&
        e.autoplay.running &&
        e.autoplay.paused &&
        (clearTimeout(e.autoplay.resizeTimeout),
        (e.autoplay.resizeTimeout = setTimeout(() => {
          e.autoplay &&
            e.autoplay.running &&
            e.autoplay.paused &&
            e.autoplay.resume();
        }, 500))),
      (e.allowSlidePrev = a),
      (e.allowSlideNext = i),
      e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow();
  }
  function j(e) {
    const t = this;
    t.enabled &&
      (t.allowClick ||
        (t.params.preventClicks && e.preventDefault(),
        t.params.preventClicksPropagation &&
          t.animating &&
          (e.stopPropagation(), e.stopImmediatePropagation())));
  }
  function U() {
    const e = this,
      { wrapperEl: t, rtlTranslate: s, enabled: i } = e;
    if (!i) return;
    let a;
    (e.previousTranslate = e.translate),
      e.isHorizontal()
        ? (e.translate = -t.scrollLeft)
        : (e.translate = -t.scrollTop),
      0 === e.translate && (e.translate = 0),
      e.updateActiveIndex(),
      e.updateSlidesClasses();
    const r = e.maxTranslate() - e.minTranslate();
    (a = 0 === r ? 0 : (e.translate - e.minTranslate()) / r),
      a !== e.progress && e.updateProgress(s ? -e.translate : e.translate),
      e.emit("setTranslate", e.translate, !1);
  }
  function K(e) {
    const t = this;
    z(t, e.target),
      t.params.cssMode ||
        ("auto" !== t.params.slidesPerView && !t.params.autoHeight) ||
        t.update();
  }
  function Z() {
    const e = this;
    e.documentTouchHandlerProceeded ||
      ((e.documentTouchHandlerProceeded = !0),
      e.params.touchReleaseOnEdges && (e.el.style.touchAction = "auto"));
  }
  const Q = (e, t) => {
    const s = i(),
      { params: a, el: r, wrapperEl: n, device: l } = e,
      o = !!a.nested,
      d = "on" === t ? "addEventListener" : "removeEventListener",
      c = t;
    r &&
      "string" != typeof r &&
      (s[d]("touchstart", e.onDocumentTouchStart, { passive: !1, capture: o }),
      r[d]("touchstart", e.onTouchStart, { passive: !1 }),
      r[d]("pointerdown", e.onTouchStart, { passive: !1 }),
      s[d]("touchmove", e.onTouchMove, { passive: !1, capture: o }),
      s[d]("pointermove", e.onTouchMove, { passive: !1, capture: o }),
      s[d]("touchend", e.onTouchEnd, { passive: !0 }),
      s[d]("pointerup", e.onTouchEnd, { passive: !0 }),
      s[d]("pointercancel", e.onTouchEnd, { passive: !0 }),
      s[d]("touchcancel", e.onTouchEnd, { passive: !0 }),
      s[d]("pointerout", e.onTouchEnd, { passive: !0 }),
      s[d]("pointerleave", e.onTouchEnd, { passive: !0 }),
      s[d]("contextmenu", e.onTouchEnd, { passive: !0 }),
      (a.preventClicks || a.preventClicksPropagation) &&
        r[d]("click", e.onClick, !0),
      a.cssMode && n[d]("scroll", e.onScroll),
      a.updateOnWindowResize
        ? e[c](
            l.ios || l.android
              ? "resize orientationchange observerUpdate"
              : "resize observerUpdate",
            W,
            !0,
          )
        : e[c]("observerUpdate", W, !0),
      r[d]("load", e.onLoad, { capture: !0 }));
  };
  const J = (e, t) => e.grid && t.grid && t.grid.rows > 1;
  var ee = {
    init: !0,
    direction: "horizontal",
    oneWayMovement: !1,
    swiperElementNodeName: "SWIPER-CONTAINER",
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    eventsPrefix: "swiper",
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 5,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: 0.85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    loop: !1,
    loopAddBlankSlides: !0,
    loopAdditionalSlides: 0,
    loopPreventsSliding: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideBlankClass: "swiper-slide-blank",
    slideActiveClass: "swiper-slide-active",
    slideVisibleClass: "swiper-slide-visible",
    slideFullyVisibleClass: "swiper-slide-fully-visible",
    slideNextClass: "swiper-slide-next",
    slidePrevClass: "swiper-slide-prev",
    wrapperClass: "swiper-wrapper",
    lazyPreloaderClass: "swiper-lazy-preloader",
    lazyPreloadPrevNext: 0,
    runCallbacksOnInit: !0,
    _emitClasses: !1,
  };
  function te(e, t) {
    return function (s) {
      void 0 === s && (s = {});
      const i = Object.keys(s)[0],
        a = s[i];
      "object" == typeof a && null !== a
        ? (!0 === e[i] && (e[i] = { enabled: !0 }),
          "navigation" === i &&
            e[i] &&
            e[i].enabled &&
            !e[i].prevEl &&
            !e[i].nextEl &&
            (e[i].auto = !0),
          ["pagination", "scrollbar"].indexOf(i) >= 0 &&
            e[i] &&
            e[i].enabled &&
            !e[i].el &&
            (e[i].auto = !0),
          i in e && "enabled" in a
            ? ("object" != typeof e[i] ||
                "enabled" in e[i] ||
                (e[i].enabled = !0),
              e[i] || (e[i] = { enabled: !1 }),
              p(t, s))
            : p(t, s))
        : p(t, s);
    };
  }
  const se = {
      eventsEmitter: k,
      update: H,
      translate: q,
      transition: {
        setTransition: function (e, t) {
          const s = this;
          s.params.cssMode ||
            ((s.wrapperEl.style.transitionDuration = `${e}ms`),
            (s.wrapperEl.style.transitionDelay = 0 === e ? "0ms" : "")),
            s.emit("setTransition", e, t);
        },
        transitionStart: function (e, t) {
          void 0 === e && (e = !0);
          const s = this,
            { params: i } = s;
          i.cssMode ||
            (i.autoHeight && s.updateAutoHeight(),
            B({ swiper: s, runCallbacks: e, direction: t, step: "Start" }));
        },
        transitionEnd: function (e, t) {
          void 0 === e && (e = !0);
          const s = this,
            { params: i } = s;
          (s.animating = !1),
            i.cssMode ||
              (s.setTransition(0),
              B({ swiper: s, runCallbacks: e, direction: t, step: "End" }));
        },
      },
      slide: X,
      loop: Y,
      grabCursor: {
        setGrabCursor: function (e) {
          const t = this;
          if (
            !t.params.simulateTouch ||
            (t.params.watchOverflow && t.isLocked) ||
            t.params.cssMode
          )
            return;
          const s =
            "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
          t.isElement && (t.__preventObserver__ = !0),
            (s.style.cursor = "move"),
            (s.style.cursor = e ? "grabbing" : "grab"),
            t.isElement &&
              requestAnimationFrame(() => {
                t.__preventObserver__ = !1;
              });
        },
        unsetGrabCursor: function () {
          const e = this;
          (e.params.watchOverflow && e.isLocked) ||
            e.params.cssMode ||
            (e.isElement && (e.__preventObserver__ = !0),
            (e[
              "container" === e.params.touchEventsTarget ? "el" : "wrapperEl"
            ].style.cursor = ""),
            e.isElement &&
              requestAnimationFrame(() => {
                e.__preventObserver__ = !1;
              }));
        },
      },
      events: {
        attachEvents: function () {
          const e = this,
            { params: t } = e;
          (e.onTouchStart = R.bind(e)),
            (e.onTouchMove = F.bind(e)),
            (e.onTouchEnd = V.bind(e)),
            (e.onDocumentTouchStart = Z.bind(e)),
            t.cssMode && (e.onScroll = U.bind(e)),
            (e.onClick = j.bind(e)),
            (e.onLoad = K.bind(e)),
            Q(e, "on");
        },
        detachEvents: function () {
          Q(this, "off");
        },
      },
      breakpoints: {
        setBreakpoint: function () {
          const e = this,
            { realIndex: t, initialized: s, params: a, el: r } = e,
            n = a.breakpoints;
          if (!n || (n && 0 === Object.keys(n).length)) return;
          const l = i(),
            o =
              "window" !== a.breakpointsBase && a.breakpointsBase
                ? "container"
                : a.breakpointsBase,
            d =
              ["window", "container"].includes(a.breakpointsBase) ||
              !a.breakpointsBase
                ? e.el
                : l.querySelector(a.breakpointsBase),
            c = e.getBreakpoint(n, o, d);
          if (!c || e.currentBreakpoint === c) return;
          const u = (c in n ? n[c] : void 0) || e.originalParams,
            m = J(e, a),
            h = J(e, u),
            f = e.params.grabCursor,
            g = u.grabCursor,
            v = a.enabled;
          m && !h
            ? (r.classList.remove(
                `${a.containerModifierClass}grid`,
                `${a.containerModifierClass}grid-column`,
              ),
              e.emitContainerClasses())
            : !m &&
              h &&
              (r.classList.add(`${a.containerModifierClass}grid`),
              ((u.grid.fill && "column" === u.grid.fill) ||
                (!u.grid.fill && "column" === a.grid.fill)) &&
                r.classList.add(`${a.containerModifierClass}grid-column`),
              e.emitContainerClasses()),
            f && !g ? e.unsetGrabCursor() : !f && g && e.setGrabCursor(),
            ["navigation", "pagination", "scrollbar"].forEach((t) => {
              if (void 0 === u[t]) return;
              const s = a[t] && a[t].enabled,
                i = u[t] && u[t].enabled;
              s && !i && e[t].disable(), !s && i && e[t].enable();
            });
          const w = u.direction && u.direction !== a.direction,
            b = a.loop && (u.slidesPerView !== a.slidesPerView || w),
            y = a.loop;
          w && s && e.changeDirection(), p(e.params, u);
          const E = e.params.enabled,
            S = e.params.loop;
          Object.assign(e, {
            allowTouchMove: e.params.allowTouchMove,
            allowSlideNext: e.params.allowSlideNext,
            allowSlidePrev: e.params.allowSlidePrev,
          }),
            v && !E ? e.disable() : !v && E && e.enable(),
            (e.currentBreakpoint = c),
            e.emit("_beforeBreakpoint", u),
            s &&
              (b
                ? (e.loopDestroy(), e.loopCreate(t), e.updateSlides())
                : !y && S
                  ? (e.loopCreate(t), e.updateSlides())
                  : y && !S && e.loopDestroy()),
            e.emit("breakpoint", u);
        },
        getBreakpoint: function (e, t, s) {
          if ((void 0 === t && (t = "window"), !e || ("container" === t && !s)))
            return;
          let i = !1;
          const a = r(),
            n = "window" === t ? a.innerHeight : s.clientHeight,
            l = Object.keys(e).map((e) => {
              if ("string" == typeof e && 0 === e.indexOf("@")) {
                const t = parseFloat(e.substr(1));
                return { value: n * t, point: e };
              }
              return { value: e, point: e };
            });
          l.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
          for (let e = 0; e < l.length; e += 1) {
            const { point: r, value: n } = l[e];
            "window" === t
              ? a.matchMedia(`(min-width: ${n}px)`).matches && (i = r)
              : n <= s.clientWidth && (i = r);
          }
          return i || "max";
        },
      },
      checkOverflow: {
        checkOverflow: function () {
          const e = this,
            { isLocked: t, params: s } = e,
            { slidesOffsetBefore: i } = s;
          if (i) {
            const t = e.slides.length - 1,
              s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * i;
            e.isLocked = e.size > s;
          } else e.isLocked = 1 === e.snapGrid.length;
          !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked),
            !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
            t && t !== e.isLocked && (e.isEnd = !1),
            t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
        },
      },
      classes: {
        addClasses: function () {
          const e = this,
            { classNames: t, params: s, rtl: i, el: a, device: r } = e,
            n = (function (e, t) {
              const s = [];
              return (
                e.forEach((e) => {
                  "object" == typeof e
                    ? Object.keys(e).forEach((i) => {
                        e[i] && s.push(t + i);
                      })
                    : "string" == typeof e && s.push(t + e);
                }),
                s
              );
            })(
              [
                "initialized",
                s.direction,
                { "free-mode": e.params.freeMode && s.freeMode.enabled },
                { autoheight: s.autoHeight },
                { rtl: i },
                { grid: s.grid && s.grid.rows > 1 },
                {
                  "grid-column":
                    s.grid && s.grid.rows > 1 && "column" === s.grid.fill,
                },
                { android: r.android },
                { ios: r.ios },
                { "css-mode": s.cssMode },
                { centered: s.cssMode && s.centeredSlides },
                { "watch-progress": s.watchSlidesProgress },
              ],
              s.containerModifierClass,
            );
          t.push(...n), a.classList.add(...t), e.emitContainerClasses();
        },
        removeClasses: function () {
          const { el: e, classNames: t } = this;
          e &&
            "string" != typeof e &&
            (e.classList.remove(...t), this.emitContainerClasses());
        },
      },
    },
    ie = {};
  class ae {
    constructor() {
      let e, t;
      for (var s = arguments.length, a = new Array(s), r = 0; r < s; r++)
        a[r] = arguments[r];
      1 === a.length &&
      a[0].constructor &&
      "Object" === Object.prototype.toString.call(a[0]).slice(8, -1)
        ? (t = a[0])
        : ([e, t] = a),
        t || (t = {}),
        (t = p({}, t)),
        e && !t.el && (t.el = e);
      const n = i();
      if (
        t.el &&
        "string" == typeof t.el &&
        n.querySelectorAll(t.el).length > 1
      ) {
        const e = [];
        return (
          n.querySelectorAll(t.el).forEach((s) => {
            const i = p({}, t, { el: s });
            e.push(new ae(i));
          }),
          e
        );
      }
      const l = this;
      (l.__swiper__ = !0),
        (l.support = O()),
        (l.device = A({ userAgent: t.userAgent })),
        (l.browser = $()),
        (l.eventsListeners = {}),
        (l.eventsAnyListeners = []),
        (l.modules = [...l.__modules__]),
        t.modules && Array.isArray(t.modules) && l.modules.push(...t.modules);
      const o = {};
      l.modules.forEach((e) => {
        e({
          params: t,
          swiper: l,
          extendParams: te(t, o),
          on: l.on.bind(l),
          once: l.once.bind(l),
          off: l.off.bind(l),
          emit: l.emit.bind(l),
        });
      });
      const d = p({}, ee, o);
      return (
        (l.params = p({}, d, ie, t)),
        (l.originalParams = p({}, l.params)),
        (l.passedParams = p({}, t)),
        l.params &&
          l.params.on &&
          Object.keys(l.params.on).forEach((e) => {
            l.on(e, l.params.on[e]);
          }),
        l.params && l.params.onAny && l.onAny(l.params.onAny),
        Object.assign(l, {
          enabled: l.params.enabled,
          el: e,
          classNames: [],
          slides: [],
          slidesGrid: [],
          snapGrid: [],
          slidesSizesGrid: [],
          isHorizontal: () => "horizontal" === l.params.direction,
          isVertical: () => "vertical" === l.params.direction,
          activeIndex: 0,
          realIndex: 0,
          isBeginning: !0,
          isEnd: !1,
          translate: 0,
          previousTranslate: 0,
          progress: 0,
          velocity: 0,
          animating: !1,
          cssOverflowAdjustment() {
            return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
          },
          allowSlideNext: l.params.allowSlideNext,
          allowSlidePrev: l.params.allowSlidePrev,
          touchEventsData: {
            isTouched: void 0,
            isMoved: void 0,
            allowTouchCallbacks: void 0,
            touchStartTime: void 0,
            isScrolling: void 0,
            currentTranslate: void 0,
            startTranslate: void 0,
            allowThresholdMove: void 0,
            focusableElements: l.params.focusableElements,
            lastClickTime: 0,
            clickTimeout: void 0,
            velocities: [],
            allowMomentumBounce: void 0,
            startMoving: void 0,
            pointerId: null,
            touchId: null,
          },
          allowClick: !0,
          allowTouchMove: l.params.allowTouchMove,
          touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
          imagesToLoad: [],
          imagesLoaded: 0,
        }),
        l.emit("_swiper"),
        l.params.init && l.init(),
        l
      );
    }
    getDirectionLabel(e) {
      return this.isHorizontal()
        ? e
        : {
            width: "height",
            "margin-top": "margin-left",
            "margin-bottom ": "margin-right",
            "margin-left": "margin-top",
            "margin-right": "margin-bottom",
            "padding-left": "padding-top",
            "padding-right": "padding-bottom",
            marginRight: "marginBottom",
          }[e];
    }
    getSlideIndex(e) {
      const { slidesEl: t, params: s } = this,
        i = y(f(t, `.${s.slideClass}, swiper-slide`)[0]);
      return y(e) - i;
    }
    getSlideIndexByData(e) {
      return this.getSlideIndex(
        this.slides.find(
          (t) => 1 * t.getAttribute("data-swiper-slide-index") === e,
        ),
      );
    }
    recalcSlides() {
      const { slidesEl: e, params: t } = this;
      this.slides = f(e, `.${t.slideClass}, swiper-slide`);
    }
    enable() {
      const e = this;
      e.enabled ||
        ((e.enabled = !0),
        e.params.grabCursor && e.setGrabCursor(),
        e.emit("enable"));
    }
    disable() {
      const e = this;
      e.enabled &&
        ((e.enabled = !1),
        e.params.grabCursor && e.unsetGrabCursor(),
        e.emit("disable"));
    }
    setProgress(e, t) {
      const s = this;
      e = Math.min(Math.max(e, 0), 1);
      const i = s.minTranslate(),
        a = (s.maxTranslate() - i) * e + i;
      s.translateTo(a, void 0 === t ? 0 : t),
        s.updateActiveIndex(),
        s.updateSlidesClasses();
    }
    emitContainerClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = e.el.className
        .split(" ")
        .filter(
          (t) =>
            0 === t.indexOf("swiper") ||
            0 === t.indexOf(e.params.containerModifierClass),
        );
      e.emit("_containerClasses", t.join(" "));
    }
    getSlideClasses(e) {
      const t = this;
      return t.destroyed
        ? ""
        : e.className
            .split(" ")
            .filter(
              (e) =>
                0 === e.indexOf("swiper-slide") ||
                0 === e.indexOf(t.params.slideClass),
            )
            .join(" ");
    }
    emitSlidesClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = [];
      e.slides.forEach((s) => {
        const i = e.getSlideClasses(s);
        t.push({ slideEl: s, classNames: i }), e.emit("_slideClass", s, i);
      }),
        e.emit("_slideClasses", t);
    }
    slidesPerViewDynamic(e, t) {
      void 0 === e && (e = "current"), void 0 === t && (t = !1);
      const {
        params: s,
        slides: i,
        slidesGrid: a,
        slidesSizesGrid: r,
        size: n,
        activeIndex: l,
      } = this;
      let o = 1;
      if ("number" == typeof s.slidesPerView) return s.slidesPerView;
      if (s.centeredSlides) {
        let e,
          t = i[l] ? Math.ceil(i[l].swiperSlideSize) : 0;
        for (let s = l + 1; s < i.length; s += 1)
          i[s] &&
            !e &&
            ((t += Math.ceil(i[s].swiperSlideSize)),
            (o += 1),
            t > n && (e = !0));
        for (let s = l - 1; s >= 0; s -= 1)
          i[s] &&
            !e &&
            ((t += i[s].swiperSlideSize), (o += 1), t > n && (e = !0));
      } else if ("current" === e)
        for (let e = l + 1; e < i.length; e += 1) {
          (t ? a[e] + r[e] - a[l] < n : a[e] - a[l] < n) && (o += 1);
        }
      else
        for (let e = l - 1; e >= 0; e -= 1) {
          a[l] - a[e] < n && (o += 1);
        }
      return o;
    }
    update() {
      const e = this;
      if (!e || e.destroyed) return;
      const { snapGrid: t, params: s } = e;
      function i() {
        const t = e.rtlTranslate ? -1 * e.translate : e.translate,
          s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
        e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses();
      }
      let a;
      if (
        (s.breakpoints && e.setBreakpoint(),
        [...e.el.querySelectorAll('[loading="lazy"]')].forEach((t) => {
          t.complete && z(e, t);
        }),
        e.updateSize(),
        e.updateSlides(),
        e.updateProgress(),
        e.updateSlidesClasses(),
        s.freeMode && s.freeMode.enabled && !s.cssMode)
      )
        i(), s.autoHeight && e.updateAutoHeight();
      else {
        if (
          ("auto" === s.slidesPerView || s.slidesPerView > 1) &&
          e.isEnd &&
          !s.centeredSlides
        ) {
          const t =
            e.virtual && s.virtual.enabled ? e.virtual.slides : e.slides;
          a = e.slideTo(t.length - 1, 0, !1, !0);
        } else a = e.slideTo(e.activeIndex, 0, !1, !0);
        a || i();
      }
      s.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
        e.emit("update");
    }
    changeDirection(e, t) {
      void 0 === t && (t = !0);
      const s = this,
        i = s.params.direction;
      return (
        e || (e = "horizontal" === i ? "vertical" : "horizontal"),
        e === i ||
          ("horizontal" !== e && "vertical" !== e) ||
          (s.el.classList.remove(`${s.params.containerModifierClass}${i}`),
          s.el.classList.add(`${s.params.containerModifierClass}${e}`),
          s.emitContainerClasses(),
          (s.params.direction = e),
          s.slides.forEach((t) => {
            "vertical" === e ? (t.style.width = "") : (t.style.height = "");
          }),
          s.emit("changeDirection"),
          t && s.update()),
        s
      );
    }
    changeLanguageDirection(e) {
      const t = this;
      (t.rtl && "rtl" === e) ||
        (!t.rtl && "ltr" === e) ||
        ((t.rtl = "rtl" === e),
        (t.rtlTranslate = "horizontal" === t.params.direction && t.rtl),
        t.rtl
          ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`),
            (t.el.dir = "rtl"))
          : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`),
            (t.el.dir = "ltr")),
        t.update());
    }
    mount(e) {
      const t = this;
      if (t.mounted) return !0;
      let s = e || t.params.el;
      if (("string" == typeof s && (s = document.querySelector(s)), !s))
        return !1;
      (s.swiper = t),
        s.parentNode &&
          s.parentNode.host &&
          s.parentNode.host.nodeName ===
            t.params.swiperElementNodeName.toUpperCase() &&
          (t.isElement = !0);
      const i = () =>
        `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
      let a = (() => {
        if (s && s.shadowRoot && s.shadowRoot.querySelector) {
          return s.shadowRoot.querySelector(i());
        }
        return f(s, i())[0];
      })();
      return (
        !a &&
          t.params.createElements &&
          ((a = v("div", t.params.wrapperClass)),
          s.append(a),
          f(s, `.${t.params.slideClass}`).forEach((e) => {
            a.append(e);
          })),
        Object.assign(t, {
          el: s,
          wrapperEl: a,
          slidesEl:
            t.isElement && !s.parentNode.host.slideSlots
              ? s.parentNode.host
              : a,
          hostEl: t.isElement ? s.parentNode.host : s,
          mounted: !0,
          rtl: "rtl" === s.dir.toLowerCase() || "rtl" === b(s, "direction"),
          rtlTranslate:
            "horizontal" === t.params.direction &&
            ("rtl" === s.dir.toLowerCase() || "rtl" === b(s, "direction")),
          wrongRTL: "-webkit-box" === b(a, "display"),
        }),
        !0
      );
    }
    init(e) {
      const t = this;
      if (t.initialized) return t;
      if (!1 === t.mount(e)) return t;
      t.emit("beforeInit"),
        t.params.breakpoints && t.setBreakpoint(),
        t.addClasses(),
        t.updateSize(),
        t.updateSlides(),
        t.params.watchOverflow && t.checkOverflow(),
        t.params.grabCursor && t.enabled && t.setGrabCursor(),
        t.params.loop && t.virtual && t.params.virtual.enabled
          ? t.slideTo(
              t.params.initialSlide + t.virtual.slidesBefore,
              0,
              t.params.runCallbacksOnInit,
              !1,
              !0,
            )
          : t.slideTo(
              t.params.initialSlide,
              0,
              t.params.runCallbacksOnInit,
              !1,
              !0,
            ),
        t.params.loop && t.loopCreate(void 0, !0),
        t.attachEvents();
      const s = [...t.el.querySelectorAll('[loading="lazy"]')];
      return (
        t.isElement && s.push(...t.hostEl.querySelectorAll('[loading="lazy"]')),
        s.forEach((e) => {
          e.complete
            ? z(t, e)
            : e.addEventListener("load", (e) => {
                z(t, e.target);
              });
        }),
        G(t),
        (t.initialized = !0),
        G(t),
        t.emit("init"),
        t.emit("afterInit"),
        t
      );
    }
    destroy(e, t) {
      void 0 === e && (e = !0), void 0 === t && (t = !0);
      const s = this,
        { params: i, el: a, wrapperEl: r, slides: n } = s;
      return (
        void 0 === s.params ||
          s.destroyed ||
          (s.emit("beforeDestroy"),
          (s.initialized = !1),
          s.detachEvents(),
          i.loop && s.loopDestroy(),
          t &&
            (s.removeClasses(),
            a && "string" != typeof a && a.removeAttribute("style"),
            r && r.removeAttribute("style"),
            n &&
              n.length &&
              n.forEach((e) => {
                e.classList.remove(
                  i.slideVisibleClass,
                  i.slideFullyVisibleClass,
                  i.slideActiveClass,
                  i.slideNextClass,
                  i.slidePrevClass,
                ),
                  e.removeAttribute("style"),
                  e.removeAttribute("data-swiper-slide-index");
              })),
          s.emit("destroy"),
          Object.keys(s.eventsListeners).forEach((e) => {
            s.off(e);
          }),
          !1 !== e &&
            (s.el && "string" != typeof s.el && (s.el.swiper = null),
            (function (e) {
              const t = e;
              Object.keys(t).forEach((e) => {
                try {
                  t[e] = null;
                } catch (e) {}
                try {
                  delete t[e];
                } catch (e) {}
              });
            })(s)),
          (s.destroyed = !0)),
        null
      );
    }
    static extendDefaults(e) {
      p(ie, e);
    }
    static get extendedDefaults() {
      return ie;
    }
    static get defaults() {
      return ee;
    }
    static installModule(e) {
      ae.prototype.__modules__ || (ae.prototype.__modules__ = []);
      const t = ae.prototype.__modules__;
      "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
    }
    static use(e) {
      return Array.isArray(e)
        ? (e.forEach((e) => ae.installModule(e)), ae)
        : (ae.installModule(e), ae);
    }
  }
  function re(e, t, s, i) {
    return (
      e.params.createElements &&
        Object.keys(i).forEach((a) => {
          if (!s[a] && !0 === s.auto) {
            let r = f(e.el, `.${i[a]}`)[0];
            r || ((r = v("div", i[a])), (r.className = i[a]), e.el.append(r)),
              (s[a] = r),
              (t[a] = r);
          }
        }),
      s
    );
  }
  function ne(e) {
    return (
      void 0 === e && (e = ""),
      `.${e
        .trim()
        .replace(/([\.:!+\/])/g, "\\$1")
        .replace(/ /g, ".")}`
    );
  }
  function le(e) {
    const t = this,
      { params: s, slidesEl: i } = t;
    s.loop && t.loopDestroy();
    const a = (e) => {
      if ("string" == typeof e) {
        const t = document.createElement("div");
        (t.innerHTML = e), i.append(t.children[0]), (t.innerHTML = "");
      } else i.append(e);
    };
    if ("object" == typeof e && "length" in e)
      for (let t = 0; t < e.length; t += 1) e[t] && a(e[t]);
    else a(e);
    t.recalcSlides(),
      s.loop && t.loopCreate(),
      (s.observer && !t.isElement) || t.update();
  }
  function oe(e) {
    const t = this,
      { params: s, activeIndex: i, slidesEl: a } = t;
    s.loop && t.loopDestroy();
    let r = i + 1;
    const n = (e) => {
      if ("string" == typeof e) {
        const t = document.createElement("div");
        (t.innerHTML = e), a.prepend(t.children[0]), (t.innerHTML = "");
      } else a.prepend(e);
    };
    if ("object" == typeof e && "length" in e) {
      for (let t = 0; t < e.length; t += 1) e[t] && n(e[t]);
      r = i + e.length;
    } else n(e);
    t.recalcSlides(),
      s.loop && t.loopCreate(),
      (s.observer && !t.isElement) || t.update(),
      t.slideTo(r, 0, !1);
  }
  function de(e, t) {
    const s = this,
      { params: i, activeIndex: a, slidesEl: r } = s;
    let n = a;
    i.loop && ((n -= s.loopedSlides), s.loopDestroy(), s.recalcSlides());
    const l = s.slides.length;
    if (e <= 0) return void s.prependSlide(t);
    if (e >= l) return void s.appendSlide(t);
    let o = n > e ? n + 1 : n;
    const d = [];
    for (let t = l - 1; t >= e; t -= 1) {
      const e = s.slides[t];
      e.remove(), d.unshift(e);
    }
    if ("object" == typeof t && "length" in t) {
      for (let e = 0; e < t.length; e += 1) t[e] && r.append(t[e]);
      o = n > e ? n + t.length : n;
    } else r.append(t);
    for (let e = 0; e < d.length; e += 1) r.append(d[e]);
    s.recalcSlides(),
      i.loop && s.loopCreate(),
      (i.observer && !s.isElement) || s.update(),
      i.loop ? s.slideTo(o + s.loopedSlides, 0, !1) : s.slideTo(o, 0, !1);
  }
  function ce(e) {
    const t = this,
      { params: s, activeIndex: i } = t;
    let a = i;
    s.loop && ((a -= t.loopedSlides), t.loopDestroy());
    let r,
      n = a;
    if ("object" == typeof e && "length" in e) {
      for (let s = 0; s < e.length; s += 1)
        (r = e[s]), t.slides[r] && t.slides[r].remove(), r < n && (n -= 1);
      n = Math.max(n, 0);
    } else
      (r = e),
        t.slides[r] && t.slides[r].remove(),
        r < n && (n -= 1),
        (n = Math.max(n, 0));
    t.recalcSlides(),
      s.loop && t.loopCreate(),
      (s.observer && !t.isElement) || t.update(),
      s.loop ? t.slideTo(n + t.loopedSlides, 0, !1) : t.slideTo(n, 0, !1);
  }
  function pe() {
    const e = this,
      t = [];
    for (let s = 0; s < e.slides.length; s += 1) t.push(s);
    e.removeSlide(t);
  }
  function ue(e) {
    const {
      effect: t,
      swiper: s,
      on: i,
      setTranslate: a,
      setTransition: r,
      overwriteParams: n,
      perspective: l,
      recreateShadows: o,
      getEffectParams: d,
    } = e;
    let c;
    i("beforeInit", () => {
      if (s.params.effect !== t) return;
      s.classNames.push(`${s.params.containerModifierClass}${t}`),
        l && l() && s.classNames.push(`${s.params.containerModifierClass}3d`);
      const e = n ? n() : {};
      Object.assign(s.params, e), Object.assign(s.originalParams, e);
    }),
      i("setTranslate", () => {
        s.params.effect === t && a();
      }),
      i("setTransition", (e, i) => {
        s.params.effect === t && r(i);
      }),
      i("transitionEnd", () => {
        if (s.params.effect === t && o) {
          if (!d || !d().slideShadows) return;
          s.slides.forEach((e) => {
            e.querySelectorAll(
              ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left",
            ).forEach((e) => e.remove());
          }),
            o();
        }
      }),
      i("virtualUpdate", () => {
        s.params.effect === t &&
          (s.slides.length || (c = !0),
          requestAnimationFrame(() => {
            c && s.slides && s.slides.length && (a(), (c = !1));
          }));
      });
  }
  function me(e, t) {
    const s = h(t);
    return (
      s !== t &&
        ((s.style.backfaceVisibility = "hidden"),
        (s.style["-webkit-backface-visibility"] = "hidden")),
      s
    );
  }
  function he(e) {
    let { swiper: t, duration: s, transformElements: i, allSlides: a } = e;
    const { activeIndex: r } = t;
    if (t.params.virtualTranslate && 0 !== s) {
      let e,
        s = !1;
      (e = a
        ? i
        : i.filter((e) => {
            const s = e.classList.contains("swiper-slide-transform")
              ? ((e) => {
                  if (!e.parentElement)
                    return t.slides.find(
                      (t) => t.shadowRoot && t.shadowRoot === e.parentNode,
                    );
                  return e.parentElement;
                })(e)
              : e;
            return t.getSlideIndex(s) === r;
          })),
        e.forEach((e) => {
          S(e, () => {
            if (s) return;
            if (!t || t.destroyed) return;
            (s = !0), (t.animating = !1);
            const e = new window.CustomEvent("transitionend", {
              bubbles: !0,
              cancelable: !0,
            });
            t.wrapperEl.dispatchEvent(e);
          });
        });
    }
  }
  function fe(e, t, s) {
    const i = `swiper-slide-shadow${s ? `-${s}` : ""}${e ? ` swiper-slide-shadow-${e}` : ""}`,
      a = h(t);
    let r = a.querySelector(`.${i.split(" ").join(".")}`);
    return r || ((r = v("div", i.split(" "))), a.append(r)), r;
  }
  Object.keys(se).forEach((e) => {
    Object.keys(se[e]).forEach((t) => {
      ae.prototype[t] = se[e][t];
    });
  }),
    ae.use([
      function (e) {
        let { swiper: t, on: s, emit: i } = e;
        const a = r();
        let n = null,
          l = null;
        const o = () => {
            t &&
              !t.destroyed &&
              t.initialized &&
              (i("beforeResize"), i("resize"));
          },
          d = () => {
            t && !t.destroyed && t.initialized && i("orientationchange");
          };
        s("init", () => {
          t.params.resizeObserver && void 0 !== a.ResizeObserver
            ? t &&
              !t.destroyed &&
              t.initialized &&
              ((n = new ResizeObserver((e) => {
                l = a.requestAnimationFrame(() => {
                  const { width: s, height: i } = t;
                  let a = s,
                    r = i;
                  e.forEach((e) => {
                    let { contentBoxSize: s, contentRect: i, target: n } = e;
                    (n && n !== t.el) ||
                      ((a = i ? i.width : (s[0] || s).inlineSize),
                      (r = i ? i.height : (s[0] || s).blockSize));
                  }),
                    (a === s && r === i) || o();
                });
              })),
              n.observe(t.el))
            : (a.addEventListener("resize", o),
              a.addEventListener("orientationchange", d));
        }),
          s("destroy", () => {
            l && a.cancelAnimationFrame(l),
              n && n.unobserve && t.el && (n.unobserve(t.el), (n = null)),
              a.removeEventListener("resize", o),
              a.removeEventListener("orientationchange", d);
          });
      },
      function (e) {
        let { swiper: t, extendParams: s, on: i, emit: a } = e;
        const n = [],
          l = r(),
          o = function (e, s) {
            void 0 === s && (s = {});
            const i = new (l.MutationObserver || l.WebkitMutationObserver)(
              (e) => {
                if (t.__preventObserver__) return;
                if (1 === e.length) return void a("observerUpdate", e[0]);
                const s = function () {
                  a("observerUpdate", e[0]);
                };
                l.requestAnimationFrame
                  ? l.requestAnimationFrame(s)
                  : l.setTimeout(s, 0);
              },
            );
            i.observe(e, {
              attributes: void 0 === s.attributes || s.attributes,
              childList: t.isElement || (void 0 === s.childList || s).childList,
              characterData: void 0 === s.characterData || s.characterData,
            }),
              n.push(i);
          };
        s({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
          i("init", () => {
            if (t.params.observer) {
              if (t.params.observeParents) {
                const e = E(t.hostEl);
                for (let t = 0; t < e.length; t += 1) o(e[t]);
              }
              o(t.hostEl, { childList: t.params.observeSlideChildren }),
                o(t.wrapperEl, { attributes: !1 });
            }
          }),
          i("destroy", () => {
            n.forEach((e) => {
              e.disconnect();
            }),
              n.splice(0, n.length);
          });
      },
    ]);
  const ge = [
    function (e) {
      let t,
        { swiper: s, extendParams: a, on: r, emit: n } = e;
      a({
        virtual: {
          enabled: !1,
          slides: [],
          cache: !0,
          renderSlide: null,
          renderExternal: null,
          renderExternalUpdate: !0,
          addSlidesBefore: 0,
          addSlidesAfter: 0,
        },
      });
      const l = i();
      s.virtual = {
        cache: {},
        from: void 0,
        to: void 0,
        slides: [],
        offset: 0,
        slidesGrid: [],
      };
      const o = l.createElement("div");
      function d(e, t) {
        const i = s.params.virtual;
        if (i.cache && s.virtual.cache[t]) return s.virtual.cache[t];
        let a;
        return (
          i.renderSlide
            ? ((a = i.renderSlide.call(s, e, t)),
              "string" == typeof a && ((o.innerHTML = a), (a = o.children[0])))
            : (a = s.isElement
                ? v("swiper-slide")
                : v("div", s.params.slideClass)),
          a.setAttribute("data-swiper-slide-index", t),
          i.renderSlide || (a.innerHTML = e),
          i.cache && (s.virtual.cache[t] = a),
          a
        );
      }
      function c(e, t, i) {
        const {
          slidesPerView: a,
          slidesPerGroup: r,
          centeredSlides: l,
          loop: o,
          initialSlide: c,
        } = s.params;
        if (t && !o && c > 0) return;
        const { addSlidesBefore: p, addSlidesAfter: u } = s.params.virtual,
          { from: m, to: h, slides: g, slidesGrid: v, offset: w } = s.virtual;
        s.params.cssMode || s.updateActiveIndex();
        const b = void 0 === i ? s.activeIndex || 0 : i;
        let y, E, S;
        (y = s.rtlTranslate ? "right" : s.isHorizontal() ? "left" : "top"),
          l
            ? ((E = Math.floor(a / 2) + r + u), (S = Math.floor(a / 2) + r + p))
            : ((E = a + (r - 1) + u), (S = (o ? a : r) + p));
        let x = b - S,
          T = b + E;
        o || ((x = Math.max(x, 0)), (T = Math.min(T, g.length - 1)));
        let M = (s.slidesGrid[x] || 0) - (s.slidesGrid[0] || 0);
        function C() {
          s.updateSlides(),
            s.updateProgress(),
            s.updateSlidesClasses(),
            n("virtualUpdate");
        }
        if (
          (o && b >= S
            ? ((x -= S), l || (M += s.slidesGrid[0]))
            : o && b < S && ((x = -S), l && (M += s.slidesGrid[0])),
          Object.assign(s.virtual, {
            from: x,
            to: T,
            offset: M,
            slidesGrid: s.slidesGrid,
            slidesBefore: S,
            slidesAfter: E,
          }),
          m === x && h === T && !e)
        )
          return (
            s.slidesGrid !== v &&
              M !== w &&
              s.slides.forEach((e) => {
                e.style[y] = M - Math.abs(s.cssOverflowAdjustment()) + "px";
              }),
            s.updateProgress(),
            void n("virtualUpdate")
          );
        if (s.params.virtual.renderExternal)
          return (
            s.params.virtual.renderExternal.call(s, {
              offset: M,
              from: x,
              to: T,
              slides: (function () {
                const e = [];
                for (let t = x; t <= T; t += 1) e.push(g[t]);
                return e;
              })(),
            }),
            void (s.params.virtual.renderExternalUpdate
              ? C()
              : n("virtualUpdate"))
          );
        const L = [],
          P = [],
          O = (e) => {
            let t = e;
            return (
              e < 0 ? (t = g.length + e) : t >= g.length && (t -= g.length), t
            );
          };
        if (e)
          s.slides
            .filter((e) => e.matches(`.${s.params.slideClass}, swiper-slide`))
            .forEach((e) => {
              e.remove();
            });
        else
          for (let e = m; e <= h; e += 1)
            if (e < x || e > T) {
              const t = O(e);
              s.slides
                .filter((e) =>
                  e.matches(
                    `.${s.params.slideClass}[data-swiper-slide-index="${t}"], swiper-slide[data-swiper-slide-index="${t}"]`,
                  ),
                )
                .forEach((e) => {
                  e.remove();
                });
            }
        const A = o ? -g.length : 0,
          $ = o ? 2 * g.length : g.length;
        for (let t = A; t < $; t += 1)
          if (t >= x && t <= T) {
            const s = O(t);
            void 0 === h || e
              ? P.push(s)
              : (t > h && P.push(s), t < m && L.push(s));
          }
        if (
          (P.forEach((e) => {
            s.slidesEl.append(d(g[e], e));
          }),
          o)
        )
          for (let e = L.length - 1; e >= 0; e -= 1) {
            const t = L[e];
            s.slidesEl.prepend(d(g[t], t));
          }
        else
          L.sort((e, t) => t - e),
            L.forEach((e) => {
              s.slidesEl.prepend(d(g[e], e));
            });
        f(s.slidesEl, ".swiper-slide, swiper-slide").forEach((e) => {
          e.style[y] = M - Math.abs(s.cssOverflowAdjustment()) + "px";
        }),
          C();
      }
      r("beforeInit", () => {
        if (!s.params.virtual.enabled) return;
        let e;
        if (void 0 === s.passedParams.virtual.slides) {
          const t = [...s.slidesEl.children].filter((e) =>
            e.matches(`.${s.params.slideClass}, swiper-slide`),
          );
          t &&
            t.length &&
            ((s.virtual.slides = [...t]),
            (e = !0),
            t.forEach((e, t) => {
              e.setAttribute("data-swiper-slide-index", t),
                (s.virtual.cache[t] = e),
                e.remove();
            }));
        }
        e || (s.virtual.slides = s.params.virtual.slides),
          s.classNames.push(`${s.params.containerModifierClass}virtual`),
          (s.params.watchSlidesProgress = !0),
          (s.originalParams.watchSlidesProgress = !0),
          c(!1, !0);
      }),
        r("setTranslate", () => {
          s.params.virtual.enabled &&
            (s.params.cssMode && !s._immediateVirtual
              ? (clearTimeout(t),
                (t = setTimeout(() => {
                  c();
                }, 100)))
              : c());
        }),
        r("init update resize", () => {
          s.params.virtual.enabled &&
            s.params.cssMode &&
            u(s.wrapperEl, "--swiper-virtual-size", `${s.virtualSize}px`);
        }),
        Object.assign(s.virtual, {
          appendSlide: function (e) {
            if ("object" == typeof e && "length" in e)
              for (let t = 0; t < e.length; t += 1)
                e[t] && s.virtual.slides.push(e[t]);
            else s.virtual.slides.push(e);
            c(!0);
          },
          prependSlide: function (e) {
            const t = s.activeIndex;
            let i = t + 1,
              a = 1;
            if (Array.isArray(e)) {
              for (let t = 0; t < e.length; t += 1)
                e[t] && s.virtual.slides.unshift(e[t]);
              (i = t + e.length), (a = e.length);
            } else s.virtual.slides.unshift(e);
            if (s.params.virtual.cache) {
              const e = s.virtual.cache,
                t = {};
              Object.keys(e).forEach((s) => {
                const i = e[s],
                  r = i.getAttribute("data-swiper-slide-index");
                r &&
                  i.setAttribute(
                    "data-swiper-slide-index",
                    parseInt(r, 10) + a,
                  ),
                  (t[parseInt(s, 10) + a] = i);
              }),
                (s.virtual.cache = t);
            }
            c(!0), s.slideTo(i, 0);
          },
          removeSlide: function (e) {
            if (null == e) return;
            let t = s.activeIndex;
            if (Array.isArray(e))
              for (let i = e.length - 1; i >= 0; i -= 1)
                s.params.virtual.cache &&
                  (delete s.virtual.cache[e[i]],
                  Object.keys(s.virtual.cache).forEach((t) => {
                    t > e &&
                      ((s.virtual.cache[t - 1] = s.virtual.cache[t]),
                      s.virtual.cache[t - 1].setAttribute(
                        "data-swiper-slide-index",
                        t - 1,
                      ),
                      delete s.virtual.cache[t]);
                  })),
                  s.virtual.slides.splice(e[i], 1),
                  e[i] < t && (t -= 1),
                  (t = Math.max(t, 0));
            else
              s.params.virtual.cache &&
                (delete s.virtual.cache[e],
                Object.keys(s.virtual.cache).forEach((t) => {
                  t > e &&
                    ((s.virtual.cache[t - 1] = s.virtual.cache[t]),
                    s.virtual.cache[t - 1].setAttribute(
                      "data-swiper-slide-index",
                      t - 1,
                    ),
                    delete s.virtual.cache[t]);
                })),
                s.virtual.slides.splice(e, 1),
                e < t && (t -= 1),
                (t = Math.max(t, 0));
            c(!0), s.slideTo(t, 0);
          },
          removeAllSlides: function () {
            (s.virtual.slides = []),
              s.params.virtual.cache && (s.virtual.cache = {}),
              c(!0),
              s.slideTo(0, 0);
          },
          update: c,
        });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: a, emit: n } = e;
      const l = i(),
        o = r();
      function d(e) {
        if (!t.enabled) return;
        const { rtlTranslate: s } = t;
        let i = e;
        i.originalEvent && (i = i.originalEvent);
        const a = i.keyCode || i.charCode,
          r = t.params.keyboard.pageUpDown,
          d = r && 33 === a,
          c = r && 34 === a,
          p = 37 === a,
          u = 39 === a,
          m = 38 === a,
          h = 40 === a;
        if (
          !t.allowSlideNext &&
          ((t.isHorizontal() && u) || (t.isVertical() && h) || c)
        )
          return !1;
        if (
          !t.allowSlidePrev &&
          ((t.isHorizontal() && p) || (t.isVertical() && m) || d)
        )
          return !1;
        if (
          !(
            i.shiftKey ||
            i.altKey ||
            i.ctrlKey ||
            i.metaKey ||
            (l.activeElement &&
              l.activeElement.nodeName &&
              ("input" === l.activeElement.nodeName.toLowerCase() ||
                "textarea" === l.activeElement.nodeName.toLowerCase()))
          )
        ) {
          if (
            t.params.keyboard.onlyInViewport &&
            (d || c || p || u || m || h)
          ) {
            let e = !1;
            if (
              E(t.el, `.${t.params.slideClass}, swiper-slide`).length > 0 &&
              0 === E(t.el, `.${t.params.slideActiveClass}`).length
            )
              return;
            const i = t.el,
              a = i.clientWidth,
              r = i.clientHeight,
              n = o.innerWidth,
              l = o.innerHeight,
              d = w(i);
            s && (d.left -= i.scrollLeft);
            const c = [
              [d.left, d.top],
              [d.left + a, d.top],
              [d.left, d.top + r],
              [d.left + a, d.top + r],
            ];
            for (let t = 0; t < c.length; t += 1) {
              const s = c[t];
              if (s[0] >= 0 && s[0] <= n && s[1] >= 0 && s[1] <= l) {
                if (0 === s[0] && 0 === s[1]) continue;
                e = !0;
              }
            }
            if (!e) return;
          }
          t.isHorizontal()
            ? ((d || c || p || u) &&
                (i.preventDefault ? i.preventDefault() : (i.returnValue = !1)),
              (((c || u) && !s) || ((d || p) && s)) && t.slideNext(),
              (((d || p) && !s) || ((c || u) && s)) && t.slidePrev())
            : ((d || c || m || h) &&
                (i.preventDefault ? i.preventDefault() : (i.returnValue = !1)),
              (c || h) && t.slideNext(),
              (d || m) && t.slidePrev()),
            n("keyPress", a);
        }
      }
      function c() {
        t.keyboard.enabled ||
          (l.addEventListener("keydown", d), (t.keyboard.enabled = !0));
      }
      function p() {
        t.keyboard.enabled &&
          (l.removeEventListener("keydown", d), (t.keyboard.enabled = !1));
      }
      (t.keyboard = { enabled: !1 }),
        s({ keyboard: { enabled: !1, onlyInViewport: !0, pageUpDown: !0 } }),
        a("init", () => {
          t.params.keyboard.enabled && c();
        }),
        a("destroy", () => {
          t.keyboard.enabled && p();
        }),
        Object.assign(t.keyboard, { enable: c, disable: p });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: i, emit: a } = e;
      const n = r();
      let d;
      s({
        mousewheel: {
          enabled: !1,
          releaseOnEdges: !1,
          invert: !1,
          forceToAxis: !1,
          sensitivity: 1,
          eventsTarget: "container",
          thresholdDelta: null,
          thresholdTime: null,
          noMousewheelClass: "swiper-no-mousewheel",
        },
      }),
        (t.mousewheel = { enabled: !1 });
      let c,
        p = o();
      const u = [];
      function m() {
        t.enabled && (t.mouseEntered = !0);
      }
      function h() {
        t.enabled && (t.mouseEntered = !1);
      }
      function f(e) {
        return (
          !(
            t.params.mousewheel.thresholdDelta &&
            e.delta < t.params.mousewheel.thresholdDelta
          ) &&
          !(
            t.params.mousewheel.thresholdTime &&
            o() - p < t.params.mousewheel.thresholdTime
          ) &&
          ((e.delta >= 6 && o() - p < 60) ||
            (e.direction < 0
              ? (t.isEnd && !t.params.loop) ||
                t.animating ||
                (t.slideNext(), a("scroll", e.raw))
              : (t.isBeginning && !t.params.loop) ||
                t.animating ||
                (t.slidePrev(), a("scroll", e.raw)),
            (p = new n.Date().getTime()),
            !1))
        );
      }
      function g(e) {
        let s = e,
          i = !0;
        if (!t.enabled) return;
        if (e.target.closest(`.${t.params.mousewheel.noMousewheelClass}`))
          return;
        const r = t.params.mousewheel;
        t.params.cssMode && s.preventDefault();
        let n = t.el;
        "container" !== t.params.mousewheel.eventsTarget &&
          (n = document.querySelector(t.params.mousewheel.eventsTarget));
        const p = n && n.contains(s.target);
        if (!t.mouseEntered && !p && !r.releaseOnEdges) return !0;
        s.originalEvent && (s = s.originalEvent);
        let m = 0;
        const h = t.rtlTranslate ? -1 : 1,
          g = (function (e) {
            let t = 0,
              s = 0,
              i = 0,
              a = 0;
            return (
              "detail" in e && (s = e.detail),
              "wheelDelta" in e && (s = -e.wheelDelta / 120),
              "wheelDeltaY" in e && (s = -e.wheelDeltaY / 120),
              "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120),
              "axis" in e && e.axis === e.HORIZONTAL_AXIS && ((t = s), (s = 0)),
              (i = 10 * t),
              (a = 10 * s),
              "deltaY" in e && (a = e.deltaY),
              "deltaX" in e && (i = e.deltaX),
              e.shiftKey && !i && ((i = a), (a = 0)),
              (i || a) &&
                e.deltaMode &&
                (1 === e.deltaMode
                  ? ((i *= 40), (a *= 40))
                  : ((i *= 800), (a *= 800))),
              i && !t && (t = i < 1 ? -1 : 1),
              a && !s && (s = a < 1 ? -1 : 1),
              { spinX: t, spinY: s, pixelX: i, pixelY: a }
            );
          })(s);
        if (r.forceToAxis)
          if (t.isHorizontal()) {
            if (!(Math.abs(g.pixelX) > Math.abs(g.pixelY))) return !0;
            m = -g.pixelX * h;
          } else {
            if (!(Math.abs(g.pixelY) > Math.abs(g.pixelX))) return !0;
            m = -g.pixelY;
          }
        else
          m =
            Math.abs(g.pixelX) > Math.abs(g.pixelY) ? -g.pixelX * h : -g.pixelY;
        if (0 === m) return !0;
        r.invert && (m = -m);
        let v = t.getTranslate() + m * r.sensitivity;
        if (
          (v >= t.minTranslate() && (v = t.minTranslate()),
          v <= t.maxTranslate() && (v = t.maxTranslate()),
          (i =
            !!t.params.loop ||
            !(v === t.minTranslate() || v === t.maxTranslate())),
          i && t.params.nested && s.stopPropagation(),
          t.params.freeMode && t.params.freeMode.enabled)
        ) {
          const e = { time: o(), delta: Math.abs(m), direction: Math.sign(m) },
            i =
              c &&
              e.time < c.time + 500 &&
              e.delta <= c.delta &&
              e.direction === c.direction;
          if (!i) {
            c = void 0;
            let n = t.getTranslate() + m * r.sensitivity;
            const o = t.isBeginning,
              p = t.isEnd;
            if (
              (n >= t.minTranslate() && (n = t.minTranslate()),
              n <= t.maxTranslate() && (n = t.maxTranslate()),
              t.setTransition(0),
              t.setTranslate(n),
              t.updateProgress(),
              t.updateActiveIndex(),
              t.updateSlidesClasses(),
              ((!o && t.isBeginning) || (!p && t.isEnd)) &&
                t.updateSlidesClasses(),
              t.params.loop &&
                t.loopFix({
                  direction: e.direction < 0 ? "next" : "prev",
                  byMousewheel: !0,
                }),
              t.params.freeMode.sticky)
            ) {
              clearTimeout(d), (d = void 0), u.length >= 15 && u.shift();
              const s = u.length ? u[u.length - 1] : void 0,
                i = u[0];
              if (
                (u.push(e),
                s && (e.delta > s.delta || e.direction !== s.direction))
              )
                u.splice(0);
              else if (
                u.length >= 15 &&
                e.time - i.time < 500 &&
                i.delta - e.delta >= 1 &&
                e.delta <= 6
              ) {
                const s = m > 0 ? 0.8 : 0.2;
                (c = e),
                  u.splice(0),
                  (d = l(() => {
                    !t.destroyed &&
                      t.params &&
                      t.slideToClosest(t.params.speed, !0, void 0, s);
                  }, 0));
              }
              d ||
                (d = l(() => {
                  if (t.destroyed || !t.params) return;
                  (c = e),
                    u.splice(0),
                    t.slideToClosest(t.params.speed, !0, void 0, 0.5);
                }, 500));
            }
            if (
              (i || a("scroll", s),
              t.params.autoplay &&
                t.params.autoplay.disableOnInteraction &&
                t.autoplay.stop(),
              r.releaseOnEdges &&
                (n === t.minTranslate() || n === t.maxTranslate()))
            )
              return !0;
          }
        } else {
          const s = {
            time: o(),
            delta: Math.abs(m),
            direction: Math.sign(m),
            raw: e,
          };
          u.length >= 2 && u.shift();
          const i = u.length ? u[u.length - 1] : void 0;
          if (
            (u.push(s),
            i
              ? (s.direction !== i.direction ||
                  s.delta > i.delta ||
                  s.time > i.time + 150) &&
                f(s)
              : f(s),
            (function (e) {
              const s = t.params.mousewheel;
              if (e.direction < 0) {
                if (t.isEnd && !t.params.loop && s.releaseOnEdges) return !0;
              } else if (t.isBeginning && !t.params.loop && s.releaseOnEdges)
                return !0;
              return !1;
            })(s))
          )
            return !0;
        }
        return s.preventDefault ? s.preventDefault() : (s.returnValue = !1), !1;
      }
      function v(e) {
        let s = t.el;
        "container" !== t.params.mousewheel.eventsTarget &&
          (s = document.querySelector(t.params.mousewheel.eventsTarget)),
          s[e]("mouseenter", m),
          s[e]("mouseleave", h),
          s[e]("wheel", g);
      }
      function w() {
        return t.params.cssMode
          ? (t.wrapperEl.removeEventListener("wheel", g), !0)
          : !t.mousewheel.enabled &&
              (v("addEventListener"), (t.mousewheel.enabled = !0), !0);
      }
      function b() {
        return t.params.cssMode
          ? (t.wrapperEl.addEventListener(event, g), !0)
          : !!t.mousewheel.enabled &&
              (v("removeEventListener"), (t.mousewheel.enabled = !1), !0);
      }
      i("init", () => {
        !t.params.mousewheel.enabled && t.params.cssMode && b(),
          t.params.mousewheel.enabled && w();
      }),
        i("destroy", () => {
          t.params.cssMode && w(), t.mousewheel.enabled && b();
        }),
        Object.assign(t.mousewheel, { enable: w, disable: b });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: i, emit: a } = e;
      function r(e) {
        let s;
        return e &&
          "string" == typeof e &&
          t.isElement &&
          ((s = t.el.querySelector(e) || t.hostEl.querySelector(e)), s)
          ? s
          : (e &&
              ("string" == typeof e && (s = [...document.querySelectorAll(e)]),
              t.params.uniqueNavElements &&
              "string" == typeof e &&
              s &&
              s.length > 1 &&
              1 === t.el.querySelectorAll(e).length
                ? (s = t.el.querySelector(e))
                : s && 1 === s.length && (s = s[0])),
            e && !s ? e : s);
      }
      function n(e, s) {
        const i = t.params.navigation;
        (e = T(e)).forEach((e) => {
          e &&
            (e.classList[s ? "add" : "remove"](...i.disabledClass.split(" ")),
            "BUTTON" === e.tagName && (e.disabled = s),
            t.params.watchOverflow &&
              t.enabled &&
              e.classList[t.isLocked ? "add" : "remove"](i.lockClass));
        });
      }
      function l() {
        const { nextEl: e, prevEl: s } = t.navigation;
        if (t.params.loop) return n(s, !1), void n(e, !1);
        n(s, t.isBeginning && !t.params.rewind),
          n(e, t.isEnd && !t.params.rewind);
      }
      function o(e) {
        e.preventDefault(),
          (!t.isBeginning || t.params.loop || t.params.rewind) &&
            (t.slidePrev(), a("navigationPrev"));
      }
      function d(e) {
        e.preventDefault(),
          (!t.isEnd || t.params.loop || t.params.rewind) &&
            (t.slideNext(), a("navigationNext"));
      }
      function c() {
        const e = t.params.navigation;
        if (
          ((t.params.navigation = re(
            t,
            t.originalParams.navigation,
            t.params.navigation,
            { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" },
          )),
          !e.nextEl && !e.prevEl)
        )
          return;
        let s = r(e.nextEl),
          i = r(e.prevEl);
        Object.assign(t.navigation, { nextEl: s, prevEl: i }),
          (s = T(s)),
          (i = T(i));
        const a = (s, i) => {
          s && s.addEventListener("click", "next" === i ? d : o),
            !t.enabled && s && s.classList.add(...e.lockClass.split(" "));
        };
        s.forEach((e) => a(e, "next")), i.forEach((e) => a(e, "prev"));
      }
      function p() {
        let { nextEl: e, prevEl: s } = t.navigation;
        (e = T(e)), (s = T(s));
        const i = (e, s) => {
          e.removeEventListener("click", "next" === s ? d : o),
            e.classList.remove(...t.params.navigation.disabledClass.split(" "));
        };
        e.forEach((e) => i(e, "next")), s.forEach((e) => i(e, "prev"));
      }
      s({
        navigation: {
          nextEl: null,
          prevEl: null,
          hideOnClick: !1,
          disabledClass: "swiper-button-disabled",
          hiddenClass: "swiper-button-hidden",
          lockClass: "swiper-button-lock",
          navigationDisabledClass: "swiper-navigation-disabled",
        },
      }),
        (t.navigation = { nextEl: null, prevEl: null }),
        i("init", () => {
          !1 === t.params.navigation.enabled ? u() : (c(), l());
        }),
        i("toEdge fromEdge lock unlock", () => {
          l();
        }),
        i("destroy", () => {
          p();
        }),
        i("enable disable", () => {
          let { nextEl: e, prevEl: s } = t.navigation;
          (e = T(e)),
            (s = T(s)),
            t.enabled
              ? l()
              : [...e, ...s]
                  .filter((e) => !!e)
                  .forEach((e) =>
                    e.classList.add(t.params.navigation.lockClass),
                  );
        }),
        i("click", (e, s) => {
          let { nextEl: i, prevEl: r } = t.navigation;
          (i = T(i)), (r = T(r));
          const n = s.target;
          let l = r.includes(n) || i.includes(n);
          if (t.isElement && !l) {
            const e = s.path || (s.composedPath && s.composedPath());
            e && (l = e.find((e) => i.includes(e) || r.includes(e)));
          }
          if (t.params.navigation.hideOnClick && !l) {
            if (
              t.pagination &&
              t.params.pagination &&
              t.params.pagination.clickable &&
              (t.pagination.el === n || t.pagination.el.contains(n))
            )
              return;
            let e;
            i.length
              ? (e = i[0].classList.contains(t.params.navigation.hiddenClass))
              : r.length &&
                (e = r[0].classList.contains(t.params.navigation.hiddenClass)),
              a(!0 === e ? "navigationShow" : "navigationHide"),
              [...i, ...r]
                .filter((e) => !!e)
                .forEach((e) =>
                  e.classList.toggle(t.params.navigation.hiddenClass),
                );
          }
        });
      const u = () => {
        t.el.classList.add(
          ...t.params.navigation.navigationDisabledClass.split(" "),
        ),
          p();
      };
      Object.assign(t.navigation, {
        enable: () => {
          t.el.classList.remove(
            ...t.params.navigation.navigationDisabledClass.split(" "),
          ),
            c(),
            l();
        },
        disable: u,
        update: l,
        init: c,
        destroy: p,
      });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: i, emit: a } = e;
      const r = "swiper-pagination";
      let n;
      s({
        pagination: {
          el: null,
          bulletElement: "span",
          clickable: !1,
          hideOnClick: !1,
          renderBullet: null,
          renderProgressbar: null,
          renderFraction: null,
          renderCustom: null,
          progressbarOpposite: !1,
          type: "bullets",
          dynamicBullets: !1,
          dynamicMainBullets: 1,
          formatFractionCurrent: (e) => e,
          formatFractionTotal: (e) => e,
          bulletClass: `${r}-bullet`,
          bulletActiveClass: `${r}-bullet-active`,
          modifierClass: `${r}-`,
          currentClass: `${r}-current`,
          totalClass: `${r}-total`,
          hiddenClass: `${r}-hidden`,
          progressbarFillClass: `${r}-progressbar-fill`,
          progressbarOppositeClass: `${r}-progressbar-opposite`,
          clickableClass: `${r}-clickable`,
          lockClass: `${r}-lock`,
          horizontalClass: `${r}-horizontal`,
          verticalClass: `${r}-vertical`,
          paginationDisabledClass: `${r}-disabled`,
        },
      }),
        (t.pagination = { el: null, bullets: [] });
      let l = 0;
      function o() {
        return (
          !t.params.pagination.el ||
          !t.pagination.el ||
          (Array.isArray(t.pagination.el) && 0 === t.pagination.el.length)
        );
      }
      function d(e, s) {
        const { bulletActiveClass: i } = t.params.pagination;
        e &&
          (e = e[("prev" === s ? "previous" : "next") + "ElementSibling"]) &&
          (e.classList.add(`${i}-${s}`),
          (e = e[("prev" === s ? "previous" : "next") + "ElementSibling"]) &&
            e.classList.add(`${i}-${s}-${s}`));
      }
      function c(e) {
        const s = e.target.closest(ne(t.params.pagination.bulletClass));
        if (!s) return;
        e.preventDefault();
        const i = y(s) * t.params.slidesPerGroup;
        if (t.params.loop) {
          if (t.realIndex === i) return;
          const e =
            ((a = t.realIndex),
            (r = i),
            (n = t.slides.length),
            (r %= n) == 1 + (a %= n)
              ? "next"
              : r === a - 1
                ? "previous"
                : void 0);
          "next" === e
            ? t.slideNext()
            : "previous" === e
              ? t.slidePrev()
              : t.slideToLoop(i);
        } else t.slideTo(i);
        var a, r, n;
      }
      function p() {
        const e = t.rtl,
          s = t.params.pagination;
        if (o()) return;
        let i,
          r,
          c = t.pagination.el;
        c = T(c);
        const p =
            t.virtual && t.params.virtual.enabled
              ? t.virtual.slides.length
              : t.slides.length,
          u = t.params.loop
            ? Math.ceil(p / t.params.slidesPerGroup)
            : t.snapGrid.length;
        if (
          (t.params.loop
            ? ((r = t.previousRealIndex || 0),
              (i =
                t.params.slidesPerGroup > 1
                  ? Math.floor(t.realIndex / t.params.slidesPerGroup)
                  : t.realIndex))
            : void 0 !== t.snapIndex
              ? ((i = t.snapIndex), (r = t.previousSnapIndex))
              : ((r = t.previousIndex || 0), (i = t.activeIndex || 0)),
          "bullets" === s.type &&
            t.pagination.bullets &&
            t.pagination.bullets.length > 0)
        ) {
          const a = t.pagination.bullets;
          let o, p, u;
          if (
            (s.dynamicBullets &&
              ((n = x(a[0], t.isHorizontal() ? "width" : "height", !0)),
              c.forEach((e) => {
                e.style[t.isHorizontal() ? "width" : "height"] =
                  n * (s.dynamicMainBullets + 4) + "px";
              }),
              s.dynamicMainBullets > 1 &&
                void 0 !== r &&
                ((l += i - (r || 0)),
                l > s.dynamicMainBullets - 1
                  ? (l = s.dynamicMainBullets - 1)
                  : l < 0 && (l = 0)),
              (o = Math.max(i - l, 0)),
              (p = o + (Math.min(a.length, s.dynamicMainBullets) - 1)),
              (u = (p + o) / 2)),
            a.forEach((e) => {
              const t = [
                ...[
                  "",
                  "-next",
                  "-next-next",
                  "-prev",
                  "-prev-prev",
                  "-main",
                ].map((e) => `${s.bulletActiveClass}${e}`),
              ]
                .map((e) =>
                  "string" == typeof e && e.includes(" ") ? e.split(" ") : e,
                )
                .flat();
              e.classList.remove(...t);
            }),
            c.length > 1)
          )
            a.forEach((e) => {
              const a = y(e);
              a === i
                ? e.classList.add(...s.bulletActiveClass.split(" "))
                : t.isElement && e.setAttribute("part", "bullet"),
                s.dynamicBullets &&
                  (a >= o &&
                    a <= p &&
                    e.classList.add(
                      ...`${s.bulletActiveClass}-main`.split(" "),
                    ),
                  a === o && d(e, "prev"),
                  a === p && d(e, "next"));
            });
          else {
            const e = a[i];
            if (
              (e && e.classList.add(...s.bulletActiveClass.split(" ")),
              t.isElement &&
                a.forEach((e, t) => {
                  e.setAttribute("part", t === i ? "bullet-active" : "bullet");
                }),
              s.dynamicBullets)
            ) {
              const e = a[o],
                t = a[p];
              for (let e = o; e <= p; e += 1)
                a[e] &&
                  a[e].classList.add(
                    ...`${s.bulletActiveClass}-main`.split(" "),
                  );
              d(e, "prev"), d(t, "next");
            }
          }
          if (s.dynamicBullets) {
            const i = Math.min(a.length, s.dynamicMainBullets + 4),
              r = (n * i - n) / 2 - u * n,
              l = e ? "right" : "left";
            a.forEach((e) => {
              e.style[t.isHorizontal() ? l : "top"] = `${r}px`;
            });
          }
        }
        c.forEach((e, r) => {
          if (
            ("fraction" === s.type &&
              (e.querySelectorAll(ne(s.currentClass)).forEach((e) => {
                e.textContent = s.formatFractionCurrent(i + 1);
              }),
              e.querySelectorAll(ne(s.totalClass)).forEach((e) => {
                e.textContent = s.formatFractionTotal(u);
              })),
            "progressbar" === s.type)
          ) {
            let a;
            a = s.progressbarOpposite
              ? t.isHorizontal()
                ? "vertical"
                : "horizontal"
              : t.isHorizontal()
                ? "horizontal"
                : "vertical";
            const r = (i + 1) / u;
            let n = 1,
              l = 1;
            "horizontal" === a ? (n = r) : (l = r),
              e.querySelectorAll(ne(s.progressbarFillClass)).forEach((e) => {
                (e.style.transform = `translate3d(0,0,0) scaleX(${n}) scaleY(${l})`),
                  (e.style.transitionDuration = `${t.params.speed}ms`);
              });
          }
          "custom" === s.type && s.renderCustom
            ? ((e.innerHTML = s.renderCustom(t, i + 1, u)),
              0 === r && a("paginationRender", e))
            : (0 === r && a("paginationRender", e), a("paginationUpdate", e)),
            t.params.watchOverflow &&
              t.enabled &&
              e.classList[t.isLocked ? "add" : "remove"](s.lockClass);
        });
      }
      function u() {
        const e = t.params.pagination;
        if (o()) return;
        const s =
          t.virtual && t.params.virtual.enabled
            ? t.virtual.slides.length
            : t.grid && t.params.grid.rows > 1
              ? t.slides.length / Math.ceil(t.params.grid.rows)
              : t.slides.length;
        let i = t.pagination.el;
        i = T(i);
        let r = "";
        if ("bullets" === e.type) {
          let i = t.params.loop
            ? Math.ceil(s / t.params.slidesPerGroup)
            : t.snapGrid.length;
          t.params.freeMode && t.params.freeMode.enabled && i > s && (i = s);
          for (let s = 0; s < i; s += 1)
            e.renderBullet
              ? (r += e.renderBullet.call(t, s, e.bulletClass))
              : (r += `<${e.bulletElement} ${t.isElement ? 'part="bullet"' : ""} class="${e.bulletClass}"></${e.bulletElement}>`);
        }
        "fraction" === e.type &&
          (r = e.renderFraction
            ? e.renderFraction.call(t, e.currentClass, e.totalClass)
            : `<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`),
          "progressbar" === e.type &&
            (r = e.renderProgressbar
              ? e.renderProgressbar.call(t, e.progressbarFillClass)
              : `<span class="${e.progressbarFillClass}"></span>`),
          (t.pagination.bullets = []),
          i.forEach((s) => {
            "custom" !== e.type && (s.innerHTML = r || ""),
              "bullets" === e.type &&
                t.pagination.bullets.push(
                  ...s.querySelectorAll(ne(e.bulletClass)),
                );
          }),
          "custom" !== e.type && a("paginationRender", i[0]);
      }
      function m() {
        t.params.pagination = re(
          t,
          t.originalParams.pagination,
          t.params.pagination,
          { el: "swiper-pagination" },
        );
        const e = t.params.pagination;
        if (!e.el) return;
        let s;
        "string" == typeof e.el &&
          t.isElement &&
          (s = t.el.querySelector(e.el)),
          s ||
            "string" != typeof e.el ||
            (s = [...document.querySelectorAll(e.el)]),
          s || (s = e.el),
          s &&
            0 !== s.length &&
            (t.params.uniqueNavElements &&
              "string" == typeof e.el &&
              Array.isArray(s) &&
              s.length > 1 &&
              ((s = [...t.el.querySelectorAll(e.el)]),
              s.length > 1 && (s = s.find((e) => E(e, ".swiper")[0] === t.el))),
            Array.isArray(s) && 1 === s.length && (s = s[0]),
            Object.assign(t.pagination, { el: s }),
            (s = T(s)),
            s.forEach((s) => {
              "bullets" === e.type &&
                e.clickable &&
                s.classList.add(...(e.clickableClass || "").split(" ")),
                s.classList.add(e.modifierClass + e.type),
                s.classList.add(
                  t.isHorizontal() ? e.horizontalClass : e.verticalClass,
                ),
                "bullets" === e.type &&
                  e.dynamicBullets &&
                  (s.classList.add(`${e.modifierClass}${e.type}-dynamic`),
                  (l = 0),
                  e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)),
                "progressbar" === e.type &&
                  e.progressbarOpposite &&
                  s.classList.add(e.progressbarOppositeClass),
                e.clickable && s.addEventListener("click", c),
                t.enabled || s.classList.add(e.lockClass);
            }));
      }
      function h() {
        const e = t.params.pagination;
        if (o()) return;
        let s = t.pagination.el;
        s &&
          ((s = T(s)),
          s.forEach((s) => {
            s.classList.remove(e.hiddenClass),
              s.classList.remove(e.modifierClass + e.type),
              s.classList.remove(
                t.isHorizontal() ? e.horizontalClass : e.verticalClass,
              ),
              e.clickable &&
                (s.classList.remove(...(e.clickableClass || "").split(" ")),
                s.removeEventListener("click", c));
          })),
          t.pagination.bullets &&
            t.pagination.bullets.forEach((t) =>
              t.classList.remove(...e.bulletActiveClass.split(" ")),
            );
      }
      i("changeDirection", () => {
        if (!t.pagination || !t.pagination.el) return;
        const e = t.params.pagination;
        let { el: s } = t.pagination;
        (s = T(s)),
          s.forEach((s) => {
            s.classList.remove(e.horizontalClass, e.verticalClass),
              s.classList.add(
                t.isHorizontal() ? e.horizontalClass : e.verticalClass,
              );
          });
      }),
        i("init", () => {
          !1 === t.params.pagination.enabled ? f() : (m(), u(), p());
        }),
        i("activeIndexChange", () => {
          void 0 === t.snapIndex && p();
        }),
        i("snapIndexChange", () => {
          p();
        }),
        i("snapGridLengthChange", () => {
          u(), p();
        }),
        i("destroy", () => {
          h();
        }),
        i("enable disable", () => {
          let { el: e } = t.pagination;
          e &&
            ((e = T(e)),
            e.forEach((e) =>
              e.classList[t.enabled ? "remove" : "add"](
                t.params.pagination.lockClass,
              ),
            ));
        }),
        i("lock unlock", () => {
          p();
        }),
        i("click", (e, s) => {
          const i = s.target,
            r = T(t.pagination.el);
          if (
            t.params.pagination.el &&
            t.params.pagination.hideOnClick &&
            r &&
            r.length > 0 &&
            !i.classList.contains(t.params.pagination.bulletClass)
          ) {
            if (
              t.navigation &&
              ((t.navigation.nextEl && i === t.navigation.nextEl) ||
                (t.navigation.prevEl && i === t.navigation.prevEl))
            )
              return;
            const e = r[0].classList.contains(t.params.pagination.hiddenClass);
            a(!0 === e ? "paginationShow" : "paginationHide"),
              r.forEach((e) =>
                e.classList.toggle(t.params.pagination.hiddenClass),
              );
          }
        });
      const f = () => {
        t.el.classList.add(t.params.pagination.paginationDisabledClass);
        let { el: e } = t.pagination;
        e &&
          ((e = T(e)),
          e.forEach((e) =>
            e.classList.add(t.params.pagination.paginationDisabledClass),
          )),
          h();
      };
      Object.assign(t.pagination, {
        enable: () => {
          t.el.classList.remove(t.params.pagination.paginationDisabledClass);
          let { el: e } = t.pagination;
          e &&
            ((e = T(e)),
            e.forEach((e) =>
              e.classList.remove(t.params.pagination.paginationDisabledClass),
            )),
            m(),
            u(),
            p();
        },
        disable: f,
        render: u,
        update: p,
        init: m,
        destroy: h,
      });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: a, emit: r } = e;
      const o = i();
      let d,
        c,
        p,
        u,
        m = !1,
        h = null,
        f = null;
      function g() {
        if (!t.params.scrollbar.el || !t.scrollbar.el) return;
        const { scrollbar: e, rtlTranslate: s } = t,
          { dragEl: i, el: a } = e,
          r = t.params.scrollbar,
          n = t.params.loop ? t.progressLoop : t.progress;
        let l = c,
          o = (p - c) * n;
        s
          ? ((o = -o),
            o > 0 ? ((l = c - o), (o = 0)) : -o + c > p && (l = p + o))
          : o < 0
            ? ((l = c + o), (o = 0))
            : o + c > p && (l = p - o),
          t.isHorizontal()
            ? ((i.style.transform = `translate3d(${o}px, 0, 0)`),
              (i.style.width = `${l}px`))
            : ((i.style.transform = `translate3d(0px, ${o}px, 0)`),
              (i.style.height = `${l}px`)),
          r.hide &&
            (clearTimeout(h),
            (a.style.opacity = 1),
            (h = setTimeout(() => {
              (a.style.opacity = 0), (a.style.transitionDuration = "400ms");
            }, 1e3)));
      }
      function b() {
        if (!t.params.scrollbar.el || !t.scrollbar.el) return;
        const { scrollbar: e } = t,
          { dragEl: s, el: i } = e;
        (s.style.width = ""),
          (s.style.height = ""),
          (p = t.isHorizontal() ? i.offsetWidth : i.offsetHeight),
          (u =
            t.size /
            (t.virtualSize +
              t.params.slidesOffsetBefore -
              (t.params.centeredSlides ? t.snapGrid[0] : 0))),
          (c =
            "auto" === t.params.scrollbar.dragSize
              ? p * u
              : parseInt(t.params.scrollbar.dragSize, 10)),
          t.isHorizontal()
            ? (s.style.width = `${c}px`)
            : (s.style.height = `${c}px`),
          (i.style.display = u >= 1 ? "none" : ""),
          t.params.scrollbar.hide && (i.style.opacity = 0),
          t.params.watchOverflow &&
            t.enabled &&
            e.el.classList[t.isLocked ? "add" : "remove"](
              t.params.scrollbar.lockClass,
            );
      }
      function y(e) {
        return t.isHorizontal() ? e.clientX : e.clientY;
      }
      function E(e) {
        const { scrollbar: s, rtlTranslate: i } = t,
          { el: a } = s;
        let r;
        (r =
          (y(e) -
            w(a)[t.isHorizontal() ? "left" : "top"] -
            (null !== d ? d : c / 2)) /
          (p - c)),
          (r = Math.max(Math.min(r, 1), 0)),
          i && (r = 1 - r);
        const n = t.minTranslate() + (t.maxTranslate() - t.minTranslate()) * r;
        t.updateProgress(n),
          t.setTranslate(n),
          t.updateActiveIndex(),
          t.updateSlidesClasses();
      }
      function S(e) {
        const s = t.params.scrollbar,
          { scrollbar: i, wrapperEl: a } = t,
          { el: n, dragEl: l } = i;
        (m = !0),
          (d =
            e.target === l
              ? y(e) -
                e.target.getBoundingClientRect()[
                  t.isHorizontal() ? "left" : "top"
                ]
              : null),
          e.preventDefault(),
          e.stopPropagation(),
          (a.style.transitionDuration = "100ms"),
          (l.style.transitionDuration = "100ms"),
          E(e),
          clearTimeout(f),
          (n.style.transitionDuration = "0ms"),
          s.hide && (n.style.opacity = 1),
          t.params.cssMode && (t.wrapperEl.style["scroll-snap-type"] = "none"),
          r("scrollbarDragStart", e);
      }
      function x(e) {
        const { scrollbar: s, wrapperEl: i } = t,
          { el: a, dragEl: n } = s;
        m &&
          (e.preventDefault && e.cancelable
            ? e.preventDefault()
            : (e.returnValue = !1),
          E(e),
          (i.style.transitionDuration = "0ms"),
          (a.style.transitionDuration = "0ms"),
          (n.style.transitionDuration = "0ms"),
          r("scrollbarDragMove", e));
      }
      function M(e) {
        const s = t.params.scrollbar,
          { scrollbar: i, wrapperEl: a } = t,
          { el: n } = i;
        m &&
          ((m = !1),
          t.params.cssMode &&
            ((t.wrapperEl.style["scroll-snap-type"] = ""),
            (a.style.transitionDuration = "")),
          s.hide &&
            (clearTimeout(f),
            (f = l(() => {
              (n.style.opacity = 0), (n.style.transitionDuration = "400ms");
            }, 1e3))),
          r("scrollbarDragEnd", e),
          s.snapOnRelease && t.slideToClosest());
      }
      function C(e) {
        const { scrollbar: s, params: i } = t,
          a = s.el;
        if (!a) return;
        const r = a,
          n = !!i.passiveListeners && { passive: !1, capture: !1 },
          l = !!i.passiveListeners && { passive: !0, capture: !1 };
        if (!r) return;
        const d = "on" === e ? "addEventListener" : "removeEventListener";
        r[d]("pointerdown", S, n),
          o[d]("pointermove", x, n),
          o[d]("pointerup", M, l);
      }
      function L() {
        const { scrollbar: e, el: s } = t;
        t.params.scrollbar = re(
          t,
          t.originalParams.scrollbar,
          t.params.scrollbar,
          { el: "swiper-scrollbar" },
        );
        const i = t.params.scrollbar;
        if (!i.el) return;
        let a, r;
        if (
          ("string" == typeof i.el &&
            t.isElement &&
            (a = t.el.querySelector(i.el)),
          a || "string" != typeof i.el)
        )
          a || (a = i.el);
        else if (((a = o.querySelectorAll(i.el)), !a.length)) return;
        t.params.uniqueNavElements &&
          "string" == typeof i.el &&
          a.length > 1 &&
          1 === s.querySelectorAll(i.el).length &&
          (a = s.querySelector(i.el)),
          a.length > 0 && (a = a[0]),
          a.classList.add(
            t.isHorizontal() ? i.horizontalClass : i.verticalClass,
          ),
          a &&
            ((r = a.querySelector(ne(t.params.scrollbar.dragClass))),
            r || ((r = v("div", t.params.scrollbar.dragClass)), a.append(r))),
          Object.assign(e, { el: a, dragEl: r }),
          i.draggable && t.params.scrollbar.el && t.scrollbar.el && C("on"),
          a &&
            a.classList[t.enabled ? "remove" : "add"](
              ...n(t.params.scrollbar.lockClass),
            );
      }
      function P() {
        const e = t.params.scrollbar,
          s = t.scrollbar.el;
        s &&
          s.classList.remove(
            ...n(t.isHorizontal() ? e.horizontalClass : e.verticalClass),
          ),
          t.params.scrollbar.el && t.scrollbar.el && C("off");
      }
      s({
        scrollbar: {
          el: null,
          dragSize: "auto",
          hide: !1,
          draggable: !1,
          snapOnRelease: !0,
          lockClass: "swiper-scrollbar-lock",
          dragClass: "swiper-scrollbar-drag",
          scrollbarDisabledClass: "swiper-scrollbar-disabled",
          horizontalClass: "swiper-scrollbar-horizontal",
          verticalClass: "swiper-scrollbar-vertical",
        },
      }),
        (t.scrollbar = { el: null, dragEl: null }),
        a("changeDirection", () => {
          if (!t.scrollbar || !t.scrollbar.el) return;
          const e = t.params.scrollbar;
          let { el: s } = t.scrollbar;
          (s = T(s)),
            s.forEach((s) => {
              s.classList.remove(e.horizontalClass, e.verticalClass),
                s.classList.add(
                  t.isHorizontal() ? e.horizontalClass : e.verticalClass,
                );
            });
        }),
        a("init", () => {
          !1 === t.params.scrollbar.enabled ? O() : (L(), b(), g());
        }),
        a("update resize observerUpdate lock unlock changeDirection", () => {
          b();
        }),
        a("setTranslate", () => {
          g();
        }),
        a("setTransition", (e, s) => {
          !(function (e) {
            t.params.scrollbar.el &&
              t.scrollbar.el &&
              (t.scrollbar.dragEl.style.transitionDuration = `${e}ms`);
          })(s);
        }),
        a("enable disable", () => {
          const { el: e } = t.scrollbar;
          e &&
            e.classList[t.enabled ? "remove" : "add"](
              ...n(t.params.scrollbar.lockClass),
            );
        }),
        a("destroy", () => {
          P();
        });
      const O = () => {
        t.el.classList.add(...n(t.params.scrollbar.scrollbarDisabledClass)),
          t.scrollbar.el &&
            t.scrollbar.el.classList.add(
              ...n(t.params.scrollbar.scrollbarDisabledClass),
            ),
          P();
      };
      Object.assign(t.scrollbar, {
        enable: () => {
          t.el.classList.remove(
            ...n(t.params.scrollbar.scrollbarDisabledClass),
          ),
            t.scrollbar.el &&
              t.scrollbar.el.classList.remove(
                ...n(t.params.scrollbar.scrollbarDisabledClass),
              ),
            L(),
            b(),
            g();
        },
        disable: O,
        updateSize: b,
        setTranslate: g,
        init: L,
        destroy: P,
      });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: i } = e;
      s({ parallax: { enabled: !1 } });
      const a =
          "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]",
        r = (e, s) => {
          const { rtl: i } = t,
            a = i ? -1 : 1,
            r = e.getAttribute("data-swiper-parallax") || "0";
          let n = e.getAttribute("data-swiper-parallax-x"),
            l = e.getAttribute("data-swiper-parallax-y");
          const o = e.getAttribute("data-swiper-parallax-scale"),
            d = e.getAttribute("data-swiper-parallax-opacity"),
            c = e.getAttribute("data-swiper-parallax-rotate");
          if (
            (n || l
              ? ((n = n || "0"), (l = l || "0"))
              : t.isHorizontal()
                ? ((n = r), (l = "0"))
                : ((l = r), (n = "0")),
            (n =
              n.indexOf("%") >= 0
                ? parseInt(n, 10) * s * a + "%"
                : n * s * a + "px"),
            (l =
              l.indexOf("%") >= 0 ? parseInt(l, 10) * s + "%" : l * s + "px"),
            null != d)
          ) {
            const t = d - (d - 1) * (1 - Math.abs(s));
            e.style.opacity = t;
          }
          let p = `translate3d(${n}, ${l}, 0px)`;
          if (null != o) {
            p += ` scale(${o - (o - 1) * (1 - Math.abs(s))})`;
          }
          if (c && null != c) {
            p += ` rotate(${c * s * -1}deg)`;
          }
          e.style.transform = p;
        },
        n = () => {
          const {
              el: e,
              slides: s,
              progress: i,
              snapGrid: n,
              isElement: l,
            } = t,
            o = f(e, a);
          t.isElement && o.push(...f(t.hostEl, a)),
            o.forEach((e) => {
              r(e, i);
            }),
            s.forEach((e, s) => {
              let l = e.progress;
              t.params.slidesPerGroup > 1 &&
                "auto" !== t.params.slidesPerView &&
                (l += Math.ceil(s / 2) - i * (n.length - 1)),
                (l = Math.min(Math.max(l, -1), 1)),
                e
                  .querySelectorAll(`${a}, [data-swiper-parallax-rotate]`)
                  .forEach((e) => {
                    r(e, l);
                  });
            });
        };
      i("beforeInit", () => {
        t.params.parallax.enabled &&
          ((t.params.watchSlidesProgress = !0),
          (t.originalParams.watchSlidesProgress = !0));
      }),
        i("init", () => {
          t.params.parallax.enabled && n();
        }),
        i("setTranslate", () => {
          t.params.parallax.enabled && n();
        }),
        i("setTransition", (e, s) => {
          t.params.parallax.enabled &&
            (function (e) {
              void 0 === e && (e = t.params.speed);
              const { el: s, hostEl: i } = t,
                r = [...s.querySelectorAll(a)];
              t.isElement && r.push(...i.querySelectorAll(a)),
                r.forEach((t) => {
                  let s =
                    parseInt(
                      t.getAttribute("data-swiper-parallax-duration"),
                      10,
                    ) || e;
                  0 === e && (s = 0), (t.style.transitionDuration = `${s}ms`);
                });
            })(s);
        });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: i, emit: a } = e;
      const n = r();
      s({
        zoom: {
          enabled: !1,
          limitToOriginalSize: !1,
          maxRatio: 3,
          minRatio: 1,
          panOnMouseMove: !1,
          toggle: !0,
          containerClass: "swiper-zoom-container",
          zoomedSlideClass: "swiper-slide-zoomed",
        },
      }),
        (t.zoom = { enabled: !1 });
      let l,
        o,
        c = 1,
        p = !1,
        u = !1,
        m = { x: 0, y: 0 };
      const h = [],
        g = {
          originX: 0,
          originY: 0,
          slideEl: void 0,
          slideWidth: void 0,
          slideHeight: void 0,
          imageEl: void 0,
          imageWrapEl: void 0,
          maxRatio: 3,
        },
        v = {
          isTouched: void 0,
          isMoved: void 0,
          currentX: void 0,
          currentY: void 0,
          minX: void 0,
          minY: void 0,
          maxX: void 0,
          maxY: void 0,
          width: void 0,
          height: void 0,
          startX: void 0,
          startY: void 0,
          touchesStart: {},
          touchesCurrent: {},
        },
        b = {
          x: void 0,
          y: void 0,
          prevPositionX: void 0,
          prevPositionY: void 0,
          prevTime: void 0,
        };
      let y,
        S = 1;
      function x() {
        if (h.length < 2) return 1;
        const e = h[0].pageX,
          t = h[0].pageY,
          s = h[1].pageX,
          i = h[1].pageY;
        return Math.sqrt((s - e) ** 2 + (i - t) ** 2);
      }
      function T() {
        const e = t.params.zoom,
          s = g.imageWrapEl.getAttribute("data-swiper-zoom") || e.maxRatio;
        if (e.limitToOriginalSize && g.imageEl && g.imageEl.naturalWidth) {
          const e = g.imageEl.naturalWidth / g.imageEl.offsetWidth;
          return Math.min(e, s);
        }
        return s;
      }
      function M(e) {
        const s = t.isElement ? "swiper-slide" : `.${t.params.slideClass}`;
        return (
          !!e.target.matches(s) ||
          t.slides.filter((t) => t.contains(e.target)).length > 0
        );
      }
      function C(e) {
        const s = `.${t.params.zoom.containerClass}`;
        return (
          !!e.target.matches(s) ||
          [...t.hostEl.querySelectorAll(s)].filter((t) => t.contains(e.target))
            .length > 0
        );
      }
      function L(e) {
        if (("mouse" === e.pointerType && h.splice(0, h.length), !M(e))) return;
        const s = t.params.zoom;
        if (((l = !1), (o = !1), h.push(e), !(h.length < 2))) {
          if (((l = !0), (g.scaleStart = x()), !g.slideEl)) {
            (g.slideEl = e.target.closest(
              `.${t.params.slideClass}, swiper-slide`,
            )),
              g.slideEl || (g.slideEl = t.slides[t.activeIndex]);
            let i = g.slideEl.querySelector(`.${s.containerClass}`);
            if (
              (i &&
                (i = i.querySelectorAll(
                  "picture, img, svg, canvas, .swiper-zoom-target",
                )[0]),
              (g.imageEl = i),
              (g.imageWrapEl = i
                ? E(g.imageEl, `.${s.containerClass}`)[0]
                : void 0),
              !g.imageWrapEl)
            )
              return void (g.imageEl = void 0);
            g.maxRatio = T();
          }
          if (g.imageEl) {
            const [e, t] = (function () {
              if (h.length < 2) return { x: null, y: null };
              const e = g.imageEl.getBoundingClientRect();
              return [
                (h[0].pageX + (h[1].pageX - h[0].pageX) / 2 - e.x - n.scrollX) /
                  c,
                (h[0].pageY + (h[1].pageY - h[0].pageY) / 2 - e.y - n.scrollY) /
                  c,
              ];
            })();
            (g.originX = e),
              (g.originY = t),
              (g.imageEl.style.transitionDuration = "0ms");
          }
          p = !0;
        }
      }
      function P(e) {
        if (!M(e)) return;
        const s = t.params.zoom,
          i = t.zoom,
          a = h.findIndex((t) => t.pointerId === e.pointerId);
        a >= 0 && (h[a] = e),
          h.length < 2 ||
            ((o = !0),
            (g.scaleMove = x()),
            g.imageEl &&
              ((i.scale = (g.scaleMove / g.scaleStart) * c),
              i.scale > g.maxRatio &&
                (i.scale = g.maxRatio - 1 + (i.scale - g.maxRatio + 1) ** 0.5),
              i.scale < s.minRatio &&
                (i.scale = s.minRatio + 1 - (s.minRatio - i.scale + 1) ** 0.5),
              (g.imageEl.style.transform = `translate3d(0,0,0) scale(${i.scale})`)));
      }
      function O(e) {
        if (!M(e)) return;
        if ("mouse" === e.pointerType && "pointerout" === e.type) return;
        const s = t.params.zoom,
          i = t.zoom,
          a = h.findIndex((t) => t.pointerId === e.pointerId);
        a >= 0 && h.splice(a, 1),
          l &&
            o &&
            ((l = !1),
            (o = !1),
            g.imageEl &&
              ((i.scale = Math.max(Math.min(i.scale, g.maxRatio), s.minRatio)),
              (g.imageEl.style.transitionDuration = `${t.params.speed}ms`),
              (g.imageEl.style.transform = `translate3d(0,0,0) scale(${i.scale})`),
              (c = i.scale),
              (p = !1),
              i.scale > 1 && g.slideEl
                ? g.slideEl.classList.add(`${s.zoomedSlideClass}`)
                : i.scale <= 1 &&
                  g.slideEl &&
                  g.slideEl.classList.remove(`${s.zoomedSlideClass}`),
              1 === i.scale &&
                ((g.originX = 0), (g.originY = 0), (g.slideEl = void 0))));
      }
      function A() {
        t.touchEventsData.preventTouchMoveFromPointerMove = !1;
      }
      function $(e) {
        const s = "mouse" === e.pointerType && t.params.zoom.panOnMouseMove;
        if (!M(e) || !C(e)) return;
        const i = t.zoom;
        if (!g.imageEl) return;
        if (!v.isTouched || !g.slideEl) return void (s && _(e));
        if (s) return void _(e);
        v.isMoved ||
          ((v.width = g.imageEl.offsetWidth || g.imageEl.clientWidth),
          (v.height = g.imageEl.offsetHeight || g.imageEl.clientHeight),
          (v.startX = d(g.imageWrapEl, "x") || 0),
          (v.startY = d(g.imageWrapEl, "y") || 0),
          (g.slideWidth = g.slideEl.offsetWidth),
          (g.slideHeight = g.slideEl.offsetHeight),
          (g.imageWrapEl.style.transitionDuration = "0ms"));
        const a = v.width * i.scale,
          r = v.height * i.scale;
        (v.minX = Math.min(g.slideWidth / 2 - a / 2, 0)),
          (v.maxX = -v.minX),
          (v.minY = Math.min(g.slideHeight / 2 - r / 2, 0)),
          (v.maxY = -v.minY),
          (v.touchesCurrent.x = h.length > 0 ? h[0].pageX : e.pageX),
          (v.touchesCurrent.y = h.length > 0 ? h[0].pageY : e.pageY);
        if (
          (Math.max(
            Math.abs(v.touchesCurrent.x - v.touchesStart.x),
            Math.abs(v.touchesCurrent.y - v.touchesStart.y),
          ) > 5 && (t.allowClick = !1),
          !v.isMoved && !p)
        ) {
          if (
            t.isHorizontal() &&
            ((Math.floor(v.minX) === Math.floor(v.startX) &&
              v.touchesCurrent.x < v.touchesStart.x) ||
              (Math.floor(v.maxX) === Math.floor(v.startX) &&
                v.touchesCurrent.x > v.touchesStart.x))
          )
            return (v.isTouched = !1), void A();
          if (
            !t.isHorizontal() &&
            ((Math.floor(v.minY) === Math.floor(v.startY) &&
              v.touchesCurrent.y < v.touchesStart.y) ||
              (Math.floor(v.maxY) === Math.floor(v.startY) &&
                v.touchesCurrent.y > v.touchesStart.y))
          )
            return (v.isTouched = !1), void A();
        }
        e.cancelable && e.preventDefault(),
          e.stopPropagation(),
          clearTimeout(y),
          (t.touchEventsData.preventTouchMoveFromPointerMove = !0),
          (y = setTimeout(() => {
            t.destroyed || A();
          })),
          (v.isMoved = !0);
        const n = (i.scale - c) / (g.maxRatio - t.params.zoom.minRatio),
          { originX: l, originY: o } = g;
        (v.currentX =
          v.touchesCurrent.x -
          v.touchesStart.x +
          v.startX +
          n * (v.width - 2 * l)),
          (v.currentY =
            v.touchesCurrent.y -
            v.touchesStart.y +
            v.startY +
            n * (v.height - 2 * o)),
          v.currentX < v.minX &&
            (v.currentX = v.minX + 1 - (v.minX - v.currentX + 1) ** 0.8),
          v.currentX > v.maxX &&
            (v.currentX = v.maxX - 1 + (v.currentX - v.maxX + 1) ** 0.8),
          v.currentY < v.minY &&
            (v.currentY = v.minY + 1 - (v.minY - v.currentY + 1) ** 0.8),
          v.currentY > v.maxY &&
            (v.currentY = v.maxY - 1 + (v.currentY - v.maxY + 1) ** 0.8),
          b.prevPositionX || (b.prevPositionX = v.touchesCurrent.x),
          b.prevPositionY || (b.prevPositionY = v.touchesCurrent.y),
          b.prevTime || (b.prevTime = Date.now()),
          (b.x =
            (v.touchesCurrent.x - b.prevPositionX) /
            (Date.now() - b.prevTime) /
            2),
          (b.y =
            (v.touchesCurrent.y - b.prevPositionY) /
            (Date.now() - b.prevTime) /
            2),
          Math.abs(v.touchesCurrent.x - b.prevPositionX) < 2 && (b.x = 0),
          Math.abs(v.touchesCurrent.y - b.prevPositionY) < 2 && (b.y = 0),
          (b.prevPositionX = v.touchesCurrent.x),
          (b.prevPositionY = v.touchesCurrent.y),
          (b.prevTime = Date.now()),
          (g.imageWrapEl.style.transform = `translate3d(${v.currentX}px, ${v.currentY}px,0)`);
      }
      function k() {
        const e = t.zoom;
        g.slideEl &&
          t.activeIndex !== t.slides.indexOf(g.slideEl) &&
          (g.imageEl &&
            (g.imageEl.style.transform = "translate3d(0,0,0) scale(1)"),
          g.imageWrapEl &&
            (g.imageWrapEl.style.transform = "translate3d(0,0,0)"),
          g.slideEl.classList.remove(`${t.params.zoom.zoomedSlideClass}`),
          (e.scale = 1),
          (c = 1),
          (g.slideEl = void 0),
          (g.imageEl = void 0),
          (g.imageWrapEl = void 0),
          (g.originX = 0),
          (g.originY = 0));
      }
      function _(e) {
        if (c <= 1 || !g.imageWrapEl) return;
        if (!M(e) || !C(e)) return;
        const t = n.getComputedStyle(g.imageWrapEl).transform,
          s = new n.DOMMatrix(t);
        if (!u)
          return (
            (u = !0),
            (m.x = e.clientX),
            (m.y = e.clientY),
            (v.startX = s.e),
            (v.startY = s.f),
            (v.width = g.imageEl.offsetWidth || g.imageEl.clientWidth),
            (v.height = g.imageEl.offsetHeight || g.imageEl.clientHeight),
            (g.slideWidth = g.slideEl.offsetWidth),
            void (g.slideHeight = g.slideEl.offsetHeight)
          );
        const i = -3 * (e.clientX - m.x),
          a = -3 * (e.clientY - m.y),
          r = v.width * c,
          l = v.height * c,
          o = g.slideWidth,
          d = g.slideHeight,
          p = Math.min(o / 2 - r / 2, 0),
          h = -p,
          f = Math.min(d / 2 - l / 2, 0),
          w = -f,
          b = Math.max(Math.min(v.startX + i, h), p),
          y = Math.max(Math.min(v.startY + a, w), f);
        (g.imageWrapEl.style.transitionDuration = "0ms"),
          (g.imageWrapEl.style.transform = `translate3d(${b}px, ${y}px, 0)`),
          (m.x = e.clientX),
          (m.y = e.clientY),
          (v.startX = b),
          (v.startY = y),
          (v.currentX = b),
          (v.currentY = y);
      }
      function I(e) {
        const s = t.zoom,
          i = t.params.zoom;
        if (!g.slideEl) {
          e &&
            e.target &&
            (g.slideEl = e.target.closest(
              `.${t.params.slideClass}, swiper-slide`,
            )),
            g.slideEl ||
              (t.params.virtual && t.params.virtual.enabled && t.virtual
                ? (g.slideEl = f(
                    t.slidesEl,
                    `.${t.params.slideActiveClass}`,
                  )[0])
                : (g.slideEl = t.slides[t.activeIndex]));
          let s = g.slideEl.querySelector(`.${i.containerClass}`);
          s &&
            (s = s.querySelectorAll(
              "picture, img, svg, canvas, .swiper-zoom-target",
            )[0]),
            (g.imageEl = s),
            (g.imageWrapEl = s
              ? E(g.imageEl, `.${i.containerClass}`)[0]
              : void 0);
        }
        if (!g.imageEl || !g.imageWrapEl) return;
        let a, r, l, o, d, p, u, m, h, b, y, S, x, M, C, L, P, O;
        t.params.cssMode &&
          ((t.wrapperEl.style.overflow = "hidden"),
          (t.wrapperEl.style.touchAction = "none")),
          g.slideEl.classList.add(`${i.zoomedSlideClass}`),
          void 0 === v.touchesStart.x && e
            ? ((a = e.pageX), (r = e.pageY))
            : ((a = v.touchesStart.x), (r = v.touchesStart.y));
        const A = c,
          $ = "number" == typeof e ? e : null;
        1 === c &&
          $ &&
          ((a = void 0),
          (r = void 0),
          (v.touchesStart.x = void 0),
          (v.touchesStart.y = void 0));
        const k = T();
        (s.scale = $ || k),
          (c = $ || k),
          !e || (1 === c && $)
            ? ((u = 0), (m = 0))
            : ((P = g.slideEl.offsetWidth),
              (O = g.slideEl.offsetHeight),
              (l = w(g.slideEl).left + n.scrollX),
              (o = w(g.slideEl).top + n.scrollY),
              (d = l + P / 2 - a),
              (p = o + O / 2 - r),
              (h = g.imageEl.offsetWidth || g.imageEl.clientWidth),
              (b = g.imageEl.offsetHeight || g.imageEl.clientHeight),
              (y = h * s.scale),
              (S = b * s.scale),
              (x = Math.min(P / 2 - y / 2, 0)),
              (M = Math.min(O / 2 - S / 2, 0)),
              (C = -x),
              (L = -M),
              A > 0 &&
              $ &&
              "number" == typeof v.currentX &&
              "number" == typeof v.currentY
                ? ((u = (v.currentX * s.scale) / A),
                  (m = (v.currentY * s.scale) / A))
                : ((u = d * s.scale), (m = p * s.scale)),
              u < x && (u = x),
              u > C && (u = C),
              m < M && (m = M),
              m > L && (m = L)),
          $ && 1 === s.scale && ((g.originX = 0), (g.originY = 0)),
          (v.currentX = u),
          (v.currentY = m),
          (g.imageWrapEl.style.transitionDuration = "300ms"),
          (g.imageWrapEl.style.transform = `translate3d(${u}px, ${m}px,0)`),
          (g.imageEl.style.transitionDuration = "300ms"),
          (g.imageEl.style.transform = `translate3d(0,0,0) scale(${s.scale})`);
      }
      function z() {
        const e = t.zoom,
          s = t.params.zoom;
        if (!g.slideEl) {
          t.params.virtual && t.params.virtual.enabled && t.virtual
            ? (g.slideEl = f(t.slidesEl, `.${t.params.slideActiveClass}`)[0])
            : (g.slideEl = t.slides[t.activeIndex]);
          let e = g.slideEl.querySelector(`.${s.containerClass}`);
          e &&
            (e = e.querySelectorAll(
              "picture, img, svg, canvas, .swiper-zoom-target",
            )[0]),
            (g.imageEl = e),
            (g.imageWrapEl = e
              ? E(g.imageEl, `.${s.containerClass}`)[0]
              : void 0);
        }
        g.imageEl &&
          g.imageWrapEl &&
          (t.params.cssMode &&
            ((t.wrapperEl.style.overflow = ""),
            (t.wrapperEl.style.touchAction = "")),
          (e.scale = 1),
          (c = 1),
          (v.currentX = void 0),
          (v.currentY = void 0),
          (v.touchesStart.x = void 0),
          (v.touchesStart.y = void 0),
          (g.imageWrapEl.style.transitionDuration = "300ms"),
          (g.imageWrapEl.style.transform = "translate3d(0,0,0)"),
          (g.imageEl.style.transitionDuration = "300ms"),
          (g.imageEl.style.transform = "translate3d(0,0,0) scale(1)"),
          g.slideEl.classList.remove(`${s.zoomedSlideClass}`),
          (g.slideEl = void 0),
          (g.originX = 0),
          (g.originY = 0),
          t.params.zoom.panOnMouseMove &&
            ((m = { x: 0, y: 0 }),
            u && ((u = !1), (v.startX = 0), (v.startY = 0))));
      }
      function D(e) {
        const s = t.zoom;
        s.scale && 1 !== s.scale ? z() : I(e);
      }
      function G() {
        return {
          passiveListener: !!t.params.passiveListeners && {
            passive: !0,
            capture: !1,
          },
          activeListenerWithCapture: !t.params.passiveListeners || {
            passive: !1,
            capture: !0,
          },
        };
      }
      function H() {
        const e = t.zoom;
        if (e.enabled) return;
        e.enabled = !0;
        const { passiveListener: s, activeListenerWithCapture: i } = G();
        t.wrapperEl.addEventListener("pointerdown", L, s),
          t.wrapperEl.addEventListener("pointermove", P, i),
          ["pointerup", "pointercancel", "pointerout"].forEach((e) => {
            t.wrapperEl.addEventListener(e, O, s);
          }),
          t.wrapperEl.addEventListener("pointermove", $, i);
      }
      function q() {
        const e = t.zoom;
        if (!e.enabled) return;
        e.enabled = !1;
        const { passiveListener: s, activeListenerWithCapture: i } = G();
        t.wrapperEl.removeEventListener("pointerdown", L, s),
          t.wrapperEl.removeEventListener("pointermove", P, i),
          ["pointerup", "pointercancel", "pointerout"].forEach((e) => {
            t.wrapperEl.removeEventListener(e, O, s);
          }),
          t.wrapperEl.removeEventListener("pointermove", $, i);
      }
      Object.defineProperty(t.zoom, "scale", {
        get: () => S,
        set(e) {
          if (S !== e) {
            const t = g.imageEl,
              s = g.slideEl;
            a("zoomChange", e, t, s);
          }
          S = e;
        },
      }),
        i("init", () => {
          t.params.zoom.enabled && H();
        }),
        i("destroy", () => {
          q();
        }),
        i("touchStart", (e, s) => {
          t.zoom.enabled &&
            (function (e) {
              const s = t.device;
              if (!g.imageEl) return;
              if (v.isTouched) return;
              s.android && e.cancelable && e.preventDefault(),
                (v.isTouched = !0);
              const i = h.length > 0 ? h[0] : e;
              (v.touchesStart.x = i.pageX), (v.touchesStart.y = i.pageY);
            })(s);
        }),
        i("touchEnd", (e, s) => {
          t.zoom.enabled &&
            (function () {
              const e = t.zoom;
              if (((h.length = 0), !g.imageEl)) return;
              if (!v.isTouched || !v.isMoved)
                return (v.isTouched = !1), void (v.isMoved = !1);
              (v.isTouched = !1), (v.isMoved = !1);
              let s = 300,
                i = 300;
              const a = b.x * s,
                r = v.currentX + a,
                n = b.y * i,
                l = v.currentY + n;
              0 !== b.x && (s = Math.abs((r - v.currentX) / b.x)),
                0 !== b.y && (i = Math.abs((l - v.currentY) / b.y));
              const o = Math.max(s, i);
              (v.currentX = r), (v.currentY = l);
              const d = v.width * e.scale,
                c = v.height * e.scale;
              (v.minX = Math.min(g.slideWidth / 2 - d / 2, 0)),
                (v.maxX = -v.minX),
                (v.minY = Math.min(g.slideHeight / 2 - c / 2, 0)),
                (v.maxY = -v.minY),
                (v.currentX = Math.max(Math.min(v.currentX, v.maxX), v.minX)),
                (v.currentY = Math.max(Math.min(v.currentY, v.maxY), v.minY)),
                (g.imageWrapEl.style.transitionDuration = `${o}ms`),
                (g.imageWrapEl.style.transform = `translate3d(${v.currentX}px, ${v.currentY}px,0)`);
            })();
        }),
        i("doubleTap", (e, s) => {
          !t.animating &&
            t.params.zoom.enabled &&
            t.zoom.enabled &&
            t.params.zoom.toggle &&
            D(s);
        }),
        i("transitionEnd", () => {
          t.zoom.enabled && t.params.zoom.enabled && k();
        }),
        i("slideChange", () => {
          t.zoom.enabled && t.params.zoom.enabled && t.params.cssMode && k();
        }),
        Object.assign(t.zoom, {
          enable: H,
          disable: q,
          in: I,
          out: z,
          toggle: D,
        });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: i } = e;
      function a(e, t) {
        const s = (function () {
          let e, t, s;
          return (i, a) => {
            for (t = -1, e = i.length; e - t > 1; )
              (s = (e + t) >> 1), i[s] <= a ? (t = s) : (e = s);
            return e;
          };
        })();
        let i, a;
        return (
          (this.x = e),
          (this.y = t),
          (this.lastIndex = e.length - 1),
          (this.interpolate = function (e) {
            return e
              ? ((a = s(this.x, e)),
                (i = a - 1),
                ((e - this.x[i]) * (this.y[a] - this.y[i])) /
                  (this.x[a] - this.x[i]) +
                  this.y[i])
              : 0;
          }),
          this
        );
      }
      function r() {
        t.controller.control &&
          t.controller.spline &&
          ((t.controller.spline = void 0), delete t.controller.spline);
      }
      s({ controller: { control: void 0, inverse: !1, by: "slide" } }),
        (t.controller = { control: void 0 }),
        i("beforeInit", () => {
          if (
            "undefined" != typeof window &&
            ("string" == typeof t.params.controller.control ||
              t.params.controller.control instanceof HTMLElement)
          ) {
            ("string" == typeof t.params.controller.control
              ? [...document.querySelectorAll(t.params.controller.control)]
              : [t.params.controller.control]
            ).forEach((e) => {
              if (
                (t.controller.control || (t.controller.control = []),
                e && e.swiper)
              )
                t.controller.control.push(e.swiper);
              else if (e) {
                const s = `${t.params.eventsPrefix}init`,
                  i = (a) => {
                    t.controller.control.push(a.detail[0]),
                      t.update(),
                      e.removeEventListener(s, i);
                  };
                e.addEventListener(s, i);
              }
            });
          } else t.controller.control = t.params.controller.control;
        }),
        i("update", () => {
          r();
        }),
        i("resize", () => {
          r();
        }),
        i("observerUpdate", () => {
          r();
        }),
        i("setTranslate", (e, s, i) => {
          t.controller.control &&
            !t.controller.control.destroyed &&
            t.controller.setTranslate(s, i);
        }),
        i("setTransition", (e, s, i) => {
          t.controller.control &&
            !t.controller.control.destroyed &&
            t.controller.setTransition(s, i);
        }),
        Object.assign(t.controller, {
          setTranslate: function (e, s) {
            const i = t.controller.control;
            let r, n;
            const l = t.constructor;
            function o(e) {
              if (e.destroyed) return;
              const s = t.rtlTranslate ? -t.translate : t.translate;
              "slide" === t.params.controller.by &&
                (!(function (e) {
                  t.controller.spline = t.params.loop
                    ? new a(t.slidesGrid, e.slidesGrid)
                    : new a(t.snapGrid, e.snapGrid);
                })(e),
                (n = -t.controller.spline.interpolate(-s))),
                (n && "container" !== t.params.controller.by) ||
                  ((r =
                    (e.maxTranslate() - e.minTranslate()) /
                    (t.maxTranslate() - t.minTranslate())),
                  (!Number.isNaN(r) && Number.isFinite(r)) || (r = 1),
                  (n = (s - t.minTranslate()) * r + e.minTranslate())),
                t.params.controller.inverse && (n = e.maxTranslate() - n),
                e.updateProgress(n),
                e.setTranslate(n, t),
                e.updateActiveIndex(),
                e.updateSlidesClasses();
            }
            if (Array.isArray(i))
              for (let e = 0; e < i.length; e += 1)
                i[e] !== s && i[e] instanceof l && o(i[e]);
            else i instanceof l && s !== i && o(i);
          },
          setTransition: function (e, s) {
            const i = t.constructor,
              a = t.controller.control;
            let r;
            function n(s) {
              s.destroyed ||
                (s.setTransition(e, t),
                0 !== e &&
                  (s.transitionStart(),
                  s.params.autoHeight &&
                    l(() => {
                      s.updateAutoHeight();
                    }),
                  S(s.wrapperEl, () => {
                    a && s.transitionEnd();
                  })));
            }
            if (Array.isArray(a))
              for (r = 0; r < a.length; r += 1)
                a[r] !== s && a[r] instanceof i && n(a[r]);
            else a instanceof i && s !== a && n(a);
          },
        });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: a } = e;
      s({
        a11y: {
          enabled: !0,
          notificationClass: "swiper-notification",
          prevSlideMessage: "Previous slide",
          nextSlideMessage: "Next slide",
          firstSlideMessage: "This is the first slide",
          lastSlideMessage: "This is the last slide",
          paginationBulletMessage: "Go to slide {{index}}",
          slideLabelMessage: "{{index}} / {{slidesLength}}",
          containerMessage: null,
          containerRoleDescriptionMessage: null,
          containerRole: null,
          itemRoleDescriptionMessage: null,
          slideRole: "group",
          id: null,
          scrollOnFocus: !0,
        },
      }),
        (t.a11y = { clicked: !1 });
      let r,
        n,
        l = null,
        o = new Date().getTime();
      function d(e) {
        const t = l;
        0 !== t.length && ((t.innerHTML = ""), (t.innerHTML = e));
      }
      function c(e) {
        (e = T(e)).forEach((e) => {
          e.setAttribute("tabIndex", "0");
        });
      }
      function p(e) {
        (e = T(e)).forEach((e) => {
          e.setAttribute("tabIndex", "-1");
        });
      }
      function u(e, t) {
        (e = T(e)).forEach((e) => {
          e.setAttribute("role", t);
        });
      }
      function m(e, t) {
        (e = T(e)).forEach((e) => {
          e.setAttribute("aria-roledescription", t);
        });
      }
      function h(e, t) {
        (e = T(e)).forEach((e) => {
          e.setAttribute("aria-label", t);
        });
      }
      function f(e) {
        (e = T(e)).forEach((e) => {
          e.setAttribute("aria-disabled", !0);
        });
      }
      function g(e) {
        (e = T(e)).forEach((e) => {
          e.setAttribute("aria-disabled", !1);
        });
      }
      function w(e) {
        if (13 !== e.keyCode && 32 !== e.keyCode) return;
        const s = t.params.a11y,
          i = e.target;
        if (
          !t.pagination ||
          !t.pagination.el ||
          (i !== t.pagination.el && !t.pagination.el.contains(e.target)) ||
          e.target.matches(ne(t.params.pagination.bulletClass))
        ) {
          if (t.navigation && t.navigation.prevEl && t.navigation.nextEl) {
            const e = T(t.navigation.prevEl);
            T(t.navigation.nextEl).includes(i) &&
              ((t.isEnd && !t.params.loop) || t.slideNext(),
              t.isEnd ? d(s.lastSlideMessage) : d(s.nextSlideMessage)),
              e.includes(i) &&
                ((t.isBeginning && !t.params.loop) || t.slidePrev(),
                t.isBeginning ? d(s.firstSlideMessage) : d(s.prevSlideMessage));
          }
          t.pagination &&
            i.matches(ne(t.params.pagination.bulletClass)) &&
            i.click();
        }
      }
      function b() {
        return (
          t.pagination && t.pagination.bullets && t.pagination.bullets.length
        );
      }
      function E() {
        return b() && t.params.pagination.clickable;
      }
      const S = (e, t, s) => {
          c(e),
            "BUTTON" !== e.tagName &&
              (u(e, "button"), e.addEventListener("keydown", w)),
            h(e, s),
            (function (e, t) {
              (e = T(e)).forEach((e) => {
                e.setAttribute("aria-controls", t);
              });
            })(e, t);
        },
        x = (e) => {
          n && n !== e.target && !n.contains(e.target) && (r = !0),
            (t.a11y.clicked = !0);
        },
        M = () => {
          (r = !1),
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                t.destroyed || (t.a11y.clicked = !1);
              });
            });
        },
        C = (e) => {
          o = new Date().getTime();
        },
        L = (e) => {
          if (t.a11y.clicked || !t.params.a11y.scrollOnFocus) return;
          if (new Date().getTime() - o < 100) return;
          const s = e.target.closest(`.${t.params.slideClass}, swiper-slide`);
          if (!s || !t.slides.includes(s)) return;
          n = s;
          const i = t.slides.indexOf(s) === t.activeIndex,
            a =
              t.params.watchSlidesProgress &&
              t.visibleSlides &&
              t.visibleSlides.includes(s);
          i ||
            a ||
            (e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents) ||
            (t.isHorizontal() ? (t.el.scrollLeft = 0) : (t.el.scrollTop = 0),
            requestAnimationFrame(() => {
              r ||
                (t.params.loop
                  ? t.slideToLoop(
                      parseInt(s.getAttribute("data-swiper-slide-index")),
                      0,
                    )
                  : t.slideTo(t.slides.indexOf(s), 0),
                (r = !1));
            }));
        },
        P = () => {
          const e = t.params.a11y;
          e.itemRoleDescriptionMessage &&
            m(t.slides, e.itemRoleDescriptionMessage),
            e.slideRole && u(t.slides, e.slideRole);
          const s = t.slides.length;
          e.slideLabelMessage &&
            t.slides.forEach((i, a) => {
              const r = t.params.loop
                ? parseInt(i.getAttribute("data-swiper-slide-index"), 10)
                : a;
              h(
                i,
                e.slideLabelMessage
                  .replace(/\{\{index\}\}/, r + 1)
                  .replace(/\{\{slidesLength\}\}/, s),
              );
            });
        },
        O = () => {
          const e = t.params.a11y;
          t.el.append(l);
          const s = t.el;
          e.containerRoleDescriptionMessage &&
            m(s, e.containerRoleDescriptionMessage),
            e.containerMessage && h(s, e.containerMessage),
            e.containerRole && u(s, e.containerRole);
          const a = t.wrapperEl,
            r =
              e.id ||
              a.getAttribute("id") ||
              `swiper-wrapper-${((n = 16), void 0 === n && (n = 16), "x".repeat(n).replace(/x/g, () => Math.round(16 * Math.random()).toString(16)))}`;
          var n;
          const o =
            t.params.autoplay && t.params.autoplay.enabled ? "off" : "polite";
          var d;
          (d = r),
            T(a).forEach((e) => {
              e.setAttribute("id", d);
            }),
            (function (e, t) {
              (e = T(e)).forEach((e) => {
                e.setAttribute("aria-live", t);
              });
            })(a, o),
            P();
          let { nextEl: c, prevEl: p } = t.navigation ? t.navigation : {};
          if (
            ((c = T(c)),
            (p = T(p)),
            c && c.forEach((t) => S(t, r, e.nextSlideMessage)),
            p && p.forEach((t) => S(t, r, e.prevSlideMessage)),
            E())
          ) {
            T(t.pagination.el).forEach((e) => {
              e.addEventListener("keydown", w);
            });
          }
          i().addEventListener("visibilitychange", C),
            t.el.addEventListener("focus", L, !0),
            t.el.addEventListener("focus", L, !0),
            t.el.addEventListener("pointerdown", x, !0),
            t.el.addEventListener("pointerup", M, !0);
        };
      a("beforeInit", () => {
        (l = v("span", t.params.a11y.notificationClass)),
          l.setAttribute("aria-live", "assertive"),
          l.setAttribute("aria-atomic", "true");
      }),
        a("afterInit", () => {
          t.params.a11y.enabled && O();
        }),
        a(
          "slidesLengthChange snapGridLengthChange slidesGridLengthChange",
          () => {
            t.params.a11y.enabled && P();
          },
        ),
        a("fromEdge toEdge afterInit lock unlock", () => {
          t.params.a11y.enabled &&
            (function () {
              if (t.params.loop || t.params.rewind || !t.navigation) return;
              const { nextEl: e, prevEl: s } = t.navigation;
              s && (t.isBeginning ? (f(s), p(s)) : (g(s), c(s))),
                e && (t.isEnd ? (f(e), p(e)) : (g(e), c(e)));
            })();
        }),
        a("paginationUpdate", () => {
          t.params.a11y.enabled &&
            (function () {
              const e = t.params.a11y;
              b() &&
                t.pagination.bullets.forEach((s) => {
                  t.params.pagination.clickable &&
                    (c(s),
                    t.params.pagination.renderBullet ||
                      (u(s, "button"),
                      h(
                        s,
                        e.paginationBulletMessage.replace(
                          /\{\{index\}\}/,
                          y(s) + 1,
                        ),
                      ))),
                    s.matches(ne(t.params.pagination.bulletActiveClass))
                      ? s.setAttribute("aria-current", "true")
                      : s.removeAttribute("aria-current");
                });
            })();
        }),
        a("destroy", () => {
          t.params.a11y.enabled &&
            (function () {
              l && l.remove();
              let { nextEl: e, prevEl: s } = t.navigation ? t.navigation : {};
              (e = T(e)),
                (s = T(s)),
                e && e.forEach((e) => e.removeEventListener("keydown", w)),
                s && s.forEach((e) => e.removeEventListener("keydown", w)),
                E() &&
                  T(t.pagination.el).forEach((e) => {
                    e.removeEventListener("keydown", w);
                  });
              i().removeEventListener("visibilitychange", C),
                t.el &&
                  "string" != typeof t.el &&
                  (t.el.removeEventListener("focus", L, !0),
                  t.el.removeEventListener("pointerdown", x, !0),
                  t.el.removeEventListener("pointerup", M, !0));
            })();
        });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: i } = e;
      s({
        history: {
          enabled: !1,
          root: "",
          replaceState: !1,
          key: "slides",
          keepQuery: !1,
        },
      });
      let a = !1,
        n = {};
      const l = (e) =>
          e
            .toString()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "")
            .replace(/--+/g, "-")
            .replace(/^-+/, "")
            .replace(/-+$/, ""),
        o = (e) => {
          const t = r();
          let s;
          s = e ? new URL(e) : t.location;
          const i = s.pathname
              .slice(1)
              .split("/")
              .filter((e) => "" !== e),
            a = i.length;
          return { key: i[a - 2], value: i[a - 1] };
        },
        d = (e, s) => {
          const i = r();
          if (!a || !t.params.history.enabled) return;
          let n;
          n = t.params.url ? new URL(t.params.url) : i.location;
          const o =
            t.virtual && t.params.virtual.enabled
              ? t.slidesEl.querySelector(`[data-swiper-slide-index="${s}"]`)
              : t.slides[s];
          let d = l(o.getAttribute("data-history"));
          if (t.params.history.root.length > 0) {
            let s = t.params.history.root;
            "/" === s[s.length - 1] && (s = s.slice(0, s.length - 1)),
              (d = `${s}/${e ? `${e}/` : ""}${d}`);
          } else n.pathname.includes(e) || (d = `${e ? `${e}/` : ""}${d}`);
          t.params.history.keepQuery && (d += n.search);
          const c = i.history.state;
          (c && c.value === d) ||
            (t.params.history.replaceState
              ? i.history.replaceState({ value: d }, null, d)
              : i.history.pushState({ value: d }, null, d));
        },
        c = (e, s, i) => {
          if (s)
            for (let a = 0, r = t.slides.length; a < r; a += 1) {
              const r = t.slides[a];
              if (l(r.getAttribute("data-history")) === s) {
                const s = t.getSlideIndex(r);
                t.slideTo(s, e, i);
              }
            }
          else t.slideTo(0, e, i);
        },
        p = () => {
          (n = o(t.params.url)), c(t.params.speed, n.value, !1);
        };
      i("init", () => {
        t.params.history.enabled &&
          (() => {
            const e = r();
            if (t.params.history) {
              if (!e.history || !e.history.pushState)
                return (
                  (t.params.history.enabled = !1),
                  void (t.params.hashNavigation.enabled = !0)
                );
              (a = !0),
                (n = o(t.params.url)),
                n.key || n.value
                  ? (c(0, n.value, t.params.runCallbacksOnInit),
                    t.params.history.replaceState ||
                      e.addEventListener("popstate", p))
                  : t.params.history.replaceState ||
                    e.addEventListener("popstate", p);
            }
          })();
      }),
        i("destroy", () => {
          t.params.history.enabled &&
            (() => {
              const e = r();
              t.params.history.replaceState ||
                e.removeEventListener("popstate", p);
            })();
        }),
        i("transitionEnd _freeModeNoMomentumRelease", () => {
          a && d(t.params.history.key, t.activeIndex);
        }),
        i("slideChange", () => {
          a && t.params.cssMode && d(t.params.history.key, t.activeIndex);
        });
    },
    function (e) {
      let { swiper: t, extendParams: s, emit: a, on: n } = e,
        l = !1;
      const o = i(),
        d = r();
      s({
        hashNavigation: {
          enabled: !1,
          replaceState: !1,
          watchState: !1,
          getSlideIndex(e, s) {
            if (t.virtual && t.params.virtual.enabled) {
              const e = t.slides.find((e) => e.getAttribute("data-hash") === s);
              if (!e) return 0;
              return parseInt(e.getAttribute("data-swiper-slide-index"), 10);
            }
            return t.getSlideIndex(
              f(
                t.slidesEl,
                `.${t.params.slideClass}[data-hash="${s}"], swiper-slide[data-hash="${s}"]`,
              )[0],
            );
          },
        },
      });
      const c = () => {
          a("hashChange");
          const e = o.location.hash.replace("#", ""),
            s =
              t.virtual && t.params.virtual.enabled
                ? t.slidesEl.querySelector(
                    `[data-swiper-slide-index="${t.activeIndex}"]`,
                  )
                : t.slides[t.activeIndex];
          if (e !== (s ? s.getAttribute("data-hash") : "")) {
            const s = t.params.hashNavigation.getSlideIndex(t, e);
            if (void 0 === s || Number.isNaN(s)) return;
            t.slideTo(s);
          }
        },
        p = () => {
          if (!l || !t.params.hashNavigation.enabled) return;
          const e =
              t.virtual && t.params.virtual.enabled
                ? t.slidesEl.querySelector(
                    `[data-swiper-slide-index="${t.activeIndex}"]`,
                  )
                : t.slides[t.activeIndex],
            s = e
              ? e.getAttribute("data-hash") || e.getAttribute("data-history")
              : "";
          t.params.hashNavigation.replaceState &&
          d.history &&
          d.history.replaceState
            ? (d.history.replaceState(null, null, `#${s}` || ""), a("hashSet"))
            : ((o.location.hash = s || ""), a("hashSet"));
        };
      n("init", () => {
        t.params.hashNavigation.enabled &&
          (() => {
            if (
              !t.params.hashNavigation.enabled ||
              (t.params.history && t.params.history.enabled)
            )
              return;
            l = !0;
            const e = o.location.hash.replace("#", "");
            if (e) {
              const s = 0,
                i = t.params.hashNavigation.getSlideIndex(t, e);
              t.slideTo(i || 0, s, t.params.runCallbacksOnInit, !0);
            }
            t.params.hashNavigation.watchState &&
              d.addEventListener("hashchange", c);
          })();
      }),
        n("destroy", () => {
          t.params.hashNavigation.enabled &&
            t.params.hashNavigation.watchState &&
            d.removeEventListener("hashchange", c);
        }),
        n("transitionEnd _freeModeNoMomentumRelease", () => {
          l && p();
        }),
        n("slideChange", () => {
          l && t.params.cssMode && p();
        });
    },
    function (e) {
      let t,
        s,
        { swiper: a, extendParams: r, on: n, emit: l, params: o } = e;
      (a.autoplay = { running: !1, paused: !1, timeLeft: 0 }),
        r({
          autoplay: {
            enabled: !1,
            delay: 3e3,
            waitForTransition: !0,
            disableOnInteraction: !1,
            stopOnLastSlide: !1,
            reverseDirection: !1,
            pauseOnMouseEnter: !1,
          },
        });
      let d,
        c,
        p,
        u,
        m,
        h,
        f,
        g,
        v = o && o.autoplay ? o.autoplay.delay : 3e3,
        w = o && o.autoplay ? o.autoplay.delay : 3e3,
        b = new Date().getTime();
      function y(e) {
        a &&
          !a.destroyed &&
          a.wrapperEl &&
          e.target === a.wrapperEl &&
          (a.wrapperEl.removeEventListener("transitionend", y),
          g || (e.detail && e.detail.bySwiperTouchMove) || C());
      }
      const E = () => {
          if (a.destroyed || !a.autoplay.running) return;
          a.autoplay.paused ? (c = !0) : c && ((w = d), (c = !1));
          const e = a.autoplay.paused ? d : b + w - new Date().getTime();
          (a.autoplay.timeLeft = e),
            l("autoplayTimeLeft", e, e / v),
            (s = requestAnimationFrame(() => {
              E();
            }));
        },
        S = (e) => {
          if (a.destroyed || !a.autoplay.running) return;
          cancelAnimationFrame(s), E();
          let i = void 0 === e ? a.params.autoplay.delay : e;
          (v = a.params.autoplay.delay), (w = a.params.autoplay.delay);
          const r = (() => {
            let e;
            if (
              ((e =
                a.virtual && a.params.virtual.enabled
                  ? a.slides.find((e) =>
                      e.classList.contains("swiper-slide-active"),
                    )
                  : a.slides[a.activeIndex]),
              !e)
            )
              return;
            return parseInt(e.getAttribute("data-swiper-autoplay"), 10);
          })();
          !Number.isNaN(r) &&
            r > 0 &&
            void 0 === e &&
            ((i = r), (v = r), (w = r)),
            (d = i);
          const n = a.params.speed,
            o = () => {
              a &&
                !a.destroyed &&
                (a.params.autoplay.reverseDirection
                  ? !a.isBeginning || a.params.loop || a.params.rewind
                    ? (a.slidePrev(n, !0, !0), l("autoplay"))
                    : a.params.autoplay.stopOnLastSlide ||
                      (a.slideTo(a.slides.length - 1, n, !0, !0), l("autoplay"))
                  : !a.isEnd || a.params.loop || a.params.rewind
                    ? (a.slideNext(n, !0, !0), l("autoplay"))
                    : a.params.autoplay.stopOnLastSlide ||
                      (a.slideTo(0, n, !0, !0), l("autoplay")),
                a.params.cssMode &&
                  ((b = new Date().getTime()),
                  requestAnimationFrame(() => {
                    S();
                  })));
            };
          return (
            i > 0
              ? (clearTimeout(t),
                (t = setTimeout(() => {
                  o();
                }, i)))
              : requestAnimationFrame(() => {
                  o();
                }),
            i
          );
        },
        x = () => {
          (b = new Date().getTime()),
            (a.autoplay.running = !0),
            S(),
            l("autoplayStart");
        },
        T = () => {
          (a.autoplay.running = !1),
            clearTimeout(t),
            cancelAnimationFrame(s),
            l("autoplayStop");
        },
        M = (e, s) => {
          if (a.destroyed || !a.autoplay.running) return;
          clearTimeout(t), e || (f = !0);
          const i = () => {
            l("autoplayPause"),
              a.params.autoplay.waitForTransition
                ? a.wrapperEl.addEventListener("transitionend", y)
                : C();
          };
          if (((a.autoplay.paused = !0), s))
            return h && (d = a.params.autoplay.delay), (h = !1), void i();
          const r = d || a.params.autoplay.delay;
          (d = r - (new Date().getTime() - b)),
            (a.isEnd && d < 0 && !a.params.loop) || (d < 0 && (d = 0), i());
        },
        C = () => {
          (a.isEnd && d < 0 && !a.params.loop) ||
            a.destroyed ||
            !a.autoplay.running ||
            ((b = new Date().getTime()),
            f ? ((f = !1), S(d)) : S(),
            (a.autoplay.paused = !1),
            l("autoplayResume"));
        },
        L = () => {
          if (a.destroyed || !a.autoplay.running) return;
          const e = i();
          "hidden" === e.visibilityState && ((f = !0), M(!0)),
            "visible" === e.visibilityState && C();
        },
        P = (e) => {
          "mouse" === e.pointerType &&
            ((f = !0), (g = !0), a.animating || a.autoplay.paused || M(!0));
        },
        O = (e) => {
          "mouse" === e.pointerType && ((g = !1), a.autoplay.paused && C());
        };
      n("init", () => {
        a.params.autoplay.enabled &&
          (a.params.autoplay.pauseOnMouseEnter &&
            (a.el.addEventListener("pointerenter", P),
            a.el.addEventListener("pointerleave", O)),
          i().addEventListener("visibilitychange", L),
          x());
      }),
        n("destroy", () => {
          a.el &&
            "string" != typeof a.el &&
            (a.el.removeEventListener("pointerenter", P),
            a.el.removeEventListener("pointerleave", O)),
            i().removeEventListener("visibilitychange", L),
            a.autoplay.running && T();
        }),
        n("_freeModeStaticRelease", () => {
          (u || f) && C();
        }),
        n("_freeModeNoMomentumRelease", () => {
          a.params.autoplay.disableOnInteraction ? T() : M(!0, !0);
        }),
        n("beforeTransitionStart", (e, t, s) => {
          !a.destroyed &&
            a.autoplay.running &&
            (s || !a.params.autoplay.disableOnInteraction ? M(!0, !0) : T());
        }),
        n("sliderFirstMove", () => {
          !a.destroyed &&
            a.autoplay.running &&
            (a.params.autoplay.disableOnInteraction
              ? T()
              : ((p = !0),
                (u = !1),
                (f = !1),
                (m = setTimeout(() => {
                  (f = !0), (u = !0), M(!0);
                }, 200))));
        }),
        n("touchEnd", () => {
          if (!a.destroyed && a.autoplay.running && p) {
            if (
              (clearTimeout(m),
              clearTimeout(t),
              a.params.autoplay.disableOnInteraction)
            )
              return (u = !1), void (p = !1);
            u && a.params.cssMode && C(), (u = !1), (p = !1);
          }
        }),
        n("slideChange", () => {
          !a.destroyed && a.autoplay.running && (h = !0);
        }),
        Object.assign(a.autoplay, { start: x, stop: T, pause: M, resume: C });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: a } = e;
      s({
        thumbs: {
          swiper: null,
          multipleActiveThumbs: !0,
          autoScrollOffset: 0,
          slideThumbActiveClass: "swiper-slide-thumb-active",
          thumbsContainerClass: "swiper-thumbs",
        },
      });
      let r = !1,
        n = !1;
      function l() {
        const e = t.thumbs.swiper;
        if (!e || e.destroyed) return;
        const s = e.clickedIndex,
          i = e.clickedSlide;
        if (i && i.classList.contains(t.params.thumbs.slideThumbActiveClass))
          return;
        if (null == s) return;
        let a;
        (a = e.params.loop
          ? parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"), 10)
          : s),
          t.params.loop ? t.slideToLoop(a) : t.slideTo(a);
      }
      function o() {
        const { thumbs: e } = t.params;
        if (r) return !1;
        r = !0;
        const s = t.constructor;
        if (e.swiper instanceof s) {
          if (e.swiper.destroyed) return (r = !1), !1;
          (t.thumbs.swiper = e.swiper),
            Object.assign(t.thumbs.swiper.originalParams, {
              watchSlidesProgress: !0,
              slideToClickedSlide: !1,
            }),
            Object.assign(t.thumbs.swiper.params, {
              watchSlidesProgress: !0,
              slideToClickedSlide: !1,
            }),
            t.thumbs.swiper.update();
        } else if (c(e.swiper)) {
          const i = Object.assign({}, e.swiper);
          Object.assign(i, {
            watchSlidesProgress: !0,
            slideToClickedSlide: !1,
          }),
            (t.thumbs.swiper = new s(i)),
            (n = !0);
        }
        return (
          t.thumbs.swiper.el.classList.add(
            t.params.thumbs.thumbsContainerClass,
          ),
          t.thumbs.swiper.on("tap", l),
          !0
        );
      }
      function d(e) {
        const s = t.thumbs.swiper;
        if (!s || s.destroyed) return;
        const i =
          "auto" === s.params.slidesPerView
            ? s.slidesPerViewDynamic()
            : s.params.slidesPerView;
        let a = 1;
        const r = t.params.thumbs.slideThumbActiveClass;
        if (
          (t.params.slidesPerView > 1 &&
            !t.params.centeredSlides &&
            (a = t.params.slidesPerView),
          t.params.thumbs.multipleActiveThumbs || (a = 1),
          (a = Math.floor(a)),
          s.slides.forEach((e) => e.classList.remove(r)),
          s.params.loop || (s.params.virtual && s.params.virtual.enabled))
        )
          for (let e = 0; e < a; e += 1)
            f(
              s.slidesEl,
              `[data-swiper-slide-index="${t.realIndex + e}"]`,
            ).forEach((e) => {
              e.classList.add(r);
            });
        else
          for (let e = 0; e < a; e += 1)
            s.slides[t.realIndex + e] &&
              s.slides[t.realIndex + e].classList.add(r);
        const n = t.params.thumbs.autoScrollOffset,
          l = n && !s.params.loop;
        if (t.realIndex !== s.realIndex || l) {
          const a = s.activeIndex;
          let r, o;
          if (s.params.loop) {
            const e = s.slides.find(
              (e) =>
                e.getAttribute("data-swiper-slide-index") === `${t.realIndex}`,
            );
            (r = s.slides.indexOf(e)),
              (o = t.activeIndex > t.previousIndex ? "next" : "prev");
          } else (r = t.realIndex), (o = r > t.previousIndex ? "next" : "prev");
          l && (r += "next" === o ? n : -1 * n),
            s.visibleSlidesIndexes &&
              s.visibleSlidesIndexes.indexOf(r) < 0 &&
              (s.params.centeredSlides
                ? (r =
                    r > a
                      ? r - Math.floor(i / 2) + 1
                      : r + Math.floor(i / 2) - 1)
                : r > a && s.params.slidesPerGroup,
              s.slideTo(r, e ? 0 : void 0));
        }
      }
      (t.thumbs = { swiper: null }),
        a("beforeInit", () => {
          const { thumbs: e } = t.params;
          if (e && e.swiper)
            if (
              "string" == typeof e.swiper ||
              e.swiper instanceof HTMLElement
            ) {
              const s = i(),
                a = () => {
                  const i =
                    "string" == typeof e.swiper
                      ? s.querySelector(e.swiper)
                      : e.swiper;
                  if (i && i.swiper) (e.swiper = i.swiper), o(), d(!0);
                  else if (i) {
                    const s = `${t.params.eventsPrefix}init`,
                      a = (r) => {
                        (e.swiper = r.detail[0]),
                          i.removeEventListener(s, a),
                          o(),
                          d(!0),
                          e.swiper.update(),
                          t.update();
                      };
                    i.addEventListener(s, a);
                  }
                  return i;
                },
                r = () => {
                  if (t.destroyed) return;
                  a() || requestAnimationFrame(r);
                };
              requestAnimationFrame(r);
            } else o(), d(!0);
        }),
        a("slideChange update resize observerUpdate", () => {
          d();
        }),
        a("setTransition", (e, s) => {
          const i = t.thumbs.swiper;
          i && !i.destroyed && i.setTransition(s);
        }),
        a("beforeDestroy", () => {
          const e = t.thumbs.swiper;
          e && !e.destroyed && n && e.destroy();
        }),
        Object.assign(t.thumbs, { init: o, update: d });
    },
    function (e) {
      let { swiper: t, extendParams: s, emit: i, once: a } = e;
      s({
        freeMode: {
          enabled: !1,
          momentum: !0,
          momentumRatio: 1,
          momentumBounce: !0,
          momentumBounceRatio: 1,
          momentumVelocityRatio: 1,
          sticky: !1,
          minimumVelocity: 0.02,
        },
      }),
        Object.assign(t, {
          freeMode: {
            onTouchStart: function () {
              if (t.params.cssMode) return;
              const e = t.getTranslate();
              t.setTranslate(e),
                t.setTransition(0),
                (t.touchEventsData.velocities.length = 0),
                t.freeMode.onTouchEnd({
                  currentPos: t.rtl ? t.translate : -t.translate,
                });
            },
            onTouchMove: function () {
              if (t.params.cssMode) return;
              const { touchEventsData: e, touches: s } = t;
              0 === e.velocities.length &&
                e.velocities.push({
                  position: s[t.isHorizontal() ? "startX" : "startY"],
                  time: e.touchStartTime,
                }),
                e.velocities.push({
                  position: s[t.isHorizontal() ? "currentX" : "currentY"],
                  time: o(),
                });
            },
            onTouchEnd: function (e) {
              let { currentPos: s } = e;
              if (t.params.cssMode) return;
              const {
                  params: r,
                  wrapperEl: n,
                  rtlTranslate: l,
                  snapGrid: d,
                  touchEventsData: c,
                } = t,
                p = o() - c.touchStartTime;
              if (s < -t.minTranslate()) t.slideTo(t.activeIndex);
              else if (s > -t.maxTranslate())
                t.slides.length < d.length
                  ? t.slideTo(d.length - 1)
                  : t.slideTo(t.slides.length - 1);
              else {
                if (r.freeMode.momentum) {
                  if (c.velocities.length > 1) {
                    const e = c.velocities.pop(),
                      s = c.velocities.pop(),
                      i = e.position - s.position,
                      a = e.time - s.time;
                    (t.velocity = i / a),
                      (t.velocity /= 2),
                      Math.abs(t.velocity) < r.freeMode.minimumVelocity &&
                        (t.velocity = 0),
                      (a > 150 || o() - e.time > 300) && (t.velocity = 0);
                  } else t.velocity = 0;
                  (t.velocity *= r.freeMode.momentumVelocityRatio),
                    (c.velocities.length = 0);
                  let e = 1e3 * r.freeMode.momentumRatio;
                  const s = t.velocity * e;
                  let p = t.translate + s;
                  l && (p = -p);
                  let u,
                    m = !1;
                  const h =
                    20 * Math.abs(t.velocity) * r.freeMode.momentumBounceRatio;
                  let f;
                  if (p < t.maxTranslate())
                    r.freeMode.momentumBounce
                      ? (p + t.maxTranslate() < -h &&
                          (p = t.maxTranslate() - h),
                        (u = t.maxTranslate()),
                        (m = !0),
                        (c.allowMomentumBounce = !0))
                      : (p = t.maxTranslate()),
                      r.loop && r.centeredSlides && (f = !0);
                  else if (p > t.minTranslate())
                    r.freeMode.momentumBounce
                      ? (p - t.minTranslate() > h && (p = t.minTranslate() + h),
                        (u = t.minTranslate()),
                        (m = !0),
                        (c.allowMomentumBounce = !0))
                      : (p = t.minTranslate()),
                      r.loop && r.centeredSlides && (f = !0);
                  else if (r.freeMode.sticky) {
                    let e;
                    for (let t = 0; t < d.length; t += 1)
                      if (d[t] > -p) {
                        e = t;
                        break;
                      }
                    (p =
                      Math.abs(d[e] - p) < Math.abs(d[e - 1] - p) ||
                      "next" === t.swipeDirection
                        ? d[e]
                        : d[e - 1]),
                      (p = -p);
                  }
                  if (
                    (f &&
                      a("transitionEnd", () => {
                        t.loopFix();
                      }),
                    0 !== t.velocity)
                  ) {
                    if (
                      ((e = l
                        ? Math.abs((-p - t.translate) / t.velocity)
                        : Math.abs((p - t.translate) / t.velocity)),
                      r.freeMode.sticky)
                    ) {
                      const s = Math.abs((l ? -p : p) - t.translate),
                        i = t.slidesSizesGrid[t.activeIndex];
                      e =
                        s < i
                          ? r.speed
                          : s < 2 * i
                            ? 1.5 * r.speed
                            : 2.5 * r.speed;
                    }
                  } else if (r.freeMode.sticky) return void t.slideToClosest();
                  r.freeMode.momentumBounce && m
                    ? (t.updateProgress(u),
                      t.setTransition(e),
                      t.setTranslate(p),
                      t.transitionStart(!0, t.swipeDirection),
                      (t.animating = !0),
                      S(n, () => {
                        t &&
                          !t.destroyed &&
                          c.allowMomentumBounce &&
                          (i("momentumBounce"),
                          t.setTransition(r.speed),
                          setTimeout(() => {
                            t.setTranslate(u),
                              S(n, () => {
                                t && !t.destroyed && t.transitionEnd();
                              });
                          }, 0));
                      }))
                    : t.velocity
                      ? (i("_freeModeNoMomentumRelease"),
                        t.updateProgress(p),
                        t.setTransition(e),
                        t.setTranslate(p),
                        t.transitionStart(!0, t.swipeDirection),
                        t.animating ||
                          ((t.animating = !0),
                          S(n, () => {
                            t && !t.destroyed && t.transitionEnd();
                          })))
                      : t.updateProgress(p),
                    t.updateActiveIndex(),
                    t.updateSlidesClasses();
                } else {
                  if (r.freeMode.sticky) return void t.slideToClosest();
                  r.freeMode && i("_freeModeNoMomentumRelease");
                }
                (!r.freeMode.momentum || p >= r.longSwipesMs) &&
                  (i("_freeModeStaticRelease"),
                  t.updateProgress(),
                  t.updateActiveIndex(),
                  t.updateSlidesClasses());
              }
            },
          },
        });
    },
    function (e) {
      let t,
        s,
        i,
        a,
        { swiper: r, extendParams: n, on: l } = e;
      n({ grid: { rows: 1, fill: "column" } });
      const o = () => {
        let e = r.params.spaceBetween;
        return (
          "string" == typeof e && e.indexOf("%") >= 0
            ? (e = (parseFloat(e.replace("%", "")) / 100) * r.size)
            : "string" == typeof e && (e = parseFloat(e)),
          e
        );
      };
      l("init", () => {
        a = r.params.grid && r.params.grid.rows > 1;
      }),
        l("update", () => {
          const { params: e, el: t } = r,
            s = e.grid && e.grid.rows > 1;
          a && !s
            ? (t.classList.remove(
                `${e.containerModifierClass}grid`,
                `${e.containerModifierClass}grid-column`,
              ),
              (i = 1),
              r.emitContainerClasses())
            : !a &&
              s &&
              (t.classList.add(`${e.containerModifierClass}grid`),
              "column" === e.grid.fill &&
                t.classList.add(`${e.containerModifierClass}grid-column`),
              r.emitContainerClasses()),
            (a = s);
        }),
        (r.grid = {
          initSlides: (e) => {
            const { slidesPerView: a } = r.params,
              { rows: n, fill: l } = r.params.grid,
              o =
                r.virtual && r.params.virtual.enabled
                  ? r.virtual.slides.length
                  : e.length;
            (i = Math.floor(o / n)),
              (t = Math.floor(o / n) === o / n ? o : Math.ceil(o / n) * n),
              "auto" !== a && "row" === l && (t = Math.max(t, a * n)),
              (s = t / n);
          },
          unsetSlides: () => {
            r.slides &&
              r.slides.forEach((e) => {
                e.swiperSlideGridSet &&
                  ((e.style.height = ""),
                  (e.style[r.getDirectionLabel("margin-top")] = ""));
              });
          },
          updateSlide: (e, a, n) => {
            const { slidesPerGroup: l } = r.params,
              d = o(),
              { rows: c, fill: p } = r.params.grid,
              u =
                r.virtual && r.params.virtual.enabled
                  ? r.virtual.slides.length
                  : n.length;
            let m, h, f;
            if ("row" === p && l > 1) {
              const s = Math.floor(e / (l * c)),
                i = e - c * l * s,
                r = 0 === s ? l : Math.min(Math.ceil((u - s * c * l) / c), l);
              (f = Math.floor(i / r)),
                (h = i - f * r + s * l),
                (m = h + (f * t) / c),
                (a.style.order = m);
            } else
              "column" === p
                ? ((h = Math.floor(e / c)),
                  (f = e - h * c),
                  (h > i || (h === i && f === c - 1)) &&
                    ((f += 1), f >= c && ((f = 0), (h += 1))))
                : ((f = Math.floor(e / s)), (h = e - f * s));
            (a.row = f),
              (a.column = h),
              (a.style.height = `calc((100% - ${(c - 1) * d}px) / ${c})`),
              (a.style[r.getDirectionLabel("margin-top")] =
                0 !== f ? d && `${d}px` : ""),
              (a.swiperSlideGridSet = !0);
          },
          updateWrapperSize: (e, s) => {
            const { centeredSlides: i, roundLengths: a } = r.params,
              n = o(),
              { rows: l } = r.params.grid;
            if (
              ((r.virtualSize = (e + n) * t),
              (r.virtualSize = Math.ceil(r.virtualSize / l) - n),
              r.params.cssMode ||
                (r.wrapperEl.style[r.getDirectionLabel("width")] =
                  `${r.virtualSize + n}px`),
              i)
            ) {
              const e = [];
              for (let t = 0; t < s.length; t += 1) {
                let i = s[t];
                a && (i = Math.floor(i)),
                  s[t] < r.virtualSize + s[0] && e.push(i);
              }
              s.splice(0, s.length), s.push(...e);
            }
          },
        });
    },
    function (e) {
      let { swiper: t } = e;
      Object.assign(t, {
        appendSlide: le.bind(t),
        prependSlide: oe.bind(t),
        addSlide: de.bind(t),
        removeSlide: ce.bind(t),
        removeAllSlides: pe.bind(t),
      });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: i } = e;
      s({ fadeEffect: { crossFade: !1 } }),
        ue({
          effect: "fade",
          swiper: t,
          on: i,
          setTranslate: () => {
            const { slides: e } = t;
            t.params.fadeEffect;
            for (let s = 0; s < e.length; s += 1) {
              const e = t.slides[s];
              let i = -e.swiperSlideOffset;
              t.params.virtualTranslate || (i -= t.translate);
              let a = 0;
              t.isHorizontal() || ((a = i), (i = 0));
              const r = t.params.fadeEffect.crossFade
                  ? Math.max(1 - Math.abs(e.progress), 0)
                  : 1 + Math.min(Math.max(e.progress, -1), 0),
                n = me(0, e);
              (n.style.opacity = r),
                (n.style.transform = `translate3d(${i}px, ${a}px, 0px)`);
            }
          },
          setTransition: (e) => {
            const s = t.slides.map((e) => h(e));
            s.forEach((t) => {
              t.style.transitionDuration = `${e}ms`;
            }),
              he({
                swiper: t,
                duration: e,
                transformElements: s,
                allSlides: !0,
              });
          },
          overwriteParams: () => ({
            slidesPerView: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: !0,
            spaceBetween: 0,
            virtualTranslate: !t.params.cssMode,
          }),
        });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: i } = e;
      s({
        cubeEffect: {
          slideShadows: !0,
          shadow: !0,
          shadowOffset: 20,
          shadowScale: 0.94,
        },
      });
      const a = (e, t, s) => {
        let i = s
            ? e.querySelector(".swiper-slide-shadow-left")
            : e.querySelector(".swiper-slide-shadow-top"),
          a = s
            ? e.querySelector(".swiper-slide-shadow-right")
            : e.querySelector(".swiper-slide-shadow-bottom");
        i ||
          ((i = v(
            "div",
            (
              "swiper-slide-shadow-cube swiper-slide-shadow-" +
              (s ? "left" : "top")
            ).split(" "),
          )),
          e.append(i)),
          a ||
            ((a = v(
              "div",
              (
                "swiper-slide-shadow-cube swiper-slide-shadow-" +
                (s ? "right" : "bottom")
              ).split(" "),
            )),
            e.append(a)),
          i && (i.style.opacity = Math.max(-t, 0)),
          a && (a.style.opacity = Math.max(t, 0));
      };
      ue({
        effect: "cube",
        swiper: t,
        on: i,
        setTranslate: () => {
          const {
              el: e,
              wrapperEl: s,
              slides: i,
              width: r,
              height: n,
              rtlTranslate: l,
              size: o,
              browser: d,
            } = t,
            c = M(t),
            p = t.params.cubeEffect,
            u = t.isHorizontal(),
            m = t.virtual && t.params.virtual.enabled;
          let h,
            f = 0;
          p.shadow &&
            (u
              ? ((h = t.wrapperEl.querySelector(".swiper-cube-shadow")),
                h ||
                  ((h = v("div", "swiper-cube-shadow")), t.wrapperEl.append(h)),
                (h.style.height = `${r}px`))
              : ((h = e.querySelector(".swiper-cube-shadow")),
                h || ((h = v("div", "swiper-cube-shadow")), e.append(h))));
          for (let e = 0; e < i.length; e += 1) {
            const t = i[e];
            let s = e;
            m && (s = parseInt(t.getAttribute("data-swiper-slide-index"), 10));
            let r = 90 * s,
              n = Math.floor(r / 360);
            l && ((r = -r), (n = Math.floor(-r / 360)));
            const d = Math.max(Math.min(t.progress, 1), -1);
            let h = 0,
              g = 0,
              v = 0;
            s % 4 == 0
              ? ((h = 4 * -n * o), (v = 0))
              : (s - 1) % 4 == 0
                ? ((h = 0), (v = 4 * -n * o))
                : (s - 2) % 4 == 0
                  ? ((h = o + 4 * n * o), (v = o))
                  : (s - 3) % 4 == 0 && ((h = -o), (v = 3 * o + 4 * o * n)),
              l && (h = -h),
              u || ((g = h), (h = 0));
            const w = `rotateX(${c(u ? 0 : -r)}deg) rotateY(${c(u ? r : 0)}deg) translate3d(${h}px, ${g}px, ${v}px)`;
            d <= 1 &&
              d > -1 &&
              ((f = 90 * s + 90 * d), l && (f = 90 * -s - 90 * d)),
              (t.style.transform = w),
              p.slideShadows && a(t, d, u);
          }
          if (
            ((s.style.transformOrigin = `50% 50% -${o / 2}px`),
            (s.style["-webkit-transform-origin"] = `50% 50% -${o / 2}px`),
            p.shadow)
          )
            if (u)
              h.style.transform = `translate3d(0px, ${r / 2 + p.shadowOffset}px, ${-r / 2}px) rotateX(89.99deg) rotateZ(0deg) scale(${p.shadowScale})`;
            else {
              const e = Math.abs(f) - 90 * Math.floor(Math.abs(f) / 90),
                t =
                  1.5 -
                  (Math.sin((2 * e * Math.PI) / 360) / 2 +
                    Math.cos((2 * e * Math.PI) / 360) / 2),
                s = p.shadowScale,
                i = p.shadowScale / t,
                a = p.shadowOffset;
              h.style.transform = `scale3d(${s}, 1, ${i}) translate3d(0px, ${n / 2 + a}px, ${-n / 2 / i}px) rotateX(-89.99deg)`;
            }
          const g =
            (d.isSafari || d.isWebView) && d.needPerspectiveFix ? -o / 2 : 0;
          (s.style.transform = `translate3d(0px,0,${g}px) rotateX(${c(t.isHorizontal() ? 0 : f)}deg) rotateY(${c(t.isHorizontal() ? -f : 0)}deg)`),
            s.style.setProperty("--swiper-cube-translate-z", `${g}px`);
        },
        setTransition: (e) => {
          const { el: s, slides: i } = t;
          if (
            (i.forEach((t) => {
              (t.style.transitionDuration = `${e}ms`),
                t
                  .querySelectorAll(
                    ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left",
                  )
                  .forEach((t) => {
                    t.style.transitionDuration = `${e}ms`;
                  });
            }),
            t.params.cubeEffect.shadow && !t.isHorizontal())
          ) {
            const t = s.querySelector(".swiper-cube-shadow");
            t && (t.style.transitionDuration = `${e}ms`);
          }
        },
        recreateShadows: () => {
          const e = t.isHorizontal();
          t.slides.forEach((t) => {
            const s = Math.max(Math.min(t.progress, 1), -1);
            a(t, s, e);
          });
        },
        getEffectParams: () => t.params.cubeEffect,
        perspective: () => !0,
        overwriteParams: () => ({
          slidesPerView: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: !0,
          resistanceRatio: 0,
          spaceBetween: 0,
          centeredSlides: !1,
          virtualTranslate: !0,
        }),
      });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: i } = e;
      s({ flipEffect: { slideShadows: !0, limitRotation: !0 } });
      const a = (e, s) => {
        let i = t.isHorizontal()
            ? e.querySelector(".swiper-slide-shadow-left")
            : e.querySelector(".swiper-slide-shadow-top"),
          a = t.isHorizontal()
            ? e.querySelector(".swiper-slide-shadow-right")
            : e.querySelector(".swiper-slide-shadow-bottom");
        i || (i = fe("flip", e, t.isHorizontal() ? "left" : "top")),
          a || (a = fe("flip", e, t.isHorizontal() ? "right" : "bottom")),
          i && (i.style.opacity = Math.max(-s, 0)),
          a && (a.style.opacity = Math.max(s, 0));
      };
      ue({
        effect: "flip",
        swiper: t,
        on: i,
        setTranslate: () => {
          const { slides: e, rtlTranslate: s } = t,
            i = t.params.flipEffect,
            r = M(t);
          for (let n = 0; n < e.length; n += 1) {
            const l = e[n];
            let o = l.progress;
            t.params.flipEffect.limitRotation &&
              (o = Math.max(Math.min(l.progress, 1), -1));
            const d = l.swiperSlideOffset;
            let c = -180 * o,
              p = 0,
              u = t.params.cssMode ? -d - t.translate : -d,
              m = 0;
            t.isHorizontal()
              ? s && (c = -c)
              : ((m = u), (u = 0), (p = -c), (c = 0)),
              (l.style.zIndex = -Math.abs(Math.round(o)) + e.length),
              i.slideShadows && a(l, o);
            const h = `translate3d(${u}px, ${m}px, 0px) rotateX(${r(p)}deg) rotateY(${r(c)}deg)`;
            me(0, l).style.transform = h;
          }
        },
        setTransition: (e) => {
          const s = t.slides.map((e) => h(e));
          s.forEach((t) => {
            (t.style.transitionDuration = `${e}ms`),
              t
                .querySelectorAll(
                  ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left",
                )
                .forEach((t) => {
                  t.style.transitionDuration = `${e}ms`;
                });
          }),
            he({ swiper: t, duration: e, transformElements: s });
        },
        recreateShadows: () => {
          t.params.flipEffect,
            t.slides.forEach((e) => {
              let s = e.progress;
              t.params.flipEffect.limitRotation &&
                (s = Math.max(Math.min(e.progress, 1), -1)),
                a(e, s);
            });
        },
        getEffectParams: () => t.params.flipEffect,
        perspective: () => !0,
        overwriteParams: () => ({
          slidesPerView: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: !0,
          spaceBetween: 0,
          virtualTranslate: !t.params.cssMode,
        }),
      });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: i } = e;
      s({
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          scale: 1,
          modifier: 1,
          slideShadows: !0,
        },
      }),
        ue({
          effect: "coverflow",
          swiper: t,
          on: i,
          setTranslate: () => {
            const { width: e, height: s, slides: i, slidesSizesGrid: a } = t,
              r = t.params.coverflowEffect,
              n = t.isHorizontal(),
              l = t.translate,
              o = n ? e / 2 - l : s / 2 - l,
              d = n ? r.rotate : -r.rotate,
              c = r.depth,
              p = M(t);
            for (let e = 0, t = i.length; e < t; e += 1) {
              const t = i[e],
                s = a[e],
                l = (o - t.swiperSlideOffset - s / 2) / s,
                u =
                  "function" == typeof r.modifier
                    ? r.modifier(l)
                    : l * r.modifier;
              let m = n ? d * u : 0,
                h = n ? 0 : d * u,
                f = -c * Math.abs(u),
                g = r.stretch;
              "string" == typeof g &&
                -1 !== g.indexOf("%") &&
                (g = (parseFloat(r.stretch) / 100) * s);
              let v = n ? 0 : g * u,
                w = n ? g * u : 0,
                b = 1 - (1 - r.scale) * Math.abs(u);
              Math.abs(w) < 0.001 && (w = 0),
                Math.abs(v) < 0.001 && (v = 0),
                Math.abs(f) < 0.001 && (f = 0),
                Math.abs(m) < 0.001 && (m = 0),
                Math.abs(h) < 0.001 && (h = 0),
                Math.abs(b) < 0.001 && (b = 0);
              const y = `translate3d(${w}px,${v}px,${f}px)  rotateX(${p(h)}deg) rotateY(${p(m)}deg) scale(${b})`;
              if (
                ((me(0, t).style.transform = y),
                (t.style.zIndex = 1 - Math.abs(Math.round(u))),
                r.slideShadows)
              ) {
                let e = n
                    ? t.querySelector(".swiper-slide-shadow-left")
                    : t.querySelector(".swiper-slide-shadow-top"),
                  s = n
                    ? t.querySelector(".swiper-slide-shadow-right")
                    : t.querySelector(".swiper-slide-shadow-bottom");
                e || (e = fe("coverflow", t, n ? "left" : "top")),
                  s || (s = fe("coverflow", t, n ? "right" : "bottom")),
                  e && (e.style.opacity = u > 0 ? u : 0),
                  s && (s.style.opacity = -u > 0 ? -u : 0);
              }
            }
          },
          setTransition: (e) => {
            t.slides
              .map((e) => h(e))
              .forEach((t) => {
                (t.style.transitionDuration = `${e}ms`),
                  t
                    .querySelectorAll(
                      ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left",
                    )
                    .forEach((t) => {
                      t.style.transitionDuration = `${e}ms`;
                    });
              });
          },
          perspective: () => !0,
          overwriteParams: () => ({ watchSlidesProgress: !0 }),
        });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: i } = e;
      s({
        creativeEffect: {
          limitProgress: 1,
          shadowPerProgress: !1,
          progressMultiplier: 1,
          perspective: !0,
          prev: {
            translate: [0, 0, 0],
            rotate: [0, 0, 0],
            opacity: 1,
            scale: 1,
          },
          next: {
            translate: [0, 0, 0],
            rotate: [0, 0, 0],
            opacity: 1,
            scale: 1,
          },
        },
      });
      const a = (e) => ("string" == typeof e ? e : `${e}px`);
      ue({
        effect: "creative",
        swiper: t,
        on: i,
        setTranslate: () => {
          const { slides: e, wrapperEl: s, slidesSizesGrid: i } = t,
            r = t.params.creativeEffect,
            { progressMultiplier: n } = r,
            l = t.params.centeredSlides,
            o = M(t);
          if (l) {
            const e = i[0] / 2 - t.params.slidesOffsetBefore || 0;
            s.style.transform = `translateX(calc(50% - ${e}px))`;
          }
          for (let s = 0; s < e.length; s += 1) {
            const i = e[s],
              d = i.progress,
              c = Math.min(
                Math.max(i.progress, -r.limitProgress),
                r.limitProgress,
              );
            let p = c;
            l ||
              (p = Math.min(
                Math.max(i.originalProgress, -r.limitProgress),
                r.limitProgress,
              ));
            const u = i.swiperSlideOffset,
              m = [t.params.cssMode ? -u - t.translate : -u, 0, 0],
              h = [0, 0, 0];
            let f = !1;
            t.isHorizontal() || ((m[1] = m[0]), (m[0] = 0));
            let g = {
              translate: [0, 0, 0],
              rotate: [0, 0, 0],
              scale: 1,
              opacity: 1,
            };
            c < 0
              ? ((g = r.next), (f = !0))
              : c > 0 && ((g = r.prev), (f = !0)),
              m.forEach((e, t) => {
                m[t] =
                  `calc(${e}px + (${a(g.translate[t])} * ${Math.abs(c * n)}))`;
              }),
              h.forEach((e, t) => {
                let s = g.rotate[t] * Math.abs(c * n);
                h[t] = s;
              }),
              (i.style.zIndex = -Math.abs(Math.round(d)) + e.length);
            const v = m.join(", "),
              w = `rotateX(${o(h[0])}deg) rotateY(${o(h[1])}deg) rotateZ(${o(h[2])}deg)`,
              b =
                p < 0
                  ? `scale(${1 + (1 - g.scale) * p * n})`
                  : `scale(${1 - (1 - g.scale) * p * n})`,
              y =
                p < 0
                  ? 1 + (1 - g.opacity) * p * n
                  : 1 - (1 - g.opacity) * p * n,
              E = `translate3d(${v}) ${w} ${b}`;
            if ((f && g.shadow) || !f) {
              let e = i.querySelector(".swiper-slide-shadow");
              if ((!e && g.shadow && (e = fe("creative", i)), e)) {
                const t = r.shadowPerProgress ? c * (1 / r.limitProgress) : c;
                e.style.opacity = Math.min(Math.max(Math.abs(t), 0), 1);
              }
            }
            const S = me(0, i);
            (S.style.transform = E),
              (S.style.opacity = y),
              g.origin && (S.style.transformOrigin = g.origin);
          }
        },
        setTransition: (e) => {
          const s = t.slides.map((e) => h(e));
          s.forEach((t) => {
            (t.style.transitionDuration = `${e}ms`),
              t.querySelectorAll(".swiper-slide-shadow").forEach((t) => {
                t.style.transitionDuration = `${e}ms`;
              });
          }),
            he({ swiper: t, duration: e, transformElements: s, allSlides: !0 });
        },
        perspective: () => t.params.creativeEffect.perspective,
        overwriteParams: () => ({
          watchSlidesProgress: !0,
          virtualTranslate: !t.params.cssMode,
        }),
      });
    },
    function (e) {
      let { swiper: t, extendParams: s, on: i } = e;
      s({
        cardsEffect: {
          slideShadows: !0,
          rotate: !0,
          perSlideRotate: 2,
          perSlideOffset: 8,
        },
      }),
        ue({
          effect: "cards",
          swiper: t,
          on: i,
          setTranslate: () => {
            const { slides: e, activeIndex: s, rtlTranslate: i } = t,
              a = t.params.cardsEffect,
              { startTranslate: r, isTouched: n } = t.touchEventsData,
              l = i ? -t.translate : t.translate;
            for (let o = 0; o < e.length; o += 1) {
              const d = e[o],
                c = d.progress,
                p = Math.min(Math.max(c, -4), 4);
              let u = d.swiperSlideOffset;
              t.params.centeredSlides &&
                !t.params.cssMode &&
                (t.wrapperEl.style.transform = `translateX(${t.minTranslate()}px)`),
                t.params.centeredSlides &&
                  t.params.cssMode &&
                  (u -= e[0].swiperSlideOffset);
              let m = t.params.cssMode ? -u - t.translate : -u,
                h = 0;
              const f = -100 * Math.abs(p);
              let g = 1,
                v = -a.perSlideRotate * p,
                w = a.perSlideOffset - 0.75 * Math.abs(p);
              const b =
                  t.virtual && t.params.virtual.enabled
                    ? t.virtual.from + o
                    : o,
                y =
                  (b === s || b === s - 1) &&
                  p > 0 &&
                  p < 1 &&
                  (n || t.params.cssMode) &&
                  l < r,
                E =
                  (b === s || b === s + 1) &&
                  p < 0 &&
                  p > -1 &&
                  (n || t.params.cssMode) &&
                  l > r;
              if (y || E) {
                const e = (1 - Math.abs((Math.abs(p) - 0.5) / 0.5)) ** 0.5;
                (v += -28 * p * e),
                  (g += -0.5 * e),
                  (w += 96 * e),
                  (h = -25 * e * Math.abs(p) + "%");
              }
              if (
                ((m =
                  p < 0
                    ? `calc(${m}px ${i ? "-" : "+"} (${w * Math.abs(p)}%))`
                    : p > 0
                      ? `calc(${m}px ${i ? "-" : "+"} (-${w * Math.abs(p)}%))`
                      : `${m}px`),
                !t.isHorizontal())
              ) {
                const e = h;
                (h = m), (m = e);
              }
              const S = p < 0 ? "" + (1 + (1 - g) * p) : "" + (1 - (1 - g) * p),
                x = `\n        translate3d(${m}, ${h}, ${f}px)\n        rotateZ(${a.rotate ? (i ? -v : v) : 0}deg)\n        scale(${S})\n      `;
              if (a.slideShadows) {
                let e = d.querySelector(".swiper-slide-shadow");
                e || (e = fe("cards", d)),
                  e &&
                    (e.style.opacity = Math.min(
                      Math.max((Math.abs(p) - 0.5) / 0.5, 0),
                      1,
                    ));
              }
              d.style.zIndex = -Math.abs(Math.round(c)) + e.length;
              me(0, d).style.transform = x;
            }
          },
          setTransition: (e) => {
            const s = t.slides.map((e) => h(e));
            s.forEach((t) => {
              (t.style.transitionDuration = `${e}ms`),
                t.querySelectorAll(".swiper-slide-shadow").forEach((t) => {
                  t.style.transitionDuration = `${e}ms`;
                });
            }),
              he({ swiper: t, duration: e, transformElements: s });
          },
          perspective: () => !0,
          overwriteParams: () => ({
            _loopSwapReset: !1,
            watchSlidesProgress: !0,
            loopAdditionalSlides: t.params.cardsEffect.rotate ? 3 : 2,
            centeredSlides: !0,
            virtualTranslate: !t.params.cssMode,
          }),
        });
    },
  ];
  ae.use(ge),
    window.addEventListener("load", function (e) {
      document.querySelector(".swiper") &&
        new ae(".swiper", {
          observer: !0,
          observeParents: !0,
          slidesPerView: 1,
          spaceBetween: 50,
          autoHeight: !0,
          speed: 200,
          slidesOffsetAfter: 0,
          slidesOffsetBefore: 0,
          loop: !0,
          lazy: !0,
          navigation: {
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          },
          breakpoints: {
            320: { slidesPerView: 1, spaceBetween: 0, autoHeight: !0 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            992: { slidesPerView: 3, spaceBetween: 20 },
            1460: { slidesPerView: 5, spaceBetween: 30 },
          },
          on: {},
        });
    });
  let ve = !0,
    we = (e = 500) => {
      let t = document.querySelector("body");
      if (ve) {
        let s = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let e = 0; e < s.length; e++) {
            s[e].style.paddingRight = "0px";
          }
          (t.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, e),
          (ve = !1),
          setTimeout(function () {
            ve = !0;
          }, e);
      }
    },
    be = (e = 500) => {
      let t = document.querySelector("body");
      if (ve) {
        let s = document.querySelectorAll("[data-lp]");
        for (let e = 0; e < s.length; e++) {
          s[e].style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px";
        }
        (t.style.paddingRight =
          window.innerWidth -
          document.querySelector(".wrapper").offsetWidth +
          "px"),
          document.documentElement.classList.add("lock"),
          (ve = !1),
          setTimeout(function () {
            ve = !0;
          }, e);
      }
    };
  new (class {
    constructor(e) {
      let t = {
        logging: !0,
        init: !0,
        attributeOpenButton: "data-popup",
        attributeCloseButton: "data-close",
        fixElementSelector: "[data-lp]",
        youtubeAttribute: "data-popup-youtube",
        youtubePlaceAttribute: "data-popup-youtube-place",
        setAutoplayYoutube: !0,
        classes: {
          popup: "popup",
          popupWrapper: "popup__wrapper",
          popupContent: "popup__content",
          popupActive: "popup_show",
          bodyActive: "popup-show",
        },
        focusCatch: !0,
        closeEsc: !0,
        bodyLock: !0,
        hashSettings: { location: !0, goHash: !0 },
        on: {
          beforeOpen: function () {},
          afterOpen: function () {},
          beforeClose: function () {},
          afterClose: function () {},
        },
      };
      this.youTubeCode,
        (this.isOpen = !1),
        (this.targetOpen = { selector: !1, element: !1 }),
        (this.previousOpen = { selector: !1, element: !1 }),
        (this.lastClosed = { selector: !1, element: !1 }),
        (this._dataValue = !1),
        (this.hash = !1),
        (this._reopen = !1),
        (this._selectorOpen = !1),
        (this.lastFocusEl = !1),
        (this._focusEl = [
          "a[href]",
          'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
          "button:not([disabled]):not([aria-hidden])",
          "select:not([disabled]):not([aria-hidden])",
          "textarea:not([disabled]):not([aria-hidden])",
          "area[href]",
          "iframe",
          "object",
          "embed",
          "[contenteditable]",
          '[tabindex]:not([tabindex^="-"])',
        ]),
        (this.options = {
          ...t,
          ...e,
          classes: { ...t.classes, ...e?.classes },
          hashSettings: { ...t.hashSettings, ...e?.hashSettings },
          on: { ...t.on, ...e?.on },
        }),
        (this.bodyLock = !1),
        this.options.init && this.initPopups();
    }
    initPopups() {
      this.popupLogging("Проснулся"), this.eventsPopup();
    }
    eventsPopup() {
      document.addEventListener(
        "click",
        function (e) {
          const t = e.target.closest(`[${this.options.attributeOpenButton}]`);
          if (t)
            return (
              e.preventDefault(),
              (this._dataValue = t.getAttribute(
                this.options.attributeOpenButton,
              )
                ? t.getAttribute(this.options.attributeOpenButton)
                : "error"),
              (this.youTubeCode = t.getAttribute(this.options.youtubeAttribute)
                ? t.getAttribute(this.options.youtubeAttribute)
                : null),
              "error" !== this._dataValue
                ? (this.isOpen || (this.lastFocusEl = t),
                  (this.targetOpen.selector = `${this._dataValue}`),
                  (this._selectorOpen = !0),
                  void this.open())
                : void this.popupLogging(
                    `Ой ой, не заполнен атрибут у ${t.classList}`,
                  )
            );
          return e.target.closest(`[${this.options.attributeCloseButton}]`) ||
            (!e.target.closest(`.${this.options.classes.popupContent}`) &&
              this.isOpen)
            ? (e.preventDefault(), void this.close())
            : void 0;
        }.bind(this),
      ),
        document.addEventListener(
          "keydown",
          function (e) {
            if (
              this.options.closeEsc &&
              27 == e.which &&
              "Escape" === e.code &&
              this.isOpen
            )
              return e.preventDefault(), void this.close();
            this.options.focusCatch &&
              9 == e.which &&
              this.isOpen &&
              this._focusCatch(e);
          }.bind(this),
        ),
        this.options.hashSettings.goHash &&
          (window.addEventListener(
            "hashchange",
            function () {
              window.location.hash
                ? this._openToHash()
                : this.close(this.targetOpen.selector);
            }.bind(this),
          ),
          window.addEventListener(
            "load",
            function () {
              window.location.hash && this._openToHash();
            }.bind(this),
          ));
    }
    open(e) {
      if (ve)
        if (
          ((this.bodyLock = !(
            !document.documentElement.classList.contains("lock") || this.isOpen
          )),
          e &&
            "string" == typeof e &&
            "" !== e.trim() &&
            ((this.targetOpen.selector = e), (this._selectorOpen = !0)),
          this.isOpen && ((this._reopen = !0), this.close()),
          this._selectorOpen ||
            (this.targetOpen.selector = this.lastClosed.selector),
          this._reopen || (this.previousActiveElement = document.activeElement),
          (this.targetOpen.element = document.querySelector(
            this.targetOpen.selector,
          )),
          this.targetOpen.element)
        ) {
          if (this.youTubeCode) {
            const e = `https://www.youtube.com/embed/${this.youTubeCode}?rel=0&showinfo=0&autoplay=1`,
              t = document.createElement("iframe");
            t.setAttribute("allowfullscreen", "");
            const s = this.options.setAutoplayYoutube ? "autoplay;" : "";
            if (
              (t.setAttribute("allow", `${s}; encrypted-media`),
              t.setAttribute("src", e),
              !this.targetOpen.element.querySelector(
                `[${this.options.youtubePlaceAttribute}]`,
              ))
            ) {
              this.targetOpen.element
                .querySelector(".popup__text")
                .setAttribute(`${this.options.youtubePlaceAttribute}`, "");
            }
            this.targetOpen.element
              .querySelector(`[${this.options.youtubePlaceAttribute}]`)
              .appendChild(t);
          }
          this.options.hashSettings.location &&
            (this._getHash(), this._setHash()),
            this.options.on.beforeOpen(this),
            document.dispatchEvent(
              new CustomEvent("beforePopupOpen", { detail: { popup: this } }),
            ),
            this.targetOpen.element.classList.add(
              this.options.classes.popupActive,
            ),
            document.documentElement.classList.add(
              this.options.classes.bodyActive,
            ),
            this._reopen ? (this._reopen = !1) : !this.bodyLock && be(),
            this.targetOpen.element.setAttribute("aria-hidden", "false"),
            (this.previousOpen.selector = this.targetOpen.selector),
            (this.previousOpen.element = this.targetOpen.element),
            (this._selectorOpen = !1),
            (this.isOpen = !0),
            setTimeout(() => {
              this._focusTrap();
            }, 50),
            this.options.on.afterOpen(this),
            document.dispatchEvent(
              new CustomEvent("afterPopupOpen", { detail: { popup: this } }),
            ),
            this.popupLogging("Открыл попап");
        } else
          this.popupLogging(
            "Ой ой, такого попапа нет.Проверьте корректность ввода. ",
          );
    }
    close(e) {
      e &&
        "string" == typeof e &&
        "" !== e.trim() &&
        (this.previousOpen.selector = e),
        this.isOpen &&
          ve &&
          (this.options.on.beforeClose(this),
          document.dispatchEvent(
            new CustomEvent("beforePopupClose", { detail: { popup: this } }),
          ),
          this.youTubeCode &&
            this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`,
            ) &&
            (this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`,
            ).innerHTML = ""),
          this.previousOpen.element.classList.remove(
            this.options.classes.popupActive,
          ),
          this.previousOpen.element.setAttribute("aria-hidden", "true"),
          this._reopen ||
            (document.documentElement.classList.remove(
              this.options.classes.bodyActive,
            ),
            !this.bodyLock && we(),
            (this.isOpen = !1)),
          this._removeHash(),
          this._selectorOpen &&
            ((this.lastClosed.selector = this.previousOpen.selector),
            (this.lastClosed.element = this.previousOpen.element)),
          this.options.on.afterClose(this),
          document.dispatchEvent(
            new CustomEvent("afterPopupClose", { detail: { popup: this } }),
          ),
          setTimeout(() => {
            this._focusTrap();
          }, 50),
          this.popupLogging("Закрыл попап"));
    }
    _getHash() {
      this.options.hashSettings.location &&
        (this.hash = this.targetOpen.selector.includes("#")
          ? this.targetOpen.selector
          : this.targetOpen.selector.replace(".", "#"));
    }
    _openToHash() {
      let e = document.querySelector(
        `.${window.location.hash.replace("#", "")}`,
      )
        ? `.${window.location.hash.replace("#", "")}`
        : document.querySelector(`${window.location.hash}`)
          ? `${window.location.hash}`
          : null;
      (document.querySelector(`[${this.options.attributeOpenButton} = "${e}"]`)
        ? document.querySelector(
            `[${this.options.attributeOpenButton} = "${e}"]`,
          )
        : document.querySelector(
            `[${this.options.attributeOpenButton} = "${e.replace(".", "#")}"]`,
          )) &&
        e &&
        this.open(e);
    }
    _setHash() {
      history.pushState("", "", this.hash);
    }
    _removeHash() {
      history.pushState("", "", window.location.href.split("#")[0]);
    }
    _focusCatch(e) {
      const t = this.targetOpen.element.querySelectorAll(this._focusEl),
        s = Array.prototype.slice.call(t),
        i = s.indexOf(document.activeElement);
      e.shiftKey && 0 === i && (s[s.length - 1].focus(), e.preventDefault()),
        e.shiftKey || i !== s.length - 1 || (s[0].focus(), e.preventDefault());
    }
    _focusTrap() {
      const e = this.previousOpen.element.querySelectorAll(this._focusEl);
      !this.isOpen && this.lastFocusEl
        ? this.lastFocusEl.focus()
        : e[0].focus();
    }
    popupLogging(e) {
      this.options.logging &&
        (function (e) {
          setTimeout(() => {
            window.FLS && console.log(e);
          }, 0);
        })(`[Попапос]: ${e}`);
    }
  })({});
  const ye = {};
  function Ee(e) {
    return (e = e.replace(",", ".").replace(/\s/g, "")).includes("K")
      ? 1e3 * parseFloat(e.replace("K", ""))
      : parseFloat(e);
  }
  document.addEventListener("DOMContentLoaded", () => {
    [
      {
        id: "statsTable",
        selector: ".leaderboard__table__creator__name__title",
      },
      {
        id: "productTable",
        selector: ".top-collection__table__creator__name__title",
      },
    ].forEach(({ id: e, selector: t }) => {
      document.querySelectorAll(`#${e} th`).forEach((s, i) => {
        s.addEventListener("click", () =>
          (function (e, t, s) {
            const i = document.getElementById(e),
              a = i.tBodies[0],
              r = Array.from(a.rows);
            (ye[t] = !ye[t]),
              i
                .querySelectorAll("th")
                .forEach((e) => e.classList.remove("sort-asc", "sort-desc")),
              i
                .querySelectorAll("th")
                [t].classList.add(ye[t] ? "sort-asc" : "sort-desc"),
              r.sort((e, i) => {
                let a, r;
                0 === t && s
                  ? ((a = e.cells[0].querySelector(s)?.innerText.trim() || ""),
                    (r = i.cells[0].querySelector(s)?.innerText.trim() || ""))
                  : ((a = e.cells[t].innerText.trim()),
                    (r = i.cells[t].innerText.trim()));
                const n = Ee(a),
                  l = Ee(r);
                return (
                  isNaN(n) || isNaN(l)
                    ? ((a = a.toLowerCase()), (r = r.toLowerCase()))
                    : ((a = n), (r = l)),
                  a < r ? (ye[t] ? -1 : 1) : a > r ? (ye[t] ? 1 : -1) : 0
                );
              }),
              (a.innerHTML = ""),
              r.forEach((e) => a.appendChild(e));
          })(e, i, t),
        );
      });
    });
  }),
    document
      .querySelectorAll(
        ".just-unleash__aside__best__sellers__main__seller__follow__button",
      )
      .forEach((e) => {
        e.addEventListener("click", () => {
          e.classList.toggle("_active"),
            e.classList.contains("_active")
              ? (e.innerText = "Unfollow")
              : (e.innerText = "Follow");
        });
      }),
    document.addEventListener("DOMContentLoaded", () => {
      const e = document.querySelectorAll(
        ".explore-marketplace__cards__card__timer, .article-creator__collection__cards__card__timer",
      );
      e.forEach((e) => {
        !(function (e, t) {
          let s,
            i,
            a,
            r = e;
          const n = setInterval(() => {
            (s = Math.floor(r / 3600)),
              (i = Math.floor((r % 3600) / 60)),
              (a = r % 60),
              (t.textContent = `${s.toString().padStart(2, "0")}h ${i.toString().padStart(2, "0")}m ${a.toString().padStart(2, "0")}s`),
              r > 0 ? r-- : (clearInterval(n), (t.textContent = "00h 00m 00s"));
          }, 1e3);
        })(25752, e);
      });
    }),
    document.addEventListener("DOMContentLoaded", () => {
      const e = document.querySelector(
          ".popup__content__your__bid__currency__button",
        ),
        t = document.querySelector(
          ".popup__content__your__bid__currency__list",
        );
      document.querySelector(".popup__content__your__bid__input__field");
      e.addEventListener("click", () => {
        t.classList.toggle("hidden"), t.classList.toggle("visible");
      }),
        t.addEventListener("click", (s) => {
          "LI" === s.target.tagName &&
            ((e.textContent = `${s.target.textContent}`),
            t.classList.add("hidden"),
            t.classList.remove("visible"));
        }),
        document.addEventListener("click", (s) => {
          e.contains(s.target) ||
            t.contains(s.target) ||
            (t.classList.add("hidden"), t.classList.remove("visible"));
        });
    }),
    document.addEventListener("DOMContentLoaded", () => {
      const e = document.querySelector(".header__nav__burger"),
        t = document.querySelector(".header__nav__menu");
      e.addEventListener("click", () => {
        t.classList.contains("active")
          ? (t.classList.add("closing"),
            setTimeout(() => {
              t.classList.remove("active", "closing");
            }, 300))
          : t.classList.add("active"),
          e.classList.toggle("active");
      }),
        document.addEventListener("click", (s) => {
          e.contains(s.target) ||
            t.contains(s.target) ||
            (t.classList.contains("active") &&
              (t.classList.add("closing"),
              setTimeout(() => {
                t.classList.remove("active", "closing");
              }, 300)),
            e.classList.remove("active"));
        });
    }),
    document.querySelectorAll(".aside-creator__name__follow").forEach((e) => {
      e.addEventListener("click", () => {
        e.classList.toggle("active"),
          e.classList.contains("active")
            ? (e.innerText = "UNFOLLOW -")
            : (e.innerText = "FOLLOW +");
      });
    }),
    document.addEventListener("DOMContentLoaded", () => {
      const e = document.querySelectorAll(
          ".article-creator__buttons__button__collection, .article-creator__buttons__button__activity",
        ),
        t = document.querySelector(".article-creator__collection"),
        s = document.querySelector(".article-creator__activity");
      e.forEach((i) => {
        i.addEventListener("click", () => {
          e.forEach((e) => e.classList.remove("active")),
            i.classList.add("active"),
            i.classList.contains("article-creator__buttons__button__collection")
              ? (t.classList.add("active"), s.classList.remove("active"))
              : i.classList.contains(
                  "article-creator__buttons__button__activity",
                ) && (s.classList.add("active"), t.classList.remove("active"));
        });
      });
    }),
    document.addEventListener("DOMContentLoaded", () => {
      document
        .querySelectorAll(".sell__form__aside__toggle__item__slider")
        .forEach((e) => {
          e.addEventListener("click", () => {
            const t = e.previousElementSibling;
            (t.checked = !t.checked),
              console.log(
                `Checkbox ${t.id} is now ${t.checked ? "checked" : "unchecked"}`,
              );
          });
        });
    });
})();
