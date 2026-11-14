import { useRef, useState } from "react";
import { ExternalLink, Upload } from "lucide-react";
import {
  pastExamReferences,
  officialBooklets,
  officialExamArchives,
} from "../domain/pastExams";
import { hashPdf } from "../domain/catalogue";
import { putDocument, type LocalDocument } from "../domain/storage";
import { libraryChanged, useLibrary } from "../useLibrary";
import { DocumentReader } from "./DocumentReader";

export function PastExamQuestions({
  topicId,
  subjectId,
}: {
  topicId?: string;
  subjectId: string;
}) {
  const { documents, error: libraryError } = useLibrary();
  const [exam, setExam] = useState("all");
  const [year, setYear] = useState("all");
  const [opened, setOpened] = useState<{
    doc: LocalDocument;
    page: number;
  } | null>(null);
  const [pending, setPending] = useState<
    (typeof officialBooklets)[number] | null
  >(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const picker = useRef<HTMLInputElement>(null);
  const related = pastExamReferences.filter(
    (ref) => topicId && ref.topicIds.includes(topicId),
  );
  const filtered = related.filter((ref) => {
    const booklet = officialBooklets.find((file) => file.id === ref.bookletId)!;
    return (
      (exam === "all" || booklet.exam === exam) &&
      (year === "all" || booklet.year === Number(year))
    );
  });
  async function add(file: File) {
    if (!pending) return;
    setBusy(true);
    setError("");
    try {
      const id = await hashPdf(file);
      if (id !== pending.sha256) throw Error("WRONG_BOOKLET");
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
        kind: previous?.kind ?? "exam",
        size: file.size,
        type: "application/pdf",
        addedAt: previous?.addedAt ?? new Date().toISOString(),
        blob: previous?.blob ?? file,
      });
      libraryChanged();
    } catch (reason) {
      setError(
        reason instanceof Error && reason.message === "WRONG_BOOKLET"
          ? "Seçtiğin dosya bu kaydın doğrulanmış ÖSYM kitapçığıyla eşleşmiyor. Resmî PDF bağlantısından dosyayı indirip yeniden seç; mevcut dosyaların korunuyor."
          : "PDF kaydedilemedi. Depolama alanını ve dosyayı kontrol edip yeniden dene.",
      );
    } finally {
      setBusy(false);
      if (picker.current) picker.current.value = "";
    }
  }
  return (
    <section
      className="past-exams"
      aria-label="Bu konunun geçmiş ÖSYM soruları"
    >
      <h2>Geçmiş ÖSYM soruları</h2>
      <p className="muted small">
        {related.length} doğrulanmış konu bağlantısı. Soru ve şekiller,
        aşağıdaki resmî kitapçıkta tam haliyle açılır. Açıklamalar uygulamanın
        özgün çözümleridir.
      </p>
      <div className="source-filters">
        <label className="field">
          Sınav
          <select
            aria-label="Sınav"
            value={exam}
            onChange={(e) => setExam(e.target.value)}
          >
            {[
              "all",
              "TYT",
              "AYT",
              "ALES",
              "DGS",
              "KPSS",
              "YGS",
              "LYS",
              "ÖSS",
              "MSÜ",
            ].map((value) => (
              <option key={value} value={value}>
                {value === "all" ? "Tüm sınavlar" : value}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          Yıl
          <select
            aria-label="Yıl"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="all">Tüm yıllar</option>
            {Array.from({ length: 21 }, (_, i) => 2026 - i).map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </label>
      </div>
      {error && <p role="alert">{error}</p>}
      {libraryError && (
        <p role="alert">
          Cihazdaki kitapçıklar okunamadı. Resmî kaynak bağlantıları
          kullanılabilir; dosyalarını Kaynaklar bölümünden kontrol edebilirsin.
        </p>
      )}
      <input
        ref={picker}
        type="file"
        accept="application/pdf,.pdf"
        hidden
        aria-label="Doğrulanmış ÖSYM kitapçığı"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void add(file);
        }}
      />
      {filtered.map((ref) => {
        const booklet = officialBooklets.find(
          (file) => file.id === ref.bookletId,
        )!;
        const doc = documents.find((file) => file.id === booklet.sha256);
        return (
          <article className="past-exam-reference" key={ref.id}>
            <p className="small muted">
              {booklet.title} · {ref.test} · Soru {ref.question} ·{" "}
              {booklet.coverage === "%10"
                ? "Kamuya açık %10 kitapçığı"
                : "Tam kitapçık"}
            </p>
            <h3>{ref.title}</h3>
            <p>{ref.connection}</p>
            <div className="topic-source-actions">
              {doc ? (
                <button
                  className="secondary"
                  onClick={() => setOpened({ doc, page: ref.page })}
                >
                  Soruyu görüntüle · PDF s.{ref.page}
                </button>
              ) : (
                <a
                  className="secondary"
                  href={`${booklet.url}#page=${ref.page}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={16} />
                  ÖSYM’de soruyu aç (internet)
                </a>
              )}
              {doc ? (
                <button
                  className="text-button"
                  onClick={() => setOpened({ doc, page: ref.answerPage })}
                >
                  Cevap anahtarını görüntüle
                </button>
              ) : (
                <button
                  className="text-button"
                  disabled={busy}
                  onClick={() => {
                    setPending(booklet);
                    picker.current?.click();
                  }}
                >
                  <Upload size={16} />
                  {busy && pending?.id === booklet.id
                    ? "Kaydediliyor…"
                    : "Çevrimdışı kullanım için PDF’yi ekle"}
                </button>
              )}
            </div>
            <details>
              <summary>Özgün çözümü ve kontrolü göster</summary>
              <ol>
                {ref.solution.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
              <p>
                <strong>Doğrulanan cevap: {ref.answer}</strong> · Soru PDF s.
                {ref.page}, cevap kaynağı PDF s.{ref.answerPage}.
              </p>
              <a
                className="text-button"
                href={`${booklet.url}#page=${ref.answerPage}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Resmî cevap kaynağı (internet)
              </a>
            </details>
          </article>
        );
      })}
      {!filtered.length && (
        <p>
          Bu seçim için henüz doğrulanmış kayıt yok. Bu, sınavda bu konudan soru
          sorulmadığı anlamına gelmez.
        </p>
      )}
      <details className="exam-archive-scope">
        <summary>Arşivin kapsamı ve diğer sınavlar</summary>
        <p>
          Son 20 yıl için tarama hedefi 2006–2026 dönemidir. Konu eşleştirmesi
          tamamlanan kayıtlar yukarıda gösterilir; bütün yıllar ve oturumlar
          henüz eksiksiz taranmış değildir. ÖSYM’nin yalnız %10’unu yayımladığı
          kitapçıklar ayrıca belirtilir.
        </p>
        <p>
          Diğer oturumların resmî soru ve cevaplarına aşağıdaki arşivlerden
          ulaşabilirsin. Arşiv bağlantısı, içindeki her sorunun bu konuyla
          eşleştirildiği anlamına gelmez.
        </p>
        <div className="topic-source-actions">
          {officialExamArchives.map((source) => (
            <a
              className="text-button"
              key={source.exam}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {source.exam} arşivi (internet)
              <ExternalLink size={15} />
            </a>
          ))}
        </div>
      </details>
      {opened && (
        <DocumentReader
          document={opened.doc}
          initialPage={opened.page}
          close={() => setOpened(null)}
        />
      )}
    </section>
  );
}
