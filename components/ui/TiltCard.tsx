"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import type { PointerEvent, ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
  /** Derajat kemiringan maksimum mengikuti kursor. */
  maxTilt?: number;
}

/**
 * Kartu 3D: miring halus mengikuti posisi kursor (tilt effect),
 * dengan spring supaya gerakan terasa premium — bukan kaku.
 */
export default function TiltCard({
  children,
  onClick,
  className = "",
  ariaLabel,
  disabled = false,
  maxTilt = 10,
}: TiltCardProps) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 260, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 260, damping: 20 });

  const handlePointerMove = (e: PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType === "touch") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = (e.clientX - rect.left) / rect.width - 0.5;
    const dy = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(dx * maxTilt * 2);
    rotateX.set(-dy * maxTilt * 2);
  };

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 900 }}
      whileHover={disabled ? undefined : { scale: 1.03, z: 10 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      className={`cursor-pointer text-left [transform-style:preserve-3d] disabled:cursor-default ${className}`}
    >
      {children}
    </motion.button>
  );
}
