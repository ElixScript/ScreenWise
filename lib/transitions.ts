import type { TargetAndTransition } from "framer-motion";

export interface SlideTransition {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  exit: TargetAndTransition;
}

/**
 * Ragam transisi halaman — dirotasi agar setiap perpindahan terasa baru
 * namun tetap halus dan satu keluarga gerakan.
 */
export const SLIDE_TRANSITIONS: SlideTransition[] = [
  {
    initial: { opacity: 0, y: 80, scale: 0.96 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -60, scale: 0.98 },
  },
  {
    initial: { opacity: 0, scale: 1.12, filter: "blur(10px)" },
    animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
    exit: { opacity: 0, scale: 0.94, filter: "blur(8px)" },
  },
  {
    initial: { opacity: 0, x: 160, rotate: 1.5 },
    animate: { opacity: 1, x: 0, rotate: 0 },
    exit: { opacity: 0, x: -160, rotate: -1.5 },
  },
  {
    initial: { opacity: 0, scale: 0.85, rotate: -2 },
    animate: { opacity: 1, scale: 1, rotate: 0 },
    exit: { opacity: 0, scale: 1.08, rotate: 1 },
  },
  {
    initial: { opacity: 0, y: -90 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 90 },
  },
];

export function getSlideTransition(index: number): SlideTransition {
  return SLIDE_TRANSITIONS[index % SLIDE_TRANSITIONS.length];
}
