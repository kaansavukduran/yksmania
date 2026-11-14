import { lazy, Suspense, useId, useRef, useState } from "react";
import { FileText, ChevronDown, Upload } from "lucide-react";
import { hashPdf, type SourceTopic } from "../domain/catalogue";
import { putDocument } from "../domain/storage";
import { topicDocuments } from "../domain/sourceMatching";
import { useLibrary, libraryChanged } from "../useLibrary";
import { SourceList } from "./SourceList";
const PdfReader = lazy(() => import("./PdfReader"));

export function TopicCheatsheet({
  topic,
  subjectId,
  navigate,
}: {
  topic: SourceTopic;
  subjectId: string;
  navigate: (route: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const picker = useRef<HTMLInputElement>(null);
  const panelId = useId();
  const { documents, catalogue, loading, error: loadError } = useLibrary();
  const files = topicDocuments(
    documents,
    catalogue,
    subjectId,
    "cheatsheets",
    showAll ? undefined : topic,
  );
  const active = files.find((file) => file.id === selected) ?? files[0];
  async function add(file: File) {
    setBusy(true);
    setError("");
    try {
      const id = await hashPdf(file);
      const previous = documents.find((doc) => doc.id === id);
      await putDocument({
        ...previous,
        id,
        name: previous?.name ?? file.name,
        subjectId: previous?.subjectId ?? subjectId,
        subjectIds: [
          ...new Set([
            ...(previous?.subjectIds ?? (previous ? [previous.subjectId] : [])),
            subjectId,
          ]),
        ],
        topicIds: [...new Set([...(previous?.topicIds ?? []), topic.id])],
        kind: "cheatsheet",
        size: file.size,
        type: "application/pdf",
        addedAt: previous?.addedAt ?? new Date().toISOString(),
        blob: previous?.blob ?? file,
      });
      setSelected(id);
      libraryChanged();
    } catch {
      setError(
        "PDF eklenemedi. Geçerli bir PDF seçip yeniden dene; önceki dosyaların korunuyor.",
      );
    } finally {
      setBusy(false);
      if (picker.current) picker.current.value = "";
    }
  }
  return (
    <>
      <button
        className="secondary cheatsheet-toggle"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={() => setExpanded((value) => !value)}
      >
        <FileText size={18} aria-hidden="true" />{" "}
        <span>Kopya Kağıdını Görüntüle</span>
        <ChevronDown
          size={17}
          className={expanded ? "rotated" : ""}
          aria-hidden="true"
        />
      </button>
      {expanded && (
        <section
          className="panel topic-cheatsheet"
          id={panelId}
          aria-label={`${topic.title} kopya kağıdı`}
        >
          <h2>{topic.title} · Kopya kağıdı</h2>
          <p className="muted small">
            Hızlı tekrar için kaynak PDF’nin tamamı. Bu alanı açmak çalışmanı
            tamamlandı olarak işaretlemez.
          </p>
          <div className="topic-source-actions">
            <input
              ref={picker}
              type="file"
              accept="application/pdf,.pdf"
              hidden
              aria-label="Bu konunun kopya kağıdı PDF’si"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void add(file);
              }}
            />
            <button
              className="secondary"
              disabled={busy}
              onClick={() => picker.current?.click()}
            >
              <Upload size={17} />
              {busy ? "PDF kaydediliyor…" : "Bu konunun PDF’sini ekle"}
            </button>
            <button
              className="text-button"
              onClick={() => navigate("/sources")}
            >
              Tüm kaynakları yönet
            </button>
            <button
              className="text-button"
              aria-pressed={showAll}
              onClick={() => {
                setShowAll((value) => !value);
                setSelected("");
              }}
            >
              {showAll
                ? "Yalnız bu konunun kağıdını göster"
                : "Dersteki tüm kopya kağıtları"}
            </button>
          </div>
          {error && <p role="alert">{error}</p>}
          {loading ? (
            <p>Dosyalar açılıyor…</p>
          ) : loadError ? (
            <p role="alert">
              Cihazdaki dosyalar okunamadı. Kaynakları yönet bölümünden yeniden
              deneyebilirsin.
            </p>
          ) : active ? (
            <>
              {files.length > 1 && (
                <label className="field">
                  Kopya kağıdı dosyası
                  <select
                    value={active.id}
                    onChange={(e) => setSelected(e.target.value)}
                  >
                    {files.map((file) => (
                      <option key={file.id} value={file.id}>
                        {file.name}
                      </option>
                    ))}
                  </select>
                </label>
              )}
              <p className="small muted">
                {active.name} · Bu cihazda, çevrimdışı kullanılabilir
              </p>
              <Suspense fallback={<p>PDF açılıyor…</p>}>
                <PdfReader key={active.id} document={active} />
              </Suspense>
            </>
          ) : (
            <>
              <p>
                Bu konuya ait PDF henüz bu cihazda yok. Drive’daki kopya
                kağıdını indirip buradan ekleyebilir veya Kaynaklar bölümünden
                bütün klasörü tek seferde seçebilirsin.
              </p>
              <SourceList
                subjectId={subjectId}
                mode="cheatsheets"
                topic={showAll ? undefined : topic}
              />
            </>
          )}
        </section>
      )}
    </>
  );
}
