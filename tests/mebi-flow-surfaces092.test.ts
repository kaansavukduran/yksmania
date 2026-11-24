import { describe, expect, it } from "vitest";
import { flowSurfaceSection, flowSurfaceState } from "../src/learning/mebiFlowSurfaces";

describe("bir yüzeyin üstü ve altındaki basınç", () => {
  it("iki tarafta eşit basınç olduğunda net düşey kuvveti sıfırlar", () => {
    expect(flowSurfaceState(0)).toEqual({ lowerPressure: 100000, upperPressure: 100000, projectedArea: 0.5, upwardForce: 0 });
  });

  it("paskal farkını izdüşüm alanıyla çarpar", () => {
    expect(flowSurfaceState(100).upwardForce).toBe(50);
    expect(flowSurfaceState(200)).toEqual({ lowerPressure: 100000, upperPressure: 99800, projectedArea: 0.5, upwardForce: 100 });
    expect(flowSurfaceSection.table?.rows).toEqual([
      ["Çatı", "İç", "Yukarı yönlü"], ["Kanat", "Alt", "Yukarı yönlü"], ["Şemsiye", "Alt", "Yukarı yönlü"],
    ]);
  });
});
