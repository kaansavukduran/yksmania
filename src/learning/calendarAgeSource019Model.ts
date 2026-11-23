const monthLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const isLeap = (year: number) =>
  year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);

export type CalendarDate019 = {
  year: number;
  month: number;
  day: number;
  dayIndex: number;
  yearOffset: number;
};

function civilDate019(
  year: number,
  month: number,
  day: number,
): CalendarDate019 | null {
  const leap = isLeap(year);
  const monthLength = monthLengths[month - 1];
  if (
    year < 1 ||
    year > 9999 ||
    !monthLength ||
    day < 1 ||
    day > monthLength + (leap && month === 2 ? 1 : 0)
  )
    return null;
  const daysBeforeMonth = monthLengths
    .slice(0, month - 1)
    .reduce((sum, days) => sum + days, 0);
  const yearOffset = daysBeforeMonth + (leap && month > 2 ? 1 : 0) + day - 1;
  const previousYear = year - 1;
  const dayIndex =
    previousYear * 365 +
    Math.floor(previousYear / 4) -
    Math.floor(previousYear / 100) +
    Math.floor(previousYear / 400) +
    yearOffset;
  return { year, month, day, dayIndex, yearOffset };
}

export function parseCalendarDate019(iso: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
  const [year, month, day] = iso.split("-").map(Number);
  return civilDate019(year, month, day);
}

export function calendarAge019(birthIso: string, observedIso: string) {
  const birth = parseCalendarDate019(birthIso);
  const observed = parseCalendarDate019(observedIso);
  if (!birth || !observed) return { kind: "invalid" as const, birth, observed };
  if (observed.dayIndex < birth.dayIndex)
    return { kind: "prebirth" as const, birth, observed };

  const ordinaryAnniversary = civilDate019(
    observed.year,
    birth.month,
    birth.day,
  );
  // A month/day comparison first passes February 29 on March 1 of a non-leap year.
  const anniversary = ordinaryAnniversary ?? civilDate019(observed.year, 3, 1)!;
  const yearDifference = observed.year - birth.year;
  const anniversaryReached = observed.dayIndex >= anniversary.dayIndex;
  const yearStart = observed.dayIndex - observed.yearOffset;
  return {
    kind: "valid" as const,
    birth,
    observed,
    yearDifference,
    completedAge: yearDifference - (anniversaryReached ? 0 : 1),
    anniversary,
    anniversaryReached,
    anniversaryAdjusted: ordinaryAnniversary === null,
    yearStart,
    yearEnd: yearStart + 364 + (isLeap(observed.year) ? 1 : 0),
  };
}

export function calendarDayShare019(day: number, start: number, end: number) {
  return start === end ? 0.5 : (day - start) / (end - start);
}
