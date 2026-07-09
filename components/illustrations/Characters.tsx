"use client";

import { motion } from "framer-motion";

export type Mood = "happy" | "sad" | "sleepy" | "excited";

const SKIN = "#FFD9B3";
const INK = "#2D3A53";
const fillBox = { transformBox: "fill-box" } as const;

function Face({ cx, cy, mood }: { cx: number; cy: number; mood: Mood }) {
  return (
    <g>
      {mood === "sleepy" ? (
        <>
          <path d={`M${cx - 14} ${cy - 2} q5 4 10 0`} stroke={INK} strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d={`M${cx + 4} ${cy - 2} q5 4 10 0`} stroke={INK} strokeWidth="3" strokeLinecap="round" fill="none" />
        </>
      ) : (
        <>
          <circle cx={cx - 9} cy={cy - 3} r="3.4" fill={INK} />
          <circle cx={cx + 9} cy={cy - 3} r="3.4" fill={INK} />
        </>
      )}
      <circle cx={cx - 16} cy={cy + 5} r="4" fill="#F9A8C5" opacity="0.8" />
      <circle cx={cx + 16} cy={cy + 5} r="4" fill="#F9A8C5" opacity="0.8" />
      {mood === "happy" && (
        <path d={`M${cx - 7} ${cy + 7} Q${cx} ${cy + 14} ${cx + 7} ${cy + 7}`} stroke={INK} strokeWidth="3.2" strokeLinecap="round" fill="none" />
      )}
      {mood === "excited" && <path d={`M${cx - 7} ${cy + 6} Q${cx} ${cy + 17} ${cx + 7} ${cy + 6} Z`} fill={INK} />}
      {mood === "sad" && (
        <path d={`M${cx - 7} ${cy + 12} Q${cx} ${cy + 5} ${cx + 7} ${cy + 12}`} stroke={INK} strokeWidth="3.2" strokeLinecap="round" fill="none" />
      )}
      {mood === "sleepy" && (
        <ellipse cx={cx} cy={cy + 10} rx="4.5" ry="6" fill={INK} opacity="0.85" />
      )}
    </g>
  );
}

interface KidProps {
  className?: string;
  mood?: Mood;
  waving?: boolean;
  label?: string;
}

/** Budi — anak laki-laki berambut jabrik dengan kaos biru. */
export function Budi({ className = "w-28", mood = "happy", waving = false, label = "Budi" }: KidProps) {
  return (
    <motion.svg
      viewBox="0 0 120 165"
      className={className}
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      role="img"
      aria-label={label}
    >
      {/* Lengan */}
      <motion.g
        animate={waving ? { rotate: [0, -50, -20, -50, 0] } : undefined}
        transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 0.6, ease: "easeInOut" }}
        style={{ ...fillBox, transformOrigin: "20% 20%" }}
      >
        <rect x="86" y="82" width="14" height="36" rx="7" fill={SKIN} />
      </motion.g>
      <rect x="20" y="82" width="14" height="36" rx="7" fill={SKIN} />
      {/* Kaki + sepatu */}
      <rect x="44" y="120" width="12" height="30" rx="6" fill={SKIN} />
      <rect x="64" y="120" width="12" height="30" rx="6" fill={SKIN} />
      <rect x="40" y="144" width="20" height="12" rx="6" fill="#4F6DDE" />
      <rect x="60" y="144" width="20" height="12" rx="6" fill="#4F6DDE" />
      {/* Baju */}
      <rect x="32" y="78" width="56" height="50" rx="18" fill="#4F9DFF" />
      <rect x="32" y="78" width="56" height="50" rx="18" fill="none" stroke="#3F7FD6" strokeWidth="2.5" />
      {/* Kepala */}
      <circle cx="60" cy="45" r="30" fill={SKIN} />
      {/* Rambut jabrik */}
      <path
        d="M30 44 Q28 16 60 14 Q92 16 90 44 Q84 30 76 30 Q74 22 66 24 Q60 16 52 24 Q44 22 42 30 Q36 30 30 44 Z"
        fill="#4A3728"
      />
      <Face cx={60} cy={50} mood={mood} />
    </motion.svg>
  );
}

/** Siti — anak perempuan berkerudung hijau, rajin dan bijak. */
export function Siti({ className = "w-28", mood = "happy", waving = false, label = "Siti" }: KidProps) {
  return (
    <motion.svg
      viewBox="0 0 120 165"
      className={className}
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 2.9, repeat: Infinity, ease: "easeInOut" }}
      role="img"
      aria-label={label}
    >
      <motion.g
        animate={waving ? { rotate: [0, 50, 20, 50, 0] } : undefined}
        transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 0.9, ease: "easeInOut" }}
        style={{ ...fillBox, transformOrigin: "80% 20%" }}
      >
        <rect x="20" y="82" width="14" height="36" rx="7" fill={SKIN} />
      </motion.g>
      <rect x="86" y="82" width="14" height="36" rx="7" fill={SKIN} />
      <rect x="44" y="122" width="12" height="28" rx="6" fill={SKIN} />
      <rect x="64" y="122" width="12" height="28" rx="6" fill={SKIN} />
      <rect x="40" y="144" width="20" height="12" rx="6" fill="#E56B8C" />
      <rect x="60" y="144" width="20" height="12" rx="6" fill="#E56B8C" />
      {/* Gaun */}
      <path d="M40 80 L80 80 L90 130 L30 130 Z" fill="#5CCB5F" />
      <path d="M40 80 L80 80 L90 130 L30 130 Z" fill="none" stroke="#3DA75F" strokeWidth="2.5" />
      {/* Kerudung */}
      <path d="M60 10 Q95 14 92 52 Q92 74 60 74 Q28 74 28 52 Q25 14 60 10 Z" fill="#8CE08E" />
      <circle cx="60" cy="46" r="24" fill={SKIN} />
      <path d="M60 14 Q88 18 86 46 Q80 28 60 26 Q40 28 34 46 Q32 18 60 14 Z" fill="#8CE08E" />
      <Face cx={60} cy={50} mood={mood} />
    </motion.svg>
  );
}

/** Pak Guru — ramah, berkacamata, membawa semangat. */
export function Guru({ className = "w-28", mood = "happy", waving = false }: KidProps) {
  return (
    <motion.svg
      viewBox="0 0 120 175"
      className={className}
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      role="img"
      aria-label="Pak Guru"
    >
      <motion.g
        animate={waving ? { rotate: [0, -45, -15, -45, 0] } : undefined}
        transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
        style={{ ...fillBox, transformOrigin: "20% 15%" }}
      >
        <rect x="88" y="86" width="14" height="42" rx="7" fill="#7C93C4" />
        <circle cx="95" cy="130" r="7" fill={SKIN} />
      </motion.g>
      <rect x="18" y="86" width="14" height="42" rx="7" fill="#7C93C4" />
      <circle cx="25" cy="130" r="7" fill={SKIN} />
      <rect x="44" y="128" width="12" height="32" rx="6" fill="#5A6B94" />
      <rect x="64" y="128" width="12" height="32" rx="6" fill="#5A6B94" />
      <rect x="40" y="154" width="20" height="12" rx="6" fill="#2D3A53" />
      <rect x="60" y="154" width="20" height="12" rx="6" fill="#2D3A53" />
      {/* Kemeja */}
      <rect x="30" y="80" width="60" height="54" rx="18" fill="#9BB1DE" />
      <path d="M60 82 L54 96 L60 110 L66 96 Z" fill="#F6B93B" />
      {/* Kepala */}
      <circle cx="60" cy="46" r="28" fill={SKIN} />
      <path d="M34 40 Q36 18 60 18 Q84 18 86 40 Q76 30 60 30 Q44 30 34 40 Z" fill="#2D3A53" />
      {/* Kacamata */}
      <circle cx="50" cy="46" r="9" fill="none" stroke="#2D3A53" strokeWidth="3" />
      <circle cx="70" cy="46" r="9" fill="none" stroke="#2D3A53" strokeWidth="3" />
      <line x1="59" y1="46" x2="61" y2="46" stroke="#2D3A53" strokeWidth="3" />
      <circle cx="50" cy="46" r="2.6" fill="#2D3A53" />
      <circle cx="70" cy="46" r="2.6" fill="#2D3A53" />
      <path d="M52 60 Q60 67 68 60" stroke="#2D3A53" strokeWidth="3.2" strokeLinecap="round" fill="none" />
      <circle cx="40" cy="54" r="4" fill="#F9A8C5" opacity="0.7" />
      <circle cx="80" cy="54" r="4" fill="#F9A8C5" opacity="0.7" />
    </motion.svg>
  );
}

/** Ibu — hangat, selalu tersenyum. */
export function Ibu({ className = "w-28", waving = false }: KidProps) {
  return (
    <motion.svg
      viewBox="0 0 120 175"
      className={className}
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      role="img"
      aria-label="Ibu"
    >
      <motion.g
        animate={waving ? { rotate: [0, 45, 15, 45, 0] } : undefined}
        transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
        style={{ ...fillBox, transformOrigin: "80% 15%" }}
      >
        <rect x="18" y="86" width="14" height="42" rx="7" fill="#FFB74D" />
        <circle cx="25" cy="130" r="7" fill={SKIN} />
      </motion.g>
      <rect x="88" y="86" width="14" height="42" rx="7" fill="#FFB74D" />
      <circle cx="95" cy="130" r="7" fill={SKIN} />
      {/* Gaun panjang */}
      <path d="M38 82 L82 82 L94 160 L26 160 Z" fill="#FFB74D" />
      <path d="M38 82 L82 82 L94 160 L26 160 Z" fill="none" stroke="#F29B32" strokeWidth="2.5" />
      {/* Kepala + sanggul */}
      <circle cx="60" cy="46" r="28" fill={SKIN} />
      <path d="M32 44 Q32 16 60 16 Q88 16 88 44 Q80 28 60 28 Q40 28 32 44 Z" fill="#4A3728" />
      <circle cx="60" cy="14" r="10" fill="#4A3728" />
      <circle cx="70" cy="12" r="3.5" fill="#FF8FAB" />
      <Face cx={60} cy={50} mood="happy" />
    </motion.svg>
  );
}
