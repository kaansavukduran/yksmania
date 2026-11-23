import { createRequire } from "node:module";
import { describe, expect, it } from "vitest";
import catalogue from "../src/learning/videoCatalog031.json";
import booklets from "../src/data/official-booklets.json";
import { pastExamReferences } from "../src/domain/pastExams";
const require = createRequire(import.meta.url);
const { isAllowedExternalUrl: allow } =
  require("../desktop/external-links.cjs") as {
    isAllowedExternalUrl(value: unknown): boolean;
  };
const positive = [
  "https://github.com/kaansavukduran/yksmania",
  "https://github.com/kaansavukduran/yksmania/releases",
  "https://github.com/kaansavukduran/yksmania/releases/download/v0.20.0-alpha.1/YKSMania-Setup.exe",
  "https://drive.google.com/file/d/syntheticPublicFileId0123456789/view?usp=sharing",
  "https://www.youtube.com/watch?v=BVcE9Y7ynfA",
  "https://youtube.com/watch?v=BVcE9Y7ynfA&list=PL_examples&index=2&t=53s&pp=iAQB&hl=tr",
  "https://youtu.be/BVcE9Y7ynfA?t=53s",
  "https://ogmmateryal.eba.gov.tr/panel/upload/etkilesimli/kitap/kazanim_kavrama/pdf/9/matematik.pdf",
  "https://ogmmateryal.eba.gov.tr/panel/upload/etkilesimli/kitap/defterim/9/matematik/files/basic-html/page245.html",
  "https://ogmmateryal.eba.gov.tr/panel/upload/etkilesimli/kitap/matematiktemelduzey/11/unite1/files/basic-html/page50.html",
  "https://dokuman.osym.gov.tr/pdfdokuman/2021/YKS/TSK/tyt_yks_2021.pdf#page=27",
  "https://dokuman.osym.gov.tr/web/2026/8/2025-ales2-temel-soru-kitapcigi-ve-cevap-anahtari-10-b22o51-02132535.pdf#page=3",
];
const negative = [
  "http://www.youtube.com/watch?v=BVcE9Y7ynfA",
  "javascript:alert(1)",
  "file:///etc/passwd",
  "data:text/html,hello",
  "https://unrelated.example/watch?v=BVcE9Y7ynfA",
  "https://www.youtube.com.evil.example/watch?v=BVcE9Y7ynfA",
  "https://www.youtube.com@evil.example/watch?v=BVcE9Y7ynfA",
  "https://user:password@www.youtube.com/watch?v=BVcE9Y7ynfA",
  "https://www.youtube.com:8443/watch?v=BVcE9Y7ynfA",
  "https://www.youtube.com/watch?v=short",
  "https://www.youtube.com/watch",
  "https://www.youtube.com/watch?v=BVcE9Y7ynfA&v=anotherID00",
  "https://www.youtube.com/redirect?url=https://evil.example",
  "https://www.youtube.com/watch?v=BVcE9Y7ynfA&redirect=https://evil.example",
  "https://youtu.be/BVcE9Y7ynfA/extra",
  "https://youtu.be/short",
  "https://youtu.be/BVcE9Y7ynfA?redirect=https://evil.example",
  "https://github.com/kaansavukduran/yksmania-evil",
  "https://github.com/kaansavukduran/yksmaniaOther/releases",
  "https://github.com/another/yksmania",
  "https://user:password@github.com/kaansavukduran/yksmania",
  "https://github.com:8443/kaansavukduran/yksmania",
  "https://drive.google.com/file/d/synthetic/view/extra",
  "https://drive.google.com/uc?id=synthetic",
  "https://drive.google.com.evil.example/file/d/synthetic/view",
  "https://ogmmateryal.eba.gov.tr/admin",
  "https://ogmmateryal.eba.gov.tr/panel/upload/etkilesimli/kitap/9/evil.exe",
  "https://ogmmateryal.eba.gov.tr/panel/upload/etkilesimli/kitap/9/matematik.pdf?redirect=https://evil.example",
  "https://ogmmateryal.eba.gov.tr/panel/upload/etkilesimli/kitap/9/matematik.pdf#page=abc",
  "https://dokuman.osym.gov.tr/redirect?url=https://evil.example",
  "https://dokuman.osym.gov.tr/pdfdokuman/2021/YKS/booklet.exe",
  "https://dokuman.osym.gov.tr/pdfdokuman/2021/YKS/booklet.pdf/more",
  "https://dokuman.osym.gov.tr/pdfdokuman/2013/OSYS/24.03.2013%2FYGS.pdf",
  "https://dokuman.osym.gov.tr/pdfdokuman/2013/OSYS/24.03.2013%20YGS.pdf#page=0",
  "https://dokuman.osym.gov.tr.evil.example/pdfdokuman/2021/YKS/booklet.pdf",
  "https://user:password@dokuman.osym.gov.tr/pdfdokuman/2021/YKS/booklet.pdf",
  "https://dokuman.osym.gov.tr:444/pdfdokuman/2021/YKS/booklet.pdf",
  "https://osym.gov.tr/SinavGrubu/Index/2",
  " https://www.youtube.com/watch?v=BVcE9Y7ynfA",
  "https://www.youtube.com/watch?v=BVcE9Y7ynfA\n",
  null,
  undefined,
  42,
];

describe("desktop public learning-link policy", () => {
  it.each(positive)("hands approved source %s to the system browser", (url) => {
    expect(allow(url)).toBe(true);
  });
  it.each(negative)("keeps unsupported URL %s inside the deny path", (url) => {
    expect(allow(url)).toBe(false);
  });
  it("supports every actual built-in video URL, including playlist and time parameters", () => {
    const urls: string[] = [];
    const collect = (value: unknown): void => {
      if (Array.isArray(value)) value.forEach(collect);
      else if (value && typeof value === "object")
        for (const [key, item] of Object.entries(value))
          if (key === "url" && typeof item === "string") urls.push(item);
          else collect(item);
    };
    collect(catalogue);
    expect(urls.length).toBeGreaterThan(0);
    for (const url of urls) expect(allow(url), url).toBe(true);
  });
  it("supports every actual official PDF source and its question/answer page links", () => {
    expect(booklets.length).toBeGreaterThan(0);
    for (const booklet of booklets) {
      expect(allow(booklet.url), booklet.id).toBe(true);
      expect(allow(`${booklet.url}#page=1`), booklet.id).toBe(true);
    }
    for (const reference of pastExamReferences) {
      const booklet = booklets.find(({ id }) => id === reference.bookletId)!;
      const answerFile = reference.answerSource?.url ?? booklet.url;
      expect(allow(`${booklet.url}#page=${reference.page}`), reference.id).toBe(true);
      expect(allow(`${answerFile}#page=${reference.answerPage}`), reference.id).toBe(true);
    }
  });
});
