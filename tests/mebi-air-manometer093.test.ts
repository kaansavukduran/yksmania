import { describe, expect, it } from "vitest";
import { airFlowManometerSection, airFlowManometerState } from "../src/learning/mebiAirFlowManometer";

describe("hava akışı ve U borusunda su", () => {
  it("hava durgunsa basınçlar ve su seviyeleri eşittir", () => {
    expect(airFlowManometerState(0)).toEqual({ wideSpeed: 0, narrowSpeed: 0, widePressureAboveNarrow: 0, waterHeightDifferenceCm: 0 });
    expect(airFlowManometerSection.table?.rows).toEqual([
      ["Durgun", "P(M) = P(L)", "Aynı seviyede"], ["Akıyor", "P(M) > P(L)", "L kolunda daha yüksek"],
    ]);
  });

  it("hız farkını basınç farkına, basınç farkını santimetreye dönüştürür", () => {
    expect(airFlowManometerState(10)).toEqual({ wideSpeed: 10, narrowSpeed: 20, widePressureAboveNarrow: 180, waterHeightDifferenceCm: 1.8 });
    expect(airFlowManometerState(20)).toEqual({ wideSpeed: 20, narrowSpeed: 40, widePressureAboveNarrow: 720, waterHeightDifferenceCm: 7.2 });
  });
});
