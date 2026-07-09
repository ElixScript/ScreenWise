"use client";

import { motion } from "framer-motion";

const INK = "#2D3A53";
const fillBox = { transformBox: "fill-box" } as const;

/** Wajah tersenyum yang membuat semua gadget terasa hidup dan ramah. */
function ScreenFace({ cx, cy, scale = 1 }: { cx: number; cy: number; scale?: number }) {
  const s = scale;
  return (
    <g>
      <motion.g
        animate={{ scaleY: [1, 1, 0.15, 1] }}
        transition={{ duration: 3.8, times: [0, 0.9, 0.95, 1], repeat: Infinity }}
        style={{ ...fillBox, transformOrigin: "50% 50%" }}
      >
        <circle cx={cx - 10 * s} cy={cy - 3 * s} r={4 * s} fill={INK} />
        <circle cx={cx + 10 * s} cy={cy - 3 * s} r={4 * s} fill={INK} />
      </motion.g>
      <circle cx={cx - 16 * s} cy={cy + 5 * s} r={3.4 * s} fill="#F9A8C5" />
      <circle cx={cx + 16 * s} cy={cy + 5 * s} r={3.4 * s} fill="#F9A8C5" />
      <path
        d={`M${cx - 7 * s} ${cy + 6 * s} Q${cx} ${cy + 13 * s} ${cx + 7 * s} ${cy + 6 * s}`}
        stroke={INK}
        strokeWidth={3 * s}
        strokeLinecap="round"
        fill="none"
      />
    </g>
  );
}

interface IlloProps {
  className?: string;
}

export function SmartphoneIllo({ className = "w-24" }: IlloProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="Smartphone">
      <rect x="36" y="14" width="48" height="92" rx="12" fill="#4F9DFF" />
      <rect x="41" y="24" width="38" height="66" rx="7" fill="#EAF4FF" />
      <rect x="52" y="17" width="16" height="4" rx="2" fill="#3F7FD6" />
      <circle cx="60" cy="98" r="4" fill="#EAF4FF" />
      <ScreenFace cx={60} cy={55} scale={0.9} />
    </svg>
  );
}

export function LaptopIllo({ className = "w-24" }: IlloProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="Laptop">
      <rect x="24" y="22" width="72" height="52" rx="8" fill="#B39DDB" />
      <rect x="30" y="28" width="60" height="40" rx="5" fill="#F3EEFC" />
      <path d="M16 76 L104 76 L112 92 Q112 96 106 96 L14 96 Q8 96 8 92 Z" fill="#9C82CE" />
      <rect x="48" y="80" width="24" height="7" rx="3.5" fill="#F3EEFC" />
      <ScreenFace cx={60} cy={48} scale={0.85} />
    </svg>
  );
}

export function SmartwatchIllo({ className = "w-24" }: IlloProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="Smartwatch">
      <rect x="46" y="6" width="28" height="26" rx="8" fill="#3DA75F" />
      <rect x="46" y="88" width="28" height="26" rx="8" fill="#3DA75F" />
      <rect x="32" y="28" width="56" height="64" rx="18" fill="#5CCB5F" />
      <rect x="39" y="35" width="42" height="50" rx="12" fill="#EDFBEE" />
      <circle cx="91" cy="52" r="4" fill="#3DA75F" />
      <ScreenFace cx={60} cy={58} scale={0.8} />
    </svg>
  );
}

export function TabletIllo({ className = "w-24" }: IlloProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="Tablet">
      <rect x="20" y="18" width="80" height="84" rx="12" fill="#FFB74D" />
      <rect x="27" y="26" width="66" height="68" rx="8" fill="#FFF7E8" />
      <circle cx="60" cy="98" r="3" fill="#FFF7E8" />
      <ScreenFace cx={60} cy={58} scale={1} />
    </svg>
  );
}

export const GADGET_ILLUSTRATIONS: Record<string, (props: IlloProps) => React.ReactElement> = {
  smartphone: SmartphoneIllo,
  laptop: LaptopIllo,
  smartwatch: SmartwatchIllo,
  tablet: TabletIllo,
};
