import "./sectionFigures.css";
import { SectionFigureView, type FigureDef } from "./figureKit";
import { geometryFigures031 } from "./geometryFigures031";
import { geometryFigures032a } from "./geometryFigures032a";
import { geometryFigures032b } from "./geometryFigures032b";
import { geometryFiguresArea } from "./geometryFiguresArea";
import { geometryFiguresAyt } from "./geometryFiguresAyt";
import { physicsFiguresOptics } from "./physicsFiguresOptics";
import { mathFiguresRoots } from "./mathFiguresRoots";
import { physicsFiguresMechanics } from "./physicsFiguresMechanics";
import { physicsFiguresFluidsCircuits } from "./physicsFiguresFluidsCircuits";
import { physicsFiguresEnergy } from "./physicsFiguresEnergy";
import { physicsFiguresWaves } from "./physicsFiguresWaves";
import { physicsFiguresThermal } from "./physicsFiguresThermal";
import { geometryFiguresCircle040 } from "./geometryFiguresCircle040";
import { historyFiguresSeljuk } from "./historyFiguresSeljuk";
import { biologyFiguresNucleic } from "./biologyFiguresNucleic";
import { biologyFiguresMitosis } from "./biologyFiguresMitosis";
import { biologyFiguresMeiosis } from "./biologyFiguresMeiosis";
import { chemistryFiguresParticles } from "./chemistryFiguresParticles";
import { physicsFiguresElectrostatics } from "./physicsFiguresElectrostatics";
import { physicsFiguresMagnetism } from "./physicsFiguresMagnetism";
import { physicsFiguresSound } from "./physicsFiguresSound";
import { physicsFiguresPrism } from "./physicsFiguresPrism";
import { physicsFiguresLight } from "./physicsFiguresLight";
import { physicsFiguresMatter } from "./physicsFiguresMatter";
import { biologyFiguresPedigree } from "./biologyFiguresPedigree";
import { biologyFiguresGenetics } from "./biologyFiguresGenetics";
import { biologyFiguresCycles } from "./biologyFiguresCycles";
import { biologyFiguresLipids } from "./biologyFiguresLipids";
import { biologyFiguresLife } from "./biologyFiguresLife";
import { chemistryFiguresLimiting } from "./chemistryFiguresLimiting";
import { chemistryFiguresYield } from "./chemistryFiguresYield";
import { mathFiguresAyt } from "./mathFiguresAyt";
import { mathFiguresAyt2 } from "./mathFiguresAyt2";
import { mathFiguresAyt3 } from "./mathFiguresAyt3";
import { mathFiguresTyt } from "./mathFiguresTyt";
import { mathFiguresTyt2 } from "./mathFiguresTyt2";
import { chemistryFiguresIsotope } from "./chemistryFiguresIsotope";
import { chemistryFiguresAtoms } from "./chemistryFiguresAtoms";
import { turkeyFigures } from "./turkeyFigures";
import { historyFiguresIslam } from "./historyFiguresIslam";
import { chemistryFiguresMolecules } from "./chemistryFiguresMolecules";
import { turkishFiguresWords } from "./turkishFiguresWords";

export const sectionFigures: Record<string, Record<string, FigureDef>> = {
  ...geometryFigures031,
  ...geometryFigures032a,
  ...geometryFigures032b,
  ...geometryFiguresArea,
  ...geometryFiguresAyt,
  ...physicsFiguresOptics,
  ...mathFiguresRoots,
  ...physicsFiguresMechanics,
  ...physicsFiguresFluidsCircuits,
  ...physicsFiguresEnergy,
  ...physicsFiguresWaves,
  ...physicsFiguresThermal,
  ...geometryFiguresCircle040,
  ...historyFiguresSeljuk,
  ...biologyFiguresNucleic,
  ...biologyFiguresMitosis,
  ...biologyFiguresMeiosis,
  ...chemistryFiguresParticles,
  ...physicsFiguresElectrostatics,
  ...physicsFiguresMagnetism,
  ...physicsFiguresSound,
  ...physicsFiguresPrism,
  ...physicsFiguresLight,
  ...physicsFiguresMatter,
  ...biologyFiguresPedigree,
  ...biologyFiguresGenetics,
  ...biologyFiguresCycles,
  ...biologyFiguresLipids,
  ...biologyFiguresLife,
  ...chemistryFiguresLimiting,
  ...chemistryFiguresYield,
  ...mathFiguresAyt,
  ...mathFiguresAyt2,
  ...mathFiguresAyt3,
  ...mathFiguresTyt,
  ...mathFiguresTyt2,
  ...chemistryFiguresIsotope,
  ...chemistryFiguresAtoms,
  ...turkeyFigures,
  ...historyFiguresIslam,
  ...chemistryFiguresMolecules,
  ...turkishFiguresWords,
};

export function SectionFigure({
  guideId,
  title,
  label,
}: {
  guideId: string;
  title: string;
  /** Optional lead-in shown only when the section really has a figure. */
  label?: string;
}) {
  const def = sectionFigures[guideId]?.[title];
  if (!def) return null;
  return (
    <>
      {label && <p className="small muted">{label}</p>}
      <SectionFigureView def={def} title={title} />
    </>
  );
}
