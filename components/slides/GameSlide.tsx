"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThumbsUp, ThumbsDown, ArrowRight, RotateCcw, Star } from "lucide-react";
import Mascot from "@/components/mascot/Mascot";
import SpeechBubble from "@/components/ui/SpeechBubble";
import BigButton from "@/components/ui/BigButton";
import SlideBody from "@/components/ui/SlideBody";
import { SparkleField, FloatingBlobs } from "@/components/backgrounds/Decor";
import { GAME_SITUATIONS } from "@/lib/data/game";
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
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-orange-100 via-rose-50 to-fuchsia-100">
      <FloatingBlobs colors={["#FFDCC2", "#FFD6E8", "#F3D9FA"]} />
      <SparkleField count={14} color="#FF8FAB" />

      {/* Papan skor */}
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 18 }}
        className="glass absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full px-5 py-2.5 shadow-soft md:left-8 md:top-6"
      >
        <Star className="h-6 w-6 fill-brand-yellow text-amber-400" />
        <span className="font-ui text-lg font-bold text-brand-ink md:text-xl">
          Skor Kelas: {score}
        </span>
        {phase !== "done" && (
          <span className="ml-1 rounded-full bg-white/80 px-3 py-0.5 font-ui text-sm font-semibold text-brand-ink/60">
            Soal {index + 1}/{GAME_SITUATIONS.length}
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
            <motion.span
              className="text-7xl md:text-8xl"
              animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              aria-hidden
            >
              🎉
            </motion.span>
            <h2 className="font-display text-5xl font-extrabold text-brand-ink md:text-7xl">
              Kalian Hebat!
            </h2>
            <p className="text-2xl font-bold text-brand-ink/70">
              Kelas berhasil mengumpulkan {score} dari {GAME_SITUATIONS.length} bintang! ⭐
            </p>
            <Mascot pose="cheer" face="excited" className="w-40 md:w-52" />
            <BigButton color="orange" onClick={restart} ariaLabel="Main lagi">
              <RotateCcw size={22} /> Main Lagi
            </BigButton>
          </motion.div>
        ) : (
          <>
            {/* Maskot pembawa acara */}
            <div className="flex items-end gap-3">
              <Mascot
                pose={phase === "feedback" && lastCorrect ? "cheer" : "wave"}
                face={phase === "feedback" && !lastCorrect ? "think" : "excited"}
                className="w-24 md:w-32"
              />
              <SpeechBubble tail="left" className="max-w-md">
                {phase === "question"
                  ? "Menurut kalian... BIJAK atau TIDAK YA? 🤔"
                  : lastCorrect
                    ? "Betul sekali! Kalian pintar! 🌟"
                    : "Belum tepat... tapi tidak apa-apa, ayo semangat! 💪"}
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
                className={`flex w-full max-w-3xl flex-col items-center gap-3 rounded-blob p-6 shadow-pop ring-8 md:p-8 ${
                  phase === "feedback"
                    ? lastCorrect
                      ? "bg-emerald-50 ring-emerald-300"
                      : "bg-rose-50 ring-rose-200"
                    : "bg-white/90 ring-white/80"
                }`}
              >
                <motion.span
                  className="text-6xl md:text-7xl"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  aria-hidden
                >
                  {situation.emoji}
                </motion.span>
                <p className="text-center font-display text-2xl font-bold leading-snug text-brand-ink md:text-4xl">
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
                      className={`rounded-full px-5 py-1.5 font-display text-lg font-bold text-white md:text-xl ${
                        situation.answer === "bijak" ? "bg-brand-green" : "bg-rose-400"
                      }`}
                    >
                      Jawaban: {situation.answer === "bijak" ? "👍 BIJAK" : "👎 TIDAK BIJAK"}
                    </span>
                    <p className="text-center text-lg font-semibold text-brand-ink/75 md:text-xl">
                      {situation.explanation}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Tombol jawaban / lanjut */}
            {phase === "question" ? (
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
                <BigButton size="xl" color="green" onClick={() => answer("bijak")} ariaLabel="Jawab bijak">
                  <ThumbsUp size={28} /> BIJAK
                </BigButton>
                <BigButton size="xl" color="orange" onClick={() => answer("tidak")} ariaLabel="Jawab tidak bijak">
                  <ThumbsDown size={28} /> TIDAK BIJAK
                </BigButton>
              </div>
            ) : (
              <BigButton size="lg" color="blue" onClick={next} ariaLabel={isLast ? "Lihat hasil" : "Soal berikutnya"}>
                {isLast ? "Lihat Hasil" : "Soal Berikutnya"} <ArrowRight size={24} />
              </BigButton>
            )}
          </>
        )}
      </SlideBody>
    </div>
  );
}
