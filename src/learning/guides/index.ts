import { chemistryDepthGuides } from "./chemistryDepth";
import { newtonGuide, electricFieldGuide } from "./physicsDepth";
import { dnaDepthGuide, atpDepthGuide } from "./biologyDepth";
import { soundGuide, structureGuide } from "./turkishLanguage";
import { geometryDepthGuide } from "./geometryDepth";
import { derivativeDepthGuide } from "./derivativeDepth";
import { factorizationGuide } from "./factorization";
import { rationalGuide } from "./rational";
import { symbolsGuide } from "./symbols";
import { alchemyGuide } from "./alchemy";
import { disciplinesGuide, safetyGuide } from "./chemistry";
import { atomsGuide } from "./atoms";
import { basicsGuide, parityGuide } from "./numberBasics";
import { sequencesGuide } from "./sequences";
import { primesGuide, factorialGuide } from "./primeFactorial";
import { cellsGuide } from "./cells";
import { periodicGuide } from "./periodic";
import { equationGuide, inequalityGuide } from "./algebra";
import { shellsGuide } from "./shells";
import { paragraphGuide } from "./paragraph";
export const lessonGuides = new Map(
  [
    ...chemistryDepthGuides,
    newtonGuide,
    electricFieldGuide,
    dnaDepthGuide,
    atpDepthGuide,
    soundGuide,
    structureGuide,
    geometryDepthGuide,
    derivativeDepthGuide,
    factorizationGuide,
    rationalGuide,
    symbolsGuide,
    alchemyGuide,
    disciplinesGuide,
    safetyGuide,
    atomsGuide,
    basicsGuide,
    parityGuide,
    sequencesGuide,
    primesGuide,
    factorialGuide,
    cellsGuide,
    periodicGuide,
    equationGuide,
    inequalityGuide,
    shellsGuide,
    paragraphGuide,
  ].map((guide) => [guide.id, guide]),
);
