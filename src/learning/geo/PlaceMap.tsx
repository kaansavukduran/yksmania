import { useId, useMemo, useState } from "react";
import { WorldBase, equirect, type Project } from "./WorldBase";
import { decodeRings } from "./decodeRings";
import { LAND_DETAIL_RINGS, LAND_DETAIL_SCALE } from "./landDetailData";
import type { Place, PlaceKind } from "./gazetteer";
import "./geo.css";

/*
 * "Where did it happen?" maps for a theory page: a world map with the region
 * outlined, and a regional close-up with numbered markers. Coastlines are real
 * (Natural Earth); names stay in the legend under the maps so no label covers
 * the drawing. Looking at the map records nothing.
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
  const wantRatio = 1.6;
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

export function PlaceMap({ places }: { places: Place[] }) {
  const id = useId();
  const [selected, setSelected] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const focus = selected !== null && selected < places.length ? places[selected] : null;
  const zoomPlace = zoomed && focus ? focus : null;

  // World map (small) and the outlined region: depend only on the place list.
  const world = useMemo(() => {
    const region = regionOf(places);
    const box = { x: 4, y: 4, w: W - 8, h: (W - 8) / 2.3 };
    const xy = equirect(box, [-180, 180], [-60, 85]);
    const [rx0, ry1] = xy(region.lon[0], region.lat[0]);
    const [rx1, ry0] = xy(region.lon[1], region.lat[1]);
    return { region, box, xy, rect: { x: Math.min(rx0, rx1), y: Math.min(ry0, ry1), w: Math.max(6, Math.abs(rx1 - rx0)), h: Math.max(6, Math.abs(ry1 - ry0)) } };
  }, [places]);

  // Regional close-up: the whole set, or one place when zoomed in.
  const close = useMemo(() => {
    // Zoom keeps context: a window about a third of the full region (at least
    // 12° of longitude) centred on the chosen place, not a featureless dot.
    const region = zoomPlace
      ? (() => {
          const half = Math.max(6, (world.region.lon[1] - world.region.lon[0]) / 6);
          const corner = (dl: number, dt: number) => ({ ...zoomPlace, lon: zoomPlace.lon + dl, lat: zoomPlace.lat + dt });
          return regionOf([corner(-half, -half / 2), corner(half, half / 2)]);
        })()
      : world.region;
    const box = { x: 4, y: 4, w: W - 8, h: (W - 8) / 1.6 };
    const xy = equirect(box, region.lon, region.lat);
    return {
      box,
      xy,
      land: pathOf(xy),
      grid: gridPath(region, xy),
      spot: spread(places.map((p) => xy(p.lon, p.lat)), 38),
    };
  }, [places, world.region, zoomPlace]);

  if (!places.length) return null;
  const { box: wBox, xy: wxy, rect } = world;
  const { box: rBox, xy: rxy, spot } = close;
  const clip = `${id}-clip`;
  const anyApprox = places.some((p) => p.approx);
  const names = places.map((p) => p.label).join(", ");
  const choose = (i: number) => setSelected((cur) => (cur === i ? null : i));
  return (
    <figure className="place-map">
      <figcaption className="place-map-title">Haritada nerede?</figcaption>
      <div className="place-map-pair">
        <svg viewBox={`0 0 ${W} ${wBox.h + 8}`} role="img" aria-label={`Dünya haritasında konum: ${names}`}>
          <WorldBase box={wBox} xy={wxy} graticule={30} />
          <rect className="place-map-region" x={rect.x} y={rect.y} width={rect.w} height={rect.h} />
          {places.map((p, i) => {
            const [x, y] = wxy(p.lon, p.lat);
            return <circle key={p.id} className={`place-dot place-${KIND_TONE[p.kind]}${selected === i ? " is-focus" : ""}`} cx={x} cy={y} r={selected === i ? 5 : 3.5} />;
          })}
        </svg>
        <svg viewBox={`0 0 ${W} ${rBox.h + 8}`} role="group" aria-label={`Bölge haritası: ${names}. İşaretlere dokunarak ayrıntı aç.`}>
          <g className="geo-world" aria-hidden="true">
            <defs>
              <clipPath id={clip}>
                <rect x={rBox.x} y={rBox.y} width={rBox.w} height={rBox.h} rx={8} />
              </clipPath>
            </defs>
            <rect className="geo-ocean" x={rBox.x} y={rBox.y} width={rBox.w} height={rBox.h} rx={8} />
            <g clipPath={`url(#${clip})`}>
              <path className="geo-graticule" d={close.grid} />
              <path className="geo-land" d={close.land} />
            </g>
          </g>
          <g clipPath={`url(#${clip})`}>
            {places.map((p, i) => {
              const [x, y] = rxy(p.lon, p.lat);
              const [sx, sy] = spot[i];
              const on = selected === i;
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
                  {(Math.abs(sx - x) > 1 || Math.abs(sy - y) > 1) && <line className="place-leader" x1={x} y1={y} x2={sx} y2={sy} />}
                  <circle className="place-pin-dot" cx={x} cy={y} r={3} />
                  <circle className="place-pin" cx={sx} cy={sy} r={on ? 21 : 17} />
                  <text className="place-pin-text" x={sx} y={sy + 6}>
                    {i + 1}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>
      <div className="place-map-tools">
        <button type="button" className="secondary" disabled={!focus} aria-pressed={zoomed && !!focus} onClick={() => setZoomed((z) => !z)}>
          {zoomed && focus ? "Tüm bölgeye dön" : "Seçili yere yakınlaştır"}
        </button>
        <button type="button" className="secondary" disabled={selected === null && !zoomed} onClick={() => { setSelected(null); setZoomed(false); }}>
          Sıfırla
        </button>
      </div>
      {focus && (
        <div className={`place-focus-card place-${KIND_TONE[focus.kind]}`} role="status" aria-live="polite">
          <strong>
            {(selected ?? 0) + 1}. {focus.label}
          </strong>
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
        Kıyılar gerçek haritadan (Natural Earth) çizildi; düz ızgara alan oranlarını bozar. Bir işarete ya da listedeki ada dokununca o yer vurgulanır.
        {anyApprox ? " Yeri tartışmalı olanlar yaklaşık işaretlendi." : ""}
      </p>
    </figure>
  );
}

export default PlaceMap;
