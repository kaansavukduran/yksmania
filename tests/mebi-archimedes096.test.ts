import { expect, it } from "vitest";
import { overflowBalance, overflowCases, overflowSection } from "../src/learning/mebiArchimedesOverflow";

it("taşan suyun ağırlığını ve taban desteğini ayrı hesaplar", () => {
  expect(overflowBalance(600)).toEqual({ displacedLitres: 1.2, buoyancy: 12, weight: 12, support: 0 });
  expect(overflowBalance(1000)).toEqual({ displacedLitres: 2, buoyancy: 20, weight: 20, support: 0 });
  expect(overflowBalance(1250)).toEqual({ displacedLitres: 2, buoyancy: 20, weight: 25, support: 5 });
  for (const { density } of overflowCases) {
    const result = overflowBalance(density);
    expect(result.buoyancy + result.support).toBe(result.weight);
    expect(result.displacedLitres * 10).toBe(result.buoyancy);
  }
  expect(overflowSection.table?.rows[2]).toEqual(["Tabana iner", "2 L", "20 N", "25 N", "5 N"]);
});
