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
  left: "left-0 top-1/2 -translate-x-2 -translate-y-1/2 rotate-45 border-b border-l",
  right: "right-0 top-1/2 translate-x-2 -translate-y-1/2 rotate-45 border-r border-t",
  bottom: "bottom-0 left-1/2 -translate-x-1/2 translate-y-2 rotate-45 border-b border-r",
};

/** Panel dialog maskot: kaca gelap dengan tepi bercahaya halus. */
export default function SpeechBubble({
  children,
  tail = "left",
  className = "",
}: SpeechBubbleProps) {
  return (
    <motion.div
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 350, damping: 18 }}
      className={`glass-bright relative rounded-2xl px-6 py-4 ${className}`}
      role="status"
    >
      <span
        aria-hidden
        className={`glass-bright absolute h-4 w-4 rounded-[3px] border-white/20 ${TAIL_CLASSES[tail]}`}
      />
      <div className="relative font-display text-lg font-semibold text-ink-bright md:text-xl">
        {children}
      </div>
    </motion.div>
  );
}
