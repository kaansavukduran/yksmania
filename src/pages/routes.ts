import { createElement, use, type ComponentType } from "react";

/**
 * A route component whose code lives in its own chunk. Unlike React.lazy it
 * can be preloaded before the first render: once the chunk has arrived the
 * page renders synchronously, so navigation never waits on a timer and an
 * already-loaded page never flashes a loading state.
 */
export type LazyPage<P> = ComponentType<P> & { preload: () => Promise<void> };

export function lazyPage<P extends object>(load: () => Promise<ComponentType<P>>): LazyPage<P> {
  let Loaded: ComponentType<P> | null = null;
  let pending: Promise<void> | null = null;
  const preload = () =>
    (pending ??= load().then(
      (component) => {
        Loaded = component;
      },
      (error: unknown) => {
        pending = null; // let the next visit try the chunk again
        throw error;
      },
    ));
  const Page = (props: P) => {
    if (!Loaded) use(preload());
    return createElement(Loaded!, props);
  };
  return Object.assign(Page, { preload });
}

export const Today = lazyPage(() => import("./Today").then((m) => m.Today));
export const Courses = lazyPage(() => import("./Courses").then((m) => m.Courses));
export const Cheatsheets = lazyPage(() => import("./Cheatsheets").then((m) => m.Cheatsheets));
export const Calendar = lazyPage(() => import("./Calendar").then((m) => m.Calendar));
export const Mistakes = lazyPage(() => import("./Mistakes").then((m) => m.Mistakes));
export const Exams = lazyPage(() => import("./Exams").then((m) => m.Exams));
export const World = lazyPage(() => import("./World").then((m) => m.World));
export const Settings = lazyPage(() => import("./Settings").then((m) => m.Settings));
export const Theory = lazyPage(() => import("./Theory").then((m) => m.Theory));
export const Study = lazyPage(() => import("./Study").then((m) => m.Study));
export const Result = lazyPage(() => import("./Study").then((m) => m.Result));
export const Topic = lazyPage(() => import("./Topic").then((m) => m.Topic));

const pages = [Today, Courses, Cheatsheets, Calendar, Mistakes, Exams, World, Settings, Theory, Study, Result, Topic];

/** Fetch every route chunk in parallel; resolves when all have loaded. */
export function preloadPages(): Promise<void> {
  return Promise.all(pages.map((page) => page.preload())).then(() => undefined);
}

/** The page chunk(s) a hash route renders first ("/study" may show Theory). */
type Preloadable = { preload: () => Promise<void> };
export function pagesForRoute(hash: string): Preloadable[] {
  const path = hash.replace(/^#/, "").split("?")[0] || "/today";
  const map: Record<string, Preloadable[]> = {
    "/today": [Today],
    "/courses": [Courses],
    "/questions": [Courses],
    "/sources": [Courses],
    "/library": [Courses],
    "/cheatsheets": [Cheatsheets],
    "/topic": [Topic],
    "/lesson": [Theory],
    "/calendar": [Calendar],
    "/mistakes": [Mistakes],
    "/exams": [Exams],
    "/world": [World],
    "/settings": [Settings],
    "/study": [Study, Theory],
    "/practice": [Study],
    "/result": [Result],
  };
  return map[path] ?? [Today];
}
