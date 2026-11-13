import { Check, Compass, LockKeyhole, Sprout } from "lucide-react";
import { Aion } from "../components/Aion";
import { useApp } from "../store";
import { xp } from "../domain/scheduler";
export function World() {
  const { state, t } = useApp();
  if (!state.settings.gamification)
    return (
      <>
        <header className="page-heading">
          <h1>{t("world")}</h1>
        </header>
        <p className="lead muted">{t("worldOff")}</p>
      </>
    );
  const distinct = new Set(
    state.sessions.filter((s) => s.kind === "learn").map((s) => s.lessonId),
  ).size;
  const milestones = [
    {
      key: "milestone1",
      done: distinct >= 1,
      target: 1,
      current: Math.min(distinct, 1),
    },
    {
      key: "milestone2",
      done: distinct >= 3,
      target: 3,
      current: Math.min(distinct, 3),
    },
    {
      key: "milestone3",
      done: state.sessions.some((s) => s.kind === "review"),
      target: 1,
      current: state.sessions.some((s) => s.kind === "review") ? 1 : 0,
    },
    {
      key: "milestone4",
      done: distinct >= 6,
      target: 6,
      current: Math.min(distinct, 6),
    },
  ];
  return (
    <>
      <header className="page-heading">
        <div>
          <p className="eyebrow">AIONIA · FRAGARIA INTERACTIVE</p>
          <h1>{t("world")}</h1>
        </div>
        <span className="quiet-chip">
          <Compass size={17} />
          {xp(state)} {t("xp")}
        </span>
      </header>
      <p className="lead muted">
        {t(state.settings.gamification ? "worldBody" : "worldOff")}
      </p>
      <section className="world-scene">
        <div className="world-sun" />
        <div className="world-mountain mountain-back" />
        <div className="world-mountain" />
        <div className="world-ground" />
        <div className="world-sprouts">
          {Array.from({ length: Math.min(distinct, 6) }, (_, i) => (
            <Sprout
              key={i}
              size={40}
              style={{
                left: `${15 + i * 13}%`,
                bottom: `${20 + (i % 2) * 7}%`,
              }}
            />
          ))}
        </div>
        <div className="world-aion">
          <Aion size={240} />
        </div>
        <div className="world-scene-label">
          <span className="eyebrow">{t("firstStep")}</span>
          <h2>{t("worldTitle")}</h2>
        </div>
      </section>
      <section className="milestones">
        <h2>{t("milestones")}</h2>
        <div className="milestone-grid">
          {milestones.map((m, i) => (
            <article
              className={`panel milestone ${m.done ? "earned" : ""}`}
              key={m.key}
            >
              <span className="milestone-icon">
                {m.done ? <Check size={24} /> : <LockKeyhole size={22} />}
              </span>
              <div>
                <span className="small muted">
                  {t(m.done ? "earned" : "locked")}
                </span>
                <h3>{t(m.key)}</h3>
                <span className="small">
                  {m.current} / {m.target}
                </span>
              </div>
              <progress
                aria-label={t(m.key)}
                value={m.current}
                max={m.target}
              />
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
