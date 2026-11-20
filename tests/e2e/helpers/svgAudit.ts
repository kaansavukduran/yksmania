// @ts-nocheck
/*
 * Runs inside the browser page (page.evaluate). Screen-space layout audit of
 * every visible SVG that carries text: label–label overlap, a label leaving
 * its SVG, and a stroke crossing a label through its glyph core. A label on a
 * halo (paint-order: stroke), plate or pill is exempt from the stroke rule,
 * and a stroke hidden under an opaque filled shape drawn after it is ignored.
 * Kept untyped on purpose: it is plain DOM code serialised into the page.
 */
export const auditSvgLabels = () => {
      const out = [];
      const tp = (el, x, y) => { const m = el.getScreenCTM(); if (!m) return [x, y]; return [m.a * x + m.c * y + m.e, m.b * x + m.d * y + m.f]; };
      const segsOf = (el) => {
        const tag = el.tagName.toLowerCase(); const pts = [];
        if (tag === 'line') { const g = (n) => +el.getAttribute(n); return [[tp(el, g('x1'), g('y1')), tp(el, g('x2'), g('y2'))]]; }
        if (tag === 'polyline' || tag === 'polygon') {
          const raw = (el.getAttribute('points') || '').trim().split(/[\s,]+/).map(Number); const q = [];
          for (let i = 0; i + 1 < raw.length; i += 2) q.push(tp(el, raw[i], raw[i + 1]));
          if (tag === 'polygon' && q.length > 2) q.push(q[0]);
          for (let i = 0; i + 1 < q.length; i++) pts.push([q[i], q[i + 1]]); return pts;
        }
        if ((tag === 'path' || tag === 'circle' || tag === 'ellipse' || tag === 'rect') && typeof el.getTotalLength === 'function') {
          let L = 0; try { L = el.getTotalLength(); } catch { return pts; } if (!L) return pts;
          const n = Math.min(80, Math.max(4, Math.ceil(L / 8)));
          let prev = el.getPointAtLength(0);
          for (let i = 1; i <= n; i++) { const c = el.getPointAtLength((L * i) / n); pts.push([tp(el, prev.x, prev.y), tp(el, c.x, c.y)]); prev = c; }
        }
        return pts;
      };
      const hitSeg = (a, b2, r) => { let t0 = 0, t1 = 1; const dx = b2[0] - a[0], dy = b2[1] - a[1]; const P = [-dx, dx, -dy, dy], Q = [a[0] - r.x0, r.x1 - a[0], a[1] - r.y0, r.y1 - a[1]];
        for (let i = 0; i < 4; i++) { if (P[i] === 0) { if (Q[i] < 0) return false; } else { const t = Q[i] / P[i]; if (P[i] < 0) { if (t > t1) return false; if (t > t0) t0 = t; } else { if (t < t0) return false; if (t < t1) t1 = t; } } } return true; };
      const vis = (el) => { for (let e = el; e && e !== document.body; e = e.parentElement) { const cs = getComputedStyle(e); if (cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity === 0) return false; } return true; };
      const roots = [...document.querySelectorAll('main svg')].filter((s) => !s.parentElement.closest('svg') && s.querySelector('text') && s.getBoundingClientRect().width > 100 && vis(s));
      for (const svg of roots) {
        const name = (svg.closest('figure.section-figure')?.getAttribute('data-section-figure')) || (svg.closest('section[class], div[class]')?.className || 'svg').toString().slice(0, 40);
        const box = svg.getBoundingClientRect();
        const texts = [...svg.querySelectorAll('text')].filter((t) => t.textContent.trim() && !t.classList.contains('sf-ball-label') && vis(t)).map((t) => { const r = t.getBoundingClientRect(); return { t, s: t.textContent.trim(), r: { x0: r.left, y0: r.top, x1: r.right, y1: r.bottom } }; }).filter((o) => o.r.x1 - o.r.x0 > 1);
        for (let i = 0; i < texts.length; i++) {
          const a = texts[i].r;
          if (a.x0 < box.left - 1 || a.y0 < box.top - 1 || a.x1 > box.right + 1 || a.y1 > box.bottom + 1) out.push({ name, kind: 'dışarı', s: texts[i].s });
          for (let j = i + 1; j < texts.length; j++) { const c = texts[j].r; const ox = Math.min(a.x1, c.x1) - Math.max(a.x0, c.x0), oy = Math.min(a.y1, c.y1) - Math.max(a.y0, c.y0); if (ox > 2 && oy > 4) out.push({ name, kind: 'yazı-yazı', s: `${texts[i].s} × ${texts[j].s}` }); }
        }
        const shapes = [...svg.querySelectorAll('line,polyline,polygon,path,circle,ellipse,rect')].filter((el) => !el.closest('defs, marker, clipPath, mask, pattern') && !el.classList.contains('sf-pick-pill') && !el.classList.contains('sf-label-plate') && vis(el));
        const segOwners = shapes.flatMap((el) => { const cs = getComputedStyle(el); if (cs.stroke === 'none' || parseFloat(cs.strokeWidth) === 0 || +cs.strokeOpacity === 0) return []; return segsOf(el).map((sg) => [sg, el]); });
        // Opaque filled shapes can hide strokes drawn before them.
        const fills = shapes.filter((el) => { const cs = getComputedStyle(el); return cs.fill !== 'none' && !cs.fill.startsWith('rgba(0, 0, 0, 0)') && +cs.fillOpacity >= 0.85 && +cs.opacity >= 0.85; });
        for (const tx of texts) {
          if (tx.t.closest('.sf-plate-group, .sf-pick-group')) continue;
          const cs = getComputedStyle(tx.t); if (cs.paintOrder.startsWith('stroke') && parseFloat(cs.strokeWidth) >= 3 && cs.stroke !== 'none') continue;
          const w = tx.r.x1 - tx.r.x0, h = tx.r.y1 - tx.r.y0;
          const core = { x0: tx.r.x0 + w * 0.12, x1: tx.r.x1 - w * 0.12, y0: tx.r.y0 + h * 0.3, y1: tx.r.y1 - h * 0.3 };
          const cx = (tx.r.x0 + tx.r.x1) / 2, cy = (tx.r.y0 + tx.r.y1) / 2;
          const backs = fills.filter((f) => { const r = f.getBoundingClientRect(); return r.left <= tx.r.x0 + w * 0.12 && r.right >= tx.r.x1 - w * 0.12 && r.top <= cy - h * 0.2 && r.bottom >= cy + h * 0.2 && (f.compareDocumentPosition(tx.t) & Node.DOCUMENT_POSITION_FOLLOWING); });
          const back = backs[backs.length - 1];
          const live = segOwners.filter(([, el]) => !back || el === back || (back.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING));
          if (live.some(([[a2, b2]]) => hitSeg(a2, b2, core))) out.push({ name, kind: 'yazı-çizgi', s: tx.s });
        }
      }
      return out;
    };
