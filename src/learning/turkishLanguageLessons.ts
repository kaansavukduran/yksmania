import { txt, type Lesson } from "../domain/model";
import { soundGuide, structureGuide } from "./guides/turkishLanguage";
import { soundQuestions, structureQuestions } from "./turkishLanguageQuestions";
export const turkishLanguageLessons: Lesson[] = [
  {
    guide: soundGuide,
    title: "Ses bilgisi: sesi karşılaştır, olayı kanıtla",
    questions: soundQuestions,
  },
  {
    guide: structureGuide,
    title: "Sözcükte yapı: kökten anlama, adım adım",
    questions: structureQuestions,
  },
].map(({ guide, title, questions }) => ({
  id: guide.id,
  subjectId: "tyt-turkce",
  title: txt(title),
  minutes: guide.minutes,
  objectives: guide.objectives.map(txt),
  body: guide.sections.map((section) => ({
    title: txt(section.title),
    text: txt(section.paragraphs.join("\n\n")),
  })),
  source: txt(guide.source),
  tags: ["kaynakli-anlatim", "adim-adim", guide.id],
  questions,
}));
