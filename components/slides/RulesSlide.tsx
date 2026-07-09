"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SlideTitle from "@/components/ui/SlideTitle";
import SlideBody from "@/components/ui/SlideBody";
import { SparkleField, FloatingBlobs } from "@/components/backgrounds/Decor";
import { RULE_SCENES } from "@/components/illustrations/RuleScenes";
import { RULE_ITEMS, RULES_BANNER } from "@/lib/data/rules";
import { ACCENTS } from "@/lib/accents";
import { useSound } from "@/hooks/useSound";

const NUMBER_BADGES = ["①", "②", "③", "④", "⑤"];

export default function RulesSlide() {
  const [activeId, setActiveId] = useState<string>(RULE_ITEMS[0].id);
  const { play } = useSound();

  const active = RULE_ITEMS.find((r) => r.id === activeId) ?? RULE_ITEMS[0];
  const ActiveScene = RULE_SCENES[active.id];
  const accent = ACCENTS[active.accent];

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-amber-50 via-rose-50 to-sky-50">
      <FloatingBlobs colors={["#FFE9AE", "#FFD6E8", "#BFDCFF", "#CDEFCE"]} />
      <SparkleField count={16} color="#FFB74D" />

      <SlideBody className="gap-5">
        <SlideTitle
          emoji="📜"
          title="5 Aturan Emas Gadget"
          subtitle="Pilih nomornya satu per satu, ya!"
        />

        {/* Pemilih aturan */}
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
                className={`flex h-14 w-14 cursor-pointer items-center justify-center rounded-2xl font-display text-2xl font-bold shadow-soft ring-4 transition-all md:h-16 md:w-16 md:text-3xl ${
                  isActive
                    ? `${ruleAccent.solid} text-white ring-white`
                    : `bg-white/90 ${ruleAccent.text} ring-white/60`
                }`}
                aria-label={`Aturan ${rule.number}: ${rule.title}`}
              >
                {rule.number}
              </motion.button>
            );
          })}
        </div>

        {/* Kartu aturan aktif */}
        <div className="w-full max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 40, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              className={`flex flex-col items-center gap-4 rounded-blob bg-gradient-to-br p-6 shadow-pop ring-8 ring-white/90 md:flex-row md:gap-8 md:p-8 ${accent.gradient}`}
            >
              <div className="glass flex h-40 w-44 shrink-0 items-center justify-center rounded-3xl shadow-soft md:h-48 md:w-56">
                <ActiveScene className="w-36 md:w-44" />
              </div>
              <div className="text-center md:text-left">
                <span className={`font-display text-xl font-bold md:text-2xl ${accent.text}`}>
                  {NUMBER_BADGES[active.number - 1]} Aturan ke-{active.number}
                </span>
                <h3 className="mt-1 font-display text-3xl font-bold leading-tight text-brand-ink md:text-4xl">
                  {active.title}
                </h3>
                <p className="mt-3 text-xl font-semibold leading-snug text-brand-ink/75 md:text-2xl">
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
          className="w-full max-w-4xl rounded-full bg-gradient-to-r from-brand-yellow via-amber-300 to-brand-orange px-6 py-3 text-center shadow-pop ring-4 ring-white/80 md:px-10 md:py-4"
        >
          <p className="font-display text-base font-bold leading-snug text-brand-ink md:text-lg">
            💡 {RULES_BANNER}
          </p>
        </motion.div>
      </SlideBody>
    </div>
  );
}
