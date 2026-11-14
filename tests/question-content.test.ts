import { it, expect } from "vitest";
import { lessons, lessonById } from "../src/domain/content";
import { questionContentIssues } from "../src/domain/questionContent";
import { paragraphPassage, paragraphSentences } from "../src/data/reading";
import { visualCopy } from "../src/learning/copy";
import { txt } from "../src/domain/model";
it("all published questions include the external text they refer to; unnamed media cannot silently enter the bank", () => {
  for (const lesson of lessons)
    for (const question of lesson.questions)
      expect(
        questionContentIssues(question),
        `${lesson.id}/${question.id}`,
      ).toEqual([]);
});
it("detects the reported missing paragraph and rejects unrenderable figure references", () => {
  const question = lessonById("paragraf")!.questions[0];
  expect(
    questionContentIssues({
      ...question,
      passage: undefined,
      prompt: txt("Bu parçaya göre hangisi söylenemez?"),
      hint: txt("Kanıtı karşılaştır."),
    }),
  ).toContain("Atıf yapılan metin soruda yok");
  expect(
    questionContentIssues({
      ...question,
      passage: undefined,
      prompt: txt("Bir bütünü kaç parçaya ayırdın?"),
      hint: txt("Kesirleri karşılaştır."),
    }),
  ).toEqual([]);
  expect(questionContentIssues({ ...question, passage: undefined })).toContain(
    "Atıf yapılan metin soruda yok",
  );
  expect(questionContentIssues({ ...question, passage: txt(" ") })).toContain(
    "Boş soru metni",
  );
  expect(
    questionContentIssues({
      ...question,
      prompt: txt("Grafikteki eğim kaçtır?"),
    }),
  ).toContain("Atıf yapılan şekil/grafik/tablo için soru ortamı tanımlı değil");
});
it("all five reading items share the exact original passage and exploration, including the quoted qualifier", () => {
  const lesson = lessonById("paragraf")!;
  expect(lesson.questions).toHaveLength(5);
  for (const q of lesson.questions)
    expect(q.passage?.tr).toBe(paragraphPassage);
  expect(lesson.body[0].text.tr).toBe(paragraphPassage);
  for (const [i, sentence] of paragraphSentences.entries())
    expect(visualCopy[`sentence${i}`]).toBe(sentence);
  expect(paragraphPassage).toContain("bazen");
  expect(lesson.questions.map((q) => [q.id, q.answer])).toEqual([
    ["p1", 0],
    ["p2", 2],
    ["p3", 0],
    ["p4", 1],
    ["p5", 0],
  ]);
});
it("the secant question defines both points and inverse-square field calculation states its point-source assumption", () => {
  expect(lessonById("turev-teget")!.questions[0].prompt.tr).toContain(
    "A(2; 4) ve B(2,5; 6,25)",
  );
  expect(lessonById("elektrik-alan")!.questions[1].prompt.tr).toContain(
    "Noktasal bir yükün",
  );
});
