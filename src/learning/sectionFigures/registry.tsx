import "./sectionFigures.css";
import { SectionFigureView, type FigureDef } from "./figureKit";
import { geometryFigures031 } from "./geometryFigures031";
import { geometryFigures032a } from "./geometryFigures032a";
import { geometryFigures032b } from "./geometryFigures032b";
import { geometryFiguresArea } from "./geometryFiguresArea";
import { geometryFiguresAyt } from "./geometryFiguresAyt";
import { physicsFiguresOptics } from "./physicsFiguresOptics";

export const sectionFigures: Record<string, Record<string, FigureDef>> = {
  ...geometryFigures031,
  ...geometryFigures032a,
  ...geometryFigures032b,
  ...geometryFiguresArea,
  ...geometryFiguresAyt,
  ...physicsFiguresOptics,
};

export function SectionFigure({
  guideId,
  title,
}: {
  guideId: string;
  title: string;
}) {
  const def = sectionFigures[guideId]?.[title];
  return def ? <SectionFigureView def={def} title={title} /> : null;
}
