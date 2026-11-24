import { expect, test, vi } from "vitest";
import { followOfflineWorker } from "../src/workerControl";

const scope = "https://example.test/yksmania/";

function makeWorker(scriptURL: string, state: ServiceWorkerState) {
  return Object.assign(new EventTarget(), { scriptURL, state, postMessage: vi.fn() });
}

test("an active registration can reclaim the open app page and report it once activated", async () => {
  const worker = makeWorker(scope + "sw.js", "activating");
  const container = Object.assign(new EventTarget(), {
    controller: null as typeof worker | null,
    ready: Promise.resolve({ scope, active: worker }),
  });
  const knownStates = vi.fn();
  const stop = followOfflineWorker(container as unknown as ServiceWorkerContainer, scope, knownStates);
  expect(knownStates).toHaveBeenLastCalledWith(false);
  await container.ready;
  expect(worker.postMessage).toHaveBeenCalledExactlyOnceWith({ type: "CLAIM_CLIENTS" });
  container.controller = worker;
  container.dispatchEvent(new Event("controllerchange"));
  expect(knownStates).toHaveBeenLastCalledWith(false);
  worker.state = "activated";
  worker.dispatchEvent(new Event("statechange"));
  expect(knownStates).toHaveBeenLastCalledWith(true);
  stop();
  knownStates.mockClear();
  container.dispatchEvent(new Event("controllerchange"));
  worker.dispatchEvent(new Event("statechange"));
  expect(knownStates).not.toHaveBeenCalled();
});

test("a different registration does not qualify, and unmount cancels a queued claim", async () => {
  const otherScope = "https://example.test/";
  const other = makeWorker(otherScope + "sw.js", "activated");
  const container = Object.assign(new EventTarget(), {
    controller: null,
    ready: Promise.resolve({ scope: otherScope, active: other }),
  });
  const stop = followOfflineWorker(container as unknown as ServiceWorkerContainer, scope, vi.fn());
  await container.ready;
  expect(other.postMessage).not.toHaveBeenCalled();
  stop();

  const worker = makeWorker(scope + "sw.js", "activated");
  const pending = Object.assign(new EventTarget(), {
    controller: null,
    ready: Promise.resolve({ scope, active: worker }),
  });
  followOfflineWorker(pending as unknown as ServiceWorkerContainer, scope, vi.fn())();
  await pending.ready;
  expect(worker.postMessage).not.toHaveBeenCalled();
});
