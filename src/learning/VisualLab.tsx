import { forge011MathTopics } from "./forge011Math";
import { forge011PhysicsTopics } from "./forge011Physics";
import { forge011ChemistryTopics } from "./forge011Chemistry";
import { forge011BiologyATopics } from "./forge011BiologyA";
import { forge011BiologyBTopics } from "./forge011BiologyB";
import { forge011TurkishTopics } from "./forge011Turkish";
import { forge011HistoryTopics } from "./forge011History";
import { narrativeById } from "./narratives";
import { forge093MathTopics } from "./forge093Math";
import { forge093PhysicsTopics } from "./forge093Physics";
import { forge093ChemistryTopics } from "./forge093Chemistry";
import { forge093BiologyTopics } from "./forge093Biology";
import { forge093TurkishTopics } from "./forge093Turkish";
import { forge093HistoryTopics } from "./forge093History";
import { lazy, Suspense, type ComponentType } from "react";
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
const Forge011Math = lazy(() => import("./Forge011MathLab"));
const Forge011Physics = lazy(() => import("./Forge011PhysicsLab"));
const Forge011Chemistry = lazy(() => import("./Forge011ChemistryLab"));
const Forge011BiologyA = lazy(() => import("./Forge011BiologyALab"));
const Forge011BiologyB = lazy(() => import("./Forge011BiologyBLab"));
const Forge011Turkish = lazy(() => import("./Forge011TurkishLab"));
const Forge011History = lazy(() => import("./Forge011HistoryLab"));
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
const continuationLabs: {
  topics: Record<string, string>;
  Component: ComponentType<{ id: string }>;
}[] = [
  { topics: forge011MathTopics, Component: Forge011Math },
  { topics: forge011PhysicsTopics, Component: Forge011Physics },
  { topics: forge011ChemistryTopics, Component: Forge011Chemistry },
  { topics: forge011BiologyATopics, Component: Forge011BiologyA },
  { topics: forge011BiologyBTopics, Component: Forge011BiologyB },
  { topics: forge011TurkishTopics, Component: Forge011Turkish },
  { topics: forge011HistoryTopics, Component: Forge011History },
  { topics: forge093MathTopics, Component: NextMath },
  { topics: forge093PhysicsTopics, Component: NextPhysics },
  { topics: forge093ChemistryTopics, Component: NextChemistry },
  { topics: forge093BiologyTopics, Component: NextBiology },
  { topics: forge093TurkishTopics, Component: NextTurkish },
  { topics: forge093HistoryTopics, Component: NextHistory },
];
export function VisualLab({ id }: { id: string }) {
  const { t } = useApp();
  const ContinuationLab = continuationLabs.find(({ topics }) =>
    Object.hasOwn(topics, id),
  )?.Component;
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
