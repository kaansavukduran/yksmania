import { describe, expect, it } from "vitest";
import { cueNotes, playCue } from "../src/domain/soundEngine";

describe("sound engine", () => {
  it("lifts the correct cue one semitone per combo step, capped at +8", () => {
    expect(cueNotes({ kind: "correct", combo: 1 })[0].midi).toBe(84);
    expect(cueNotes({ kind: "correct", combo: 4 })[0].midi).toBe(87);
    expect(cueNotes({ kind: "correct", combo: 40 })[0].midi).toBe(92);
  });
  it("the wrong cue steps down and stays low", () => {
    const [a, b] = cueNotes({ kind: "wrong" });
    expect(b.midi).toBeLessThan(a.midi);
    expect(a.midi).toBeLessThan(60);
  });
  it("trophy fanfares grow with the tier", () => {
    const lengths = ([1, 2, 3, 4] as const).map((tier) => cueNotes({ kind: "trophy", tier }).length);
    expect(lengths).toEqual([3, 4, 5, 6]);
  });
  it("never throws without Web Audio", () => {
    expect(() => playCue({ kind: "finish" }, 60)).not.toThrow();
  });
});
