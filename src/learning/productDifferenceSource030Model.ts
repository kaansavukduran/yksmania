type ProductSets = {
  first: readonly number[];
  second: readonly number[];
  compareFirst: readonly number[];
  compareSecond: readonly number[];
};

export type ProductOperation030 = "difference" | "intersection";

export const productExample030: ProductSets = {
  first: [1, 2, 3],
  second: [1, 2, 3, 4],
  compareFirst: [2, 3],
  compareSecond: [2, 4],
};

export function productRegions030(
  { first, second, compareFirst, compareSecond }: ProductSets,
  operation: ProductOperation030,
) {
  const A = new Set(first);
  const B = new Set(second);
  const C = new Set(compareFirst);
  const D = new Set(compareSecond);
  const cells = [...A].flatMap((x) =>
    [...B].map((y) => {
      const inC = C.has(x);
      const inD = D.has(y);
      const common = inC && inD;
      return {
        x,
        y,
        inC,
        inD,
        selected: operation === "intersection" ? common : !common,
      };
    }),
  );

  const selected = cells.filter((cell) => cell.selected);
  return {
    cells,
    selected,
    firstOverlap: [...A].filter((x) => C.has(x)).length,
    secondOverlap: [...B].filter((y) => D.has(y)).length,
    bothOutside: cells.filter(({ inC, inD }) => !inC && !inD).length,
  };
}
