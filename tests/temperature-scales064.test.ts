import { describe, expect, it } from "vitest";
import { temperatureScales } from "../src/learning/exactTemperature064";
import { exactTemperatureFigure } from "../src/learning/sectionFigures/exactTemperatureFigure064";

describe("sıcaklık ölçekleri", () => {
  it("Celsius referanslarını aynı fiziksel Fahrenheit ve Kelvin düzeyine çevirir", () => {
    expect(temperatureScales(0)).toEqual({ celsius: 0, fahrenheit: 32, kelvin: 273.15 });
    expect(temperatureScales(100)).toEqual({ celsius: 100, fahrenheit: 212, kelvin: 373.15 });
    const belowZero = temperatureScales(-40);
    expect(belowZero.celsius).toBe(-40);
    expect(belowZero.fahrenheit).toBe(-40);
    expect(belowZero.kelvin).toBeCloseTo(233.15, 9);
    const absoluteZero = temperatureScales(-273.15);
    expect(absoluteZero.kelvin).toBe(0);
    expect(absoluteZero.fahrenheit).toBeCloseTo(-459.67, 9);
  });

  it("10 derece farkı Fahrenheit için 18, Kelvin için 10 olarak korur", () => {
    const [initial, final] = [temperatureScales(-10), temperatureScales(0)];
    expect(final.fahrenheit - initial.fahrenheit).toBe(18);
    expect(final.kelvin - initial.kelvin).toBe(10);
    expect(exactTemperatureFigure.draw(-10, 0).readout?.[0]).toContain("14 °F = 263,15 K");
  });
});
