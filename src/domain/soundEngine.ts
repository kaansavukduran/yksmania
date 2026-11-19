/*
 * Offline sound engine: every cue is synthesised with the Web Audio API, so no
 * audio files are shipped or fetched. Cues are short, soft and never carry
 * learning evidence; callers play them only when `settings.sound` is on.
 *
 *   correct(combo) – two rising notes; each further independent correct answer
 *                    in a row lifts the pair by a semitone (max +8)
 *   wrong          – a quiet, low, downward step; deliberately not harsh
 *   repair         – a gliding major third: a past mistake solved without help
 *   seal           – two bell strikes: a topic sealed at its day-21 review
 *   finish         – a gentle major chord strum at the end of a set
 *   trophy(tier)   – bronze/silver/gold arpeggios; platinum adds a shimmer
 */

export type SoundCue =
  | { kind: "correct"; combo: number }
  | { kind: "wrong" }
  | { kind: "repair" }
  | { kind: "seal" }
  | { kind: "finish" }
  | { kind: "trophy"; tier: 1 | 2 | 3 | 4 };

type Ctx = AudioContext;
let shared: Ctx | null = null;
function context(): Ctx | null {
  try {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    shared ??= new Ctor();
    if (shared.state === "suspended") void shared.resume();
    return shared;
  } catch {
    return null;
  }
}

const hz = (midi: number) => 440 * 2 ** ((midi - 69) / 12);

function tone(
  ctx: Ctx,
  out: AudioNode,
  midi: number,
  at: number,
  length: number,
  { type = "sine", peak = 0.5, glideTo }: { type?: OscillatorType; peak?: number; glideTo?: number } = {},
) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(hz(midi), at);
  if (glideTo !== undefined) osc.frequency.exponentialRampToValueAtTime(hz(glideTo), at + length * 0.6);
  gain.gain.setValueAtTime(0.0001, at);
  gain.gain.exponentialRampToValueAtTime(peak, at + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + length);
  osc.connect(gain).connect(out);
  osc.start(at);
  osc.stop(at + length + 0.02);
}

/** Pure description of a cue as notes; exported for tests. */
export function cueNotes(cue: SoundCue): { midi: number; delay: number; length: number }[] {
  switch (cue.kind) {
    case "correct": {
      const lift = Math.max(0, Math.min(8, cue.combo - 1));
      return [
        { midi: 84 + lift, delay: 0, length: 0.12 },
        { midi: 88 + lift, delay: 0.08, length: 0.2 },
      ];
    }
    case "wrong":
      return [
        { midi: 57, delay: 0, length: 0.16 },
        { midi: 53, delay: 0.11, length: 0.24 },
      ];
    case "repair":
      return [
        { midi: 72, delay: 0, length: 0.3 },
        { midi: 79, delay: 0.16, length: 0.36 },
      ];
    case "seal":
      return [
        { midi: 81, delay: 0, length: 0.7 },
        { midi: 88, delay: 0.22, length: 0.9 },
      ];
    case "finish":
      return [72, 76, 79, 84].map((midi, i) => ({ midi, delay: i * 0.05, length: 0.8 }));
    case "trophy": {
      const scale = [76, 79, 83, 88, 91, 95];
      const count = 2 + cue.tier; // 3, 4, 5, 6 notes
      return scale.slice(0, count).map((midi, i) => ({ midi, delay: i * 0.085, length: 0.45 }));
    }
  }
}

/** Plays a cue at `volume` (0–100). Never throws; audio is optional. */
export function playCue(cue: SoundCue, volume = 60) {
  const ctx = context();
  if (!ctx || volume <= 0) return;
  try {
    const master = ctx.createGain();
    master.gain.value = Math.min(1, volume / 100) * 0.22;
    master.connect(ctx.destination);
    const now = ctx.currentTime + 0.01;
    const type: OscillatorType = cue.kind === "wrong" ? "triangle" : "sine";
    for (const n of cueNotes(cue)) {
      tone(ctx, master, n.midi, now + n.delay, n.length, {
        type,
        peak: cue.kind === "wrong" ? 0.35 : 0.5,
        glideTo: cue.kind === "repair" && n.delay === 0 ? n.midi + 4 : undefined,
      });
      // Bell partial for the seal; octave sparkle for platinum.
      if (cue.kind === "seal") tone(ctx, master, n.midi + 19, now + n.delay, n.length * 0.6, { peak: 0.12 });
    }
    if (cue.kind === "trophy" && cue.tier === 4)
      for (let i = 0; i < 6; i++) tone(ctx, master, 100 + (i % 3) * 2, now + 0.55 + i * 0.05, 0.25, { peak: 0.08 });
    setTimeout(() => master.disconnect(), 2500);
  } catch {
    // Optional audio never interrupts studying.
  }
}
