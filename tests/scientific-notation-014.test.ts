import { expect, it } from "vitest";
import { lessonById } from "../src/domain/content";
import { officialBooklets, pastExamReferencesForTopic } from "../src/domain/pastExams";
import { questionContentIssues } from "../src/domain/questionContent";
import { questionGuidanceSchema } from "../src/domain/questionHelpModel";
import { lessonTopic } from "../src/domain/studyPlan";
import { builtInCheatSheets } from "../src/learning/cheatsheetContent";
import { lessonGuides } from "../src/learning/guides";
import { resolveGuideStep } from "../src/learning/guides/position";
import { examTeachingCases } from "../src/learning/pastExamCases";
import { sectionFigures } from "../src/learning/sectionFigures/registry";

const id = "bilimsel-gosterim-katsayi";
const topicId = "detail-207";

it("extends the existing Scientific Notation topic and preserves saved guide positions", () => {
  const guide = lessonGuides.get(id)!;
  const sheet = builtInCheatSheets.get(topicId)!;
  expect(lessonTopic[id]).toBe(topicId);
  expect(guide.sections).toHaveLength(11);
  expect(guide.examples).toHaveLength(8);
  expect(guide.recall).toHaveLength(6);
  expect(guide.source).toContain("içerik 1.1, PDF s. 1–10");
  expect(sheet.lessonId).toBe(id);
  expect(sheet.sections.find(({ table }) => table?.headers.includes("Geçerli yol"))?.table?.rows).toHaveLength(6);
  for (const storedCount of [0, 8]) {
    expect(resolveGuideStep(id, 3, storedCount, 11)).toBe(3);
    expect(resolveGuideStep(id, 8, storedCount, 11)).toBe(11);
    expect(resolveGuideStep(id, 9, storedCount, 11)).toBe(12);
  }
  expect(resolveGuideStep(id, 8, 11, 11)).toBe(8);
});

it("recomputes seven new practice keys and checks each fully explained card", () => {
  const lesson = lessonById(id)!;
  const quotient = (640000 * 1000) / 2;
  const totalBytes = 50000n * 200000n;
  const powersOfTen = totalBytes.toString().length - 1;
  expect(totalBytes).toBe(10n ** BigInt(powersOfTen));
  expect(powersOfTen).toBe(10);
  const quantities = [
    { label: "A", units: 50 },
    { label: "B", units: 8 },
    { label: "C", units: 160 },
  ];
  const answers = {
    bolum: `${(quotient / 100000000).toLocaleString("tr-TR")}×10⁸`,
    sirala: quantities.sort((a, b) => a.units - b.units).map(({ label }) => label).join(" < "),
    sinir: "1×10¹⁰ bayt",
    birim: `${(540000 + 28000) / 1000} m`,
    "iki-carpan": `${(48 * 5 * 20 / 10000).toLocaleString("tr-TR")} mm`,
    onarim: `4×10⁴ = 0,4×10⁵ yaz. Sonuçlar ${((200000 + 40000) / 100000).toLocaleString("tr-TR")}×10⁵ ve ${((300000 + 70000) / 100000).toLocaleString("tr-TR")}×10⁵.`,
    "alt-sinir": "1×10⁻⁴ m",
  };
  expect(lesson.questions.slice(0, 10).map((item) => item.id)).toEqual(
    Array.from({ length: 10 }, (_, i) => `${id}-093-${i + 1}`),
  );
  expect(lesson.questions.slice(10).map((item) => item.id)).toEqual(
    Object.keys(answers).map((key) => `${id}-014-${key}`),
  );
  for (const [key, expected] of Object.entries(answers)) {
    const question = lesson.questions.find((item) => item.id === `${id}-014-${key}`)!;
    expect(questionContentIssues(question), question.id).toEqual([]);
    expect(question.options.map(({ tr }) => tr).filter((option) => option === expected), question.id).toHaveLength(1);
    expect(question.options[question.answer].tr, question.id).toBe(expected);
    expect(questionGuidanceSchema.parse(question.guidance).optionReasons).toHaveLength(5);
  }
});

it("calculates the two scaled lengths across the figure range and binds the distinct official reference", () => {
  const fig = sectionFigures[id]["Birbirini izleyen büyütmeleri çarp"];
  for (const second of [1, 25, 40]) {
    const result = fig.draw(second, 0);
    const length = (0.0032 * 5 * second).toLocaleString("tr-TR", { maximumFractionDigits: 4 });
    expect(result.readout?.[0]).toBe(`Toplam büyütme 5 × ${second} = ${5 * second} kat.`);
    expect(result.readout?.[1]).toBe(`0,0032 mm → 0,016 mm → ${length} mm`);
    expect(result.els).toContainEqual(expect.objectContaining({ k: "text", s: `${length} mm` }));
  }
  const [reference] = pastExamReferencesForTopic(topicId);
  expect(reference).toMatchObject({ id: "2021-TYT-MAT-3", question: 3, page: 26, answerPage: 45, answer: "D" });
  expect(officialBooklets.find(({ id }) => id === reference.bookletId)?.sha256).toBe("c9220ca9ffdee89ba220bf3cdd3f34ce02f8c0e2b1a3a20b42d7ff810f73d95b");
  expect(125 * 4 * 40 / 10000).toBe(2);
  expect(examTeachingCases[reference.id].answer).toBe("0,48 mm.");
});
