"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Lightbulb } from "lucide-react";
import SlideTitle from "@/components/ui/SlideTitle";
import SlideBody from "@/components/ui/SlideBody";
import MascotSpeech from "@/components/mascot/MascotSpeech";
import { AuroraBackground, ParticleField } from "@/components/backgrounds/Aurora";
import { GADGET_ILLUSTRATIONS } from "@/components/illustrations/Gadgets";
import { GADGET_ITEMS, GADGET_DEFINITION } from "@/lib/data/gadgets";
import { ACCENTS } from "@/lib/accents";
import { useSound } from "@/hooks/useSound";

export default function GadgetIntroSlide() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { play } = useSound();

  const selected = GADGET_ITEMS.find((g) => g.id === selectedId);
  const SelectedIllo = selected ? GADGET_ILLUSTRATIONS[selected.id] : null;

  return (
    <div className="relative h-full w-full overflow-hidden">
      <AuroraBackground tone="cyan" intensity={0.5} />
      <ParticleField count={18} />

      <SlideBody className="gap-6">
        <SlideTitle
          icon={Search}
          kicker="Level 02 — Pengetahuan"
          title="Apa itu Gadget?"
          subtitle={GADGET_DEFINITION}
        />

        <div className="grid w-full max-w-4xl grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {GADGET_ITEMS.map((item, i) => {
            const Illo = GADGET_ILLUSTRATIONS[item.id];
            const accent = ACCENTS[item.accent];
            return (
              <motion.button
                key={item.id}
                type="button"
                layoutId={`gadget-${item.id}`}
                onClick={() => {
                  play("pop");
                  setSelectedId(item.id);
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.12, type: "spring", stiffness: 220, damping: 20 }}
                whileHover={{ y: -10, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`glass flex cursor-pointer flex-col items-center gap-2 rounded-blob bg-gradient-to-br p-5 ring-1 ring-white/10 transition-shadow ${accent.hoverGlow} ${accent.gradient}`}
                aria-label={`Pelajari ${item.name}`}
              >
                <motion.div
                  animate={{ y: [0, -7, 0] }}
                  transition={{ duration: 2.6 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Illo className="w-20 md:w-28" />
                </motion.div>
                <span className="font-display text-lg font-bold text-ink-bright md:text-xl">
                  {item.name}
                </span>
                <span className={`font-ui text-[11px] font-semibold uppercase tracking-widest ${accent.text}`}>
                  Tekan untuk scan
                </span>
              </motion.button>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
          <MascotSpeech pose="wave">
            Gadget itu baik jika digunakan dengan benar!
          </MascotSpeech>
        </motion.div>
      </SlideBody>

      {/* Detail gadget: kartu membesar ala inspeksi item game */}
      <AnimatePresence>
        {selected && SelectedIllo && (
          <motion.div
            className="absolute inset-0 z-30 flex items-center justify-center bg-deep/70 p-6 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              layoutId={`gadget-${selected.id}`}
              onClick={(e) => e.stopPropagation()}
              className={`border-animated relative flex w-full max-w-xl flex-col items-center gap-4 rounded-blob p-8 shadow-pop`}
            >
              <button
                type="button"
                onClick={() => {
                  play("click");
                  setSelectedId(null);
                }}
                className="glass absolute right-4 top-4 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-ink-bright transition-transform hover:scale-110"
                aria-label="Tutup"
              >
                <X size={22} strokeWidth={3} />
              </button>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <SelectedIllo className="w-40 md:w-48" />
              </motion.div>

              <h3 className={`font-display text-3xl font-bold md:text-4xl ${ACCENTS[selected.accent].text}`}>
                {selected.name}
              </h3>
              <p className="text-center text-xl font-semibold text-ink-bright/90">
                {selected.description}
              </p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="glass flex items-center gap-3 rounded-2xl px-5 py-3 text-center text-base font-bold text-amber-300 md:text-lg"
              >
                <Lightbulb className="h-6 w-6 shrink-0" aria-hidden />
                Tahukah kamu? {selected.funFact}
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
