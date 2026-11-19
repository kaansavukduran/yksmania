import { useId } from "react";
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

/** Spread markers that would sit on top of each other. */
function spread(points: [number, number][], min: number): [number, number][] {
  const out = points.map((p) => [...p] as [number, number]);
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

function pathOf(xy: Project) {
  return decodeRings(LAND_DETAIL_RINGS, LAND_DETAIL_SCALE)
    .map((ring) => ring.map(([lo, la], i) => {
      const [x, y] = xy(lo, la);
      return `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join("") + "Z")
    .join("");
}

export function PlaceMap({ places }: { places: Place[] }) {
  const id = useId();
  if (!places.length) return null;
  const region = regionOf(places);
  // World map (small).
  const wBox = { x: 4, y: 4, w: W - 8, h: (W - 8) / 2.3 };
  const wxy = equirect(wBox, [-180, 180], [-60, 85]);
  const [rx0, ry1] = wxy(region.lon[0], region.lat[0]);
  const [rx1, ry0] = wxy(region.lon[1], region.lat[1]);
  // Regional close-up.
  const rBox = { x: 4, y: 4, w: W - 8, h: (W - 8) / 1.6 };
  const rxy = equirect(rBox, region.lon, region.lat);
  const clip = `${id}-clip`;
  const spot = spread(
    places.map((p) => rxy(p.lon, p.lat) as unknown as [number, number]),
    38,
  );
  const step = (region.lon[1] - region.lon[0]) > 40 ? 10 : (region.lon[1] - region.lon[0]) > 15 ? 5 : 2;
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
  const anyApprox = places.some((p) => p.approx);
  const names = places.map((p) => p.label).join(", ");
  return (
    <figure className="place-map">
      <figcaption className="place-map-title">Haritada nerede?</figcaption>
      <div className="place-map-pair">
        <svg viewBox={`0 0 ${W} ${wBox.h + 8}`} role="img" aria-label={`Dünya haritasında konum: ${names}`}>
          <WorldBase box={wBox} xy={wxy} graticule={30} />
          <rect
            className="place-map-region"
            x={Math.min(rx0, rx1)}
            y={Math.min(ry0, ry1)}
            width={Math.max(6, Math.abs(rx1 - rx0))}
            height={Math.max(6, Math.abs(ry1 - ry0))}
          />
          {places.map((p) => {
            const [x, y] = wxy(p.lon, p.lat);
            return <circle key={p.id} className={`place-dot place-${KIND_TONE[p.kind]}`} cx={x} cy={y} r={3.5} />;
          })}
        </svg>
        <svg viewBox={`0 0 ${W} ${rBox.h + 8}`} role="img" aria-label={`Bölge haritası: ${names}`}>
          <g className="geo-world" aria-hidden="true">
            <defs>
              <clipPath id={clip}>
                <rect x={rBox.x} y={rBox.y} width={rBox.w} height={rBox.h} rx={8} />
              </clipPath>
            </defs>
            <rect className="geo-ocean" x={rBox.x} y={rBox.y} width={rBox.w} height={rBox.h} rx={8} />
            <g clipPath={`url(#${clip})`}>
              <path className="geo-graticule" d={grid.join("")} />
              <path className="geo-land" d={pathOf(rxy)} />
            </g>
          </g>
          {places.map((p, i) => {
            const [x, y] = rxy(p.lon, p.lat);
            const [sx, sy] = spot[i];
            return (
              <g key={p.id} className={`place-${KIND_TONE[p.kind]}`}>
                {(Math.abs(sx - x) > 1 || Math.abs(sy - y) > 1) && <line className="place-leader" x1={x} y1={y} x2={sx} y2={sy} />}
                <circle className="place-pin-dot" cx={x} cy={y} r={3} />
                <circle className="place-pin" cx={sx} cy={sy} r={17} />
                <text className="place-pin-text" x={sx} y={sy + 6}>
                  {i + 1}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <ol className="place-legend">
        {places.map((p, i) => (
          <li key={p.id} className={`place-${KIND_TONE[p.kind]}`}>
            <span className="place-legend-pin" aria-hidden="true">
              {i + 1}
            </span>
            <span>
              {p.label}
              <small> · {KIND_LABEL[p.kind]}{p.approx ? " · konum yaklaşık" : ""}</small>
            </span>
          </li>
        ))}
      </ol>
      <p className="small muted place-map-note">
        Kıyılar gerçek haritadan (Natural Earth) çizildi; düz ızgara alan oranlarını bozar.
        {anyApprox ? " Yeri tartışmalı olanlar yaklaşık işaretlendi." : ""}
      </p>
    </figure>
  );
}

export default PlaceMap;
