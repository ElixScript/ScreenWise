"use client";

import { motion } from "framer-motion";
import { Volume2, VolumeX, Maximize, Minimize } from "lucide-react";
import { useSound } from "@/hooks/useSound";
import { useFullscreen } from "@/hooks/useFullscreen";

/** Tombol bulat kaca untuk kontrol presentasi. */
function HudButton({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.9 }}
      className="glass flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-brand-ink shadow-soft"
      aria-label={label}
      title={label}
    >
      {children}
    </motion.button>
  );
}

export default function HudControls() {
  const { muted, toggleMute } = useSound();
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  return (
    <div className="absolute right-4 top-4 z-40 flex gap-2 md:right-6 md:top-6">
      <HudButton onClick={toggleMute} label={muted ? "Nyalakan suara" : "Matikan suara"}>
        {muted ? <VolumeX size={22} /> : <Volume2 size={22} />}
      </HudButton>
      <HudButton
        onClick={toggleFullscreen}
        label={isFullscreen ? "Keluar layar penuh" : "Layar penuh"}
      >
        {isFullscreen ? <Minimize size={22} /> : <Maximize size={22} />}
      </HudButton>
    </div>
  );
}
