"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface InteractiveCardProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  /** Kemiringan halus saat hover, bergantian kiri/kanan berdasarkan index. */
  tiltIndex?: number;
  ariaLabel?: string;
  disabled?: boolean;
}

/** Kartu interaktif dengan efek angkat + tilt ringan saat hover. */
export default function InteractiveCard({
  children,
  onClick,
  className = "",
  tiltIndex = 0,
  ariaLabel,
  disabled = false,
}: InteractiveCardProps) {
  const tilt = tiltIndex % 2 === 0 ? 1.2 : -1.2;

  return (
    <motion.button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { y: -10, rotate: tilt, scale: 1.03 }}
      whileTap={disabled ? undefined : { scale: 0.95 }}
      transition={{ type: "spring", stiffness: 320, damping: 20 }}
      className={`cursor-pointer rounded-blob text-left shadow-soft transition-shadow hover:shadow-pop disabled:cursor-default ${className}`}
    >
      {children}
    </motion.button>
  );
}
