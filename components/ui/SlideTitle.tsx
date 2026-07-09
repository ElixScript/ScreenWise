"use client";

import { motion } from "framer-motion";

interface SlideTitleProps {
  emoji: string;
  title: string;
  subtitle?: string;
  className?: string;
}

/** Judul halaman dengan badge emoji yang melompat masuk. */
export default function SlideTitle({ emoji, title, subtitle, className = "" }: SlideTitleProps) {
  return (
    <div className={`flex flex-col items-center gap-2 text-center ${className}`}>
      <motion.span
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 12, delay: 0.1 }}
        className="glass flex h-16 w-16 items-center justify-center rounded-full text-4xl shadow-soft md:h-20 md:w-20 md:text-5xl"
        aria-hidden
      >
        {emoji}
      </motion.span>
      <motion.h2
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.2 }}
        className="text-4xl font-bold text-brand-ink md:text-5xl lg:text-6xl"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="max-w-2xl text-lg font-semibold text-brand-ink/70 md:text-xl"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
