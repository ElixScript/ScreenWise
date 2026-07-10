"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Newspaper, HeartHandshake } from "lucide-react";
import SlideTitle from "@/components/ui/SlideTitle";
import SlideBody from "@/components/ui/SlideBody";
import MascotSpeech from "@/components/mascot/MascotSpeech";
import { AuroraBackground, ParticleField } from "@/components/backgrounds/Aurora";
import { REALSTORY_ICONS } from "@/lib/icons";
import { useSound } from "@/hooks/useSound";

const FACTS = [
  {
    id: "game",
    text: "Ada anak yang bermain game online terus-menerus tanpa henti.",
  },
  {
    id: "makan",
    text: "Sampai lupa makan, lupa minum, dan lupa istirahat.",
  },
  {
    id: "lemah",
    text: "Tubuhnya menjadi sangat lemah karena tidak dijaga.",
  },
];

export default function RealStorySlide() {
  const { play } = useSound();

  return (
    <div className="relative h-full w-full overflow-hidden">
      <AuroraBackground tone="danger" intensity={0.38} />
      <ParticleField count={12} color="#fda4af" />

      <SlideBody className="gap-5">
        <SlideTitle
          icon={Newspaper}
          kicker="Level 05 — Kisah Nyata"
          title="Belajar dari Kisah Nyata"
          subtitle="Ada satu berita penting yang perlu kita ketahui bersama."
        />

        <div className="grid w-full max-w-5xl items-center gap-5 md:grid-cols-2 md:gap-8">
          {/* Kliping berita — bukti nyata di atas panel gelap */}
          <motion.figure
            initial={{ opacity: 0, y: 30, rotate: -3, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, rotate: -1.5, scale: 1 }}
            transition={{ type: "spring", stiffness: 140, damping: 18, delay: 0.3 }}
            className="relative mx-auto w-full max-w-md"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative rounded-2xl bg-white p-3 shadow-[0_0_50px_-8px_rgb(251_113_133/0.35),0_24px_60px_-16px_rgb(0_0_0/0.7)]"
            >
              {/* Selotip */}
              <span
                aria-hidden
                className="absolute -left-3 -top-3 h-8 w-16 -rotate-12 rounded-sm bg-amber-200/80 shadow-sm"
              />
              <span
                aria-hidden
                className="absolute -right-3 -top-3 h-8 w-16 rotate-12 rounded-sm bg-amber-200/80 shadow-sm"
              />

              {/* Stempel BERITA NYATA */}
              <motion.span
                initial={{ scale: 0, rotate: 18 }}
                animate={{ scale: 1, rotate: -7 }}
                transition={{ type: "spring", stiffness: 220, damping: 12, delay: 0.9 }}
                className="absolute -left-3 bottom-8 z-10 rounded-lg border-2 border-rose-500 bg-white/95 px-3 py-1 font-display text-sm font-extrabold uppercase tracking-wide text-rose-600 shadow-[0_0_18px_-2px_rgb(244_63_94/0.6)] md:text-base"
              >
                Berita Nyata
              </motion.span>

              <div className="relative aspect-[1120/759] w-full overflow-hidden rounded-xl">
                <Image
                  src="/images/berita-kecanduan.png"
                  alt="Berita: seorang anak meninggal akibat kecanduan game online (Lembaga Perlindungan Anak Majalengka)"
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 88vw, 40vw"
                  className="object-cover"
                />
              </div>
            </motion.div>
            <figcaption className="mt-3 text-center font-ui text-sm font-semibold text-ink-dim">
              Ini berita sungguhan, bukan cerita rekaan.
            </figcaption>
          </motion.figure>

          {/* Fakta + pelajaran */}
          <div className="flex flex-col gap-3">
            {FACTS.map((fact, i) => {
              const Icon = REALSTORY_ICONS[fact.id];
              return (
                <motion.button
                  key={fact.id}
                  type="button"
                  onClick={() => play("pop")}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.25, type: "spring", stiffness: 200, damping: 20 }}
                  whileHover={{ x: 6, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="glass flex cursor-pointer items-center gap-4 rounded-2xl p-4 text-left ring-1 ring-white/10 transition-shadow hover:shadow-glow-pink"
                >
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-rose-400 to-rose-700 text-white shadow-glow-pink"
                    aria-hidden
                  >
                    <Icon className="h-5 w-5" strokeWidth={2.3} />
                  </span>
                  <span className="font-display text-base font-bold leading-snug text-ink-bright md:text-lg">
                    {fact.text}
                  </span>
                </motion.button>
              );
            })}

            {/* Pesan pelajaran yang menenangkan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, type: "spring", stiffness: 180, damping: 20 }}
              className="glass-bright mt-1 flex items-start gap-3 rounded-2xl p-4 ring-2 ring-amber-400/40"
            >
              <HeartHandshake className="mt-0.5 h-6 w-6 shrink-0 text-amber-300" aria-hidden />
              <p className="font-display text-base font-bold leading-snug text-amber-200 md:text-lg">
                Tubuh kita butuh makan, minum, dan istirahat. Gadget boleh
                dipakai, tapi jangan sampai lupa menjaga diri sendiri, ya!
              </p>
            </motion.div>
          </div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
          <MascotSpeech pose="think" face="think" bubbleClassName="max-w-xl">
            Bimo sayang kalian semua. Supaya tetap aman dan sehat, yuk kita
            pelajari 5 aturan pentingnya!
          </MascotSpeech>
        </motion.div>
      </SlideBody>
    </div>
  );
}
