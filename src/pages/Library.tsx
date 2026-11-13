import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { FileText, Upload, Trash2, X } from "lucide-react";
import { useApp } from "../store";
import { subjects } from "../domain/content";
import {
  getDocuments,
  putDocument,
  deleteDocument,
  type LocalDocument,
} from "../domain/storage";
import { Empty } from "../components/Shared";
const PdfReader = lazy(() => import("../components/PdfReader"));
export function Library() {
  const { t, l, toast } = useApp();
  const [docs, setDocs] = useState<LocalDocument[]>([]);
  const [subject, setSubject] = useState(subjects[0].id);
  const [opened, setOpened] = useState<LocalDocument | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const readerDialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (opened && readerDialog.current && !readerDialog.current.open)
      readerDialog.current.showModal();
  }, [opened]);
  const load = () => {
    void getDocuments()
      .then((d) => {
        setDocs(d);
        setError(false);
      })
      .catch(() => setError(true));
  };
  useEffect(load, []);
  async function importPdf(file: File) {
    if (
      file.size > 100 * 1024 * 1024 ||
      new TextDecoder().decode(await file.slice(0, 5).arrayBuffer()) !== "%PDF-"
    ) {
      toast(t("pdfInvalid"));
      return;
    }
    setBusy(true);
    try {
      const bytes = await file.arrayBuffer();
      const hash = Array.from(
        new Uint8Array(await crypto.subtle.digest("SHA-256", bytes)),
        (v) => v.toString(16).padStart(2, "0"),
      ).join("");
      if (!docs.some((d) => d.id === hash))
        await putDocument({
          id: hash,
          name: file.name,
          subjectId: subject,
          size: file.size,
          type: "application/pdf",
          addedAt: new Date().toISOString(),
          blob: new Blob([bytes], { type: "application/pdf" }),
        });
      load();
      toast(t("fileSaved"));
    } catch {
      toast(t("fileError"));
    } finally {
      setBusy(false);
      if (input.current) input.current.value = "";
    }
  }
  return (
    <>
      <header className="page-heading">
        <div>
          <p className="eyebrow">{t("libraryTitle")}</p>
          <h1>{t("library")}</h1>
        </div>
      </header>
      <p className="lead muted">{t("libraryBody")}</p>
      <section className="panel import-panel">
        <div>
          <label className="field">
            {t("documentSubject")}
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              {subjects.map((s) => (
                <option value={s.id} key={s.id}>
                  {s.exam} · {l(s.name)}
                </option>
              ))}
            </select>
          </label>
          <p className="small muted">{t("pdfLimit")}</p>
        </div>
        <input
          ref={input}
          type="file"
          accept="application/pdf,.pdf"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void importPdf(file);
          }}
        />
        <button
          className="primary"
          disabled={busy}
          onClick={() => input.current?.click()}
        >
          <Upload size={18} />
          {busy ? t("saving") : t("importPdf")}
        </button>
      </section>
      {error ? (
        <div role="alert">
          {t("fileError")}
          <button onClick={load}>{t("retry")}</button>
        </div>
      ) : !docs.length ? (
        <Empty text={t("noDocuments")} />
      ) : (
        <section className="panel document-list">
          {docs.map((doc) => (
            <article className="document-row" key={doc.id}>
              <FileText size={25} />
              <button className="document-open" onClick={() => setOpened(doc)}>
                <strong>{doc.name}</strong>
                <span className="small muted">
                  {l(
                    subjects.find((s) => s.id === doc.subjectId)?.name ?? {
                      tr: doc.subjectId,
                      en: doc.subjectId,
                    },
                  )}{" "}
                  · {(doc.size / 1024 / 1024).toFixed(1)} MB
                </span>
              </button>
              <button
                className="icon-button"
                aria-label={`${t("delete")}: ${doc.name}`}
                onClick={() => {
                  if (confirm(t("deleteConfirm")))
                    void deleteDocument(doc.id)
                      .then(load)
                      .catch(() => toast(t("fileError")));
                }}
              >
                <Trash2 size={17} />
              </button>
            </article>
          ))}
        </section>
      )}
      <section className="panel source-status">
        <span className="quiet-chip">{t("catalogueStatus")}</span>
        <h2>{t("sourceInfo")}</h2>
        <p className="muted">{t("catalogueBody")}</p>
      </section>
      {opened && (
        <dialog
          ref={readerDialog}
          className="reader-overlay"
          aria-labelledby="reader-title"
          onCancel={(event) => {
            event.preventDefault();
            setOpened(null);
          }}
        >
          <div className="reader-heading">
            <h2 id="reader-title">{opened.name}</h2>
            <button
              className="icon-button"
              aria-label={t("close")}
              onClick={() => setOpened(null)}
            >
              <X />
            </button>
          </div>
          <Suspense fallback={<p>{t("pdfLoading")}</p>}>
            <PdfReader document={opened} />
          </Suspense>
        </dialog>
      )}
    </>
  );
}
