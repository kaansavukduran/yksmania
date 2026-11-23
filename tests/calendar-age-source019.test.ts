import { expect, it } from "vitest";
import {
  calendarAge019,
  calendarDayShare019,
  parseCalendarDate019,
} from "../src/learning/calendarAgeSource019Model";

it("keeps the source's 14 calendar years but 13 completed years on January 1", () => {
  expect(calendarAge019("2011-12-20", "2025-01-01")).toMatchObject({
    kind: "valid",
    yearDifference: 14,
    completedAge: 13,
    anniversary: { year: 2025, month: 12, day: 20 },
    anniversaryReached: false,
  });
  expect(calendarAge019("2010-09-01", "2025-05-01")).toMatchObject({
    kind: "valid",
    yearDifference: 15,
    completedAge: 14,
  });
});

it("changes completed age at the birthday boundary but not the year difference", () => {
  for (const [day, age, reached] of [
    [19, 13, false],
    [20, 14, true],
    [21, 14, true],
  ] as const) {
    expect(calendarAge019("2011-12-20", `2025-12-${day}`)).toMatchObject({
      kind: "valid",
      yearDifference: 14,
      completedAge: age,
      anniversaryReached: reached,
    });
  }
  expect(calendarAge019("2011-12-20", "2011-12-20")).toMatchObject({
    kind: "valid",
    completedAge: 0,
    yearDifference: 0,
  });
});

it("renders neither an age nor a year-model value for prebirth and invalid dates", () => {
  for (const value of [
    "2011-12-19",
    "2009-12-20",
    "2011-02-29",
    "",
    "2025-04-31",
    "2025-00-01",
    "2025-01-00",
    "0000-01-01",
  ]) {
    const result = calendarAge019("2011-12-20", value);
    expect(result.kind).toBe(
      ["2011-12-19", "2009-12-20"].includes(value) ? "prebirth" : "invalid",
    );
    expect(result).not.toHaveProperty("completedAge");
    expect(result).not.toHaveProperty("yearDifference");
  }
});

it("validates Gregorian century and leap-day cases and uses the stated month/day threshold", () => {
  expect(parseCalendarDate019("1900-02-29")).toBeNull();
  expect(parseCalendarDate019("2000-02-29")).not.toBeNull();
  expect(parseCalendarDate019("2100-02-29")).toBeNull();
  expect(calendarAge019("2000-02-29", "2025-02-28")).toMatchObject({
    kind: "valid",
    completedAge: 24,
    anniversaryAdjusted: true,
    anniversary: { month: 3, day: 1 },
  });
  expect(calendarAge019("2000-02-29", "2025-03-01")).toMatchObject({
    kind: "valid",
    completedAge: 25,
    anniversaryAdjusted: true,
  });
  expect(calendarAge019("2000-02-29", "2024-02-29")).toMatchObject({
    kind: "valid",
    completedAge: 24,
    anniversaryAdjusted: false,
  });
});

it("uses actual Gregorian days, including leap days, for both timeline intervals", () => {
  const atStart = calendarAge019("2011-12-20", "2025-01-01");
  if (atStart.kind !== "valid") throw new Error("Expected a valid source date");
  const { yearStart, yearEnd, observed, anniversary, birth } = atStart;
  expect(yearEnd - yearStart).toBe(364);
  expect(anniversary.dayIndex - yearStart).toBe(353);
  expect(observed.dayIndex - birth.dayIndex).toBe(4761);
  expect(calendarDayShare019(observed.dayIndex, yearStart, yearEnd)).toBe(0);
  expect(calendarDayShare019(anniversary.dayIndex, yearStart, yearEnd)).toBe(
    353 / 364,
  );
  const leapDay = calendarAge019("2000-02-29", "2024-02-29");
  if (leapDay.kind !== "valid") throw new Error("Expected a leap date");
  expect(leapDay.yearEnd - leapDay.yearStart).toBe(365);
  expect(
    calendarDayShare019(
      leapDay.observed.dayIndex,
      leapDay.yearStart,
      leapDay.yearEnd,
    ),
  ).toBe(59 / 365);
  expect(calendarDayShare019(1, 1, 1)).toBe(0.5);
});
