"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Gamepad2, Rocket, Smartphone, Laptop, Tablet, Watch } from "lucide-react";
import Mascot from "@/components/mascot/Mascot";
import BigButton from "@/components/ui/BigButton";
import SlideBody from "@/components/ui/SlideBody";
import { AuroraBackground, ParticleField } from "@/components/backgrounds/Aurora";
import { useSound } from "@/hooks/useSound";
import type { SlideProps } from "@/types/slides";

/** Chip gadget melayang di sekitar judul — kesan lobby game. */
const FLOATING_CHIPS = [
  { icon: Smartphone, className: "left-[8%] top-[20%]", delay: 1.6, duration: 5 },
  { icon: Laptop, className: "right-[9%] top-[16%]", delay: 1.9, duration: 6 },
  { icon: Tablet, className: "left-[13%] bottom-[24%]", delay: 2.2, duration: 5.5 },
  { icon: Watch, className: "right-[14%] bottom-[28%]", delay: 2.5, duration: 4.8 },
];

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
    <div className="relative h-full w-full overflow-hidden">
      <AuroraBackground tone="mixed" intensity={0.55} />
      <ParticleField count={26} />

      {/* Chip gadget melayang */}
      {FLOATING_CHIPS.map(({ icon: Icon, className, delay, duration }, i) => (
        <motion.div
          key={i}
          className={`glass absolute hidden rounded-2xl p-3.5 md:block ${className}`}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1, y: [0, -14, 0], rotate: [0, i % 2 === 0 ? 4 : -4, 0] }}
          transition={{
            opacity: { delay, duration: 0.6 },
            scale: { delay, type: "spring", stiffness: 200, damping: 14 },
            y: { delay, duration, repeat: Infinity, ease: "easeInOut" },
            rotate: { delay, duration: duration * 1.2, repeat: Infinity, ease: "easeInOut" },
          }}
          aria-hidden
        >
          <Icon className="h-7 w-7 text-cyan-300" strokeWidth={2} />
        </motion.div>
      ))}

      <SlideBody className="gap-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:gap-12">
          <motion.div
            initial={{ x: -180, opacity: 0, rotate: -10 }}
            animate={{ x: 0, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 90, damping: 14, delay: 0.5 }}
          >
            <Mascot pose={starting ? "jump" : "wave"} face="excited" className="w-36 md:w-52" />
          </motion.div>

          <div className="text-center md:text-left">
            <motion.span
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-ui text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300 md:text-sm"
            >
              <Rocket className="h-4 w-4" aria-hidden /> Misi Belajar Interaktif
            </motion.span>

            <h1 className="mt-4 flex flex-col gap-1 font-display font-extrabold leading-[1.12]">
              {[
                { text: "Edukasi", className: "text-ink-bright text-4xl md:text-5xl" },
                { text: "Penggunaan Gadget", className: "text-gradient text-5xl md:text-7xl" },
                { text: "yang Sehat & Bijak", className: "text-gradient-gold text-4xl md:text-6xl" },
              ].map((line, i) => (
                <motion.span
                  key={line.text}
                  initial={{ y: 40, opacity: 0, filter: "blur(10px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  transition={{ type: "spring", stiffness: 170, damping: 18, delay: 0.8 + i * 0.35 }}
                  className={line.className}
                >
                  {line.text}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.1, duration: 0.6 }}
              className="mt-4 text-lg font-semibold text-ink-dim md:text-xl"
            >
              Petualangan seru bersama Kosmo si Penjelajah Angkasa
            </motion.p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: [1, 1.04, 1] }}
          transition={{
            opacity: { delay: 2.5, duration: 0.4 },
            scale: { delay: 2.9, duration: 1.8, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <BigButton size="xl" color="amber" onClick={handleStart} ariaLabel="Mulai misi belajar">
            <Gamepad2 className="h-7 w-7" /> Mulai Misi
          </BigButton>
        </motion.div>
      </SlideBody>
    </div>
  );
}
