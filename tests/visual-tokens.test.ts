import { readFileSync, readdirSync } from "node:fs";
import { expect, it } from "vitest";
const root = new URL("../src/", import.meta.url);
const learning = new URL("learning/", root);
const read = (u: URL) => readFileSync(u, "utf8");
it("defines every theme token used by the new diagrams so chromosomes and markers remain visible", () => {
  const css = [
    read(new URL("style.css", root)),
    ...readdirSync(learning)
      .filter((f) => f.endsWith(".css"))
      .map((f) => read(new URL(f, learning))),
  ].join("\n");
  const defined = new Set(
    [...css.matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1]),
  );
  const files = readdirSync(learning).filter((f) =>
    /^(?:Forge011.*\.tsx|forge011.*\.css)$/.test(f),
  );
  for (const file of files) {
    const refs = [
      ...read(new URL(file, learning)).matchAll(/var\((--[\w-]+)\)/g),
    ].map((m) => m[1]);
    expect(
      refs.filter((v) => !defined.has(v)),
      file,
    ).toEqual([]);
  }
});
