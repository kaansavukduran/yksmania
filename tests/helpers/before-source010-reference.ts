import type { PastExamReference } from "../../src/domain/pastExams";
import { beforeScientificQuestions } from "./before-scientific-revision";

const addedIds = new Set(
  Array.from({ length: 10 }, (_, index) => `f036-tyt-mat-dogrusal-denklemler-kaynak-036-${43 + index}`),
);
const newReferenceId = "2024-TYT-MAT-17";
const movedReferenceId = "2024-TYT-MAT-3";
const laterReferences = new Set([
  newReferenceId,
  "2023-TYT-MAT-4",
  "2026-TYT-MAT-2",
  "2026-TYT-MAT-18",
  "2023-TYT-MAT-3",
  "2023-TYT-MAT-26",
  "2026-TYT-MAT-21",
  "2026-TYT-MAT-19",
  "2013-ALES-ILKBAHAR-SAY1-20",
  "2013-ALES-ILKBAHAR-SAY1-18",
]);

export function beforeCurrentQuestionAdditions<T extends { id: string }>(questions: readonly T[]) {
  return beforeScientificQuestions(questions).filter(({ id }) => !addedIds.has(id));
}

export function beforeSource010References(references: readonly PastExamReference[]) {
  return references.filter(({ id }) => !laterReferences.has(id)).map((reference) => (
    reference.id === movedReferenceId && reference.topicIds.length === 1 && reference.topicIds[0] === "detail-206"
      ? { ...reference, topicIds: ["topic-tyt-mat-dogrusal-denklemler-kaynak-036"] }
      : reference
  ));
}

export function beforeSource010Cases<T>(cases: Record<string, T>) {
  return Object.entries(cases).filter(([id]) => !laterReferences.has(id));
}
