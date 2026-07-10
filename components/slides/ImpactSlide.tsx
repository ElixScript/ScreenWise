"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, HeartPulse, MousePointerClick } from "lucide-react";
import SlideTitle from "@/components/ui/SlideTitle";
import SlideBody from "@/components/ui/SlideBody";
import MascotSpeech from "@/components/mascot/MascotSpeech";
import { AuroraBackground, ParticleField } from "@/components/backgrounds/Aurora";
import { IMPACT_ITEMS } from "@/lib/data/impacts";
import { IMPACT_ICONS } from "@/lib/icons";
import { ACCENTS } from "@/lib/accents";
import { useSound } from "@/hooks/useSound";

export default function ImpactSlide() {
  const [flipped, setFlipped] = useState<string[]>([]);
  const { play } = useSound();

  const toggleFlip = (id: string) => {
    play("pop");
    setFlipped((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <AuroraBackground tone="violet" intensity={0.45} />
      <ParticleField count={14} color="#c4b5fd" />

      <SlideBody className="gap-6">
        <SlideTitle
          icon={ShieldAlert}
          kicker="Level 04 — Waspada"
          title="Kalau Berlebihan, Apa Akibatnya?"
          subtitle="Tenang, semua ada solusinya. Balik kartunya!"
        />

        <div className="grid w-full max-w-5xl grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
          {IMPACT_ITEMS.map((item, i) => {
            const accent = ACCENTS[item.accent];
            const Icon = IMPACT_ICONS[item.id];
            const isFlipped = flipped.includes(item.id);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 220, damping: 20 }}
                style={{ perspective: 1200 }}
              >
                <motion.button
                  type="button"
                  onClick={() => toggleFlip(item.id)}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 22 }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="relative h-36 w-full cursor-pointer md:h-44"
                  style={{ transformStyle: "preserve-3d" }}
                  aria-label={`${item.title} — tekan untuk melihat solusi`}
                >
                  {/* Depan */}
                  <div
                    className={`glass absolute inset-0 flex flex-col items-center justify-center gap-2.5 rounded-blob bg-gradient-to-br p-3 ring-1 ring-white/10 ${accent.gradient}`}
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <motion.span
                      className={`flex h-12 w-12 items-center justify-center rounded-xl text-white md:h-14 md:w-14 ${accent.solid} ${accent.glow}`}
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
                      aria-hidden
                    >
                      <Icon className="h-6 w-6 md:h-7 md:w-7" strokeWidth={2.3} />
                    </motion.span>
                    <span className="text-center font-display text-lg font-bold text-ink-bright md:text-xl">
                      {item.title}
                    </span>
                    <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 font-ui text-[10px] font-semibold uppercase tracking-widest text-ink-dim">
                      <MousePointerClick className="h-3 w-3" aria-hidden /> balik aku
                    </span>
                  </div>
                  {/* Belakang */}
                  <div
                    className="glass-bright absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-blob p-3 ring-2 ring-emerald-400/40"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    <p className="text-center text-sm font-semibold leading-snug text-ink-bright/90 md:text-base">
                      {item.example}
                    </p>
                    <p className="flex items-center gap-2 rounded-xl bg-emerald-400/15 px-3 py-1.5 text-center text-sm font-bold leading-snug text-emerald-300 md:text-base">
                      <HeartPulse className="h-4 w-4 shrink-0" aria-hidden />
                      {item.solution}
                    </p>
                  </div>
                </motion.button>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
          <MascotSpeech pose="think" face="think">
            Jangan khawatir! Kita bisa mencegahnya bersama-sama.
          </MascotSpeech>
        </motion.div>
      </SlideBody>
    </div>
  );
}
