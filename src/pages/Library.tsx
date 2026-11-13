import { useEffect, useRef, useState } from "react";
import { FileText, Upload, Trash2, FolderOpen, ListTree } from "lucide-react";
import { useApp } from "../store";
import { subjects } from "../domain/content";
import {
  putDocument,
  deleteDocument,
  putCatalogue,
  type LocalDocument,
} from "../domain/storage";
import {
  hashPdf,
  sourceIndex,
  matchSource,
  parseCatalogue,
  resourceKinds,
  type ResourceKind,
} from "../domain/catalogue";
import { useLibrary, libraryChanged } from "../useLibrary";
import { DocumentReader } from "../components/DocumentReader";
import { Empty } from "../components/Shared";
export function Library() {
  const { t, l, toast } = useApp();
  const { documents: docs, catalogue, error, loading, reload } = useLibrary();
  const [subject, setSubject] = useState(subjects[0].id);
  const [kind, setKind] = useState<ResourceKind>("mixed");
  const [opened, setOpened] = useState<LocalDocument | null>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<{
    done: number;
    total: number;
    name: string;
    bytes: number;
    fileBytes: number;
  } | null>(null);
  const [report, setReport] = useState<{
    saved: number;
    duplicates: number;
    failed: string[];
    cancelled: boolean;
    unmatched: number;
  } | null>(null);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(30);
  const input = useRef<HTMLInputElement>(null);
  const folder = useRef<HTMLInputElement>(null);
  const catalogInput = useRef<HTMLInputElement>(null);
  const controller = useRef<AbortController | null>(null);
  useEffect(() => () => controller.current?.abort(), []);
  async function importFiles(files: File[]) {
    if (busy) return;
    const pdfs = files.filter(
      (f) => /\.pdf$/i.test(f.name) || f.type === "application/pdf",
    );
    if (!pdfs.length) {
      toast(t("pdfInvalid"));
      return;
    }
    const abort = new AbortController();
    controller.current = abort;
    setBusy(true);
    setReport(null);
    const result = {
      saved: 0,
      duplicates: 0,
      failed: [] as string[],
      cancelled: false,
      unmatched: 0,
    };
    const known = new Map(docs.map((d) => [d.id, d]));
    const lookup = sourceIndex(catalogue);
    try {
      for (const [i, file] of pdfs.entries()) {
        if (abort.signal.aborted) {
          result.cancelled = true;
          break;
        }
        setProgress({
          done: i,
          total: pdfs.length,
          name: file.name,
          bytes: 0,
          fileBytes: file.size,
        });
        try {
          const hash = await hashPdf(file, abort.signal, (bytes) =>
            setProgress({
              done: i,
              total: pdfs.length,
              name: file.name,
              bytes,
              fileBytes: file.size,
            }),
          );
          const source = matchSource(file.name, catalogue, lookup);
          const prior = known.get(hash);
          const subjectIds = source?.subjectIds ?? [subject];
          if (!source) result.unmatched++;
          const doc: LocalDocument = {
            id: hash,
            name: prior?.name ?? file.name,
            subjectId: prior?.subjectId ?? subjectIds[0],
            subjectIds: [
              ...new Set([
                ...(prior?.subjectIds ?? (prior ? [prior.subjectId] : [])),
                ...subjectIds,
              ]),
            ],
            sourceIds: [
              ...new Set([
                ...(prior?.sourceIds ?? []),
                ...(source ? [source.id] : []),
              ]),
            ],
            kind:
              prior && prior.kind !== (source?.kind ?? kind)
                ? "mixed"
                : (source?.kind ?? kind),
            size: file.size,
            type: "application/pdf",
            addedAt: prior?.addedAt ?? new Date().toISOString(),
            blob: prior?.blob ?? file,
          };
          abort.signal.throwIfAborted();
          await putDocument(doc);
          known.set(hash, doc);
          if (prior) result.duplicates++;
          else result.saved++;
        } catch (e) {
          if (abort.signal.aborted) {
            result.cancelled = true;
            break;
          }
          result.failed.push(file.name);
        }
        setProgress((p) => (p ? { ...p, done: i + 1 } : p));
      }
    } finally {
      setReport(result);
      setBusy(false);
      controller.current = null;
      libraryChanged();
      if (input.current) input.current.value = "";
      if (folder.current) folder.current.value = "";
    }
  }
  async function importCatalogue(file: File) {
    setProgress(null);
    setReport(null);
    setBusy(true);
    try {
      if (file.size > 25_000_000) throw Error();
      const c = parseCatalogue(await file.text());
      if (catalogue && !confirm(t("replaceCatalogue"))) return;
      await putCatalogue(c);
      libraryChanged();
      toast(t("catalogueSaved"));
    } catch {
      toast(t("catalogueInvalid"));
    } finally {
      setBusy(false);
      if (catalogInput.current) catalogInput.current.value = "";
    }
  }
  const filtered = docs.filter((d) =>
    d.name
      .toLocaleLowerCase("tr-TR")
      .includes(search.toLocaleLowerCase("tr-TR")),
  );
  return (
    <>
      <header className="page-heading">
        <div>
          <h1>{t("library")}</h1>
        </div>
      </header>
      <p className="lead muted">{t("libraryBody")}</p>
      <section className="panel source-status">
        <h2>{t("sourceCatalogue")}</h2>
        <p>{t("cataloguePrivacy")}</p>
        <input
          type="file"
          ref={catalogInput}
          accept="application/json,.json"
          hidden
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) void importCatalogue(f);
          }}
        />
        <button
          className="secondary"
          disabled={busy}
          onClick={() => catalogInput.current?.click()}
        >
          <ListTree size={18} />
          {t("importCatalogue")}
        </button>
        {catalogue && (
          <p className="small">
            <strong>{catalogue.name}</strong> ·{" "}
            {catalogue.entries.length.toLocaleString("tr-TR")}{" "}
            {t("catalogueReferences")} ·{" "}
            {(
              catalogue.entries.reduce((n, e) => n + e.bytes, 0) /
              1024 ** 3
            ).toFixed(1)}{" "}
            GB · {t("catalogueNotDownload")}
          </p>
        )}
      </section>
      <section className="panel import-panel">
        <div className="import-options">
          <label className="field">
            {t("fallbackSubject")}
            <select
              value={subject}
              disabled={busy}
              onChange={(e) => setSubject(e.target.value)}
            >
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.exam} · {l(s.name)}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            {t("documentKind")}
            <select
              value={kind}
              disabled={busy}
              onChange={(e) => setKind(e.target.value as ResourceKind)}
            >
              {resourceKinds.map((k) => (
                <option key={k} value={k}>
                  {t("kind_" + k)}
                </option>
              ))}
            </select>
          </label>
          <p className="small muted">{t("bulkImportHelp")}</p>
        </div>
        <input
          ref={input}
          type="file"
          multiple
          accept="application/pdf,.pdf"
          hidden
          onChange={(e) => {
            if (e.target.files) void importFiles(Array.from(e.target.files));
          }}
        />
        <input
          ref={(el) => {
            folder.current = el;
            el?.setAttribute("webkitdirectory", "");
          }}
          type="file"
          multiple
          hidden
          onChange={(e) => {
            if (e.target.files) void importFiles(Array.from(e.target.files));
          }}
        />
        <div className="import-actions">
          <button
            className="primary"
            disabled={busy}
            onClick={() => input.current?.click()}
          >
            <Upload size={18} />
            {t("importPdf")}
          </button>
          <button
            className="secondary"
            disabled={busy}
            onClick={() => folder.current?.click()}
          >
            <FolderOpen size={18} />
            {t("importFolder")}
          </button>
        </div>
      </section>
      {busy && progress && (
        <section
          className="panel bulk-progress"
          aria-label={t("importProgress")}
        >
          <p>
            {progress.done}/{progress.total} {t("filesProcessed")}
          </p>
          <progress
            max={progress.total}
            value={progress.done}
            aria-label={t("importProgress")}
          />
          <p className="small">
            {progress.name} · {(progress.bytes / 1024 / 1024).toFixed(1)}/
            {(progress.fileBytes / 1024 / 1024).toFixed(1)} MB
          </p>
          <p className="small muted">{t("importKeepOpen")}</p>
          <button
            className="secondary"
            onClick={() => controller.current?.abort()}
          >
            {t("stopImport")}
          </button>
        </section>
      )}
      {report && (
        <section className="panel import-report" role="status">
          <p>
            {report.saved} {t("filesImported")} · {report.duplicates}{" "}
            {t("duplicateFiles")} · {report.failed.length} {t("failedFiles")}
          </p>
          {report.cancelled && <p>{t("importStopped")}</p>}
          {!!report.unmatched && (
            <p>
              {report.unmatched} {t("fallbackUsed")}
            </p>
          )}
          {!!report.failed.length && (
            <details>
              <summary>{t("failedFiles")}</summary>
              <ul>
                {report.failed.map((name, i) => (
                  <li key={i}>{name}</li>
                ))}
              </ul>
            </details>
          )}
          <p className="small muted">{t("pdfNotQuestionBank")}</p>
        </section>
      )}
      <div className="toolbar">
        <label className="search">
          <input
            aria-label={t("sourceSearch")}
            placeholder={t("sourceSearch")}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setLimit(30);
            }}
          />
        </label>
        <span>
          {docs.length} {t("onDevice")}
        </span>
      </div>
      {loading ? (
        <p>{t("loading")}</p>
      ) : error ? (
        <div role="alert">
          {t("fileError")}
          <button onClick={reload}>{t("retry")}</button>
        </div>
      ) : !filtered.length ? (
        <Empty text={t("noDocuments")} />
      ) : (
        <section className="panel document-list">
          {filtered.slice(0, limit).map((doc) => (
            <article className="document-row" key={doc.id}>
              <FileText size={25} />
              <button className="document-open" onClick={() => setOpened(doc)}>
                <strong>{doc.name}</strong>
                <span className="small muted">
                  {t("kind_" + (doc.kind ?? "mixed"))} ·{" "}
                  {(doc.size / 1024 / 1024).toFixed(1)} MB ·{" "}
                  {(doc.subjectIds ?? [doc.subjectId])
                    .map((id) => {
                      const s = subjects.find((s) => s.id === id);
                      return s ? `${s.exam} ${l(s.name)}` : id;
                    })
                    .join(", ")}
                </span>
              </button>
              <button
                className="icon-button"
                aria-label={`${t("delete")}: ${doc.name}`}
                onClick={() => {
                  if (confirm(t("deleteConfirm")))
                    void deleteDocument(doc.id)
                      .then(libraryChanged)
                      .catch(() => toast(t("fileError")));
                }}
              >
                <Trash2 size={17} />
              </button>
            </article>
          ))}
          {filtered.length > limit && (
            <button
              className="secondary"
              onClick={() => setLimit((n) => n + 30)}
            >
              {t("showMore")} ({limit}/{filtered.length})
            </button>
          )}
        </section>
      )}
      {opened && (
        <DocumentReader document={opened} close={() => setOpened(null)} />
      )}
    </>
  );
}
