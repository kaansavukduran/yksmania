// Earlier releases stored the worked-example/recall tabs as ordinal positions.
// Adding teaching before those tabs must keep the learner on the same activity.
const legacySectionCounts: Readonly<Record<string, number>> = {
  "turev-teget": 11,
  paragraf: 7,
  "elektrik-alan": 8,
  "kimyasal-denge": 11,
  "dna-eslenmesi": 7,
  "bilimsel-gosterim-katsayi": 8,
  "kesir-problemleri": 8,
  "yas-problemleri": 8,
  "yuzde-problemleri": 8,
  "kar-zarar-problemleri": 8,
  "sayi-problemleri": 8,
  "oran-oranti": 9,
  "koklu-sayilar": 10,
  "tyt-mat-dogrusal-denklemler-kaynak-036": 27,
  "tyt-mat-basit-esitsizlikler-kaynak-037": 30,
  "tyt-mat-uslu-sayilar-kaynak-039": 34,
};

export function resolveGuideStep(
  id: string,
  storedStep: number,
  storedSectionCount: number,
  sectionCount: number,
) {
  if (!Number.isSafeInteger(sectionCount) || sectionCount < 1)
    throw new RangeError("GUIDE_SECTION_COUNT");
  const step = Number.isFinite(storedStep)
    ? Math.max(0, Math.trunc(storedStep))
    : 0;
  const previous =
    Number.isSafeInteger(storedSectionCount) && storedSectionCount > 0
      ? storedSectionCount
      : Object.hasOwn(legacySectionCounts, id)
        ? legacySectionCounts[id]
        : sectionCount;
  const mapped =
    previous < sectionCount && step >= previous
      ? sectionCount + Math.min(1, step - previous)
      : step;
  return Math.min(sectionCount + 1, mapped);
}
