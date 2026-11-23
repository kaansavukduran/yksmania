import { describe, expect, it } from "vitest";
import { thermalPairAt } from "../src/learning/thermalTransfer063";
import { thermalTransferFigure } from "../src/learning/sectionFigures/thermalTransferFigure063";

describe("yalıtılmış iki cisimde ısı aktarımı", () => {
  it("başlangıçta, ortada ve dengede eş enerji kaybını ve kazancını hesaplar", () => {
    expect(thermalPairAt(60, 0)).toEqual({ hot: 60, cold: 20, transferred: 0, equilibrium: 40 });
    expect(thermalPairAt(60, 0.5)).toEqual({ hot: 50, cold: 30, transferred: 4000, equilibrium: 40 });
    expect(thermalPairAt(60, 1)).toEqual({ hot: 40, cold: 40, transferred: 8000, equilibrium: 40 });
    expect(thermalPairAt(80, 1)).toEqual({ hot: 50, cold: 50, transferred: 12000, equilibrium: 50 });
  });

  it("net enerji akışının durduğu adımı eş sıcaklıkla gösterir", () => {
    const moving = thermalTransferFigure.draw(80, 1).readout;
    expect(moving).toContain("Net enerji akışı sıcak taraftan soğuk tarafa.");
    const equal = thermalTransferFigure.draw(80, 2).readout;
    expect(equal).toContain("Sıcaklıklar eşit. Net ısı aktarımı durdu.");
  });
});
