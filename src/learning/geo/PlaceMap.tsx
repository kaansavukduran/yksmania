import { useEffect, useId, useMemo, useRef, useState } from "react";
import { WorldBase, equirect, type Project } from "./WorldBase";
import { decodeRings } from "./decodeRings";
import { LAND_DETAIL_RINGS, LAND_DETAIL_SCALE } from "./landDetailData";
import type { Place, PlaceKind } from "./gazetteer";
import "./geo.css";
import "./placeMap.css";

/*
 * "Where did it happen?" maps for a theory page: a world map with the region
 * outlined, and a regional close-up with numbered markers. Coastlines are real
 * (Natural Earth); names stay in the legend under the maps so no label covers
 * the drawing. Choosing a pin (click, Enter or Space) opens a short summary
 * card under the maps, highlights the pin and zooms in a little; Escape or
 * "Kapat" closes it and restores the previous view. With reduced motion the
 * zoom jumps instead of gliding. Looking at the map records nothing.
 */

const KIND_TONE: Record<PlaceKind, string> = {
  savaş: "warn",
  afet: "a",
  düşünce: "c",
  antlaşma: "b",
  uygarlık: "ink",
};
const KIND_LABEL: Record<PlaceKind, string> = {
  savaş: "savaş / cephe",
  afet: "deprem / afet",
  düşünce: "düşünce / bilim",
  antlaşma: "antlaşma / kongre",
  uygarlık: "uygarlık / yerleşme",
};

const W = 640;
/** Width : height of both map panels. */
const ASPECT = 2.3;
const MAX_ZOOM = 8;

function regionOf(list: Place[]) {
  const lons = list.map((p) => p.lon);
  const lats = list.map((p) => p.lat);
  let lon0 = Math.min(...lons);
  let lon1 = Math.max(...lons);
  let lat0 = Math.min(...lats);
  let lat1 = Math.max(...lats);
  const midLat = (lat0 + lat1) / 2;
  const k = Math.cos((midLat * Math.PI) / 180);
  // Pad the box, keep a readable minimum size and a 16:10 drawing.
  const padLon = Math.max(2.5, (lon1 - lon0) * 0.25);
  const padLat = Math.max(1.6, (lat1 - lat0) * 0.25);
  lon0 -= padLon;
  lon1 += padLon;
  lat0 -= padLat;
  lat1 += padLat;
  // Same aspect as the world map, so the two panels match in size.
  const wantRatio = ASPECT;
  const ratio = ((lon1 - lon0) * k) / (lat1 - lat0);
  if (ratio < wantRatio) {
    const extra = ((lat1 - lat0) * wantRatio) / k - (lon1 - lon0);
    lon0 -= extra / 2;
    lon1 += extra / 2;
  } else {
    const extra = ((lon1 - lon0) * k) / wantRatio - (lat1 - lat0);
    lat0 -= extra / 2;
    lat1 += extra / 2;
  }
  return {
    lon: [Math.max(-180, lon0), Math.min(180, lon1)] as [number, number],
    lat: [Math.max(-85, lat0), Math.min(85, lat1)] as [number, number],
  };
}

type XY = [number, number];

/** Spread markers that would sit on top of each other. */
function spread(points: readonly (readonly [number, number])[], min: number): XY[] {
  const out: XY[] = points.map(([x, y]) => [x, y]);
  for (let pass = 0; pass < 30; pass++) {
    let moved = false;
    for (let i = 0; i < out.length; i++)
      for (let j = i + 1; j < out.length; j++) {
        const dx = out[j][0] - out[i][0];
        const dy = out[j][1] - out[i][1];
        const d = Math.hypot(dx, dy);
        if (d < min) {
          const ux = d ? dx / d : Math.cos(j);
          const uy = d ? dy / d : Math.sin(j);
          const push = (min - d) / 2 + 0.5;
          out[i][0] -= ux * push;
          out[i][1] -= uy * push;
          out[j][0] += ux * push;
          out[j][1] += uy * push;
          moved = true;
        }
      }
    if (!moved) break;
  }
  return out;
}

// Coastline rings are decoded once and reused by every map on the page.
let landRings: ReturnType<typeof decodeRings> | null = null;
function pathOf(xy: Project) {
  landRings ??= decodeRings(LAND_DETAIL_RINGS, LAND_DETAIL_SCALE);
  return landRings
    .map((ring) => ring.map(([lo, la], i) => {
      const [x, y] = xy(lo, la);
      return `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join("") + "Z")
    .join("");
}

function gridPath(region: { lon: [number, number]; lat: [number, number] }, rxy: Project) {
  const span = region.lon[1] - region.lon[0];
  const step = span > 40 ? 10 : span > 15 ? 5 : span > 6 ? 2 : 1;
  const grid: string[] = [];
  for (let lo = Math.ceil(region.lon[0] / step) * step; lo <= region.lon[1]; lo += step) {
    const [x1, y1] = rxy(lo, region.lat[1]);
    const [x2, y2] = rxy(lo, region.lat[0]);
    grid.push(`M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}`);
  }
  for (let la = Math.ceil(region.lat[0] / step) * step; la <= region.lat[1]; la += step) {
    const [x1, y1] = rxy(region.lon[0], la);
    const [x2, y2] = rxy(region.lon[1], la);
    grid.push(`M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}`);
  }
  return grid.join("");
}

const fmtCoord = (v: number, pos: string, neg: string) =>
  `${Math.abs(v).toLocaleString("tr-TR", { maximumFractionDigits: 1 })}° ${v >= 0 ? pos : neg}`;

type View = { x: number; y: number; w: number; h: number };

export function PlaceMap({ places }: { places: Place[] }) {
  const id = useId();
  const [selected, setSelected] = useState<number | null>(null);
  const focus = selected !== null && selected < places.length ? places[selected] : null;

  // Both panels share one size: W wide, W / ASPECT tall (plus a frame).
  const box = useMemo(() => ({ x: 4, y: 4, w: W - 8, h: (W - 8) / ASPECT }), []);
  const H = box.h + 8;
  const full: View = { x: 0, y: 0, w: W, h: H };

  // World map and the outlined region depend only on the place list.
  const world = useMemo(() => {
    const region = regionOf(places);
    const xy = equirect(box, [-180, 180], [-60, 85]);
    const [rx0, ry1] = xy(region.lon[0], region.lat[0]);
    const [rx1, ry0] = xy(region.lon[1], region.lat[1]);
    return { region, xy, rect: { x: Math.min(rx0, rx1), y: Math.min(ry0, ry1), w: Math.max(6, Math.abs(rx1 - rx0)), h: Math.max(6, Math.abs(ry1 - ry0)) } };
  }, [places, box]);

  // Regional map geometry is computed once; zoom only changes the viewBox.
  const close = useMemo(() => {
    const xy = equirect(box, world.region.lon, world.region.lat);
    return {
      xy,
      land: pathOf(xy),
      grid: gridPath(world.region, xy),
      spot: spread(places.map((p) => xy(p.lon, p.lat)), 38),
    };
  }, [places, world.region, box]);

  // Zoom and pan: mouse wheel (around the pointer), drag, buttons.
  const [view, setView] = useState<View>(full);
  const svgRef = useRef<SVGSVGElement>(null);
  const drag = useRef<{ px: number; py: number; view: View; id: number } | null>(null);
  const clampView = (v: View): View => {
    const w = Math.min(W, Math.max(W / MAX_ZOOM, v.w));
    const h = (w * H) / W;
    return { w, h, x: Math.min(W - w, Math.max(0, v.x)), y: Math.min(H - h, Math.max(0, v.y)) };
  };
  const zoomAt = (factor: number, fx: number, fy: number) =>
    setView((v) => {
      const w = Math.min(W, Math.max(W / MAX_ZOOM, v.w * factor));
      const k = w / v.w;
      return clampView({ x: fx - (fx - v.x) * k, y: fy - (fy - v.y) * k, w, h: v.h * k });
    });
  const toSvg = (clientX: number, clientY: number, v: View) => {
    const r = svgRef.current!.getBoundingClientRect();
    return { x: v.x + ((clientX - r.left) / r.width) * v.w, y: v.y + ((clientY - r.top) / r.height) * v.h };
  };
  const viewRef = useRef(view);
  viewRef.current = view;
  const frame = useRef(0);
  /** The view before the automatic focus zoom, restored when the card closes. */
  const beforeFocus = useRef<View | null>(null);
  /** The pin or legend entry that opened the card; focus returns there. */
  const trigger = useRef<HTMLElement | null>(null);
  useEffect(() => () => cancelAnimationFrame(frame.current), []);
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    // A non-passive listener so the page does not scroll while zooming.
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const p = toSvg(e.clientX, e.clientY, viewRef.current);
      zoomAt(Math.exp(e.deltaY * 0.0015), p.x, p.y);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!places.length) return null;
  const { xy: wxy, rect } = world;
  const { xy: rxy, spot } = close;
  const clip = `${id}-clip`;
  const anyApprox = places.some((p) => p.approx);
  const names = places.map((p) => p.label).join(", ");
  const scale = W / view.w;
  const zoomPct = Math.round(scale * 100);
  const reduced = () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  // Glide the regional viewBox to a target; jump when motion is reduced.
  const animateTo = (target: View) => {
    cancelAnimationFrame(frame.current);
    if (reduced() || typeof requestAnimationFrame === "undefined") {
      setView(target);
      return;
    }
    const from = viewRef.current;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / 280);
      const e = 1 - (1 - t) ** 3;
      setView({ x: from.x + (target.x - from.x) * e, y: from.y + (target.y - from.y) * e, w: from.w + (target.w - from.w) * e, h: from.h + (target.h - from.h) * e });
      if (t < 1) frame.current = requestAnimationFrame(step);
    };
    frame.current = requestAnimationFrame(step);
  };
  const closeFocus = () => {
    setSelected(null);
    if (beforeFocus.current) animateTo(beforeFocus.current);
    beforeFocus.current = null;
    trigger.current?.focus();
  };
  const choose = (i: number) => {
    if (selected === i) {
      closeFocus();
      return;
    }
    trigger.current = document.activeElement instanceof HTMLElement || document.activeElement instanceof SVGElement ? (document.activeElement as HTMLElement) : null;
    setSelected(i);
    // A light zoom on the chosen place, only from the overview.
    if (viewRef.current.w >= W - 0.01 || beforeFocus.current) {
      beforeFocus.current ??= viewRef.current;
      const [fx, fy] = rxy(places[i].lon, places[i].lat);
      const w = W / 1.6;
      animateTo(clampView({ x: fx - w / 2, y: fy - (w * H) / W / 2, w, h: (w * H) / W }));
    }
  };
  const zoomToFocus = () => {
    if (!focus) return;
    const [fx, fy] = rxy(focus.lon, focus.lat);
    const w = W / 3;
    setView(clampView({ x: fx - w / 2, y: fy - (w * H) / W / 2, w, h: (w * H) / W }));
  };
  return (
    <figure
      className="place-map"
      onKeyDown={(e) => {
        if (e.key === "Escape" && selected !== null) {
          e.preventDefault();
          e.stopPropagation();
          closeFocus();
        }
      }}
    >
      <figcaption className="place-map-title">Haritada nerede?</figcaption>
      <div className="place-map-pair">
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Dünya haritasında konum: ${names}`}>
          <WorldBase box={box} xy={wxy} graticule={30} />
          <rect className="place-map-region" x={rect.x} y={rect.y} width={rect.w} height={rect.h} />
          {places.map((p, i) => {
            const [x, y] = wxy(p.lon, p.lat);
            return <circle key={p.id} className={`place-dot place-${KIND_TONE[p.kind]}${selected === i ? " is-focus" : ""}`} cx={x} cy={y} r={selected === i ? 5 : 3.5} />;
          })}
        </svg>
        <svg
          ref={svgRef}
          className={`place-map-zoomable${view.w < W ? " is-zoomed" : ""}`}
          viewBox={`${view.x} ${view.y} ${view.w} ${view.h}`}
          role="group"
          aria-label={`Bölge haritası: ${names}. Fare tekerleğiyle yakınlaştır, sürükleyerek kaydır; işaretlere dokunarak ayrıntı aç.`}
          onPointerDown={(e) => {
            if ((e.target as Element).closest(".place-pin-group")) return;
            drag.current = { px: e.clientX, py: e.clientY, view, id: e.pointerId };
            beforeFocus.current = null;
            e.currentTarget.setPointerCapture(e.pointerId);
          }}
          onPointerMove={(e) => {
            const d = drag.current;
            if (!d || d.id !== e.pointerId) return;
            const r = e.currentTarget.getBoundingClientRect();
            setView(clampView({ ...d.view, x: d.view.x - ((e.clientX - d.px) / r.width) * d.view.w, y: d.view.y - ((e.clientY - d.py) / r.height) * d.view.h }));
          }}
          onPointerUp={() => (drag.current = null)}
          onPointerCancel={() => (drag.current = null)}
        >
          <g className="geo-world" aria-hidden="true">
            <defs>
              <clipPath id={clip}>
                <rect x={box.x} y={box.y} width={box.w} height={box.h} rx={8} />
              </clipPath>
            </defs>
            <rect className="geo-ocean" x={box.x} y={box.y} width={box.w} height={box.h} rx={8} />
            <g clipPath={`url(#${clip})`}>
              <path className="geo-graticule" d={close.grid} style={{ strokeWidth: 1 / scale }} />
              <path className="geo-land" d={close.land} style={{ strokeWidth: 1 / scale }} />
            </g>
          </g>
          <g clipPath={`url(#${clip})`}>
            {places.map((p, i) => {
              const [x, y] = rxy(p.lon, p.lat);
              // Zoomed in, pins sit on their true spot; markers keep screen size.
              const [sx, sy] = scale > 1.5 ? [x, y] : spot[i];
              const on = selected === i;
              const r = (on ? 21 : 17) / scale;
              return (
                <g
                  key={p.id}
                  className={`place-${KIND_TONE[p.kind]} place-pin-group${on ? " is-focus" : ""}${selected !== null && !on ? " is-dim" : ""}`}
                  role="button"
                  tabIndex={0}
                  aria-pressed={on}
                  aria-label={`${i + 1}. ${p.label}`}
                  onClick={() => choose(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      choose(i);
                    }
                  }}
                >
                  {(Math.abs(sx - x) > 1 || Math.abs(sy - y) > 1) && <line className="place-leader" x1={x} y1={y} x2={sx} y2={sy} style={{ strokeWidth: 1.5 / scale }} />}
                  <circle className="place-pin-dot" cx={x} cy={y} r={3 / scale} />
                  <circle className="place-pin" cx={sx} cy={sy} r={r} style={{ strokeWidth: 2.5 / scale }} />
                  <text className="place-pin-text" x={sx} y={sy + 6 / scale} style={{ fontSize: 18 / scale }}>
                    {i + 1}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>
      <div className="place-map-tools" role="toolbar" aria-label="Bölge haritası yakınlaştırma">
        <button type="button" className="secondary" aria-label="Yakınlaştır" disabled={view.w <= W / MAX_ZOOM + 0.01} onClick={() => zoomAt(1 / 1.5, view.x + view.w / 2, view.y + view.h / 2)}>
          +
        </button>
        <button type="button" className="secondary" aria-label="Uzaklaştır" disabled={view.w >= W - 0.01} onClick={() => zoomAt(1.5, view.x + view.w / 2, view.y + view.h / 2)}>
          −
        </button>
        <span className="place-zoom-level" aria-live="polite">%{zoomPct}</span>
        <button type="button" className="secondary" disabled={!focus} onClick={zoomToFocus}>
          Seçili yere yakınlaştır
        </button>
        <button type="button" className="secondary" disabled={selected === null && view.w >= W - 0.01} onClick={() => { setSelected(null); beforeFocus.current = null; animateTo(full); }}>
          Sıfırla
        </button>
      </div>
      {focus && (
        <div className={`place-focus-card place-${KIND_TONE[focus.kind]}`} role="status" aria-live="polite">
          <div className="place-focus-head">
            <strong>
              {(selected ?? 0) + 1}. {focus.label}
            </strong>
            <button type="button" className="secondary place-focus-close" onClick={closeFocus} aria-label={`${focus.label} özetini kapat`}>
              Kapat
            </button>
          </div>
          <span>
            {KIND_LABEL[focus.kind]} · {fmtCoord(focus.lat, "K", "G")}, {fmtCoord(focus.lon, "D", "B")}
            {focus.approx ? " · konum yaklaşık" : ""}
          </span>
          {focus.names.length > 1 && <span className="muted">Metinde: {focus.names.join(", ")}</span>}
        </div>
      )}
      <ol className="place-legend">
        {places.map((p, i) => (
          <li key={p.id} className={`place-${KIND_TONE[p.kind]}${selected === i ? " is-focus" : ""}`}>
            <button type="button" className="place-legend-button" aria-pressed={selected === i} onClick={() => choose(i)}>
              <span className="place-legend-pin" aria-hidden="true">
                {i + 1}
              </span>
              <span>
                {p.label}
                <small> · {KIND_LABEL[p.kind]}{p.approx ? " · konum yaklaşık" : ""}</small>
              </span>
            </button>
          </li>
        ))}
      </ol>
      <p className="small muted place-map-note">
        Kıyılar gerçek haritadan (Natural Earth) çizildi; düz ızgara alan oranlarını bozar. Sağdaki haritada fare tekerleğiyle yakınlaştır, sürükleyerek kaydır; bir işarete ya da listedeki ada dokununca o yer vurgulanır.
        {anyApprox ? " Yeri tartışmalı olanlar yaklaşık işaretlendi." : ""}
      </p>
    </figure>
  );
}

export default PlaceMap;
