import { forge024MathTopics } from "./forge024Math";
import { forge024PhysicsTopics } from "./forge024Physics";
import { forge024BiologyATopics } from "./forge024BiologyA";
import { forge024BiologyBTopics } from "./forge024BiologyB";
import { forge024ChemistryTopics } from "./forge024Chemistry";
import { forge024HumanitiesTopics } from "./forge024Humanities";
import { forge024TurkishTopics } from "./forge024Turkish";
import { forge023MathTopics } from "./forge023Math";
import { forge023PhysicsTopics } from "./forge023Physics";
import { forge023BiologyTopics } from "./forge023Biology";
import { forge023ChemistryTopics } from "./forge023Chemistry";
import { forge023HumanitiesATopics } from "./forge023HumanitiesA";
import { forge023HumanitiesBTopics } from "./forge023HumanitiesB";
import { forge023TurkishTopics } from "./forge023Turkish";
import { forge022MathTopics } from "./forge022Math";
import { forge022PhysicsTopics } from "./forge022Physics";
import { forge022BiologyTopics } from "./forge022Biology";
import { forge022ChemistryATopics } from "./forge022ChemistryA";
import { forge022ChemistryBTopics } from "./forge022ChemistryB";
import { forge022HumanitiesTopics } from "./forge022Humanities";
import { forge021GeometryTopics } from "./forge021Geometry";
import { forge021PhysicsTopics } from "./forge021Physics";
import { forge021BiologyATopics } from "./forge021BiologyA";
import { forge021BiologyBTopics } from "./forge021BiologyB";
import { forge021ChemistryTopics } from "./forge021Chemistry";
import { forge021HumanitiesTopics } from "./forge021Humanities";
import { forge021TurkishTopics } from "./forge021Turkish";
import { forge020BiologyTopics } from "./forge020Biology";
import { forge020ChemistryTopics } from "./forge020Chemistry";
import { forge020PhysicsTopics } from "./forge020Physics";
import { forge020GeographyTopics } from "./forge020Geography";
import { forge020HumanitiesTopics } from "./forge020Humanities";
import { forge019BiologyTopics } from "./forge019Biology";
import { forge019ChemistryTopics } from "./forge019Chemistry";
import { forge019PhysicsTopics } from "./forge019Physics";
import { forge019GeographyTopics } from "./forge019Geography";
import { forge019TurkishTopics } from "./forge019Turkish";
import { forge019MathTopics } from "./forge019Math";
import { forge018BiologyTopics } from "./forge018Biology";
import { forge018ChemistryTopics } from "./forge018Chemistry";
import { forge018PhysicsTopics } from "./forge018Physics";
import { forge018GeographyTopics } from "./forge018Geography";
import { forge018TurkishTopics } from "./forge018Turkish";
import { forge018MathTopics } from "./forge018Math";
import { forge017BiologyTopics } from "./forge017Biology";
import { forge017ChemistryATopics } from "./forge017ChemistryA";
import { forge017ChemistryBTopics } from "./forge017ChemistryB";
import { forge017GeographyTopics } from "./forge017Geography";
import { forge017PhysicsTopics } from "./forge017Physics";
import { forge017TurkishTopics } from "./forge017Turkish";
import { forge016BiologyATopics } from "./forge016BiologyA";
import { forge016BiologyBTopics } from "./forge016BiologyB";
import { forge016ChemistryTopics } from "./forge016Chemistry";
import { forge016GeographyTopics } from "./forge016Geography";
import { forge016PhysicsTopics } from "./forge016Physics";
import { forge016TurkishTopics } from "./forge016Turkish";
import { forge015MathTopics } from "./forge015Math";
import { forge015PhysicsTopics } from "./forge015Physics";
import { forge015ChemistryTopics } from "./forge015Chemistry";
import { forge015BiologyTopics } from "./forge015Biology";
import { forge015GeographyTopics } from "./forge015Geography";
import { forge015TurkishTopics } from "./forge015Turkish";
import { forge014MathTopics } from "./forge014Math";
import { forge014PhysicsTopics } from "./forge014Physics";
import { forge014ChemistryTopics } from "./forge014Chemistry";
import { forge014BiologyTopics } from "./forge014Biology";
import { forge014GeographyTopics } from "./forge014Geography";
import { forge014TurkishTopics } from "./forge014Turkish";
import { forge012MathTopics } from "./forge012Math";
import { forge012PhysicsTopics } from "./forge012Physics";
import { forge012ChemistryTopics } from "./forge012Chemistry";
import { forge012BiologyTopics } from "./forge012Biology";
import { forge012TurkishTopics } from "./forge012Turkish";
import { forge012HistoryTopics } from "./forge012History";
import { forge012TurkishCheatSheets } from "./forge012Turkish";
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

const completeSourceSheets = new Set([
  "turev-teget",
  "mol",
  "carpanlara-ayirma",
  "paragraf",
  "elektrik-alan",
  "kimyasal-denge",
  "dna-eslenmesi",
  ...Object.keys(forge024MathTopics),
  ...Object.keys(forge024PhysicsTopics),
  ...Object.keys(forge024BiologyATopics),
  ...Object.keys(forge024BiologyBTopics),
  ...Object.keys(forge024ChemistryTopics),
  ...Object.keys(forge024HumanitiesTopics),
  ...Object.keys(forge024TurkishTopics),
  ...Object.keys(forge023MathTopics),
  ...Object.keys(forge023PhysicsTopics),
  ...Object.keys(forge023BiologyTopics),
  ...Object.keys(forge023ChemistryTopics),
  ...Object.keys(forge023HumanitiesATopics),
  ...Object.keys(forge023HumanitiesBTopics),
  ...Object.keys(forge023TurkishTopics),
  ...Object.keys(forge022MathTopics),
  ...Object.keys(forge022PhysicsTopics),
  ...Object.keys(forge022BiologyTopics),
  ...Object.keys(forge022ChemistryATopics),
  ...Object.keys(forge022ChemistryBTopics),
  ...Object.keys(forge022HumanitiesTopics),
  ...Object.keys(forge021GeometryTopics),
  ...Object.keys(forge021PhysicsTopics),
  ...Object.keys(forge021BiologyATopics),
  ...Object.keys(forge021BiologyBTopics),
  ...Object.keys(forge021ChemistryTopics),
  ...Object.keys(forge021HumanitiesTopics),
  ...Object.keys(forge021TurkishTopics),
  ...Object.keys(forge020BiologyTopics),
  ...Object.keys(forge020ChemistryTopics),
  ...Object.keys(forge020PhysicsTopics),
  ...Object.keys(forge020GeographyTopics),
  ...Object.keys(forge020HumanitiesTopics),
  ...Object.keys(forge019BiologyTopics),
  ...Object.keys(forge019ChemistryTopics),
  ...Object.keys(forge019PhysicsTopics),
  ...Object.keys(forge019GeographyTopics),
  ...Object.keys(forge019TurkishTopics),
  ...Object.keys(forge019MathTopics),
  ...Object.keys(forge018BiologyTopics),
  ...Object.keys(forge018ChemistryTopics),
  ...Object.keys(forge018PhysicsTopics),
  ...Object.keys(forge018GeographyTopics),
  ...Object.keys(forge018TurkishTopics),
  ...Object.keys(forge018MathTopics),
  ...Object.keys(forge017BiologyTopics),
  ...Object.keys(forge017ChemistryATopics),
  ...Object.keys(forge017ChemistryBTopics),
  ...Object.keys(forge017GeographyTopics),
  ...Object.keys(forge017PhysicsTopics),
  ...Object.keys(forge017TurkishTopics),
  ...Object.keys(forge016BiologyATopics),
  ...Object.keys(forge016BiologyBTopics),
  ...Object.keys(forge016ChemistryTopics),
  ...Object.keys(forge016GeographyTopics),
  ...Object.keys(forge016PhysicsTopics),
  ...Object.keys(forge016TurkishTopics),
  ...Object.keys(forge015MathTopics),
  ...Object.keys(forge015PhysicsTopics),
  ...Object.keys(forge015ChemistryTopics),
  ...Object.keys(forge015BiologyTopics),
  ...Object.keys(forge015GeographyTopics),
  ...Object.keys(forge015TurkishTopics),
  ...Object.keys(forge014MathTopics),
  ...Object.keys(forge014PhysicsTopics),
  ...Object.keys(forge014ChemistryTopics),
  ...Object.keys(forge014BiologyTopics),
  ...Object.keys(forge014GeographyTopics),
  ...Object.keys(forge014TurkishTopics),
  ...Object.keys(forge012MathTopics),
  ...Object.keys(forge012PhysicsTopics),
  ...Object.keys(forge012ChemistryTopics),
  ...Object.keys(forge012BiologyTopics),
  ...Object.keys(forge012TurkishTopics),
  ...Object.keys(forge012HistoryTopics),
]);

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
    narrative = narrativeById.get(id),
    reviewed = physicsCheatSheets.find((sheet) => sheet.topicId === topic.id);
  const firstQuestion = lesson.questions[0];
  const complete = completeSourceSheets.has(id);
  const sections = guide
    ? guide.sections.map((section) => ({
        title: section.title,
        text: complete ? section.paragraphs : section.paragraphs.slice(0, 1),
        table: section.table,
      }))
    : lesson.body.map((section) => ({
        title: section.title.tr,
        text: [section.text.tr],
      }));
  const examples: CheatExample[] = guide
    ? (complete ? guide.examples : guide.examples.slice(0, 2)).map(
        (example) => ({
          title: example.title,
          prompt: example.prompt,
          steps: example.steps.map((step) =>
            [step.label, step.expression, step.explanation]
              .filter(Boolean)
              .join(" · "),
          ),
          answer: example.answer + " " + example.check,
        }),
      )
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
  const sheet: CheatSheet = {
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
  if (!reviewed) return sheet;
  // An expanded lesson supplements the already reviewed sheet for this topic.
  // Preserve its examples and cautions instead of replacing them in the map.
  return {
    ...sheet,
    sections: [...reviewed.sections, ...sheet.sections],
    examples: [...reviewed.examples, ...sheet.examples],
    cautions: [...new Set([...reviewed.cautions, ...sheet.cautions])],
    recall: [...reviewed.recall, ...sheet.recall],
    source: reviewed.source + " " + sheet.source,
  };
}
export const builtInCheatSheets = new Map<string, CheatSheet>(
  [
    ...physicsCheatSheets,
    ...lessons
      .filter((lesson) => !lesson.tags.includes("soru-seti"))
      .map((lesson) => lessonSheet(lesson.id))
      .filter((sheet): sheet is CheatSheet => !!sheet),
    ...forge012TurkishCheatSheets,
  ].map((sheet) => [sheet.topicId, sheet]),
);
