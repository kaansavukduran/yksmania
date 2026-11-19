/*
 * Route components. They are imported statically on purpose: with dynamic
 * import() a Chromium offline reload could abort a route chunk request
 * without settling the import, so the app never painted. Size is handled by
 * the static chunk groups in vite.config.ts (content, guides, narratives,
 * React) which keep every file well below the offline precache limit.
 */
export { Today } from "./Today";
export { Courses } from "./Courses";
export { Cheatsheets } from "./Cheatsheets";
export { Calendar } from "./Calendar";
export { Mistakes } from "./Mistakes";
export { Exams } from "./Exams";
export { World } from "./World";
export { Settings } from "./Settings";
export { Theory } from "./Theory";
export { Study, Result } from "./Study";
export { Topic } from "./Topic";
