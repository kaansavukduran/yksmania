import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  initialState,
  type AppState,
  type Settings,
  type Text,
} from "./domain/model";
import { loadState, saveState } from "./domain/storage";
import { localise, translate } from "./i18n";
import { typeset } from "./domain/typeset";
import { localDate } from "./domain/scheduler";
type Store = {
  state: AppState;
  today: string;
  update: (fn: (s: AppState) => AppState) => Promise<void>;
  commit: (fn: (s: AppState) => AppState) => Promise<void>;
  setSetting: <K extends keyof Settings>(
    key: K,
    value: Settings[K],
  ) => Promise<void>;
  status: "saved" | "saving" | "error";
  retry: () => void;
  t: (k: string) => string;
  l: (v: Text) => string;
  toast: (message: string) => void;
};
const Context = createContext<Store | null>(null);
export function Provider({ children }: { children: ReactNode }) {
  const [today, setToday] = useState(localDate);
  const [state, setState] = useState<AppState | null>(null);
  const [fatal, setFatal] = useState(false);
  const [status, setStatus] = useState<"saved" | "saving" | "error">("saved");
  const [message, setMessage] = useState("");
  const current = useRef<AppState>(initialState());
  const queue = useRef(Promise.resolve());
  const generation = useRef(0);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  useEffect(() => {
    const refreshDay = () => setToday(localDate());
    const timer = setInterval(refreshDay, 60000);
    window.addEventListener("focus", refreshDay);
    document.addEventListener("visibilitychange", refreshDay);
    return () => {
      clearInterval(timer);
      window.removeEventListener("focus", refreshDay);
      document.removeEventListener("visibilitychange", refreshDay);
    };
  }, []);
  useEffect(() => {
    let live = true;
    loadState()
      .then((s) => {
        if (live) {
          current.current = s;
          setState(s);
        }
      })
      .catch(() => {
        if (live) setFatal(true);
      });
    return () => {
      live = false;
    };
  }, []);
  function persist(next: AppState) {
    const n = ++generation.current;
    setStatus("saving");
    const task = queue.current.catch(() => {}).then(() => saveState(next));
    queue.current = task;
    task.then(
      () => {
        if (n === generation.current) setStatus("saved");
      },
      () => {
        if (n === generation.current) setStatus("error");
      },
    );
    return task;
  }
  function update(fn: (s: AppState) => AppState) {
    const next = fn(current.current);
    current.current = next;
    setState(next);
    return persist(next);
  }
  // Terminal actions become visible only after IndexedDB confirms the write.
  // Rebase the pure transformation if an ordinary draft/settings edit arrived.
  async function commit(fn: (s: AppState) => AppState) {
    for (;;) {
      const before = current.current;
      const next = fn(before);
      await persist(next);
      if (current.current !== before) continue;
      current.current = next;
      setState(next);
      return;
    }
  }
  function toast(m: string) {
    setMessage(m);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setMessage(""), 4500);
  }
  useEffect(() => () => clearTimeout(toastTimer.current), []);
  if (fatal)
    return (
      <main className="boot">
        <h1>YKSMania</h1>
        <p>{translate("loadError")}</p>
        <button onClick={() => location.reload()}>{translate("retry")}</button>
      </main>
    );
  if (!state)
    return (
      <main className="boot" aria-busy="true">
        YKSMania · {translate("loading")}
      </main>
    );
  return (
    <Context.Provider
      value={{
        state,
        today,
        update,
        commit,
        setSetting: (key, value) =>
          update((s) => ({ ...s, settings: { ...s.settings, [key]: value } })),
        status,
        retry: () => {
          void persist(current.current).catch(() => {});
        },
        t: translate,
        // Display text only: typeset never changes the saved content.
        l: (value) => typeset(localise(value)),
        toast,
      }}
    >
      {children}
      {message && (
        <div className="toast" role="status">
          {message}
        </div>
      )}
    </Context.Provider>
  );
}
export function useApp() {
  const value = useContext(Context);
  if (!value) throw Error("Missing provider");
  return value;
}
