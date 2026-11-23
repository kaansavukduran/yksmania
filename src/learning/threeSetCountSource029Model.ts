export type ThreeSetCountInput = {
  universe: number;
  a: number;
  b: number;
  c: number;
  ab: number;
  ac: number;
  bc: number;
  abc: number;
  inclusivePairs: boolean;
};

export const threeSetCount029Example: ThreeSetCountInput = {
  universe: 50,
  a: 25,
  b: 20,
  c: 18,
  ab: 10,
  ac: 8,
  bc: 7,
  abc: 3,
  inclusivePairs: true,
};

export function threeSetCount029({
  universe,
  a,
  b,
  c,
  ab,
  ac,
  bc,
  abc,
  inclusivePairs,
}: ThreeSetCountInput) {
  if (
    ![universe, a, b, c, ab, ac, bc, abc].every(
      (count) => Number.isSafeInteger(count) && count >= 0 && count <= 100,
    )
  ) {
    throw new RangeError("Kişi sayıları 0 ile 100 arasında tam sayı olmalı.");
  }
  const shared = inclusivePairs ? abc : 0;
  const onlyAB = ab - shared;
  const onlyAC = ac - shared;
  const onlyBC = bc - shared;
  const onlyA = a - onlyAB - onlyAC - abc;
  const onlyB = b - onlyAB - onlyBC - abc;
  const onlyC = c - onlyAC - onlyBC - abc;
  const exactlyOne = onlyA + onlyB + onlyC;
  const exactlyTwo = onlyAB + onlyAC + onlyBC;
  const union = exactlyOne + exactlyTwo + abc;
  const regions = {
    onlyA,
    onlyB,
    onlyC,
    onlyAB,
    onlyAC,
    onlyBC,
    abc,
    outside: universe - union,
  };
  const invalid = (Object.keys(regions) as (keyof typeof regions)[]).filter(
    (region) => regions[region] < 0,
  );
  return { regions, invalid, exactlyOne, exactlyTwo, union };
}
