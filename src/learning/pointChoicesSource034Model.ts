export type Point034 = { id: string; x: number; y: number };

function greatestCommonDivisor(a: number, b: number): number {
  let left = Math.abs(a);
  let right = Math.abs(b);
  while (right !== 0) [left, right] = [right, left % right];
  return left;
}

export function doubledTriangleArea034(a: Point034, b: Point034, c: Point034) {
  return Math.abs((b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x));
}

export function pointChoices034(points: readonly Point034[]) {
  if (
    points.length > 12 ||
    points.some(
      ({ x, y }) =>
        ![x, y].every(
          (value) => Number.isInteger(value) && Math.abs(value) <= 100,
        ),
    )
  )
    throw new RangeError("En çok 12 tane tam sayı koordinatlı nokta kullan.");
  if (
    new Set(points.map(({ x, y }) => `${x},${y}`)).size !== points.length ||
    new Set(points.map(({ id }) => id)).size !== points.length
  ) {
    throw new RangeError("Nokta adları ve konumları farklı olmalı.");
  }

  const lines = new Map<string, Set<string>>();
  const triangles: Array<{ ids: [string, string, string]; areaTwice: number }> =
    [];
  const collinear: Array<[string, string, string]> = [];
  for (const [i, a] of points.entries()) {
    for (let j = i + 1; j < points.length; j += 1) {
      const b = points[j];
      const normalX = b.y - a.y;
      const normalY = a.x - b.x;
      const constant = normalX * a.x + normalY * a.y;
      const divisor = greatestCommonDivisor(normalX, normalY);
      const sign = normalX < 0 || (normalX === 0 && normalY < 0) ? -1 : 1;
      const key = [normalX, normalY, constant]
        .map((coefficient) => (sign * coefficient) / divisor)
        .join(",");
      const members = lines.get(key) ?? new Set<string>();
      members.add(a.id);
      members.add(b.id);
      lines.set(key, members);

      for (let k = j + 1; k < points.length; k += 1) {
        const c = points[k];
        const ids: [string, string, string] = [a.id, b.id, c.id];
        const areaTwice = doubledTriangleArea034(a, b, c);
        if (areaTwice === 0) collinear.push(ids);
        else triangles.push({ ids, areaTwice });
      }
    }
  }
  return {
    triangles,
    collinear,
    lines: [...lines.values()].map((members) => [...members]),
    totalTriples: triangles.length + collinear.length,
  };
}
