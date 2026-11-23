import type { Draft } from "./model";

// Earlier builds stored the current question but did not store the set length.
// Revised lessons keep the original questions in order before the new ones.
const legacyPracticeSizes = new Map([
  ["bilimsel-gosterim-katsayi", 10],
  ["kesir-problemleri", 10],
  ["yas-problemleri", 10],
  ["yuzde-problemleri", 10],
  ["kar-zarar-problemleri", 10],
  ["faiz-problemleri", 10],
  ["karisim-problemleri", 10],
  ["sayi-problemleri", 10],
  ["oran-oranti", 10],
  ["koklu-sayilar", 10],
  ["tyt-mat-dogrusal-denklemler-kaynak-036", 42],
  ["tyt-mat-basit-esitsizlikler-kaynak-037", 45],
]);

export function draftQuestionCount(draft: Draft, available: number): number {
  const legacySize = legacyPracticeSizes.get(draft.lessonId);
  const openedSize =
    draft.questionCount ??
    (legacySize !== undefined && draft.index < legacySize ? legacySize : available);
  return Math.min(available, Math.max(openedSize, draft.index + 1, draft.responses.length));
}
