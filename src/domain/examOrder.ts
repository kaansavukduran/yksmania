import type { ExamItem } from "./examModel";

/*
 * Karma denemede ders bloklarının sırası. Yalnız soruların sırası değişir;
 * soru içerikleri ve ders başına soru sayıları aynı kalır. Son kullanılan sıra
 * bu cihazda yerel olarak hatırlanır (kişisel kolaylık; ilerleme kaydı değil).
 */

export type ExamBlock = { id: string; label: string; subjects: readonly string[] };

export const EXAM_BLOCKS: Record<"TYT" | "AYT", readonly ExamBlock[]> = {
  // Varsayılan sıra hazır denemenin önceki sırasıyla aynıdır.
  TYT: [
    { id: "turkce", label: "Türkçe", subjects: ["tyt-turkce"] },
    { id: "matematik", label: "Temel Matematik", subjects: ["tyt-matematik", "tyt-geometri"] },
    { id: "sosyal", label: "Sosyal Bilimler", subjects: ["tyt-tarih", "tyt-cografya", "tyt-felsefe", "tyt-din"] },
    { id: "fen", label: "Fen Bilimleri", subjects: ["tyt-fizik", "tyt-kimya", "tyt-biyoloji"] },
  ],
  AYT: [
    { id: "matematik", label: "Matematik", subjects: ["ayt-matematik", "ayt-geometri"] },
    { id: "fizik", label: "Fizik", subjects: ["ayt-fizik"] },
    { id: "kimya", label: "Kimya", subjects: ["ayt-kimya"] },
    { id: "biyoloji", label: "Biyoloji", subjects: ["ayt-biyoloji"] },
  ],
};

export const defaultBlockOrder = (exam: "TYT" | "AYT") => EXAM_BLOCKS[exam].map((b) => b.id);

/** Geçerli bir permütasyon değilse varsayılan sıra döner. */
export function normalizeBlockOrder(exam: "TYT" | "AYT", order: unknown): string[] {
  const ids = defaultBlockOrder(exam);
  if (
    !Array.isArray(order) ||
    order.length !== ids.length ||
    new Set(order).size !== ids.length ||
    !order.every((id) => typeof id === "string" && ids.includes(id))
  )
    return ids;
  return [...order] as string[];
}

/** Bloğu bir adım yukarı (-1) ya da aşağı (+1) taşır; sınırda sıra aynı kalır. */
export function moveBlock(order: readonly string[], id: string, direction: -1 | 1): string[] {
  const from = order.indexOf(id),
    to = from + direction;
  if (from < 0 || to < 0 || to >= order.length) return [...order];
  const next = [...order];
  [next[from], next[to]] = [next[to], next[from]];
  return next;
}

/**
 * Soruları seçilen blok sırasına dizer. Blok içindeki sıra korunur; hiçbir
 * bloğa ait olmayan sorular en sonda, kendi sıralarıyla kalır.
 */
export function orderExamItems<T extends Pick<ExamItem, "subjectId">>(
  exam: "TYT" | "AYT",
  items: readonly T[],
  order: unknown,
): T[] {
  const blocks = EXAM_BLOCKS[exam],
    rank = normalizeBlockOrder(exam, order),
    position = (item: T) => {
      const block = blocks.find((b) => b.subjects.includes(item.subjectId));
      return block ? rank.indexOf(block.id) : rank.length;
    };
  return items
    .map((item, index) => ({ item, index, at: position(item) }))
    .sort((a, b) => a.at - b.at || a.index - b.index)
    .map((row) => row.item);
}

const STORAGE_KEY = "yksmania.examBlockOrder.v1";
type OrderStore = Pick<Storage, "getItem" | "setItem">;
const browserStore = (): OrderStore | undefined => {
  try {
    return globalThis.localStorage;
  } catch {
    return undefined;
  }
};

/** Son kullanılan sıra; okunamazsa varsayılan. */
export function loadBlockOrder(exam: "TYT" | "AYT", store: OrderStore | undefined = browserStore()): string[] {
  try {
    const saved = JSON.parse(store?.getItem(STORAGE_KEY) ?? "null");
    return normalizeBlockOrder(exam, saved?.[exam]);
  } catch {
    return defaultBlockOrder(exam);
  }
}

export function saveBlockOrder(
  exam: "TYT" | "AYT",
  order: readonly string[],
  store: OrderStore | undefined = browserStore(),
) {
  try {
    if (!store) return;
    let saved: Record<string, unknown> = {};
    try {
      const parsed = JSON.parse(store.getItem(STORAGE_KEY) ?? "null");
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) saved = parsed;
    } catch {
      saved = {};
    }
    store.setItem(STORAGE_KEY, JSON.stringify({ ...saved, [exam]: normalizeBlockOrder(exam, order) }));
  } catch {
    // Yerel depolama kapalıysa sıra yalnız bu oturumda geçerlidir.
  }
}
