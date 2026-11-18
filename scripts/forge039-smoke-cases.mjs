import { expect } from "@playwright/test";

const panel = (lab) => lab.locator(".f039-panel:visible");
const modes = {
  anatomy: "Çarpan ve işaret", laws: "Aynı taban", same: "Aynı üs",
  factor: "Ortak çarpan", prime: "Verilen kuvvet", equation: "Denklem",
  compare: "Karşılaştırma", scientific: "Bilimsel ölçek",
  rational: "Kesirli üs", growth: "Adım ve süreç",
};
async function choice(root, group, name) {
  const button = root.getByRole("group", { name: group, exact: true })
    .getByRole("button", { name, exact: true });
  await button.click();
  await expect(button).toHaveAttribute("aria-pressed", "true");
}
const facts = (lab, name) => panel(lab).locator(".f039-facts > div").filter({
  has: lab.page().locator("dt", { hasText: name }),
}).locator("dd");
async function range(lab, name, target) {
  const input = panel(lab).getByRole("slider", { name, exact: true });
  const low = Number(await input.getAttribute("min"));
  const high = Number(await input.getAttribute("max"));
  await input.focus();
  if (target - low <= high - target) {
    await input.press("Home");
    for (let i = low; i < target; i++) await input.press("ArrowRight");
  } else {
    await input.press("End");
    for (let i = high; i > target; i--) await input.press("ArrowLeft");
  }
  await expect(input).toHaveValue(String(target));
}

export const forge039SmokeCases = [{
  id: "tyt-mat-uslu-sayilar-kaynak-039",
  title: "Üslü sayılar: çarpan, koşul ve ölçeğin mantığı",
  selector: ".f039-lab",
  storedKey: "powers-source-039",
  note: "Üste geçmeden taban, parantez ve tanım alanını; sonunda özgün koşulu denetlerim. ÇĞİÖŞÜ.",
  persisted: { "PowersSource039Lab.mode": "growth", "Growth.q": "0", "Growth.steps": 0 },
  async act(lab, onMode = async () => {}) {
    const choose = async (name) => {
      await choice(lab, "Keşif modeli", modes[name]);
    };
    await choose("anatomy");
    await expect(facts(lab,"Sonuç")).toHaveText("16");
    await panel(lab).getByText("Kuvvetin dışına eksi ekle",{exact:true}).click();
    await expect(facts(lab,"Sonuç")).toHaveText("−16");
    await range(lab,"Taban",0); await range(lab,"Tam sayı üs",0);
    await expect(facts(lab,"Sonuç")).toContainText("tanımlı değildir");
    await onMode("anatomy");

    await choose("laws");
    await expect(facts(lab,"a^m + a^n")).toHaveText("24");
    await expect(facts(lab,"a^m · a^n")).toContainText("128;");
    await range(lab,"Ortak taban a",0); await range(lab,"İlk üs m",0);
    await expect(facts(lab,"a^m · a^n")).toContainText("uygulanamaz");
    await onMode("laws");

    await choose("same");
    await expect(facts(lab,"a^n · b^n")).toHaveText("1000");
    await range(lab,"İkinci taban b",0); await range(lab,"Ortak tam sayı üs",-1);
    await expect(facts(lab,"a^n · b^n")).toContainText("tanımlı");
    await onMode("same");

    await choose("factor");
    await expect(facts(lab,"Doğrudan toplam")).toHaveText("75");
    await range(lab,"İlk katsayı c",-4); await range(lab,"İkinci katsayı d",0);
    await expect(facts(lab,"Doğrudan toplam")).toHaveText("−100");
    await onMode("factor");

    await choose("prime");
    await expect(facts(lab,"Doğrudan tabanın k kuvveti")).toHaveText("9/50");
    await range(lab,"Ortak üs k",2);
    await expect(facts(lab,"Doğrudan tabanın k kuvveti")).toHaveText("81/2500");
    await onMode("prime");

    await choose("equation");
    await expect(facts(lab,"Tek çözüm")).toHaveText("x=7");
    await choice(panel(lab), "Ortak taban", "1");
    await expect(facts(lab,"Çözüm durumu")).toHaveText("Bütün gerçek sayılar");
    await expect(panel(lab).locator("svg")).toHaveCount(0);
    await choice(panel(lab), "Ortak taban", "1/2");
    await expect(facts(lab,"Tek çözüm")).toHaveText("x=7");
    await onMode("equation");

    await choose("compare");
    await expect(facts(lab,"Tam karşılaştırma")).toHaveText("1/16 > 1/128");
    await expect(panel(lab).locator("svg rect").first()).toHaveAttribute("width","250");
    await choice(panel(lab), "İlk taban", "−2");
    await expect(facts(lab,"Tam karşılaştırma")).toHaveText("16 > −128");
    await onMode("compare");

    await choose("scientific");
    await expect(facts(lab,"Tam sonuç")).toHaveText("810000000");
    await expect(panel(lab).locator("figcaption")).toContainText("8.9085");
    const coefficient=panel(lab).getByRole("slider",{name:"İlk katsayı",exact:true});
    await expect(coefficient).toHaveAttribute("aria-valuetext","8,1");
    await coefficient.focus(); await coefficient.press("Home");
    await expect(facts(lab,"Tam sonuç")).toHaveText("−990000000");
    await expect(panel(lab).locator("svg circle")).toHaveCount(0);
    await coefficient.press("End"); await range(lab,"İlk 10 kuvveti",9);
    await choice(panel(lab), "İşlem", "İki sayıyı çarp");
    await range(lab,"İkinci katsayı",99); await range(lab,"İkinci 10 kuvveti",9);
    await expect(facts(lab,"Tam sonuç")).toHaveText("98010000000000000000");
    await expect(panel(lab).locator("figcaption")).toContainText("aralığın dışında");
    await expect(panel(lab).locator("svg circle")).toHaveAttribute("cx","596");
    await choice(panel(lab), "İşlem", "İki sayıyı topla");
    await range(lab,"İkinci katsayı",-99);
    await expect(facts(lab,"Tam sonuç")).toHaveText("0");
    await expect(panel(lab).locator("svg circle")).toHaveCount(0);
    await onMode("scientific");

    await choose("rational");
    await expect(facts(lab,"Tek rasyonel kuvvet")).toContainText("−2");
    await range(lab,"Rasyonel üs payı",2); await range(lab,"Rasyonel üs paydası",6);
    await expect(facts(lab,"En sade üs")).toHaveText("1/3");
    await expect(facts(lab,"Tek rasyonel kuvvet")).toContainText("−2");
    await panel(lab).getByRole("button",{name:"Negatif taban karşı örneğini kur",exact:true}).click();
    await expect(facts(lab,"Sonra dış rasyonel kuvvet")).toHaveText("1");
    await expect(facts(lab,"Üsleri doğrudan çarpmak")).toHaveText("−1");
    await expect(facts(lab,"İki yolun durumu")).toContainText("Farklı");
    await expect(panel(lab).locator("svg .f039-negative")).toHaveCount(2);
    await expect(panel(lab).locator("svg text")).toHaveText(["-1","1","1","−1"]);
    await onMode("rational");

    await choose("growth");
    await expect(facts(lab,"Seçili adımdaki miktar")).toHaveText("12800");
    await choice(panel(lab), "Her tamamlanan adımın çarpanı", "0 (ilk adımdan sonra 0)");
    await range(lab,"Tamamlanan adım",0);
    await expect(facts(lab,"Seçili adımdaki miktar")).toHaveText("200");
    await expect(facts(lab,"Davranış")).toHaveText("başlangıç değeri");
    await panel(lab).getByRole("button",{name:"Bir adım ilerle",exact:true}).click();
    await expect(facts(lab,"Seçili adımdaki miktar")).toHaveText("0");
    await panel(lab).getByRole("button",{name:"Başlangıca dön",exact:true}).click();
    await expect(facts(lab,"Seçili adımdaki miktar")).toHaveText("200");
    await onMode("growth");
    await choose("anatomy");await expect(facts(lab,"Sonuç")).toContainText("tanımlı değildir");
    await choose("growth");
  },
  async assertModel(lab) {
    await expect(lab.getByRole("group",{name:"Keşif modeli",exact:true}).getByRole("button",{name:"Adım ve süreç",exact:true})).toHaveAttribute("aria-pressed","true");
    await expect(panel(lab).getByRole("group",{name:"Her tamamlanan adımın çarpanı",exact:true}).getByRole("button",{name:"0 (ilk adımdan sonra 0)",exact:true})).toHaveAttribute("aria-pressed","true");
    await expect(panel(lab).getByRole("slider",{name:"Tamamlanan adım",exact:true})).toHaveValue("0");
    await expect(facts(lab,"Seçili adımdaki miktar")).toHaveText("200");
  },
}];
