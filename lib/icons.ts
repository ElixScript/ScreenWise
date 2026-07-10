import {
  Hand,
  Youtube,
  Gamepad2,
  AlarmClock,
  Eye,
  MoonStar,
  BookX,
  Bike,
  Angry,
  Smartphone,
  Utensils,
  HeartCrack,
  Lightbulb,
  BookOpen,
  ShieldQuestion,
  Star,
  Clock3,
  Lamp,
  ScanEye,
  ShieldCheck,
  Users,
  Trophy,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

/**
 * Peta ikon Lucide per item konten — menggantikan emoji sebagai
 * elemen visual utama (emoji kini hanya bumbu kecil di teks).
 */

export const ICEBREAKER_ICONS: Record<string, LucideIcon> = {
  "punya-hp": Hand,
  "suka-youtube": Youtube,
  "suka-game": Gamepad2,
  "pernah-dimarahi": AlarmClock,
};

export const IMPACT_ICONS: Record<string, LucideIcon> = {
  "mata-lelah": Eye,
  "kurang-tidur": MoonStar,
  "sulit-fokus": BookX,
  "jarang-bermain": Bike,
  "mudah-marah": Angry,
  kecanduan: Smartphone,
};

export const REALSTORY_ICONS: Record<string, LucideIcon> = {
  game: Gamepad2,
  makan: Utensils,
  lemah: HeartCrack,
};

export const RULE_ICONS: Record<string, LucideIcon> = {
  "batasi-waktu": Clock3,
  "tempat-terang": Lamp,
  "istirahatkan-mata": ScanEye,
  "konten-aman": ShieldCheck,
  didampingi: Users,
};

/** Ikon per soal quiz (berdasarkan id). */
export const QUIZ_ICONS: Record<number, LucideIcon> = {
  1: Lightbulb,
  2: BookOpen,
  3: Eye,
  4: ShieldQuestion,
  5: Star,
};

/** Ikon per situasi game "Bijak atau Tidak?" (berdasarkan id). */
export const GAME_ICONS: Record<number, LucideIcon> = {
  1: Youtube,
  2: MoonStar,
  3: Sparkles,
  4: Utensils,
  5: Bike,
  6: Gamepad2,
  7: Hand,
  8: Lamp,
  9: AlarmClock,
  10: ShieldCheck,
};

export { Trophy };
