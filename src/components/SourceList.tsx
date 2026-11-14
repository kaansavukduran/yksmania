import { useMemo, useState } from "react";
import { Download, FileText, ExternalLink } from "lucide-react";
import { useApp } from "../store";
import { useLibrary } from "../useLibrary";
import {
  visibleIn,
  matchesSourceTopic,
  isPastExamSource,
  type SourceMode,
  type SourceTopic,
} from "../domain/catalogue";
import type { LocalDocument } from "../domain/storage";
import { DocumentReader } from "./DocumentReader";
import { topicDocuments } from "../domain/sourceMatching";
export function SourceList({
  subjectId,
  mode,
  topic,
}: {
  subjectId: string;
  mode: SourceMode;
  topic?: SourceTopic;
}) {
  const { t } = useApp();
  const { catalogue, documents, error, loading } = useLibrary();
  const [provider, setProvider] = useState("all");
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(20);
  const [opened, setOpened] = useState<LocalDocument | null>(null);
  const localBySource = useMemo(
    () =>
      new Map(
        documents.flatMap((d) =>
          (d.sourceIds ?? []).map((id) => [id, d] as const),
        ),
      ),
    [documents],
  );
  const entries = useMemo(
    () =>
      catalogue?.entries.filter(
        (e) =>
          e.subjectIds.includes(subjectId) &&
          visibleIn(e.kind, mode) &&
          (!topic || matchesSourceTopic(e.name, e.topicIds, topic)),
      ) ?? [],
    [catalogue, subjectId, mode, topic],
  );
  const filtered = entries.filter(
    (e) =>
      (provider === "all" ||
        (provider === "past"
          ? isPastExamSource(e.name, e.provider)
          : e.provider === provider)) &&
      e.name
        .toLocaleLowerCase("tr-TR")
        .includes(search.toLocaleLowerCase("tr-TR")),
  );
  const represented = new Set(
    entries.map((entry) => localBySource.get(entry.id)?.id),
  );
  const manual = topicDocuments(
    documents,
    catalogue,
    subjectId,
    mode,
    topic,
  ).filter((doc) => !represented.has(doc.id));
  const title = t(mode === "cheatsheets" ? "cheatsheetFiles" : "sourceFiles");
  return (
    <section className="source-browser" aria-label={title}>
      <h3>{title}</h3>
      {loading ? (
        <p>{t("loading")}</p>
      ) : error ? (
        <p role="alert">{t("fileError")}</p>
      ) : (
        <>
          {!catalogue && mode !== "cheatsheets" && (
            <p className="muted small">{t("importCatalogueHelp")}</p>
          )}
          {!!entries.length && (
            <>
              <p className="small muted">
                {entries.length.toLocaleString("tr-TR")}{" "}
                {t("catalogueReferences")} ·{" "}
                {entries.filter((e) => localBySource.has(e.id)).length}{" "}
                {t("onDevice")}.{" "}
                {mode !== "cheatsheets" && t("pdfNotQuestionBank")}
              </p>
              <div className="source-filters">
                <label className="field">
                  {t("sourceFilter")}
                  <select
                    value={provider}
                    onChange={(e) => {
                      setProvider(e.target.value);
                      setLimit(20);
                    }}
                  >
                    {["all", "mebi", "ogm", "past", "aurelia", "other"].map(
                      (x) => (
                        <option key={x} value={x}>
                          {t("provider_" + x)}
                        </option>
                      ),
                    )}
                  </select>
                </label>
                <label className="field">
                  {t("sourceSearch")}
                  <input
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setLimit(20);
                    }}
                  />
                </label>
              </div>
              <ul className="source-rows">
                {filtered.slice(0, limit).map((entry) => {
                  const doc = localBySource.get(entry.id);
                  return (
                    <li key={entry.id}>
                      <FileText size={19} aria-hidden="true" />
                      <div>
                        <strong>{entry.name}</strong>
                        <span className="small muted">
                          {t("kind_" + entry.kind)} ·{" "}
                          {(entry.bytes / 1024 / 1024).toFixed(1)} MB ·{" "}
                          {t(doc ? "onDevice" : "notOnDevice")}
                        </span>
                      </div>
                      {doc ? (
                        <button
                          className="secondary"
                          onClick={() => setOpened(doc)}
                        >
                          <Download size={15} />
                          {t("openPdf")}
                        </button>
                      ) : (
                        <a
                          className="text-button"
                          href={`https://drive.google.com/file/d/${encodeURIComponent(entry.id)}/view`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink size={15} />
                          {t("openDrive")}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
              {filtered.length > limit && (
                <button
                  className="secondary"
                  onClick={() => setLimit((n) => n + 20)}
                >
                  {t("showMore")} ({Math.min(limit, filtered.length)}/
                  {filtered.length})
                </button>
              )}
              {!filtered.length && <p className="muted">{t("noResults")}</p>}
            </>
          )}
          {!!manual.length && (
            <ul className="source-rows">
              {manual.map((d) => (
                <li key={d.id}>
                  <FileText size={19} />
                  <div>
                    <strong>{d.name}</strong>
                    <span className="small muted">
                      {t("kind_" + (d.kind ?? "mixed"))} · {t("onDevice")}
                    </span>
                  </div>
                  <button className="secondary" onClick={() => setOpened(d)}>
                    {t("openPdf")}
                  </button>
                </li>
              ))}
            </ul>
          )}
          {mode === "cheatsheets" && !entries.length && !manual.length && (
            <p className="muted small">{t("cheatsheetNoFiles")}</p>
          )}
        </>
      )}
      {opened && (
        <DocumentReader document={opened} close={() => setOpened(null)} />
      )}
    </section>
  );
}
