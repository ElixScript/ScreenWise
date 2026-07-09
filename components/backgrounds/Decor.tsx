"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

/** Pseudo-random deterministik agar render server & client identik. */
function seeded(i: number, salt: number) {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

interface SparkleFieldProps {
  count?: number;
  className?: string;
  color?: string;
}

/** Taburan bintang kecil yang berkedip lembut di background. */
export function SparkleField({
  count = 14,
  className = "",
  color = "#FFD54F",
}: SparkleFieldProps) {
  const sparkles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: seeded(i, 1) * 100,
        top: seeded(i, 2) * 100,
        size: 8 + seeded(i, 3) * 10,
        delay: seeded(i, 4) * 3,
        duration: 1.8 + seeded(i, 5) * 2,
      })),
    [count],
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {sparkles.map((s, i) => (
        <motion.svg
          key={i}
          viewBox="0 0 24 24"
          className="absolute"
          style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size }}
          animate={{ opacity: [0.15, 0.9, 0.15], scale: [0.7, 1.1, 0.7], rotate: [0, 45, 0] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z" fill={color} />
        </motion.svg>
      ))}
    </div>
  );
}

interface FloatingBlobsProps {
  colors?: string[];
  className?: string;
}

/** Blob besar blur yang mengambang sangat pelan — memberi kedalaman tanpa mengganggu. */
export function FloatingBlobs({
  colors = ["#BFDCFF", "#FFE9AE", "#CDEFCE"],
  className = "",
}: FloatingBlobsProps) {
  const blobs = useMemo(
    () =>
      colors.map((color, i) => ({
        color,
        left: 8 + seeded(i, 6) * 70,
        top: 5 + seeded(i, 7) * 60,
        size: 260 + seeded(i, 8) * 220,
        duration: 9 + seeded(i, 9) * 6,
      })),
    [colors],
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-50 blur-3xl"
          style={{
            left: `${b.left}%`,
            top: `${b.top}%`,
            width: b.size,
            height: b.size,
            backgroundColor: b.color,
          }}
          animate={{ x: [0, 36, -20, 0], y: [0, -28, 18, 0] }}
          transition={{ duration: b.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

interface FloatingEmojiFieldProps {
  emojis: string[];
  count?: number;
  className?: string;
}

/** Emoji tematik yang melayang pelan — dipakai sebagai doodle background. */
export function FloatingEmojiField({
  emojis,
  count = 8,
  className = "",
}: FloatingEmojiFieldProps) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        emoji: emojis[i % emojis.length],
        left: seeded(i, 11) * 92,
        top: seeded(i, 12) * 85,
        size: 22 + seeded(i, 13) * 22,
        duration: 5 + seeded(i, 14) * 5,
        delay: seeded(i, 15) * 2,
      })),
    [emojis, count],
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {items.map((item, i) => (
        <motion.span
          key={i}
          className="absolute select-none opacity-25"
          style={{ left: `${item.left}%`, top: `${item.top}%`, fontSize: item.size }}
          animate={{ y: [0, -22, 0], rotate: [0, i % 2 === 0 ? 12 : -12, 0] }}
          transition={{ duration: item.duration, delay: item.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          {item.emoji}
        </motion.span>
      ))}
    </div>
  );
}
