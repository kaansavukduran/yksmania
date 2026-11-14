import { narrativeById } from "./narratives";
import { lazy, Suspense } from "react";
import { useApp } from "../store";
const Cell = lazy(() => import("./CellExplorer"));
const Periodic = lazy(() => import("./PeriodicExplorer"));
const Geometry = lazy(() => import("./GeometryExplorer"));
const Compact = lazy(() => import("./CompactExplorers"));
const Derivative = lazy(() => import("./DerivativeExplorer"));
const Field = lazy(() => import("./ElectricFieldExplorer"));
const Equilibrium = lazy(() => import("./EquilibriumExplorer"));
const Dna = lazy(() => import("./DnaExplorer"));
const Foundations = lazy(() => import("./ChemistryFoundations"));
const Narrative = lazy(() =>
  import("./NarrativeExplorer").then((module) => ({
    default: module.NarrativeExplorer,
  })),
);
const MathFoundations = lazy(() => import("./MathFoundations"));
const Algebra = lazy(() => import("./AlgebraExplorer"));
const Shells = lazy(() => import("./ElectronShellExplorer"));
export function VisualLab({ id }: { id: string }) {
  const { t } = useApp();
  return (
    <Suspense fallback={<p role="status">{t("loading")}</p>}>
      {id === "katman-elektron-dizilimi" ? (
        <Shells />
      ) : id === "birinci-dereceden-denklemler" ||
        id === "basit-esitsizlikler" ? (
        <Algebra key={id} inequality={id === "basit-esitsizlikler"} />
      ) : narrativeById.has(id) ? (
        <Narrative key={id} id={id} />
      ) : [
          "temel-kavramlar",
          "tek-cift-isaret",
          "ardisik-sayilar",
          "asal-sayilar",
          "faktoriyel",
        ].includes(id) ? (
        <MathFoundations id={id} />
      ) : [
          "simyadan-kimyaya",
          "kimya-disiplinleri",
          "sembolik-dil",
          "kimya-guvenlik",
          "atom-modelleri",
        ].includes(id) ? (
        <Foundations id={id} />
      ) : id === "hucre-organelleri" ? (
        <Cell />
      ) : id === "periyodik-sistem" ? (
        <Periodic />
      ) : id === "alan-donusumleri" ? (
        <Geometry />
      ) : id === "turev-teget" ? (
        <Derivative />
      ) : id === "elektrik-alan" ? (
        <Field />
      ) : id === "kimyasal-denge" ? (
        <Equilibrium />
      ) : id === "dna-eslenmesi" ? (
        <Dna />
      ) : (
        <Compact id={id} />
      )}
    </Suspense>
  );
}
