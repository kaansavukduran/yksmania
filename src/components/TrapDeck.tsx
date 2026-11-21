import { useMemo, useState, type KeyboardEvent } from "react";
import { ChevronLeft, ChevronRight, RotateCw } from "lucide-react";
import curriculum from "../data/curriculum.json";
import { osymRows } from "../learning/osym";
import { trapCards, trapSubjectOrder } from "../domain/trapDeck";
import "./trapDeck.css";

/*
 * ÖSYM tuzak destesi: flash cards of the traps seen in processed ÖSYM
 * booklets for one subject. "Biliyordum / Yeni öğrendim" marks are counters
 * for this visit only: nothing is saved and nothing awards XP or mastery.
 */
const headingTitle = new Map(curriculum.map((h) => [h.id, h.title]));

export function TrapDeck({
  subjectOrder,
  wrongSubjects,
  subjectName,
}: {
  subjectOrder: readonly string[];
  /** One entry per saved wrong answer: the subject it belongs to. */
  wrongSubjects: readonly string[];
  subjectName: (id: string) => string;
}) {
  const order = useMemo(() => trapSubjectOrder(osymRows, subjectOrder, wrongSubjects), [subjectOrder, wrongSubjects]);
  const [subject, setSubject] = useState(order[0]?.subjectId ?? "");
  const [heading, setHeading] = useState("");
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);
  const [learned, setLearned] = useState(0);
  const headingOrder = useMemo(() => curriculum.filter((h) => h.subjectId === subject).map((h) => h.id), [subject]);
  const all = useMemo(() => trapCards(osymRows, subject, headingOrder), [subject, headingOrder]);
  const headings = useMemo(() => {
    const counts = new Map<string, number>();
    for (const c of all) counts.set(c.heading ?? "", (counts.get(c.heading ?? "") ?? 0) + 1);
    return [...counts];
  }, [all]);
  const cards = heading ? all.filter((c) => (c.heading ?? "") === heading) : all;
  if (!order.length) return null;
  const card = cards[Math.min(index, cards.length - 1)];
  const go = (to: number) => {
    if (!cards.length) return;
    setIndex((to + cards.length) % cards.length);
    setFlipped(false);
  };
  const mark = (kind: "known" | "learned") => {
    if (kind === "known") setKnown((n) => n + 1);
    else setLearned((n) => n + 1);
    go(index + 1);
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(index + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(index - 1);
    }
  };
  const title = (id: string | null) => (id ? (headingTitle.get(id) ?? id) : "Resmî başlık dışı");
  const first = card?.rows[0];
  return (
    <section className="panel trap-deck" aria-labelledby="trap-deck-heading">
      <h2 id="trap-deck-heading">ÖSYM tuzak destesi</h2>
      <p className="small muted">
        İşlenen ÖSYM kitapçıklarında (2018–2026) görülen tuzaklar. Hata yaptığın dersler listenin başında. Aynı başlıkta
        benzer tuzaklar tek kartta toplanır; her tuzak kendi cümlesiyle yazılır.
      </p>
      <div className="trap-filters">
        <label>
          <span>Ders</span>
          <select
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
              setHeading("");
              setIndex(0);
              setFlipped(false);
            }}
          >
            {order.map((s) => (
              <option key={s.subjectId} value={s.subjectId}>
                {subjectName(s.subjectId)}
                {s.mistakes ? ` (${s.mistakes} yanlışın)` : ""}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Başlık</span>
          <select
            value={heading}
            onChange={(e) => {
              setHeading(e.target.value);
              setIndex(0);
              setFlipped(false);
            }}
          >
            <option value="">Tüm başlıklar ({all.length} kart)</option>
            {headings.map(([id, n]) => (
              <option key={id || "-"} value={id}>
                {title(id || null)} ({n})
              </option>
            ))}
          </select>
        </label>
      </div>
      {card && first && (
        <div className="trap-stage" onKeyDown={onKey}>
          <p className="small muted trap-count" aria-live="polite">
            Kart {Math.min(index, cards.length - 1) + 1} / {cards.length}
          </p>
          <button
            type="button"
            className={`trap-card${flipped ? " is-back" : ""}`}
            aria-pressed={flipped}
            onClick={() => setFlipped((v) => !v)}
          >
            {!flipped ? (
              <span className="trap-face">
                <span className="trap-question">Bu soru biçiminde hangi tuzağa düşülür?</span>
                <span className="trap-pattern">{card.pattern}</span>
                <span className="trap-heading">
                  {title(card.heading)}
                  {!card.heading ? ` · ${first.topicNote}` : ""}
                </span>
                <span className="trap-hint small muted">Çevirmek için dokun ya da Enter’a bas.</span>
              </span>
            ) : (
              <span className="trap-face">
                <span className="trap-label">{card.traps.length > 1 ? `Tuzak (${card.traps.length} benzer soru)` : "Tuzak"}</span>
                {card.traps.map((t) => (
                  <span key={t} className="trap-text">
                    {t}
                  </span>
                ))}
                <span className="trap-label">Ölçülen beceri</span>
                {card.skills.map((s) => (
                  <span key={s} className="trap-skill">
                    {s}
                  </span>
                ))}
                <span className="trap-label">Yer</span>
                {card.places.map((p) => (
                  <span key={p} className="trap-place small">
                    {p}
                  </span>
                ))}
              </span>
            )}
          </button>
          <div className="trap-controls">
            <button type="button" className="icon-button" aria-label="Önceki kart" onClick={() => go(index - 1)}>
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <button type="button" className="secondary" onClick={() => setFlipped((v) => !v)}>
              <RotateCw size={17} aria-hidden="true" /> {flipped ? "Önü" : "Çevir"}
            </button>
            <button type="button" className="icon-button" aria-label="Sonraki kart" onClick={() => go(index + 1)}>
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </div>
          {flipped && (
            <div className="trap-marks" role="group" aria-label="Kendini değerlendir">
              <button type="button" className="secondary" onClick={() => mark("known")}>
                Biliyordum
              </button>
              <button type="button" className="secondary" onClick={() => mark("learned")}>
                Yeni öğrendim
              </button>
            </div>
          )}
        </div>
      )}
      <p className="small trap-tally" role="status">
        Bu ziyarette: {known} biliyordum · {learned} yeni öğrendim. İşaretler kaydedilmez ve puan vermez.
      </p>
      <p className="small muted trap-note">Soru metinleri ÖSYM’ye aittir ve burada yer almaz.</p>
    </section>
  );
}
