export type Seating032 = "row" | "circle" | "labelled-circle";

const factorial = (n: number): number => {
  let result = 1;
  for (let factor = 2; factor <= n; factor += 1) result *= factor;
  return result;
};

export function combinations032(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  return factorial(n) / (factorial(k) * factorial(n - k));
}

export function separatedPermutations032(
  people: number,
  special: number,
  seating: Seating032,
) {
  if (
    !Number.isInteger(people) || people < 1 || people > 8 ||
    !Number.isInteger(special) || special < 0 || special > people
  ) {
    throw new RangeError("1–8 kişi ve kişi sayısını aşmayan özel grup gerekir.");
  }
  const ordinary = people - special;
  const circular = seating !== "row";
  const labelled = seating === "labelled-circle";
  const seatsFactor = labelled ? people : 1;
  const total = circular
    ? factorial(people - 1) * seatsFactor
    : factorial(people);
  const gaps = circular ? ordinary : ordinary + 1;
  const ordinaryOrders = circular
    ? factorial(Math.max(0, ordinary - 1))
    : factorial(ordinary);
  const allocations = combinations032(gaps, special);
  const specialOrders = factorial(special);
  // One person has no neighboring person, including in a one-seat circle.
  const separated = people === 1
    ? 1
    : ordinaryOrders * allocations * specialOrders * seatsFactor;

  return {
    ordinary,
    gaps,
    total,
    ordinaryOrders,
    allocations,
    specialOrders,
    seatsFactor,
    separated,
    touching: total - separated,
    singlePerson: people === 1,
  };
}
