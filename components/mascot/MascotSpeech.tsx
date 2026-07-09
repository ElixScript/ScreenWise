"use client";

import type { ReactNode } from "react";
import Mascot, { type MascotFace, type MascotPose } from "@/components/mascot/Mascot";
import SpeechBubble from "@/components/ui/SpeechBubble";

interface MascotSpeechProps {
  children: ReactNode;
  pose?: MascotPose;
  face?: MascotFace;
  mascotClassName?: string;
  bubbleClassName?: string;
  className?: string;
}

/** Kombinasi maskot + speech bubble yang dipakai hampir di semua halaman. */
export default function MascotSpeech({
  children,
  pose = "wave",
  face = "happy",
  mascotClassName = "w-28 md:w-36",
  bubbleClassName = "max-w-md",
  className = "",
}: MascotSpeechProps) {
  return (
    <div className={`flex items-center gap-3 md:gap-5 ${className}`}>
      <Mascot pose={pose} face={face} className={`shrink-0 ${mascotClassName}`} />
      <SpeechBubble tail="left" className={bubbleClassName}>
        {children}
      </SpeechBubble>
    </div>
  );
}
