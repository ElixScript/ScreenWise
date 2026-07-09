import type { LucideIcon } from "lucide-react";

/** Palet aksen yang dipakai kartu-kartu interaktif di seluruh presentasi. */
export type AccentColor = "blue" | "green" | "yellow" | "orange" | "purple" | "pink";

export interface IceBreakerItem {
  id: string;
  emoji: string;
  question: string;
  mascotComment: string;
  accent: AccentColor;
}

export interface GadgetItem {
  id: string;
  name: string;
  description: string;
  funFact: string;
  accent: AccentColor;
}

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accent: AccentColor;
}

export interface StoryStep {
  id: string;
  time: string;
  emoji: string;
  title: string;
  caption: string;
  mood: "happy" | "neutral" | "warning" | "sad";
}

export interface ImpactItem {
  id: string;
  emoji: string;
  title: string;
  example: string;
  solution: string;
  accent: AccentColor;
}

export interface RuleItem {
  id: string;
  number: number;
  title: string;
  explanation: string;
  accent: AccentColor;
}

export interface GameSituation {
  id: number;
  text: string;
  emoji: string;
  answer: "bijak" | "tidak";
  explanation: string;
}

export interface QuizOption {
  key: string;
  label: string;
}

export interface QuizQuestion {
  id: number;
  emoji: string;
  question: string;
  options: QuizOption[];
  correctKey: string;
}

export interface TipItem {
  id: string;
  emoji: string;
  title: string;
  detail: string;
  accent: AccentColor;
}
