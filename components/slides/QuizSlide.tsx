"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, RotateCcw, Check, X, Star, Trophy } from "lucide-react";
import MascotSpeech from "@/components/mascot/MascotSpeech";
import BigButton from "@/components/ui/BigButton";
import SlideBody from "@/components/ui/SlideBody";
import Mascot from "@/components/mascot/Mascot";
import { AuroraBackground, ParticleField } from "@/components/backgrounds/Aurora";
import { QUIZ_QUESTIONS, getQuizPraise } from "@/lib/data/quiz";
import { QUIZ_ICONS } from "@/lib/icons";
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
  const QuestionIcon = QUIZ_ICONS[question.id];
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
    <div className="relative h-full w-full overflow-hidden">
      <AuroraBackground tone="cyan" intensity={0.5} />
      <ParticleField count={18} />

      <SlideBody className="gap-5">
        {finished ? (
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="flex flex-col items-center gap-4 text-center"
          >
            <div className="flex gap-3" role="img" aria-label={`${stars} dari ${total} bintang`}>
              {Array.from({ length: total }).map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ scale: 0, rotate: -60 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.4 + i * 0.22, type: "spring", stiffness: 300, damping: 12 }}
                >
                  <Star
                    className={`h-12 w-12 md:h-14 md:w-14 ${
                      i < stars
                        ? "fill-amber-300 text-amber-300 drop-shadow-[0_0_10px_rgb(251_191_36/0.8)]"
                        : "text-white/20"
                    }`}
                  />
                </motion.span>
              ))}
            </div>
            <h2 className="text-gradient-gold font-display text-5xl font-extrabold md:text-6xl">
              {stars === total ? "Sempurna!" : "Hebat!"}
            </h2>
            <p className="max-w-xl text-xl font-bold text-ink-dim md:text-2xl">
              {getQuizPraise(stars, total)}
            </p>
            <Mascot pose="cheer" face="excited" className="w-36 md:w-44" />
            <BigButton color="lime" onClick={restart} ariaLabel="Ulangi quiz">
              <RotateCcw size={22} /> Coba Lagi
            </BigButton>
          </motion.div>
        ) : (
          <>
            {/* Progress HUD */}
            <div className="w-full max-w-2xl">
              <div className="mb-1.5 flex items-center justify-between font-ui text-xs font-bold uppercase tracking-widest text-ink-dim md:text-sm">
                <span className="flex items-center gap-1.5">
                  <Trophy className="h-4 w-4 text-cyan-300" aria-hidden />
                  Level 08 — Quiz · Soal {index + 1}/{total}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-amber-300 text-amber-300" aria-hidden /> {stars}
                </span>
              </div>
              <div className="glass h-4 overflow-hidden rounded-full">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400 shadow-glow-cyan"
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
                className="glass-bright flex w-full max-w-2xl items-center gap-4 rounded-blob p-5 ring-1 ring-white/15 md:p-6"
              >
                <motion.span
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-glow-cyan md:h-16 md:w-16"
                  animate={{ rotate: [0, -6, 6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  aria-hidden
                >
                  <QuestionIcon className="h-7 w-7 md:h-8 md:w-8" strokeWidth={2.2} />
                </motion.span>
                <h3 className="font-display text-2xl font-bold leading-snug text-ink-bright md:text-3xl">
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
                      isWrong ? { x: [0, -10, 10, -6, 6, 0], opacity: 1 } : { opacity: 1, x: 0 }
                    }
                    transition={
                      isWrong
                        ? { duration: 0.45 }
                        : { delay: 0.2 + i * 0.1, type: "spring", stiffness: 240, damping: 20 }
                    }
                    whileHover={!answeredCorrect && !isWrong ? { scale: 1.02, x: 6 } : undefined}
                    whileTap={!answeredCorrect ? { scale: 0.97 } : undefined}
                    disabled={answeredCorrect}
                    className={`flex min-h-[56px] cursor-pointer items-center gap-4 rounded-2xl px-5 py-3 text-left transition-all md:px-6 ${
                      isCorrectPick
                        ? "bg-gradient-to-r from-lime-400/90 to-emerald-500/90 text-deep shadow-glow-lime ring-2 ring-emerald-300"
                        : isWrong
                          ? "glass text-ink-dim ring-2 ring-rose-400/50 opacity-60"
                          : "glass text-ink-bright ring-1 ring-white/10 hover:ring-cyan-400/50 hover:shadow-glow-cyan"
                    } disabled:cursor-default`}
                    aria-label={`Jawaban ${option.key}: ${option.label}`}
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-display text-lg font-bold ${
                        isCorrectPick
                          ? "bg-white/30 text-deep"
                          : isWrong
                            ? "bg-rose-400/20 text-rose-300"
                            : "bg-cyan-400/15 text-cyan-300"
                      }`}
                    >
                      {isCorrectPick ? (
                        <Check className="h-5 w-5" strokeWidth={3} />
                      ) : isWrong ? (
                        <X className="h-5 w-5" strokeWidth={3} />
                      ) : (
                        option.key
                      )}
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
                      Hebat! Jawabanmu benar!
                    </MascotSpeech>
                    <BigButton size="md" color="cyan" onClick={next} ariaLabel={isLast ? "Lihat skor" : "Soal berikutnya"}>
                      {isLast ? "Lihat Skor" : "Lanjut"} <ArrowRight size={20} />
                    </BigButton>
                  </motion.div>
                ) : wrongKeys.length > 0 ? (
                  <motion.div key="wrong" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
                    <MascotSpeech pose="think" face="think" mascotClassName="w-20 md:w-24" bubbleClassName="max-w-xs">
                      Ayo coba lagi! Kamu pasti bisa!
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
