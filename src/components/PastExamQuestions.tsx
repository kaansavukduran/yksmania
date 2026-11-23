import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { pastExamReferencesForTopic, officialBooklets } from "../domain/pastExams";
import { examTeachingCases } from "../learning/pastExamCases";
import { ChoiceSelect } from "./ChoiceSelect";
import { OsymTopicPanel } from "./OsymPatterns";
function TeachingCase({ id }: { id: string }) {
  const item = examTeachingCases[id];
  const [count, setCount] = useState(0);
  if (!item) return null;
  return (
    <div className="exam-teaching-case">
      <p className="small muted">
        Kaynakla ilişkili özgün öğretim örneği · Resmî sorunun birebir aktarımı
        değildir.
      </p>
      <p className="example-prompt">{item.prompt}</p>
      <ol>
        {item.steps.slice(0, count).map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>
      {count < item.steps.length ? (
        <button className="secondary" onClick={() => setCount((n) => n + 1)}>
          {count ? "Sonraki çözüm adımı" : "Çözümü adım adım aç"}
        </button>
      ) : (
        <div className="worked-conclusion">
          <p>
            <strong>Sonuç:</strong> {item.answer}
          </p>
          <p>
            <strong>Dikkat:</strong> {item.pitfall}
          </p>
          <button className="text-button" onClick={() => setCount(0)}>
            Yeniden düşün
          </button>
        </div>
      )}
    </div>
  );
}
export function PastExamQuestions({
  topicId,
  subjectId,
}: {
  topicId?: string;
  subjectId: string;
}) {
  const [exam, setExam] = useState("all"),
    [year, setYear] = useState("all");
  const related = pastExamReferencesForTopic(topicId);
  const filtered = related.filter((r) => {
    const b = officialBooklets.find((b) => b.id === r.bookletId)!;
    return (
      (exam === "all" || b.exam === exam) &&
      (year === "all" || b.year === Number(year))
    );
  });
  return (
    <section
      className="past-exams"
      aria-label="Bu konunun geçmiş ÖSYM soruları"
    >
      {topicId && <OsymTopicPanel topicId={topicId} subjectId={subjectId} embedded />}
      <h2>Geçmiş sınavlardan öğren</h2>
      <p className="muted small">
        {related.length} doğrulanmış konu bağlantısı. Aşağıdaki özgün öğretim
        örneklerini ve çözümlerini burada çalışabilirsin. Sınav, soru ve cevap
        bilgileri kaynak kaydıdır.
      </p>
      <div className="source-filters">
        <label className="field">
          Sınav
          <ChoiceSelect
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
            ].map((e) => (
              <option key={e} value={e}>
                {e === "all" ? "Tüm sınavlar" : e}
              </option>
            ))}
          </ChoiceSelect>
        </label>
        <label className="field">
          Yıl
          <ChoiceSelect
            aria-label="Yıl"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="all">Tüm yıllar</option>
            {Array.from({ length: 21 }, (_, i) => 2026 - i).map((y) => (
              <option key={y}>{y}</option>
            ))}
          </ChoiceSelect>
        </label>
      </div>
      {filtered.map((ref) => {
        const booklet = officialBooklets.find((b) => b.id === ref.bookletId)!;
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
            <TeachingCase id={ref.id} />
            <details>
              <summary>Doğrulanmış sınav kaydı</summary>
              <p>
                Resmî cevap: {ref.answer}. Soru sayfası {ref.page}, cevap
                kaynağı sayfa {ref.answerPage}. Öğretim örneğinin sonucu seçenek
                harfiyle puanlanmaz.
              </p>
              <a
                className="text-button"
                href={`${booklet.url}#page=${ref.page}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Resmî kaynak kaydı (internet)
                <ExternalLink size={15} />
              </a>
              <a
                className="text-button"
                href={`${ref.answerSource?.url ?? booklet.url}#page=${ref.answerPage}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Resmî cevap anahtarı (internet)
                <ExternalLink size={15} />
              </a>
            </details>
          </article>
        );
      })}
      {!filtered.length && (
        <p>
          Bu seçim için sınav bağlantıları hazırlanıyor. Konunun uygulama içi
          özgün sorularıyla çalışabilirsin.
        </p>
      )}
      <p className="small muted">
        Arşiv taraması sürüyor; bütün yıllar ve sınavların tamamı henüz işlenmiş
        değildir.
      </p>
    </section>
  );
}
