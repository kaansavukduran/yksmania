import { expect, it } from "vitest";
import { permutationId, repeatedPermutationId } from "../src/data/supplementalPermutationTopics032033";
import { pastExamReferences, officialBooklets } from "../src/domain/pastExams";
import { lessonById } from "../src/domain/content";
import { lessonTopic, studyTopics, workbookStudyTopics } from "../src/domain/studyPlan";
import { combinations032, separatedPermutations032 } from "../src/learning/separatedPermutationsSource032Model";
import { waypointPaths033 } from "../src/learning/waypointPathsSource033Model";
import { lessonGuides } from "../src/learning/guides";
import { builtInCheatSheets } from "../src/learning/cheatsheetContent";

it("appends the new learning records after all earlier topics", () => {
  expect(studyTopics.slice(0, 479)).toEqual(workbookStudyTopics);
  expect(studyTopics.slice(-2).map(({ id }) => id)).toEqual([`topic-${permutationId}`, `topic-${repeatedPermutationId}`]);
  expect(lessonTopic["tyt-mat-faktoriyel-kaynak-033"]).toBe("topic-tyt-mat-faktoriyel-kaynak-033");
  for (const id of [permutationId, repeatedPermutationId]) {
    const guide = lessonGuides.get(id)!;
    const sheet = builtInCheatSheets.get(lessonTopic[id])!;
    expect(lessonById(id)?.questions).toHaveLength(8);
    expect(guide.examples).toHaveLength(3);
    expect(guide.recall).toHaveLength(4);
    expect(sheet.lessonId).toBe(id);
    expect(sheet.examples.map(({ answer }) => answer)).toEqual(guide.examples.map(({ answer }) => answer));
    expect(sheet.sections).toHaveLength(5);
    const source = pastExamReferences.find((candidate) => candidate.topicIds.includes(lessonTopic[id]))!;
    expect(source.answer).toBe("C");
    const book = officialBooklets.find(({ id }) => id === source.bookletId)!;
    expect(source.answerPage).toBe(book.pages);
  }
});

it("keeps seating counts and limits for different rotation rules", () => {
  expect(combinations032(5, 3)).toBe(10);
  expect(separatedPermutations032(7, 3, "row")).toMatchObject({ separated: 1440, gaps: 5 });
  expect(separatedPermutations032(7, 3, "circle")).toMatchObject({ separated: 144, gaps: 4 });
  expect(separatedPermutations032(7, 3, "labelled-circle")).toMatchObject({ separated: 1008, seatsFactor: 7 });
  expect(separatedPermutations032(6, 2, "circle")).toMatchObject({ separated: 72, touching: 48, total: 120 });
  expect(separatedPermutations032(3, 3, "row").separated).toBe(0);
  expect(separatedPermutations032(1, 1, "circle")).toMatchObject({ separated: 1, singlePerson: true });
  expect(() => separatedPermutations032(4, 5, "row")).toThrow(RangeError);
});

it("uses the same model for each counted path and the drawn example", () => {
  const model = waypointPaths033({ x: 4, y: 3 }, { x: 2, y: 1 });
  expect(model.target).toMatchObject({ total: 35, via: 18, avoiding: 17 });
  for (const mode of ["via", "avoiding"] as const) {
    const path = model.sampleRoute(mode)!;
    expect(path).toHaveLength(8);
    expect(path.at(0)).toEqual({ x: 0, y: 0 });
    expect(path.at(-1)).toEqual({ x: 4, y: 3 });
    expect(path.some(({ x, y }) => x === 2 && y === 1)).toBe(mode === "via");
    expect(path.slice(1).every(({ x, y }, i) => {
      const previous = path[i];
      return x === previous.x + 1 && y === previous.y || x === previous.x && y === previous.y + 1;
    })).toBe(true);
  }
  const endpoint = waypointPaths033({ x: 4, y: 3 }, { x: 0, y: 0 });
  expect(endpoint.target).toMatchObject({ via: 35, avoiding: 0 });
  expect(endpoint.sampleRoute("avoiding")).toBeNull();
  expect(() => waypointPaths033({ x: 4, y: 3 }, { x: 5, y: 1 })).toThrow(RangeError);
});
