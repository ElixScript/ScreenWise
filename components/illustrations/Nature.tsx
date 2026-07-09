"use client";

import { motion } from "framer-motion";

const fillBox = { transformBox: "fill-box" } as const;

export function Sun({ className = "w-24" }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 120 120"
      className={className}
      animate={{ scale: [1, 1.06, 1] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden
    >
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        style={{ ...fillBox, transformOrigin: "50% 50%" }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <rect
            key={i}
            x="57"
            y="2"
            width="6"
            height="16"
            rx="3"
            fill="#FFD54F"
            transform={`rotate(${i * 30} 60 60)`}
          />
        ))}
      </motion.g>
      <circle cx="60" cy="60" r="30" fill="#FFD54F" />
      <circle cx="60" cy="60" r="30" fill="none" stroke="#F6B93B" strokeWidth="3" />
      <circle cx="51" cy="56" r="3.5" fill="#5C4a1d" />
      <circle cx="69" cy="56" r="3.5" fill="#5C4a1d" />
      <path d="M50 66 Q60 75 70 66" stroke="#5C4a1d" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <circle cx="45" cy="63" r="3.5" fill="#FFB74D" opacity="0.8" />
      <circle cx="75" cy="63" r="3.5" fill="#FFB74D" opacity="0.8" />
    </motion.svg>
  );
}

export function Cloud({ className = "w-28" }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 70" className={className} aria-hidden>
      <path
        d="M30 60 A22 22 0 0 1 42 22 A26 26 0 0 1 90 18 A20 20 0 0 1 115 60 Z"
        fill="#FFFFFF"
        opacity="0.95"
      />
      <ellipse cx="70" cy="58" rx="52" ry="10" fill="#E3F0FF" opacity="0.6" />
    </svg>
  );
}

export function Bird({ className = "w-12", color = "#FF8FAB" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 60 48" className={className} aria-hidden>
      <ellipse cx="28" cy="28" rx="16" ry="13" fill={color} />
      <circle cx="42" cy="20" r="9" fill={color} />
      <path d="M49 19 L57 22 L49 25 Z" fill="#FFB74D" />
      <circle cx="44" cy="18" r="2" fill="#2D3A53" />
      <motion.path
        d="M24 26 Q14 12 30 16 Z"
        fill="#E56B8C"
        animate={{ rotate: [0, -24, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ ...fillBox, transformOrigin: "80% 90%" }}
      />
      <path d="M14 30 Q4 28 8 36" stroke="#E56B8C" strokeWidth="4" strokeLinecap="round" fill="none" />
    </svg>
  );
}

const BALLOON_COLORS: Record<string, { body: string; dark: string }> = {
  red: { body: "#FF8FAB", dark: "#E56B8C" },
  yellow: { body: "#FFD54F", dark: "#F6B93B" },
  blue: { body: "#7FB9FF", dark: "#4F9DFF" },
  green: { body: "#8CE08E", dark: "#5CCB5F" },
  purple: { body: "#C9B6E8", dark: "#B39DDB" },
};

export function Balloon({
  className = "w-12",
  color = "red",
}: {
  className?: string;
  color?: keyof typeof BALLOON_COLORS;
}) {
  const c = BALLOON_COLORS[color] ?? BALLOON_COLORS.red;
  return (
    <svg viewBox="0 0 60 110" className={className} aria-hidden>
      <motion.path
        d="M30 78 Q26 90 30 100 Q34 106 30 108"
        stroke={c.dark}
        strokeWidth="2.5"
        fill="none"
        animate={{ d: [
          "M30 78 Q26 90 30 100 Q34 106 30 108",
          "M30 78 Q34 90 30 100 Q26 106 30 108",
          "M30 78 Q26 90 30 100 Q34 106 30 108",
        ] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <ellipse cx="30" cy="42" rx="24" ry="30" fill={c.body} />
      <path d="M30 72 L25 80 L35 80 Z" fill={c.dark} />
      <ellipse cx="22" cy="30" rx="7" ry="11" fill="#FFFFFF" opacity="0.45" transform="rotate(-18 22 30)" />
    </svg>
  );
}

export function Rainbow({ className = "w-64" }: { className?: string }) {
  const bands = [
    { r: 90, color: "#FF8FAB" },
    { r: 76, color: "#FFB74D" },
    { r: 62, color: "#FFD54F" },
    { r: 48, color: "#8CE08E" },
    { r: 34, color: "#7FB9FF" },
  ];
  return (
    <svg viewBox="0 0 200 100" className={className} aria-hidden>
      {bands.map((b) => (
        <path
          key={b.color}
          d={`M ${100 - b.r} 100 A ${b.r} ${b.r} 0 0 1 ${100 + b.r} 100`}
          stroke={b.color}
          strokeWidth="13"
          fill="none"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

/** Hamparan rumput bergelombang dengan helai yang bergoyang pelan. */
export function GrassStrip({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className={`block w-full ${className}`}
      aria-hidden
    >
      <path
        d="M0 60 Q180 20 360 55 Q540 90 720 50 Q900 15 1080 55 Q1260 90 1440 45 L1440 120 L0 120 Z"
        fill="#8CE08E"
      />
      <path
        d="M0 80 Q240 45 480 75 Q720 100 960 70 Q1200 45 1440 75 L1440 120 L0 120 Z"
        fill="#5CCB5F"
      />
      {[120, 320, 560, 760, 980, 1180, 1340].map((x, i) => (
        <motion.g
          key={x}
          animate={{ rotate: [-4, 4, -4] }}
          transition={{ duration: 3 + (i % 3), repeat: Infinity, ease: "easeInOut" }}
          style={{ ...fillBox, transformOrigin: "50% 100%" }}
        >
          <path
            d={`M${x} 95 Q${x - 6} 70 ${x - 2} 52 M${x} 95 Q${x + 8} 72 ${x + 12} 58`}
            stroke="#3DA75F"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
        </motion.g>
      ))}
      {[220, 660, 1080].map((x) => (
        <g key={x}>
          <circle cx={x} cy="88" r="7" fill="#FFD54F" />
          <circle cx={x - 9} cy="84" r="5" fill="#FF8FAB" />
          <circle cx={x + 9} cy="84" r="5" fill="#FF8FAB" />
          <circle cx={x} cy="79" r="5" fill="#FF8FAB" />
        </g>
      ))}
    </svg>
  );
}

export function TreeIllo({ className = "w-24" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 130" className={className} aria-hidden>
      <rect x="44" y="80" width="12" height="40" rx="5" fill="#B07B4F" />
      <motion.g
        animate={{ rotate: [-1.5, 1.5, -1.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ ...fillBox, transformOrigin: "50% 90%" }}
      >
        <circle cx="50" cy="52" r="34" fill="#5CCB5F" />
        <circle cx="28" cy="64" r="20" fill="#8CE08E" />
        <circle cx="72" cy="64" r="20" fill="#8CE08E" />
        <circle cx="40" cy="44" r="4" fill="#FF8FAB" />
        <circle cx="62" cy="56" r="4" fill="#FFD54F" />
        <circle cx="52" cy="68" r="4" fill="#FF8FAB" />
      </motion.g>
    </svg>
  );
}
