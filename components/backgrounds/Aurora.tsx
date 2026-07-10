"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { useMounted } from "@/hooks/useMounted";

/** Pseudo-random deterministik agar render server & client identik. */
function seeded(i: number, salt: number) {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export type AuroraTone = "cyan" | "violet" | "pink" | "amber" | "lime" | "mixed" | "danger";

/** Kombinasi warna mesh per nuansa halaman. */
const TONES: Record<AuroraTone, string[]> = {
  cyan: ["#0e7490", "#1d4ed8", "#0891b2", "#312e81"],
  violet: ["#6d28d9", "#4338ca", "#a21caf", "#312e81"],
  pink: ["#be185d", "#7e22ce", "#e11d48", "#4c1d95"],
  amber: ["#b45309", "#c2410c", "#a16207", "#7c2d12"],
  lime: ["#15803d", "#0f766e", "#4d7c0f", "#065f46"],
  mixed: ["#0e7490", "#6d28d9", "#be185d", "#b45309"],
  danger: ["#9f1239", "#7f1d1d", "#581c87", "#1e1b4b"],
};

interface AuroraBackgroundProps {
  tone?: AuroraTone;
  /** Intensitas cahaya blob (0–1). */
  intensity?: number;
}

/**
 * Aurora / mesh-gradient background: blob raksasa blur yang bergeser sangat
 * pelan di atas deep navy — memberi kesan sinematik seperti lobby game modern.
 */
export function AuroraBackground({ tone = "mixed", intensity = 0.5 }: AuroraBackgroundProps) {
  const mounted = useMounted();
  const colors = TONES[tone];
  const blobs = useMemo(
    () =>
      colors.map((color, i) => ({
        color,
        left: -10 + seeded(i, 3) * 85,
        top: -15 + seeded(i, 7) * 80,
        size: 420 + seeded(i, 11) * 380,
        duration: 14 + seeded(i, 13) * 10,
        delay: seeded(i, 17) * -8,
      })),
    [colors],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Dasar deep navy dengan vignette (render di server, tanpa kedip) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,#141b40_0%,#0a0f26_65%,#070b1d_100%)]" />

      {/* Blob ber-seed hanya di klien agar tidak memicu hydration mismatch */}
      {mounted &&
        blobs.map((b, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{
              left: `${b.left}%`,
              top: `${b.top}%`,
              width: b.size,
              height: b.size,
              backgroundColor: b.color,
              opacity: intensity,
            }}
            animate={{
              x: [0, 70, -50, 0],
              y: [0, -50, 40, 0],
              scale: [1, 1.15, 0.92, 1],
            }}
            transition={{ duration: b.duration, delay: b.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

      {/* Kilau tipis di atas agar terasa "kaca" */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-20%,rgb(255_255_255/0.08),transparent_60%)]" />
    </div>
  );
}

interface ParticleFieldProps {
  count?: number;
  color?: string;
}

/** Partikel cahaya kecil yang melayang naik perlahan. */
export function ParticleField({ count = 22, color = "#9fd8ff" }: ParticleFieldProps) {
  const mounted = useMounted();
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: seeded(i, 21) * 100,
        size: 2 + seeded(i, 23) * 4,
        duration: 9 + seeded(i, 29) * 12,
        delay: seeded(i, 31) * -18,
        drift: (seeded(i, 37) - 0.5) * 60,
        opacity: 0.25 + seeded(i, 41) * 0.5,
      })),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Partikel ber-seed hanya di klien agar tidak memicu hydration mismatch */}
      {mounted &&
        particles.map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              backgroundColor: color,
              boxShadow: `0 0 ${p.size * 3}px ${p.size}px ${color}33`,
            }}
            initial={{ y: "105vh", opacity: 0 }}
            animate={{ y: "-8vh", x: [0, p.drift, 0], opacity: [0, p.opacity, 0] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
          />
        ))}
    </div>
  );
}
