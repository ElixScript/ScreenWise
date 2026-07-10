"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import SlideTitle from "@/components/ui/SlideTitle";
import SlideBody from "@/components/ui/SlideBody";
import TiltCard from "@/components/ui/TiltCard";
import MascotSpeech from "@/components/mascot/MascotSpeech";
import { AuroraBackground, ParticleField } from "@/components/backgrounds/Aurora";
import { BENEFIT_ITEMS } from "@/lib/data/benefits";
import { ACCENTS } from "@/lib/accents";
import { useSound } from "@/hooks/useSound";

export default function BenefitsSlide() {
  const [pulsing, setPulsing] = useState<string | null>(null);
  const { play } = useSound();

  const handleClick = (id: string) => {
    play("sparkle");
    setPulsing(id);
    setTimeout(() => setPulsing((current) => (current === id ? null : current)), 700);
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <AuroraBackground tone="lime" intensity={0.45} />
      <ParticleField count={18} color="#bbf7d0" />

      <SlideBody className="gap-8">
        <SlideTitle
          icon={Zap}
          kicker="Level 03 — Power Up"
          title="Manfaat Gadget"
          subtitle="Dipakai dengan benar, gadget adalah power-up belajarmu!"
        />

        <div className="flex w-full max-w-5xl flex-wrap items-start justify-center gap-4 md:gap-6">
          {BENEFIT_ITEMS.map((item, i) => {
            const accent = ACCENTS[item.accent];
            const Icon = item.icon;
            const isPulsing = pulsing === item.id;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 60, scale: 0.85 }}
                animate={{ opacity: 1, y: i % 2 === 0 ? 0 : 26, scale: 1 }}
                transition={{ delay: 0.35 + i * 0.15, type: "spring", stiffness: 200, damping: 17 }}
              >
                <TiltCard
                  onClick={() => handleClick(item.id)}
                  ariaLabel={item.title}
                  className={`glass group flex w-40 flex-col items-center gap-3 rounded-blob bg-gradient-to-b p-5 ring-1 ring-white/10 transition-shadow md:w-52 md:p-6 ${accent.gradient} ${accent.hoverGlow}`}
                >
                  <motion.div
                    className={`flex h-20 w-20 items-center justify-center rounded-2xl text-white md:h-24 md:w-24 ${accent.solid} ${accent.glow}`}
                    animate={
                      isPulsing
                        ? { rotate: [0, -12, 12, -6, 6, 0], scale: [1, 1.25, 1] }
                        : { y: [0, -5, 0] }
                    }
                    transition={
                      isPulsing
                        ? { duration: 0.7 }
                        : { duration: 2.5 + i * 0.4, repeat: Infinity, ease: "easeInOut" }
                    }
                  >
                    <Icon className="h-10 w-10 transition-transform group-hover:scale-125 md:h-12 md:w-12" strokeWidth={2.2} />
                  </motion.div>
                  <span className="text-center font-display text-lg font-bold leading-tight text-ink-bright md:text-xl">
                    {item.title}
                  </span>
                  <span className="text-center text-sm font-semibold leading-snug text-ink-dim md:text-base">
                    {item.description}
                  </span>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>
          <MascotSpeech pose="cheer" face="excited">
            Banyak ya manfaatnya! Coba tekan kartunya!
          </MascotSpeech>
        </motion.div>
      </SlideBody>
    </div>
  );
}
