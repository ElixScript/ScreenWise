"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Mascot from "@/components/mascot/Mascot";
import BigButton from "@/components/ui/BigButton";
import SlideBody from "@/components/ui/SlideBody";
import { Budi, Siti } from "@/components/illustrations/Characters";
import { Cloud, Rainbow, Balloon, GrassStrip } from "@/components/illustrations/Nature";
import { SparkleField } from "@/components/backgrounds/Decor";
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
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-b from-sky-200 via-sky-100 to-emerald-50">
      {/* Pelangi */}
      <motion.div
        className="absolute left-1/2 top-[6%] -translate-x-1/2"
        initial={{ opacity: 0, y: 60, scale: 0.8 }}
        animate={{ opacity: 0.9, y: 0, scale: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      >
        <Rainbow className="w-[420px] md:w-[560px]" />
      </motion.div>

      {/* Awan */}
      {[
        { top: "10%", duration: 60, delay: 0, scale: 1 },
        { top: "22%", duration: 75, delay: 12, scale: 0.6 },
      ].map((c, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top: c.top, scale: c.scale }}
          initial={{ x: "-18vw" }}
          animate={{ x: "112vw" }}
          transition={{ duration: c.duration, delay: c.delay, repeat: Infinity, ease: "linear" }}
        >
          <Cloud className="w-36" />
        </motion.div>
      ))}

      {/* Balon */}
      {[
        { left: "8%", color: "red", delay: 0, duration: 14 },
        { left: "88%", color: "yellow", delay: 3, duration: 16 },
        { left: "18%", color: "purple", delay: 7, duration: 15 },
        { left: "78%", color: "green", delay: 10, duration: 13 },
      ].map((b, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: b.left }}
          initial={{ y: "110vh" }}
          animate={{ y: "-30vh" }}
          transition={{ duration: b.duration, delay: b.delay, repeat: Infinity, ease: "linear" }}
        >
          <Balloon color={b.color as "red"} className="w-10 md:w-12" />
        </motion.div>
      ))}

      <SparkleField count={16} />

      <SlideBody className="gap-4">
        <motion.h2
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.3 }}
          className="text-center font-display text-5xl font-extrabold text-brand-ink md:text-7xl"
        >
          🎉 TERIMA KASIH!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="font-display text-2xl font-bold text-brand-ink/60 md:text-3xl"
        >
          Sampai Jumpa! 👋
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="glass max-w-2xl rounded-blob px-7 py-4 text-center text-lg font-semibold leading-relaxed text-brand-ink/80 shadow-soft md:text-xl"
        >
          Ingat ya... {CLOSING_MESSAGE}
        </motion.p>

        {/* Karakter melambai */}
        <motion.div
          className="flex items-end gap-2 md:gap-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, type: "spring", stiffness: 160, damping: 16 }}
        >
          <Budi waving mood="happy" className="w-24 md:w-32" />
          <Mascot pose={thanked ? "cheer" : "wave"} face="excited" className="w-32 md:w-44" />
          <Siti waving mood="happy" className="w-24 md:w-32" />
        </motion.div>

        <div className="min-h-[4.5rem]">
          <AnimatePresence mode="wait">
            {thanked ? (
              <motion.p
                key="bye"
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 230, damping: 13 }}
                className="font-display text-3xl font-extrabold text-brand-orange md:text-4xl"
              >
                ✨ Sampai Bertemu Lagi! ✨
              </motion.p>
            ) : (
              <motion.div key="btn" exit={{ opacity: 0, scale: 0.8 }}>
                <BigButton size="md" color="white" onClick={handleThanks} ariaLabel="Ucapkan terima kasih">
                  ❤️ Terima Kasih Sudah Belajar Hari Ini
                </BigButton>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </SlideBody>

      <div className="absolute bottom-0 left-0 right-0">
        <GrassStrip className="h-20 md:h-24" />
      </div>
    </div>
  );
}
