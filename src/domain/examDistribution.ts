import { processedYears, type OsymExam, type OsymRow } from "./osymPatterns";

/*
 * "Gerçek sınavda dağılım": işlenmiş ÖSYM kitapçıklarından ders başına yıllık
 * soru sayısı ve en çok soru gelen resmî başlıklar. Yalnız işlenen yıllar
 * sayılır. Din kültürü yerine cevaplanabilen felsefe soruları (alt) ayrı
 * tutulur; ders sayısına eklenmez.
 */

const TEST_ORDER = ["Türkçe", "Sosyal Bilimler", "Temel Matematik", "Matematik", "Fen Bilimleri"];

export type TopHeading = { id: string; title: string; count: number };

export type DistributionRow = {
  subjectId: string;
  name: string;
  min: number;
  max: number;
  latest: number;
  top: TopHeading[];
  /** Hazır karma denemedeki soru sayısı; karşılaştırma yoksa undefined. */
  mock?: number;
  /** Deneme sayısı resmî en az–en çok aralığının dışında. */
  differs: boolean;
};

export type Distribution = {
  exam: OsymExam;
  years: number[];
  first: number;
  last: number;
  rows: DistributionRow[];
  totalLatest: number;
  totalMock?: number;
  altLatest: number;
  /** Herhangi bir derste deneme sayısı resmî aralığın dışında. */
  differs: boolean;
};

export function osymDistribution(
  rows: readonly OsymRow[],
  exam: OsymExam,
  subjects: readonly { id: string; name: string }[],
  headings: readonly { id: string; title: string }[],
  mockItems?: readonly { subjectId: string }[],
): Distribution | null {
  const years = processedYears(rows, exam);
  if (!years.length) return null;
  const last = years[years.length - 1],
    mine = rows.filter((r) => r.e === exam && !r.alt),
    titles = new Map(headings.map((h) => [h.id, h.title]));
  const mockCount = (id: string) => mockItems?.filter((i) => i.subjectId === id).length;
  // Dersler kitapçıktaki sırayla: önce test sırası, sonra ilk soru numarası.
  const firstPlace = (id: string) =>
    Math.min(
      ...mine
        .filter((r) => r.subject === id && r.y === last)
        .map((r) => {
          const test = TEST_ORDER.indexOf(r.test);
          return (test < 0 ? TEST_ORDER.length : test) * 1000 + r.q;
        }),
    );
  const table: DistributionRow[] = subjects
    .filter((s) => mine.some((r) => r.subject === s.id))
    .sort((a, b) => firstPlace(a.id) - firstPlace(b.id))
    .map((s) => {
      const subjectRows = mine.filter((r) => r.subject === s.id),
        perYear = years.map((y) => subjectRows.filter((r) => r.y === y).length),
        counts = new Map<string, number>();
      for (const r of subjectRows) if (r.c) counts.set(r.c, (counts.get(r.c) ?? 0) + 1);
      const top = [...counts.entries()]
        .filter(([id]) => titles.has(id))
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .slice(0, 3)
        .map(([id, count]) => ({ id, title: titles.get(id)!, count }));
      const min = Math.min(...perYear),
        max = Math.max(...perYear),
        mock = mockCount(s.id);
      return {
        subjectId: s.id,
        name: s.name,
        min,
        max,
        latest: perYear[perYear.length - 1],
        top,
        ...(mock === undefined ? {} : { mock }),
        differs: mock !== undefined && (mock < min || mock > max),
      };
    });
  return {
    exam,
    years,
    first: years[0],
    last,
    rows: table,
    totalLatest: table.reduce((sum, r) => sum + r.latest, 0),
    ...(mockItems ? { totalMock: mockItems.length } : {}),
    altLatest: rows.filter((r) => r.e === exam && r.alt && r.y === last).length,
    differs: table.some((r) => r.differs),
  };
}
