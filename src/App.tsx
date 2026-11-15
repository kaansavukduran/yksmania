import { useEffect, useState } from "react";
import {
  BookOpen,
  Files,
  ClipboardCheck,
  ListChecks,
  CalendarDays,
  Compass,
  Home,
  Settings2,
  Sprout,
  Wifi,
  WifiOff,
  Check,
  AlertCircle,
  Menu,
  X,
} from "lucide-react";
import { useRegisterSW } from "virtual:pwa-register/react";
import { Capacitor } from "@capacitor/core";
import { useApp } from "./store";
import { Today } from "./pages/Today";
import { Courses } from "./pages/Courses";
import { Cheatsheets } from "./pages/Cheatsheets";
import { Calendar } from "./pages/Calendar";
import { Mistakes } from "./pages/Mistakes";
import { Exams, ExamDeadlineWatcher } from "./pages/Exams";
import { World } from "./pages/World";
import { Settings } from "./pages/Settings";
import { Theory } from "./pages/Theory";
import { Study, Result } from "./pages/Study";
import { Topic } from "./pages/Topic";
import type { Lesson, ReviewStage } from "./domain/model";
const routes = [
  { route: "/today", key: "today", Icon: Home },
  { route: "/courses", key: "courses", Icon: BookOpen },
  { route: "/cheatsheets", key: "cheatsheets", Icon: Files },
  { route: "/questions", key: "questions", Icon: ListChecks },
  { route: "/exams", key: "exams", Icon: ClipboardCheck },
  { route: "/calendar", key: "calendar", Icon: CalendarDays },
  { route: "/mistakes", key: "mistakes", Icon: Sprout },
  { route: "/world", key: "world", Icon: Compass },
  { route: "/settings", key: "settings", Icon: Settings2 },
];
function WebUpdates({
  onReady,
}: {
  onReady: (ready: boolean, apply?: () => void) => void;
}) {
  const {
    needRefresh: [ready],
    updateServiceWorker,
  } = useRegisterSW();
  useEffect(
    () =>
      onReady(ready, () => {
        void updateServiceWorker(true);
      }),
    [ready, updateServiceWorker, onReady],
  );
  return null;
}
export default function App() {
  const { state, t, commit, status, retry, toast } = useApp();
  const [route, setRoute] = useState(() => location.hash.slice(1) || "/today");
  const [online, setOnline] = useState(navigator.onLine);
  const [menu, setMenu] = useState(false);
  const [mobile, setMobile] = useState(
    () => matchMedia("(max-width:850px)").matches,
  );
  useEffect(() => {
    const media = matchMedia("(max-width:850px)");
    const listener = () => setMobile(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);
  useEffect(() => {
    if (!menu) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenu(false);
        setTimeout(
          () =>
            document.querySelector<HTMLButtonElement>(".mobile-menu")?.focus(),
          0,
        );
      }
    };
    document.addEventListener("keydown", onKey);
    document
      .querySelector<HTMLButtonElement>('.sidebar button[aria-current="page"]')
      ?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [menu]);
  const [updateReady, setUpdateReady] = useState(false);
  const [apply, setApply] = useState<() => void>(() => () => {});
  const navigate = (r: string) => {
    location.hash = r;
    setMenu(false);
  };
  useEffect(() => {
    const handle = () => {
      setRoute(location.hash.slice(1) || "/today");
      setMenu(false);
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", handle);
    const yes = () => setOnline(true);
    const no = () => setOnline(false);
    window.addEventListener("online", yes);
    window.addEventListener("offline", no);
    return () => {
      window.removeEventListener("hashchange", handle);
      window.removeEventListener("online", yes);
      window.removeEventListener("offline", no);
    };
  }, []);
  useEffect(() => {
    document.documentElement.lang = "tr";
    document.documentElement.dataset.theme = state.settings.theme;
    document.documentElement.dataset.font = state.settings.font;
    document.documentElement.style.fontSize = `${(16 * state.settings.scale) / 100}px`;
    document.documentElement.style.setProperty(
      "--text-scale",
      String(state.settings.textSize / 100),
    );
    document.documentElement.dataset.motion = state.settings.motion
      ? "on"
      : "off";
  }, [
    state.settings.theme,
    state.settings.font,
    state.settings.scale,
    state.settings.textSize,
    state.settings.motion,
  ]);
  const start = async (lesson: Lesson, reviewId?: string, practice = false) => {
    if (practice && !lesson.questions.length) {
      navigate(`/lesson?id=${encodeURIComponent(lesson.id)}`);
      return;
    }
    if (!practice && !reviewId) {
      navigate(`/lesson?id=${encodeURIComponent(lesson.id)}`);
      return;
    }
    if (
      state.draft &&
      state.draft.lessonId === lesson.id &&
      state.draft.reviewId === reviewId
    ) {
      if (state.draft.phase === "read") {
        try {
          await commit((s) => ({
            ...s,
            draft: s.draft ? { ...s.draft, phase: "practice" } : null,
          }));
        } catch {
          toast(t("saveError"));
          return;
        }
      }
      navigate("/practice");
      return;
    }
    if (state.draft && !confirm(t("draftConfirm"))) return;
    try {
      await commit((s) => ({
        ...s,
        draft: {
          lessonId: lesson.id,
          phase: "practice",
          index: 0,
          responses: [],
          selected: null,
          checked: false,
          hint: false,
          confidence: "medium",
          note: s.notes["lesson:" + lesson.id] ?? "",
          startedAt: Date.now(),
          reviewId,
        },
      }));
      navigate("/practice");
    } catch {
      toast(t("saveError"));
    }
  };
  const path = route.split("?")[0];
  const navKey =
    path === "/cheatsheets"
      ? "cheatsheets"
      : path === "/sources" || path === "/library"
        ? "courses"
        : path === "/topic"
          ? new URLSearchParams(route.split("?")[1]).get("mode") === "questions"
            ? "questions"
            : "courses"
          : path === "/lesson"
            ? "courses"
            : path === "/practice" || path === "/result"
              ? "questions"
              : path === "/study"
                ? state.draft?.phase === "read"
                  ? "courses"
                  : "questions"
                : (routes.find((v) => v.route === path)?.key ?? "today");
  const updateCallback = useState(
    () => (ready: boolean, applyFn?: () => void) => {
      setUpdateReady(ready);
      if (applyFn) setApply(() => applyFn);
    },
  )[0];
  return (
    <div className="app-shell">
      <ExamDeadlineWatcher />
      {!Capacitor.isNativePlatform() &&
        ["http:", "https:"].includes(location.protocol) && (
          <WebUpdates onReady={updateCallback} />
        )}
      <a
        className="skip-link"
        href="#main-content"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("main-content")?.focus();
        }}
      >
        {t("skipToContent")}
      </a>
      <aside
        className={`sidebar ${menu ? "menu-open" : ""}`}
        aria-label={t("mainNavigation")}
        inert={mobile && !menu}
      >
        <a className="brand" href="#/today">
          <span className="brand-symbol" aria-hidden="true">
            Y<span>✦</span>
          </span>
          <span>
            yks<span>mania</span>
            <small>FRAGARIA INTERACTIVE</small>
          </span>
        </a>
        <p className="sidebar-caption">{t("brandNote")}</p>
        <nav aria-label={t("mainNavigation")}>
          {routes
            .filter((v) => v.key !== "settings")
            .map(({ route: r, key, Icon }) => (
              <button
                className={navKey === key ? "nav-item active" : "nav-item"}
                aria-current={navKey === key ? "page" : undefined}
                key={key}
                onClick={() => navigate(r)}
              >
                <Icon size={20} />
                <span>{t(key)}</span>
                {navKey === key && <span className="nav-dot" />}
              </button>
            ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="local-note">
            <span className="tiny-dot" />
            <span>{t("localFirst")}</span>
          </div>
          <button
            className={navKey === "settings" ? "nav-item active" : "nav-item"}
            aria-current={navKey === "settings" ? "page" : undefined}
            onClick={() => navigate("/settings")}
          >
            <Settings2 size={20} />
            {t("settings")}
          </button>
          <span className="sidebar-version">0.13.0 alpha</span>
        </div>
      </aside>
      {menu && (
        <button
          className="menu-backdrop"
          aria-label={t("close")}
          onClick={() => setMenu(false)}
        />
      )}
      <div className="main-shell">
        <header className="topbar">
          <button
            className="icon-button mobile-menu"
            aria-label={menu ? t("close") : t("openMenu")}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
          <span className="breadcrumb">
            YKSMania <span>/</span> {t(navKey)}
          </span>
          <div className="topbar-status">
            <span
              className={`save-status ${status === "error" ? "error" : ""}`}
              role="status"
            >
              {status === "saved" ? (
                <Check size={13} />
              ) : status === "error" ? (
                <AlertCircle size={14} />
              ) : (
                <span className="saving-dot" />
              )}
              {t(
                status === "saved"
                  ? "saved"
                  : status === "saving"
                    ? "saving"
                    : "saveError",
              )}
            </span>
            <span className="connection">
              {online ? <Wifi size={15} /> : <WifiOff size={15} />}
              <span>{t(online ? "online" : "offline")}</span>
            </span>
          </div>
        </header>
        {status === "error" && (
          <div className="error-banner" role="alert">
            <p>{t("saveError")}</p>
            <button className="secondary" onClick={retry}>
              {t("retry")}
            </button>
          </div>
        )}
        {updateReady && (
          <div className="update-banner">
            <span>{t("updateReady")}</span>
            <button
              className="primary"
              disabled={status !== "saved"}
              onClick={() => {
                if (status === "saved") apply();
              }}
            >
              {t("applyUpdate")}
            </button>
            <button
              className="text-button"
              onClick={() => navigate("/settings")}
            >
              {t("updates")}
            </button>
          </div>
        )}
        <main
          id="main-content"
          tabIndex={-1}
          className={`main-content ${["/study", "/lesson", "/practice"].includes(path) ? "study-main" : ""}`}
        >
          {path === "/today" ? (
            <Today
              start={(l, r) => {
                void start(l, r);
              }}
              navigate={navigate}
            />
          ) : path === "/courses" ? (
            <Courses
              start={(l) => {
                void start(l);
              }}
            />
          ) : path === "/cheatsheets" ? (
            <Cheatsheets
              key={route}
              navigate={navigate}
              topicId={
                new URLSearchParams(route.split("?")[1]).get("topic") ??
                undefined
              }
            />
          ) : path === "/topic" ? (
            <Topic
              id={new URLSearchParams(route.split("?")[1]).get("id") ?? ""}
              mode={
                new URLSearchParams(route.split("?")[1]).get("mode") ===
                "questions"
                  ? "questions"
                  : "theory"
              }
              reviewStage={
                ([3, 7, 21].includes(
                  Number(
                    new URLSearchParams(route.split("?")[1]).get("review"),
                  ),
                )
                  ? Number(
                      new URLSearchParams(route.split("?")[1]).get("review"),
                    )
                  : undefined) as ReviewStage | undefined
              }
              navigate={navigate}
              practice={(lesson) => {
                void start(lesson, undefined, true);
              }}
            />
          ) : path === "/questions" ? (
            <Courses
              mode="questions"
              start={(l) => {
                void start(l, undefined, true);
              }}
            />
          ) : path === "/lesson" ? (
            <Theory
              id={new URLSearchParams(route.split("?")[1]).get("id") ?? ""}
              practice={(l) => {
                void start(l, undefined, true);
              }}
              navigate={navigate}
            />
          ) : path === "/calendar" ? (
            <Calendar
              navigate={navigate}
              start={(l, r) => {
                void start(l, r);
              }}
            />
          ) : path === "/mistakes" ? (
            <Mistakes
              start={(l) => {
                void start(l, undefined, true);
              }}
              navigate={navigate}
            />
          ) : path === "/sources" || path === "/library" ? (
            <Courses
              start={(lesson) => {
                void start(lesson);
              }}
            />
          ) : path === "/exams" ? (
            <Exams
              navigate={navigate}
              resultId={
                new URLSearchParams(route.split("?")[1]).get("result") ??
                undefined
              }
            />
          ) : path === "/world" ? (
            <World navigate={navigate} />
          ) : path === "/settings" ? (
            <Settings
              updateReady={updateReady}
              applyUpdate={() => {
                if (status === "saved") apply();
                else toast(t("restartPending"));
              }}
            />
          ) : path === "/study" && state.draft?.phase === "read" ? (
            <Theory
              id={state.draft.lessonId}
              practice={(l) => {
                void start(l, state.draft?.reviewId, true);
              }}
              navigate={navigate}
            />
          ) : path === "/study" || path === "/practice" ? (
            <Study navigate={navigate} />
          ) : path === "/result" ? (
            <Result
              id={new URLSearchParams(route.split("?")[1]).get("id") ?? ""}
              navigate={navigate}
              start={(l) => {
                void start(l, undefined, true);
              }}
            />
          ) : (
            <Today
              start={(l) => {
                void start(l);
              }}
              navigate={navigate}
            />
          )}
        </main>
        <footer className="app-footer">{t("footer")}</footer>
      </div>
    </div>
  );
}
