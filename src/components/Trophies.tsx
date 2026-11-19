import { useEffect, useMemo, useRef, useState } from "react";
import { Lock, Trophy, X } from "lucide-react";
import { useApp } from "../store";
import { lessonById } from "../domain/content";
import {
  evaluateTrophies,
  nearestTrophies,
  TIER_NAME,
  type Tier,
  type TrophyCategory,
  type TrophyState,
} from "../domain/achievements";
import "./trophies.css";

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
    () => evaluateTrophies(state, subjectOf),
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
const TIER_CLASS: Record<Tier, string> = { 0: "locked", 1: "bronze", 2: "silver", 3: "gold" };

function Medal({ trophy }: { trophy: TrophyState }) {
  const cls = trophy.platinum ? (trophy.tier ? "platinum" : "locked") : TIER_CLASS[trophy.tier];
  return (
    <span className={`trophy-medal trophy-${cls}`} aria-hidden="true">
      {trophy.tier ? <Trophy size={20} /> : <Lock size={18} />}
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
function chime() {
  try {
    const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const now = ctx.currentTime;
    [659.25, 987.77, 1318.5].forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = f;
      gain.gain.setValueAtTime(0.0001, now + i * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.12, now + i * 0.09 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.09 + 0.5);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now + i * 0.09);
      osc.stop(now + i * 0.09 + 0.55);
    });
    setTimeout(() => void ctx.close(), 1200);
  } catch {
    // Audio is optional.
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
    if (state.settings.sound) chime();
  }, [trophies, state.settings.gamification, state.settings.sound]);
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
