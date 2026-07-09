"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Mascot from "@/components/mascot/Mascot";
import BigButton from "@/components/ui/BigButton";
import SlideBody from "@/components/ui/SlideBody";
import { Sun, Cloud, Bird, Balloon, GrassStrip } from "@/components/illustrations/Nature";
import { SparkleField } from "@/components/backgrounds/Decor";
import { useSound } from "@/hooks/useSound";
import type { SlideProps } from "@/types/slides";

const TITLE_WORDS = [
  { text: "Edukasi", className: "text-brand-ink" },
  { text: "Penggunaan Gadget", className: "text-brand-blue" },
  { text: "yang Sehat", className: "text-emerald-500" },
  { text: "dan Bijak", className: "text-orange-400" },
];

const BALLOONS = [
  { left: "6%", color: "red", delay: 0, duration: 13 },
  { left: "16%", color: "yellow", delay: 4, duration: 16 },
  { left: "82%", color: "blue", delay: 2, duration: 14 },
  { left: "90%", color: "green", delay: 6, duration: 17 },
  { left: "72%", color: "purple", delay: 9, duration: 15 },
] as const;

export default function OpeningSlide({ onNext }: SlideProps) {
  const [starting, setStarting] = useState(false);
  const { play } = useSound();

  const handleStart = () => {
    if (starting) return;
    setStarting(true);
    play("tada");
    setTimeout(onNext, 900);
  };

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-b from-sky-300 via-sky-100 to-amber-50">
      {/* Matahari terbit */}
      <motion.div
        className="absolute left-[7%] top-[8%]"
        initial={{ y: 160, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
      >
        <Sun className="w-24 md:w-32" />
      </motion.div>

      {/* Awan berarak */}
      {[
        { top: "6%", scale: 1, duration: 55, delay: 0 },
        { top: "18%", scale: 0.7, duration: 70, delay: 8 },
        { top: "12%", scale: 0.5, duration: 45, delay: 20 },
      ].map((c, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top: c.top, scale: c.scale }}
          initial={{ x: "-20vw" }}
          animate={{ x: "110vw" }}
          transition={{ duration: c.duration, delay: c.delay, repeat: Infinity, ease: "linear" }}
        >
          <Cloud className="w-32 md:w-44" />
        </motion.div>
      ))}

      {/* Burung terbang */}
      {[
        { top: "22%", duration: 18, delay: 1.5, color: "#FF8FAB" },
        { top: "30%", duration: 24, delay: 8, color: "#7FB9FF" },
      ].map((b, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top: b.top }}
          initial={{ x: "-10vw", y: 0 }}
          animate={{ x: "110vw", y: [0, -20, 8, -14, 0] }}
          transition={{
            x: { duration: b.duration, delay: b.delay, repeat: Infinity, ease: "linear" },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <Bird className="w-10 md:w-14" color={b.color} />
        </motion.div>
      ))}

      {/* Balon naik */}
      {BALLOONS.map((b, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: b.left }}
          initial={{ y: "110vh" }}
          animate={{ y: "-30vh" }}
          transition={{ duration: b.duration, delay: b.delay, repeat: Infinity, ease: "linear" }}
        >
          <Balloon color={b.color} className="w-10 md:w-14" />
        </motion.div>
      ))}

      <SparkleField count={12} />

      {/* Konten utama */}
      <SlideBody className="gap-6">
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-10">
          <motion.div
            initial={{ x: -220, opacity: 0, rotate: -12 }}
            animate={{ x: 0, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 90, damping: 14, delay: 0.4 }}
          >
            <Mascot pose={starting ? "jump" : "wave"} face="excited" className="w-36 md:w-52" />
          </motion.div>

          <div className="text-center md:text-left">
            <h1 className="flex flex-col gap-1 text-5xl font-extrabold leading-tight md:text-6xl lg:text-7xl">
              {TITLE_WORDS.map((word, i) => (
                <motion.span
                  key={word.text}
                  initial={{ y: 46, opacity: 0, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 210, damping: 16, delay: 0.7 + i * 0.35 }}
                  className={word.className}
                >
                  {word.text}
                </motion.span>
              ))}
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.6 }}
              className="mt-4 text-xl font-bold text-brand-ink/70 md:text-2xl"
            >
              Petualangan seru bersama Bimo si Robot Pintar! 🤖✨
            </motion.p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: [1, 1.05, 1] }}
          transition={{
            opacity: { delay: 2.7, duration: 0.4 },
            scale: { delay: 3.1, duration: 1.6, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <BigButton size="xl" color="orange" onClick={handleStart} ariaLabel="Mulai belajar">
            🎮 AYO MULAI BELAJAR!
          </BigButton>
        </motion.div>
      </SlideBody>

      {/* Rumput */}
      <div className="absolute bottom-0 left-0 right-0">
        <GrassStrip className="h-20 md:h-28" />
      </div>
    </div>
  );
}
