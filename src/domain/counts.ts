import curriculum from "../data/curriculum.json";
import { lessons } from "./content";

/**
 * One source for the counts shown in the interface, so the Today hero, the
 * course list and its scope note never drift apart.
 * - officialHeadings: main topic headings in the curriculum catalogue.
 * - readyLessons: built-in topic explanations (question sets excluded).
 * - originalQuestions: all built-in original questions.
 */
export const contentCounts = {
  officialHeadings: curriculum.length,
  readyLessons: lessons.filter((lesson) => !lesson.tags.includes("soru-seti")).length,
  originalQuestions: lessons.reduce((total, lesson) => total + lesson.questions.length, 0),
};
