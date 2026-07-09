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
 * Bimo si Robot Pintar — maskot presentasi.
 * SVG orisinal, digerakkan penuh dengan Framer Motion.
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
    ? { y: [0, -26, 0, -18, 0], transition: { duration: 1, ease: "easeOut" as const } }
    : cheering
      ? { y: [0, -12, 0], transition: { duration: 0.55, repeat: Infinity, ease: "easeInOut" as const } }
      : { y: [0, -6, 0], transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const } };

  const rightArmAnimation = waving
    ? { rotate: [0, -60, -30, -60, 0], transition: { duration: 1.6, repeat: Infinity, repeatDelay: 0.8, ease: "easeInOut" as const } }
    : cheering
      ? { rotate: -150, transition: { type: "spring" as const, stiffness: 200, damping: 12 } }
      : thinking
        ? { rotate: -100, transition: { duration: 0.4 } }
        : { rotate: 0 };

  const leftArmAnimation = cheering
    ? { rotate: 150, transition: { type: "spring" as const, stiffness: 200, damping: 12 } }
    : { rotate: [0, 4, 0], transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const } };

  return (
    <motion.svg
      viewBox="0 0 200 232"
      className={className}
      animate={bodyAnimation}
      role="img"
      aria-label="Bimo si robot pintar"
    >
      <defs>
        <linearGradient id="bimo-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8AC2FF" />
          <stop offset="100%" stopColor="#4F9DFF" />
        </linearGradient>
        <linearGradient id="bimo-screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#EAF4FF" />
        </linearGradient>
      </defs>

      {/* Bayangan */}
      <motion.ellipse
        cx="100"
        cy="222"
        rx="50"
        ry="9"
        fill="#2D3A53"
        opacity="0.12"
        animate={{ scaleX: [1, 0.9, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ ...fillBox, transformOrigin: "50% 50%" }}
      />

      {/* Antena + bintang */}
      <line x1="100" y1="58" x2="100" y2="34" stroke="#3F7FD6" strokeWidth="6" strokeLinecap="round" />
      <motion.g
        animate={{ rotate: [0, 12, -12, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ ...fillBox, transformOrigin: "50% 50%" }}
      >
        <path
          d="M100 8 L104.7 20.5 L118 21.2 L107.6 29.6 L111 42.5 L100 35.2 L89 42.5 L92.4 29.6 L82 21.2 L95.3 20.5 Z"
          fill="#FFD54F"
          stroke="#F6B93B"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </motion.g>

      {/* Lengan kiri */}
      <motion.g
        animate={leftArmAnimation}
        style={{ ...fillBox, transformOrigin: "80% 15%" }}
      >
        <rect x="18" y="108" width="22" height="54" rx="11" fill="#3F7FD6" />
        <circle cx="29" cy="160" r="9" fill="#8AC2FF" />
      </motion.g>

      {/* Lengan kanan (melambai) */}
      <motion.g
        animate={rightArmAnimation}
        style={{ ...fillBox, transformOrigin: "20% 15%" }}
      >
        <rect x="160" y="108" width="22" height="54" rx="11" fill="#3F7FD6" />
        <circle cx="171" cy="160" r="9" fill="#8AC2FF" />
      </motion.g>

      {/* Kaki */}
      <rect x="66" y="196" width="26" height="20" rx="10" fill="#3F7FD6" />
      <rect x="108" y="196" width="26" height="20" rx="10" fill="#3F7FD6" />

      {/* Badan */}
      <rect x="40" y="58" width="120" height="146" rx="52" fill="url(#bimo-body)" />
      <rect x="40" y="58" width="120" height="146" rx="52" fill="none" stroke="#3F7FD6" strokeWidth="3" />

      {/* Telinga bulat */}
      <circle cx="40" cy="112" r="9" fill="#3F7FD6" />
      <circle cx="160" cy="112" r="9" fill="#3F7FD6" />

      {/* Layar wajah */}
      <rect x="57" y="80" width="86" height="66" rx="27" fill="url(#bimo-screen)" />

      {/* Mata */}
      {face === "think" ? (
        <>
          <circle cx="81" cy="106" r="8" fill="#2D3A53" />
          <circle cx="119" cy="106" r="8" fill="#2D3A53" />
          <circle cx="84" cy="103" r="2.6" fill="#FFFFFF" />
          <circle cx="122" cy="103" r="2.6" fill="#FFFFFF" />
        </>
      ) : (
        <motion.g
          animate={{ scaleY: [1, 1, 0.1, 1] }}
          transition={{ duration: 3.4, times: [0, 0.92, 0.96, 1], repeat: Infinity }}
          style={{ ...fillBox, transformOrigin: "50% 50%" }}
        >
          <circle cx="81" cy="110" r="9" fill="#2D3A53" />
          <circle cx="119" cy="110" r="9" fill="#2D3A53" />
          <circle cx="84" cy="107" r="3" fill="#FFFFFF" />
          <circle cx="122" cy="107" r="3" fill="#FFFFFF" />
        </motion.g>
      )}

      {/* Pipi */}
      <circle cx="70" cy="124" r="6" fill="#F9A8C5" opacity="0.85" />
      <circle cx="130" cy="124" r="6" fill="#F9A8C5" opacity="0.85" />

      {/* Mulut */}
      {face === "excited" ? (
        <path d="M88 126 Q100 142 112 126 Z" fill="#2D3A53" />
      ) : face === "think" ? (
        <path d="M92 132 Q100 130 108 132" stroke="#2D3A53" strokeWidth="4" strokeLinecap="round" fill="none" />
      ) : (
        <path d="M88 126 Q100 138 112 126" stroke="#2D3A53" strokeWidth="4.5" strokeLinecap="round" fill="none" />
      )}

      {/* Panel dada dengan hati */}
      <rect x="76" y="158" width="48" height="34" rx="15" fill="#FFFFFF" opacity="0.4" />
      <motion.path
        d="M100 184 C96 179 88 176 88 170.5 C88 166.5 91.5 164.5 94.5 165.5 C96.8 166.3 99 168.5 100 170 C101 168.5 103.2 166.3 105.5 165.5 C108.5 164.5 112 166.5 112 170.5 C112 176 104 179 100 184 Z"
        fill="#F87BA5"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        style={{ ...fillBox, transformOrigin: "50% 50%" }}
      />
    </motion.svg>
  );
}
