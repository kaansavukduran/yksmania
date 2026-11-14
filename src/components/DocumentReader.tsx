import { lazy, Suspense, useEffect, useRef } from "react";
import { X } from "lucide-react";
import type { LocalDocument } from "../domain/storage";
import { useApp } from "../store";
const PdfReader = lazy(() => import("./PdfReader"));
export function DocumentReader({
  document: doc,
  close,
  initialPage,
}: {
  document: LocalDocument;
  close: () => void;
  initialPage?: number;
}) {
  const { t } = useApp();
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!ref.current?.open) ref.current?.showModal();
  }, []);
  return (
    <dialog
      ref={ref}
      className="reader-overlay"
      aria-labelledby="reader-title"
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
    >
      <div className="reader-heading">
        <h2 id="reader-title">{doc.name}</h2>
        <button className="icon-button" aria-label={t("close")} onClick={close}>
          <X />
        </button>
      </div>
      <Suspense fallback={<p>{t("pdfLoading")}</p>}>
        <PdfReader
          key={`${doc.id}:${initialPage ?? "saved"}`}
          document={doc}
          initialPage={initialPage}
        />
      </Suspense>
    </dialog>
  );
}
