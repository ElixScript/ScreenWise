"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SlideTitle from "@/components/ui/SlideTitle";
import SlideBody from "@/components/ui/SlideBody";
import MascotSpeech from "@/components/mascot/MascotSpeech";
import { FloatingBlobs } from "@/components/backgrounds/Decor";
import { IMPACT_ITEMS } from "@/lib/data/impacts";
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
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-cyan-50 via-sky-50 to-violet-50">
      <FloatingBlobs colors={["#CDEBF5", "#DDE9FF", "#E8E0F8"]} />

      <SlideBody className="gap-6">
        <SlideTitle
          emoji="💛"
          title="Kalau Berlebihan, Apa Ya Akibatnya?"
          subtitle="Tenang, semua ada solusinya! Tekan kartu untuk membaliknya."
        />

        <div className="grid w-full max-w-5xl grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
          {IMPACT_ITEMS.map((item, i) => {
            const accent = ACCENTS[item.accent];
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
                    className={`absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-blob p-3 shadow-soft ring-4 ring-white/80 ${accent.soft}`}
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <motion.span
                      className="text-4xl md:text-5xl"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
                      aria-hidden
                    >
                      {item.emoji}
                    </motion.span>
                    <span className="text-center font-display text-lg font-bold text-brand-ink md:text-xl">
                      {item.title}
                    </span>
                    <span className="rounded-full bg-white/70 px-3 py-0.5 font-ui text-xs font-semibold text-brand-ink/60">
                      tekan aku 👆
                    </span>
                  </div>
                  {/* Belakang */}
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 rounded-blob bg-white p-3 shadow-soft ring-4 ring-emerald-200"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    <p className="text-center text-sm font-semibold leading-snug text-brand-ink/80 md:text-base">
                      {item.example}
                    </p>
                    <p className="rounded-2xl bg-emerald-100 px-3 py-1.5 text-center text-sm font-bold leading-snug text-emerald-700 md:text-base">
                      💚 {item.solution}
                    </p>
                  </div>
                </motion.button>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
          <MascotSpeech pose="think" face="think">
            Jangan khawatir! Kita bisa mencegahnya bersama-sama. 💪
          </MascotSpeech>
        </motion.div>
      </SlideBody>
    </div>
  );
}
