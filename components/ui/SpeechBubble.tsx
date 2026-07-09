"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SpeechBubbleProps {
  children: ReactNode;
  /** Arah ekor bubble menghadap maskot. */
  tail?: "left" | "bottom" | "right";
  className?: string;
}

const TAIL_CLASSES = {
  left: "left-0 top-1/2 -translate-x-2 -translate-y-1/2 rotate-45",
  right: "right-0 top-1/2 translate-x-2 -translate-y-1/2 rotate-45",
  bottom: "bottom-0 left-1/2 -translate-x-1/2 translate-y-2 rotate-45",
};

export default function SpeechBubble({
  children,
  tail = "left",
  className = "",
}: SpeechBubbleProps) {
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 350, damping: 18 }}
      className={`glass relative rounded-3xl px-6 py-4 shadow-soft ${className}`}
      role="status"
    >
      <span
        aria-hidden
        className={`glass absolute h-4 w-4 rounded-sm ${TAIL_CLASSES[tail]}`}
      />
      <div className="relative font-display text-lg font-semibold text-brand-ink md:text-xl">
        {children}
      </div>
    </motion.div>
  );
}
