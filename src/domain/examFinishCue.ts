import { playCue } from "./soundEngine";

/*
 * Deneme bitişi zafer akoru. Kullanıcı bitirdiğinde ve süre dolduğunda hem
 * sınav ekranı hem de genel süre izleyici bitirmeyi deneyebilir; ses her
 * deneme için yalnız bir kez çalar. Ses hiçbir kayıt ya da ödül üretmez.
 */
const played = new Set<string>();

export function playExamFinishCue(examId: string, settings: { sound: boolean; soundVolume: number }): boolean {
  if (!settings.sound || played.has(examId)) return false;
  played.add(examId);
  playCue({ kind: "examFinish" }, settings.soundVolume);
  return true;
}
