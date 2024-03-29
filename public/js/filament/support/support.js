(() => {
    function wt(e) {
        return e.split("-")[0]
    }

    function ln(e) {
        return e.split("-")[1]
    }

    function xn(e) {
        return ["top", "bottom"].includes(wt(e)) ? "x" : "y"
    }

    function zr(e) {
        return e === "y" ? "height" : "width"
    }

    function xo(e, t, n) {
        let {reference: r, floating: i} = e, o = r.x + r.width / 2 - i.width / 2, s = r.y + r.height / 2 - i.height / 2,
            c = xn(t), u = zr(c), p = r[u] / 2 - i[u] / 2, m = wt(t), v = c === "x", b;
        switch (m) {
            case"top":
                b = {x: o, y: r.y - i.height};
                break;
            case"bottom":
                b = {x: o, y: r.y + r.height};
                break;
            case"right":
                b = {x: r.x + r.width, y: s};
                break;
            case"left":
                b = {x: r.x - i.width, y: s};
                break;
            default:
                b = {x: r.x, y: r.y}
        }
        switch (ln(t)) {
            case"start":
                b[c] -= p * (n && v ? -1 : 1);
                break;
            case"end":
                b[c] += p * (n && v ? -1 : 1);
                break
        }
        return b
    }

    var Ci = async (e, t, n) => {
        let {placement: r = "bottom", strategy: i = "absolute", middleware: o = [], platform: s} = n,
            c = await (s.isRTL == null ? void 0 : s.isRTL(t));
        if (s == null && console.error(["Floating UI: `platform` property was not passed to config. If you", "want to use Floating UI on the web, install @floating-ui/dom", "instead of the /core package. Otherwise, you can create your own", "`platform`: https://floating-ui.com/docs/platform"].join(" ")), o.filter(S => {
            let {name: A} = S;
            return A === "autoPlacement" || A === "flip"
        }).length > 1) throw new Error(["Floating UI: duplicate `flip` and/or `autoPlacement`", "middleware detected. This will lead to an infinite loop. Ensure only", "one of either has been passed to the `middleware` array."].join(" "));
        let u = await s.getElementRects({reference: e, floating: t, strategy: i}), {x: p, y: m} = xo(u, r, c), v = r,
            b = {}, O = 0;
        for (let S = 0; S < o.length; S++) {
            if (O++, O > 100) throw new Error(["Floating UI: The middleware lifecycle appears to be", "running in an infinite loop. This is usually caused by a `reset`", "continually being returned without a break condition."].join(" "));
            let {name: A, fn: B} = o[S], {x: F, y: L, data: K, reset: V} = await B({
                x: p,
                y: m,
                initialPlacement: r,
                placement: v,
                strategy: i,
                middlewareData: b,
                rects: u,
                platform: s,
                elements: {reference: e, floating: t}
            });
            if (p = F ?? p, m = L ?? m, b = {...b, [A]: {...b[A], ...K}}, V) {
                typeof V == "object" && (V.placement && (v = V.placement), V.rects && (u = V.rects === !0 ? await s.getElementRects({
                    reference: e,
                    floating: t,
                    strategy: i
                }) : V.rects), {x: p, y: m} = xo(u, v, c)), S = -1;
                continue
            }
        }
        return {x: p, y: m, placement: v, strategy: i, middlewareData: b}
    };

    function Di(e) {
        return {top: 0, right: 0, bottom: 0, left: 0, ...e}
    }

    function qr(e) {
        return typeof e != "number" ? Di(e) : {top: e, right: e, bottom: e, left: e}
    }

    function Fn(e) {
        return {...e, top: e.y, left: e.x, right: e.x + e.width, bottom: e.y + e.height}
    }

    async function En(e, t) {
        var n;
        t === void 0 && (t = {});
        let {x: r, y: i, platform: o, rects: s, elements: c, strategy: u} = e, {
                boundary: p = "clippingAncestors",
                rootBoundary: m = "viewport",
                elementContext: v = "floating",
                altBoundary: b = !1,
                padding: O = 0
            } = t, S = qr(O), B = c[b ? v === "floating" ? "reference" : "floating" : v], F = Fn(await o.getClippingRect({
                element: (n = await (o.isElement == null ? void 0 : o.isElement(B))) == null || n ? B : B.contextElement || await (o.getDocumentElement == null ? void 0 : o.getDocumentElement(c.floating)),
                boundary: p,
                rootBoundary: m,
                strategy: u
            })),
            L = Fn(o.convertOffsetParentRelativeRectToViewportRelativeRect ? await o.convertOffsetParentRelativeRectToViewportRelativeRect({
                rect: v === "floating" ? {
                    ...s.floating,
                    x: r,
                    y: i
                } : s.reference,
                offsetParent: await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(c.floating)),
                strategy: u
            }) : s[v]);
        return {
            top: F.top - L.top + S.top,
            bottom: L.bottom - F.bottom + S.bottom,
            left: F.left - L.left + S.left,
            right: L.right - F.right + S.right
        }
    }

    var Io = Math.min, qt = Math.max;

    function Ur(e, t, n) {
        return qt(e, Io(t, n))
    }

    var Lo = e => ({
        name: "arrow", options: e, async fn(t) {
            let {element: n, padding: r = 0} = e ?? {}, {x: i, y: o, placement: s, rects: c, platform: u} = t;
            if (n == null) return console.warn("Floating UI: No `element` was passed to the `arrow` middleware."), {};
            let p = qr(r), m = {x: i, y: o}, v = xn(s), b = zr(v), O = await u.getDimensions(n),
                S = v === "y" ? "top" : "left", A = v === "y" ? "bottom" : "right",
                B = c.reference[b] + c.reference[v] - m[v] - c.floating[b], F = m[v] - c.reference[v],
                L = await (u.getOffsetParent == null ? void 0 : u.getOffsetParent(n)),
                K = L ? v === "y" ? L.clientHeight || 0 : L.clientWidth || 0 : 0, V = B / 2 - F / 2, he = p[S],
                ee = K - O[b] - p[A], Z = K / 2 - O[b] / 2 + V, de = Ur(he, Z, ee);
            return {data: {[v]: de, centerOffset: Z - de}}
        }
    }), Ti = {left: "right", right: "left", bottom: "top", top: "bottom"};

    function lr(e) {
        return e.replace(/left|right|bottom|top/g, t => Ti[t])
    }

    function No(e, t, n) {
        n === void 0 && (n = !1);
        let r = ln(e), i = xn(e), o = zr(i),
            s = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
        return t.reference[o] > t.floating[o] && (s = lr(s)), {main: s, cross: lr(s)}
    }

    var _i = {start: "end", end: "start"};

    function Xr(e) {
        return e.replace(/start|end/g, t => _i[t])
    }

    var ko = ["top", "right", "bottom", "left"], Pi = ko.reduce((e, t) => e.concat(t, t + "-start", t + "-end"), []);

    function Mi(e, t, n) {
        return (e ? [...n.filter(i => ln(i) === e), ...n.filter(i => ln(i) !== e)] : n.filter(i => wt(i) === i)).filter(i => e ? ln(i) === e || (t ? Xr(i) !== i : !1) : !0)
    }

    var Gr = function (e) {
        return e === void 0 && (e = {}), {
            name: "autoPlacement", options: e, async fn(t) {
                var n, r, i, o, s;
                let {
                        x: c,
                        y: u,
                        rects: p,
                        middlewareData: m,
                        placement: v,
                        platform: b,
                        elements: O
                    } = t, {alignment: S = null, allowedPlacements: A = Pi, autoAlignment: B = !0, ...F} = e,
                    L = Mi(S, B, A), K = await En(t, F),
                    V = (n = (r = m.autoPlacement) == null ? void 0 : r.index) != null ? n : 0, he = L[V];
                if (he == null) return {};
                let {main: ee, cross: Z} = No(he, p, await (b.isRTL == null ? void 0 : b.isRTL(O.floating)));
                if (v !== he) return {x: c, y: u, reset: {placement: L[0]}};
                let de = [K[wt(he)], K[ee], K[Z]],
                    N = [...(i = (o = m.autoPlacement) == null ? void 0 : o.overflows) != null ? i : [], {
                        placement: he,
                        overflows: de
                    }], ae = L[V + 1];
                if (ae) return {data: {index: V + 1, overflows: N}, reset: {placement: ae}};
                let ue = N.slice().sort((ve, We) => ve.overflows[0] - We.overflows[0]), Ae = (s = ue.find(ve => {
                    let {overflows: We} = ve;
                    return We.every(Le => Le <= 0)
                })) == null ? void 0 : s.placement, pe = Ae ?? ue[0].placement;
                return pe !== v ? {data: {index: V + 1, overflows: N}, reset: {placement: pe}} : {}
            }
        }
    };

    function Ri(e) {
        let t = lr(e);
        return [Xr(e), t, Xr(t)]
    }

    var jo = function (e) {
        return e === void 0 && (e = {}), {
            name: "flip", options: e, async fn(t) {
                var n;
                let {
                        placement: r,
                        middlewareData: i,
                        rects: o,
                        initialPlacement: s,
                        platform: c,
                        elements: u
                    } = t, {
                        mainAxis: p = !0,
                        crossAxis: m = !0,
                        fallbackPlacements: v,
                        fallbackStrategy: b = "bestFit",
                        flipAlignment: O = !0,
                        ...S
                    } = e, A = wt(r), F = v || (A === s || !O ? [lr(s)] : Ri(s)), L = [s, ...F], K = await En(t, S), V = [],
                    he = ((n = i.flip) == null ? void 0 : n.overflows) || [];
                if (p && V.push(K[A]), m) {
                    let {main: N, cross: ae} = No(r, o, await (c.isRTL == null ? void 0 : c.isRTL(u.floating)));
                    V.push(K[N], K[ae])
                }
                if (he = [...he, {placement: r, overflows: V}], !V.every(N => N <= 0)) {
                    var ee, Z;
                    let N = ((ee = (Z = i.flip) == null ? void 0 : Z.index) != null ? ee : 0) + 1, ae = L[N];
                    if (ae) return {data: {index: N, overflows: he}, reset: {placement: ae}};
                    let ue = "bottom";
                    switch (b) {
                        case"bestFit": {
                            var de;
                            let Ae = (de = he.map(pe => [pe, pe.overflows.filter(ve => ve > 0).reduce((ve, We) => ve + We, 0)]).sort((pe, ve) => pe[1] - ve[1])[0]) == null ? void 0 : de[0].placement;
                            Ae && (ue = Ae);
                            break
                        }
                        case"initialPlacement":
                            ue = s;
                            break
                    }
                    if (r !== ue) return {reset: {placement: ue}}
                }
                return {}
            }
        }
    };

    function Oo(e, t) {
        return {top: e.top - t.height, right: e.right - t.width, bottom: e.bottom - t.height, left: e.left - t.width}
    }

    function So(e) {
        return ko.some(t => e[t] >= 0)
    }

    var Bo = function (e) {
        let {strategy: t = "referenceHidden", ...n} = e === void 0 ? {} : e;
        return {
            name: "hide", async fn(r) {
                let {rects: i} = r;
                switch (t) {
                    case"referenceHidden": {
                        let o = await En(r, {...n, elementContext: "reference"}), s = Oo(o, i.reference);
                        return {data: {referenceHiddenOffsets: s, referenceHidden: So(s)}}
                    }
                    case"escaped": {
                        let o = await En(r, {...n, altBoundary: !0}), s = Oo(o, i.floating);
                        return {data: {escapedOffsets: s, escaped: So(s)}}
                    }
                    default:
                        return {}
                }
            }
        }
    };

    function Ii(e, t, n, r) {
        r === void 0 && (r = !1);
        let i = wt(e), o = ln(e), s = xn(e) === "x", c = ["left", "top"].includes(i) ? -1 : 1, u = r && s ? -1 : 1,
            p = typeof n == "function" ? n({...t, placement: e}) : n, {
                mainAxis: m,
                crossAxis: v,
                alignmentAxis: b
            } = typeof p == "number" ? {mainAxis: p, crossAxis: 0, alignmentAxis: null} : {
                mainAxis: 0,
                crossAxis: 0,
                alignmentAxis: null, ...p
            };
        return o && typeof b == "number" && (v = o === "end" ? b * -1 : b), s ? {x: v * u, y: m * c} : {
            x: m * c,
            y: v * u
        }
    }

    var Fo = function (e) {
        return e === void 0 && (e = 0), {
            name: "offset", options: e, async fn(t) {
                let {x: n, y: r, placement: i, rects: o, platform: s, elements: c} = t,
                    u = Ii(i, o, e, await (s.isRTL == null ? void 0 : s.isRTL(c.floating)));
                return {x: n + u.x, y: r + u.y, data: u}
            }
        }
    };

    function Li(e) {
        return e === "x" ? "y" : "x"
    }

    var Ho = function (e) {
        return e === void 0 && (e = {}), {
            name: "shift", options: e, async fn(t) {
                let {x: n, y: r, placement: i} = t, {
                    mainAxis: o = !0, crossAxis: s = !1, limiter: c = {
                        fn: B => {
                            let {x: F, y: L} = B;
                            return {x: F, y: L}
                        }
                    }, ...u
                } = e, p = {x: n, y: r}, m = await En(t, u), v = xn(wt(i)), b = Li(v), O = p[v], S = p[b];
                if (o) {
                    let B = v === "y" ? "top" : "left", F = v === "y" ? "bottom" : "right", L = O + m[B], K = O - m[F];
                    O = Ur(L, O, K)
                }
                if (s) {
                    let B = b === "y" ? "top" : "left", F = b === "y" ? "bottom" : "right", L = S + m[B], K = S - m[F];
                    S = Ur(L, S, K)
                }
                let A = c.fn({...t, [v]: O, [b]: S});
                return {...A, data: {x: A.x - n, y: A.y - r}}
            }
        }
    }, $o = function (e) {
        return e === void 0 && (e = {}), {
            name: "size", options: e, async fn(t) {
                let {placement: n, rects: r, platform: i, elements: o} = t, {apply: s, ...c} = e, u = await En(t, c),
                    p = wt(n), m = ln(n), v, b;
                p === "top" || p === "bottom" ? (v = p, b = m === (await (i.isRTL == null ? void 0 : i.isRTL(o.floating)) ? "start" : "end") ? "left" : "right") : (b = p, v = m === "end" ? "top" : "bottom");
                let O = qt(u.left, 0), S = qt(u.right, 0), A = qt(u.top, 0), B = qt(u.bottom, 0), F = {
                    height: r.floating.height - (["left", "right"].includes(n) ? 2 * (A !== 0 || B !== 0 ? A + B : qt(u.top, u.bottom)) : u[v]),
                    width: r.floating.width - (["top", "bottom"].includes(n) ? 2 * (O !== 0 || S !== 0 ? O + S : qt(u.left, u.right)) : u[b])
                }, L = await i.getDimensions(o.floating);
                s?.({...F, ...r});
                let K = await i.getDimensions(o.floating);
                return L.width !== K.width || L.height !== K.height ? {reset: {rects: !0}} : {}
            }
        }
    }, Wo = function (e) {
        return e === void 0 && (e = {}), {
            name: "inline", options: e, async fn(t) {
                var n;
                let {placement: r, elements: i, rects: o, platform: s, strategy: c} = t, {
                        padding: u = 2,
                        x: p,
                        y: m
                    } = e,
                    v = Fn(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
                        rect: o.reference,
                        offsetParent: await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(i.floating)),
                        strategy: c
                    }) : o.reference),
                    b = (n = await (s.getClientRects == null ? void 0 : s.getClientRects(i.reference))) != null ? n : [],
                    O = qr(u);

                function S() {
                    if (b.length === 2 && b[0].left > b[1].right && p != null && m != null) {
                        var B;
                        return (B = b.find(F => p > F.left - O.left && p < F.right + O.right && m > F.top - O.top && m < F.bottom + O.bottom)) != null ? B : v
                    }
                    if (b.length >= 2) {
                        if (xn(r) === "x") {
                            let ue = b[0], Ae = b[b.length - 1], pe = wt(r) === "top", ve = ue.top, We = Ae.bottom,
                                Le = pe ? ue.left : Ae.left, Te = pe ? ue.right : Ae.right, tt = Te - Le, Nt = We - ve;
                            return {top: ve, bottom: We, left: Le, right: Te, width: tt, height: Nt, x: Le, y: ve}
                        }
                        let F = wt(r) === "left", L = qt(...b.map(ue => ue.right)), K = Io(...b.map(ue => ue.left)),
                            V = b.filter(ue => F ? ue.left === K : ue.right === L), he = V[0].top,
                            ee = V[V.length - 1].bottom, Z = K, de = L, N = de - Z, ae = ee - he;
                        return {top: he, bottom: ee, left: Z, right: de, width: N, height: ae, x: Z, y: he}
                    }
                    return v
                }

                let A = await s.getElementRects({
                    reference: {getBoundingClientRect: S},
                    floating: i.floating,
                    strategy: c
                });
                return o.reference.x !== A.reference.x || o.reference.y !== A.reference.y || o.reference.width !== A.reference.width || o.reference.height !== A.reference.height ? {reset: {rects: A}} : {}
            }
        }
    };

    function Vo(e) {
        return e && e.document && e.location && e.alert && e.setInterval
    }

    function Mt(e) {
        if (e == null) return window;
        if (!Vo(e)) {
            let t = e.ownerDocument;
            return t && t.defaultView || window
        }
        return e
    }

    function Hn(e) {
        return Mt(e).getComputedStyle(e)
    }

    function _t(e) {
        return Vo(e) ? "" : e ? (e.nodeName || "").toLowerCase() : ""
    }

    function Et(e) {
        return e instanceof Mt(e).HTMLElement
    }

    function Gt(e) {
        return e instanceof Mt(e).Element
    }

    function Ni(e) {
        return e instanceof Mt(e).Node
    }

    function Kr(e) {
        if (typeof ShadowRoot > "u") return !1;
        let t = Mt(e).ShadowRoot;
        return e instanceof t || e instanceof ShadowRoot
    }

    function fr(e) {
        let {overflow: t, overflowX: n, overflowY: r} = Hn(e);
        return /auto|scroll|overlay|hidden/.test(t + r + n)
    }

    function ki(e) {
        return ["table", "td", "th"].includes(_t(e))
    }

    function Uo(e) {
        let t = navigator.userAgent.toLowerCase().includes("firefox"), n = Hn(e);
        return n.transform !== "none" || n.perspective !== "none" || n.contain === "paint" || ["transform", "perspective"].includes(n.willChange) || t && n.willChange === "filter" || t && (n.filter ? n.filter !== "none" : !1)
    }

    function Xo() {
        return !/^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    }

    var Ao = Math.min, jn = Math.max, cr = Math.round;

    function Pt(e, t, n) {
        var r, i, o, s;
        t === void 0 && (t = !1), n === void 0 && (n = !1);
        let c = e.getBoundingClientRect(), u = 1, p = 1;
        t && Et(e) && (u = e.offsetWidth > 0 && cr(c.width) / e.offsetWidth || 1, p = e.offsetHeight > 0 && cr(c.height) / e.offsetHeight || 1);
        let m = Gt(e) ? Mt(e) : window, v = !Xo() && n,
            b = (c.left + (v && (r = (i = m.visualViewport) == null ? void 0 : i.offsetLeft) != null ? r : 0)) / u,
            O = (c.top + (v && (o = (s = m.visualViewport) == null ? void 0 : s.offsetTop) != null ? o : 0)) / p,
            S = c.width / u, A = c.height / p;
        return {width: S, height: A, top: O, right: b + S, bottom: O + A, left: b, x: b, y: O}
    }

    function Kt(e) {
        return ((Ni(e) ? e.ownerDocument : e.document) || window.document).documentElement
    }

    function dr(e) {
        return Gt(e) ? {scrollLeft: e.scrollLeft, scrollTop: e.scrollTop} : {
            scrollLeft: e.pageXOffset,
            scrollTop: e.pageYOffset
        }
    }

    function Yo(e) {
        return Pt(Kt(e)).left + dr(e).scrollLeft
    }

    function ji(e) {
        let t = Pt(e);
        return cr(t.width) !== e.offsetWidth || cr(t.height) !== e.offsetHeight
    }

    function Bi(e, t, n) {
        let r = Et(t), i = Kt(t), o = Pt(e, r && ji(t), n === "fixed"), s = {scrollLeft: 0, scrollTop: 0},
            c = {x: 0, y: 0};
        if (r || !r && n !== "fixed") if ((_t(t) !== "body" || fr(i)) && (s = dr(t)), Et(t)) {
            let u = Pt(t, !0);
            c.x = u.x + t.clientLeft, c.y = u.y + t.clientTop
        } else i && (c.x = Yo(i));
        return {x: o.left + s.scrollLeft - c.x, y: o.top + s.scrollTop - c.y, width: o.width, height: o.height}
    }

    function zo(e) {
        return _t(e) === "html" ? e : e.assignedSlot || e.parentNode || (Kr(e) ? e.host : null) || Kt(e)
    }

    function Co(e) {
        return !Et(e) || getComputedStyle(e).position === "fixed" ? null : e.offsetParent
    }

    function Fi(e) {
        let t = zo(e);
        for (Kr(t) && (t = t.host); Et(t) && !["html", "body"].includes(_t(t));) {
            if (Uo(t)) return t;
            t = t.parentNode
        }
        return null
    }

    function Yr(e) {
        let t = Mt(e), n = Co(e);
        for (; n && ki(n) && getComputedStyle(n).position === "static";) n = Co(n);
        return n && (_t(n) === "html" || _t(n) === "body" && getComputedStyle(n).position === "static" && !Uo(n)) ? t : n || Fi(e) || t
    }

    function Do(e) {
        if (Et(e)) return {width: e.offsetWidth, height: e.offsetHeight};
        let t = Pt(e);
        return {width: t.width, height: t.height}
    }

    function Hi(e) {
        let {rect: t, offsetParent: n, strategy: r} = e, i = Et(n), o = Kt(n);
        if (n === o) return t;
        let s = {scrollLeft: 0, scrollTop: 0}, c = {x: 0, y: 0};
        if ((i || !i && r !== "fixed") && ((_t(n) !== "body" || fr(o)) && (s = dr(n)), Et(n))) {
            let u = Pt(n, !0);
            c.x = u.x + n.clientLeft, c.y = u.y + n.clientTop
        }
        return {...t, x: t.x - s.scrollLeft + c.x, y: t.y - s.scrollTop + c.y}
    }

    function $i(e, t) {
        let n = Mt(e), r = Kt(e), i = n.visualViewport, o = r.clientWidth, s = r.clientHeight, c = 0, u = 0;
        if (i) {
            o = i.width, s = i.height;
            let p = Xo();
            (p || !p && t === "fixed") && (c = i.offsetLeft, u = i.offsetTop)
        }
        return {width: o, height: s, x: c, y: u}
    }

    function Wi(e) {
        var t;
        let n = Kt(e), r = dr(e), i = (t = e.ownerDocument) == null ? void 0 : t.body,
            o = jn(n.scrollWidth, n.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0),
            s = jn(n.scrollHeight, n.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0),
            c = -r.scrollLeft + Yo(e), u = -r.scrollTop;
        return Hn(i || n).direction === "rtl" && (c += jn(n.clientWidth, i ? i.clientWidth : 0) - o), {
            width: o,
            height: s,
            x: c,
            y: u
        }
    }

    function qo(e) {
        let t = zo(e);
        return ["html", "body", "#document"].includes(_t(t)) ? e.ownerDocument.body : Et(t) && fr(t) ? t : qo(t)
    }

    function ur(e, t) {
        var n;
        t === void 0 && (t = []);
        let r = qo(e), i = r === ((n = e.ownerDocument) == null ? void 0 : n.body), o = Mt(r),
            s = i ? [o].concat(o.visualViewport || [], fr(r) ? r : []) : r, c = t.concat(s);
        return i ? c : c.concat(ur(s))
    }

    function Vi(e, t) {
        let n = t == null || t.getRootNode == null ? void 0 : t.getRootNode();
        if (e != null && e.contains(t)) return !0;
        if (n && Kr(n)) {
            let r = t;
            do {
                if (r && e === r) return !0;
                r = r.parentNode || r.host
            } while (r)
        }
        return !1
    }

    function Ui(e, t) {
        let n = Pt(e, !1, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft;
        return {
            top: r,
            left: i,
            x: i,
            y: r,
            right: i + e.clientWidth,
            bottom: r + e.clientHeight,
            width: e.clientWidth,
            height: e.clientHeight
        }
    }

    function To(e, t, n) {
        return t === "viewport" ? Fn($i(e, n)) : Gt(t) ? Ui(t, n) : Fn(Wi(Kt(e)))
    }

    function Xi(e) {
        let t = ur(e), r = ["absolute", "fixed"].includes(Hn(e).position) && Et(e) ? Yr(e) : e;
        return Gt(r) ? t.filter(i => Gt(i) && Vi(i, r) && _t(i) !== "body") : []
    }

    function Yi(e) {
        let {element: t, boundary: n, rootBoundary: r, strategy: i} = e,
            s = [...n === "clippingAncestors" ? Xi(t) : [].concat(n), r], c = s[0], u = s.reduce((p, m) => {
                let v = To(t, m, i);
                return p.top = jn(v.top, p.top), p.right = Ao(v.right, p.right), p.bottom = Ao(v.bottom, p.bottom), p.left = jn(v.left, p.left), p
            }, To(t, c, i));
        return {width: u.right - u.left, height: u.bottom - u.top, x: u.left, y: u.top}
    }

    var zi = {
        getClippingRect: Yi,
        convertOffsetParentRelativeRectToViewportRelativeRect: Hi,
        isElement: Gt,
        getDimensions: Do,
        getOffsetParent: Yr,
        getDocumentElement: Kt,
        getElementRects: e => {
            let {reference: t, floating: n, strategy: r} = e;
            return {reference: Bi(t, Yr(n), r), floating: {...Do(n), x: 0, y: 0}}
        },
        getClientRects: e => Array.from(e.getClientRects()),
        isRTL: e => Hn(e).direction === "rtl"
    };

    function _o(e, t, n, r) {
        r === void 0 && (r = {});
        let {ancestorScroll: i = !0, ancestorResize: o = !0, elementResize: s = !0, animationFrame: c = !1} = r, u = !1,
            p = i && !c, m = o && !c, v = s && !c, b = p || m ? [...Gt(e) ? ur(e) : [], ...ur(t)] : [];
        b.forEach(F => {
            p && F.addEventListener("scroll", n, {passive: !0}), m && F.addEventListener("resize", n)
        });
        let O = null;
        v && (O = new ResizeObserver(n), Gt(e) && O.observe(e), O.observe(t));
        let S, A = c ? Pt(e) : null;
        c && B();

        function B() {
            if (u) return;
            let F = Pt(e);
            A && (F.x !== A.x || F.y !== A.y || F.width !== A.width || F.height !== A.height) && n(), A = F, S = requestAnimationFrame(B)
        }

        return () => {
            var F;
            u = !0, b.forEach(L => {
                p && L.removeEventListener("scroll", n), m && L.removeEventListener("resize", n)
            }), (F = O) == null || F.disconnect(), O = null, c && cancelAnimationFrame(S)
        }
    }

    var Po = (e, t, n) => Ci(e, t, {platform: zi, ...n}), qi = e => {
        let t = {placement: "bottom", middleware: []}, n = Object.keys(e), r = i => e[i];
        return n.includes("offset") && t.middleware.push(Fo(r("offset"))), n.includes("placement") && (t.placement = r("placement")), n.includes("autoPlacement") && !n.includes("flip") && t.middleware.push(Gr(r("autoPlacement"))), n.includes("flip") && t.middleware.push(jo(r("flip"))), n.includes("shift") && t.middleware.push(Ho(r("shift"))), n.includes("inline") && t.middleware.push(Wo(r("inline"))), n.includes("arrow") && t.middleware.push(Lo(r("arrow"))), n.includes("hide") && t.middleware.push(Bo(r("hide"))), n.includes("size") && t.middleware.push($o(r("size"))), t
    }, Gi = (e, t) => {
        let n = {component: {trap: !1}, float: {placement: "bottom", strategy: "absolute", middleware: []}},
            r = i => e[e.indexOf(i) + 1];
        return e.includes("trap") && (n.component.trap = !0), e.includes("teleport") && (n.float.strategy = "fixed"), e.includes("offset") && n.float.middleware.push(Fo(t.offset || 10)), e.includes("placement") && (n.float.placement = r("placement")), e.includes("autoPlacement") && !e.includes("flip") && n.float.middleware.push(Gr(t.autoPlacement)), e.includes("flip") && n.float.middleware.push(jo(t.flip)), e.includes("shift") && n.float.middleware.push(Ho(t.shift)), e.includes("inline") && n.float.middleware.push(Wo(t.inline)), e.includes("arrow") && n.float.middleware.push(Lo(t.arrow)), e.includes("hide") && n.float.middleware.push(Bo(t.hide)), e.includes("size") && n.float.middleware.push($o(t.size)), n
    }, Ki = e => {
        var t = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split(""), n = "";
        e || (e = Math.floor(Math.random() * t.length));
        for (var r = 0; r < e; r++) n += t[Math.floor(Math.random() * t.length)];
        return n
    }, Ji = [], Qi = [], Zi = [];

    function ea(e, t) {
        e._x_attributeCleanups && Object.entries(e._x_attributeCleanups).forEach(([n, r]) => {
            (t === void 0 || t.includes(n)) && (r.forEach(i => i()), delete e._x_attributeCleanups[n])
        })
    }

    var Jr = new MutationObserver(Go), Qr = !1;

    function ta() {
        Jr.observe(document, {subtree: !0, childList: !0, attributes: !0, attributeOldValue: !0}), Qr = !0
    }

    function na() {
        ra(), Jr.disconnect(), Qr = !1
    }

    var Bn = [], Vr = !1;

    function ra() {
        Bn = Bn.concat(Jr.takeRecords()), Bn.length && !Vr && (Vr = !0, queueMicrotask(() => {
            oa(), Vr = !1
        }))
    }

    function oa() {
        Go(Bn), Bn.length = 0
    }

    function Mo(e) {
        if (!Qr) return e();
        na();
        let t = e();
        return ta(), t
    }

    var ia = !1, Ro = [];

    function Go(e) {
        if (ia) {
            Ro = Ro.concat(e);
            return
        }
        let t = [], n = [], r = new Map, i = new Map;
        for (let o = 0; o < e.length; o++) if (!e[o].target._x_ignoreMutationObserver && (e[o].type === "childList" && (e[o].addedNodes.forEach(s => s.nodeType === 1 && t.push(s)), e[o].removedNodes.forEach(s => s.nodeType === 1 && n.push(s))), e[o].type === "attributes")) {
            let s = e[o].target, c = e[o].attributeName, u = e[o].oldValue, p = () => {
                r.has(s) || r.set(s, []), r.get(s).push({name: c, value: s.getAttribute(c)})
            }, m = () => {
                i.has(s) || i.set(s, []), i.get(s).push(c)
            };
            s.hasAttribute(c) && u === null ? p() : s.hasAttribute(c) ? (m(), p()) : m()
        }
        i.forEach((o, s) => {
            ea(s, o)
        }), r.forEach((o, s) => {
            Ji.forEach(c => c(s, o))
        });
        for (let o of n) if (!t.includes(o) && (Qi.forEach(s => s(o)), o._x_cleanups)) for (; o._x_cleanups.length;) o._x_cleanups.pop()();
        t.forEach(o => {
            o._x_ignoreSelf = !0, o._x_ignore = !0
        });
        for (let o of t) n.includes(o) || o.isConnected && (delete o._x_ignoreSelf, delete o._x_ignore, Zi.forEach(s => s(o)), o._x_ignore = !0, o._x_ignoreSelf = !0);
        t.forEach(o => {
            delete o._x_ignoreSelf, delete o._x_ignore
        }), t = null, n = null, r = null, i = null
    }

    function aa(e, t = () => {
    }) {
        let n = !1;
        return function () {
            n ? t.apply(this, arguments) : (n = !0, e.apply(this, arguments))
        }
    }

    function sa(e) {
        let t = {dismissable: !0, trap: !1};

        function n(o, s, c = null) {
            if (s) {
                if (s.hasAttribute("aria-expanded") || s.setAttribute("aria-expanded", !1), c.hasAttribute("id")) s.setAttribute("aria-controls", c.getAttribute("id")); else {
                    let u = `panel-${Ki(8)}`;
                    s.setAttribute("aria-controls", u), c.setAttribute("id", u)
                }
                c.setAttribute("aria-modal", !0), c.setAttribute("role", "dialog")
            }
        }

        let r = document.querySelectorAll('[\\@click^="$float"]'),
            i = document.querySelectorAll('[x-on\\:click^="$float"]');
        [...r, ...i].forEach(o => {
            let s = o.parentElement.closest("[x-data]"), c = s.querySelector('[x-ref="panel"]');
            n(s, o, c)
        }), e.magic("float", o => (s = {}, c = {}) => {
            let u = {...t, ...c}, p = Object.keys(s).length > 0 ? qi(s) : {middleware: [Gr()]}, m = o,
                v = o.parentElement.closest("[x-data]"), b = v.querySelector('[x-ref="panel"]');

            function O() {
                return b.style.display == "block"
            }

            function S() {
                b.style.display = "", m.setAttribute("aria-expanded", !1), u.trap && b.setAttribute("x-trap", !1), _o(o, b, F)
            }

            function A() {
                b.style.display = "block", m.setAttribute("aria-expanded", !0), u.trap && b.setAttribute("x-trap", !0), F()
            }

            function B() {
                O() ? S() : A()
            }

            async function F() {
                return await Po(o, b, p).then(({middlewareData: L, placement: K, x: V, y: he}) => {
                    if (L.arrow) {
                        let ee = L.arrow?.x, Z = L.arrow?.y,
                            de = p.middleware.filter(ae => ae.name == "arrow")[0].options.element,
                            N = {top: "bottom", right: "left", bottom: "top", left: "right"}[K.split("-")[0]];
                        Object.assign(de.style, {
                            left: ee != null ? `${ee}px` : "",
                            top: Z != null ? `${Z}px` : "",
                            right: "",
                            bottom: "",
                            [N]: "-4px"
                        })
                    }
                    if (L.hide) {
                        let {referenceHidden: ee} = L.hide;
                        Object.assign(b.style, {visibility: ee ? "hidden" : "visible"})
                    }
                    Object.assign(b.style, {left: `${V}px`, top: `${he}px`})
                })
            }

            u.dismissable && (window.addEventListener("click", L => {
                !v.contains(L.target) && O() && B()
            }), window.addEventListener("keydown", L => {
                L.key === "Escape" && O() && B()
            }, !0)), B()
        }), e.directive("float", (o, {modifiers: s, expression: c}, {evaluate: u, effect: p}) => {
            let m = c ? u(c) : {}, v = s.length > 0 ? Gi(s, m) : {}, b = null;
            v.float.strategy == "fixed" && (o.style.position = "fixed");
            let O = N => o.parentElement && !o.parentElement.closest("[x-data]").contains(N.target) ? o.close() : null,
                S = N => N.key === "Escape" ? o.close() : null, A = o.getAttribute("x-ref"),
                B = o.parentElement.closest("[x-data]"), F = B.querySelectorAll(`[\\@click^="$refs.${A}"]`),
                L = B.querySelectorAll(`[x-on\\:click^="$refs.${A}"]`);
            o.style.setProperty("display", "none"), n(B, [...F, ...L][0], o), o._x_isShown = !1, o.trigger = null, o._x_doHide || (o._x_doHide = () => {
                Mo(() => {
                    o.style.setProperty("display", "none", s.includes("important") ? "important" : void 0)
                })
            }), o._x_doShow || (o._x_doShow = () => {
                Mo(() => {
                    o.style.setProperty("display", "block", s.includes("important") ? "important" : void 0)
                })
            });
            let K = () => {
                o._x_doHide(), o._x_isShown = !1
            }, V = () => {
                o._x_doShow(), o._x_isShown = !0
            }, he = () => setTimeout(V), ee = aa(N => N ? V() : K(), N => {
                typeof o._x_toggleAndCascadeWithTransitions == "function" ? o._x_toggleAndCascadeWithTransitions(o, N, V, K) : N ? he() : K()
            }), Z, de = !0;
            p(() => u(N => {
                !de && N === Z || (s.includes("immediate") && (N ? he() : K()), ee(N), Z = N, de = !1)
            })), o.open = async function (N) {
                o.trigger = N.currentTarget ? N.currentTarget : N, ee(!0), o.trigger.setAttribute("aria-expanded", !0), v.component.trap && o.setAttribute("x-trap", !0), b = _o(o.trigger, o, () => {
                    Po(o.trigger, o, v.float).then(({middlewareData: ae, placement: ue, x: Ae, y: pe}) => {
                        if (ae.arrow) {
                            let ve = ae.arrow?.x, We = ae.arrow?.y,
                                Le = v.float.middleware.filter(tt => tt.name == "arrow")[0].options.element,
                                Te = {top: "bottom", right: "left", bottom: "top", left: "right"}[ue.split("-")[0]];
                            Object.assign(Le.style, {
                                left: ve != null ? `${ve}px` : "",
                                top: We != null ? `${We}px` : "",
                                right: "",
                                bottom: "",
                                [Te]: "-4px"
                            })
                        }
                        if (ae.hide) {
                            let {referenceHidden: ve} = ae.hide;
                            Object.assign(o.style, {visibility: ve ? "hidden" : "visible"})
                        }
                        Object.assign(o.style, {left: `${Ae}px`, top: `${pe}px`})
                    })
                }), window.addEventListener("click", O), window.addEventListener("keydown", S, !0)
            }, o.close = function () {
                ee(!1), o.trigger.setAttribute("aria-expanded", !1), v.component.trap && o.setAttribute("x-trap", !1), b(), window.removeEventListener("click", O), window.removeEventListener("keydown", S, !1)
            }, o.toggle = function (N) {
                o._x_isShown ? o.close() : o.open(N)
            }
        })
    }

    var Ko = sa;

    function la(e) {
        e.store("lazyLoadedAssets", {
            loaded: new Set, check(s) {
                return Array.isArray(s) ? s.every(c => this.loaded.has(c)) : this.loaded.has(s)
            }, markLoaded(s) {
                Array.isArray(s) ? s.forEach(c => this.loaded.add(c)) : this.loaded.add(s)
            }
        });

        function t(s) {
            return new CustomEvent(s, {bubbles: !0, composed: !0, cancelable: !0})
        }

        function n(s, c = {}, u, p) {
            let m = document.createElement(s);
            for (let [v, b] of Object.entries(c)) m[v] = b;
            return u && (p ? u.insertBefore(m, p) : u.appendChild(m)), m
        }

        function r(s, c, u = {}, p = null, m = null) {
            let v = s === "link" ? `link[href="${c}"]` : `script[src="${c}"]`;
            if (document.querySelector(v) || e.store("lazyLoadedAssets").check(c)) return Promise.resolve();
            let b = n(s, {...u, href: c}, p, m);
            return new Promise((O, S) => {
                b.onload = () => {
                    e.store("lazyLoadedAssets").markLoaded(c), O()
                }, b.onerror = () => {
                    S(new Error(`Failed to load ${s}: ${c}`))
                }
            })
        }

        async function i(s, c, u = null, p = null) {
            let m = {type: "text/css", rel: "stylesheet"};
            c && (m.media = c);
            let v = document.head, b = null;
            if (u && p) {
                let O = document.querySelector(`link[href*="${p}"]`);
                O ? (v = O.parentNode, b = u === "before" ? O : O.nextSibling) : console.warn(`Target (${p}) not found for ${s}. Appending to head.`)
            }
            await r("link", s, m, v, b)
        }

        async function o(s, c, u = null, p = null) {
            let m, v;
            u && p && (m = document.querySelector(`script[src*="${p}"]`), m ? v = u === "before" ? m : m.nextSibling : console.warn(`Target (${p}) not found for ${s}. Appending to body.`));
            let b = c.has("body-start") ? "prepend" : "append";
            await r("script", s, {}, m || document[c.has("body-end") ? "body" : "head"], v)
        }

        e.directive("load-css", (s, {expression: c}, {evaluate: u}) => {
            let p = u(c), m = s.media, v = s.getAttribute("data-dispatch"),
                b = s.getAttribute("data-css-before") ? "before" : s.getAttribute("data-css-after") ? "after" : null,
                O = s.getAttribute("data-css-before") || s.getAttribute("data-css-after") || null;
            Promise.all(p.map(S => i(S, m, b, O))).then(() => {
                v && window.dispatchEvent(t(v + "-css"))
            }).catch(S => {
                console.error(S)
            })
        }), e.directive("load-js", (s, {expression: c, modifiers: u}, {evaluate: p}) => {
            let m = p(c), v = new Set(u),
                b = s.getAttribute("data-js-before") ? "before" : s.getAttribute("data-js-after") ? "after" : null,
                O = s.getAttribute("data-js-before") || s.getAttribute("data-js-after") || null,
                S = s.getAttribute("data-dispatch");
            Promise.all(m.map(A => o(A, v, b, O))).then(() => {
                S && window.dispatchEvent(t(S + "-js"))
            }).catch(A => {
                console.error(A)
            })
        })
    }

    var Jo = la;

    function Qo(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(e);
            t && (r = r.filter(function (i) {
                return Object.getOwnPropertyDescriptor(e, i).enumerable
            })), n.push.apply(n, r)
        }
        return n
    }

    function St(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t] != null ? arguments[t] : {};
            t % 2 ? Qo(Object(n), !0).forEach(function (r) {
                ca(e, r, n[r])
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Qo(Object(n)).forEach(function (r) {
                Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r))
            })
        }
        return e
    }

    function mr(e) {
        "@babel/helpers - typeof";
        return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? mr = function (t) {
            return typeof t
        } : mr = function (t) {
            return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }, mr(e)
    }

    function ca(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function It() {
        return It = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }, It.apply(this, arguments)
    }

    function ua(e, t) {
        if (e == null) return {};
        var n = {}, r = Object.keys(e), i, o;
        for (o = 0; o < r.length; o++) i = r[o], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
        return n
    }

    function fa(e, t) {
        if (e == null) return {};
        var n = ua(e, t), r, i;
        if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(e);
            for (i = 0; i < o.length; i++) r = o[i], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r])
        }
        return n
    }

    var da = "1.15.1";

    function Rt(e) {
        if (typeof window < "u" && window.navigator) return !!navigator.userAgent.match(e)
    }

    var Lt = Rt(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), Gn = Rt(/Edge/i), Zo = Rt(/firefox/i),
        Un = Rt(/safari/i) && !Rt(/chrome/i) && !Rt(/android/i), si = Rt(/iP(ad|od|hone)/i),
        li = Rt(/chrome/i) && Rt(/android/i), ci = {capture: !1, passive: !1};

    function we(e, t, n) {
        e.addEventListener(t, n, !Lt && ci)
    }

    function me(e, t, n) {
        e.removeEventListener(t, n, !Lt && ci)
    }

    function xr(e, t) {
        if (t) {
            if (t[0] === ">" && (t = t.substring(1)), e) try {
                if (e.matches) return e.matches(t);
                if (e.msMatchesSelector) return e.msMatchesSelector(t);
                if (e.webkitMatchesSelector) return e.webkitMatchesSelector(t)
            } catch {
                return !1
            }
            return !1
        }
    }

    function pa(e) {
        return e.host && e !== document && e.host.nodeType ? e.host : e.parentNode
    }

    function xt(e, t, n, r) {
        if (e) {
            n = n || document;
            do {
                if (t != null && (t[0] === ">" ? e.parentNode === n && xr(e, t) : xr(e, t)) || r && e === n) return e;
                if (e === n) break
            } while (e = pa(e))
        }
        return null
    }

    var ei = /\s+/g;

    function it(e, t, n) {
        if (e && t) if (e.classList) e.classList[n ? "add" : "remove"](t); else {
            var r = (" " + e.className + " ").replace(ei, " ").replace(" " + t + " ", " ");
            e.className = (r + (n ? " " + t : "")).replace(ei, " ")
        }
    }

    function W(e, t, n) {
        var r = e && e.style;
        if (r) {
            if (n === void 0) return document.defaultView && document.defaultView.getComputedStyle ? n = document.defaultView.getComputedStyle(e, "") : e.currentStyle && (n = e.currentStyle), t === void 0 ? n : n[t];
            !(t in r) && t.indexOf("webkit") === -1 && (t = "-webkit-" + t), r[t] = n + (typeof n == "string" ? "" : "px")
        }
    }

    function Dn(e, t) {
        var n = "";
        if (typeof e == "string") n = e; else do {
            var r = W(e, "transform");
            r && r !== "none" && (n = r + " " + n)
        } while (!t && (e = e.parentNode));
        var i = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
        return i && new i(n)
    }

    function ui(e, t, n) {
        if (e) {
            var r = e.getElementsByTagName(t), i = 0, o = r.length;
            if (n) for (; i < o; i++) n(r[i], i);
            return r
        }
        return []
    }

    function Ot() {
        var e = document.scrollingElement;
        return e || document.documentElement
    }

    function Xe(e, t, n, r, i) {
        if (!(!e.getBoundingClientRect && e !== window)) {
            var o, s, c, u, p, m, v;
            if (e !== window && e.parentNode && e !== Ot() ? (o = e.getBoundingClientRect(), s = o.top, c = o.left, u = o.bottom, p = o.right, m = o.height, v = o.width) : (s = 0, c = 0, u = window.innerHeight, p = window.innerWidth, m = window.innerHeight, v = window.innerWidth), (t || n) && e !== window && (i = i || e.parentNode, !Lt)) do if (i && i.getBoundingClientRect && (W(i, "transform") !== "none" || n && W(i, "position") !== "static")) {
                var b = i.getBoundingClientRect();
                s -= b.top + parseInt(W(i, "border-top-width")), c -= b.left + parseInt(W(i, "border-left-width")), u = s + o.height, p = c + o.width;
                break
            } while (i = i.parentNode);
            if (r && e !== window) {
                var O = Dn(i || e), S = O && O.a, A = O && O.d;
                O && (s /= A, c /= S, v /= S, m /= A, u = s + m, p = c + v)
            }
            return {top: s, left: c, bottom: u, right: p, width: v, height: m}
        }
    }

    function fi(e) {
        var t = Xe(e), n = parseInt(W(e, "padding-left")), r = parseInt(W(e, "padding-top")),
            i = parseInt(W(e, "padding-right")), o = parseInt(W(e, "padding-bottom"));
        return t.top += r + parseInt(W(e, "border-top-width")), t.left += n + parseInt(W(e, "border-left-width")), t.width = e.clientWidth - n - i, t.height = e.clientHeight - r - o, t.bottom = t.top + t.height, t.right = t.left + t.width, t
    }

    function ti(e, t, n) {
        for (var r = Zt(e, !0), i = Xe(e)[t]; r;) {
            var o = Xe(r)[n], s = void 0;
            if (n === "top" || n === "left" ? s = i >= o : s = i <= o, !s) return r;
            if (r === Ot()) break;
            r = Zt(r, !1)
        }
        return !1
    }

    function Tn(e, t, n, r) {
        for (var i = 0, o = 0, s = e.children; o < s.length;) {
            if (s[o].style.display !== "none" && s[o] !== q.ghost && (r || s[o] !== q.dragged) && xt(s[o], n.draggable, e, !1)) {
                if (i === t) return s[o];
                i++
            }
            o++
        }
        return null
    }

    function po(e, t) {
        for (var n = e.lastElementChild; n && (n === q.ghost || W(n, "display") === "none" || t && !xr(n, t));) n = n.previousElementSibling;
        return n || null
    }

    function ct(e, t) {
        var n = 0;
        if (!e || !e.parentNode) return -1;
        for (; e = e.previousElementSibling;) e.nodeName.toUpperCase() !== "TEMPLATE" && e !== q.clone && (!t || xr(e, t)) && n++;
        return n
    }

    function ni(e) {
        var t = 0, n = 0, r = Ot();
        if (e) do {
            var i = Dn(e), o = i.a, s = i.d;
            t += e.scrollLeft * o, n += e.scrollTop * s
        } while (e !== r && (e = e.parentNode));
        return [t, n]
    }

    function ha(e, t) {
        for (var n in e) if (e.hasOwnProperty(n)) {
            for (var r in t) if (t.hasOwnProperty(r) && t[r] === e[n][r]) return Number(n)
        }
        return -1
    }

    function Zt(e, t) {
        if (!e || !e.getBoundingClientRect) return Ot();
        var n = e, r = !1;
        do if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
            var i = W(n);
            if (n.clientWidth < n.scrollWidth && (i.overflowX == "auto" || i.overflowX == "scroll") || n.clientHeight < n.scrollHeight && (i.overflowY == "auto" || i.overflowY == "scroll")) {
                if (!n.getBoundingClientRect || n === document.body) return Ot();
                if (r || t) return n;
                r = !0
            }
        } while (n = n.parentNode);
        return Ot()
    }

    function va(e, t) {
        if (e && t) for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
        return e
    }

    function Zr(e, t) {
        return Math.round(e.top) === Math.round(t.top) && Math.round(e.left) === Math.round(t.left) && Math.round(e.height) === Math.round(t.height) && Math.round(e.width) === Math.round(t.width)
    }

    var Xn;

    function di(e, t) {
        return function () {
            if (!Xn) {
                var n = arguments, r = this;
                n.length === 1 ? e.call(r, n[0]) : e.apply(r, n), Xn = setTimeout(function () {
                    Xn = void 0
                }, t)
            }
        }
    }

    function ga() {
        clearTimeout(Xn), Xn = void 0
    }

    function pi(e, t, n) {
        e.scrollLeft += t, e.scrollTop += n
    }

    function hi(e) {
        var t = window.Polymer, n = window.jQuery || window.Zepto;
        return t && t.dom ? t.dom(e).cloneNode(!0) : n ? n(e).clone(!0)[0] : e.cloneNode(!0)
    }

    var st = "Sortable" + new Date().getTime();

    function ma() {
        var e = [], t;
        return {
            captureAnimationState: function () {
                if (e = [], !!this.options.animation) {
                    var r = [].slice.call(this.el.children);
                    r.forEach(function (i) {
                        if (!(W(i, "display") === "none" || i === q.ghost)) {
                            e.push({target: i, rect: Xe(i)});
                            var o = St({}, e[e.length - 1].rect);
                            if (i.thisAnimationDuration) {
                                var s = Dn(i, !0);
                                s && (o.top -= s.f, o.left -= s.e)
                            }
                            i.fromRect = o
                        }
                    })
                }
            }, addAnimationState: function (r) {
                e.push(r)
            }, removeAnimationState: function (r) {
                e.splice(ha(e, {target: r}), 1)
            }, animateAll: function (r) {
                var i = this;
                if (!this.options.animation) {
                    clearTimeout(t), typeof r == "function" && r();
                    return
                }
                var o = !1, s = 0;
                e.forEach(function (c) {
                    var u = 0, p = c.target, m = p.fromRect, v = Xe(p), b = p.prevFromRect, O = p.prevToRect,
                        S = c.rect, A = Dn(p, !0);
                    A && (v.top -= A.f, v.left -= A.e), p.toRect = v, p.thisAnimationDuration && Zr(b, v) && !Zr(m, v) && (S.top - v.top) / (S.left - v.left) === (m.top - v.top) / (m.left - v.left) && (u = ya(S, b, O, i.options)), Zr(v, m) || (p.prevFromRect = m, p.prevToRect = v, u || (u = i.options.animation), i.animate(p, S, v, u)), u && (o = !0, s = Math.max(s, u), clearTimeout(p.animationResetTimer), p.animationResetTimer = setTimeout(function () {
                        p.animationTime = 0, p.prevFromRect = null, p.fromRect = null, p.prevToRect = null, p.thisAnimationDuration = null
                    }, u), p.thisAnimationDuration = u)
                }), clearTimeout(t), o ? t = setTimeout(function () {
                    typeof r == "function" && r()
                }, s) : typeof r == "function" && r(), e = []
            }, animate: function (r, i, o, s) {
                if (s) {
                    W(r, "transition", ""), W(r, "transform", "");
                    var c = Dn(this.el), u = c && c.a, p = c && c.d, m = (i.left - o.left) / (u || 1),
                        v = (i.top - o.top) / (p || 1);
                    r.animatingX = !!m, r.animatingY = !!v, W(r, "transform", "translate3d(" + m + "px," + v + "px,0)"), this.forRepaintDummy = ba(r), W(r, "transition", "transform " + s + "ms" + (this.options.easing ? " " + this.options.easing : "")), W(r, "transform", "translate3d(0,0,0)"), typeof r.animated == "number" && clearTimeout(r.animated), r.animated = setTimeout(function () {
                        W(r, "transition", ""), W(r, "transform", ""), r.animated = !1, r.animatingX = !1, r.animatingY = !1
                    }, s)
                }
            }
        }
    }

    function ba(e) {
        return e.offsetWidth
    }

    function ya(e, t, n, r) {
        return Math.sqrt(Math.pow(t.top - e.top, 2) + Math.pow(t.left - e.left, 2)) / Math.sqrt(Math.pow(t.top - n.top, 2) + Math.pow(t.left - n.left, 2)) * r.animation
    }

    var On = [], eo = {initializeByDefault: !0}, Kn = {
        mount: function (t) {
            for (var n in eo) eo.hasOwnProperty(n) && !(n in t) && (t[n] = eo[n]);
            On.forEach(function (r) {
                if (r.pluginName === t.pluginName) throw "Sortable: Cannot mount plugin ".concat(t.pluginName, " more than once")
            }), On.push(t)
        }, pluginEvent: function (t, n, r) {
            var i = this;
            this.eventCanceled = !1, r.cancel = function () {
                i.eventCanceled = !0
            };
            var o = t + "Global";
            On.forEach(function (s) {
                n[s.pluginName] && (n[s.pluginName][o] && n[s.pluginName][o](St({sortable: n}, r)), n.options[s.pluginName] && n[s.pluginName][t] && n[s.pluginName][t](St({sortable: n}, r)))
            })
        }, initializePlugins: function (t, n, r, i) {
            On.forEach(function (c) {
                var u = c.pluginName;
                if (!(!t.options[u] && !c.initializeByDefault)) {
                    var p = new c(t, n, t.options);
                    p.sortable = t, p.options = t.options, t[u] = p, It(r, p.defaults)
                }
            });
            for (var o in t.options) if (t.options.hasOwnProperty(o)) {
                var s = this.modifyOption(t, o, t.options[o]);
                typeof s < "u" && (t.options[o] = s)
            }
        }, getEventProperties: function (t, n) {
            var r = {};
            return On.forEach(function (i) {
                typeof i.eventProperties == "function" && It(r, i.eventProperties.call(n[i.pluginName], t))
            }), r
        }, modifyOption: function (t, n, r) {
            var i;
            return On.forEach(function (o) {
                t[o.pluginName] && o.optionListeners && typeof o.optionListeners[n] == "function" && (i = o.optionListeners[n].call(t[o.pluginName], r))
            }), i
        }
    };

    function wa(e) {
        var t = e.sortable, n = e.rootEl, r = e.name, i = e.targetEl, o = e.cloneEl, s = e.toEl, c = e.fromEl,
            u = e.oldIndex, p = e.newIndex, m = e.oldDraggableIndex, v = e.newDraggableIndex, b = e.originalEvent,
            O = e.putSortable, S = e.extraEventProperties;
        if (t = t || n && n[st], !!t) {
            var A, B = t.options, F = "on" + r.charAt(0).toUpperCase() + r.substr(1);
            window.CustomEvent && !Lt && !Gn ? A = new CustomEvent(r, {
                bubbles: !0,
                cancelable: !0
            }) : (A = document.createEvent("Event"), A.initEvent(r, !0, !0)), A.to = s || n, A.from = c || n, A.item = i || n, A.clone = o, A.oldIndex = u, A.newIndex = p, A.oldDraggableIndex = m, A.newDraggableIndex = v, A.originalEvent = b, A.pullMode = O ? O.lastPutMode : void 0;
            var L = St(St({}, S), Kn.getEventProperties(r, t));
            for (var K in L) A[K] = L[K];
            n && n.dispatchEvent(A), B[F] && B[F].call(t, A)
        }
    }

    var Ea = ["evt"], rt = function (t, n) {
        var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i = r.evt, o = fa(r, Ea);
        Kn.pluginEvent.bind(q)(t, n, St({
            dragEl: T,
            parentEl: $e,
            ghostEl: oe,
            rootEl: Ie,
            nextEl: fn,
            lastDownEl: br,
            cloneEl: Fe,
            cloneHidden: Qt,
            dragStarted: $n,
            putSortable: Ge,
            activeSortable: q.active,
            originalEvent: i,
            oldIndex: Cn,
            oldDraggableIndex: Yn,
            newIndex: at,
            newDraggableIndex: Jt,
            hideGhostForTarget: bi,
            unhideGhostForTarget: yi,
            cloneNowHidden: function () {
                Qt = !0
            },
            cloneNowShown: function () {
                Qt = !1
            },
            dispatchSortableEvent: function (c) {
                et({sortable: n, name: c, originalEvent: i})
            }
        }, o))
    };

    function et(e) {
        wa(St({
            putSortable: Ge,
            cloneEl: Fe,
            targetEl: T,
            rootEl: Ie,
            oldIndex: Cn,
            oldDraggableIndex: Yn,
            newIndex: at,
            newDraggableIndex: Jt
        }, e))
    }

    var T, $e, oe, Ie, fn, br, Fe, Qt, Cn, at, Yn, Jt, pr, Ge, An = !1, Or = !1, Sr = [], cn, vt, to, no, ri, oi, $n,
        Sn, zn, qn = !1, hr = !1, yr, Qe, ro = [], lo = !1, Ar = [], Dr = typeof document < "u", vr = si,
        ii = Gn || Lt ? "cssFloat" : "float", xa = Dr && !li && !si && "draggable" in document.createElement("div"),
        vi = function () {
            if (Dr) {
                if (Lt) return !1;
                var e = document.createElement("x");
                return e.style.cssText = "pointer-events:auto", e.style.pointerEvents === "auto"
            }
        }(), gi = function (t, n) {
            var r = W(t),
                i = parseInt(r.width) - parseInt(r.paddingLeft) - parseInt(r.paddingRight) - parseInt(r.borderLeftWidth) - parseInt(r.borderRightWidth),
                o = Tn(t, 0, n), s = Tn(t, 1, n), c = o && W(o), u = s && W(s),
                p = c && parseInt(c.marginLeft) + parseInt(c.marginRight) + Xe(o).width,
                m = u && parseInt(u.marginLeft) + parseInt(u.marginRight) + Xe(s).width;
            if (r.display === "flex") return r.flexDirection === "column" || r.flexDirection === "column-reverse" ? "vertical" : "horizontal";
            if (r.display === "grid") return r.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
            if (o && c.float && c.float !== "none") {
                var v = c.float === "left" ? "left" : "right";
                return s && (u.clear === "both" || u.clear === v) ? "vertical" : "horizontal"
            }
            return o && (c.display === "block" || c.display === "flex" || c.display === "table" || c.display === "grid" || p >= i && r[ii] === "none" || s && r[ii] === "none" && p + m > i) ? "vertical" : "horizontal"
        }, Oa = function (t, n, r) {
            var i = r ? t.left : t.top, o = r ? t.right : t.bottom, s = r ? t.width : t.height, c = r ? n.left : n.top,
                u = r ? n.right : n.bottom, p = r ? n.width : n.height;
            return i === c || o === u || i + s / 2 === c + p / 2
        }, Sa = function (t, n) {
            var r;
            return Sr.some(function (i) {
                var o = i[st].options.emptyInsertThreshold;
                if (!(!o || po(i))) {
                    var s = Xe(i), c = t >= s.left - o && t <= s.right + o, u = n >= s.top - o && n <= s.bottom + o;
                    if (c && u) return r = i
                }
            }), r
        }, mi = function (t) {
            function n(o, s) {
                return function (c, u, p, m) {
                    var v = c.options.group.name && u.options.group.name && c.options.group.name === u.options.group.name;
                    if (o == null && (s || v)) return !0;
                    if (o == null || o === !1) return !1;
                    if (s && o === "clone") return o;
                    if (typeof o == "function") return n(o(c, u, p, m), s)(c, u, p, m);
                    var b = (s ? c : u).options.group.name;
                    return o === !0 || typeof o == "string" && o === b || o.join && o.indexOf(b) > -1
                }
            }

            var r = {}, i = t.group;
            (!i || mr(i) != "object") && (i = {name: i}), r.name = i.name, r.checkPull = n(i.pull, !0), r.checkPut = n(i.put), r.revertClone = i.revertClone, t.group = r
        }, bi = function () {
            !vi && oe && W(oe, "display", "none")
        }, yi = function () {
            !vi && oe && W(oe, "display", "")
        };
    Dr && !li && document.addEventListener("click", function (e) {
        if (Or) return e.preventDefault(), e.stopPropagation && e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), Or = !1, !1
    }, !0);
    var un = function (t) {
        if (T) {
            t = t.touches ? t.touches[0] : t;
            var n = Sa(t.clientX, t.clientY);
            if (n) {
                var r = {};
                for (var i in t) t.hasOwnProperty(i) && (r[i] = t[i]);
                r.target = r.rootEl = n, r.preventDefault = void 0, r.stopPropagation = void 0, n[st]._onDragOver(r)
            }
        }
    }, Aa = function (t) {
        T && T.parentNode[st]._isOutsideThisEl(t.target)
    };

    function q(e, t) {
        if (!(e && e.nodeType && e.nodeType === 1)) throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(e));
        this.el = e, this.options = t = It({}, t), e[st] = this;
        var n = {
            group: null,
            sort: !0,
            disabled: !1,
            store: null,
            handle: null,
            draggable: /^[uo]l$/i.test(e.nodeName) ? ">li" : ">*",
            swapThreshold: 1,
            invertSwap: !1,
            invertedSwapThreshold: null,
            removeCloneOnHide: !0,
            direction: function () {
                return gi(e, this.options)
            },
            ghostClass: "sortable-ghost",
            chosenClass: "sortable-chosen",
            dragClass: "sortable-drag",
            ignore: "a, img",
            filter: null,
            preventOnFilter: !0,
            animation: 0,
            easing: null,
            setData: function (s, c) {
                s.setData("Text", c.textContent)
            },
            dropBubble: !1,
            dragoverBubble: !1,
            dataIdAttr: "data-id",
            delay: 0,
            delayOnTouchOnly: !1,
            touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
            forceFallback: !1,
            fallbackClass: "sortable-fallback",
            fallbackOnBody: !1,
            fallbackTolerance: 0,
            fallbackOffset: {x: 0, y: 0},
            supportPointer: q.supportPointer !== !1 && "PointerEvent" in window && !Un,
            emptyInsertThreshold: 5
        };
        Kn.initializePlugins(this, e, n);
        for (var r in n) !(r in t) && (t[r] = n[r]);
        mi(t);
        for (var i in this) i.charAt(0) === "_" && typeof this[i] == "function" && (this[i] = this[i].bind(this));
        this.nativeDraggable = t.forceFallback ? !1 : xa, this.nativeDraggable && (this.options.touchStartThreshold = 1), t.supportPointer ? we(e, "pointerdown", this._onTapStart) : (we(e, "mousedown", this._onTapStart), we(e, "touchstart", this._onTapStart)), this.nativeDraggable && (we(e, "dragover", this), we(e, "dragenter", this)), Sr.push(this.el), t.store && t.store.get && this.sort(t.store.get(this) || []), It(this, ma())
    }

    q.prototype = {
        constructor: q, _isOutsideThisEl: function (t) {
            !this.el.contains(t) && t !== this.el && (Sn = null)
        }, _getDirection: function (t, n) {
            return typeof this.options.direction == "function" ? this.options.direction.call(this, t, n, T) : this.options.direction
        }, _onTapStart: function (t) {
            if (t.cancelable) {
                var n = this, r = this.el, i = this.options, o = i.preventOnFilter, s = t.type,
                    c = t.touches && t.touches[0] || t.pointerType && t.pointerType === "touch" && t,
                    u = (c || t).target,
                    p = t.target.shadowRoot && (t.path && t.path[0] || t.composedPath && t.composedPath()[0]) || u,
                    m = i.filter;
                if (Ia(r), !T && !(/mousedown|pointerdown/.test(s) && t.button !== 0 || i.disabled) && !p.isContentEditable && !(!this.nativeDraggable && Un && u && u.tagName.toUpperCase() === "SELECT") && (u = xt(u, i.draggable, r, !1), !(u && u.animated) && br !== u)) {
                    if (Cn = ct(u), Yn = ct(u, i.draggable), typeof m == "function") {
                        if (m.call(this, t, u, this)) {
                            et({
                                sortable: n,
                                rootEl: p,
                                name: "filter",
                                targetEl: u,
                                toEl: r,
                                fromEl: r
                            }), rt("filter", n, {evt: t}), o && t.cancelable && t.preventDefault();
                            return
                        }
                    } else if (m && (m = m.split(",").some(function (v) {
                        if (v = xt(p, v.trim(), r, !1), v) return et({
                            sortable: n,
                            rootEl: v,
                            name: "filter",
                            targetEl: u,
                            fromEl: r,
                            toEl: r
                        }), rt("filter", n, {evt: t}), !0
                    }), m)) {
                        o && t.cancelable && t.preventDefault();
                        return
                    }
                    i.handle && !xt(p, i.handle, r, !1) || this._prepareDragStart(t, c, u)
                }
            }
        }, _prepareDragStart: function (t, n, r) {
            var i = this, o = i.el, s = i.options, c = o.ownerDocument, u;
            if (r && !T && r.parentNode === o) {
                var p = Xe(r);
                if (Ie = o, T = r, $e = T.parentNode, fn = T.nextSibling, br = r, pr = s.group, q.dragged = T, cn = {
                    target: T,
                    clientX: (n || t).clientX,
                    clientY: (n || t).clientY
                }, ri = cn.clientX - p.left, oi = cn.clientY - p.top, this._lastX = (n || t).clientX, this._lastY = (n || t).clientY, T.style["will-change"] = "all", u = function () {
                    if (rt("delayEnded", i, {evt: t}), q.eventCanceled) {
                        i._onDrop();
                        return
                    }
                    i._disableDelayedDragEvents(), !Zo && i.nativeDraggable && (T.draggable = !0), i._triggerDragStart(t, n), et({
                        sortable: i,
                        name: "choose",
                        originalEvent: t
                    }), it(T, s.chosenClass, !0)
                }, s.ignore.split(",").forEach(function (m) {
                    ui(T, m.trim(), oo)
                }), we(c, "dragover", un), we(c, "mousemove", un), we(c, "touchmove", un), we(c, "mouseup", i._onDrop), we(c, "touchend", i._onDrop), we(c, "touchcancel", i._onDrop), Zo && this.nativeDraggable && (this.options.touchStartThreshold = 4, T.draggable = !0), rt("delayStart", this, {evt: t}), s.delay && (!s.delayOnTouchOnly || n) && (!this.nativeDraggable || !(Gn || Lt))) {
                    if (q.eventCanceled) {
                        this._onDrop();
                        return
                    }
                    we(c, "mouseup", i._disableDelayedDrag), we(c, "touchend", i._disableDelayedDrag), we(c, "touchcancel", i._disableDelayedDrag), we(c, "mousemove", i._delayedDragTouchMoveHandler), we(c, "touchmove", i._delayedDragTouchMoveHandler), s.supportPointer && we(c, "pointermove", i._delayedDragTouchMoveHandler), i._dragStartTimer = setTimeout(u, s.delay)
                } else u()
            }
        }, _delayedDragTouchMoveHandler: function (t) {
            var n = t.touches ? t.touches[0] : t;
            Math.max(Math.abs(n.clientX - this._lastX), Math.abs(n.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag()
        }, _disableDelayedDrag: function () {
            T && oo(T), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents()
        }, _disableDelayedDragEvents: function () {
            var t = this.el.ownerDocument;
            me(t, "mouseup", this._disableDelayedDrag), me(t, "touchend", this._disableDelayedDrag), me(t, "touchcancel", this._disableDelayedDrag), me(t, "mousemove", this._delayedDragTouchMoveHandler), me(t, "touchmove", this._delayedDragTouchMoveHandler), me(t, "pointermove", this._delayedDragTouchMoveHandler)
        }, _triggerDragStart: function (t, n) {
            n = n || t.pointerType == "touch" && t, !this.nativeDraggable || n ? this.options.supportPointer ? we(document, "pointermove", this._onTouchMove) : n ? we(document, "touchmove", this._onTouchMove) : we(document, "mousemove", this._onTouchMove) : (we(T, "dragend", this), we(Ie, "dragstart", this._onDragStart));
            try {
                document.selection ? wr(function () {
                    document.selection.empty()
                }) : window.getSelection().removeAllRanges()
            } catch {
            }
        }, _dragStarted: function (t, n) {
            if (An = !1, Ie && T) {
                rt("dragStarted", this, {evt: n}), this.nativeDraggable && we(document, "dragover", Aa);
                var r = this.options;
                !t && it(T, r.dragClass, !1), it(T, r.ghostClass, !0), q.active = this, t && this._appendGhost(), et({
                    sortable: this,
                    name: "start",
                    originalEvent: n
                })
            } else this._nulling()
        }, _emulateDragOver: function () {
            if (vt) {
                this._lastX = vt.clientX, this._lastY = vt.clientY, bi();
                for (var t = document.elementFromPoint(vt.clientX, vt.clientY), n = t; t && t.shadowRoot && (t = t.shadowRoot.elementFromPoint(vt.clientX, vt.clientY), t !== n);) n = t;
                if (T.parentNode[st]._isOutsideThisEl(t), n) do {
                    if (n[st]) {
                        var r = void 0;
                        if (r = n[st]._onDragOver({
                            clientX: vt.clientX,
                            clientY: vt.clientY,
                            target: t,
                            rootEl: n
                        }), r && !this.options.dragoverBubble) break
                    }
                    t = n
                } while (n = n.parentNode);
                yi()
            }
        }, _onTouchMove: function (t) {
            if (cn) {
                var n = this.options, r = n.fallbackTolerance, i = n.fallbackOffset, o = t.touches ? t.touches[0] : t,
                    s = oe && Dn(oe, !0), c = oe && s && s.a, u = oe && s && s.d, p = vr && Qe && ni(Qe),
                    m = (o.clientX - cn.clientX + i.x) / (c || 1) + (p ? p[0] - ro[0] : 0) / (c || 1),
                    v = (o.clientY - cn.clientY + i.y) / (u || 1) + (p ? p[1] - ro[1] : 0) / (u || 1);
                if (!q.active && !An) {
                    if (r && Math.max(Math.abs(o.clientX - this._lastX), Math.abs(o.clientY - this._lastY)) < r) return;
                    this._onDragStart(t, !0)
                }
                if (oe) {
                    s ? (s.e += m - (to || 0), s.f += v - (no || 0)) : s = {a: 1, b: 0, c: 0, d: 1, e: m, f: v};
                    var b = "matrix(".concat(s.a, ",").concat(s.b, ",").concat(s.c, ",").concat(s.d, ",").concat(s.e, ",").concat(s.f, ")");
                    W(oe, "webkitTransform", b), W(oe, "mozTransform", b), W(oe, "msTransform", b), W(oe, "transform", b), to = m, no = v, vt = o
                }
                t.cancelable && t.preventDefault()
            }
        }, _appendGhost: function () {
            if (!oe) {
                var t = this.options.fallbackOnBody ? document.body : Ie, n = Xe(T, !0, vr, !0, t), r = this.options;
                if (vr) {
                    for (Qe = t; W(Qe, "position") === "static" && W(Qe, "transform") === "none" && Qe !== document;) Qe = Qe.parentNode;
                    Qe !== document.body && Qe !== document.documentElement ? (Qe === document && (Qe = Ot()), n.top += Qe.scrollTop, n.left += Qe.scrollLeft) : Qe = Ot(), ro = ni(Qe)
                }
                oe = T.cloneNode(!0), it(oe, r.ghostClass, !1), it(oe, r.fallbackClass, !0), it(oe, r.dragClass, !0), W(oe, "transition", ""), W(oe, "transform", ""), W(oe, "box-sizing", "border-box"), W(oe, "margin", 0), W(oe, "top", n.top), W(oe, "left", n.left), W(oe, "width", n.width), W(oe, "height", n.height), W(oe, "opacity", "0.8"), W(oe, "position", vr ? "absolute" : "fixed"), W(oe, "zIndex", "100000"), W(oe, "pointerEvents", "none"), q.ghost = oe, t.appendChild(oe), W(oe, "transform-origin", ri / parseInt(oe.style.width) * 100 + "% " + oi / parseInt(oe.style.height) * 100 + "%")
            }
        }, _onDragStart: function (t, n) {
            var r = this, i = t.dataTransfer, o = r.options;
            if (rt("dragStart", this, {evt: t}), q.eventCanceled) {
                this._onDrop();
                return
            }
            rt("setupClone", this), q.eventCanceled || (Fe = hi(T), Fe.removeAttribute("id"), Fe.draggable = !1, Fe.style["will-change"] = "", this._hideClone(), it(Fe, this.options.chosenClass, !1), q.clone = Fe), r.cloneId = wr(function () {
                rt("clone", r), !q.eventCanceled && (r.options.removeCloneOnHide || Ie.insertBefore(Fe, T), r._hideClone(), et({
                    sortable: r,
                    name: "clone"
                }))
            }), !n && it(T, o.dragClass, !0), n ? (Or = !0, r._loopId = setInterval(r._emulateDragOver, 50)) : (me(document, "mouseup", r._onDrop), me(document, "touchend", r._onDrop), me(document, "touchcancel", r._onDrop), i && (i.effectAllowed = "move", o.setData && o.setData.call(r, i, T)), we(document, "drop", r), W(T, "transform", "translateZ(0)")), An = !0, r._dragStartId = wr(r._dragStarted.bind(r, n, t)), we(document, "selectstart", r), $n = !0, Un && W(document.body, "user-select", "none")
        }, _onDragOver: function (t) {
            var n = this.el, r = t.target, i, o, s, c = this.options, u = c.group, p = q.active, m = pr === u,
                v = c.sort, b = Ge || p, O, S = this, A = !1;
            if (lo) return;

            function B(tt, Nt) {
                rt(tt, S, St({
                    evt: t,
                    isOwner: m,
                    axis: O ? "vertical" : "horizontal",
                    revert: s,
                    dragRect: i,
                    targetRect: o,
                    canSort: v,
                    fromSortable: b,
                    target: r,
                    completed: L,
                    onMove: function (pn, _n) {
                        return gr(Ie, n, T, i, pn, Xe(pn), t, _n)
                    },
                    changed: K
                }, Nt))
            }

            function F() {
                B("dragOverAnimationCapture"), S.captureAnimationState(), S !== b && b.captureAnimationState()
            }

            function L(tt) {
                return B("dragOverCompleted", {insertion: tt}), tt && (m ? p._hideClone() : p._showClone(S), S !== b && (it(T, Ge ? Ge.options.ghostClass : p.options.ghostClass, !1), it(T, c.ghostClass, !0)), Ge !== S && S !== q.active ? Ge = S : S === q.active && Ge && (Ge = null), b === S && (S._ignoreWhileAnimating = r), S.animateAll(function () {
                    B("dragOverAnimationComplete"), S._ignoreWhileAnimating = null
                }), S !== b && (b.animateAll(), b._ignoreWhileAnimating = null)), (r === T && !T.animated || r === n && !r.animated) && (Sn = null), !c.dragoverBubble && !t.rootEl && r !== document && (T.parentNode[st]._isOutsideThisEl(t.target), !tt && un(t)), !c.dragoverBubble && t.stopPropagation && t.stopPropagation(), A = !0
            }

            function K() {
                at = ct(T), Jt = ct(T, c.draggable), et({
                    sortable: S,
                    name: "change",
                    toEl: n,
                    newIndex: at,
                    newDraggableIndex: Jt,
                    originalEvent: t
                })
            }

            if (t.preventDefault !== void 0 && t.cancelable && t.preventDefault(), r = xt(r, c.draggable, n, !0), B("dragOver"), q.eventCanceled) return A;
            if (T.contains(t.target) || r.animated && r.animatingX && r.animatingY || S._ignoreWhileAnimating === r) return L(!1);
            if (Or = !1, p && !c.disabled && (m ? v || (s = $e !== Ie) : Ge === this || (this.lastPutMode = pr.checkPull(this, p, T, t)) && u.checkPut(this, p, T, t))) {
                if (O = this._getDirection(t, r) === "vertical", i = Xe(T), B("dragOverValid"), q.eventCanceled) return A;
                if (s) return $e = Ie, F(), this._hideClone(), B("revert"), q.eventCanceled || (fn ? Ie.insertBefore(T, fn) : Ie.appendChild(T)), L(!0);
                var V = po(n, c.draggable);
                if (!V || _a(t, O, this) && !V.animated) {
                    if (V === T) return L(!1);
                    if (V && n === t.target && (r = V), r && (o = Xe(r)), gr(Ie, n, T, i, r, o, t, !!r) !== !1) return F(), V && V.nextSibling ? n.insertBefore(T, V.nextSibling) : n.appendChild(T), $e = n, K(), L(!0)
                } else if (V && Ta(t, O, this)) {
                    var he = Tn(n, 0, c, !0);
                    if (he === T) return L(!1);
                    if (r = he, o = Xe(r), gr(Ie, n, T, i, r, o, t, !1) !== !1) return F(), n.insertBefore(T, he), $e = n, K(), L(!0)
                } else if (r.parentNode === n) {
                    o = Xe(r);
                    var ee = 0, Z, de = T.parentNode !== n,
                        N = !Oa(T.animated && T.toRect || i, r.animated && r.toRect || o, O), ae = O ? "top" : "left",
                        ue = ti(r, "top", "top") || ti(T, "top", "top"), Ae = ue ? ue.scrollTop : void 0;
                    Sn !== r && (Z = o[ae], qn = !1, hr = !N && c.invertSwap || de), ee = Pa(t, r, o, O, N ? 1 : c.swapThreshold, c.invertedSwapThreshold == null ? c.swapThreshold : c.invertedSwapThreshold, hr, Sn === r);
                    var pe;
                    if (ee !== 0) {
                        var ve = ct(T);
                        do ve -= ee, pe = $e.children[ve]; while (pe && (W(pe, "display") === "none" || pe === oe))
                    }
                    if (ee === 0 || pe === r) return L(!1);
                    Sn = r, zn = ee;
                    var We = r.nextElementSibling, Le = !1;
                    Le = ee === 1;
                    var Te = gr(Ie, n, T, i, r, o, t, Le);
                    if (Te !== !1) return (Te === 1 || Te === -1) && (Le = Te === 1), lo = !0, setTimeout(Da, 30), F(), Le && !We ? n.appendChild(T) : r.parentNode.insertBefore(T, Le ? We : r), ue && pi(ue, 0, Ae - ue.scrollTop), $e = T.parentNode, Z !== void 0 && !hr && (yr = Math.abs(Z - Xe(r)[ae])), K(), L(!0)
                }
                if (n.contains(T)) return L(!1)
            }
            return !1
        }, _ignoreWhileAnimating: null, _offMoveEvents: function () {
            me(document, "mousemove", this._onTouchMove), me(document, "touchmove", this._onTouchMove), me(document, "pointermove", this._onTouchMove), me(document, "dragover", un), me(document, "mousemove", un), me(document, "touchmove", un)
        }, _offUpEvents: function () {
            var t = this.el.ownerDocument;
            me(t, "mouseup", this._onDrop), me(t, "touchend", this._onDrop), me(t, "pointerup", this._onDrop), me(t, "touchcancel", this._onDrop), me(document, "selectstart", this)
        }, _onDrop: function (t) {
            var n = this.el, r = this.options;
            if (at = ct(T), Jt = ct(T, r.draggable), rt("drop", this, {evt: t}), $e = T && T.parentNode, at = ct(T), Jt = ct(T, r.draggable), q.eventCanceled) {
                this._nulling();
                return
            }
            An = !1, hr = !1, qn = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), co(this.cloneId), co(this._dragStartId), this.nativeDraggable && (me(document, "drop", this), me(n, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), Un && W(document.body, "user-select", ""), W(T, "transform", ""), t && ($n && (t.cancelable && t.preventDefault(), !r.dropBubble && t.stopPropagation()), oe && oe.parentNode && oe.parentNode.removeChild(oe), (Ie === $e || Ge && Ge.lastPutMode !== "clone") && Fe && Fe.parentNode && Fe.parentNode.removeChild(Fe), T && (this.nativeDraggable && me(T, "dragend", this), oo(T), T.style["will-change"] = "", $n && !An && it(T, Ge ? Ge.options.ghostClass : this.options.ghostClass, !1), it(T, this.options.chosenClass, !1), et({
                sortable: this,
                name: "unchoose",
                toEl: $e,
                newIndex: null,
                newDraggableIndex: null,
                originalEvent: t
            }), Ie !== $e ? (at >= 0 && (et({
                rootEl: $e,
                name: "add",
                toEl: $e,
                fromEl: Ie,
                originalEvent: t
            }), et({sortable: this, name: "remove", toEl: $e, originalEvent: t}), et({
                rootEl: $e,
                name: "sort",
                toEl: $e,
                fromEl: Ie,
                originalEvent: t
            }), et({
                sortable: this,
                name: "sort",
                toEl: $e,
                originalEvent: t
            })), Ge && Ge.save()) : at !== Cn && at >= 0 && (et({
                sortable: this,
                name: "update",
                toEl: $e,
                originalEvent: t
            }), et({
                sortable: this,
                name: "sort",
                toEl: $e,
                originalEvent: t
            })), q.active && ((at == null || at === -1) && (at = Cn, Jt = Yn), et({
                sortable: this,
                name: "end",
                toEl: $e,
                originalEvent: t
            }), this.save()))), this._nulling()
        }, _nulling: function () {
            rt("nulling", this), Ie = T = $e = oe = fn = Fe = br = Qt = cn = vt = $n = at = Jt = Cn = Yn = Sn = zn = Ge = pr = q.dragged = q.ghost = q.clone = q.active = null, Ar.forEach(function (t) {
                t.checked = !0
            }), Ar.length = to = no = 0
        }, handleEvent: function (t) {
            switch (t.type) {
                case"drop":
                case"dragend":
                    this._onDrop(t);
                    break;
                case"dragenter":
                case"dragover":
                    T && (this._onDragOver(t), Ca(t));
                    break;
                case"selectstart":
                    t.preventDefault();
                    break
            }
        }, toArray: function () {
            for (var t = [], n, r = this.el.children, i = 0, o = r.length, s = this.options; i < o; i++) n = r[i], xt(n, s.draggable, this.el, !1) && t.push(n.getAttribute(s.dataIdAttr) || Ra(n));
            return t
        }, sort: function (t, n) {
            var r = {}, i = this.el;
            this.toArray().forEach(function (o, s) {
                var c = i.children[s];
                xt(c, this.options.draggable, i, !1) && (r[o] = c)
            }, this), n && this.captureAnimationState(), t.forEach(function (o) {
                r[o] && (i.removeChild(r[o]), i.appendChild(r[o]))
            }), n && this.animateAll()
        }, save: function () {
            var t = this.options.store;
            t && t.set && t.set(this)
        }, closest: function (t, n) {
            return xt(t, n || this.options.draggable, this.el, !1)
        }, option: function (t, n) {
            var r = this.options;
            if (n === void 0) return r[t];
            var i = Kn.modifyOption(this, t, n);
            typeof i < "u" ? r[t] = i : r[t] = n, t === "group" && mi(r)
        }, destroy: function () {
            rt("destroy", this);
            var t = this.el;
            t[st] = null, me(t, "mousedown", this._onTapStart), me(t, "touchstart", this._onTapStart), me(t, "pointerdown", this._onTapStart), this.nativeDraggable && (me(t, "dragover", this), me(t, "dragenter", this)), Array.prototype.forEach.call(t.querySelectorAll("[draggable]"), function (n) {
                n.removeAttribute("draggable")
            }), this._onDrop(), this._disableDelayedDragEvents(), Sr.splice(Sr.indexOf(this.el), 1), this.el = t = null
        }, _hideClone: function () {
            if (!Qt) {
                if (rt("hideClone", this), q.eventCanceled) return;
                W(Fe, "display", "none"), this.options.removeCloneOnHide && Fe.parentNode && Fe.parentNode.removeChild(Fe), Qt = !0
            }
        }, _showClone: function (t) {
            if (t.lastPutMode !== "clone") {
                this._hideClone();
                return
            }
            if (Qt) {
                if (rt("showClone", this), q.eventCanceled) return;
                T.parentNode == Ie && !this.options.group.revertClone ? Ie.insertBefore(Fe, T) : fn ? Ie.insertBefore(Fe, fn) : Ie.appendChild(Fe), this.options.group.revertClone && this.animate(T, Fe), W(Fe, "display", ""), Qt = !1
            }
        }
    };

    function Ca(e) {
        e.dataTransfer && (e.dataTransfer.dropEffect = "move"), e.cancelable && e.preventDefault()
    }

    function gr(e, t, n, r, i, o, s, c) {
        var u, p = e[st], m = p.options.onMove, v;
        return window.CustomEvent && !Lt && !Gn ? u = new CustomEvent("move", {
            bubbles: !0,
            cancelable: !0
        }) : (u = document.createEvent("Event"), u.initEvent("move", !0, !0)), u.to = t, u.from = e, u.dragged = n, u.draggedRect = r, u.related = i || t, u.relatedRect = o || Xe(t), u.willInsertAfter = c, u.originalEvent = s, e.dispatchEvent(u), m && (v = m.call(p, u, s)), v
    }

    function oo(e) {
        e.draggable = !1
    }

    function Da() {
        lo = !1
    }

    function Ta(e, t, n) {
        var r = Xe(Tn(n.el, 0, n.options, !0)), i = fi(n.el), o = 10;
        return t ? e.clientX < i.left - o || e.clientY < r.top && e.clientX < r.right : e.clientY < i.top - o || e.clientY < r.bottom && e.clientX < r.left
    }

    function _a(e, t, n) {
        var r = Xe(po(n.el, n.options.draggable)), i = fi(n.el), o = 10;
        return t ? e.clientX > i.right + o || e.clientY > r.bottom && e.clientX > r.left : e.clientY > i.bottom + o || e.clientX > r.right && e.clientY > r.top
    }

    function Pa(e, t, n, r, i, o, s, c) {
        var u = r ? e.clientY : e.clientX, p = r ? n.height : n.width, m = r ? n.top : n.left,
            v = r ? n.bottom : n.right, b = !1;
        if (!s) {
            if (c && yr < p * i) {
                if (!qn && (zn === 1 ? u > m + p * o / 2 : u < v - p * o / 2) && (qn = !0), qn) b = !0; else if (zn === 1 ? u < m + yr : u > v - yr) return -zn
            } else if (u > m + p * (1 - i) / 2 && u < v - p * (1 - i) / 2) return Ma(t)
        }
        return b = b || s, b && (u < m + p * o / 2 || u > v - p * o / 2) ? u > m + p / 2 ? 1 : -1 : 0
    }

    function Ma(e) {
        return ct(T) < ct(e) ? 1 : -1
    }

    function Ra(e) {
        for (var t = e.tagName + e.className + e.src + e.href + e.textContent, n = t.length, r = 0; n--;) r += t.charCodeAt(n);
        return r.toString(36)
    }

    function Ia(e) {
        Ar.length = 0;
        for (var t = e.getElementsByTagName("input"), n = t.length; n--;) {
            var r = t[n];
            r.checked && Ar.push(r)
        }
    }

    function wr(e) {
        return setTimeout(e, 0)
    }

    function co(e) {
        return clearTimeout(e)
    }

    Dr && we(document, "touchmove", function (e) {
        (q.active || An) && e.cancelable && e.preventDefault()
    });
    q.utils = {
        on: we,
        off: me,
        css: W,
        find: ui,
        is: function (t, n) {
            return !!xt(t, n, t, !1)
        },
        extend: va,
        throttle: di,
        closest: xt,
        toggleClass: it,
        clone: hi,
        index: ct,
        nextTick: wr,
        cancelNextTick: co,
        detectDirection: gi,
        getChild: Tn
    };
    q.get = function (e) {
        return e[st]
    };
    q.mount = function () {
        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
        t[0].constructor === Array && (t = t[0]), t.forEach(function (r) {
            if (!r.prototype || !r.prototype.constructor) throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(r));
            r.utils && (q.utils = St(St({}, q.utils), r.utils)), Kn.mount(r)
        })
    };
    q.create = function (e, t) {
        return new q(e, t)
    };
    q.version = da;
    var Ue = [], Wn, uo, fo = !1, io, ao, Cr, Vn;

    function La() {
        function e() {
            this.defaults = {
                scroll: !0,
                forceAutoScrollFallback: !1,
                scrollSensitivity: 30,
                scrollSpeed: 10,
                bubbleScroll: !0
            };
            for (var t in this) t.charAt(0) === "_" && typeof this[t] == "function" && (this[t] = this[t].bind(this))
        }

        return e.prototype = {
            dragStarted: function (n) {
                var r = n.originalEvent;
                this.sortable.nativeDraggable ? we(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? we(document, "pointermove", this._handleFallbackAutoScroll) : r.touches ? we(document, "touchmove", this._handleFallbackAutoScroll) : we(document, "mousemove", this._handleFallbackAutoScroll)
            }, dragOverCompleted: function (n) {
                var r = n.originalEvent;
                !this.options.dragOverBubble && !r.rootEl && this._handleAutoScroll(r)
            }, drop: function () {
                this.sortable.nativeDraggable ? me(document, "dragover", this._handleAutoScroll) : (me(document, "pointermove", this._handleFallbackAutoScroll), me(document, "touchmove", this._handleFallbackAutoScroll), me(document, "mousemove", this._handleFallbackAutoScroll)), ai(), Er(), ga()
            }, nulling: function () {
                Cr = uo = Wn = fo = Vn = io = ao = null, Ue.length = 0
            }, _handleFallbackAutoScroll: function (n) {
                this._handleAutoScroll(n, !0)
            }, _handleAutoScroll: function (n, r) {
                var i = this, o = (n.touches ? n.touches[0] : n).clientX, s = (n.touches ? n.touches[0] : n).clientY,
                    c = document.elementFromPoint(o, s);
                if (Cr = n, r || this.options.forceAutoScrollFallback || Gn || Lt || Un) {
                    so(n, this.options, c, r);
                    var u = Zt(c, !0);
                    fo && (!Vn || o !== io || s !== ao) && (Vn && ai(), Vn = setInterval(function () {
                        var p = Zt(document.elementFromPoint(o, s), !0);
                        p !== u && (u = p, Er()), so(n, i.options, p, r)
                    }, 10), io = o, ao = s)
                } else {
                    if (!this.options.bubbleScroll || Zt(c, !0) === Ot()) {
                        Er();
                        return
                    }
                    so(n, this.options, Zt(c, !1), !1)
                }
            }
        }, It(e, {pluginName: "scroll", initializeByDefault: !0})
    }

    function Er() {
        Ue.forEach(function (e) {
            clearInterval(e.pid)
        }), Ue = []
    }

    function ai() {
        clearInterval(Vn)
    }

    var so = di(function (e, t, n, r) {
        if (t.scroll) {
            var i = (e.touches ? e.touches[0] : e).clientX, o = (e.touches ? e.touches[0] : e).clientY,
                s = t.scrollSensitivity, c = t.scrollSpeed, u = Ot(), p = !1, m;
            uo !== n && (uo = n, Er(), Wn = t.scroll, m = t.scrollFn, Wn === !0 && (Wn = Zt(n, !0)));
            var v = 0, b = Wn;
            do {
                var O = b, S = Xe(O), A = S.top, B = S.bottom, F = S.left, L = S.right, K = S.width, V = S.height,
                    he = void 0, ee = void 0, Z = O.scrollWidth, de = O.scrollHeight, N = W(O), ae = O.scrollLeft,
                    ue = O.scrollTop;
                O === u ? (he = K < Z && (N.overflowX === "auto" || N.overflowX === "scroll" || N.overflowX === "visible"), ee = V < de && (N.overflowY === "auto" || N.overflowY === "scroll" || N.overflowY === "visible")) : (he = K < Z && (N.overflowX === "auto" || N.overflowX === "scroll"), ee = V < de && (N.overflowY === "auto" || N.overflowY === "scroll"));
                var Ae = he && (Math.abs(L - i) <= s && ae + K < Z) - (Math.abs(F - i) <= s && !!ae),
                    pe = ee && (Math.abs(B - o) <= s && ue + V < de) - (Math.abs(A - o) <= s && !!ue);
                if (!Ue[v]) for (var ve = 0; ve <= v; ve++) Ue[ve] || (Ue[ve] = {});
                (Ue[v].vx != Ae || Ue[v].vy != pe || Ue[v].el !== O) && (Ue[v].el = O, Ue[v].vx = Ae, Ue[v].vy = pe, clearInterval(Ue[v].pid), (Ae != 0 || pe != 0) && (p = !0, Ue[v].pid = setInterval(function () {
                    r && this.layer === 0 && q.active._onTouchMove(Cr);
                    var We = Ue[this.layer].vy ? Ue[this.layer].vy * c : 0,
                        Le = Ue[this.layer].vx ? Ue[this.layer].vx * c : 0;
                    typeof m == "function" && m.call(q.dragged.parentNode[st], Le, We, e, Cr, Ue[this.layer].el) !== "continue" || pi(Ue[this.layer].el, Le, We)
                }.bind({layer: v}), 24))), v++
            } while (t.bubbleScroll && b !== u && (b = Zt(b, !1)));
            fo = p
        }
    }, 30), wi = function (t) {
        var n = t.originalEvent, r = t.putSortable, i = t.dragEl, o = t.activeSortable, s = t.dispatchSortableEvent,
            c = t.hideGhostForTarget, u = t.unhideGhostForTarget;
        if (n) {
            var p = r || o;
            c();
            var m = n.changedTouches && n.changedTouches.length ? n.changedTouches[0] : n,
                v = document.elementFromPoint(m.clientX, m.clientY);
            u(), p && !p.el.contains(v) && (s("spill"), this.onSpill({dragEl: i, putSortable: r}))
        }
    };

    function ho() {
    }

    ho.prototype = {
        startIndex: null, dragStart: function (t) {
            var n = t.oldDraggableIndex;
            this.startIndex = n
        }, onSpill: function (t) {
            var n = t.dragEl, r = t.putSortable;
            this.sortable.captureAnimationState(), r && r.captureAnimationState();
            var i = Tn(this.sortable.el, this.startIndex, this.options);
            i ? this.sortable.el.insertBefore(n, i) : this.sortable.el.appendChild(n), this.sortable.animateAll(), r && r.animateAll()
        }, drop: wi
    };
    It(ho, {pluginName: "revertOnSpill"});

    function vo() {
    }

    vo.prototype = {
        onSpill: function (t) {
            var n = t.dragEl, r = t.putSortable, i = r || this.sortable;
            i.captureAnimationState(), n.parentNode && n.parentNode.removeChild(n), i.animateAll()
        }, drop: wi
    };
    It(vo, {pluginName: "removeOnSpill"});
    q.mount(new La);
    q.mount(vo, ho);
    var go = q;
    window.Sortable = go;
    var Ei = e => {
        e.directive("sortable", t => {
            let n = parseInt(t.dataset?.sortableAnimationDuration);
            n !== 0 && !n && (n = 300), t.sortable = go.create(t, {
                draggable: "[x-sortable-item]",
                handle: "[x-sortable-handle]",
                dataIdAttr: "x-sortable-item",
                animation: n,
                ghostClass: "fi-sortable-ghost"
            })
        })
    };
    var Na = Object.create, yo = Object.defineProperty, ka = Object.getPrototypeOf,
        ja = Object.prototype.hasOwnProperty, Ba = Object.getOwnPropertyNames, Fa = Object.getOwnPropertyDescriptor,
        Ha = e => yo(e, "__esModule", {value: !0}),
        xi = (e, t) => () => (t || (t = {exports: {}}, e(t.exports, t)), t.exports), $a = (e, t, n) => {
            if (t && typeof t == "object" || typeof t == "function") for (let r of Ba(t)) !ja.call(e, r) && r !== "default" && yo(e, r, {
                get: () => t[r],
                enumerable: !(n = Fa(t, r)) || n.enumerable
            });
            return e
        }, Oi = e => $a(Ha(yo(e != null ? Na(ka(e)) : {}, "default", e && e.__esModule && "default" in e ? {
            get: () => e.default,
            enumerable: !0
        } : {value: e, enumerable: !0})), e), Wa = xi(e => {
            "use strict";
            Object.defineProperty(e, "__esModule", {value: !0});

            function t(l) {
                var a = l.getBoundingClientRect();
                return {
                    width: a.width,
                    height: a.height,
                    top: a.top,
                    right: a.right,
                    bottom: a.bottom,
                    left: a.left,
                    x: a.left,
                    y: a.top
                }
            }

            function n(l) {
                if (l == null) return window;
                if (l.toString() !== "[object Window]") {
                    var a = l.ownerDocument;
                    return a && a.defaultView || window
                }
                return l
            }

            function r(l) {
                var a = n(l), d = a.pageXOffset, E = a.pageYOffset;
                return {scrollLeft: d, scrollTop: E}
            }

            function i(l) {
                var a = n(l).Element;
                return l instanceof a || l instanceof Element
            }

            function o(l) {
                var a = n(l).HTMLElement;
                return l instanceof a || l instanceof HTMLElement
            }

            function s(l) {
                if (typeof ShadowRoot > "u") return !1;
                var a = n(l).ShadowRoot;
                return l instanceof a || l instanceof ShadowRoot
            }

            function c(l) {
                return {scrollLeft: l.scrollLeft, scrollTop: l.scrollTop}
            }

            function u(l) {
                return l === n(l) || !o(l) ? r(l) : c(l)
            }

            function p(l) {
                return l ? (l.nodeName || "").toLowerCase() : null
            }

            function m(l) {
                return ((i(l) ? l.ownerDocument : l.document) || window.document).documentElement
            }

            function v(l) {
                return t(m(l)).left + r(l).scrollLeft
            }

            function b(l) {
                return n(l).getComputedStyle(l)
            }

            function O(l) {
                var a = b(l), d = a.overflow, E = a.overflowX, x = a.overflowY;
                return /auto|scroll|overlay|hidden/.test(d + x + E)
            }

            function S(l, a, d) {
                d === void 0 && (d = !1);
                var E = m(a), x = t(l), D = o(a), R = {scrollLeft: 0, scrollTop: 0}, P = {x: 0, y: 0};
                return (D || !D && !d) && ((p(a) !== "body" || O(E)) && (R = u(a)), o(a) ? (P = t(a), P.x += a.clientLeft, P.y += a.clientTop) : E && (P.x = v(E))), {
                    x: x.left + R.scrollLeft - P.x,
                    y: x.top + R.scrollTop - P.y,
                    width: x.width,
                    height: x.height
                }
            }

            function A(l) {
                var a = t(l), d = l.offsetWidth, E = l.offsetHeight;
                return Math.abs(a.width - d) <= 1 && (d = a.width), Math.abs(a.height - E) <= 1 && (E = a.height), {
                    x: l.offsetLeft,
                    y: l.offsetTop,
                    width: d,
                    height: E
                }
            }

            function B(l) {
                return p(l) === "html" ? l : l.assignedSlot || l.parentNode || (s(l) ? l.host : null) || m(l)
            }

            function F(l) {
                return ["html", "body", "#document"].indexOf(p(l)) >= 0 ? l.ownerDocument.body : o(l) && O(l) ? l : F(B(l))
            }

            function L(l, a) {
                var d;
                a === void 0 && (a = []);
                var E = F(l), x = E === ((d = l.ownerDocument) == null ? void 0 : d.body), D = n(E),
                    R = x ? [D].concat(D.visualViewport || [], O(E) ? E : []) : E, P = a.concat(R);
                return x ? P : P.concat(L(B(R)))
            }

            function K(l) {
                return ["table", "td", "th"].indexOf(p(l)) >= 0
            }

            function V(l) {
                return !o(l) || b(l).position === "fixed" ? null : l.offsetParent
            }

            function he(l) {
                var a = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1,
                    d = navigator.userAgent.indexOf("Trident") !== -1;
                if (d && o(l)) {
                    var E = b(l);
                    if (E.position === "fixed") return null
                }
                for (var x = B(l); o(x) && ["html", "body"].indexOf(p(x)) < 0;) {
                    var D = b(x);
                    if (D.transform !== "none" || D.perspective !== "none" || D.contain === "paint" || ["transform", "perspective"].indexOf(D.willChange) !== -1 || a && D.willChange === "filter" || a && D.filter && D.filter !== "none") return x;
                    x = x.parentNode
                }
                return null
            }

            function ee(l) {
                for (var a = n(l), d = V(l); d && K(d) && b(d).position === "static";) d = V(d);
                return d && (p(d) === "html" || p(d) === "body" && b(d).position === "static") ? a : d || he(l) || a
            }

            var Z = "top", de = "bottom", N = "right", ae = "left", ue = "auto", Ae = [Z, de, N, ae], pe = "start",
                ve = "end", We = "clippingParents", Le = "viewport", Te = "popper", tt = "reference",
                Nt = Ae.reduce(function (l, a) {
                    return l.concat([a + "-" + pe, a + "-" + ve])
                }, []), dn = [].concat(Ae, [ue]).reduce(function (l, a) {
                    return l.concat([a, a + "-" + pe, a + "-" + ve])
                }, []), pn = "beforeRead", _n = "read", Tr = "afterRead", _r = "beforeMain", Pr = "main", kt = "afterMain",
                Jn = "beforeWrite", Mr = "write", Qn = "afterWrite", At = [pn, _n, Tr, _r, Pr, kt, Jn, Mr, Qn];

            function Rr(l) {
                var a = new Map, d = new Set, E = [];
                l.forEach(function (D) {
                    a.set(D.name, D)
                });

                function x(D) {
                    d.add(D.name);
                    var R = [].concat(D.requires || [], D.requiresIfExists || []);
                    R.forEach(function (P) {
                        if (!d.has(P)) {
                            var j = a.get(P);
                            j && x(j)
                        }
                    }), E.push(D)
                }

                return l.forEach(function (D) {
                    d.has(D.name) || x(D)
                }), E
            }

            function ut(l) {
                var a = Rr(l);
                return At.reduce(function (d, E) {
                    return d.concat(a.filter(function (x) {
                        return x.phase === E
                    }))
                }, [])
            }

            function jt(l) {
                var a;
                return function () {
                    return a || (a = new Promise(function (d) {
                        Promise.resolve().then(function () {
                            a = void 0, d(l())
                        })
                    })), a
                }
            }

            function gt(l) {
                for (var a = arguments.length, d = new Array(a > 1 ? a - 1 : 0), E = 1; E < a; E++) d[E - 1] = arguments[E];
                return [].concat(d).reduce(function (x, D) {
                    return x.replace(/%s/, D)
                }, l)
            }

            var mt = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s',
                Ir = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available',
                Ke = ["name", "enabled", "phase", "fn", "effect", "requires", "options"];

            function Lr(l) {
                l.forEach(function (a) {
                    Object.keys(a).forEach(function (d) {
                        switch (d) {
                            case"name":
                                typeof a.name != "string" && console.error(gt(mt, String(a.name), '"name"', '"string"', '"' + String(a.name) + '"'));
                                break;
                            case"enabled":
                                typeof a.enabled != "boolean" && console.error(gt(mt, a.name, '"enabled"', '"boolean"', '"' + String(a.enabled) + '"'));
                            case"phase":
                                At.indexOf(a.phase) < 0 && console.error(gt(mt, a.name, '"phase"', "either " + At.join(", "), '"' + String(a.phase) + '"'));
                                break;
                            case"fn":
                                typeof a.fn != "function" && console.error(gt(mt, a.name, '"fn"', '"function"', '"' + String(a.fn) + '"'));
                                break;
                            case"effect":
                                typeof a.effect != "function" && console.error(gt(mt, a.name, '"effect"', '"function"', '"' + String(a.fn) + '"'));
                                break;
                            case"requires":
                                Array.isArray(a.requires) || console.error(gt(mt, a.name, '"requires"', '"array"', '"' + String(a.requires) + '"'));
                                break;
                            case"requiresIfExists":
                                Array.isArray(a.requiresIfExists) || console.error(gt(mt, a.name, '"requiresIfExists"', '"array"', '"' + String(a.requiresIfExists) + '"'));
                                break;
                            case"options":
                            case"data":
                                break;
                            default:
                                console.error('PopperJS: an invalid property has been provided to the "' + a.name + '" modifier, valid properties are ' + Ke.map(function (E) {
                                    return '"' + E + '"'
                                }).join(", ") + '; but "' + d + '" was provided.')
                        }
                        a.requires && a.requires.forEach(function (E) {
                            l.find(function (x) {
                                return x.name === E
                            }) == null && console.error(gt(Ir, String(a.name), E, E))
                        })
                    })
                })
            }

            function Nr(l, a) {
                var d = new Set;
                return l.filter(function (E) {
                    var x = a(E);
                    if (!d.has(x)) return d.add(x), !0
                })
            }

            function nt(l) {
                return l.split("-")[0]
            }

            function kr(l) {
                var a = l.reduce(function (d, E) {
                    var x = d[E.name];
                    return d[E.name] = x ? Object.assign({}, x, E, {
                        options: Object.assign({}, x.options, E.options),
                        data: Object.assign({}, x.data, E.data)
                    }) : E, d
                }, {});
                return Object.keys(a).map(function (d) {
                    return a[d]
                })
            }

            function Zn(l) {
                var a = n(l), d = m(l), E = a.visualViewport, x = d.clientWidth, D = d.clientHeight, R = 0, P = 0;
                return E && (x = E.width, D = E.height, /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || (R = E.offsetLeft, P = E.offsetTop)), {
                    width: x,
                    height: D,
                    x: R + v(l),
                    y: P
                }
            }

            var ft = Math.max, en = Math.min, Bt = Math.round;

            function er(l) {
                var a, d = m(l), E = r(l), x = (a = l.ownerDocument) == null ? void 0 : a.body,
                    D = ft(d.scrollWidth, d.clientWidth, x ? x.scrollWidth : 0, x ? x.clientWidth : 0),
                    R = ft(d.scrollHeight, d.clientHeight, x ? x.scrollHeight : 0, x ? x.clientHeight : 0),
                    P = -E.scrollLeft + v(l), j = -E.scrollTop;
                return b(x || d).direction === "rtl" && (P += ft(d.clientWidth, x ? x.clientWidth : 0) - D), {
                    width: D,
                    height: R,
                    x: P,
                    y: j
                }
            }

            function Pn(l, a) {
                var d = a.getRootNode && a.getRootNode();
                if (l.contains(a)) return !0;
                if (d && s(d)) {
                    var E = a;
                    do {
                        if (E && l.isSameNode(E)) return !0;
                        E = E.parentNode || E.host
                    } while (E)
                }
                return !1
            }

            function Ft(l) {
                return Object.assign({}, l, {left: l.x, top: l.y, right: l.x + l.width, bottom: l.y + l.height})
            }

            function tr(l) {
                var a = t(l);
                return a.top = a.top + l.clientTop, a.left = a.left + l.clientLeft, a.bottom = a.top + l.clientHeight, a.right = a.left + l.clientWidth, a.width = l.clientWidth, a.height = l.clientHeight, a.x = a.left, a.y = a.top, a
            }

            function nr(l, a) {
                return a === Le ? Ft(Zn(l)) : o(a) ? tr(a) : Ft(er(m(l)))
            }

            function hn(l) {
                var a = L(B(l)), d = ["absolute", "fixed"].indexOf(b(l).position) >= 0, E = d && o(l) ? ee(l) : l;
                return i(E) ? a.filter(function (x) {
                    return i(x) && Pn(x, E) && p(x) !== "body"
                }) : []
            }

            function vn(l, a, d) {
                var E = a === "clippingParents" ? hn(l) : [].concat(a), x = [].concat(E, [d]), D = x[0],
                    R = x.reduce(function (P, j) {
                        var z = nr(l, j);
                        return P.top = ft(z.top, P.top), P.right = en(z.right, P.right), P.bottom = en(z.bottom, P.bottom), P.left = ft(z.left, P.left), P
                    }, nr(l, D));
                return R.width = R.right - R.left, R.height = R.bottom - R.top, R.x = R.left, R.y = R.top, R
            }

            function tn(l) {
                return l.split("-")[1]
            }

            function lt(l) {
                return ["top", "bottom"].indexOf(l) >= 0 ? "x" : "y"
            }

            function rr(l) {
                var a = l.reference, d = l.element, E = l.placement, x = E ? nt(E) : null, D = E ? tn(E) : null,
                    R = a.x + a.width / 2 - d.width / 2, P = a.y + a.height / 2 - d.height / 2, j;
                switch (x) {
                    case Z:
                        j = {x: R, y: a.y - d.height};
                        break;
                    case de:
                        j = {x: R, y: a.y + a.height};
                        break;
                    case N:
                        j = {x: a.x + a.width, y: P};
                        break;
                    case ae:
                        j = {x: a.x - d.width, y: P};
                        break;
                    default:
                        j = {x: a.x, y: a.y}
                }
                var z = x ? lt(x) : null;
                if (z != null) {
                    var I = z === "y" ? "height" : "width";
                    switch (D) {
                        case pe:
                            j[z] = j[z] - (a[I] / 2 - d[I] / 2);
                            break;
                        case ve:
                            j[z] = j[z] + (a[I] / 2 - d[I] / 2);
                            break
                    }
                }
                return j
            }

            function or() {
                return {top: 0, right: 0, bottom: 0, left: 0}
            }

            function ir(l) {
                return Object.assign({}, or(), l)
            }

            function ar(l, a) {
                return a.reduce(function (d, E) {
                    return d[E] = l, d
                }, {})
            }

            function Ht(l, a) {
                a === void 0 && (a = {});
                var d = a, E = d.placement, x = E === void 0 ? l.placement : E, D = d.boundary, R = D === void 0 ? We : D,
                    P = d.rootBoundary, j = P === void 0 ? Le : P, z = d.elementContext, I = z === void 0 ? Te : z,
                    Ee = d.altBoundary, Me = Ee === void 0 ? !1 : Ee, ye = d.padding, fe = ye === void 0 ? 0 : ye,
                    Ce = ir(typeof fe != "number" ? fe : ar(fe, Ae)), ge = I === Te ? tt : Te, ke = l.elements.reference,
                    De = l.rects.popper, je = l.elements[Me ? ge : I],
                    J = vn(i(je) ? je : je.contextElement || m(l.elements.popper), R, j), Se = t(ke),
                    xe = rr({reference: Se, element: De, strategy: "absolute", placement: x}),
                    Re = Ft(Object.assign({}, De, xe)), Pe = I === Te ? Re : Se, Ve = {
                        top: J.top - Pe.top + Ce.top,
                        bottom: Pe.bottom - J.bottom + Ce.bottom,
                        left: J.left - Pe.left + Ce.left,
                        right: Pe.right - J.right + Ce.right
                    }, Be = l.modifiersData.offset;
                if (I === Te && Be) {
                    var He = Be[x];
                    Object.keys(Ve).forEach(function (ht) {
                        var Je = [N, de].indexOf(ht) >= 0 ? 1 : -1, Dt = [Z, de].indexOf(ht) >= 0 ? "y" : "x";
                        Ve[ht] += He[Dt] * Je
                    })
                }
                return Ve
            }

            var sr = "Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.",
                jr = "Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.",
                gn = {placement: "bottom", modifiers: [], strategy: "absolute"};

            function nn() {
                for (var l = arguments.length, a = new Array(l), d = 0; d < l; d++) a[d] = arguments[d];
                return !a.some(function (E) {
                    return !(E && typeof E.getBoundingClientRect == "function")
                })
            }

            function mn(l) {
                l === void 0 && (l = {});
                var a = l, d = a.defaultModifiers, E = d === void 0 ? [] : d, x = a.defaultOptions,
                    D = x === void 0 ? gn : x;
                return function (P, j, z) {
                    z === void 0 && (z = D);
                    var I = {
                        placement: "bottom",
                        orderedModifiers: [],
                        options: Object.assign({}, gn, D),
                        modifiersData: {},
                        elements: {reference: P, popper: j},
                        attributes: {},
                        styles: {}
                    }, Ee = [], Me = !1, ye = {
                        state: I, setOptions: function (ke) {
                            Ce(), I.options = Object.assign({}, D, I.options, ke), I.scrollParents = {
                                reference: i(P) ? L(P) : P.contextElement ? L(P.contextElement) : [],
                                popper: L(j)
                            };
                            var De = ut(kr([].concat(E, I.options.modifiers)));
                            I.orderedModifiers = De.filter(function (Be) {
                                return Be.enabled
                            });
                            var je = Nr([].concat(De, I.options.modifiers), function (Be) {
                                var He = Be.name;
                                return He
                            });
                            if (Lr(je), nt(I.options.placement) === ue) {
                                var J = I.orderedModifiers.find(function (Be) {
                                    var He = Be.name;
                                    return He === "flip"
                                });
                                J || console.error(['Popper: "auto" placements require the "flip" modifier be', "present and enabled to work."].join(" "))
                            }
                            var Se = b(j), xe = Se.marginTop, Re = Se.marginRight, Pe = Se.marginBottom, Ve = Se.marginLeft;
                            return [xe, Re, Pe, Ve].some(function (Be) {
                                return parseFloat(Be)
                            }) && console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', "between the popper and its reference element or boundary.", "To replicate margin, use the `offset` modifier, as well as", "the `padding` option in the `preventOverflow` and `flip`", "modifiers."].join(" ")), fe(), ye.update()
                        }, forceUpdate: function () {
                            if (!Me) {
                                var ke = I.elements, De = ke.reference, je = ke.popper;
                                if (!nn(De, je)) {
                                    console.error(sr);
                                    return
                                }
                                I.rects = {
                                    reference: S(De, ee(je), I.options.strategy === "fixed"),
                                    popper: A(je)
                                }, I.reset = !1, I.placement = I.options.placement, I.orderedModifiers.forEach(function (He) {
                                    return I.modifiersData[He.name] = Object.assign({}, He.data)
                                });
                                for (var J = 0, Se = 0; Se < I.orderedModifiers.length; Se++) {
                                    if (J += 1, J > 100) {
                                        console.error(jr);
                                        break
                                    }
                                    if (I.reset === !0) {
                                        I.reset = !1, Se = -1;
                                        continue
                                    }
                                    var xe = I.orderedModifiers[Se], Re = xe.fn, Pe = xe.options,
                                        Ve = Pe === void 0 ? {} : Pe, Be = xe.name;
                                    typeof Re == "function" && (I = Re({
                                        state: I,
                                        options: Ve,
                                        name: Be,
                                        instance: ye
                                    }) || I)
                                }
                            }
                        }, update: jt(function () {
                            return new Promise(function (ge) {
                                ye.forceUpdate(), ge(I)
                            })
                        }), destroy: function () {
                            Ce(), Me = !0
                        }
                    };
                    if (!nn(P, j)) return console.error(sr), ye;
                    ye.setOptions(z).then(function (ge) {
                        !Me && z.onFirstUpdate && z.onFirstUpdate(ge)
                    });

                    function fe() {
                        I.orderedModifiers.forEach(function (ge) {
                            var ke = ge.name, De = ge.options, je = De === void 0 ? {} : De, J = ge.effect;
                            if (typeof J == "function") {
                                var Se = J({state: I, name: ke, instance: ye, options: je}), xe = function () {
                                };
                                Ee.push(Se || xe)
                            }
                        })
                    }

                    function Ce() {
                        Ee.forEach(function (ge) {
                            return ge()
                        }), Ee = []
                    }

                    return ye
                }
            }

            var bn = {passive: !0};

            function Br(l) {
                var a = l.state, d = l.instance, E = l.options, x = E.scroll, D = x === void 0 ? !0 : x, R = E.resize,
                    P = R === void 0 ? !0 : R, j = n(a.elements.popper),
                    z = [].concat(a.scrollParents.reference, a.scrollParents.popper);
                return D && z.forEach(function (I) {
                    I.addEventListener("scroll", d.update, bn)
                }), P && j.addEventListener("resize", d.update, bn), function () {
                    D && z.forEach(function (I) {
                        I.removeEventListener("scroll", d.update, bn)
                    }), P && j.removeEventListener("resize", d.update, bn)
                }
            }

            var Mn = {
                name: "eventListeners", enabled: !0, phase: "write", fn: function () {
                }, effect: Br, data: {}
            };

            function Fr(l) {
                var a = l.state, d = l.name;
                a.modifiersData[d] = rr({
                    reference: a.rects.reference,
                    element: a.rects.popper,
                    strategy: "absolute",
                    placement: a.placement
                })
            }

            var Rn = {name: "popperOffsets", enabled: !0, phase: "read", fn: Fr, data: {}},
                Hr = {top: "auto", right: "auto", bottom: "auto", left: "auto"};

            function $r(l) {
                var a = l.x, d = l.y, E = window, x = E.devicePixelRatio || 1;
                return {x: Bt(Bt(a * x) / x) || 0, y: Bt(Bt(d * x) / x) || 0}
            }

            function In(l) {
                var a, d = l.popper, E = l.popperRect, x = l.placement, D = l.offsets, R = l.position,
                    P = l.gpuAcceleration, j = l.adaptive, z = l.roundOffsets,
                    I = z === !0 ? $r(D) : typeof z == "function" ? z(D) : D, Ee = I.x, Me = Ee === void 0 ? 0 : Ee,
                    ye = I.y, fe = ye === void 0 ? 0 : ye, Ce = D.hasOwnProperty("x"), ge = D.hasOwnProperty("y"), ke = ae,
                    De = Z, je = window;
                if (j) {
                    var J = ee(d), Se = "clientHeight", xe = "clientWidth";
                    J === n(d) && (J = m(d), b(J).position !== "static" && (Se = "scrollHeight", xe = "scrollWidth")), J = J, x === Z && (De = de, fe -= J[Se] - E.height, fe *= P ? 1 : -1), x === ae && (ke = N, Me -= J[xe] - E.width, Me *= P ? 1 : -1)
                }
                var Re = Object.assign({position: R}, j && Hr);
                if (P) {
                    var Pe;
                    return Object.assign({}, Re, (Pe = {}, Pe[De] = ge ? "0" : "", Pe[ke] = Ce ? "0" : "", Pe.transform = (je.devicePixelRatio || 1) < 2 ? "translate(" + Me + "px, " + fe + "px)" : "translate3d(" + Me + "px, " + fe + "px, 0)", Pe))
                }
                return Object.assign({}, Re, (a = {}, a[De] = ge ? fe + "px" : "", a[ke] = Ce ? Me + "px" : "", a.transform = "", a))
            }

            function f(l) {
                var a = l.state, d = l.options, E = d.gpuAcceleration, x = E === void 0 ? !0 : E, D = d.adaptive,
                    R = D === void 0 ? !0 : D, P = d.roundOffsets, j = P === void 0 ? !0 : P,
                    z = b(a.elements.popper).transitionProperty || "";
                R && ["transform", "top", "right", "bottom", "left"].some(function (Ee) {
                    return z.indexOf(Ee) >= 0
                }) && console.warn(["Popper: Detected CSS transitions on at least one of the following", 'CSS properties: "transform", "top", "right", "bottom", "left".', `

`,'Disable the "computeStyles" modifier\'s `adaptive` option to allow',"for smooth transitions, or remove these properties from the CSS","transition declaration on the popper element if only transitioning","opacity or background-color for example.",`

`, "We recommend using the popper element as a wrapper around an inner", "element that can have any CSS property transitioned for animations."].join(" "));
                var I = {
                    placement: nt(a.placement),
                    popper: a.elements.popper,
                    popperRect: a.rects.popper,
                    gpuAcceleration: x
                };
                a.modifiersData.popperOffsets != null && (a.styles.popper = Object.assign({}, a.styles.popper, In(Object.assign({}, I, {
                    offsets: a.modifiersData.popperOffsets,
                    position: a.options.strategy,
                    adaptive: R,
                    roundOffsets: j
                })))), a.modifiersData.arrow != null && (a.styles.arrow = Object.assign({}, a.styles.arrow, In(Object.assign({}, I, {
                    offsets: a.modifiersData.arrow,
                    position: "absolute",
                    adaptive: !1,
                    roundOffsets: j
                })))), a.attributes.popper = Object.assign({}, a.attributes.popper, {"data-popper-placement": a.placement})
            }

            var h = {name: "computeStyles", enabled: !0, phase: "beforeWrite", fn: f, data: {}};

            function y(l) {
                var a = l.state;
                Object.keys(a.elements).forEach(function (d) {
                    var E = a.styles[d] || {}, x = a.attributes[d] || {}, D = a.elements[d];
                    !o(D) || !p(D) || (Object.assign(D.style, E), Object.keys(x).forEach(function (R) {
                        var P = x[R];
                        P === !1 ? D.removeAttribute(R) : D.setAttribute(R, P === !0 ? "" : P)
                    }))
                })
            }

            function C(l) {
                var a = l.state, d = {
                    popper: {position: a.options.strategy, left: "0", top: "0", margin: "0"},
                    arrow: {position: "absolute"},
                    reference: {}
                };
                return Object.assign(a.elements.popper.style, d.popper), a.styles = d, a.elements.arrow && Object.assign(a.elements.arrow.style, d.arrow), function () {
                    Object.keys(a.elements).forEach(function (E) {
                        var x = a.elements[E], D = a.attributes[E] || {},
                            R = Object.keys(a.styles.hasOwnProperty(E) ? a.styles[E] : d[E]), P = R.reduce(function (j, z) {
                                return j[z] = "", j
                            }, {});
                        !o(x) || !p(x) || (Object.assign(x.style, P), Object.keys(D).forEach(function (j) {
                            x.removeAttribute(j)
                        }))
                    })
                }
            }

            var k = {name: "applyStyles", enabled: !0, phase: "write", fn: y, effect: C, requires: ["computeStyles"]};

            function M(l, a, d) {
                var E = nt(l), x = [ae, Z].indexOf(E) >= 0 ? -1 : 1,
                    D = typeof d == "function" ? d(Object.assign({}, a, {placement: l})) : d, R = D[0], P = D[1];
                return R = R || 0, P = (P || 0) * x, [ae, N].indexOf(E) >= 0 ? {x: P, y: R} : {x: R, y: P}
            }

            function _(l) {
                var a = l.state, d = l.options, E = l.name, x = d.offset, D = x === void 0 ? [0, 0] : x,
                    R = dn.reduce(function (I, Ee) {
                        return I[Ee] = M(Ee, a.rects, D), I
                    }, {}), P = R[a.placement], j = P.x, z = P.y;
                a.modifiersData.popperOffsets != null && (a.modifiersData.popperOffsets.x += j, a.modifiersData.popperOffsets.y += z), a.modifiersData[E] = R
            }

            var se = {name: "offset", enabled: !0, phase: "main", requires: ["popperOffsets"], fn: _},
                G = {left: "right", right: "left", bottom: "top", top: "bottom"};

            function te(l) {
                return l.replace(/left|right|bottom|top/g, function (a) {
                    return G[a]
                })
            }

            var le = {start: "end", end: "start"};

            function Oe(l) {
                return l.replace(/start|end/g, function (a) {
                    return le[a]
                })
            }

            function Ne(l, a) {
                a === void 0 && (a = {});
                var d = a, E = d.placement, x = d.boundary, D = d.rootBoundary, R = d.padding, P = d.flipVariations,
                    j = d.allowedAutoPlacements, z = j === void 0 ? dn : j, I = tn(E),
                    Ee = I ? P ? Nt : Nt.filter(function (fe) {
                        return tn(fe) === I
                    }) : Ae, Me = Ee.filter(function (fe) {
                        return z.indexOf(fe) >= 0
                    });
                Me.length === 0 && (Me = Ee, console.error(["Popper: The `allowedAutoPlacements` option did not allow any", "placements. Ensure the `placement` option matches the variation", "of the allowed placements.", 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(" ")));
                var ye = Me.reduce(function (fe, Ce) {
                    return fe[Ce] = Ht(l, {placement: Ce, boundary: x, rootBoundary: D, padding: R})[nt(Ce)], fe
                }, {});
                return Object.keys(ye).sort(function (fe, Ce) {
                    return ye[fe] - ye[Ce]
                })
            }

            function be(l) {
                if (nt(l) === ue) return [];
                var a = te(l);
                return [Oe(l), a, Oe(a)]
            }

            function _e(l) {
                var a = l.state, d = l.options, E = l.name;
                if (!a.modifiersData[E]._skip) {
                    for (var x = d.mainAxis, D = x === void 0 ? !0 : x, R = d.altAxis, P = R === void 0 ? !0 : R, j = d.fallbackPlacements, z = d.padding, I = d.boundary, Ee = d.rootBoundary, Me = d.altBoundary, ye = d.flipVariations, fe = ye === void 0 ? !0 : ye, Ce = d.allowedAutoPlacements, ge = a.options.placement, ke = nt(ge), De = ke === ge, je = j || (De || !fe ? [te(ge)] : be(ge)), J = [ge].concat(je).reduce(function (U, ie) {
                        return U.concat(nt(ie) === ue ? Ne(a, {
                            placement: ie,
                            boundary: I,
                            rootBoundary: Ee,
                            padding: z,
                            flipVariations: fe,
                            allowedAutoPlacements: Ce
                        }) : ie)
                    }, []), Se = a.rects.reference, xe = a.rects.popper, Re = new Map, Pe = !0, Ve = J[0], Be = 0; Be < J.length; Be++) {
                        var He = J[Be], ht = nt(He), Je = tn(He) === pe, Dt = [Z, de].indexOf(ht) >= 0,
                            on = Dt ? "width" : "height",
                            Ut = Ht(a, {placement: He, boundary: I, rootBoundary: Ee, altBoundary: Me, padding: z}),
                            Tt = Dt ? Je ? N : ae : Je ? de : Z;
                        Se[on] > xe[on] && (Tt = te(Tt));
                        var Ln = te(Tt), Xt = [];
                        if (D && Xt.push(Ut[ht] <= 0), P && Xt.push(Ut[Tt] <= 0, Ut[Ln] <= 0), Xt.every(function (U) {
                            return U
                        })) {
                            Ve = He, Pe = !1;
                            break
                        }
                        Re.set(He, Xt)
                    }
                    if (Pe) for (var yn = fe ? 3 : 1, Nn = function (ie) {
                        var ce = J.find(function (ze) {
                            var qe = Re.get(ze);
                            if (qe) return qe.slice(0, ie).every(function (bt) {
                                return bt
                            })
                        });
                        if (ce) return Ve = ce, "break"
                    }, w = yn; w > 0; w--) {
                        var H = Nn(w);
                        if (H === "break") break
                    }
                    a.placement !== Ve && (a.modifiersData[E]._skip = !0, a.placement = Ve, a.reset = !0)
                }
            }

            var X = {name: "flip", enabled: !0, phase: "main", fn: _e, requiresIfExists: ["offset"], data: {_skip: !1}};

            function ne(l) {
                return l === "x" ? "y" : "x"
            }

            function re(l, a, d) {
                return ft(l, en(a, d))
            }

            function $(l) {
                var a = l.state, d = l.options, E = l.name, x = d.mainAxis, D = x === void 0 ? !0 : x, R = d.altAxis,
                    P = R === void 0 ? !1 : R, j = d.boundary, z = d.rootBoundary, I = d.altBoundary, Ee = d.padding,
                    Me = d.tether, ye = Me === void 0 ? !0 : Me, fe = d.tetherOffset, Ce = fe === void 0 ? 0 : fe,
                    ge = Ht(a, {boundary: j, rootBoundary: z, padding: Ee, altBoundary: I}), ke = nt(a.placement),
                    De = tn(a.placement), je = !De, J = lt(ke), Se = ne(J), xe = a.modifiersData.popperOffsets,
                    Re = a.rects.reference, Pe = a.rects.popper,
                    Ve = typeof Ce == "function" ? Ce(Object.assign({}, a.rects, {placement: a.placement})) : Ce,
                    Be = {x: 0, y: 0};
                if (xe) {
                    if (D || P) {
                        var He = J === "y" ? Z : ae, ht = J === "y" ? de : N, Je = J === "y" ? "height" : "width",
                            Dt = xe[J], on = xe[J] + ge[He], Ut = xe[J] - ge[ht], Tt = ye ? -Pe[Je] / 2 : 0,
                            Ln = De === pe ? Re[Je] : Pe[Je], Xt = De === pe ? -Pe[Je] : -Re[Je], yn = a.elements.arrow,
                            Nn = ye && yn ? A(yn) : {width: 0, height: 0},
                            w = a.modifiersData["arrow#persistent"] ? a.modifiersData["arrow#persistent"].padding : or(),
                            H = w[He], U = w[ht], ie = re(0, Re[Je], Nn[Je]),
                            ce = je ? Re[Je] / 2 - Tt - ie - H - Ve : Ln - ie - H - Ve,
                            ze = je ? -Re[Je] / 2 + Tt + ie + U + Ve : Xt + ie + U + Ve,
                            qe = a.elements.arrow && ee(a.elements.arrow),
                            bt = qe ? J === "y" ? qe.clientTop || 0 : qe.clientLeft || 0 : 0,
                            kn = a.modifiersData.offset ? a.modifiersData.offset[a.placement][J] : 0,
                            yt = xe[J] + ce - kn - bt, wn = xe[J] + ze - kn;
                        if (D) {
                            var an = re(ye ? en(on, yt) : on, Dt, ye ? ft(Ut, wn) : Ut);
                            xe[J] = an, Be[J] = an - Dt
                        }
                        if (P) {
                            var Yt = J === "x" ? Z : ae, Wr = J === "x" ? de : N, zt = xe[Se], sn = zt + ge[Yt],
                                wo = zt - ge[Wr], Eo = re(ye ? en(sn, yt) : sn, zt, ye ? ft(wo, wn) : wo);
                            xe[Se] = Eo, Be[Se] = Eo - zt
                        }
                    }
                    a.modifiersData[E] = Be
                }
            }

            var Y = {name: "preventOverflow", enabled: !0, phase: "main", fn: $, requiresIfExists: ["offset"]},
                g = function (a, d) {
                    return a = typeof a == "function" ? a(Object.assign({}, d.rects, {placement: d.placement})) : a, ir(typeof a != "number" ? a : ar(a, Ae))
                };

            function Ye(l) {
                var a, d = l.state, E = l.name, x = l.options, D = d.elements.arrow, R = d.modifiersData.popperOffsets,
                    P = nt(d.placement), j = lt(P), z = [ae, N].indexOf(P) >= 0, I = z ? "height" : "width";
                if (!(!D || !R)) {
                    var Ee = g(x.padding, d), Me = A(D), ye = j === "y" ? Z : ae, fe = j === "y" ? de : N,
                        Ce = d.rects.reference[I] + d.rects.reference[j] - R[j] - d.rects.popper[I],
                        ge = R[j] - d.rects.reference[j], ke = ee(D),
                        De = ke ? j === "y" ? ke.clientHeight || 0 : ke.clientWidth || 0 : 0, je = Ce / 2 - ge / 2,
                        J = Ee[ye], Se = De - Me[I] - Ee[fe], xe = De / 2 - Me[I] / 2 + je, Re = re(J, xe, Se), Pe = j;
                    d.modifiersData[E] = (a = {}, a[Pe] = Re, a.centerOffset = Re - xe, a)
                }
            }

            function Q(l) {
                var a = l.state, d = l.options, E = d.element, x = E === void 0 ? "[data-popper-arrow]" : E;
                if (x != null && !(typeof x == "string" && (x = a.elements.popper.querySelector(x), !x))) {
                    if (o(x) || console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', "To use an SVG arrow, wrap it in an HTMLElement that will be used as", "the arrow."].join(" ")), !Pn(a.elements.popper, x)) {
                        console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', "element."].join(" "));
                        return
                    }
                    a.elements.arrow = x
                }
            }

            var Ct = {
                name: "arrow",
                enabled: !0,
                phase: "main",
                fn: Ye,
                effect: Q,
                requires: ["popperOffsets"],
                requiresIfExists: ["preventOverflow"]
            };

            function dt(l, a, d) {
                return d === void 0 && (d = {x: 0, y: 0}), {
                    top: l.top - a.height - d.y,
                    right: l.right - a.width + d.x,
                    bottom: l.bottom - a.height + d.y,
                    left: l.left - a.width - d.x
                }
            }

            function $t(l) {
                return [Z, N, de, ae].some(function (a) {
                    return l[a] >= 0
                })
            }

            function Wt(l) {
                var a = l.state, d = l.name, E = a.rects.reference, x = a.rects.popper, D = a.modifiersData.preventOverflow,
                    R = Ht(a, {elementContext: "reference"}), P = Ht(a, {altBoundary: !0}), j = dt(R, E), z = dt(P, x, D),
                    I = $t(j), Ee = $t(z);
                a.modifiersData[d] = {
                    referenceClippingOffsets: j,
                    popperEscapeOffsets: z,
                    isReferenceHidden: I,
                    hasPopperEscaped: Ee
                }, a.attributes.popper = Object.assign({}, a.attributes.popper, {
                    "data-popper-reference-hidden": I,
                    "data-popper-escaped": Ee
                })
            }

            var Vt = {name: "hide", enabled: !0, phase: "main", requiresIfExists: ["preventOverflow"], fn: Wt},
                Ze = [Mn, Rn, h, k], ot = mn({defaultModifiers: Ze}), pt = [Mn, Rn, h, k, se, X, Y, Ct, Vt],
                rn = mn({defaultModifiers: pt});
            e.applyStyles = k, e.arrow = Ct, e.computeStyles = h, e.createPopper = rn, e.createPopperLite = ot, e.defaultModifiers = pt, e.detectOverflow = Ht, e.eventListeners = Mn, e.flip = X, e.hide = Vt, e.offset = se, e.popperGenerator = mn, e.popperOffsets = Rn, e.preventOverflow = Y
        }), Si = xi(e => {
            "use strict";
            Object.defineProperty(e, "__esModule", {value: !0});
            var t = Wa(),
                n = '<svg width="16" height="6" xmlns="http://www.w3.org/2000/svg"><path d="M0 6s1.796-.013 4.67-3.615C5.851.9 6.93.006 8 0c1.07-.006 2.148.887 3.343 2.385C14.233 6.005 16 6 16 6H0z"></svg>',
                r = "tippy-box", i = "tippy-content", o = "tippy-backdrop", s = "tippy-arrow", c = "tippy-svg-arrow",
                u = {passive: !0, capture: !0};

            function p(f, h) {
                return {}.hasOwnProperty.call(f, h)
            }

            function m(f, h, y) {
                if (Array.isArray(f)) {
                    var C = f[h];
                    return C ?? (Array.isArray(y) ? y[h] : y)
                }
                return f
            }

            function v(f, h) {
                var y = {}.toString.call(f);
                return y.indexOf("[object") === 0 && y.indexOf(h + "]") > -1
            }

            function b(f, h) {
                return typeof f == "function" ? f.apply(void 0, h) : f
            }

            function O(f, h) {
                if (h === 0) return f;
                var y;
                return function (C) {
                    clearTimeout(y), y = setTimeout(function () {
                        f(C)
                    }, h)
                }
            }

            function S(f, h) {
                var y = Object.assign({}, f);
                return h.forEach(function (C) {
                    delete y[C]
                }), y
            }

            function A(f) {
                return f.split(/\s+/).filter(Boolean)
            }

            function B(f) {
                return [].concat(f)
            }

            function F(f, h) {
                f.indexOf(h) === -1 && f.push(h)
            }

            function L(f) {
                return f.filter(function (h, y) {
                    return f.indexOf(h) === y
                })
            }

            function K(f) {
                return f.split("-")[0]
            }

            function V(f) {
                return [].slice.call(f)
            }

            function he(f) {
                return Object.keys(f).reduce(function (h, y) {
                    return f[y] !== void 0 && (h[y] = f[y]), h
                }, {})
            }

            function ee() {
                return document.createElement("div")
            }

            function Z(f) {
                return ["Element", "Fragment"].some(function (h) {
                    return v(f, h)
                })
            }

            function de(f) {
                return v(f, "NodeList")
            }

            function N(f) {
                return v(f, "MouseEvent")
            }

            function ae(f) {
                return !!(f && f._tippy && f._tippy.reference === f)
            }

            function ue(f) {
                return Z(f) ? [f] : de(f) ? V(f) : Array.isArray(f) ? f : V(document.querySelectorAll(f))
            }

            function Ae(f, h) {
                f.forEach(function (y) {
                    y && (y.style.transitionDuration = h + "ms")
                })
            }

            function pe(f, h) {
                f.forEach(function (y) {
                    y && y.setAttribute("data-state", h)
                })
            }

            function ve(f) {
                var h, y = B(f), C = y[0];
                return !(C == null || (h = C.ownerDocument) == null) && h.body ? C.ownerDocument : document
            }

            function We(f, h) {
                var y = h.clientX, C = h.clientY;
                return f.every(function (k) {
                    var M = k.popperRect, _ = k.popperState, se = k.props, G = se.interactiveBorder, te = K(_.placement),
                        le = _.modifiersData.offset;
                    if (!le) return !0;
                    var Oe = te === "bottom" ? le.top.y : 0, Ne = te === "top" ? le.bottom.y : 0,
                        be = te === "right" ? le.left.x : 0, _e = te === "left" ? le.right.x : 0, X = M.top - C + Oe > G,
                        ne = C - M.bottom - Ne > G, re = M.left - y + be > G, $ = y - M.right - _e > G;
                    return X || ne || re || $
                })
            }

            function Le(f, h, y) {
                var C = h + "EventListener";
                ["transitionend", "webkitTransitionEnd"].forEach(function (k) {
                    f[C](k, y)
                })
            }

            var Te = {isTouch: !1}, tt = 0;

            function Nt() {
                Te.isTouch || (Te.isTouch = !0, window.performance && document.addEventListener("mousemove", dn))
            }

            function dn() {
                var f = performance.now();
                f - tt < 20 && (Te.isTouch = !1, document.removeEventListener("mousemove", dn)), tt = f
            }

            function pn() {
                var f = document.activeElement;
                if (ae(f)) {
                    var h = f._tippy;
                    f.blur && !h.state.isVisible && f.blur()
                }
            }

            function _n() {
                document.addEventListener("touchstart", Nt, u), window.addEventListener("blur", pn)
            }

            var Tr = typeof window < "u" && typeof document < "u", _r = Tr ? navigator.userAgent : "",
                Pr = /MSIE |Trident\//.test(_r);

            function kt(f) {
                var h = f === "destroy" ? "n already-" : " ";
                return [f + "() was called on a" + h + "destroyed instance. This is a no-op but", "indicates a potential memory leak."].join(" ")
            }

            function Jn(f) {
                var h = /[ \t]{2,}/g, y = /^[ \t]*/gm;
                return f.replace(h, " ").replace(y, "").trim()
            }

            function Mr(f) {
                return Jn(`
  %ctippy.js

  %c`+Jn(f)+`

  %c\u{1F477}\u200D This is a development-only message. It will be removed in production.
  `)
            }

            function Qn(f) {
                return [Mr(f), "color: #00C584; font-size: 1.3em; font-weight: bold;", "line-height: 1.5", "color: #a6a095;"]
            }

            var At;
            Rr();

            function Rr() {
                At = new Set
            }

            function ut(f, h) {
                if (f && !At.has(h)) {
                    var y;
                    At.add(h), (y = console).warn.apply(y, Qn(h))
                }
            }

            function jt(f, h) {
                if (f && !At.has(h)) {
                    var y;
                    At.add(h), (y = console).error.apply(y, Qn(h))
                }
            }

            function gt(f) {
                var h = !f, y = Object.prototype.toString.call(f) === "[object Object]" && !f.addEventListener;
                jt(h, ["tippy() was passed", "`" + String(f) + "`", "as its targets (first) argument. Valid types are: String, Element,", "Element[], or NodeList."].join(" ")), jt(y, ["tippy() was passed a plain object which is not supported as an argument", "for virtual positioning. Use props.getReferenceClientRect instead."].join(" "))
            }

            var mt = {animateFill: !1, followCursor: !1, inlinePositioning: !1, sticky: !1}, Ir = {
                allowHTML: !1,
                animation: "fade",
                arrow: !0,
                content: "",
                inertia: !1,
                maxWidth: 350,
                role: "tooltip",
                theme: "",
                zIndex: 9999
            }, Ke = Object.assign({
                appendTo: function () {
                    return document.body
                },
                aria: {content: "auto", expanded: "auto"},
                delay: 0,
                duration: [300, 250],
                getReferenceClientRect: null,
                hideOnClick: !0,
                ignoreAttributes: !1,
                interactive: !1,
                interactiveBorder: 2,
                interactiveDebounce: 0,
                moveTransition: "",
                offset: [0, 10],
                onAfterUpdate: function () {
                },
                onBeforeUpdate: function () {
                },
                onCreate: function () {
                },
                onDestroy: function () {
                },
                onHidden: function () {
                },
                onHide: function () {
                },
                onMount: function () {
                },
                onShow: function () {
                },
                onShown: function () {
                },
                onTrigger: function () {
                },
                onUntrigger: function () {
                },
                onClickOutside: function () {
                },
                placement: "top",
                plugins: [],
                popperOptions: {},
                render: null,
                showOnCreate: !1,
                touch: !0,
                trigger: "mouseenter focus",
                triggerTarget: null
            }, mt, {}, Ir), Lr = Object.keys(Ke), Nr = function (h) {
                ft(h, []);
                var y = Object.keys(h);
                y.forEach(function (C) {
                    Ke[C] = h[C]
                })
            };

            function nt(f) {
                var h = f.plugins || [], y = h.reduce(function (C, k) {
                    var M = k.name, _ = k.defaultValue;
                    return M && (C[M] = f[M] !== void 0 ? f[M] : _), C
                }, {});
                return Object.assign({}, f, {}, y)
            }

            function kr(f, h) {
                var y = h ? Object.keys(nt(Object.assign({}, Ke, {plugins: h}))) : Lr, C = y.reduce(function (k, M) {
                    var _ = (f.getAttribute("data-tippy-" + M) || "").trim();
                    if (!_) return k;
                    if (M === "content") k[M] = _; else try {
                        k[M] = JSON.parse(_)
                    } catch {
                        k[M] = _
                    }
                    return k
                }, {});
                return C
            }

            function Zn(f, h) {
                var y = Object.assign({}, h, {content: b(h.content, [f])}, h.ignoreAttributes ? {} : kr(f, h.plugins));
                return y.aria = Object.assign({}, Ke.aria, {}, y.aria), y.aria = {
                    expanded: y.aria.expanded === "auto" ? h.interactive : y.aria.expanded,
                    content: y.aria.content === "auto" ? h.interactive ? null : "describedby" : y.aria.content
                }, y
            }

            function ft(f, h) {
                f === void 0 && (f = {}), h === void 0 && (h = []);
                var y = Object.keys(f);
                y.forEach(function (C) {
                    var k = S(Ke, Object.keys(mt)), M = !p(k, C);
                    M && (M = h.filter(function (_) {
                        return _.name === C
                    }).length === 0), ut(M, ["`" + C + "`", "is not a valid prop. You may have spelled it incorrectly, or if it's", "a plugin, forgot to pass it in an array as props.plugins.", `

`,`All props: https://atomiks.github.io/tippyjs/v6/all-props/
`, "Plugins: https://atomiks.github.io/tippyjs/v6/plugins/"].join(" "))
                })
            }

            var en = function () {
                return "innerHTML"
            };

            function Bt(f, h) {
                f[en()] = h
            }

            function er(f) {
                var h = ee();
                return f === !0 ? h.className = s : (h.className = c, Z(f) ? h.appendChild(f) : Bt(h, f)), h
            }

            function Pn(f, h) {
                Z(h.content) ? (Bt(f, ""), f.appendChild(h.content)) : typeof h.content != "function" && (h.allowHTML ? Bt(f, h.content) : f.textContent = h.content)
            }

            function Ft(f) {
                var h = f.firstElementChild, y = V(h.children);
                return {
                    box: h, content: y.find(function (C) {
                        return C.classList.contains(i)
                    }), arrow: y.find(function (C) {
                        return C.classList.contains(s) || C.classList.contains(c)
                    }), backdrop: y.find(function (C) {
                        return C.classList.contains(o)
                    })
                }
            }

            function tr(f) {
                var h = ee(), y = ee();
                y.className = r, y.setAttribute("data-state", "hidden"), y.setAttribute("tabindex", "-1");
                var C = ee();
                C.className = i, C.setAttribute("data-state", "hidden"), Pn(C, f.props), h.appendChild(y), y.appendChild(C), k(f.props, f.props);

                function k(M, _) {
                    var se = Ft(h), G = se.box, te = se.content, le = se.arrow;
                    _.theme ? G.setAttribute("data-theme", _.theme) : G.removeAttribute("data-theme"), typeof _.animation == "string" ? G.setAttribute("data-animation", _.animation) : G.removeAttribute("data-animation"), _.inertia ? G.setAttribute("data-inertia", "") : G.removeAttribute("data-inertia"), G.style.maxWidth = typeof _.maxWidth == "number" ? _.maxWidth + "px" : _.maxWidth, _.role ? G.setAttribute("role", _.role) : G.removeAttribute("role"), (M.content !== _.content || M.allowHTML !== _.allowHTML) && Pn(te, f.props), _.arrow ? le ? M.arrow !== _.arrow && (G.removeChild(le), G.appendChild(er(_.arrow))) : G.appendChild(er(_.arrow)) : le && G.removeChild(le)
                }

                return {popper: h, onUpdate: k}
            }

            tr.$$tippy = !0;
            var nr = 1, hn = [], vn = [];

            function tn(f, h) {
                var y = Zn(f, Object.assign({}, Ke, {}, nt(he(h)))), C, k, M, _ = !1, se = !1, G = !1, te = !1, le, Oe, Ne,
                    be = [], _e = O(De, y.interactiveDebounce), X, ne = nr++, re = null, $ = L(y.plugins),
                    Y = {isEnabled: !0, isVisible: !1, isDestroyed: !1, isMounted: !1, isShown: !1}, g = {
                        id: ne,
                        reference: f,
                        popper: ee(),
                        popperInstance: re,
                        props: y,
                        state: Y,
                        plugins: $,
                        clearDelayTimeouts: Dt,
                        setProps: on,
                        setContent: Ut,
                        show: Tt,
                        hide: Ln,
                        hideWithInteractivity: Xt,
                        enable: ht,
                        disable: Je,
                        unmount: yn,
                        destroy: Nn
                    };
                if (!y.render) return jt(!0, "render() function has not been supplied."), g;
                var Ye = y.render(g), Q = Ye.popper, Ct = Ye.onUpdate;
                Q.setAttribute("data-tippy-root", ""), Q.id = "tippy-" + g.id, g.popper = Q, f._tippy = g, Q._tippy = g;
                var dt = $.map(function (w) {
                    return w.fn(g)
                }), $t = f.hasAttribute("aria-expanded");
                return Ce(), x(), a(), d("onCreate", [g]), y.showOnCreate && Be(), Q.addEventListener("mouseenter", function () {
                    g.props.interactive && g.state.isVisible && g.clearDelayTimeouts()
                }), Q.addEventListener("mouseleave", function (w) {
                    g.props.interactive && g.props.trigger.indexOf("mouseenter") >= 0 && (pt().addEventListener("mousemove", _e), _e(w))
                }), g;

                function Wt() {
                    var w = g.props.touch;
                    return Array.isArray(w) ? w : [w, 0]
                }

                function Vt() {
                    return Wt()[0] === "hold"
                }

                function Ze() {
                    var w;
                    return !!((w = g.props.render) != null && w.$$tippy)
                }

                function ot() {
                    return X || f
                }

                function pt() {
                    var w = ot().parentNode;
                    return w ? ve(w) : document
                }

                function rn() {
                    return Ft(Q)
                }

                function l(w) {
                    return g.state.isMounted && !g.state.isVisible || Te.isTouch || le && le.type === "focus" ? 0 : m(g.props.delay, w ? 0 : 1, Ke.delay)
                }

                function a() {
                    Q.style.pointerEvents = g.props.interactive && g.state.isVisible ? "" : "none", Q.style.zIndex = "" + g.props.zIndex
                }

                function d(w, H, U) {
                    if (U === void 0 && (U = !0), dt.forEach(function (ce) {
                        ce[w] && ce[w].apply(void 0, H)
                    }), U) {
                        var ie;
                        (ie = g.props)[w].apply(ie, H)
                    }
                }

                function E() {
                    var w = g.props.aria;
                    if (w.content) {
                        var H = "aria-" + w.content, U = Q.id, ie = B(g.props.triggerTarget || f);
                        ie.forEach(function (ce) {
                            var ze = ce.getAttribute(H);
                            if (g.state.isVisible) ce.setAttribute(H, ze ? ze + " " + U : U); else {
                                var qe = ze && ze.replace(U, "").trim();
                                qe ? ce.setAttribute(H, qe) : ce.removeAttribute(H)
                            }
                        })
                    }
                }

                function x() {
                    if (!($t || !g.props.aria.expanded)) {
                        var w = B(g.props.triggerTarget || f);
                        w.forEach(function (H) {
                            g.props.interactive ? H.setAttribute("aria-expanded", g.state.isVisible && H === ot() ? "true" : "false") : H.removeAttribute("aria-expanded")
                        })
                    }
                }

                function D() {
                    pt().removeEventListener("mousemove", _e), hn = hn.filter(function (w) {
                        return w !== _e
                    })
                }

                function R(w) {
                    if (!(Te.isTouch && (G || w.type === "mousedown")) && !(g.props.interactive && Q.contains(w.target))) {
                        if (ot().contains(w.target)) {
                            if (Te.isTouch || g.state.isVisible && g.props.trigger.indexOf("click") >= 0) return
                        } else d("onClickOutside", [g, w]);
                        g.props.hideOnClick === !0 && (g.clearDelayTimeouts(), g.hide(), se = !0, setTimeout(function () {
                            se = !1
                        }), g.state.isMounted || I())
                    }
                }

                function P() {
                    G = !0
                }

                function j() {
                    G = !1
                }

                function z() {
                    var w = pt();
                    w.addEventListener("mousedown", R, !0), w.addEventListener("touchend", R, u), w.addEventListener("touchstart", j, u), w.addEventListener("touchmove", P, u)
                }

                function I() {
                    var w = pt();
                    w.removeEventListener("mousedown", R, !0), w.removeEventListener("touchend", R, u), w.removeEventListener("touchstart", j, u), w.removeEventListener("touchmove", P, u)
                }

                function Ee(w, H) {
                    ye(w, function () {
                        !g.state.isVisible && Q.parentNode && Q.parentNode.contains(Q) && H()
                    })
                }

                function Me(w, H) {
                    ye(w, H)
                }

                function ye(w, H) {
                    var U = rn().box;

                    function ie(ce) {
                        ce.target === U && (Le(U, "remove", ie), H())
                    }

                    if (w === 0) return H();
                    Le(U, "remove", Oe), Le(U, "add", ie), Oe = ie
                }

                function fe(w, H, U) {
                    U === void 0 && (U = !1);
                    var ie = B(g.props.triggerTarget || f);
                    ie.forEach(function (ce) {
                        ce.addEventListener(w, H, U), be.push({node: ce, eventType: w, handler: H, options: U})
                    })
                }

                function Ce() {
                    Vt() && (fe("touchstart", ke, {passive: !0}), fe("touchend", je, {passive: !0})), A(g.props.trigger).forEach(function (w) {
                        if (w !== "manual") switch (fe(w, ke), w) {
                            case"mouseenter":
                                fe("mouseleave", je);
                                break;
                            case"focus":
                                fe(Pr ? "focusout" : "blur", J);
                                break;
                            case"focusin":
                                fe("focusout", J);
                                break
                        }
                    })
                }

                function ge() {
                    be.forEach(function (w) {
                        var H = w.node, U = w.eventType, ie = w.handler, ce = w.options;
                        H.removeEventListener(U, ie, ce)
                    }), be = []
                }

                function ke(w) {
                    var H, U = !1;
                    if (!(!g.state.isEnabled || Se(w) || se)) {
                        var ie = ((H = le) == null ? void 0 : H.type) === "focus";
                        le = w, X = w.currentTarget, x(), !g.state.isVisible && N(w) && hn.forEach(function (ce) {
                            return ce(w)
                        }), w.type === "click" && (g.props.trigger.indexOf("mouseenter") < 0 || _) && g.props.hideOnClick !== !1 && g.state.isVisible ? U = !0 : Be(w), w.type === "click" && (_ = !U), U && !ie && He(w)
                    }
                }

                function De(w) {
                    var H = w.target, U = ot().contains(H) || Q.contains(H);
                    if (!(w.type === "mousemove" && U)) {
                        var ie = Ve().concat(Q).map(function (ce) {
                            var ze, qe = ce._tippy, bt = (ze = qe.popperInstance) == null ? void 0 : ze.state;
                            return bt ? {popperRect: ce.getBoundingClientRect(), popperState: bt, props: y} : null
                        }).filter(Boolean);
                        We(ie, w) && (D(), He(w))
                    }
                }

                function je(w) {
                    var H = Se(w) || g.props.trigger.indexOf("click") >= 0 && _;
                    if (!H) {
                        if (g.props.interactive) {
                            g.hideWithInteractivity(w);
                            return
                        }
                        He(w)
                    }
                }

                function J(w) {
                    g.props.trigger.indexOf("focusin") < 0 && w.target !== ot() || g.props.interactive && w.relatedTarget && Q.contains(w.relatedTarget) || He(w)
                }

                function Se(w) {
                    return Te.isTouch ? Vt() !== w.type.indexOf("touch") >= 0 : !1
                }

                function xe() {
                    Re();
                    var w = g.props, H = w.popperOptions, U = w.placement, ie = w.offset, ce = w.getReferenceClientRect,
                        ze = w.moveTransition, qe = Ze() ? Ft(Q).arrow : null,
                        bt = ce ? {getBoundingClientRect: ce, contextElement: ce.contextElement || ot()} : f, kn = {
                            name: "$$tippy",
                            enabled: !0,
                            phase: "beforeWrite",
                            requires: ["computeStyles"],
                            fn: function (an) {
                                var Yt = an.state;
                                if (Ze()) {
                                    var Wr = rn(), zt = Wr.box;
                                    ["placement", "reference-hidden", "escaped"].forEach(function (sn) {
                                        sn === "placement" ? zt.setAttribute("data-placement", Yt.placement) : Yt.attributes.popper["data-popper-" + sn] ? zt.setAttribute("data-" + sn, "") : zt.removeAttribute("data-" + sn)
                                    }), Yt.attributes.popper = {}
                                }
                            }
                        }, yt = [{name: "offset", options: {offset: ie}}, {
                            name: "preventOverflow",
                            options: {padding: {top: 2, bottom: 2, left: 5, right: 5}}
                        }, {name: "flip", options: {padding: 5}}, {name: "computeStyles", options: {adaptive: !ze}}, kn];
                    Ze() && qe && yt.push({
                        name: "arrow",
                        options: {element: qe, padding: 3}
                    }), yt.push.apply(yt, H?.modifiers || []), g.popperInstance = t.createPopper(bt, Q, Object.assign({}, H, {
                        placement: U,
                        onFirstUpdate: Ne,
                        modifiers: yt
                    }))
                }

                function Re() {
                    g.popperInstance && (g.popperInstance.destroy(), g.popperInstance = null)
                }

                function Pe() {
                    var w = g.props.appendTo, H, U = ot();
                    g.props.interactive && w === Ke.appendTo || w === "parent" ? H = U.parentNode : H = b(w, [U]), H.contains(Q) || H.appendChild(Q), xe(), ut(g.props.interactive && w === Ke.appendTo && U.nextElementSibling !== Q, ["Interactive tippy element may not be accessible via keyboard", "navigation because it is not directly after the reference element", "in the DOM source order.", `

`,"Using a wrapper <div> or <span> tag around the reference element","solves this by creating a new parentNode context.",`

`,"Specifying `appendTo: document.body` silences this warning, but it","assumes you are using a focus management solution to handle","keyboard navigation.",`

`, "See: https://atomiks.github.io/tippyjs/v6/accessibility/#interactivity"].join(" "))
                }

                function Ve() {
                    return V(Q.querySelectorAll("[data-tippy-root]"))
                }

                function Be(w) {
                    g.clearDelayTimeouts(), w && d("onTrigger", [g, w]), z();
                    var H = l(!0), U = Wt(), ie = U[0], ce = U[1];
                    Te.isTouch && ie === "hold" && ce && (H = ce), H ? C = setTimeout(function () {
                        g.show()
                    }, H) : g.show()
                }

                function He(w) {
                    if (g.clearDelayTimeouts(), d("onUntrigger", [g, w]), !g.state.isVisible) {
                        I();
                        return
                    }
                    if (!(g.props.trigger.indexOf("mouseenter") >= 0 && g.props.trigger.indexOf("click") >= 0 && ["mouseleave", "mousemove"].indexOf(w.type) >= 0 && _)) {
                        var H = l(!1);
                        H ? k = setTimeout(function () {
                            g.state.isVisible && g.hide()
                        }, H) : M = requestAnimationFrame(function () {
                            g.hide()
                        })
                    }
                }

                function ht() {
                    g.state.isEnabled = !0
                }

                function Je() {
                    g.hide(), g.state.isEnabled = !1
                }

                function Dt() {
                    clearTimeout(C), clearTimeout(k), cancelAnimationFrame(M)
                }

                function on(w) {
                    if (ut(g.state.isDestroyed, kt("setProps")), !g.state.isDestroyed) {
                        d("onBeforeUpdate", [g, w]), ge();
                        var H = g.props, U = Zn(f, Object.assign({}, g.props, {}, w, {ignoreAttributes: !0}));
                        g.props = U, Ce(), H.interactiveDebounce !== U.interactiveDebounce && (D(), _e = O(De, U.interactiveDebounce)), H.triggerTarget && !U.triggerTarget ? B(H.triggerTarget).forEach(function (ie) {
                            ie.removeAttribute("aria-expanded")
                        }) : U.triggerTarget && f.removeAttribute("aria-expanded"), x(), a(), Ct && Ct(H, U), g.popperInstance && (xe(), Ve().forEach(function (ie) {
                            requestAnimationFrame(ie._tippy.popperInstance.forceUpdate)
                        })), d("onAfterUpdate", [g, w])
                    }
                }

                function Ut(w) {
                    g.setProps({content: w})
                }

                function Tt() {
                    ut(g.state.isDestroyed, kt("show"));
                    var w = g.state.isVisible, H = g.state.isDestroyed, U = !g.state.isEnabled,
                        ie = Te.isTouch && !g.props.touch, ce = m(g.props.duration, 0, Ke.duration);
                    if (!(w || H || U || ie) && !ot().hasAttribute("disabled") && (d("onShow", [g], !1), g.props.onShow(g) !== !1)) {
                        if (g.state.isVisible = !0, Ze() && (Q.style.visibility = "visible"), a(), z(), g.state.isMounted || (Q.style.transition = "none"), Ze()) {
                            var ze = rn(), qe = ze.box, bt = ze.content;
                            Ae([qe, bt], 0)
                        }
                        Ne = function () {
                            var yt;
                            if (!(!g.state.isVisible || te)) {
                                if (te = !0, Q.offsetHeight, Q.style.transition = g.props.moveTransition, Ze() && g.props.animation) {
                                    var wn = rn(), an = wn.box, Yt = wn.content;
                                    Ae([an, Yt], ce), pe([an, Yt], "visible")
                                }
                                E(), x(), F(vn, g), (yt = g.popperInstance) == null || yt.forceUpdate(), g.state.isMounted = !0, d("onMount", [g]), g.props.animation && Ze() && Me(ce, function () {
                                    g.state.isShown = !0, d("onShown", [g])
                                })
                            }
                        }, Pe()
                    }
                }

                function Ln() {
                    ut(g.state.isDestroyed, kt("hide"));
                    var w = !g.state.isVisible, H = g.state.isDestroyed, U = !g.state.isEnabled,
                        ie = m(g.props.duration, 1, Ke.duration);
                    if (!(w || H || U) && (d("onHide", [g], !1), g.props.onHide(g) !== !1)) {
                        if (g.state.isVisible = !1, g.state.isShown = !1, te = !1, _ = !1, Ze() && (Q.style.visibility = "hidden"), D(), I(), a(), Ze()) {
                            var ce = rn(), ze = ce.box, qe = ce.content;
                            g.props.animation && (Ae([ze, qe], ie), pe([ze, qe], "hidden"))
                        }
                        E(), x(), g.props.animation ? Ze() && Ee(ie, g.unmount) : g.unmount()
                    }
                }

                function Xt(w) {
                    ut(g.state.isDestroyed, kt("hideWithInteractivity")), pt().addEventListener("mousemove", _e), F(hn, _e), _e(w)
                }

                function yn() {
                    ut(g.state.isDestroyed, kt("unmount")), g.state.isVisible && g.hide(), g.state.isMounted && (Re(), Ve().forEach(function (w) {
                        w._tippy.unmount()
                    }), Q.parentNode && Q.parentNode.removeChild(Q), vn = vn.filter(function (w) {
                        return w !== g
                    }), g.state.isMounted = !1, d("onHidden", [g]))
                }

                function Nn() {
                    ut(g.state.isDestroyed, kt("destroy")), !g.state.isDestroyed && (g.clearDelayTimeouts(), g.unmount(), ge(), delete f._tippy, g.state.isDestroyed = !0, d("onDestroy", [g]))
                }
            }

            function lt(f, h) {
                h === void 0 && (h = {});
                var y = Ke.plugins.concat(h.plugins || []);
                gt(f), ft(h, y), _n();
                var C = Object.assign({}, h, {plugins: y}), k = ue(f), M = Z(C.content), _ = k.length > 1;
                ut(M && _, ["tippy() was passed an Element as the `content` prop, but more than", "one tippy instance was created by this invocation. This means the", "content element will only be appended to the last tippy instance.", `

`,"Instead, pass the .innerHTML of the element, or use a function that","returns a cloned version of the element instead.",`

`,`1) content: element.innerHTML
`, "2) content: () => element.cloneNode(true)"].join(" "));
                var se = k.reduce(function (G, te) {
                    var le = te && tn(te, C);
                    return le && G.push(le), G
                }, []);
                return Z(f) ? se[0] : se
            }

            lt.defaultProps = Ke, lt.setDefaultProps = Nr, lt.currentInput = Te;
            var rr = function (h) {
                var y = h === void 0 ? {} : h, C = y.exclude, k = y.duration;
                vn.forEach(function (M) {
                    var _ = !1;
                    if (C && (_ = ae(C) ? M.reference === C : M.popper === C.popper), !_) {
                        var se = M.props.duration;
                        M.setProps({duration: k}), M.hide(), M.state.isDestroyed || M.setProps({duration: se})
                    }
                })
            }, or = Object.assign({}, t.applyStyles, {
                effect: function (h) {
                    var y = h.state, C = {
                        popper: {position: y.options.strategy, left: "0", top: "0", margin: "0"},
                        arrow: {position: "absolute"},
                        reference: {}
                    };
                    Object.assign(y.elements.popper.style, C.popper), y.styles = C, y.elements.arrow && Object.assign(y.elements.arrow.style, C.arrow)
                }
            }), ir = function (h, y) {
                var C;
                y === void 0 && (y = {}), jt(!Array.isArray(h), ["The first argument passed to createSingleton() must be an array of", "tippy instances. The passed value was", String(h)].join(" "));
                var k = h, M = [], _, se = y.overrides, G = [], te = !1;

                function le() {
                    M = k.map(function ($) {
                        return $.reference
                    })
                }

                function Oe($) {
                    k.forEach(function (Y) {
                        $ ? Y.enable() : Y.disable()
                    })
                }

                function Ne($) {
                    return k.map(function (Y) {
                        var g = Y.setProps;
                        return Y.setProps = function (Ye) {
                            g(Ye), Y.reference === _ && $.setProps(Ye)
                        }, function () {
                            Y.setProps = g
                        }
                    })
                }

                function be($, Y) {
                    var g = M.indexOf(Y);
                    if (Y !== _) {
                        _ = Y;
                        var Ye = (se || []).concat("content").reduce(function (Q, Ct) {
                            return Q[Ct] = k[g].props[Ct], Q
                        }, {});
                        $.setProps(Object.assign({}, Ye, {
                            getReferenceClientRect: typeof Ye.getReferenceClientRect == "function" ? Ye.getReferenceClientRect : function () {
                                return Y.getBoundingClientRect()
                            }
                        }))
                    }
                }

                Oe(!1), le();
                var _e = {
                    fn: function () {
                        return {
                            onDestroy: function () {
                                Oe(!0)
                            }, onHidden: function () {
                                _ = null
                            }, onClickOutside: function (g) {
                                g.props.showOnCreate && !te && (te = !0, _ = null)
                            }, onShow: function (g) {
                                g.props.showOnCreate && !te && (te = !0, be(g, M[0]))
                            }, onTrigger: function (g, Ye) {
                                be(g, Ye.currentTarget)
                            }
                        }
                    }
                }, X = lt(ee(), Object.assign({}, S(y, ["overrides"]), {
                    plugins: [_e].concat(y.plugins || []),
                    triggerTarget: M,
                    popperOptions: Object.assign({}, y.popperOptions, {modifiers: [].concat(((C = y.popperOptions) == null ? void 0 : C.modifiers) || [], [or])})
                })), ne = X.show;
                X.show = function ($) {
                    if (ne(), !_ && $ == null) return be(X, M[0]);
                    if (!(_ && $ == null)) {
                        if (typeof $ == "number") return M[$] && be(X, M[$]);
                        if (k.includes($)) {
                            var Y = $.reference;
                            return be(X, Y)
                        }
                        if (M.includes($)) return be(X, $)
                    }
                }, X.showNext = function () {
                    var $ = M[0];
                    if (!_) return X.show(0);
                    var Y = M.indexOf(_);
                    X.show(M[Y + 1] || $)
                }, X.showPrevious = function () {
                    var $ = M[M.length - 1];
                    if (!_) return X.show($);
                    var Y = M.indexOf(_), g = M[Y - 1] || $;
                    X.show(g)
                };
                var re = X.setProps;
                return X.setProps = function ($) {
                    se = $.overrides || se, re($)
                }, X.setInstances = function ($) {
                    Oe(!0), G.forEach(function (Y) {
                        return Y()
                    }), k = $, Oe(!1), le(), Ne(X), X.setProps({triggerTarget: M})
                }, G = Ne(X), X
            }, ar = {mouseover: "mouseenter", focusin: "focus", click: "click"};

            function Ht(f, h) {
                jt(!(h && h.target), ["You must specity a `target` prop indicating a CSS selector string matching", "the target elements that should receive a tippy."].join(" "));
                var y = [], C = [], k = !1, M = h.target, _ = S(h, ["target"]),
                    se = Object.assign({}, _, {trigger: "manual", touch: !1}), G = Object.assign({}, _, {showOnCreate: !0}),
                    te = lt(f, se), le = B(te);

                function Oe(ne) {
                    if (!(!ne.target || k)) {
                        var re = ne.target.closest(M);
                        if (re) {
                            var $ = re.getAttribute("data-tippy-trigger") || h.trigger || Ke.trigger;
                            if (!re._tippy && !(ne.type === "touchstart" && typeof G.touch == "boolean") && !(ne.type !== "touchstart" && $.indexOf(ar[ne.type]) < 0)) {
                                var Y = lt(re, G);
                                Y && (C = C.concat(Y))
                            }
                        }
                    }
                }

                function Ne(ne, re, $, Y) {
                    Y === void 0 && (Y = !1), ne.addEventListener(re, $, Y), y.push({
                        node: ne,
                        eventType: re,
                        handler: $,
                        options: Y
                    })
                }

                function be(ne) {
                    var re = ne.reference;
                    Ne(re, "touchstart", Oe, u), Ne(re, "mouseover", Oe), Ne(re, "focusin", Oe), Ne(re, "click", Oe)
                }

                function _e() {
                    y.forEach(function (ne) {
                        var re = ne.node, $ = ne.eventType, Y = ne.handler, g = ne.options;
                        re.removeEventListener($, Y, g)
                    }), y = []
                }

                function X(ne) {
                    var re = ne.destroy, $ = ne.enable, Y = ne.disable;
                    ne.destroy = function (g) {
                        g === void 0 && (g = !0), g && C.forEach(function (Ye) {
                            Ye.destroy()
                        }), C = [], _e(), re()
                    }, ne.enable = function () {
                        $(), C.forEach(function (g) {
                            return g.enable()
                        }), k = !1
                    }, ne.disable = function () {
                        Y(), C.forEach(function (g) {
                            return g.disable()
                        }), k = !0
                    }, be(ne)
                }

                return le.forEach(X), te
            }

            var sr = {
                name: "animateFill", defaultValue: !1, fn: function (h) {
                    var y;
                    if (!((y = h.props.render) != null && y.$$tippy)) return jt(h.props.animateFill, "The `animateFill` plugin requires the default render function."), {};
                    var C = Ft(h.popper), k = C.box, M = C.content, _ = h.props.animateFill ? jr() : null;
                    return {
                        onCreate: function () {
                            _ && (k.insertBefore(_, k.firstElementChild), k.setAttribute("data-animatefill", ""), k.style.overflow = "hidden", h.setProps({
                                arrow: !1,
                                animation: "shift-away"
                            }))
                        }, onMount: function () {
                            if (_) {
                                var G = k.style.transitionDuration, te = Number(G.replace("ms", ""));
                                M.style.transitionDelay = Math.round(te / 10) + "ms", _.style.transitionDuration = G, pe([_], "visible")
                            }
                        }, onShow: function () {
                            _ && (_.style.transitionDuration = "0ms")
                        }, onHide: function () {
                            _ && pe([_], "hidden")
                        }
                    }
                }
            };

            function jr() {
                var f = ee();
                return f.className = o, pe([f], "hidden"), f
            }

            var gn = {clientX: 0, clientY: 0}, nn = [];

            function mn(f) {
                var h = f.clientX, y = f.clientY;
                gn = {clientX: h, clientY: y}
            }

            function bn(f) {
                f.addEventListener("mousemove", mn)
            }

            function Br(f) {
                f.removeEventListener("mousemove", mn)
            }

            var Mn = {
                name: "followCursor", defaultValue: !1, fn: function (h) {
                    var y = h.reference, C = ve(h.props.triggerTarget || y), k = !1, M = !1, _ = !0, se = h.props;

                    function G() {
                        return h.props.followCursor === "initial" && h.state.isVisible
                    }

                    function te() {
                        C.addEventListener("mousemove", Ne)
                    }

                    function le() {
                        C.removeEventListener("mousemove", Ne)
                    }

                    function Oe() {
                        k = !0, h.setProps({getReferenceClientRect: null}), k = !1
                    }

                    function Ne(X) {
                        var ne = X.target ? y.contains(X.target) : !0, re = h.props.followCursor, $ = X.clientX,
                            Y = X.clientY, g = y.getBoundingClientRect(), Ye = $ - g.left, Q = Y - g.top;
                        (ne || !h.props.interactive) && h.setProps({
                            getReferenceClientRect: function () {
                                var dt = y.getBoundingClientRect(), $t = $, Wt = Y;
                                re === "initial" && ($t = dt.left + Ye, Wt = dt.top + Q);
                                var Vt = re === "horizontal" ? dt.top : Wt, Ze = re === "vertical" ? dt.right : $t,
                                    ot = re === "horizontal" ? dt.bottom : Wt, pt = re === "vertical" ? dt.left : $t;
                                return {width: Ze - pt, height: ot - Vt, top: Vt, right: Ze, bottom: ot, left: pt}
                            }
                        })
                    }

                    function be() {
                        h.props.followCursor && (nn.push({instance: h, doc: C}), bn(C))
                    }

                    function _e() {
                        nn = nn.filter(function (X) {
                            return X.instance !== h
                        }), nn.filter(function (X) {
                            return X.doc === C
                        }).length === 0 && Br(C)
                    }

                    return {
                        onCreate: be, onDestroy: _e, onBeforeUpdate: function () {
                            se = h.props
                        }, onAfterUpdate: function (ne, re) {
                            var $ = re.followCursor;
                            k || $ !== void 0 && se.followCursor !== $ && (_e(), $ ? (be(), h.state.isMounted && !M && !G() && te()) : (le(), Oe()))
                        }, onMount: function () {
                            h.props.followCursor && !M && (_ && (Ne(gn), _ = !1), G() || te())
                        }, onTrigger: function (ne, re) {
                            N(re) && (gn = {clientX: re.clientX, clientY: re.clientY}), M = re.type === "focus"
                        }, onHidden: function () {
                            h.props.followCursor && (Oe(), le(), _ = !0)
                        }
                    }
                }
            };

            function Fr(f, h) {
                var y;
                return {
                    popperOptions: Object.assign({}, f.popperOptions, {
                        modifiers: [].concat((((y = f.popperOptions) == null ? void 0 : y.modifiers) || []).filter(function (C) {
                            var k = C.name;
                            return k !== h.name
                        }), [h])
                    })
                }
            }

            var Rn = {
                name: "inlinePositioning", defaultValue: !1, fn: function (h) {
                    var y = h.reference;

                    function C() {
                        return !!h.props.inlinePositioning
                    }

                    var k, M = -1, _ = !1, se = {
                        name: "tippyInlinePositioning", enabled: !0, phase: "afterWrite", fn: function (Ne) {
                            var be = Ne.state;
                            C() && (k !== be.placement && h.setProps({
                                getReferenceClientRect: function () {
                                    return G(be.placement)
                                }
                            }), k = be.placement)
                        }
                    };

                    function G(Oe) {
                        return Hr(K(Oe), y.getBoundingClientRect(), V(y.getClientRects()), M)
                    }

                    function te(Oe) {
                        _ = !0, h.setProps(Oe), _ = !1
                    }

                    function le() {
                        _ || te(Fr(h.props, se))
                    }

                    return {
                        onCreate: le, onAfterUpdate: le, onTrigger: function (Ne, be) {
                            if (N(be)) {
                                var _e = V(h.reference.getClientRects()), X = _e.find(function (ne) {
                                    return ne.left - 2 <= be.clientX && ne.right + 2 >= be.clientX && ne.top - 2 <= be.clientY && ne.bottom + 2 >= be.clientY
                                });
                                M = _e.indexOf(X)
                            }
                        }, onUntrigger: function () {
                            M = -1
                        }
                    }
                }
            };

            function Hr(f, h, y, C) {
                if (y.length < 2 || f === null) return h;
                if (y.length === 2 && C >= 0 && y[0].left > y[1].right) return y[C] || h;
                switch (f) {
                    case"top":
                    case"bottom": {
                        var k = y[0], M = y[y.length - 1], _ = f === "top", se = k.top, G = M.bottom,
                            te = _ ? k.left : M.left, le = _ ? k.right : M.right, Oe = le - te, Ne = G - se;
                        return {top: se, bottom: G, left: te, right: le, width: Oe, height: Ne}
                    }
                    case"left":
                    case"right": {
                        var be = Math.min.apply(Math, y.map(function (Q) {
                            return Q.left
                        })), _e = Math.max.apply(Math, y.map(function (Q) {
                            return Q.right
                        })), X = y.filter(function (Q) {
                            return f === "left" ? Q.left === be : Q.right === _e
                        }), ne = X[0].top, re = X[X.length - 1].bottom, $ = be, Y = _e, g = Y - $, Ye = re - ne;
                        return {top: ne, bottom: re, left: $, right: Y, width: g, height: Ye}
                    }
                    default:
                        return h
                }
            }

            var $r = {
                name: "sticky", defaultValue: !1, fn: function (h) {
                    var y = h.reference, C = h.popper;

                    function k() {
                        return h.popperInstance ? h.popperInstance.state.elements.reference : y
                    }

                    function M(te) {
                        return h.props.sticky === !0 || h.props.sticky === te
                    }

                    var _ = null, se = null;

                    function G() {
                        var te = M("reference") ? k().getBoundingClientRect() : null,
                            le = M("popper") ? C.getBoundingClientRect() : null;
                        (te && In(_, te) || le && In(se, le)) && h.popperInstance && h.popperInstance.update(), _ = te, se = le, h.state.isMounted && requestAnimationFrame(G)
                    }

                    return {
                        onMount: function () {
                            h.props.sticky && G()
                        }
                    }
                }
            };

            function In(f, h) {
                return f && h ? f.top !== h.top || f.right !== h.right || f.bottom !== h.bottom || f.left !== h.left : !0
            }

            lt.setDefaultProps({render: tr}), e.animateFill = sr, e.createSingleton = ir, e.default = lt, e.delegate = Ht, e.followCursor = Mn, e.hideAll = rr, e.inlinePositioning = Rn, e.roundArrow = n, e.sticky = $r
        }), mo = Oi(Si()), Va = Oi(Si()), Ua = e => {
            let t = {plugins: []}, n = i => e[e.indexOf(i) + 1];
            if (e.includes("animation") && (t.animation = n("animation")), e.includes("duration") && (t.duration = parseInt(n("duration"))), e.includes("delay")) {
                let i = n("delay");
                t.delay = i.includes("-") ? i.split("-").map(o => parseInt(o)) : parseInt(i)
            }
            if (e.includes("cursor")) {
                t.plugins.push(Va.followCursor);
                let i = n("cursor");
                ["x", "initial"].includes(i) ? t.followCursor = i === "x" ? "horizontal" : "initial" : t.followCursor = !0
            }
            e.includes("on") && (t.trigger = n("on")), e.includes("arrowless") && (t.arrow = !1), e.includes("html") && (t.allowHTML = !0), e.includes("interactive") && (t.interactive = !0), e.includes("border") && t.interactive && (t.interactiveBorder = parseInt(n("border"))), e.includes("debounce") && t.interactive && (t.interactiveDebounce = parseInt(n("debounce"))), e.includes("max-width") && (t.maxWidth = parseInt(n("max-width"))), e.includes("theme") && (t.theme = n("theme")), e.includes("placement") && (t.placement = n("placement"));
            let r = {};
            return e.includes("no-flip") && (r.modifiers || (r.modifiers = []), r.modifiers.push({
                name: "flip",
                enabled: !1
            })), t.popperOptions = r, t
        };

    function bo(e) {
        e.magic("tooltip", t => (n, r = {}) => {
            let i = r.timeout;
            delete r.timeout;
            let o = (0, mo.default)(t, {content: n, trigger: "manual", ...r});
            o.show(), setTimeout(() => {
                o.hide(), setTimeout(() => o.destroy(), r.duration || 300)
            }, i || 2e3)
        }), e.directive("tooltip", (t, {modifiers: n, expression: r}, {evaluateLater: i, effect: o}) => {
            let s = n.length > 0 ? Ua(n) : {};
            t.__x_tippy || (t.__x_tippy = (0, mo.default)(t, s));
            let c = () => t.__x_tippy.enable(), u = () => t.__x_tippy.disable(), p = m => {
                m ? (c(), t.__x_tippy.setContent(m)) : u()
            };
            if (n.includes("raw")) p(r); else {
                let m = i(r);
                o(() => {
                    m(v => {
                        typeof v == "object" ? (t.__x_tippy.setProps(v), c()) : p(v)
                    })
                })
            }
        })
    }

    bo.defaultProps = e => (mo.default.setDefaultProps(e), bo);
    var Xa = bo, Ai = Xa;
    document.addEventListener("alpine:init", () => {
        window.Alpine.plugin(Ko), window.Alpine.plugin(Jo), window.Alpine.plugin(Ei), window.Alpine.plugin(Ai)
    });
    var Ya = function (e, t, n) {
        function r(m, v) {
            for (let b of m) {
                let O = i(b, v);
                if (O !== null) return O
            }
        }

        function i(m, v) {
            let b = m.match(/^[\{\[]([^\[\]\{\}]*)[\}\]](.*)/s);
            if (b === null || b.length !== 3) return null;
            let O = b[1], S = b[2];
            if (O.includes(",")) {
                let [A, B] = O.split(",", 2);
                if (B === "*" && v >= A) return S;
                if (A === "*" && v <= B) return S;
                if (v >= A && v <= B) return S
            }
            return O == v ? S : null
        }

        function o(m) {
            return m.toString().charAt(0).toUpperCase() + m.toString().slice(1)
        }

        function s(m, v) {
            if (v.length === 0) return m;
            let b = {};
            for (let [O, S] of Object.entries(v)) b[":" + o(O ?? "")] = o(S ?? ""), b[":" + O.toUpperCase()] = S.toString().toUpperCase(), b[":" + O] = S;
            return Object.entries(b).forEach(([O, S]) => {
                m = m.replaceAll(O, S)
            }), m
        }

        function c(m) {
            return m.map(v => v.replace(/^[\{\[]([^\[\]\{\}]*)[\}\]]/, ""))
        }

        let u = e.split("|"), p = r(u, t);
        return p != null ? s(p.trim(), n) : (u = c(u), s(u.length > 1 && t > 1 ? u[1] : u[0], n))
    };
    window.pluralize = Ya;
})();
/*! Bundled license information:

sortablejs/modular/sortable.esm.js:
  (**!
   * Sortable 1.15.1
   * @author	RubaXa   <trash@rubaxa.org>
   * @author	owenm    <owen23355@gmail.com>
   * @license MIT
   *)
*/
