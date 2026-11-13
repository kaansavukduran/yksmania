import { useApp } from "../store";
type Values = Record<string, string | number | boolean>;
type Widen<T> = {
  [K in keyof T]: T[K] extends boolean
    ? boolean
    : T[K] extends number
      ? number
      : string;
};
// Exploration choices are saved separately from scored learning evidence.
export function useExploration<T extends Values>(id: string, defaults: T) {
  const { state, update } = useApp();
  const saved = state.explorations[id] ?? {};
  const values = Object.fromEntries(
    Object.entries(defaults).map(([k, v]) => [
      k,
      typeof saved[k] === typeof v ? saved[k] : v,
    ]),
  ) as Widen<T>;
  const set = (changes: Partial<Widen<T>>) => {
    void update((s) => ({
      ...s,
      explorations: {
        ...s.explorations,
        [id]: { ...defaults, ...s.explorations[id], ...changes } as Values,
      },
    })).catch(() => {});
  };
  return [values, set] as const;
}
