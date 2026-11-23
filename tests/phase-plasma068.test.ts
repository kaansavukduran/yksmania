import { describe, expect, it } from "vitest";
import { phasePlasmaSection, plasmaTransitions } from "../src/learning/phasePlasma068";
import { phasePlasmaFigure } from "../src/learning/sectionFigures/phasePlasmaFigure068";

describe("gaz ve plazma arasında iki yön", () => {
  it("tanecikleri ve enerji yönlerini ters sırada gösterir", () => {
    const [ionization, recombination] = plasmaTransitions;
    expect(ionization.end).toBe(recombination.start);
    expect(recombination.end).toBe(ionization.start);
    expect(phasePlasmaSection.table?.rows.map((row) => row[3])).toEqual(["Enerji alır", "Enerji verir"]);
    expect(phasePlasmaFigure.draw(0, 0).readout?.[0]).toBe("Enerji alır.");
    expect(phasePlasmaFigure.draw(0, 1).readout?.[0]).toBe("Enerji verir.");
  });
});
