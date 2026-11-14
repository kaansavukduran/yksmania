import { forge093MathGuides } from "../forge093Math";
import { forge093PhysicsGuides } from "../forge093Physics";
import { forge093ChemistryGuides } from "../forge093Chemistry";
import { forge093BiologyGuides } from "../forge093Biology";
import { forge093TurkishGuides } from "../forge093Turkish";
import { forge093HistoryGuides } from "../forge093History";
import { worldPowerOttomanGuide } from "../worldPowerOttoman";
import { chemicalSpeciesGuide } from "../chemicalSpecies";
import { heatTemperatureGuide } from "../heatTemperature";
import { nucleicAcidsGuide } from "../nucleicAcids";
import { ionicGuides } from "../ionicBonding";
import { periodicDepthGuides } from "../periodicDepth";
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
    ...forge093MathGuides,
    ...forge093PhysicsGuides,
    ...forge093ChemistryGuides,
    ...forge093BiologyGuides,
    ...forge093TurkishGuides,
    ...forge093HistoryGuides,
    ...chemistryDepthGuides,
    ...periodicDepthGuides,
    worldPowerOttomanGuide,
    chemicalSpeciesGuide,
    heatTemperatureGuide,
    nucleicAcidsGuide,
    ...ionicGuides,
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
