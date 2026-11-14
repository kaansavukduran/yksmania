import { narrativeById } from "./narratives";
import { forge093MathTopics } from "./forge093Math";
import { forge093PhysicsTopics } from "./forge093Physics";
import { forge093ChemistryTopics } from "./forge093Chemistry";
import { forge093BiologyTopics } from "./forge093Biology";
import { forge093TurkishTopics } from "./forge093Turkish";
import { forge093HistoryTopics } from "./forge093History";
import { lazy, Suspense } from "react";
import { useApp } from "../store";
const PeriodicReasoning = lazy(() => import("./PeriodicReasoning"));
const WorldPower = lazy(() => import("./WorldPowerOttomanLab"));
const Species = lazy(() => import("./ChemicalSpeciesLab"));
const Heat = lazy(() => import("./HeatTemperatureLab"));
const Nucleic = lazy(() => import("./NucleicAcidsLab"));
const Ionic = lazy(() => import("./IonicWorkshop"));
const NextMath = lazy(() => import("./Forge093MathLab"));
const NextPhysics = lazy(() => import("./Forge093PhysicsLab"));
const NextChemistry = lazy(() => import("./Forge093ChemistryLab"));
const NextBiology = lazy(() => import("./Forge093BiologyLab"));
const NextTurkish = lazy(() => import("./Forge093TurkishLab"));
const NextHistory = lazy(() => import("./Forge093HistoryLab"));
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
const Language = lazy(() => import("./TurkishLanguageExplorer"));
const Factorization = lazy(() => import("./FactorizationExplorer"));
export function VisualLab({ id }: { id: string }) {
  const { t } = useApp();
  const ContinuationLab =
    id in forge093MathTopics
      ? NextMath
      : id in forge093PhysicsTopics
        ? NextPhysics
        : id in forge093ChemistryTopics
          ? NextChemistry
          : id in forge093BiologyTopics
            ? NextBiology
            : id in forge093TurkishTopics
              ? NextTurkish
              : id in forge093HistoryTopics
                ? NextHistory
                : null;
  return (
    <Suspense fallback={<p role="status">{t("loading")}</p>}>
      {ContinuationLab ? (
        <ContinuationLab key={id} id={id} />
      ) : id === "dunya-gucu-osmanli" ? (
        <WorldPower />
      ) : id === "kimyasal-turler-lewis" ? (
        <Species />
      ) : id === "isi-ve-sicaklik" ? (
        <Heat />
      ) : id === "nukleik-asitler" ? (
        <Nucleic />
      ) : id === "iyonik-bag-ve-guclu-etkilesimler" ? (
        <Ionic />
      ) : id === "iyonik-bilesik-adlandirma" ? (
        <Ionic naming />
      ) : [
          "elementlerin-siniflandirilmasi",
          "atom-capi-karsilastirma",
          "iyonlasma-enerjisi",
          "elektron-ilgisi-elektronegatiflik",
        ].includes(id) ? (
        <PeriodicReasoning key={id} id={id} />
      ) : id === "ses-bilgisi" || id === "sozcukte-yapi" ? (
        <Language structure={id === "sozcukte-yapi"} />
      ) : id === "carpanlara-ayirma" ? (
        <Factorization />
      ) : id === "katman-elektron-dizilimi" ? (
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
