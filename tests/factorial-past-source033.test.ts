import { expect, it } from "vitest";
import baseline from "./fixtures/source-stage-032-past-exams.json";
import { pastExamReferences, officialBooklets } from "../src/domain/pastExams";
import { examTeachingCases } from "../src/learning/pastExamCases";
import { lessonById } from "../src/domain/content";
import { lessonTopic } from "../src/domain/studyPlan";
it("preserves all eight accepted references/teaching variants while adding actual2021Mat5source linkage", () => {
  expect(pastExamReferences.slice(0, 8)).toEqual(baseline.pastExamReferences);
  for (const [id, item] of Object.entries(baseline.examTeachingCases))
    expect(examTeachingCases[id]).toEqual(item);
  expect(pastExamReferences).toHaveLength(17);
  expect(Object.keys(examTeachingCases)).toHaveLength(17);
  const ref = pastExamReferences.find((r) => r.id === "2021-TYT-MAT-5")!;
  expect(ref).toMatchObject({
    bookletId: "2021-tyt",
    test: "Temel Matematik",
    question: 5,
    page: 27,
    answerPage: 45,
    answer: "C",
  });
  expect(ref.topicIds).toEqual([
    lessonTopic.faktoriyel,
    lessonTopic["tyt-mat-faktoriyel-kaynak-033"],
  ]);
  const booklet = officialBooklets.find((b) => b.id === ref.bookletId)!;
  expect(booklet.url).toBe(
    "https://dokuman.osym.gov.tr/pdfdokuman/2021/YKS/TSK/tyt_yks_2021.pdf",
  );
  expect(booklet.pages).toBe(45);
  expect(booklet.sha256).toBe(
    "c9220ca9ffdee89ba220bf3cdd3f34ce02f8c0e2b1a3a20b42d7ff810f73d95b",
  );
});
it("keeps the official C answer distinct from the shuffled original practice and an unscored teaching variant", () => {
  const lesson = lessonById("tyt-mat-faktoriyel-kaynak-033")!,
    q = lesson.questions[28];
  expect(q.options[q.answer].tr).toBe("14!/10!");
  const own = examTeachingCases["2021-TYT-MAT-5"];
  expect(own.steps).toHaveLength(3);
  expect(own.answer).toBe("14!/10! = 24.024 salon.");
  expect(own.prompt).toContain("Bir sayma modelinde");
  expect(own.pitfall).toContain("kaynak sorunun C anahtarı");
  expect(11 * 12 * 13 * 2 * 7).toBe(24024);
  expect(14 * 13 * 12 * 11).toBe(24024);
});
