import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { useApp } from "../store";
import { subjectById } from "../domain/content";
import { lessonById } from "../domain/content";
import { SubjectMark } from "../components/Shared";
import { SectionFigureView } from "../learning/sectionFigures/figureKit";
import { foundationById, foundationLessons, foundationSubjects } from "../learning/foundations";
import "../foundations.css";
import "../learning/sectionFigures/sectionFigures.css";
import type { FoundationCheck, FoundationExample, FoundationLesson, FoundationPage } from "../learning/foundations/types";

/*
 * Temel İnşa (0. basamak). İsteğe bağlı ön dersler: çalışma planına, 505 konu
 * sayacına, XP'ye, kupaya ya da tekrar takvimine yazılmaz. Okumak, figürle
 * oynamak ve kontrol sorusu çözmek ustalık kanıtı değildir; kontrol cevapları
 * yalnız bu ekranda tutulur.
 */

const MODE_KEY = "yksmania.foundations.mode";
const readMode = (): "page" | "all" => {
  try {
    return localStorage.getItem(MODE_KEY) === "all" ? "all" : "page";
  } catch {
    return "page";
  }
};
const writeMode = (m: "page" | "all") => {
  try {
    localStorage.setItem(MODE_KEY, m);
  } catch {
    /* tarayıcı depolaması kapalıysa yalnız bu oturumda geçerli */
  }
};

export function Foundations({ route, navigate }: { route: string; navigate: (r: string) => void }) {
  const id = new URLSearchParams(route.split("?")[1]).get("id");
  const lesson = id ? foundationById(id) : undefined;
  if (id && lesson) return <FoundationReader lesson={lesson} navigate={navigate} />;
  return <FoundationList navigate={navigate} missing={!!id && !lesson} />;
}

function FoundationList({ navigate, missing }: { navigate: (r: string) => void; missing: boolean }) {
  const { l } = useApp();
  const [subject, setSubject] = useState<string>("tyt-matematik");
  const list = foundationLessons.filter((x) => x.subjectId === subject);
  return (
    <>
      <header className="page-heading">
        <div>
          <h1>Temel İnşa</h1>
        </div>
        <span className="quiet-chip">{foundationLessons.length} ön ders</span>
      </header>
      <p className="lead muted">
        0. basamak: lise konularına geçmeden önce gereken temel beceriler. İsteğe bağlıdır; çalışma planına, konu sayacına, XP’ye ve
        tekrar takvimine girmez. Her ön ders sayfa sayfa ilerler, dokunulabilir şekil ve çözümlü örnek içerir.
      </p>
      {missing && <p className="foundation-note">Bu ön ders bulunamadı. Aşağıdaki listeden seçebilirsin.</p>}
      <div className="foundation-subjects" role="group" aria-label="Ders seç">
        {foundationSubjects.map((s) => {
          const n = foundationLessons.filter((x) => x.subjectId === s).length;
          const name = subjectById(s);
          return (
            <button
              type="button"
              key={s}
              className={subject === s ? "active" : ""}
              aria-pressed={subject === s}
              onClick={() => setSubject(s)}
            >
              <SubjectMark id={s} />
              <span>{name ? l(name.name).replace(/^TYT /, "") : s}</span>
              <span className="small muted">{n ? `${n} ön ders` : "hazırlanıyor"}</span>
            </button>
          );
        })}
      </div>
      {list.length === 0 ? (
        <div className="panel foundation-empty">
          <p>
            Bu dersin ön dersleri henüz uygulamada yok; açılmayan bir içerik için senden kaynak istenmez. Konu anlatımları bu derste de
            sıfırdan başlar.
          </p>
        </div>
      ) : (
        <ol className="foundation-list">
          {list.map((x, i) => (
            <li key={x.id} className="panel foundation-card">
              <span className="foundation-step" aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <h2>{x.title}</h2>
                <p className="small muted">
                  {x.minutes} dk · {x.pages.length} sayfa · {x.examples.length} çözümlü örnek · {x.checks.length} kontrol sorusu
                </p>
                <p>{x.goal}</p>
                <Prepares lesson={x} />
              </div>
              <button type="button" className="primary" onClick={() => navigate(`/foundations?id=${x.id}`)}>
                Başla <ArrowRight size={16} />
              </button>
            </li>
          ))}
        </ol>
      )}
    </>
  );
}

function Prepares({ lesson }: { lesson: FoundationLesson }) {
  const { l } = useApp();
  const titles = lesson.prepares.map((id) => lessonById(id)).filter(Boolean);
  if (!titles.length) return null;
  return <p className="small foundation-prepares">Hazırladığı konular: {titles.map((t) => l(t!.title)).join(" · ")}</p>;
}

type Block = { kind: "page"; page: FoundationPage } | { kind: "examples" } | { kind: "checks" };

function FoundationReader({ lesson, navigate }: { lesson: FoundationLesson; navigate: (r: string) => void }) {
  const blocks: Block[] = useMemo(
    () => [...lesson.pages.map((page) => ({ kind: "page" as const, page })), { kind: "examples" }, { kind: "checks" }],
    [lesson],
  );
  const titles = blocks.map((b) => (b.kind === "page" ? b.page.title : b.kind === "examples" ? "Çözümlü örnekler" : "Kendini sına"));
  const [mode, setMode] = useState<"page" | "all">(readMode);
  const [index, setIndex] = useState(0);
  const [scrolled, setScrolled] = useState(0);
  const top = useRef<HTMLDivElement>(null);
  const article = useRef<HTMLElement>(null);
  const total = blocks.length;

  useEffect(() => {
    if (mode !== "all") return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = article.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const span = Math.max(1, r.height - window.innerHeight);
        setScrolled(Math.min(1, Math.max(0, -r.top / span)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [mode]);

  const go = (i: number) => {
    setIndex(Math.max(0, Math.min(total - 1, i)));
    top.current?.scrollIntoView({ block: "start" });
    top.current?.focus({ preventScroll: true });
  };
  const switchMode = (m: "page" | "all") => {
    setMode(m);
    writeMode(m);
  };
  const progress = mode === "page" ? (index + 1) / total : scrolled;

  return (
    <article className="foundation-reader" ref={article}>
      <button type="button" className="text-button back-link" onClick={() => navigate("/foundations")}>
        <ArrowLeft size={16} /> Temel İnşa
      </button>
      <div className="foundation-head" ref={top} tabIndex={-1}>
        <p className="eyebrow">0. basamak · ön ders</p>
        <h1>{lesson.title}</h1>
        <p className="muted">{lesson.goal}</p>
        <Prepares lesson={lesson} />
      </div>
      <div className="foundation-sticky">
        <div className="foundation-modes" role="group" aria-label="Okuma biçimi">
          <button type="button" aria-pressed={mode === "page"} className={mode === "page" ? "active" : ""} onClick={() => switchMode("page")}>
            Sayfa sayfa ({index + 1}/{total})
          </button>
          <button type="button" aria-pressed={mode === "all"} className={mode === "all" ? "active" : ""} onClick={() => switchMode("all")}>
            Tümünü gör
          </button>
        </div>
        <div
          className="foundation-progress"
          role="progressbar"
          aria-label="Okuma ilerlemesi"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
        >
          <span style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
      {mode === "page" ? (
        <>
          <nav className="foundation-dots" aria-label="Sayfalar">
            {titles.map((t, i) => (
              <button
                type="button"
                key={t}
                aria-label={`${i + 1}. sayfa: ${t}`}
                aria-current={i === index ? "step" : undefined}
                className={i === index ? "active" : i < index ? "seen" : ""}
                onClick={() => go(i)}
              />
            ))}
          </nav>
          <BlockView block={blocks[index]} lesson={lesson} n={index + 1} />
          <div className="foundation-pager">
            <button type="button" className="secondary" disabled={index === 0} onClick={() => go(index - 1)}>
              <ArrowLeft size={16} /> Önceki
            </button>
            <span className="small muted">
              {index + 1} / {total} · {titles[index]}
            </span>
            {index < total - 1 ? (
              <button type="button" className="primary" onClick={() => go(index + 1)}>
                Sonraki <ArrowRight size={16} />
              </button>
            ) : (
              <button type="button" className="primary" onClick={() => navigate("/foundations")}>
                Ön derslere dön
              </button>
            )}
          </div>
        </>
      ) : (
        blocks.map((b, i) => <BlockView key={titles[i]} block={b} lesson={lesson} n={i + 1} />)
      )}
      <p className="small muted foundation-foot">
        Bu ön ders isteğe bağlıdır. Okumak, şekillerle oynamak ve kontrol sorularını çözmek çalışma planına, XP’ye ya da tekrar takvimine
        kayıt oluşturmaz. Örnek ve sorular özgündür.
      </p>
    </article>
  );
}

function BlockView({ block, lesson, n }: { block: Block; lesson: FoundationLesson; n: number }) {
  if (block.kind === "page") return <PageView page={block.page} n={n} />;
  if (block.kind === "examples")
    return (
      <section className="panel foundation-section" aria-labelledby={`fx-${lesson.id}`}>
        <h2 id={`fx-${lesson.id}`}>Çözümlü örnekler</h2>
        {lesson.examples.map((e) => (
          <ExampleView key={e.title} example={e} />
        ))}
      </section>
    );
  return (
    <section className="panel foundation-section" aria-labelledby={`fc-${lesson.id}`}>
      <h2 id={`fc-${lesson.id}`}>Kendini sına</h2>
      <p className="small muted">Özgün alıştırma · ÖSYM sorusu değildir · cevapların kaydedilmez, ustalık kanıtı oluşturmaz.</p>
      {lesson.checks.map((c, i) => (
        <CheckView key={c.prompt} check={c} n={i + 1} />
      ))}
    </section>
  );
}

function PageView({ page, n }: { page: FoundationPage; n: number }) {
  const [shown, setShown] = useState(false);
  return (
    <section className="panel foundation-section" aria-label={`${n}. sayfa: ${page.title}`}>
      <h2>{page.title}</h2>
      {page.predict && (
        <div className="foundation-predict">
          <p>
            <strong>Önce tahmin et:</strong> {page.predict.question}
          </p>
          {shown ? (
            <p className="foundation-answer">{page.predict.answer}</p>
          ) : (
            <button type="button" className="secondary" onClick={() => setShown(true)}>
              Cevabı göster
            </button>
          )}
        </div>
      )}
      {page.paragraphs.map((p) => (
        <p key={p}>{p}</p>
      ))}
      {page.terms && (
        <dl className="foundation-terms">
          {page.terms.map(([term, def]) => (
            <div key={term}>
              <dt>{term}</dt>
              <dd>{def}</dd>
            </div>
          ))}
        </dl>
      )}
      {page.figure && <SectionFigureView def={page.figure} title={page.title} />}
    </section>
  );
}

function ExampleView({ example }: { example: FoundationExample }) {
  const [step, setStep] = useState(0);
  const done = step >= example.steps.length;
  return (
    <div className="foundation-example">
      <h3>{example.title}</h3>
      <p className="foundation-given">{example.given}</p>
      <ol>
        {example.steps.slice(0, step).map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>
      {done ? (
        <>
          <p>
            <strong>Sonuç:</strong> {example.answer}
          </p>
          <p className="small muted">
            <strong>Kontrol:</strong> {example.check}
          </p>
        </>
      ) : (
        <button type="button" className="secondary" onClick={() => setStep(step + 1)}>
          {step === 0 ? "İlk adımı göster" : `Sonraki adım (${step + 1}/${example.steps.length})`}
        </button>
      )}
    </div>
  );
}

function CheckView({ check, n }: { check: FoundationCheck; n: number }) {
  const [chosen, setChosen] = useState<number | null>(null);
  const right = chosen === check.answer;
  return (
    <fieldset className="foundation-check">
      <legend>
        {n}. {check.prompt}
      </legend>
      <div className="foundation-options">
        {check.options.map((o, i) => (
          <button
            type="button"
            key={o}
            disabled={chosen !== null}
            aria-pressed={chosen === i}
            className={chosen === null ? "" : i === check.answer ? "correct" : chosen === i ? "wrong" : ""}
            onClick={() => setChosen(i)}
          >
            <span className="foundation-letter">{"ABCDE"[i]}</span> {o}
          </button>
        ))}
      </div>
      {chosen !== null && (
        <div className={right ? "foundation-feedback ok" : "foundation-feedback no"} role="status">
          <p>
            {right ? <Check size={16} aria-hidden="true" /> : <X size={16} aria-hidden="true" />}{" "}
            <strong>{right ? "Doğru." : `Yanlış: doğru cevap ${"ABCDE"[check.answer]}.`}</strong> {check.explain}
          </p>
          {!right && <p className="small">Senin seçimin: {check.reasons[chosen]}</p>}
          <button type="button" className="text-button" onClick={() => setChosen(null)}>
            Yeniden dene
          </button>
        </div>
      )}
    </fieldset>
  );
}
