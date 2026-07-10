"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface SlideTitleProps {
  /** Label kecil ala HUD game, mis. "LEVEL 03 — MISI PENGETAHUAN". */
  kicker: string;
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  /** Judul emas untuk momen reward. */
  gold?: boolean;
  className?: string;
}

/** Judul halaman bergaya game: kicker chip + judul gradient besar. */
export default function SlideTitle({
  kicker,
  title,
  subtitle,
  icon: Icon,
  gold = false,
  className = "",
}: SlideTitleProps) {
  return (
    <div className={`flex flex-col items-center gap-3 text-center ${className}`}>
      <motion.span
        initial={{ opacity: 0, y: -16, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
        className="glass flex items-center gap-2 rounded-full px-4 py-1.5 font-ui text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300 md:text-sm"
      >
        {Icon && <Icon className="h-4 w-4 md:h-5 md:w-5" strokeWidth={2.5} aria-hidden />}
        {kicker}
      </motion.span>

      <motion.h2
        initial={{ y: 28, opacity: 0, filter: "blur(8px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        transition={{ type: "spring", stiffness: 180, damping: 20, delay: 0.22 }}
        className={`text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl ${
          gold ? "text-gradient-gold" : "text-gradient"
        }`}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="max-w-2xl text-lg font-semibold text-ink-dim md:text-xl"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
