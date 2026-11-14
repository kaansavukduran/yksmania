import { lessonById, lessons } from "../domain/content";
import { lessonTopic, studyTopicById } from "../domain/studyPlan";
import { lessonGuides } from "./guides";
import { narrativeById } from "./narratives";
import { physicsCheatSheets } from "./physicsCheatSheets";

export interface CheatSection {
  title: string;
  text: string[];
  table?: { headers: string[]; rows: string[][] };
}
export interface CheatExample {
  title: string;
  prompt: string;
  passage?: string;
  steps: string[];
  answer: string;
}
export interface CheatSheet {
  topicId: string;
  lessonId?: string;
  title: string;
  subjectId: string;
  sections: CheatSection[];
  cautions: string[];
  examples: CheatExample[];
  recall: { prompt: string; answer: string }[];
  source: string;
}

// These are original application teaching texts, never unreviewed extracted book
// pages. A sheet is created only for an actually authored lesson or reviewed pack.
// New reviewed lessons join automatically; an outline row alone creates no content.
function lessonSheet(id: string): CheatSheet | undefined {
  const lesson = lessonById(id);
  if (!lesson || lesson.tags.includes("soru-seti")) return undefined;
  const topic = studyTopicById(lessonTopic[id]) ?? {
    id: `lesson:${lesson.id}`,
    title: lesson.title.tr,
    subjectId: lesson.subjectId,
  };
  const guide = lessonGuides.get(id),
    narrative = narrativeById.get(id);
  const firstQuestion = lesson.questions[0];
  const sections = guide
    ? guide.sections.map((section) => ({
        title: section.title,
        text: section.paragraphs.slice(0, 1),
        table: section.table,
      }))
    : lesson.body.map((section) => ({
        title: section.title.tr,
        text: [section.text.tr],
      }));
  const examples: CheatExample[] = guide
    ? guide.examples.slice(0, 2).map((example) => ({
        title: example.title,
        prompt: example.prompt,
        steps: example.steps.map((step) =>
          [step.label, step.expression, step.explanation]
            .filter(Boolean)
            .join(" · "),
        ),
        answer: example.answer + " " + example.check,
      }))
    : narrative
      ? narrative.cases.slice(0, 1).map((example) => ({
          title: example.name,
          prompt: example.question,
          steps: example.nodes.map((node) => node.label + ": " + node.detail),
          answer: example.conclusion,
        }))
      : firstQuestion
        ? [
            {
              title: "Kuralı uygula",
              passage: firstQuestion.passage?.tr,
              prompt: firstQuestion.prompt.tr,
              steps: [
                "Doğru sonuç: " +
                  firstQuestion.options[firstQuestion.answer].tr,
              ],
              answer: firstQuestion.explanation.tr,
            },
          ]
        : [];
  return {
    topicId: topic.id,
    lessonId: lesson.id,
    title: topic.title,
    subjectId: topic.subjectId,
    sections,
    cautions: guide
      ? [...new Set(guide.examples.map((example) => example.pitfall))]
      : narrative
        ? narrative.pitfalls.map(
            (pitfall) => pitfall.label + ": " + pitfall.reason,
          )
        : lesson.questions.slice(0, 3).map((question) => question.hint.tr),
    examples,
    recall:
      guide?.recall ??
      narrative?.recall ??
      (firstQuestion
        ? [
            {
              prompt: firstQuestion.passage?.tr
                ? firstQuestion.passage.tr + "\n\n" + firstQuestion.prompt.tr
                : firstQuestion.prompt.tr,
              answer:
                firstQuestion.options[firstQuestion.answer].tr +
                " " +
                firstQuestion.explanation.tr,
            },
          ]
        : []),
    source: guide?.source ?? narrative?.source ?? lesson.source.tr,
  };
}
export const builtInCheatSheets = new Map<string, CheatSheet>(
  [
    ...physicsCheatSheets,
    ...lessons
      .filter((lesson) => !lesson.tags.includes("soru-seti"))
      .map((lesson) => lessonSheet(lesson.id))
      .filter((sheet): sheet is CheatSheet => !!sheet),
  ].map((sheet) => [sheet.topicId, sheet]),
);
