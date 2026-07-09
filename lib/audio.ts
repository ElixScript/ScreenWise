export type SoundName =
  | "click"
  | "pop"
  | "success"
  | "wrong"
  | "sparkle"
  | "tada"
  | "whoosh";

interface ToneOptions {
  freq: number;
  endFreq?: number;
  duration: number;
  type?: OscillatorType;
  volume?: number;
  delay?: number;
}

function tone(ctx: AudioContext, opts: ToneOptions) {
  const { freq, endFreq, duration, type = "sine", volume = 0.18, delay = 0 } = opts;
  const t0 = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (endFreq) {
    osc.frequency.exponentialRampToValueAtTime(endFreq, t0 + duration);
  }

  gain.gain.setValueAtTime(0, t0);
  gain.gain.linearRampToValueAtTime(volume, t0 + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.05);
}

function whoosh(ctx: AudioContext) {
  const duration = 0.35;
  const t0 = ctx.currentTime;
  const buffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(400, t0);
  filter.frequency.exponentialRampToValueAtTime(1600, t0 + duration);
  filter.Q.value = 1.2;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.12, t0);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  source.start(t0);
}

/** Semua efek suara disintesis langsung — lembut, bebas hak cipta. */
export function playSound(ctx: AudioContext, name: SoundName) {
  switch (name) {
    case "click":
      tone(ctx, { freq: 520, endFreq: 380, duration: 0.08, type: "triangle", volume: 0.12 });
      break;
    case "pop":
      tone(ctx, { freq: 340, endFreq: 920, duration: 0.12, volume: 0.16 });
      break;
    case "success":
      tone(ctx, { freq: 523.25, duration: 0.16, type: "triangle" });
      tone(ctx, { freq: 659.25, duration: 0.16, type: "triangle", delay: 0.09 });
      tone(ctx, { freq: 783.99, duration: 0.24, type: "triangle", delay: 0.18 });
      break;
    case "wrong":
      tone(ctx, { freq: 240, endFreq: 180, duration: 0.22, type: "sine", volume: 0.14 });
      tone(ctx, { freq: 180, endFreq: 140, duration: 0.24, type: "sine", volume: 0.1, delay: 0.08 });
      break;
    case "sparkle":
      tone(ctx, { freq: 1568, duration: 0.1, volume: 0.08 });
      tone(ctx, { freq: 1976, duration: 0.1, volume: 0.08, delay: 0.07 });
      tone(ctx, { freq: 2637, duration: 0.16, volume: 0.07, delay: 0.14 });
      break;
    case "tada":
      tone(ctx, { freq: 523.25, duration: 0.5, type: "triangle", volume: 0.1 });
      tone(ctx, { freq: 659.25, duration: 0.5, type: "triangle", volume: 0.1, delay: 0.02 });
      tone(ctx, { freq: 783.99, duration: 0.5, type: "triangle", volume: 0.1, delay: 0.04 });
      tone(ctx, { freq: 1046.5, duration: 0.6, type: "triangle", volume: 0.12, delay: 0.06 });
      break;
    case "whoosh":
      whoosh(ctx);
      break;
  }
}
