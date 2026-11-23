import { createHash } from "node:crypto";
import type { Lesson } from "../../src/domain/model";
import type { LessonGuide } from "../../src/learning/guides/types";
import type { CheatSheet } from "../../src/learning/cheatsheetContent";

const pinned = {
  "sourceBefore": "Aurelia TYT Birinci Dereceden Denklemler kopya kağıdı, 07.11.2026/içerik 1.0: güncel 9 sayfalık sürüm 17.11.2026’da yeniden okundu; özgün öğretim uyarlaması. Kaynaktaki 2024 TYT 3 için verilen sabit artış/241→81 atfı gerçek resmî kitapçıkla uyuşmadığından doğru katlanma ayrımıyla düzeltildi. Seçili 2024 TYT Temel Matematik 3: gerçek kitapçık PDF 24/basılı 22, anahtar 43, A=3×2¹⁰=3072. Resmî şekil yeniden basılmaz; açıklama özgündür. Soru: https://dokuman.osym.gov.tr/pdfdokuman/2024/YKS/TSK/yks_tyt_2024_kitapcik_T24kt.pdf#page=24 ; anahtar: https://dokuman.osym.gov.tr/pdfdokuman/2024/YKS/TSK/yks_tyt_2024_kitapcik_T24kt.pdf#page=43 . Bu seçili doğrulama bütün ÖSYM arşivi, bütün MEB kitapları veya 2027 resmî kapsamının kapanışı değildir.",
  "sourceAfter": "Aurelia TYT Birinci Dereceden Denklemler kopya kağıdı, 19 Kasım 2026. Format V5, içerik 1.3 ve 18 fiziksel sayfanın öğretim uyarlaması. Sistem kavramı ve yöntemleri MEB OGM Matematik 9, Ünite 3 basılı 129–132 / HTML 51–54 ile karşılaştırıldı. 2024 TYT Temel Matematik 17’nin fiziksel PDF sayfası 29, basılı sayfası 27 ve anahtarı 43. C seçeneği 40 dakikadır. Bu bölümün çözüm açıklaması özgün öğretim anlatımıdır. Kaynakta ÖSYM arşiv taraması kısmi olarak kayıtlıdır.",
  "scopeBefore": "Sadece “en büyük kuvvet 1” demek her görünen ifadeyi doğrudan doğrusal yapmaz; değişkenin paydada olması ayrıca tanım koşulu gerektirir. İki bilinmeyenli sistemler, mutlak değer ve ikinci derece denklemler bu ünitenin ana kapsamı değildir. Sadeleşerek doğrusal koşula inen kesirli örneklerde baştaki yasak değer saklanır.",
  "scopeAfter": "Sadece “en büyük kuvvet 1” demek her görünen ifadeyi doğrudan doğrusal yapmaz; değişkenin paydada olması ayrıca tanım koşulu gerektirir. İki bilinmeyenli doğrusal sistemleri bu rehberin devamında göreceksin. Mutlak değer ve ikinci derece denklemler kendi konu anlatımlarındadır. Sadeleşerek doğrusal koşula inen kesirli örneklerde baştaki yasak değer saklanır.",
  "guidePattern": {
    "previous": "2024 TYT Temel Matematik 3’ün resmî şeklinde her yeni katmanda mandal sayısı iki katına çıkar; ilk üç katmanın toplamı 1+2+4=7’dir. İstenen 12. adıma kadarki toplam ile 10. adıma kadarki toplamın farkıdır: yalnız 11. ve 12. katman kalır, 2¹⁰+2¹¹=3×2¹⁰=3072. Bu seçili karşılaştırma üslü örüntü sınırını gösterir; önceki 1,+3,241 alıştırması bu resmî sorunun özeti veya resmî çözümü değildir.",
    "proposed": "2024 TYT Temel Matematik 17’de 30 günlük yürüyüş süresi 2. günden 15. güne kadar her gün 1 dakika artar. 16. günden başlayarak her gün 1 dakika azalır. İlk gün x dakikaysa 15. gün x+14, 16. gün x+13, 30. gün x−1 olur. İlk 15 günün toplamı 15x+105, son 15 gününki 15x+90’dır. 30x+195=1395 denklemi x=40 dakika verir. İlk 15 gün 705, son 15 gün 690 dakika eder. Tepe süresini yalnız 15. günde say."
  },
  "sheetPattern": {
    "previous": "Özgün ilk 1, +3 artış, hedef 241 → n=81. İlk 2 olsaydı n=242/3, pozitif tam sayı adımı yok. Katlanmalı 1,2,4 modeli bu doğrusal örnekten farklıdır; 2024 TYT 3 atfıyla karıştırma.",
    "proposed": "Özgün ilk 1, +3 artış, hedef 241 → n=81. İlk 2 olsaydı n=242/3, pozitif tam sayı adımı yok. 2024 TYT 17’de ilk gün x, 15. gün x+14, 16. gün x+13. İki 15 günlük toplamı birleştir: (15x+105)+(15x+90)=1395, x=40 dakika."
  },
  "tails": {
    "lessonObjectives": "87845ced5493c1296ce30d44328611241f1d4e4ec74f2943fdcb774bc614e688",
    "lessonQuestions": "4593f109b95f7412820fce0826e74cc514e692269c857877ffbc2048a6948b28",
    "lessonBody": "460af9ad1a5af9ad5d8e55e53affce69330940cceacb2e766e87c70d48688e17",
    "guideObjectives": "9ee8d4be2053d8f67589a908bc94fdfc9f81f4fd5bdf6839405d442891fc4a42",
    "guideExamples": "15c5f4f9377b4b0f7dee52a2e8a62cdf146a786b783f6db458566800c58af017",
    "guideRecall": "25274b313f48fd419b41882aacb969fdc462c94b1549031016dd7705ee482160",
    "guideSections": "83fa5af6808a8b96e66a9554085744e8b28713956ba419e3b007279b6724c472",
    "sheetExamples": "7972dfdfab639562029e2d5b67e46023c8dfbed80e38f51209d43565b06b8b9f",
    "sheetRecall": "4a743c92bec0e03de34de97bd2b6263f6bca37e5f0756ca4ff3dbedc49159813",
    "sheetSections": "5e993f285dd18e4cde7d25040de89bae9aaf428d37aae5fd2eb818345c837d6f"
  }
};
const lessonId = "tyt-mat-dogrusal-denklemler-kaynak-036";
const topicId = `topic-${lessonId}`;

function stable(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(stable);
  if (value === null || typeof value !== "object") return value;
  const entries = Object.entries(value).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0);
  return Object.fromEntries(entries.map(([key, entry]) => [key, stable(entry)]));
}

function exactTail<T>(values: T[], start: number, sha: string): T[] {
  const suffix = values.slice(start);
  const actual = createHash("sha256").update(JSON.stringify(stable(suffix))).digest("hex");
  return actual === sha ? values.slice(0, start) : values;
}

function priorLine(current: string, revised: string, previous: string) {
  return current === revised ? previous : current;
}

function oldGuideParagraphs(title: string, paragraphs: string[]) {
  return paragraphs.map((line, i) => {
    if (i !== 1) return line;
    if (title === "Çözümün beş duraklı düzeni")
      return priorLine(line, pinned.scopeAfter, pinned.scopeBefore);
    if (title === "Sabit artış ile katlanmayı karıştırma")
      return priorLine(line, pinned.guidePattern.proposed, pinned.guidePattern.previous);
    return line;
  });
}

export function beforeSource010TeachingRevision(
  surface: "lessons" | "questions" | "guides" | "sheets",
  id: string,
  value: unknown,
): unknown {
  if (surface === "lessons" && id === lessonId) {
    const lesson = value as Lesson;
    return {
      ...lesson,
      source: { ...lesson.source, tr: priorLine(lesson.source.tr, pinned.sourceAfter, pinned.sourceBefore) },
      objectives: exactTail(lesson.objectives, 3, pinned.tails.lessonObjectives),
      questions: exactTail(lesson.questions, 42, pinned.tails.lessonQuestions),
      body: exactTail(lesson.body, 27, pinned.tails.lessonBody).map((section) => ({
        ...section,
        text: { ...section.text, tr: oldGuideParagraphs(section.title.tr, section.text.tr.split("\n\n")).join("\n\n") },
      })),
    };
  }
  if (surface === "guides" && id === lessonId) {
    const guide = value as LessonGuide;
    return {
      ...guide,
      source: priorLine(guide.source, pinned.sourceAfter, pinned.sourceBefore),
      objectives: exactTail(guide.objectives, 3, pinned.tails.guideObjectives),
      examples: exactTail(guide.examples, 26, pinned.tails.guideExamples),
      recall: exactTail(guide.recall, 18, pinned.tails.guideRecall),
      sections: exactTail(guide.sections, 27, pinned.tails.guideSections).map((section) => ({
        ...section,
        paragraphs: oldGuideParagraphs(section.title, section.paragraphs),
      })),
    };
  }
  if (surface === "sheets" && id === topicId) {
    const sheet = value as CheatSheet;
    return {
      ...sheet,
      source: priorLine(sheet.source, pinned.sourceAfter, pinned.sourceBefore),
      examples: exactTail(sheet.examples, 2, pinned.tails.sheetExamples),
      recall: exactTail(sheet.recall, 4, pinned.tails.sheetRecall),
      sections: exactTail(sheet.sections, 10, pinned.tails.sheetSections).map((section) => section.title === "Sabit artışın başlangıcı"
        ? { ...section, text: section.text.map((line, i) => i === 1
          ? priorLine(line, pinned.sheetPattern.proposed, pinned.sheetPattern.previous)
          : line) }
        : section),
    };
  }
  return value;
}
