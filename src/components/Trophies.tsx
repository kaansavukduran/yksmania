import { useEffect, useMemo, useRef, useState } from "react";
import { X } from "lucide-react";
import { TrophyEmblem, type EmblemMetal } from "./TrophyEmblem";
import { useApp } from "../store";
import { lessonById } from "../domain/content";
import { questionStars } from "../domain/exams";
import {
  evaluateTrophies,
  nearestTrophies,
  TIER_NAME,
  type TrophyCategory,
  type TrophyState,
} from "../domain/achievements";
import "./trophies.css";
import { playCue } from "../domain/soundEngine";

/*
 * Trophy showcase and unlock toasts. Trophies are recomputed from saved
 * evidence (see src/domain/achievements.ts); nothing here writes learning
 * state. The only stored value is which tiers a toast has already announced,
 * a per-device display convenience kept in localStorage.
 */

const subjectOf = (lessonId: string) => lessonById(lessonId)?.subjectId;
export function useTrophies(): TrophyState[] {
  const { state } = useApp();
  return useMemo(
    () => evaluateTrophies(state, subjectOf, questionStars),
    [state.sessions, state.reviews, state.examSessions],
  );
}

const CATEGORIES: { id: TrophyCategory | "hepsi"; label: string }[] = [
  { id: "hepsi", label: "Hepsi" },
  { id: "ders", label: "Ders rozetleri" },
  { id: "ustalik", label: "Ustalık" },
  { id: "sureklilik", label: "Süreklilik" },
  { id: "sinav", label: "Sınav" },
  { id: "gizli", label: "Gizli" },
  { id: "platin", label: "Platin" },
];

function Medal({ trophy, size = 56 }: { trophy: TrophyState; size?: number }) {
  const metal: EmblemMetal = trophy.platinum
    ? trophy.tier
      ? "platinum"
      : "locked"
    : (["locked", "bronze", "silver", "gold"] as const)[trophy.tier];
  // An unearned secret trophy keeps its emblem hidden too.
  const id = trophy.secret && trophy.tier === 0 ? "?" : trophy.id;
  return (
    <span className={`trophy-medal trophy-${metal}`} aria-hidden="true">
      <TrophyEmblem id={id} metal={metal} size={size} />
    </span>
  );
}

function goalText(t: TrophyState) {
  return t.goal.replace("{n}", String(t.next ?? t.thresholds[2]));
}

function TrophyCard({ trophy }: { trophy: TrophyState }) {
  const hidden = trophy.secret && trophy.tier === 0;
  const target = trophy.next ?? trophy.thresholds[2];
  const pct = Math.min(100, Math.round((Math.min(trophy.value, target) / target) * 100));
  const tierLabel = trophy.platinum ? (trophy.tier ? "Platin" : "Kilitli") : TIER_NAME[trophy.tier];
  return (
    <li className={`trophy-card${trophy.tier ? " is-earned" : ""}${hidden ? " is-secret" : ""}`}>
      <Medal trophy={trophy} />
      <div className="trophy-body">
        <strong>{hidden ? "Gizli kupa" : trophy.title}</strong>
        <span className="trophy-tier">{tierLabel}</span>
        <p className="small">{hidden ? "Gerçek bir emekle keşfedilmeyi bekliyor." : trophy.next === null ? "Tamamlandı." : goalText(trophy)}</p>
        {!hidden && trophy.next !== null && (
          <>
            <span className="trophy-count">
              {Math.min(trophy.value, target).toLocaleString("tr-TR")} / {target.toLocaleString("tr-TR")}
            </span>
            <div className="trophy-progress" role="progressbar" aria-valuemin={0} aria-valuemax={target} aria-valuenow={Math.min(trophy.value, target)} aria-label={`${trophy.title} ilerlemesi`}>
              <span style={{ width: `${pct}%` }} />
            </div>
          </>
        )}
      </div>
    </li>
  );
}

export function TrophyShowcase() {
  const trophies = useTrophies();
  const [filter, setFilter] = useState<TrophyCategory | "hepsi">("hepsi");
  const shown = trophies.filter((t) => filter === "hepsi" || t.category === filter);
  const near = nearestTrophies(trophies);
  const earned = trophies.filter((t) => t.tier > 0).length;
  const gold = trophies.filter((t) => t.tier === 3).length;
  return (
    <section className="panel trophy-showcase" aria-labelledby="trophy-heading">
      <div className="trophy-head">
        <h2 id="trophy-heading">Kupa vitrini</h2>
        <span className="quiet-chip">
          {earned} / {trophies.length} açıldı · {gold} altın
        </span>
      </div>
      <p className="small muted">
        Kupalar yalnız gerçek kanıtla açılır: yardımsız doğru çözüm, tamamlanan 3/7/21 tekrarları, yanlışın sonradan yardımsız onarılması ve yardımsız denemeler. Bir konuda ustalaşmak: o konunun en az 5 soruluk bir oturumunda %80 yardımsız doğru. Okuma, süre, görsel keşif ve elle işaretleme kupa vermez.
      </p>
      {near.length > 0 && (
        <div className="trophy-near">
          <h3>Sıradaki en yakın kupalar</h3>
          <ul className="trophy-grid">
            {near.map((t) => (
              <TrophyCard key={t.id} trophy={t} />
            ))}
          </ul>
        </div>
      )}
      <div className="trophy-filters" role="toolbar" aria-label="Kupa kategorisi">
        {CATEGORIES.map((c) => (
          <button key={c.id} type="button" aria-pressed={filter === c.id} onClick={() => setFilter(c.id)}>
            {c.label}
          </button>
        ))}
      </div>
      <ul className="trophy-grid">
        {shown.map((t) => (
          <TrophyCard key={t.id} trophy={t} />
        ))}
      </ul>
    </section>
  );
}

/* ---------- Unlock toasts ---------- */
const SEEN_KEY = "yksmania.trophies.announced";
function readSeen(): Record<string, number> | null {
  try {
    const raw = localStorage.getItem(SEEN_KEY);
    return raw ? (JSON.parse(raw) as Record<string, number>) : null;
  } catch {
    return null;
  }
}
function writeSeen(map: Record<string, number>) {
  try {
    localStorage.setItem(SEEN_KEY, JSON.stringify(map));
  } catch {
    // Storage may be unavailable; toasts then simply repeat next time.
  }
}
export function TrophyToasts() {
  const { state } = useApp();
  const trophies = useTrophies();
  const [queue, setQueue] = useState<TrophyState[]>([]);
  const first = useRef(true);
  useEffect(() => {
    const current = Object.fromEntries(trophies.map((t) => [t.id, t.tier]));
    const seen = readSeen();
    // A profile seen for the first time on this device is recorded silently,
    // so an existing history never floods the screen.
    if (!seen || first.current) {
      first.current = false;
      if (!seen) {
        writeSeen(current);
        return;
      }
    }
    const fresh = trophies.filter((t) => t.tier > (seen[t.id] ?? 0));
    if (!fresh.length) return;
    writeSeen({ ...seen, ...current });
    if (!state.settings.gamification) return;
    setQueue((q) => [...q, ...fresh]);
    if (state.settings.sound) {
      const top = Math.max(1, ...fresh.map((t) => (t.platinum ? 4 : t.tier))) as 1 | 2 | 3 | 4;
      playCue({ kind: "trophy", tier: top }, state.settings.soundVolume);
    }
  }, [trophies, state.settings.gamification, state.settings.sound, state.settings.soundVolume]);
  useEffect(() => {
    if (!queue.length) return;
    const timer = setTimeout(() => setQueue((q) => q.slice(1)), 6000);
    return () => clearTimeout(timer);
  }, [queue]);
  const current = queue[0];
  if (!current) return null;
  return (
    <div className="trophy-toast" role="status" aria-live="polite">
      <Medal trophy={current} />
      <div>
        <span className="trophy-toast-kicker">Kupa açıldı · {current.platinum ? "Platin" : TIER_NAME[current.tier]}</span>
        <strong>{current.title}</strong>
      </div>
      <button type="button" className="trophy-toast-close" aria-label="Bildirimi kapat" onClick={() => setQueue((q) => q.slice(1))}>
        <X size={16} />
      </button>
    </div>
  );
}
