import { r035, r035Sub } from "./rationalSource035Model";

export function parseLira021(raw: string) {
  const parts = raw.trim().match(/^(\d{1,6})(?:[,.](\d{1,2}))?$/);
  return parts
    ? 100n * BigInt(parts[1]) + BigInt((parts[2] ?? "").padEnd(2, "0"))
    : null;
}

export type FireProfit021Input = {
  purchased: number;
  sellable: number;
  totalCostKurus: bigint;
  priceKurus: bigint;
};

export function fireProfit021({
  purchased,
  sellable,
  totalCostKurus,
  priceKurus,
}: FireProfit021Input) {
  if (
    !Number.isSafeInteger(purchased) ||
    purchased < 1 ||
    !Number.isSafeInteger(sellable) ||
    sellable < 0 ||
    sellable > purchased ||
    totalCostKurus <= 0n ||
    priceKurus < 0n
  ) {
    throw new RangeError(
      "Alınan adet ve toplam maliyet pozitif olmalı. Satılabilir adet 0 ile alınan adet arasında olmalı. Fiyat negatif olamaz.",
    );
  }
  const count = BigInt(sellable);
  const revenueKurus = priceKurus * count;
  const gainKurus = revenueKurus - totalCostKurus;
  const base = {
    purchased,
    sellable,
    fire: purchased - sellable,
    totalCostKurus,
    priceKurus,
    revenueKurus,
    gainKurus,
    costPerPurchasedKurus: r035(totalCostKurus, purchased),
    gainPercent: r035(gainKurus * 100n, totalCostKurus),
  };

  if (count === 0n) {
    return { ...base, kind: "no-sales" as const, perSellable: null };
  }

  const costPerSellableKurus = r035(totalCostKurus, count);
  return {
    ...base,
    kind:
      gainKurus > 0n
        ? ("profit" as const)
        : gainKurus < 0n
          ? ("loss" as const)
          : ("break-even" as const),
    perSellable: {
      costKurus: costPerSellableKurus,
      gainKurus: r035Sub(r035(priceKurus), costPerSellableKurus),
      minNoLossKurus: (totalCostKurus + count - 1n) / count,
      minProfitKurus: totalCostKurus / count + 1n,
      exactBreakEven: totalCostKurus % count === 0n,
    },
  };
}
