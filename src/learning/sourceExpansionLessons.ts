import { txt, type Lesson } from "../domain/model";
import { shellsGuide } from "./guides/shells";
export const sourceExpansionLessons: Lesson[] = [
  {
    id: shellsGuide.id,
    subjectId: "tyt-kimya",
    title: txt("Katman elektron dizilimi: say, dağıt ve kontrol et"),
    minutes: shellsGuide.minutes,
    tags: ["katman-elektron-dizilimi"],
    source: txt(shellsGuide.source),
    objectives: shellsGuide.objectives.map(txt),
    body: shellsGuide.sections.map((section) => ({
      title: txt(section.title),
      text: txt(section.paragraphs.join("\n\n")),
    })),
    questions: [],
  },
];
