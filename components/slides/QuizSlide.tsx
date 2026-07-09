"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, RotateCcw } from "lucide-react";
import MascotSpeech from "@/components/mascot/MascotSpeech";
import BigButton from "@/components/ui/BigButton";
import SlideBody from "@/components/ui/SlideBody";
import Mascot from "@/components/mascot/Mascot";
import { SparkleField, FloatingBlobs } from "@/components/backgrounds/Decor";
import { QUIZ_QUESTIONS, getQuizPraise } from "@/lib/data/quiz";
import { burstConfetti, starConfetti, celebrationConfetti } from "@/lib/confetti";
import { useSound } from "@/hooks/useSound";

export default function QuizSlide() {
  const [index, setIndex] = useState(0);
  const [wrongKeys, setWrongKeys] = useState<string[]>([]);
  const [answeredCorrect, setAnsweredCorrect] = useState(false);
  const [stars, setStars] = useState(0);
  const [finished, setFinished] = useState(false);

  const { play } = useSound();
  const question = QUIZ_QUESTIONS[index];
  const total = QUIZ_QUESTIONS.length;
  const isLast = index === total - 1;
  const progress = ((index + (answeredCorrect ? 1 : 0)) / total) * 100;

  const choose = (key: string) => {
    if (answeredCorrect) return;
    if (key === question.correctKey) {
      play("success");
      setAnsweredCorrect(true);
      if (wrongKeys.length === 0) {
        setStars((s) => s + 1);
        starConfetti();
      } else {
        burstConfetti();
      }
    } else {
      play("wrong");
      setWrongKeys((prev) => (prev.includes(key) ? prev : [...prev, key]));
    }
  };

  const next = () => {
    play("click");
    if (isLast) {
      setFinished(true);
      play("tada");
      celebrationConfetti(3000);
    } else {
      setIndex((i) => i + 1);
      setWrongKeys([]);
      setAnsweredCorrect(false);
    }
  };

  const restart = () => {
    play("click");
    setIndex(0);
    setWrongKeys([]);
    setAnsweredCorrect(false);
    setStars(0);
    setFinished(false);
  };

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-sky-100 via-emerald-50 to-teal-50">
      <FloatingBlobs colors={["#BFDCFF", "#CDEFCE", "#C9F2E4"]} />
      <SparkleField count={12} color="#5CCB5F" />

      <SlideBody className="gap-5">
        {finished ? (
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="flex flex-col items-center gap-4 text-center"
          >
            <div className="flex gap-2" role="img" aria-label={`${stars} dari ${total} bintang`}>
              {Array.from({ length: total }).map((_, i) => (
                <motion.span
                  key={i}
                  className="text-5xl md:text-6xl"
                  initial={{ scale: 0, rotate: -60 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.4 + i * 0.25, type: "spring", stiffness: 300, damping: 12 }}
                >
                  {i < stars ? "⭐" : "☆"}
                </motion.span>
              ))}
            </div>
            <h2 className="font-display text-5xl font-extrabold text-brand-ink md:text-6xl">
              {stars === total ? "Sempurna!" : "Hebat!"}
            </h2>
            <p className="max-w-xl text-xl font-bold text-brand-ink/70 md:text-2xl">
              {getQuizPraise(stars, total)}
            </p>
            <Mascot pose="cheer" face="excited" className="w-36 md:w-48" />
            <BigButton color="green" onClick={restart} ariaLabel="Ulangi quiz">
              <RotateCcw size={22} /> Coba Lagi
            </BigButton>
          </motion.div>
        ) : (
          <>
            {/* Progress */}
            <div className="w-full max-w-2xl">
              <div className="mb-1.5 flex items-center justify-between font-ui text-sm font-bold text-brand-ink/60 md:text-base">
                <span>
                  🏆 Soal {index + 1} dari {total}
                </span>
                <span>⭐ {stars}</span>
              </div>
              <div className="h-4 overflow-hidden rounded-full bg-white/80 shadow-inner ring-2 ring-white">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-brand-green to-emerald-400"
                  animate={{ width: `${progress}%` }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                />
              </div>
            </div>

            {/* Pertanyaan */}
            <AnimatePresence mode="wait">
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                className="flex w-full max-w-2xl items-center gap-4 rounded-blob bg-white/90 p-5 shadow-pop ring-8 ring-white/70 md:p-6"
              >
                <motion.span
                  className="text-5xl md:text-6xl"
                  animate={{ rotate: [0, -8, 8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  aria-hidden
                >
                  {question.emoji}
                </motion.span>
                <h3 className="font-display text-2xl font-bold leading-snug text-brand-ink md:text-3xl">
                  {question.question}
                </h3>
              </motion.div>
            </AnimatePresence>

            {/* Pilihan jawaban */}
            <div className="grid w-full max-w-2xl gap-3">
              {question.options.map((option, i) => {
                const isWrong = wrongKeys.includes(option.key);
                const isCorrectPick = answeredCorrect && option.key === question.correctKey;
                return (
                  <motion.button
                    key={`${question.id}-${option.key}`}
                    type="button"
                    onClick={() => choose(option.key)}
                    initial={{ opacity: 0, x: -40 }}
                    animate={
                      isWrong
                        ? { x: [0, -10, 10, -6, 6, 0], opacity: 1 }
                        : { opacity: 1, x: 0 }
                    }
                    transition={
                      isWrong ? { duration: 0.45 } : { delay: 0.2 + i * 0.1, type: "spring", stiffness: 240, damping: 20 }
                    }
                    whileHover={!answeredCorrect && !isWrong ? { scale: 1.03, x: 6 } : undefined}
                    whileTap={!answeredCorrect ? { scale: 0.97 } : undefined}
                    disabled={answeredCorrect}
                    className={`flex min-h-[56px] cursor-pointer items-center gap-4 rounded-3xl px-5 py-3 text-left shadow-soft ring-4 transition-colors md:px-6 ${
                      isCorrectPick
                        ? "bg-brand-green text-white ring-emerald-200"
                        : isWrong
                          ? "bg-rose-100 text-brand-ink/50 ring-rose-200"
                          : "bg-white/90 text-brand-ink ring-white/70 hover:ring-sky-200"
                    } disabled:cursor-default`}
                    aria-label={`Jawaban ${option.key}: ${option.label}`}
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-lg font-bold ${
                        isCorrectPick ? "bg-white/25 text-white" : "bg-sky-100 text-sky-700"
                      }`}
                    >
                      {isCorrectPick ? "✓" : isWrong ? "✗" : option.key}
                    </span>
                    <span className="font-display text-xl font-bold md:text-2xl">{option.label}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Reaksi maskot + lanjut */}
            <div className="flex min-h-[5.5rem] flex-col items-center gap-3">
              <AnimatePresence mode="wait">
                {answeredCorrect ? (
                  <motion.div
                    key="correct"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-wrap items-center justify-center gap-4"
                  >
                    <MascotSpeech pose="cheer" face="excited" mascotClassName="w-20 md:w-24" bubbleClassName="max-w-xs">
                      Hebat! Jawabanmu benar! 🎉
                    </MascotSpeech>
                    <BigButton size="md" color="blue" onClick={next} ariaLabel={isLast ? "Lihat skor" : "Soal berikutnya"}>
                      {isLast ? "Lihat Skor" : "Lanjut"} <ArrowRight size={20} />
                    </BigButton>
                  </motion.div>
                ) : wrongKeys.length > 0 ? (
                  <motion.div key="wrong" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
                    <MascotSpeech pose="think" face="think" mascotClassName="w-20 md:w-24" bubbleClassName="max-w-xs">
                      Ayo coba lagi! Kamu pasti bisa! 💪
                    </MascotSpeech>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </>
        )}
      </SlideBody>
    </div>
  );
}
