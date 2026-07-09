"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SLIDES } from "@/lib/slides";

interface NavBarProps {
  index: number;
  onPrev: () => void;
  onNext: () => void;
  onJump: (i: number) => void;
}

/** Navigasi bawah: panah besar + jejak perjalanan belajar berbentuk titik emoji. */
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
        className="glass flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full text-brand-ink shadow-soft disabled:cursor-default disabled:opacity-30"
        aria-label="Halaman sebelumnya"
      >
        <ChevronLeft size={26} strokeWidth={3} />
      </motion.button>

      <div className="glass no-scrollbar flex min-w-0 items-center gap-1 overflow-x-auto rounded-full px-3 py-2 shadow-soft md:gap-1.5">
        {SLIDES.map((slide, i) => {
          const isActive = i === index;
          return (
            <motion.button
              key={slide.id}
              type="button"
              onClick={() => onJump(i)}
              whileHover={{ scale: 1.25, y: -3 }}
              whileTap={{ scale: 0.9 }}
              animate={isActive ? { scale: 1.15 } : { scale: 1 }}
              className={`flex h-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-sm transition-all md:h-9 md:text-base ${
                isActive
                  ? "w-auto gap-1 bg-brand-blue px-3 text-white shadow-soft"
                  : i < index
                    ? "w-8 bg-emerald-100 md:w-9"
                    : "w-8 bg-white/70 opacity-70 md:w-9"
              }`}
              aria-label={`Ke halaman ${i + 1}: ${slide.title}`}
              aria-current={isActive ? "page" : undefined}
            >
              <span aria-hidden>{slide.emoji}</span>
              {isActive && (
                <span className="hidden whitespace-nowrap font-ui text-xs font-bold md:inline">
                  {slide.title}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      <motion.button
        type="button"
        onClick={onNext}
        disabled={isLast}
        whileHover={isLast ? undefined : { scale: 1.12, x: 3 }}
        whileTap={isLast ? undefined : { scale: 0.9 }}
        animate={isLast ? undefined : { boxShadow: ["0 0 0 0 rgba(79,157,255,0.5)", "0 0 0 12px rgba(79,157,255,0)"] }}
        transition={{ duration: 1.6, repeat: Infinity }}
        className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full bg-brand-blue text-white shadow-soft disabled:cursor-default disabled:opacity-30"
        aria-label="Halaman berikutnya"
      >
        <ChevronRight size={26} strokeWidth={3} />
      </motion.button>
    </div>
  );
}
