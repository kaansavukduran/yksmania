import {
  geometry031FromSides,
  geometry031Triangle,
  type Geometry031Point,
} from "./geometryFoundation031Model";

export type BisectorMode = "internal" | "mixed" | "external";
const radians = (degrees: number) => (degrees * Math.PI) / 180;
const unit = (degrees: number) => ({
  x: Math.cos(radians(degrees)),
  y: Math.sin(radians(degrees)),
});
const cross = (u: Geometry031Point, v: Geometry031Point) =>
  u.x * v.y - u.y * v.x;

export function angleBisectors042(a: number, b: number, mode: BisectorMode) {
  const c = 180 - a - b;
  if (![a, b, c].every((angle) => Number.isFinite(angle) && angle > 0))
    throw new RangeError("Üçgenin iç açıları pozitif olmalı.");
  const scale = Math.sin(radians(c)) / Math.sin(radians(a));
  const direction = unit(b);
  const A = { x: direction.x * scale, y: direction.y * scale };
  const B = { x: 0, y: 0 };
  const C = { x: 1, y: 0 };
  const fromB = unit(b / 2 + (mode === "external" ? 90 : 0));
  const fromC = unit((mode === "internal" ? 180 : 90) - c / 2);
  const alongB = cross(C, fromC) / cross(fromB, fromC);
  const intersection = { x: fromB.x * alongB, y: fromB.y * alongB };
  const angle = geometry031Triangle(intersection, B, C).angles?.A;
  if (angle === undefined) throw new RangeError("Açıortaylar kesişmeli.");
  return { A, B, C, intersection, angle, a, b, c };
}

export function sharedTriangleSide042(
  upperLeft: number,
  upperRight: number,
  lowerLeft: number,
  lowerRight: number,
  shared: number,
) {
  if (
    ![upperLeft, upperRight, lowerLeft, lowerRight, shared].every(
      (side) => Number.isSafeInteger(side) && side > 0,
    )
  )
    throw new RangeError("Kenarlar pozitif tam sayı olmalı.");
  const upper = {
    min: Math.abs(upperLeft - upperRight),
    max: upperLeft + upperRight,
    shape: geometry031FromSides(upperRight, upperLeft, shared),
  };
  const lower = {
    min: Math.abs(lowerLeft - lowerRight),
    max: lowerLeft + lowerRight,
    shape: geometry031FromSides(lowerRight, lowerLeft, shared),
  };
  const min = Math.max(upper.min, lower.min);
  const max = Math.min(upper.max, lower.max);
  const firstInteger = Math.floor(min) + 1;
  const lastInteger = Math.ceil(max) - 1;
  const integerCount = Math.max(0, lastInteger - firstInteger + 1);
  return {
    upper,
    lower,
    min,
    max,
    firstInteger,
    lastInteger,
    integerCount,
    both: upper.shape.kind === "valid" && lower.shape.kind === "valid",
  };
}
