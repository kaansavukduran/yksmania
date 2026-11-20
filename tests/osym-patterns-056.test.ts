import { describe, expect, it } from "vitest";
import {
  bookletPlace,
  formShares,
  processedBooklets,
  processedYears,
  rowsForTopic,
  subjectHeatmap,
  topicYearCounts,
  unplacedGroups,
  type OsymRow,
} from "../src/domain/osymPatterns";

const row = (patch: Partial<OsymRow>): OsymRow => ({
  y: 2025,
  e: "TYT",
  test: "Fen Bilimleri",
  q: 1,
  subject: "tyt-fizik",
  a: "A",
  topic: "t1",
  topic2: null,
  topicNote: null,
  pattern: "Öncüllü yargı sorusu",
  skill: "Kavramı günlük olaya uygular.",
  trap: "Hız ile sürati karıştırmak.",
  form: "öncül",
  difficulty: 2,
  ...patch,
});

const rows: OsymRow[] = [
  row({ y: 2023, q: 2, topic: "t1" }),
  row({ y: 2025, q: 4, topic: "t2", topic2: "t1", form: "grafik" }),
  row({ y: 2025, q: 1, topic: "t1", form: "grafik" }),
  row({ y: 2024, q: 3, topic: "t2", form: "hesap" }),
  row({ y: 2024, q: 6, topic: null, topicNote: "birim çevirme" }),
  row({ y: 2025, q: 7, topic: null, topicNote: "birim çevirme" }),
  row({ y: 2025, e: "AYT", subject: "ayt-fizik", q: 1, topic: "a1" }),
];

describe("ÖSYM pattern rows", () => {
  it("lists only processed years per exam, oldest first", () => {
    expect(processedYears(rows, "TYT")).toEqual([2023, 2024, 2025]);
    expect(processedYears(rows, "AYT")).toEqual([2025]);
  });

  it("returns a topic's rows newest first and includes second-topic matches", () => {
    expect(rowsForTopic(rows, "t1").map((r) => `${r.y}:${r.q}`)).toEqual(["2025:1", "2025:4", "2023:2"]);
  });

  it("keeps zero years so 'not asked' is visible", () => {
    expect(topicYearCounts(rows, "t1", "TYT")).toEqual([
      { year: 2023, count: 1 },
      { year: 2024, count: 0 },
      { year: 2025, count: 2 },
    ]);
  });

  it("builds the subject heatmap in the given topic order", () => {
    const map = subjectHeatmap(rows, "tyt-fizik", [
      { id: "t1", title: "Bir" },
      { id: "t2", title: "İki" },
      { id: "t3", title: "Üç" },
    ]);
    expect(map.years).toEqual([2023, 2024, 2025]);
    expect(map.questions).toBe(6);
    expect(map.rows).toEqual([
      { id: "t1", title: "Bir", cells: [1, 0, 2], total: 3 },
      { id: "t2", title: "İki", cells: [0, 1, 1], total: 2 },
      { id: "t3", title: "Üç", cells: [0, 0, 0], total: 0 },
    ]);
  });

  it("groups questions the heading list could not place", () => {
    expect(unplacedGroups(rows, "tyt-fizik")).toEqual([{ note: "birim çevirme", count: 2, years: [2024, 2025] }]);
  });

  it("reports how questions were posed with whole percents", () => {
    expect(formShares(rows, "tyt-fizik")).toEqual([
      { form: "öncül", count: 3, percent: 50 },
      { form: "grafik", count: 2, percent: 33 },
      { form: "hesap", count: 1, percent: 17 },
    ]);
  });

  it("summarises processed booklets and names a question's place", () => {
    expect(processedBooklets(rows)).toEqual([
      { year: 2025, exam: "AYT", questions: 1 },
      { year: 2025, exam: "TYT", questions: 3 },
      { year: 2024, exam: "TYT", questions: 2 },
      { year: 2023, exam: "TYT", questions: 1 },
    ]);
    expect(bookletPlace(rows[0])).toBe("2023 TYT · Fen Bilimleri · 2. soru");
  });
});
