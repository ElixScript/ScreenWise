"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, PartyPopper, Sparkles } from "lucide-react";
import Mascot from "@/components/mascot/Mascot";
import BigButton from "@/components/ui/BigButton";
import SlideBody from "@/components/ui/SlideBody";
import { AuroraBackground, ParticleField } from "@/components/backgrounds/Aurora";
import { celebrationConfetti } from "@/lib/confetti";
import { useSound } from "@/hooks/useSound";

const CLOSING_MESSAGE =
  "Gadget adalah alat yang sangat bermanfaat jika digunakan dengan bijak. Jangan lupa belajar dengan semangat, bermain bersama teman, membantu orang tua, berolahraga, dan beristirahat dengan cukup.";

export default function ClosingSlide() {
  const [thanked, setThanked] = useState(false);
  const { play } = useSound();

  const handleThanks = () => {
    setThanked(true);
    play("tada");
    celebrationConfetti(4000);
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <AuroraBackground tone="mixed" intensity={0.6} />
      <ParticleField count={30} color="#fde68a" />

      <SlideBody className="gap-5">
        <motion.span
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass flex items-center gap-2 rounded-full px-4 py-1.5 font-ui text-xs font-semibold uppercase tracking-[0.25em] text-amber-300 md:text-sm"
        >
          <PartyPopper className="h-4 w-4" aria-hidden /> Misi Selesai
        </motion.span>

        <motion.h2
          initial={{ scale: 0.5, opacity: 0, filter: "blur(10px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ type: "spring", stiffness: 170, damping: 15, delay: 0.35 }}
          className="text-gradient-gold text-center font-display text-6xl font-extrabold md:text-8xl"
        >
          TERIMA KASIH!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="font-display text-2xl font-bold text-ink-dim md:text-3xl"
        >
          Sampai Jumpa!
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="glass-bright max-w-2xl rounded-blob px-7 py-4 text-center text-lg font-semibold leading-relaxed text-ink-bright/90 md:text-xl"
        >
          Ingat ya... {CLOSING_MESSAGE}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, type: "spring", stiffness: 160, damping: 16 }}
        >
          <Mascot pose={thanked ? "cheer" : "wave"} face="excited" className="w-36 md:w-48" />
        </motion.div>

        <div className="min-h-[4.5rem]">
          <AnimatePresence mode="wait">
            {thanked ? (
              <motion.p
                key="bye"
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 230, damping: 13 }}
                className="text-gradient flex items-center gap-3 font-display text-3xl font-extrabold md:text-4xl"
              >
                <Sparkles className="h-8 w-8 text-cyan-300" aria-hidden />
                Sampai Bertemu Lagi!
                <Sparkles className="h-8 w-8 text-pink-300" aria-hidden />
              </motion.p>
            ) : (
              <motion.div key="btn" exit={{ opacity: 0, scale: 0.8 }}>
                <BigButton size="md" color="pink" onClick={handleThanks} ariaLabel="Ucapkan terima kasih">
                  <Heart className="h-5 w-5 fill-current" /> Terima Kasih Sudah Belajar Hari Ini
                </BigButton>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </SlideBody>
    </div>
  );
}
