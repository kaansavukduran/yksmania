import { createHash } from "node:crypto";
import type { Lesson } from "../../src/domain/model";
import type { LessonGuide } from "../../src/learning/guides/types";
import type { CheatSheet } from "../../src/learning/cheatsheetContent";
import pinned from "../fixtures/source011-teaching-preservation.json";

const lessonId = "tyt-mat-basit-esitsizlikler-kaynak-037";
const topicId = `topic-${lessonId}`;
const addedQuestionIds = new Set(
  Array.from({ length: 10 }, (_, i) => `f037-${lessonId}-${46 + i}`),
);

export function beforeSource011QuestionAdditions<T extends { id: string }>(questions: readonly T[]) {
  return questions.filter(({ id }) => !addedQuestionIds.has(id));
}

function canonical(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonical);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(Object.entries(value)
    .sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0)
    .map(([key, field]) => [key, canonical(field)]));
}

function exactPrefix<T>(values: T[], start: number, key: keyof typeof pinned.tails): T[] {
  const tail = JSON.stringify(canonical(values.slice(start)));
  return createHash("sha256").update(tail).digest("hex") === pinned.tails[key]
    ? values.slice(0, start) : values;
}

function priorSource(source: string): string {
  return source === pinned.sourceAfter ? pinned.sourceBefore : source;
}

export function beforeSource011TeachingRevision(
  surface: "lessons" | "questions" | "guides" | "sheets",
  id: string,
  value: unknown,
): unknown {
  if (surface === "lessons" && id === lessonId) {
    const lesson = value as Lesson;
    return {
      ...lesson,
      source: { ...lesson.source, tr: priorSource(lesson.source.tr) },
      objectives: exactPrefix(lesson.objectives, 3, "lessonObjectives"),
      questions: exactPrefix(lesson.questions, 45, "lessonQuestions"),
      body: exactPrefix(lesson.body, 30, "lessonBody"),
    };
  }
  if (surface === "guides" && id === lessonId) {
    const guide = value as LessonGuide;
    return {
      ...guide,
      source: priorSource(guide.source),
      objectives: exactPrefix(guide.objectives, 3, "guideObjectives"),
      examples: exactPrefix(guide.examples, 34, "guideExamples"),
      recall: exactPrefix(guide.recall, 22, "guideRecall"),
      sections: exactPrefix(guide.sections, 30, "guideSections"),
    };
  }
  if (surface === "sheets" && id === topicId) {
    const sheet = value as CheatSheet;
    return {
      ...sheet,
      source: priorSource(sheet.source),
      cautions: exactPrefix(sheet.cautions, 3, "sheetCautions"),
      examples: exactPrefix(sheet.examples, 3, "sheetExamples"),
      recall: exactPrefix(sheet.recall, 4, "sheetRecall"),
      sections: exactPrefix(sheet.sections, 12, "sheetSections"),
    };
  }
  return value;
}
