"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useSound } from "@/hooks/useSound";

type ButtonColor = "cyan" | "violet" | "pink" | "amber" | "lime" | "ghost";

const COLOR_CLASSES: Record<ButtonColor, string> = {
  cyan: "bg-gradient-to-b from-cyan-400 to-blue-600 text-white shadow-glow-cyan ring-cyan-300/40",
  violet: "bg-gradient-to-b from-violet-400 to-indigo-600 text-white shadow-glow-violet ring-violet-300/40",
  pink: "bg-gradient-to-b from-pink-400 to-rose-600 text-white shadow-glow-pink ring-pink-300/40",
  amber: "bg-gradient-to-b from-amber-300 to-orange-500 text-deep shadow-glow-amber ring-amber-200/50",
  lime: "bg-gradient-to-b from-lime-300 to-emerald-500 text-deep shadow-glow-lime ring-lime-200/50",
  ghost: "glass text-ink-bright ring-white/10",
};

interface BigButtonProps {
  children: ReactNode;
  onClick?: () => void;
  color?: ButtonColor;
  size?: "md" | "lg" | "xl";
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
  /** Efek kilau menyapu permukaan tombol. */
  shine?: boolean;
}

const SIZE_CLASSES = {
  md: "px-6 py-3 text-lg",
  lg: "px-9 py-4 text-xl",
  xl: "px-12 py-5 text-2xl",
};

/** Tombol utama bergaya game: gradient pekat, glow, shine sweep, press feel. */
export default function BigButton({
  children,
  onClick,
  color = "cyan",
  size = "lg",
  className = "",
  ariaLabel,
  disabled = false,
  shine = true,
}: BigButtonProps) {
  const { play } = useSound();

  return (
    <motion.button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => {
        play("click");
        onClick?.();
      }}
      whileHover={disabled ? undefined : { scale: 1.05, y: -2 }}
      whileTap={disabled ? undefined : { scale: 0.94, y: 1 }}
      transition={{ type: "spring", stiffness: 420, damping: 18 }}
      className={`relative inline-flex min-h-[48px] cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-2xl font-display font-bold uppercase tracking-wide ring-2 disabled:cursor-not-allowed disabled:opacity-40 ${
        shine && !disabled ? "shine" : ""
      } ${COLOR_CLASSES[color]} ${SIZE_CLASSES[size]} ${className}`}
    >
      {/* Highlight atas ala tombol game console */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-2 top-1 h-1/3 rounded-full bg-white/25 blur-[2px]"
      />
      <span className="relative flex items-center gap-3">{children}</span>
    </motion.button>
  );
}
