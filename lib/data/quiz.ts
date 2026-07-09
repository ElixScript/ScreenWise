import type { QuizQuestion } from "@/types/content";

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    emoji: "💡",
    question: "Apa manfaat gadget?",
    options: [
      { key: "A", label: "Bermain sepanjang hari" },
      { key: "B", label: "Belajar dan mencari informasi" },
      { key: "C", label: "Tidak tidur" },
    ],
    correctKey: "B",
  },
  {
    id: 2,
    emoji: "📖",
    question: "Sebelum bermain HP sebaiknya...",
    options: [
      { key: "A", label: "Belajar terlebih dahulu" },
      { key: "B", label: "Langsung bermain" },
      { key: "C", label: "Tidak mengerjakan PR" },
    ],
    correctKey: "A",
  },
  {
    id: 3,
    emoji: "👀",
    question: "Jika mata mulai lelah karena melihat layar, kita harus...",
    options: [
      { key: "A", label: "Bermain lebih lama" },
      { key: "B", label: "Mengistirahatkan mata" },
      { key: "C", label: "Menambah cahaya layar" },
    ],
    correctKey: "B",
  },
  {
    id: 4,
    emoji: "🛡️",
    question: "Saat menemukan sesuatu yang membuat takut di internet, kita harus...",
    options: [
      { key: "A", label: "Diam saja" },
      { key: "B", label: "Memberi tahu orang tua" },
      { key: "C", label: "Membagikannya ke teman" },
    ],
    correctKey: "B",
  },
  {
    id: 5,
    emoji: "🌟",
    question: "Mana kebiasaan yang baik?",
    options: [
      { key: "A", label: "Bermain HP sampai malam" },
      { key: "B", label: "Bermain bersama teman" },
      { key: "C", label: "Bermain HP sambil makan" },
    ],
    correctKey: "B",
  },
];

export function getQuizPraise(score: number, total: number): string {
  if (score === total) {
    return "Sempurna! Kamu sudah memahami cara menggunakan gadget dengan bijak!";
  }
  if (score >= Math.ceil(total * 0.6)) {
    return "Hebat! Sedikit lagi sempurna. Terus semangat belajar ya!";
  }
  return "Kamu sudah berusaha dengan baik! Yuk terus belajar bersama.";
}
