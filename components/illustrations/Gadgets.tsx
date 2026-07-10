"use client";

import { motion } from "framer-motion";

const fillBox = { transformBox: "fill-box" } as const;

/** Layar menyala dengan konten abstrak — kesan perangkat premium yang hidup. */
function ScreenContent({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <g>
      <motion.rect
        x={x + w * 0.12}
        y={y + h * 0.16}
        width={w * 0.5}
        height={h * 0.1}
        rx={h * 0.05}
        fill="#67e8f9"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <rect x={x + w * 0.12} y={y + h * 0.36} width={w * 0.76} height={h * 0.07} rx={h * 0.035} fill="#ffffff" opacity="0.35" />
      <rect x={x + w * 0.12} y={y + h * 0.5} width={w * 0.6} height={h * 0.07} rx={h * 0.035} fill="#ffffff" opacity="0.22" />
      <motion.circle
        cx={x + w * 0.78}
        cy={y + h * 0.76}
        r={Math.min(w, h) * 0.1}
        fill="#f472b6"
        animate={{ scale: [1, 1.25, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        style={{ ...fillBox, transformOrigin: "50% 50%" }}
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
      <defs>
        <linearGradient id="g-phone" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
      </defs>
      <rect x="38" y="12" width="44" height="96" rx="12" fill="url(#g-phone)" opacity="0.25" transform="translate(4 4)" />
      <rect x="36" y="10" width="44" height="96" rx="12" fill="#10173a" stroke="url(#g-phone)" strokeWidth="2.5" />
      <rect x="41" y="20" width="34" height="72" rx="6" fill="#141c46" />
      <ScreenContent x={41} y={20} w={34} h={72} />
      <rect x="52" y="13" width="12" height="3.5" rx="1.75" fill="#22d3ee" opacity="0.7" />
      <rect x="50" y="97" width="16" height="4" rx="2" fill="#22d3ee" opacity="0.5" />
    </svg>
  );
}

export function LaptopIllo({ className = "w-24" }: IlloProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="Laptop">
      <defs>
        <linearGradient id="g-laptop" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
      </defs>
      <rect x="26" y="20" width="68" height="50" rx="8" fill="#10173a" stroke="url(#g-laptop)" strokeWidth="2.5" />
      <rect x="31" y="26" width="58" height="38" rx="4" fill="#141c46" />
      <ScreenContent x={31} y={26} w={58} h={38} />
      <path d="M14 76 L106 76 L114 90 Q114 95 107 95 L13 95 Q6 95 6 90 Z" fill="#1b2352" stroke="#a78bfa" strokeWidth="2" />
      <rect x="46" y="79" width="28" height="6" rx="3" fill="#a78bfa" opacity="0.6" />
    </svg>
  );
}

export function SmartwatchIllo({ className = "w-24" }: IlloProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="Smartwatch">
      <defs>
        <linearGradient id="g-watch" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>
      <rect x="46" y="6" width="28" height="24" rx="8" fill="#1b2352" stroke="#4ade80" strokeWidth="2" />
      <rect x="46" y="90" width="28" height="24" rx="8" fill="#1b2352" stroke="#4ade80" strokeWidth="2" />
      <rect x="32" y="26" width="56" height="68" rx="18" fill="#10173a" stroke="url(#g-watch)" strokeWidth="2.5" />
      <rect x="39" y="34" width="42" height="52" rx="12" fill="#141c46" />
      {/* Ring aktivitas ala smartwatch */}
      <motion.circle
        cx="60"
        cy="60"
        r="14"
        fill="none"
        stroke="#4ade80"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="66 22"
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "60px 60px" }}
      />
      <circle cx="60" cy="60" r="7" fill="#4ade80" opacity="0.35" />
      <rect x="90" y="50" width="5" height="12" rx="2.5" fill="#4ade80" />
    </svg>
  );
}

export function TabletIllo({ className = "w-24" }: IlloProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="Tablet">
      <defs>
        <linearGradient id="g-tablet" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
      </defs>
      <rect x="20" y="16" width="80" height="88" rx="12" fill="#10173a" stroke="url(#g-tablet)" strokeWidth="2.5" />
      <rect x="27" y="24" width="66" height="66" rx="6" fill="#141c46" />
      <ScreenContent x={27} y={24} w={66} h={66} />
      <circle cx="60" cy="97" r="3.5" fill="#fbbf24" opacity="0.7" />
    </svg>
  );
}

export const GADGET_ILLUSTRATIONS: Record<string, (props: IlloProps) => React.ReactElement> = {
  smartphone: SmartphoneIllo,
  laptop: LaptopIllo,
  smartwatch: SmartwatchIllo,
  tablet: TabletIllo,
};
