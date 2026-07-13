"use client";

import { motion } from "framer-motion";
import { useId } from "react";

export type MascotPose = "idle" | "wave" | "cheer" | "think" | "jump";
export type MascotFace = "happy" | "excited" | "think";

interface MascotProps {
  pose?: MascotPose;
  face?: MascotFace;
  className?: string;
}

const fillBox = { transformBox: "fill-box" } as const;

/** Warna cahaya di dalam visor menggantikan ekspresi wajah. */
const VISOR_COLOR: Record<MascotFace, string> = {
  happy: "#22d3ee",
  excited: "#fbbf24",
  think: "#a78bfa",
};

/**
 * Kosmo — astronaut penjelajah angkasa yang mengambang tanpa gravitasi.
 * Ilustrasi SVG orisinal, digerakkan penuh dengan Framer Motion.
 * API pose & face identik dengan maskot sebelumnya (drop-in).
 */
export default function Mascot({
  pose = "idle",
  face = "happy",
  className = "w-40",
}: MascotProps) {
  const rawId = useId();
  const uid = rawId.replace(/:/g, "");
  const g = (name: string) => `url(#${uid}-${name})`;

  const cheering = pose === "cheer";
  const jumping = pose === "jump";
  const thinking = pose === "think";
  const waving = pose === "wave";

  // ===== Gerak tubuh (float zero-G) =====
  const bodyAnimation = jumping
    ? { y: [0, -22, -6, 0], rotate: [-2, 6, -4, -2], scale: [1, 1.04, 1.01, 1], transition: { duration: 1.1, repeat: Infinity, ease: "easeInOut" as const } }
    : cheering
      ? { y: [0, -16, 0], rotate: [-3, 4, -3], transition: { duration: 1.3, repeat: Infinity, ease: "easeInOut" as const } }
      : { y: [0, -10, 0], rotate: [-4, 3, -4], transition: { duration: 5, repeat: Infinity, ease: "easeInOut" as const } };

  // Sudut positif = searah jarum jam. Lengan digambar menjuntai ke bawah,
  // jadi ~135° mengangkat lengan kiri ke atas-luar, ~-135° untuk lengan kanan.

  // ===== Lengan kiri (arm-a) =====
  const armA = waving
    ? { rotate: [128, 156, 128], transition: { duration: 1.1, repeat: Infinity, ease: "easeInOut" as const } }
    : cheering
      ? { rotate: [132, 150, 132], transition: { duration: 0.85, repeat: Infinity, ease: "easeInOut" as const } }
      : thinking
        ? { rotate: [30, 40, 30], transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const } }
        : jumping
          ? { rotate: 150, transition: { type: "spring" as const, stiffness: 170, damping: 12 } }
          : { rotate: [-7, 6, -7], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" as const } };

  // ===== Lengan kanan (arm-b) =====
  const armB = cheering
    ? { rotate: [-132, -150, -132], transition: { duration: 0.85, repeat: Infinity, ease: "easeInOut" as const } }
    : jumping
      ? { rotate: -150, transition: { type: "spring" as const, stiffness: 170, damping: 12 } }
      : thinking
        ? { rotate: [-30, -40, -30], transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const } }
        : { rotate: [7, -6, 7], transition: { duration: 4.4, repeat: Infinity, ease: "easeInOut" as const } };

  // ===== Kaki =====
  const legA = jumping
    ? { rotate: -28, transition: { type: "spring" as const, stiffness: 180, damping: 12 } }
    : { rotate: [-7, -1, -7], transition: { duration: 4.6, repeat: Infinity, ease: "easeInOut" as const } };
  const legB = jumping
    ? { rotate: 32, transition: { type: "spring" as const, stiffness: 180, damping: 12 } }
    : { rotate: [7, 1, 7], transition: { duration: 4.2, repeat: Infinity, ease: "easeInOut" as const } };

  const headAnimation = thinking ? { rotate: -10 } : { rotate: 0 };
  const visorColor = VISOR_COLOR[face];

  return (
    <motion.svg
      viewBox="0 0 220 292"
      className={className}
      animate={bodyAnimation}
      role="img"
      aria-label="Kosmo si astronaut penjelajah angkasa"
    >
      <defs>
        <linearGradient id={`${uid}-suit`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#cfd4e0" />
        </linearGradient>
        <linearGradient id={`${uid}-suitD`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d7dbe6" />
          <stop offset="100%" stopColor="#a9b0c1" />
        </linearGradient>
        <linearGradient id={`${uid}-glove`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f1f3f8" />
          <stop offset="100%" stopColor="#bcc3d2" />
        </linearGradient>
        <linearGradient id={`${uid}-visor`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#101a30" />
          <stop offset="60%" stopColor="#0a1020" />
          <stop offset="100%" stopColor="#05070d" />
        </linearGradient>
        <linearGradient id={`${uid}-pack`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b93a6" />
          <stop offset="100%" stopColor="#565e70" />
        </linearGradient>
        <linearGradient id={`${uid}-metal`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d3dae6" />
          <stop offset="100%" stopColor="#98a1b3" />
        </linearGradient>
        <radialGradient id={`${uid}-badge`} cx="35%" cy="32%" r="72%">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </radialGradient>
        <radialGradient id={`${uid}-helmet`} cx="38%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#c8cedb" />
        </radialGradient>
      </defs>

      {/* Ransel penyangga hidup (PLSS) */}
      <rect x="70" y="108" width="80" height="108" rx="22" fill={g("pack")} stroke="#454c5c" strokeWidth="2" />
      <rect x="80" y="116" width="60" height="13" rx="5" fill="#454c5c" />
      <rect x="80" y="136" width="26" height="62" rx="6" fill="#5f677a" />
      <rect x="114" y="136" width="26" height="62" rx="6" fill="#5f677a" />
      <line x1="140" y1="112" x2="150" y2="96" stroke="#454c5c" strokeWidth="3" strokeLinecap="round" />
      <motion.circle
        cx="151" cy="94" r="3.5" fill="#ef4444"
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Kaki */}
      <motion.g animate={legA} style={{ ...fillBox, originX: 0.59, originY: 0.03 }}>
        <rect x="84" y="204" width="24" height="26" rx="10" fill={g("suit")} stroke="#9aa3b5" strokeWidth="2.5" />
        <rect x="82" y="226" width="28" height="9" rx="4" fill={g("suitD")} stroke="#9aa3b5" strokeWidth="1.5" />
        <rect x="84" y="232" width="24" height="24" rx="9" fill={g("suit")} stroke="#9aa3b5" strokeWidth="2.5" />
        <rect x="84" y="238" width="24" height="6" fill="#ef4444" opacity="0.8" />
        <rect x="76" y="252" width="34" height="20" rx="9" fill={g("metal")} stroke="#7c8494" strokeWidth="2" />
        <rect x="76" y="265" width="34" height="7" rx="3" fill="#7c8494" />
      </motion.g>
      <motion.g animate={legB} style={{ ...fillBox, originX: 0.41, originY: 0.03 }}>
        <rect x="112" y="204" width="24" height="26" rx="10" fill={g("suit")} stroke="#9aa3b5" strokeWidth="2.5" />
        <rect x="110" y="226" width="28" height="9" rx="4" fill={g("suitD")} stroke="#9aa3b5" strokeWidth="1.5" />
        <rect x="112" y="232" width="24" height="24" rx="9" fill={g("suit")} stroke="#9aa3b5" strokeWidth="2.5" />
        <rect x="112" y="238" width="24" height="6" fill="#ef4444" opacity="0.8" />
        <rect x="110" y="252" width="34" height="20" rx="9" fill={g("metal")} stroke="#7c8494" strokeWidth="2" />
        <rect x="110" y="265" width="34" height="7" rx="3" fill="#7c8494" />
      </motion.g>

      {/* Lengan kiri + tangan */}
      <motion.g animate={armA} style={{ ...fillBox, originX: 0.59, originY: 0.03 }}>
        <rect x="58" y="116" width="24" height="26" rx="11" fill={g("suit")} stroke="#9aa3b5" strokeWidth="2.5" />
        <rect x="56" y="138" width="28" height="9" rx="4" fill={g("suitD")} stroke="#9aa3b5" strokeWidth="1.5" />
        <rect x="58" y="144" width="24" height="28" rx="10" fill={g("suit")} stroke="#9aa3b5" strokeWidth="2.5" />
        <rect x="58" y="148" width="24" height="7" fill="#ef4444" opacity="0.85" />
        <rect x="57" y="170" width="26" height="8" rx="3" fill="#3b82f6" />
        <path d="M59 177 Q57 177 57 183 L57 197 Q57 209 70 209 Q83 209 83 197 L83 183 Q83 177 81 177 Z" fill={g("glove")} stroke="#9aa3b5" strokeWidth="2" />
        <path d="M57 185 Q49 187 51 195 Q53 199 59 197 Z" fill={g("glove")} stroke="#9aa3b5" strokeWidth="2" />
        <path d="M64 199 L64 208 M70 200 L70 209 M76 199 L76 208" stroke="#9aa3b5" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </motion.g>

      {/* Lengan kanan + tangan */}
      <motion.g animate={armB} style={{ ...fillBox, originX: 0.4, originY: 0.03 }}>
        <rect x="138" y="116" width="24" height="26" rx="11" fill={g("suit")} stroke="#9aa3b5" strokeWidth="2.5" />
        <rect x="136" y="138" width="28" height="9" rx="4" fill={g("suitD")} stroke="#9aa3b5" strokeWidth="1.5" />
        <rect x="138" y="144" width="24" height="28" rx="10" fill={g("suit")} stroke="#9aa3b5" strokeWidth="2.5" />
        <rect x="138" y="148" width="24" height="7" fill="#ef4444" opacity="0.85" />
        <rect x="137" y="170" width="26" height="8" rx="3" fill="#3b82f6" />
        <path d="M139 177 Q137 177 137 183 L137 197 Q137 209 150 209 Q163 209 163 197 L163 183 Q163 177 161 177 Z" fill={g("glove")} stroke="#9aa3b5" strokeWidth="2" />
        <path d="M163 185 Q171 187 169 195 Q167 199 161 197 Z" fill={g("glove")} stroke="#9aa3b5" strokeWidth="2" />
        <path d="M144 199 L144 208 M150 200 L150 209 M156 199 L156 208" stroke="#9aa3b5" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </motion.g>

      {/* Bahu + torso */}
      <ellipse cx="74" cy="120" rx="17" ry="13" fill={g("suitD")} stroke="#9aa3b5" strokeWidth="2" />
      <ellipse cx="146" cy="120" rx="17" ry="13" fill={g("suitD")} stroke="#9aa3b5" strokeWidth="2" />
      <rect x="64" y="104" width="92" height="112" rx="42" fill={g("suit")} stroke="#9aa3b5" strokeWidth="3" />
      <path d="M80 118 Q110 106 140 118 Q118 111 110 111 Q102 111 80 118 Z" fill="#ffffff" opacity="0.45" />
      <path d="M70 132 Q110 124 150 132 L150 141 Q110 133 70 141 Z" fill="#ef4444" opacity="0.85" />

      {/* Panel dada */}
      <rect x="84" y="150" width="52" height="48" rx="11" fill="#dde1ea" stroke="#9aa3b5" strokeWidth="2" />
      <rect x="90" y="156" width="40" height="17" rx="4" fill="#0f172a" />
      <rect x="93" y="160" width="22" height="4" rx="2" fill="#22d3ee" />
      <rect x="93" y="166" width="14" height="3" rx="1.5" fill="#334155" />
      <circle cx="97" cy="185" r="7" fill={g("badge")} stroke="#1e40af" strokeWidth="1.5" />
      <motion.rect
        x="112" y="180" width="8" height="8" rx="2" fill="#fbbf24"
        animate={{ opacity: [1, 0.25, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.rect
        x="123" y="180" width="8" height="8" rx="2" fill="#22d3ee"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2.3, repeat: Infinity, ease: "easeInOut" }}
      />
      <rect x="112" y="191" width="19" height="5" rx="2" fill="#7c8494" />

      {/* Selang oksigen */}
      <path d="M86 152 Q64 140 74 116" stroke="#cbd5e1" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M86 152 Q64 140 74 116" stroke="#94a3b8" strokeWidth="2" fill="none" />

      {/* Kepala / helm */}
      <motion.g animate={headAnimation} style={{ ...fillBox, originX: 0.5, originY: 0.96 }}>
        <rect x="90" y="98" width="40" height="14" rx="7" fill={g("metal")} stroke="#7c8494" strokeWidth="2" />
        <rect x="59" y="56" width="11" height="22" rx="5" fill={g("metal")} stroke="#7c8494" strokeWidth="1.5" />
        <rect x="150" y="56" width="11" height="22" rx="5" fill={g("metal")} stroke="#7c8494" strokeWidth="1.5" />
        <circle cx="110" cy="62" r="47" fill={g("helmet")} stroke="#9aa3b5" strokeWidth="3.5" />
        <rect x="101" y="12" width="18" height="9" rx="3" fill={g("metal")} stroke="#7c8494" strokeWidth="1.5" />
        <circle cx="110" cy="64" r="37" fill={g("visor")} />
        <motion.circle
          cx="110" cy="64" r="37" fill="none" stroke={visorColor} strokeWidth="3"
          animate={{ opacity: [0.3, 0.85, 0.3] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <path d="M85 46 Q110 31 135 46 Q117 40 110 39 Q103 40 85 46 Z" fill="#ffffff" opacity="0.22" />
        <ellipse cx="95" cy="54" rx="9" ry="16" fill="#ffffff" opacity="0.1" transform="rotate(-18 95 54)" />
        <circle cx="126" cy="55" r="4" fill="#ffffff" opacity="0.5" />
      </motion.g>
    </motion.svg>
  );
}
