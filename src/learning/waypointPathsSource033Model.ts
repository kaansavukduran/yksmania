export interface PathPoint033 {
  x: number;
  y: number;
}

export interface PathNode033 extends PathPoint033 {
  total: number;
  via: number;
  avoiding: number;
}

export function waypointPaths033(
  { x: width, y: height }: PathPoint033,
  { x: waypointX, y: waypointY }: PathPoint033,
) {
  if (
    ![width, height, waypointX, waypointY].every(Number.isInteger) ||
    width < 0 || height < 0 || width > 8 || height > 8 ||
    waypointX < 0 || waypointX > width || waypointY < 0 || waypointY > height
  ) {
    throw new RangeError("Hedef 0–8 aralığında olmalı ve seçilen nokta alanın içinde kalmalı.");
  }
  const rows: PathNode033[][] = [];
  for (let y = 0; y <= height; y += 1) {
    const row: PathNode033[] = [];
    rows.push(row);
    for (let x = 0; x <= width; x += 1) {
      const left = row[x - 1];
      const below = rows[y - 1]?.[x];
      const total = x === 0 && y === 0 ? 1 : (left?.total ?? 0) + (below?.total ?? 0);
      const via = x === waypointX && y === waypointY
        ? total
        : (left?.via ?? 0) + (below?.via ?? 0);
      row.push({ x, y, total, via, avoiding: total - via });
    }
  }
  const target = rows[height][width];
  const waypoint = rows[waypointY][waypointX];
  const sampleRoute = (type: "via" | "avoiding"): PathPoint033[] | null => {
    if (target[type] === 0) return null;
    const route: PathPoint033[] = [];
    let node: PathNode033 | undefined = target;
    let count: keyof Pick<PathNode033, "total" | "via" | "avoiding"> = type;
    while (node) {
      const { x, y } = node;
      route.push({ x, y });
      if (node === waypoint && type === "via") count = "total";
      const previous: Array<PathNode033 | undefined> = [rows[y][x - 1], rows[y - 1]?.[x]];
      node = previous.find((step) => step && step[count] > 0);
    }
    return route.reverse();
  };
  return { rows, target, waypoint, sampleRoute };
}
