"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThumbsUp, ThumbsDown, ArrowRight, RotateCcw, Star, Trophy, Swords } from "lucide-react";
import Mascot from "@/components/mascot/Mascot";
import SpeechBubble from "@/components/ui/SpeechBubble";
import BigButton from "@/components/ui/BigButton";
import SlideBody from "@/components/ui/SlideBody";
import { AuroraBackground, ParticleField } from "@/components/backgrounds/Aurora";
import { GAME_SITUATIONS } from "@/lib/data/game";
import { GAME_ICONS } from "@/lib/icons";
import { burstConfetti, celebrationConfetti } from "@/lib/confetti";
import { useSound } from "@/hooks/useSound";

type Phase = "question" | "feedback" | "done";

export default function GameSlide() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<Phase>("question");
  const [lastCorrect, setLastCorrect] = useState(false);

  const { play } = useSound();
  const situation = GAME_SITUATIONS[index];
  const SituationIcon = GAME_ICONS[situation.id];
  const isLast = index === GAME_SITUATIONS.length - 1;

  const answer = (choice: "bijak" | "tidak") => {
    const correct = choice === situation.answer;
    setLastCorrect(correct);
    setPhase("feedback");
    if (correct) {
      play("success");
      setScore((s) => s + 1);
      burstConfetti();
    } else {
      play("wrong");
    }
  };

  const next = () => {
    play("click");
    if (isLast) {
      setPhase("done");
      play("tada");
      celebrationConfetti(3500);
    } else {
      setIndex((i) => i + 1);
      setPhase("question");
    }
  };

  const restart = () => {
    play("click");
    setIndex(0);
    setScore(0);
    setPhase("question");
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <AuroraBackground tone="pink" intensity={0.5} />
      <ParticleField count={22} color="#fbcfe8" />

      {/* HUD skor */}
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 18 }}
        className="glass-bright absolute left-4 top-4 z-20 flex items-center gap-2.5 rounded-2xl px-5 py-2.5 md:left-8 md:top-6"
      >
        <Star className="h-6 w-6 fill-amber-300 text-amber-300 drop-shadow-[0_0_6px_rgb(251_191_36/0.8)]" />
        <span className="font-ui text-lg font-bold text-ink-bright md:text-xl">{score}</span>
        {phase !== "done" && (
          <span className="ml-1 rounded-full bg-white/10 px-3 py-0.5 font-ui text-xs font-semibold uppercase tracking-widest text-ink-dim md:text-sm">
            Ronde {index + 1}/{GAME_SITUATIONS.length}
          </span>
        )}
      </motion.div>

      <SlideBody className="gap-5">
        {phase === "done" ? (
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="flex flex-col items-center gap-5 text-center"
          >
            <motion.div
              animate={{ rotate: [0, -8, 8, 0], scale: [1, 1.12, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-b from-amber-300 to-orange-500 shadow-glow-amber md:h-28 md:w-28"
            >
              <Trophy className="h-12 w-12 text-deep md:h-14 md:w-14" strokeWidth={2} />
            </motion.div>
            <h2 className="text-gradient-gold font-display text-5xl font-extrabold md:text-7xl">
              Kalian Hebat!
            </h2>
            <p className="text-2xl font-bold text-ink-dim">
              Kelas mengumpulkan {score} dari {GAME_SITUATIONS.length} bintang!
            </p>
            <Mascot pose="cheer" face="excited" className="w-40 md:w-48" />
            <BigButton color="amber" onClick={restart} ariaLabel="Main lagi">
              <RotateCcw size={22} /> Main Lagi
            </BigButton>
          </motion.div>
        ) : (
          <>
            {/* Kicker arena */}
            <motion.span
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass flex items-center gap-2 rounded-full px-4 py-1.5 font-ui text-xs font-semibold uppercase tracking-[0.22em] text-pink-300 md:text-sm"
            >
              <Swords className="h-4 w-4" aria-hidden /> Level 07 — Arena: Bijak atau Tidak?
            </motion.span>

            {/* Maskot pembawa acara */}
            <div className="flex items-end gap-3">
              <Mascot
                pose={phase === "feedback" && lastCorrect ? "cheer" : "wave"}
                face={phase === "feedback" && !lastCorrect ? "think" : "excited"}
                className="w-24 md:w-28"
              />
              <SpeechBubble tail="left" className="max-w-md">
                {phase === "question"
                  ? "Menurut kalian... BIJAK atau TIDAK YA?"
                  : lastCorrect
                    ? "Betul sekali! Kalian pintar!"
                    : "Belum tepat... tapi tidak apa-apa, ayo semangat!"}
              </SpeechBubble>
            </div>

            {/* Kartu situasi */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${situation.id}-${phase}`}
                initial={phase === "question" ? { opacity: 0, x: 90, rotate: 3 } : false}
                animate={
                  phase === "feedback" && !lastCorrect
                    ? { x: [0, -12, 12, -8, 8, 0], opacity: 1 }
                    : { opacity: 1, x: 0, rotate: 0 }
                }
                exit={{ opacity: 0, x: -90, rotate: -3 }}
                transition={
                  phase === "feedback" && !lastCorrect
                    ? { duration: 0.5 }
                    : { type: "spring", stiffness: 220, damping: 20 }
                }
                className={`flex w-full max-w-3xl flex-col items-center gap-4 rounded-blob p-6 md:p-8 ${
                  phase === "feedback"
                    ? lastCorrect
                      ? "glass-bright ring-2 ring-emerald-400/60 shadow-glow-lime"
                      : "glass-bright ring-2 ring-rose-400/60 shadow-glow-pink"
                    : "glass-bright ring-1 ring-white/15"
                }`}
              >
                <motion.span
                  className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-400 to-purple-700 text-white shadow-glow-violet md:h-20 md:w-20"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  aria-hidden
                >
                  <SituationIcon className="h-8 w-8 md:h-10 md:w-10" strokeWidth={2.2} />
                </motion.span>
                <p className="text-center font-display text-2xl font-bold leading-snug text-ink-bright md:text-4xl">
                  {situation.text}
                </p>
                {phase === "feedback" && (
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <span
                      className={`flex items-center gap-2 rounded-full px-5 py-1.5 font-display text-lg font-bold uppercase tracking-wide md:text-xl ${
                        situation.answer === "bijak"
                          ? "bg-gradient-to-r from-lime-300 to-emerald-500 text-deep shadow-glow-lime"
                          : "bg-gradient-to-r from-rose-400 to-pink-600 text-white shadow-glow-pink"
                      }`}
                    >
                      {situation.answer === "bijak" ? (
                        <ThumbsUp className="h-5 w-5" aria-hidden />
                      ) : (
                        <ThumbsDown className="h-5 w-5" aria-hidden />
                      )}
                      {situation.answer === "bijak" ? "BIJAK" : "TIDAK BIJAK"}
                    </span>
                    <p className="text-center text-lg font-semibold text-ink-dim md:text-xl">
                      {situation.explanation}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Tombol jawaban / lanjut */}
            {phase === "question" ? (
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
                <BigButton size="xl" color="lime" onClick={() => answer("bijak")} ariaLabel="Jawab bijak">
                  <ThumbsUp size={28} /> Bijak
                </BigButton>
                <BigButton size="xl" color="pink" onClick={() => answer("tidak")} ariaLabel="Jawab tidak bijak">
                  <ThumbsDown size={28} /> Tidak Bijak
                </BigButton>
              </div>
            ) : (
              <BigButton size="lg" color="cyan" onClick={next} ariaLabel={isLast ? "Lihat hasil" : "Ronde berikutnya"}>
                {isLast ? "Lihat Hasil" : "Ronde Berikutnya"} <ArrowRight size={24} />
              </BigButton>
            )}
          </>
        )}
      </SlideBody>
    </div>
  );
}
