const {
  app,
  BrowserWindow,
  shell,
  session,
  protocol,
  net,
} = require("electron");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
protocol.registerSchemesAsPrivileged([
  {
    scheme: "yksmania",
    privileges: {
      standard: true,
      secure: true,
      supportFetchAPI: true,
      stream: true,
    },
  },
]);
// electron-builder portable sets this directory. All portable user data travels with it.
if (process.env.PORTABLE_EXECUTABLE_DIR) {
  app.setPath(
    "userData",
    path.join(process.env.PORTABLE_EXECUTABLE_DIR, "YKSManiaData"),
  );
}
const safeExternal = (url) => {
  try {
    const u = new URL(url);
    return (
      u.protocol === "https:" &&
      u.hostname === "github.com" &&
      u.pathname.startsWith("/kaansavukduran/yksmania")
    );
  } catch {
    return false;
  }
};
async function createWindow() {
  const window = new BrowserWindow({
    width: 1400,
    height: 940,
    minWidth: 360,
    minHeight: 500,
    backgroundColor: "#15191f",
    autoHideMenuBar: true,
    title: "YKSMania",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      webSecurity: true,
    },
  });
  window.webContents.setWindowOpenHandler(({ url }) => {
    if (safeExternal(url)) void shell.openExternal(url);
    return { action: "deny" };
  });
  window.webContents.on("will-navigate", (event, url) => {
    if (!url.startsWith("yksmania://app/")) {
      event.preventDefault();
      if (safeExternal(url)) void shell.openExternal(url);
    }
  });
  await window.loadURL("yksmania://app/index.html");
}
app.whenReady().then(() => {
  const root = path.resolve(__dirname, "../dist");
  protocol.handle("yksmania", (request) => {
    const url = new URL(request.url);
    if (url.hostname !== "app")
      return new Response("Not found", { status: 404 });
    let pathname;
    try {
      pathname = decodeURIComponent(url.pathname);
    } catch {
      return new Response("Invalid path", { status: 400 });
    }
    const file = path.resolve(root, `.${pathname}`);
    if (!file.startsWith(root + path.sep))
      return new Response("Not found", { status: 404 });
    return net.fetch(pathToFileURL(file).toString());
  });
  session.defaultSession.setPermissionRequestHandler(
    (_wc, _permission, callback) => callback(false),
  );
  return createWindow();
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) void createWindow();
});
