import { foundationsMastered } from "./foundationAttempts";
import type { AppState, Session } from "./model";
import type { ExamSession } from "./examModel";

/*
 * Trophies (kupalar), derived — never stored — from real learning evidence:
 * independent correct answers (no hint, no help), completed 3/7/21 reviews,
 * wrong answers later answered correctly without help (repair), and finished
 * exams taken without help. Reading, time spent, exploring a model, imports
 * and manual check marks never count. The engine is pure and deterministic, so
 * an existing profile's history yields the same trophies on every device and
 * nothing is ever reset or written.
 */

export type Tier = 0 | 1 | 2 | 3; // 0 kilitli, 1 bronz, 2 gümüş, 3 altın
export type TrophyCategory = "ders" | "ustalik" | "sureklilik" | "sinav" | "gizli" | "platin";

export interface TrophyDef {
  id: string;
  title: string;
  /** What has to happen, in plain words; the {n} is the next threshold. */
  goal: string;
  category: TrophyCategory;
  thresholds: [number, number, number];
  secret?: boolean;
  /** Platinum trophies have a single tier: all listed trophies at gold. */
  platinum?: boolean;
}

export interface TrophyState extends TrophyDef {
  value: number;
  tier: Tier;
  /** Threshold of the next tier, or null when gold (or platinum) is reached. */
  next: number | null;
}

export const SUBJECTS: { id: string; name: string; badge: string; group: "TYT" | "AYT" }[] = [
  { id: "tyt-turkce", name: "TYT Türkçe", badge: "Paragraf Cerrahı", group: "TYT" },
  { id: "tyt-matematik", name: "TYT Matematik", badge: "Sayı Avcısı", group: "TYT" },
  { id: "tyt-geometri", name: "TYT Geometri", badge: "Üçgen Mühendisi", group: "TYT" },
  { id: "tyt-fizik", name: "TYT Fizik", badge: "Vektör Bükücü", group: "TYT" },
  { id: "tyt-kimya", name: "TYT Kimya", badge: "Mol Simyacısı", group: "TYT" },
  { id: "tyt-biyoloji", name: "TYT Biyoloji", badge: "Hücre Gezgini", group: "TYT" },
  { id: "tyt-tarih", name: "TYT Tarih", badge: "Zaman Yolcusu", group: "TYT" },
  { id: "tyt-cografya", name: "TYT Coğrafya", badge: "Harita Kâşifi", group: "TYT" },
  { id: "tyt-felsefe", name: "TYT Felsefe", badge: "Soru Soran Zihin", group: "TYT" },
  { id: "tyt-din", name: "TYT Din Kültürü", badge: "Kavram Ustası", group: "TYT" },
  { id: "ayt-matematik", name: "AYT Matematik", badge: "İntegral Mimarı", group: "AYT" },
  { id: "ayt-geometri", name: "AYT Geometri", badge: "Analitik Pusula", group: "AYT" },
  { id: "ayt-fizik", name: "AYT Fizik", badge: "Alan Bükücü", group: "AYT" },
  { id: "ayt-kimya", name: "AYT Kimya", badge: "Denge Ustası", group: "AYT" },
  { id: "ayt-biyoloji", name: "AYT Biyoloji", badge: "DNA Şifre Kırıcı", group: "AYT" },
];

/** A lesson counts as mastered by a session with ≥ 5 answers and ≥ 80 % independent correct. */
const MASTERY_MIN = 5;
const MASTERY_RATIO = 0.8;

const BASE: TrophyDef[] = [
  ...SUBJECTS.map<TrophyDef>((s) => ({
    id: `ders:${s.id}`,
    title: s.badge,
    goal: `${s.name}: {n} konuda ustalaş`,
    category: "ders",
    thresholds: [1, 5, 12],
  })),
  { id: "soru-canavari", title: "Soru Canavarı", goal: "{n} soruyu ipucu ve yardım almadan doğru çöz", category: "ustalik", thresholds: [100, 500, 2500] },
  { id: "kusursuz-seri", title: "Kusursuz Seri", goal: "En az 10 soruluk bir oturumu yardımsız ve sıfır hatayla bitir ({n} kez)", category: "ustalik", thresholds: [1, 5, 20] },
  { id: "ipucu-yok", title: "İpucu Yok, Panik Yok", goal: "AYT'den en az 10 soruluk bir seti hiç yardım almadan %80 doğruyla bitir ({n} kez)", category: "ustalik", thresholds: [1, 5, 15] },
  { id: "yildiz-avcisi", title: "Yıldız Avcısı", goal: "7 yıldız ve üstü {n} farklı soruyu yardımsız doğru çöz", category: "ustalik", thresholds: [10, 50, 200] },
  { id: "secici-zirve", title: "Seçici Zirve", goal: "9–10 yıldızlı {n} farklı soruyu yardımsız doğru çöz", category: "ustalik", thresholds: [5, 25, 100] },
  { id: "yildiz-merdiveni", title: "Yıldız Merdiveni", goal: "{n} derste 1'den 10'a kadar her yıldız düzeyinden en az bir soruyu yardımsız doğru çöz", category: "ustalik", thresholds: [1, 3, 8] },
  { id: "temel-insa", title: "Temel İnşa", goal: "{n} ön dersin bütün kontrol sorularını ilk denemede doğru çöz", category: "ustalik", thresholds: [3, 10, 25] },
  { id: "hata-mezarligi", title: "Hata Mezarlığı", goal: "Yanlış yaptığın {n} soruyu sonra yardımsız doğru çözerek onar", category: "ustalik", thresholds: [25, 50, 100] },
  { id: "tuzak-avcisi", title: "Tuzak Avcısı", goal: "\"Eminim\" deyip yanlış yaptığın {n} soruyu sonra yardımsız doğru çöz", category: "ustalik", thresholds: [1, 10, 30] },
  { id: "tekrar-dongusu", title: "Hatırlama Döngüsü", goal: "Vadesi gelen {n} tekrarı en az bir yardımsız doğruyla tamamla", category: "sureklilik", thresholds: [5, 30, 100] },
  { id: "altin-bellek", title: "21. Gün Mühürcüsü", goal: "{n} konuyu 21. gün tekrarında %80 yardımsız doğruyla mühürle", category: "sureklilik", thresholds: [1, 10, 30] },
  { id: "ritim", title: "Ritim", goal: "Art arda {n} gün en az bir soruyu yardımsız doğru çöz", category: "sureklilik", thresholds: [3, 7, 21] },
  { id: "deneme-savascisi", title: "Deneme Savaşçısı", goal: "Yardımsız {n} deneme bitir", category: "sinav", thresholds: [1, 5, 15] },
  { id: "net-avcisi", title: "Net Avcısı", goal: "En az 20 soruluk yardımsız bir denemede %{n} net oranına ulaş", category: "sinav", thresholds: [50, 70, 85] },
  { id: "gizli:cok-yonlu", title: "Çok Yönlü", goal: "Bir hafta içinde {n} farklı dersten yardımsız doğru çöz", category: "gizli", thresholds: [3, 5, 8], secret: true },
  { id: "gizli:tam-isabet", title: "Tam İsabet", goal: "En az 20 soruluk yardımsız bir denemeyi {n} yanlışla bitir", category: "gizli", thresholds: [1, 1, 1], secret: true },
  { id: "gizli:inatci", title: "İnatçı", goal: "İki kez yanlış yaptığın {n} soruyu sonunda yardımsız doğru çöz", category: "gizli", thresholds: [1, 5, 15], secret: true },
];

const subjectTrophies = (group: "TYT" | "AYT") => SUBJECTS.filter((s) => s.group === group).map((s) => `ders:${s.id}`);
const PLATINUM: TrophyDef[] = [
  { id: "platin:tyt", title: "TYT Platin", goal: "TYT'nin bütün ders rozetlerini altına çıkar", category: "platin", thresholds: [1, 1, 1], platinum: true },
  { id: "platin:tyt-fen", title: "TYT Fen Platin", goal: "TYT Fizik, TYT Kimya ve TYT Biyoloji rozetlerini altına çıkar", category: "platin", thresholds: [1, 1, 1], platinum: true },
  { id: "platin:ayt", title: "AYT Sayısal Platin", goal: "AYT Sayısal'ın bütün ders rozetlerini altına çıkar", category: "platin", thresholds: [1, 1, 1], platinum: true },
  { id: "platin:efsane", title: "YKS Efsanesi", goal: "Gizli olmayan bütün kupaları altına çıkar", category: "platin", thresholds: [1, 1, 1], platinum: true },
];
const PLATINUM_MEMBERS: Record<string, string[]> = {
  "platin:tyt": subjectTrophies("TYT"),
  "platin:tyt-fen": ["tyt-fizik", "tyt-kimya", "tyt-biyoloji"].map((id) => `ders:${id}`),
  "platin:ayt": subjectTrophies("AYT"),
  "platin:efsane": BASE.filter((t) => !t.secret).map((t) => t.id),
};

export const TROPHIES: TrophyDef[] = [...BASE, ...PLATINUM];

const independentRatio = (s: Session) => (s.responses.length ? s.responses.filter((r) => r.correct && !r.assisted).length / s.responses.length : 0);
const isIndependentExam = (e: ExamSession) => e.mode !== "learning" && !e.helpEnabled;

function examNetRatio(e: ExamSession): number {
  let correct = 0;
  let wrong = 0;
  e.items.forEach((q, i) => {
    const a = e.answers[i];
    if (a === null || a === undefined) return;
    if (a === q.answer) correct++;
    else wrong++;
  });
  return e.items.length ? Math.max(0, (correct - wrong / 4) / e.items.length) : 0;
}

/** Day index (UTC days since epoch) of a YYYY-MM-DD date. */
const dayIndex = (date: string) => Math.round(Date.parse(`${date}T00:00:00Z`) / 86400000);

export function evaluateTrophies(
  state: AppState,
  subjectOf: (lessonId: string) => string | undefined,
  starOf: (questionId: string) => number | undefined = () => undefined,
): TrophyState[] {
  const sessions = [...state.sessions].sort((a, b) => (a.finishedAt < b.finishedAt ? -1 : a.finishedAt > b.finishedAt ? 1 : 0));
  const values: Record<string, number> = {};

  // Mastered lessons per subject.
  const mastered = new Map<string, Set<string>>();
  for (const s of sessions) {
    if (s.responses.length < MASTERY_MIN || independentRatio(s) < MASTERY_RATIO) continue;
    const subject = subjectOf(s.lessonId);
    if (!subject) continue;
    (mastered.get(subject) ?? mastered.set(subject, new Set()).get(subject)!).add(s.lessonId);
  }
  for (const subject of SUBJECTS) values[`ders:${subject.id}`] = mastered.get(subject.id)?.size ?? 0;

  values["temel-insa"] = foundationsMastered(state);
  values["soru-canavari"] = sessions.reduce((n, s) => n + s.responses.filter((r) => r.correct && !r.assisted).length, 0);
  values["kusursuz-seri"] = sessions.filter((s) => s.responses.length >= 10 && s.responses.every((r) => r.correct && !r.assisted)).length;
  values["ipucu-yok"] = sessions.filter(
    (s) => s.responses.length >= 10 && s.responses.every((r) => !r.assisted) && independentRatio(s) >= 0.8 && (subjectOf(s.lessonId) ?? "").startsWith("ayt-"),
  ).length;

  // Repairs: a wrong answer followed later by an independent correct answer to the same question.
  const wrongCount = new Map<string, number>();
  const highWrong = new Set<string>();
  const repaired = new Set<string>();
  const repairedHigh = new Set<string>();
  const stubborn = new Set<string>();
  for (const s of sessions)
    for (const r of s.responses) {
      if (!r.correct) {
        wrongCount.set(r.questionId, (wrongCount.get(r.questionId) ?? 0) + 1);
        if (r.confidence === "high") highWrong.add(r.questionId);
      } else if (!r.assisted && wrongCount.has(r.questionId)) {
        repaired.add(r.questionId);
        if (highWrong.has(r.questionId)) repairedHigh.add(r.questionId);
        if ((wrongCount.get(r.questionId) ?? 0) >= 2) stubborn.add(r.questionId);
      }
    }
  values["hata-mezarligi"] = repaired.size;
  values["tuzak-avcisi"] = repairedHigh.size;
  values["gizli:inatci"] = stubborn.size;

  // Reviews completed with real recall.
  const byId = new Map(sessions.map((s) => [s.id, s]));
  let reviewsDone = 0;
  const sealed = new Set<string>();
  for (const review of state.reviews) {
    const s = review.completedSessionId ? byId.get(review.completedSessionId) : undefined;
    if (!s) continue;
    if (s.responses.some((r) => r.correct && !r.assisted)) reviewsDone++;
    if (review.stage === 21 && s.responses.length > 0 && independentRatio(s) >= MASTERY_RATIO) sealed.add(review.lessonId);
  }
  values["tekrar-dongusu"] = reviewsDone;
  values["altin-bellek"] = sealed.size;

  // Rhythm: longest run of consecutive days with at least one independent correct answer.
  const days = [...new Set(sessions.filter((s) => s.responses.some((r) => r.correct && !r.assisted)).map((s) => dayIndex(s.date)))].sort((a, b) => a - b);
  let best = 0;
  let run = 0;
  days.forEach((d, i) => {
    run = i > 0 && d === days[i - 1] + 1 ? run + 1 : 1;
    best = Math.max(best, run);
  });
  values["ritim"] = best;

  // Diversity within any 7-day window.
  let diverse = 0;
  const solved = sessions
    .filter((s) => s.responses.some((r) => r.correct && !r.assisted))
    .map((s) => ({ day: dayIndex(s.date), subject: subjectOf(s.lessonId) }))
    .filter((x): x is { day: number; subject: string } => !!x.subject);
  for (const start of solved) {
    const inWeek = new Set(solved.filter((x) => x.day >= start.day && x.day < start.day + 7).map((x) => x.subject));
    diverse = Math.max(diverse, inWeek.size);
  }
  values["gizli:cok-yonlu"] = diverse;

  // Difficulty stars: distinct questions solved without help, in study sets
  // and in exams taken without help. Stars are an estimate (difficulty.ts).
  const exams = state.examSessions.filter(isIndependentExam);
  const starSolved = new Map<string, { star: number; subject?: string }>();
  for (const s of sessions)
    for (const r of s.responses)
      if (r.correct && !r.assisted) {
        const star = starOf(r.questionId);
        if (star) starSolved.set(r.questionId, { star, subject: subjectOf(s.lessonId) });
      }
  for (const e of exams)
    e.items.forEach((q, i) => {
      if (e.answers[i] !== q.answer) return;
      const star = starOf(q.id);
      if (star) starSolved.set(q.id, { star, subject: q.subjectId });
    });
  const solvedRows = [...starSolved.values()];
  values["yildiz-avcisi"] = solvedRows.filter((x) => x.star >= 7).length;
  values["secici-zirve"] = solvedRows.filter((x) => x.star >= 9).length;
  const ladders = new Map<string, Set<number>>();
  for (const x of solvedRows) if (x.subject) (ladders.get(x.subject) ?? ladders.set(x.subject, new Set()).get(x.subject)!).add(x.star);
  values["yildiz-merdiveni"] = [...ladders.values()].filter((stars) => stars.size >= 10).length;

  // Exams without help.
  values["deneme-savascisi"] = exams.length;
  const big = exams.filter((e) => e.items.length >= 20);
  values["net-avcisi"] = Math.round(Math.max(0, ...big.map(examNetRatio)) * 100);
  values["gizli:tam-isabet"] = big.some((e) => e.items.every((q, i) => e.answers[i] === null || e.answers[i] === q.answer) && e.answers.some((a) => a !== null)) ? 1 : 0;

  const tierOf = (def: TrophyDef, value: number): Tier => (value >= def.thresholds[2] ? 3 : value >= def.thresholds[1] ? 2 : value >= def.thresholds[0] ? 1 : 0);
  const base: TrophyState[] = BASE.map((def) => {
    const value = values[def.id] ?? 0;
    const tier = def.id === "gizli:tam-isabet" ? ((value >= 1 ? 3 : 0) as Tier) : tierOf(def, value);
    return { ...def, value, tier, next: tier >= 3 ? null : def.thresholds[tier as 0 | 1 | 2] };
  });
  const gold = new Set(base.filter((t) => t.tier === 3).map((t) => t.id));
  const platinum: TrophyState[] = PLATINUM.map((def) => {
    const members = PLATINUM_MEMBERS[def.id];
    const done = members.filter((m) => gold.has(m)).length;
    const complete = done === members.length;
    return { ...def, thresholds: [members.length, members.length, members.length], value: done, tier: complete ? 3 : 0, next: complete ? null : members.length };
  });
  return [...base, ...platinum];
}

/** Locked or partly earned trophies closest to their next tier (secret ones stay hidden). */
export function nearestTrophies(list: TrophyState[], count = 3): TrophyState[] {
  return list
    .filter((t) => t.next !== null && !t.secret && !t.platinum)
    .map((t) => ({ t, ratio: t.value / (t.next as number) }))
    .sort((a, b) => b.ratio - a.ratio || a.t.title.localeCompare(b.t.title, "tr"))
    .slice(0, count)
    .map((x) => x.t);
}

/** Showcase totals: trophies opened (any tier, platinum included) out of all trophies. */
export function trophyTotals(list: TrophyState[]): { earned: number; total: number; gold: number; percent: number } {
  const earned = list.filter((t) => t.tier > 0).length;
  const total = list.length;
  return { earned, total, gold: list.filter((t) => t.tier === 3).length, percent: total ? Math.round((earned / total) * 100) : 0 };
}

/**
 * Trophies whose tier rose above what this device already announced. A device
 * with no record yet announces nothing, so an existing history never replays
 * celebrations; a page reload sees the stored record and stays quiet too.
 */
export function newlyUnlocked(list: TrophyState[], announced: Record<string, number> | null): TrophyState[] {
  if (!announced) return [];
  return list.filter((t) => t.tier > (announced[t.id] ?? 0));
}

export const TIER_NAME: Record<Tier, string> = { 0: "Kilitli", 1: "Bronz", 2: "Gümüş", 3: "Altın" };
