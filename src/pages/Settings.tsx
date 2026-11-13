import { useRef, useState } from "react";
import {
  Check,
  Download,
  RotateCcw,
  Upload,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import { Capacitor } from "@capacitor/core";
import { useApp } from "../store";
import { parseBackup } from "../domain/storage";
import type { Settings as SettingsType } from "../domain/model";
const VERSION = "0.3.1";
function NumericControl({
  label,
  value,
  min,
  max,
  step = 5,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (n: number) => void;
}) {
  const { t } = useApp();
  const [raw, setRaw] = useState(String(value));
  const [invalid, setInvalid] = useState(false);
  const shown = invalid ? raw : String(value);
  function commit(v: string) {
    setRaw(v);
    const n = Number(v);
    if (!v || !Number.isFinite(n) || n < min || n > max || n % step !== 0) {
      setInvalid(true);
      return;
    }
    setInvalid(false);
    onChange(n);
  }
  return (
    <div className="numeric-control">
      <label>
        {label}
        <div className="range-row">
          <input
            aria-label={label}
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => {
              setInvalid(false);
              onChange(Number(e.target.value));
            }}
          />
          <div className="percent-input">
            <input
              aria-label={`${label} %`}
              type="number"
              min={min}
              max={max}
              step={step}
              value={shown}
              aria-invalid={invalid}
              onChange={(e) => commit(e.target.value)}
            />
            <span>%</span>
          </div>
          <button
            className="icon-button"
            aria-label={`${label}: ${t("reset")}`}
            onClick={() => {
              setInvalid(false);
              onChange(100);
            }}
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </label>
      {invalid && (
        <p className="field-error" role="alert">
          {t("scaleError")}
        </p>
      )}
      <div className="scale-presets">
        {[80, 100, 125, 150, 175, 200].map((n) => (
          <button
            key={n}
            aria-pressed={value === n}
            className={value === n ? "active" : ""}
            onClick={() => {
              setInvalid(false);
              onChange(n);
            }}
          >
            {n}%
          </button>
        ))}
      </div>
    </div>
  );
}
function Toggle({
  label,
  checked,
  onChange,
  help,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  help?: string;
}) {
  return (
    <label className="toggle-row">
      <span>
        <strong>{label}</strong>
        {help && <small>{help}</small>}
      </span>
      <input
        className="switch"
        type="checkbox"
        role="switch"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
    </label>
  );
}
export function Settings({
  updateReady,
  applyUpdate,
}: {
  updateReady: boolean;
  applyUpdate: () => void;
}) {
  const { state, setSetting, t, update, commit, toast, status } = useApp();
  const file = useRef<HTMLInputElement>(null);
  const [checking, setChecking] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");
  const [newVersion, setNewVersion] = useState("");
  const native =
    Capacitor.isNativePlatform() ||
    !["http:", "https:"].includes(location.protocol);
  const set = <K extends keyof SettingsType>(key: K, v: SettingsType[K]) => {
    void setSetting(key, v).catch(() => {});
  };
  async function exportData() {
    try {
      const data = JSON.stringify(state, null, 2);
      const name = `YKSMania-yedek-${new Date().toISOString().slice(0, 10)}.json`;
      if (Capacitor.isNativePlatform()) {
        const [{ Filesystem, Directory, Encoding }, { Share }] =
          await Promise.all([
            import("@capacitor/filesystem"),
            import("@capacitor/share"),
          ]);
        const result = await Filesystem.writeFile({
          path: name,
          data,
          directory: Directory.Cache,
          encoding: Encoding.UTF8,
        });
        await Share.share({ title: "YKSMania", url: result.uri });
      } else {
        const url = URL.createObjectURL(
          new Blob([data], { type: "application/json" }),
        );
        const a = document.createElement("a");
        a.href = url;
        a.download = name;
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 10000);
      }
    } catch {
      toast(t("fileError"));
    }
  }
  async function restoreData(f: File) {
    try {
      if (f.size > 20_000_000) throw Error();
      const backup = await parseBackup(await f.text());
      if (!confirm(t("restoreConfirm"))) return;
      await commit(() => backup);
      toast(t("backupRestored"));
    } catch {
      toast(t("backupInvalid"));
    } finally {
      if (file.current) file.current.value = "";
    }
  }
  async function checkUpdates() {
    if (native) {
      window.open(
        "https://github.com/kaansavukduran/yksmania/releases",
        "_blank",
        "noopener,noreferrer",
      );
      return;
    }
    setChecking(true);
    try {
      const response = await fetch(`${import.meta.env.BASE_URL}version.json`, {
        cache: "no-store",
        signal: AbortSignal.timeout(10000),
      });
      if (!response.ok) throw Error();
      const data = await response.json();
      if (
        typeof data.version !== "string" ||
        !/^\d+\.\d+\.\d+$/.test(data.version)
      )
        throw Error();
      setNewVersion(data.version !== VERSION ? data.version : "");
      setUpdateMessage(
        t(data.version === VERSION ? "updateCurrent" : "updateReady"),
      );
      if ("serviceWorker" in navigator) {
        const reg = await navigator.serviceWorker.getRegistration();
        await reg?.update();
      }
    } catch {
      setUpdateMessage(t("updateOffline"));
    } finally {
      setChecking(false);
    }
  }
  return (
    <>
      <header className="page-heading">
        <div>
          <p className="eyebrow">{t("deviceScope")}</p>
          <h1>{t("settings")}</h1>
        </div>
      </header>
      <div className="settings-grid">
        <section className="panel settings-panel">
          <h2>{t("general")}</h2>
          <label className="field">
            {t("examDate")}
            <input
              type="date"
              value={state.settings.examDate}
              onChange={(e) => set("examDate", e.target.value)}
            />
            <small className="muted">{t("examHelp")}</small>
          </label>
        </section>
        <section className="panel settings-panel appearance-panel">
          <h2>{t("appearance")}</h2>
          <label className="field">
            {t("theme")}
            <select
              aria-label={t("theme")}
              value={state.settings.theme}
              onChange={(e) =>
                set("theme", e.target.value as SettingsType["theme"])
              }
            >
              {(["dark", "light", "system", "contrast"] as const).map((v) => (
                <option key={v} value={v}>
                  {t(v)}
                </option>
              ))}
            </select>
          </label>
          <NumericControl
            label={t("uiScale")}
            value={state.settings.scale}
            min={80}
            max={200}
            onChange={(n) => set("scale", n)}
          />
          <NumericControl
            label={t("textSize")}
            value={state.settings.textSize}
            min={80}
            max={200}
            onChange={(n) => set("textSize", n)}
          />
          <label className="field">
            {t("font")}
            <select
              aria-label={t("font")}
              value={state.settings.font}
              onChange={(e) =>
                set("font", e.target.value as SettingsType["font"])
              }
            >
              <option value="system">{t("systemFont")}</option>
              <option value="lexend">{t("dyslexia")}</option>
            </select>
          </label>
          <p className="font-preview">{t("fontPreview")}</p>
          <Toggle
            label={t("motion")}
            help={t("motionHelp")}
            checked={state.settings.motion}
            onChange={(v) => set("motion", v)}
          />
        </section>
        <section className="panel settings-panel">
          <h2>{t("game")}</h2>
          <Toggle
            label={t("game")}
            checked={state.settings.gamification}
            onChange={(v) => set("gamification", v)}
          />
          <Toggle
            label={t("sound")}
            checked={state.settings.sound}
            onChange={(v) => set("sound", v)}
          />
        </section>
        <section className="panel settings-panel">
          <h2>{t("data")}</h2>
          <p className="small muted">{t("backupHelp")}</p>
          <div className="settings-buttons">
            <button
              className="secondary"
              onClick={() => {
                void exportData();
              }}
            >
              <Download size={17} />
              {t("export")}
            </button>
            <input
              type="file"
              ref={file}
              accept="application/json,.json"
              hidden
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) void restoreData(f);
              }}
            />
            <button className="secondary" onClick={() => file.current?.click()}>
              <Upload size={17} />
              {t("restore")}
            </button>
          </div>
        </section>
        <section className="panel settings-panel">
          <h2>{t("updates")}</h2>
          <p className="version-row">
            <span>{t("version")}</span>
            <strong>{VERSION} alpha</strong>
          </p>
          <p className="small muted">
            {native ? t("nativeUpdates") : t("scopeNote")}
          </p>
          <button
            className="secondary"
            disabled={checking}
            onClick={() => {
              void checkUpdates();
            }}
          >
            <RefreshCw size={17} className={checking ? "spin" : ""} />
            {t("checkUpdate")}
          </button>
          {updateMessage && (
            <p role="status">
              {newVersion && `${newVersion} · `}
              {updateMessage}
            </p>
          )}
          {updateReady && (
            <button
              className="primary"
              disabled={status !== "saved"}
              onClick={applyUpdate}
            >
              <Check size={17} />
              {t("applyUpdate")}
            </button>
          )}
          <a
            className="text-button"
            href="https://github.com/kaansavukduran/yksmania/releases"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("releasePage")}
            <ExternalLink size={15} />
          </a>
        </section>
      </div>
    </>
  );
}
