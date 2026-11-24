export const sourceRadiusCm = 3;
export const blockerRadiusCm = 1.5;
export const blockerAxisCm = 6;
export const shadowApexCm = blockerAxisCm * sourceRadiusCm / (sourceRadiusCm - blockerRadiusCm);
export const positions = [
  { label: "K", axialCm: 8, lateralCm: 0 },
  { label: "L", axialCm: 9, lateralCm: 2.2 },
  { label: "M", axialCm: 16, lateralCm: 0 },
] as const;

export function observerDisks(axialCm: number, lateralCm: number) {
  const sourceDistance = Math.hypot(axialCm, lateralCm);
  const blockerDistance = Math.hypot(axialCm - blockerAxisCm, lateralCm);
  const sourceAngularRadius = Math.asin(sourceRadiusCm / sourceDistance);
  const blockerAngularRadius = Math.asin(blockerRadiusCm / blockerDistance);
  const separation = Math.abs(
    Math.atan2(lateralCm, axialCm - blockerAxisCm) - Math.atan2(lateralCm, axialCm),
  );
  let appearance: "full" | "ring" | "partial" | "clear";
  if (separation >= sourceAngularRadius + blockerAngularRadius) appearance = "clear";
  else if (blockerAngularRadius >= separation + sourceAngularRadius) appearance = "full";
  else if (sourceAngularRadius >= separation + blockerAngularRadius) appearance = "ring";
  else appearance = "partial";
  return { sourceAngularRadius, blockerAngularRadius, separation, appearance };
}
