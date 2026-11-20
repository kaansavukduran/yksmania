import type { FigureDef } from "../sectionFigures/figureKit";

/*
 * Temel İnşa (0. basamak): isteğe bağlı ön dersler. Çalışma planına, 505 konu
 * sayacına, XP'ye ve tekrar takvimine girmez; okuma ve figür keşfi kanıt
 * üretmez. Yalnız kontrol sorularının ilk cevabı saklanır (Temel İnşa kupası).
 * Sorular özgündür.
 */

/** Okumadan önce kısa tahmin; cevap düğmeyle açılır. */
export type FoundationPredict = { question: string; answer: string };

export type FoundationPage = {
  title: string;
  paragraphs: string[];
  /** Terim → sade tanım; ilk kullanımda açıklanır. */
  terms?: [string, string][];
  figure?: FigureDef;
  predict?: FoundationPredict;
};

export type FoundationExample = {
  title: string;
  given: string;
  steps: string[];
  answer: string;
  check: string;
};

export type FoundationCheck = {
  prompt: string;
  /** Beş seçenek; doğru seçenek `answer` indeksindedir. */
  options: [string, string, string, string, string];
  answer: number;
  explain: string;
  /** Her seçenek için kısa gerekçe (yanlışın nereden geldiği). */
  reasons: [string, string, string, string, string];
};

export type FoundationLesson = {
  id: string;
  subjectId: string;
  title: string;
  minutes: number;
  /** Bu ön dersin hangi TYT anlatımına hazırladığı (ders kimlikleri). */
  prepares: string[];
  goal: string;
  pages: FoundationPage[];
  examples: FoundationExample[];
  checks: FoundationCheck[];
};
