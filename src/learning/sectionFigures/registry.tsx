import "./sectionFigures.css";
import { SectionFigureView, type FigureDef } from "./figureKit";
import { SourceQuestionFigure, type SourceQuestionFigureSpec } from "../SourceQuestionFigure";
import { thermographySourceURL } from "../mebiThermography";
import { thermographyPhoto } from "./mebiThermographyPhoto";
import { coastalWaterLicence, coastalWaterSource } from "../mebiCoastalWater";
import { coastalWaterPhoto } from "./mebiCoastalWaterPhoto";
import { visibleMirrorRayTitle } from "../mebiVisibleMirror";
import { visibleMirrorPhoto, visibleMirrorPhotoSource } from "./mebiVisibleMirrorPhoto";
import { handRadiograph, handRadiographSource } from "./mebiHandRadiograph";
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
import { geometryFiguresDepth206 } from "./geometryFiguresDepth206";
import { geometryFiguresDepth205 } from "./geometryFiguresDepth205";
import { depthFigures209 } from "./depthFigures209";
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
import { physicsFiguresIntro } from "./physicsFiguresIntro";
import { chemistryFiguresMultiple } from "./chemistryFiguresMultiple";
import { chemistryFiguresAlchemy } from "./chemistryFiguresAlchemy";
import { chemistryFiguresDisciplines } from "./chemistryFiguresDisciplines";
import { mathFiguresTyt3 } from "./mathFiguresTyt3";
import { biologyFiguresEcology } from "./biologyFiguresEcology";
import { biologyFiguresEnvironment } from "./biologyFiguresEnvironment";
import { physicsFiguresAyt } from "./physicsFiguresAyt";
import { chemistryFiguresAyt } from "./chemistryFiguresAyt";
import { chemistryFiguresAyt2 } from "./chemistryFiguresAyt2";
import { biologyFiguresAyt } from "./biologyFiguresAyt";
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
import { turkishFiguresSentence } from "./turkishFiguresSentence";
import { historyFiguresTime } from "./historyFiguresTime";
import { historyFiguresRepublic } from "./historyFiguresRepublic";
import { historyFiguresNational } from "./historyFiguresNational";
import { geographyFiguresMap } from "./geographyFiguresMap";
import { religionFiguresBooks } from "./religionFiguresBooks";
import { religionFiguresAsia } from "./religionFiguresAsia";
import { philosophyFiguresReligion } from "./philosophyFiguresReligion";
import { philosophyFiguresEthics } from "./philosophyFiguresEthics";
import { physicsFiguresNuclear } from "./physicsFiguresNuclear";
import { mathFiguresAyt4 } from "./mathFiguresAyt4";
import { mathFiguresAbs } from "./mathFiguresAbs";
import { mathFiguresInequality } from "./mathFiguresInequality";
import { mathFiguresRational } from "./mathFiguresRational";
import { mathFiguresLinear } from "./mathFiguresLinear";
import { biologyFiguresEye } from "./biologyFiguresEye";
import { biologyFiguresNeuron } from "./biologyFiguresNeuron";
import { biologyFiguresSpinal } from "./biologyFiguresSpinal";
import { biologyFiguresForebrain } from "./biologyFiguresForebrain";
import { biologyFiguresHindbrain } from "./biologyFiguresHindbrain";
import { biologyFiguresPns } from "./biologyFiguresPns";
import { biologyFiguresEar } from "./biologyFiguresEar";
import { geographyFiguresLocation } from "./geographyFiguresLocation";
import { geographyFiguresEarth } from "./geographyFiguresEarth";
import { historyFiguresMedieval } from "./historyFiguresMedieval";
import { turkishFiguresSound } from "./turkishFiguresSound";
import { turkishFiguresParagraph } from "./turkishFiguresParagraph";
import { chemistryFiguresModels } from "./chemistryFiguresModels";
import { chemistryFiguresHbond } from "./chemistryFiguresHbond";
import { physicsFiguresPhoto } from "./physicsFiguresPhoto";
import { physicsFiguresProjectile } from "./physicsFiguresProjectile";
import { physicsFiguresKepler } from "./physicsFiguresKepler";
import { physicsFiguresDoppler } from "./physicsFiguresDoppler";
import { physicsFiguresTorque } from "./physicsFiguresTorque";
import { chemistryFiguresIonization } from "./chemistryFiguresIonization";
import { chemistryFiguresShells } from "./chemistryFiguresShells";
import { chemistryFiguresRadius } from "./chemistryFiguresRadius";
import { chemistryFiguresClasses } from "./chemistryFiguresClasses";
import { chemistryFiguresLewis } from "./chemistryFiguresLewis";
import { chemistryFiguresNaming } from "./chemistryFiguresNaming";
import { chemistryFiguresMixtures } from "./chemistryFiguresMixtures";
import { chemistryFiguresIsotopes } from "./chemistryFiguresIsotopes";
import { chemistryFiguresConcentration } from "./chemistryFiguresConcentration";
import { chemistryFiguresMolParticles } from "./chemistryFiguresMolParticles";
import { chemistryFiguresMolMass } from "./chemistryFiguresMolMass";
import { chemistryFiguresColligative } from "./chemistryFiguresColligative";
import { chemistryFiguresSoap } from "./chemistryFiguresSoap";
import { chemistryFiguresNeutralization } from "./chemistryFiguresNeutralization";
import { chemistryFiguresAcidBasics } from "./chemistryFiguresAcidBasics";
import { chemistryFiguresAcidMetals } from "./chemistryFiguresAcidMetals";
import { chemistryFiguresDailyAcids } from "./chemistryFiguresDailyAcids";
import { chemistryFiguresBalancing } from "./chemistryFiguresBalancing";
import { chemistryFiguresReactionTypes } from "./chemistryFiguresReactionTypes";
import { chemistryFiguresStoichPath } from "./chemistryFiguresStoichPath";
import { chemistryFiguresPolymers } from "./chemistryFiguresPolymers";
import { chemistryFiguresFoodLabels } from "./chemistryFiguresFoodLabels";
import { chemistryFiguresLimitingStock } from "./chemistryFiguresLimitingStock";
import { chemistryFiguresSolidMass } from "./chemistryFiguresSolidMass";
import { chemistryFiguresPurity } from "./chemistryFiguresPurity";
import { chemistryFiguresReactiveMix } from "./chemistryFiguresReactiveMix";
import { chemistryFiguresPhaseCurve } from "./chemistryFiguresPhaseCurve";
import { chemistryFiguresSolidsViscosity } from "./chemistryFiguresSolidsViscosity";
import { chemistryFiguresAffinity } from "./chemistryFiguresAffinity";
import { biologyFiguresSkin } from "./biologyFiguresSkin";
import { geographyFiguresWater } from "./geographyFiguresWater";
import { biologyFiguresAtp } from "./biologyFiguresAtp";
import { philosophyFigures } from "./philosophyFigures";
import { religionFigures } from "./religionFigures";
import { geographyFiguresPopulation } from "./geographyFiguresPopulation";
import { physicsFigures058Kinematics } from "./physicsFigures058Kinematics";
import { physicsFigures058Forces } from "./physicsFigures058Forces";
import { physicsFigures058Electric } from "./physicsFigures058Electric";
import { physicsFigures058Magnetic } from "./physicsFigures058Magnetic";
import { physicsFigures058Waves } from "./physicsFigures058Waves";
import { geographyFigures058Climate } from "./geographyFigures058Climate";
import { geographyFigures058Weather } from "./geographyFigures058Weather";
import { geographyFigures058Time } from "./geographyFigures058Time";
import { geographyFigures058Landforms } from "./geographyFigures058Landforms";
import { geographyFigures058Soil } from "./geographyFigures058Soil";
import { geographyFigures058Tectonic } from "./geographyFigures058Tectonic";
import { geographyFigures058Population } from "./geographyFigures058Population";
import { biologyFigures059Circulation } from "./biologyFigures059Circulation";
import { biologyFigures059Endocrine } from "./biologyFigures059Endocrine";
import { biologyFigures059Body } from "./biologyFigures059Body";
import { biologyFigures059Molecular } from "./biologyFigures059Molecular";
import { biologyFigures059Life } from "./biologyFigures059Life";
import { chemistryFigures059Gas } from "./chemistryFigures059Gas";
import { chemistryFigures059Kinetics } from "./chemistryFigures059Kinetics";
import { chemistryFigures059Equilibrium } from "./chemistryFigures059Equilibrium";
import { chemistryFigures059AcidBase } from "./chemistryFigures059AcidBase";
import { chemistryFigures059Solubility } from "./chemistryFigures059Solubility";
import { chemistryFigures059Electro } from "./chemistryFigures059Electro";
import { chemistryFigures059Atom } from "./chemistryFigures059Atom";
import { chemistryFigures059Organic } from "./chemistryFigures059Organic";
import { chemistryFigures060Organic } from "./chemistryFigures060Organic";
import { chemistryFigures060Formula } from "./chemistryFigures060Formula";
import { chemistryFigures060Redox } from "./chemistryFigures060Redox";
import { chemistryFigures060Solution } from "./chemistryFigures060Solution";
import { chemistryFigures060Tyt } from "./chemistryFigures060Tyt";
import { turkishFigures060Sentence } from "./turkishFigures060Sentence";
import { turkishFigures060Verbals } from "./turkishFigures060Verbals";
import { turkishFigures060Spelling } from "./turkishFigures060Spelling";
import { turkishFigures060Words } from "./turkishFigures060Words";
import { philosophyFigures060Logic } from "./philosophyFigures060Logic";
import { philosophyFigures060History } from "./philosophyFigures060History";
import { philosophyFigures060Being } from "./philosophyFigures060Being";
import { biologyFigures059TytGenetics } from "./biologyFigures059TytGenetics";
import { biologyFigures059TytCell } from "./biologyFigures059TytCell";
import { biologyFigures059TytDiversity } from "./biologyFigures059TytDiversity";
import { historyFigures059Ottoman } from "./historyFigures059Ottoman";
import { historyFigures059Modern } from "./historyFigures059Modern";
import { physicsFigures060Modern } from "./physicsFigures060Modern";
import { physicsFigures060Rotation } from "./physicsFigures060Rotation";
import { physicsFigures060Fields } from "./physicsFigures060Fields";
import { physicsFigures060Motion } from "./physicsFigures060Motion";
import { mathFigures060 } from "./mathFigures060";
import { biologyFigures060Skeleton } from "./biologyFigures060Skeleton";
import { biologyFigures060Plant2 } from "./biologyFigures060Plant2";
import { biologyFigures060Plant } from "./biologyFigures060Plant";
import { biologyFigures060Genetics } from "./biologyFigures060Genetics";
import { biologyFigures060Reproduction } from "./biologyFigures060Reproduction";
import { biologyFigures060Digestion } from "./biologyFigures060Digestion";
import { mathFigures060TytNumbers } from "./mathFigures060TytNumbers";
import { mathFigures060TytAlgebra } from "./mathFigures060TytAlgebra";
import { mathFigures060TytData } from "./mathFigures060TytData";
import { capacityWithBoxExample, delayedInlet, mathFigures060TytProblems } from "./mathFigures060TytProblems";
import { mathFigures062TytNumbers } from "./mathFigures062TytNumbers";
import { mathFigures062TytRational } from "./mathFigures062TytRational";
import { mathFigures062TytAlgebra } from "./mathFigures062TytAlgebra";
import { mathFigures062TytCounting } from "./mathFigures062TytCounting";
import { religionFigures061Worship } from "./religionFigures061Worship";
import { religionFigures061Anatolia } from "./religionFigures061Anatolia";
import { religionFigures061Life } from "./religionFigures061Life";
import { religionFigures061Belief } from "./religionFigures061Belief";
import { geographyFigures061Human } from "./geographyFigures061Human";
import { geographyFigures061Environment } from "./geographyFigures061Environment";
import { biologyFigures061Circulation } from "./biologyFigures061Circulation";
import { biologyFigures061Endocrine } from "./biologyFigures061Endocrine";
import { biologyFigures061Plant } from "./biologyFigures061Plant";
import { biologyFigures061Plant2 } from "./biologyFigures061Plant2";
import { biologyFigures061Flower } from "./biologyFigures061Flower";
import { biologyFigures061Seed } from "./biologyFigures061Seed";
import { biologyFigures061Photo } from "./biologyFigures061Photo";
import { biologyFigures061Chemo } from "./biologyFigures061Chemo";
import { biologyFigures061Env } from "./biologyFigures061Env";
import { physicsFigures061Motion } from "./physicsFigures061Motion";
import { physicsFigures061Modern } from "./physicsFigures061Modern";
import { historyFigures061TytWorld } from "./historyFigures061TytWorld";
import { historyFigures061TytOttoman } from "./historyFigures061TytOttoman";
import { historyFigures061TytEarly } from "./historyFigures061TytEarly";
import { chemistryFigures061TytAtoms } from "./chemistryFigures061TytAtoms";
import { chemistryFigures061TytLab } from "./chemistryFigures061TytLab";
import { biologyFigures061TytLife } from "./biologyFigures061TytLife";
import { biologyFigures061TytEnv } from "./biologyFigures061TytEnv";
import { turkishFigures061Paragraph } from "./turkishFigures061Paragraph";
import { turkishFigures061Structure } from "./turkishFigures061Structure";
import { turkishFigures061Meaning } from "./turkishFigures061Meaning";
import { turkishFigures061Grammar } from "./turkishFigures061Grammar";
import { philosophyFigures061Modern } from "./philosophyFigures061Modern";
import { philosophyFigures061Intro } from "./philosophyFigures061Intro";
import { biologyFigures062Animals } from "./biologyFigures062Animals";
import { biologyFigures062Method } from "./biologyFigures062Method";
import { biologyFigures062Molecules } from "./biologyFigures062Molecules";
import { biologyFigures062Vitamins } from "./biologyFigures062Vitamins";
import { geographyFigures062Water } from "./geographyFigures062Water";
import { geographyFigures062Human } from "./geographyFigures062Human";
import { religionFigures062Rulings } from "./religionFigures062Rulings";
import { religionFigures062Values } from "./religionFigures062Values";
import { religionFigures062Belief } from "./religionFigures062Belief";
import { geometryFigures063Sheets, squareFromMidpoints } from "./geometryFigures063Sheets";
import { mathFigures064Sheets } from "./mathFigures064Sheets";
import { turkishFigures065Sheets } from "./turkishFigures065Sheets";
import { geographyFigures066Sheets } from "./geographyFigures066Sheets";
import { biologyFigures067Sheets } from "./biologyFigures067Sheets";
import { historyFigures068Sheets } from "./historyFigures068Sheets";
import { humanitiesFigures069Sheets } from "./humanitiesFigures069Sheets";
import { depthFigures200 } from "./depthFigures200";
import { depthFigures207 } from "./depthFigures207";
import { depthFigures208 } from "./depthFigures208";
import { depthFigures210 } from "./depthFigures210";
import { depthFigures211 } from "./depthFigures211";
import { depthFigures212 } from "./depthFigures212";
import { depthFigures213 } from "./depthFigures213";
import { depthFigures214 } from "./depthFigures214";
import { depthFigures215 } from "./depthFigures215";
import { depthFigures216 } from "./depthFigures216";
import { depthFigures217 } from "./depthFigures217";
import { depthFigures218 } from "./depthFigures218";
import { depthFigures223 } from "./depthFigures223";

/*
 * Figure packs are merged per guide. A plain object spread replaced a whole
 * guide entry when two packs named the same guide, silently dropping the
 * earlier pack's figures; the merge keeps every section from every pack.
 */
export const figurePacks: Record<string, Record<string, FigureDef>>[] = [
  geometryFigures031,
  geometryFigures032a,
  geometryFigures032b,
  geometryFiguresArea,
  geometryFiguresAyt,
  physicsFiguresOptics,
  mathFiguresRoots,
  physicsFiguresMechanics,
  physicsFiguresFluidsCircuits,
  physicsFiguresEnergy,
  physicsFiguresWaves,
  { "dalgalara-giris": { [visibleMirrorRayTitle]: physicsFiguresOptics["duzlem-ayna"][visibleMirrorRayTitle] } },
  physicsFiguresThermal,
  geometryFiguresCircle040,
  geometryFiguresDepth205,
  historyFiguresSeljuk,
  biologyFiguresNucleic,
  biologyFiguresMitosis,
  biologyFiguresMeiosis,
  chemistryFiguresParticles,
  physicsFiguresElectrostatics,
  physicsFiguresMagnetism,
  physicsFiguresSound,
  physicsFiguresPrism,
  physicsFiguresLight,
  physicsFiguresMatter,
  biologyFiguresPedigree,
  biologyFiguresGenetics,
  biologyFiguresCycles,
  biologyFiguresLipids,
  biologyFiguresLife,
  physicsFiguresIntro,
  chemistryFiguresMultiple,
  chemistryFiguresAlchemy,
  chemistryFiguresDisciplines,
  mathFiguresTyt3,
  biologyFiguresEcology,
  biologyFiguresEnvironment,
  physicsFiguresAyt,
  chemistryFiguresAyt,
  chemistryFiguresAyt2,
  biologyFiguresAyt,
  chemistryFiguresLimiting,
  chemistryFiguresYield,
  mathFiguresAyt,
  mathFiguresAyt2,
  mathFiguresAyt3,
  mathFiguresTyt,
  mathFiguresTyt2,
  chemistryFiguresIsotope,
  chemistryFiguresAtoms,
  turkeyFigures,
  historyFiguresIslam,
  chemistryFiguresMolecules,
  turkishFiguresWords,
  turkishFiguresSentence,
  historyFiguresTime,
  historyFiguresRepublic,
  historyFiguresNational,
  geographyFiguresMap,
  religionFiguresBooks,
  religionFiguresAsia,
  philosophyFiguresReligion,
  philosophyFiguresEthics,
  physicsFiguresNuclear,
  mathFiguresAyt4,
  mathFiguresAbs,
  mathFiguresInequality,
  mathFiguresRational,
  mathFiguresLinear,
  biologyFiguresEye,
  biologyFiguresNeuron,
  biologyFiguresSpinal,
  biologyFiguresForebrain,
  biologyFiguresHindbrain,
  biologyFiguresPns,
  biologyFiguresEar,
  geographyFiguresLocation,
  geographyFiguresEarth,
  historyFiguresMedieval,
  turkishFiguresSound,
  turkishFiguresParagraph,
  chemistryFiguresModels,
  chemistryFiguresHbond,
  physicsFiguresPhoto,
  physicsFiguresProjectile,
  physicsFiguresKepler,
  physicsFiguresDoppler,
  physicsFiguresTorque,
  chemistryFiguresIonization,
  chemistryFiguresShells,
  chemistryFiguresRadius,
  chemistryFiguresAffinity,
  chemistryFiguresClasses,
  chemistryFiguresLewis,
  chemistryFiguresNaming,
  chemistryFiguresMixtures,
  chemistryFiguresIsotopes,
  chemistryFiguresConcentration,
  chemistryFiguresMolParticles,
  chemistryFiguresMolMass,
  chemistryFiguresColligative,
  chemistryFiguresSoap,
  chemistryFiguresNeutralization,
  chemistryFiguresAcidBasics,
  chemistryFiguresAcidMetals,
  chemistryFiguresDailyAcids,
  chemistryFiguresBalancing,
  chemistryFiguresReactionTypes,
  chemistryFiguresStoichPath,
  chemistryFiguresPolymers,
  chemistryFiguresFoodLabels,
  chemistryFiguresLimitingStock,
  chemistryFiguresSolidMass,
  chemistryFiguresPurity,
  chemistryFiguresReactiveMix,
  chemistryFiguresPhaseCurve,
  chemistryFiguresSolidsViscosity,
  biologyFiguresSkin,
  geographyFiguresWater,
  biologyFiguresAtp,
  philosophyFigures,
  religionFigures,
  geographyFiguresPopulation,
  physicsFigures058Kinematics,
  physicsFigures058Forces,
  physicsFigures058Electric,
  physicsFigures058Magnetic,
  physicsFigures058Waves,
  geographyFigures058Climate,
  geographyFigures058Weather,
  geographyFigures058Time,
  geographyFigures058Landforms,
  geographyFigures058Soil,
  geographyFigures058Tectonic,
  geographyFigures058Population,
  biologyFigures059Circulation,
  biologyFigures059Endocrine,
  biologyFigures059Body,
  biologyFigures059Molecular,
  biologyFigures059Life,
  chemistryFigures059Gas,
  chemistryFigures059Kinetics,
  chemistryFigures059Equilibrium,
  chemistryFigures059AcidBase,
  chemistryFigures059Solubility,
  chemistryFigures059Electro,
  chemistryFigures059Atom,
  chemistryFigures059Organic,
  chemistryFigures060Organic,
  chemistryFigures060Formula,
  chemistryFigures060Redox,
  chemistryFigures060Solution,
  chemistryFigures060Tyt,
  biologyFigures059TytGenetics,
  biologyFigures059TytCell,
  biologyFigures059TytDiversity,
  historyFigures059Ottoman,
  historyFigures059Modern,
  physicsFigures060Modern,
  physicsFigures060Rotation,
  physicsFigures060Fields,
  physicsFigures060Motion,
  mathFigures060,
  turkishFigures060Sentence,
  turkishFigures060Verbals,
  turkishFigures060Spelling,
  turkishFigures060Words,
  philosophyFigures060Logic,
  philosophyFigures060History,
  philosophyFigures060Being,
  biologyFigures060Skeleton,
  biologyFigures060Plant2,
  biologyFigures060Plant,
  biologyFigures060Genetics,
  biologyFigures060Reproduction,
  biologyFigures060Digestion,
  mathFigures060TytNumbers,
  mathFigures060TytAlgebra,
  mathFigures060TytData,
  mathFigures060TytProblems,
  { "havuz-problemleri": { "Gecikmiş açılış yeni evre başlatır": delayedInlet } },
  religionFigures061Worship,
  religionFigures061Anatolia,
  religionFigures061Life,
  religionFigures061Belief,
  geographyFigures061Human,
  geographyFigures061Environment,
  biologyFigures061Circulation,
  biologyFigures061Endocrine,
  biologyFigures061Plant,
  biologyFigures061Plant2,
  biologyFigures061Flower,
  biologyFigures061Seed,
  biologyFigures061Photo,
  biologyFigures061Chemo,
  biologyFigures061Env,
  physicsFigures061Motion,
  physicsFigures061Modern,
  historyFigures061TytWorld,
  historyFigures061TytOttoman,
  historyFigures061TytEarly,
  chemistryFigures061TytAtoms,
  chemistryFigures061TytLab,
  biologyFigures061TytLife,
  biologyFigures061TytEnv,
  turkishFigures061Paragraph,
  turkishFigures061Structure,
  turkishFigures061Meaning,
  turkishFigures061Grammar,
  philosophyFigures061Modern,
  philosophyFigures061Intro,
  biologyFigures062Animals,
  biologyFigures062Method,
  biologyFigures062Molecules,
  biologyFigures062Vitamins,
  geographyFigures062Water,
  geographyFigures062Human,
  religionFigures062Rulings,
  religionFigures062Values,
  religionFigures062Belief,
  mathFigures062TytNumbers,
  mathFigures062TytRational,
  mathFigures062TytAlgebra,
  mathFigures062TytCounting,
  geometryFigures063Sheets,
  { "tyt-geo-paralelkenar-ozel-dortgenler-032": { "Orta noktalarla iç kareyi kur": squareFromMidpoints } },
  mathFigures064Sheets,
  turkishFigures065Sheets,
  geographyFigures066Sheets,
  biologyFigures067Sheets,
  historyFigures068Sheets,
  humanitiesFigures069Sheets,
  depthFigures200,
  geometryFiguresDepth206,
  depthFigures207,
  depthFigures208,
  depthFigures209,
  depthFigures210,
  depthFigures211,
  depthFigures212,
  depthFigures213,
  depthFigures214,
  depthFigures215,
  depthFigures216,
  depthFigures217,
  depthFigures218,
  depthFigures223,
];
export const sectionFigures: Record<string, Record<string, FigureDef>> = {};
for (const pack of figurePacks)
  for (const [guide, figures] of Object.entries(pack))
    sectionFigures[guide] = { ...(sectionFigures[guide] ?? {}), ...figures };

const waveLessonPhotos = new Map([
  [thermographyPhoto.title, { figure: thermographyPhoto, url: thermographySourceURL, credit: "MartinThoma · Wikimedia Commons · CC0 1.0" }],
  [visibleMirrorPhoto.title, { figure: visibleMirrorPhoto, url: visibleMirrorPhotoSource, credit: "Jake Weirick · Wikimedia Commons · CC0 1.0" }],
  [handRadiograph.title, { figure: handRadiograph, url: handRadiographSource, credit: "Jochen Lengerke · Wikimedia Commons · CC0 1.0" }],
]);
type LessonPhoto = {
  figure: Extract<SourceQuestionFigureSpec, { kind: "image" }>;
  url: string;
  credit: string;
  licence?: string;
};
export const sectionImageFigures = new Map<string, Map<string, LessonPhoto>>([
  ["dalgalara-giris", waveLessonPhotos],
  ["su-dalgalari", new Map([[coastalWaterPhoto.title, {
    figure: coastalWaterPhoto,
    url: coastalWaterSource,
    credit: "RenataAp · Wikimedia Commons · 960 px",
    licence: coastalWaterLicence,
  }]])],
]);

const publishedSectionFigures: Record<string, Record<string, FigureDef>> = {
  "sayi-problemleri": { "Kapasite eşitliği birimlerin oranını buldurur": capacityWithBoxExample },
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
  const def = publishedSectionFigures[guideId]?.[title] ?? sectionFigures[guideId]?.[title];
  const photo = sectionImageFigures.get(guideId)?.get(title);
  if (!def && !photo) return null;
  return (
    <>
      {label && <p className="small muted">{label}</p>}
      {photo ? (
        <>
          <SourceQuestionFigure figure={photo.figure} />
          <a className="small" href={photo.url} target="_blank" rel="noopener noreferrer">
            {photo.credit}
          </a>
          {photo.licence && (
            <>
              {" · "}
              <a className="small" href={photo.licence} target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>
            </>
          )}
        </>
      ) : def && <SectionFigureView def={def} title={title} />}
    </>
  );
}
