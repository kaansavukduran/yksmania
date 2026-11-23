import { txt, type Lesson } from "../../src/domain/model";
import type { CheatSheet } from "../../src/learning/cheatsheetContent";
import type { LessonGuide } from "../../src/learning/guides/types";
import { beforeSource031Questions, beforeSource031Teaching } from "./before-source031-math";

const scientificId = "bilimsel-gosterim-katsayi";
const originalSource =
  "Aurelia 014 Bilimsel Gösterim ve Katsayı, PDF s. 1–3; MEBİ TYT Matematik Konu Özeti basılı s. 39–41 (PDF 41–43) üs işlemleri temeli. Kitapta bağımsız bilimsel gösterim bölümü bulunduğu iddia edilmez. Açıklamalar ve sorular özgündür; resmî soru aktarımı değildir.";
const appendedQuestions = new Set(
  ["bolum", "sirala", "sinir", "birim", "iki-carpan", "onarim", "alt-sinir"].map(
    (key) => `${scientificId}-014-${key}`,
  ),
);
const appendedSections = new Set([
  "Birbirini izleyen büyütmeleri çarp",
  "Bir çözüm yolunu seçmeden önce koşulunu ara",
  "İlk bozulan eşitliği bulup yeniden dene",
]);
const appendedExamples = new Set([
  "Önce farkı, sonra bölümü hesapla",
  "İki boşluğu aynı üs tamamlar",
  "Hedef ölçeğe kaç basamak kaldığını bul",
]);
const appendedCautions = new Set([
  "Bölüm kuralını parantez içindeki iki terimin üslerine uygulamak.",
  "İlk boşluğa −3, ikinci boşluğa toplam üs 5 yazmak.",
  "Hedef 21 basamak küçük diye başlangıç değerinin zaten 3 basamak küçük olduğunu unutmak.",
]);
const appendedRecall = "İki büyütme art arda uygulanırsa toplam oran nasıl bulunur?";
const previousNormalization =
  "Çıkarmada da önce üsleri eşitle; sonuç katsayısı 1'in altına veya 10'un üstüne çıkarsa yeniden normalleştir.";
const currentNormalization =
  "Çıkarmada da önce üsleri eşitle. Sonuç sıfırdan farklıysa katsayının mutlak değeri 1’den küçük veya 10’a eşit ya da büyük olduğunda yeniden normalleştir.";

export const beforeScientificQuestions = <T extends { id: string }>(questions: readonly T[]) =>
  beforeSource031Questions(questions).filter(({ id }) => !appendedQuestions.has(id));

export function beforeScientificLesson(lesson: Lesson): Lesson {
  if (lesson.id !== scientificId) return beforeSource031Teaching("lessons", lesson.id, lesson) as Lesson;
  return {
    ...lesson,
    source: txt(originalSource),
    body: lesson.body.filter(({ title }) => !appendedSections.has(title.tr)).map((section) =>
      section.title.tr === "Toplama ve çıkarmada ortak ölçek kur"
        ? { ...section, text: txt(section.text.tr.replace(currentNormalization, previousNormalization)) }
        : section,
    ),
    questions: beforeScientificQuestions(lesson.questions),
  };
}

export function beforeScientificGuide(guide: LessonGuide): LessonGuide {
  if (guide.id !== scientificId) return beforeSource031Teaching("guides", guide.id, guide) as LessonGuide;
  return {
    ...guide,
    source: originalSource,
    sections: guide.sections.filter(({ title }) => !appendedSections.has(title)).map((section) =>
      section.title === "Toplama ve çıkarmada ortak ölçek kur"
        ? { ...section, paragraphs: section.paragraphs.map((paragraph) => paragraph.replace(currentNormalization, previousNormalization)) }
        : section,
    ),
    examples: guide.examples.filter(({ title }) => !appendedExamples.has(title)),
    recall: guide.recall.filter(({ prompt }) => prompt !== appendedRecall),
  };
}

export const beforeScientificGuideEntry = ([id, guide]: [string, LessonGuide]): [string, LessonGuide] =>
  [id, beforeScientificGuide(guide)];

// Reconstruct only the explicitly revised parts of one topic when checking a
// historical receipt. Other values still compare with their original hashes.
export function beforeScientificRevision(
  surface: "lessons" | "questions" | "guides" | "sheets",
  id: string,
  value: unknown,
): unknown {
  if (surface === "lessons" && id === scientificId) return beforeScientificLesson(value as Lesson);
  if (surface === "guides" && id === scientificId) return beforeScientificGuide(value as LessonGuide);
  if (surface === "sheets" && id === "detail-207") {
    const sheet = value as CheatSheet;
    return {
      ...sheet,
      source: originalSource,
      sections: sheet.sections.filter(({ title }) => !appendedSections.has(title)),
      cautions: sheet.cautions.filter((caution) => !appendedCautions.has(caution)),
      recall: sheet.recall.filter(({ prompt }) => prompt !== appendedRecall),
    };
  }
  return beforeSource031Teaching(surface, id, value);
}
