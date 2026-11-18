import { afterEach, describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { SourceQuestionFigure } from "../src/learning/SourceQuestionFigure";

const figure = (src: string) =>
  renderToStaticMarkup(
    <SourceQuestionFigure
      figure={{
        kind: "image",
        title: "Kaynak soru",
        alt: "İfade ve seçenekler",
        src,
        width: 618,
        height: 254,
      }}
    />,
  );
afterEach(() => vi.unstubAllGlobals());
describe("source figure local assets", () => {
  it("renders Vite's resolved same-host web, prefix, Capacitor and desktop asset URLs", () => {
    for (const base of [
      "http://127.0.0.1:4338/index.html",
      "https://example.test/yksmania/index.html",
      "https://localhost/index.html",
      "yksmania://app/index.html",
    ]) {
      const location = new URL(base);
      vi.stubGlobal("location", location);
      const image = new URL("assets/source.png", location.href).href;
      expect(figure(image), base).toContain('class="source-figure-open"');
      expect(figure(image), base).toContain(`src="${image}"`);
    }
  });
  it("does not replace local source assets with external, credential or different-protocol URLs", () => {
    vi.stubGlobal("location", new URL("https://example.test/index.html"));
    for (const src of [
      "https://other.test/source.png",
      "//other.test/source.png",
      "http://example.test/source.png",
      "https://user:pass@example.test/source.png",
      "javascript:alert(1)",
      "file:///source.png",
      "",
    ]) {
      expect(figure(src), src).not.toContain("<img");
      expect(figure(src), src).toContain("İfade ve seçenekler");
    }
  });
});
