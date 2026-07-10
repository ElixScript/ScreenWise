import confetti from "canvas-confetti";

const BRAND_COLORS = ["#22d3ee", "#a78bfa", "#f472b6", "#fbbf24", "#4ade80", "#e0f2fe"];

/** Letusan kecil untuk jawaban benar / interaksi sukses. */
export function burstConfetti(origin?: { x: number; y: number }) {
  confetti({
    particleCount: 70,
    spread: 75,
    startVelocity: 32,
    scalar: 0.9,
    colors: BRAND_COLORS,
    origin: origin ?? { x: 0.5, y: 0.6 },
    disableForReducedMotion: true,
  });
}

/** Hujan bintang kecil untuk momen reward. */
export function starConfetti() {
  confetti({
    particleCount: 40,
    spread: 100,
    shapes: ["star"],
    colors: ["#FFD54F", "#FFB74D", "#FFF176"],
    scalar: 1.1,
    origin: { x: 0.5, y: 0.4 },
    disableForReducedMotion: true,
  });
}

/** Perayaan besar: confetti dari dua sisi selama beberapa detik. */
export function celebrationConfetti(durationMs = 2600) {
  const end = Date.now() + durationMs;

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 60,
      startVelocity: 45,
      colors: BRAND_COLORS,
      origin: { x: 0, y: 0.75 },
      disableForReducedMotion: true,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 60,
      startVelocity: 45,
      colors: BRAND_COLORS,
      origin: { x: 1, y: 0.75 },
      disableForReducedMotion: true,
    });
    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}
