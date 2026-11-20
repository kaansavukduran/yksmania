import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { QuestionHelp } from "../src/components/QuestionHelp";
import type { HelpQuestion } from "../src/domain/questionHelpModel";

// Özgün deneme kartı (resmî sınav sorusu değildir).
const question: HelpQuestion = {
  id: "faz1-adim-ornek",
  prompt: "Bir sayının 3 katının 5 fazlası 20 ise sayı kaçtır?",
  options: ["3", "4", "5", "6", "7"],
  answer: 2,
  explanation: "3x + 5 = 20 → 3x = 15 → x = 5.",
  guidance: {
    knowledge: ["Bir sayının 3 katı 3x, 5 fazlası + 5 demektir."],
    strategy: "Cümleyi denkleme çevir. Sonra ters işlemle x'i yalnız bırak.",
    steps: ["3x + 5 = 20 yaz.", "İki taraftan 5 çıkar: 3x = 15.", "3'e böl: x = 5."],
    optionReasons: ["15'i 5'e böler.", "20'yi 5'e böler.", "Doğru.", "5'i çıkarmayı unutur.", "Fazlayı katsayı sanır."],
    commonError: "Önce 3'e bölüp 5'i sonra çıkarmak.",
    check: "3·5 + 5 = 20 olduğunu doğrula. Tutuyor.",
  },
};
const html = (props: Partial<Parameters<typeof QuestionHelp>[0]>) =>
  renderToStaticMarkup(createElement(QuestionHelp, { question, level: 0, onLevel: () => {}, ...props }));

describe("053 ipucu ve adım adım çözüm", () => {
  it("offers a separate step-by-step entry only when the caller holds step state", () => {
    expect(html({})).not.toContain("Adım adım çözüm");
    expect(html({ onSteps: () => {} })).toContain("Adım adım çözüm");
    expect(html({ onSteps: () => {} })).toContain("İpucu al");
  });
  it("numbers each opened step and offers next and open-all actions", () => {
    const out = html({ level: 2, steps: true, onSteps: () => {} });
    expect(out).toContain("Adım 1 / 6 · soru ne istiyor, temel kavramlar");
    expect(out).toContain("Adım 2 / 6 · verilenler ve yöntem seçimi");
    expect(out).not.toContain("Adım 3 / 6");
    expect(out).toContain("Sonraki adım");
    expect(out).toContain("Tüm adımları aç");
    expect(out).toContain("Önceki adım");
    expect(out).not.toContain("Tam çözüm</h3>");
    expect(out).toContain("bağımsız doğru olarak sayılmaz");
  });
  it("ends with the distractor autopsy, the one-minute topic rule, a 30-second shortcut and a close-and-retry action", () => {
    const out = html({
      level: 6,
      steps: true,
      onSteps: () => {},
      onHidden: () => {},
      similar: { kind: "ready", label: "Soru 2 / 5 (aynı ders seti)", onTry: () => {} },
    });
    expect(out).toContain("Tam çözüm");
    expect(out).toContain("Çeldirici otopsisi");
    expect(out).toContain("30 saniyelik sınav kısayolu");
    expect(out).toContain("Cümleyi denkleme çevir. Son kontrol: 3·5 + 5 = 20 olduğunu doğrula.");
    expect(out).toContain("Bu sorudan cebine kalan 1 dakikalık konu kuralı");
    expect(out).toContain("Bir sayının 3 katı 3x, 5 fazlası + 5 demektir.</li>");
    expect(out).toContain('<span class="help-autopsy-option">5</span><span>Doğru.</span>');
    expect(out).toContain('<li class="is-key">');
    expect(out).toContain("Final · çeldirici otopsisi ve konu özeti");
    expect(out).toContain("Çözümü kapat, benzerini bağımsız dene");
    expect(out).not.toContain("Sonraki adım");
  });
  it("stepping back only hides steps; the recorded level stays", () => {
    const onLevel = vi.fn();
    const out = html({ level: 4, shown: 2, steps: true, onSteps: () => {}, onShown: () => {}, onLevel });
    expect(out).toContain("Adım 2 / 6");
    expect(out).not.toContain("Adım 3 / 6");
    expect(onLevel).not.toHaveBeenCalled();
  });
  it("draws a step rail: opened steps are buttons, later ones are locked, the final is marked F", () => {
    const out = html({ level: 3, shown: 2, steps: true, onSteps: () => {}, onShown: () => {} });
    expect(out).toContain('aria-label="Çözüm adımları"');
    expect(out).toContain('aria-current="step" aria-label="Adım 2"');
    expect(out).toContain('disabled="" aria-label="Adım 4 (henüz açılmadı)"');
    expect(out).toContain('aria-label="Final (henüz açılmadı)"');
  });
  it("offers replay only after every step is open", () => {
    expect(html({ level: 3, steps: true, onSteps: () => {}, onPlay: () => {} })).not.toContain("Baştan oynat");
    expect(html({ level: 6, steps: true, onSteps: () => {}, onPlay: () => {} })).toContain("Baştan oynat");
    expect(html({ level: 6, steps: true, playing: true, onSteps: () => {}, onPlay: () => {} })).toContain("Duraklat");
  });
  it("closing the solution hides it without undoing the recorded help", () => {
    const out = html({ level: 6, steps: true, hidden: true, onSteps: () => {}, onHidden: () => {} });
    expect(out).toContain("yardımlı kaydedildi");
    expect(out).not.toContain("Tam çözüm");
  });
  it("open-all asks for the full-solution level in one step", () => {
    const onLevel = vi.fn();
    const tree = QuestionHelp({ question, level: 1, onLevel, steps: true, onSteps: () => {} });
    const find = (node: unknown): { props: { onClick: () => void; children: unknown } } | undefined => {
      if (!node || typeof node !== "object") return undefined;
      if (Array.isArray(node)) return node.map(find).find(Boolean);
      const el = node as { type?: unknown; props?: { children?: unknown; onClick?: () => void } };
      if (el.type === "button" && el.props?.children === "Tüm adımları aç") return el as never;
      return find(el.props?.children);
    };
    find(tree)!.props.onClick();
    expect(onLevel).toHaveBeenCalledWith(6);
  });

  it("keeps the hint and the step-by-step solution apart: the hint never shows steps or the key", () => {
    const hint = html({ level: 1, onSteps: () => {} });
    expect(hint).toContain('aria-label="İpucu"');
    expect(hint).toContain("Bir sayının 3 katı 3x");
    expect(hint).not.toContain("Cümleyi denkleme çevir");
    expect(hint).not.toContain("3x + 5 = 20 yaz.");
    expect(hint).not.toContain("Doğru yanıt");
    expect(hint).not.toContain("Adım 1 /");
    expect(hint).toContain('aria-expanded="false"');
    // No second hint button walks into the solution.
    expect(hint).not.toContain("Çözüm yolu aç");
    expect(hint).not.toContain("Tam çözümü aç");
  });
  it("opening the step panel records help: from zero it opens step 1, after the hint step 2", () => {
    const open = (level: number) => {
      const onLevel = vi.fn();
      const onSteps = vi.fn();
      const tree = QuestionHelp({ question, level, onLevel, onSteps });
      findButton(tree, "Adım adım çözüm")!.props.onClick();
      return { onLevel, onSteps };
    };
    const first = open(0);
    expect(first.onSteps).toHaveBeenCalledWith(true);
    expect(first.onLevel).toHaveBeenCalledWith(1);
    expect(open(1).onLevel).toHaveBeenCalledWith(2);
    expect(open(4).onLevel).not.toHaveBeenCalled();
  });
  it("collapsing the step panel only hides it", () => {
    const onLevel = vi.fn();
    const onSteps = vi.fn();
    const tree = QuestionHelp({ question, level: 3, steps: true, onLevel, onSteps });
    findButton(tree, "Adım adım çözüm")!.props.onClick();
    expect(onSteps).toHaveBeenCalledWith(false);
    expect(onLevel).not.toHaveBeenCalled();
  });
  it("step 2 marks what is given and what is asked from the card's own stem", () => {
    const out = html({ level: 2, steps: true, onSteps: () => {} });
    expect(out).toContain('aria-label="Verilenler ve istenen"');
    expect(out).toContain('<div class="help-given"><span class="help-tag">Verilen</span><span>Bir sayının <mark>3</mark> katının <mark>5</mark> fazlası <mark>20</mark> ise</span></div>');
    expect(out).toContain('<div class="help-asked"><span class="help-tag">İstenen</span><span>sayı kaçtır?</span></div>');
    expect(out).toContain('aria-live="polite"');
    expect(out).toContain("Adım 2 / 6: Çözüm yolu");
  });
  it("a card without a guide says the steps are not ready and shows its existing explanation", () => {
    const legacy: HelpQuestion = { ...question, id: "faz1-adim-eski", guidance: undefined, hint: "Denklemi kur." };
    const closed = html({ question: legacy, level: 1, onSteps: () => {} });
    expect(closed).toContain("Denklemi kur.");
    expect(closed).toContain("Adım adım çözüm");
    const onLevel = vi.fn();
    findButton(QuestionHelp({ question: legacy, level: 1, onLevel, onSteps: () => {} }), "Adım adım çözüm")!.props.onClick();
    expect(onLevel).toHaveBeenCalledWith(2);
    const open = html({ question: legacy, level: 2, steps: true, onSteps: () => {}, onHidden: () => {} });
    expect(open).toContain("Bu soruda adım adım çözüm henüz hazır değil");
    expect(open).toContain("Doğru yanıt: C");
    expect(open).toContain("3x + 5 = 20 → 3x = 15 → x = 5.");
    expect(open).not.toContain("help-rail");
  });
  it("close-and-retry is honest about what it can open", () => {
    const onHidden = vi.fn();
    const onTry = vi.fn();
    const ready = QuestionHelp({ question, level: 6, steps: true, onLevel: () => {}, onSteps: () => {}, onHidden, similar: { kind: "ready", label: "Soru 2 / 5", onTry } });
    findButton(ready, "Çözümü kapat, benzerini bağımsız dene")!.props.onClick();
    expect(onHidden).toHaveBeenCalledWith(true);
    expect(onTry).toHaveBeenCalledTimes(1);
    const none = html({ level: 6, steps: true, onSteps: () => {}, onHidden: () => {}, similar: { kind: "none", reason: "Bu ders setinde görülmemiş soru kalmadı." } });
    expect(none).not.toContain("benzerini bağımsız dene");
    expect(none).toContain(">Çözümü kapat</button>");
    expect(none).toContain("Bu ders setinde görülmemiş soru kalmadı.");
    const first = html({ level: 6, steps: true, hidden: true, onSteps: () => {}, onHidden: () => {}, similar: { kind: "answer-first", label: "Soru 2 / 5" } });
    expect(first).toContain("Önce bu soruyu kendi yanıtınla kontrol et");
    expect(first).not.toContain("Benzer soruyu yardımsız aç");
    const after = html({ level: 6, steps: true, hidden: true, onSteps: () => {}, onHidden: () => {}, similar: { kind: "ready", label: "Soru 2 / 5", onTry } });
    expect(after).toContain("Benzer soruyu yardımsız aç");
    const exam = html({ level: 6, steps: true, onSteps: () => {}, onHidden: () => {} });
    expect(exam).toContain(">Çözümü kapat</button>");
    expect(exam).not.toContain("benzerini");
  });
});

type Node = { type?: unknown; props?: { children?: unknown; onClick?: () => void } };
function text(node: unknown): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(text).join("");
  return text((node as Node).props?.children);
}
function findButton(node: unknown, label: string): { props: { onClick: () => void } } | undefined {
  if (!node || typeof node !== "object") return undefined;
  if (Array.isArray(node)) return node.map((n) => findButton(n, label)).find(Boolean);
  const el = node as Node;
  if (el.type === "button" && text(el.props?.children).trim() === label) return el as never;
  return findButton(el.props?.children, label);
}
