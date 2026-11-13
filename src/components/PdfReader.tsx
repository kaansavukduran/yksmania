import { useEffect, useRef, useState } from "react";
import {
  getDocument,
  GlobalWorkerOptions,
  type PDFDocumentProxy,
} from "pdfjs-dist";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useApp } from "../store";
import type { LocalDocument } from "../domain/storage";
GlobalWorkerOptions.workerSrc = workerUrl;
export default function PdfReader({
  document: doc,
}: {
  document: LocalDocument;
}) {
  const { state, t, update } = useApp();
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [page, setPage] = useState(() => state.readingPages[doc.id] ?? 1);
  const [jump, setJump] = useState(() =>
    String(state.readingPages[doc.id] ?? 1),
  );
  const [pageError, setPageError] = useState(false);
  const goPage = (n: number) => {
    setPage(n);
    setJump(String(n));
    setPageError(false);
    void update((s) => ({
      ...s,
      readingPages: { ...s.readingPages, [doc.id]: n },
    })).catch(() => {});
  };
  const [error, setError] = useState(false);
  const [text, setText] = useState("");
  const canvas = useRef<HTMLCanvasElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(700);
  useEffect(() => {
    const obs = new ResizeObserver((entries) =>
      setWidth(Math.max(200, entries[0].contentRect.width - 24)),
    );
    if (container.current) obs.observe(container.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    let live = true;
    let task: ReturnType<typeof getDocument> | undefined;
    setError(false);
    void doc.blob
      .arrayBuffer()
      .then((data) => {
        if (!live) return null;
        task = getDocument({
          data: new Uint8Array(data),
          enableXfa: false,
          cMapUrl: `${import.meta.env.BASE_URL}pdfjs/cmaps/`,
          standardFontDataUrl: `${import.meta.env.BASE_URL}pdfjs/standard_fonts/`,
          wasmUrl: `${import.meta.env.BASE_URL}pdfjs/wasm/`,
        });
        return task.promise;
      })
      .then((p) => {
        if (live && p) {
          setPdf(p);
          if (page > p.numPages) {
            setPage(1);
            setJump("1");
          }
        }
      })
      .catch(() => {
        if (live) setError(true);
      });
    return () => {
      live = false;
      void task?.destroy();
    };
  }, [doc]);
  useEffect(() => {
    if (!pdf || !canvas.current) return;
    let cancelled = false;
    let task:
      | ReturnType<Awaited<ReturnType<PDFDocumentProxy["getPage"]>>["render"]>
      | undefined;
    void pdf
      .getPage(page)
      .then(async (p) => {
        if (cancelled) return;
        const viewport = p.getViewport({
          scale: width / p.getViewport({ scale: 1 }).width,
        });
        const c = canvas.current!;
        const ratio = Math.min(devicePixelRatio || 1, 2);
        c.width = viewport.width * ratio;
        c.height = viewport.height * ratio;
        c.style.width = `${viewport.width}px`;
        c.style.height = `${viewport.height}px`;
        task = p.render({
          canvas: c,
          viewport,
          transform: [ratio, 0, 0, ratio, 0, 0],
        });
        await task.promise;
        const content = await p.getTextContent();
        if (!cancelled)
          setText(
            content.items
              .map((item) => ("str" in item ? item.str : ""))
              .join(" "),
          );
      })
      .catch((e) => {
        if (!cancelled && e?.name !== "RenderingCancelledException")
          setError(true);
      });
    return () => {
      cancelled = true;
      task?.cancel();
    };
  }, [pdf, page, width]);
  return (
    <div className="pdf-layout">
      <div className="pdf-content" ref={container}>
        {error ? (
          <p role="alert">{t("pdfError")}</p>
        ) : !pdf ? (
          <p>{t("pdfLoading")}</p>
        ) : (
          <>
            <div className="pdf-controls">
              <button
                className="icon-button"
                disabled={page <= 1}
                aria-label={t("pdfPrev")}
                onClick={() => goPage(page - 1)}
              >
                <ChevronLeft />
              </button>
              <form
                className="pdf-page-jump"
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  const n = Number(jump);
                  if (!Number.isInteger(n) || n < 1 || n > pdf.numPages) {
                    setPageError(true);
                    return;
                  }
                  goPage(n);
                }}
              >
                <label>
                  {t("pdfPage")}
                  <input
                    type="number"
                    aria-label={t("pdfPage")}
                    min={1}
                    max={pdf.numPages}
                    value={jump}
                    onChange={(e) => setJump(e.target.value)}
                  />
                </label>
                <span>/ {pdf.numPages}</span>
                <button type="submit" className="secondary">
                  {t("goPage")}
                </button>
              </form>
              <button
                className="icon-button"
                disabled={page >= pdf.numPages}
                aria-label={t("pdfNext")}
                onClick={() => goPage(page + 1)}
              >
                <ChevronRight />
              </button>
            </div>
            {pageError && (
              <p role="alert">
                {t("pageRange")} 1–{pdf.numPages}
              </p>
            )}
            <canvas
              ref={canvas}
              aria-label={`${doc.name}, ${page}`}
              role="img"
            />
            <details className="pdf-text">
              <summary>
                {state.settings.locale === "tr"
                  ? "Sayfanın metni"
                  : "Page text"}
              </summary>
              <p>{text}</p>
            </details>
          </>
        )}
      </div>
      <label className="field reader-note">
        {t("note")}
        <textarea
          value={state.notes[doc.id] ?? ""}
          maxLength={20000}
          onChange={(e) => {
            void update((s) => ({
              ...s,
              notes: { ...s.notes, [doc.id]: e.target.value },
            })).catch(() => {});
          }}
          placeholder={t("notePlaceholder")}
        />
      </label>
    </div>
  );
}
