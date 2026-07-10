"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollText, Sparkles } from "lucide-react";
import SlideTitle from "@/components/ui/SlideTitle";
import SlideBody from "@/components/ui/SlideBody";
import { AuroraBackground, ParticleField } from "@/components/backgrounds/Aurora";
import { RULE_SCENES } from "@/components/illustrations/RuleScenes";
import { RULE_ICONS } from "@/lib/icons";
import { RULE_ITEMS, RULES_BANNER } from "@/lib/data/rules";
import { ACCENTS } from "@/lib/accents";
import { useSound } from "@/hooks/useSound";

export default function RulesSlide() {
  const [activeId, setActiveId] = useState<string>(RULE_ITEMS[0].id);
  const { play } = useSound();

  const active = RULE_ITEMS.find((r) => r.id === activeId) ?? RULE_ITEMS[0];
  const ActiveScene = RULE_SCENES[active.id];
  const ActiveIcon = RULE_ICONS[active.id];
  const accent = ACCENTS[active.accent];

  return (
    <div className="relative h-full w-full overflow-hidden">
      <AuroraBackground tone="amber" intensity={0.45} />
      <ParticleField count={18} color="#fde68a" />

      <SlideBody className="gap-5">
        <SlideTitle
          icon={ScrollText}
          kicker="Level 06 — Aturan Utama"
          title="5 Aturan Emas Gadget"
          subtitle="Buka aturannya satu per satu seperti membuka level!"
          gold
        />

        {/* Pemilih aturan — node level */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {RULE_ITEMS.map((rule, i) => {
            const ruleAccent = ACCENTS[rule.accent];
            const isActive = rule.id === activeId;
            return (
              <motion.button
                key={rule.id}
                type="button"
                onClick={() => {
                  play("pop");
                  setActiveId(rule.id);
                }}
                initial={{ opacity: 0, y: 30, scale: 0.6 }}
                animate={{ opacity: 1, y: 0, scale: isActive ? 1.12 : 1 }}
                transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 260, damping: 16 }}
                whileHover={{ scale: 1.15, rotate: i % 2 === 0 ? 3 : -3 }}
                whileTap={{ scale: 0.92 }}
                className={`flex h-14 w-14 cursor-pointer items-center justify-center rounded-2xl font-display text-2xl font-bold transition-all md:h-16 md:w-16 md:text-3xl ${
                  isActive
                    ? `${ruleAccent.solid} ${ruleAccent.glow} text-white ring-2 ring-white/60`
                    : `glass ${ruleAccent.text} ring-1 ring-white/10`
                }`}
                aria-label={`Aturan ${rule.number}: ${rule.title}`}
              >
                {rule.number}
              </motion.button>
            );
          })}
        </div>

        {/* Kartu aturan aktif — panel holo */}
        <div className="w-full max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 40, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              className={`glass flex flex-col items-center gap-4 rounded-blob bg-gradient-to-br p-6 ring-1 ring-white/10 md:flex-row md:gap-8 md:p-8 ${accent.gradient} ${accent.glow}`}
            >
              {/* Layar hologram berisi adegan animasi */}
              <div className="relative shrink-0">
                <div className="flex h-40 w-48 items-center justify-center rounded-2xl bg-white/95 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.6)] md:h-48 md:w-60">
                  <ActiveScene className="w-40 md:w-48" />
                </div>
                <span
                  aria-hidden
                  className={`absolute -bottom-2 left-1/2 h-2 w-3/4 -translate-x-1/2 rounded-full blur-md ${accent.solid} opacity-60`}
                />
              </div>

              <div className="text-center md:text-left">
                <span className={`inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 font-ui text-xs font-semibold uppercase tracking-[0.18em] md:text-sm ${accent.text}`}>
                  <ActiveIcon className="h-4 w-4" aria-hidden /> Aturan ke-{active.number}
                </span>
                <h3 className="mt-2 font-display text-3xl font-bold leading-tight text-ink-bright md:text-4xl">
                  {active.title}
                </h3>
                <p className="mt-3 text-lg font-semibold leading-snug text-ink-dim md:text-xl">
                  {active.explanation}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Banner pesan utama */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, type: "spring", stiffness: 180, damping: 20 }}
          className="glass-bright flex w-full max-w-4xl items-center gap-3 rounded-2xl px-6 py-3 ring-2 ring-amber-400/40 md:px-8 md:py-4"
        >
          <Sparkles className="h-6 w-6 shrink-0 text-amber-300" aria-hidden />
          <p className="font-display text-base font-bold leading-snug text-amber-200 md:text-lg">
            {RULES_BANNER}
          </p>
        </motion.div>
      </SlideBody>
    </div>
  );
}
