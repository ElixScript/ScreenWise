"use client";

import { motion } from "framer-motion";

export type MascotPose = "idle" | "wave" | "cheer" | "think" | "jump";
export type MascotFace = "happy" | "excited" | "think";

interface MascotProps {
  pose?: MascotPose;
  face?: MascotFace;
  className?: string;
}

const fillBox = { transformBox: "fill-box" } as const;

/**
 * Bimo v2 — robot melayang bergaya game modern.
 * Visor gelap dengan mata neon, energy core, dan thruster glow.
 */
export default function Mascot({
  pose = "idle",
  face = "happy",
  className = "w-40",
}: MascotProps) {
  const cheering = pose === "cheer";
  const waving = pose === "wave";
  const thinking = pose === "think";
  const jumping = pose === "jump";

  const bodyAnimation = jumping
    ? { y: [0, -30, 0, -20, 0], transition: { duration: 1, ease: "easeOut" as const } }
    : cheering
      ? { y: [0, -14, 0], transition: { duration: 0.55, repeat: Infinity, ease: "easeInOut" as const } }
      : { y: [0, -9, 0], transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut" as const } };

  const rightArmAnimation = waving
    ? { rotate: [0, -60, -30, -60, 0], transition: { duration: 1.6, repeat: Infinity, repeatDelay: 0.8, ease: "easeInOut" as const } }
    : cheering
      ? { rotate: -150, transition: { type: "spring" as const, stiffness: 200, damping: 12 } }
      : thinking
        ? { rotate: -100, transition: { duration: 0.4 } }
        : { rotate: 0 };

  const leftArmAnimation = cheering
    ? { rotate: 150, transition: { type: "spring" as const, stiffness: 200, damping: 12 } }
    : { rotate: [0, 5, 0], transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut" as const } };

  return (
    <motion.svg
      viewBox="0 0 200 220"
      className={className}
      animate={bodyAnimation}
      role="img"
      aria-label="Bimo si robot pintar"
    >
      <defs>
        <linearGradient id="bimo-shell" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="55%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
        <linearGradient id="bimo-visor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0b1130" />
          <stop offset="100%" stopColor="#141c46" />
        </linearGradient>
        <radialGradient id="bimo-thrust" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#67e8f9" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Thruster glow di bawah (melayang, bukan berdiri) */}
      <motion.ellipse
        cx="100"
        cy="204"
        rx="34"
        ry="10"
        fill="url(#bimo-thrust)"
        animate={{ opacity: [0.5, 1, 0.5], scaleX: [0.85, 1.1, 0.85] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        style={{ ...fillBox, transformOrigin: "50% 50%" }}
      />

      {/* Antena dengan orb neon */}
      <line x1="100" y1="52" x2="100" y2="30" stroke="#4f46e5" strokeWidth="6" strokeLinecap="round" />
      <motion.circle
        cx="100"
        cy="24"
        r="8"
        fill="#22d3ee"
        animate={{ opacity: [0.6, 1, 0.6], scale: [0.9, 1.2, 0.9] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        style={{ ...fillBox, transformOrigin: "50% 50%" }}
      />
      <circle cx="100" cy="24" r="14" fill="#22d3ee" opacity="0.18" />

      {/* Lengan kiri */}
      <motion.g animate={leftArmAnimation} style={{ ...fillBox, transformOrigin: "80% 15%" }}>
        <rect x="16" y="104" width="22" height="52" rx="11" fill="#4338ca" />
        <circle cx="27" cy="154" r="10" fill="#818cf8" />
      </motion.g>

      {/* Lengan kanan (melambai) */}
      <motion.g animate={rightArmAnimation} style={{ ...fillBox, transformOrigin: "20% 15%" }}>
        <rect x="162" y="104" width="22" height="52" rx="11" fill="#4338ca" />
        <circle cx="173" cy="154" r="10" fill="#818cf8" />
      </motion.g>

      {/* Badan utama */}
      <rect x="38" y="52" width="124" height="144" rx="50" fill="url(#bimo-shell)" />
      <rect x="38" y="52" width="124" height="144" rx="50" fill="none" stroke="#312e81" strokeWidth="3" />
      {/* Glossy highlight */}
      <path
        d="M58 70 Q100 56 142 70 Q140 62 100 60 Q60 62 58 70 Z"
        fill="#c7d2fe"
        opacity="0.6"
      />

      {/* Panel telinga */}
      <rect x="30" y="100" width="12" height="28" rx="6" fill="#312e81" />
      <rect x="158" y="100" width="12" height="28" rx="6" fill="#312e81" />
      <circle cx="36" cy="114" r="3" fill="#22d3ee" />
      <circle cx="164" cy="114" r="3" fill="#22d3ee" />

      {/* Visor */}
      <rect x="54" y="74" width="92" height="62" rx="26" fill="url(#bimo-visor)" />
      <rect x="54" y="74" width="92" height="62" rx="26" fill="none" stroke="#22d3ee" strokeWidth="1.5" opacity="0.5" />

      {/* Mata neon */}
      {face === "think" ? (
        <g>
          <rect x="72" y="98" width="18" height="7" rx="3.5" fill="#67e8f9" />
          <rect x="110" y="94" width="18" height="10" rx="5" fill="#67e8f9" />
        </g>
      ) : (
        <motion.g
          animate={{ scaleY: [1, 1, 0.12, 1] }}
          transition={{ duration: 3.6, times: [0, 0.92, 0.96, 1], repeat: Infinity }}
          style={{ ...fillBox, transformOrigin: "50% 50%" }}
        >
          {face === "excited" ? (
            <g fill="#67e8f9">
              {/* Mata bintang saat excited */}
              <path d="M81 92 L84.5 100 L93 101 L86.5 106.5 L88.5 115 L81 110.5 L73.5 115 L75.5 106.5 L69 101 L77.5 100 Z" />
              <path d="M119 92 L122.5 100 L131 101 L124.5 106.5 L126.5 115 L119 110.5 L111.5 115 L113.5 106.5 L107 101 L115.5 100 Z" />
            </g>
          ) : (
            <g fill="#67e8f9">
              <rect x="72" y="92" width="18" height="22" rx="9" />
              <rect x="110" y="92" width="18" height="22" rx="9" />
              <rect x="76" y="95" width="6" height="7" rx="3" fill="#e0faff" />
              <rect x="114" y="95" width="6" height="7" rx="3" fill="#e0faff" />
            </g>
          )}
        </motion.g>
      )}

      {/* Mulut neon */}
      {face === "excited" ? (
        <path d="M88 120 Q100 132 112 120" stroke="#67e8f9" strokeWidth="5" strokeLinecap="round" fill="none" />
      ) : face === "think" ? (
        <path d="M92 124 Q100 121 108 124" stroke="#67e8f9" strokeWidth="4" strokeLinecap="round" fill="none" />
      ) : (
        <path d="M90 121 Q100 129 110 121" stroke="#67e8f9" strokeWidth="4.5" strokeLinecap="round" fill="none" />
      )}

      {/* Energy core */}
      <motion.g
        animate={{ scale: [1, 1.18, 1], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ ...fillBox, transformOrigin: "50% 50%" }}
      >
        <path d="M100 150 L110 162 L100 174 L90 162 Z" fill="#22d3ee" />
        <path d="M100 150 L110 162 L100 174 L90 162 Z" fill="none" stroke="#a5f3fc" strokeWidth="2" />
      </motion.g>
      <circle cx="100" cy="162" r="18" fill="#22d3ee" opacity="0.15" />
    </motion.svg>
  );
}
