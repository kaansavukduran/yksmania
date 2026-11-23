type DiceMode036 = "sum-at-least" | "one-face";
export type DiceCell036 = {
  first: number;
  second: number;
  total: number;
  inCondition: boolean;
  inEvent: boolean;
};

export function conditionalDice036(
  mode: DiceMode036,
  cutoff: number,
  face: number,
) {
  if (
    !Number.isInteger(cutoff) ||
    cutoff < 2 ||
    cutoff > 12 ||
    !Number.isInteger(face) ||
    face < 1 ||
    face > 6
  ) {
    throw new RangeError(
      "Toplam eşiği 2–12 ve zar yüzü 1–6 arasında tam sayı olmalı.",
    );
  }
  const cells = Array.from({ length: 36 }, (_, i): DiceCell036 => {
    const first = 1 + Math.floor(i / 6);
    const second = 1 + (i % 6);
    const total = first + second;
    const inCondition =
      mode === "sum-at-least"
        ? total >= cutoff
        : first === face || second === face;
    const inEvent =
      mode === "sum-at-least"
        ? first === face
        : first === face && second === face;
    return { first, second, total, inCondition, inEvent };
  });
  const conditional = cells.filter(({ inCondition }) => inCondition);
  return {
    cells,
    conditionedCount: conditional.length,
    favorableCount: conditional.filter(({ inEvent }) => inEvent).length,
    unconditionalEventCount: cells.filter(({ inEvent }) => inEvent).length,
    fullCount: cells.length,
  };
}

export function twoDraws036(red: number, blue: number, replace: boolean) {
  const counts = [red, blue];
  const total = red + blue;
  if (
    counts.some(
      (count) => !Number.isInteger(count) || count < 0 || count > 12,
    ) ||
    total < (replace ? 1 : 2)
  )
    throw new RangeError("Belirtilen torbadan iki seçim yapılamıyor.");
  const secondDenominator = replace ? total : total - 1;
  const byColor = counts.flatMap((firstCount, first) =>
    counts.map((secondCount, second) => ({
      first,
      second,
      numerator:
        firstCount === 0
          ? 0
          : firstCount * (secondCount - Number(!replace && first === second)),
    })),
  );
  return {
    outcomes: byColor,
    denominator: total * secondDenominator,
    differentNumerator: byColor[1].numerator + byColor[2].numerator,
    secondDenominator,
  };
}
