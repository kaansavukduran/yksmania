import { beforeScientificQuestions } from "./helpers/before-scientific-revision";
import { beforeLaterSourceRevisions } from "./helpers/before-source004-revision";
import { ebobEkokSource034Pack } from "../src/learning/ebobEkokSource034";
import { examTeachingCases } from "../src/learning/pastExamCases";
import { rationalSource035Pack } from "../src/learning/rationalSource035";
import { createHash } from "node:crypto";
import { expect, it } from "vitest";
import baseline from "./fixtures/source-stage-033-preservation.json";
import { lessons, lessonById } from "../src/domain/content";
import { lessonGuides } from "../src/learning/guides";
import { builtInCheatSheets } from "../src/learning/cheatsheetContent";
import {
  studyTopics,
  lessonTopic,
  setTopicCompletion,
  completionDates,
} from "../src/domain/studyPlan";
import { initialState } from "../src/domain/model";
import { validateState } from "../src/domain/storage";
import { xp } from "../src/domain/scheduler";
import { learningReviewPlan } from "../src/domain/learningReviews";
import { questionContentIssues } from "../src/domain/questionContent";
import { questionGuidanceSchema } from "../src/domain/questionHelpModel";
import {
  pastExamReferences,
  pastExamReferencesForTopic,
} from "../src/domain/pastExams";

const packs = [
  {
    id: "tyt-mat-ebob-ekok-kaynak-034",
    base: "ebob-ekok",
    sections: 29,
    worked: 24,
    recall: 18,
    questions: 46,
  },
  {
    id: "tyt-mat-rasyonel-kaynak-035",
    base: "rasyonel-sayilar",
    sections: 26,
    worked: 20,
    recall: 17,
    questions: 48,
  },
] as const;
const canonical = (value: unknown): unknown =>
  Array.isArray(value)
    ? value.map(canonical)
    : value && typeof value === "object"
      ? Object.fromEntries(
          Object.entries(value)
            .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
            .map(([key, item]) => [key, canonical(item)]),
        )
      : value;
const hash = (value: unknown) =>
  createHash("sha256")
    .update(JSON.stringify(canonical(value)))
    .digest("hex");

it("preserves every accepted 033 lesson, guide, summary, question value and their study order", () => {
  const maps = {
    lessons: new Map(lessons.map((l) => [l.id, l])),
    questions: new Map(
      lessons.flatMap((l) => l.questions).map((q) => [q.id, q]),
    ),
    guides: lessonGuides,
    sheets: builtInCheatSheets,
  };
  for (const type of ["lessons", "questions", "guides", "sheets"] as const)
    for (const [id, expected] of Object.entries(baseline[type])) {
      expect(maps[type].has(id), `${type}: ${id}`).toBe(true);
      expect(hash(beforeLaterSourceRevisions(type, id, maps[type].get(id))), `${type}: ${id}`).toBe(expected);
    }
  expect(lessons.slice(0, 529).map((l) => l.id)).toEqual(
    Object.keys(baseline.lessons),
  );
  expect(
    beforeScientificQuestions(lessons.flatMap((lesson) => lesson.questions)).slice(0, 6120)
      .map((q) => q.id),
  ).toEqual(Object.keys(baseline.questions));
  expect(studyTopics.slice(0, 494)).toEqual(baseline.studyTopics);
});

it("adds exactly two rich source companions and 94 fully guided self-contained cards", () => {
  expect(lessons).toHaveLength(546);
  expect(lessons.flatMap((l) => l.questions)).toHaveLength(6666);
  expect(lessonGuides.size).toBe(510);
  expect(builtInCheatSheets.size).toBe(510);
  expect(studyTopics).toHaveLength(510);
  expect(
    new Set(lessons.flatMap((l) => l.questions).map((q) => q.id)).size,
  ).toBe(6666);
  for (const pack of packs) {
    const lesson = lessonById(pack.id)!;
    const guide = lessonGuides.get(pack.id)!;
    const sheet = builtInCheatSheets.get(`topic-${pack.id}`)!;
    expect(lesson.subjectId).toBe("tyt-matematik");
    expect(guide.sections).toHaveLength(pack.sections);
    expect(guide.examples).toHaveLength(pack.worked);
    expect(guide.recall).toHaveLength(pack.recall);
    expect(lesson.questions).toHaveLength(pack.questions);
    expect(sheet.lessonId).toBe(pack.id);
    expect(sheet.sections).toHaveLength(12);
    expect(lessonTopic[pack.id]).toBe(`topic-${pack.id}`);
    for (const question of lesson.questions) {
      expect(questionContentIssues(question), question.id).toEqual([]);
      expect(question.options).toHaveLength(5);
      expect(
        new Set(question.options.map((option) => option.tr)).size,
        question.id,
      ).toBe(5);
      expect(
        questionGuidanceSchema.safeParse(question.guidance).success,
        question.id,
      ).toBe(true);
      expect(question.guidance?.optionReasons).toHaveLength(5);
    }
  }
});

for (const pack of packs)
  it(`${pack.id}: manual theory keeps old evidence independent and schedules days 3/7/21 without XP`, () => {
    const old = initialState();
    old.settings.examDate = "2027-05-25";
    old.notes[`lesson:${pack.base}`] = "Önceki notum ve tarihim korunur.";
    const topic = `topic-${pack.id}`;
    const saved = validateState(
      setTopicCompletion(old, topic, "theory", true, "2026-11-17"),
    );
    expect(saved.settings).toEqual(old.settings);
    expect(saved.notes).toEqual(old.notes);
    expect(saved.sessions).toEqual([]);
    expect(xp(saved)).toBe(0);
    expect(completionDates(saved, "questions").size).toBe(0);
    expect([...completionDates(saved, "theory").keys()]).toEqual([topic]);
    expect(lessonTopic[pack.base]).toBeDefined();
    expect(completionDates(saved, "theory").has(lessonTopic[pack.base])).toBe(
      false,
    );
    expect(
      learningReviewPlan(saved, "2026-11-17").map((review) => [
        review.stage,
        review.targetDate,
      ]),
    ).toEqual([
      [3, "2026-11-19"],
      [7, "2026-11-23"],
      [21, "2026-12-07"],
    ]);
    expect(old.topicProgress).toEqual({});
  });

it("links only the independently checked official item for each source companion", () => {
  expect(pastExamReferences).toHaveLength(41);
  expect(
    pastExamReferencesForTopic("topic-tyt-mat-rasyonel-kaynak-035").map(
      (ref) => ref.id,
    ),
  ).toEqual(["2021-TYT-MAT-1"]);
  expect(
    pastExamReferencesForTopic("topic-tyt-mat-ebob-ekok-kaynak-034").map(
      (ref) => ref.id,
    ),
  ).toEqual(["2021-TYT-MAT-15"]);
  expect(pastExamReferencesForTopic("unknown-topic")).toEqual([]);
  expect(pastExamReferencesForTopic()).toEqual([]);
  expect(pastExamReferences.slice(0, 10).at(-1)).toMatchObject({
    id: "2021-TYT-MAT-15",
    page: 30,
    answerPage: 45,
    answer: "A",
  });
  const pairs = [];
  for (let a = 1; a <= 9; a++)
    for (let b = 0; b <= 9; b++) {
      const aab = 110 * a + b,
        aba = 101 * a + 10 * b;
      if (
        aab % 9 === 0 &&
        aba % 9 === 0 &&
        ((aab % 5 === 0 && aba % 12 === 0) || (aba % 5 === 0 && aab % 12 === 0))
      )
        pairs.push([a, b]);
    }
  expect(pairs).toEqual([[2, 5]]);
  expect(pairs[0][0] + pairs[0][1]).toBe(7);
});

it("aligns repeating decimal tails before subtracting equations", () => {
  const section = rationalSource035Pack.sections.find(
    (item) => item.code === "S18",
  )!;
  expect(section.title).toBe("Önce tekrarlayan kuyrukları hizala");
  expect(section.paragraphs.join(" ")).toContain("x=0,1(6) olsun");
  expect(section.paragraphs.join(" ")).toContain("10x=1,(6), 100x=16,(6)");
  expect(section.paragraphs.join(" ")).toContain("90x=15");
  expect(section.paragraphs.join(" ")).toContain("x=1/6");
});
it("explains the compound-fraction distractor using both correctly evaluated groups", () => {
  const item = rationalSource035Pack.items[11];
  expect(item.prompt).toBe("(1−1/3)/(1+1/2) işlemi kaçtır?");
  const distractor = item.options.indexOf("1/3");
  expect(distractor).toBe(3);
  expect(item.optionReasons[distractor]).toContain("1−1/3=2/3");
  expect(item.optionReasons[distractor]).toContain("1+1/2=3/2");
  expect(item.optionReasons[distractor]).toContain("4/9");
});

it("keeps the own common-multiple example self-contained and distinct from the official answer letter", () => {
  const item = examTeachingCases["2021-TYT-MAT-15"];
  expect(item.prompt).toContain("200 ile 250");
  expect(item.prompt).toContain("240 ile 270");
  expect(item.prompt).toContain("9’a hem 5’e");
  expect(item.prompt).toContain("9’a hem 12’ye");
  const a = Array.from({ length: 51 }, (_, i) => i + 200).filter(
    (n) => n % 9 === 0 && n % 5 === 0,
  );
  const b = Array.from({ length: 31 }, (_, i) => i + 240).filter(
    (n) => n % 9 === 0 && n % 12 === 0,
  );
  expect(a).toEqual([225]);
  expect(b).toEqual([252]);
  expect(a[0] + b[0]).toBe(477);
  expect(item.answer).toContain("477");
  expect(pastExamReferences.slice(0, 10).at(-1)?.answer).toBe("A");
});

it("keeps reviewed EBOB symbols separated from the surrounding Turkish words in all guidance copies", () => {
  const text = JSON.stringify(ebobEkokSource034Pack);
  for (const broken of ["çözümündeA", "12 dk’lıkA", "hepsiB", "küçükA", "fakatA", "2³ve", "küçükx+y", "xyçarpımı", "xydeğerini", "5’tebaşlasa", "3²asal"])
    expect(text, broken).not.toContain(broken);
});
