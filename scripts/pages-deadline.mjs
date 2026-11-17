/** Test harness only: a deadline rejects, and never converts missing evidence to PASS. */
export async function withinDeadline(label, milliseconds, operation) {
  let timer;
  try {
    return await Promise.race([
      Promise.resolve().then(operation),
      new Promise((_, reject) => {
        timer = setTimeout(
          () =>
            reject(new Error(`PAGES_DEADLINE: ${label} (${milliseconds} ms)`)),
          milliseconds,
        );
      }),
    ]);
  } finally {
    clearTimeout(timer);
  }
}
