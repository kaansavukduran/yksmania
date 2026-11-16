import { test, type CDPSession, type Page } from "@playwright/test";

type EventRecord = Record<string, unknown>;
type DiagnosticEvent =
  | "Network.requestWillBeSent"
  | "Network.responseReceived"
  | "Network.loadingFinished"
  | "Network.loadingFailed"
  | "Page.frameNavigated"
  | "Page.lifecycleEvent";
type Capture = {
  session?: CDPSession;
  events: EventRecord[];
  dropped: number;
  listeners: Array<[DiagnosticEvent, (event: any) => void]>;
  setupErrors: string[];
};

const allowedHeaders = new Set([
  "origin",
  "vary",
  "content-type",
  "cache-control",
  "etag",
]);

function headers(input: Record<string, unknown> | undefined) {
  return Object.fromEntries(
    Object.entries(input ?? {})
      .filter(
        ([key, value]) =>
          allowedHeaders.has(key.toLowerCase()) && typeof value === "string",
      )
      .map(([key, value]) => [
        key.toLowerCase(),
        (value as string).slice(0, 512),
      ]),
  );
}

function safeURL(value: unknown, baseURL: string) {
  if (typeof value !== "string") return null;
  try {
    const base = new URL(baseURL);
    const url = new URL(value, base);
    const prefix = base.pathname.endsWith("/")
      ? base.pathname
      : `${base.pathname}/`;
    const relative = url.pathname.startsWith(prefix)
      ? url.pathname.slice(prefix.length)
      : null;
    if (
      url.origin !== base.origin ||
      url.username ||
      url.password ||
      relative === null ||
      !/^(?:|index\.html|sw\.js|workbox-[\w-]+\.js|manifest\.webmanifest|assets\/[\w./-]+)$/.test(
        relative,
      )
    )
      return "[redacted-url]";
    const route =
      /^#\/(?:today|courses|cheatsheets|calendar|mistakes|exams|world|settings|theory|topic|practice|study)(?:\/[a-z0-9-]+)?$/.test(
        url.hash,
      )
        ? url.hash
        : "";
    return `${url.origin}${url.pathname}${route}`;
  } catch {
    return "[redacted-url]";
  }
}

async function bounded<T>(
  promise: Promise<T>,
  milliseconds: number,
): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      promise,
      new Promise<never>((_, reject) => {
        timer = setTimeout(
          () => reject(new Error("DIAGNOSTIC_DEADLINE")),
          milliseconds,
        );
      }),
    ]);
  } finally {
    clearTimeout(timer);
  }
}

// Runs before application scripts. The original request and its handlers remain
// untouched; this records only call times, without issuing any database query.
function installNativeOpenProbe() {
  try {
    const log: Array<Record<string, unknown>> = [];
    const target = window as unknown as {
      __yksOfflineBootOpenLog?: typeof log;
    };
    target.__yksOfflineBootOpenLog = log;
    log.push({
      type: "document-init",
      unixMs: Date.now(),
      performanceMs: performance.now(),
    });
    const descriptor = Object.getOwnPropertyDescriptor(
      IDBFactory.prototype,
      "open",
    );
    if (!descriptor || typeof descriptor.value !== "function") return;
    const original = descriptor.value as IDBFactory["open"];
    Object.defineProperty(IDBFactory.prototype, "open", {
      ...descriptor,
      value: function (
        this: IDBFactory,
        ...args: Parameters<IDBFactory["open"]>
      ) {
        try {
          if (log.length < 1000) {
            log.push({
              type: "IDB.open",
              unixMs: Date.now(),
              performanceMs: performance.now(),
              database: args[0] === "yksmania" ? "yksmania" : "other",
              version: typeof args[1] === "number" ? args[1] : null,
            });
          }
        } catch {
          // Recording failure must not change the native call or thrown error.
        }
        return Reflect.apply(original, this, args);
      },
    });
  } catch {
    // An unavailable probe must not prevent application startup.
  }
}

// This function has no external closures because Playwright serializes it.
async function failureSnapshot({ baseURL }: { baseURL: string }) {
  const headerNames = new Set([
    "origin",
    "vary",
    "content-type",
    "cache-control",
    "etag",
  ]);
  const selectedHeaders = (input: Headers) =>
    [...input.entries()]
      .filter(([name]) => headerNames.has(name.toLowerCase()))
      .map(([name, value]) => [name.toLowerCase(), value.slice(0, 512)]);
  const urlForEvidence = (value: string) => {
    try {
      const base = new URL(baseURL);
      const url = new URL(value, base);
      const prefix = base.pathname.endsWith("/")
        ? base.pathname
        : `${base.pathname}/`;
      const relative = url.pathname.startsWith(prefix)
        ? url.pathname.slice(prefix.length)
        : null;
      if (
        url.origin !== base.origin ||
        url.username ||
        url.password ||
        relative === null ||
        !/^(?:|index\.html|sw\.js|workbox-[\w-]+\.js|manifest\.webmanifest|assets\/[\w./-]+)$/.test(
          relative,
        )
      )
        return "[redacted-url]";
      const route =
        /^#\/(?:today|courses|cheatsheets|calendar|mistakes|exams|world|settings|theory|topic|practice|study)(?:\/[a-z0-9-]+)?$/.test(
          url.hash,
        )
          ? url.hash
          : "";
      return `${url.origin}${url.pathname}${route}`;
    } catch {
      return "[redacted-url]";
    }
  };
  const limited = async <T>(
    work: Promise<T>,
    milliseconds: number,
    unavailable: string,
  ) => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      return await Promise.race([
        work,
        new Promise<{ unavailable: string }>((resolve) => {
          timer = setTimeout(() => resolve({ unavailable }), milliseconds);
        }),
      ]);
    } catch {
      return { unavailable };
    } finally {
      clearTimeout(timer);
    }
  };
  const nativeOpenLog = [
    ...((
      window as unknown as {
        __yksOfflineBootOpenLog?: Array<Record<string, unknown>>;
      }
    ).__yksOfflineBootOpenLog ?? []),
  ];
  const sanitizedHTML = (element: Element | null, limit: number) => {
    if (!element) return null;
    const clone = element.cloneNode(true) as Element;
    for (const node of [clone, ...clone.querySelectorAll("*")]) {
      for (const attribute of [...node.attributes]) {
        if (/^(?:href|src|action|formaction|poster)$/i.test(attribute.name))
          node.setAttribute(attribute.name, urlForEvidence(attribute.value));
        else if (
          /(?:srcset|integrity|nonce|token|secret|signature|authorization|cookie)/i.test(
            attribute.name,
          )
        )
          node.removeAttribute(attribute.name);
      }
    }
    const html = clone.outerHTML.replace(
      /https?:\/\/[^\s"'<>]+/g,
      urlForEvidence,
    );
    return {
      html: html.slice(0, limit),
      totalCharacters: html.length,
      truncated: html.length > limit,
    };
  };
  const root = document.getElementById("root");
  const dom = {
    url: urlForEvidence(location.href),
    readyState: document.readyState,
    documentTimeOrigin: performance.timeOrigin,
    performanceMs: performance.now(),
    unixMs: Date.now(),
    rootChildElements: root?.childElementCount ?? null,
    root: sanitizedHTML(root, 120000),
    body: sanitizedHTML(document.body, 16000),
    boot: {
      present: !!document.querySelector(".boot"),
      busy: document.querySelector(".boot")?.getAttribute("aria-busy") ?? null,
      appShell: !!document.querySelector(".app-shell"),
      feedback: !!document.querySelector(".feedback"),
      htmlAttributes: Object.fromEntries(
        ["lang", "data-theme", "data-font", "data-motion", "style"].map(
          (name) => [name, document.documentElement.getAttribute(name)],
        ),
      ),
    },
  };

  const readState = async () => {
    // Opening a nonexistent database could create it. Refuse that operation.
    if (typeof indexedDB.databases !== "function")
      return { unavailable: "database-list-unavailable" };
    const databases = await indexedDB.databases();
    if (!databases.some((database) => database.name === "yksmania"))
      return { exists: false };
    return new Promise<unknown>((resolve) => {
      let database: IDBDatabase | undefined;
      let expired = false;
      const finish = (result: unknown) => {
        if (expired) return;
        expired = true;
        clearTimeout(timer);
        database?.close();
        resolve(result);
      };
      const timer = setTimeout(
        () => finish({ unavailable: "database-read-deadline" }),
        1200,
      );
      const request = indexedDB.open("yksmania");
      request.addEventListener("upgradeneeded", () => {
        request.transaction?.abort();
        finish({ unavailable: "database-disappeared" });
      });
      request.addEventListener("error", () =>
        finish({ unavailable: "database-open-error" }),
      );
      request.addEventListener("blocked", () =>
        finish({ unavailable: "database-open-blocked" }),
      );
      request.addEventListener("success", () => {
        database = request.result;
        if (expired) {
          database.close();
          return;
        }
        if (!database.objectStoreNames.contains("state")) {
          finish({ exists: true, stateStore: false });
          return;
        }
        try {
          const transaction = database.transaction("state", "readonly");
          const get = transaction.objectStore("state").get("current");
          get.addEventListener("error", () =>
            finish({ unavailable: "state-read-error" }),
          );
          get.addEventListener("success", () => {
            const state = get.result;
            const draft = state?.draft;
            finish({
              exists: true,
              hasCurrent: state !== undefined,
              version: state?.version,
              draft: draft
                ? {
                    lessonId: draft.lessonId,
                    phase: draft.phase,
                    checked: draft.checked,
                    index: draft.index,
                    selected: draft.selected,
                    responses: Array.isArray(draft.responses)
                      ? draft.responses.map(
                          (response: Record<string, unknown>) => ({
                            questionId: response.questionId,
                            selected: response.selected,
                            correct: response.correct,
                            assisted: response.assisted,
                          }),
                        )
                      : null,
                  }
                : null,
            });
          });
        } catch {
          finish({ unavailable: "state-read-unavailable" });
        }
      });
    });
  };
  const readWorkers = async () => {
    if (!("serviceWorker" in navigator)) return { available: false };
    const worker = (value: ServiceWorker | null) =>
      value
        ? {
            scriptURL: urlForEvidence(value.scriptURL),
            state: value.state,
          }
        : null;
    return {
      controller: worker(navigator.serviceWorker.controller),
      registrations: (await navigator.serviceWorker.getRegistrations()).map(
        (registration) => ({
          scope: urlForEvidence(registration.scope),
          active: worker(registration.active),
          waiting: worker(registration.waiting),
          installing: worker(registration.installing),
        }),
      ),
    };
  };
  const readCaches = async () => {
    if (!("caches" in window)) return { available: false };
    const entry = document.querySelector<HTMLScriptElement>(
      'script[type="module"][src]',
    )?.src;
    const preloads = [
      ...document.querySelectorAll<HTMLLinkElement>(
        'link[rel="modulepreload"][href]',
      ),
    ]
      .slice(0, 2)
      .map((link) => link.href);
    const critical = [entry, ...preloads].filter(
      (url): url is string => !!url && urlForEvidence(url) !== "[redacted-url]",
    );
    const names = (await caches.keys()).filter((name) =>
      name.startsWith("workbox-precache-"),
    );
    const response = (value: Response | undefined) =>
      value
        ? {
            status: value.status,
            type: value.type,
            headers: selectedHeaders(value.headers),
          }
        : null;
    return {
      critical: await Promise.all(
        critical.map(async (url) => {
          const plain = new Request(url, {
            mode: "cors",
            credentials: "same-origin",
          });
          const withOrigin = new Request(url, {
            mode: "cors",
            credentials: "same-origin",
            headers: { Origin: location.origin },
          });
          return {
            url: urlForEvidence(url),
            request: {
              mode: plain.mode,
              credentials: plain.credentials,
              headers: selectedHeaders(plain.headers),
            },
            matches: {
              ignoreVaryFalse: response(
                await caches.match(plain, { ignoreVary: false }),
              ),
              ignoreVaryTrue: response(
                await caches.match(plain, { ignoreVary: true }),
              ),
            },
            constructedOriginRequest: {
              // The actual retained headers are recorded, not assumed. This is a
              // diagnostic Request, not the browser module loader's original one.
              headers: selectedHeaders(withOrigin.headers),
              ignoreVaryFalse: response(
                await caches.match(withOrigin, { ignoreVary: false }),
              ),
              ignoreVaryTrue: response(
                await caches.match(withOrigin, { ignoreVary: true }),
              ),
            },
            entries: (
              await Promise.all(
                names.map(async (name) => {
                  const cache = await caches.open(name);
                  return Promise.all(
                    (await cache.keys(url, { ignoreVary: true })).map(
                      async (request) => ({
                        cache: name.startsWith("workbox-precache-v2-")
                          ? "workbox-precache-v2-[app-scope]"
                          : "workbox-precache-[app-scope]",
                        url: urlForEvidence(request.url),
                        mode: request.mode,
                        credentials: request.credentials,
                        requestHeaders: selectedHeaders(request.headers),
                        response: response(
                          await cache.match(request, { ignoreVary: false }),
                        ),
                      }),
                    ),
                  );
                }),
              )
            ).flat(),
          };
        }),
      ),
    };
  };
  const [state, serviceWorker, cache] = await Promise.all([
    limited(readState(), 1800, "state-unavailable"),
    limited(readWorkers(), 1800, "service-worker-unavailable"),
    limited(readCaches(), 2200, "cache-unavailable"),
  ]);
  return {
    dom,
    nativeOpenLogBeforeDiagnosticReads: nativeOpenLog,
    state,
    serviceWorker,
    cache,
  };
}

/** Passive evidence only. Existing assertions, actions and test timeouts stay intact. */
export function registerOfflineBootDiagnostics() {
  const captures = new WeakMap<Page, Capture>();
  test.beforeEach(async ({ page, baseURL }) => {
    const capture: Capture = {
      events: [],
      dropped: 0,
      listeners: [],
      setupErrors: [],
    };
    captures.set(page, capture);
    const base = baseURL ?? "http://127.0.0.1/";
    const record = (type: string, detail: EventRecord) => {
      if (capture.events.length >= 6000) {
        capture.events.shift();
        capture.dropped++;
      }
      capture.events.push({ type, observedUnixMs: Date.now(), ...detail });
    };
    try {
      await page.addInitScript(installNativeOpenProbe);
    } catch {
      capture.setupErrors.push("native-open-probe-unavailable");
    }
    try {
      const session = await page.context().newCDPSession(page);
      capture.session = session;
      const on = (name: DiagnosticEvent, listener: (event: any) => void) => {
        capture.listeners.push([name, listener]);
        session.on(name, listener);
      };
      const requests = new Map<string, EventRecord>();
      on("Network.requestWillBeSent", (event) => {
        requests.set(event.requestId, {
          loaderId: event.loaderId,
          frameId: event.frameId,
          url: safeURL(event.request.url, base),
        });
        record("requestWillBeSent", {
          requestId: event.requestId,
          loaderId: event.loaderId,
          frameId: event.frameId,
          timestamp: event.timestamp,
          wallTime: event.wallTime,
          resourceType: event.type,
          documentURL: safeURL(event.documentURL, base),
          url: safeURL(event.request.url, base),
          method: event.request.method,
          headers: headers(event.request.headers),
          initiatorType: event.initiator?.type,
        });
      });
      on("Network.responseReceived", (event) =>
        record("responseReceived", {
          requestId: event.requestId,
          loaderId: event.loaderId,
          frameId: event.frameId,
          timestamp: event.timestamp,
          resourceType: event.type,
          url: safeURL(event.response.url, base),
          status: event.response.status,
          fromServiceWorker: event.response.fromServiceWorker,
          fromDiskCache: event.response.fromDiskCache,
          fromPrefetchCache: event.response.fromPrefetchCache,
          serviceWorkerResponseSource:
            event.response.serviceWorkerResponseSource,
          headers: headers(event.response.headers),
        }),
      );
      on("Network.loadingFinished", (event) => {
        record("loadingFinished", {
          ...requests.get(event.requestId),
          requestId: event.requestId,
          timestamp: event.timestamp,
          encodedDataLength: event.encodedDataLength,
        });
        requests.delete(event.requestId);
      });
      on("Network.loadingFailed", (event) => {
        record("loadingFailed", {
          ...requests.get(event.requestId),
          requestId: event.requestId,
          timestamp: event.timestamp,
          resourceType: event.type,
          errorText: /^net::[A-Z_]+$/.test(event.errorText)
            ? event.errorText
            : "[redacted-error]",
          canceled: event.canceled,
          blockedReason: event.blockedReason,
          corsError: event.corsErrorStatus?.corsError,
        });
        requests.delete(event.requestId);
      });
      on("Page.frameNavigated", (event) =>
        record("frameNavigated", {
          frameId: event.frame.id,
          parentId: event.frame.parentId,
          loaderId: event.frame.loaderId,
          url: safeURL(event.frame.url, base),
          navigationType: event.type,
        }),
      );
      on("Page.lifecycleEvent", (event) =>
        record("lifecycleEvent", {
          frameId: event.frameId,
          loaderId: event.loaderId,
          name: event.name,
          timestamp: event.timestamp,
        }),
      );
      await Promise.all([
        session.send("Network.enable"),
        session.send("Page.enable"),
        session.send("Page.setLifecycleEventsEnabled", { enabled: true }),
      ]);
    } catch {
      capture.setupErrors.push("cdp-unavailable");
    }
  });

  test.afterEach(async ({ page, baseURL }, testInfo) => {
    const capture = captures.get(page);
    if (!capture) return;
    try {
      if (
        ["failed", "timedOut", "interrupted"].includes(testInfo.status ?? "")
      ) {
        let snapshot: unknown = { unavailable: "page-closed" };
        if (!page.isClosed()) {
          try {
            snapshot = await bounded(
              page.evaluate(failureSnapshot, {
                baseURL: baseURL ?? "http://127.0.0.1/",
              }),
              4000,
            );
          } catch {
            snapshot = { unavailable: "snapshot-deadline-or-page-unavailable" };
          }
        }
        await testInfo.attach("offline-boot-diagnostics", {
          body: Buffer.from(
            JSON.stringify(
              {
                formatVersion: 1,
                evidenceOnly: true,
                status: testInfo.status,
                droppedEvents: capture.dropped,
                setupErrors: capture.setupErrors,
                events: capture.events,
                snapshot,
              },
              null,
              2,
            ),
          ),
          contentType: "application/json",
        });
      }
    } catch {
      // A diagnostic attachment must not replace the original test failure.
    } finally {
      if (capture.session) {
        for (const [name, listener] of capture.listeners)
          capture.session.removeListener(name, listener);
        await bounded(capture.session.detach(), 1000).catch(() => {});
      }
      captures.delete(page);
    }
  });
}
