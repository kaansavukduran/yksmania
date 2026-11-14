export function digitParts(value: number) {
  if (!Number.isInteger(value) || value < 0 || value > 9999)
    throw Error("NUMBER_DOMAIN");
  return String(value)
    .split("")
    .map((digit, index, array) => ({
      digit: Number(digit),
      power: array.length - index - 1,
      weight: 10 ** (array.length - index - 1),
      contribution: Number(digit) * 10 ** (array.length - index - 1),
    }));
}
export function centuryInfo(year: number, before = false) {
  if (!Number.isInteger(year) || year < 1 || year > 9999)
    throw Error("NO_YEAR_ZERO");
  const century = Math.floor((year - 1) / 100) + 1;
  const position = before ? 100 - ((year - 1) % 100) : ((year - 1) % 100) + 1;
  return {
    century,
    position,
    half: Math.ceil(position / 50),
    quarter: Math.ceil(position / 25),
    start: before ? century * 100 : (century - 1) * 100 + 1,
    end: before ? (century - 1) * 100 + 1 : century * 100,
  };
}
export function chainParts(total: number, chains: number) {
  if (
    !Number.isInteger(total) ||
    !Number.isInteger(chains) ||
    total < 1 ||
    total > 16 ||
    chains < 1 ||
    chains > total
  )
    throw Error("CHAIN_DOMAIN");
  return {
    bonds: total - chains,
    rows: Array.from(
      { length: chains },
      (_, index) =>
        Math.floor(total / chains) + (index < total % chains ? 1 : 0),
    ),
  };
}
export function density(mass: number, volume: number) {
  if (
    !Number.isFinite(mass) ||
    !Number.isFinite(volume) ||
    mass <= 0 ||
    volume <= 0
  )
    throw Error("DENSITY_DOMAIN");
  return mass / volume;
}
export function motionSteps(
  first: number,
  second: number,
  t1: number,
  t2: number,
) {
  if (![first, second, t1, t2].every(Number.isFinite) || t1 <= 0 || t2 <= 0)
    throw Error("MOTION_DOMAIN");
  const displacement = first + second,
    distance = Math.abs(first) + Math.abs(second),
    time = t1 + t2;
  return {
    positions: [0, first, displacement],
    displacement,
    distance,
    time,
    speed: distance / time,
    velocity: displacement / time,
  };
}
export function euclideanDivision(total: number, divisor: number) {
  if (
    !Number.isSafeInteger(total) ||
    !Number.isSafeInteger(divisor) ||
    divisor <= 0
  )
    throw Error("DIVISION_DOMAIN");
  const quotient = Math.floor(total / divisor),
    remainder = total - divisor * quotient;
  return { quotient, remainder };
}
export function commonNumbers(a: number, b: number) {
  if (![a, b].every((n) => Number.isSafeInteger(n) && n > 0 && n <= 10000))
    throw Error("COMMON_NUMBER_DOMAIN");
  let x = a,
    y = b;
  const steps: { a: number; b: number; quotient: number; remainder: number }[] =
    [];
  while (y !== 0) {
    const division = euclideanDivision(x, y);
    steps.push({ a: x, b: y, ...division });
    x = y;
    y = division.remainder;
  }
  return { gcd: x, lcm: (a / x) * b, steps };
}
export function fallEnergy(
  mass: number,
  startHeight: number,
  height: number,
  transferFraction: number,
) {
  if (
    ![mass, startHeight, height, transferFraction].every(Number.isFinite) ||
    mass <= 0 ||
    startHeight <= 0 ||
    height < 0 ||
    height > startHeight ||
    transferFraction < 0 ||
    transferFraction > 1
  )
    throw Error("ENERGY_DOMAIN");
  const initial = mass * 10 * startHeight,
    potential = mass * 10 * height,
    released = initial - potential,
    transferred = released * transferFraction;
  return { initial, potential, transferred, kinetic: released - transferred };
}
