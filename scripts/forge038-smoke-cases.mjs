import { expect } from "@playwright/test";

const labels = ["Uzaklık ve işaret", "Denklem ve eşitsizlik", "Grafiği dönüştür", "İki noktaya uzaklık", "İç içe mutlak değer", "İki taraf ve koşul", "Parametre ve örnek", "Çizginin kapsamı"];
export const forge038SmokeCases = [{
  id: "tyt-mat-mutlak-deger-kaynak-038",
  title: "Mutlak değer: uzaklık, koşul ve grafiğin mantığı",
  selector: "[data-forge038]",
  storedKey: "absolute-value-source-038",
  note: "Mutlak değerde iç ifadenin işaretini, bütün çözümü ve özgün koşulu denetlerim. ÇĞİÖŞÜ.",
  persisted: { mode: 7, scope: "sum", position: 2 },
  async act(lab, onMode = async () => {}) {
    const modes = lab.getByRole("group", { name: "Mutlak değer modeli", exact: true });
    const button = (name) => lab.getByRole("button", { name, exact: true });
    const result = (text) => expect(lab.locator("[data-model-result]")).toContainText(text);
    const mode = async (index) => {
      await modes.getByRole("button", { name: labels[index], exact: true }).click();
      await expect(modes.getByRole("button", { name: labels[index], exact: true })).toHaveAttribute("aria-pressed", "true");
    };
    await mode(0);
    await button("−7’nin uzaklığı").click();
    await result("Sonuç 7");
    const trial = lab.getByRole("slider", { name: "Deneme x payı", exact: true });
    await trial.focus(); await trial.press("ArrowRight"); await result("Sonuç 6");
    await button("Toplam, çarpım ve bölüm").click();
    await button("Ters yön: 3 ve −5").click(); await result("|u+v|=2 ≤ |u|+|v|=8");
    await button("Bölümde sıfır payda").click();
    await expect(lab.getByText("v=0: iki bölüm de tanımsız; sıfıra bölünmez.", { exact: true })).toBeVisible();
    await onMode("distance-and-sign");

    await mode(1); await button("Sıfır sağ taraf").click(); await result("ÇK={5}");
    const k = lab.getByRole("slider", { name: "Sağ taraf k", exact: true });
    await k.focus(); await k.press("ArrowRight"); await result("ÇK=[4, 6]");
    await lab.locator("summary").focus(); await lab.locator("summary").press("Enter");
    await expect(lab.locator("details")).toHaveAttribute("open", "");
    await onMode("equation-and-inequality");

    await mode(2); await button("Tepe (2,−1)").click();
    const a = lab.getByRole("slider", { name: "Grafikte iç x katsayısı", exact: true });
    const b = lab.getByRole("slider", { name: "Grafikte iç sabit", exact: true });
    await a.focus(); await a.press("Home"); for (let i=0; i<9; i++) await a.press("ArrowRight");
    await b.focus(); await b.press("Home"); for (let i=0; i<13; i++) await b.press("ArrowRight");
    const graph = lab.locator(".f038-graph");
    await expect(graph).toContainText("(-1/3, -1); sol eğim -3, sağ eğim 3");
    const exactVertex = await graph.evaluate((root) => {
      const dot = root.querySelector(".f038-node-a"), line = root.querySelector("polyline");
      const x=Number(dot.getAttribute("cx")), y=Number(dot.getAttribute("cy"));
      return { present:line.getAttribute("points").split(" ").some((point) => { const [a,b]=point.split(",").map(Number); return Math.abs(a-x)<1e-9 && Math.abs(b-y)<1e-9; }), clipped:!!root.querySelector("clipPath") };
    });
    expect(exactVertex).toEqual({ present:true, clipped:true });
    await onMode("exact-fractional-vertex");

    await mode(3); await button("Arada sabit toplam").click(); await result("ÇK=[-1, 2]");
    await button("Minimumdan küçük hedef").click(); await result("ÇK=∅");
    await onMode("two-distances");

    await mode(4); await button("Dört kök").click(); await result("ÇK={-4} ∪ {-2} ∪ {2} ∪ {4}");
    await button("Negatif iç hedefi ele").click(); await result("ÇK={-5} ∪ {5}");
    await onMode("nested-filter");

    await mode(5); await button("Kare alma: sahte x=1").click(); await result("ÇK=∅");
    await button("|A|=|B|: iki uzaklık").click(); await result("ÇK={1}");
    await onMode("two-sides-sign-filter");

    await mode(6); await button("m=3: iki kök").click(); await result("2 farklı kök, ÇK={0} ∪ {4}");
    await button("OGM işaret örneği").click(); await result("özgün değer -1/2");
    await trial.focus(); await trial.press("Home"); await result("verilen x>0 alanının dışında");
    await onMode("parameter-and-domain");

    await mode(7); await button("Çarpım: tek konum var mı?").click(); await result("kapanış sayısı 2");
    await button("Yeni toplama aktarımı").click(); await button("6’nın sağı").click(); await result("Seçilen sonuç 2");
    await onMode("scope-transfer");
  },
  async assertModel(lab) {
    await expect(lab.locator("[data-model-result]")).toContainText("Seçilen sonuç 2");
    await expect(lab.getByRole("button", { name: "Çizginin kapsamı", exact: true })).toHaveAttribute("aria-pressed", "true");
  },
}];
