import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Pause, Play, X } from "lucide-react";
import { useApp } from "../store";
import {
  changeTimer,
  remainingTime,
  formatCountdown,
  type TimerAction,
} from "../domain/focusTimer";

export function StudyTimer() {
  const { state, commit } = useApp();
  const timer = state.focusTimer;
  const timersOn = state.settings.timers !== false;
  const [now, setNow] = useState(Date.now);
  const [menu, setMenu] = useState(false);
  const [custom, setCustom] = useState(false);
  const [rawMinutes, setRawMinutes] = useState(
    String(timer.durationSeconds / 60),
  );
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [turn, setTurn] = useState(0);
  const lock = useRef(false);
  const root = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const menuPanel = useRef<HTMLDivElement>(null);
  const id = useId();
  const remaining = remainingTime(timer, now);
  const running = timer.phase === "running" && remaining > 0;
  const paused = timer.phase === "paused" && remaining > 0;
  const ratio = remaining / (timer.durationSeconds * 1000);
  const minutes = Number(rawMinutes);
  const validMinutes =
    rawMinutes.trim() !== "" &&
    Number.isInteger(minutes) &&
    minutes >= 1 &&
    minutes <= 120;
  useEffect(() => {
    if (!timersOn || timer.phase !== "running") return;
    let tick: ReturnType<typeof setInterval> | undefined;
    const refresh = () => {
      const time = Date.now();
      setNow(time);
      if (remainingTime(timer, time) === 0) clearInterval(tick);
    };
    const sync = () => {
      clearInterval(tick);
      if (document.hidden) return;
      refresh();
      if (remainingTime(timer, Date.now()) > 0) tick = setInterval(refresh, 250);
    };
    sync();
    window.addEventListener("focus", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      clearInterval(tick);
      window.removeEventListener("focus", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [timer, timersOn]);
  useEffect(() => {
    if (!timersOn || !menu) return;
    menuPanel.current?.querySelector<HTMLButtonElement>("button")?.focus();
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setMenu(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [menu, timersOn]);
  function close() {
    setMenu(false);
    menuButton.current?.focus();
  }
  async function control(action: TimerAction) {
    if (lock.current) return;
    lock.current = true;
    setBusy(true);
    setError("");
    try {
      const time = Date.now();
      await commit((s) => ({
        ...s,
        focusTimer: changeTimer(s.focusTimer, action, time),
      }));
      setNow(Date.now());
      if (action.type === "flip") setTurn((value) => value + 1);
      if (action.type === "duration") close();
    } catch {
      setError(
        "Kum saati kaydedilemedi. Önceki süren korunuyor; yeniden dene.",
      );
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }
  // Zamanlayıcılar ayarla kapatıldıysa kum saati gösterilmez; kayıtlı
  // durumu (süre, duraklatma, mutlak bitiş) olduğu gibi korunur.
  if (!timersOn) return null;
  return (
    <div
      className="study-timer"
      ref={root}
      aria-label="Çalışma kum saati"
      onKeyDown={(event) => {
        if (event.key === "Escape" && menu) {
          event.stopPropagation();
          close();
        }
      }}
    >
      <div className="hourglass-visual">
        <button
          className="hourglass-button"
          aria-label={
            running || paused
              ? "Kum saatini ters çevir ve yeniden başlat"
              : "Kum saatini ters çevir ve başlat"
          }
          disabled={busy}
          onClick={() => void control({ type: "flip" })}
        >
          <svg
            viewBox="0 0 100 140"
            role="img"
            aria-label="Ters çevrilebilir kum saati"
          >
            <defs>
              <clipPath id={`${id}-glass`}>
                <path d="M23 22 H77 C77 48 62 57 53 67 Q49 70 53 73 C62 83 77 92 77 118 H23 C23 92 38 83 47 73 Q51 70 47 67 C38 57 23 48 23 22Z" />
              </clipPath>
              <linearGradient id={`${id}-shine`}>
                <stop stopColor="var(--plot-blue)" stopOpacity=".2" />
                <stop
                  offset=".45"
                  stopColor="var(--surface)"
                  stopOpacity=".1"
                />
                <stop
                  offset="1"
                  stopColor="var(--plot-blue)"
                  stopOpacity=".25"
                />
              </linearGradient>
            </defs>
            <g key={turn} className={turn ? "hourglass-turn" : undefined}>
              <path
                d="M23 22 H77 C77 48 62 57 53 67 Q49 70 53 73 C62 83 77 92 77 118 H23 C23 92 38 83 47 73 Q51 70 47 67 C38 57 23 48 23 22Z"
                fill={`url(#${id}-shine)`}
                stroke="var(--plot-blue)"
                strokeWidth="2"
              />
              <g clipPath={`url(#${id}-glass)`} fill="var(--accent)">
                <rect
                  className="hourglass-sand-top"
                  x="20"
                  y={67 - 44 * Math.sqrt(ratio)}
                  width="60"
                  height={44 * Math.sqrt(ratio)}
                />
                <path
                  className="hourglass-sand-bottom"
                  d={`M20 120 H80 L50 ${120 - 48 * Math.sqrt(1 - ratio)}Z`}
                />
                {running && (
                  <path
                    className="hourglass-stream"
                    d="M50 70 V118"
                    stroke="var(--accent)"
                    strokeWidth="1.5"
                    strokeDasharray="2 4"
                  />
                )}
              </g>
              <path
                d="M29 29 Q30 48 41 56 M30 109 Q30 95 39 88"
                fill="none"
                stroke="var(--text)"
                strokeOpacity=".45"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M15 18 H85 M15 122 H85"
                stroke="var(--muted)"
                strokeWidth="7"
                strokeLinecap="round"
              />
              <path
                d="M18 18 V122 M82 18 V122"
                stroke="var(--border)"
                strokeWidth="3"
              />
            </g>
          </svg>
        </button>
        <button
          ref={menuButton}
          className="hourglass-notch icon-button"
          aria-label="Kum saati süre ayarları"
          aria-expanded={menu}
          aria-controls={`${id}-menu`}
          onClick={() => {
            setMenu((value) => !value);
            setRawMinutes(String(timer.durationSeconds / 60));
          }}
        >
          <ChevronDown size={15} />
        </button>
      </div>
      <div className="hourglass-controls">
        <output
          className="hourglass-time"
          aria-label={`Kalan süre ${formatCountdown(remaining)}`}
          aria-live="off"
        >
          {formatCountdown(remaining)}
        </output>
        <p className="hourglass-state" role="status">
          {remaining === 0
            ? "Kum bitti · istersen yeniden çevir"
            : running
              ? "Kum akıyor"
              : paused
                ? "Duraklatıldı"
                : "Hazır · ters çevir"}
        </p>
        <button
          className="text-button hourglass-pause"
          disabled={busy}
          onClick={() =>
            void control({
              type: running ? "pause" : paused ? "resume" : "flip",
            })
          }
        >
          {running ? <Pause size={15} /> : <Play size={15} />}{" "}
          {running ? "Durdur" : paused ? "Devam et" : "Başlat"}
        </button>
      </div>
      {menu && (
        <div
          className="hourglass-menu panel"
          ref={menuPanel}
          id={`${id}-menu`}
          role="group"
          aria-label="Kum saati süresi"
        >
          <div className="section-heading">
            <strong>Süre seç</strong>
            <button
              className="icon-button"
              aria-label="Süre ayarlarını kapat"
              onClick={close}
            >
              <X size={16} />
            </button>
          </div>
          <div className="hourglass-presets">
            {[1, 5, 10, 20].map((value) => (
              <button
                key={value}
                className="secondary"
                disabled={busy}
                aria-pressed={timer.durationSeconds === value * 60}
                onClick={() =>
                  void control({ type: "duration", seconds: value * 60 })
                }
              >
                {value} dakika
              </button>
            ))}
          </div>
          <button
            className="text-button"
            aria-expanded={custom}
            onClick={() => setCustom((value) => !value)}
          >
            Özel süre
          </button>
          {custom && (
            <div className="hourglass-custom">
              <label className="field">
                Süre: {validMinutes ? minutes : "…"} dakika
                <input
                  type="range"
                  aria-label="Özel süre, dakika"
                  min={1}
                  max={120}
                  step={1}
                  value={validMinutes ? minutes : timer.durationSeconds / 60}
                  onChange={(event) => setRawMinutes(event.target.value)}
                />
              </label>
              <label className="field">
                Dakika (1–120)
                <input
                  type="number"
                  aria-label="Özel süreyi dakika olarak yaz"
                  min={1}
                  max={120}
                  step={1}
                  value={rawMinutes}
                  aria-invalid={!validMinutes}
                  onChange={(event) => setRawMinutes(event.target.value)}
                />
              </label>
              {!validMinutes && (
                <p role="alert">1 ile 120 arasında bir tam dakika yaz.</p>
              )}
              <button
                className="secondary"
                disabled={!validMinutes || busy}
                onClick={() =>
                  void control({ type: "duration", seconds: minutes * 60 })
                }
              >
                Süreyi uygula
              </button>
            </div>
          )}
          <p className="small muted">
            Yeni süre seçilince sayaç başa döner. Süre dolması ilerleme veya XP
            kazandırmaz.
          </p>
        </div>
      )}
      {error && (
        <p className="timer-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
