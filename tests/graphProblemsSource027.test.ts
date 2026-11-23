import { createHash } from "node:crypto";
import { expect, it } from "vitest";
import { lessonById } from "../src/domain/content";
import { draftSchema, type Question } from "../src/domain/model";
import {
  officialBooklets,
  pastExamReferences,
  pastExamReferencesForTopic,
} from "../src/domain/pastExams";
import { questionContentIssues } from "../src/domain/questionContent";
import { questionGuidanceSchema } from "../src/domain/questionHelpModel";
import { draftQuestionCount } from "../src/domain/studyDraft";
import { lessonTopic } from "../src/domain/studyPlan";
import { builtInCheatSheets } from "../src/learning/cheatsheetContent";
import { sectionFigures } from "../src/learning/sectionFigures/registry";
import { lessonGuides } from "../src/learning/guides";
import { resolveGuideStep } from "../src/learning/guides/position";
import { examTeachingCases } from "../src/learning/pastExamCases";
import {
  helpPanels,
  previousHelpPanelCount,
  resolvedGuidance,
} from "../src/learning/questionHelp";

const id = "grafik-problemleri";
const topic = "detail-220";
const officialId = "2018-TYT-MAT-14";
const digest = (value: unknown) =>
  createHash("sha256").update(JSON.stringify(value)).digest("hex");
const view = (q: Question) => ({
  id: q.id,
  prompt: q.prompt.tr,
  passage: q.passage?.tr,
  options: q.options.map(({ tr }) => tr),
  answer: q.answer,
  explanation: q.explanation.tr,
  hint: q.hint.tr,
  guidance: q.guidance,
});

it("adds a distinct quick sheet after the original guide and preserves question help", () => {
  const guide = lessonGuides.get(id)!;
  const lesson = lessonById(id)!;
  const sheet = builtInCheatSheets.get(topic)!;
  expect(lessonTopic[id]).toBe(topic);
  expect(sheet.lessonId).toBe(id);
  expect(guide.sections).toHaveLength(15);
  expect(guide.examples).toHaveLength(6);
  expect(guide.recall).toHaveLength(7);
  expect(guide.source).toContain("içerik 5.1");
  expect(Object.keys(sectionFigures[id])).toEqual([
    "Sütunlar kategorileri aynı ölçekle karşılaştırır",
    "Dairede payın paydası bütünün toplamıdır",
    "Çizgi grafiğinde değişim ile değişim hızı ayrıdır",
    "Ortalama, ortanca ve tepe değerini ayrı hesapla",
  ]);
  for (const caption of Object.keys(sectionFigures[id])) {
    expect(
      guide.sections.slice(0, 8).some(({ title }) => title === caption),
    ).toBe(true);
  }
  expect(sheet.sections).toHaveLength(15);
  expect(
    sheet.sections.flatMap(({ table }) => (table ? [table.rows.length] : [])),
  ).toEqual([3, 3]);
  expect(sheet.sections[8].text[0]).toContain("ortalama değişimi");
  expect(sheet.sections[8].text).not.toEqual(guide.sections[8].paragraphs);
  expect(digest(guide.sections.slice(0, 8))).toBe(
    "de3832c06ef234ee2a6da733566dd870895e14706141661c6241e81a4d0004cf",
  );
  expect(digest(guide.examples.slice(0, 4))).toBe(
    "16e343cddb4e779dda3f3a623d175fc80378a5cdb882b690c4028e96c0eb0dd4",
  );
  expect(digest(guide.recall.slice(0, 4))).toBe(
    "5ed58fddc1aff6ced6b00ca0c3e1e799d4d807de6cadd78ee99bc2dbb5165903",
  );
  expect(digest(lesson.questions.slice(0, 10))).toBe(
    "53be77909fe2ffc6f455f74c45c1b88032449d52cff31d41cdf940dffe693971",
  );
  expect(
    digest(lesson.questions.slice(0, 10).map((q) => helpPanels(view(q)))),
  ).toBe("bd87b6506020092648e4987d45a123eec0be9203f78793836149fcc0ce7295d8");
  for (const q of lesson.questions.slice(0, 10)) {
    expect(previousHelpPanelCount(view(q)), q.id).toBe(1);
    expect(resolvedGuidance(view(q))?.optionReasons, q.id).toHaveLength(5);
  }

  expect(guide.examples.slice(4).map(({ answer }) => answer)).toEqual([
    "−2 L/saat, −2/7 L/saat ve 19 L.",
    "En az 20 olanların payı 1/3. Kesin ortalama belirlenemez.",
  ]);
  expect(JSON.stringify({ guide, lesson, sheet })).not.toMatch(
    /drive\.google\.com|1lCfhgo/,
  );
});

it("retains the previous practice length and worked and recall positions", () => {
  const saved = draftSchema.parse({
    lessonId: id,
    phase: "practice",
    index: 9,
    responses: [],
    selected: 4,
    checked: false,
    hint: false,
    confidence: "medium",
    note: "Eski çalışma notu",
    startedAt: 1,
  });
  expect(draftQuestionCount(saved, 16)).toBe(10);
  expect(draftQuestionCount({ ...saved, questionCount: 10 }, 16)).toBe(10);
  expect(draftQuestionCount({ ...saved, questionCount: 16 }, 16)).toBe(16);
  for (const savedCount of [0, 8]) {
    expect(resolveGuideStep(id, 7, savedCount, 15)).toBe(7);
    expect(resolveGuideStep(id, 8, savedCount, 15)).toBe(15);
    expect(resolveGuideStep(id, 9, savedCount, 15)).toBe(16);
  }
  expect(resolveGuideStep(id, 8, 15, 15)).toBe(8);
});

it("grades the six standalone cards and builds complete staged guidance", () => {
  const questions = lessonById(id)!.questions;
  expect(questions).toHaveLength(16);
  const additions = questions.slice(10);
  expect(additions.map((q) => [q.id, q.options[q.answer].tr])).toEqual([
    [
      "grafik-problemleri-027-es-olmayan-grafik-araliklari",
      "15/7 L/saat ve 36 L",
    ],
    ["grafik-problemleri-027-iki-daire-yeni-butun", "90 kişi ve 81°"],
    ["grafik-problemleri-027-histogram-esik-sinifin-icinde", "3 ve 7"],
    ["grafik-problemleri-027-ortak-uyelerin-kosullu-payi", "7/33"],
    ["grafik-problemleri-027-ayrik-olcum-ve-bilinmeyen-ara-deger", "I ve II"],
    ["grafik-problemleri-027-siki-ve-dahil-uc-kesisimi", "[3,4)"],
  ]);
  expect(new Set(additions.map(({ answer }) => answer)).size).toBe(5);
  for (const q of additions) {
    expect(questionContentIssues(q), q.id).toEqual([]);
    expect(new Set(q.options.map(({ tr }) => tr)).size, q.id).toBe(5);
    expect(
      questionGuidanceSchema.parse(q.guidance).optionReasons,
      q.id,
    ).toHaveLength(5);
    expect(resolvedGuidance(view(q)), q.id).toEqual(q.guidance);
    expect(previousHelpPanelCount(view(q)), q.id).toBeUndefined();
  }
});

it("links the exact 2018 TYT question and key without duplicating the booklet or any question", () => {
  const [ref] = pastExamReferencesForTopic(topic);
  expect(ref).toMatchObject({
    id: officialId,
    bookletId: "2018-tyt",
    test: "Temel Matematik",
    question: 14,
    page: 25,
    answerPage: 42,
    answer: "A",
  });
  expect(ref.answerSource).toBeUndefined();
  expect(
    pastExamReferences.filter(
      (other) =>
        other.bookletId === ref.bookletId &&
        other.test === ref.test &&
        other.question === ref.question,
    ),
  ).toEqual([ref]);
  const matches = officialBooklets.filter(({ id }) => id === ref.bookletId);
  expect(matches).toHaveLength(1);
  expect(matches[0]).toMatchObject({
    id: "2018-tyt",
    exam: "TYT",
    year: 2018,
    pages: 42,
    url: "https://dokuman.osym.gov.tr/pdfdokuman/2018/YKS/TYT_01072018.pdf",
    sha256: "e6ba4a863d26ecfb1461a2c65cca19bbc3c5c28b230b30fa0c5ac1f8c3df1d0b",
  });
  expect(ref.solution.at(-1)).toContain("yalnız I");
  expect(examTeachingCases[officialId].answer).toBe("3<x≤4 kg.");
  expect(
    pastExamReferences.find(({ id }) => id === "2026-TYT-MAT-22"),
  ).toMatchObject({
    question: 22,
    page: 31,
    answerPage: 45,
    answer: "A",
  });
  expect(
    pastExamReferences.find(({ id }) => id === "2026-TYT-MAT-24"),
  ).toMatchObject({
    question: 24,
    page: 31,
    answerPage: 45,
    answer: "C",
  });
});
