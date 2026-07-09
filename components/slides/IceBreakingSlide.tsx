"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SlideTitle from "@/components/ui/SlideTitle";
import SlideBody from "@/components/ui/SlideBody";
import InteractiveCard from "@/components/ui/InteractiveCard";
import MascotSpeech from "@/components/mascot/MascotSpeech";
import { FloatingBlobs, FloatingEmojiField } from "@/components/backgrounds/Decor";
import { ICE_BREAKER_ITEMS } from "@/lib/data/icebreaker";
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
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-violet-100 via-white to-pink-50">
      <FloatingBlobs colors={["#E3D5FA", "#FFD6E8", "#CFE8FF"]} />
      <FloatingEmojiField emojis={["🙋", "📺", "🎮", "😄", "⭐"]} count={9} />

      <SlideBody className="gap-6">
        <SlideTitle
          emoji="🙋"
          title="Kenalan Dulu, Yuk!"
          subtitle="Angkat tanganmu tinggi-tinggi kalau jawabannya IYA!"
        />

        <div className="grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
          {ICE_BREAKER_ITEMS.map((item, i) => {
            const done = answered.includes(item.id);
            const accent = ACCENTS[item.accent];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40, rotate: i % 2 === 0 ? -3 : 3 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ delay: 0.3 + i * 0.12, type: "spring", stiffness: 200, damping: 18 }}
              >
                <InteractiveCard
                  tiltIndex={i}
                  onClick={() => handleCardClick(item.id)}
                  ariaLabel={item.question}
                  className={`relative w-full bg-gradient-to-br p-5 ring-4 md:p-6 ${accent.gradient} ${
                    done ? "ring-emerald-300" : "ring-white/70"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <motion.span
                      className="text-5xl md:text-6xl"
                      animate={done ? { rotate: [0, -12, 12, 0], scale: [1, 1.3, 1] } : undefined}
                      transition={{ duration: 0.5 }}
                      aria-hidden
                    >
                      {item.emoji}
                    </motion.span>
                    <p className="font-display text-xl font-bold text-brand-ink md:text-2xl">
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
                        className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full bg-brand-green text-xl text-white shadow-soft"
                        aria-hidden
                      >
                        ✓
                      </motion.span>
                    )}
                  </AnimatePresence>
                </InteractiveCard>
              </motion.div>
            );
          })}
        </div>

        <div className="min-h-[7rem]">
          <AnimatePresence mode="wait">
            {allDone ? (
              <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <MascotSpeech pose="cheer" face="excited">
                  Wah, kalian semua luar biasa! Ayo kita mulai petualangannya! 🎉
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
                <MascotSpeech pose="wave">
                  Tekan kartunya satu per satu ya! 👆
                </MascotSpeech>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </SlideBody>
    </div>
  );
}
