"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { SLIDES } from "@/lib/slides";

interface NavBarProps {
  index: number;
  onPrev: () => void;
  onNext: () => void;
  onJump: (i: number) => void;
}

/** HUD bawah ala peta level game: node bernomor + panah navigasi. */
export default function NavBar({ index, onPrev, onNext, onJump }: NavBarProps) {
  const isFirst = index === 0;
  const isLast = index === SLIDES.length - 1;

  return (
    <div className="absolute bottom-3 left-1/2 z-40 flex w-full max-w-3xl -translate-x-1/2 items-center justify-center gap-2 px-3 md:bottom-5 md:px-4">
      <motion.button
        type="button"
        onClick={onPrev}
        disabled={isFirst}
        whileHover={isFirst ? undefined : { scale: 1.12, x: -3 }}
        whileTap={isFirst ? undefined : { scale: 0.9 }}
        className="glass flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full text-ink-bright disabled:cursor-default disabled:opacity-30"
        aria-label="Halaman sebelumnya"
      >
        <ChevronLeft size={26} strokeWidth={3} />
      </motion.button>

      <div className="glass no-scrollbar flex min-w-0 items-center gap-1 overflow-x-auto rounded-full px-3 py-2 md:gap-1.5">
        {SLIDES.map((slide, i) => {
          const isActive = i === index;
          const isDone = i < index;
          return (
            <div key={slide.id} className="flex shrink-0 items-center">
              <motion.button
                type="button"
                onClick={() => onJump(i)}
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
                animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                className={`flex h-8 shrink-0 cursor-pointer items-center justify-center rounded-full font-ui text-xs font-bold transition-all md:h-9 md:text-sm ${
                  isActive
                    ? "w-auto gap-1.5 bg-gradient-to-r from-cyan-400 to-blue-600 px-3.5 text-white shadow-glow-cyan"
                    : isDone
                      ? "w-8 bg-emerald-400/25 text-emerald-300 md:w-9"
                      : "w-8 bg-white/8 text-ink-dim md:w-9"
                }`}
                aria-label={`Ke level ${i + 1}: ${slide.title}`}
                aria-current={isActive ? "page" : undefined}
              >
                {isDone ? (
                  <Check className="h-4 w-4" strokeWidth={3} aria-hidden />
                ) : (
                  <span aria-hidden>{i + 1}</span>
                )}
                {isActive && (
                  <span className="hidden whitespace-nowrap font-ui text-xs font-bold md:inline">
                    {slide.title}
                  </span>
                )}
              </motion.button>
              {i < SLIDES.length - 1 && (
                <span
                  aria-hidden
                  className={`mx-0.5 h-0.5 w-2.5 rounded-full md:w-4 ${
                    i < index ? "bg-emerald-400/50" : "bg-white/10"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      <motion.button
        type="button"
        onClick={onNext}
        disabled={isLast}
        whileHover={isLast ? undefined : { scale: 1.12, x: 3 }}
        whileTap={isLast ? undefined : { scale: 0.9 }}
        animate={
          isLast
            ? undefined
            : { boxShadow: ["0 0 0 0 rgba(34,211,238,0.55)", "0 0 0 12px rgba(34,211,238,0)"] }
        }
        transition={{ duration: 1.6, repeat: Infinity }}
        className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full bg-gradient-to-b from-cyan-400 to-blue-600 text-white shadow-glow-cyan disabled:cursor-default disabled:opacity-30"
        aria-label="Halaman berikutnya"
      >
        <ChevronRight size={26} strokeWidth={3} />
      </motion.button>
    </div>
  );
}
