"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SlideTitle from "@/components/ui/SlideTitle";
import SlideBody from "@/components/ui/SlideBody";
import MascotSpeech from "@/components/mascot/MascotSpeech";
import { FloatingBlobs, SparkleField } from "@/components/backgrounds/Decor";
import { BENEFIT_ITEMS } from "@/lib/data/benefits";
import { ACCENTS } from "@/lib/accents";
import { useSound } from "@/hooks/useSound";

export default function BenefitsSlide() {
  const [wiggling, setWiggling] = useState<string | null>(null);
  const { play } = useSound();

  const handleClick = (id: string) => {
    play("sparkle");
    setWiggling(id);
    setTimeout(() => setWiggling((current) => (current === id ? null : current)), 700);
  };

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-emerald-50 via-amber-50 to-yellow-100">
      <FloatingBlobs colors={["#CDEFCE", "#FFE9AE", "#D9F6DA"]} />
      <SparkleField count={12} color="#5CCB5F" />

      <SlideBody className="gap-8">
        <SlideTitle
          emoji="✨"
          title="Manfaat Gadget"
          subtitle="Kalau dipakai dengan benar, gadget bisa jadi teman hebat!"
        />

        <div className="flex w-full max-w-5xl flex-wrap items-start justify-center gap-4 md:gap-6">
          {BENEFIT_ITEMS.map((item, i) => {
            const accent = ACCENTS[item.accent];
            const Icon = item.icon;
            const isWiggling = wiggling === item.id;
            return (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => handleClick(item.id)}
                initial={{ opacity: 0, y: 60, scale: 0.8 }}
                animate={{ opacity: 1, y: i % 2 === 0 ? 0 : 28, scale: 1 }}
                transition={{ delay: 0.35 + i * 0.15, type: "spring", stiffness: 200, damping: 17 }}
                whileHover={{ y: (i % 2 === 0 ? 0 : 28) - 12, scale: 1.05 }}
                whileTap={{ scale: 0.94 }}
                className="group flex w-40 cursor-pointer flex-col items-center gap-3 rounded-blob bg-white/85 p-5 shadow-soft ring-4 ring-white/80 backdrop-blur transition-shadow hover:shadow-pop md:w-52 md:p-6"
                aria-label={item.title}
              >
                <motion.div
                  className={`flex h-20 w-20 items-center justify-center rounded-3xl shadow-soft md:h-24 md:w-24 ${accent.solid}`}
                  animate={
                    isWiggling
                      ? { rotate: [0, -14, 14, -8, 8, 0], scale: [1, 1.25, 1] }
                      : { y: [0, -5, 0] }
                  }
                  transition={
                    isWiggling
                      ? { duration: 0.7 }
                      : { duration: 2.5 + i * 0.4, repeat: Infinity, ease: "easeInOut" }
                  }
                >
                  <Icon className="h-10 w-10 text-white transition-transform group-hover:scale-125 md:h-12 md:w-12" strokeWidth={2.4} />
                </motion.div>
                <span className="text-center font-display text-lg font-bold leading-tight text-brand-ink md:text-xl">
                  {item.title}
                </span>
                <span className="text-center text-sm font-semibold leading-snug text-brand-ink/65 md:text-base">
                  {item.description}
                </span>
              </motion.button>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>
          <MascotSpeech pose="cheer" face="excited">
            Banyak ya manfaatnya! Coba tekan kartunya! 👆
          </MascotSpeech>
        </motion.div>
      </SlideBody>
    </div>
  );
}
