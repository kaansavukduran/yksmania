import { useId } from "react";
import { landRings, turkeyRings, type Ring } from "./geoRings";
import "./geo.css";

/*
 * Real-coastline world backdrop for SVG diagrams. Land outlines come from
 * Natural Earth 1:50m (public domain), simplified for school-scale maps.
 * The projection is a plain longitude/latitude grid (equirectangular): it
 * keeps the lines easy to read but does not preserve areas, and captions say
 * so. Everything is drawn inside the caller's SVG coordinate system.
 */

export type Project = (lon: number, lat: number) => readonly [number, number];

type Rings = Ring[];
function pathOf(rings: Rings, xy: Project) {
  return rings
    .map((ring) =>
      ring
        .map(([lon, lat], i) => {
          const [x, y] = xy(lon, lat);
          return `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
        })
        .join("") + "Z",
    )
    .join("");
}

export function landPath(xy: Project) {
  return pathOf(landRings(), xy);
}
export function turkeyPath(xy: Project) {
  return pathOf(turkeyRings(), xy);
}

/** A longitude/latitude window mapped onto a rectangle of the SVG. */
export function equirect(box: { x: number; y: number; w: number; h: number }, lon: [number, number], lat: [number, number]): Project {
  return (lo, la) => [box.x + ((lo - lon[0]) / (lon[1] - lon[0])) * box.w, box.y + ((lat[1] - la) / (lat[1] - lat[0])) * box.h];
}

export function WorldBase({
  box,
  xy,
  graticule = 30,
  highlightTurkey = false,
}: {
  box: { x: number; y: number; w: number; h: number };
  xy: Project;
  /** Grid spacing in degrees; 0 hides the grid. */
  graticule?: number;
  highlightTurkey?: boolean;
}) {
  const id = useId();
  const clip = `${id}-clip`;
  const lines: string[] = [];
  if (graticule > 0) {
    for (let lon = -180; lon <= 180; lon += graticule) {
      const [x1, y1] = xy(lon, 85);
      const [x2, y2] = xy(lon, -85);
      lines.push(`M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}`);
    }
    for (let lat = -90 + graticule; lat < 90; lat += graticule) {
      const [x1, y1] = xy(-180, lat);
      const [x2, y2] = xy(180, lat);
      lines.push(`M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}`);
    }
  }
  return (
    <g className="geo-world" aria-hidden="true">
      <defs>
        <clipPath id={clip}>
          <rect x={box.x} y={box.y} width={box.w} height={box.h} rx={6} />
        </clipPath>
      </defs>
      <rect className="geo-ocean" x={box.x} y={box.y} width={box.w} height={box.h} rx={6} />
      <g clipPath={`url(#${clip})`}>
        {lines.length > 0 && <path className="geo-graticule" d={lines.join("")} />}
        <path className="geo-land" d={landPath(xy)} />
        {highlightTurkey && <path className="geo-turkey" d={turkeyPath(xy)} />}
      </g>
      <rect className="geo-frame" x={box.x} y={box.y} width={box.w} height={box.h} rx={6} />
    </g>
  );
}
