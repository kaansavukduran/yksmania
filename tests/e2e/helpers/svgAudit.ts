// @ts-nocheck
/*
 * Screen-space layout audit for every visible SVG that carries text (section
 * figures and labs). Runs inside the page through page.evaluate, so it is
 * plain, self-contained DOM code (kept untyped on purpose: it is serialised).
 *
 * Clearance standard, in screen pixels at the current viewport width:
 *  - "yazı-yazı": two labels keep at least `gap` px between their ink boxes
 *    (a plated or pill label uses its plate/pill as its box);
 *  - "yazı-çizgi": no visible stroke (line, curve, arrow, outline) touches the
 *    glyph core of a label that has no plate or pill. The core is the text box
 *    narrowed by `insetX` of its width on each side and `insetY` of its height
 *    at top and bottom. The text box is the font box (1.2 em in Inter): the
 *    top ~17 % is empty space above the capitals and the bottom ~20 % holds
 *    only descenders, so a 15 % vertical inset still covers every capital and
 *    x-height glyph. A text halo does not exempt a label: the dashes still
 *    show between the glyphs;
 *  - "kenar": a label's ink box stays at least `edge` px inside its SVG;
 *  - "işaret": no label (plated or not) covers a small marker dot (a plain
 *    circle up to 14 px; shaded spheres such as atoms and ions are objects,
 *    not markers, and a label inside its own badge is allowed).
 * The placer in src/learning/sectionFigures/labelPlacement.ts aims at twice
 * these gaps, so a figure passes with room to spare on other Chromium builds.
 * A stroke hidden under an opaque filled shape painted after it and behind the
 * label (a label on its own box) is ignored.
 *
 * With `explore`, interactive hosts (a section figure or lab section that
 * owns form controls) are walked through: every option of every select, each
 * radio, every range at min/middle/max (also for each select option), every
 * button once and step buttons until they stop. Each state is audited.
 */
export const svgLayoutAudit = async (opt) => {
  const O = Object.assign(
    { scope: "main", explore: false, gap: 2, insetX: 0.04, insetY: 0.15, edge: 4, maxStates: 90, points: 5, figuresOnly: false, labsOnly: false },
    opt || {},
  );
  const visUp = (el, stop) => {
    for (let e = el; e && e !== stop; e = e.parentElement) {
      const cs = getComputedStyle(e);
      if (cs.display === "none" || cs.visibility === "hidden" || +cs.opacity === 0) return false;
    }
    return true;
  };
  const rootsOf = () =>
    [...document.querySelectorAll(`${O.scope} svg`)].filter(
      (s) =>
        !s.parentElement.closest("svg") &&
        (!O.figuresOnly || s.closest("figure.section-figure")) &&
        (!O.labsOnly || !s.closest("figure.section-figure")) &&
        s.querySelector("text") &&
        s.getBoundingClientRect().width > 100 &&
        visUp(s, document.body),
    );
  const nameOf = (svg) => {
    const fig = svg.closest("figure.section-figure");
    if (fig) return fig.getAttribute("data-section-figure") || "figür";
    for (let e = svg.parentElement; e && e.tagName !== "MAIN"; e = e.parentElement) {
      const data = [...e.attributes].find((a) => a.name.startsWith("data-") && a.value && a.value.length < 60);
      if (data) return `${data.name.slice(5)}=${data.value}`;
      if (typeof e.className === "string" && /lab|explorer|model/i.test(e.className)) return e.className.split(" ")[0];
    }
    return (svg.parentElement.className || "svg").toString().slice(0, 40);
  };
  const audit = (within) => {
    const all = [];
    for (const svg of rootsOf().filter((s) => !within || within.contains(s))) {
      const name = nameOf(svg);
      const fig = !!svg.closest("figure.section-figure");
      const out = { push: (i) => all.push(Object.assign(i, { fig })) };
      const box = svg.getBoundingClientRect();
      const ctmCache = new Map();
      const tp = (el, x, y) => {
        let m = ctmCache.get(el);
        if (m === undefined) {
          m = el.getScreenCTM();
          ctmCache.set(el, m);
        }
        if (!m) return [x, y];
        return [m.a * x + m.c * y + m.e, m.b * x + m.d * y + m.f];
      };
      const segsOf = (el) => {
        const tag = el.tagName.toLowerCase();
        const pts = [];
        if (tag === "line") {
          const g = (n) => el[n].baseVal.value;
          return [[tp(el, g("x1"), g("y1")), tp(el, g("x2"), g("y2"))]];
        }
        if (tag === "polyline" || tag === "polygon") {
          const q = [...el.points].map((p) => tp(el, p.x, p.y));
          if (tag === "polygon" && q.length > 2) q.push(q[0]);
          for (let i = 0; i + 1 < q.length; i++) pts.push([q[i], q[i + 1]]);
          return pts;
        }
        if (typeof el.getTotalLength === "function") {
          let L = 0;
          try {
            L = el.getTotalLength();
          } catch {
            return pts;
          }
          if (!L) return pts;
          const n = Math.min(120, Math.max(4, Math.ceil(L / 6)));
          let prev = el.getPointAtLength(0);
          for (let i = 1; i <= n; i++) {
            const c = el.getPointAtLength((L * i) / n);
            pts.push([tp(el, prev.x, prev.y), tp(el, c.x, c.y)]);
            prev = c;
          }
        }
        return pts;
      };
      const hitSeg = (a, b2, r) => {
        let t0 = 0;
        let t1 = 1;
        const dx = b2[0] - a[0];
        const dy = b2[1] - a[1];
        const P = [-dx, dx, -dy, dy];
        const Q = [a[0] - r.x0, r.x1 - a[0], a[1] - r.y0, r.y1 - a[1]];
        for (let i = 0; i < 4; i++) {
          if (P[i] === 0) {
            if (Q[i] < 0) return false;
          } else {
            const t = Q[i] / P[i];
            if (P[i] < 0) {
              if (t > t1) return false;
              if (t > t0) t0 = t;
            } else {
              if (t < t0) return false;
              if (t < t1) t1 = t;
            }
          }
        }
        return true;
      };
      const texts = [...svg.querySelectorAll("text")]
        .filter((t) => t.textContent.trim() && !t.classList.contains("sf-ball-label") && visUp(t, svg))
        .map((t) => {
          const r = t.getBoundingClientRect();
          const m = t.getScreenCTM();
          // Text turned about 90° (vertical axis titles): swap the insets.
          const turned = m && Math.abs(m.b) > Math.abs(m.a);
          const w = r.right - r.left;
          const h = r.bottom - r.top;
          const ix = (turned ? O.insetY : O.insetX) * w;
          const iy = (turned ? O.insetX : O.insetY) * h;
          const inkX = turned ? O.insetY * w : 0;
          const inkY = turned ? 0 : O.insetY * h;
          const group = t.closest(".sf-plate-group, .sf-pick-group, [data-label-plate]");
          const plateEl = group ? group.querySelector("rect") : null;
          const pr = plateEl ? plateEl.getBoundingClientRect() : null;
          const ink = { x0: r.left + inkX, x1: r.right - inkX, y0: r.top + inkY, y1: r.bottom - inkY };
          return {
            t,
            s: t.textContent.trim().replace(/\s+/g, " ").slice(0, 60),
            plated: !!group,
            ink,
            outer: pr ? { x0: pr.left, x1: pr.right, y0: pr.top, y1: pr.bottom } : ink,
            core: { x0: r.left + ix, x1: r.right - ix, y0: r.top + iy, y1: r.bottom - iy },
          };
        })
        .filter((o) => o.ink.x1 - o.ink.x0 > 1);
      const px = (n) => Math.round(n * 10) / 10;
      for (let i = 0; i < texts.length; i++) {
        const a = texts[i];
        const e = Math.min(a.ink.x0 - box.left, a.ink.y0 - box.top, box.right - a.ink.x1, box.bottom - a.ink.y1);
        if (e < O.edge) out.push({ name, kind: "kenar", s: a.s, px: px(e) });
        for (let j = i + 1; j < texts.length; j++) {
          const c = texts[j];
          // Plates/pills are opaque: use them as the box; plain labels use ink.
          const ra = a.outer;
          const rc = c.outer;
          const gx = Math.max(rc.x0 - ra.x1, ra.x0 - rc.x1);
          const gy = Math.max(rc.y0 - ra.y1, ra.y0 - rc.y1);
          const g = Math.max(gx, gy);
          if (g < O.gap) {
            // Two plates may touch each other; the text inside each must not.
            if (a.plated && c.plated) {
              const hx = Math.max(c.ink.x0 - a.ink.x1, a.ink.x0 - c.ink.x1);
              const hy = Math.max(c.ink.y0 - a.ink.y1, a.ink.y0 - c.ink.y1);
              if (Math.max(hx, hy) >= O.gap && g >= -0.5) continue;
            }
            out.push({ name, kind: "yazı-yazı", s: `${a.s} × ${c.s}`, px: px(g) });
          }
        }
      }
      const shapes = [...svg.querySelectorAll("line,polyline,polygon,path,circle,ellipse,rect")].filter(
        (el) =>
          !el.closest("defs, marker, clipPath, mask, pattern, symbol, .sf-plate-group, .sf-pick-group, [data-label-plate]") &&
          visUp(el, svg),
      );
      const segOwners = [];
      const fills = [];
      const dots = [];
      for (const el of shapes) {
        const cs = getComputedStyle(el);
        const opaque = +cs.opacity >= 0.85;
        const hasFill = cs.fill !== "none" && !cs.fill.startsWith("rgba(0, 0, 0, 0)") && +cs.fillOpacity > 0.05;
        if (cs.stroke !== "none" && parseFloat(cs.strokeWidth) > 0 && +cs.strokeOpacity > 0.05 && +cs.opacity > 0.05)
          for (const sg of segsOf(el)) segOwners.push([sg, el]);
        if (hasFill && +cs.fillOpacity >= 0.85 && opaque) fills.push(el);
        const tag = el.tagName.toLowerCase();
        // Marker dots only: shaded spheres (atoms, ions) are drawn objects, not markers.
        const sphere = (el.getAttribute("fill") || "").startsWith("url(") || el.matches(".sf-ball, .sf-ball-shadow");
        if ((tag === "circle" || tag === "ellipse") && !sphere && (hasFill || cs.stroke !== "none")) {
          const r = el.getBoundingClientRect();
          if (r.width >= 2 && r.width <= 14 && r.height <= 14) dots.push(r);
        }
      }
      for (const tx of texts) {
        // (d) a marker dot under any label (a plate would hide the dot).
        const k = tx.core;
        for (const d of dots) {
          const cx = (tx.ink.x0 + tx.ink.x1) / 2;
          const cy = (tx.ink.y0 + tx.ink.y1) / 2;
          if (cx >= d.left && cx <= d.right && cy >= d.top && cy <= d.bottom) continue; // label inside a badge
          if (d.right > k.x0 && d.left < k.x1 && d.bottom > k.y0 && d.top < k.y1) {
            out.push({ name, kind: "işaret", s: tx.s, px: 0 });
            break;
          }
        }
        if (tx.plated) continue;
        const backs = fills.filter((f) => {
          if (f.contains(tx.t)) return false;
          const r = f.getBoundingClientRect();
          return (
            r.left <= k.x0 &&
            r.right >= k.x1 &&
            r.top <= k.y0 &&
            r.bottom >= k.y1 &&
            f.compareDocumentPosition(tx.t) & Node.DOCUMENT_POSITION_FOLLOWING
          );
        });
        const back = backs[backs.length - 1];
        const live = back
          ? segOwners.filter(([, el]) => el === back || back.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING)
          : segOwners;
        if (live.some(([[a2, b2]]) => hitSeg(a2, b2, k))) out.push({ name, kind: "yazı-çizgi", s: tx.s, px: 0 });
      }
    }
    return all;
  };

  const issues = [];
  const seen = new Set();
  let states = 0;
  const record = (state, within) => {
    states++;
    for (const i of audit(within)) {
      const key = `${i.name}|${i.kind}|${i.s}`;
      if (seen.has(key)) continue;
      seen.add(key);
      issues.push(Object.assign(i, { state, area: i.fig ? "figür" : "lab" }));
      delete i.fig;
    }
  };
  record("varsayılan");
  if (!O.explore) return { issues, states };

  const frame = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => r(undefined))));
  const hostOf = (svg) => {
    const fig = svg.closest("figure.section-figure");
    if (fig) return fig;
    for (let e = svg.parentElement; e; e = e.parentElement) {
      if (e.matches("main, body, article, .guide-section, .guide-page, [data-guide-section]")) return null;
      if (e.querySelector('input[type="range"], select, input[type="radio"], button')) return e;
    }
    return null;
  };
  const SKIP = /^(Oynat|Durdur|Başlat|Duraklat|Devam et|Sonraki sayfa|Önceki sayfa)\b/;
  const STEP = /^(İleri|Sonraki adım|Sonraki|Adım)\b/;
  const fire = (el, v) => {
    if (!el) return; // the control left the page after an earlier change
    const proto = el.tagName === "SELECT" ? HTMLSelectElement.prototype : HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(proto, "value").set.call(el, String(v));
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  };
  // Hosts come from every visible drawing, also one that shows its labels
  // only after a toggle ("Adları göster").
  const drawings = [...document.querySelectorAll(`${O.scope} svg`)].filter(
    (s) =>
      !s.parentElement.closest("svg") &&
      (!O.figuresOnly || s.closest("figure.section-figure")) &&
      (!O.labsOnly || !s.closest("figure.section-figure")) &&
      s.getBoundingClientRect().width > 100 &&
      visUp(s, document.body),
  );
  const hosts = [...new Set(drawings.map(hostOf).filter(Boolean))];
  const hash = location.hash;
  for (const host of hosts) {
    let budget = O.maxStates;
    const alive = () => document.contains(host) && location.hash === hash && budget > 0;
    const tag = (host.getAttribute("data-section-figure") || nameOf(host.querySelector("svg") || host)).slice(0, 40);
    const ranges = () => [...host.querySelectorAll('input[type="range"]')].filter((r) => !r.disabled);
    /** min, quarter, middle, three quarters and max, snapped to the step. */
    const valuesOf = (r) => {
      const lo = +r.min || 0;
      const hi = r.max === "" ? 100 : +r.max;
      const st = r.step === "any" || !+r.step ? (hi - lo) / 20 : +r.step;
      const at = (f) => Math.round((lo + Math.round(((hi - lo) * f) / st) * st) * 1e6) / 1e6;
      return [...new Set(O.points === 3 ? [lo, at(0.5), hi] : [lo, at(0.25), at(0.5), at(0.75), hi])];
    };
    const sweep = async (prefix) => {
      const list = ranges();
      if (list.length === 2) {
        // Two coupled sliders (focal length and object distance): every pair.
        const o0 = list[0].value;
        const o1 = list[1].value;
        for (const a of valuesOf(list[0]))
          for (const b of valuesOf(list[1])) {
            if (!alive()) break;
            fire(ranges()[0], a);
            fire(ranges()[1], b);
            await frame();
            budget--;
            record(`${tag} · ${prefix}kaydırıcı 1=${a}, 2=${b}`, host);
          }
        if (ranges()[1]) {
          fire(ranges()[0], o0);
          fire(ranges()[1], o1);
        }
        await frame();
        return;
      }
      for (let i = 0; i < list.length && alive(); i++) {
        const r = ranges()[i];
        if (!r) break;
        const orig = r.value;
        for (const val of valuesOf(r)) {
          if (!alive()) break;
          fire(ranges()[i], val);
          await frame();
          budget--;
          record(`${tag} · ${prefix}kaydırıcı ${i + 1}=${val}`, host);
        }
        if (ranges()[i]) fire(ranges()[i], orig);
        await frame();
      }
    };
    const selects = [...host.querySelectorAll("select")].filter((s) => !s.disabled);
    for (let si = 0; si < selects.length && alive(); si++) {
      const sel = host.querySelectorAll("select")[si];
      if (!sel) break;
      const orig = sel.value;
      for (const o of [...sel.options].filter((x) => x.value !== "" && !x.disabled)) {
        if (!alive()) break;
        fire(host.querySelectorAll("select")[si], o.value);
        await frame();
        budget--;
        record(`${tag} · seçim ${o.textContent.trim().slice(0, 20)}`, host);
        await sweep(`${o.textContent.trim().slice(0, 20)} · `);
      }
      if (host.querySelectorAll("select")[si]) fire(host.querySelectorAll("select")[si], orig);
      await frame();
    }
    if (!selects.length) await sweep("");
    const radios = [...host.querySelectorAll('input[type="radio"]')];
    for (let i = 0; i < radios.length && alive(); i++) {
      const r = host.querySelectorAll('input[type="radio"]')[i];
      if (!r || r.disabled) continue;
      r.click();
      await frame();
      budget--;
      record(`${tag} · seçenek ${(r.closest("label")?.textContent || r.value).trim().slice(0, 20)}`, host);
    }
    const buttons = () => [...host.querySelectorAll("button")];
    const count = buttons().length;
    for (let i = 0; i < count && alive(); i++) {
      const b = buttons()[i];
      if (!b || b.disabled || !visUp(b, host)) continue;
      const label = (b.getAttribute("aria-label") || b.textContent || "").trim();
      if (SKIP.test(label)) continue;
      let n = 0;
      do {
        const cur = buttons()[i];
        if (!cur || cur.disabled) break;
        cur.click();
        await frame();
        budget--;
        record(`${tag} · düğme ${label.slice(0, 24)}${n ? ` ×${n + 1}` : ""}`, host);
        n++;
      } while (STEP.test(label) && n < 14 && alive());
    }
  }
  return { issues, states };
};

/** Default-state audit of every drawing on the page (no exploration). */
export const auditSvgLabels = async () => (await svgLayoutAudit({})).issues;

/**
 * Open a guide page and wait until its drawings settle: fonts loaded and the
 * number of SVG labels unchanged between reads (figures load lazily).
 */
export async function openGuideDrawings(page, guide) {
  await page.goto(`/#/lesson?id=${guide}`);
  await page.locator("main h1, main h2").first().waitFor();
  await page.evaluate(() => document.fonts.ready.then(() => undefined));
  // Measure only with the real face: a fallback font shifts every label.
  await page.waitForFunction(() => document.fonts.check('16px "Inter Variable"') && document.fonts.check('700 16px "Inter Variable"'), undefined, { timeout: 15_000 });
  let last = -1;
  for (let k = 0; k < 24; k++) {
    await page.waitForTimeout(200);
    const n = await page.evaluate(() => document.querySelectorAll("main svg text").length);
    if (n === last && k >= 2) return;
    last = n;
  }
}

/** One issue as a readable line: rehber · şekil · tür · etiket · px · durum. */
export const issueLine = (guide, i) => `${guide} · ${i.name} · ${i.kind} · ${i.s} · ${i.px}px · ${i.state}`;
