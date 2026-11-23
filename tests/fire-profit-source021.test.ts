import { expect, it } from "vitest";
import { r035 } from "../src/learning/rationalSource035Model";
import {
  fireProfit021,
  parseLira021,
} from "../src/learning/fireProfitSource021Model";

const example = {
  purchased: 18,
  sellable: 15,
  totalCostKurus: 36000n,
  priceKurus: 2700n,
};

it("keeps paid cost fixed when fire changes quantities and per-unit value", () => {
  expect(fireProfit021(example)).toMatchObject({
    fire: 3,
    totalCostKurus: 36000n,
    revenueKurus: 40500n,
    gainKurus: 4500n,
    kind: "profit",
    costPerPurchasedKurus: r035(2000),
    gainPercent: r035(25, 2),
    perSellable: {
      costKurus: r035(2400),
      gainKurus: r035(300),
      minNoLossKurus: 2400n,
      minProfitKurus: 2401n,
      exactBreakEven: true,
    },
  });
  expect(fireProfit021({ ...example, sellable: 12 })).toMatchObject({
    fire: 6,
    totalCostKurus: 36000n,
    costPerPurchasedKurus: r035(2000),
    revenueKurus: 32400n,
    gainKurus: -3600n,
    kind: "loss",
    perSellable: { costKurus: r035(3000), gainKurus: r035(-300) },
  });
});

it("separates the smallest cent-profit price from exact break-even", () => {
  for (const [priceKurus, gainKurus, kind] of [
    [2399n, -15n, "loss"],
    [2400n, 0n, "break-even"],
    [2401n, 15n, "profit"],
  ] as const) {
    expect(fireProfit021({ ...example, priceKurus })).toMatchObject({
      gainKurus,
      kind,
    });
  }
  const fractional = { purchased: 5, sellable: 3, totalCostKurus: 1000n };
  expect(fireProfit021({ ...fractional, priceKurus: 333n })).toMatchObject({
    kind: "loss",
    gainKurus: -1n,
    perSellable: {
      costKurus: r035(1000, 3),
      gainKurus: r035(-1, 3),
      minNoLossKurus: 334n,
      minProfitKurus: 334n,
      exactBreakEven: false,
    },
  });
  expect(fireProfit021({ ...fractional, priceKurus: 334n })).toMatchObject({
    kind: "profit",
    gainKurus: 2n,
  });
});

it("does not divide by a zero quantity and leaves the paid cost as loss", () => {
  expect(fireProfit021({ ...example, sellable: 0 })).toMatchObject({
    fire: 18,
    kind: "no-sales",
    revenueKurus: 0n,
    gainKurus: -36000n,
    gainPercent: r035(-100),
    perSellable: null,
  });
  expect(fireProfit021({ ...example, priceKurus: 0n })).toMatchObject({
    kind: "loss",
    revenueKurus: 0n,
    perSellable: { costKurus: r035(2400) },
  });
});

it("checks source pages 7, 12 Y4 and 13–14 P4 with cents", () => {
  expect(
    fireProfit021({
      purchased: 100,
      sellable: 80,
      totalCostKurus: 320000n,
      priceKurus: 5000n,
    }),
  ).toMatchObject({
    revenueKurus: 400000n,
    gainKurus: 80000n,
    gainPercent: r035(25),
  });
  expect(
    fireProfit021({
      purchased: 10,
      sellable: 8,
      totalCostKurus: 20000n,
      priceKurus: 3000n,
    }),
  ).toMatchObject({
    revenueKurus: 24000n,
    gainKurus: 4000n,
    gainPercent: r035(20),
  });
  expect(
    fireProfit021({
      purchased: 50,
      sellable: 45,
      totalCostKurus: 200000n,
      priceKurus: 6000n,
    }),
  ).toMatchObject({
    revenueKurus: 270000n,
    gainKurus: 70000n,
    gainPercent: r035(35),
  });
});

it("checks the adjacent kuruş thresholds for 248 cost and sellable-count pairs", () => {
  for (let sellable = 1; sellable <= 8; sellable++)
    for (let amount = 1n; amount <= 31n; amount++) {
      const input = {
        purchased: 8,
        sellable,
        totalCostKurus: amount,
        priceKurus: 0n,
      };
      const threshold = fireProfit021(input).perSellable!;
      expect(
        fireProfit021({ ...input, priceKurus: threshold.minNoLossKurus })
          .gainKurus,
      ).toBeGreaterThanOrEqual(0n);
      expect(
        fireProfit021({ ...input, priceKurus: threshold.minNoLossKurus - 1n })
          .gainKurus,
      ).toBeLessThan(0n);
      expect(
        fireProfit021({ ...input, priceKurus: threshold.minProfitKurus })
          .gainKurus,
      ).toBeGreaterThan(0n);
      expect(
        fireProfit021({ ...input, priceKurus: threshold.minProfitKurus - 1n })
          .gainKurus,
      ).toBeLessThanOrEqual(0n);
    }
});

it("parses dot or Turkish comma exactly and rejects malformed amounts and counts", () => {
  expect(parseLira021("27,50")).toBe(2750n);
  expect(parseLira021("27.5")).toBe(2750n);
  expect(parseLira021("0,01")).toBe(1n);
  expect(parseLira021("360")).toBe(36000n);
  for (const raw of ["", "27,001", "-1", "1.234,99", "NaN", "1e2"])
    expect(parseLira021(raw)).toBeNull();
  for (const override of [
    { purchased: 0 },
    { sellable: 19 },
    { sellable: 0.5 },
    { totalCostKurus: 0n },
    { priceKurus: -1n },
  ]) {
    expect(() => fireProfit021({ ...example, ...override })).toThrow(
      RangeError,
    );
  }
});
