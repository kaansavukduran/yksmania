export function followOfflineWorker(
  workers: ServiceWorkerContainer,
  scope: string,
  onControlled: (controlled: boolean) => void,
): () => void {
  const scriptURL = new URL("sw.js", scope).href;
  let followed: ServiceWorker | null = null;
  let mounted = true;
  const report = () => onControlled(followed?.scriptURL === scriptURL && followed.state === "activated");
  const follow = () => {
    followed?.removeEventListener("statechange", report);
    followed = workers.controller;
    followed?.addEventListener("statechange", report);
    report();
  };

  workers.addEventListener("controllerchange", follow);
  follow();
  void workers.ready.then(({ scope: registeredScope, active }) => {
    if (mounted && !workers.controller && registeredScope === scope && active?.scriptURL === scriptURL) {
      // The first activation claim can miss a document reloading during install.
      active.postMessage({ type: "CLAIM_CLIENTS" });
    }
  });

  return () => {
    mounted = false;
    workers.removeEventListener("controllerchange", follow);
    followed?.removeEventListener("statechange", report);
  };
}
