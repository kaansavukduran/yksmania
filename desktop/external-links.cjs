// Public learning-source links supported by the desktop browser handoff.
// Open selected existing learning links in the system browser, never in Electron.
const VIDEO_ID = /^[A-Za-z0-9_-]{11}$/;
const WATCH_PARAMS = new Set(["v", "list", "index", "pp", "t", "hl"]);
const SHORT_PARAMS = new Set(["t", "si"]);
const staticPageFragment = (hash) => !hash || /^#page=[1-9]\d*$/.test(hash);
const onlyParams = (params, allowed) =>
  [...params.keys()].every((key) => allowed.has(key));
function isAllowedExternalUrl(value) {
  if (typeof value !== "string" || /[\u0000-\u0020\u007f\\]/u.test(value))
    return false;
  try {
    const u = new URL(value);
    if (u.protocol !== "https:" || u.username || u.password || u.port)
      return false;
    if (u.hostname === "github.com")
      return /^\/kaansavukduran\/yksmania(?:\/|$)/.test(u.pathname);
    if (u.hostname === "drive.google.com")
      return /^\/file\/d\/[A-Za-z0-9_-]+\/view$/.test(u.pathname);
    if (u.hostname === "youtube.com" || u.hostname === "www.youtube.com")
      return (
        u.pathname === "/watch" &&
        !u.hash &&
        u.searchParams.getAll("v").length === 1 &&
        VIDEO_ID.test(u.searchParams.get("v")) &&
        onlyParams(u.searchParams, WATCH_PARAMS)
      );
    if (u.hostname === "youtu.be")
      return (
        VIDEO_ID.test(u.pathname.slice(1)) &&
        !u.hash &&
        onlyParams(u.searchParams, SHORT_PARAMS)
      );
    if (u.hostname === "ogmmateryal.eba.gov.tr")
      return (
        !u.search &&
        staticPageFragment(u.hash) &&
        (/^\/panel\/upload\/etkilesimli\/kitap\/[A-Za-z0-9_/-]+\.pdf$/.test(
          u.pathname,
        ) ||
          /^\/panel\/upload\/etkilesimli\/kitap\/[A-Za-z0-9_/-]+\/files\/basic-html\/page[1-9]\d*\.html$/.test(
            u.pathname,
          ))
      );
    if (u.hostname === "dokuman.osym.gov.tr")
      return (
        !u.search &&
        staticPageFragment(u.hash) &&
        (/^\/(?:pdfdokuman|web)\/[A-Za-z0-9_/-]+\.pdf$/.test(u.pathname) ||
          u.pathname === "/pdfdokuman/2013/OSYS/24.03.2013%20YGS.pdf")
      );
    return false;
  } catch {
    return false;
  }
}
module.exports = { isAllowedExternalUrl };
