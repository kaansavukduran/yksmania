import { txt, type Lesson } from "../domain/model";
import { equationGuide, inequalityGuide } from "./guides/algebra";
export const algebraLessons: Lesson[] = [equationGuide, inequalityGuide].map(
  (guide) => ({
    id: guide.id,
    subjectId: "tyt-matematik",
    title: txt(
      guide.id === "birinci-dereceden-denklemler"
        ? "Birinci dereceden denklemler: eşitliği koru, çözümü doğrula"
        : "Basit eşitsizlikler: yön, sınır ve çözüm aralığı",
    ),
    minutes: guide.minutes,
    tags: [guide.id],
    source: txt(guide.source),
    objectives: guide.objectives.map(txt),
    body: guide.sections.map((section) => ({
      title: txt(section.title),
      text: txt(section.paragraphs.join("\n\n")),
    })),
    questions: [],
  }),
);
