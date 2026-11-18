import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

const saved = vi.hoisted(() => ({ ab: 6, ac: 8, step: 0 }));
vi.mock("../src/learning/useExploration", () => ({
  useExploration: () => [saved, () => {}],
}));
import GeometryFoundation031Lab from "../src/learning/GeometryFoundation031Lab";

type Point = { x: number; y: number };
const distance = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);
const area = (points: Point[]) =>
  Math.abs(
    points.reduce((sum, p, i) => {
      const q = points[(i + 1) % points.length];
      return sum + p.x * q.y - p.y * q.x;
    }, 0),
  ) / 2;

function render(ab: number, ac: number, step: number) {
  Object.assign(saved, { ab, ac, step });
  const html = renderToStaticMarkup(
    createElement(GeometryFoundation031Lab, { id: "tyt-geo-dik-ucgen-031" }),
  );
  const polygons = [
    ...html.matchAll(/<polygon points="([^"]+)" class="([^"]+)"/g),
  ].map(([, points, className]) => ({
    className,
    points: points.split(" ").map((pair) => {
      const [x, y] = pair.split(",").map(Number);
      return { x, y };
    }),
  }));
  return { html, polygons };
}

describe("dik üçgenin görünür adımlarının çerçevesi", () => {
  it("ilk üçgeni ileride gösterilecek kareler için küçültmez", () => {
    const { html, polygons } = render(6, 8, 0);
    const [A, B, C] = polygons[0].points;
    // Before: AB=98.57 and AC=131.43 in this same 640×530 camera.
    // Both dimensions must grow; a CSS crop or changed viewBox cannot pass.
    expect(html).toContain('viewBox="0 0 640 530"');
    expect(distance(A, B)).toBeCloseTo(255, 10);
    expect(distance(A, C)).toBeCloseTo(340, 10);
    expect(polygons).toHaveLength(1);
    expect(html).not.toContain(">H</text>");
  });

  it("izin verilen 121 üçgende dört adımın tamamını tek doğru ölçekle sığdırır", () => {
    for (let ab = 2; ab <= 12; ab++) {
      for (let ac = 2; ac <= 12; ac++) {
        for (let step = 0; step <= 3; step++) {
          const { html, polygons } = render(ab, ac, step);
          expect(polygons).toHaveLength(step === 1 ? 3 : step === 2 ? 4 : 1);
          const all = polygons.flatMap((polygon) => polygon.points);
          const xs = all.map((p) => p.x),
            ys = all.map((p) => p.y);
          const width = Math.max(...xs) - Math.min(...xs);
          const height = Math.max(...ys) - Math.min(...ys);
          expect(Math.min(...xs)).toBeGreaterThanOrEqual(100 - 1e-9);
          expect(Math.max(...xs)).toBeLessThanOrEqual(540 + 1e-9);
          expect(Math.min(...ys)).toBeGreaterThanOrEqual(95 - 1e-9);
          expect(Math.max(...ys)).toBeLessThanOrEqual(435 + 1e-9);
          // A visible dimension fills the available frame, even at 2:12.
          expect(Math.max(width / 440, height / 340)).toBeCloseTo(1, 10);
          const [A, B, C] = polygons.find(
            (p) => p.className === "g031-triangle",
          )!.points;
          expect(distance(A, B) / distance(A, C)).toBeCloseTo(ab / ac, 10);
          expect(
            (B.x - A.x) * (C.x - A.x) + (B.y - A.y) * (C.y - A.y),
          ).toBeCloseTo(0, 8);
          const squares = polygons.filter((p) =>
            p.className.includes("g031-square"),
          );
          if (step === 2) {
            expect(
              area(squares[0].points) + area(squares[1].points),
            ).toBeCloseTo(area(squares[2].points), 7);
          }
          expect(html).toContain(`AB ${ab}, AC ${ac}, BC`);
          expect(html).not.toMatch(/NaN|Infinity/);
        }
      }
    }
  });
});
