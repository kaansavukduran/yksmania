import {
  forge026MathGuides,
  forge026MathLessons,
  forge026MathTopics,
} from "./forge026Math";
import {
  forge026PhysicsGuides,
  forge026PhysicsLessons,
  forge026PhysicsTopics,
} from "./forge026Physics";
import {
  forge026ChemistryGuides,
  forge026ChemistryLessons,
  forge026ChemistryTopics,
} from "./forge026Chemistry";
import {
  forge026BiologyAGuides,
  forge026BiologyALessons,
  forge026BiologyATopics,
} from "./forge026BiologyA";
import {
  forge026BiologyBGuides,
  forge026BiologyBLessons,
  forge026BiologyBTopics,
} from "./forge026BiologyB";
import {
  forge026BiologyCGuides,
  forge026BiologyCLessons,
  forge026BiologyCTopics,
} from "./forge026BiologyC";
import {
  forge026HistoryGuides,
  forge026HistoryLessons,
  forge026HistoryTopics,
} from "./forge026History";
import {
  forge026HistoryBGuides,
  forge026HistoryBLessons,
  forge026HistoryBTopics,
} from "./forge026HistoryB";
// These packs deepen existing theory; their added lessons are question sets.
// Keep the original teaching records and source modules unchanged.
export const legacy026Packs = [
  {
    family: "Math",
    guides: forge026MathGuides,
    questions: forge026MathLessons,
    topics: forge026MathTopics,
  },
  {
    family: "Physics",
    guides: forge026PhysicsGuides,
    questions: forge026PhysicsLessons,
    topics: forge026PhysicsTopics,
  },
  {
    family: "Chemistry",
    guides: forge026ChemistryGuides,
    questions: forge026ChemistryLessons,
    topics: forge026ChemistryTopics,
  },
  {
    family: "BiologyA",
    guides: forge026BiologyAGuides,
    questions: forge026BiologyALessons,
    topics: forge026BiologyATopics,
  },
  {
    family: "BiologyB",
    guides: forge026BiologyBGuides,
    questions: forge026BiologyBLessons,
    topics: forge026BiologyBTopics,
  },
  {
    family: "BiologyC",
    guides: forge026BiologyCGuides,
    questions: forge026BiologyCLessons,
    topics: forge026BiologyCTopics,
  },
  {
    family: "History",
    guides: forge026HistoryGuides,
    questions: forge026HistoryLessons,
    topics: forge026HistoryTopics,
  },
  {
    family: "HistoryB",
    guides: forge026HistoryBGuides,
    questions: forge026HistoryBLessons,
    topics: forge026HistoryBTopics,
  },
];
export const legacy026Guides = legacy026Packs.flatMap((p) => p.guides);
export const legacy026TheoryIds = new Set(legacy026Guides.map((g) => g.id));
export const legacy026QuestionLessons = legacy026Packs
  .flatMap((p) => p.questions)
  .map((lesson) => ({
    ...lesson,
    tags: [...new Set([...lesson.tags, "soru-seti"])],
  }));
export const legacy026QuestionIds = new Set(
  legacy026QuestionLessons.map((l) => l.id),
);
// New aliases only: accepted theory-to-workbook associations remain untouched.
export const legacy026Topics: Record<string, string> = Object.fromEntries(
  legacy026Packs
    .flatMap((p) => Object.entries(p.topics))
    .filter(([id]) => legacy026QuestionIds.has(id)),
);
