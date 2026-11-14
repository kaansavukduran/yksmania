import { subjects } from "./content";
import {
  matchesSourceTopic,
  visibleIn,
  type SourceCatalogue,
  type SourceMode,
  type SourceTopic,
} from "./catalogue";
import type { LocalDocument } from "./storage";

const words = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

// Conservative filename fallback. A personal catalogue always takes precedence.
export function inferSourceFile(name: string) {
  const normalized = ` ${words(name)} `;
  const exam = /\bAYT\b/i.test(name)
    ? "AYT"
    : /\bTYT\b/i.test(name)
      ? "TYT"
      : undefined;
  const matches = subjects.filter(
    (s) => s.exam === exam && normalized.includes(` ${words(s.name.tr)} `),
  );
  return {
    subjectIds: matches.length === 1 ? [matches[0].id] : undefined,
    kind:
      normalized.includes(" kopya kagidi ") ||
      normalized.includes(" kopya kagitlari ")
        ? ("cheatsheet" as const)
        : undefined,
  };
}

export function topicDocuments(
  documents: LocalDocument[],
  catalogue: SourceCatalogue | null,
  subjectId: string,
  mode: SourceMode,
  topic?: SourceTopic,
) {
  const entries = new Map(catalogue?.entries.map((e) => [e.id, e]));
  return documents.filter((doc) => {
    if (
      topic &&
      doc.topicIds?.includes(topic.id) &&
      (doc.subjectIds ?? [doc.subjectId]).includes(subjectId) &&
      visibleIn(doc.kind ?? "mixed", mode)
    )
      return true;
    const associated = (doc.sourceIds ?? [])
      .map((id) => entries.get(id))
      .filter((e) => e !== undefined);
    if (associated.length)
      return associated.some(
        (e) =>
          e.subjectIds.includes(subjectId) &&
          visibleIn(e.kind, mode) &&
          (!topic || matchesSourceTopic(e.name, e.topicIds, topic)),
      );
    const inferred = inferSourceFile(doc.name);
    return (
      (doc.subjectIds ?? [doc.subjectId]).includes(subjectId) &&
      visibleIn(inferred.kind ?? doc.kind ?? "mixed", mode) &&
      (!topic || matchesSourceTopic(doc.name, doc.topicIds, topic))
    );
  });
}
