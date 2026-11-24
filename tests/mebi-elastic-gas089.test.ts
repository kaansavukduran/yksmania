import { describe, expect, it } from "vitest";
import { balloonChanges, elasticBalloonState, gasMembraneState, heatedMembraneTitle } from "../src/learning/mebiElasticGas";
import { mebiElasticGasFigures } from "../src/learning/sectionFigures/mebiElasticGasFigures";

describe("esnek gaz dengeleri", () => {
  it("iki gazı aynı basınçta tutarken toplam hacmi korur", () => {
    expect(gasMembraneState(1)).toEqual({ pressure: 100, volumeX: 5, volumeY: 5 });
    expect(gasMembraneState(1.5)).toEqual({ pressure: 125, volumeX: 6, volumeY: 4 });
    const hotter = gasMembraneState(2);
    expect(hotter.volumeX / hotter.volumeY).toBeCloseTo(2);
    expect(hotter.volumeX + hotter.volumeY).toBeCloseTo(10);
    expect(hotter.pressure * hotter.volumeY).toBeCloseTo(500);
  });

  it("balonun iç basıncını dış basınca eşitler", () => {
    expect(elasticBalloonState(balloonChanges[0], 1.5)).toEqual({ pressure: 100, volume: 4.5 });
    expect(elasticBalloonState(balloonChanges[1], 1.5)).toEqual({ pressure: 100, volume: 4.5 });
    expect(elasticBalloonState(balloonChanges[2], 1.5)).toEqual({ pressure: 150, volume: 2 });
  });

  it("zar örneğinin hacim adımında henüz hesaplanmayan basıncı göstermez", () => {
    const diagram = mebiElasticGasFigures[heatedMembraneTitle];
    expect(diagram.param).toBeUndefined();
    expect(diagram.draw(0, 0).readout).toEqual(["X: 6 L · Y: 4 L · Toplam: 10 L."]);
  });
});
