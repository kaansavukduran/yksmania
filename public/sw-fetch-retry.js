/*
 * Loaded by the service worker before Workbox. While the offline app is
 * precached (hundreds of files at once), a busy static host may answer some
 * requests with a temporary error and abort installation. This wrapper caps
 * concurrent fetches and retries temporary server errors with a short
 * backoff. Successful and permanent responses pass through unchanged.
 */
(() => {
  const nativeFetch = self.fetch.bind(self);
  const MAX_ACTIVE = 8;
  const ATTEMPTS = 4;
  let active = 0;
  const queue = [];
  const pump = () => {
    while (active < MAX_ACTIVE && queue.length) {
      const job = queue.shift();
      active++;
      job().finally(() => {
        active--;
        pump();
      });
    }
  };
  const limited = (task) =>
    new Promise((resolve, reject) => {
      queue.push(() => task().then(resolve, reject));
      pump();
    });
  const temporary = (status) => status === 429 || status === 500 || status === 502 || status === 503 || status === 504;
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  self.fetch = (input, init) =>
    limited(async () => {
      for (let attempt = 0; ; attempt++) {
        if (attempt) await wait(400 * 2 ** (attempt - 1));
        const last = attempt === ATTEMPTS - 1;
        try {
          const request = input instanceof Request ? input.clone() : input;
          const response = await nativeFetch(request, init);
          if (!temporary(response.status) || last) return response;
        } catch (error) {
          if (last) throw error;
        }
      }
    });
})();
