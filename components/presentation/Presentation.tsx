"use client";

import { useCallback, useState, type ComponentType } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SoundProvider, useSound } from "@/hooks/useSound";
import { useKeyboardNav } from "@/hooks/useKeyboardNav";
import { getSlideTransition } from "@/lib/transitions";
import { TOTAL_SLIDES } from "@/lib/slides";
import type { SlideProps } from "@/types/slides";

import HudControls from "@/components/presentation/HudControls";
import NavBar from "@/components/presentation/NavBar";
import OpeningSlide from "@/components/slides/OpeningSlide";
import IceBreakingSlide from "@/components/slides/IceBreakingSlide";
import GadgetIntroSlide from "@/components/slides/GadgetIntroSlide";
import BenefitsSlide from "@/components/slides/BenefitsSlide";
import ImpactSlide from "@/components/slides/ImpactSlide";
import RealStorySlide from "@/components/slides/RealStorySlide";
import RulesSlide from "@/components/slides/RulesSlide";
import GameSlide from "@/components/slides/GameSlide";
import QuizSlide from "@/components/slides/QuizSlide";
import ClosingSlide from "@/components/slides/ClosingSlide";

const SLIDE_COMPONENTS: ComponentType<SlideProps>[] = [
  OpeningSlide,
  IceBreakingSlide,
  GadgetIntroSlide,
  BenefitsSlide,
  ImpactSlide,
  RealStorySlide,
  RulesSlide,
  GameSlide,
  QuizSlide,
  ClosingSlide,
];

function PresentationInner() {
  const [index, setIndex] = useState(0);
  const { play } = useSound();

  const goTo = useCallback(
    (target: number) => {
      setIndex((current) => {
        const next = Math.max(0, Math.min(TOTAL_SLIDES - 1, target));
        if (next !== current) play("whoosh");
        return next;
      });
    },
    [play],
  );

  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);
  const goHome = useCallback(() => goTo(0), [goTo]);
  const goEnd = useCallback(() => goTo(TOTAL_SLIDES - 1), [goTo]);

  useKeyboardNav({ onNext: goNext, onPrev: goPrev, onHome: goHome, onEnd: goEnd });

  const ActiveSlide = SLIDE_COMPONENTS[index];
  const transition = getSlideTransition(index);

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={transition.initial}
          animate={transition.animate}
          exit={transition.exit}
          transition={{ duration: 0.55, ease: [0.32, 0.72, 0.24, 1] }}
        >
          <ActiveSlide onNext={goNext} isActive />
        </motion.div>
      </AnimatePresence>

      <HudControls />
      <NavBar index={index} onPrev={goPrev} onNext={goNext} onJump={goTo} />

      {/* Penghitung halaman untuk guru */}
      <div className="glass absolute left-4 bottom-4 z-40 hidden rounded-full px-4 py-1.5 font-ui text-sm font-bold text-brand-ink/60 shadow-soft lg:block">
        {index + 1} / {TOTAL_SLIDES}
      </div>
    </main>
  );
}

export default function Presentation() {
  return (
    <SoundProvider>
      <PresentationInner />
    </SoundProvider>
  );
}
