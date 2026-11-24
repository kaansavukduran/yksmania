import { expect, test } from "vitest";
import { studyGuide } from "../src/learning/guides";
import { seismicArrival } from "../src/learning/mebiSeismicFocus";
import {
  seismicRecordDifferenceTitle, seismicRecordExample, seismicRecordReadTitle, seismicRecordTitle, seismicTrace,
} from "../src/learning/mebiSeismicRecord";
import { sectionFigures } from "../src/learning/sectionFigures/registry";

test("uses the existing focus geometry and starts the trace at the calculated P arrival", () => {
  for (const distance of [0, 4, 8, 12]) {
    const { readAt, ...arrivals } = seismicTrace(distance);
    expect(arrivals).toEqual(seismicArrival(distance));
    const { pSeconds, sSeconds, differenceSeconds } = arrivals;
    expect(sSeconds).toBeGreaterThan(pSeconds);
    expect(differenceSeconds).toBeCloseTo(pSeconds, 10);
    expect(readAt(0)).toBe(0);
    expect(readAt(pSeconds)).toBe(0);
    expect(readAt(pSeconds + 0.02)).not.toBe(0);
    expect(Number.isFinite(readAt(sSeconds + 0.02))).toBe(true);
  }
  expect(seismicTrace(0).differenceSeconds).toBe(1);
  expect(seismicTrace(12).differenceSeconds).toBeGreaterThan(2.2);
});

test("keeps the interactive course trace and fixed example steps on the source guide", () => {
  const guide = studyGuide("ses-deprem-dalgalari");
  expect(guide?.source).toContain("örnek sismogram");
  expect(guide?.sections.find(({ title }) => title === seismicRecordTitle)?.figureTitle).toBe(seismicRecordTitle);
  expect(guide?.examples).toContainEqual(seismicRecordExample);
  expect(seismicRecordExample.steps.map(({ figureTitle }) => figureTitle)).toEqual([
    seismicRecordReadTitle, seismicRecordDifferenceTitle,
  ]);
  const figures = sectionFigures["ses-deprem-dalgalari"];
  expect(figures[seismicRecordReadTitle].param).toBeUndefined();
  expect(figures[seismicRecordReadTitle].draw(0, 0).readout).toEqual([
    "P 1,67 s, S 3,33 s.",
    "S, P’den 1,67 s sonra geliyor.",
  ]);
});
