"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useSound } from "@/hooks/useSound";

type ButtonColor = "blue" | "green" | "yellow" | "orange" | "white";

const COLOR_CLASSES: Record<ButtonColor, string> = {
  blue: "bg-gradient-to-b from-sky-400 to-brand-blue text-white",
  green: "bg-gradient-to-b from-emerald-400 to-brand-green text-white",
  yellow: "bg-gradient-to-b from-amber-300 to-brand-yellow text-brand-ink",
  orange: "bg-gradient-to-b from-orange-300 to-brand-orange text-brand-ink",
  white: "glass text-brand-ink",
};

interface BigButtonProps {
  children: ReactNode;
  onClick?: () => void;
  color?: ButtonColor;
  size?: "md" | "lg" | "xl";
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
}

const SIZE_CLASSES = {
  md: "px-6 py-3 text-lg",
  lg: "px-9 py-4 text-xl",
  xl: "px-12 py-5 text-2xl",
};

export default function BigButton({
  children,
  onClick,
  color = "blue",
  size = "lg",
  className = "",
  ariaLabel,
  disabled = false,
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
      whileHover={disabled ? undefined : { scale: 1.06, y: -2 }}
      whileTap={disabled ? undefined : { scale: 0.93 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`inline-flex min-h-[44px] cursor-pointer items-center justify-center gap-3 rounded-full font-display font-bold shadow-pop transition-shadow hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 ${COLOR_CLASSES[color]} ${SIZE_CLASSES[size]} ${className}`}
    >
      {children}
    </motion.button>
  );
}
