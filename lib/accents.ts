import type { AccentColor } from "@/types/content";

export interface AccentClasses {
  /** Latar tembus pandang bernuansa aksen (panel dark glass). */
  soft: string;
  /** Chip ikon gradient pekat. */
  solid: string;
  /** Warna teks neon senada. */
  text: string;
  /** Ring senada. */
  ring: string;
  /** Gradient panel kaca. */
  gradient: string;
  /** Bayangan glow senada. */
  glow: string;
  /** Glow yang hanya muncul saat hover. */
  hoverGlow: string;
}

/**
 * Peta warna aksen → kelas Tailwind (tema Game UI gelap).
 * Ditulis eksplisit (bukan template string) agar terdeteksi compiler Tailwind.
 */
export const ACCENTS: Record<AccentColor, AccentClasses> = {
  blue: {
    soft: "bg-cyan-400/10",
    solid: "bg-gradient-to-br from-cyan-400 to-blue-600",
    text: "text-cyan-300",
    ring: "ring-cyan-400/40",
    gradient: "from-cyan-400/15 via-white/5 to-transparent",
    glow: "shadow-glow-cyan",
    hoverGlow: "hover:shadow-glow-cyan",
  },
  green: {
    soft: "bg-emerald-400/10",
    solid: "bg-gradient-to-br from-lime-300 to-emerald-600",
    text: "text-emerald-300",
    ring: "ring-emerald-400/40",
    gradient: "from-emerald-400/15 via-white/5 to-transparent",
    glow: "shadow-glow-lime",
    hoverGlow: "hover:shadow-glow-lime",
  },
  yellow: {
    soft: "bg-amber-400/10",
    solid: "bg-gradient-to-br from-amber-300 to-orange-500",
    text: "text-amber-300",
    ring: "ring-amber-400/40",
    gradient: "from-amber-400/15 via-white/5 to-transparent",
    glow: "shadow-glow-amber",
    hoverGlow: "hover:shadow-glow-amber",
  },
  orange: {
    soft: "bg-orange-400/10",
    solid: "bg-gradient-to-br from-orange-400 to-rose-500",
    text: "text-orange-300",
    ring: "ring-orange-400/40",
    gradient: "from-orange-400/15 via-white/5 to-transparent",
    glow: "shadow-glow-amber",
    hoverGlow: "hover:shadow-glow-amber",
  },
  purple: {
    soft: "bg-violet-400/10",
    solid: "bg-gradient-to-br from-violet-400 to-indigo-600",
    text: "text-violet-300",
    ring: "ring-violet-400/40",
    gradient: "from-violet-400/15 via-white/5 to-transparent",
    glow: "shadow-glow-violet",
    hoverGlow: "hover:shadow-glow-violet",
  },
  pink: {
    soft: "bg-pink-400/10",
    solid: "bg-gradient-to-br from-pink-400 to-rose-600",
    text: "text-pink-300",
    ring: "ring-pink-400/40",
    gradient: "from-pink-400/15 via-white/5 to-transparent",
    glow: "shadow-glow-pink",
    hoverGlow: "hover:shadow-glow-pink",
  },
};
