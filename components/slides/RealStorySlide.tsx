"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SlideTitle from "@/components/ui/SlideTitle";
import SlideBody from "@/components/ui/SlideBody";
import MascotSpeech from "@/components/mascot/MascotSpeech";
import { FloatingBlobs } from "@/components/backgrounds/Decor";
import { useSound } from "@/hooks/useSound";

const FACTS = [
  {
    emoji: "🎮",
    text: "Ada anak yang bermain game online terus-menerus tanpa henti.",
  },
  {
    emoji: "🍚",
    text: "Sampai lupa makan, lupa minum, dan lupa istirahat.",
  },
  {
    emoji: "💔",
    text: "Tubuhnya menjadi sangat lemah karena tidak dijaga.",
  },
];

export default function RealStorySlide() {
  const { play } = useSound();

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-slate-100 via-indigo-50 to-slate-50">
      <FloatingBlobs colors={["#D6DEF0", "#E4E0F2", "#DCE7F5"]} />
      {/* Vignette lembut untuk menegaskan suasana serius */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, transparent 55%, rgba(51,65,85,0.10) 100%)",
        }}
      />

      <SlideBody className="gap-5">
        <SlideTitle
          emoji="💭"
          title="Belajar dari Kisah Nyata"
          subtitle="Ada satu berita penting yang perlu kita ketahui bersama."
        />

        <div className="grid w-full max-w-5xl items-center gap-5 md:grid-cols-2 md:gap-8">
          {/* Kliping berita */}
          <motion.figure
            initial={{ opacity: 0, y: 30, rotate: -3, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, rotate: -1.5, scale: 1 }}
            transition={{ type: "spring", stiffness: 140, damping: 18, delay: 0.3 }}
            className="relative mx-auto w-full max-w-md"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative rounded-3xl bg-white p-3 shadow-[0_18px_45px_-12px_rgba(51,65,85,0.4)] ring-1 ring-slate-200"
            >
              {/* Selotip kertas */}
              <span
                aria-hidden
                className="absolute -left-3 -top-3 h-8 w-16 -rotate-12 rounded-sm bg-amber-200/70 shadow-sm"
              />
              <span
                aria-hidden
                className="absolute -right-3 -top-3 h-8 w-16 rotate-12 rounded-sm bg-amber-200/70 shadow-sm"
              />

              {/* Stempel BERITA NYATA — di sudut bawah foto agar judul tetap terbaca */}
              <motion.span
                initial={{ scale: 0, rotate: 18 }}
                animate={{ scale: 1, rotate: -7 }}
                transition={{ type: "spring", stiffness: 220, damping: 12, delay: 0.9 }}
                className="absolute -left-3 bottom-8 z-10 rounded-lg border-2 border-rose-400 bg-white/90 px-3 py-1 font-display text-sm font-extrabold uppercase tracking-wide text-rose-500 shadow-md md:text-base"
              >
                Berita Nyata
              </motion.span>

              <div className="relative aspect-[1120/759] w-full overflow-hidden rounded-2xl">
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
            <figcaption className="mt-3 text-center font-ui text-sm font-semibold text-slate-500">
              📰 Ini berita sungguhan, bukan cerita rekaan.
            </figcaption>
          </motion.figure>

          {/* Fakta + pelajaran */}
          <div className="flex flex-col gap-3">
            {FACTS.map((fact, i) => (
              <motion.button
                key={fact.emoji}
                type="button"
                onClick={() => play("pop")}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.25, type: "spring", stiffness: 200, damping: 20 }}
                whileHover={{ x: 6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex cursor-pointer items-center gap-4 rounded-3xl bg-white/85 p-4 text-left shadow-soft ring-2 ring-white/80 backdrop-blur transition-shadow hover:shadow-pop"
              >
                <span className="text-3xl md:text-4xl" aria-hidden>
                  {fact.emoji}
                </span>
                <span className="font-display text-base font-bold leading-snug text-slate-700 md:text-lg">
                  {fact.text}
                </span>
              </motion.button>
            ))}

            {/* Pesan pelajaran yang menenangkan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, type: "spring", stiffness: 180, damping: 20 }}
              className="mt-1 rounded-3xl bg-gradient-to-r from-amber-100 to-rose-100 p-4 shadow-soft ring-2 ring-white/80"
            >
              <p className="font-display text-base font-bold leading-snug text-slate-700 md:text-lg">
                💛 Tubuh kita butuh makan, minum, dan istirahat. Gadget boleh
                dipakai, tapi jangan sampai lupa menjaga diri sendiri, ya!
              </p>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <MascotSpeech pose="think" face="think" bubbleClassName="max-w-xl">
            Bimo sayang kalian semua. Supaya tetap aman dan sehat, yuk kita
            pelajari 5 aturan pentingnya! 🌟
          </MascotSpeech>
        </motion.div>
      </SlideBody>
    </div>
  );
}
