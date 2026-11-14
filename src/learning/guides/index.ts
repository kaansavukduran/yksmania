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
export const lessonGuides = new Map(
  [
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
  ].map((guide) => [guide.id, guide]),
);
