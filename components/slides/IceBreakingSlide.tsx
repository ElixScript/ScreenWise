"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Hand } from "lucide-react";
import SlideTitle from "@/components/ui/SlideTitle";
import SlideBody from "@/components/ui/SlideBody";
import TiltCard from "@/components/ui/TiltCard";
import MascotSpeech from "@/components/mascot/MascotSpeech";
import { AuroraBackground, ParticleField } from "@/components/backgrounds/Aurora";
import { ICE_BREAKER_ITEMS } from "@/lib/data/icebreaker";
import { ICEBREAKER_ICONS } from "@/lib/icons";
import { ACCENTS } from "@/lib/accents";
import { burstConfetti } from "@/lib/confetti";
import { useSound } from "@/hooks/useSound";

export default function IceBreakingSlide() {
  const [answered, setAnswered] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const { play } = useSound();

  const allDone = answered.length === ICE_BREAKER_ITEMS.length;
  const activeItem = ICE_BREAKER_ITEMS.find((item) => item.id === activeId);

  const handleCardClick = (id: string) => {
    play("pop");
    setActiveId(id);
    if (!answered.includes(id)) {
      const next = [...answered, id];
      setAnswered(next);
      if (next.length === ICE_BREAKER_ITEMS.length) {
        setTimeout(() => {
          play("tada");
          burstConfetti();
        }, 500);
      }
    }
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <AuroraBackground tone="violet" intensity={0.5} />
      <ParticleField count={18} color="#c4b5fd" />

      <SlideBody className="gap-6">
        <SlideTitle
          icon={Hand}
          kicker="Level 01 — Kenalan Dulu"
          title="Angkat Tanganmu!"
          subtitle="Kalau jawabannya IYA, angkat tangan tinggi-tinggi!"
        />

        <div className="grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5">
          {ICE_BREAKER_ITEMS.map((item, i) => {
            const done = answered.includes(item.id);
            const accent = ACCENTS[item.accent];
            const Icon = ICEBREAKER_ICONS[item.id];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.12, type: "spring", stiffness: 200, damping: 18 }}
              >
                <TiltCard
                  onClick={() => handleCardClick(item.id)}
                  ariaLabel={item.question}
                  className={`glass relative w-full rounded-blob bg-gradient-to-br p-5 ring-1 transition-shadow md:p-6 ${accent.gradient} ${
                    done ? `${accent.ring} ${accent.glow} ring-2` : "ring-white/10"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <motion.span
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white md:h-16 md:w-16 ${accent.solid} ${accent.glow}`}
                      animate={done ? { rotate: [0, -10, 10, 0], scale: [1, 1.2, 1] } : undefined}
                      transition={{ duration: 0.5 }}
                      aria-hidden
                    >
                      <Icon className="h-7 w-7 md:h-8 md:w-8" strokeWidth={2.3} />
                    </motion.span>
                    <p className="font-display text-xl font-bold text-ink-bright md:text-2xl">
                      {item.question}
                    </p>
                  </div>
                  <AnimatePresence>
                    {done && (
                      <motion.span
                        initial={{ scale: 0, rotate: -40 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        className="absolute -right-2 -top-2 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-lime-300 to-emerald-500 text-deep shadow-glow-lime"
                        aria-hidden
                      >
                        <Check className="h-5 w-5" strokeWidth={3.5} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        <div className="min-h-[6.5rem]">
          <AnimatePresence mode="wait">
            {allDone ? (
              <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <MascotSpeech pose="cheer" face="excited">
                  Keren, kalian semua luar biasa! Misi pertama selesai — lanjut!
                </MascotSpeech>
              </motion.div>
            ) : activeItem ? (
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
              >
                <MascotSpeech pose="wave" face="excited">
                  {activeItem.mascotComment}
                </MascotSpeech>
              </motion.div>
            ) : (
              <motion.div key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                <MascotSpeech pose="wave">Tekan kartunya satu per satu ya!</MascotSpeech>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </SlideBody>
    </div>
  );
}
