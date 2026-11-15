import { expect, type Locator } from "@playwright/test";
import { forge016BiologyBLessons } from "../../src/learning/forge016BiologyB";
import { forge016Case, setRange } from "./forge016-case-helper";
async function predict(lab: Locator, value: string, reason: string) {
  await lab
    .getByRole("combobox", { name: "Sonuç tahminin", exact: true })
    .selectOption(value);
  const input = lab.getByRole("textbox", {
    name: "Modelden gerekçen",
    exact: true,
  });
  await expect(input).toHaveAttribute("maxlength", "120");
  await input.fill(reason);
  await lab
    .getByRole("button", { name: "Tahminimi karşılaştır", exact: true })
    .click();
}
const feedback = async (lab: Locator) => {
  await expect(lab.locator(".bio016b-feedback")).toContainText(
    "Tahminin bu koşullarla uyumlu.",
  );
};
export const biologyB016Cases = [
  forge016Case(
    forge016BiologyBLessons,
    "duyu-organlari-deri",
    "forge016-b:duyu-organlari-deri",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "Deriye gelen uyaran", exact: true })
        .selectOption("pressure");
      await lab
        .getByRole("combobox", { name: "Uyaranın evresi", exact: true })
        .selectOption("steady");
      await lab
        .getByRole("combobox", { name: "İzlenen ter bezi", exact: true })
        .selectOption("apocrine");
      await predict(
        lab,
        "sustained",
        "Sabit basınç sürerken Pacini örneği azalır, Merkel yanıtı sürer; apokrin kanal foliküle açılır.",
      );
    },
    async (_page, lab) => {
      await expect(
        lab.locator('[data-skin-receptor="pacini"]'),
      ).toHaveAttribute("data-active", "false");
      await expect(
        lab.locator('[data-skin-receptor="merkel"]'),
      ).toHaveAttribute("data-active", "true");
      await expect(
        lab.locator('[data-sweat-outlet="apocrine"]'),
      ).toHaveAttribute("d", "M330 240Q380 160 440 145");
      await expect(lab.locator('[data-skin-result="pacini"]')).toContainText(
        "bu evrede şematik yanıt yok",
      );
      await expect(lab.locator('[data-skin-result="merkel"]')).toContainText(
        "etkin nitel yanıt",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Bu şemada kıl folikülü",
      );
      await feedback(lab);
    },
  ),
  forge016Case(
    forge016BiologyBLessons,
    "duyu-organlari-dil-burun",
    "forge016-b:duyu-organlari-dil-burun",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", {
          name: "İzlenen kimyasal duyu yolu",
          exact: true,
        })
        .selectOption("smell");
      await lab
        .getByRole("combobox", { name: "Yiyeceğin temel tadı", exact: true })
        .selectOption("salty");
      await lab
        .getByRole("combobox", {
          name: "Seçili tat hücresinin örnek yolu",
          exact: true,
        })
        .selectOption("salty");
      await lab
        .getByRole("combobox", {
          name: "Aromanın koku epiteline erişimi",
          exact: true,
        })
        .selectOption("closed");
      await predict(
        lab,
        "absent",
        "Koku epiteline erişim kapalı; temel tuzluluk kanalı korunurken seçili koku yolunda giriş yok.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-olfactory-path]")).toHaveAttribute(
        "data-olfactory-path",
        "false",
      );
      await expect(lab.locator('[data-taste-cell="salty"]')).toHaveAttribute(
        "data-active",
        "true",
      );
      await expect(lab.locator("[data-selected-taste-path]")).toHaveAttribute(
        "data-selected-taste-path",
        "true",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Temel tat kanalı: korunuyor. Aroma katkısı: erişim engellendi.",
      );
      await expect(lab.locator("[data-chemo-selected]")).toContainText(
        "Seçili tuzlu tat hücresi: bu temel tat kartında etkin",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Koku nöronu → Koku soğancığı → İlk koku korteksi",
      );
      await feedback(lab);
    },
  ),
  forge016Case(
    forge016BiologyBLessons,
    "duyu-organlari-goz",
    "forge016-b:duyu-organlari-goz",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "Ortamın ışığı", exact: true })
        .selectOption("dim");
      await lab
        .getByRole("combobox", {
          name: "Bakılan nesnenin uzaklığı",
          exact: true,
        })
        .selectOption("far");
      const distant = await lab
          .locator('[data-eye-ray="upper"]')
          .getAttribute("d"),
        distantParts = distant!.match(/^M35 ([^ ]+)L200 ([^ ]+)L/);
      expect(distantParts).not.toBeNull();
      expect(Number(distantParts![1])).toBeCloseTo(177.4433125, 10);
      expect(Number(distantParts![2])).toBeCloseTo(177.4, 10);
      expect(
        (Number(distantParts![2]) - Number(distantParts![1])) / 165,
      ).toBeCloseTo(-12.6 / (8 * 6000), 12);
      await lab
        .getByRole("combobox", {
          name: "Bakılan nesnenin uzaklığı",
          exact: true,
        })
        .selectOption("near");
      await lab
        .getByRole("combobox", { name: "Ortamın ışığı", exact: true })
        .selectOption("dim");
      await lab
        .getByRole("combobox", { name: "Eksen uzunluğu modeli", exact: true })
        .selectOption("myopia");
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Odak: retinanın önünde.",
      );
      expect(
        Number(
          await lab.locator("[data-eye-focus]").getAttribute("data-distance"),
        ),
      ).toBeCloseTo(24, 10);
      await lab
        .getByRole("combobox", { name: "Ek optik düzeltme", exact: true })
        .selectOption("on");
      await predict(
        lab,
        "retina",
        "Uzun eksende retina 27 mm; eksi ek güç yakınsamayı azaltır ve görüntü uzaklığı da 27 mm olur.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Odak: retina düzleminde.",
      );
      await expect(lab.locator("[data-eye-accommodation]")).toContainText(
        "Siliyer kas: kasılı; asıcı lif gerginliği: azalmış; mercek: daha bombeli.",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Görüntü uzaklığı 27 mm",
      );
      expect(
        Number(
          await lab.locator("[data-eye-focus]").getAttribute("data-distance"),
        ),
      ).toBeCloseTo(27, 10);
      const d = await lab.locator("[data-eye-focus]").getAttribute("d");
      expect(Number(d!.match(/^M([^ ]+)/)![1])).toBeCloseTo(416, 10);
      const upper = await lab
          .locator('[data-eye-ray="upper"]')
          .getAttribute("d"),
        lower = await lab.locator('[data-eye-ray="lower"]').getAttribute("d");
      const up = upper!.match(/^M35 ([^ ]+)L200 ([^ ]+)L/),
        down = lower!.match(/^M35 ([^ ]+)L200 ([^ ]+)L/);
      expect(up).not.toBeNull();
      expect(down).not.toBeNull();
      expect(Number(up![1])).toBeCloseTo(178.4395, 10);
      expect(Number(up![2])).toBeCloseTo(177.4, 10);
      expect(Number(down![1])).toBeCloseTo(201.5605, 10);
      expect(Number(down![2])).toBeCloseTo(202.6, 10);
      const slope = (Number(up![2]) - Number(up![1])) / 165;
      expect(slope).toBeLessThan(0);
      expect(Number(up![2]) + slope * (-8 * 250)).toBeCloseTo(190, 10);
      expect((190 - Number(up![2])) / (8 * 27) - slope).toBeCloseTo(
        (190 - Number(up![2])) / (8 / (1 / 250 + 1 / 27)),
        10,
      );
      await expect(lab.locator("[data-eye-retina]")).toHaveAttribute(
        "data-distance",
        "27",
      );
      await feedback(lab);
    },
  ),
  forge016Case(
    forge016BiologyBLessons,
    "duyu-organlari-kulak",
    "forge016-b:duyu-organlari-kulak",
    async (_page, lab) => {
      await setRange(lab, "İşitme iletim adımı", 7);
      await lab
        .getByRole("combobox", { name: "Başın hareket evresi", exact: true })
        .selectOption("stop");
      await setRange(lab, "Zar alanı (temsili mm²)", 90);
      await predict(
        lab,
        "canal",
        "Durmada göreli kanal sapması başlangıca karşı yönde; alan 90/3 oranı 30 basınç oranıdır, güç üretimi değil.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator('[data-hearing-node="7"]')).toHaveAttribute(
        "data-selected",
        "true",
      );
      await expect(lab.locator("[data-cupula]")).toHaveAttribute(
        "data-direction",
        "1",
      );
      await expect(lab.locator("[data-otolith]")).toHaveAttribute(
        "data-shift",
        "0",
      );
      await expect(lab.locator("[data-ear-signal]")).toContainText(
        "Sinirde aksiyon potansiyelleri",
      );
      await expect(lab.locator("[data-ear-balance]")).toContainText(
        "başlangıca karşı yönde",
      );
      await expect(lab.locator("[data-ear-pressure]")).toContainText(
        "Basınç oranı: 30",
      );
      await feedback(lab);
    },
  ),
  forge016Case(
    forge016BiologyBLessons,
    "destek-hareket-kemik",
    "forge016-b:destek-hareket-kemik",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "Büyüme plağının durumu", exact: true })
        .selectOption("adult");
      await lab
        .getByRole("combobox", { name: "İncelenen büyüme süreci", exact: true })
        .selectOption("length");
      await setRange(lab, "Şematik süreç adımı", 4);
      await expect(lab.locator("[data-bone-outline]")).toHaveAttribute(
        "data-length",
        "220",
      );
      await expect(lab.locator("[data-bone-change]")).toContainText(
        "değişim yok",
      );
      await lab
        .getByRole("combobox", { name: "İncelenen büyüme süreci", exact: true })
        .selectOption("width");
      await setRange(lab, "Şematik süreç adımı", 3);
      await lab
        .getByRole("combobox", { name: "Kemikte seçili bölüm", exact: true })
        .selectOption("spongy");
      await predict(
        lab,
        "width",
        "Kapalı plakta uzunluk 220 kalır; yapım baskın kalınlaşma varsayımında 56+3×6=74 şema birimi olur.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-bone-outline]")).toHaveAttribute(
        "data-length",
        "220",
      );
      await expect(lab.locator("[data-bone-outline]")).toHaveAttribute(
        "data-width",
        "74",
      );
      await expect(lab.locator("[data-growth-plate]")).toHaveAttribute(
        "data-growth-plate",
        "false",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Uzunluk: 220; kalınlık: 74 şema birimi.",
      );
      await expect(lab.locator("[data-bone-tissue]")).toContainText(
        "trabeküler ağ",
      );
      await feedback(lab);
    },
  ),
  forge016Case(
    forge016BiologyBLessons,
    "destek-hareket-kikirdak-eklem",
    "forge016-b:destek-hareket-kikirdak-eklem",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "Eklemde seçili yapı", exact: true })
        .selectOption("meniscus");
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Dizdeki fibröz menisküs",
      );
      await setRange(lab, "Şematik eklem açısı (derece)", 45);
      await lab
        .getByRole("combobox", { name: "Eklemde seçili yapı", exact: true })
        .selectOption("ligament");
      await predict(
        lab,
        "bone-bone",
        "Ligament iki kemiğe bağlanır; alt tutunma noktası merkez çevresinde alt kemikle aynı 45° döner.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-joint-moving]")).toHaveAttribute(
        "transform",
        "rotate(-45 220 200)",
      );
      const anchor = lab.locator('[data-ligament-anchor="lower"]');
      expect(Number(await anchor.getAttribute("cx"))).toBeCloseTo(
        220 + 52 / Math.sqrt(2),
        10,
      );
      expect(Number(await anchor.getAttribute("cy"))).toBeCloseTo(
        200 + 88 / Math.sqrt(2),
        10,
      );
      expect(
        Number(await lab.locator("[data-tendon-anchor]").getAttribute("cx")),
      ).toBeCloseTo(220 + 103 / Math.sqrt(2), 10);
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Kemik–kemik bağlantısı: ligament",
      );
      await expect(lab.locator("[data-joint-meaning]")).toContainText(
        "Alt tutunma noktası alt kemikle birlikte döner.",
      );
      await feedback(lab);
    },
  ),
];
