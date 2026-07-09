"use client";

import { motion } from "framer-motion";

const INK = "#2D3A53";
const fillBox = { transformBox: "fill-box" } as const;

interface SceneProps {
  className?: string;
}

/** Aturan 1: jam dengan jarum berputar + HP kecil. */
export function ClockScene({ className = "w-32" }: SceneProps) {
  return (
    <svg viewBox="0 0 140 120" className={className} aria-hidden>
      <circle cx="60" cy="55" r="42" fill="#EAF4FF" stroke="#4F9DFF" strokeWidth="6" />
      {Array.from({ length: 4 }).map((_, i) => (
        <rect key={i} x="58" y="18" width="4" height="9" rx="2" fill="#4F9DFF" transform={`rotate(${i * 90} 60 55)`} />
      ))}
      <motion.rect
        x="57.5" y="30" width="5" height="27" rx="2.5" fill={INK}
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "60px 55px" }}
      />
      <motion.rect
        x="58" y="38" width="4" height="19" rx="2" fill="#FFB74D"
        animate={{ rotate: 360 }}
        transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "60px 55px" }}
      />
      <circle cx="60" cy="55" r="4.5" fill="#4F9DFF" />
      {/* HP kecil */}
      <motion.g
        animate={{ rotate: [-4, 4, -4] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        style={{ ...fillBox, transformOrigin: "50% 100%" }}
      >
        <rect x="98" y="58" width="30" height="52" rx="8" fill="#4F9DFF" />
        <rect x="102" y="64" width="22" height="36" rx="4" fill="#EAF4FF" />
        <text x="113" y="88" textAnchor="middle" fontSize="14">⏳</text>
      </motion.g>
    </svg>
  );
}

/** Aturan 2: lampu menyala + jendela terang. */
export function BrightRoomScene({ className = "w-32" }: SceneProps) {
  return (
    <svg viewBox="0 0 140 120" className={className} aria-hidden>
      {/* Jendela */}
      <rect x="78" y="18" width="50" height="56" rx="8" fill="#BFE3FF" stroke="#4F9DFF" strokeWidth="4" />
      <line x1="103" y1="18" x2="103" y2="74" stroke="#4F9DFF" strokeWidth="4" />
      <line x1="78" y1="46" x2="128" y2="46" stroke="#4F9DFF" strokeWidth="4" />
      <circle cx="92" cy="32" r="8" fill="#FFD54F" />
      {/* Lampu */}
      <line x1="34" y1="8" x2="34" y2="26" stroke={INK} strokeWidth="4" strokeLinecap="round" />
      <path d="M14 44 Q34 16 54 44 Z" fill="#FFB74D" stroke="#F29B32" strokeWidth="3" strokeLinejoin="round" />
      <motion.circle
        cx="34" cy="52" r="9" fill="#FFD54F"
        animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ ...fillBox, transformOrigin: "50% 50%" }}
      />
      <motion.g
        animate={{ opacity: [0.25, 0.6, 0.25] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M20 60 L10 78 M34 64 L34 84 M48 60 L58 78" stroke="#FFD54F" strokeWidth="5" strokeLinecap="round" />
      </motion.g>
      <rect x="8" y="96" width="124" height="12" rx="6" fill="#E8D5BC" />
    </svg>
  );
}

/** Aturan 3: mata berkedip melihat pohon yang jauh. */
export function RestEyesScene({ className = "w-32" }: SceneProps) {
  return (
    <svg viewBox="0 0 140 120" className={className} aria-hidden>
      {/* Mata besar */}
      <path d="M8 55 Q38 22 68 55 Q38 88 8 55 Z" fill="#FFFFFF" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
      <motion.g
        animate={{ scaleY: [1, 1, 0.08, 1, 1] }}
        transition={{ duration: 2.6, times: [0, 0.7, 0.8, 0.9, 1], repeat: Infinity }}
        style={{ ...fillBox, transformOrigin: "50% 50%" }}
      >
        <circle cx="38" cy="55" r="14" fill="#4F9DFF" />
        <circle cx="38" cy="55" r="7" fill={INK} />
        <circle cx="41" cy="51" r="2.5" fill="#FFFFFF" />
      </motion.g>
      {/* Garis pandang */}
      <motion.path
        d="M72 52 Q90 44 102 50"
        stroke="#8CE08E"
        strokeWidth="4"
        strokeDasharray="2 9"
        strokeLinecap="round"
        fill="none"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      />
      {/* Pohon jauh */}
      <rect x="108" y="72" width="8" height="26" rx="4" fill="#B07B4F" />
      <motion.g
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ ...fillBox, transformOrigin: "50% 90%" }}
      >
        <circle cx="112" cy="58" r="20" fill="#5CCB5F" />
        <circle cx="100" cy="66" r="12" fill="#8CE08E" />
        <circle cx="124" cy="66" r="12" fill="#8CE08E" />
      </motion.g>
      <text x="64" y="26" fontSize="15">✨</text>
      <text x="20" y="100" fontFamily="var(--font-baloo)" fontWeight="bold" fontSize="14" fill={INK}>20 : 20</text>
    </svg>
  );
}

/** Aturan 4: konten aman hijau ✓, konten tidak aman abu-abu ✗. */
export function SafeContentScene({ className = "w-32" }: SceneProps) {
  return (
    <svg viewBox="0 0 140 120" className={className} aria-hidden>
      {/* Perisai */}
      <path d="M70 6 L96 16 Q96 44 70 54 Q44 44 44 16 Z" fill="#4F9DFF" stroke="#3F7FD6" strokeWidth="3" strokeLinejoin="round" />
      <path d="M60 28 L67 35 L81 20" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Kartu konten aman */}
      <motion.g
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.rect
          x="12" y="62" width="52" height="44" rx="10"
          animate={{ fill: ["#E5E7EB", "#8CE08E", "#8CE08E", "#E5E7EB"] }}
          transition={{ duration: 4, times: [0, 0.25, 0.85, 1], repeat: Infinity }}
        />
        <path d="M30 84 L37 91 L48 76" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <text x="20" y="76" fontSize="11">📚</text>
      </motion.g>
      {/* Kartu konten tidak aman */}
      <motion.g
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      >
        <motion.rect
          x="76" y="62" width="52" height="44" rx="10"
          animate={{ fill: ["#FCA5A5", "#B7BCC7", "#B7BCC7", "#FCA5A5"] }}
          transition={{ duration: 4, times: [0, 0.25, 0.85, 1], repeat: Infinity }}
        />
        <path d="M94 76 L110 92 M110 76 L94 92" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
      </motion.g>
    </svg>
  );
}

/** Aturan 5: keluarga bergandengan dengan hati yang berdenyut. */
export function FamilyScene({ className = "w-32" }: SceneProps) {
  return (
    <svg viewBox="0 0 140 120" className={className} aria-hidden>
      {/* Ayah */}
      <circle cx="34" cy="44" r="16" fill="#FFD9B3" />
      <path d="M20 40 Q22 26 34 26 Q46 26 48 40 Q40 33 34 33 Q28 33 20 40 Z" fill={INK} />
      <rect x="20" y="62" width="28" height="34" rx="11" fill="#4F9DFF" />
      <circle cx="30" cy="42" r="2.4" fill={INK} />
      <circle cx="38" cy="42" r="2.4" fill={INK} />
      <path d="M29 49 Q34 54 39 49" stroke={INK} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Ibu */}
      <circle cx="106" cy="44" r="16" fill="#FFD9B3" />
      <path d="M91 42 Q91 25 106 25 Q121 25 121 42 Q116 32 106 32 Q96 32 91 42 Z" fill="#4A3728" />
      <circle cx="106" cy="22" r="6" fill="#4A3728" />
      <path d="M94 62 L118 62 L124 96 L88 96 Z" fill="#FFB74D" />
      <circle cx="102" cy="42" r="2.4" fill={INK} />
      <circle cx="110" cy="42" r="2.4" fill={INK} />
      <path d="M101 49 Q106 54 111 49" stroke={INK} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Anak di tengah */}
      <circle cx="70" cy="58" r="13" fill="#FFD9B3" />
      <path d="M58 55 Q59 44 70 44 Q81 44 82 55 Q76 49 70 49 Q64 49 58 55 Z" fill="#4A3728" />
      <rect x="59" y="72" width="22" height="26" rx="9" fill="#5CCB5F" />
      <circle cx="66" cy="57" r="2.2" fill={INK} />
      <circle cx="74" cy="57" r="2.2" fill={INK} />
      <path d="M66 62 Q70 66 74 62" stroke={INK} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Gandengan */}
      <path d="M48 78 Q54 82 59 80" stroke="#FFD9B3" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M81 80 Q86 82 92 78" stroke="#FFD9B3" strokeWidth="6" strokeLinecap="round" fill="none" />
      {/* Hati */}
      <motion.path
        d="M70 22 C67 17 60 15 60 21 C60 26 66 29 70 33 C74 29 80 26 80 21 C80 15 73 17 70 22 Z"
        fill="#F87BA5"
        animate={{ scale: [1, 1.25, 1], y: [0, -3, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        style={{ ...fillBox, transformOrigin: "50% 50%" }}
      />
    </svg>
  );
}

export const RULE_SCENES: Record<string, (props: SceneProps) => React.ReactElement> = {
  "batasi-waktu": ClockScene,
  "tempat-terang": BrightRoomScene,
  "istirahatkan-mata": RestEyesScene,
  "konten-aman": SafeContentScene,
  didampingi: FamilyScene,
};
