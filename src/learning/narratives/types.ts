import { txt, type Lesson } from "../../domain/model";
export type DiagramKind =
  | "cell"
  | "nucleus"
  | "water"
  | "molecule"
  | "sample"
  | "chart"
  | "energy"
  | "document"
  | "number"
  | "plant";
export interface WalkNode {
  label: string;
  detail: string;
  kind: DiagramKind;
  symbol?: string;
}
export interface WalkCase {
  name: string;
  question: string;
  conclusion: string;
  nodes: WalkNode[];
  links?: string[];
  data?: { labels: string[]; values: number[]; unit: string; caption: string };
}
export interface NarrativePack {
  id: string;
  topicId: string;
  subjectId: string;
  title: string;
  minutes: number;
  source: string;
  objectives: string[];
  body: { title: string; text: string }[];
  pitfalls: { label: string; reason: string }[];
  cases: WalkCase[];
  recall: { prompt: string; answer: string }[];
  modelLimit: string;
}
export function narrativeLesson(pack: NarrativePack): Lesson {
  return {
    id: pack.id,
    subjectId: pack.subjectId,
    title: txt(pack.title),
    minutes: pack.minutes,
    objectives: pack.objectives.map(txt),
    body: pack.body.map((section) => ({
      title: txt(section.title),
      text: txt(section.text),
    })),
    source: txt(
      pack.source +
        " Anlatım ve şemalar özgündür; konu çalışması bildirimdir, ustalık ölçümü değildir.",
    ),
    questions: [],
    tags: ["kaynakli-anlatim", "adim-adim"],
  };
}
export const node = (
  label: string,
  detail: string,
  kind: DiagramKind = "molecule",
  symbol?: string,
): WalkNode => ({ label, detail, kind, symbol });
