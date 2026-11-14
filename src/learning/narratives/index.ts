import { mathematicsNarratives } from "./mathematics";
import { biologyNarratives } from "./biology";
import { historyNarratives } from "./history";
import { physicsNarratives } from "./physics";
import { islamNarratives } from "./historyIslam";
import { chemistryNarratives } from "./chemistry";
import { divisionNarratives } from "./mathDivision";
import { turkishNarratives } from "./turkish";
import { energyNarrative } from "./physicsEnergy";
import { narrativeLesson } from "./types";
export const narrativePacks = [
  ...biologyNarratives,
  ...mathematicsNarratives,
  ...historyNarratives,
  ...physicsNarratives,
  ...islamNarratives,
  ...chemistryNarratives,
  ...divisionNarratives,
  ...turkishNarratives,
  energyNarrative,
];
export const narrativeById = new Map(
  narrativePacks.map((pack) => [pack.id, pack]),
);
export const sourceNarratives = narrativePacks.map(narrativeLesson);
export const narrativeTopics: Record<string, string> = Object.fromEntries(
  narrativePacks.map((pack) => [pack.id, pack.topicId]),
);
