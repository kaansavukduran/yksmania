import { useMemo, useState } from "react";
import { ArrowRight, Star } from "lucide-react";
import { subjects, lessons } from "../domain/content";
import { STAR_BANDS, STAR_LEVELS } from "../domain/difficulty";
import { questionStars, starPracticeSpec, type ExamSpec } from "../domain/exams";
import { ChoiceSelect } from "./ChoiceSelect";
import "./starPractice.css";

/*
 * Difficulty-star practice: choose a subject and a star band (or one exact
 * star), then start a short timed practice from the built-in bank. Stars are
 * an estimate ranked inside each subject (see src/domain/difficulty.ts), so
 * every level holds the same share of that subject's questions.
 */

export function StarBadge({ stars }: { stars?: number }) {
  if (!stars) return null;
  return (
    <span className="star-badge" title="Tahmini zorluk: ders içi göreli sıra, resmî zorluk değil">
      <Star size={14} aria-hidden="true" />
      <span>
        {stars}/{STAR_LEVELS}
        <span className="sr-only"> yıldız tahmini zorluk</span>
      </span>
    </span>
  );
}

export function StarPractice({ busy, start }: { busy: boolean; start: (spec: ExamSpec) => void }) {
  const available = useMemo(
    () => subjects.filter((s) => lessons.some((l) => l.subjectId === s.id && l.questions.length)),
    [],
  );
  const [subjectId, setSubjectId] = useState(available[0]?.id ?? "");
  const [range, setRange] = useState<[number, number]>([5, 6]);
  const distribution = useMemo(() => {
    const out = Array<number>(STAR_LEVELS).fill(0);
    for (const l of lessons)
      if (l.subjectId === subjectId)
        for (const q of l.questions) {
          const star = questionStars(q.id);
          if (star) out[star - 1]++;
        }
    return out;
  }, [subjectId]);
  const inRange = distribution.slice(range[0] - 1, range[1]).reduce((a, b) => a + b, 0);
  const label = range[0] === range[1] ? `${range[0]} yıldız` : `${range[0]}–${range[1]} yıldız`;
  return (
    <section className="panel star-practice" aria-labelledby="star-practice-heading">
      <h2 id="star-practice-heading">Zorluk yıldızına göre çalış</h2>
      <p className="small muted">
        Her soruya 1–10 arası tahmini zorluk yıldızı verilir: okuma yükü, izlenecek sayı ve sembol miktarı, öncül listesi, olumsuz kök ve çözüm uzunluğu
        hesaplanır; sonra sorular her derste sıralanıp on eşit dilime ayrılır. Bu yüzden her yıldızda aynı sayıda soru bulunur. Yıldız ders içindeki göreli
        sıradır; resmî ÖSYM zorluğu veya başarı olasılığı değildir. Alıştırma en çok 20 soru seçer ve tam sınav sayılmaz.
      </p>
      <label className="star-subject">
        <span>Ders</span>
        <ChoiceSelect aria-label="Ders" value={subjectId} onChange={(e) => setSubjectId(e.target.value)}>
          {available.map((s) => (
            <option key={s.id} value={s.id}>
              {s.exam} {s.name.tr}
            </option>
          ))}
        </ChoiceSelect>
      </label>
      <div className="star-bands" role="group" aria-label="Zorluk aralığı">
        {STAR_BANDS.map((band) => (
          <button
            key={band.label}
            type="button"
            aria-pressed={range[0] === band.min && range[1] === band.max}
            onClick={() => setRange([band.min, band.max])}
          >
            {band.label}
          </button>
        ))}
      </div>
      <div className="star-histogram" role="group" aria-label="Tek yıldız seç; üstteki sayı o yıldızdaki soru sayısıdır">
        {distribution.map((n, i) => {
          const star = i + 1;
          const active = star >= range[0] && star <= range[1];
          return (
            <button
              key={star}
              type="button"
              className={active ? "active" : ""}
              aria-pressed={range[0] === star && range[1] === star}
              onClick={() => setRange([star, star])}
            >
              <span className="star-count">{n}</span>
              <span className="sr-only"> soru, </span>
              <span className="star-bar" style={{ height: `${8 + star * 6}px` }} />
              <span className="star-num">{star}</span>
              <span className="sr-only"> yıldız</span>
            </button>
          );
        })}
      </div>
      <p className="small muted star-axis">Yıldız (1 kolay → 10 seçici) · üstte soru sayısı</p>
      <p className="star-summary">
        <strong>{label}</strong> · bu derste {inRange.toLocaleString("tr-TR")} soru
      </p>
      <button
        type="button"
        className="primary"
        disabled={busy || inRange === 0}
        onClick={() => {
          const spec = starPracticeSpec(subjectId, range[0], range[1], Math.random);
          if (spec) start(spec);
        }}
      >
        {label} alıştırmasını başlat <ArrowRight size={17} />
      </button>
      {busy && <p className="small muted">Yeni bir alıştırma için devam eden denemeyi bitir.</p>}
    </section>
  );
}
