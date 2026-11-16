import { forge023MathTopics } from "./forge023Math";
import { forge023PhysicsTopics } from "./forge023Physics";
import { forge023BiologyTopics } from "./forge023Biology";
import { forge023ChemistryTopics } from "./forge023Chemistry";
import { forge023HumanitiesATopics } from "./forge023HumanitiesA";
import { forge023HumanitiesBTopics } from "./forge023HumanitiesB";
import { forge023TurkishTopics } from "./forge023Turkish";
import { forge022MathTopics } from "./forge022Math";
import { forge022PhysicsTopics } from "./forge022Physics";
import { forge022BiologyTopics } from "./forge022Biology";
import { forge022ChemistryATopics } from "./forge022ChemistryA";
import { forge022ChemistryBTopics } from "./forge022ChemistryB";
import { forge022HumanitiesTopics } from "./forge022Humanities";
import { forge021GeometryTopics } from "./forge021Geometry";
import { forge021PhysicsTopics } from "./forge021Physics";
import { forge021BiologyATopics } from "./forge021BiologyA";
import { forge021BiologyBTopics } from "./forge021BiologyB";
import { forge021ChemistryTopics } from "./forge021Chemistry";
import { forge021HumanitiesTopics } from "./forge021Humanities";
import { forge021TurkishTopics } from "./forge021Turkish";
import { forge020BiologyTopics } from "./forge020Biology";
import { forge020ChemistryTopics } from "./forge020Chemistry";
import { forge020PhysicsTopics } from "./forge020Physics";
import { forge020GeographyTopics } from "./forge020Geography";
import { forge020HumanitiesTopics } from "./forge020Humanities";
import { forge019BiologyTopics } from "./forge019Biology";
import { forge019ChemistryTopics } from "./forge019Chemistry";
import { forge019PhysicsTopics } from "./forge019Physics";
import { forge019GeographyTopics } from "./forge019Geography";
import { forge019TurkishTopics } from "./forge019Turkish";
import { forge019MathTopics } from "./forge019Math";
import { forge018BiologyTopics } from "./forge018Biology";
import { forge018ChemistryTopics } from "./forge018Chemistry";
import { forge018PhysicsTopics } from "./forge018Physics";
import { forge018GeographyTopics } from "./forge018Geography";
import { forge018TurkishTopics } from "./forge018Turkish";
import { forge018MathTopics } from "./forge018Math";
import { forge017BiologyTopics } from "./forge017Biology";
import { forge017ChemistryATopics } from "./forge017ChemistryA";
import { forge017ChemistryBTopics } from "./forge017ChemistryB";
import { forge017GeographyTopics } from "./forge017Geography";
import { forge017PhysicsTopics } from "./forge017Physics";
import { forge017TurkishTopics } from "./forge017Turkish";
import { forge016BiologyATopics } from "./forge016BiologyA";
import { forge016BiologyBTopics } from "./forge016BiologyB";
import { forge016ChemistryTopics } from "./forge016Chemistry";
import { forge016GeographyTopics } from "./forge016Geography";
import { forge016PhysicsTopics } from "./forge016Physics";
import { forge016TurkishTopics } from "./forge016Turkish";
import { forge015MathTopics } from "./forge015Math";
import { forge015PhysicsTopics } from "./forge015Physics";
import { forge015ChemistryTopics } from "./forge015Chemistry";
import { forge015BiologyTopics } from "./forge015Biology";
import { forge015GeographyTopics } from "./forge015Geography";
import { forge015TurkishTopics } from "./forge015Turkish";
import { forge014MathTopics } from "./forge014Math";
import { forge014PhysicsTopics } from "./forge014Physics";
import { forge014ChemistryTopics } from "./forge014Chemistry";
import { forge014BiologyTopics } from "./forge014Biology";
import { forge014GeographyTopics } from "./forge014Geography";
import { forge014TurkishTopics } from "./forge014Turkish";
import { forge012MathTopics } from "./forge012Math";
import { forge012PhysicsTopics } from "./forge012Physics";
import { forge012ChemistryTopics } from "./forge012Chemistry";
import { forge012BiologyTopics } from "./forge012Biology";
import { forge012TurkishTopics } from "./forge012Turkish";
import { forge012HistoryTopics } from "./forge012History";
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
const Forge012Math = lazy(() => import("./Forge012MathLab"));
const Forge012Physics = lazy(() => import("./Forge012PhysicsLab"));
const Forge012Chemistry = lazy(() => import("./Forge012ChemistryLab"));
const Forge012Biology = lazy(() => import("./Forge012BiologyLab"));
const Forge012Turkish = lazy(() => import("./Forge012TurkishLab"));
const Forge012History = lazy(() => import("./Forge012HistoryLab"));
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
const Forge014Math = lazy(() => import("./Forge014MathLab"));
const Forge014Physics = lazy(() => import("./Forge014PhysicsLab"));
const Forge014Chemistry = lazy(() => import("./Forge014ChemistryLab"));
const Forge014Biology = lazy(() => import("./Forge014BiologyLab"));
const Forge014Geography = lazy(() => import("./Forge014GeographyLab"));
const Forge014Turkish = lazy(() => import("./Forge014TurkishLab"));
const Forge015Math = lazy(() => import("./Forge015MathLab"));
const Forge015Physics = lazy(() => import("./Forge015PhysicsLab"));
const Forge015Chemistry = lazy(() => import("./Forge015ChemistryLab"));
const Forge015Biology = lazy(() => import("./Forge015BiologyLab"));
const Forge015Geography = lazy(() => import("./Forge015GeographyLab"));
const Forge015Turkish = lazy(() => import("./Forge015TurkishLab"));
const Forge016BiologyA = lazy(() => import("./Forge016BiologyALab"));
const Forge016BiologyB = lazy(() => import("./Forge016BiologyBLab"));
const Forge016Chemistry = lazy(() => import("./Forge016ChemistryLab"));
const Forge016Geography = lazy(() => import("./Forge016GeographyLab"));
const Forge016Physics = lazy(() => import("./Forge016PhysicsLab"));
const Forge016Turkish = lazy(() => import("./Forge016TurkishLab"));
const Forge018Biology = lazy(() => import("./Forge018BiologyLab"));
const Forge018Chemistry = lazy(() => import("./Forge018ChemistryLab"));
const Forge018Physics = lazy(() => import("./Forge018PhysicsLab"));
const Forge018Geography = lazy(() => import("./Forge018GeographyLab"));
const Forge018Turkish = lazy(() => import("./Forge018TurkishLab"));
const Forge018Math = lazy(() => import("./Forge018MathLab"));
const Forge019Biology = lazy(() => import("./Forge019BiologyLab"));
const Forge019Chemistry = lazy(() => import("./Forge019ChemistryLab"));
const Forge019Physics = lazy(() => import("./Forge019PhysicsLab"));
const Forge019Geography = lazy(() => import("./Forge019GeographyLab"));
const Forge019Turkish = lazy(() => import("./Forge019TurkishLab"));
const Forge019Math = lazy(() => import("./Forge019MathLab"));
const questionOnly019 = new Set([
  "paragraf-ana-dusunce-ileri",
  "elektrik-alan-ileri",
  "kimyasal-denge-ileri",
]);
const Forge020Biology=lazy(()=>import("./Forge020BiologyLab"));
const Forge020Chemistry=lazy(()=>import("./Forge020ChemistryLab"));
const Forge020Physics=lazy(()=>import("./Forge020PhysicsLab"));
const Forge020Geography=lazy(()=>import("./Forge020GeographyLab"));
const Forge020Humanities=lazy(()=>import("./Forge020HumanitiesLab"));
const Forge021Geometry=lazy(()=>import("./Forge021GeometryLab"));
const Forge021Physics=lazy(()=>import("./Forge021PhysicsLab"));
const Forge021BiologyA=lazy(()=>import("./Forge021BiologyALab"));
const Forge021BiologyB=lazy(()=>import("./Forge021BiologyBLab"));
const Forge021Chemistry=lazy(()=>import("./Forge021ChemistryLab"));
const Forge021Humanities=lazy(()=>import("./Forge021HumanitiesLab"));
const Forge021Turkish=lazy(()=>import("./Forge021TurkishLab"));
const Forge022Math=lazy(()=>import("./Forge022MathLab"));
const Forge022Physics=lazy(()=>import("./Forge022PhysicsLab"));
const Forge022Biology=lazy(()=>import("./Forge022BiologyLab"));
const Forge022ChemistryA=lazy(()=>import("./Forge022ChemistryALab"));
const Forge022ChemistryB=lazy(()=>import("./Forge022ChemistryBLab"));
const Forge022Humanities=lazy(()=>import("./Forge022HumanitiesLab"));
const Forge023Math=lazy(()=>import("./Forge023MathLab"));
const Forge023Physics=lazy(()=>import("./Forge023PhysicsLab"));
const Forge023Biology=lazy(()=>import("./Forge023BiologyLab"));
const Forge023Chemistry=lazy(()=>import("./Forge023ChemistryLab"));
const Forge023HumanitiesA=lazy(()=>import("./Forge023HumanitiesALab"));
const Forge023HumanitiesB=lazy(()=>import("./Forge023HumanitiesBLab"));
const Forge023Turkish=lazy(()=>import("./Forge023TurkishLab"));
const source023Labs:{topics:Record<string,string>;Component:ComponentType<{lessonId:string}>}[]=[
 {topics:forge023MathTopics,Component:Forge023Math},
 {topics:forge023PhysicsTopics,Component:Forge023Physics},
 {topics:forge023BiologyTopics,Component:Forge023Biology},
 {topics:forge023ChemistryTopics,Component:Forge023Chemistry},
 {topics:forge023HumanitiesATopics,Component:Forge023HumanitiesA},
 {topics:forge023HumanitiesBTopics,Component:Forge023HumanitiesB},
 {topics:forge023TurkishTopics,Component:Forge023Turkish},
];
const source022Labs:{topics:Record<string,string>;Component:ComponentType<{lessonId:string}>}[]=[
 {topics:forge022MathTopics,Component:Forge022Math},
 {topics:forge022PhysicsTopics,Component:Forge022Physics},
 {topics:forge022BiologyTopics,Component:Forge022Biology},
 {topics:forge022ChemistryATopics,Component:Forge022ChemistryA},
 {topics:forge022ChemistryBTopics,Component:Forge022ChemistryB},
 {topics:forge022HumanitiesTopics,Component:Forge022Humanities},
];
const source021Labs:{topics:Record<string,string>;Component:ComponentType<{lessonId:string}>}[]=[
 {topics:forge021GeometryTopics,Component:Forge021Geometry},
 {topics:forge021PhysicsTopics,Component:Forge021Physics},
 {topics:forge021BiologyATopics,Component:Forge021BiologyA},
 {topics:forge021BiologyBTopics,Component:Forge021BiologyB},
 {topics:forge021ChemistryTopics,Component:Forge021Chemistry},
 {topics:forge021HumanitiesTopics,Component:Forge021Humanities},
 {topics:forge021TurkishTopics,Component:Forge021Turkish},
];
const source020Labs:{topics:Record<string,string>;Component:ComponentType<{lessonId:string}>}[]=[
 {topics:forge020BiologyTopics,Component:Forge020Biology},
 {topics:forge020ChemistryTopics,Component:Forge020Chemistry},
 {topics:forge020PhysicsTopics,Component:Forge020Physics},
 {topics:forge020GeographyTopics,Component:Forge020Geography},
 {topics:forge020HumanitiesTopics,Component:Forge020Humanities},
];
const source019Labs: {
  topics: Record<string, string>;
  Component: ComponentType<{ lessonId: string }>;
}[] = [
  { topics: forge019BiologyTopics, Component: Forge019Biology },
  { topics: forge019ChemistryTopics, Component: Forge019Chemistry },
  { topics: forge019PhysicsTopics, Component: Forge019Physics },
  { topics: forge019GeographyTopics, Component: Forge019Geography },
  { topics: forge019TurkishTopics, Component: Forge019Turkish },
  { topics: forge019MathTopics, Component: Forge019Math },
];
const source018Labs: {
  topics: Record<string, string>;
  Component: ComponentType<{ lessonId: string }>;
}[] = [
  { topics: forge018BiologyTopics, Component: Forge018Biology },
  { topics: forge018ChemistryTopics, Component: Forge018Chemistry },
  { topics: forge018PhysicsTopics, Component: Forge018Physics },
  { topics: forge018GeographyTopics, Component: Forge018Geography },
  { topics: forge018TurkishTopics, Component: Forge018Turkish },
  { topics: forge018MathTopics, Component: Forge018Math },
];
const Forge017Biology = lazy(() => import("./Forge017BiologyLab"));
const Forge017ChemistryA = lazy(() => import("./Forge017ChemistryALab"));
const Forge017ChemistryB = lazy(() => import("./Forge017ChemistryBLab"));
const Forge017Geography = lazy(() => import("./Forge017GeographyLab"));
const Forge017Physics = lazy(() => import("./Forge017PhysicsLab"));
const Forge017Turkish = lazy(() => import("./Forge017TurkishLab"));
const source017Labs: {
  topics: Record<string, string>;
  Component: ComponentType<{ lessonId: string }>;
}[] = [
  { topics: forge017BiologyTopics, Component: Forge017Biology },
  { topics: forge017ChemistryATopics, Component: Forge017ChemistryA },
  { topics: forge017ChemistryBTopics, Component: Forge017ChemistryB },
  { topics: forge017GeographyTopics, Component: Forge017Geography },
  { topics: forge017PhysicsTopics, Component: Forge017Physics },
  { topics: forge017TurkishTopics, Component: Forge017Turkish },
];
const source016Labs: {
  topics: Record<string, string>;
  Component: ComponentType<{ lessonId: string }>;
}[] = [
  { topics: forge016BiologyATopics, Component: Forge016BiologyA },
  { topics: forge016BiologyBTopics, Component: Forge016BiologyB },
  { topics: forge016ChemistryTopics, Component: Forge016Chemistry },
  { topics: forge016GeographyTopics, Component: Forge016Geography },
  { topics: forge016PhysicsTopics, Component: Forge016Physics },
  { topics: forge016TurkishTopics, Component: Forge016Turkish },
];
const source015Labs: {
  topics: Record<string, string>;
  Component: ComponentType<{ lessonId: string }>;
}[] = [
  { topics: forge015MathTopics, Component: Forge015Math },
  { topics: forge015PhysicsTopics, Component: Forge015Physics },
  { topics: forge015ChemistryTopics, Component: Forge015Chemistry },
  { topics: forge015BiologyTopics, Component: Forge015Biology },
  { topics: forge015GeographyTopics, Component: Forge015Geography },
  { topics: forge015TurkishTopics, Component: Forge015Turkish },
];
const source014Labs: {
  topics: Record<string, string>;
  Component: ComponentType<{ lessonId: string }>;
}[] = [
  { topics: forge014MathTopics, Component: Forge014Math },
  { topics: forge014PhysicsTopics, Component: Forge014Physics },
  { topics: forge014ChemistryTopics, Component: Forge014Chemistry },
  { topics: forge014BiologyTopics, Component: Forge014Biology },
  { topics: forge014GeographyTopics, Component: Forge014Geography },
  { topics: forge014TurkishTopics, Component: Forge014Turkish },
];
const continuationLabs: {
  topics: Record<string, string>;
  Component: ComponentType<{ id: string }>;
}[] = [
  { topics: forge012MathTopics, Component: Forge012Math },
  { topics: forge012PhysicsTopics, Component: Forge012Physics },
  { topics: forge012ChemistryTopics, Component: Forge012Chemistry },
  { topics: forge012BiologyTopics, Component: Forge012Biology },
  { topics: forge012TurkishTopics, Component: Forge012Turkish },
  { topics: forge012HistoryTopics, Component: Forge012History },
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
  if (questionOnly019.has(id)||id==="dna-replikasyonu-ileri") return null;
  const Source023Lab=source023Labs.find(({topics})=>Object.hasOwn(topics,id))?.Component;
  const Source022Lab=source022Labs.find(({topics})=>Object.hasOwn(topics,id))?.Component;
  const Source021Lab=source021Labs.find(({topics})=>Object.hasOwn(topics,id))?.Component;
  const Source020Lab=source020Labs.find(({topics})=>Object.hasOwn(topics,id))?.Component;
  const Source019Lab = source019Labs.find(({ topics }) =>
    Object.hasOwn(topics, id),
  )?.Component;
  const Source018Lab = source018Labs.find(({ topics }) =>
    Object.hasOwn(topics, id),
  )?.Component;
  const Source017Lab = source017Labs.find(({ topics }) =>
    Object.hasOwn(topics, id),
  )?.Component;
  const Source016Lab = source016Labs.find(({ topics }) =>
    Object.hasOwn(topics, id),
  )?.Component;
  const Source015Lab = source015Labs.find(({ topics }) =>
    Object.hasOwn(topics, id),
  )?.Component;
  const Source014Lab = source014Labs.find(({ topics }) =>
    Object.hasOwn(topics, id),
  )?.Component;
  const ContinuationLab = continuationLabs.find(({ topics }) =>
    Object.hasOwn(topics, id),
  )?.Component;
  return (
    <Suspense fallback={<p role="status">{t("loading")}</p>}>
      {Source023Lab ? (<Source023Lab key={id} lessonId={id}/>) : Source022Lab ? (<Source022Lab key={id} lessonId={id}/>) : Source021Lab ? (<Source021Lab key={id} lessonId={id}/>) : Source020Lab ? (<Source020Lab key={id} lessonId={id}/>) : Source019Lab ? (
        <Source019Lab key={id} lessonId={id} />
      ) : Source018Lab ? (
        <Source018Lab key={id} lessonId={id} />
      ) : Source017Lab ? (
        <Source017Lab key={id} lessonId={id} />
      ) : Source016Lab ? (
        <Source016Lab key={id} lessonId={id} />
      ) : Source015Lab ? (
        <Source015Lab key={id} lessonId={id} />
      ) : Source014Lab ? (
        <Source014Lab key={id} lessonId={id} />
      ) : ContinuationLab ? (
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
