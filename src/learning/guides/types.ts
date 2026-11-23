export interface GuideSection {
  title: string;
  paragraphs: string[];
  table?: { headers: string[]; rows: string[][]; layout?: "table" };
  figureTitle?: string;
}
export interface WorkedExample {
  title: string;
  prompt: string;
  strategy: string;
  steps: { label: string; explanation: string; expression?: string; figureTitle?: string }[];
  answer: string;
  check: string;
  pitfall: string;
}
export interface LessonGuide {
  id: string;
  minutes: number;
  objectives: string[];
  sections: GuideSection[];
  examples: WorkedExample[];
  recall: { prompt: string; answer: string }[];
  source: string;
}
