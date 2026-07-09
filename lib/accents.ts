import type { AccentColor } from "@/types/content";

export interface AccentClasses {
  /** Latar pastel lembut untuk kartu. */
  soft: string;
  /** Latar pekat untuk badge / lingkaran ikon. */
  solid: string;
  /** Warna teks senada. */
  text: string;
  /** Ring / border senada. */
  ring: string;
  /** Gradient lembut untuk kartu besar. */
  gradient: string;
}

/**
 * Peta warna aksen → kelas Tailwind.
 * Ditulis eksplisit (bukan template string) agar terdeteksi compiler Tailwind.
 */
export const ACCENTS: Record<AccentColor, AccentClasses> = {
  blue: {
    soft: "bg-sky-100",
    solid: "bg-brand-blue",
    text: "text-sky-700",
    ring: "ring-sky-300",
    gradient: "from-sky-100 via-white to-sky-50",
  },
  green: {
    soft: "bg-emerald-100",
    solid: "bg-brand-green",
    text: "text-emerald-700",
    ring: "ring-emerald-300",
    gradient: "from-emerald-100 via-white to-emerald-50",
  },
  yellow: {
    soft: "bg-amber-100",
    solid: "bg-brand-yellow",
    text: "text-amber-700",
    ring: "ring-amber-300",
    gradient: "from-amber-100 via-white to-amber-50",
  },
  orange: {
    soft: "bg-orange-100",
    solid: "bg-brand-orange",
    text: "text-orange-700",
    ring: "ring-orange-300",
    gradient: "from-orange-100 via-white to-orange-50",
  },
  purple: {
    soft: "bg-violet-100",
    solid: "bg-violet-400",
    text: "text-violet-700",
    ring: "ring-violet-300",
    gradient: "from-violet-100 via-white to-violet-50",
  },
  pink: {
    soft: "bg-pink-100",
    solid: "bg-pink-400",
    text: "text-pink-700",
    ring: "ring-pink-300",
    gradient: "from-pink-100 via-white to-pink-50",
  },
};
