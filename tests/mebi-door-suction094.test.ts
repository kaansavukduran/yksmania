import { describe, expect, it } from "vitest";
import { doorPressureState, intakeThresholdKPa, liquidIntakeState } from "../src/learning/mebiDoorSuction";

describe("kapı ve dar boruda basınç farkı", () => {
  it("kapının net basınç kuvvetini iki yönde hesaplar", () => {
    expect(doorPressureState(200)).toEqual({ innerPressure: 100000, outerPressure: 99800, outwardForce: 100 });
    expect(doorPressureState(0).outwardForce).toBe(0);
    expect(doorPressureState(-200)).toEqual({ innerPressure: 100000, outerPressure: 100200, outwardForce: -100 });
  });

  it("açık musluk, yükselme eşiği ve akış koşullarını ayrı tutar", () => {
    expect(intakeThresholdKPa).toBe(3);
    expect(liquidIntakeState(4, false)).toEqual({ riseM: 0, reachedInlet: false, canEnter: false });
    expect(liquidIntakeState(2, true)).toEqual({ riseM: 0.2, reachedInlet: false, canEnter: false });
    expect(liquidIntakeState(3, true)).toEqual({ riseM: 0.3, reachedInlet: true, canEnter: false });
    expect(liquidIntakeState(4, true)).toEqual({ riseM: 0.4, reachedInlet: true, canEnter: true });
  });
});
