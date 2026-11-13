import { openDB } from "idb";
import { initialState, stateSchema, type AppState } from "./model";
import { lessonById } from "./content";
import {
  parseCatalogue,
  type SourceCatalogue,
  type ResourceKind,
} from "./catalogue";
export function validateState(input: unknown): AppState {
  const state = stateSchema.parse(input);
  const ids = new Set<string>();
  for (const session of state.sessions) {
    if (ids.has(session.id)) throw Error("DUPLICATE_SESSION");
    ids.add(session.id);
    const lesson = lessonById(session.lessonId);
    if (!lesson) throw Error("UNKNOWN_LESSON");
    const questionIds = new Set<string>();
    for (const r of session.responses) {
      const q = lesson.questions.find((q) => q.id === r.questionId);
      if (
        !q ||
        r.selected >= q.options.length ||
        r.correct !== (r.selected === q.answer) ||
        questionIds.has(r.questionId)
      )
        throw Error("INVALID_RESPONSE");
      questionIds.add(r.questionId);
    }
  }
  const reviewIds = new Set<string>();
  for (const review of state.reviews) {
    if (
      reviewIds.has(review.id) ||
      !ids.has(review.originSessionId) ||
      !lessonById(review.lessonId) ||
      (review.completedSessionId && !ids.has(review.completedSessionId))
    )
      throw Error("INVALID_REVIEW");
    reviewIds.add(review.id);
  }
  if (state.draft) {
    const d = state.draft;
    const lesson = lessonById(d.lessonId);
    if (
      !lesson ||
      d.index >= lesson.questions.length ||
      (d.selected !== null &&
        d.selected >= lesson.questions[d.index].options.length) ||
      (d.reviewId && !reviewIds.has(d.reviewId))
    )
      throw Error("INVALID_DRAFT");
    for (const r of d.responses) {
      const q = lesson.questions.find((q) => q.id === r.questionId);
      if (
        !q ||
        r.selected >= q.options.length ||
        r.correct !== (r.selected === q.answer)
      )
        throw Error("INVALID_DRAFT_RESPONSE");
    }
  }
  return state;
}
let database: ReturnType<typeof openDB> | undefined;
function db() {
  if (!database) {
    const pending = openDB("yksmania", 2, {
      upgrade(d) {
        if (!d.objectStoreNames.contains("state")) d.createObjectStore("state");
        if (!d.objectStoreNames.contains("documents"))
          d.createObjectStore("documents", { keyPath: "id" });
        if (!d.objectStoreNames.contains("catalogue"))
          d.createObjectStore("catalogue");
      },
      blocking() {
        void database?.then((d) => d.close());
        database = undefined;
      },
      terminated() {
        database = undefined;
      },
    });
    database = pending;
    void pending.catch(() => {
      if (database === pending) database = undefined;
    });
  }
  return database;
}

export async function loadState(): Promise<AppState> {
  const d = await db();
  const data = await d.get("state", "current");
  if (!data) return initialState();
  const state = validateState(data);
  if (data.settings?.locale === "en") await d.put("state", state, "current");
  return state;
}
export async function saveState(state: AppState): Promise<void> {
  const d = await db();
  await d.put("state", validateState(state), "current");
}
export interface LocalDocument {
  id: string;
  name: string;
  subjectId: string;
  size: number;
  type: string;
  addedAt: string;
  blob: Blob;
  kind?: ResourceKind;
  sourceIds?: string[];
  subjectIds?: string[];
}
export async function putDocument(doc: LocalDocument) {
  const d = await db();
  await d.put("documents", doc);
}
export async function getDocuments(): Promise<LocalDocument[]> {
  const d = await db();
  return d.getAll("documents");
}
export async function deleteDocument(id: string) {
  const d = await db();
  await d.delete("documents", id);
}
export async function parseBackup(text: string): Promise<AppState> {
  if (text.length > 20_000_000) throw Error("BACKUP_TOO_LARGE");
  return validateState(JSON.parse(text));
}

export async function getCatalogue(): Promise<SourceCatalogue | null> {
  const d = await db();
  const c = await d.get("catalogue", "current");
  return c ? parseCatalogue(JSON.stringify(c)) : null;
}
export async function putCatalogue(c: SourceCatalogue) {
  const verified = parseCatalogue(JSON.stringify(c));
  const d = await db();
  await d.put("catalogue", verified, "current");
}
