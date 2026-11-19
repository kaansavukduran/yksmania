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
