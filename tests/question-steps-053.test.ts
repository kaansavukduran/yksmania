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
    expect(out).toContain("Adım 1 / 6 · terimler");
    expect(out).toContain("Adım 2 / 6 · veri ve yöntem");
    expect(out).not.toContain("Adım 3 / 6");
    expect(out).toContain("Sonraki adım");
    expect(out).toContain("Tüm adımları aç");
    expect(out).not.toContain("Tam çözüm</h3>");
    expect(out).toContain("bağımsız doğru olarak sayılmaz");
  });
  it("ends with the distractor autopsy, a 30-second route, the 1-minute rule and a close-and-retry action", () => {
    const out = html({ level: 6, steps: true, onSteps: () => {}, onHidden: () => {} });
    expect(out).toContain("Tam çözüm");
    expect(out).toContain("Çeldirici otopsisi");
    expect(out).toContain("30 saniyelik rota");
    expect(out).toContain("Cümleyi denkleme çevir. Son kontrol: 3·5 + 5 = 20 olduğunu doğrula.");
    expect(out).toContain("1 dakika kuralı");
    expect(out).toContain("Çözümü kapat, benzerini bağımsız dene");
    expect(out).not.toContain("Sonraki adım");
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
});
