import { useState, type CSSProperties } from "react";
import { osymRows } from "../learning/osym";
import {
  bookletPlace,
  examOfSubject,
  formShares,
  processedYears,
  rowsForTopic,
  subjectHeatmap,
  topicYearCounts,
  unplacedGroups,
  type OsymRow,
} from "../domain/osymPatterns";
import "./osymPatterns.css";

const FIRST = 4;
const span = (years: number[]) => (years.length > 1 ? `${years[0]}–${years[years.length - 1]}` : `${years[0]}`);
const DIFFICULTY = ["", "tek adım", "iki adım ya da yorum", "çok adımlı, ayırt edici"];

function PatternItem({ row }: { row: OsymRow }) {
  return (
    <li className="osym-pattern">
      <p className="osym-place small muted">
        {bookletPlace(row)} · {row.form} · {DIFFICULTY[row.difficulty]}
      </p>
      <p className="osym-pattern-title">{row.pattern}</p>
      <p>
        <strong>Ölçtüğü beceri:</strong> {row.skill}
      </p>
      <p>
        <strong>Tuzak:</strong> {row.trap}
      </p>
    </li>
  );
}

/**
 * "ÖSYM bu konuyu nasıl sordu?" for one detailed heading. Shows nothing until
 * a booklet of the heading's exam has been processed, so an empty archive is
 * never read as "this topic is not asked".
 */
export function OsymTopicPanel({ topicId, subjectId }: { topicId: string; subjectId: string }) {
  const [all, setAll] = useState(false);
  const exam = examOfSubject(subjectId);
  const cells = topicYearCounts(osymRows, topicId, exam);
  if (!cells.length) return null;
  const mine = rowsForTopic(osymRows, topicId);
  const years = cells.map((c) => c.year);
  const shown = all ? mine : mine.slice(0, FIRST);
  return (
    <section className="panel osym-panel" aria-labelledby={`osym-${topicId}`}>
      <h2 id={`osym-${topicId}`}>ÖSYM bu konuyu nasıl sordu?</h2>
      <p className="muted small">
        İşlenen {cells.length} {exam} kitapçığında ({span(years)}) bu başlıktan{" "}
        {mine.length ? `${mine.length} soru çıktı.` : "doğrudan soru çıkmadı."}
      </p>
      <ol className="osym-years" aria-label="Yıllara göre soru sayısı">
        {cells.map((c) => (
          <li key={c.year} className={c.count ? "has" : "none"}>
            <span className="osym-year">{c.year}</span>
            <span className="osym-count">{c.count ? `${c.count} soru` : "çıkmadı"}</span>
          </li>
        ))}
      </ol>
      {mine.length > 0 && (
        <>
          <ul className="osym-patterns">
            {shown.map((r) => (
              <PatternItem key={`${r.y}-${r.e}-${r.test}-${r.q}`} row={r} />
            ))}
          </ul>
          {mine.length > FIRST && (
            <button type="button" className="secondary" aria-expanded={all} onClick={() => setAll((v) => !v)}>
              {all ? "Daha az göster" : `Tümünü göster (${mine.length})`}
            </button>
          )}
        </>
      )}
      <p className="muted small osym-note">
        Soru metinleri ÖSYM’ye aittir ve burada yer almaz. Bu satırlar, kitapçıktaki sorunun konu ve kalıp
        çözümlemesidir; soruyu resmî kitapçıkta yıl ve soru numarasıyla bulabilirsin.
      </p>
    </section>
  );
}

/** Topic × year question counts for one subject, most asked first or in study order. */
export function OsymHeatmap({
  subjectId,
  topics,
}: {
  subjectId: string;
  topics: readonly { id: string; title: string }[];
}) {
  const [byCount, setByCount] = useState(true);
  const exam = examOfSubject(subjectId);
  if (!processedYears(osymRows, exam).length) return null;
  const map = subjectHeatmap(osymRows, subjectId, topics);
  if (!map.questions) return null;
  const rows = byCount ? [...map.rows].sort((a, b) => b.total - a.total) : map.rows;
  const loose = unplacedGroups(osymRows, subjectId);
  const forms = formShares(osymRows, subjectId).slice(0, 4);
  return (
    <section
      className="panel osym-panel osym-heatmap"
      aria-labelledby={`osym-map-${subjectId}`}
      style={{ "--osym-years": map.years.length } as CSSProperties}
    >
      <div className="section-heading">
        <h2 id={`osym-map-${subjectId}`}>ÖSYM sıklık haritası</h2>
        <button type="button" className="secondary" aria-pressed={byCount} onClick={() => setByCount((v) => !v)}>
          {byCount ? "Çalışma sırasına göre diz" : "En çok çıkana göre diz"}
        </button>
      </div>
      <p className="muted small">
        {span(map.years)} arası {map.years.length} {exam} kitapçığında bu dersten {map.questions} soru işlendi. Sayılar
        soru adedidir; boş kutu o yıl sorulmadığını gösterir.
      </p>
      <div className="osym-map-head" aria-hidden="true">
        <span />
        {map.years.map((y) => (
          <span key={y}>’{String(y).slice(2)}</span>
        ))}
        <span>Top.</span>
      </div>
      <ul className="osym-map">
        {rows.map((r) => (
          <li key={r.id} className={r.total ? undefined : "never"}>
            <span className="osym-map-title">{r.title}</span>
            {r.cells.map((n, i) => (
              <span
                key={map.years[i]}
                className={`osym-cell${n ? ` n${Math.min(n, 3)}` : ""}`}
                aria-label={`${map.years[i]}: ${n ? `${n} soru` : "çıkmadı"}`}
              >
                {n || ""}
              </span>
            ))}
            <span className="osym-total" aria-label={`Toplam ${r.total} soru`}>
              {r.total}
            </span>
          </li>
        ))}
      </ul>
      {loose.length > 0 && (
        <p className="small">
          <strong>Başlık listesine sığmayan soru türleri:</strong>{" "}
          {loose.map((g) => `${g.note} (${g.count})`).join(" · ")}
        </p>
      )}
      <p className="small">
        <strong>Soru biçimi:</strong> {forms.map((f) => `${f.form} %${f.percent}`).join(" · ")}
      </p>
    </section>
  );
}
