import { typeset } from "../domain/typeset";
import { geometryExpansion032Ids } from "../data/supplementalTopics032";
import { geometryCircle040Ids } from "./geometryCircle040";
import { lazy, Suspense, useId, useMemo, useRef, useState, useEffect, type ReactNode } from "react";
import { useExploration } from "./useExploration";
import "./guidedJourney.css";
import { ArrowRight, RotateCcw } from "lucide-react";
import { VisualLab } from "./VisualLab";
import { sectionFigureGuideIds } from "./sectionFigures/figureGuideIds";
import { placesIn } from "./geo/gazetteer";
const PlaceMap = lazy(() => import("./geo/PlaceMap"));
const SectionFigure = lazy(() =>
  import("./sectionFigures/registry").then((m) => ({ default: m.SectionFigure })),
);
import type { LessonGuide, WorkedExample } from "./guides/types";
import { resolveGuideStep } from "./guides/position";
import { geometryFoundation031Ids } from "../data/supplementalTopics031";

const visualFirstLessonIds = new Set<string>([
  "tyt-mat-mutlak-deger-kaynak-038",
  "tyt-mat-uslu-sayilar-kaynak-039",
  "tyt-mat-dogrusal-denklemler-kaynak-036",
  "tyt-mat-basit-esitsizlikler-kaynak-037",
  "tyt-mat-ebob-ekok-kaynak-034",
  "tyt-mat-rasyonel-kaynak-035",
  "tyt-mat-faktoriyel-kaynak-033",
  "tyt-mat-asal-kaynak-032",
  ...geometryFoundation031Ids,
  ...geometryExpansion032Ids,
  "alan-donusumleri",
  "noktanin-analitigi",
  "dogrunun-analitigi",
  "donusum-oteleme-donme",
  "donusum-yansima-simetri",
  "cemberin-analitigi",
]);

const MODE_KEY = "yksmania.guide.mode";
/** Okuma biçimi cihaz tercihidir (öğrenme kaydı değildir); depolama kapalıysa “tümünü gör”. */
function readGuideMode(): "all" | "page" {
  try {
    return localStorage.getItem(MODE_KEY) === "page" ? "page" : "all";
  } catch {
    return "all";
  }
}
function writeGuideMode(mode: "all" | "page") {
  try {
    localStorage.setItem(MODE_KEY, mode);
  } catch {
    /* tercih yalnız bu oturumda geçerli */
  }
}

function moveToSection(id: string) {
  const heading = document.getElementById(id)?.querySelector("h2");
  heading?.focus({ preventScroll: true });
  heading?.scrollIntoView({ behavior: "instant", block: "start" });
}

function Example({ example }: { example: WorkedExample }) {
  const [count, setCount] = useState(0);
  return (
    <details className="worked-example">
      <summary>{example.title}</summary>
      <p className="example-prompt">{typeset(example.prompt)}</p>
      <p>
        <strong>Nasıl başlayalım?</strong> {example.strategy}
      </p>
      <ol className="worked-steps">
        {example.steps.slice(0, count).map((step, i) => (
          <li key={i}>
            <strong>{step.label}</strong>
            {step.expression && (
              <p className="math-expression">{step.expression}</p>
            )}
            <p>{typeset(step.explanation)}</p>
          </li>
        ))}
      </ol>
      <div className="example-actions">
        {count < example.steps.length && (
          <button
            className="secondary"
            onClick={() => setCount((value) => value + 1)}
          >
            {count === 0 ? "İlk adımı göster" : "Sonraki adım"}
            <ArrowRight size={17} />
          </button>
        )}
        {count < example.steps.length && (
          <button
            className="text-button"
            onClick={() => setCount(example.steps.length)}
          >
            Çözümün tamamını göster
          </button>
        )}
        {count > 0 && (
          <button className="text-button" onClick={() => setCount(0)}>
            <RotateCcw size={16} />
            Baştan izle
          </button>
        )}
      </div>
      {count === example.steps.length && (
        <div className="worked-conclusion" aria-live="polite">
          <p>
            <strong>Sonuç:</strong> {typeset(example.answer)}
          </p>
          <p>
            <strong>Kontrol:</strong> {typeset(example.check)}
          </p>
          <p>
            <strong>Dikkat:</strong> {typeset(example.pitfall)}
          </p>
        </div>
      )}
    </details>
  );
}
function PageTurn({ next, title, onTurn }: { next: number; title: string; onTurn: (i: number) => void }) {
  return (
    <p className="page-turn">
      <button className="text-button" onClick={() => onTurn(next)}>
        Sonraki sayfa: {title} <ArrowRight size={16} aria-hidden="true" />
      </button>
    </p>
  );
}

export function GuidedReading({
  guide,
  recallSupplement,
}: {
  guide: LessonGuide;
  recallSupplement?: ReactNode;
}) {
  const prefix = useId();
  const [journey, persistJourney] = useExploration(`guide:${guide.id}`, {
    step: 0,
    guided: false,
    sectionCount: 0,
  });
  const stages = guide.sections.length + 2;
  const step = resolveGuideStep(
    guide.id,
    journey.step,
    journey.sectionCount,
    guide.sections.length,
  );
  // One reading mode: every section is a numbered page in one continuous
  // reader. The page bar follows scrolling, the buttons and arrow keys turn
  // pages, and the last turned page is reopened next time.
  // Geometry starts with the manipulable figure, so the first page explains
  // the shape the learner is looking at; other models follow the first page.
  const visualSection = visualFirstLessonIds.has(guide.id) ? 0 : 1;
  const pageId = (i: number) =>
    i < guide.sections.length
      ? `${prefix}-${i}`
      : i === guide.sections.length
        ? `${prefix}-examples`
        : `${prefix}-recall`;
  const [current, setCurrent] = useState(step);
  const [mode, setModeState] = useState<"all" | "page">(readGuideMode);
  const paged = mode === "page";
  const shown = (i: number) => !paged || current === i;
  function setMode(next: "all" | "page") {
    setModeState(next);
    writeGuideMode(next);
    requestAnimationFrame(() => moveToSection(pageId(current)));
  }
  // A page opened or turned stays aligned (even while lazy figures load)
  // until the learner scrolls, touches or clicks.
  const pinned = useRef<number | null>(step > 0 ? step : null);
  function setJourney(changes: Partial<typeof journey>) {
    persistJourney({
      ...changes,
      step: changes.step ?? step,
      sectionCount: guide.sections.length,
    });
  }
  function goTo(i: number) {
    if (i < 0 || i > stages - 1) return;
    setJourney({ step: i });
    setCurrent(i);
    pinned.current = i;
    if (paged) requestAnimationFrame(() => moveToSection(pageId(i)));
    else moveToSection(pageId(i));
  }
  // Reopen the last turned page without moving keyboard focus, and keep the
  // pinned page aligned while content above it finishes loading.
  useEffect(() => {
    const align = () => {
      if (pinned.current === null) return;
      document.getElementById(pageId(pinned.current))?.scrollIntoView({ block: "start" });
    };
    const frame = requestAnimationFrame(align);
    const release = () => {
      pinned.current = null;
    };
    const releaseKeys = (event: KeyboardEvent) => {
      if (["PageDown", "PageUp", "Home", "End", "ArrowDown", "ArrowUp", " "].includes(event.key)) release();
    };
    window.addEventListener("keydown", releaseKeys);
    const resize = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(align);
    resize?.observe(document.body);
    for (const type of ["wheel", "touchstart", "pointerdown"] as const)
      window.addEventListener(type, release, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      resize?.disconnect();
      for (const type of ["wheel", "touchstart", "pointerdown"] as const)
        window.removeEventListener(type, release);
      window.removeEventListener("keydown", releaseKeys);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guide.id]);
  // The page bar shows the page whose top is nearest the reading line.
  useEffect(() => {
    if (paged || typeof IntersectionObserver === "undefined") return;
    const ids = Array.from({ length: stages }, (_, i) => pageId(i));
    const observer = new IntersectionObserver(
      () => {
        if (pinned.current !== null) {
          setCurrent(pinned.current);
          return;
        }
        let best = 0;
        ids.forEach((id, i) => {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) best = i;
        });
        setCurrent(best);
      },
      { rootMargin: "0px 0px -60% 0px", threshold: [0, 1] },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefix, stages, paged]);
  // Arrow keys turn pages unless the learner is using a control.
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      const el = event.target as HTMLElement | null;
      if (el?.closest("input, textarea, select, [contenteditable='true'], [role='slider'], [role='tablist'], [role='radiogroup'], [role='radio'], [role='listbox'], [role='menu'], [role='grid'], svg, .visual-lab")) return;
      const next = event.key === "ArrowRight" ? current + 1 : current - 1;
      if (next < 0 || next > stages - 1) return;
      event.preventDefault();
      goTo(next);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });
  function jump(i: number) {
    goTo(i);
  }
  const pageTitle = (i: number) =>
    i < guide.sections.length
      ? guide.sections[i].title
      : i === guide.sections.length
        ? "Birlikte çöz"
        : "Bakmadan hatırla";

  return (
    <>
      <div
        className="learning-journey"
        role="group"
        aria-label="Anlatım düzeni"
      >
        <div className="segmented guide-modes" role="group" aria-label="Okuma biçimi">
          <button type="button" className={paged ? "active" : ""} aria-pressed={paged} onClick={() => setMode("page")}>
            Sayfa sayfa ({current + 1}/{stages})
          </button>
          <button type="button" className={!paged ? "active" : ""} aria-pressed={!paged} onClick={() => setMode("all")}>
            Tümünü gör
          </button>
        </div>
        <p className="small muted">
          Sayfa {current + 1} / {stages} · {pageTitle(current)}
        </p>
        <p className="small muted">
          Sayfa numarası yalnız yerini gösterir; öğrenme veya tamamlanma puanı
          değildir.
        </p>
      </div>
      <div
        className="guide-progress"
        role="progressbar"
        aria-label="Anlatımda konum"
        aria-valuemin={1}
        aria-valuemax={stages}
        aria-valuenow={current + 1}
        aria-valuetext={`Sayfa ${current + 1} / ${stages}`}
      >
        <span style={{ width: `${((current + 1) / stages) * 100}%` }} />
      </div>
      <nav className="guide-contents" aria-label="Anlatım içeriği">
        <p className="small muted">
          Yaklaşık {guide.minutes} dk · Anlatım, etkileşim ve örneklerle çalışma
        </p>
        <details>
          <summary>İçindekiler</summary>
          <div>
            {guide.sections.map(
              (section, i) => (
                <button
                  className="text-button"
                  key={section.title}
                  aria-current={i === step ? "page" : undefined}
                  onClick={() => jump(i)}
                >
                  {section.title}
                </button>
              ),
            )}
            <button
              className="text-button"
              onClick={() => jump(guide.sections.length)}
            >
              Çözümlü örnekler
            </button>
            <button
              className="text-button"
              onClick={() => jump(guide.sections.length + 1)}
            >
              Bakmadan hatırla
            </button>
          </div>
        </details>
      </nav>
      {guide.sections.map(
        (section, i) =>
          shown(i) && (
            <section
              className="guide-section"
              key={section.title}
              id={`${prefix}-${i}`}
            >
              <p className="page-label small muted">
                Sayfa {i + 1} / {stages}
              </p>
              <h2 tabIndex={-1}>{section.title}</h2>
              {section.paragraphs.map((paragraph, j) => (
                <p key={j}>{typeset(paragraph)}</p>
              ))}
              {section.table && (
                <div
                  className="guide-table"
                  role="region"
                  tabIndex={0}
                  aria-label={`${section.title} tablosu`}
                >
                  <table role="table">
                    <thead role="rowgroup">
                      <tr role="row">
                        {section.table.headers.map((header, j) => (
                          <th
                            scope="col"
                            role="columnheader"
                            id={`${prefix}-table-${i}-col-${j}`}
                            key={j}
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody role="rowgroup">
                      {section.table.rows.map((row, j) => (
                        <tr role="row" key={j}>
                          {row.map((cell, k) => (
                            <td
                              role="cell"
                              headers={`${prefix}-table-${i}-col-${k}`}
                              key={k}
                            >
                              <span
                                className="guide-table-cell-label"
                                aria-hidden="true"
                              >
                                {section.table!.headers[k]}
                              </span>
                              <span className="guide-table-cell-value">
                                {cell}
                              </span>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {sectionFigureGuideIds.has(guide.id) && (
                <Suspense fallback={null}>
                  <SectionFigure guideId={guide.id} title={section.title} />
                </Suspense>
              )}
              <SectionPlaces text={[section.title, ...section.paragraphs].join(" ")} />
              {i === visualSection && !geometryCircle040Ids.includes(guide.id) && <VisualLab id={guide.id} />}
              {/* “Tümünü gör” shows every page at once: no page-turn links. */}
              {paged && <PageTurn next={i + 1} title={pageTitle(i + 1)} onTurn={goTo} />}
            </section>
          ),
      )}
      {shown(guide.sections.length) && (
        <section className="guide-examples" id={`${prefix}-examples`}>
          <h2 tabIndex={-1}>Çözümlü örnekler</h2>
          <p className="small muted">
            Önce kendin düşün; gerekçeleri adım adım aç ve sonucu kontrol et.
            Bunlar özgün öğretim örnekleridir.
          </p>
          {guide.examples.map((example) => (
            <Example key={example.title} example={example} />
          ))}
          {paged && (
            <PageTurn
              next={guide.sections.length + 1}
              title={pageTitle(guide.sections.length + 1)}
              onTurn={goTo}
            />
          )}
        </section>
      )}
      {shown(guide.sections.length + 1) && (
        <section className="guide-recall" id={`${prefix}-recall`}>
          <h2 tabIndex={-1}>Anlatmadan önce hatırla</h2>
          <p className="small muted">
            Cevabı açmadan kendi cümlelerinle söyle. Puan veya ustalık kaydı
            oluşturmaz.
          </p>
          {guide.recall.map((item) => (
            <details key={item.prompt}>
              <summary>{item.prompt}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
          {recallSupplement}
        </section>
      )}
      <nav className="journey-actions journey-sticky" aria-label="Anlatım sayfaları">
        <button
          className="secondary"
          disabled={current === 0}
          onClick={() => goTo(current - 1)}
        >
          Önceki sayfa
        </button>
        <span className="small muted">
          {current + 1} / {stages}
        </span>
        <button
          className="primary"
          disabled={current === stages - 1}
          onClick={() => goTo(current + 1)}
        >
          Sonraki sayfa <ArrowRight size={17} />
        </button>
      </nav>
    </>
  );
}

/** World + regional map for places named on this page (lazy, offline). */
function SectionPlaces({ text }: { text: string }) {
  const found = useMemo(() => placesIn(text), [text]);
  if (!found.length) return null;
  return (
    <Suspense fallback={null}>
      <PlaceMap places={found} />
    </Suspense>
  );
}
