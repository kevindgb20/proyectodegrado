// Motor de sonido de la landing: una señal simulada (100 BPM con estructura conocida) o el micrófono real.
// Todos los efectos visuales leen el mismo Frame en cada requestAnimationFrame, igual que la app lee la MAIN.

export type SceneState = "silencio" | "calma" | "melodía" | "acumulación" | "groove" | "clímax" | "break";

export const STATES: SceneState[] = ["silencio", "calma", "melodía", "acumulación", "groove", "clímax", "break"];

export interface Frame {
  t: number;
  rms: number;
  bass: number;
  mid: number;
  high: number;
  beat: number;
  offbeat: number;
  accent: number;
  spectrum: Float32Array;
  state: SceneState;
  bpm: number | null;
}

export type Mode = "sim" | "mic";

export interface EngineStatus {
  mode: Mode;
  error: string | null;
  pending: boolean;
}

export const BINS = 64;

const clamp = (v: number, lo = 0, hi = 1) => (v < lo ? lo : v > hi ? hi : v);

// ---------- Señal simulada ----------

interface Params {
  kick: number;
  bass: number;
  hat: number;
  hat16: number;
  pad: number;
  voice: number;
}

const P: Record<SceneState, Params> = {
  silencio: { kick: 0, bass: 0, hat: 0, hat16: 0, pad: 0, voice: 0 },
  calma: { kick: 0, bass: 0.15, hat: 0, hat16: 0, pad: 0.45, voice: 0.1 },
  melodía: { kick: 0, bass: 0.1, hat: 0, hat16: 0, pad: 0.3, voice: 0.75 },
  acumulación: { kick: 0.6, bass: 0.35, hat: 0.6, hat16: 0.7, pad: 0.4, voice: 0 },
  groove: { kick: 0.85, bass: 0.6, hat: 0.65, hat16: 0, pad: 0.2, voice: 0.2 },
  clímax: { kick: 1, bass: 0.9, hat: 0.85, hat16: 0.85, pad: 0.5, voice: 0.3 },
  break: { kick: 0, bass: 0, hat: 0.75, hat16: 0.55, pad: 0.15, voice: 0 },
};

// Voz → beatbox → build → drop → break → groove → calma → silencio, en bucle.
const SCRIPT: [SceneState, number][] = [
  ["silencio", 2.5],
  ["melodía", 7],
  ["groove", 8],
  ["acumulación", 6],
  ["clímax", 9],
  ["break", 5],
  ["groove", 6],
  ["calma", 5],
];
const SCRIPT_LEN = SCRIPT.reduce((s, [, d]) => s + d, 0);
const SIM_BPM = 100;

function lerpParams(a: Params, b: Params, k: number): Params {
  const out = { ...a };
  (Object.keys(a) as (keyof Params)[]).forEach((key) => {
    out[key] = a[key] + (b[key] - a[key]) * k;
  });
  return out;
}

function simFrame(t: number, spectrum: Float32Array): Frame {
  let tt = t % SCRIPT_LEN;
  let idx = 0;
  while (tt > SCRIPT[idx][1]) {
    tt -= SCRIPT[idx][1];
    idx++;
  }
  const [cur, dur] = SCRIPT[idx];
  const prev = SCRIPT[(idx - 1 + SCRIPT.length) % SCRIPT.length][0];
  let p = lerpParams(P[prev], P[cur], clamp(tt / 0.8));
  if (cur === "acumulación") {
    const ramp = 0.25 + 0.75 * (tt / dur);
    p = { ...p, kick: p.kick * ramp, hat: p.hat * ramp, hat16: p.hat16 * ramp * ramp, pad: p.pad * ramp };
  }

  const period = 60 / SIM_BPM;
  const ph = (t / period) % 1;
  const ph16 = (t / (period / 4)) % 1;
  const kick = Math.exp(-ph * 9) * p.kick;
  const off = ph >= 0.5 ? Math.exp(-(ph - 0.5) * 14) * p.hat : 0;
  const hat16 = Math.exp(-ph16 * 18) * p.hat16;
  const pad = p.pad * (0.7 + 0.3 * Math.sin(t * 0.8));
  const voice = p.voice * (0.5 + 0.5 * Math.abs(Math.sin(t * 2.1))) * (0.6 + 0.4 * Math.sin(t * 5.3));

  const bass = clamp(kick * 0.9 + p.bass * (0.55 + 0.45 * Math.sin(t * 3.7)) * 0.6);
  const mid = clamp(pad * 0.7 + voice * 0.9 + kick * 0.15);
  const high = clamp(off * 0.9 + hat16 * 0.7 + voice * 0.15);
  const rms = clamp(bass * 0.45 + mid * 0.35 + high * 0.3);

  for (let i = 0; i < BINS; i++) {
    const f = i / BINS;
    const v =
      bass * Math.exp(-(((f - 0.05) / 0.07) ** 2)) +
      mid * Math.exp(-(((f - 0.3) / 0.15) ** 2)) * (0.8 + 0.2 * Math.sin(i * 1.7 + t * 3)) +
      high * Math.exp(-(((f - 0.75) / 0.2) ** 2)) * (0.65 + 0.35 * Math.random());
    spectrum[i] = clamp(v + Math.random() * 0.02);
  }

  return {
    t,
    rms,
    bass,
    mid,
    high,
    beat: kick,
    offbeat: off,
    accent: hat16,
    spectrum,
    state: cur,
    bpm: p.kick > 0.2 ? SIM_BPM : null,
  };
}

// ---------- Micrófono ----------

class MicSource {
  private ctx: AudioContext;
  private stream: MediaStream;
  private analyser: AnalyserNode;
  private freq: Uint8Array<ArrayBuffer>;
  private time: Float32Array<ArrayBuffer>;
  private peaks = { bass: 0.35, mid: 0.35, high: 0.35, rms: 0.08 };
  private prev = { bass: 0, high: 0 };
  private env = { beat: 0, off: 0, accent: 0 };
  private lastBeat = -1;
  private lastHigh = -1;
  private beats: number[] = [];
  private slow = 0;
  private long = 0;
  private quietSince = 0;
  private candidate: SceneState = "silencio";
  private candidateSince = 0;
  private state: SceneState = "silencio";
  private lastT = 0;

  constructor(ctx: AudioContext, stream: MediaStream) {
    this.ctx = ctx;
    this.stream = stream;
    this.analyser = ctx.createAnalyser();
    this.analyser.fftSize = 2048;
    this.analyser.smoothingTimeConstant = 0.55;
    ctx.createMediaStreamSource(stream).connect(this.analyser);
    this.freq = new Uint8Array(this.analyser.frequencyBinCount);
    this.time = new Float32Array(this.analyser.fftSize);
  }

  private band(lo: number, hi: number): number {
    const binHz = this.ctx.sampleRate / this.analyser.fftSize;
    const a = Math.max(1, Math.floor(lo / binHz));
    const b = Math.min(this.freq.length - 1, Math.ceil(hi / binHz));
    let s = 0;
    for (let i = a; i <= b; i++) s += this.freq[i];
    return s / ((b - a + 1) * 255);
  }

  private norm(key: "bass" | "mid" | "high" | "rms", v: number, floor: number): number {
    this.peaks[key] = Math.max(v, this.peaks[key] * 0.9985, floor);
    return clamp(v / this.peaks[key]);
  }

  frame(t: number, spectrum: Float32Array): Frame {
    const dt = Math.min(0.1, Math.max(0.001, t - this.lastT));
    this.lastT = t;
    this.analyser.getByteFrequencyData(this.freq);
    this.analyser.getFloatTimeDomainData(this.time);

    let sq = 0;
    for (let i = 0; i < this.time.length; i++) sq += this.time[i] * this.time[i];
    const rawRms = Math.sqrt(sq / this.time.length);

    const bass = this.norm("bass", this.band(20, 150), 0.35);
    const mid = this.norm("mid", this.band(150, 2000), 0.3);
    const high = this.norm("high", this.band(2000, 10000), 0.2);
    const rms = this.norm("rms", rawRms, 0.06);

    // Golpes graves por salto de potencia; contratiempos y acentos por salto de agudos.
    const decay = Math.exp(-dt * 9);
    this.env.beat *= decay;
    this.env.off *= Math.exp(-dt * 14);
    this.env.accent *= Math.exp(-dt * 18);
    if (bass - this.prev.bass > 0.07 && bass > 0.35 && t - this.lastBeat > 0.22) {
      if (this.lastBeat > 0) {
        this.beats.push(t - this.lastBeat);
        if (this.beats.length > 10) this.beats.shift();
      }
      this.lastBeat = t;
      this.env.beat = bass;
    }
    if (high - this.prev.high > 0.06 && high > 0.3 && t - this.lastHigh > 0.08) {
      this.lastHigh = t;
      if (t - this.lastBeat > 0.12) this.env.off = high;
      else this.env.accent = high;
    }
    this.prev = { bass, high };

    // Estado por votación con histéresis, como el director autónomo de la app.
    this.slow += (rms - this.slow) * Math.min(1, dt * 2);
    this.long += (rms - this.long) * Math.min(1, dt * 0.25);
    if (rawRms > 0.01) this.quietSince = t;
    const recentBeats = t - this.lastBeat < 1.5;
    const interval = this.beats.length >= 3 ? [...this.beats].sort((a, b) => a - b)[this.beats.length >> 1] : 0;
    const bpm = recentBeats && interval > 0 ? clamp(60 / interval, 60, 180) : null;
    let cand: SceneState;
    if (t - this.quietSince > 1.2) cand = "silencio";
    else if (this.slow > 0.6 && bpm && bpm > 0) cand = "clímax";
    else if (bass < 0.2 && high > 0.35) cand = "break";
    else if (this.slow - this.long > 0.08) cand = "acumulación";
    else if (bpm) cand = "groove";
    else if (mid > bass * 1.4 && mid > 0.25) cand = "melodía";
    else cand = "calma";
    if (cand !== this.candidate) {
      this.candidate = cand;
      this.candidateSince = t;
    }
    const hold = cand === "silencio" ? 0 : 0.6;
    if (t - this.candidateSince >= hold) this.state = cand;
    if (rawRms > 0.01 && this.state === "silencio" && t - this.candidateSince > 0.3) this.state = cand;

    const binHz = this.ctx.sampleRate / this.analyser.fftSize;
    for (let i = 0; i < BINS; i++) {
      // Escala logarítmica de 40 Hz a 12 kHz.
      const hz = 40 * Math.pow(300, i / (BINS - 1));
      spectrum[i] = this.freq[Math.min(this.freq.length - 1, Math.round(hz / binHz))] / 255;
    }

    return {
      t,
      rms,
      bass,
      mid,
      high,
      beat: this.env.beat,
      offbeat: this.env.off,
      accent: this.env.accent,
      spectrum,
      state: this.state,
      bpm,
    };
  }

  close() {
    this.stream.getTracks().forEach((tr) => tr.stop());
    void this.ctx.close();
  }
}

// ---------- Motor compartido ----------

type Listener = (f: Frame) => void;

class Engine {
  private listeners = new Set<Listener>();
  private statusListeners = new Set<() => void>();
  private raf = 0;
  private t0 = 0;
  private mic: MicSource | null = null;
  private spectrum = new Float32Array(BINS);
  status: EngineStatus = { mode: "sim", error: null, pending: false };

  private loop = () => {
    const t = (performance.now() - this.t0) / 1000;
    const f = this.mic ? this.mic.frame(t, this.spectrum) : simFrame(t, this.spectrum);
    this.listeners.forEach((l) => l(f));
    this.raf = requestAnimationFrame(this.loop);
  };

  subscribe(fn: Listener): () => void {
    this.listeners.add(fn);
    if (!this.raf) {
      if (!this.t0) this.t0 = performance.now();
      this.raf = requestAnimationFrame(this.loop);
    }
    return () => {
      this.listeners.delete(fn);
      if (this.listeners.size === 0 && this.raf) {
        cancelAnimationFrame(this.raf);
        this.raf = 0;
      }
    };
  }

  subscribeStatus = (fn: () => void) => {
    this.statusListeners.add(fn);
    return () => this.statusListeners.delete(fn);
  };

  getStatus = () => this.status;

  private setStatus(s: Partial<EngineStatus>) {
    this.status = { ...this.status, ...s };
    this.statusListeners.forEach((l) => l());
  }

  async enableMic() {
    if (this.mic) return;
    this.setStatus({ pending: true, error: null });
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
      });
      const ctx = new AudioContext();
      await ctx.resume();
      this.mic = new MicSource(ctx, stream);
      this.setStatus({ mode: "mic", pending: false });
    } catch {
      this.setStatus({ pending: false, error: "No se pudo abrir el micrófono. Sigue la señal simulada." });
    }
  }

  disableMic() {
    this.mic?.close();
    this.mic = null;
    this.setStatus({ mode: "sim", error: null });
  }
}

export const engine = new Engine();

// ---------- Papeles de las luces ----------

export const ROLE_COLORS = {
  principal: [124, 92, 255],
  acompañamiento: [0, 209, 178],
  acentos: [255, 244, 222],
  fondo: [255, 176, 32],
} as const;

export type Role = keyof typeof ROLE_COLORS;

/** Intensidad objetivo (0–1) de cada papel, con las reglas de la app: en silencio todo baja al 10 %. */
export function roleTargets(f: Frame): Record<Role, number> {
  if (f.state === "silencio") {
    return { principal: 0.06, acompañamiento: 0.05, acentos: 0.02, fondo: 0.08 };
  }
  const sustained = f.bpm === null;
  const principal = sustained ? 0.2 + 0.6 * f.mid : 0.12 + 0.88 * Math.max(f.beat, f.bass * 0.55);
  const acompañamiento = 0.1 + 0.9 * Math.max(f.offbeat, f.mid * (f.state === "melodía" ? 0.9 : 0.5));
  const acentos = f.state === "clímax" ? Math.max(f.accent, f.high * 0.5) : f.accent * 0.85 + f.high * 0.15;
  const fondo = 0.15 + 0.55 * f.rms;
  return {
    principal: clamp(principal),
    acompañamiento: clamp(acompañamiento),
    acentos: clamp(acentos),
    fondo: clamp(fondo),
  };
}

/** Suavizado con ataque rápido y caída más lenta. */
export function follow(cur: number, target: number, attack = 0.55, release = 0.12) {
  return cur + (target - cur) * (target > cur ? attack : release);
}

export const rgba = (c: readonly number[], a: number) => `rgba(${c[0]},${c[1]},${c[2]},${clamp(a)})`;
